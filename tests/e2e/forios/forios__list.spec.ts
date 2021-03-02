import { AxiosResponse } from 'axios';

import { UserGenerator } from '../../../src/db/seeds/01_users.seed';
import { ForioGenerator } from '../../../src/db/seeds/02_forios.seed';
import { RouteTester } from '../../utils';


RouteTester.test(RouteTester.ROUTES.forios__LIST, (tester) => {
  describe('With no forios', () => {
    let response: AxiosResponse;

    tester.beforeAll(async () => {
      response = await tester.query();
    });

    tester.afterAll();

    it('returns HTTP 200', () => {
      expect(response.status).toEqual(200);
    });

    it('returns an empty array', () => {
      expect(response.data.data).toEqual([]);
    });
  });

  describe('With forios', () => {
    const user = UserGenerator();
    const squid = ForioGenerator({ owner_uuid: user.uuid });

    let response: AxiosResponse;

    tester.beforeAll(async () => {
      await tester.db.table('users').insert([user]);
      await tester.db.table('forios').insert([squid]);
      response = await tester.query();
    });

    tester.afterAll(async () => {
      await tester.db.table('forios').where('uuid', squid.uuid).delete();
      await tester.db.table('users').where('uuid', user.uuid).delete();
    });

    it('returns HTTP 200', () => {
      expect(response.status).toEqual(200);
    });

    it('returns an array of existing forios', () => {
      expect(response.data.data).toEqual([squid]);
    });
  });
});
