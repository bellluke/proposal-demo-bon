"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        scrollTo(current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        scrollTo(current - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, scrollTo]);

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const slideEls = containerRef.current?.querySelectorAll(".slide-page");
      if (!slideEls || slideEls.length === 0) return;

      // Use first slide to determine aspect ratio
      const firstEl = slideEls[0] as HTMLElement;
      const pdfW = 297;
      const pdfH = pdfW / (firstEl.offsetWidth / firstEl.offsetHeight);

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [pdfW, pdfH] });

      for (let i = 0; i < slideEls.length; i++) {
        const el = slideEls[i] as HTMLElement;

        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);

        if (i > 0) pdf.addPage([pdfW, pdfH], "landscape");
        pdf.addImage(imgData, "JPEG", 0, 0, pdfW, pdfH);
      }

      pdf.save("제안서_주식회사비오엔_파충류커머스.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
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
            disabled={downloading}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {downloading ? "생성 중…" : "PDF 다운로드"}
          </button>
        </div>
      </div>

      {/* Slides container — horizontal scroll */}
      <div
        ref={containerRef}
        className="slide-scroll flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            data-slide-index={i}
            className="flex w-full shrink-0 snap-start snap-always items-center justify-center p-6"
            style={{ minHeight: "calc(100dvh - 48px)" }}
          >
            {/* 16:9 landscape card */}
            <div className="slide-page aspect-[16/9] w-full max-w-[960px] overflow-hidden rounded-lg bg-white shadow-xl">
              <SlideRenderer slide={slide} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom center indicators */}
      <div className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 print:hidden">
        <button
          onClick={() => scrollTo(current - 1)}
          disabled={current === 0}
          className="rounded-full bg-white/80 p-1 shadow transition-colors hover:bg-white disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-1.5">
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
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
