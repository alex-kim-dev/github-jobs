import Container from '@components/layout/Container';
import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  error: {
    color: c.textAlt,
    fontSize: '2.4rem',
    marginTop: '8rem',
    textAlign: 'center',
  },
}));

const ErrorMessage = ({ message }) => {
  const css = useStyles();

  return (
    <Container maxWidth='sm'>
      <div className={css.error}>{message}</div>
    </Container>
  );
};

ErrorMessage.propTypes = {
  message: string.isRequired,
};

export default ErrorMessage;
