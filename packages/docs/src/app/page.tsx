import { allDocs } from 'contentlayer/generated'
import { MDXContent } from '@/components/mdx-content'
import type { Doc } from 'contentlayer/generated'

export default function Home() {
  const overview = allDocs.find((doc: Doc) => doc.category === 'Overview')
  if (!overview) return null

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <MDXContent code={overview.body.code} />
    </article>
  )
}

