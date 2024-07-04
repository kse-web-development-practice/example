import { fn } from '@storybook/test'
import { Textarea } from '../Components/Textarea'

export default {
  title: 'Example/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Component = {}
