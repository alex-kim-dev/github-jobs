import bgPatternSm from '@assets/desktop/bg-pattern-detail-footer.svg';
import bgPatternXs from '@assets/mobile/bg-pattern-detail-footer.svg';
import { HtmlContent } from '@components/content';
import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c, breakpoints: { smUp } }) => ({
  content: {
    lineHeight: '165%',
    marginTop: '2.8rem',
    wordBreak: 'break-word',

    '& a': {
      color: '#fff',
      fontWeight: 700,
    },

    '& code, & pre': {
      backgroundColor: c.accentAlt,
    },

    '& ul > li::before, & ol > li::before': {
      color: '#fff',
    },
  },

  heading: {
    fontSize: '2rem',
    fontWeight: 700,
  },

  section: {
    background: `center / 100% 100% no-repeat url(${bgPatternXs})`,
    backgroundColor: c.accent,
    borderRadius: '0.6rem',
    color: '#fff',
    marginTop: '3.2rem',
    padding: '3.2rem',

    [smUp]: {
      backgroundImage: `url(${bgPatternSm})`,
      padding: '4rem 4.8rem 4.2rem',
    },
  },
}));

const JobSummary = ({ content }) => {
  const css = useStyles();

  return (
    <section className={css.section}>
      <h2 className={css.heading}>How to Apply</h2>
      <div className={css.content}>
        <HtmlContent html={content} />
      </div>
    </section>
  );
};

JobSummary.propTypes = {
  content: string.isRequired,
};

export default JobSummary;
