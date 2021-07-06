import { Feedback } from '@components/content';
import { Container, ScrollToTop } from '@components/layout';
import { FAILED, INITIAL, LOADING, SUCCEEDED } from '@constants/statuses';
import { fetchJobById } from '@store/job/job.slice';
import { selectJobById } from '@store/jobsList/jobList.slice';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import JobContent from '../JobContent/JobContent';
import JobCta from '../JobCta/JobCta';
import JobHeading from '../JobHeading/JobHeading';
import JobSummary from '../JobSummary/JobSummary';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexFlow: 'column',
    justifyContent: 'space-between',
  },

  pt: {
    paddingTop: '4rem',
  },
});

const JobPage = () => {
  const css = useStyles();
  const id = Number(useParams().id);
  const jobFromList = useSelector(selectJobById(id));
  const fetchedJob = useSelector((state) => state.job.job);
  const status = useSelector((state) => state.job.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jobFromList) return;

    dispatch(fetchJobById(id));
  }, [dispatch, jobFromList, id]);

  const renderJob = (job) => {
    if (!job) return null;

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
            <JobHeading data={{ company, website, logo }} />
            <JobContent
              data={{
                position,
                postedAt,
                contract,
                location,
                website,
                description,
              }}
            />
            {apply && <JobSummary content={apply} />}
          </Container>
          <JobCta data={{ position, company, website }} />
        </article>
      </>
    );
  };

  return {
    [INITIAL]: () => renderJob(jobFromList),
    [LOADING]: () => <Feedback className={css.pt}>Loading...</Feedback>,
    [FAILED]: () => (
      <Feedback className={css.pt}>Error while getting the job</Feedback>
    ),
    [SUCCEEDED]: () => renderJob(fetchedJob),
  }[status]();
};

export default JobPage;
