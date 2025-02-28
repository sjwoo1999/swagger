// api/controllers/authController.js
const mockUsers = [
  { user_id: 1, uuid: '123e4567-e89b-12d3-a456-426614174000', username: 'johndoe', email: 'johndoe@example.com', role: 'MEMBER' }
];
  
const register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: '❌ 모든 필드를 입력해주세요.' });
  }
  
  const newUser = {
    user_id: mockUsers.length + 1,
    uuid: '987fcdef-12ab-34cd-56ef-789012345678',
    username,
    email,
    role: 'MEMBER',
    createdAt: new Date().toISOString()
  };
  mockUsers.push(newUser);
  res.status(201).json({ message: '✅ 회원가입 성공!', user: newUser });
};
  
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: '이메일과 비밀번호를 입력해야 합니다.' });
  }
  
  const user = mockUsers.find(u => u.email === email);
  if (!user || password !== 'password123') { // 모의 비밀번호
    return res.status(401).json({ error: '로그인 실패' });
  }
  
  res.status(200).json({ message: '✅ 로그인 성공!', token: 'mock-token' });
};
  
const validatePassword = (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: '비밀번호를 입력해주세요.' });
  }
  res.json({ valid: password.length >= 8, message: '비밀번호 유효성 검증 완료' });
};
  
module.exports = { register, login, validatePassword };