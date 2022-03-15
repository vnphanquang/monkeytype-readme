export enum InputKey {
  github_token = 'github_token',
  monkeytype_api_key = 'monkeytype_api_key',
  mode = 'mode',
  mode2 = 'mode2',
  style = 'style',
  logoVariant = 'logoVariant',
  label = 'label',
}

export type Input = Record<keyof typeof InputKey, string>;
