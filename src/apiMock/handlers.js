import Fuse from 'fuse.js';
import { rest } from 'msw';

import data from './data.json';

const url = 'https://jobs.github.com';
const itemsInPage = 9;

const filter = (description, location, fullTime) => {
  const filteredByContract = fullTime
    ? data.filter(({ contract }) => contract === 'Full Time')
    : data;

  const filteredByContractAndLocation = location
    ? filteredByContract.filter(
        (job) => job.location.toLowerCase() === location.toLowerCase(),
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

export default [
  rest.get(`${url}/positions.json`, (req, res, ctx) => {
    const params = req.url.searchParams;

    const pageParam = Number(params.get('page'));
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const description = params.get('search');
    const location = params.get('location');
    const fullTime = params.get('full_time') === 'on';

    const filtered = filter(description, location, fullTime);

    return res(
      ctx.delay(800),
      ctx.status(200),
      ctx.json(filtered.slice(itemsInPage * (page - 1), itemsInPage * page)),
    );
  }),

  rest.get(`${url}/positions/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (!id.endsWith('.json')) return res(ctx.status(404));

    const idToFind = Number(id.replace(/\.json$/, ''));
    const jobData = data.find((job) => job.id === idToFind);
    if (jobData === undefined) return res(ctx.status(404));

    return res(ctx.delay(800), ctx.status(200), ctx.json(jobData));
  }),
];
