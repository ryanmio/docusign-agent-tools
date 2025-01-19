import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/ui/code-block"

const returnTypeExample = `{
  sentDateTime: string | null
  completedDateTime: string | null
  documents: Array<{
    id: string
    name: string
    type: string
  }>
  recipients: Array<{
    name: string
    email: string
    status: string
    signedDateTime?: string
  }>
}`

const usageExample = `const toolkit = new DocuSignToolkit(config)
const details = await toolkit.getEnvelopeDetails("abc-123")

console.log(\`Envelope status: \${details.status}\`)
console.log(\`Number of documents: \${details.documents.length}\`)`

const listEnvelopesType = `Array<{
  envelopeId: string
  status: string
  sentDateTime: string
  completedDateTime: string | null
  subject: string
  recipients: Array<{
    name: string
    email: string
    status: string
  }>
}>`

const listEnvelopesExample = `const toolkit = new DocuSignToolkit(config)

// List all envelopes from the last 30 days
const fromDate = new Date()
fromDate.setDate(fromDate.getDate() - 30)

const envelopes = await toolkit.listEnvelopes({
  fromDate,
  status: "completed"
})

console.log(\`Found \${envelopes.length} completed envelopes\`)`

export default function EnvelopeOperationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Core Envelope Operations</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Tools for working with DocuSign envelopes - viewing details, listing envelopes, and tracking status.
      </p>

      <Separator className="my-8" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">getEnvelopeDetails</h2>
        <p className="mb-4">
          Retrieve detailed information about a DocuSign envelope, including its current status,
          documents, and recipients.
        </p>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Parameters</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><code className="text-sm">envelopeId: string</code> - The ID of the envelope to retrieve</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Returns</h3>
          <CodeBlock code={returnTypeExample} language="typescript" />
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium mb-2">Example Usage</h3>
          <CodeBlock code={usageExample} language="typescript" />
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">listEnvelopes</h2>
        <p className="mb-4">
          List DocuSign envelopes and their status changes. Supports filtering by date range and status.
        </p>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Parameters</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><code className="text-sm">fromDate?: Date</code> - Optional start date for filtering</li>
            <li><code className="text-sm">toDate?: Date</code> - Optional end date for filtering</li>
            <li><code className="text-sm">status?: string</code> - Optional status filter</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Returns</h3>
          <CodeBlock code={listEnvelopesType} language="typescript" />
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium mb-2">Example Usage</h3>
          <CodeBlock code={listEnvelopesExample} language="typescript" />
        </div>
      </section>
    </div>
  )
} 