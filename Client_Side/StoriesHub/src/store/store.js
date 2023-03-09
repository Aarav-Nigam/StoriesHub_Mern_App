import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './PostsSlice.js'
export default configureStore({
  reducer: {
  AllPosts:postsReducer, //this name(i.e. Allposts) will be used the get any value of state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})