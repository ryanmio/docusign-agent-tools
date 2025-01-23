/**
 * List operations for DocuSign agent tools
 */

import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi } = pkg
import type { DocuSignClient } from './types'
import { checkStatus } from './tools (to delete)/status'

export interface EnvelopeListParams {
  status?: string
  fromDate?: string
  count?: number
  startPosition?: number
}

export interface EnvelopeDetails {
  id: string
  status: string
  subject: string
  created: string
  recipients: {
    id: string
    name: string
    email: string
    status: string
  }[]
  documents: {
    id: string
    name: string
    type: string
  }[]
}

/**
 * List envelopes with optional filtering
 */
export const listEnvelopes = async (
  client: DocuSignClient,
  params: EnvelopeListParams = {}
) => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  const result = await envelopesApi.listStatusChanges(client.accountId, {
    fromDate: params.fromDate || '2024-01-01',
    status: params.status,
    count: params.count || 10,
    startPosition: params.startPosition || 0
  })
  return {
    envelopes: result.envelopes || [],
    totalCount: result.totalSetSize || 0
  }
}

/**
 * Get envelope details including recipients and documents
 */
export const getEnvelopeDetails = async (
  envelopeId: string,
  client: DocuSignClient
): Promise<EnvelopeDetails> => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  const [envelope, recipients, documents] = await Promise.all([
    envelopesApi.getEnvelope(client.accountId, envelopeId),
    envelopesApi.listRecipients(client.accountId, envelopeId),
    envelopesApi.listDocuments(client.accountId, envelopeId)
  ])

  return {
    id: envelope.envelopeId || '',
    status: envelope.status || '',
    subject: envelope.emailSubject || '',
    created: envelope.createdDateTime || '',
    recipients: (recipients.signers || []).map(signer => ({
      id: signer.recipientId || '',
      name: signer.name || '',
      email: signer.email || '',
      status: signer.status || ''
    })),
    documents: (documents.envelopeDocuments || []).map(doc => ({
      id: doc.documentId || '',
      name: doc.name || '',
      type: doc.type || 'application/pdf'
    }))
  }
}

/**
 * Download envelope document
 */
export const downloadDocument = async (
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
 * Resend envelope to recipients
 */
export const resendEnvelope = async (
  envelopeId: string,
  client: DocuSignClient
) => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  
  // Get original envelope details
  const [envelope, recipients, documents] = await Promise.all([
    envelopesApi.getEnvelope(client.accountId, envelopeId),
    envelopesApi.listRecipients(client.accountId, envelopeId),
    envelopesApi.listDocuments(client.accountId, envelopeId)
  ])

  // Download documents
  const documentContents = await Promise.all(
    documents.envelopeDocuments.map(doc =>
      downloadDocument(envelopeId, doc.documentId, client)
    )
  )

  // Create new envelope definition
  const envelopeDefinition = {
    emailSubject: envelope.emailSubject,
    emailBlurb: envelope.emailBlurb,
    status: 'sent',
    documents: documents.envelopeDocuments.map((doc, i) => ({
      documentBase64: documentContents[i].toString('base64'),
      name: doc.name,
      documentId: doc.documentId
    })),
    recipients: {
      signers: recipients.signers?.map(signer => ({
        email: signer.email,
        name: signer.name,
        recipientId: signer.recipientId,
        routingOrder: signer.routingOrder
      }))
    }
  }

  // Create and send new envelope
  const result = await envelopesApi.createEnvelope(client.accountId, {
    envelopeDefinition
  })

  return {
    envelopeId: result.envelopeId
  }
}

/**
 * Get envelope status with recipient details
 */
export const getEnvelopeStatus = async (envelopeId: string, client: DocuSignClient) => {
  const result = await checkStatus.execute({ envelopeId }, client)
  if (result.type === 'error') throw new Error(result.error)
  return result.data
} 