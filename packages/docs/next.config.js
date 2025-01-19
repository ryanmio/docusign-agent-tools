const createMDX = require('@next/mdx')
const { withContentlayer } = require('next-contentlayer')

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

module.exports = withContentlayer(withMDX(nextConfig))
