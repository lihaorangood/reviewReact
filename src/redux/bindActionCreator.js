function bindActionCreator(actionCrator, dispatch){
    return function(){
        return dispatch(actionCrator.apply(this,arguments))
    }
}
export default function bindActionCreators(actionCreators, dispatch){
    if(typeof actionCreators== 'function'){
        return bindActionCreator(actionCreators, dispatch)
    }
    const bindActionCreators = {}
    for (const actionCreatorsKey in actionCreators) {
        bindActionCreators[actionCreatorsKey] = bindActionCreator(actionCreators[actionCreatorsKey], dispatch)
    }
    return bindActionCreators
}