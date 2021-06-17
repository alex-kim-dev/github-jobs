import clsx from 'clsx';
import { node, oneOf } from 'prop-types';
import { createUseStyles } from 'react-jss';

import { capitalize } from '@/utils';

const useStyles = createUseStyles(
  ({ breakpoints: { smUp, mdUp }, container }) => ({
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '2.4rem',
      paddingRight: '2.4rem',
      width: '100%',

      [smUp]: {
        maxWidth: container.width.sm,
        paddingLeft: '4rem',
        paddingRight: '4rem',
      },

      [mdUp]: {
        maxWidth: container.width.md,
        paddingLeft: '4.5rem',
        paddingRight: '4.5rem',
      },
    },

    maxWidthSm: {
      [smUp]: {
        maxWidth: container.width.sm,
      },
    },

    maxWidthMd: {
      [mdUp]: {
        maxWidth: container.width.md,
      },
    },
  }),
);

const Container = ({ maxWidth = 'md', children }) => {
  const css = useStyles();

  return (
    <div
      className={clsx(css.container, css[`maxWidth${capitalize(maxWidth)}`])}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  maxWidth: oneOf(['sm', 'md']),
  children: node,
};

export default Container;
