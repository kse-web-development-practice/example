import { fn } from '@storybook/test'
import { ErrorMessage } from '../Components/ErrorMessage'

export default {
  title: 'Example/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Component = {}
