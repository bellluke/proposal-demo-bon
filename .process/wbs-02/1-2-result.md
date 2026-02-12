# 1-2 결과: 슬라이드 뷰어 페이지 구현

## 산출물
- `src/app/slides/page.tsx` — 슬라이드 라우트
- `src/app/slides/layout.tsx` — 전체화면 레이아웃 (Header/Footer 위 오버레이)
- `src/components/SlideViewer.tsx` — 뷰어 (scroll-snap, 인디케이터, 키보드 nav)
- `src/components/SlideRenderer.tsx` — 6종 레이아웃 렌더러

## 구현 사항
- A4 비율 (210:297) 카드 레이아웃
- CSS scroll-snap-type: y mandatory
- IntersectionObserver 기반 현재 슬라이드 추적
- 키보드 네비게이션 (↑↓, PageUp/PageDown)
- 우측 도트 인디케이터 + 화살표 버튼
- 상단 바: 제목, 현재/전체 페이지, PDF 다운로드 버튼
- fixed 레이아웃으로 Header/Footer 위에 오버레이

## 빌드 검증
- `npm run build` ✅ 성공
- `/slides` 라우트 정상 생성
