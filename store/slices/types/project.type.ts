import { Pagination, Request } from '@/components/types';

export type ProjectState = {
  projectPagination: Pagination;
  requests: {
    getAllProjects: Request<Project[]>;
    createProject: Request;
    getTaskStatus: Request;
  };
};

export type Project = {
  _id: string;
  title: string;
  url: string;
  taskId: string;
};

export type CreateProjectType = {
  title: string;
  websiteUrl: string;
};

export type TaskType = {
  _id: string;
  projectId: string;
  status: TASK_STATUS;
  fileUrl: string;
};

export enum TASK_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
