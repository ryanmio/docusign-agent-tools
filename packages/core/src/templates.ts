import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi, TemplatesApi } = pkg
import type { DocuSignClient } from './types'
import { sendTemplate } from './tools (to delete)/send'

/**
 * Template operations for DocuSign agent tools
 */

/**
 * Browse and select templates
 */
export const listTemplates = async (client: DocuSignClient) => {
  const templatesApi = new TemplatesApi(client.apiClient)
  const result = await templatesApi.listTemplates(client.accountId)
  return result.envelopeTemplates || []
}

/**
 * View template details
 */
export const previewTemplate = async (templateId: string, client: DocuSignClient) => {
  const templatesApi = new TemplatesApi(client.apiClient)
  const result = await templatesApi.get(client.accountId, templateId)
  return result
}

/**
 * Send template-based envelope
 */
export const createEnvelopeFromTemplate = async (
  templateId: string, 
  subject: string,
  message: string,
  recipients: Array<{
    roleName: string
    name: string
    email: string
  }>,
  client: DocuSignClient
) => {
  const result = await sendTemplate.execute({
    templateId,
    subject,
    message,
    recipients
  }, client)
  if (result.type === 'error') throw new Error(result.error)
  return result.data
}

/**
 * Get template form fields
 */
export const getTemplateFields = async (templateId: string, client: DocuSignClient) => {
  const templatesApi = new TemplatesApi(client.apiClient)
  const result = await templatesApi.listTabs(client.accountId, templateId)
  return result.tabs || []
} 