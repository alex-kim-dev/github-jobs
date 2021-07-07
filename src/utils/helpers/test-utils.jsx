import { render } from '@testing-library/react';
import { ThemeProvider } from 'react-jss';

import theme from '@/theme';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={{ ...theme, colors: theme.colors.LIGHT }}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
