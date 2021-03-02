import * as Knex from 'knex';
import { v4 as uuid4 } from 'uuid';

import {
  ContentType,
  Forio,
  ForioContent,
  ForioLink,
  PublicState,
} from '../models';
import { USERS } from './01_users.seed';

export const FORIOS: Record<string, Forio> = {
  DEFAULT: {
    uuid: '4e1db50e-d61e-4093-b7cc-966c3d1ac58d',
    owner_uuid: USERS.DEFAULT.uuid,
    title: 'Divina Commedia - Inferno - Canto I',
    content_type: ContentType.TEXT,
    public: PublicState.PUBLIC,
  },
  TEXT: {
    uuid: '33b49c88-7a5f-4238-8a00-21ae44aecfa9',
    owner_uuid: USERS.DEFAULT.uuid,
    title: 'Vita Nova',
    content_type: ContentType.TEXT,
    public: PublicState.PUBLIC,
  },
  IMAGE: {
    uuid: 'eda4529b-144e-4fe1-80c6-53d78ede31c4',
    owner_uuid: USERS.MICHELANGELO.uuid,
    title: 'La Pieta',
    content_type: ContentType.IMAGE,
    public: PublicState.PUBLIC,
  },
  PRIVATE: {
    uuid: 'efa8bf82-33fc-44dc-9eaa-1bd1c4b977e0',
    owner_uuid: USERS.MICHELANGELO.uuid,
    title: 'Lettere Private',
    content_type: ContentType.TEXT,
    public: PublicState.PRIVATE,
  },
};

export const FORIOS_CONTENTS: Record<string, ForioContent> = {
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

export const FORIOS_GRAPHS: Record<string, ForioLink> = {
  DEFAULT: {
    uuid: 'c2c5cf1e-5f0a-49be-a64a-68e470deb32b',
    start: FORIOS.DEFAULT.uuid,
    end: FORIOS.TEXT.uuid,
  },
  PUBLIC_PRIVATE: {
    uuid: 'd2ee1e96-c527-4831-b08e-eae1c351b238',
    start: FORIOS.IMAGE.uuid,
    end: FORIOS.PRIVATE.uuid,
  },
};

export const ForioGenerator = (overrides: Partial<Forio> = {}): Required<Forio> => ({
  uuid: uuid4(),
  owner_uuid: uuid4(),
  title: uuid4(),
  content_type: ContentType.TEXT,
  public: PublicState.PUBLIC,
  ...overrides,
});

export const ForioContentGenerator = (overrides: Partial<ForioContent> = {}): Required<ForioContent> => ({
  uuid: uuid4(),
  content: uuid4(),
  ...overrides,
});

export const ForioLinkGenerator = (overrides: Partial<ForioLink> = {}): Required<ForioLink> => ({
  uuid: uuid4(),
  start: uuid4(),
  end: uuid4(),
  ...overrides,
});

export async function seed(knex: Knex): Promise<void> {
  await knex('forios_graphs').del();
  await knex('forios_contents').del();
  await knex('forios').del();

  await knex('forios').insert(Object.values(FORIOS));
  await knex('forios_contents').insert(Object.values(FORIOS_CONTENTS));
  await knex('forios_graphs').insert(Object.values(FORIOS_GRAPHS));
}
