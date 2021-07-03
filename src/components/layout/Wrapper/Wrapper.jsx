import { node } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  '@global': {
    body: {
      backgroundColor: c.backAlt,
    },
  },

  wrapper: {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '100vh',
  },
}));

const Wrapper = ({ children = null }) => {
  const css = useStyles();

  return <div className={css.wrapper}>{children}</div>;
};

Wrapper.propTypes = {
  children: node,
};

export default Wrapper;
