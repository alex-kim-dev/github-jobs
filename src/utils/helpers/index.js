export const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const hexToRgba = (hex, alpha) => {
  const hexValue = hex.replace('#', '');

  const channelValues = (
    hexValue.length === 3
      ? hexValue.split('').map((char) => char.repeat(2))
      : hexValue.match(/[0-9a-f]{2}/gi)
  ).map((value) => parseInt(value, 16));

  const values = channelValues.concat(alpha).join(', ');

  return `rgba(${values})`;
};

export const parseSearchQuery = (str) => {
  const params = new URLSearchParams(str);
  const description = params.get('search') || undefined;
  const location = params.get('location') || undefined;
  const isFullTime = params.get('full_time') === 'on' || undefined;
  return { description, location, isFullTime };
};

export const makeSearchQuery = ({
  description,
  location,
  isFullTime,
  page,
}) => {
  const query = new URLSearchParams();
  if (description) query.append('search', description);
  if (location) query.append('location', location);
  if (isFullTime) query.append('full_time', 'on');
  if (page) query.append('page', page);
  return query;
};

export const genHtmlContent = (job) =>
  job.description.concat(
    '<h2>Requirements</h2>',
    [job.requirements, job.role]
      .map(
        ({ content, items }) =>
          `<p>${content}</p><ul>${items
            .map((item) => `<li>${item}</li>`)
            .join('')}</ul>`,
      )
      .join('<h2>What You Will Do</h2>'),
  );
