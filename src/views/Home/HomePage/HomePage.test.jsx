import 'whatwg-fetch';

import { renderPage } from '@helpers/test-utils';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import matchMediaPolyfill from 'mq-polyfill';
import { rest } from 'msw';
import { Router } from 'react-router-dom';

import { ITEMS_IN_PAGE } from '@/__mocks__/jobsApi/handlers';
import server from '@/__mocks__/jobsApi/server';

import HomePage from './HomePage';

matchMediaPolyfill(window);
const API = 'https://jobs.github.com';

describe('Home page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('loads and displays search form and list of jobs', async () => {
    renderPage(
      <Router history={createMemoryHistory()}>
        <HomePage />
      </Router>,
    );

    expect(screen.getByRole('form')).toBeInTheDocument();

    const searchBtn = screen.getByRole('button', { name: /search/i });
    expect(searchBtn).toBeDisabled();

    const jobList = await screen.findByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(
      ITEMS_IN_PAGE,
    );

    expect(searchBtn).toBeEnabled();

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows filtered list when loading with a search query', async () => {
    const history = createMemoryHistory();
    history.push('/?search=node&location=united+states&full_time=on');
    renderPage(
      <Router history={history}>
        <HomePage />
      </Router>,
    );

    expect(screen.getByRole('form')).toHaveFormValues({
      description: 'node',
      location: 'united states',
      fullTime: true,
    });

    const jobList = await screen.findByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(2);
    expect(within(jobList).getAllByText(/^united states$/i)).toHaveLength(2);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows filtered list after using the form', async () => {
    renderPage(
      <Router history={createMemoryHistory()}>
        <HomePage />
      </Router>,
    );

    const searchBtn = screen.getByRole('button', { name: /search/i });
    expect(searchBtn).toBeDisabled();
    await waitFor(() => {
      expect(searchBtn).toBeEnabled();
    });

    userEvent.type(
      screen.getByRole('textbox', { name: 'description' }),
      'node',
    );
    userEvent.type(
      screen.getByRole('textbox', { name: 'location' }),
      'united states',
    );
    userEvent.click(screen.getByRole('checkbox', { name: /full time/i }));
    userEvent.click(searchBtn);

    expect(searchBtn).toBeDisabled();
    await waitFor(() => {
      expect(searchBtn).toBeEnabled();
    });

    const jobList = screen.getByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(2);
    expect(within(jobList).getAllByText(/^united states$/i)).toHaveLength(2);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows "nothing found" if the list is empty', async () => {
    const history = createMemoryHistory();
    history.push('/?location=russia&full_time=on');
    renderPage(
      <Router history={history}>
        <HomePage />
      </Router>,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /nothing found/i,
    );
  });

  it('shows error message if request failed', async () => {
    server.use(
      rest.get(`${API}/positions.json`, (req, res, ctx) => {
        return res.once(ctx.status(500));
      }),
    );

    renderPage(
      <Router history={createMemoryHistory()}>
        <HomePage />
      </Router>,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /Error while getting jobs/i,
    );
  });

  it('shows more jobs on clicking load more and hides the btn', async () => {
    renderPage(
      <Router history={createMemoryHistory()}>
        <HomePage />
      </Router>,
    );

    const jobList = await screen.findByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(
      ITEMS_IN_PAGE,
    );

    const loadMoreBtn = screen.getByRole('button', { name: /load more/i });
    userEvent.click(loadMoreBtn);

    expect(loadMoreBtn).toBeDisabled();

    await waitFor(() => {
      expect(within(jobList).getAllByRole('listitem')).toHaveLength(15);
    });
    expect(loadMoreBtn).not.toBeInTheDocument();
  });

  it('shows error message below list after failed load more', async () => {
    renderPage(
      <Router history={createMemoryHistory()}>
        <HomePage />
      </Router>,
    );

    const jobList = await screen.findByRole('list');

    server.use(
      rest.get(`${API}/positions.json`, (req, res, ctx) => {
        return res.once(ctx.status(500));
      }),
    );

    userEvent.click(screen.getByRole('button', { name: /load more/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /Error while getting jobs/i,
    );
    expect(jobList).toBeInTheDocument();
  });
});
