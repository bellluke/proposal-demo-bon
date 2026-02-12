# 1-3. PDF 다운로드 기능

## 목표
`window.print()`으로 브라우저 PDF 저장 시 A4 크기에 맞게 슬라이드가 한 장씩 출력

## 구현
1. `@media print` CSS 추가 (globals.css)
   - A4 세로 방향 설정
   - 각 슬라이드를 page-break로 분리
   - 상단 바, 인디케이터 숨김 (print:hidden)
   - 배경/그림자 제거, 깔끔한 인쇄용 스타일
2. SlideViewer의 "PDF 다운로드" 버튼 → `window.print()` (이미 구현)
