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