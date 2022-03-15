import * as core from '@actions/core';
import * as github from '@actions/github';

import { BadgeResourceDeclarationNotFoundError } from '../error';
import type { Input } from '../input';

export const REGEX = /\[monkeytype\.badge\].*$/m;

export async function updateReadme(input: Input, badgeUrl: string) {
  const octokit = github.getOctokit(input.github_token);
  const { repo, owner } = github.context.repo;
  const readme = await octokit.rest.repos.getReadme({ owner, repo });
  let content = readme.data.content;
  const newBadgeResource = `[monkeytype.badge]: ${badgeUrl}`;
  const badgeResource = content.match(REGEX)?.[0];
  if (!badgeResource) {
    throw new BadgeResourceDeclarationNotFoundError('No monkeytype.badge resource declaration (`[monkeytype.badge]: ...`) was found in README.md. Please check documentation for setup instruction.');
  }
  if (badgeResource.includes(newBadgeResource)) {
    core.info('Badge content is still the same. Skipping update...');
  } else {
    content = content.replace(REGEX, `[monkeytype.badge]: ${badgeUrl}`);
    octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: readme.data.path,
      message: 'chore: update readme with new monkeytype badge',
      content: Buffer.from(content).toString('base64'),
      sha: readme.data.sha,
      committer: {
        name: 'monkeytype-badge-bot',
        email: 'github-actions@github.com',
      },
    });
    core.info('Readme updated');
  }
  return content;
}
