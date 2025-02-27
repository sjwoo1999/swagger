const getHealth = (req, res) => {
    res.status(200).json({ status: 'OK', message: '서버가 정상적으로 실행 중입니다!' });
};
  
module.exports = { getHealth };