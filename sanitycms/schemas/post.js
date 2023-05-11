import { defineField, defineType } from 'sanity'

const textEditorStyles = [
  { title: 'Paragpraph', value: 'normal' },
  { title: 'Heading 1', value: 'h1' },
  { title: 'Heading 2', value: 'h2' },
  { title: 'Heading 3', value: 'h3' },
  { title: 'Bullet', value: 'bullet' },
  { title: 'Numbered', value: 'number' },
  { title: 'Quote', value: 'blockquote' },
]

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  groups: [
    {
      name: 'content',
      title: 'Content',
    },

    {
      name: 'meta',
      title: 'Meta',
    },
  ],

  fields: [
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'meta',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: Rule => Rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.required(),
      group: 'content',

      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true
          },
          validation: Rule => Rule.required(),
        },
      ]
    }),

    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      group: 'content',

      options: {
        source: 'title',
        maxLength: 200,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    }),

    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      group: 'content',
      validation: Rule => Rule.required(),
    }),

    defineField({
      title: 'Body content',
      name: 'body',
      type: 'array',
      group: 'content',

      of: [
        {
          type: 'block',
          styles: textEditorStyles,
        },
        {
          type: 'image',
        },
      ],
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },

    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
