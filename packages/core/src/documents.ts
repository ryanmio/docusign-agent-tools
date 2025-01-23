/**
 * Document operations for DocuSign agent tools
 */

import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi } = pkg
import type { DocuSignClient } from './types'

export interface DocumentOptions {
  name: string
  content: Buffer | string
  fileExtension?: string
  documentId?: string
}

export interface RecipientOptions {
  email: string
  name: string
  routingOrder?: number
  recipientId?: string
}

/**
 * Get envelope and document details
 */
export const getEnvelopeDetails = async (envelopeId: string, client: DocuSignClient) => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  const [envelope, documents] = await Promise.all([
    envelopesApi.getEnvelope(client.accountId, envelopeId),
    envelopesApi.listDocuments(client.accountId, envelopeId)
  ])

  return {
    envelope,
    documents: documents.envelopeDocuments || []
  }
}

/**
 * Generate signing session
 */
export const createSigningSession = async (envelopeId: string, returnUrl: string, client: DocuSignClient) => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  const result = await envelopesApi.createRecipientView(client.accountId, envelopeId, {
    returnUrl,
    authenticationMethod: 'none'
  })
  return result
}

/**
 * Send signing reminders
 */
export const sendReminder = async (envelopeId: string, message: string, client: DocuSignClient) => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  const result = await envelopesApi.createReminder(client.accountId, envelopeId, {
    reminderEnabled: 'true',
    reminderDelay: '1',
    reminderFrequency: '1',
    message
  })
  return result
}

/**
 * Create envelope from documents
 */
export const createEnvelope = async (
  documents: DocumentOptions[],
  recipients: RecipientOptions[],
  options: {
    emailSubject?: string
    emailBlurb?: string
    status?: 'created' | 'sent'
  } = {},
  client: DocuSignClient
) => {
  const envelopesApi = new EnvelopesApi(client.apiClient)

  // Convert documents to base64
  const documentDefinitions = documents.map((doc, i) => ({
    documentBase64: Buffer.isBuffer(doc.content) 
      ? doc.content.toString('base64')
      : Buffer.from(doc.content).toString('base64'),
    name: doc.name,
    fileExtension: doc.fileExtension || 'pdf',
    documentId: doc.documentId || (i + 1).toString()
  }))

  // Map recipients to signers
  const signers = recipients.map((recipient, i) => ({
    email: recipient.email,
    name: recipient.name,
    recipientId: recipient.recipientId || (i + 1).toString(),
    routingOrder: recipient.routingOrder || 1,
    tabs: {
      signHereTabs: [{
        documentId: '1',
        pageNumber: '1',
        xPosition: '100',
        yPosition: '100'
      }]
    }
  }))

  // Create envelope definition
  const envelopeDefinition = {
    emailSubject: options.emailSubject || 'Please sign this document',
    emailBlurb: options.emailBlurb,
    documents: documentDefinitions,
    recipients: { signers },
    status: options.status || 'created'
  }

  // Create envelope
  const result = await envelopesApi.createEnvelope(client.accountId, {
    envelopeDefinition
  })

  return {
    envelopeId: result.envelopeId
  }
}

/**
 * Preview document before sending
 */
export const previewDocument = async (
  document: DocumentOptions,
  client: DocuSignClient
) => {
  // Create temporary envelope for preview
  const result = await createEnvelope(
    [document],
    [{
      email: 'preview@example.com',
      name: 'Preview User'
    }],
    {
      status: 'created',
      emailSubject: 'Document Preview'
    },
    client
  )

  return {
    envelopeId: result.envelopeId,
    documentId: '1'
  }
}

/**
 * Get document from envelope
 */
export const getDocument = async (
  envelopeId: string,
  documentId: string,
  client: DocuSignClient
): Promise<Buffer> => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  const document = await envelopesApi.getDocument(
    client.accountId,
    envelopeId,
    documentId
  )
  return Buffer.from(document)
}

/**
 * List documents in envelope
 */
export const listDocuments = async (
  envelopeId: string,
  client: DocuSignClient
) => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  const result = await envelopesApi.listDocuments(
    client.accountId,
    envelopeId
  )
  return result.envelopeDocuments || []
} 