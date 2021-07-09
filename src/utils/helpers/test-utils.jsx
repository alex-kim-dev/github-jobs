import { render } from '@testing-library/react';
import { ThemeProvider } from 'react-jss';
import { Provider as StoreProvider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { HomePage } from '@views/Home';
import { JobPage } from '@views/Job';
import { NotFoundPage } from '@views/NotFound';
import setupStore from '@store';
import theme from '@/theme';
import { AppContainer, Header } from '@components/layout';

const WrapperWithTheme = ({ children }) => {
  return (
    <ThemeProvider theme={{ ...theme, colors: theme.colors.LIGHT }}>
      {children}
    </ThemeProvider>
  );
};

const PageWrapper = ({ children }) => {
  return (
    <StoreProvider store={setupStore()}>
      <ThemeProvider theme={{ ...theme, colors: theme.colors.LIGHT }}>
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
};

const TestApp = ({ history }) => {
  return (
    <StoreProvider store={setupStore()}>
      <ThemeProvider theme={{ ...theme, colors: theme.colors.LIGHT }}>
        <AppContainer>
          <Router history={history || createMemoryHistory()}>
            <Header />
            <Switch>
              <Route exact path='/:id' component={JobPage} />
              <Route exact path='/' component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </AppContainer>
      </ThemeProvider>
    </StoreProvider>
  );
};

export const renderWithTheme = (ui, options) =>
  render(ui, { wrapper: WrapperWithTheme, ...options });

export const renderPage = (ui, options) =>
  render(ui, { wrapper: PageWrapper, ...options });

export const renderApp = (history, options) =>
  render(<TestApp history={history} />, options);
