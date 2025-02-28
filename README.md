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

- **2025-02-27** 🛠️  
  CRUD 기능 완성: 사용자, 프로젝트, 댓글, 관리자 계정 모두 CRUD 작업 구현.  
  - 사용자 관리: `/api/users/{id}` (PUT, DELETE) 추가, 수정/삭제 가능.  
  - 프로젝트 관리: `/api/projects` (POST) 추가, 생성 가능.  
  - 댓글 관리: `/api/recruitments/{recruitment_id}/comment/{comment_id}` (PUT, DELETE) 추가, 수정/삭제 가능.  
  - 관리자 계정 관리: `/api/admin/users` (POST, GET), `/api/admin/users/{id}` (PUT, DELETE) 추가, CRUD 완료.  
  Swagger UI 및 `curl`로 테스트 완료.

---

- **2025-02-28** 📝  
  린팅 오류 해결: `npm run lint` 실행 시 발생한 ESLint 오류 수정.  
  - 들여쓰기 오류(indent), 후행 쉼표(comma-dangle), 따옴표 스타일(quotes), 콘솔 로그 사용(no-console) 문제를 해결.  
  - `app.js`에서 `console.log`를 테스트 환경에서 출력되지 않도록 조건문으로 감싸 처리.  
  - `--fix` 옵션으로 자동 수정 가능한 오류 처리 후 수동으로 나머지 수정.  
  - 수정 후 `npm run lint` 재실행하여 모든 오류 해결 확인.  
  `swagger.yaml` 작성 진행:  
  - `/api/auth/*`, `/api/admin/*`, `/api/user/*`, `/api/recruitment/*`, `/api/projects/*`, `/api/profiles/*`, `/api/recruitments/*/comment/*`, `/api/scraps/recruitments`, `/api/recruitment/*/scrap`, `/api/search`, `/api/univcert/*`, `/health` 엔드포인트 정의 완료.  
  - 페이지네이션, 인증, 에러 응답, 예시 등을 포함하여 상세히 작성.

- **2025-02-28** 🛠️  
  `swagger.yaml` 파싱 오류 해결:  
  - YAML 들여쓰기 오류(bad indentation of a mapping entry) 수정: `/api/auth/validate-password`의 `description` 들여쓰기를 2칸 공백으로 통일하고, 문자열을 따옴표로 감쌈.  
  - `app.js`에서 테스트 환경에서 `process.exit(1)` 호출 방지: 테스트 환경에서는 에러를 throw하도록 수정.  
  - 전체 `swagger.yaml` 들여쓰기 점검 및 통일.  
  `swagger.yaml` 작성 완료:  
  - 모든 엔드포인트의 세부 사항 정의 완료.  
  - `operationId`, `summary`, `description`, 응답 상태 코드(`200`, `400`, `401`, `403`, `404`, `429`, `500`, `503`) 포함.  
  - `components.schemas`에 주요 데이터 모델(`User`, `Recruitment`, `Project`, `Comment`) 정의.

- **2025-02-28** 🔍  
  테스트 실패 해결: `User Service` 테스트에서 `getUsers()`가 2개 사용자를 반환해야 하지만 1개만 반환하는 문제 수정.  
  - `userService.js`에 `resetMockUsers` 메서드 추가, 테스트 간 상태 공유 방지.  
  - `user.test.js`에 `beforeEach`로 각 테스트 실행 전 `mockUsers` 초기화 구현.  
  - 수정 후 테스트 재실행: 모든 테스트 통과 확인.  
  `swagger.yaml` 작성 진행:  
  - `/api/projects/{project_id}`의 `PUT` 메서드 응답 정의 완료.  
  - `/api/projects/completed`, `/api/projects/{project_id}/members` (GET, POST), `/api/profiles/*` 엔드포인트 정의.

- **2025-02-28** 🛠️  
  `swagger.yaml` 중복 키 오류 해결:  
  - `externalDocs`가 최상위 수준에서 중복 정의되어 발생한 `duplicated mapping key` 오류 수정. 파일 끝부분의 중복 `externalDocs` 제거.  
  - 전체 `swagger.yaml` 점검하여 중복 키 문제 없도록 확인.  
  `swagger.yaml` 작성 진행:  
  - `/api/recruitments/*/comment/*`, `/api/scraps/recruitments`, `/api/recruitment/*/scrap`, `/api/search` 엔드포인트 정의 완료.

- **2025-02-28** 🛡️  
  테스트 실패 해결: `User Controller` 테스트에서 `updateUser`와 `deleteUser` 응답 형식이 기대와 다른 문제 수정.  
  - `userController.js` 수정: `updateUser`에서 `name`, `email` 유효성 검사 추가, 응답 형식을 `{ message: "...", user: {...} }`로 포맷팅, 에러 메시지 한글화.  
  - `deleteUser`에서 응답 형식을 `{ message: "..." }`로 포맷팅, 에러 메시지 한글화.  
  - 수정 후 테스트 재실행: 모든 테스트 통과 확인.  
  `swagger.yaml` 작성 진행:  
  - `/api/user/{id}` (PUT, DELETE) 응답 형식 테스트 결과와 일치하도록 업데이트.  
  - `/api/univcert/*`, `/health` 엔드포인트 정의 완료.  
  - 전체 `swagger.yaml` 작성 완료, 모든 엔드포인트 상세 정의 완료.

- **2025-02-28** 📘  
  `swagger.yaml` 최종 완성:  
  - `/api/recruitments/{recruitment_id}/comment` (POST 메서드) 정의 완료: `security`, `parameters`, `requestBody`, `responses` (201, 400, 401, 404, 500) 추가.  
  - `/api/recruitments/{recruitment_id}/comment/{comment_id}` (PUT, DELETE 메서드), `/api/scraps/recruitments`, `/api/recruitment/*/scrap`, `/api/search`, `/api/univcert/*`, `/health` 엔드포인트 정의 모두 완료.  
  - 페이지네이션, 인증, 에러 응답, 예시 등을 포함하여 모든 엔드포인트 상세히 작성.  
  - 전체 파일 점검: 들여쓰기 2칸 공백으로 통일, 중복 키 문제 없음 확인.  
  테스트 재실행: `npm test` 실행하여 모든 테스트 통과 확인.

---

## 🛠️ 사용 방법

### 1. **의존성 설치**  
프로젝트 실행을 위해 필요한 패키지를 설치합니다. 아래 명령어를 실행하세요:  
```bash
npm install
```

---

### 2. **서버 실행**  
서버를 구동하기 위해 다음 명령어를 실행합니다:  
```bash
node app.js
```

---

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
