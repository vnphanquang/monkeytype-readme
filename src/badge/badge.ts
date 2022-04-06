import fetch from 'node-fetch';

import { MonkeytypePersonalBestNotFoundError } from '../error';
import type { Input } from '../input';

import {
  BADGE_RUNKIT_URL,
  MONKEYTYPE_API_URL,
  SHIELDS_IO_URL,
} from './badge.constants';

export async function getWpm(input: Input) {
  const { monkeytype_api_key, mode, mode2 } = input;
  const monkeytypeUrl = `${MONKEYTYPE_API_URL}?mode=${mode}&mode2=${mode2}`;
  const response = await fetch(monkeytypeUrl, {
    headers: {
      'Authorization': 'ApeKey ' + monkeytype_api_key,
    },
  });
  const { data } = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wpm = data?.[0].wpm;
  if (!wpm) throw new MonkeytypePersonalBestNotFoundError('No personal best found with provided mode');
  return Math.round(wpm as number);
}

export function getRunKitUrl(input: Input, wpm: number) {
  const { logoVariant, label } = input;
  const message = wpm + 'wpm';
  return encodeURIComponent(`${BADGE_RUNKIT_URL}?message=${message}&label=${label}&logoVariant=${logoVariant}`);
}

export async function getBadgeUrl(input: Input) {
  const wpm = await getWpm(input);
  const runKitUrl = getRunKitUrl(input, wpm);
  return `${SHIELDS_IO_URL}?style=${input.style}&url=${runKitUrl}`;
}
