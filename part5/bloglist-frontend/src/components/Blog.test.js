import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('component renders blog\'s information', () => {
  const blog = {
    title: 'Crash',
    author: 'Naughty Dog',
    url: 'crash.naughtydog.com',
    likes: 366,
    user: {
      username: 'test'
    }
  }

  const { container } = render(<Blog blog={blog}
    show={false}
    user={{ username: 'test' }}
    blogs={[]}
    setBlogs={() => null}
  />)

  const div = container.querySelector('.blogItem')
  const details = container.querySelector('.blogDetails')

  //screen.debug(div)

  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(details).toHaveStyle('display: none')
})