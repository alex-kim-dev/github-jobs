import { actionTypes as at } from './store';
import { makeJobsListUrl, makeJobUrl, normalizeJob } from './utils';

export const toggleTheme = () => ({ type: at.TOGGLE_THEME });

export const saveSearch = (payload) => ({ type: at.SAVE_SEARCH, payload });

export const setJobsStatus = (payload) => ({
  type: at.SET_JOBS_STATUS,
  payload,
});

export const setJobsError = (payload) => ({ type: at.SET_JOBS_ERROR, payload });

export const saveJobsList = (payload) => ({ type: at.SAVE_JOBS_LIST, payload });

export const saveSpecificJob = (payload) => ({
  type: at.SAVE_SPECIFIC_JOB,
  payload,
});

export const getJobsList = (searchParams) => (dispatch) => {
  dispatch(setJobsStatus('loading'));
  dispatch(setJobsError(null));

  const url = makeJobsListUrl(searchParams);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const jobs = data.map(normalizeJob);
      const status = jobs.length === 0 ? 'noresults' : 'idle';
      dispatch(setJobsStatus(status));
      dispatch(saveJobsList(jobs));
    })
    .catch((error) => {
      dispatch(setJobsError(error));
      dispatch(setJobsStatus('failed'));
    });
};

class NotFoundError extends Error {
  constructor(...args) {
    super(args);
    this.name = 'NotFoundError';
  }
}

export const getSpecificJob = (id) => (dispatch) => {
  dispatch(setJobsStatus('loading'));
  dispatch(setJobsError(null));

  const url = makeJobUrl(id);

  fetch(url)
    .then((response) => {
      if (response.status === 404) throw new NotFoundError();
      return response.json();
    })
    .then((data) => {
      const job = normalizeJob(data);
      dispatch(setJobsStatus('idle'));
      dispatch(saveSpecificJob(job));
    })
    .catch((error) => {
      const status = error instanceof NotFoundError ? 'noresults' : 'failed';
      if (status === 'failed') {
        dispatch(setJobsError(error));
      }
      dispatch(setJobsStatus(status));
    });
};
