import { z } from 'zod';
import { DocuSignToolkit } from '../client';

export const getEnvelopeDetailsParams = z.object({
  envelopeId: z.string().describe('The ID of the envelope to get details for'),
  showActions: z.boolean().optional().describe('Whether to show action buttons like void and resend')
});

export const getEnvelopeDetails = {
  name: 'getEnvelopeDetails',
  description: 'Get detailed information about a DocuSign envelope including status, recipients, and documents',
  parameters: getEnvelopeDetailsParams,
  execute: async ({ envelopeId, showActions }: z.infer<typeof getEnvelopeDetailsParams>, toolkit: DocuSignToolkit) => {
    // Get envelope details
    const envelope = await toolkit.getEnvelope(envelopeId);
    
    // Get documents
    const { envelopeDocuments: documents } = await toolkit.getDocuments(envelopeId);
    
    // Get recipients
    const { signers } = await toolkit.getRecipients(envelopeId);

    return {
      state: 'result',
      result: {
        envelopeId,
        showActions: showActions ?? true,
        envelope: {
          id: envelope.envelopeId,
          status: envelope.status,
          emailSubject: envelope.emailSubject,
          sentDateTime: envelope.sentDateTime,
          completedDateTime: envelope.completedDateTime,
          documents: documents?.map(doc => ({
            id: doc.documentId,
            name: doc.name,
            type: doc.type
          })),
          recipients: signers?.map(signer => ({
            name: signer.name,
            email: signer.email,
            status: signer.status,
            signedDateTime: signer.signedDateTime
          }))
        }
      }
    };
  }
}; 