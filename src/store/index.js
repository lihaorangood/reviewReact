import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import  createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga";
const sagaMiddleware = createSagaMiddleware()
const store = applyMiddleware(sagaMiddleware)(createStore)(reducer)
sagaMiddleware.run(rootSaga)
console.log(store.getState(), 'store')
export default store
