import dotenv from 'dotenv';

import { MonkeytypePersonalBestNotFoundError } from '../error';
import { defaultInput } from '../input';
import type { Input } from '../input';

import {
  getRunKitUrl,
  getWpm,
  getBadgeUrl,
} from './badge';
import {
  BADGE_RUNKIT_URL,
  SHIELDS_IO_URL,
} from './badge.constants';

dotenv.config();

const input: Input = {
  ...defaultInput,
  monkeytype_api_key: process.env.MONKEYTYPE_API_KEY,
};

describe('getWpm', () => {
  test('malfomed api key => throw', () => {
    const inputNoApiKey = { ...input, monkeytype_api_key: '' };
    expect(() => getWpm(inputNoApiKey)).rejects.toThrow();
  });

  test('wrong mode => throw', () => {
    const inputWithWrongMode = { ...input, mode: 'wrong' };
    expect(() => getWpm(inputWithWrongMode)).rejects.toThrowError(MonkeytypePersonalBestNotFoundError);
  });

  test('default input should return number', async () => {
    const wpm = await getWpm(input);
    expect(wpm).toBeTruthy();
    expect(typeof wpm).toBe('number');
  });
});

test('getRunkitUrl default input',() => {
  const wpm = 100;
  const runkitUrl = getRunKitUrl(input, wpm);
  expect(runkitUrl).toBeTruthy();
  expect(runkitUrl.startsWith(encodeURIComponent(BADGE_RUNKIT_URL))).toBe(true);
  expect(runkitUrl.includes(`${wpm}wpm`)).toBe(true);
});

test('getBadgeUrl default input', async () => {
  const url = await getBadgeUrl(input);
  expect(url).toBeTruthy();
  expect(url.startsWith(SHIELDS_IO_URL)).toBe(true);
  expect(url.includes(encodeURIComponent(BADGE_RUNKIT_URL))).toBe(true);
});
