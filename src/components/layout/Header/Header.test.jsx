import { renderWithTheme } from '@helpers/test-utils';
import setupStore from '@store';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchMediaPolyfill from 'mq-polyfill';
import { Provider as StoreProvider } from 'react-redux';

import Header from './Header';

matchMediaPolyfill(window);

jest.mock('react-router-dom', () => ({
  Link: () => null,
}));

test('Switching theme', () => {
  renderWithTheme(
    <StoreProvider store={setupStore()}>
      <Header />
    </StoreProvider>,
  );

  const themeToggle = screen.getByRole('checkbox', { name: /Switch theme/i });
  expect(themeToggle).not.toBeChecked();

  userEvent.click(themeToggle);
  expect(themeToggle).toBeChecked();
});
