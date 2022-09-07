import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  return await blogs.getAll()
})

export const addNewBlog = createAsyncThunk(
  'blogs/createNewBlog',
  async (newBlog) => {
    return await blogs.create(newBlog)
  }
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
  },
})

export default blogsReducer.reducer

export const getAllBlogs = (state) => state.blogs

export const selectBlogById = (state, blogId) =>
  state.blogs.find((blog) => blog.id === blogId)
