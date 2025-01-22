/**
 * Custom document operations for DocuSign agent tools
 */

import { z } from 'zod'
import pkg from 'docusign-esign'
const { EnvelopesApi, EnvelopeDefinition, Document, Signer, Recipients } = pkg
import type { DocuSignClient } from './types'

/**
 * Convert markdown to PDF for preview
 */
async function markdownToPdf(markdown: string): Promise<Buffer> {
  // Convert markdown to styled HTML
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          pre {
            white-space: pre-wrap;
            font-family: monospace;
          }
          .signature-field {
            border: 1px dashed #999;
            padding: 20px;
            margin: 20px 0;
            page-break-inside: avoid;
          }
          h1, h2, h3 { margin-top: 2em; }
          p { margin: 1em 0; }
        </style>
      </head>
      <body>
        ${markdown
          // Handle signature placeholders
          .replace(/<<([^>]+)>>/g, '<div class="signature-field">Signature Field: $1</div>')
          // Handle basic markdown
          .replace(/^### (.*$)/gm, '<h3>$1</h3>')
          .replace(/^## (.*$)/gm, '<h2>$1</h2>')
          .replace(/^# (.*$)/gm, '<h1>$1</h1>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\n/g, '<br>')
        }
      </body>
    </html>
  `
  return Buffer.from(html)
}

/**
 * Preview custom contract from markdown
 */
export const previewCustomContract = async (
  markdown: string, 
  mode: 'preview' | 'edit',
  client: DocuSignClient
) => {
  // Convert markdown to PDF
  const pdfBuffer = await markdownToPdf(markdown)
  
  // Create temporary envelope for preview
  const envelopesApi = new EnvelopesApi(client.apiClient)
  
  const envelope: typeof EnvelopeDefinition = {
    documents: [{
      documentBase64: pdfBuffer.toString('base64'),
      name: 'Contract.pdf',
      fileExtension: 'pdf',
      documentId: '1'
    }],
    status: mode === 'preview' ? 'created' : 'sent'
  }

  const results = await envelopesApi.createEnvelope(client.accountId, { envelopeDefinition: envelope })
  return {
    envelopeId: results.envelopeId,
    status: results.status
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
  // Convert markdown to PDF
  const pdfBuffer = await markdownToPdf(markdown)
  
  // Create envelope definition
  const envelopesApi = new EnvelopesApi(client.apiClient)
  
  // Find signature placeholders in markdown
  const signaturePlaceholders = [...markdown.matchAll(/<<([^>]+)>>/g)]
  
  const envelope: typeof EnvelopeDefinition = {
    emailSubject: 'Please sign this custom document',
    emailBlurb: message,
    documents: [{
      documentBase64: pdfBuffer.toString('base64'),
      name: 'Contract.pdf',
      fileExtension: 'pdf',
      documentId: '1'
    }],
    recipients: {
      signers: recipients.map((recipient, index) => {
        // Find signature fields for this recipient
        const recipientFields = signaturePlaceholders
          .filter(match => match[1].includes(recipient.name))
          .map((_, fieldIndex) => ({
            documentId: '1',
            pageNumber: '1',
            // Position signature fields in a grid
            xPosition: `${100 + (fieldIndex * 200)}`,
            yPosition: `${100 + (index * 100)}`
          }))

        return {
          email: recipient.email,
          name: recipient.name,
          recipientId: (index + 1).toString(),
          routingOrder: recipient.routingOrder || index + 1,
          tabs: {
            signHereTabs: recipientFields.length > 0 ? recipientFields : [{
              documentId: '1',
              pageNumber: '1',
              xPosition: '100',
              yPosition: `${100 + (index * 100)}`
            }]
          }
        } as typeof Signer
      })
    },
    status: 'sent'
  }

  const results = await envelopesApi.createEnvelope(client.accountId, { envelopeDefinition: envelope })
  return {
    envelopeId: results.envelopeId,
    status: results.status
  }
} 