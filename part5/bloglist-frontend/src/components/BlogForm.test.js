import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('when blog created, calls event handler with right details', async () => {
  const mockHandler = jest.fn()

  render(<BlogForm createBlog={mockHandler} />)

  const user = userEvent.setup()

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const createBtn  = screen.getByRole('button', { name: 'create' })

  await user.type(titleInput, 'Crash')
  await user.type(authorInput, 'Naughty Dog')
  await user.type(urlInput, 'bandicoot.com')
  await user.click(createBtn)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual({ title: 'Crash', author: 'Naughty Dog', url: 'bandicoot.com' })
})