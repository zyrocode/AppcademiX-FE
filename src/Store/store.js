import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../Reducers/userReducer'
import loaderReducer from '../Reducers/loaderReducer'
import errorReducer from '../Reducers/errorReducer'
import loginReducer from '../Reducers/loginReducer'

const initialState = {
    user: [],
    loading: {load: false},
    errorMessage: '',
    accessToken: ''
}

const combinedReducers = combineReducers({
    user: userReducer,
    loading: loaderReducer,
    errorMessage: errorReducer,
    accessToken: loginReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () =>{
    return createStore(
        combinedReducers,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    )
}