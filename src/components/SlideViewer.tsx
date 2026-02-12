"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, ChevronUp, ChevronDown } from "lucide-react";
import { slides } from "@/data/slides";
import SlideRenderer from "./SlideRenderer";

export default function SlideViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  // Track current slide via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.slideIndex
            );
            if (!isNaN(index)) setCurrent(index);
          }
        }
      },
      { root: container, threshold: 0.6 }
    );

    const slideEls = container.querySelectorAll("[data-slide-index]");
    slideEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  const scrollTo = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const clamped = Math.max(0, Math.min(index, slides.length - 1));
      const target = container.querySelector(
        `[data-slide-index="${clamped}"]`
      );
      target?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollTo(current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollTo(current - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, scrollTo]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="slide-outer relative flex h-[100dvh] flex-col bg-[#e8e8e8]">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm print:hidden">
        <h1 className="text-sm font-semibold text-text">제안서 슬라이드</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-secondary">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark"
          >
            <Download size={14} />
            PDF 다운로드
          </button>
        </div>
      </div>

      {/* Slides container */}
      <div
        ref={containerRef}
        className="slide-scroll flex-1 snap-y snap-mandatory overflow-y-auto scroll-smooth"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            data-slide-index={i}
            className="flex snap-start snap-always items-center justify-center p-6"
            style={{ minHeight: "calc(100dvh - 48px)" }}
          >
            {/* 16:9 landscape card */}
            <div className="slide-page aspect-[16/9] w-full max-w-[960px] overflow-hidden rounded-lg bg-white shadow-xl">
              <SlideRenderer slide={slide} />
            </div>
          </div>
        ))}
      </div>

      {/* Side nav indicators */}
      <div className="fixed right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-2 print:hidden">
        <button
          onClick={() => scrollTo(current - 1)}
          disabled={current === 0}
          className="rounded-full bg-white/80 p-1 shadow transition-colors hover:bg-white disabled:opacity-30"
        >
          <ChevronUp size={16} />
        </button>
        <div className="flex flex-col gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === current
                  ? "scale-125 bg-primary"
                  : "bg-text/20 hover:bg-text/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => scrollTo(current + 1)}
          disabled={current === slides.length - 1}
          className="rounded-full bg-white/80 p-1 shadow transition-colors hover:bg-white disabled:opacity-30"
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}
