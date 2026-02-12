# 1-2. 슬라이드 뷰어 페이지 구현

## 목표
브라우저에서 세로 스크롤로 한 페이지씩 넘기며 슬라이드를 볼 수 있는 뷰어 구현

## 산출물
- `src/app/slides/page.tsx` — 슬라이드 라우트
- `src/components/SlideViewer.tsx` — 뷰어 컴포넌트
- `src/components/SlideRenderer.tsx` — 레이아웃별 렌더러

## 핵심 구현
1. **A4 비율 카드**: 210:297 비율의 슬라이드 카드
2. **세로 스크롤 스냅**: `scroll-snap-type: y mandatory`
3. **레이아웃별 렌더링**: cover, bullets, table, split, timeline, closing
4. **슬라이드 인디케이터**: 현재 페이지 / 전체 페이지
5. **키보드 네비게이션**: ↑↓, PageUp/PageDown
6. **디자인 시스템 활용**: 기존 컬러·폰트 일관성 유지
