import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { transformJobData } from '@/utils';
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
};

export const fetchJobList = createAsyncThunk('jobList/fetch', () =>
  fetch('https://jobs.github.com/positions.json').then((response) =>
    response.json(),
  ),
);

const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  extraReducers: {
    [fetchJobList.pending]: (state) => {
      state.status = loading;
    },
    [fetchJobList.fulfilled]: (state, action) => {
      state.list = action.payload.map(transformJobData);
      state.status = succeeded;
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
