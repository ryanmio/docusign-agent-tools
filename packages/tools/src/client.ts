import { ApiClient, EnvelopesApi } from 'docusign-esign';

export interface DocuSignConfig {
  clientId: string;
  apiBasePath: string;
}

export interface DocuSignCredentials {
  accessToken: string;
  accountId: string;
}

export class DocuSignToolkit {
  private client: ApiClient;
  private envelopesApi: EnvelopesApi;
  private credentials?: DocuSignCredentials;

  constructor(config: DocuSignConfig) {
    this.client = new ApiClient({
      basePath: config.apiBasePath,
      oAuthBasePath: 'account-d.docusign.com'
    });
    this.envelopesApi = new EnvelopesApi(this.client);
  }

  setCredentials(credentials: DocuSignCredentials) {
    this.credentials = credentials;
    this.client.setBasePath(this.client.getBasePath());
    this.client.addDefaultHeader('Authorization', `Bearer ${credentials.accessToken}`);
  }

  async getEnvelopeDetails(envelopeId: string) {
    if (!this.credentials) throw new Error('Not authenticated');
    
    return await this.envelopesApi.getEnvelope(
      this.credentials.accountId,
      envelopeId
    );
  }

  async listEnvelopes(fromDate?: string) {
    if (!this.credentials) throw new Error('Not authenticated');

    return await this.envelopesApi.listStatusChanges(
      this.credentials.accountId,
      {
        fromDate: fromDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    );
  }
} 