import * as core from '@actions/core';
import dotenv from 'dotenv';

import { MonkeytypeApiKeyNotFoundError } from '../error';

import { parse } from './input';
import { defaultInput } from './input.constants';
import type { Input } from './input.types';
import { InputKey} from './input.types';

dotenv.config();

test('parse default input', () => {
  const input: Input = {
    ...defaultInput,
    monkeytype_api_key: process.env.MONKEYTYPE_API_KEY,
  };

  const getInputSpy = jest.spyOn(core, 'getInput').mockImplementation((key) => input[key]);
  const parsed = parse();
  expect(getInputSpy).toHaveBeenCalledTimes(Object.keys(InputKey).length);
  expect(parsed).toEqual(input);
});

test('no API key should throw MonkeytypeApiKeyNotFoundError', () => {
  const getInputSpy = jest.spyOn(core, 'getInput').mockImplementation((key) => defaultInput[key]);
  expect(() => parse()).toThrowError(MonkeytypeApiKeyNotFoundError);
  expect(getInputSpy).toHaveBeenCalledTimes(Object.keys(InputKey).length);
});
