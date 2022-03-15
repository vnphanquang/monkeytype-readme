import * as core from '@actions/core';

import { InputKey } from './input.types';
import type { Input } from './input.types';

export function parse() {
  return Object.keys(InputKey).reduce((input, key) => {
    input[key] = core.getInput(key, {
      trimWhitespace: true,
      required: key === InputKey.monkeytype_api_key || key === InputKey.github_token,
    });
    return input;
  }, {} as Input);
}
