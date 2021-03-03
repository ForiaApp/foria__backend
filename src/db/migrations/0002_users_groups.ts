import * as Knex from 'knex';

import { Tables } from '../config';

export const CREATE_TABLE__USERS = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.USERS} (
    uuid      UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL DEFAULT '',
    pref_name VARCHAR(255) NOT NULL DEFAULT '',
    email     citext UNIQUE NOT NULL,
    password  VARCHAR(255) NOT NULL,
    active    BOOLEAN DEFAULT true,
    verified  BOOLEAN DEFAULT false,
    created   TIMESTAMP NOT NULL DEFAULT now()
  );

  -- Create hashing function
  CREATE FUNCTION hash_user_password() RETURNS TRIGGER AS
  $$
  BEGIN
    NEW.password = crypt(NEW.password, gen_salt('bf'));
    RETURN NEW;
  END;
  $$ LANGUAGE PLPGSQL;

  -- Create user uuid function
  CREATE FUNCTION user_uuid() RETURNS UUID AS
  $$
    SELECT NULLIF(current_setting('jwt.claims.user_uuid', true), '')::uuid;
  $$ LANGUAGE SQL STABLE;

  -- Trigger hash_user_password on insert
  CREATE TRIGGER trigger_hash_user_password_on_insert
    BEFORE INSERT
    ON ${Tables.USERS}
    FOR EACH ROW
    EXECUTE PROCEDURE hash_user_password();

  -- Trigger hash_user_password on update
  CREATE TRIGGER trigger_hash_user_password_on_update
    BEFORE UPDATE
    ON ${Tables.USERS}
    FOR EACH ROW
    EXECUTE PROCEDURE hash_user_password();
`;

export const CREATE_TABLE__CHANNELS = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.CHANNELS} (
    uuid        UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    created     TIMESTAMP NOT NULL DEFAULT now()
  );
`;

export const CREATE_TABLE__CHANNELS_USERS = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.CHANNELS_USERS} (
    uuid          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_uuid  UUID NOT NULL REFERENCES ${Tables.CHANNELS},
    user_uuid     UUID NOT NULL REFERENCES ${Tables.USERS},
    is_admin      BOOLEAN DEFAULT false,
    created       TIMESTAMP NOT NULL DEFAULT now()
  );

  CREATE INDEX ON "${Tables.CHANNELS_USERS}"("channel_uuid");
  CREATE INDEX ON "${Tables.CHANNELS_USERS}"("user_uuid");
`;


export const DROP_TABLE__USERS = /* sql */ `
  -- Drop triggers
  DROP TRIGGER trigger_hash_user_password_on_insert ON ${Tables.USERS};
  DROP TRIGGER trigger_hash_user_password_on_update ON ${Tables.USERS};

  -- Drop functions
  DROP FUNCTION hash_user_password;
  DROP FUNCTION user_uuid;

  -- Drop table
  DROP TABLE ${Tables.USERS};
`;

export const DROP_TABLE__CHANNELS = /* sql */ `
  -- Drop table
  DROP TABLE ${Tables.CHANNELS};
`;

export const DROP_TABLE__CHANNELS_USERS = /* sql */ `
  -- Drop table
  DROP TABLE ${Tables.CHANNELS_USERS};
`;

export async function up(knex: Knex): Promise<void> {
  await knex.raw(CREATE_TABLE__USERS);
  await knex.raw(CREATE_TABLE__CHANNELS);
  await knex.raw(CREATE_TABLE__CHANNELS_USERS);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(DROP_TABLE__CHANNELS_USERS);
  await knex.raw(DROP_TABLE__CHANNELS);
  await knex.raw(DROP_TABLE__USERS);
}
