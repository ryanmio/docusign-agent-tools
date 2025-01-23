/**
 * Custom document operations for DocuSign agent tools
 */

import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi, EnvelopeDefinition, Document, Signer } = pkg
import type { DocuSignClient } from './types'

/**
 * Preview custom contract from markdown
 */
export const previewCustomContract = async (
  markdown: string, 
  mode: 'preview' | 'edit',
  client: DocuSignClient
) => {
  // For hackathon, we just return the markdown and mode
  // The UI will handle rendering with the MarkdownEditor component
  return {
    markdown,
    mode,
    completed: false
  }
}

/**
 * Send custom document
 */
export const createCustomEnvelope = async (
  markdown: string,
  recipients: Array<{
    name: string,
    email: string,
    routingOrder?: number
  }>,
  message: string,
  client: DocuSignClient
) => {
  // Convert markdown to HTML
  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <pre style="font-family: monospace; white-space: pre-wrap;">${markdown}</pre>
      </body>
    </html>
  `
  
  // Create envelope definition
  const envelopesApi = new EnvelopesApi(client.apiClient)
  
  const envelope: typeof EnvelopeDefinition = {
    emailSubject: 'Please sign this custom document',
    emailBlurb: message,
    documents: [{
      documentBase64: Buffer.from(html).toString('base64'),
      name: 'Contract.html',
      fileExtension: 'html',
      documentId: '1'
    }],
    recipients: {
      signers: recipients.map((recipient, index) => ({
        email: recipient.email,
        name: recipient.name,
        recipientId: (index + 1).toString(),
        routingOrder: recipient.routingOrder || index + 1,
        tabs: {
          signHereTabs: [{
            documentId: '1',
            pageNumber: '1',
            xPosition: '100',
            yPosition: '100'
          }]
        }
      } as typeof Signer))
    },
    status: 'sent'
  }

  const results = await envelopesApi.createEnvelope(client.accountId, { envelopeDefinition: envelope })
  return {
    envelopeId: results.envelopeId,
    status: results.status,
    success: true
  }
} 