import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let container

beforeEach(() => {
  const blog = {
    title: 'Crash',
    author: 'Naughty Dog',
    url: 'crash.naughtydog.com',
    likes: 366,
    user: {
      username: 'test'
    }
  }

  container = render(
    <Blog
      blog={blog}
      show={false}
      user={{ username: 'test' }}
      blogs={[]}
      setBlogs={() => null}
    />).container
})

test('component renders blog\'s information', () => {


  const div = container.querySelector('.blogItem')
  const details = container.querySelector('.blogDetails')

  //screen.debug(div)

  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('Crash')
  expect(div).toHaveTextContent('Naughty Dog')
  expect(details).toHaveStyle('display: none')
})

test('blog\'s url and likes displayed if show button clicked', async () => {
  const user = userEvent.setup()

  const showBtn = screen.getByRole('button', { name: 'show' })
  await user.click(showBtn)

  const div = container.querySelector('.blogDetails')

  expect(div).not.toHaveStyle('display: none')
})