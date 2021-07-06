import { Img, Status } from '@components/content';
import { jobPropType } from '@utils/types';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplate: '2.5rem 2.5rem 1fr / auto',
    height: '100%',
  },

  logo: ({ logoBg }) => ({
    alignItems: 'center',
    backgroundColor: logoBg,
    borderRadius: '1.5rem',
    display: 'flex',
    gridArea: '1 / 1 / span 2',
    justifyContent: 'center',
    justifySelf: 'start',
    marginLeft: '3.2rem',
    overflow: 'hidden',
    padding: '0.3rem',
    width: '5rem',
    zIndex: 1,
  }),

  body: {
    backgroundColor: c.back,
    borderRadius: '0.6rem',
    display: 'flex',
    flexFlow: 'column',
    gridArea: '2 / 1 / span 2',
    justifyContent: 'space-between',
    padding: '4.9rem 3.2rem 3.2rem',
    wordBreak: 'break-word',
  },

  title: {
    fontSize: '2rem',
    fontWeight: 700,
    marginTop: '1.6rem',

    '& > a': {
      color: c.text,
      textDecoration: 'none',

      '&:hover': {
        color: c.textAlt,
      },
    },
  },

  company: {
    color: c.textAlt,
    marginTop: '1.7rem',
  },

  location: {
    color: c.accent,
    fontSize: '1.4rem',
    fontWeight: 700,
    justifySelf: 'flex-end',
    lineHeight: '140%',
    marginTop: '2.6rem',
  },
}));

const JobCard = ({ job }) => {
  const css = useStyles({ logoBg: job.logoBackground });

  return (
    <div className={css.wrapper}>
      <div className={css.logo}>
        <Img src={job.logo || undefined} alt={`${job.company} logo`} />
      </div>
      <div className={css.body}>
        <div>
          <Status list={[job.postedAt, job.contract]} />
          <h3 className={css.title}>
            <Link to={`/${job.id}`}>{job.position}</Link>
          </h3>
          <p className={css.company}>{job.company}</p>
        </div>
        <p className={css.location}>{job.location}</p>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: jobPropType.isRequired,
};

export default JobCard;
