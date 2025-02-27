const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();

const swaggerDocument = YAML.load('./swagger.yaml'); // Swagger 명세 파일 경로
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(10010, () => console.log('Server running on http://localhost:10010/'));