export default function createSagaMiddleware() {
    function sagaMiddlewarde({getState, dispatch}) {
        function createChannel(){
            const observer = {}
            // 进行订阅， 暂存next函数
            function subscribe(actionType, next){
                observer[actionType] = next
            }
            function publish(action){
                // put时执行里面暂存的next函数
                if(observer[action.type]){
                    const next = observer[action.type]
                    delete observer[action.type]
                    next(action)
                }
            }
            return {
                subscribe,
                publish
            }
        }
        let channel = createChannel()
        function run(generater) {
            // 支持产出 generator执行器和普通的
            const it = typeof generater[Symbol.iterator] === 'function'?generater:it

            function next(action) {
                const {value: effect, done} = it.next(action)
                if(typeof effect[Symbol.iterator] == "function"){
                    run(effect)
                    next()
                } else if( typeof effect.then === 'function'){
                    effect.then(next)
                }else{
                    switch (effect.type) {
                        case 'TAKE':
                            channel.subscribe(action, next)
                            break
                        case 'PUT':
                            dispatch(effect.action)
                            next()
                            break
                        case 'FORK':
                            run(effect.task)
                            next()
                            break
                        case 'CALL':
                            effect.fn(...effect.args).then(next)
                            break
                        default:
                            break
                    }
                }

            }

            next()
        }

        sagaMiddlewarde.run = run
        return function (next) {
            return function (action) {
                channel.publish(action)
                next(action)
            }
        }
    }


    return sagaMiddlewarde()
}