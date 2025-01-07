import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../store";
import { RequestInitialState, endpoints } from "@/constants";
import { Project, ProjectState } from "./types/project.type";
import { PaginatedResult } from "@/components/types";
import { createRequestBuilderProject } from "@/utils/createRequestBuilder";
import { API } from "@/services";

const initialState: ProjectState = {
  projectPagination: {
    page: 0,
    pageSize: 20,
  },
  requests: {
    getAllProjects: RequestInitialState,
  },
};

export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = endpoints.project.getAllProjects;
      console.log(url);
      const res = await API.get(url);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectPagination: (state, action) => {
      state.projectPagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.app,
      };
    });
    createRequestBuilderProject<PaginatedResult<Project>>(
      builder,
      getAllProjects,
      "getAllProjects"
    );
  },
});

export const { setProjectPagination } = projectSlice.actions;

export const selectRequests = (state: RootState) => state.project.requests;
export const selectProjectPagination = (state: RootState) =>
  state.project.projectPagination;

export const selectRequest = <K extends keyof ProjectState["requests"]>(
  key: K
) => createSelector([selectRequests], (requests) => requests[key]);

export default projectSlice.reducer;
