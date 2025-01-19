import { defineDocumentType, makeSource } from 'contentlayer/source-files'

interface DocRawData {
  _raw: {
    flattenedPath: string
  }
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
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc: DocRawData) => doc._raw.flattenedPath,
    },
  },
}))

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Doc],
}) 