import Container from '@components/layout/Container';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';

import { useStore } from '@/hooks';

import ScrollToTop from '../../common/ScrollToTop';
import Content from './Content';
import Cta from './Cta';
import Heading from './Heading';
import Summary from './Summary';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
});

const Position = () => {
  const css = useStyles();
  const { id } = useParams();
  const {
    jobs: { list },
  } = useStore();

  const position = list.find((record) => record.id === id);

  if (!position)
    return (
      <>
        <ScrollToTop />
        <Container maxWidth='sm'>No data</Container>
      </>
    );

  const {
    company,
    logo,
    url,
    createdAt,
    description,
    howToApply,
    location,
    title,
    type,
  } = position;

  return (
    <>
      <ScrollToTop />
      <article className={css.wrapper}>
        <Container maxWidth='sm'>
          <Heading data={{ company, url, logoUrl: logo }} />
          <Content
            data={{ createdAt, type, title, location, url, description }}
          />
          {howToApply && <Summary content={howToApply} />}
        </Container>
        <Cta data={{ title, company, url }} />
      </article>
    </>
  );
};

Position.propTypes = {};

export default Position;
