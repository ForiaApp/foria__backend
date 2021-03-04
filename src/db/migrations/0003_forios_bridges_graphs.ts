import * as Knex from 'knex';

import { Tables } from '../config';

export const CREATE_TABLE__FORIOS = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.FORIOS} (
    uuid          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_uuid     UUID NOT NULL REFERENCES ${Tables.USERS},
    title         VARCHAR(255) NOT NULL,
    public        BOOLEAN DEFAULT false,
    bridge_policy VARCHAR CHECK (bridge_policy IN ('ALL', 'APPROVED', 'PERSONAL')) DEFAULT 'PERSONAL',
    content_type  VARCHAR(32) NOT NULL,
    created       TIMESTAMP NOT NULL DEFAULT now()
  );

  CREATE INDEX ON "${Tables.FORIOS}"("user_uuid");
`;

export const CREATE_TABLE__CONTENTS = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.CONTENTS} (
    uuid          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY REFERENCES ${Tables.FORIOS},
    content       TEXT NOT NULL
  );
`;

export const CREATE_TABLE__BRIDGES = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.BRIDGES} (
    uuid              UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    description       TEXT NOT NULL default '',
    user_uuid         UUID NOT NULL REFERENCES ${Tables.USERS},
    origin_uuid       UUID REFERENCES ${Tables.FORIOS},
    destination_uuid  UUID REFERENCES ${Tables.FORIOS},
    remote_host       TEXT NOT NULL default '',
    remote_uuid       UUID default NULL,
    public            BOOLEAN DEFAULT false,
    created           TIMESTAMP NOT NULL DEFAULT now()
  );

  CREATE INDEX ON "${Tables.BRIDGES}"("user_uuid");
  CREATE INDEX ON "${Tables.BRIDGES}"("origin_uuid");
  CREATE INDEX ON "${Tables.BRIDGES}"("destination_uuid");
`;

export const CREATE_TABLE__GRAPHS = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.GRAPHS} (
    uuid        UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_uuid  UUID NOT NULL REFERENCES ${Tables.USERS},
    description TEXT NOT NULL DEFAULT '',
    public      BOOLEAN DEFAULT false,
    created     TIMESTAMP NOT NULL DEFAULT now()
  );

  CREATE INDEX ON "${Tables.GRAPHS}"("user_uuid");
`;

export const CREATE_TABLE__GRAPHS_FORIOS = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.GRAPHS_FORIOS} (
    uuid        UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    graph_uuid  UUID NOT NULL REFERENCES ${Tables.GRAPHS},
    forio_uuid  UUID NOT NULL REFERENCES ${Tables.FORIOS},
    created     TIMESTAMP NOT NULL DEFAULT now()
  );

  CREATE INDEX ON "${Tables.GRAPHS_FORIOS}"("graph_uuid");
  CREATE INDEX ON "${Tables.GRAPHS_FORIOS}"("forio_uuid");
`;

export const CREATE_TABLE__CHANNELS_FORIOS = /* sql */ `
  -- Create table
  CREATE TABLE ${Tables.CHANNELS_FORIOS} (
    uuid          UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_uuid  UUID NOT NULL REFERENCES ${Tables.CHANNELS},
    forio_uuid    UUID NOT NULL REFERENCES ${Tables.FORIOS},
    created       TIMESTAMP NOT NULL DEFAULT now()
  );

  CREATE INDEX ON "${Tables.CHANNELS_FORIOS}"("channel_uuid");
  CREATE INDEX ON "${Tables.CHANNELS_FORIOS}"("forio_uuid");
`;

export const DROP_TABLE__FORIOS = /* sql */ `
  -- Drop table
  DROP TABLE ${Tables.FORIOS};
`;

export const DROP_TABLE__CONTENTS = /* sql */ `
  -- Drop table
  DROP TABLE ${Tables.CONTENTS};
`;

export const DROP_TABLE__BRIDGES = /* sql */ `
  -- Drop table
  DROP TABLE ${Tables.BRIDGES};
`;

export const DROP_TABLE__GRAPHS = /* sql */ `
  -- Drop table
  DROP TABLE ${Tables.GRAPHS};
`;

export const DROP_TABLE__GRAPHS_FORIOS = /* sql */ `
  -- Drop table
  DROP TABLE ${Tables.GRAPHS_FORIOS};
`;

export const DROP_TABLE__CHANNELS_FORIOS = /* sql */ `
  -- Drop table
  DROP TABLE ${Tables.CHANNELS_FORIOS};
`;

export async function up(knex: Knex): Promise<void> {
  await knex.raw(CREATE_TABLE__FORIOS);
  await knex.raw(CREATE_TABLE__CONTENTS);
  await knex.raw(CREATE_TABLE__BRIDGES);
  await knex.raw(CREATE_TABLE__GRAPHS);
  await knex.raw(CREATE_TABLE__GRAPHS_FORIOS);
  await knex.raw(CREATE_TABLE__CHANNELS_FORIOS);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(DROP_TABLE__CHANNELS_FORIOS);
  await knex.raw(DROP_TABLE__GRAPHS_FORIOS);
  await knex.raw(DROP_TABLE__GRAPHS);
  await knex.raw(DROP_TABLE__BRIDGES);
  await knex.raw(DROP_TABLE__CONTENTS);
  await knex.raw(DROP_TABLE__FORIOS);
}
