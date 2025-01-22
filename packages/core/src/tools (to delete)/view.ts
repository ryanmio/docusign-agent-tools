import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi } = pkg
import type { DocuSignClient, ToolResponse } from '../types'
import type { Tool, EnvelopeData, DocumentData } from './types'

export interface ViewDocumentParams {
  envelopeId: string
  documentId?: string
}

export interface ViewDocumentResponse {
  envelope: EnvelopeData
  documents?: DocumentData[]
  document?: DocumentData
}

export const viewDocument: Tool<ViewDocumentParams, ViewDocumentResponse> = {
  name: 'viewDocument',
  description: 'View a DocuSign document',
  parameters: z.object({
    envelopeId: z.string().describe('The ID of the envelope containing the document'),
    documentId: z.string().optional().describe('Optional specific document ID to view')
  }),
  execute: async (
    params: ViewDocumentParams,
    client: DocuSignClient
  ): Promise<ToolResponse<ViewDocumentResponse>> => {
    try {
      const envelopesApi = new EnvelopesApi(client.apiClient)
      
      // Get envelope details
      const envelope = await envelopesApi.getEnvelope(
        client.accountId,
        params.envelopeId
      )

      // If documentId specified, get that specific document
      if (params.documentId) {
        const document = await envelopesApi.getDocument(
          client.accountId,
          params.envelopeId,
          params.documentId
        )
        return {
          type: 'success',
          data: {
            envelope: {
              envelopeId: envelope.envelopeId!,
              status: envelope.status!,
              createdDateTime: envelope.createdDateTime,
              sentDateTime: envelope.sentDateTime,
              completedDateTime: envelope.completedDateTime
            },
            document: {
              documentId: params.documentId,
              name: typeof document === 'string' ? 'Document' : document.name || '',
              type: typeof document === 'string' ? 'application/pdf' : document.type || '',
              uri: typeof document === 'string' ? '' : document.uri || ''
            }
          }
        }
      }

      // Otherwise get all documents
      const documents = await envelopesApi.listDocuments(
        client.accountId,
        params.envelopeId
      )

      return {
        type: 'success',
        data: {
          envelope: {
            envelopeId: envelope.envelopeId!,
            status: envelope.status!,
            createdDateTime: envelope.createdDateTime,
            sentDateTime: envelope.sentDateTime,
            completedDateTime: envelope.completedDateTime
          },
          documents: documents.envelopeDocuments?.map(doc => ({
            documentId: doc.documentId!,
            name: doc.name || '',
            type: doc.type || '',
            uri: doc.uri || ''
          }))
        }
      }
    } catch (error) {
      return {
        type: 'error',
        error: error instanceof Error ? error.message : 'Failed to view document'
      }
    }
  }
} 