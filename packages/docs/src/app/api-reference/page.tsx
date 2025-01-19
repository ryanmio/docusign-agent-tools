import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'API Reference | DocuSign Agent Tools',
  description: 'Detailed API reference for DocuSign Agent Tools',
}

export default function ApiReference() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">API Reference</h1>
      
      <h2 className="mb-4 text-2xl font-semibold">Categories</h2>
      
      <h3 className="mt-6 mb-2 text-xl font-semibold">Core Envelope Operations</h3>
      <p className="mb-4">Tools for managing DocuSign envelopes</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><Link href="/api-reference/get-envelope-details">getEnvelopeDetails</Link> - Get envelope information</li>
        <li><Link href="/api-reference/list-envelopes">listEnvelopes</Link> - List envelopes</li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-semibold">Document Operations</h3>
      <p className="mb-4">Tools for working with documents</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><Link href="/api-reference/preview-document">previewDocument</Link> - Preview documents</li>
        <li><Link href="/api-reference/create-signing-session">createSigningSession</Link> - Create signing sessions</li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-semibold">Template Operations</h3>
      <p className="mb-4">Tools for managing DocuSign templates</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><Link href="/api-reference/list-templates">listTemplates</Link> - List templates</li>
        <li><Link href="/api-reference/preview-template">previewTemplate</Link> - Preview templates</li>
        <li><Link href="/api-reference/create-envelope-from-template">createEnvelopeFromTemplate</Link> - Create envelopes from templates</li>
        <li><Link href="/api-reference/get-template-fields">getTemplateFields</Link> - Get template fields</li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-semibold">Recipient Operations</h3>
      <p className="mb-4">Tools for managing recipients</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><Link href="/api-reference/define-recipients">defineRecipients</Link> - Define recipients</li>
        <li><Link href="/api-reference/get-recipients">getRecipients</Link> - Get recipients</li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-semibold">Custom Document Operations</h3>
      <p className="mb-4">Tools for working with custom documents</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><Link href="/api-reference/preview-custom-contract">previewCustomContract</Link> - Preview custom contracts</li>
        <li><Link href="/api-reference/create-custom-envelope">createCustomEnvelope</Link> - Create custom envelopes</li>
      </ul>

      <h3 className="mt-6 mb-2 text-xl font-semibold">Bulk Operations</h3>
      <p className="mb-4">Tools for bulk sending operations</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><Link href="/api-reference/get-bulk-send-status">getBulkSendStatus</Link> - Get bulk send status</li>
        <li><Link href="/api-reference/create-bulk-send">createBulkSend</Link> - Create bulk send</li>
        <li><Link href="/api-reference/start-bulk-send">startBulkSend</Link> - Start bulk send</li>
      </ul>

    </main>
  )
}

