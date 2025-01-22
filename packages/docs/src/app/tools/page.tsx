import { allDocs } from 'contentlayer/generated'
import { MDXContent } from '@/components/mdx-content'

export const metadata = {
  title: 'Agent Tools | DocuSign Agent Tools',
  description: 'AI-powered tools for building DocuSign integrations',
}

export default function ToolsPage() {
  const content = allDocs.find((doc) => doc.url === '/tools')
  if (!content) return null

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert px-4 py-8">
      <MDXContent code={content.body.code} />
    </article>
  )
} 