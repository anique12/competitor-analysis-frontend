import {  Pagination, Request } from '@/components/types';

export type ProjectState = {
  projectPagination: Pagination;
  requests: {
    getAllProjects: Request<Project[]>;
    createProject: Request;
  };
};

export type Project = {
  title: string;
  url: string;
};

export type CreateProjectType = {
  title: string;
  websiteUrl: string;
}