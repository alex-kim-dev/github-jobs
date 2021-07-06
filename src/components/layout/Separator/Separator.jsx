import { hexToRgba } from '@helpers';
import { bool } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useSeparatorStyles = createUseStyles(({ colors: c }) => ({
  separator: ({ vertical }) => ({
    backgroundColor: hexToRgba(c.textAlt, 0.2),
    height: vertical ? '100%' : '0.1rem',
    width: vertical ? '0.1rem' : '100%',
  }),
}));

const Separator = ({ vertical = false }) => {
  const css = useSeparatorStyles({ vertical });

  return <div className={css.separator} />;
};

Separator.propTypes = {
  vertical: bool,
};

export default Separator;
