import { instanceOf, shape, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

import { useBreakpoint, useStore } from '@/hooks';
import { getRelativeTimeSince } from '@/utils';

import Button from '../../common/Button';
import HtmlContent from '../../common/HtmlContent';
import Status from '../../common/Status';

const useStyles = createUseStyles(({ colors: c, breakpoints: { smUp } }) => ({
  description: {
    color: (theme) => (theme === 'dark' ? '#9daec2' : c.textAlt),
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

const Content = ({
  data: { createdAt, type, title, location, url, description },
}) => {
  const { theme } = useStore();
  const css = useStyles(theme);
  const isSmUp = useBreakpoint('smUp');

  const relativeTime = getRelativeTimeSince(createdAt);

  return (
    <section className={css.section}>
      <div className={css.header}>
        <div>
          <Status list={[relativeTime, type]} />
          <h3 className={css.heading}>{title}</h3>
          <p className={css.location}>{location}</p>
        </div>
        <Button
          fullWidth={isSmUp ? undefined : true}
          as='a'
          href={url || '#'}
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

Content.propTypes = {
  data: shape({
    createdAt: instanceOf(Date),
    type: string,
    title: string,
    location: string,
    url: instanceOf(URL),
    description: string,
  }).isRequired,
};

export default Content;
