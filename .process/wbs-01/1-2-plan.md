# 1-2 계획: 공통 레이아웃 & 디자인 시스템 구성

## 목표
파충류 테마 디자인 시스템과 공통 레이아웃을 구성하여 모든 페이지에서 일관된 UI를 제공한다.

## 실행 순서

### 1. Lucide React 아이콘 라이브러리 설치
```bash
npm install lucide-react
```

### 2. globals.css - 디자인 토큰 정의
Tailwind CSS v4 `@theme` 블록에 커스텀 컬러/폰트 정의:
- Jungle Green, Leaf Green, Terracotta, Sand, Gecko Gold 등 전체 팔레트
- Pretendard (CDN), Inter (next/font/google) 폰트

### 3. 공통 레이아웃 (layout.tsx)
- `<html lang="ko">` 설정
- Pretendard + Inter 폰트 로딩
- Header: 두렙 로고 + 네비게이션 (5개 페이지 링크)
- Footer: 간단한 푸터 (에이나 데모 표시)
- 모바일 햄버거 메뉴

### 4. 기본 UI 컴포넌트 (src/components/)
- `Button.tsx` - Primary/Secondary/Ghost 변형
- `Card.tsx` - 기본 카드 컨테이너
- `Badge.tsx` - 태그/라벨 표시
- `Header.tsx` - 공통 헤더 (네비게이션 포함)
- `Footer.tsx` - 공통 푸터

### 5. 라우트 구조 생성
```
src/app/
├── page.tsx                    (데모 홈)
├── layout.tsx                  (공통 레이아웃)
├── style-guide/page.tsx        (스타일 가이드)
├── roulette/page.tsx           (룰렛)
├── attendance/page.tsx         (출석체크)
└── product-tagging/page.tsx    (상품 태깅)
```

### 6. 빌드 검증

## 셀프 리뷰

### 체크포인트
- [x] Tailwind v4에서 @theme 블록으로 커스텀 색상 정의 방식 확인
- [x] Pretendard CDN + next/font 조합 확인
- [x] 5개 페이지 라우트 구조 확인
- [x] 모바일 반응형 네비게이션 포함

### 수정사항
- Pretendard는 CDN link로 로드 (next/font에 미포함이므로)
- Inter는 next/font/google 사용
