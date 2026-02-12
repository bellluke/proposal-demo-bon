# 1-1 계획: Next.js 프로젝트 생성 및 Cloudflare Workers 설정

## 목표
Next.js 15 프로젝트를 생성하고, Cloudflare Workers 배포 환경을 구성하여 로컬에서 빌드가 성공하는 상태까지 만든다.

## 실행 순서

### 1. Next.js 프로젝트 생성
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
- App Router 사용
- TypeScript 활성화
- Tailwind CSS v4 포함
- src/ 디렉토리 구조

### 2. Cloudflare Workers 의존성 설치
```bash
npm install @opennextjs/cloudflare@latest
npm install --save-dev wrangler@latest
```

### 3. 설정 파일 생성

**wrangler.jsonc:**
- main: `.open-next/worker.js`
- name: `doorep-demo`
- compatibility_flags: `nodejs_compat`
- assets 바인딩 설정

**open-next.config.ts:**
- `defineCloudflareConfig` 기본 설정

**.dev.vars:**
- `NEXTJS_ENV=development`

### 4. package.json 스크립트 업데이트
- `preview`: opennextjs-cloudflare build && preview
- `deploy`: opennextjs-cloudflare build && deploy

### 5. .gitignore 업데이트
- `.open-next` 추가

### 6. 검증
- `npm run build` 성공 확인
- 기본 Next.js 페이지 로컬 동작 확인

## 셀프 리뷰

### 체크포인트
- [x] Next.js 15 + App Router + TypeScript 조합 확인
- [x] Tailwind CSS v4가 create-next-app에 포함됨
- [x] @opennextjs/cloudflare 최신 버전 사용
- [x] wrangler 3.99.0+ 필요 확인
- [x] wrangler.jsonc 설정이 OpenNext 문서와 일치

### 리스크
- create-next-app 최신 버전이 Tailwind v4를 기본 포함하는지 확인 필요
- turbopack과 OpenNext 호환성 확인 필요

### 수정사항
- 없음. 계획대로 진행.
