import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async () => await blogService.getAll()
)

export const addNewBlog = createAsyncThunk(
  'blogs/createNewBlog',
  async (newBlog) => await blogService.create(newBlog)
)

export const incrementLikes = createAsyncThunk(
  'blogs/incrementLikes',
  async ({ blogId, likedBlog }) => await blogService.update(blogId, likedBlog)
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId) => await blogService.remove(blogId)
)

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        return action.payload.sort(byLikes)
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(incrementLikes.fulfilled, (state, action) => {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((blog) => blog.id !== action.payload)
      })
  },
})

export default blogsReducer.reducer

export const getAllBlogs = (state) => [...state.blogs].sort(byLikes)

/* export const selectBlogById = (state, blogId) =>
  state.blogs.find((blog) => blog.id === blogId) */
