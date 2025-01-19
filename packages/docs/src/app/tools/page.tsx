export default function ToolsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">DocuSign Agent Tools</h1>
      <p className="text-lg mb-8">
        A collection of tools to help you interact with DocuSign envelopes, documents, templates, and more.
      </p>

      <div className="grid gap-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Core Envelope Operations</h2>
          <p className="text-muted-foreground mb-4">
            Tools for working with DocuSign envelopes - viewing details, listing envelopes, and tracking status.
          </p>
          <a href="/tools/envelope-operations" className="text-primary hover:underline">
            Learn more →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Document Operations</h2>
          <p className="text-muted-foreground mb-4">
            Preview, download, and manage documents within DocuSign envelopes.
          </p>
          <a href="/tools/document-operations" className="text-primary hover:underline">
            Learn more →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Template Operations</h2>
          <p className="text-muted-foreground mb-4">
            Work with DocuSign templates - list available templates, get details, and create envelopes from templates.
          </p>
          <a href="/tools/template-operations" className="text-primary hover:underline">
            Learn more →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recipient Operations</h2>
          <p className="text-muted-foreground mb-4">
            Manage envelope recipients, create signing sessions, and send reminders.
          </p>
          <a href="/tools/recipient-operations" className="text-primary hover:underline">
            Learn more →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Custom Document Operations</h2>
          <p className="text-muted-foreground mb-4">
            Create and send custom documents as DocuSign envelopes.
          </p>
          <a href="/tools/custom-document-operations" className="text-primary hover:underline">
            Learn more →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Bulk Operations</h2>
          <p className="text-muted-foreground mb-4">
            Send documents to multiple recipients in bulk and track bulk send status.
          </p>
          <a href="/tools/bulk-operations" className="text-primary hover:underline">
            Learn more →
          </a>
        </section>
      </div>
    </div>
  )
} 