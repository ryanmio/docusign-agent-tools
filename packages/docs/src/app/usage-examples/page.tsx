import { Metadata } from 'next'
import { Highlight, themes } from "prism-react-renderer"

export const metadata: Metadata = {
  title: 'Usage Examples | DocuSign Agent Tools',
  description: 'Examples of how to use DocuSign Agent Tools in common scenarios',
}

export default function UsageExamples() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Usage Examples</h1>
      <p className="text-xl mb-4">
        Here are some common usage scenarios for DocuSign Agent Tools. These examples demonstrate how to use various operations in practical situations.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Sending a Template to Multiple Recipients</h2>
      <Highlight
        theme={themes.vsLight}
        code={`// 1. List available templates
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
});`}
        language="typescript"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 rounded-md bg-muted overflow-auto" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Creating and Sending a Custom Document</h2>
      <Highlight
        theme={themes.vsLight}
        code={`// 1. Preview custom contract
const preview = await previewCustomContract({
  markdown: "# Contract\\n\\nThis agreement...\\n\\nSigned: <<SIGNER1_HERE>>",
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
});`}
        language="typescript"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 rounded-md bg-muted overflow-auto" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Sending Documents in Bulk</h2>
      <Highlight
        theme={themes.vsLight}
        code={`// 1. Create bulk send list
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
});`}
        language="typescript"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 rounded-md bg-muted overflow-auto" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <p className="mt-4">
        These examples showcase some of the key features of DocuSign Agent Tools. For more detailed information about specific operations, 
        please refer to the API Reference section.
      </p>
    </main>
  )
}

