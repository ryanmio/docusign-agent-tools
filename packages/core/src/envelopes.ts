/**
 * List operations for DocuSign agent tools
 */

import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi } = pkg
import type { DocuSignClient } from './types'
import { checkStatus } from './tools (to delete)/status'

/**
 * Browse envelopes
 */
export const listEnvelopes = async (client: DocuSignClient, status?: string, fromDate = '2024-01-01') => {
  const envelopesApi = new EnvelopesApi(client.apiClient)
  const result = await envelopesApi.listStatusChanges(client.accountId, {
    fromDate,
    status
  })
  return result.envelopes || []
}

/**
 * Get envelope status with recipient details
 */
export const getEnvelopeStatus = async (envelopeId: string, client: DocuSignClient) => {
  const result = await checkStatus.execute({ envelopeId }, client)
  if (result.type === 'error') throw new Error(result.error)
  return result.data
} 