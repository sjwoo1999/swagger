// api/controllers/recruitmentController.js
const mockRecruitments = [
    { recruitment_id: 1, title: '개발자 모집', description: '프로젝트 협력자 구함' },
  ];
  
  const getRecruitments = (req, res) => {
    res.status(200).json(mockRecruitments);
  };
  
  const getRecruitmentById = (req, res) => {
    const { recruitment_id } = req.params;
    const recruitment = mockRecruitments.find(r => r.recruitment_id === parseInt(recruitment_id));
    if (!recruitment) {
      return res.status(404).json({ message: '모집공고를 찾을 수 없습니다.' });
    }
    res.status(200).json(recruitment);
  };
  
  const createRecruitment = (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: '제목과 설명이 필요합니다.' });
    }
  
    const newRecruitment = { recruitment_id: mockRecruitments.length + 1, title, description };
    mockRecruitments.push(newRecruitment);
    res.status(201).json(newRecruitment);
  };
  
  const updateRecruitment = (req, res) => {
    const { recruitment_id } = req.params;
    const { title, description } = req.body;
    const recruitment = mockRecruitments.find(r => r.recruitment_id === parseInt(recruitment_id));
    if (!recruitment) {
      return res.status(404).json({ message: '모집공고를 찾을 수 없습니다.' });
    }
  
    if (title) recruitment.title = title;
    if (description) recruitment.description = description;
    res.status(200).json({ message: '모집공고가 수정되었습니다.', recruitment });
  };
  
  const deleteRecruitment = (req, res) => {
    const { recruitment_id } = req.params;
    const index = mockRecruitments.findIndex(r => r.recruitment_id === parseInt(recruitment_id));
    if (index === -1) {
      return res.status(404).json({ message: '모집공고를 찾을 수 없습니다.' });
    }
  
    mockRecruitments.splice(index, 1);
    res.status(200).json({ message: '모집공고가 삭제되었습니다.' });
  };
  
  module.exports = { getRecruitments, getRecruitmentById, createRecruitment, updateRecruitment, deleteRecruitment };