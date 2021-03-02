import Router from '@koa/router';

import {
  Delete,
  Detail,
  List,
  Put,
} from '../api/views';
import type { Forio } from '../db/models';
import type { ForioAppContext, ForioAppState } from '../server';
import { ROUTES } from './config';

export const ForiosDetail = Detail('forios', 'uuid', false, (context) => {
  const uuid: string = context.params.uuid;

  return context.db
    .select<Forio[]>('forios.uuid', 'forios.owner_uuid', 'forios.title', 'forios.content_type', 'forios.public', 'forios_contents.content')
    .from('forios')
    .leftJoin('forios_contents', 'forios.uuid', 'forios_contents.uuid')
    .where({ 'forios.uuid': uuid })
    .first();
});

export const ForiosList = List('forios', false, (context) => context.db
  .select<Forio[]>('*')
  .from('forios'));

export const ForiosPut = Put('forios', true, async (context) => {
  const payload = context.request.body;

  await context.db('forios')
    .insert(payload)
    .onConflict('uuid')
    .merge();

  return payload;
});

export const ForiosDelete = Delete('forios', true, (context) => {
  const uuid: string = context.params.uuid;

  return context.db('forios').where({ uuid }).delete();
});

export const ForiosController = new Router<ForioAppState, ForioAppContext>()
  .get(ROUTES.forios__DETAIL.path, ForiosDetail)
  .get(ROUTES.forios__LIST.path, ForiosList)
  .put(ROUTES.forios__PUT.path, ForiosPut)
  .delete(ROUTES.forios__DELETE.path, ForiosDelete);
