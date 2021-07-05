import '@fontsource/kumbh-sans/300.css';
import '@fontsource/kumbh-sans/400.css';
import '@fontsource/kumbh-sans/700.css';
import 'reset-css';

import { AppContainer, Header } from '@components/layout';
import { DARK } from '@constants/themes';
import { useThemePreference } from '@hooks';
import { switchTheme } from '@store/ui/ui.slice';
import { HomePage } from '@views/Home';
import { JobPage } from '@views/Job';
import { useLayoutEffect } from 'react';
import { ThemeProvider } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import theme from './theme';

const App = () => {
  const currentTheme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();
  const isDarkThemePreferred = useThemePreference();

  useLayoutEffect(() => {
    if (isDarkThemePreferred) dispatch(switchTheme(DARK));
  }, [isDarkThemePreferred, dispatch]);

  return (
    <ThemeProvider theme={{ ...theme, colors: theme.colors[currentTheme] }}>
      <AppContainer>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/:id'>
              <JobPage />
            </Route>
            <Route exact path='/'>
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
