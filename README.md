
# Monkeytype Stats in Github Readme

<div align="center">

[![codecov.badge]][codecov] [![github.release.badge]][github.release] [![semantic-release.badge]][semantic-release] [![MIT][license.badge]][license]

[![actions.ci.badge]][actions.ci] [![actions.release.badge]][actions.release]

[![tweet]][tweet.url]

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [Monkeytype Stats in Github Readme](#monkeytype-stats-in-github-readme)
  - [Table of Contents](#table-of-contents)
  - [Changelog](#changelog)
  - [Demo](#demo)
  - [Preparation](#preparation)
    - [Static Usage](#static-usage)
    - [Dynamic Github Readme Update](#dynamic-github-readme-update)
      - [1. Readme Resource Declaration](#1-readme-resource-declaration)
      - [2. Monkeytype API Key](#2-monkeytype-api-key)
  - [Github Action Workflow](#github-action-workflow)
    - [Edge Cases](#edge-cases)
  - [Endpoint Documentation](#endpoint-documentation)
  - [Contributing](#contributing)

</details>

## [Changelog][github.changelog]

## Demo

(Sometimes it takes a bit of time or some browser refresh for the badges below to all appear. If someone knows why let me know ^_^)

<details open>
  <summary>Style variants: show / hide</summary>

| style | demo |
| --- | --- |
| flat | [![monkeytype.badge.flat]][monkeytype] |
| flat-square | [![monkeytype.badge.flat-square]][monkeytype] |
| plastic | [![monkeytype.badge.plastic]][monkeytype] |
| for-the-badge | [![monkeytype.badge.for-the-badge]][monkeytype] |

</details>

<details open>
  <summary>Icon variants: show / hide</summary>

| icon | demo |
| --- | --- |
| one | [![monkeytype.badge.for-the-badge]][monkeytype] |
| two | [![monkeytype.badge.for-the-badge-two]][monkeytype] |

</details>

## Preparation

### Static Usage

<details open>
  <summary>Show / hide</summary>

This project's strategy relies on [shields.io endpoint api][shields.io.endpoint]. For one time & static badge, follow the steps below.

1. Edit this endpoint to your liking:

    ```
    https://monkeytype-badge-vhd5lan7mmhz.runkit.sh?message=...&label=...&logoVariant=...
    ```

    See [Endpoint Documentation](#endpoint-documentation) for more details about the query params.

2. Parse (1) and use [shields.io endpoint helper][shields.io.endpoint] to further customize your badge.

    ![shields.io.endpoint.customize]

</details>

### Dynamic Github Readme Update

<details open>
  <summary>Show / hide</summary>

#### 1. Readme Resource Declaration

Put the following at the bottom of your README. This is a default badge that will get updated by the github action...

```markdown
[monkeytype.badge]: https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fmonkeytype-badge-vhd5lan7mmhz.runkit.sh
```

You can display this badge somewhere in your readme as below

![monkeytype.badge.default]

```markdown
<!-- For just the image -->
![!monkeytype.badge]

<!-- For clickable image that links to monkeytype website -->
[![monkeytype.badge]](https://monkeytype.com/)
```

#### 2. Monkeytype API Key

Go to [monkeytype.settings], search for the `ape key` section, then generate and save an API Key somewhere for the next step

![monkeytype.settings.ape-key]

Add this key as a Action secret in your repo's settings.

![screenshots.github-secret]

Now follow the [next section](#github-action-workflow) to set up a github workflow.

</details>

## Github Action Workflow

See [action.yaml] for description about the inputs.

I recommend keeping the `workflow_dispatch` trigger so you can run the action manually whenever you want.

Since personal bests don't change that often, in the example I leave it to run once every week. But you can use the [crontab-guru] site to adjust as needed.

<details open>
  <summary>Example: show / hide</summary>

```yaml
# .github/workflow/monkeytype.yaml
name: Monkeytype Readme

on:
  # Runs if triggered manually through github action console
  workflow_dispatch:
  schedule:
    # Runs at 00:00 each sunday
    - cron: '0 0 * * 0'

jobs:
  update-readme:
    name: Update README
    runs-on: ubuntu-latest
    # it shouldn't take longer than a few minutes
    # but leave a timeout here in case request hangs
    timeout-minutes: 10
    steps:
      - uses: vnphanquang/monkeytype-readme@main
        with:
          # required:
          monkeytype_api_key: ${{ secrets.MONKEYTYPE_API_KEY }}
          mode: 'time'
          mode2: '30'
          # not required with default:
          style: 'flat' # option from shields.io
          logoVariant: 'one'
          label: 'monkeytype'
  # outputs badge_url should you need to use that in later steps
```

</details>

### Edge Cases

Some edge cases to expect:

- If your personal best stays the same at the time the action runs, no update should be made to README (the action still succeeds but it should have skipped that step).
- If an invalid `mode` / `mode2` is passed, the action should fail with a `MonkeytypePersonalBestNotFoundError` error.
- In case monkeytype server is down, the action should also fail.
- In case runkit server is down, a generic error badge from `shields.io` should be displayed.
  ![invalid shields.io endpoint url](https://img.shields.io/endpoint?url=something%20invalid)
- If any of the above server hangs, the action should timeout (provided you include a `timeout-minutes` input in the action).

If you encounter other edge cases not covered above, please [open an issue][github.issues] to let me know. Thanks a lot!

## Endpoint Documentation

See [the code on runkit][runkit]. The endpoint is:

```
https://monkeytype-badge-vhd5lan7mmhz.runkit.sh
```

<details open>
  <summary>Query params: show / hide</summary>

| name | required | default | description |
| --- | --- | --- | --- |
| `message` | no | `calculating` | message to display on the badge, usually something like '120wpm' |
| `logoVariant` | no | `one` | the logo variant to use, see [Demo](#demo). Accepts only the string `one` or `two` |
| `label` | no | `monkeytype` | the text next to the icon |

</details>

## Contributing

[Read Contribution Guide][github.contributing]

<br />
<div align="center">

[![tweet]][tweet.url]

</div>

<p align="center">
  <a href="https://www.buymeacoffee.com/vnphanquang" target="_blank">
    <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      height="60"
      width="217"
      alt="buy vnphanquang a coffee"
    />
  </a>
</p>

[monkeytype.badge.default]: https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fmonkeytype-badge-vhd5lan7mmhz.runkit.sh
[monkeytype.badge.flat]: https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fmonkeytype-badge-vhd5lan7mmhz.runkit.sh%3Fmessage%3D200wpm%26label%3Dmonkeytype%26style%26logoVariant%3Done
[monkeytype.badge.flat-square]: https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fmonkeytype-badge-vhd5lan7mmhz.runkit.sh%3Fmessage%3D200wpm%26label%3Dmonkeytype%26style%26logoVariant%3Done
[monkeytype.badge.plastic]: https://img.shields.io/endpoint?style=plastic&url=https%3A%2F%2Fmonkeytype-badge-vhd5lan7mmhz.runkit.sh%3Fmessage%3D200wpm%26label%3Dmonkeytype%26style%26logoVariant%3Done
[monkeytype.badge.for-the-badge]: https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fmonkeytype-badge-vhd5lan7mmhz.runkit.sh%3Fmessage%3D200wpm%26label%3Dmonkeytype%26style%26logoVariant%3Done
[monkeytype.badge.for-the-badge-two]: https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fmonkeytype-badge-vhd5lan7mmhz.runkit.sh%3Fmessage%3D200wpm%26label%3Dmonkeytype%26style%26logoVariant%3Dtwo

[monkeytype]: https://monkeytype.com/
[monkeytype.settings]: https://monkeytype.com/settings
[monkeytype.settings.ape-key]: ./public/monkeytype-settings-apekey.png

[codecov.badge]: https://codecov.io/github/vnphanquang/monkeytype-readme/coverage.svg?branch=main
[codecov]: https://codecov.io/github/vnphanquang/monkeytype-readme?branch=main

[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE

[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release.badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[github.changelog]: ./CHANGELOG
[github.contributing]: ./CONTRIBUTING
[github.issues]: https://github.com/vnphanquang/monkeytype-readme/issues?q=

[github.release.badge]: https://img.shields.io/github/v/release/vnphanquang/monkeytype-readme
[github.release]: https://github.com/vnphanquang/monkeytype-readme/releases

[actions.ci.badge]: https://github.com/vnphanquang/monkeytype-readme/actions/workflows/ci.yaml/badge.svg
[actions.ci]: https://github.com/vnphanquang/monkeytype-readme/actions/workflows/ci.yaml

[actions.release.badge]: https://github.com/vnphanquang/monkeytype-readme/actions/workflows/release.yaml/badge.svg
[actions.release]: https://github.com/vnphanquang/monkeytype-readme/actions/workflows/release.yaml

[runkit]: https://runkit.com/vnphanquang/monkeytype-badge
[runkit.endpoint]: https://monkeytype-badge-vhd5lan7mmhz.runkit.sh

[shields.io.endpoint]: https://shields.io/endpoint
[shields.io.endpoint.customize]: ./public/shieldsio-endpoint.png

[screenshots.github-secret]: ./public/github-secret.png

[action.yaml]: ./action.yaml

[crontab-guru]: https://crontab.guru/

[tweet]: https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2vnphanquang%2Fmonkeytype-readme
[tweet.url]: https://twitter.com/intent/tweet?text=monkeytype%20badge%20-%20automatically%20update%20personal%20best%20in%20github%20reamde%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvnphanquang%2Fmonkeytype-readme
