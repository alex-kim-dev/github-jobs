import { rest } from 'msw';

import data from './data.json';

const url = 'https://jobs.github.com';
const itemsInPage = 9;

export default [
  rest.get(`${url}/positions.json`, (req, res, ctx) => {
    const params = req.url.searchParams;

    const pageParam = Number(params.get('page'));
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    // TODO
    const filtered = data;

    return res(
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

    return res(ctx.status(200), ctx.json(jobData));
  }),
];
