import { fn } from '@storybook/test'
import { SuccessMessage } from '../Components/SuccessMessage'

export default {
  title: 'Example/SuccessMessage',
  component: SuccessMessage,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Component = {}
