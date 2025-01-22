import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi, EnvelopeDefinition, TemplateRole } = pkg
import type { DocuSignClient, ToolResponse } from '../types'
import type { Tool } from './types'

export interface SendTemplateParams {
  templateId: string
  subject: string
  message: string
  recipients: Array<{
    roleName: string
    name: string
    email: string
  }>
}

export interface SendTemplateResponse {
  envelopeId: string
  status: string
}

export const sendTemplate: Tool<SendTemplateParams, SendTemplateResponse> = {
  name: 'sendTemplate',
  description: 'Send a DocuSign envelope using a template',
  parameters: z.object({
    templateId: z.string().describe('The ID of the template to use'),
    subject: z.string().describe('Email subject line for the envelope'),
    message: z.string().describe('Email message for the envelope'),
    recipients: z.array(z.object({
      roleName: z.string().describe('Role name from the template'),
      name: z.string().describe('Recipient name'),
      email: z.string().email().describe('Recipient email')
    }))
  }),
  execute: async (
    params: SendTemplateParams,
    client: DocuSignClient
  ): Promise<ToolResponse<SendTemplateResponse>> => {
    try {
      const envelopesApi = new EnvelopesApi(client.apiClient)

      // Create envelope definition
      const envelopeDefinition: EnvelopeDefinition = {
        templateId: params.templateId,
        status: 'sent',
        emailSubject: params.subject,
        emailBlurb: params.message,
        templateRoles: params.recipients.map((recipient) => ({
          roleName: recipient.roleName,
          name: recipient.name,
          email: recipient.email
        } as TemplateRole))
      }

      // Create and send envelope
      const results = await envelopesApi.createEnvelope(
        client.accountId,
        { envelopeDefinition }
      )

      return {
        type: 'success',
        data: {
          envelopeId: results.envelopeId!,
          status: results.status!
        }
      }
    } catch (error) {
      return {
        type: 'error',
        error: error instanceof Error ? error.message : 'Failed to send template'
      }
    }
  }
} 