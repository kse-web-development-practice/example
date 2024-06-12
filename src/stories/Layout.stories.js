import React from 'react'
import { fn } from '@storybook/test'
import { Layout } from '../Components/Layout/layout'

const LayoutExample = () => {
  return (
    <Layout>
      <p>
        test content
        <br />
        test content
        <br />
        test content
        <br />
        test content
        <br />
        test content
        <br />
        test content
      </p>
    </Layout>
  )
}

export default {
  title: 'Example/Layout',
  component: LayoutExample,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() }
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {}
