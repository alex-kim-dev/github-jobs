import { nanoid } from 'nanoid';
import { arrayOf, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    color: c.textAlt,

    '& > :not(:first-child)::before': {
      backgroundColor: c.textAlt,
      borderRadius: '50%',
      content: '""',
      display: 'inline-block',
      height: '0.4rem',
      marginLeft: '1.2rem',
      marginRight: '1.2rem',
      verticalAlign: 'middle',
      width: '0.4rem',
    },
  },
}));

const Status = ({ list }) => {
  const css = useStyles();

  return (
    <div className={css.wrapper}>
      {list.map((item) => (
        <span key={nanoid()}>{item}</span>
      ))}
    </div>
  );
};

Status.propTypes = {
  list: arrayOf(string).isRequired,
};

export default Status;
