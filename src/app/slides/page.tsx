import type { Metadata } from "next";
import SlideViewer from "@/components/SlideViewer";

export const metadata: Metadata = {
  title: "제안서 슬라이드 — 파충류 커뮤니티 커머스",
};

export default function SlidesPage() {
  return <SlideViewer />;
}
