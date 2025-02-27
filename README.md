# 🎉 Swagger Practice Project

## 📋 프로젝트 개요
**Swagger**와 **Node.js**를 활용해 API 개발을 연습하는 간단한 프로젝트입니다.  
이 프로젝트는 `Teamitaka` 백엔드 프로젝트에 Swagger를 안정적으로 적용하기 위한 실습 목적으로 진행됩니다. 🎯

---

## 📅 진행 로그

- **2025-02-27** 🛠️  
  프로젝트 초기화, `main` 브랜치 생성 및 Git 초기 설정 완료.  
  `express`, `swagger-ui-express`, `yamljs` 패키지를 설치했습니다.

- **2025-02-27** ⚙️  
  기본 서버 설정(`app.js`)과 Swagger 명세(`swagger.yaml`)를 작성했습니다.  
  `/hello` 엔드포인트를 추가하고, 로컬에서 `node app.js` 실행 후 `http://localhost:3000/api-docs`에서 Swagger UI 정상 작동을 확인했습니다. ✅

- **2025-02-27** 🔒  
  포트 충돌 방지를 위해 동적 포트 설정(포트 `3000`, `3001`, `3002`)을 구현하고, `app.js`를 업데이트했습니다.  
  테스트 후 포트 `3001`에서 서버 실행을 확인했습니다.

- **2025-02-27** 👤  
  `/api/register` 엔드포인트와 Swagger 명세를 추가했습니다.

- **2025-02-27** 🐞  
  `Failed to fetch` 오류를 해결했습니다 (CORS 설정 강화 및 포트 불일치 수정).  
  Swagger UI 테스트 완료:  
  - `/` → `200 OK`, `{"message": "Welcome to Swagger Practice API! Visit /api-docs for Swagger UI."}`  
  - `/hello?name=history` → `200 OK`, `{"message": "Hello, history!"}`  
  - `/api/register` → `201 Created`, 사용자 객체 반환

- **2025-02-27** 🏥  
  `teamitakaBackend`의 라우터 기반 실습을 진행했습니다.  
  `/api/health`와 `/api/users` 엔드포인트를 추가하고, Swagger UI 테스트 완료:  
  - `/api/health` → `200 OK`, `{"status": "OK", "message": "서버가 정상적으로 실행 중입니다!"}`  
  - `/api/users` → `200 OK`, `[{"id":1,"name":"홍길동","email":"hong@example.com"},{"id":2,"name":"김영희","email":"kim@example.com"}]`

- **2025-02-27** ✅  
  모든 엔드포인트(`/`, `/hello`, `/api/register`, `/api/health`, `/api/users`)에 대한 Swagger UI 테스트를 완료했습니다:  
  - `/` → `200 OK`, `{"message": "Welcome to Swagger Practice API!..."}`  
  - `/hello?name=하이하이요` → `200 OK`, `{"message": "Hello, 하이하이요!"}`  
  - `/api/register` → `201 Created`, `{"message": "✅ 회원가입 성공!", "user": {...}}`  
  - `/api/health` → `200 OK`, `{"status": "OK", "message": "서버가 정상적으로 실행 중입니다!"}`  
  - `/api/users` → `200 OK`, `[{"id":1,"name":"홍길동","email":"hong@example.com"},{"id":2,"name":"김영희","email":"kim@example.com"}]`

- **2025-02-27** 🚀  
  `teamitakaBackend` 라우터를 기반으로 추가 엔드포인트를 구현했습니다:  
  - `/api/auth/register`, `/api/auth/login`, `/api/admin/login`, `/api/recruitment`, `/api/projects`, `/api/profiles`, `/api/comments`, `/api/scraps`, `/api/search`, `/api/univcert` 추가.  
  - Swagger UI 및 `curl`로 테스트 완료:  
    - `/api/auth/register` → `201 Created`, 사용자 객체 반환  
    - `/api/auth/login` → `200 OK`, `{"message":"✅ 로그인 성공!","token":"mock-token"}`  
    - `/api/admin/login` → `200 OK`, `{"token":"mock-admin-token","message":"관리자 로그인 성공"}`  
    - `/api/recruitment` → `200 OK`, 모의 모집공고 목록 반환

- **2025-02-27** 🔧  
  `/api/register`의 404 오류와 `/api/projects/completed`의 404 오류 해결.  
  `swagger.yaml`에서 `/api/register` 경로를 `/api/auth/register`로 수정, `projectController.js`에서 `mockProjects`에 `status: "완료"` 프로젝트 추가.  
  테스트 완료: `/api/auth/register` → `201 Created`, 사용자 객체 반환; `/api/projects/completed` → `200 OK`, `[{"project_id":2,"project_name":"프로젝트 B","description":"완료된 프로젝트","status":"완료"}]`.

- **2025-02-27** 🚨  
  새로운 기능 추가, `/api/recruitments/{recruitment_id}/comment`에 욕설 필터링 구현.  
  부적절한 단어(`bad`, `ugly`, `mean`) 필터링, Swagger UI 테스트 완료.  
  정상 댓글 → `201 Created`, 부적절한 댓글 → `400 Bad Request`, `{"error":"댓글에 부적절한 언어가 포함되었습니다."}`.

---

## 🛠️ 사용 방법

### 1. **의존성 설치**  
프로젝트 실행을 위해 필요한 패키지를 설치합니다. 아래 명령어를 실행하세요:  
```bash
npm install
```

### 2. **서버 실행**
서버를 구동하기 위해 다음 명령어를 실행합니다:
```bash
node app.js
```

### 3. **Swagger UI 확인**
서버 실행 후, 브라우저에서 Swagger UI에 접속하여 API를 테스트할 수 있습니다:

- **URL**: `http://localhost:3000/api-docs`
- **포트 정보**: 포트는 사용 가능한 포트로 자동 설정됩니다 (예: `3000`, `3001`, `3002`)

---

## 🧰 기술 스택

- **Node.js (v20.18.3)** 🟢  
- **Express.js** 🖥️  
- **Swagger UI** (via `swagger-ui-express`) 📜  
- **YAML** (via `yamljs`) 📄  
- **Git** 📈  

---

## ℹ️ 추가 정보

- 프로젝트는 독립적으로 실습하기 위해 **모의 데이터**를 사용하며, 실제 데이터베이스 연결 없이 진행됩니다.  
- 더 많은 엔드포인트 테스트를 원하시면 `swagger.yaml`을 업데이트하고, `app.js`에서 추가 라우트를 설정하세요! 🚀