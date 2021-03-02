/* eslint-disable @typescript-eslint/no-var-requires */
import knex from 'knex';

const knexfile = require('../../knexfile');


export enum Tables {
  users = 'users',
  forios = 'forios',
  forios_contents = 'forios_contents',
  forios_links = 'forios_links',
  forios_graphs = 'forios_graphs',
  forios_in_forios_graphs = 'forios_in_forios_graphs',
}

export const TablePriority = [
  Tables.users,
  Tables.forios,
  Tables.forios_contents,
  Tables.forios_links,
  Tables.forios_graphs,
  Tables.forios_in_forios_graphs,
];


export const getDB = (): knex => knex(knexfile);
