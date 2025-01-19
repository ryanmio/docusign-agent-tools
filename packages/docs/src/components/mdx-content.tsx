'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import { Highlight, themes } from 'prism-react-renderer'

const components = {
  h1: (props: any) => (
    <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: any) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: (props: any) => (
    <ul className="my-6 ml-6 list-disc" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-6 ml-6 list-decimal" {...props} />
  ),
  li: (props: any) => (
    <li className="mt-2" {...props} />
  ),
  code: ({ children, className }: { children: string; className?: string }) => {
    const language = className?.replace('language-', '')
    return language ? (
      <Highlight theme={themes.github} code={children.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} my-6 overflow-x-auto rounded-lg p-4`} style={style}>
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
    ) : (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {children}
      </code>
    )
  },
  a: (props: any) => (
    <a className="font-medium underline underline-offset-4" {...props} />
  ),
}

interface MDXContentProps {
  code: string
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
} 