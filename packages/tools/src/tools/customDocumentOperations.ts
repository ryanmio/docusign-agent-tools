import { z } from 'zod';
import { DocuSignToolkit } from '../client';

export const previewCustomContractParams = z.object({
  markdown: z.string().describe('The contract content in markdown format with DocuSign anchor tags'),
  mode: z.enum(['preview', 'edit']).default('preview').describe('The initial display mode')
});

export const previewCustomContract = {
  name: 'previewCustomContract',
  description: 'Preview a custom contract in markdown format',
  parameters: previewCustomContractParams,
  execute: async ({ markdown, mode }: z.infer<typeof previewCustomContractParams>) => {
    return {
      state: 'result',
      result: {
        markdown,
        mode,
        completed: false
      }
    };
  }
};

export const createCustomEnvelopeParams = z.object({
  markdown: z.string().describe('The contract content in markdown format'),
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string(),
    roleName: z.string()
  })).describe('The recipients to send the contract to'),
  subject: z.string().describe('Email subject for the envelope'),
  message: z.string().optional().describe('Optional email message')
});

export const createCustomEnvelope = {
  name: 'createCustomEnvelope',
  description: 'Create and send a custom document as an envelope',
  parameters: createCustomEnvelopeParams,
  execute: async ({ markdown, recipients, subject, message }: z.infer<typeof createCustomEnvelopeParams>, toolkit: DocuSignToolkit) => {
    // Convert markdown to PDF
    const pdfBuffer = await convertMarkdownToPdf(markdown);

    // Create envelope with PDF
    const { envelopeId } = await toolkit.createEnvelopeWithDocument({
      emailSubject: subject,
      emailBlurb: message,
      document: {
        documentBase64: pdfBuffer.toString('base64'),
        name: 'Contract.pdf',
        fileExtension: 'pdf',
        documentId: '1'
      },
      recipients: recipients.map((recipient, i) => ({
        email: recipient.email,
        name: recipient.name,
        recipientId: (i + 1).toString(),
        routingOrder: i + 1,
        tabs: {
          signHereTabs: [{
            anchorString: `<<SIGNER${i + 1}_HERE>>`,
            anchorUnits: "pixels",
            anchorXOffset: "0",
            anchorYOffset: "0",
            anchorIgnoreIfNotPresent: false,
            anchorMatchWholeWord: true
          }],
          dateSignedTabs: [{
            anchorString: "<<DATE_HERE>>",
            anchorUnits: "pixels",
            anchorXOffset: "0",
            anchorYOffset: "0",
            anchorIgnoreIfNotPresent: false,
            anchorMatchWholeWord: true
          }]
        }
      }))
    });

    return {
      state: 'result',
      result: {
        success: true,
        envelopeId,
        status: 'sent'
      }
    };
  }
};

// Helper function to convert markdown to PDF
async function convertMarkdownToPdf(markdown: string): Promise<Buffer> {
  // This would use a library like puppeteer to convert markdown to PDF
  // For now, we'll return a mock PDF buffer
  return Buffer.from('Mock PDF content');
} 