// api/services/userService.js
const mockUsers = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김영희', email: 'kim@example.com' }
];
  
const getUsers = () => {
  return mockUsers;
};
  
const updateUser = (id, name, email) => {
  if (!name || !email) {
    throw new Error('이름과 이메일은 필수입니다.');
  }
  
  const user = mockUsers.find(u => u.id === parseInt(id));
  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }
  
  user.name = name;
  user.email = email;
  return { message: '사용자가 수정되었습니다.', user };
};
  
const deleteUser = (id) => {
  const index = mockUsers.findIndex(u => u.id === parseInt(id));
  if (index === -1) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }
  
  mockUsers.splice(index, 1);
  return { message: '사용자가 삭제되었습니다.' };
};
  
module.exports = { getUsers, updateUser, deleteUser };