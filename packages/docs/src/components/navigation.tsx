'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const navItems = [
  { name: 'Overview', href: '/' },
  { name: 'Getting Started', href: '/getting-started' },
  { 
    name: 'Agent Tools', 
    href: '/tools',
    subItems: [
      { name: 'Document Tools', href: '/tools/document-operations' },
      { name: 'Agreement Tools', href: '/tools/envelope-operations' },
      { name: 'Template Tools', href: '/tools/template-operations' },
      { name: 'Custom Agreement Tools', href: '/tools/custom-document-operations' },
    ]
  },
  { 
    name: 'AI Integration', 
    href: '/ai-integration',
    subItems: [
      { name: 'Vercel AI SDK Setup', href: '/ai-integration/setup' },
      { name: 'Tool Patterns', href: '/ai-integration/patterns' },
      { name: 'Function Calling', href: '/ai-integration/function-calling' },
    ]
  },
  { name: 'Usage Examples', href: '/usage-examples' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 z-50 flex w-72 flex-col border-r">
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">Agent Tools</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-4">
          {navItems.map(item => (
            <div key={item.href}>
              <Button
                asChild
                variant="ghost"
                className={`w-full justify-start ${pathname === item.href ? 'bg-muted' : ''}`}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
              {item.subItems && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subItems.map(subItem => (
                    <Button
                      key={subItem.href}
                      asChild
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${pathname === subItem.href ? 'bg-muted' : ''}`}
                    >
                      <Link href={subItem.href}>{subItem.name}</Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

