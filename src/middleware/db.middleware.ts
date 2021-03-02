import knex from 'knex';

import type { ForioMiddleware } from '../server';

export const DatabaseMiddleware = (connection: knex): ForioMiddleware => async function Database(context, next): Promise<void> {
  context.db = connection;

  await next();
};
