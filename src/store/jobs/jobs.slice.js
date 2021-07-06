import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import JobsAPI from '@/services/api/JobsAPI';
import {
  FAILED,
  INITIAL,
  LOADING,
  SUCCEEDED,
} from '@/utils/constants/statuses';

const initialState = {
  status: INITIAL,
  error: null,
  list: [],
  page: 1,
  params: {
    description: '',
    location: '',
    isFullTime: false,
  },
};

export const fetchJobList = createAsyncThunk(
  'jobList/fetch',
  async (_, { getState }) => {
    const { page, params } = getState().jobList;
    const api = new JobsAPI();
    return api.fetchJobList({ page, ...params });
  },
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    saveSearchParams: (state, action) => {
      state.params = { ...initialState.params, ...action.payload };
      state.page = initialState.page;
      state.list = initialState.list;
    },
    resetSearchParams: (state) => {
      state.status = INITIAL;
    },
  },
  extraReducers: {
    [fetchJobList.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchJobList.fulfilled]: (state, action) => {
      const list = action.payload;
      state.list.push(
        ...list.filter(({ id }) => state.list.every((job) => job.id !== id)),
      );
      state.status = SUCCEEDED;
      state.page += 1;
    },
    [fetchJobList.rejected]: (state, action) => {
      state.error = action.error;
      state.status = FAILED;
    },
  },
});

export default jobsSlice.reducer;

export const { saveSearchParams, resetSearchParams } = jobsSlice.actions;

export const selectJobById = (id) => (state) =>
  state.jobList.list.find((job) => job.id === id);
