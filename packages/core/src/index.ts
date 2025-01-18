export interface DocusignConfig {
  clientId: string;
  apiBasePath?: string;
  oAuthBasePath?: string;
}

export interface DocusignCredentials {
  accessToken: string;
  accountId: string;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface StatusState {
  status: Status;
  error?: Error;
}

export class StatusProvider {
  private state: StatusState = { status: 'idle' };
  private listeners: Set<(state: StatusState) => void> = new Set();

  getState(): StatusState {
    return this.state;
  }

  setState(newState: Partial<StatusState>) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener: (state: StatusState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export class DocusignClient {
  private config: DocusignConfig;
  private credentials?: DocusignCredentials;
  readonly status: StatusProvider;

  constructor(config: DocusignConfig) {
    this.config = config;
    this.status = new StatusProvider();
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