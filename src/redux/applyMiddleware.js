// 合并中间件的方法
import composed from "./composed";

function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer) // 创建仓库
            let dispatch = () => {
                throw new Error('function dispatch can not bi used now')
            }
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (...args) => dispatch(...args)
            }
            const chain = middlewares.map(middleware => middleware(middlewareAPI)) // 剥离第一层 执行传入store这
            dispatch = composed(...chain)(store.dispatch) //将dispatch重写，执行重写dispatch这一步
            return {
                ...store,
                dispatch // 覆盖原来的dispatch
            }
        }
    }

}
export default applyMiddleware
/**
 * middle的写法
 * export default function logger1(createStore){
    return function(dispatch){
        return function(action){
            console.log('老状态1',getState());
            dispatch(action);
            console.log('新状态1',getState());
        }
    }
}
 简介写法
 createStore => dispatch => action => {
 dadada 派发前执行某些操作
 dispatch(action)
 dadada 派发后执行某些操作
 }
 */