import test from 'ava';
import { Client } from '../src';
import * as dotenv from 'dotenv';

dotenv.config();

test('should throw validation error if username/password not configured correctly', (t) => {
  let error = t.throws(() => {
    new Client({
      auth: {
        type: 'password',
        username: '',
        password: '',
      },
      url: 'http://localhost:9000',
    });
  });
  t.is(error?.message, 'Please provide a valid username and password');

  error = t.throws(() => {
    new Client({
      auth: {
        type: 'password',
        username: 'test',
        password: '',
      },
      url: 'http://localhost:9000',
    });
  });
  t.is(error?.message, 'Please provide a valid username and password');
});

test('should throw validation error if token not configured correctly', (t) => {
  const error = t.throws(() => {
    new Client({
      auth: {
        type: 'token',
        token: '',
      },
      url: 'http://localhost:9000',
    });
  });
  t.is(error?.message, 'Please provide a valid token');
});

test('should get results with token authentication', async (t) => {
  const client = new Client({
    auth: {
      type: 'token',
      token: process.env.TOKEN as string,
    },
    url: process.env.URL as string,
  });

  t.truthy(client);

  const res = await client.measures.component({
    component: process.env.PROJECT_KEY as string,
    additionalFields: [],
    metricKeys: ['bugs'],
  });

  t.is(res.component.key, process.env.PROJECT_KEY as string);
});
