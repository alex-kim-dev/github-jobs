import { createSlice } from '@reduxjs/toolkit';

import { light } from '@/utils/constants/themes';

const initialState = {
  theme: light,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    switchTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { switchTheme } = uiSlice.actions;

export default uiSlice.reducer;
