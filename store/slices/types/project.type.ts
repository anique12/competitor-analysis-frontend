import { PaginatedResult, Pagination, Request } from "@/components/types";

export type ProjectState = {
  projectPagination: Pagination;
  requests: {
    getAllProjects: Request<PaginatedResult<Project>>;
  };
};

export type Project = {};
