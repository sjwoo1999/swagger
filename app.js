const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const helloWorldController = require('./api/controllers/hello_world');

const app = express();
const port = process.env.PORT || 3000;

// 동적 포트 기반으로 CORS 설정
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      `http://localhost:${process.env.PORT || 3000}`,
      `http://localhost:3001`,
      `http://localhost:3002`
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 204 // 일부 브라우저에서 OPTIONS 요청 성공 상태 코드 문제 해결
};

app.use(cors(corsOptions));

// JSON 요청 본문 파싱 (bodyParser.json() 제거)
app.use(express.json());

// Swagger 문서 로드 및 동적 포트 반영
const swaggerDocument = YAML.load('./swagger.yaml');
const findPort = () => process.env.PORT || 3000; // 현재 실행 포트 가져오기
swaggerDocument.servers[0].url = `http://localhost:${findPort()}`; // 서버 URL 동적 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 기본 경로(/)에 응답 추가
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Swagger Practice API! Visit /api-docs for Swagger UI.' });
});

// hello_world 컨트롤러 라우트 추가
app.get('/hello', helloWorldController.hello);

// 수정된 /api/register 엔드포인트 (입력 검증 및 에러 처리 추가)
app.post('/api/register', (req, res) => {
  console.log('Request Body:', req.body); // 디버깅용 로그

  // 요청 본문이 없거나 필수 필드가 누락된 경우
  if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ 
      error: '❌ 모든 필드(username, email, password)가 필요합니다.' 
    });
  }

  const { username, email, password } = req.body;

  // 더미 사용자 데이터 생성 (실제 로직은 데이터베이스 연동 필요)
  res.status(201).json({
    message: '✅ 회원가입 성공!',
    user: {
      user_id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      username,
      email,
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
    process.env.PORT = port; // 포트 환경 변수 설정
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
      console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });

