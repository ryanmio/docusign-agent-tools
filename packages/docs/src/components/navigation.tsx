'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const navItems = [
  { name: 'Overview', href: '/' },
  { 
    name: 'Getting Started', 
    href: '/getting-started',
    subItems: [
      { name: 'Installation', href: '/getting-started#installation' },
      { name: 'Quick Start', href: '/getting-started#quick-start' },
      { name: 'Authentication', href: '/getting-started#authentication' },
    ]
  },
  { 
    name: 'Tools', 
    href: '/tools',
    subItems: [
      { name: 'Core Envelope Operations', href: '/tools/envelope-operations' },
      { name: 'Document Operations', href: '/tools/document-operations' },
      { name: 'Template Operations', href: '/tools/template-operations' },
      { name: 'Recipient Operations', href: '/tools/recipient-operations' },
      { name: 'Custom Document Operations', href: '/tools/custom-document-operations' },
      { name: 'Bulk Operations', href: '/tools/bulk-operations' },
    ]
  },
  { 
    name: 'Usage Examples', 
    href: '/usage-examples',
    subItems: [
      { name: 'Basic Usage', href: '/usage-examples#basic' },
      { name: 'Working with Templates', href: '/usage-examples#templates' },
      { name: 'Custom Documents', href: '/usage-examples#custom-documents' },
      { name: 'Bulk Operations', href: '/usage-examples#bulk' },
    ]
  },
  { 
    name: 'API Reference', 
    href: '/api-reference',
    subItems: [
      { name: 'DocuSignToolkit', href: '/api-reference/docusign-toolkit' },
      { name: 'Types', href: '/api-reference/types' },
      { name: 'Error Handling', href: '/api-reference/error-handling' },
    ]
  },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 z-50 flex w-72 flex-col border-r bg-background">
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">DocuSign Tools</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-4">
          {navItems.map(item => (
            <div key={item.href} className="py-1">
              <Button
                asChild
                variant="ghost"
                className={`w-full justify-start font-medium ${pathname === item.href ? 'bg-muted' : ''}`}
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
                      className={`w-full justify-start text-sm text-muted-foreground hover:text-primary ${pathname === subItem.href ? 'bg-muted' : ''}`}
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

