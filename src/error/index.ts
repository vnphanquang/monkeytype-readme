export class BadgeResourceDeclarationNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'BadgeResourceDeclarationNotFoundError';
  }
}

export class MonkeytypePersonalBestNotFoundError extends Error {
  constructor(message ='MonkeytypePersonalBestNotFoundError') {
    super(message);
    this.name = 'MonkeytypePersonalBestNotFoundError';
  }
}

export class MonkeytypeApiKeyNotFoundError extends Error {
  constructor(message ='MonkeytypeApiKeyNotFoundError') {
    super(message);
    this.name = 'MonkeytypeApiKeyNotFoundError';
  }
}
