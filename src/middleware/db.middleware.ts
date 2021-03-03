import knex from 'knex';
import { HttpRequestHandler, postgraphile } from 'postgraphile';

import { DatabaseConfig } from '../db/config';
import type { ForioMiddleware } from '../server';

export const DatabaseMiddleware = (connection: knex): ForioMiddleware => async function Database(context, next): Promise<void> {
  context.db = connection;

  await next();
};

export const PostgraphileMiddleware = (): HttpRequestHandler => {
  const schemaName = 'public';

  const options = {
    subscriptions: true,
    watchPg: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    extendedErrors: ['hint', 'detail', 'errcode'],
    exportGqlSchemaPath: 'schema.graphql',
    graphiql: true,
    enhanceGraphiql: true,
    enableQueryBatching: true,
  };

  return postgraphile(DatabaseConfig.url, schemaName, options);
};
