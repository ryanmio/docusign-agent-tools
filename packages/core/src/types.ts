import { z } from 'zod'
import type { ApiClient } from 'docusign-esign'

/**
 * Core client configuration
 */
export interface DocuSignConfig {
  accessToken: string
  accountId: string
  baseUrl?: string
}

/**
 * Core client interface
 */
export interface DocuSignClient {
  apiClient: ApiClient
  accountId: string
  baseUrl: string
}

/**
 * Tool response wrapper
 */
export type ToolResponse<T> = {
  type: 'success'
  data: T
} | {
  type: 'error'
  error: string
}

/**
 * Base tool interface
 */
export interface Tool<P, R = any> {
  name: string
  description: string
  parameters: z.ZodType<P>
  execute: (params: P, client: DocuSignClient) => Promise<ToolResponse<R>>
}

/**
 * Envelope data structure
 */
export interface EnvelopeData {
  envelopeId: string
  status: string
  createdDateTime?: string
  sentDateTime?: string
  completedDateTime?: string
}

/**
 * Recipient data structure
 */
export interface RecipientData {
  name: string
  email: string
  status: string
  signedDateTime?: string
}

/**
 * Document data structure
 */
export interface DocumentData {
  documentId: string
  name: string
  type: string
  uri?: string
} 