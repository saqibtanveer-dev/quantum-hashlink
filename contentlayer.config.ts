import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'

const Seo = defineNestedType(() => ({
        name: 'Seo',
        fields: {
            title: { type: 'string', required: true },
            description: { type: 'string', required: true },
            image: { type: 'string', required: false },
            keywords: { type: 'list', of: { type: 'string' }, required: false },
        },
    }
));

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    slug: { type: 'string', required: true, description: 'Unique identifier for the blog post' },
    title: { type: 'string', required: true },
    excerpt: { type: 'string', required: true, description: 'A brief summary of the blog post, This will be displayed on blog card' },
    publishedAt: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true},
    seo: {
        type: 'nested',
        of: Seo
    },
    category: { type: 'string', required: true },    
    coverImage: { type: 'string', required: false },
    
  },
  computedFields: {
    url: { type: 'string', resolve: (blog) => `/src/blogs/${blog._raw.flattenedPath}` },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    id: { type: 'string', required: true, description: 'Unique identifier for the project' },
    title: { type: 'string', required: true },
    description: { type: 'string', required: true, description: 'A brief summary of the project, This will be displayed on project card' },
    coverImage: { type: 'string', required: true, description: 'URL of the cover image for the project on project detials page' },
    cardImage: { type: 'string', required: false, description: 'URL of the card image for the project on project card' },
    technologies: { type: 'list', of: { type: 'string' }, required: true, description: 'List of technologies used in the project' },
    type: { type: 'string', required: true, description: 'Type of the project, e.g., "web", "mobile", "desktop"' },
    liveUrl: { type: 'string', required: false, description: 'URL to the live project' },
    seo: {
      type: 'nested',
      of: Seo
    }
  },
  computedFields: {
    url: { type: 'string', resolve: (blog) => `/src/projects/${blog._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: 'src/projects', documentTypes: [Blog, Project] })