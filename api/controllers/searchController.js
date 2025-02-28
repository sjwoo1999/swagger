// api/controllers/searchController.js
const mockSearches = [
  { keyword: '개발자 모집', result: '모집공고 1, 2' }
];
  
const search = (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: '검색어를 입력해주세요.' });
  }
  
  const result = mockSearches.filter(s => s.keyword.includes(q));
  res.status(200).json(result);
};
  
module.exports = { search };