// api/controllers/projectController.js
const mockProjects = [
  { project_id: 1, project_name: '프로젝트 A', description: '설명', status: '진행중' },
  { project_id: 2, project_name: '프로젝트 B', description: '완료된 프로젝트', status: '완료' }
];
  
const createProject = (req, res) => {
  const { project_name, description, status } = req.body;
  if (!project_name || !description) {
    return res.status(400).json({ error: '프로젝트 이름과 설명은 필수입니다.' });
  }
  
  const newProject = {
    project_id: mockProjects.length + 1,
    project_name,
    description,
    status: status || '진행중'
  };
  mockProjects.push(newProject);
  res.status(201).json(newProject);
};
  
const getProjects = (req, res) => {
  res.status(200).json(mockProjects);
};
  
const getProjectById = (req, res) => {
  const { project_id } = req.params;
  const project = mockProjects.find(p => p.project_id === parseInt(project_id));
  if (!project) {
    return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
  }
  res.status(200).json(project);
};
  
const getCompletedProjects = (req, res) => {
  const completed = mockProjects.filter(p => p.status === '완료');
  if (completed.length === 0) {
    return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
  }
  res.status(200).json(completed);
};
  
const updateProject = (req, res) => {
  const { project_id } = req.params;
  const { project_name, description, status } = req.body;
  const project = mockProjects.find(p => p.project_id === parseInt(project_id));
  if (!project) {
    return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
  }
  
  if (project_name) project.project_name = project_name;
  if (description) project.description = description;
  if (status) project.status = status;
  res.status(200).json(project);
};
  
const deleteProject = (req, res) => {
  const { project_id } = req.params;
  const index = mockProjects.findIndex(p => p.project_id === parseInt(project_id));
  if (index === -1) {
    return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
  }
  
  mockProjects.splice(index, 1);
  res.status(200).json({ message: '프로젝트가 삭제되었습니다.' });
};
  
const getProjectMembers = (req, res) => {
  const { project_id } = req.params;
  const project = mockProjects.find(p => p.project_id === parseInt(project_id));
  if (!project) {
    return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
  }
  res.status(200).json([{ user_id: 1, username: '홍길동', role: '팀원' }]);
};
  
const addProjectMember = (req, res) => {
  const { project_id } = req.params;
  const { user_id, role } = req.body;
  const project = mockProjects.find(p => p.project_id === parseInt(project_id));
  if (!project) {
    return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
  }
  
  const member = { user_id, role: role || '팀원' };
  res.status(201).json(member);
};
  
module.exports = { createProject, getProjects, getProjectById, getCompletedProjects, updateProject, deleteProject, getProjectMembers, addProjectMember };