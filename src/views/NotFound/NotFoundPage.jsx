import { Feedback } from '@components/content';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pt: {
    paddingTop: '4rem',
  },
});

const NotFoundPage = () => {
  const css = useStyles();

  return (
    <Feedback className={css.pt}>
      The page you are looking for doesn&apos;t exist
    </Feedback>
  );
};

export default NotFoundPage;
