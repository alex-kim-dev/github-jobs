const corsProxy = 'https://cors.bridged.cc/';
const jobsListEndpoint = 'https://jobs.github.com/positions.json';
const jobEndpoint = (id) => `https://jobs.github.com/positions/${id}.json`;

export const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const hexToRgba = (hex, alpha) => {
  const hexValue = hex.replace('#', '');

  const channelValues = (hexValue.length === 3
    ? hexValue.split('').map((char) => char.repeat(2))
    : hexValue.match(/[0-9a-f]{2}/gi)
  ).map((value) => parseInt(value, 16));

  const values = channelValues.concat(alpha).join(', ');

  return `rgba(${values})`;
};

export const constantToCamelCase = (str) => {
  const [first, ...rest] = str.toLowerCase().split('_');
  return [
    first,
    ...rest.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`),
  ].join('');
};

export const getRelativeTimeSince = (date = Date.now()) => {
  const MS_IN_SECOND = 1000;
  const periods = [
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['less than a minute', Number.MIN_SAFE_INTEGER],
  ];

  const diff = (Date.now() - date) / MS_IN_SECOND;
  const [unit, duration] = periods.find(([, time]) => diff >= time);
  const number = Math.trunc(diff / duration);

  return `${number >= 1 ? number : ''} ${unit}${
    number > 1 ? 's' : ''
  } ago`.trim();
};

const parseUrl = (url) => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

export const normalizeJob = ({
  id,
  type,
  created_at: createdAt,
  company,
  company_url: url,
  location,
  title,
  description,
  how_to_apply: howToApply,
  company_logo: logo,
}) => ({
  id,
  type,
  createdAt: new Date(createdAt),
  company,
  url: parseUrl(url),
  location,
  title,
  description,
  howToApply,
  logo,
});

export const parseSearchQuery = (str) => {
  const params = new URLSearchParams(str);
  return [...params].reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );
};

export const makeUrlQuery = ({ description, location, isFullTime, page }) => {
  const query = new URLSearchParams();
  if (description) query.append('search', description);
  if (location) query.append('location', location);
  if (isFullTime) query.append('full_time', 'on');
  if (page) query.append('page', page);
  return query;
};

export const makeJobsListUrl = (searchParams) => {
  const url = new URL(corsProxy);
  url.pathname = jobsListEndpoint;
  url.search = makeUrlQuery(searchParams);
  return url;
};

export const makeJobUrl = (id) => {
  const url = new URL(corsProxy);
  url.pathname = jobEndpoint(id);
};

export const getSearchParams = () => {
  const query = new URLSearchParams(window.location.search);
  return {
    description: query.get('search') ?? '',
    location: query.get('location') ?? '',
    isFullTime: query.get('full_time') === 'on',
  };
};

export const mergeJobs = (jobs, jobsToAppend) => [
  ...jobs,
  ...jobsToAppend.filter(({ id }) => !jobs.some((job) => job.id === id)),
];
