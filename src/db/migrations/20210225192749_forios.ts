import * as Knex from 'knex';

import { Tables } from '../config';


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(Tables.forios, (table) => {
    table.uuid('uuid')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.uuid('owner_uuid')
      .references('uuid')
      .inTable(Tables.users)
      .notNullable();

    table.string('title', 512)
      .notNullable()
      .defaultTo('');

    table.string('content_type')
      .notNullable();

    table.string('public')
      .notNullable()
      .defaultTo('PRIVATE');
  });

  await knex.schema.createTable(Tables.forios_contents, (table) => {
    table.uuid('uuid')
      .primary()
      .references('uuid')
      .inTable(Tables.forios);

    table.text('content')
      .notNullable()
      .defaultTo('');
  });

  await knex.schema.createTable(Tables.forios_links, (table) => {
    table.uuid('uuid')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.uuid('start')
      .references('uuid')
      .inTable(Tables.forios);

    table.uuid('end')
      .references('uuid')
      .inTable(Tables.forios);

    table.unique(['start', 'end']);
  });

  await knex.schema.createTable(Tables.forios_graphs, (table) => {
    table.uuid('uuid')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.text('title')
      .notNullable();

    table.text('description')
      .notNullable()
      .defaultTo('');

    table.string('public')
      .notNullable()
      .defaultTo('PRIVATE');
  });

  await knex.schema.createTable(Tables.forios_in_forios_graphs, (table) => {
    table.uuid('uuid')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.uuid('squad_uuid')
      .references('uuid')
      .inTable(Tables.forios_graphs);

    table.uuid('squid_uuid')
      .references('uuid')
      .inTable(Tables.forios);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(Tables.forios_in_forios_graphs);
  await knex.schema.dropTable(Tables.forios_graphs);
  await knex.schema.dropTable(Tables.forios_links);
  await knex.schema.dropTable(Tables.forios_contents);
  await knex.schema.dropTable(Tables.forios);
}
