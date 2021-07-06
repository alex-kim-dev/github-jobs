import { Button } from '@components/controls';
import { Container } from '@components/layout';
import { jobPropType } from '@utils/types';
import { arrayOf, bool, func } from 'prop-types';
import { createUseStyles } from 'react-jss';

import JobCard from '../JobCard/JobCard';

const useStyles = createUseStyles(({ breakpoints: { smUp, mdUp } }) => ({
  grid: {
    display: 'grid',
    gridGap: '2.4rem',
    marginTop: '3.2rem',

    [smUp]: {
      gridGap: '4rem 1.1rem',
      gridTemplateColumns: 'repeat(2, 1fr)',
      marginTop: '4.5rem',
    },

    [mdUp]: {
      gridColumnGap: '3rem',
      gridTemplateColumns: 'repeat(3, 1fr)',
      marginTop: '8rem',
    },
  },

  loadMore: {
    marginTop: '3.2rem',
    textAlign: 'center',

    [smUp]: {
      marginTop: '5.6rem',
    },
  },
}));

const JobList = ({ list, isLoading = false, onLoadMore }) => {
  const css = useStyles();

  if (list.length === 0) return null;

  return (
    <Container>
      <ul className={css.grid}>
        {list.map((job) => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
      {onLoadMore && (
        <div className={css.loadMore}>
          <Button loading={isLoading} onClick={onLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

JobList.propTypes = {
  list: arrayOf(jobPropType).isRequired,
  isLoading: bool,
  onLoadMore: func,
};

export default JobList;
