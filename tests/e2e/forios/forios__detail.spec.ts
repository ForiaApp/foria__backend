import { AxiosResponse } from 'axios';

import { UserGenerator } from '../../../src/db/seeds/01_users.seed';
import { ContentGenerator, ForioGenerator } from '../../../src/db/seeds/02_forios.seed';
import { RouteTester } from '../../utils';

RouteTester.test(RouteTester.ROUTES.forios__DETAIL, (tester) => {
  const user = UserGenerator();
  const squid = ForioGenerator({ user_uuid: user.uuid });
  const squidContent = ContentGenerator({ uuid: squid.uuid });

  tester.beforeAll(async () => {
    await tester.db.table('users').insert([user]);
    await tester.db.table('forios').insert([squid]);
    await tester.db.table('forios_contents').insert([squidContent]);
  });

  tester.afterAll(async () => {
    await tester.db.table('forios_contents').where('uuid', squidContent.uuid).delete();
    await tester.db.table('forios').where('uuid', squid.uuid).delete();
    await tester.db.table('users').where('uuid', user.uuid).delete();
  });

  describe('Finds an existing squid', () => {
    let response: AxiosResponse;

    beforeAll(async () => {
      response = await tester.query(null, { uuid: squid.uuid });
    });

    it('returns HTTP 200', () => {
      expect(response.status).toEqual(200);
    });

    it('joins the squid and the squid content', () => {
      const actual = response.data.data;

      expect(actual).toEqual({ ...squid, ...squidContent });
    });
  });

  tester.test404('HTTP 404 with a random uuid', async () => {
    const randomForio = ForioGenerator({ user_uuid: user.uuid });
    const response = await tester.query(null, { uuid: randomForio.uuid });
    return { response };
  });
});
