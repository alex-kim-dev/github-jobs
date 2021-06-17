import Button from '@components/common/Button';
import Container from '@components/layout/Container';
import { useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'react-router-dom';

import { getJobsList, saveSearch } from '@/actions';
import { useDispatch, useStore } from '@/hooks';
import { parseSearchQuery } from '@/utils';

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
  const {
    search,
    jobs: { status, list },
  } = useStore();
  const dispatch = useDispatch();
  const css = useStyles();
  const location = useLocation();

  useLayoutEffect(() => {
    // TODO if params are the same || list is empty ?
    // or useParams -> useState(initial) -> useEffect to fetch once on App mount
    const searchParams = parseSearchQuery(location.search);
    dispatch(saveSearch(searchParams));
    dispatch(getJobsList(searchParams));
  }, [dispatch, location]);

  const errMsg = 'Error while getting jobs, please try again';
  const noResultsMsg = 'Nothing found';

  const handleLoadMoreClick = () => {
    if (status === 'loading') return;
    dispatch(getJobsList(search));
  };

  if (status === 'failed') return <ErrorMessage message={errMsg} />;

  if (status === 'noresults') return <ErrorMessage message={noResultsMsg} />;

  return (
    <>
      <Search />
      <Grid data={list} />
      <Container>
        <div className={css.loadMore}>
          <Button loading={status === 'loading'} onClick={handleLoadMoreClick}>
            Load More
          </Button>
        </div>
      </Container>
    </>
  );
};

Home.propTypes = {};

export default Home;
