import Button from '@components/common/Button';
import Container from '@components/layout/Container';
import { useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { fetchJobList } from '@/store/jobsList/jobList.slice';
import {
  failed,
  initial,
  loading,
  succeeded,
} from '@/utils/constants/statuses';

// import { parseSearchQuery } from '@/utils';
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

  useLayoutEffect(() => {
    // const searchParams = parseSearchQuery(location.search);
    // save search
    if (status === initial) dispatch(fetchJobList());
  }, [status, dispatch]);

  const errMsg = 'Error while getting jobs, please try again';
  const noResultsMsg = 'Nothing found';

  const handleLoadMoreClick = () => {
    if (status === loading) return;
    dispatch(fetchJobList());
  };

  if (status === failed) return <ErrorMessage message={errMsg} />;

  if (status === succeeded && list.length === 0)
    return <ErrorMessage message={noResultsMsg} />;

  return (
    <>
      <Search />
      <Grid jobList={list} />
      <Container>
        <div className={css.loadMore}>
          <Button loading={status === loading} onClick={handleLoadMoreClick}>
            Load More
          </Button>
        </div>
      </Container>
    </>
  );
};

Home.propTypes = {};

export default Home;
