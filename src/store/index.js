import { configureStore } from '@reduxjs/toolkit';

import jobReducer from './job/job.slice';
import jobListReducer from './jobsList/jobList.slice';
import uiReducer from './ui/ui.slice';

export default configureStore({
  reducer: {
    jobList: jobListReducer,
    job: jobReducer,
    ui: uiReducer,
  },
});
