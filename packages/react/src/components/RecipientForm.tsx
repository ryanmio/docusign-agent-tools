/**
 * Recipient form component for collecting recipient information
 */
import React from 'react'

interface Recipient {
  email: string
  name: string
  role: string
}

interface RecipientFormProps {
  roles: string[]
  mode: 'template' | 'custom'
  onSubmit: (recipients: Recipient[]) => void
}

export const RecipientForm: React.FC<RecipientFormProps> = ({ roles, mode, onSubmit }) => {
  // TODO: Implement recipient form component
  return (
    <div>
      {/* Recipient form implementation */}
    </div>
  )
} 