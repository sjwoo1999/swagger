// api/controllers/adminController.js
const mockAdmins = [{ email: 'admin@example.com', role: 'ADMIN' }];
const mockVerifiedEmails = ['verified@example.com'];

const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: '이메일과 비밀번호를 입력해야 합니다.' });
  }

  const admin = mockAdmins.find(a => a.email === email && password === 'admin123');
  if (!admin) {
    return res.status(403).json({ error: '관리자 계정이 아닙니다.' });
  }

  res.status(200).json({ token: 'mock-admin-token', message: '관리자 로그인 성공' });
};

const getCertifiedUsers = (req, res) => {
  res.status(200).json({ success: true, data: mockVerifiedEmails });
};

const clearVerifiedEmails = (req, res) => {
  mockVerifiedEmails.length = 0;
  res.status(200).json({ message: '✅ 모든 인증된 이메일이 삭제되었습니다.' });
};

module.exports = { loginAdmin, getCertifiedUsers, clearVerifiedEmails };