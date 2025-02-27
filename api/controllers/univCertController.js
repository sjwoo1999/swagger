// api/controllers/univCertController.js
const universityDomains = {
    'korea.ac.kr': '고려대학교',
    'g.hongik.ac.kr': '홍익대학교',
  };
  
  const sendOtp = (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: '이메일을 입력해주세요.' });
    }
  
    const emailDomain = email.split('@')[1];
    if (!universityDomains[emailDomain]) {
      return res.status(400).json({ message: '지원되지 않는 학교 이메일입니다.' });
    }
  
    res.status(200).json({ message: 'OTP 전송 완료' });
  };
  
  const verifyOtp = (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: '이메일과 인증코드를 입력해주세요.' });
    }
  
    const emailDomain = email.split('@')[1];
    if (!universityDomains[emailDomain]) {
      return res.status(400).json({ message: '지원되지 않는 학교 이메일입니다.' });
    }
  
    res.status(200).json({ message: '인증 성공', certified_email: email, certified_date: new Date().toISOString() });
  };
  
  module.exports = { sendOtp, verifyOtp };