

import * as badgeModule from '../badge/badge';
import { defaultInput } from '../input';
import * as inputModule from '../input/input';
import * as readmeModule from '../readme/readme';

import { main } from './main';

const url = 'https://example.badge';

jest.mock('@actions/core', () => ({
  info: jest.fn(),
  setOutput: jest.fn(),
  setFailed: jest.fn(),
}));

jest.mock('../input/input', () => ({
  parse: jest.fn(() => defaultInput),
}));

jest.mock('../badge/badge', () => ({
  getBadgeUrl: jest.fn(() => url),
}));

jest.mock('../readme/readme', () => ({
  updateReadme: jest.fn(() => ''),
}));

test('main success flow', async () => {
  const returned = await main();
  expect(returned).toBe(url);
});

test('error in parse', async () => {
  jest.spyOn(inputModule, 'parse').mockImplementation(() => { throw new Error(); });
  const returned = await main();
  expect(returned).toBe(null);
});

test('error in getBadgeUrl', async () => {
  jest.spyOn(badgeModule, 'getBadgeUrl').mockImplementation(() => { throw new Error(); });
  const returned = await main();
  expect(returned).toBe(null);
});

test('error in updateReadme', async () => {
  jest.spyOn(readmeModule, 'updateReadme').mockImplementation(() => { throw new Error(); });
  const returned = await main();
  expect(returned).toBe(null);
});
