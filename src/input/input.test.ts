import * as core from '@actions/core';

import { parse } from './input';
import { defaultInput } from './input.constants';
import { InputKey } from './input.types';

test('parse default input', () => {
  const getInputSpy = jest.spyOn(core, 'getInput').mockImplementation((key) => defaultInput[key]);
  const input = parse();
  expect(getInputSpy).toHaveBeenCalledTimes(Object.keys(InputKey).length);
  expect(input).toEqual(defaultInput);
});
