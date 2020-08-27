import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import { composeWithDevtools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  )
)

/* const store = createStore(
    reducer,
    /* composeWithDevtools(applyMiddleware(thunk)
    ) */
/* window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE_ && window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(thunk)) */

export default store