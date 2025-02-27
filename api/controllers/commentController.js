// api/controllers/commentController.js
const mockComments = [
    { comment_id: 1, content: '좋은 모집공고네요!', recruitment_id: 1 },
  ];
  const profaneWords = ['bad', 'ugly', 'mean'];
  
  const getComments = (req, res) => {
    const { recruitment_id } = req.params;
    const comments = mockComments.filter(c => c.recruitment_id === parseInt(recruitment_id));
    res.status(200).json(comments);
  };
  
  const createComment = (req, res) => {
    const { recruitment_id } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
    }
  
    // 욕설 필터링
    const words = content.split(' ');
    const hasProfanity = words.some(word => profaneWords.includes(word.toLowerCase()));
    if (hasProfanity) {
      return res.status(400).json({ error: '댓글에 부적절한 언어가 포함되었습니다.' });
    }
  
    const newComment = { comment_id: mockComments.length + 1, content, recruitment_id: parseInt(recruitment_id) };
    mockComments.push(newComment);
    res.status(201).json(newComment);
  };
  
  module.exports = { getComments, createComment };