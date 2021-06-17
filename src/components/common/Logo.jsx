import logo from '@assets/desktop/logo.svg';
import { oneOf, string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const pxToRem = (px) => px / 10;

const logoDimensions = {
  small: 50,
  large: 140,
};

const useStyles = createUseStyles(({ colors: c }) => ({
  wrapper: ({ size }) => ({
    backgroundColor: c.neutral,
    height: `${pxToRem(logoDimensions[size])}rem`,
    overflow: 'hidden',
    width: `${pxToRem(logoDimensions[size])}rem`,
  }),

  logo: {
    objectFit: 'contain',
    width: '100%',
  },
}));

const Logo = ({ src = logo, alt = '', size = 'small' }) => {
  const css = useStyles({ size });

  return (
    <div className={css.wrapper}>
      <img
        src={src}
        loading='lazy'
        alt={alt}
        className={css.logo}
        width={logoDimensions[size]}
        height={logoDimensions[size]}
      />
    </div>
  );
};

Logo.propTypes = {
  src: string,
  alt: string,
  size: oneOf(['small', 'large']),
};

export default Logo;
