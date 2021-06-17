/* eslint-disable react/no-danger */
import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(({ colors: c, breakpoints: { smUp } }) => ({
  content: {
    fontSize: '1.6rem',

    '& > :last-child': {
      marginBottom: 0,
    },

    '& a': {
      color: c.accent,
      fontWeight: 700,
      textDecoration: 'underline',
    },

    '& blockquote': {
      borderLeft: `0.2rem solid ${c.accent}`,
      paddingLeft: '1.4rem',

      [smUp]: {
        paddingLeft: '3.4rem',
      },
    },

    '& code': {
      backgroundColor: c.neutral,
      borderRadius: '0.3rem',
      fontFamily: 'monospace',
      padding: '0.2rem 0.4rem',
    },

    '& em': {
      fontStyle: 'italic',
    },

    '& h1': {
      fontSize: '2rem',
      marginTop: '3.6rem',

      [smUp]: {
        fontSize: '2.4rem',
      },
    },

    '& h1, & h2, & h3': {
      color: c.text,
      fontWeight: 700,
      marginBottom: '2.4rem',
    },

    '& h2': {
      fontSize: '1.8rem',
      marginTop: '3.2rem',

      [smUp]: {
        fontSize: '2.1rem',
      },
    },

    '& h3': {
      fontSize: '1.6rem',
      marginTop: '2.8rem',

      [smUp]: {
        fontSize: '1.8rem',
      },
    },

    '& ol': {
      counterReset: 'ol-counter',

      '& > li': {
        counterIncrement: 'ol-counter',

        '&::before': {
          content: 'counter(ol-counter)',
        },
      },
    },

    '& p': {
      margin: '2.4rem 0',
    },

    '& pre': {
      backgroundColor: c.neutral,
      borderRadius: '0.6rem',
      fontFamily: 'monospace',
      lineHeight: '140%',
      overflow: 'auto',
      padding: '1.6rem',

      '& > code': {
        all: 'unset',
      },
    },

    '& strong': {
      fontWeight: 700,
    },

    '& ul > li::before': {
      content: '"•"',
    },

    '& ul, & ol': {
      marginBottom: '2.4rem',
      marginTop: '2.4rem',
      paddingLeft: '1.6rem',

      [smUp]: {
        paddingLeft: '3.6rem',
      },

      '& > li': {
        marginBottom: '0.8rem',
        marginTop: '0.8rem',
        position: 'relative',

        '&::before': {
          color: c.accent,
          left: '-1.6rem',
          position: 'absolute',
          top: 0,

          [smUp]: {
            left: '-3.6rem',
          },
        },
      },
    },
  },
}));

const HtmlContent = ({ html }) => {
  const css = useStyles();

  return (
    <div className={css.content} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

HtmlContent.propTypes = {
  html: string.isRequired,
};

export default HtmlContent;
