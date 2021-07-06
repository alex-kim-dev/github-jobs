import { Feedback } from '@components/content';
import { Container, ScrollToTop } from '@components/layout';
import { FAILED, INITIAL, LOADING, SUCCEEDED } from '@constants/statuses';
import { selectJobById } from '@store/jobs/jobs.slice';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import JobsAPI from '@/services/api/JobsAPI';

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
  const [fetchedJob, setFetchedJob] = useState(null);
  const [status, setStatus] = useState(INITIAL);

  useEffect(() => {
    if (jobFromList) return;

    setStatus(LOADING);
    new JobsAPI()
      .fetchJobById(id)
      .then((job) => {
        setFetchedJob(job);
        setStatus(SUCCEEDED);
      })
      .catch(() => {
        setStatus(FAILED);
      });
  }, [jobFromList, id]);

  const renderJob = (job) => {
    if (!job) return null;

    return (
      <>
        <ScrollToTop />
        <article className={css.wrapper}>
          <Container maxWidth='sm'>
            <JobHeading job={job} />
            <JobContent job={job} />
            {job.apply && <JobSummary content={job.apply} />}
          </Container>
          <JobCta job={job} />
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
