# docusign-agent-tools

2025 is the year AI agents come online. They'll reshape how humans interact with software, data, and each other. But agents can't help humans conduct business without secure access to core commercial infrastructure.

Stripe saw this coming. Their agent toolkit was first because agents need to move money. DocuSign needs to be second because agents need to help humans make agreements.

This toolkit is the bridge. It gives agents secure, constrained access to DocuSign - they can prepare documents, analyze terms, manage deadlines, and handle the mundane parts of agreements. But they can't sign. They'll never sign. They just make it dramatically easier for humans to sign.

We built this during a hackathon because we couldn't shake the conviction that this is how business will work in the near future: Humans making decisions, agents handling everything else. Every commercial process will be supercharged by agents, especially contracts and agreements. They'll free humans from the agreement trap, handling the complexity of modern contracts while we focus on the decisions that matter.

See it working in [Agreement Copilot](https://github.com/ryanmio/docusign-agreement-copilot). Built that first, extracted this toolkit from what worked.

## Installation

```bash
npm install docusign-agent-tools
```

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

## Status

This is beta software built during a hackathon. It works, but probably has bugs.

## License

MIT
