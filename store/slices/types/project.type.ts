import { Pagination, Request } from '@/components/types';

export type ProjectState = {
  projectPagination: Pagination;
  selectedProject: Project | null;
  requests: {
    getAllProjects: Request<Project[]>;
    createProject: Request;
    getTaskStatus: Request;
    getCompetitiveAnalysis: Request<Product[]>;
    getProjectById: Request<Project>;
  };
};

export type Project = {
  _id: string;
  title: string;
  url: string;
  taskId: string;
  fileUrl: string;
  hasCompetitiveAnalysis: boolean;
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

export type Product = {
  'Product Name': string;
  Price: string;
  'Target Region/Delivery Region': string;
  'Sizes Variation/Available': string;
  'Product Made of': string;
  'Shipping Summary': string;
  'Product Description': string;
  'Product Page URL': string;
  'Product Benefits': string;
  'Other USPs': string;
};
