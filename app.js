const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const helloWorldController = require('./api/controllers/hello_world');
const app = express();

// Swagger 문서 로드
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 기본 경로(/)에 응답 추가
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Teamitaka Swagger Practice API! Visit /api-docs for Swagger UI.' });
});

// hello_world 컨트롤러 라우트 추가
app.get('/hello', helloWorldController.hello);

// 더미 /api/register 엔드포인트 추가 (실습용)
app.post('/api/register', (req, res) => {
  res.status(201).json({
    message: '✅ 회원가입 성공!',
    user: {
      user_id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      username: req.body.username || 'johndoe',
      email: req.body.email || 'johndoe@example.com',
      role: 'MEMBER',
      createdAt: new Date().toISOString()
    }
  });
});

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

const basePorts = [3000, 3001, 3002];
findAvailablePort(basePorts)
  .then(port => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
      console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });