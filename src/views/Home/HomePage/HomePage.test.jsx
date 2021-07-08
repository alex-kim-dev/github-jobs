import 'whatwg-fetch';

import { renderPage, screen, within } from '@helpers/test-utils';
import { createMemoryHistory } from 'history';
import matchMediaPolyfill from 'mq-polyfill';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Router } from 'react-router-dom';

import data from '@/__mocks__/jobsApi/data.json';

import HomePage from './HomePage';

matchMediaPolyfill(window);
const api = 'https://jobs.github.com';

const server = setupServer(
  rest.get(`${api}/positions.json`, (req, res, ctx) => {
    if (req.url.searchParams.get('location') === 'russ')
      return res(ctx.json(data.filter((job) => job.location.includes('Russ'))));
    return res(ctx.json(data.slice(0, 9)));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('HomePage loads and displays search form and list of jobs', async () => {
  const history = createMemoryHistory();
  // history.push('/?location=russ');
  await renderPage(
    <Router history={history}>
      <HomePage />
    </Router>,
  );

  expect(screen.getByRole('form')).toBeInTheDocument();

  const jobList = await screen.findByRole('list');
  expect(jobList).toBeInTheDocument();
  expect(within(jobList).getAllByRole('listitem')).toHaveLength(9);
});
