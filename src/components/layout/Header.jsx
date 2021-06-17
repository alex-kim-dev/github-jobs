import backDesktop from '@assets/desktop/bg-pattern-header.svg';
import logo from '@assets/desktop/logo.svg';
import IconMoon from '@assets/icons/icon-moon.svg';
import IconSun from '@assets/icons/icon-sun.svg';
import backMobile from '@assets/mobile/bg-pattern-header.svg';
import backTablet from '@assets/tablet/bg-pattern-header.svg';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import { toggleTheme } from '@/actions';
import { useDispatch, useStore } from '@/hooks';

import Toggle from '../common/Toggle';
import Container from './Container';

const useStyles = createUseStyles(({ breakpoints: { smUp, mdUp } }) => ({
  header: {
    background: `center top / 100% 100% no-repeat url(${backMobile})`,
    marginBottom: '-4rem',
    paddingBottom: '7.2rem',
    paddingTop: '3.2rem',

    [smUp]: {
      backgroundImage: `url(${backTablet})`,
      paddingBottom: '8.6rem',
      paddingTop: '4.2rem',
    },

    [mdUp]: {
      backgroundImage: `url(${backDesktop})`,
      paddingBottom: '8.5rem',
      paddingTop: '4.5rem',
    },
  },

  inner: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'space-between',

    '& > :not(:last-child)': {
      marginRight: '1.6rem',
    },
  },
}));

const Header = () => {
  const css = useStyles();
  const { theme } = useStore();
  const dispatch = useDispatch();

  return (
    <header className={css.header}>
      <Container>
        <div className={css.inner}>
          <Link to='/'>
            <img src={logo} alt='Devjobs' />
          </Link>
          <Toggle
            label='Switch theme'
            iconLeft={<IconSun />}
            iconRight={<IconMoon />}
            onChange={() => dispatch(toggleTheme())}
            checked={theme === 'dark'}
          />
        </div>
      </Container>
    </header>
  );
};

Header.propTypes = {};

export default Header;
