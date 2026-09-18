mod models;
mod utils;

use anyhow::{Context, Result};
use chrono::{NaiveDate, Utc};
use headless_chrome::{Browser, LaunchOptions};
use log::{error, info, warn};
use std::fs;
use std::path::Path;
use std::sync::Arc;
use tokio::task;

use models::{Announcement, DateObj, Db, KalenderEvent, Materi};
use utils::{get_indo_month, get_indo_month_abbr, is_older_than_three_months, parse_indo_date};

fn scrape_baak(browser: &Browser) -> Result<Vec<Announcement>> {
    info!("Memulai proses scraping BAAK...");
    let tab = browser.new_tab().context("Gagal membuka tab baru untuk BAAK")?;
    
    tab.navigate_to("https://baak.gunadarma.ac.id/")
        .context("Gagal navigasi ke URL BAAK")?;
    tab.wait_until_navigated().context("Gagal menunggu halaman BAAK selesai dimuat")?;
    
    // Tunggu selektor muncul (mengakomodasi WAF Cloudflare)
    if let Err(e) = tab.wait_for_element(".trow") {
        warn!("Selektor BAAK tidak ditemukan atau terkena limitasi jaringan: {}", e);
        return Ok(vec![]);
    }
    
    let mut announcements = Vec::new();
    let rows = tab.find_elements(".trow").context("Gagal menemukan elemen baris BAAK")?;
    
    for (i, row) in rows.iter().enumerate() {
        let title_el = match row.find_element(".title a") {
            Ok(el) => el,
            Err(_) => continue,
        };
        
        let title = title_el.get_inner_text().unwrap_or_default();
        let link = title_el.get_attribute_value("href").unwrap_or_default().unwrap_or_default();
        
        let date_str = row.find_element("span")
            .and_then(|span| span.get_inner_text())
            .unwrap_or_else(|_| "Kamis, 17 September 2026".to_string());
        
        let description = row.get_inner_text().unwrap_or_default().chars().take(150).collect::<String>() + "...";
        let parsed_date = parse_indo_date(&date_str).unwrap_or_else(|| Utc::now().naive_utc().date());
        
        if !is_older_than_three_months(&parsed_date) {
            announcements.push(Announcement {
                id: format!("baak-{}", i),
                date: DateObj {
                    day: format!("{:02}", parsed_date.day()),
                    month: get_indo_month_abbr(parsed_date.month()).to_string(),
                    year: parsed_date.year().to_string(),
                },
                title: format!("[BAAK] {}", title.trim()),
                description: description.replace('\n', " "),
                source: "BAAK".to_string(),
                tags: vec!["BAAK".to_string()],
                link: Some(link),
            });
        }
    }
    
    info!("Berhasil scrape {} pengumuman dari BAAK", announcements.len());
    Ok(announcements)
}

fn scrape_lepkom(browser: &Browser) -> Result<(Vec<Announcement>, Vec<Materi>, Vec<KalenderEvent>)> {
    info!("Memulai proses scraping VM LePKom...");
    let tab = browser.new_tab().context("Gagal membuka tab baru untuk LePKom")?;
    
    tab.navigate_to("https://vm.lepkom.gunadarma.ac.id/")
        .context("Gagal navigasi ke URL LePKom")?;
    tab.wait_until_navigated().context("Gagal menunggu halaman LePKom selesai dimuat")?;
    
    std::thread::sleep(std::time::Duration::from_secs(2));
    
    let mut announcements = Vec::new();
    let mut materi_list = Vec::new();
    let mut kalender_list = Vec::new();
    
    // 1. Pengumuman
    if let Ok(news_items) = tab.find_elements(".recent-news") {
        for (i, item) in news_items.iter().enumerate() {
            if let Ok(title_el) = item.find_element("h6 a") {
                let mut raw_title = title_el.get_inner_text().unwrap_or_default();
                let link = title_el.get_attribute_value("href").unwrap_or_default().unwrap_or_default();
                
                if let Some(idx) = raw_title.find(' ') {
                    if raw_title[..idx].chars().all(char::is_numeric) || raw_title.starts_with(&format!("{}.", i+1)) {
                        raw_title = raw_title[idx+1..].to_string();
                    }
                }
                
                let desc = item.find_element(".text-justify")
                    .and_then(|el| el.get_inner_text())
                    .unwrap_or_default()
                    .chars().take(150).collect::<String>() + "...";
                
                let date_str = item.find_elements(".media-post li")
                    .ok()
                    .and_then(|list| list.get(0).and_then(|el| el.get_inner_text().ok()))
                    .unwrap_or_default();
                
                if let Some(parsed_date) = parse_indo_date(&date_str) {
                    if !is_older_than_three_months(&parsed_date) {
                        announcements.push(Announcement {
                            id: format!("lepkom-{}", i),
                            date: DateObj {
                                day: format!("{:02}", parsed_date.day()),
                                month: get_indo_month_abbr(parsed_date.month()).to_string(),
                                year: parsed_date.year().to_string(),
                            },
                            title: raw_title.trim().to_string(),
                            description: desc.replace('\n', " "),
                            source: "VM LePKom".to_string(),
                            tags: vec!["VM LePKom".to_string()],
                            link: Some(link),
                        });
                    }
                }
            }
        }
    }
    
    // 2. Materi
    if let Ok(courses) = tab.find_elements(".cours-bx") {
        for (i, course) in courses.iter().enumerate() {
            if let Ok(title_el) = course.find_element("h5 a") {
                let name = title_el.get_inner_text().unwrap_or_default();
                let level = course.find_element(".info-bx span").and_then(|el| el.get_inner_text()).unwrap_or_default();
                
                let mut topics = Vec::new();
                if let Ok(list_items) = course.find_elements(".cours-more-info ol li") {
                    for li in list_items {
                        if let Ok(txt) = li.get_inner_text() {
                            topics.push(txt);
                        }
                    }
                }
                
                materi_list.push(Materi {
                    id: (i + 1).to_string(),
                    name: name.trim().to_string(),
                    level: level.trim().to_string(),
                    topics,
                });
            }
        }
    }
    
    // 3. Kalender
    if let Ok(rows) = tab.find_elements("table.tablesorter tbody tr") {
        for (i, row) in rows.iter().enumerate() {
            if let Ok(cols) = row.find_elements("td") {
                if cols.len() >= 2 {
                    let name = cols[0].get_inner_text().unwrap_or_default();
                    let date = cols[1].get_inner_text().unwrap_or_default();
                    
                    if !name.trim().is_empty() && !date.trim().is_empty() {
                        kalender_list.push(KalenderEvent {
                            id: (i + 1).to_string(),
                            name: name.trim().to_string(),
                            subtitle: "Kalender Akademik".to_string(),
                            date: date.trim().to_string(),
                            locations: "All".to_string(),
                        });
                    }
                }
            }
        }
    }
    
    info!("Berhasil scrape {} pengumuman, {} materi dari VM LePKom", announcements.len(), materi_list.len());
    Ok((announcements, materi_list, kalender_list))
}

#[tokio::main]
async fn main() -> Result<()> {
    // Inisialisasi logger
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info")).init();
    
    info!("Launching headless browser (Rust) dengan eksekusi paralel...");
    
    let browser_opts = LaunchOptions {
        headless: true,
        sandbox: false,
        ..Default::default()
    };
    
    // Wrap browser di Arc agar aman dipakai multi-threading
    let browser = Arc::new(Browser::new(browser_opts).context("Gagal menginisialisasi headless_chrome")?);
    
    // Gunakan tokio spawn_blocking untuk menjalankan scraper secara konkuren (Paralel)
    let browser_clone1 = Arc::clone(&browser);
    let baak_task = task::spawn_blocking(move || {
        scrape_baak(&browser_clone1)
    });
    
    let browser_clone2 = Arc::clone(&browser);
    let lepkom_task = task::spawn_blocking(move || {
        scrape_lepkom(&browser_clone2)
    });
    
    // Tunggu kedua task selesai
    let (baak_result, lepkom_result) = tokio::join!(baak_task, lepkom_task);
    
    let baak_data = baak_result?.unwrap_or_else(|e| {
        error!("Error di BAAK Scraper: {}", e);
        vec![]
    });
    
    let lepkom_data = lepkom_result?.unwrap_or_else(|e| {
        error!("Error di LePKom Scraper: {}", e);
        (vec![], vec![], vec![])
    });
    
    let mut all_announcements = baak_data;
    all_announcements.extend(lepkom_data.0);
    
    // Urutkan (sort) descending berdasarkan tanggal
    all_announcements.sort_by(|a, b| {
        let da = NaiveDate::from_ymd_opt(
            a.date.year.parse().unwrap_or(2026),
            get_indo_month(&a.date.month).unwrap_or(1),
            a.date.day.parse().unwrap_or(1),
        ).unwrap_or_else(|| Utc::now().naive_utc().date());
        
        let db = NaiveDate::from_ymd_opt(
            b.date.year.parse().unwrap_or(2026),
            get_indo_month(&b.date.month).unwrap_or(1),
            b.date.day.parse().unwrap_or(1),
        ).unwrap_or_else(|| Utc::now().naive_utc().date());
        
        db.cmp(&da)
    });
    
    let db = Db {
        announcements: all_announcements,
        materi: lepkom_data.1,
        jadwal: vec![],
        kalender: lepkom_data.2,
        last_updated: Utc::now().to_rfc3339(),
    };
    
    // Penulisan ke JSON
    let cwd = std::env::current_dir().context("Gagal mendapatkan direktori kerja saat ini")?;
    let db_path = if cwd.ends_with("scraper_rs") {
        cwd.parent().unwrap().join("src").join("data").join("db.json")
    } else {
        cwd.join("src").join("data").join("db.json")
    };
    
    if let Some(parent) = db_path.parent() {
        fs::create_dir_all(parent).context("Gagal membuat direktori data")?;
    }
    
    let json_str = serde_json::to_string_pretty(&db).context("Gagal melakukan serialisasi data ke JSON")?;
    fs::write(&db_path, json_str).context("Gagal menyimpan file db.json")?;
    
    info!("Scraping selesai! Data disimpan di {:?}", db_path);
    Ok(())
}
