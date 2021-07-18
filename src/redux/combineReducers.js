export default function (reducers) {
    const reducerKeys = Object.keys(reducers)
    return function(state = {}, action){
        const nextState = {} //下一个状态对象
        // 其实这里是将将要合并的reducer一次执行，所以每一个reducer中的action最好不要重复
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i]
            const reducer = reducers[key]
            const previousStateForKey = state[key]
            const nextStateForKey = reducer(previousStateForKey,action)
            nextState[key] = nextStateForKey
        }
        return nextState
    }
}