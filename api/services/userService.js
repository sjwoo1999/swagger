let mockUsers = [
    { id: 1, name: '홍길동', email: 'hong@example.com' },
    { id: 2, name: '김영희', email: 'kim@example.com' },
  ];
  
  const getUsers = () => {
    return mockUsers;
  };
  
  const updateUser = (id, { name, email }) => {
    const userIndex = mockUsers.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    mockUsers[userIndex] = { ...mockUsers[userIndex], name, email };
    return mockUsers[userIndex];
  };
  
  const deleteUser = id => {
    const userIndex = mockUsers.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const deletedUser = mockUsers.splice(userIndex, 1)[0];
    return deletedUser;
  };
  
  // 테스트를 위해 mockUsers를 초기화하는 메서드 추가
  const resetMockUsers = () => {
    mockUsers = [
      { id: 1, name: '홍길동', email: 'hong@example.com' },
      { id: 2, name: '김영희', email: 'kim@example.com' },
    ];
  };
  
  module.exports = { getUsers, updateUser, deleteUser, resetMockUsers };