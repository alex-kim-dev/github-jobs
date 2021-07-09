import Fuse from 'fuse.js';
import { rest } from 'msw';

import jobList from './data.json';

const API_URL = 'https://jobs.github.com';
export const ITEMS_IN_PAGE = 9;
const RESPONSE_DELAY = 800;

const filter = (description, location, fullTime) => {
  const filteredByContract = fullTime
    ? jobList.filter(({ contract }) => contract === 'Full Time')
    : jobList;

  const filteredByContractAndLocation = location
    ? filteredByContract.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase()),
      )
    : filteredByContract;

  if (!description) return filteredByContractAndLocation;

  const fuse = new Fuse(filteredByContractAndLocation, {
    keys: [
      'company',
      'description',
      'position',
      'requirements.content',
      'requirements.items',
      'role.content',
      'role.items',
    ],
  });

  return fuse.search(description).map(({ item }) => item);
};

export default (options) => [
  rest.get(`${API_URL}/positions.json`, (req, res, ctx) => {
    const params = req.url.searchParams;

    const pageParam = Number(params.get('page'));
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const description = params.get('search');
    const location = params.get('location');
    const fullTime = params.get('full_time') === 'on';

    const filtered = filter(description, location, fullTime);

    return res(
      options?.delay && ctx.delay(RESPONSE_DELAY),
      ctx.status(200),
      ctx.json(
        filtered.slice(ITEMS_IN_PAGE * (page - 1), ITEMS_IN_PAGE * page),
      ),
    );
  }),

  rest.get(`${API_URL}/positions/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (!id.endsWith('.json')) return res(ctx.status(404));

    const idToFind = Number(id.replace(/\.json$/, ''));
    const jobData = jobList.find((job) => job.id === idToFind);
    if (jobData === undefined) return res(ctx.status(404));

    return res(
      options?.delay && ctx.delay(RESPONSE_DELAY),
      ctx.status(200),
      ctx.json(jobData),
    );
  }),
];
