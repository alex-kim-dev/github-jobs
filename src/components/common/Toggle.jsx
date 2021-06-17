import { bool, element, func, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    alignItems: 'center',
    display: 'inline-flex',

    '& > * + *': {
      marginLeft: '1.6rem',
    },
  },

  toggle: {
    backgroundColor: '#fff',
    borderRadius: '1.2rem',
    cursor: 'pointer',
    display: 'block',
    height: '2.4rem',
    padding: '0.5rem',
    width: '4.8rem',

    '& :checked + span': {
      marginLeft: '2.4rem',
    },

    '&:focus-within': {
      boxShadow: `0 0 0 0.2rem #19202d`,
    },

    '&:hover > span': {
      backgroundColor: c.accentAlt,
    },
  },

  knob: {
    backgroundColor: c.accent,
    borderRadius: '50%',
    display: 'block',
    height: '1.4rem',
    transition: 'margin 0.25s',
    width: '1.4rem',
  },
}));

const Toggle = ({
  label,
  checked = false,
  onChange = () => {},
  iconLeft = null,
  iconRight = null,
}) => {
  const css = useStyles({ iconLeft, iconRight });

  return (
    <div className={css.wrapper}>
      {iconLeft}
      <label>
        <span className='sr-only'>{label}</span>
        <span className={css.toggle}>
          <input
            className='sr-only'
            type='checkbox'
            onChange={onChange}
            checked={checked}
          />
          <span className={css.knob} />
        </span>
      </label>
      {iconRight}
    </div>
  );
};

Toggle.propTypes = {
  label: string.isRequired,
  checked: bool,
  onChange: func,
  iconLeft: element,
  iconRight: element,
};

export default Toggle;
