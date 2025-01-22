/**
 * Document operations for DocuSign agent tools
 */

import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi } = pkg
import type { DocuSignClient } from './types'
import { viewDocument } from './tools (to delete)/view'

/**
 * Get envelope and document details
 */
export const getEnvelopeDetails = async (envelopeId: string, client: DocuSignClient) => {
  const result = await viewDocument.execute({ envelopeId }, client)
  if (result.type === 'error') throw new Error(result.error)
  return result.data
}

/**
 * Preview document content
 */
export const previewDocument = async (envelopeId: string, documentId: string, client: DocuSignClient) => {
  const result = await viewDocument.execute({ envelopeId, documentId }, client)
  if (result.type === 'error') throw new Error(result.error)
  return result.data
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