use anyhow::Result;
use headless_chrome::{Browser, LaunchOptions};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use chrono::{Datelike, NaiveDate, Utc};
use std::collections::HashMap;
use std::time::Duration;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct DateObj {
    day: String,
    month: String,
    year: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Announcement {
    id: String,
    date: DateObj,
    title: String,
    description: String,
    source: String,
    tags: Vec<String>,
    link: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Materi {
    id: String,
    name: String,
    level: String,
    topics: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct KalenderEvent {
    id: String,
    name: String,
    subtitle: String,
    date: String,
    locations: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Db {
    announcements: Vec<Announcement>,
    materi: Vec<Materi>,
    jadwal: Vec<String>, // Kosong (dikosongkan per script asli)
    kalender: Vec<KalenderEvent>,
    #[serde(rename = "lastUpdated")]
    last_updated: String,
}

// Map nama bulan Indo ke nomor bulan (1-indexed)
fn get_indo_month(month: &str) -> Option<u32> {
    match month.to_lowercase().as_str() {
        "januari" => Some(1),
        "februari" => Some(2),
        "maret" => Some(3),
        "april" => Some(4),
        "mei" => Some(5),
        "juni" => Some(6),
        "juli" => Some(7),
        "agustus" => Some(8),
        "september" => Some(9),
        "oktober" => Some(10),
        "november" => Some(11),
        "desember" => Some(12),
        _ => None,
    }
}

fn parse_indo_date(date_str: &str) -> Option<NaiveDate> {
    // Format: "Kamis, 17 September 2026" atau "17 September 2026"
    let parts: Vec<&str> = date_str.split(',').collect();
    let date_part = if parts.len() >= 2 {
        parts[1].trim()
    } else {
        parts[0].trim()
    };
    
    let comp: Vec<&str> = date_part.split_whitespace().collect();
    if comp.len() >= 3 {
        let day: u32 = comp[0].parse().ok()?;
        let month = get_indo_month(comp[1])?;
        let year: i32 = comp[2].parse().ok()?;
        return NaiveDate::from_ymd_opt(year, month, day);
    }
    None
}

fn is_older_than_three_months(date: &NaiveDate) -> bool {
    let now = Utc::now().naive_utc().date();
    // Kira-kira 90 hari
    let duration = now.signed_duration_since(*date);
    duration.num_days() > 90
}

fn scrape_baak(browser: &Browser) -> Result<Vec<Announcement>> {
    println!("Scraping BAAK...");
    let tab = browser.new_tab()?;
    // Timeout lebih panjang untuk melewati WAF Cloudflare
    tab.navigate_to("https://baak.gunadarma.ac.id/")?;
    tab.wait_until_navigated()?;
    
    // Tunggu selektor muncul (atau WAF selesai)
    tab.wait_for_element(".trow")?;
    
    let mut announcements = Vec::new();
    let rows = tab.find_elements(".trow")?;
    
    for (i, row) in rows.iter().enumerate() {
        let title_el = row.find_element(".title a");
        if title_el.is_err() { continue; }
        let title_el = title_el.unwrap();
        
        let title = title_el.get_inner_text()?;
        let link = title_el.get_attribute_value("href")?.unwrap_or_default();
        
        let mut date_str = "Kamis, 17 September 2026".to_string(); // Fallback
        if let Ok(span) = row.find_element("span") {
            date_str = span.get_inner_text()?;
        }
        
        let description = row.get_inner_text()?.chars().take(150).collect::<String>() + "...";
        
        let parsed_date = parse_indo_date(&date_str).unwrap_or_else(|| Utc::now().naive_utc().date());
        
        if !is_older_than_three_months(&parsed_date) {
            let month_abbr = match parsed_date.month() {
                1 => "JAN", 2 => "FEB", 3 => "MAR", 4 => "APR", 5 => "MEI", 6 => "JUN",
                7 => "JUL", 8 => "AGU", 9 => "SEP", 10 => "OKT", 11 => "NOV", 12 => "DES",
                _ => "JAN"
            };
            
            announcements.push(Announcement {
                id: format!("baak-{}", i),
                date: DateObj {
                    day: format!("{:02}", parsed_date.day()),
                    month: month_abbr.to_string(),
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
    
    Ok(announcements)
}

fn scrape_lepkom(browser: &Browser) -> Result<(Vec<Announcement>, Vec<Materi>, Vec<KalenderEvent>)> {
    println!("Scraping VM LePKom...");
    let tab = browser.new_tab()?;
    tab.navigate_to("https://vm.lepkom.gunadarma.ac.id/")?;
    tab.wait_until_navigated()?;
    
    std::thread::sleep(Duration::from_secs(2)); // Beri waktu transisi jika ada WAF
    
    let mut announcements = Vec::new();
    let mut materi_list = Vec::new();
    let mut kalender_list = Vec::new();
    
    // 1. Pengumuman
    if let Ok(news_items) = tab.find_elements(".recent-news") {
        for (i, item) in news_items.iter().enumerate() {
            if let Ok(title_el) = item.find_element("h6 a") {
                let mut raw_title = title_el.get_inner_text()?;
                let link = title_el.get_attribute_value("href")?.unwrap_or_default();
                
                // Hapus angka di depan judul (misal "1. ")
                if let Some(idx) = raw_title.find(' ') {
                    if raw_title[..idx].chars().all(char::is_numeric) || raw_title.starts_with(&format!("{}.", i+1)) {
                        raw_title = raw_title[idx+1..].to_string();
                    }
                }
                
                let mut desc = "".to_string();
                if let Ok(desc_el) = item.find_element(".text-justify") {
                    desc = desc_el.get_inner_text()?.chars().take(150).collect::<String>() + "...";
                }
                
                let mut date_str = "".to_string();
                if let Ok(media_post) = item.find_elements(".media-post li") {
                    if !media_post.is_empty() {
                        date_str = media_post[0].get_inner_text()?;
                    }
                }
                
                if let Some(parsed_date) = parse_indo_date(&date_str) {
                    if !is_older_than_three_months(&parsed_date) {
                        let month_abbr = match parsed_date.month() {
                            1 => "JAN", 2 => "FEB", 3 => "MAR", 4 => "APR", 5 => "MEI", 6 => "JUN",
                            7 => "JUL", 8 => "AGU", 9 => "SEP", 10 => "OKT", 11 => "NOV", 12 => "DES",
                            _ => "JAN"
                        };
                        
                        announcements.push(Announcement {
                            id: format!("lepkom-{}", i),
                            date: DateObj {
                                day: format!("{:02}", parsed_date.day()),
                                month: month_abbr.to_string(),
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
                let name = title_el.get_inner_text()?;
                
                let mut level = "".to_string();
                if let Ok(lvl_el) = course.find_element(".info-bx span") {
                    level = lvl_el.get_inner_text()?;
                }
                
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
                    let name = cols[0].get_inner_text()?;
                    let date = cols[1].get_inner_text()?;
                    
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
    
    Ok((announcements, materi_list, kalender_list))
}

#[tokio::main]
async fn main() -> Result<()> {
    println!("Launching headless browser (Rust)...");
    
    let browser_opts = LaunchOptions {
        headless: true,
        sandbox: false,
        ..Default::default()
    };
    
    let browser = Browser::new(browser_opts)?;
    
    let baak = scrape_baak(&browser).unwrap_or_default();
    let lepkom = scrape_lepkom(&browser).unwrap_or_default();
    
    let mut all_announcements = baak;
    all_announcements.extend(lepkom.0);
    
    // Sort descending by date
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
        materi: lepkom.1,
        jadwal: vec![],
        kalender: lepkom.2,
        last_updated: Utc::now().to_rfc3339(),
    };
    
    // Tulis ke src/data/db.json
    let cwd = std::env::current_dir()?;
    // Memperhitungkan kemungkinan kita me-run nya dari dalam /scraper_rs atau root /
    let db_path = if cwd.ends_with("scraper_rs") {
        cwd.parent().unwrap().join("src").join("data").join("db.json")
    } else {
        cwd.join("src").join("data").join("db.json")
    };
    
    if let Some(parent) = db_path.parent() {
        fs::create_dir_all(parent)?;
    }
    
    let json_str = serde_json::to_string_pretty(&db)?;
    fs::write(&db_path, json_str)?;
    
    println!("Scraping complete! Saved to {:?}", db_path);
    Ok(())
}
