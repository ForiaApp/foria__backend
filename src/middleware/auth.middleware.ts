import { verify } from '../auth';
import type { ForioMiddleware } from '../server';


export const AuthMiddleware = (): ForioMiddleware => async function Auth(context, next) {
  const jwt = context.get('Authorization');

  if (jwt) {
    const decoded = await verify(jwt);
    context.user = decoded;
  } else {
    context.user = null;
  }

  await next();
};
