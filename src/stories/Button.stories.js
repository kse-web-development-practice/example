import { fn } from '@storybook/test'
import { Button } from '../Components/Button'

export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {}
