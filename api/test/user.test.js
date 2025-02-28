// api/test/user.test.js
const request = require('supertest');
const app = require('../../app'); // app.js
const userService = require('../services/userService');

const resetMockUsers = () => {
    userService.resetMockUsers();
}

describe('User Controller API', () => {
  describe('GET /api/user', () => {
    it('should return a list of users', async () => {
      const res = await request(app).get('/api/user');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('id', 1);
      expect(res.body[0]).toHaveProperty('name', '홍길동');
    });
  });

  describe('PUT /api/user/:id', () => {
    it('should update a user', async () => {
      const res = await request(app)
        .put('/api/user/1')
        .send({ name: '홍길동 수정', email: 'hong2@example.com' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', '사용자가 수정되었습니다.');
      expect(res.body.user).toHaveProperty('name', '홍길동 수정');
      expect(res.body.user).toHaveProperty('email', 'hong2@example.com');
    });

    it('should return 400 if name or email is missing', async () => {
      const res = await request(app)
        .put('/api/user/1')
        .send({ name: '홍길동 수정' }); // email 누락
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', '이름과 이메일은 필수입니다.');
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app)
        .put('/api/user/999')
        .send({ name: '존재하지 않음', email: 'none@example.com' });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', '사용자를 찾을 수 없습니다.');
    });
  });

  describe('DELETE /api/user/:id', () => {
    it('should delete a user', async () => {
      const res = await request(app).delete('/api/user/2');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', '사용자가 삭제되었습니다.');
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app).delete('/api/user/999');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', '사용자를 찾을 수 없습니다.');
    });
  });
});

describe('User Service', () => {
    beforeEach(() => {
      resetMockUsers(); // 각 테스트 실행 전에 mockUsers 초기화
    });
  
    it('should return a list of users', () => {
      const users = userService.getUsers();
      expect(users).toBeInstanceOf(Array);
      expect(users).toHaveLength(2);
    });
  
    it('should throw an error if user ID does not exist on delete', () => {
      expect(() => userService.deleteUser(999)).toThrow('User not found');
    });
});