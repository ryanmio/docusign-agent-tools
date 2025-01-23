/**
 * Recipient form component for collecting recipient information
 */
import React, { useState } from 'react'
import type { Recipient } from '../types'

interface RecipientFormProps {
  onSubmit: (recipients: Recipient[]) => void
  initialRecipients?: Recipient[]
  className?: string
}

export function RecipientForm({
  onSubmit,
  initialRecipients = [],
  className = ''
}: RecipientFormProps) {
  const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const addRecipient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    setRecipients([...recipients, { 
      name, 
      email,
      routingOrder: recipients.length + 1 
    }])
    setName('')
    setEmail('')
  }

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(recipients)
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Add recipient form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="ds-input"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="ds-input"
          />
        </div>
        <button
          type="button"
          onClick={addRecipient}
          disabled={!name || !email}
          className="ds-button-secondary w-full"
        >
          Add Recipient
        </button>
      </div>

      {/* Recipients list */}
      {recipients.length > 0 && (
        <div className="space-y-2">
          {recipients.map((recipient, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
            >
              <div>
                <div className="font-medium text-[#130032]">{recipient.name}</div>
                <div className="text-sm text-[#130032]/60">{recipient.email}</div>
              </div>
              <button
                type="button"
                onClick={() => removeRecipient(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={recipients.length === 0}
        className="ds-button w-full"
      >
        Continue
      </button>
    </form>
  )
}

// Add display name for better debugging
RecipientForm.displayName = 'RecipientForm' 