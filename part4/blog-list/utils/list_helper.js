const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  let likes = 0
  for (let i = 0; i < blogPosts.length; i++) {
    likes += blogPosts[i].likes
  }

  return likes
}

const favoriteBlog = (blogs) => {
  // pick the most liked blog post from an array
  let fave = 0
  let blog = {}

  blogs.forEach(post => {
    if (post.likes > fave) {
      fave = post.likes
      blog = post
    }
  })

  return blog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
