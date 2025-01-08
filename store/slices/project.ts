import { PaginatedResult } from '@/components/types';
import { RequestInitialState, endpoints } from '@/constants';
import { API } from '@/services';
import { createRequestBuilderProject } from '@/utils/createRequestBuilder';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';
import { CreateProjectType, Project, ProjectState } from './types/project.type';

const initialState: ProjectState = {
  projectPagination: {
    page: 0,
    pageSize: 20,
  },
  requests: {
    getAllProjects: RequestInitialState,
    createProject: RequestInitialState,
  },
};

export const getAllProjects = createAsyncThunk(
  'project/getAllProjects',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = endpoints.project.getAllProjects;
      const res = await API.get(url);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);


export const createProject = createAsyncThunk(
  'project/createProject',
  async ({title, websiteUrl} : CreateProjectType, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = endpoints.project.create;
      const res = await API.post(url, {
      title,
      url: websiteUrl
      });
      
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectPagination: (state, action) => {
      state.projectPagination = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.project,
      };
    });
    createRequestBuilderProject<Project>(
      builder,
      getAllProjects,
      'getAllProjects',
    );
    createRequestBuilderProject<Project>(
      builder,
      createProject,
      'createProject',
    );
    
  },
});

export const { setProjectPagination } = projectSlice.actions;

export const selectRequests = (state: RootState) => state.project.requests;
export const selectProjectPagination = (state: RootState) =>
  state.project.projectPagination;

export const selectRequest = <K extends keyof ProjectState['requests']>(
  key: K,
) => createSelector([selectRequests], requests => requests[key]);

export default projectSlice.reducer;
