export interface DocusignConfig {
  clientId: string;
  apiBasePath?: string;
  oAuthBasePath?: string;
}

export interface DocusignCredentials {
  accessToken: string;
  accountId: string;
}

export class DocusignClient {
  private config: DocusignConfig;
  private credentials?: DocusignCredentials;

  constructor(config: DocusignConfig) {
    this.config = config;
  }

  setCredentials(credentials: DocusignCredentials) {
    this.credentials = credentials;
  }

  getConfig(): DocusignConfig {
    return this.config;
  }

  getCredentials(): DocusignCredentials | undefined {
    return this.credentials;
  }
}

export const createClient = (config: DocusignConfig): DocusignClient => {
  return new DocusignClient(config);
}; 