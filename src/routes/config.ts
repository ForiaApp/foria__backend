import type { Method } from 'axios';

export interface Route {
  method: Method;
  path: string;
  label: string;
}

export const route = (method: Method, path: string): Route => ({
  method,
  path,
  label: `${method} ${path}`,
});

export const ROUTES = {
  forios__DELETE: route('DELETE', '/v1/forios/:uuid'),
  forios__DETAIL: route('GET', '/v1/forios/:uuid'),
  forios__LIST: route('GET', '/v1/forios'),
  forios__PUT: route('PUT', '/v1/forios'),
  STATUS: route('GET', '/v1/status'),
  USERS__AUTH: route('POST', '/v1/users/auth'),
};
