import { instanceOf, shape, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

import { useBreakpoint } from '@/hooks';

import Button from '../../common/Button';
import Logo from '../../common/Logo';

const useStyles = createUseStyles(({ breakpoints: { smUp }, colors: c }) => ({
  wrapper: {
    display: 'grid',
    gridTemplate: '2.5rem 2.5rem auto / auto',

    [smUp]: {
      display: 'flex',
    },
  },

  logo: {
    alignItems: 'center',
    backgroundColor: c.neutral,
    borderRadius: '1.5rem',
    display: 'flex',
    gridArea: '1 / 1 / span 2',
    justifySelf: 'center',
    overflow: 'hidden',
    zIndex: 1,

    [smUp]: {
      borderRadius: '0.6rem 0 0 0.6rem',
    },
  },

  body: {
    alignItems: 'center',
    backgroundColor: c.back,
    borderRadius: '0.6rem',
    display: 'flex',
    flex: 1,
    flexFlow: 'column',
    gridArea: '2 / 1 / span 2',
    padding: '4.9rem 3.2rem 3.2rem',
    textAlign: 'center',
    wordBreak: 'break-word',

    [smUp]: {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      flexFlow: 'row',
      justifyContent: 'space-between',
      padding: '4.2rem 4rem',
      textAlign: 'left',
    },

    '& > * + *': {
      marginTop: '2.4rem',

      [smUp]: {
        marginLeft: '2rem',
        marginTop: 0,
      },
    },
  },

  heading: {
    color: c.text,
    fontSize: '2rem',
    fontWeight: 700,

    [smUp]: {
      fontSize: '2.4rem',
    },
  },

  subheading: {
    color: c.textAlt,
    marginTop: '1.3rem',
  },
}));

const Heading = ({ data: { company, url, logoUrl } }) => {
  const css = useStyles();
  const isSmUp = useBreakpoint('smUp');

  const website = url?.hostname ?? '';

  return (
    <header className={css.wrapper}>
      <div className={css.logo}>
        <Logo
          src={logoUrl || undefined}
          alt={`${company} logo`}
          size={isSmUp ? 'large' : 'small'}
        />
      </div>
      <div className={css.body}>
        <div>
          <h2 className={css.heading}>{company}</h2>
          <p className={css.subheading}>{website}</p>
        </div>
        <Button
          as='a'
          href={url}
          target='_blank'
          rel='noreferrer'
          variant='secondary'
        >
          Company Site
        </Button>
      </div>
    </header>
  );
};

Heading.propTypes = {
  data: shape({
    company: string,
    url: instanceOf(URL),
    logoUrl: string,
  }).isRequired,
};

export default Heading;
