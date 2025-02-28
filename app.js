const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const authController = require('./api/controllers/authController');
const adminController = require('./api/controllers/adminController');
const recruitmentController = require('./api/controllers/recruitmentController');
const projectController = require('./api/controllers/projectController');
const profileController = require('./api/controllers/profileController');
const commentController = require('./api/controllers/commentController');
const scrapController = require('./api/controllers/scrapController');
const searchController = require('./api/controllers/searchController');
const univCertController = require('./api/controllers/univCertController');
const userController = require('./api/controllers/userController');

const app = express();

// CORS 설정 (동적 포트 기반)
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      `http://localhost:${process.env.PORT || 3000}`,
      'http://localhost:3001',
      'http://localhost:3002'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Swagger 문서 로드 및 동적 포트 반영
let swaggerDocument;
try {
  swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
} catch (error) {
  if (process.env.NODE_ENV !== 'test') {
    console.error('Failed to load swagger.yaml:', error.message);
    process.exit(1);
  } else {
    throw error; // 테스트 환경에서는 오류를 throw하여 테스트가 실패하도록 함
  }
}

// servers 속성 확인 및 기본값 설정
if (!swaggerDocument.servers) {
  swaggerDocument.servers = [{ url: 'http://localhost:3000' }];
}

const findPort = () => process.env.PORT || 3000;
swaggerDocument.servers[0].url = `http://localhost:${findPort()}`;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 기본 경로(/)에 응답 추가
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Swagger Practice API! Visit /api-docs for Swagger UI.' });
});

// auth 라우트 추가
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.post('/api/auth/validate-password', authController.validatePassword);

// admin 라우트 추가
app.post('/api/admin/login', adminController.loginAdmin);
app.get('/api/admin/certified-users', adminController.getCertifiedUsers);
app.delete('/api/admin/clear-verified-emails', adminController.clearVerifiedEmails);
app.post('/api/admin/users', adminController.createAdmin);
app.get('/api/admin/users', adminController.getAdmins);
app.put('/api/admin/users/:id', adminController.updateAdmin);
app.delete('/api/admin/users/:id', adminController.deleteAdmin);

// users 라우트 추가
app.get('/api/user', userController.getUsers);
app.put('/api/user/:id', userController.updateUser);
app.delete('/api/user/:id', userController.deleteUser);

// recruitment 라우트 추가
app.get('/api/recruitment', recruitmentController.getRecruitments);
app.get('/api/recruitment/:recruitment_id', recruitmentController.getRecruitmentById);
app.post('/api/recruitment', recruitmentController.createRecruitment);
app.put('/api/recruitment/:recruitment_id', recruitmentController.updateRecruitment);
app.delete('/api/recruitment/:recruitment_id', recruitmentController.deleteRecruitment);

// project 라우트 추가
app.get('/api/projects', projectController.getProjects);
app.get('/api/projects/:project_id', projectController.getProjectById);
app.get('/api/projects/completed', projectController.getCompletedProjects);
app.post('/api/projects', projectController.createProject);
app.put('/api/projects/:project_id', projectController.updateProject);
app.delete('/api/projects/:project_id', projectController.deleteProject);
app.get('/api/projects/:project_id/members', projectController.getProjectMembers);
app.post('/api/projects/:project_id/members', projectController.addProjectMember);

// profile 라우트 추가
app.get('/api/profiles/:user_id', profileController.getProfile);
app.post('/api/profiles', profileController.createProfile);
app.put('/api/profiles/:profile_id', profileController.updateProfile);
app.delete('/api/profiles/:profile_id', profileController.deleteProfile);
app.get('/api/profiles/resume/:user_id', profileController.getResume);

// comment 라우트 추가
app.get('/api/recruitments/:recruitment_id/comment', commentController.getComments);
app.post('/api/recruitment/:recruitment_id/comment', commentController.createComment);
app.put('/api/recruitments/:recruitment_id/comment/:comment_id', commentController.updateComment);
app.delete('/api/recruitments/:recruitment_id/comment/:comment_id', commentController.deleteComment);

// scrap 라우트 추가
app.get('/api/scraps/recruitments', scrapController.getScrapedRecruitments);
app.put('/api/recruitment/:recruitment_id/scrap', scrapController.toggleScrap);

// search 라우트 추가
app.get('/api/search', searchController.search);

// univCert 라우트 추가
app.post('/api/univcert/send-otp', univCertController.sendOtp);
app.post('/api/univcert/verify-otp', univCertController.verifyOtp);

// 동적 포트 설정
const findAvailablePort = async (ports) => {
  for (const port of ports) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
          server.close(resolve);
        });
        server.on('error', reject);
      });
      return port;
    } catch (err) {
      console.error(`Port ${port} in use, trying next...`);
      continue;
    }
  }
  throw new Error('No available ports in the list');
};

// 테스트 환경에서는 app.listen을 실행하지 않음
if (process.env.NODE_ENV !== 'test') {
  const basePorts = [3000, 3001, 3002];
  findAvailablePort(basePorts)
    .then(port => {
      process.env.PORT = port;
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/`);
        console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
      });
    })
    .catch(err => {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    });
}

// 테스트를 위해 app 객체 내보내기
module.exports = app;