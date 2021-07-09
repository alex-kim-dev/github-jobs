import { setupWorker } from 'msw';

import setupHandlers from './handlers';

export default setupWorker(...setupHandlers({ delay: true }));
