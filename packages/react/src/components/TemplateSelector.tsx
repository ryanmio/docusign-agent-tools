/**
 * Template selector component for browsing and selecting templates
 */
import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import type { Template } from '../types'

interface TemplateSelectorProps {
  value?: string
  onChange: (templateId: string) => void | Promise<void>
  className?: string
}

export function TemplateSelector({ 
  value,
  onChange,
  className = ''
}: TemplateSelectorProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [search, setSearch] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    loadTemplates()
  }, [search])

  const loadTemplates = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      
      const response = await fetch(`/api/templates?${params}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load templates')
      }

      setTemplates(data.templates || [])
    } catch (err) {
      console.error('Error loading templates:', err)
      setError(err instanceof Error ? err.message : 'Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  const handleTemplateClick = async (templateId: string) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    try {
      await onChange(templateId)
    } catch (error) {
      console.error('Failed to select template:', error)
    } finally {
      setIsTransitioning(false)
    }
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className={`w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg ${className}`}>
      <div className="p-6 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#130032]/40" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 py-2 rounded-lg border border-[#130032]/20 focus:border-[#4C00FF] focus:ring-1 focus:ring-[#4C00FF] outline-none"
          />
        </div>

        {/* Templates list */}
        {loading ? (
          <div className="p-4 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#4C00FF] border-t-transparent" />
          </div>
        ) : templates.length === 0 ? (
          <div className="p-4 text-center text-[#130032]/60">
            No templates found
          </div>
        ) : (
          <div className="grid gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template.id)}
                disabled={isTransitioning}
                className={`w-full p-4 text-left rounded-lg transition-all ${
                  value === template.id 
                    ? 'bg-[#4C00FF] border-none shadow-[0_2px_4px_rgba(76,0,255,0.2)]' 
                    : 'border border-[#130032]/10 hover:border-[#4C00FF] hover:shadow-[0_2px_4px_rgba(19,0,50,0.1)]'
                }`}
              >
                <div className={`font-medium ${
                  value === template.id ? 'text-white' : 'text-[#130032]'
                }`}>
                  {template.name}
                </div>
                {template.description && (
                  <div className={`text-sm mt-1 ${
                    value === template.id 
                      ? 'text-white/90' 
                      : 'text-[#130032]/60'
                  }`}>
                    {template.description}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Add display name for better debugging
TemplateSelector.displayName = 'TemplateSelector' 