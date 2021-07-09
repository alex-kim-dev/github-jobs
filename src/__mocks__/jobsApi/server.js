import { setupServer } from 'msw/node';

import setupHandlers from './handlers';

export default setupServer(...setupHandlers());
