// api/controllers/adminController.js
const mockAdmins = [{ id: 1, email: 'admin@example.com', role: 'ADMIN' }];
const mockVerifiedEmails = ['verified@example.com'];

const createAdmin = (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ error: '이메일과 역할은 필수입니다.' });
  }

  const newAdmin = { id: mockAdmins.length + 1, email, role };
  mockAdmins.push(newAdmin);
  res.status(201).json(newAdmin);
};

const getAdmins = (req, res) => {
  res.status(200).json(mockAdmins);
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ error: '이메일과 역할은 필수입니다.' });
  }

  const admin = mockAdmins.find(a => a.id === parseInt(id));
  if (!admin) {
    return res.status(404).json({ message: '관리자를 찾을 수 없습니다.' });
  }

  admin.email = email;
  admin.role = role;
  res.status(200).json({ message: '관리자가 수정되었습니다.', admin });
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;
  const index = mockAdmins.findIndex(a => a.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: '관리자를 찾을 수 없습니다.' });
  }

  mockAdmins.splice(index, 1);
  res.status(200).json({ message: '관리자가 삭제되었습니다.' });
};

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

module.exports = { createAdmin, getAdmins, updateAdmin, deleteAdmin, loginAdmin, getCertifiedUsers, clearVerifiedEmails };