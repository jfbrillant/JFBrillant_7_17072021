import { createStore, applyMiddleware, combineReducers } from 'redux'
import { signupReducer } from '../reducers/signup';
import { loginReducer } from '../reducers/login'
import { postReducer } from '../reducers/postsViewer'
import { postSubmitReducer } from '../reducers/postSubmit'
import { onePostReducer } from '../reducers/onePost';
import { commentReducer } from '../reducers/commentViewer';
import { postEditReducer } from '../reducers/postEdit';
import { postDeleteReducer } from '../reducers/postDelete';
import { commentSubmitReducer } from '../reducers/commentSubmit';
import { commentEditReducer } from '../reducers/commentEdit';
import { commentDeleteReducer } from '../reducers/commentDelete';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    signUp: signupReducer,
    login: loginReducer,
    getPosts: postReducer,
    submitPost: postSubmitReducer,
    getOnePost: onePostReducer,
    getComments: commentReducer,
    editPost: postEditReducer,
    deletePost: postDeleteReducer,
    submitComment: commentSubmitReducer,
    editComment: commentEditReducer,
    deleteComment: commentDeleteReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store