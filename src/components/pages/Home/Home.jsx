import Button from '@components/common/Button';
import Container from '@components/layout/Container';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { fetchJobList, saveSearchParams } from '@/store/jobsList/jobList.slice';
import { parseSearchQuery } from '@/utils';
import {
  FAILED,
  INITIAL,
  LOADING,
  SUCCEEDED,
} from '@/utils/constants/statuses';

import ErrorMessage from './ErrorMessage';
import Grid from './Grid';
import Search from './Search';

const useStyles = createUseStyles(({ breakpoints: { smUp, mdUp } }) => ({
  loadMore: {
    marginBottom: '6.2rem',
    marginTop: '3.2rem',
    textAlign: 'center',

    [smUp]: {
      marginTop: '5.6rem',
    },

    [mdUp]: {
      marginBottom: '10.4rem',
    },
  },
}));

const Home = () => {
  const css = useStyles();
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

  const handleLoadMoreClick = () => {
    if (status === LOADING) return;
    dispatch(fetchJobList());
  };

  if (status === FAILED) return <ErrorMessage message={errMsg} />;

  if (status === SUCCEEDED && list.length === 0)
    return <ErrorMessage message={noResultsMsg} />;

  return (
    <>
      <Search />
      <Grid jobList={list} />
      <Container>
        <div className={css.loadMore}>
          <Button loading={status === LOADING} onClick={handleLoadMoreClick}>
            Load More
          </Button>
        </div>
      </Container>
    </>
  );
};

Home.propTypes = {};

export default Home;
