# Docusign Agent Tools Documentation Structure

## 1. Landing Page
```markdown
# Docusign Agent Tools

Build AI-powered document workflows with Docusign. Simple, powerful, and type-safe.

## Key Features
- 🚀 Ready-to-use React components
- 🔒 Type-safe API with full TypeScript support
- 🤖 AI-ready with Vercel AI SDK integration
- 📝 Custom document creation with markdown
- 📦 Bulk operations support

[Get Started →](#getting-started)
[View on GitHub →](https://github.com/...)
```

## 2. Installation & Setup
```markdown
# Installation

Install the packages:
\```bash
npm install @docusign-agent-tools/core @docusign-agent-tools/react
\```

## Authentication
1. Get your Docusign credentials:
   - Account ID
   - Access Token
   - Base Path (demo or production)

2. Initialize the toolkit:
\```typescript
const toolkit = new DocuSignToolkit({
  accountId: process.env.DOCUSIGN_ACCOUNT_ID,
  accessToken: process.env.DOCUSIGN_ACCESS_TOKEN,
  basePath: process.env.DOCUSIGN_BASE_PATH
});
\```
```

## 3. Tool Documentation Template
Each tool should have the following sections:

```markdown
# Tool Name

Brief description of what the tool does and when to use it.

## Use Cases
- Common use case 1
- Common use case 2
- Common use case 3

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| param1 | string | Yes | Description of param1 |
| param2 | boolean | No | Description of param2 |

## Returns
\```typescript
interface ReturnType {
  // Type definition with comments
}
\```

## Example Usage
\```typescript
// Basic usage
const result = await tool.execute({...});

// With error handling
try {
  const result = await tool.execute({...});
} catch (error) {
  // Handle error
}
\```

## Common Patterns
\```typescript
// Example of common pattern
\```

## UI Components
If applicable, show React component usage:
\```tsx
function MyComponent() {
  // Component implementation
}
\```

## Error Handling
Common errors and how to handle them:
- Error 1: How to handle
- Error 2: How to handle

## Related Tools
- Link to related tool 1
- Link to related tool 2
```

## 4. Category Organization
Tools should be grouped into logical categories:

```markdown
# Categories

## Core Envelope Operations
Tools for managing Docusign envelopes
- [getEnvelopeDetails](#) - Get envelope information
- [listEnvelopes](#) - List envelopes

## Document Operations
Tools for working with documents
- [previewDocument](#) - Preview documents
- [createSigningSession](#) - Create signing sessions

[etc...]
```

## 5. Integration Guides
Common integration scenarios:

```markdown
# Integration Guides

## Next.js Integration
Step-by-step guide for Next.js apps

## Express Backend Integration
Guide for Express.js backends

## Authentication Patterns
Different auth approaches:
1. OAuth flow
2. JWT
3. Access tokens
```

## 6. Example Tool Documentation

Here's how a specific tool's documentation should look:

```markdown
# getEnvelopeDetails

Get detailed information about a DocuSign envelope including status, recipients, and documents.

## Use Cases
- Display envelope status in your dashboard
- Track document signing progress
- Get recipient information

## Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| envelopeId | string | Yes | The ID of the envelope to get details for |
| showActions | boolean | No | Whether to show action buttons |

## Returns
\```typescript
interface EnvelopeDetails {
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
\```

## Example Usage

### Basic Usage
\```typescript
const details = await getEnvelopeDetails({
  envelopeId: "123-456",
  showActions: true
});

console.log(details.envelope.status);
\```

### With React Hook
\```tsx
function EnvelopeViewer({ envelopeId }) {
  const { envelope, error, loading } = useEnvelopeDetails(toolkit, envelopeId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{envelope.emailSubject}</h2>
      <p>Status: {envelope.status}</p>
      <RecipientList recipients={envelope.recipients} />
      <DocumentList documents={envelope.documents} />
    </div>
  );
}
\```

### Error Handling
\```typescript
try {
  const details = await getEnvelopeDetails({
    envelopeId: "123-456"
  });
} catch (error) {
  if (error.code === "ENVELOPE_NOT_FOUND") {
    // Handle not found
  } else if (error.code === "UNAUTHORIZED") {
    // Handle auth error
  } else {
    // Handle other errors
  }
}
\```

## Common Errors
| Error Code | Description | Solution |
|------------|-------------|----------|
| ENVELOPE_NOT_FOUND | Envelope doesn't exist | Verify envelopeId |
| UNAUTHORIZED | Invalid token | Refresh token |

## Related Tools
- [listEnvelopes](#) - List all envelopes
- [getRecipients](#) - Get recipient details
- [getDocuments](#) - Get document details
```

## 7. API Reference
Detailed API documentation:

```markdown
# API Reference

## Core Package
\```typescript
interface DocuSignToolkit {
  // All method signatures with JSDoc comments
}
\```

## React Package
\```typescript
interface Hooks {
  // All hook signatures with JSDoc comments
}
\```

## Type Definitions
\```typescript
// All type definitions
\```
```

## 8. Troubleshooting Guide
```markdown
# Troubleshooting

## Common Issues
1. Authentication errors
2. Rate limiting
3. Webhook setup

## Solutions
Detailed solutions for each issue...
``` 