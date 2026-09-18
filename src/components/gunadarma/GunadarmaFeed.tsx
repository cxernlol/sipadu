"use client";

import { useState } from "react";
import { Announcement } from "@/lib/scraper";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimateIn } from "@/components/AnimateIn";

interface GunadarmaFeedProps {
  announcements: Announcement[];
}

export function GunadarmaFeed({ announcements }: GunadarmaFeedProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Extract all unique tags across all announcements
  const allTags = Array.from(
    new Set(announcements.flatMap((a) => a.tags || []))
  ).sort();

  // Filter announcements based on selected tags
  // If no tags selected, show all
  const filteredAnnouncements = announcements.filter((a) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some((tag) => a.tags?.includes(tag));
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="w-full">
      {/* Tag Filter Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-slate-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-filter text-slate-400 dark:text-zinc-500"></i> Filter Sumber
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    : "bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            );
          })}
          {selectedTags.length > 0 && (
            <Badge
              variant="ghost"
              className="cursor-pointer px-4 py-1.5 rounded-full text-xs font-medium text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
              onClick={() => setSelectedTags([])}
            >
              Clear Filters
            </Badge>
          )}
        </div>
      </div>

      {/* Feed List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement, idx) => (
            <AnimateIn key={announcement.id} delay={idx * 0.05}>
              <div
                onClick={() => setSelectedAnnouncement(announcement)}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 text-xs font-bold px-3 py-2 rounded-lg text-center leading-none">
                    <span className="block text-lg text-slate-800 dark:text-zinc-200 mb-0.5">{announcement.date.day}</span>
                    {announcement.date.month}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {announcement.tags?.map((tag) => (
                      <span key={tag} className="text-[9px] uppercase font-bold tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="font-semibold text-slate-900 dark:text-zinc-50 mb-3 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {announcement.title}
                </h3>
                
                <p className="text-slate-500 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed flex-1">
                  {announcement.description}
                </p>
                
                <div className="mt-6 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Baca selengkapnya <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
              </div>
            </AnimateIn>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
            <i className="fa-solid fa-folder-open text-4xl text-slate-300 dark:text-zinc-700 mb-4 block mx-auto"></i>
            Tidak ada pengumuman yang sesuai dengan filter.
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <Dialog
        open={!!selectedAnnouncement}
        onOpenChange={(open) => !open && setSelectedAnnouncement(null)}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto dark:bg-zinc-950 dark:border-zinc-800">
          <DialogHeader className="mb-4">
            <div className="flex gap-2 mb-4">
              {selectedAnnouncement?.tags?.map((tag) => (
                <span key={tag} className="text-[10px] uppercase font-bold tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <DialogTitle className="text-2xl leading-tight font-serif text-slate-900 dark:text-zinc-50">
              {selectedAnnouncement?.title}
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-400 dark:text-zinc-500 mt-2">
              {selectedAnnouncement?.date.day} {selectedAnnouncement?.date.month} {selectedAnnouncement?.date.year} &bull; Sumber: {selectedAnnouncement?.source}
            </DialogDescription>
          </DialogHeader>
          <div className="text-slate-600 dark:text-zinc-300 leading-relaxed space-y-4">
            <p>{selectedAnnouncement?.description}</p>
          </div>
          {selectedAnnouncement?.link && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800">
              <a
                href={selectedAnnouncement.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Lihat di {selectedAnnouncement.source} <i className="fa-solid fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
