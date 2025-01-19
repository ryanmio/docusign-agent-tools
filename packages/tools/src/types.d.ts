declare module 'docusign-esign' {
  export class ApiClient {
    constructor(config: { basePath: string; oAuthBasePath: string });
    setBasePath(basePath: string): void;
    getBasePath(): string;
    addDefaultHeader(key: string, value: string): void;
  }

  export class EnvelopesApi {
    constructor(apiClient: ApiClient);
    getEnvelope(accountId: string, envelopeId: string): Promise<Envelope>;
    listStatusChanges(accountId: string, options?: { fromDate?: string }): Promise<{ envelopes?: Envelope[] }>;
  }

  export interface Envelope {
    envelopeId: string;
    status: string;
    emailSubject: string;
    sentDateTime: string;
    completedDateTime: string;
    recipients?: {
      signers?: Signer[];
    };
  }

  export interface Signer {
    name: string;
    email: string;
    status: string;
    signedDateTime: string;
  }
} 