import { Metadata } from 'next'
import { Highlight, themes } from "prism-react-renderer"

export const metadata: Metadata = {
  title: 'Getting Started | DocuSign Agent Tools',
  description: 'Installation and setup guide for DocuSign Agent Tools',
}

export default function GettingStarted() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">Getting Started</h1>
      
      <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
      <p className="mb-4">Install the packages:</p>
      <Highlight
        theme={themes.vsLight}
        code={`npm install @docusign-agent-tools/core @docusign-agent-tools/react`}
        language="bash"
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

      <h2 className="mt-8 mb-4 text-2xl font-semibold">Authentication</h2>
      <ol className="list-decimal list-inside mb-4 space-y-2">
        <li>Get your DocuSign credentials:
          <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
            <li>Account ID</li>
            <li>Access Token</li>
            <li>Base Path (demo or production)</li>
          </ul>
        </li>
        <li>Initialize the toolkit:</li>
      </ol>
      <Highlight
        theme={themes.vsLight}
        code={`const toolkit = new DocuSignToolkit({
  accountId: process.env.DOCUSIGN_ACCOUNT_ID,
  accessToken: process.env.DOCUSIGN_ACCESS_TOKEN,
  basePath: process.env.DOCUSIGN_BASE_PATH
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
    </main>
  )
}

