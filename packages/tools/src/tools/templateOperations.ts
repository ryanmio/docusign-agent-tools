import { z } from 'zod';
import { DocuSignToolkit } from '../client';

export const listTemplatesParams = z.object({
  preselectedId: z.string().optional().describe('Optional template ID to preselect'),
  showSearch: z.boolean().optional().describe('Whether to show the search input')
});

export const listTemplates = {
  name: 'listTemplates',
  description: 'Browse and select from available templates',
  parameters: listTemplatesParams,
  execute: async ({ preselectedId, showSearch }: z.infer<typeof listTemplatesParams>, toolkit: DocuSignToolkit) => {
    // TODO: Implement actual template listing
    return {
      state: 'result',
      result: {
        selectedTemplateId: preselectedId,
        showSearch: showSearch ?? true,
        templates: []
      }
    };
  }
};

export const previewTemplateParams = z.object({
  templateId: z.string().describe('The ID of the template to preview'),
  showBackButton: z.boolean().optional().describe('Whether to show the back button')
});

export const previewTemplate = {
  name: 'previewTemplate',
  description: 'Preview a template with its details and required roles',
  parameters: previewTemplateParams,
  execute: async ({ templateId, showBackButton }: z.infer<typeof previewTemplateParams>, toolkit: DocuSignToolkit) => {
    // TODO: Implement actual template preview
    return {
      state: 'result',
      result: {
        templateId,
        templateName: 'Example Template',
        description: '',
        roles: [],
        showBackButton: showBackButton ?? false
      }
    };
  }
};

export const createEnvelopeFromTemplateParams = z.object({
  templateId: z.string().describe('The ID of the template to use'),
  subject: z.string().describe('Email subject for the envelope'),
  message: z.string().optional().describe('Optional email message'),
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string(),
    roleName: z.string()
  })).describe('The recipients to send the template to')
});

export const createEnvelopeFromTemplate = {
  name: 'createEnvelopeFromTemplate',
  description: 'Create and send an envelope from a template',
  parameters: createEnvelopeFromTemplateParams,
  execute: async ({ templateId, subject, message, recipients }: z.infer<typeof createEnvelopeFromTemplateParams>, toolkit: DocuSignToolkit) => {
    // TODO: Implement actual template sending
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

export const getTemplateFieldsParams = z.object({
  templateId: z.string().describe('The ID of the template to get fields for'),
  roleName: z.string().describe('The role name to get fields for')
});

export const getTemplateFields = {
  name: 'getTemplateFields',
  description: 'Get the available fields for a template role',
  parameters: getTemplateFieldsParams,
  execute: async ({ templateId, roleName }: z.infer<typeof getTemplateFieldsParams>, toolkit: DocuSignToolkit) => {
    // TODO: Implement actual field fetching
    return {
      state: 'result',
      result: {
        fields: []
      }
    };
  }
}; 