import backDesktop from '@assets/desktop/bg-pattern-header.svg';
import logo from '@assets/desktop/logo.svg';
import IconMoon from '@assets/icons/icon-moon.svg';
import IconSun from '@assets/icons/icon-sun.svg';
import backMobile from '@assets/mobile/bg-pattern-header.svg';
import backTablet from '@assets/tablet/bg-pattern-header.svg';
import { Toggle } from '@components/controls';
import { DARK, LIGHT } from '@constants/themes';
import { resetSearchParams } from '@store/jobs/jobs.slice';
import { switchTheme } from '@store/ui/ui.slice';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '../Container/Container';

const useStyles = createUseStyles(({ breakpoints: { smUp, mdUp } }) => ({
  header: {
    background: `center top / 100% 100% no-repeat url(${backMobile})`,
    marginBottom: '-4rem',
    paddingBottom: '6.8rem',
    paddingTop: '3.2rem',

    [smUp]: {
      backgroundImage: `url(${backTablet})`,
      paddingBottom: '8.2rem',
      paddingTop: '4.2rem',
    },

    [mdUp]: {
      backgroundImage: `url(${backDesktop})`,
      paddingBottom: '8rem',
      paddingTop: '4.5rem',
    },
  },

  inner: {
    alignItems: 'flex-start',
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
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const handleToggle = () => {
    const newTheme = theme === LIGHT ? DARK : LIGHT;
    dispatch(switchTheme(newTheme));
  };

  return (
    <header className={css.header}>
      <Container>
        <div className={css.inner}>
          <Link to='/' onClick={() => dispatch(resetSearchParams())}>
            <img src={logo} alt='Devjobs - Home' />
          </Link>
          <Toggle
            label='Switch theme'
            iconLeft={<IconSun />}
            iconRight={<IconMoon />}
            onChange={handleToggle}
            checked={theme === DARK}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
