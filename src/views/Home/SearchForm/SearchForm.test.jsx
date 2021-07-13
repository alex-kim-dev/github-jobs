import 'whatwg-fetch';

import { SUCCEEDED } from '@constants/statuses';
import { LIGHT } from '@constants/themes';
import { renderWithTheme } from '@helpers/test-utils';
import { useBreakpoint } from '@hooks';
import { saveSearchParams } from '@store/jobs/jobs.slice';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import matchMediaPolyfill from 'mq-polyfill';
import { useSelector } from 'react-redux';
import { Router } from 'react-router-dom';

import SearchForm from './SearchForm';

matchMediaPolyfill(window);

const state = {
  filledParams: {
    jobList: {
      status: SUCCEEDED,
      params: {
        description: 'js',
        location: 'russ',
        isFullTime: true,
      },
    },
    ui: { theme: LIGHT },
  },
  emptyParams: {
    jobList: {
      status: SUCCEEDED,
      params: {
        description: '',
        location: '',
        isFullTime: false,
      },
    },
    ui: { theme: LIGHT },
  },
};

jest.mock('@hooks');
jest.mock('@store/jobs/jobs.slice');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => () => {}),
}));

describe('SearchForm', () => {
  afterEach(() => {
    useBreakpoint.mockReset();
    useSelector.mockReset();
  });

  it('sets default values on wide screen', async () => {
    useBreakpoint.mockReturnValue(true);
    useSelector.mockImplementation((selector) => selector(state.filledParams));

    renderWithTheme(
      <Router history={createMemoryHistory()}>
        <SearchForm />
      </Router>,
    );

    expect(screen.getByRole('form')).toHaveFormValues({
      description: 'js',
      location: 'russ',
      fullTime: true,
    });
    expect(screen.getByRole('button', { name: /search/i })).toBeEnabled();
    expect(
      screen.queryByRole('button', { name: /show filters/i }),
    ).not.toBeInTheDocument();
  });

  it('sets default values on narrow screen', async () => {
    useBreakpoint.mockReturnValue(false);
    useSelector.mockImplementation((selector) => selector(state.filledParams));

    renderWithTheme(
      <Router history={createMemoryHistory()}>
        <SearchForm />
      </Router>,
    );

    expect(
      screen.getByRole('textbox', { name: 'description' }),
    ).toHaveDisplayValue('js');
    expect(screen.getByRole('button', { name: /search/i })).toBeEnabled();
    expect(
      screen.queryByRole('textbox', { name: 'location' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('checkbox', { name: 'fullTime' }),
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /show filters/i }));

    expect(screen.getByLabelText('location')).toHaveDisplayValue('russ');
    expect(screen.getByLabelText(/^full time/i)).toBeChecked();
    expect(screen.getByText(/^search$/i)).toBeInTheDocument();
  });

  it('saves params & changes location on submit (wide screen)', () => {
    useBreakpoint.mockReturnValue(true);
    useSelector.mockImplementation((selector) => selector(state.emptyParams));

    const history = createMemoryHistory();
    renderWithTheme(
      <Router history={history}>
        <SearchForm />
      </Router>,
    );

    userEvent.type(
      screen.getByRole('textbox', { name: 'description' }),
      'python',
    );
    userEvent.type(screen.getByRole('textbox', { name: 'location' }), 'japan');
    userEvent.click(screen.getByRole('checkbox', { name: /full time/i }));
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(saveSearchParams).toHaveBeenCalledWith({
      description: 'python',
      location: 'japan',
      isFullTime: true,
    });

    expect(history.location.pathname).toBe('/');
    expect(history.location.search).toBe(
      '?search=python&location=japan&full_time=on',
    );
  });

  it('saves params & changes location on submit (narrow screen)', () => {
    useBreakpoint.mockReturnValue(false);
    useSelector.mockImplementation((selector) => selector(state.emptyParams));

    const history = createMemoryHistory();
    renderWithTheme(
      <Router history={history}>
        <SearchForm />
      </Router>,
    );

    userEvent.type(
      screen.getByRole('textbox', { name: 'description' }),
      'python',
    );
    userEvent.click(screen.getByRole('button', { name: /show filters/i }));
    userEvent.type(screen.getByLabelText('location'), 'japan');
    userEvent.click(screen.getByLabelText(/^full time/i));
    userEvent.click(screen.getByText(/^search$/i));

    expect(saveSearchParams).toHaveBeenCalledWith({
      description: 'python',
      location: 'japan',
      isFullTime: true,
    });

    expect(history.location.pathname).toBe('/');
    expect(history.location.search).toBe(
      '?search=python&location=japan&full_time=on',
    );
  });
});
