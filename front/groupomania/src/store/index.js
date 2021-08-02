import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
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
import { userReducer } from '../reducers/userViewer';
import { userEditReducer } from '../reducers/userEdit';
import { userDeleteReducer } from '../reducers/userDelete';
import { getLikesReducer } from '../reducers/likesViewer'
import { likeCreateReducer } from '../reducers/likeCreate';
import { likeDeleteReducer } from '../reducers/likeDelete';
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
    deleteComment: commentDeleteReducer,
    getUser: userReducer,
    editUser: userEditReducer,
    deleteUser: userDeleteReducer,
    createLike: likeCreateReducer,
    deleteLike: likeDeleteReducer,
    getLikes: getLikesReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store