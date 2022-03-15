import * as core from '@actions/core';

import { getBadgeUrl } from '../badge';
import { parse } from '../input';
import { updateReadme } from '../readme';

export async function main() {
  try {
    core.info('Parsing action input...');
    const input = parse();

    core.info('Getting badge URL...');
    const badgeUrl = await getBadgeUrl(input);

    core.info('Updating readme with new badge resource declaration...');
    await updateReadme(input, badgeUrl);

    core.setOutput('badge_url', badgeUrl);

    return badgeUrl;
  } catch (error) {
    core.setFailed(error.message);
    return null;
  }
}
