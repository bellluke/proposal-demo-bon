# 5-1 계획: 최종 통합 및 Cloudflare Workers 배포

## 목표
전체 페이지 통합 확인 및 OpenNext 빌드를 통한 Cloudflare Workers 배포 준비.

## 실행 순서

### 1. 전체 페이지 라우트 확인
- 5개 라우트 모두 빌드 성공 확인 (이미 완료)

### 2. Git 초기화 및 정리
- `git init`
- 불필요한 파일 제외 확인 (.gitignore)
- 초기 커밋

### 3. OpenNext 빌드 검증
```bash
npm run preview
```
- .open-next 디렉토리 생성 확인
- 로컬 Workers 런타임에서 동작 확인

### 4. Cloudflare 배포 (선택)
- Cloudflare 계정 연결 여부에 따라 배포 진행 또는 배포 준비 완료 상태로 마무리

## 셀프 리뷰
- [x] 전체 빌드 이미 성공 확인
- [x] OpenNext 빌드 검증 필요
- 배포는 Cloudflare 계정 필요 → 로컬 빌드 검증까지만 진행 후 사용자 확인
