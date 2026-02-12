# 1-3 결과: PDF 다운로드 기능

## 산출물
- `src/app/globals.css` — @media print 스타일 추가

## 구현 사항
- `@page` A4 portrait, margin 0
- `print-color-adjust: exact` — 배경색 인쇄 보장
- Header, Footer, 인디케이터 숨김
- 슬라이드 컨테이너 position: static 전환
- 각 `.slide-page`를 210mm x 297mm 고정, page-break-after: always
- 그림자/둥근모서리 제거
- "PDF 다운로드" 버튼 → window.print() (SlideViewer에서 구현 완료)

## 빌드 검증
- `npm run build` ✅ 성공
