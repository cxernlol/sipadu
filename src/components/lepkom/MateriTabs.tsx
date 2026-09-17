"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimateIn } from "@/components/AnimateIn";

interface MateriItem {
  id: string;
  name: string;
  level: string;
  topics: string[];
}

export function MateriTabs({ materi }: { materi: MateriItem[] }) {
  // Extract unique levels and sort them if necessary
  const levels = Array.from(new Set(materi.map((m) => m.level))).sort();

  return (
    <Tabs defaultValue={levels[0]} className="w-full mt-6">
      <TabsList className="mb-6 flex flex-wrap h-auto bg-slate-100/50 p-1 justify-start gap-1 max-w-full">
        {levels.map((level) => (
          <TabsTrigger
            key={level}
            value={level}
            className="rounded-full px-4 py-1.5 text-xs font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
          >
            {level}
          </TabsTrigger>
        ))}
      </TabsList>

      {levels.map((level) => (
        <TabsContent key={level} value={level} className="outline-none">
          <AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materi
                .filter((item) => item.level === level)
                .map((item) => (
                  <Card key={item.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        {item.name.toLowerCase().includes("web") || item.name.toLowerCase().includes("jaringan") ? (
                          <i className="fa-solid fa-globe text-xl"></i>
                        ) : (
                          <i className="fa-solid fa-database text-xl"></i>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <div className="text-xs font-semibold text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">
                          {item.level}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {item.topics.map((topic, idx) => (
                          <li key={idx} className="text-sm text-slate-500 flex items-start gap-2">
                            <span className="text-blue-600 font-bold leading-tight">&bull;</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </AnimateIn>
        </TabsContent>
      ))}
    </Tabs>
  );
}
