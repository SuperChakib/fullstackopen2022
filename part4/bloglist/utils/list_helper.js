const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, item) => sum + item.likes, 0)

const favoriteBlog = blogs => {
  const reducer = (best, next) => {
    const { title, author, likes } = next

    return (best.likes || 0) > next.likes
      ? best
      : { title, author, likes }
  }

  return blogs.reduce(reducer, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}