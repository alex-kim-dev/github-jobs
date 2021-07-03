import { Button } from '@components/controls';
import { Container } from '@components/layout';
import { useBreakpoint } from '@hooks';
import { shape, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c }) => ({
  flex: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    wordBreak: 'break-word',

    '& > * + *': {
      marginLeft: '2rem',
    },
  },

  footer: {
    backgroundColor: c.back,
    marginTop: '4rem',
    paddingBottom: '2.4rem',
    paddingTop: '2.4rem',
  },

  heading: {
    color: c.text,
    fontSize: '2rem',
    fontWeight: 700,
  },

  subheading: {
    color: c.textAlt,
    marginTop: '1.2rem',
  },
}));

const JobCta = ({ data: { position, company, website } }) => {
  const css = useStyles();
  const isSmUp = useBreakpoint('smUp');

  return (
    <footer className={css.footer}>
      <Container maxWidth='sm'>
        <div className={css.flex}>
          {isSmUp && (
            <div>
              <p className={css.heading}>{position}</p>
              <p className={css.subheading}>{company}</p>
            </div>
          )}
          <Button
            as='a'
            href={website || '#'}
            target='_blank'
            rel='noreferrer'
            variant='secondary'
            fullWidth={!isSmUp}
          >
            Apply Now
          </Button>
        </div>
      </Container>
    </footer>
  );
};

JobCta.propTypes = {
  data: shape({
    position: string,
    company: string,
    website: string,
  }).isRequired,
};

export default JobCta;
