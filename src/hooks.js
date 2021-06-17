/* eslint-disable no-unused-expressions */
// FIXME update eslint to fix optional chaining

import { useContext, useLayoutEffect, useState } from 'react';
import { useTheme } from 'react-jss';

import { dispatchContext, stateContext } from './store';

export const useMediaQuery = (query) => {
  const [match, setMatch] = useState(window?.matchMedia(query).matches);

  useLayoutEffect(() => {
    const queryList = window?.matchMedia(query);
    const updateMatch = ({ matches }) => setMatch(matches);
    queryList?.addListener(updateMatch);

    return () => queryList?.removeListener(updateMatch);
  }, [query]);

  return match;
};

export const useBreakpoint = (breakpoint) => {
  const theme = useTheme();
  const query = theme.breakpoints[breakpoint]?.replace('@media ', '');
  const match = useMediaQuery(query);

  return match;
};

export const useThemePreference = () => {
  const match = useMediaQuery('(prefers-color-scheme: dark)');

  return match;
};

export const useStore = () => {
  const state = useContext(stateContext);

  return state;
};

export const useDispatch = () => {
  const dispatch = useContext(dispatchContext);

  return dispatch;
};
