import { SerializedError } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";

export type ServerResponse<R = any> = {
  data: R;
  message: string;
  success: boolean;
  statusCode: HttpStatusCode;
};

export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
  take: number;
  currentPage: number;
  totalPages: number;
  remainingPages: number;
};

export type Request<T = any> = {
  success: boolean;
  inProgress: boolean;
  error: SerializedError;
  data: T;
};

export type Pagination = {
  page: number;
  pageSize: number;
};
