import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk';
import monitorReducersEnhancer from './monitorReducers';
import loggerMiddleware from './logger'
import {composeWithDevTools} from 'redux-devtools-extension'


export default function configureStore(rootReducer, preloadedState) {
    let enhancers;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        const middlewares = [loggerMiddleware, thunkMiddleware];
        const middlewareEnhancer = applyMiddleware(...middlewares);
        enhancers = [middlewareEnhancer, monitorReducersEnhancer];
    } else {
        const middlewares = [thunkMiddleware];
        const middlewareEnhancer = applyMiddleware(...middlewares);
        enhancers = [middlewareEnhancer];
    }
    const composedEnhancers = composeWithDevTools(...enhancers);
    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    return store
}