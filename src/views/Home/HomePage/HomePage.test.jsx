import 'whatwg-fetch';

import { renderPage } from '@helpers/test-utils';
import { screen, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import matchMediaPolyfill from 'mq-polyfill';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Router } from 'react-router-dom';

import data from '@/__mocks__/jobsApi/data.json';
import { ITEMS_IN_PAGE } from '@/__mocks__/jobsApi/handlers';

import HomePage from './HomePage';

matchMediaPolyfill(window);
const API = 'https://jobs.github.com';

describe('Home page', () => {
  const server = setupServer(
    rest.get(`${API}/positions.json`, (req, res, ctx) =>
      res(ctx.json(data.slice(0, ITEMS_IN_PAGE))),
    ),
  );

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
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();

    const jobList = await screen.findByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(
      ITEMS_IN_PAGE,
    );
  });

  it('shows feedback on fetch error', async () => {
    server.use(
      rest.get(`${API}/positions.json`, (req, res, ctx) =>
        res.once(ctx.status(500)),
      ),
    );

    renderPage(
      <Router history={createMemoryHistory()}>
        <HomePage />
      </Router>,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Error while getting jobs, please try again',
    );
  });
});
