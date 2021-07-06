import { Container } from '@components/layout';
import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  error: {
    color: c.textAlt,
    fontSize: '2.4rem',
    lineHeight: '125%',
    paddingTop: '3.2rem',
    textAlign: 'center',
  },
}));

const Feedback = ({ children = 'Error', className = '' }) => {
  const css = useStyles();

  return (
    <Container maxWidth='sm' className={className}>
      <div className={css.error}>{children}</div>
    </Container>
  );
};

Feedback.propTypes = {
  children: string,
  className: string,
};

export default Feedback;
