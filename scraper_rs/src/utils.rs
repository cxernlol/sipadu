use chrono::{Datelike, NaiveDate, Utc};

/// Mengonversi nama bulan (Bahasa Indonesia) ke angka 1-12.
pub fn get_indo_month(month: &str) -> Option<u32> {
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

/// Mendapatkan singkatan bulan 3 huruf kapital berdasarkan angka 1-12.
pub fn get_indo_month_abbr(month: u32) -> &'static str {
    match month {
        1 => "JAN", 2 => "FEB", 3 => "MAR", 4 => "APR", 5 => "MEI", 6 => "JUN",
        7 => "JUL", 8 => "AGU", 9 => "SEP", 10 => "OKT", 11 => "NOV", 12 => "DES",
        _ => "JAN"
    }
}

/// Parsing tanggal dari string bahasa Indonesia (contoh: "Kamis, 17 September 2026")
pub fn parse_indo_date(date_str: &str) -> Option<NaiveDate> {
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

/// Mengecek apakah suatu tanggal sudah lebih tua dari 90 hari
pub fn is_older_than_three_months(date: &NaiveDate) -> bool {
    let now = Utc::now().naive_utc().date();
    let duration = now.signed_duration_since(*date);
    duration.num_days() > 90
}
