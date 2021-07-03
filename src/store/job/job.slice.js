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
  job: null,
};

export const fetchJobById = createAsyncThunk('job/fetch', async (id) => {
  const api = new JobsAPI();
  return api.fetchJobById(id);
});

const jobSlice = createSlice({
  name: 'job',
  initialState,
  extraReducers: {
    [fetchJobById.pending]: (state) => {
      state.status = LOADING;
    },
    [fetchJobById.fulfilled]: (state, action) => {
      state.job = action.payload;
      state.status = SUCCEEDED;
    },
    [fetchJobById.rejected]: (state, action) => {
      state.error = action.error;
      state.status = FAILED;
    },
  },
});

export default jobSlice.reducer;
