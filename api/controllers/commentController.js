// api/controllers/commentController.js
const mockComments = [
  { comment_id: 1, content: '좋은 모집공고네요!', recruitment_id: 1 }
];
const profaneWords = ['bad', 'ugly', 'mean'];
  
const createComment = (req, res) => {
  const { recruitment_id } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
  }
  
  const words = content.split(' ');
  const hasProfanity = words.some(word => profaneWords.includes(word.toLowerCase()));
  if (hasProfanity) {
    return res.status(400).json({ error: '댓글에 부적절한 언어가 포함되었습니다.' });
  }
  
  const newComment = { comment_id: mockComments.length + 1, content, recruitment_id: parseInt(recruitment_id) };
  mockComments.push(newComment);
  res.status(201).json(newComment);
};
  
const getComments = (req, res) => {
  const { recruitment_id } = req.params;
  const comments = mockComments.filter(c => c.recruitment_id === parseInt(recruitment_id));
  res.status(200).json(comments);
};
  
const updateComment = (req, res) => {
  const { recruitment_id, comment_id } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
  }
  
  const words = content.split(' ');
  const hasProfanity = words.some(word => profaneWords.includes(word.toLowerCase()));
  if (hasProfanity) {
    return res.status(400).json({ error: '댓글에 부적절한 언어가 포함되었습니다.' });
  }
  
  const comment = mockComments.find(c => c.comment_id === parseInt(comment_id) && c.recruitment_id === parseInt(recruitment_id));
  if (!comment) {
    return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
  }
  
  comment.content = content;
  res.status(200).json({ message: '댓글이 수정되었습니다.', comment });
};
  
const deleteComment = (req, res) => {
  const { recruitment_id, comment_id } = req.params;
  const index = mockComments.findIndex(c => c.comment_id === parseInt(comment_id) && c.recruitment_id === parseInt(recruitment_id));
  if (index === -1) {
    return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
  }
  
  mockComments.splice(index, 1);
  res.status(200).json({ message: '댓글이 삭제되었습니다.' });
};
  
module.exports = { createComment, getComments, updateComment, deleteComment };