import { z } from 'zod'
import type { DocuSignClient, ToolResponse } from '../types'

export interface Tool<P, R = any> {
  name: string
  description: string
  parameters: z.ZodType<P>
  execute: (params: P, client: DocuSignClient) => Promise<ToolResponse<R>>
}

export interface EnvelopeData {
  envelopeId: string
  status: string
  createdDateTime?: string
  sentDateTime?: string
  completedDateTime?: string
}

export interface RecipientData {
  name: string
  email: string
  status: string
  signedDateTime?: string
}

export interface DocumentData {
  documentId: string
  name: string
  type: string
  uri?: string
} 