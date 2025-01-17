import { endpoints, RequestInitialState } from '@/constants';
import { API } from '@/services';
import { createRequestBuilderProject } from '@/utils/createRequestBuilder';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';
import {
  CreateProjectType,
  Project,
  ProjectState,
  TASK_STATUS,
  TaskType,
} from './types/project.type';

const initialState: ProjectState = {
  projectPagination: {
    page: 0,
    pageSize: 20,
  },
  selectedProject: null,
  requests: {
    getAllProjects: RequestInitialState,
    createProject: RequestInitialState,
    getTaskStatus: RequestInitialState,
    getCompetitiveAnalysis: RequestInitialState,
    getProjectById: RequestInitialState,
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
  async (
    { title, websiteUrl }: CreateProjectType,
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const url = endpoints.project.create;
      const res = await API.post(url, {
        title,
        url: websiteUrl,
      });

      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTaskStatus = createAsyncThunk(
  'project/getTaskStatus',
  async (
    { taskId }: { taskId: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const url = `${endpoints.project.taskStatus}/${taskId}`;
      const res = await API.get(url);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getCompetitiveAnalysis = createAsyncThunk(
  'project/getCompetitiveAnalysis',
  async (
    { projectId }: { projectId: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const url = `${endpoints.project.competitiveAnalysis}/${projectId}`;
      const res = await API.get(url);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getProjectById = createAsyncThunk(
  'project/getProjectById',
  async (
    { projectId }: { projectId: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const url = `${endpoints.project.getProject}/${projectId}`;
      const res = await API.get(url);
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
    saveSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.project,
      };
    });
    createRequestBuilderProject<Project[]>(
      builder,
      getAllProjects,
      'getAllProjects',
    );
    createRequestBuilderProject<Project>(
      builder,
      createProject,
      'createProject',
      {
        fulfilled: ({ state, data }) => {
          state.requests.getAllProjects.data = [
            data,
            ...state.requests.getAllProjects.data,
          ];
        },
      },
      { showSuccessMessage: true },
    );
    createRequestBuilderProject<TaskType>(
      builder,
      getTaskStatus,
      'getTaskStatus',
      {
        fulfilled: ({ state, data }) => {
          if (data.status == TASK_STATUS.COMPLETED) {
            state.requests.getAllProjects.data.map(project => {
              if (project._id === data.projectId) {
                if (state.selectedProject) {
                  state.selectedProject.fileUrl = data.fileUrl;
                }
                return {
                  ...project,
                  fileUrl: data.fileUrl,
                };
              } else {
                return project;
              }
            });
          }
        },
      },
    );
    createRequestBuilderProject(
      builder,
      getCompetitiveAnalysis,
      'getCompetitiveAnalysis',
      {},
      { showSuccessMessage: true },
    );
    createRequestBuilderProject<Project>(
      builder,
      getProjectById,
      'getProjectById',
      {
        fulfilled: ({ state, data }) => {
          if (data.hasCompetitiveAnalysis && state.selectedProject) {
            state.selectedProject.hasCompetitiveAnalysis = true;
          }
        },
      },
    );
  },
});

export const { setProjectPagination, saveSelectedProject } =
  projectSlice.actions;

export const selectRequests = (state: RootState) => state.project.requests;
export const selectedProject = (state: RootState) =>
  state.project.selectedProject;
export const selectProjectPagination = (state: RootState) =>
  state.project.projectPagination;

export const selectRequest = <K extends keyof ProjectState['requests']>(
  key: K,
) => createSelector([selectRequests], requests => requests[key]);

export default projectSlice.reducer;
