import { fn } from '@storybook/test'
import { Input } from '../Components/Input'

export default {
  title: 'Example/Input',
  component: Input,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Component = {}
