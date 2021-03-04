import * as Knex from 'knex';
import { v4 as uuid4 } from 'uuid';

import { Tables } from '../config';
import type { User } from '../models';


export const USERS: Record<string, Required<User>> = {
  DEFAULT: {
    uuid: '0c1cb9e1-30ae-405f-9c61-888cb2d03b90',
    full_name: 'Dante Alighieri',
    pref_name: 'Dante',
    email: 'dante.alighieri@dipasqualew.com',
    password: 'test',
    verified: true,
    active: true,
    created: '2021-03-03T21:15:38.270Z',
  },
  MICHELANGELO: {
    uuid: 'cf5460c6-ae65-42ca-a035-ec3d5eeb1919',
    full_name: 'Michelangelo di Lodovico Buonarroti Simoni',
    pref_name: 'Michelangelo',
    email: 'michelangelo.buonarroti@dipasqualew.com',
    password: 'LaP1eta%Nel1aB4silicaDiSanPi3tro',
    verified: true,
    active: true,
    created: '2021-03-03T21:15:46.438Z',
  },
};

export const UserGenerator = (overrides: Partial<User> = {}): Required<User> => ({
  uuid: uuid4(),
  full_name: uuid4(),
  pref_name: uuid4(),
  email: `${uuid4()}@${uuid4()}.com`,
  password: uuid4(),
  verified: true,
  active: true,
  created: new Date().toISOString(),
  ...overrides,
});

export async function seed(knex: Knex): Promise<void> {
  await knex(Tables.USERS).del();

  await knex(Tables.USERS).insert(Object.values(USERS));
}
