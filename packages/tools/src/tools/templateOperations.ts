import { z } from 'zod';
import { DocuSignToolkit } from '../client';
import { Template, TemplateRole } from 'docusign-esign';

export const listTemplatesParams = z.object({
  preselectedId: z.string().optional().describe('Optional template ID to preselect'),
  showSearch: z.boolean().optional().describe('Whether to show the search input')
});

export const listTemplates = {
  name: 'listTemplates',
  description: 'Browse and select from available templates',
  parameters: listTemplatesParams,
  execute: async ({ preselectedId, showSearch }: z.infer<typeof listTemplatesParams>, toolkit: DocuSignToolkit) => {
    // Get templates
    const { templates } = await toolkit.listTemplates();

    return {
      state: 'result',
      result: {
        selectedTemplateId: preselectedId,
        showSearch: showSearch ?? true,
        templates: templates?.map((template: Template) => ({
          id: template.templateId,
          name: template.name,
          description: template.description
        }))
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
    // Get template details
    const template = await toolkit.getTemplate(templateId);

    return {
      state: 'result',
      result: {
        templateId,
        templateName: template.name,
        description: template.description || '',
        roles: template.roles?.map((role: TemplateRole) => ({
          roleId: role.roleName,
          roleName: role.roleName
        })),
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
    // Create envelope from template
    const { envelopeId } = await toolkit.createEnvelopeFromTemplate({
      templateId,
      emailSubject: subject,
      emailBlurb: message,
      recipients
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

export const getTemplateFieldsParams = z.object({
  templateId: z.string().describe('The ID of the template to get fields for'),
  roleName: z.string().describe('The role name to get fields for')
});

export const getTemplateFields = {
  name: 'getTemplateFields',
  description: 'Get the available fields for a template role',
  parameters: getTemplateFieldsParams,
  execute: async ({ templateId, roleName }: z.infer<typeof getTemplateFieldsParams>, toolkit: DocuSignToolkit) => {
    const tabs = await toolkit.getTemplateRecipientTabs(templateId, roleName);
    
    // Collect all available fields
    const fields = [
      ...(tabs.textTabs?.map(tab => ({
        type: 'text',
        label: tab.tabLabel,
        value: tab.value,
        location: {
          documentId: tab.documentId,
          pageNumber: tab.pageNumber,
          x: tab.xPosition,
          y: tab.yPosition
        }
      })) || []),
      ...(tabs.numberTabs?.map(tab => ({
        type: 'number',
        label: tab.tabLabel,
        value: tab.value,
        location: {
          documentId: tab.documentId,
          pageNumber: tab.pageNumber,
          x: tab.xPosition,
          y: tab.yPosition
        }
      })) || []),
      ...(tabs.dateTabs?.map(tab => ({
        type: 'date',
        label: tab.tabLabel,
        value: tab.value,
        location: {
          documentId: tab.documentId,
          pageNumber: tab.pageNumber,
          x: tab.xPosition,
          y: tab.yPosition
        }
      })) || [])
    ];

    return {
      state: 'result',
      result: {
        fields,
        templateId,
        roleName
      }
    };
  }
}; 