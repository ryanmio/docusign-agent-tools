import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/ui/code-block"

const previewDocumentType = `{
  url: string  // Base64 encoded document content
  mimeType: string
}`

const previewDocumentExample = `const toolkit = new DocuSignToolkit(config)
const preview = await toolkit.previewDocument({
  envelopeId: "abc-123",
  documentId: "1"
})

// Display the document in an iframe or download it
const iframe = document.createElement('iframe')
iframe.src = preview.url
document.body.appendChild(iframe)`

const createSigningSessionType = `{
  url: string  // DocuSign signing session URL
}`

const createSigningSessionExample = `const toolkit = new DocuSignToolkit(config)
const session = await toolkit.createSigningSession({
  envelopeId: "abc-123",
  recipient: {
    email: "signer@example.com",
    name: "John Doe"
  },
  returnUrl: "https://your-app.com/done"
})

// Redirect to the signing session
window.location.href = session.url`

export default function DocumentOperationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Document Operations</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Preview, download, and manage documents within DocuSign envelopes.
      </p>

      <Separator className="my-8" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">previewDocument</h2>
        <p className="mb-4">
          Preview a document from a DocuSign envelope. Returns a base64 encoded URL that can be used
          to display the document in an iframe or download it.
        </p>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Parameters</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><code className="text-sm">envelopeId: string</code> - The ID of the envelope</li>
            <li><code className="text-sm">documentId: string</code> - The ID of the document to preview</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Returns</h3>
          <CodeBlock code={previewDocumentType} language="typescript" />
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium mb-2">Example Usage</h3>
          <CodeBlock code={previewDocumentExample} language="typescript" />
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">createSigningSession</h2>
        <p className="mb-4">
          Create a signing session URL for a recipient to sign a document. The recipient will be redirected
          to DocuSign to complete the signing process.
        </p>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Parameters</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><code className="text-sm">envelopeId: string</code> - The ID of the envelope</li>
            <li><code className="text-sm">recipient: &#123; email: string; name: string &#125;</code> - The recipient's details</li>
            <li><code className="text-sm">returnUrl: string</code> - URL to redirect to after signing</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Returns</h3>
          <CodeBlock code={createSigningSessionType} language="typescript" />
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium mb-2">Example Usage</h3>
          <CodeBlock code={createSigningSessionExample} language="typescript" />
        </div>
      </section>
    </div>
  )
} 