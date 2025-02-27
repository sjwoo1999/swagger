# Swagger Practice Project

## 프로젝트 개요
Swagger와 Node.js를 연습하기 위한 간단한 API 프로젝트입니다. 이 프로젝트는 `Teamitaka` 백엔드 프로젝트에 Swagger를 안정적으로 적용하기 위해 실습 목적으로 진행됩니다.

## 진행 로그
- 2025-02-27: 프로젝트 초기화, `main` 브랜치 생성 및 Git 초기 설정 완료. `express`, `swagger-ui-express`, `yamljs` 패키지 설치.
- 2025-02-27: 기본 서버 설정(`app.js`)과 Swagger 명세(`swagger.yaml`) 작성, `/hello` 엔드포인트 추가. 로컬에서 `node app.js` 실행 후 `http://localhost:3000/api-docs`에서 Swagger UI 정상 작동 확인.
- 2025-02-27: 포트 충돌 방지를 위한 동적 포트 설정(포트 `3000`, `3001`, `3002`) 구현, `app.js` 업데이트 완료. 테스트 후 포트 `3001`에서 서버 실행 확인.
- 2025-02-27: `/api/register` 엔드포인트 및 Swagger 명세 추가, `dev` → `main` PR 병합 완료.

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