import { Logo, Status } from '@components/content';
import { shape } from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplate: '2.5rem 2.5rem 1fr / auto',
    height: '100%',
  },

  logo: {
    borderRadius: '1.5rem',
    gridArea: '1 / 1 / span 2',
    justifySelf: 'start',
    marginLeft: '3.2rem',
    overflow: 'hidden',
    zIndex: 1,
  },

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
  const css = useStyles();

  const { id, contract, postedAt, company, location, position, logo } = job;

  return (
    <div className={css.wrapper}>
      <div className={css.logo}>
        <Logo src={logo || undefined} alt={`${company} logo`} />
      </div>
      <div className={css.body}>
        <div>
          <Status list={[postedAt, contract]} />
          <h3 className={css.title}>
            <Link to={`/${id}`}>{position}</Link>
          </h3>
          <p className={css.company}>{company}</p>
        </div>
        <p className={css.location}>{location}</p>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: shape().isRequired,
};

export default JobCard;
