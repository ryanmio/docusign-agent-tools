import { z } from 'zod';
import { DocuSignToolkit } from '../client';

export const defineRecipientsParams = z.object({
  roles: z.array(z.object({
    roleName: z.string().describe('The name of the role')
  })).describe('The roles that need recipients'),
  mode: z.enum(['template', 'custom']).describe('Whether this is for a template or custom document'),
  templateName: z.string().optional().describe('The name of the template if mode is template')
});

export const defineRecipients = {
  name: 'defineRecipients',
  description: 'Collect recipient information for a template or custom document',
  parameters: defineRecipientsParams,
  execute: async ({ roles, mode, templateName }: z.infer<typeof defineRecipientsParams>) => {
    return {
      state: 'result',
      result: {
        roles,
        mode,
        templateName,
        completed: false,
        goBack: false,
        recipients: []
      }
    };
  }
};

export const getRecipientsParams = z.object({
  envelopeId: z.string().describe('The ID of the envelope to get recipients for')
});

export const getRecipients = {
  name: 'getRecipients',
  description: 'Get recipient information for an envelope',
  parameters: getRecipientsParams,
  execute: async ({ envelopeId }: z.infer<typeof getRecipientsParams>, toolkit: DocuSignToolkit) => {
    const { signers } = await toolkit.getRecipients(envelopeId);

    return {
      state: 'result',
      result: {
        recipients: signers?.map(signer => ({
          name: signer.name,
          email: signer.email,
          status: signer.status,
          signedDateTime: signer.signedDateTime
        }))
      }
    };
  }
}; 