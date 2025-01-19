import { defineDocumentType, makeSource } from '@contentlayer/source-files'
import { ComputedFields } from 'contentlayer/source-files'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  url: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
}

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: true },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Doc],
  disableImportAliasWarning: true,
}) 