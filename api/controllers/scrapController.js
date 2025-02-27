// api/controllers/scrapController.js
const mockScraps = [
    { user_id: 1, recruitment_id: 1, scrap_cnt: 1 },
  ];
  
  const getScrapedRecruitments = (req, res) => {
    res.status(200).json(mockScraps);
  };
  
  const toggleScrap = (req, res) => {
    const { recruitment_id } = req.params;
    const user_id = 1; // 모의 사용자 ID
    const scrap = mockScraps.find(s => s.user_id === user_id && s.recruitment_id === parseInt(recruitment_id));
  
    if (scrap) {
      mockScraps.splice(mockScraps.indexOf(scrap), 1);
      res.status(200).json({ message: '스크랩 취소' });
    } else {
      mockScraps.push({ user_id, recruitment_id: parseInt(recruitment_id), scrap_cnt: 1 });
      res.status(200).json({ message: '스크랩 추가' });
    }
  };
  
  module.exports = { getScrapedRecruitments, toggleScrap };