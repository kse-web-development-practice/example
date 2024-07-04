import { fn } from '@storybook/test'
import { LoginForm } from '../Components/LoginForm'

export default {
  title: 'Example/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {
    onAuth: () => {}
  }
}
