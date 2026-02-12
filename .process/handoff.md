# Handoff - 세션 복원용

## 현재 상태: WBS-01 완료 ✅ / WBS-02 진행 중 ⚠️

## 미해결 이슈: PDF 다운로드 시 1장만 출력됨

### 문제
- `/slides` 페이지에서 "PDF 다운로드" 버튼(window.print()) 클릭 시 첫 슬라이드 1장만 PDF에 포함됨
- 상단 여백도 잘림

### 원인 분석
- `SlideViewer.tsx`의 DOM 구조가 print 시 콘텐츠를 잘라냄:
  1. `.slides-layout` (fixed inset-0) — slides/layout.tsx
  2. `.slide-outer` (h-[100dvh] flex flex-col) — 뷰어 최외곽
  3. `.slide-scroll` (flex-1 overflow-y-auto snap-y) — 스크롤 컨테이너
  4. `[data-slide-index]` (minHeight: calc(100dvh - 48px)) — 슬라이드 래퍼
  5. `.slide-page` (aspect-[16/9]) — 실제 슬라이드 카드
- @media print CSS로 position/overflow/height를 해제하는 방식을 시도했으나 불충분
- `.slides-layout *` 와일드카드 → 내부 flex 레이아웃 깨짐
- 개별 클래스 타겟팅 (.slide-outer, .slide-scroll) → 여전히 1장만 출력

### 제안하는 해결 방향
1. **window.print() 포기, html2canvas + jsPDF 사용**: 각 슬라이드를 캔버스로 캡처 후 PDF 생성
2. **별도 print 전용 페이지**: `/slides/print` 라우트를 만들어 scroll-snap 없이 슬라이드를 단순 나열, 거기서 print
3. **iframe 방식**: 숨겨진 iframe에 print-friendly HTML을 주입 후 iframe.contentWindow.print()

### 현재 파일 상태
- `src/app/globals.css` — @media print CSS 있음 (아직 동작 안 함)
- `src/components/SlideViewer.tsx` — .slide-outer, .slide-scroll 클래스 추가됨
- `src/app/slides/layout.tsx` — .slides-layout 클래스
- `docs/slide.md` — 슬라이드 원고 (사용자 검토용, 일자 2026년으로 수정됨)

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
- [ ] **1-3. PDF 다운로드 — 미해결** ⚠️
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
