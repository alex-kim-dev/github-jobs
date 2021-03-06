import { DARK } from '@constants/themes';
import {
  bool,
  element,
  elementType,
  oneOf,
  oneOfType,
  string,
} from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

const useStyles = createUseStyles(({ colors: c }) => ({
  button: ({ variant, fullWidth, hasIcon, loading, currentTheme }) => {
    const btnColors = {
      primary: {
        back: c.accent,
        backHover: c.accentAlt,
        text: '#fff',
      },
      secondary: {
        back: c.neutral,
        backHover: c.neutralAlt,
        text: currentTheme === DARK ? '#fff' : c.accent,
      },
      neutral: {
        back: 'transparent',
        backHover: c.neutral,
        text: currentTheme === DARK ? '#fff' : c.textAlt,
      },
    };

    return {
      backgroundColor: btnColors[variant].back,
      border: 0,
      borderRadius: '0.5rem',
      color: loading ? 'transparent' : btnColors[variant].text,
      cursor: 'pointer',
      display: 'inline-flex',
      flex: '0 0 auto',
      fontSize: '1.6rem',
      fontWeight: 700,
      justifyContent: 'center',
      padding: [
        hasIcon ? '1.4rem' : '1.6rem',
        hasIcon || fullWidth ? '1.4rem' : '2.8rem',
      ],
      position: 'relative',
      textAlign: 'center',
      textDecoration: 'none',
      transition: 'background-color 0.2s',
      width: fullWidth && '100%',

      '& svg path': {
        fill: loading ? 'transparent' : btnColors[variant].text,
      },

      '&:hover': {
        backgroundColor: btnColors[variant].backHover,
      },
    };
  },

  spinner: {
    animation: '$spin 1s infinite linear',
    border: '0.3rem solid rgba(255, 255, 255, 0.4)',
    borderLeft: '0.3rem solid #fff',
    borderRadius: '50%',
    display: 'block',
    height: '2.4rem',
    left: 'calc(50% - 1.2rem)',
    position: 'absolute',
    top: 'calc(50% - 1.2rem)',
    width: '2.4rem',
  },

  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
}));

const Button = ({
  as: Element = 'button',
  variant = 'primary',
  fullWidth = false,
  loading = false,
  children,
  ...props
}) => {
  const currentTheme = useSelector((state) => state.ui.theme);
  const hasIcon = typeof children !== 'string';
  const css = useStyles({ variant, fullWidth, hasIcon, loading, currentTheme });

  return (
    <Element className={css.button} {...props} disabled={loading}>
      {children}
      {loading && <span className={css.spinner} />}
    </Element>
  );
};

Button.propTypes = {
  as: elementType,
  variant: oneOf(['primary', 'secondary', 'neutral']),
  fullWidth: bool,
  loading: bool,
  children: oneOfType([string, element]).isRequired,
};

export default Button;
