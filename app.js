const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const helloWorldController = require('./api/controllers/hello_world');
const app = express();

// Swagger 문서 로드
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// hello_world 라우트 추가
app.get('/hello', helloWorldController.hello);

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

const basePorts = [10020, 10030, 10040];
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