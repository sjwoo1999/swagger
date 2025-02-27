# Swagger Practice Project

## 프로젝트 개요
Swagger와 Node.js를 연습하기 위한 간단한 API 프로젝트입니다. 이 프로젝트는 `Teamitaka` 백엔드 프로젝트에 Swagger를 안정적으로 적용하기 위해 실습 목적으로 진행됩니다.

## 진행 로그
- 2025-02-27: 프로젝트 초기화, `main` 브랜치 생성 및 Git 초기 설정 완료. `express`, `swagger-ui-express`, `yamljs` 패키지 설치.
- 2025-02-27: 기본 서버 설정(`app.js`)과 Swagger 명세(`swagger.yaml`) 작성, `/hello` 엔드포인트 추가. 로컬에서 `node app.js` 실행 후 `http://localhost:3000/api-docs`에서 Swagger UI 정상 작동 확인.
- 2025-02-27: 포트 충돌 방지를 위한 동적 포트 설정(포트 `3000`, `3001`, `3002`) 구현, `app.js` 업데이트 완료. 테스트 후 포트 `3001`에서 서버 실행 확인.
- 2025-02-27: `/api/register` 엔드포인트 및 Swagger 명세 추가.
- 2025-02-27: `Failed to fetch` 오류 해결 (CORS 설정 강화 및 포트 불일치 수정), Swagger UI 테스트 완료. `/` → `200 OK`, `{"message": "Welcome to Swagger Practice API! Visit /api-docs for Swagger UI."}`; `/hello?name=history` → `200 OK`, `{"message": "Hello, history!"}`; `/api/register` → `201 Created`, 사용자 객체 반환.
- 2025-02-27: `teamitakaBackend`의 라우터 기반 실습 진행. `/api/health`와 `/api/users` 엔드포인트 추가, Swagger UI 테스트 완료. `/api/health` → `200 OK`, `{"status": "OK", "message": "서버가 정상적으로 실행 중입니다!"}`; `/api/users` → `200 OK`, 모의 사용자 목록 반환.
- 2025-02-27: 모든 엔드포인트(`/`, `/hello`, `/api/register`, `/api/health`, `/api/users`)에 대한 Swagger UI 테스트 완료. `/` → `200 OK`, `{"message": "Welcome to Swagger Practice API!..."}`; `/hello?name=하이하이요` → `200 OK`, `{"message": "Hello, 하이하이요!"}`; `/api/register` → `201 Created`, `{"message": "✅ 회원가입 성공!", "user": {...}}`; `/api/health` → `200 OK`, `{"status": "OK", "message": "서버가 정상적으로 실행 중입니다!"}`; `/api/users` → `200 OK`, `[{"id":1,"name":"홍길동","email":"hong@example.com"},{"id":2,"name":"김영희","email":"kim@example.com"}]`.
- 2025-02-27: `teamitakaBackend` 라우터 기반으로 추가 엔드포인트 구현. `/api/auth/register`, `/api/auth/login`, `/api/admin/login`, `/api/recruitment`, `/api/projects`, `/api/profiles`, `/api/comments`, `/api/scraps`, `/api/search`, `/api/univcert` 추가. Swagger UI 및 `curl`로 테스트 완료. `/api/auth/register` → `201 Created`, 사용자 객체 반환; `/api/auth/login` → `200 OK`, `{"message":"✅ 로그인 성공!","token":"mock-token"}`; `/api/admin/login` → `200 OK`, `{"token":"mock-admin-token","message":"관리자 로그인 성공"}`; `/api/recruitment` → `200 OK`, 모의 모집공고 목록 반환.

## 사용 방법
1. `npm install` 실행
2. `node app.js`로 서버 실행
3. `http://localhost:<port>/api-docs`에서 Swagger UI 확인 (포트는 사용 가능한 포트로 자동 설정됨)

## 기술 스택
- Node.js (v20.18.3)
- Express.js
- Swagger UI (via `swagger-ui-express`)
- YAML (via `yamljs`)
- Git