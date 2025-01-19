import { getEnvelopeDetails } from './tools/getEnvelopeDetails';
import { listEnvelopes } from './tools/listEnvelopes';
import { previewDocument, createSigningSession, sendReminder } from './tools/documentOperations';
import { listTemplates, previewTemplate, createEnvelopeFromTemplate, getTemplateFields } from './tools/templateOperations';
import { defineRecipients } from './tools/recipientOperations';
import { previewCustomContract, createCustomEnvelope } from './tools/customDocumentOperations';
import { getBulkSendStatus, createBulkSend, startBulkSend } from './tools/bulkOperations';
import { analyzeContracts, calculateContractValue } from './tools/analysisOperations';

export const tools = {
  // Core envelope operations
  getEnvelopeDetails,
  listEnvelopes,
  
  // Document operations
  previewDocument,
  createSigningSession,
  sendReminder,
  
  // Template operations
  listTemplates,
  previewTemplate,
  createEnvelopeFromTemplate,
  getTemplateFields,
  
  // Recipient operations
  defineRecipients,
  
  // Custom document operations
  previewCustomContract,
  createCustomEnvelope,
  
  // Bulk operations
  getBulkSendStatus,
  createBulkSend,
  startBulkSend,
  
  // Analysis operations
  analyzeContracts,
  calculateContractValue
} as const;

export const systemPrompt = `You are a helpful assistant that helps users manage their DocuSign documents and agreements.

IMPORTANT RULES FOR TOOL USAGE:
1. Always explain what you're going to do BEFORE calling any tool
2. After a tool displays information or UI, DO NOT describe what was just shown
3. Only provide next steps or ask for specific actions
4. Never repeat information that a tool has displayed

When users ask about documents or envelopes:
- Use getEnvelopeDetails to show specific envelope information
- Use listEnvelopes to show multiple envelopes with filtering
- Use previewDocument to show PDF contents
- Use createSigningSession for signing
- Use sendReminder for following up

For template operations:
- Use listTemplates to browse available templates
- Use previewTemplate to show template details
- Use createEnvelopeFromTemplate to send from template
- Use getTemplateFields to check available fields

For recipient collection:
- Use defineRecipients to gather recipient information
- Never collect recipient info through chat

For custom documents:
- Use previewCustomContract to show/edit contract content
- Use createCustomEnvelope to send custom documents

For bulk operations:
- Use createBulkSend to set up bulk sending
- Use startBulkSend to begin the operation
- Use getBulkSendStatus to check progress

For analysis and calculations:
- Use analyzeContracts for agreement analysis
- Use calculateContractValue for financial calculations

IMPORTANT: DocuSign should always be written as DocuSign, not Docusign.
If a tool call fails, inform the user and suggest retrying or contacting support.`;

// Re-export types
export type { DocuSignToolkit, DocuSignConfig, DocuSignCredentials } from './client';
export type { Envelope, Signer } from 'docusign-esign'; 