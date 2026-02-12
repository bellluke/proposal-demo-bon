"use client";

import { useState, useEffect, useCallback } from "react";
import { CalendarCheck, RotateCcw, Award, Flame } from "lucide-react";
import Button from "./Button";
import Card from "./Card";
import Badge from "./Badge";

const STORAGE_KEY = "reptile-attendance";
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const milestones = [
  { days: 1, label: "일일 출석", reward: "50P", icon: "🦎" },
  { days: 7, label: "7일 연속", reward: "500P 보너스", icon: "🏆" },
  { days: 14, label: "14일 연속", reward: "10% 할인 쿠폰", icon: "🎫" },
  { days: 30, label: "30일 개근", reward: "무료배송 + 2,000P", icon: "👑" },
];

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);

  return days;
}

function calcStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort().reverse();
  const today = getToday();

  // If not checked in today, check if yesterday is latest
  if (sorted[0] !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];
    if (sorted[0] !== yStr) return 0;
  }

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export default function AttendanceCalendar() {
  const now = new Date();
  const [year] = useState(now.getFullYear());
  const [month] = useState(now.getMonth());
  const [attendedDates, setAttendedDates] = useState<string[]>([]);
  const [justChecked, setJustChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setAttendedDates(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const save = useCallback((dates: string[]) => {
    setAttendedDates(dates);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
  }, []);

  const today = getToday();
  const isCheckedToday = attendedDates.includes(today);
  const streak = calcStreak(attendedDates);
  const calendarDays = getCalendarDays(year, month);

  const checkIn = () => {
    if (isCheckedToday) return;
    const newDates = [...attendedDates, today];
    save(newDates);
    setJustChecked(true);
    setTimeout(() => setJustChecked(false), 1000);
  };

  const reset = () => {
    save([]);
    setJustChecked(false);
  };

  const monthStr = `${year}년 ${month + 1}월`;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      {/* Calendar */}
      <div className="w-full max-w-md">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{monthStr}</h3>
            <Badge variant="primary">
              <Flame size={14} className="mr-1" />
              {streak}일 연속
            </Badge>
          </div>

          {/* Weekday headers */}
          <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-text-secondary">
            {WEEKDAYS.map((d) => (
              <div key={d} className={`py-1 ${d === "일" ? "text-error" : d === "토" ? "text-primary" : ""}`}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={i} />;

              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isToday = dateStr === today;
              const isAttended = attendedDates.includes(dateStr);
              const isFuture = dateStr > today;
              const isJustCheckedToday = isToday && justChecked;

              return (
                <div
                  key={i}
                  className={`relative flex h-11 flex-col items-center justify-center rounded-lg text-sm transition-all ${
                    isToday
                      ? "ring-2 ring-primary"
                      : ""
                  } ${
                    isAttended
                      ? "bg-primary/10 font-semibold text-primary"
                      : isFuture
                      ? "text-text-muted"
                      : "text-text"
                  } ${isJustCheckedToday ? "animate-bounce" : ""}`}
                >
                  <span className="text-xs">{day}</span>
                  {isAttended && (
                    <span className="text-[10px] leading-none">🦎</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Check-in Button */}
        <div className="mt-4 flex gap-3">
          <Button
            onClick={checkIn}
            disabled={isCheckedToday}
            size="lg"
            className="flex-1"
          >
            <CalendarCheck size={18} />
            {isCheckedToday ? "오늘 출석 완료! 🦎" : "출석체크하기"}
          </Button>
          <Button variant="ghost" onClick={reset} size="lg">
            <RotateCcw size={18} />
            리셋
          </Button>
        </div>
      </div>

      {/* Milestones & Stats */}
      <div className="w-full max-w-sm space-y-4">
        <Card>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Award size={20} className="text-accent" />
            연속 출석 보상
          </h3>
          <div className="space-y-3">
            {milestones.map((m) => {
              const achieved = streak >= m.days;
              const progress = Math.min(100, (streak / m.days) * 100);

              return (
                <div
                  key={m.days}
                  className={`rounded-lg p-3 ${
                    achieved
                      ? "bg-primary/10 ring-1 ring-primary/20"
                      : "bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className={achieved ? "font-semibold text-primary" : ""}>
                      {m.icon} {m.label}
                    </span>
                    <span className={`text-xs ${achieved ? "text-primary" : "text-text-secondary"}`}>
                      {m.reward}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-dark">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-[10px] text-text-muted">
                    {Math.min(streak, m.days)}/{m.days}일
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="text-center">
          <p className="text-sm text-text-secondary">이번 달 출석</p>
          <p className="mt-1 text-3xl font-bold text-primary">
            {attendedDates.filter((d) => d.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length}
            <span className="text-lg text-text-muted">일</span>
          </p>
          <p className="mt-1 text-xs text-text-muted">
            누적 포인트: {attendedDates.length * 50}P
          </p>
        </Card>
      </div>
    </div>
  );
}
