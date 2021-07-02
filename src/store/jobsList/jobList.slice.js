import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { makeUrlQuery } from '@/utils';
import {
  failed,
  initial,
  loading,
  succeeded,
} from '@/utils/constants/statuses';

const initialState = {
  status: initial,
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
    const url = new URL('https://jobs.github.com/positions.json');
    const { page, params } = getState().jobList;
    url.search = makeUrlQuery({ page, ...params });
    const response = await fetch(url);
    return response.json();
  },
);

const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  reducers: {
    saveSearchParams: (state, action) => {
      state.params = { ...initialState.params, ...action.payload };
      state.page = initialState.page;
      state.list = initialState.list;
    },
    resetSearchParams: (state) => {
      state.status = initial;
    },
  },
  extraReducers: {
    [fetchJobList.pending]: (state) => {
      state.status = loading;
    },
    [fetchJobList.fulfilled]: (state, action) => {
      const list = action.payload;
      state.list.push(
        ...list.filter(({ id }) => state.list.every((job) => job.id !== id)),
      );
      state.status = succeeded;
      state.page += 1;
    },
    [fetchJobList.rejected]: (state, action) => {
      state.error = action.error;
      state.status = failed;
    },
  },
});

export default jobListSlice.reducer;

export const { saveSearchParams, resetSearchParams } = jobListSlice.actions;

export const selectJobById = (id) => (state) =>
  state.jobList.list.find((job) => job.id === id);
