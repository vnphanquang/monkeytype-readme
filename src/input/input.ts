import * as core from '@actions/core';

import { MonkeytypeApiKeyNotFoundError } from '../error';

import { InputKey } from './input.types';
import type { Input } from './input.types';

export function parse() {
  const input = Object.keys(InputKey).reduce((input, key) => {
    input[key] = core.getInput(key, {
      trimWhitespace: true,
      required: key === InputKey.monkeytype_api_key || key === InputKey.github_token,
    });
    return input;
  }, {} as Input);

  if (!input.monkeytype_api_key) {
    throw new MonkeytypeApiKeyNotFoundError('Monkeytype API key was not setup properly. Please refer to README for instruction: https://github.com/vnphanquang/monkeytype-readme#2-monkeytype-api-key');
  }
  return input;
}
