import * as core from '@actions/core';

import { BadgeResourceDeclarationNotFoundError } from '../error';
import { defaultInput } from '../input';

import {
  REGEX,
  updateReadme,
} from './readme';

const badgeUrl = 'https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fmonkeytype-badge-vhd5lan7mmhz.runkit.sh';
const exampleUrl = 'https://example.com/badge.svg';
let content = `#README\n\n[monkeytype.badge]: ${exampleUrl}\n\n`;
jest.mock('@actions/core', () => ({
  info: jest.fn(),
}));
jest.mock('@actions/github', () => ({
  context: {
    repo: {
      owner: 'Test Owner',
      repo: 'Test repo',
    },
  },
  getOctokit: jest.fn(() => ({
    rest: {
      repos: {
        getReadme: jest.fn(async () => ({
          data: {
            content: Buffer.from(content).toString('base64'),
            encoding: 'base64',
            path: 'README.md',
            sha: '802992c4220de19a90767f3000a79a31b98d0df7',
          }
        })),
        createOrUpdateFileContents: jest.fn(),
      },
    },
  }))
}));

test('Default input should update', async () => {
  const coreInfoSpy = jest.spyOn(core, 'info');
  const newContent = await updateReadme(defaultInput, badgeUrl);
  expect(coreInfoSpy).toHaveBeenCalled();
  expect(newContent).toBe(content.replace(REGEX, `[monkeytype.badge]: ${badgeUrl}`));
});

test('Same content should skip', async () => {
  const coreInfoSpy = jest.spyOn(core, 'info');
  const newContent = await updateReadme(defaultInput, exampleUrl);
  expect(coreInfoSpy).toHaveBeenCalled();
  expect(newContent).toBe(content);
});

test('No badge resource declaration should throw', () => {
  content = '#README';
  expect(() => updateReadme(defaultInput, badgeUrl)).rejects.toThrow(BadgeResourceDeclarationNotFoundError);
});
