import { ApiClient } from 'docusign-esign'
import type { DocuSignConfig, DocuSignClient } from '../types'

export function createDocuSignClient(config: DocuSignConfig): DocuSignClient {
  if (!config.accessToken) {
    throw new Error('Access token is required')
  }

  if (!config.accountId) {
    throw new Error('Account ID is required')
  }

  const apiClient = new ApiClient({
    basePath: config.basePath || 'https://demo.docusign.net/restapi',
    oAuthBasePath: 'account-d.docusign.com'
  })

  apiClient.addDefaultHeader('Authorization', `Bearer ${config.accessToken}`)

  return {
    apiClient,
    accountId: config.accountId
  }
} 