import 'whatwg-fetch';

import { renderPage } from '@helpers/test-utils';
import { screen, waitFor, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import matchMediaPolyfill from 'mq-polyfill';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';

import data from '@/__mocks__/jobsApi/data.json';
import server from '@/__mocks__/jobsApi/server';

import JobPage from './JobPage';

matchMediaPolyfill(window);
window.scrollTo = jest.fn();

const API = 'https://jobs.github.com';

describe('Home page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('shows fetched job', async () => {
    const jobId = 1;
    const job = data.find(({ id }) => id === jobId);

    const history = createMemoryHistory();
    history.push(`/${jobId}`);
    renderPage(
      <Router history={history}>
        <Route path='/:id' component={JobPage} />
      </Router>,
    );

    const feedback = screen.getByRole('alert');
    expect(feedback).toHaveTextContent(/loading/i);

    expect(await screen.findByRole('article')).toBeInTheDocument();
    expect(feedback).not.toBeInTheDocument();

    expect(
      within(screen.getByRole('banner')).getByText(job.company),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /company site/i })).toHaveAttribute(
      'href',
      job.website,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      job.position,
    );
  });

  it('shows error message on fetch fail', async () => {
    const jobId = 'wrong-id';
    server.use(
      rest.get(`${API}/positions/${jobId}.json`, (req, res, ctx) => {
        return res.once(ctx.status(500));
      }),
    );

    const history = createMemoryHistory();
    history.push(`/${jobId}`);
    renderPage(
      <Router history={history}>
        <Route path='/:id' component={JobPage} />
      </Router>,
    );

    const feedback = await screen.findByRole('alert');
    expect(feedback).toHaveTextContent(/loading/i);
    await waitFor(() => {
      expect(feedback).toHaveTextContent(/error/i);
    });
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('shows not found message on 404', async () => {
    const history = createMemoryHistory();
    history.push(`/wrong-id`);
    renderPage(
      <Router history={history}>
        <Route path='/:id' component={JobPage} />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/not found/i);
    });
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
