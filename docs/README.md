# DocuSign Agent Tools Documentation Site

## Structure
```
packages/
  ├── core/          # Core package
  ├── react/         # React components
  └── docs/          # Documentation site
      ├── app/       # Next.js app directory
      ├── content/   # Markdown documentation
      ├── components/# Documentation components
      └── public/    # Static assets
```

## Features
- 📝 MDX for rich documentation
- 🎨 Syntax highlighting
- 🔍 Full-text search
- 📱 Mobile responsive
- 🎯 Interactive examples
- 🚀 Fast builds with Next.js

## Local Development
```bash
# Install dependencies
pnpm install

# Start documentation site
pnpm docs:dev

# Build documentation
pnpm docs:build
```

## Writing Documentation
Place markdown files in the `content` directory:
```
content/
  ├── index.mdx     # Landing page
  ├── getting-started/
  │   ├── installation.mdx
  │   └── authentication.mdx
  ├── tools/
  │   ├── envelope-operations.mdx
  │   ├── document-operations.mdx
  │   └── template-operations.mdx
  └── api-reference/
      ├── core.mdx
      └── react.mdx
```

## Components
Use our custom components for consistent documentation:
- `<CodeBlock />` - Syntax highlighted code
- `<TypeTable />` - Parameter/props tables
- `<ApiReference />` - API documentation
- `<Example />` - Interactive examples 