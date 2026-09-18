use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DateObj {
    pub day: String,
    pub month: String,
    pub year: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Announcement {
    pub id: String,
    pub date: DateObj,
    pub title: String,
    pub description: String,
    pub source: String,
    pub tags: Vec<String>,
    pub link: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Materi {
    pub id: String,
    pub name: String,
    pub level: String,
    pub topics: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct KalenderEvent {
    pub id: String,
    pub name: String,
    pub subtitle: String,
    pub date: String,
    pub locations: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Db {
    pub announcements: Vec<Announcement>,
    pub materi: Vec<Materi>,
    pub jadwal: Vec<String>,
    pub kalender: Vec<KalenderEvent>,
    #[serde(rename = "lastUpdated")]
    pub last_updated: String,
}
