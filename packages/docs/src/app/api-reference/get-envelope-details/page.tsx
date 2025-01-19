import { Metadata } from 'next'
import { Highlight, themes } from "prism-react-renderer"

export const metadata: Metadata = {
  title: 'getEnvelopeDetails | DocuSign Agent Tools',
  description: 'API reference for getEnvelopeDetails function',
}

export default function GetEnvelopeDetails() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">getEnvelopeDetails</h1>
      
      <p className="mb-6 text-xl">
        Get detailed information about a DocuSign envelope including status, recipients, and documents.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">Use Cases</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Display envelope status in your dashboard</li>
        <li>Track document signing progress</li>
        <li>Get recipient information</li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Parameters</h2>
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Required</th>
            <th className="p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">envelopeId</td>
            <td className="p-2">string</td>
            <td className="p-2">Yes</td>
            <td className="p-2">The ID of the envelope to get details for</td>
          </tr>
          <tr>
            <td className="p-2">showActions</td>
            <td className="p-2">boolean</td>
            <td className="p-2">No</td>
            <td className="p-2">Whether to show action buttons</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mb-4 text-2xl font-semibold">Returns</h2>
      <Highlight
        theme={themes.vsLight}
        code={`interface EnvelopeDetails {
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
}`}
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

      <h2 className="mt-8 mb-4 text-2xl font-semibold">Example Usage</h2>
      <h3 className="mb-2 text-xl font-semibold">Basic Usage</h3>
      <Highlight
        theme={themes.vsLight}
        code={`const details = await getEnvelopeDetails({
  envelopeId: "123-456",
  showActions: true
});

console.log(details.envelope.status);`}
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

      {/* Add more sections as needed */}
    </main>
  )
}

