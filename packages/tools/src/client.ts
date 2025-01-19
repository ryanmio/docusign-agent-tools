import { ApiClient, EnvelopesApi, Template, TemplateRole, BulkSendApi } from 'docusign-esign';

export interface DocuSignConfig {
  accountId: string;
  basePath: string;
  accessToken: string;
}

export interface DocuSignCredentials {
  accountId: string;
  accessToken: string;
}

export interface CreateEnvelopeFromTemplateArgs {
  templateId: string;
  emailSubject: string;
  emailBlurb?: string;
  recipients: Array<{
    email: string;
    name: string;
    roleName: string;
  }>;
}

export interface CreateEnvelopeWithDocumentArgs {
  emailSubject: string;
  emailBlurb?: string;
  document: {
    documentBase64: string;
    name: string;
    fileExtension: string;
    documentId: string;
  };
  recipients: Array<{
    email: string;
    name: string;
    recipientId: string;
    routingOrder: number;
    tabs?: {
      signHereTabs?: Array<{
        anchorString: string;
        anchorUnits: string;
        anchorXOffset: string;
        anchorYOffset: string;
        anchorIgnoreIfNotPresent: boolean;
        anchorMatchWholeWord: boolean;
      }>;
      dateSignedTabs?: Array<{
        anchorString: string;
        anchorUnits: string;
        anchorXOffset: string;
        anchorYOffset: string;
        anchorIgnoreIfNotPresent: boolean;
        anchorMatchWholeWord: boolean;
      }>;
    };
  }>;
}

export class DocuSignToolkit {
  private client: ApiClient;
  private config: DocuSignConfig;

  constructor(config: DocuSignConfig) {
    this.config = config;
    this.client = new ApiClient({
      basePath: config.basePath,
      oAuthBasePath: 'account-d.docusign.com'
    });
    this.client.addDefaultHeader('Authorization', `Bearer ${config.accessToken}`);
  }

  // Core methods for envelope operations
  async getEnvelope(envelopeId: string) {
    const envelopesApi = new EnvelopesApi(this.client);
    return envelopesApi.getEnvelope(this.config.accountId, envelopeId);
  }

  async listEnvelopes(options: { fromDate?: string } = {}) {
    const envelopesApi = new EnvelopesApi(this.client);
    return envelopesApi.listStatusChanges(this.config.accountId, {
      fromDate: options.fromDate
    });
  }

  // Template operations
  async listTemplates() {
    const envelopesApi = new EnvelopesApi(this.client);
    return envelopesApi.listTemplates(this.config.accountId);
  }

  async getTemplate(templateId: string) {
    const envelopesApi = new EnvelopesApi(this.client);
    return envelopesApi.getTemplate(this.config.accountId, templateId);
  }

  async getTemplateRecipientTabs(templateId: string, roleName: string) {
    const envelopesApi = new EnvelopesApi(this.client);
    const template = await this.getTemplate(templateId);
    const role = template.roles?.find(r => r.roleName === roleName);
    if (!role) {
      throw new Error(`Role ${roleName} not found in template`);
    }
    return envelopesApi.getTemplateRecipientTabs(this.config.accountId, templateId, role.roleName);
  }

  async createEnvelopeFromTemplate(args: CreateEnvelopeFromTemplateArgs) {
    const envelopesApi = new EnvelopesApi(this.client);
    const templateRoles = args.recipients.map(recipient => ({
      roleName: recipient.roleName,
      name: recipient.name,
      email: recipient.email
    }));

    return envelopesApi.createEnvelopeFromTemplate(this.config.accountId, {
      templateId: args.templateId,
      emailSubject: args.emailSubject,
      emailBlurb: args.emailBlurb,
      templateRoles,
      status: 'sent'
    });
  }

  async createEnvelopeWithDocument(args: CreateEnvelopeWithDocumentArgs) {
    const envelopesApi = new EnvelopesApi(this.client);
    return envelopesApi.createEnvelope(this.config.accountId, {
      emailSubject: args.emailSubject,
      emailBlurb: args.emailBlurb,
      documents: [{
        documentBase64: args.document.documentBase64,
        name: args.document.name,
        fileExtension: args.document.fileExtension,
        documentId: args.document.documentId
      }],
      recipients: {
        signers: args.recipients
      },
      status: 'sent'
    });
  }

  // Document operations
  async getDocuments(envelopeId: string) {
    const envelopesApi = new EnvelopesApi(this.client);
    return envelopesApi.getDocuments(this.config.accountId, envelopeId);
  }

  async getDocument(envelopeId: string, documentId: string) {
    const envelopesApi = new EnvelopesApi(this.client);
    return envelopesApi.getDocument(this.config.accountId, envelopeId, documentId);
  }

  // Recipient operations
  async getRecipients(envelopeId: string) {
    const envelopesApi = new EnvelopesApi(this.client);
    return envelopesApi.getRecipients(this.config.accountId, envelopeId);
  }

  // Signing operations
  async createRecipientView(envelopeId: string, recipient: { email: string; name: string; clientUserId?: string }, returnUrl: string) {
    const envelopesApi = new EnvelopesApi(this.client);
    const recipientViewRequest = {
      authenticationMethod: 'none',
      email: recipient.email,
      userName: recipient.name,
      clientUserId: recipient.clientUserId,
      returnUrl
    };
    return envelopesApi.createRecipientView(this.config.accountId, envelopeId, recipientViewRequest);
  }

  // Reminder operations
  async sendReminder(envelopeId: string, message?: string) {
    const envelopesApi = new EnvelopesApi(this.client);
    const reminderRequest = {
      reminderEnabled: 'true',
      reminderDelay: '0',
      reminderFrequency: '0',
      message
    };
    return envelopesApi.createReminder(this.config.accountId, envelopeId, reminderRequest);
  }

  // Bulk operations
  async createBulkSendList(templateId: string, recipients: Array<{
    email: string;
    name: string;
    roleName: string;
    customFields?: Record<string, string>;
  }>) {
    const bulkSendApi = new BulkSendApi(this.client);
    const bulkList = {
      name: `Bulk List ${new Date().toISOString()}`,
      bulkCopies: recipients.map(recipient => ({
        recipients: {
          signers: [{
            email: recipient.email,
            name: recipient.name,
            roleName: recipient.roleName,
            tabs: recipient.customFields ? {
              textTabs: Object.entries(recipient.customFields).map(([key, value]) => ({
                tabLabel: key,
                value
              }))
            } : undefined
          }]
        }
      }))
    };

    const { listId } = await bulkSendApi.createBulkSendList(this.config.accountId, bulkList);
    return listId;
  }

  async startBulkSend(templateId: string, listId: string, emailSubject: string, emailBlurb?: string) {
    const bulkSendApi = new BulkSendApi(this.client);
    const bulkSendRequest = {
      templateId,
      bulkSendRequest: {
        listId,
        emailSubject,
        emailBlurb
      }
    };

    const { batchId } = await bulkSendApi.createBulkSendRequest(this.config.accountId, bulkSendRequest);
    return batchId;
  }

  async getBulkSendStatus(batchId: string) {
    const bulkSendApi = new BulkSendApi(this.client);
    const status = await bulkSendApi.getBulkSendBatchStatus(this.config.accountId, batchId);
    return {
      batchId,
      status: status.status,
      completed: status.sent,
      total: status.queued + status.sent + status.failed
    };
  }
} 