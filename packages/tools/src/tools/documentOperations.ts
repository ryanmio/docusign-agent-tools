import { z } from 'zod';
import { DocuSignToolkit } from '../client';

export const previewDocumentParams = z.object({
  envelopeId: z.string().describe('The ID of the envelope containing the document'),
  documentId: z.string().describe('The ID of the document to preview')
});

export const previewDocument = {
  name: 'previewDocument',
  description: 'Preview a PDF document from a DocuSign envelope',
  parameters: previewDocumentParams,
  execute: async ({ envelopeId, documentId }: z.infer<typeof previewDocumentParams>, toolkit: DocuSignToolkit) => {
    // Get document content
    const documentBuffer = await toolkit.getDocument(envelopeId, documentId);
    
    // Convert to base64 for preview
    const base64 = documentBuffer.toString('base64');
    const url = `data:application/pdf;base64,${base64}`;

    return {
      state: 'result',
      result: { url }
    };
  }
};

export const createSigningSessionParams = z.object({
  envelopeId: z.string().describe('The ID of the envelope to sign'),
  recipient: z.object({
    email: z.string(),
    name: z.string(),
    clientUserId: z.string().optional()
  }).describe('The recipient who will sign'),
  returnUrl: z.string().describe('The URL to return to after signing')
});

export const createSigningSession = {
  name: 'createSigningSession',
  description: 'Generate an embedded signing session for a document',
  parameters: createSigningSessionParams,
  execute: async ({ envelopeId, recipient, returnUrl }: z.infer<typeof createSigningSessionParams>, toolkit: DocuSignToolkit) => {
    // Create recipient view
    const { url: signingUrl } = await toolkit.createRecipientView(envelopeId, recipient, returnUrl);

    return {
      state: 'result',
      result: {
        envelopeId,
        signingUrl,
        mode: 'focused',
        status: 'ready'
      }
    };
  }
};

export const sendReminderParams = z.object({
  envelopeId: z.string().describe('The ID of the envelope to send reminder for'),
  message: z.string().optional().describe('Optional custom reminder message')
});

export const sendReminder = {
  name: 'sendReminder',
  description: 'Send a reminder for a DocuSign envelope',
  parameters: sendReminderParams,
  execute: async ({ envelopeId, message }: z.infer<typeof sendReminderParams>, toolkit: DocuSignToolkit) => {
    // Send reminder
    const { recipientCount } = await toolkit.sendReminder(envelopeId, message);

    return {
      state: 'result',
      result: {
        success: true,
        envelopeId,
        recipientCount
      }
    };
  }
}; 