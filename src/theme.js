const values = {
  xs: 0,
  sm: 600,
  md: 1050,
  lg: 1280,
};

const breakpoints = Object.fromEntries(
  Object.entries(values).map(([screen, width]) => [
    `${screen}Up`,
    `@media (min-width: ${width / 16}em)`,
  ]),
);

breakpoints.values = values;

export default {
  breakpoints,
  container: {
    width: {
      sm: '81rem',
      md: '120rem',
    },
  },
  colors: {
    light: {
      accent: '#5964e0',
      accentAlt: '#939bf4',
      neutral: '#eeeffc',
      neutralAlt: '#c5c9f4',
      back: '#fff',
      backAlt: '#f4f6f8',
      text: '#19202d',
      textAlt: '#6e8098',
    },
    dark: {
      accent: '#5964e0',
      accentAlt: '#939bf4',
      neutral: '#303642',
      neutralAlt: '#696e76',
      back: '#19202d',
      backAlt: '#121721',
      text: '#fff',
      textAlt: '#6e8098',
    },
  },
};
