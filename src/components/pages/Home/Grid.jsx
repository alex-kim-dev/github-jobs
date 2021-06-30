import Container from '@components/layout/Container';
import { arrayOf, shape } from 'prop-types';
import { createUseStyles } from 'react-jss';

import Card from './Card';

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
}));

const Grid = ({ jobList }) => {
  const css = useStyles();

  return (
    <Container>
      <ul className={css.grid}>
        {jobList.map((job) => (
          <li key={job.id}>
            <Card job={job} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

Grid.propTypes = {
  jobList: arrayOf(shape({})).isRequired,
};

export default Grid;
