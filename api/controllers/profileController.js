// api/controllers/profileController.js
const mockProfiles = [
  { user_id: 1, nickname: '홍길동', university: '고려대학교' }
];
  
const getProfile = (req, res) => {
  const { user_id } = req.params;
  const profile = mockProfiles.find(p => p.user_id === parseInt(user_id));
  if (!profile) {
    return res.status(404).json({ success: false, message: '프로필을 찾을 수 없습니다.' });
  }
  res.status(200).json({ success: true, data: profile });
};
  
const createProfile = (req, res) => {
  const { user_id, nickname, university } = req.body;
  if (!user_id || !nickname || !university) {
    return res.status(400).json({ success: false, message: '필수 필드를 입력하세요.' });
  }
  
  const newProfile = { user_id: parseInt(user_id), nickname, university };
  mockProfiles.push(newProfile);
  res.status(201).json({ success: true, data: newProfile });
};
  
const updateProfile = (req, res) => {
  const { profile_id } = req.params;
  const updates = req.body;
  const profile = mockProfiles.find(p => p.user_id === parseInt(profile_id));
  if (!profile) {
    return res.status(404).json({ success: false, message: '프로필을 찾을 수 없습니다.' });
  }
  
  if (updates.nickname) profile.nickname = updates.nickname;
  if (updates.university) profile.university = updates.university;
  res.status(200).json({ success: true, message: '프로필이 수정되었습니다.', data: profile });
};
  
const deleteProfile = (req, res) => {
  const { profile_id } = req.params;
  const index = mockProfiles.findIndex(p => p.user_id === parseInt(profile_id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: '프로필을 찾을 수 없습니다.' });
  }
  
  mockProfiles.splice(index, 1);
  res.status(200).json({ success: true, message: '프로필이 삭제되었습니다.' });
};
  
const getResume = (req, res) => {
  const { user_id } = req.params;
  const profile = mockProfiles.find(p => p.user_id === parseInt(user_id));
  if (!profile) {
    return res.status(404).json({ success: false, message: '프로필을 찾을 수 없습니다.' });
  }
  res.status(200).json({
    success: true,
    data: {
      profile,
      projects: [{ title: '프로젝트 A', description: '설명' }]
    }
  });
};
  
module.exports = { getProfile, createProfile, updateProfile, deleteProfile, getResume };