/* eslint-disable @typescript-eslint/no-var-requires */
import knex from 'knex';

const knexfile = require('../../knexfile');


export enum Tables {
  USERS = 'users',
  BRIDGES = 'bridges',
  CHANNELS = 'channels',
  CHANNELS_USERS = 'channels_users',
  CHANNELS_FORIOS = 'channels_forios',
  CONTENTS = 'contents',
  FORIOS = 'forios',
  GRAPHS = 'graphs',
  GRAPHS_FORIOS = 'graphs_forios',
}

export const TablePriority = [
  Tables.USERS,
  Tables.CHANNELS,
  Tables.CHANNELS_USERS,
  Tables.FORIOS,
  Tables.CONTENTS,
  Tables.BRIDGES,
  Tables.GRAPHS,
  Tables.GRAPHS_FORIOS,
];

export const DatabaseConfig = {
  user: process.env.POSTGRES_APP_USER,
  password: process.env.POSTGRES_APP_PASSWORD,
  hostname: process.env.POSTGRES_HOSTNAME,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,

  get url(): string {
    return `postgres://${this.user}:${this.password}@${this.hostname}:${this.port}/${this.database}`;
  },
};


export const getDB = (): knex => knex(knexfile);
