import logo from '@assets/desktop/logo.svg';
import { string } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  logo: {
    height: 'auto',
    objectFit: 'contain',
    width: '100%',
  },
});

const Img = ({ src = logo, alt = 'Devjobs logo' }) => {
  const css = useStyles();

  return <img src={src} loading='lazy' alt={alt} className={css.logo} />;
};

Img.propTypes = {
  src: string,
  alt: string,
};

export default Img;
