import { HtmlContent, Status } from '@components/content';
import { Button } from '@components/controls';
import { DARK } from '@constants/themes';
import { useBreakpoint } from '@hooks';
import { shape, string } from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

const useStyles = createUseStyles(({ colors: c, breakpoints: { smUp } }) => ({
  description: {
    color: (theme) => (theme === DARK ? '#9daec2' : c.textAlt),
    lineHeight: '165%',
    marginTop: '3.2rem',
    wordBreak: 'break-word',
  },

  heading: {
    color: c.text,
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '100%',
    marginTop: '0.8rem',

    [smUp]: {
      fontSize: '2.8rem',
    },
  },

  location: {
    color: c.accent,
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: '130%',
    marginTop: '1.2rem',
  },

  header: {
    display: 'flex',
    flexFlow: 'column',

    [smUp]: {
      alignItems: 'center',
      flexFlow: 'row',
      justifyContent: 'space-between',
    },

    '& > :first-child': {
      marginBottom: '3.2rem',

      [smUp]: {
        marginBottom: 0,
        marginRight: '2rem',
      },
    },
  },

  section: {
    backgroundColor: c.back,
    borderRadius: '0.6rem',
    marginTop: '2.4rem',
    padding: '4rem 2.4rem 3.2rem',

    [smUp]: {
      marginTop: '3.2rem',
      padding: '4.8rem',
    },
  },
}));

const JobContent = ({
  data: { postedAt, contract, position, location, website, description },
}) => {
  const theme = useSelector((state) => state.ui.theme);
  const css = useStyles(theme);
  const isSmUp = useBreakpoint('smUp');

  return (
    <section className={css.section}>
      <div className={css.header}>
        <div>
          <Status list={[postedAt, contract]} />
          <h3 className={css.heading}>{position}</h3>
          <p className={css.location}>{location}</p>
        </div>
        <Button
          fullWidth={isSmUp ? undefined : true}
          as='a'
          href={website || '#'}
          target='_blank'
          rel='noreferrer'
        >
          Apply Now
        </Button>
      </div>
      <div className={css.description}>
        <HtmlContent html={description} />
      </div>
    </section>
  );
};

JobContent.propTypes = {
  data: shape({
    position: string,
    postedAt: string,
    contract: string,
    location: string,
    website: string,
    description: string,
  }).isRequired,
};

export default JobContent;
