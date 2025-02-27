// api/controllers/userController.js
const mockUsers = [
    { id: 1, name: '홍길동', email: 'hong@example.com' },
    { id: 2, name: '김영희', email: 'kim@example.com' },
  ];
  
  const getUsers = (req, res) => {
    res.status(200).json(mockUsers);
  };
  
  const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: '이름과 이메일은 필수입니다.' });
    }
  
    const user = mockUsers.find(u => u.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  
    user.name = name;
    user.email = email;
    res.status(200).json({ message: '사용자가 수정되었습니다.', user });
  };
  
  const deleteUser = (req, res) => {
    const { id } = req.params;
    const index = mockUsers.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  
    mockUsers.splice(index, 1);
    res.status(200).json({ message: '사용자가 삭제되었습니다.' });
  };
  
  module.exports = { getUsers, updateUser, deleteUser };