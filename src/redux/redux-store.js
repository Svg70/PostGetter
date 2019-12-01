import { combineReducers, createStore, applyMiddleware } from "redux";

import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import PostReducer from "./post-reducer";

let reducers = combineReducers({
    postPage: PostReducer,
    form: formReducer
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store;

export default store