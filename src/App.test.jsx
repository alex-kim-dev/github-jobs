import 'whatwg-fetch';

import { renderApp } from '@helpers/test-utils';
import {
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import matchMediaPolyfill from 'mq-polyfill';

import { ITEMS_IN_PAGE } from '@/__mocks__/jobsApi/handlers';
import server from '@/__mocks__/jobsApi/server';

matchMediaPolyfill(window);
window.scrollTo = jest.fn();

describe('App', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('loads with search form and job list', async () => {
    renderApp();

    expect(screen.getByRole('form')).toBeInTheDocument();

    const jobList = await screen.findByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(
      ITEMS_IN_PAGE,
    );
  });

  it('filters job list after using search form', async () => {
    const history = createMemoryHistory();
    renderApp(history);
    await screen.findByRole('list');

    userEvent.type(
      screen.getByRole('textbox', { name: 'location' }),
      'united states',
    );
    userEvent.click(screen.getByRole('checkbox', { name: /full time/i }));
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    const jobList = await screen.findByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(2);
    expect(within(jobList).getAllByText(/^united states$/i)).toHaveLength(2);

    expect(history.location.search).toBe(
      '?location=united+states&full_time=on',
    );

    expect(
      screen.queryByRole('button', { name: /load more/i }),
    ).not.toBeInTheDocument();
  });

  it('loads more jobs', async () => {
    renderApp();
    const jobList = await screen.findByRole('list');
    const loadMoreBtn = screen.getByRole('button', { name: /load more/i });
    userEvent.click(loadMoreBtn);

    expect(loadMoreBtn).toBeDisabled();
    await waitForElementToBeRemoved(loadMoreBtn);
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(15);
  });

  it('loads a filtered list with url query params', async () => {
    const history = createMemoryHistory();
    history.push('/?search=ruby&location=japan');
    renderApp(history);

    expect(await screen.findByRole('form')).toHaveFormValues({
      description: 'ruby',
      location: 'japan',
      fullTime: false,
    });

    const jobList = await screen.findByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(2);
    expect(within(jobList).getAllByText(/^japan$/i)).toHaveLength(2);
  });

  it('resets form and shows unfilered list on clicking home link', async () => {
    const history = createMemoryHistory();
    history.push('/?search=js&location=united%20kingdom&full_time=on');
    renderApp(history);

    expect(await screen.findByRole('form')).toHaveFormValues({
      description: 'js',
      location: 'united kingdom',
      fullTime: true,
    });

    await screen.findByRole('list');

    userEvent.click(screen.getByAltText(/devjobs - home/i).closest('a'));
    expect(await screen.findByRole('form')).toHaveFormValues({
      description: '',
      location: '',
      fullTime: false,
    });

    const jobList = await screen.findByRole('list');
    expect(jobList).toBeInTheDocument();
    expect(within(jobList).getAllByRole('listitem')).toHaveLength(
      ITEMS_IN_PAGE,
    );
  });

  it('loads job page with correct job data', async () => {
    const history = createMemoryHistory();
    history.push('/3');
    renderApp(history);

    expect(screen.getByRole('alert')).toHaveTextContent(/loading/i);

    expect(await screen.findByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /^Midlevel Back End Engineer$/i,
    );
    expect(screen.getByRole('link', { name: /company site/i })).toHaveAttribute(
      'href',
      'https://example.com/vector',
    );
  });
});
