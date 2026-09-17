"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", gunadarma: 120, ui: 10, ugm: 5, itb: 0, ub: 0 },
  { month: "Feb", gunadarma: 180, ui: 20, ugm: 10, itb: 0, ub: 0 },
  { month: "Mar", gunadarma: 230, ui: 45, ugm: 25, itb: 15, ub: 5 },
  { month: "Apr", gunadarma: 310, ui: 85, ugm: 40, itb: 25, ub: 15 },
  { month: "May", gunadarma: 480, ui: 150, ugm: 95, itb: 50, ub: 30 },
  { month: "Jun", gunadarma: 620, ui: 240, ugm: 180, itb: 110, ub: 80 },
];

const chartConfig = {
  gunadarma: {
    label: "Gunadarma",
    color: "hsl(270, 70%, 60%)",
  },
  ui: {
    label: "UI",
    color: "hsl(45, 90%, 55%)",
  },
  ugm: {
    label: "UGM",
    color: "hsl(220, 80%, 60%)",
  },
  itb: {
    label: "ITB",
    color: "hsl(175, 70%, 50%)",
  },
  ub: {
    label: "UB",
    color: "hsl(25, 90%, 60%)",
  },
} satisfies ChartConfig;

export function UpdatesChart() {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Total Updates Delivered</CardTitle>
        <CardDescription className="text-slate-500 dark:text-white/30">
          Tracking announcements, schedules, and materials — Jan to Jun 2026
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/[0.06]" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              className="text-slate-500 dark:text-white/30 text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-slate-500 dark:text-white/30 text-xs"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="gunadarma"
              type="monotone"
              stroke="var(--color-gunadarma)"
              strokeWidth={3}
              dot={false}
            />
            <Line
              dataKey="ui"
              type="monotone"
              stroke="var(--color-ui)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              dataKey="ugm"
              type="monotone"
              stroke="var(--color-ugm)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              dataKey="itb"
              type="monotone"
              stroke="var(--color-itb)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              dataKey="ub"
              type="monotone"
              stroke="var(--color-ub)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none text-slate-700 dark:text-white/60">
              Pertumbuhan data naik 52% bulan ini <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-center gap-2 leading-none text-slate-500 dark:text-white/25">
              Sistem telah mendeliver lebih dari 1.000 update real-time ke ribuan mahasiswa.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
