import * as Knex from 'knex';
import { v4 as uuid4 } from 'uuid';

import { Tables } from '../config';
import {
  Bridge,
  BridgePolicy,
  Content,
  ContentType,
  Forio,
} from '../models';
import { USERS } from './01_users.seed';

export const FORIOS: Record<string, Forio> = {
  DEFAULT: {
    uuid: '4e1db50e-d61e-4093-b7cc-966c3d1ac58d',
    user_uuid: USERS.DEFAULT.uuid,
    title: 'Divina Commedia - Inferno - Canto I',
    content_type: ContentType.TEXT,
    public: true,
    bridge_policy: BridgePolicy.ALL,
    created: '2021-03-03T21:21:43.122Z',
  },
  TEXT: {
    uuid: '33b49c88-7a5f-4238-8a00-21ae44aecfa9',
    user_uuid: USERS.DEFAULT.uuid,
    title: 'Vita Nova',
    content_type: ContentType.TEXT,
    public: true,
    bridge_policy: BridgePolicy.APPROVED,
    created: '2021-03-03T21:21:43.122Z',
  },
  IMAGE: {
    uuid: 'eda4529b-144e-4fe1-80c6-53d78ede31c4',
    user_uuid: USERS.MICHELANGELO.uuid,
    title: 'La Pieta',
    content_type: ContentType.IMAGE,
    public: true,
    bridge_policy: BridgePolicy.APPROVED,
    created: '2021-03-03T21:21:43.122Z',
  },
  PRIVATE: {
    uuid: 'efa8bf82-33fc-44dc-9eaa-1bd1c4b977e0',
    user_uuid: USERS.MICHELANGELO.uuid,
    title: 'Lettere Private',
    content_type: ContentType.TEXT,
    public: false,
    bridge_policy: BridgePolicy.PERSONAL,
    created: '2021-03-03T21:21:43.122Z',
  },
};

export const CONTENTS: Record<string, Content> = {
  DEFAULT: {
    uuid: '4e1db50e-d61e-4093-b7cc-966c3d1ac58d',
    content: 'Nel mezzo di cammin di nostra vita...',
  },
  TEXT: {
    uuid: '33b49c88-7a5f-4238-8a00-21ae44aecfa9',
    content: 'Tanto gentile e tanto onesta pare...',
  },
  IMAGE: {
    uuid: 'eda4529b-144e-4fe1-80c6-53d78ede31c4',
    content: 'images/eda4529b-144e-4fe1-80c6-53d78ede31c4.jpg',
  },
  PRIVATE: {
    uuid: 'efa8bf82-33fc-44dc-9eaa-1bd1c4b977e0',
    content: 'Miki\'s letters are no one\'s business',
  },
};

export const BRIDGES: Record<string, Bridge> = {
  DEFAULT: {
    uuid: 'c2c5cf1e-5f0a-49be-a64a-68e470deb32b',
    user_uuid: FORIOS.DEFAULT.user_uuid,
    origin_uuid: FORIOS.DEFAULT.uuid,
    destination_uuid: FORIOS.TEXT.uuid,
    description: 'Dalla Commedia alla Vita Nuova',
    remote_host: '',
    remote_uuid: null,
    public: true,
    created: '2021-03-03T21:27:56.766Z',
  },
  PUBLIC_PRIVATE: {
    uuid: 'd2ee1e96-c527-4831-b08e-eae1c351b238',
    user_uuid: FORIOS.DEFAULT.user_uuid,
    origin_uuid: FORIOS.IMAGE.uuid,
    destination_uuid: FORIOS.PRIVATE.uuid,
    description: 'Dalla Pieta alle Lettere private',
    remote_host: '',
    remote_uuid: null,
    public: false,
    created: '2021-03-03T21:27:56.766Z',
  },
};

export const ForioGenerator = (overrides: Partial<Forio> = {}): Required<Forio> => ({
  uuid: uuid4(),
  user_uuid: uuid4(),
  title: uuid4(),
  content_type: ContentType.TEXT,
  public: true,
  bridge_policy: BridgePolicy.ALL,
  created: new Date().toISOString(),
  ...overrides,
});

export const ContentGenerator = (overrides: Partial<Content> = {}): Required<Content> => ({
  uuid: uuid4(),
  content: uuid4(),
  ...overrides,
});

export const BridgeGenerator = (overrides: Partial<Bridge> = {}): Required<Bridge> => ({
  uuid: uuid4(),
  user_uuid: uuid4(),
  origin_uuid: uuid4(),
  destination_uuid: uuid4(),
  description: uuid4(),
  remote_host: '',
  remote_uuid: null,
  public: true,
  created: new Date().toISOString(),
  ...overrides,
});

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.BRIDGES).del();
  await knex(Tables.CONTENTS).del();
  await knex(Tables.FORIOS).del();

  await knex(Tables.FORIOS).insert(Object.values(FORIOS));
  await knex(Tables.CONTENTS).insert(Object.values(CONTENTS));
  await knex(Tables.BRIDGES).insert(Object.values(BRIDGES));
}
