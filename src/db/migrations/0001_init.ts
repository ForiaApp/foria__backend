import * as Knex from 'knex';

const APP_USER = process.env.POSTGRES_APP_USER;
const APP_PASS = process.env.POSTGRES_APP_PASSWORD;

/// Extensions block

/**
 * Enables the extensions
 */
export const CREATE_EXTENSIONS = /* sql */ `
  -- Enable extensions
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  CREATE EXTENSION IF NOT EXISTS "citext";
`;

export const DROP_EXTENSIONS = /* sql */ `
  -- Drops extensions
  DROP EXTENSION IF EXISTS "citext";
  DROP EXTENSION IF EXISTS "pgcrypto";
`;

/// End of extensions block

/// Database roles block

/**
 * Creates the database roles
 */
export const CREATE_ROLES = /* sql */ `
  -- Creates the app user
  DO
  $do$
  BEGIN
    IF NOT EXISTS (
        -- SELECT list can be empty for this
        SELECT FROM pg_catalog.pg_roles
        WHERE  rolname = '${APP_USER}') THEN

        CREATE ROLE ${APP_USER} LOGIN PASSWORD '${APP_PASS}';
    END IF;
  END
  $do$;

  ALTER USER ${APP_USER} WITH SUPERUSER;
`;

export const DROP_ROLES = /* sql */ `
  -- Drops the app user
  DROP USER ${APP_USER};
`;

/// End of database roles block

export async function up(knex: Knex): Promise<void> {
  await knex.raw(CREATE_EXTENSIONS);
  await knex.raw(CREATE_ROLES);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(DROP_EXTENSIONS);
}
