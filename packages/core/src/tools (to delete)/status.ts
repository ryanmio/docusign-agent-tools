import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi } = pkg
import type { DocuSignClient, ToolResponse } from '../types'
import type { Tool, EnvelopeData, RecipientData } from './types'

export interface CheckStatusParams {
  envelopeId: string
}

export interface CheckStatusResponse {
  envelope: EnvelopeData
  recipients?: RecipientData[]
}

export const checkStatus: Tool<CheckStatusParams, CheckStatusResponse> = {
  name: 'checkStatus',
  description: 'Check the status of a DocuSign envelope',
  parameters: z.object({
    envelopeId: z.string().describe('The ID of the envelope to check')
  }),
  execute: async (
    params: CheckStatusParams,
    client: DocuSignClient
  ): Promise<ToolResponse<CheckStatusResponse>> => {
    try {
      const envelopesApi = new EnvelopesApi(client.apiClient)

      // Get envelope details including status
      const envelope = await envelopesApi.getEnvelope(
        client.accountId,
        params.envelopeId
      )

      // Get recipient status
      const recipients = await envelopesApi.listRecipients(
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
          recipients: recipients.signers?.map((signer) => ({
            name: signer.name!,
            email: signer.email!,
            status: signer.status!,
            signedDateTime: signer.signedDateTime
          }))
        }
      }
    } catch (error) {
      return {
        type: 'error',
        error: error instanceof Error ? error.message : 'Failed to check status'
      }
    }
  }
} 