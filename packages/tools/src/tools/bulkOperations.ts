import { z } from 'zod';
import { DocuSignToolkit } from '../client';

export const getBulkSendStatusParams = z.object({
  batchId: z.string().describe('The ID of the bulk send batch to check')
});

export const getBulkSendStatus = {
  name: 'getBulkSendStatus',
  description: 'Check the status of a bulk send operation',
  parameters: getBulkSendStatusParams,
  execute: async ({ batchId }: z.infer<typeof getBulkSendStatusParams>, toolkit: DocuSignToolkit) => {
    const status = await toolkit.getBulkSendStatus(batchId);
    return {
      state: 'result',
      result: {
        batchId: status.batchId,
        status: status.status,
        completed: status.completed,
        total: status.total
      }
    };
  }
};

export const createBulkSendParams = z.object({
  templateId: z.string().describe('The ID of the template to use'),
  subject: z.string().describe('Email subject for the envelopes'),
  message: z.string().optional().describe('Optional email message'),
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string(),
    roleName: z.string(),
    customFields: z.record(z.string()).optional()
  })).describe('The list of recipients for bulk sending')
});

export const createBulkSend = {
  name: 'createBulkSend',
  description: 'Create a new bulk send operation',
  parameters: createBulkSendParams,
  execute: async ({ templateId, subject, message, recipients }: z.infer<typeof createBulkSendParams>, toolkit: DocuSignToolkit) => {
    // Create bulk list
    const listId = await toolkit.createBulkSendList(templateId, recipients);

    // Start bulk send
    const batchId = await toolkit.startBulkSend(templateId, listId, subject, message);

    return {
      state: 'result',
      result: {
        batchId,
        recipientCount: recipients.length,
        status: 'created'
      }
    };
  }
};

export const startBulkSendParams = z.object({
  batchId: z.string().describe('The ID of the bulk send batch to start')
});

export const startBulkSend = {
  name: 'startBulkSend',
  description: 'Start a bulk send operation',
  parameters: startBulkSendParams,
  execute: async ({ batchId }: z.infer<typeof startBulkSendParams>, toolkit: DocuSignToolkit) => {
    const status = await toolkit.getBulkSendStatus(batchId);
    return {
      state: 'result',
      result: {
        batchId,
        status: status.status,
        message: 'Bulk send operation started'
      }
    };
  }
}; 