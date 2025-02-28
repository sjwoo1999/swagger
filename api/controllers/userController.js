const userService = require('../services/userService');

const getUsers = (req, res) => {
  const users = userService.getUsers();
  res.status(200).json(users);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // 유효성 검사: name과 email 필수
  if (!name || !email) {
    return res.status(400).json({ error: '이름과 이메일은 필수입니다.' });
  }

  try {
    const updatedUser = userService.updateUser(id, { name, email });
    res.status(200).json({
      message: '사용자가 수정되었습니다.',
      user: updatedUser,
    });
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    } else {
      res.status(500).json({ error: '서버 오류 발생' });
    }
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  try {
    userService.deleteUser(id);
    res.status(200).json({ message: '사용자가 삭제되었습니다.' });
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    } else {
      res.status(500).json({ error: '서버 오류 발생' });
    }
  }
};

module.exports = { getUsers, updateUser, deleteUser };