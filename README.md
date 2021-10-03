[![Depfu](https://badges.depfu.com/badges/c217822f9f25f0f26235328b13b1db87/overview.svg)](https://depfu.com/github/Alex-K1m/github-jobs?project_id=28157)
[![Maintainability](https://api.codeclimate.com/v1/badges/68607b80e353c2664fc2/maintainability)](https://codeclimate.com/github/Alex-K1m/github-jobs/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/68607b80e353c2664fc2/test_coverage)](https://codeclimate.com/github/Alex-K1m/github-jobs/test_coverage)
[![CD](https://github.com/alex-kim-dev/github-jobs/actions/workflows/cd.yml/badge.svg)](https://github.com/alex-kim-dev/github-jobs/actions/workflows/cd.yml)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/alex-kim-dev/github-jobs)

# Frontend Mentor - GitHub Jobs API solution

This is a solution to the [GitHub Jobs API challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/devjobs-web-app-HuvC_LP4l). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

Unfortunately, Github Jobs was deprecated, so the challenge was renamed to "Devjobs web app", and now it offers a json file with some data instead of the API. My solution is still making requests to Github Jobs API - but it's mocked with [MSW library](https://mswjs.io/), which uses a service worker for intercepting requests and sending back data from the json file.

## Overview

### Challenge requirements

Users should be able to:

- [x] View the optimal layout for each page depending on their device's screen size
- [x] See hover states for all interactive elements throughout the site
- [x] View all jobs currently live on the GitHub Jobs API
- [x] Be able to click a job from the index page so that they can read more information and apply for the job
- [x] **Bonus**: Have the correct color scheme chosen for them based on their computer preferences.

### Links

- [Live Site](https://alex-kim-dev.github.io/github-jobs/)
- [Solution page on Frontend Mentor](https://www.frontendmentor.io/solutions/github-jobs-api-react-LJlWSMpRx)

## My process

### Built with

- My custom [webpack template](https://github.com/alex-kim-dev/webpack-react-template)
- React, React Router
- Redux toolkit
- JSS (styling)
- Jest and React Testing Library
- MSW (mocking the API)
- Code quality tools:
  - Conventional commits, Commitlint
  - ESLint, Prettier
  - Husky & Lint Staged (for linting & testing staged files before a commit)
- CI and deploy to Github Pages

This project used to be a part of my [frontend practice](https://github.com/alex-kim-dev/frontend-practice) monorepo. Since I moved it to a separate repo I was also practicing:

- Github Flow (using Issues, PRs; task management in Github Projects)

### What I learned

This is the most complex project I've been doing so far. Some of the things I've learned:

- integration testing of React components
- how to mock/stub modules, functions, properties in Jest
- the "toolkit" part of Redux
- how to set up and use JSS with theming

### Continued development

This time I wrote all the tests after coding the whole website, so next time I want to focus on TDD. Thinking about how your component/module/function will be used while writing tests will help design them.

### Useful resources

- [React App src structure by Tania Rascia](https://www.taniarascia.com/react-architecture-directory-structure/)
- [React Testing Library docs](https://testing-library.com/docs/queries/about#priority)
- [WAI-ARIA cheatsheet](https://github.com/filipelinhares/WAI-ARIA-cheatsheet)
- [Github Actions CI codelab](https://lab.github.com/githubtraining/github-actions:-continuous-integration)
- [Codeclimate](https://codeclimate.com/quality/) - additinal code quality checks
- [Depfu](https://depfu.com/) - sends PRs with dependencies updates, supports grouped updates
- [Community Slack](https://www.frontendmentor.io/slack)
