// 将组件和仓库链接，并主动添加订阅，利用高阶函数组件完成此任务
import React, {useContext, useEffect, useState} from "react";
import {bindActionCreators} from '../redux'
import ReduxContext from "./context";
function connect(mapStateToProps, mapDispatchToProps){
    return function (WrapperComponent) {
        return function () {
            const context = useContext(ReduxContext)
            const [state, setState] = useState(context.store.getState())
            useEffect(() => {
            // 进行订阅 与取消订阅
                const unsubcirbe = context.store.subscribe(() => {
                   setState(mapStateToProps(context.store.getState()))
                })
            }, [])
            let actions = {}
            if(typeof mapDispatchToProps === 'function'){
                actions = mapDispatchToProps(context.store.dispatch)
            }else{
                actions = bindActionCreators(mapStateToProps, context.store.dispatch)
            }

            return <WrapperComponent dispatch={context.store.dispatch} {...state} {...actions} />
        }
    }
}
export default connect