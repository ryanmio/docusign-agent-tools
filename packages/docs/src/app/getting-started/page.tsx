import { allDocs } from 'contentlayer/generated'
import { MDXContent } from '@/components/mdx-content'
import type { Doc } from 'contentlayer/generated'

export const metadata = {
  title: 'Getting Started | DocuSign Agent Tools',
  description: 'Installation and setup guide for DocuSign Agent Tools',
}

export default function GettingStarted() {
  const content = allDocs.find((doc: Doc) => doc.url === '/getting-started')
  if (!content) return null

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert px-4 py-8">
      <MDXContent code={content.body.code} />
    </article>
  )
}

