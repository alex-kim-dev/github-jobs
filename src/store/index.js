import { configureStore } from '@reduxjs/toolkit';

import jobListReducer from './jobs/jobs.slice';
import uiReducer from './ui/ui.slice';

export default configureStore({
  reducer: {
    jobList: jobListReducer,
    ui: uiReducer,
  },
});
