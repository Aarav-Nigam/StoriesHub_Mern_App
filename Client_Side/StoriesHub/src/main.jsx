import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store/store.js'
import { Provider } from 'react-redux'
import './index.css'
import { Post } from './components/posts/post/post'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
