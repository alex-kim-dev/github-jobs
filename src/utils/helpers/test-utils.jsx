import { render } from '@testing-library/react';
import { ThemeProvider } from 'react-jss';
import { Provider as StoreProvider } from 'react-redux';

import store from '@store';
import theme from '@/theme';

const PageWrapper = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={{ ...theme, colors: theme.colors.LIGHT }}>
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
};

const WrapperWithTheme = ({ children }) => {
  return (
    <ThemeProvider theme={{ ...theme, colors: theme.colors.LIGHT }}>
      {children}
    </ThemeProvider>
  );
};

export const renderWithTheme = (ui, options) =>
  render(ui, { wrapper: WrapperWithTheme, ...options });

export const renderPage = (ui, options) =>
  render(ui, { wrapper: PageWrapper, ...options });

export * from '@testing-library/react';
