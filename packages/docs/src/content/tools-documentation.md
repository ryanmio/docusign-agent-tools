# Docusign Agent Tools Documentation

## Overview
Docusign Agent Tools is a toolkit for building AI-powered document automation workflows with Docusign. It provides a set of tools organized into logical categories, each following the Vercel AI SDK patterns with Zod schema validation.

## Getting Started

### Installation
```bash
# Using npm
npm install @docusign-agent-tools/core @docusign-agent-tools/react

# Using pnpm
pnpm add @docusign-agent-tools/core @docusign-agent-tools/react

# Using yarn
yarn add @docusign-agent-tools/core @docusign-agent-tools/react
```

### Quick Start
1. **Initialize the DocuSign Toolkit**
```typescript
import { DocuSignToolkit } from '@docusign-agent-tools/core';

const toolkit = new DocuSignToolkit({
  accountId: 'YOUR_DOCUSIGN_ACCOUNT_ID',
  basePath: 'https://demo.docusign.net/restapi', // or production URL
  accessToken: 'YOUR_ACCESS_TOKEN'
});
```

2. **Basic Usage with React**
```typescript
import { useEnvelopeDetails } from '@docusign-agent-tools/react';

function EnvelopeViewer({ envelopeId }) {
  const { envelope, error, loading } = useEnvelopeDetails(toolkit, envelopeId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{envelope.emailSubject}</h2>
      <p>Status: {envelope.status}</p>
      {/* Display recipients and documents */}
    </div>
  );
}
```

### Common Patterns

1. **Working with Templates**
```typescript
// List available templates
const { templates } = await toolkit.listTemplates();

// Send a template
const { envelopeId } = await toolkit.createEnvelopeFromTemplate({
  templateId: templates[0].templateId,
  emailSubject: "Please sign this document",
  recipients: [{
    email: "signer@example.com",
    name: "John Doe",
    roleName: "Signer"
  }]
});
```

2. **Custom Documents**
```typescript
// Create a custom document with signing tags
const markdown = `
# Contract Agreement

This agreement is made between the parties...

Signature: <<SIGNER1_HERE>>
Date: <<DATE_HERE>>
`;

// Send for signing
const { envelopeId } = await toolkit.createEnvelopeWithDocument({
  emailSubject: "Custom Contract for Signing",
  document: {
    documentBase64: Buffer.from(markdown).toString('base64'),
    name: "Contract.pdf",
    fileExtension: "pdf",
    documentId: "1"
  },
  recipients: [{
    email: "signer@example.com",
    name: "John Doe",
    recipientId: "1",
    routingOrder: 1
  }]
});
```

3. **Bulk Operations**
```typescript
// Create and start a bulk send
const listId = await toolkit.createBulkSendList(templateId, recipients);
const batchId = await toolkit.startBulkSend(templateId, listId, "Bulk Contract");
```

### Best Practices
1. **Error Handling**
   - Always wrap API calls in try/catch blocks
   - Handle rate limits and token expiration
   - Provide meaningful error messages to users

2. **Authentication**
   - Store access tokens securely
   - Implement token refresh logic
   - Use environment variables for sensitive data

3. **Performance**
   - Cache template lists when possible
   - Use bulk operations for multiple recipients
   - Implement proper loading states in UI

### Next Steps
- Explore the detailed API documentation below
- Check out the usage examples
- Join our Discord community for support

## Core Envelope Operations

### `getEnvelopeDetails`
Retrieves detailed information about a DocuSign envelope including status, recipients, and documents.

**Parameters:**
- `envelopeId` (string): The ID of the envelope to get details for
- `showActions` (boolean, optional): Whether to show action buttons like void and resend

**Returns:**
```typescript
{
  envelopeId: string;
  showActions: boolean;
  envelope: {
    id: string;
    status: string;
    emailSubject: string;
    sentDateTime: string;
    completedDateTime: string;
    documents: Array<{
      id: string;
      name: string;
      type: string;
    }>;
    recipients: Array<{
      name: string;
      email: string;
      status: string;
      signedDateTime: string;
    }>;
  };
}
```

### `listEnvelopes`
Lists status changes for envelopes with optional date filtering.

**Parameters:**
- `fromDate` (string, optional): Filter envelopes from this date onwards

**Returns:**
```typescript
{
  envelopes: Array<{
    envelopeId: string;
    status: string;
    emailSubject: string;
    sentDateTime: string;
    completedDateTime: string;
  }>;
}
```

## Document Operations

### `previewDocument`
Previews a PDF document from a DocuSign envelope.

**Parameters:**
- `envelopeId` (string): The ID of the envelope containing the document
- `documentId` (string): The ID of the document to preview

**Returns:**
```typescript
{
  url: string; // Base64 data URL for the PDF
}
```

### `createSigningSession`
Generates an embedded signing session for a document.

**Parameters:**
- `envelopeId` (string): The ID of the envelope to sign
- `recipient`: Object containing:
  - `email` (string): Recipient's email
  - `name` (string): Recipient's name
  - `clientUserId` (string, optional): Client user ID for embedded signing
- `returnUrl` (string): The URL to return to after signing

**Returns:**
```typescript
{
  envelopeId: string;
  signingUrl: string;
  mode: 'focused';
  status: 'ready';
}
```

### `sendReminder`
Sends a reminder for a DocuSign envelope.

**Parameters:**
- `envelopeId` (string): The ID of the envelope to send reminder for
- `message` (string, optional): Optional custom reminder message

**Returns:**
```typescript
{
  success: boolean;
  envelopeId: string;
  recipientCount: number;
}
```

## Template Operations

### `listTemplates`
Browse and select from available templates.

**Parameters:**
- `preselectedId` (string, optional): Optional template ID to preselect
- `showSearch` (boolean, optional): Whether to show the search input

**Returns:**
```typescript
{
  selectedTemplateId: string | undefined;
  showSearch: boolean;
  templates: Array<{
    id: string;
    name: string;
    description: string | undefined;
  }>;
}
```

### `previewTemplate`
Preview a template with its details and required roles.

**Parameters:**
- `templateId` (string): The ID of the template to preview
- `showBackButton` (boolean, optional): Whether to show the back button

**Returns:**
```typescript
{
  templateId: string;
  templateName: string;
  description: string;
  roles: Array<{
    roleId: string;
    roleName: string;
  }>;
  showBackButton: boolean;
}
```

### `createEnvelopeFromTemplate`
Create and send an envelope from a template.

**Parameters:**
- `templateId` (string): The ID of the template to use
- `subject` (string): Email subject for the envelope
- `message` (string, optional): Optional email message
- `recipients`: Array of objects containing:
  - `email` (string): Recipient's email
  - `name` (string): Recipient's name
  - `roleName` (string): Role name from template

**Returns:**
```typescript
{
  success: boolean;
  envelopeId: string;
  status: 'sent';
}
```

### `getTemplateFields`
Get the available fields for a template role.

**Parameters:**
- `templateId` (string): The ID of the template to get fields for
- `roleName` (string): The role name to get fields for

**Returns:**
```typescript
{
  fields: Array<{
    type: 'text' | 'number' | 'date';
    label: string;
    value?: string;
    location: {
      documentId?: string;
      pageNumber?: string;
      x?: string;
      y?: string;
    };
  }>;
  templateId: string;
  roleName: string;
}
```

## Recipient Operations

### `defineRecipients`
Collect recipient information for a template or custom document.

**Parameters:**
- `roles`: Array of objects containing:
  - `roleName` (string): The name of the role
- `mode`: 'template' | 'custom': Whether this is for a template or custom document
- `templateName` (string, optional): The name of the template if mode is template

**Returns:**
```typescript
{
  roles: Array<{ roleName: string }>;
  mode: 'template' | 'custom';
  templateName?: string;
  completed: boolean;
  goBack: boolean;
  recipients: Array<{
    email: string;
    name: string;
    roleName: string;
  }>;
}
```

### `getRecipients`
Get recipient information for an envelope.

**Parameters:**
- `envelopeId` (string): The ID of the envelope to get recipients for

**Returns:**
```typescript
{
  recipients: Array<{
    name: string;
    email: string;
    status: string;
    signedDateTime: string;
  }>;
}
```

## Custom Document Operations

### `previewCustomContract`
Preview a custom contract in markdown format.

**Parameters:**
- `markdown` (string): The contract content in markdown format with DocuSign anchor tags
- `mode` ('preview' | 'edit', default: 'preview'): The initial display mode

**Returns:**
```typescript
{
  markdown: string;
  mode: 'preview' | 'edit';
  completed: boolean;
}
```

### `createCustomEnvelope`
Create and send a custom document as an envelope.

**Parameters:**
- `markdown` (string): The contract content in markdown format
- `recipients`: Array of objects containing:
  - `email` (string): Recipient's email
  - `name` (string): Recipient's name
  - `roleName` (string): Role name
- `subject` (string): Email subject for the envelope
- `message` (string, optional): Optional email message

**Returns:**
```typescript
{
  success: boolean;
  envelopeId: string;
  status: 'sent';
}
```

## Bulk Operations

### `getBulkSendStatus`
Check the status of a bulk send operation.

**Parameters:**
- `batchId` (string): The ID of the bulk send batch to check

**Returns:**
```typescript
{
  batchId: string;
  status: string;
  completed: number;
  total: number;
}
```

### `createBulkSend`
Create a new bulk send operation.

**Parameters:**
- `templateId` (string): The ID of the template to use
- `subject` (string): Email subject for the envelopes
- `message` (string, optional): Optional email message
- `recipients`: Array of objects containing:
  - `email` (string): Recipient's email
  - `name` (string): Recipient's name
  - `roleName` (string): Role name
  - `customFields` (Record<string, string>, optional): Optional custom fields

**Returns:**
```typescript
{
  batchId: string;
  recipientCount: number;
  status: 'created';
}
```

### `startBulkSend`
Start a bulk send operation.

**Parameters:**
- `batchId` (string): The ID of the bulk send batch to start

**Returns:**
```typescript
{
  batchId: string;
  status: string;
  message: string;
}
```

## Usage Examples

### Sending a Template to Multiple Recipients
```typescript
// 1. List available templates
const templates = await listTemplates({});

// 2. Preview selected template
const template = await previewTemplate({ 
  templateId: "template-123" 
});

// 3. Get template fields
const fields = await getTemplateFields({
  templateId: "template-123",
  roleName: "Signer 1"
});

// 4. Create envelope from template
const envelope = await createEnvelopeFromTemplate({
  templateId: "template-123",
  subject: "Please sign this document",
  recipients: [{
    email: "signer@example.com",
    name: "John Doe",
    roleName: "Signer 1"
  }]
});
```

### Creating and Sending a Custom Document
```typescript
// 1. Preview custom contract
const preview = await previewCustomContract({
  markdown: "# Contract\n\nThis agreement...\n\nSigned: <<SIGNER1_HERE>>",
  mode: "preview"
});

// 2. Define recipients
const recipients = await defineRecipients({
  roles: [{ roleName: "Signer" }],
  mode: "custom"
});

// 3. Create and send envelope
const envelope = await createCustomEnvelope({
  markdown: preview.markdown,
  subject: "Custom Contract",
  recipients: recipients.recipients
});
```

### Sending Documents in Bulk
```typescript
// 1. Create bulk send list
const bulkSend = await createBulkSend({
  templateId: "template-123",
  subject: "Bulk Contract Signing",
  recipients: [
    {
      email: "signer1@example.com",
      name: "John Doe",
      roleName: "Signer"
    },
    {
      email: "signer2@example.com",
      name: "Jane Smith",
      roleName: "Signer"
    }
  ]
});

// 2. Start bulk send
const started = await startBulkSend({
  batchId: bulkSend.batchId
});

// 3. Check status
const status = await getBulkSendStatus({
  batchId: started.batchId
});
``` 