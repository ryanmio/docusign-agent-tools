/**
 * DocuSign agent tools - Core package
 */

// Export all types
export * from './types'

// Export all functionality
export * from './documents'
export * from './templates'
export * from './recipients'
export * from './contracts'
export * from './bulk'
export * from './envelopes'

import pkg from 'docusign-esign'
const { ApiClient } = pkg

export interface DocuSignConfig {
  accessToken: string
  accountId: string
  baseUrl?: string
}

export class DocuSignClient {
  private baseUrl: string
  private headers: HeadersInit
  private accountId: string
  public apiClient: typeof ApiClient

  constructor(config: DocuSignConfig) {
    this.baseUrl = config.baseUrl || 'https://demo.docusign.net/restapi/v2.1'
    this.accountId = config.accountId
    this.headers = {
      'Authorization': `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    
    // Initialize DocuSign API client
    const apiClient = new ApiClient()
    apiClient.setBasePath(this.baseUrl)
    apiClient.addDefaultHeader('Authorization', `Bearer ${config.accessToken}`)
    this.apiClient = apiClient
    
    // Debug logging
    console.log('DocuSignClient initialized with:')
    console.log(`- Base URL: ${this.baseUrl}`)
    console.log(`- Account ID: ${this.accountId}`)
    console.log(`- Headers:`, {
      ...this.headers,
      'Authorization': `Bearer ${config.accessToken.substring(0, 20)}...`
    })
  }

  private async handleResponse(response: Response, operation: string) {
    if (!response.ok) {
      const text = await response.text()
      let errorData
      try {
        errorData = JSON.parse(text)
      } catch {
        errorData = { message: text }
      }

      if (errorData.errorCode === 'AUTHORIZATION_INVALID_TOKEN') {
        throw new Error(`Your DocuSign access token has expired or is invalid. Please obtain a fresh token and try again.`)
      }

      console.error(`${operation} failed:`, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        error: errorData
      })

      throw new Error(`Failed to ${operation}: ${response.statusText}\n${text}`)
    }
    return response.json()
  }
}

/**
 * Create a DocuSign client instance
 */
export function createClient(config: DocuSignConfig): DocuSignClient {
  return new DocuSignClient(config)
}

/**
 * Initialize the complete toolkit with all functionality
 */
export function createDocuSignTools(config: DocuSignConfig) {
  const client = createClient(config)
  
  return {
    // Document operations
    documents: {
      getEnvelopeDetails: (envelopeId: string) => getEnvelopeDetails(envelopeId, client),
      previewDocument: (envelopeId: string, documentId: string) => previewDocument(envelopeId, documentId, client),
      createSigningSession: (envelopeId: string, returnUrl: string) => createSigningSession(envelopeId, returnUrl, client),
      sendReminder: (envelopeId: string, message: string) => sendReminder(envelopeId, message, client)
    },
    
    // Template operations
    templates: {
      listTemplates: () => listTemplates(client),
      previewTemplate: (templateId: string) => previewTemplate(templateId, client),
      createEnvelopeFromTemplate: (templateId: string, subject: string, message: string, recipients: any[]) => 
        createEnvelopeFromTemplate(templateId, subject, message, recipients, client),
      getTemplateFields: (templateId: string) => getTemplateFields(templateId, client)
    },
    
    // Recipient operations
    recipients: {
      defineRecipients: (roles: any[], mode: 'template' | 'custom') => defineRecipients(roles, mode, client)
    },
    
    // Envelope operations
    envelopes: {
      listEnvelopes: (status?: string, fromDate?: string) => listEnvelopes(client, status, fromDate),
      getEnvelopeStatus: (envelopeId: string) => getEnvelopeStatus(envelopeId, client)
    }
  }
}