import { z } from 'zod';
import { DocuSignToolkit } from '../client';

export const listEnvelopesParams = z.object({
  fromDate: z.string().optional().describe('Optional date to list envelopes from (ISO format)'),
  status: z.enum(['created', 'sent', 'delivered', 'signed', 'completed', 'declined', 'voided']).optional()
    .describe('Filter envelopes by status'),
  showStatusFilter: z.boolean().optional().describe('Whether to show the status filter in UI')
});

export const listEnvelopes = {
  name: 'listEnvelopes',
  description: 'List DocuSign envelopes with optional filtering by date and status',
  parameters: listEnvelopesParams,
  execute: async ({ fromDate, status, showStatusFilter }: z.infer<typeof listEnvelopesParams>, toolkit: DocuSignToolkit) => {
    const response = await toolkit.listEnvelopes(fromDate);
    
    const envelopes = response.envelopes
      ?.filter(env => !status || env.status === status)
      ?.map(envelope => ({
        id: envelope.envelopeId,
        status: envelope.status,
        emailSubject: envelope.emailSubject,
        sentDateTime: envelope.sentDateTime,
        completedDateTime: envelope.completedDateTime
      })) || [];

    return {
      state: 'result',
      result: {
        envelopes,
        showStatusFilter: showStatusFilter ?? true,
        count: envelopes.length
      }
    };
  }
}; 