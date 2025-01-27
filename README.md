# docusign-agent-tools

They say 2025 is the year AI agents come online. They'll reshape how humans interact with software, data, and each other. But agents can't help humans conduct business without secure access to core commercial infrastructure.

This toolkit is meant to help developers build agents that have secure, constrained access to Docusign. These tools allow agents to prepare documents, analyze terms, manage deadlines, and handle the mundane parts of agreements. But they can't sign. They just make it dramatically easier for humans to sign.

I built this for a hackathon to demonstrate and expirement with genertive agreement interfaces to free humans from the agreement trap by handling the complexity of modern contracts while we focus on the decisions that matter.

See it working in [Agreement Copilot](https://github.com/ryanmio/docusign-agreement-copilot). Built that first, extracted this toolkit from what worked.


## Status

This is a WIP – built during a hackathon.

## Installation

```bash
npm install docusign-agent-tools
```
*Note: The npm package for docusign-agent-tools is coming soon. Stay tuned for updates!*

## Usage

```typescript
// Core functionality
import { createDocuSignTools } from 'docusign-agent-tools'

// Document operations
import { 
  getEnvelopeDetails,    // Get envelope and document details
  previewDocument,       // Preview document content
  createEnvelope,        // Create new envelope from documents
  createSigningSession,  // Generate signing session
  sendReminder,          // Send signing reminders
  getDocument,          // Download document
  listDocuments         // List envelope documents
} from 'docusign-agent-tools/documents'

// Template operations
import { 
  listTemplates,         // Browse and select templates
  previewTemplate,       // View template details
  createEnvelopeFromTemplate, // Send template-based envelope
  getTemplateFields     // Get template form fields
} from 'docusign-agent-tools/templates'

// Recipient operations
import { defineRecipients } from 'docusign-agent-tools/recipients'

// Custom document operations
import { 
  previewCustomContract,  // Preview custom contracts
  createCustomEnvelope   // Send custom document
} from 'docusign-agent-tools/contracts'

// Bulk operations
import {
  getBulkSendStatus,     // Show bulk send status
  createBulkSend,        // Initialize bulk send
  startBulkSend         // Begin bulk operation
} from 'docusign-agent-tools/bulk'

// List operations
import { listEnvelopes } from 'docusign-agent-tools/envelopes'

// React components
import { 
  PDFViewer,          // Document preview
  TemplateSelector,    // Template browsing
  RecipientForm       // Recipient collection
} from 'docusign-agent-tools/react'

// Initialize with your credentials
const tools = createDocuSignTools({
  accessToken: 'your-access-token',
  accountId: 'your-account-id',
  baseUrl: 'https://demo.docusign.net/restapi' // optional
})
```
## Diagrams


How Tool Calls Work
```sql
User/UI         Chat Agent          Tools                Docusign/Database
   |                 |                 |                           |
   |--Request-------->|                 |                           |
   |  "Show me        |                 |                           |
   |  Envelope #123"  |                 |                           |
   |                 |--Call Tool------>|                           |
   |                 | "displayDocumentDetails(envelopeId=123)"    |
   |                 |                 |--Fetch Data--------------->|
   |                 |                 |                           |
   |                 |                 |<--Return Data-------------|
   |                 |<--Result---------|                           |
   |                 | "Envelope #123 Details"                     |
   |<--Render--------|                 |                           |
   | "Display React Component with Data"                           |
   |                 |                 |                           |
```


React Rendering:
```sql
+-----------------------+
|      Chat Window      |
|-----------------------|
|  +------------------+ | 
|  | Message Stream   | |  
|  |------------------| | 
|  | User: Show me    | | 
|  |  Envelope #123   | | 
|  | AI: Here are the | | 
|  |  details:        | | 
|  |                  | | 
|  | [DocumentDetails]| | <- React Component dynamically rendered
|  +------------------+ | 
+-----------------------+

Flow:
1. User Message -> Chat Agent generates a response:
   - Specification: { toolName: "displayDocumentDetails", envelopeId: 123 }

2. Chat Agent Response ->
   - Embedded Tool Invocation: "displayDocumentDetails"

3. React Integration:
   - UI detects `toolName` in the AI message.
   - Dynamically mounts `DocumentDetailsView` React component.

4. React Component:
   - Uses `props` such as `envelopeId` to fetch/render data.
   - Interactivity: User clicks within the component, triggering new tool calls (e.g., resend document).

```

## License

MIT
