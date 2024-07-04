import { fn } from '@storybook/test'
import { AddItemForm } from '../Components/AddItemForm'

export default {
  title: 'Example/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  args: { onClick: fn() }
}

export const Component = {
  args: {
    errorMessage: '',
    onAdd: () => {}
  }
}
