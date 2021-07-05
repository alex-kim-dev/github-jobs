import { node } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  '@global': {
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },

    html: {
      boxSizing: 'border-box',
      fontSize: '62.5%',
    },

    body: {
      backgroundColor: c.backAlt,
      fontFamily: 'Kumbh Sans, sans-serif',
      fontSize: '1.6rem',
    },

    'button, input': {
      fontFamily: 'inherit',
    },

    '.sr-only': {
      border: 0,
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
    },
  },

  wrapper: {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '100vh',
  },
}));

const AppContainer = ({ children = null }) => {
  const css = useStyles();

  return <div className={css.wrapper}>{children}</div>;
};

AppContainer.propTypes = {
  children: node,
};

export default AppContainer;
