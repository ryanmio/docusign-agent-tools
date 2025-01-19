import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'DocuSign Agent Tools Documentation',
  description: 'Build AI-powered document workflows with DocuSign. Simple, powerful, and type-safe.',
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold">DocuSign Agent Tools</h1>
      <p className="mb-6 text-xl">
        Build AI-powered document workflows with DocuSign. Simple, powerful, and type-safe.
      </p>
      
      <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
      <ul className="mb-8 list-inside list-disc space-y-2">
        <li>🚀 Ready-to-use React components</li>
        <li>🔒 Type-safe API with full TypeScript support</li>
        <li>🤖 AI-ready with Vercel AI SDK integration</li>
        <li>📝 Custom document creation with markdown</li>
        <li>📦 Bulk operations support</li>
      </ul>

      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/getting-started">Get Started →</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://github.com/..." target="_blank" rel="noopener noreferrer">View on GitHub →</a>
        </Button>
      </div>
    </main>
  )
}

