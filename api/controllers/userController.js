// api/controllers/userController.js
const userService = require('../services/userService');

const getUsers = (req, res) => {
  try {
    const users = userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = userService.updateUser(id, name, email);
    res.status(200).json(updatedUser);
  } catch (error) {
    const status = error.message === '이름과 이메일은 필수입니다.' ? 400 : 404;
    res.status(status).json({ error: error.message });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const result = userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getUsers, updateUser, deleteUser };