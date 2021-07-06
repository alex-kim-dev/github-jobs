import { arrayOf, number, shape, string } from 'prop-types';

const listPropType = shape({
  content: string,
  items: arrayOf(string),
});

export const jobPropType = shape({
  id: number,
  company: string,
  logo: string,
  logoBackground: string,
  position: string,
  postedAt: string,
  contract: string,
  location: string,
  website: string,
  apply: string,
  description: string,
  requirements: listPropType,
  role: listPropType,
});
