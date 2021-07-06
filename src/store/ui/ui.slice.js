import { LIGHT } from '@constants/themes';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: LIGHT,
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
