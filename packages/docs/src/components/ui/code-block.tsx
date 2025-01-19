'use client'

import { useEffect, useState } from 'react'
import { getHighlighter } from 'shiki'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = 'typescript', className = '' }: CodeBlockProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    async function highlight() {
      const highlighter = await getHighlighter({
        theme: 'github-dark',
        langs: ['typescript', 'javascript', 'json', 'bash'],
      })
      const highlighted = highlighter.codeToHtml(code, { lang: language })
      setHtml(highlighted)
    }
    highlight()
  }, [code, language])

  return (
    <div 
      className={`rounded-lg overflow-hidden ${className}`}
      dangerouslySetInnerHTML={{ __html: html || `<pre class="p-4">${code}</pre>` }} 
    />
  )
} 