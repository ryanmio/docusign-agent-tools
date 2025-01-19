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
  message: z.string().optional().describe('Optional email message')
});

export const createCustomEnvelope = {
  name: 'createCustomEnvelope',
  description: 'Create and send a custom document as an envelope',
  parameters: createCustomEnvelopeParams,
  execute: async ({ markdown, recipients, message }: z.infer<typeof createCustomEnvelopeParams>, toolkit: DocuSignToolkit) => {
    // TODO: Implement actual custom envelope creation
    return {
      state: 'result',
      result: {
        success: true,
        envelopeId: 'mock-envelope-id',
        status: 'sent'
      }
    };
  }
}; 