import iconCheck from '@assets/desktop/icon-check.svg';
import { bool, func, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

import { hexToRgba } from '@/utils';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    alignItems: 'center',
    color: c.text,
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1.6rem',
    fontWeight: 700,
    paddingBottom: '1.2rem',
    paddingTop: '1.2rem',
    whiteSpace: 'nowrap',

    '& > input:checked + span': {
      background: `center no-repeat url(${iconCheck}), ${c.accent}`,

      '&:hover': {
        backgroundColor: c.accentAlt,
      },
    },

    '& > input:focus + span': {
      outline: `0.2rem solid ${c.text}`,
    },
  },

  box: {
    backgroundColor: hexToRgba(c.text, 0.1),
    borderRadius: '0.3rem',
    display: 'block',
    height: '2.4rem',
    marginRight: '1.6rem',
    transition: 'backgroundColor 0.15s',
    width: '2.4rem',

    '&:hover': {
      backgroundColor: hexToRgba(c.accent, 0.25),
    },
  },

  label: {
    transform: 'translateY(0.2rem)',
  },
}));

const Checkbox = ({ label, checked = false, onChange = () => {} }) => {
  const css = useStyles();

  return (
    <label className={css.wrapper}>
      <input
        className='sr-only'
        type='checkbox'
        onChange={onChange}
        checked={checked}
      />
      <span className={css.box} />
      <span className={css.label}>{label}</span>
    </label>
  );
};

Checkbox.propTypes = {
  label: string.isRequired,
  checked: bool,
  onChange: func,
};

export default Checkbox;
