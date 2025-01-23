/**
 * Shared types for React components
 */

export interface Template {
  id: string
  name: string
  description?: string
  documentCount?: number
  lastUsed?: string
}

export interface Recipient {
  name: string
  email: string
  routingOrder?: number
  recipientId?: string
  status?: string
}

export interface Document {
  id: string
  name: string
  type?: string
  content?: string | Buffer
} 