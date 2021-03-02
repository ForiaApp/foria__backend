import Router from '@koa/router';

import type { ForioAppContext, ForioAppState } from '../server';
import { ROUTES } from './config';

export const Status = async (context: ForioAppContext): Promise<void> => {
  context.body = { status: 'OK' };
};

export const StatusController = new Router<ForioAppState, ForioAppContext>();

StatusController
  .get(ROUTES.STATUS.path, Status);
