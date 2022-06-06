const _ = require('lodash')

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

const mostBlogs = blogs => {
  const numberedAuthors = _.countBy(blogs, 'author') // { author1: 35, author2: 43}
  const eachAuthor = _.keys(numberedAuthors) // [ author1, author2 ]

  const mostAuthor = eachAuthor.reduce((prev, next) => {
    return numberedAuthors.prev > numberedAuthors.next
      ? prev
      : next
  } , '')

  return !mostAuthor ? {} : { author: mostAuthor, blogs: numberedAuthors[mostAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}