import { Feedback } from '@components/content';
import { FAILED, INITIAL, LOADING, SUCCEEDED } from '@constants/statuses';
import { parseSearchQuery } from '@helpers';
import { fetchJobList, saveSearchParams } from '@store/jobs/jobs.slice';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ITEMS_IN_PAGE } from '@/apiMock/handlers';

import JobList from '../JobList/JobList';
import SearchForm from '../SearchForm/SearchForm';

const useStyles = createUseStyles(({ breakpoints: { mdUp } }) => ({
  main: {
    paddingBottom: '6.2rem',

    [mdUp]: {
      paddingBottom: '10.4rem',
    },
  },
}));

const HomePage = () => {
  const css = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const status = useSelector((state) => state.jobList.status);
  const list = useSelector((state) => state.jobList.list);

  const searchParams = parseSearchQuery(location.search);
  const isLastPage = list.length % ITEMS_IN_PAGE !== 0;

  useEffect(() => {
    if (status === INITIAL) {
      dispatch(saveSearchParams(searchParams));
      dispatch(fetchJobList());
    }
  }, [status, dispatch, searchParams]);

  const loadMore = () => {
    if (status === LOADING) return;
    dispatch(fetchJobList());
  };

  return (
    <main className={css.main}>
      <SearchForm />
      <JobList
        list={list}
        isLoading={status === LOADING}
        onLoadMore={isLastPage ? undefined : loadMore}
      />
      {status === FAILED && (
        <Feedback>Error while getting jobs, please try again</Feedback>
      )}
      {status === SUCCEEDED && list.length === 0 && (
        <Feedback>Nothing found</Feedback>
      )}
    </main>
  );
};

export default HomePage;
