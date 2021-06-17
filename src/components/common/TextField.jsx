import { element, func, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

import { hexToRgba } from '@/utils';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',

    '& > svg': {
      marginRight: '1.6rem',
    },

    '&:focus-within': {
      outline: `0.2rem solid ${c.text}`,
    },
  },

  input: {
    backgroundColor: 'transparent',
    border: 0,
    color: c.text,
    flex: 1,
    fontSize: '1.6rem',
    padding: '1.8rem 0 1.4rem',
    textOverflow: 'ellipsis',
    width: '100%',

    '&:focus': {
      outline: 'none',
    },

    '&:placeholder': {
      color: hexToRgba(c.text, 0.5),
    },
  },
}));

const TextField = ({
  label,
  placeholder = '',
  icon = null,
  value = '',
  onChange = () => {},
}) => {
  const css = useStyles();

  return (
    <div className={css.wrapper}>
      {icon}
      <input
        className={css.input}
        type='text'
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

TextField.propTypes = {
  label: string.isRequired,
  placeholder: string,
  icon: element,
  value: string,
  onChange: func,
};

export default TextField;
