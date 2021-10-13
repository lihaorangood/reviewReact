export function take(actionType){
    return {
        type: 'TAKE',
        actionType,
    }
}
export function put(action){
    return {
        type: 'PUT',
        action
    }
}

export function call(fn, ...args){
    return {
        type: 'CALL',
        fn,
        args
    }
}

/**
 * task 其实是一个generator函数，需要执行
 * @param task
 */
export function fork(task){
    return {
        type: 'FORK',
        task
    }
}
export function* takeEvery(actionType, generator){
    while (true){
        yield fork(function*(){
            yield take(actionType)
            yield generator()
        })
    }
}