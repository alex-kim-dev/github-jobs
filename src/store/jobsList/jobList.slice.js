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
};

export const fetchJobList = createAsyncThunk(
  'jobList/fetch',
  (_, { getState }) => {
    const url = new URL('https://jobs.github.com/positions.json');
    const { page } = getState().jobList;
    url.search = makeUrlQuery({ page });
    return fetch(url).then((response) => response.json());
  },
);

const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  extraReducers: {
    [fetchJobList.pending]: (state) => {
      state.status = loading;
    },
    [fetchJobList.fulfilled]: (state, action) => {
      const list = action.payload;
      if (state.page === initialState.page) state.list = list;
      else
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

export const selectJobById = (id) => (state) =>
  state.jobList.list.find((job) => job.id === id);
