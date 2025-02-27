const getUsers = (req, res) => {
    const mockUsers = [
      { id: 1, name: '홍길동', email: 'hong@example.com' },
      { id: 2, name: '김영희', email: 'kim@example.com' },
    ];
    res.status(200).json(mockUsers);
  };
  
  module.exports = { getUsers };