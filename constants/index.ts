export const RequestInitialState = {
  success: null,
  error: null,
  inProgress: false,
  data: { items: [] },
} as any;

export const endpoints = {
  auth: {
    SIGN_IN: 'auth/signin',
    SIGN_UP: 'auth/signup',
  },
  project: {
    getAllProjects: 'project',
    getProject: 'project',
    create: 'project/create',
    taskStatus: 'task',
    competitiveAnalysis: 'project/competitive-analysis',
  },
};
