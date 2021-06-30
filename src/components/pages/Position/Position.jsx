import Container from '@components/layout/Container';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectJobById } from '@/store/jobsList/jobList.slice';

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
  const id = Number(useParams().id);
  const job = useSelector(selectJobById(id));

  if (!job)
    // TODO fetch!
    return (
      <>
        <ScrollToTop />
        <Container maxWidth='sm'>No data</Container>
      </>
    );

  const {
    company,
    logo,
    website,
    postedAt,
    description,
    apply,
    location,
    position,
    contract,
  } = job;

  return (
    <>
      <ScrollToTop />
      <article className={css.wrapper}>
        <Container maxWidth='sm'>
          <Heading data={{ company, website, logo }} />
          <Content
            data={{
              position,
              postedAt,
              contract,
              location,
              website,
              description,
            }}
          />
          {apply && <Summary content={apply} />}
        </Container>
        <Cta data={{ position, company, website }} />
      </article>
    </>
  );
};

export default Position;
