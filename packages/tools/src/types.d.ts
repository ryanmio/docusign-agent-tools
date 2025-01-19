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
    getDocuments(accountId: string, envelopeId: string): Promise<{ envelopeDocuments?: Document[] }>;
    getDocument(accountId: string, envelopeId: string, documentId: string): Promise<Buffer>;
    getRecipients(accountId: string, envelopeId: string): Promise<{ signers?: Signer[] }>;
    createRecipientView(accountId: string, envelopeId: string, recipientViewRequest: RecipientViewRequest): Promise<{ url: string }>;
    createReminder(accountId: string, envelopeId: string, reminderRequest: ReminderRequest): Promise<{ recipientCount: number }>;
    listTemplates(accountId: string): Promise<{ templates?: Template[] }>;
    getTemplate(accountId: string, templateId: string): Promise<Template>;
    createEnvelopeFromTemplate(accountId: string, envelopeDefinition: EnvelopeDefinition): Promise<{ envelopeId: string }>;
    createEnvelope(accountId: string, envelope: EnvelopeDefinition): Promise<{ envelopeId: string }>;
    getTemplateRecipientTabs(accountId: string, templateId: string, recipientId: string): Promise<TemplateTabs>;
  }

  export class BulkSendApi {
    constructor(apiClient: ApiClient);
    createBulkSendList(accountId: string, bulkList: BulkSendList): Promise<{ listId: string }>;
    createBulkSendRequest(accountId: string, bulkSendRequest: BulkSendRequest): Promise<{ batchId: string }>;
    getBulkSendBatchStatus(accountId: string, batchId: string): Promise<BulkSendBatchStatus>;
  }

  export interface BulkSendList {
    name: string;
    bulkCopies: Array<{
      recipients: {
        signers: Array<{
          email: string;
          name: string;
          roleName: string;
          tabs?: {
            textTabs?: Array<{
              tabLabel: string;
              value: string;
            }>;
          };
        }>;
      };
    }>;
  }

  export interface BulkSendRequest {
    templateId: string;
    bulkSendRequest: {
      listId: string;
      emailSubject: string;
      emailBlurb?: string;
    };
  }

  export interface BulkSendBatchStatus {
    status: string;
    sent: number;
    queued: number;
    failed: number;
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

  export interface Document {
    documentId: string;
    name: string;
    type: string;
  }

  export interface RecipientViewRequest {
    authenticationMethod: string;
    email: string;
    userName: string;
    clientUserId?: string;
    returnUrl: string;
  }

  export interface ReminderRequest {
    reminderEnabled: string;
    reminderDelay: string;
    reminderFrequency: string;
    message?: string;
  }

  export interface Template {
    templateId: string;
    name: string;
    description?: string;
    roles?: TemplateRole[];
  }

  export interface TemplateRole {
    roleName: string;
    name?: string;
    email?: string;
  }

  export interface EnvelopeDefinition {
    templateId?: string;
    emailSubject: string;
    emailBlurb?: string;
    templateRoles?: TemplateRole[];
    documents?: Array<{
      documentBase64: string;
      name: string;
      fileExtension: string;
      documentId: string;
    }>;
    recipients?: {
      signers?: Array<{
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
    };
    status?: string;
  }

  export interface TemplateTabs {
    textTabs?: Array<{
      tabLabel: string;
      value?: string;
      documentId?: string;
      pageNumber?: string;
      xPosition?: string;
      yPosition?: string;
    }>;
    numberTabs?: Array<{
      tabLabel: string;
      value?: string;
      documentId?: string;
      pageNumber?: string;
      xPosition?: string;
      yPosition?: string;
    }>;
    dateTabs?: Array<{
      tabLabel: string;
      value?: string;
      documentId?: string;
      pageNumber?: string;
      xPosition?: string;
      yPosition?: string;
    }>;
    signHereTabs?: Array<{
      documentId?: string;
      pageNumber?: string;
      xPosition?: string;
      yPosition?: string;
    }>;
  }
} 