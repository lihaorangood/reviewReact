import ActionTypes from "./utils/actionTypes";
import isPainObject from "./utils/isPainObject";

// create主要有三个参数， getState(获取state), dispatch(触发), subscribe(订阅)
function createStore(reducer, preloadedState) {
    if (typeof reducer !== 'function') {
        throw new Error('reducer must be a function')
    }
    let currentReducer = reducer
    let currentState = preloadedState
    const currentListeners = [] // 订阅者数组，一旦状态发生变化，将要通知的对象
    function getState() {
        return currentState
    }

    function dispatch(action) {
        if (!isPainObject(action)) {
            throw new Error('action must be a plain object')
        }
        if (typeof action.type === 'undefined') {
            throw new Error('the type of action can not be undefined')
        }
        currentState = currentReducer(currentState, action)
        //    状态发生变化，通知监听者
        for (let i = 0; i < currentListeners.length; i++) {
            const listener = currentListeners[i]
            listener()
        }
        return action
    }

    function subscribe(listener) {
        let subscribed = true
        currentListeners.push(listener)
        return function unsubscribe() {
            if (!subscribed) return
            const index = currentListeners.indexOf(listener)
            currentListeners.splice(index, 1)
            subscribed = false
        }
    }

//    开始手动触发一次，初始化state
    dispatch({type: ActionTypes.INIT})
    return {
        getState,
        dispatch,
        subscribe
    }

}
export default createStore()