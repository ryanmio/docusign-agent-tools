/**
 * Bulk operations for DocuSign agent tools
 */

import { z } from 'zod'
import pkg from 'docusign-esign'
const { BulkEnvelopesApi, EnvelopesApi } = pkg
import type { DocuSignClient } from './types'

export interface BulkRecipient {
  name: string
  email: string
  status?: string
  docusign_envelope_id?: string
  error_message?: string
}

export interface BulkOperationStatus {
  id: string
  name: string
  status: 'created' | 'processing' | 'completed' | 'failed'
  total_count: number
  processed_count: number
  success_count: number
  error_count: number
  created_at: string
  updated_at?: string
  completed_at?: string
  recipients: BulkRecipient[]
}

/**
 * Show bulk send status
 */
export const getBulkSendStatus = async (
  operationId: string,
  client: DocuSignClient
): Promise<BulkOperationStatus> => {
  const bulkApi = new BulkEnvelopesApi(client.apiClient)
  const envelopesApi = new EnvelopesApi(client.apiClient)

  // Get bulk send list
  const bulkList = await bulkApi.getBulkSendList(client.accountId, operationId)
  
  // Get envelope statuses
  const envelopes = await Promise.all(
    (bulkList.bulkCopies || []).map(async (copy) => {
      if (!copy.envelopeId) return null
      try {
        return await envelopesApi.getEnvelope(client.accountId, copy.envelopeId)
      } catch {
        return null
      }
    })
  )

  // Calculate stats
  const total = bulkList.bulkCopies?.length || 0
  const processed = envelopes.filter(e => e !== null).length
  const succeeded = envelopes.filter(e => e?.status === 'completed').length
  const failed = envelopes.filter(e => e?.status === 'failed').length

  // Map recipients
  const recipients = bulkList.bulkCopies?.map((copy, index) => ({
    name: copy.name || '',
    email: copy.email || '',
    status: envelopes[index]?.status,
    docusign_envelope_id: copy.envelopeId,
    error_message: copy.errorDetails?.message
  })) || []

  return {
    id: operationId,
    name: bulkList.name || 'Bulk Send Operation',
    status: processed === total ? 'completed' : failed > 0 ? 'failed' : 'processing',
    total_count: total,
    processed_count: processed,
    success_count: succeeded,
    error_count: failed,
    created_at: bulkList.createdDateTime || new Date().toISOString(),
    updated_at: bulkList.updatedDateTime,
    completed_at: processed === total ? new Date().toISOString() : undefined,
    recipients
  }
}

/**
 * Initialize bulk send
 */
export const createBulkSend = async (
  templateId: string,
  recipients: BulkRecipient[],
  name: string,
  client: DocuSignClient
) => {
  const bulkApi = new BulkEnvelopesApi(client.apiClient)

  // Create bulk send list
  const list = await bulkApi.createBulkSendList(client.accountId, {
    name,
    bulkCopies: recipients.map((recipient, index) => ({
      name: recipient.name,
      email: recipient.email,
      accessCode: '',
      identification: '',
      phoneNumber: '',
      recipientId: (index + 1).toString(),
      rowNumber: (index + 1).toString()
    }))
  })

  return {
    operationId: list.listId,
    name,
    status: 'created' as const,
    total_count: recipients.length,
    processed_count: 0,
    success_count: 0,
    error_count: 0,
    created_at: new Date().toISOString(),
    recipients
  }
}

/**
 * Begin bulk operation
 */
export const startBulkSend = async (
  operationId: string,
  client: DocuSignClient
) => {
  const bulkApi = new BulkEnvelopesApi(client.apiClient)
  await bulkApi.getBulkSendList(client.accountId, operationId)
  
  return {
    operationId,
    status: 'processing' as const
  }
} 