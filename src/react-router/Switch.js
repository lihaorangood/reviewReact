import React, {useContext} from 'react';
import RouterContext from "./Context";
import {pathToRegexp} from "path-to-regexp";

const Swich = props => {
    let children = props.children
    const context = useContext(RouterContext)
    const path = context.location.pathname
    children = Array.isArray(children) ? children : [children]
    console.log(children)
    for (let i = 0; i < children.length; i++) {
        const child = children[i]
        let paramNames = []
        const {pathname = '/', exact = false} = child.props
        const regx = pathToRegexp(pathname, paramNames, {end: exact})
        if (path.match(regx)) {
            // 注意此时的child只是一个ReactElement元素，还没有真正渲染，只有真正渲染，才会创建实例 React.CreateElement创建的返回值
            return child
        }
    }

    return 'aa'
}

export default Swich;