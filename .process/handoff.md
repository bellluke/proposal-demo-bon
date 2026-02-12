# Handoff - 세션 복원용

## 현재 상태: WBS-01 완료 ✅ / WBS-02 완료 ✅

## 해결 완료: PDF 다운로드 ✅

### 해결 방법
- `window.print()` → **html2canvas + jsPDF** 방식으로 전환
- 각 `.slide-page` 요소를 html2canvas로 캡처 → jsPDF로 A4 landscape PDF 생성
- 로딩 상태(Loader2 스피너 + "생성 중…") 표시
- 불필요했던 `@media print` 슬라이드 관련 CSS 제거 (기본 print:hidden만 유지)

### 변경 파일
- `src/components/SlideViewer.tsx` — html2canvas + jsPDF 동적 import, 로딩 UI
- `src/app/globals.css` — 슬라이드 전용 @media print 규칙 제거
- `package.json` — html2canvas, jspdf 의존성 추가

---

## 완료된 작업

### WBS-01: 데모 사이트
- [x] 1-1. Next.js 16.1.6 프로젝트 생성 + Cloudflare Workers 설정
- [x] 1-2. 공통 레이아웃 & 디자인 시스템 (파충류 테마)
- [x] 2-1. 데모 홈 페이지
- [x] 2-2. 스타일 가이드 페이지
- [x] 3-1. 룰렛 페이지 (SVG 휠 + 가중치 랜덤)
- [x] 3-2. 출석체크 페이지 (캘린더 + 연속 출석 보상)
- [x] 4-1. 상품 태깅 페이지 (오늘의집 UX, 좌표 기반 마커)
- [x] 5-1. OpenNext 빌드 성공, Cloudflare Workers 배포 준비 완료

### WBS-02: 제안서 슬라이드
- [x] 1-1. 슬라이드 데이터 구조화 (proposal.md → slides.ts, 10장)
- [x] 1-2. 슬라이드 뷰어 페이지 (scroll-snap, 16:9 가로, 키보드 nav)
- [x] 1-3. PDF 다운로드 (html2canvas + jsPDF)
- [x] 2-1. 최종 통합 (Header/홈 링크 추가, 빌드 검증)

### 추가 수정사항
- "두렙(DooRep)" 브랜드명 제거
- "(B.O.N)" 영문명 제거
- 상품 태깅: 실제 이미지(webp) 적용, 좌표 조정, 팝업 위치 동적 처리
- 이미지 클릭 시 태그 토글 제거
- 슬라이드 3번: 2단계 런칭 "제안 이유" 추가
- 표지에서 "김재웅 대표님" 제거
- docs/slide.md 원고 파일 생성 (사용자 검토 예정)

## 배포 방법
```bash
npm run deploy    # Cloudflare Workers 배포
npm run preview   # 로컬 Workers 런타임 미리보기
```

## 기술 스택
- Next.js 16.1.6 (App Router) + TypeScript
- Tailwind CSS v4 + Lucide React
- @opennextjs/cloudflare 1.16.4 + wrangler 4.65.0

## 프로젝트 구조
```
src/
├── app/
│   ├── layout.tsx              (공통 레이아웃)
│   ├── globals.css             (@media print CSS 포함)
│   ├── page.tsx                (데모 홈)
│   ├── style-guide/page.tsx    (스타일 가이드)
│   ├── roulette/page.tsx       (룰렛)
│   ├── attendance/page.tsx     (출석체크)
│   ├── product-tagging/page.tsx (상품 태깅)
│   └── slides/                 (제안서 슬라이드 — 전체화면)
│       ├── layout.tsx          (.slides-layout fixed overlay)
│       └── page.tsx
├── components/
│   ├── Header.tsx, Footer.tsx
│   ├── Button.tsx, Card.tsx, Badge.tsx
│   ├── RouletteWheel.tsx
│   ├── AttendanceCalendar.tsx
│   ├── ProductTaggingFeed.tsx
│   ├── SlideViewer.tsx         (.slide-outer, .slide-scroll 클래스)
│   └── SlideRenderer.tsx       (6종 레이아웃 렌더러)
├── data/
│   ├── tagging.ts              (상품/피드 데이터)
│   └── slides.ts               (슬라이드 10장 데이터)
docs/
│   ├── proposal.md             (원본 제안서)
│   └── slide.md                (슬라이드 원고 — 사용자 검토 중)
```
