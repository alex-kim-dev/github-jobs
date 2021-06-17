# Plan

## Dependencies

- [x] css-in-js
- [x] router
- [ ] testing
- [ ] animation

## Components

- [x] Header
  - [x] Container
    - [x] Link
    - [x] Toggle, optional icon labels
- [x] routes `/`, `/?search=query&page=2`
  - [x] Search
    - [x] Container
      - [x] TextField, optional icon
      - [x] Checkbox, label
      - [x] Button, text/icon variants
      - [x] Modal
  - [x] Grid
    - [x] Container
      - [x] Card
        - [x] Logo
        - [x] Status
- [x] route `/:id`
  - [x] Heading/Company
    - [x] Container
      - [x] Button
  - [x] Content/Position (style markdown elements)
    - [x] Container
      - [x] Status
      - [x] Button
  - [x] Summary/Apply
    - [x] Container
  - [x] Cta
    - [x] Container
      - [x] Button

## Data

```js
const globalState = {
  theme: 'dark/light',
  search: {
    description: '',
    location: '',
    isFullTime: false,
    page: 1,
  },
  jobs: {
    status: 'idle', // loading, failed, noresults
    error: null,
    list: [],
    specific: [],
  },
};

// + local state for the search form
```
