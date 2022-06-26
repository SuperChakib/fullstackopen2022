import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Crash',
  author: 'Naughty Dog',
  url: 'crash.naughtydog.com',
  likes: 366,
  user: {
    username: 'test'
  }
}

test('component renders blog\'s information', () => {
  const container = render(
    <Blog
      blog={blog}
      show={false}
      user={{ username: 'test' }}
      incrementLikes={() => null}
      removeBlog={() => null}
    />).container

  const div = container.querySelector('.blogItem')
  const details = container.querySelector('.blogDetails')

  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(details).toHaveStyle('display: none')
})

test('blog\'s url and likes displayed if show button clicked', async () => {
  const container = render(
    <Blog
      blog={blog}
      show={false}
      user={{ username: 'test' }}
      incrementLikes={() => null}
      removeBlog={() => null}
    />).container

  const user = userEvent.setup()

  const showBtn = screen.getByRole('button', { name: 'show' })
  await user.click(showBtn)

  const div = container.querySelector('.blogDetails')

  expect(div).not.toHaveStyle('display: none')
})


test('if likes button clicked twice, event handler called twice', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      show={false}
      user={{ username: 'test' }}
      incrementLikes={mockHandler}
      removeBlog={() => null}
    />)

  const user = userEvent.setup()

  const showBtn = screen.getByRole('button', { name: 'show' })
  await user.click(showBtn)

  const likesBtn = screen.getByRole('button', { name: 'likes' })
  await user.click(likesBtn)
  await user.click(likesBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})