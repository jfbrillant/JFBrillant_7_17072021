import { createStore, applyMiddleware, combineReducers } from 'redux'
import { signupReducer } from '../reducers/signup';
import { loginReducer } from '../reducers/login'
import { postReducer } from '../reducers/postsViewer'
import { postSubmitReducer } from '../reducers/postSubmit'
import { onePostReducer } from '../reducers/onePost';
import { commentReducer } from '../reducers/commentViewer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    signUp: signupReducer,
    login: loginReducer,
    getPosts: postReducer,
    submitPost: postSubmitReducer,
    getOnePost: onePostReducer,
    getComments: commentReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store