import { ErrorMessage } from '@components/content';
import { FAILED, INITIAL, LOADING, SUCCEEDED } from '@constants/statuses';
import { parseSearchQuery } from '@helpers';
import { fetchJobList, saveSearchParams } from '@store/jobsList/jobList.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ITEMS_IN_PAGE } from '@/apiMock/handlers';

import JobList from '../JobList/JobList';
import SearchForm from '../SearchForm/SearchForm';

const HomePage = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.jobList.status);
  const list = useSelector((state) => state.jobList.list);
  const location = useLocation();
  const searchParams = parseSearchQuery(location.search);

  useEffect(() => {
    if (status === INITIAL) {
      dispatch(saveSearchParams(searchParams));
      dispatch(fetchJobList());
    }
  }, [status, dispatch, searchParams]);

  const errMsg = 'Error while getting jobs, please try again';
  const noResultsMsg = 'Nothing found';
  const isLastPage = list.length % ITEMS_IN_PAGE !== 0;

  const loadMore = () => {
    if (status === LOADING) return;
    dispatch(fetchJobList());
  };

  if (status === FAILED) return <ErrorMessage message={errMsg} />;

  if (status === SUCCEEDED && list.length === 0)
    return <ErrorMessage message={noResultsMsg} />;

  return (
    <>
      <SearchForm />
      <JobList
        list={list}
        isLoading={status === LOADING}
        onLoadMore={isLastPage ? undefined : loadMore}
      />
    </>
  );
};

HomePage.propTypes = {};

export default HomePage;
