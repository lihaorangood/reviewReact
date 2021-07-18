import React, {useContext} from 'react';
import RouterContext from "./Context";
import {pathToRegexp} from "path-to-regexp";
const Route = props => {
    const context = useContext(RouterContext)
    const {pathname} = context.location
    const {path='/', component: Component, exct = false, render, children} = props
    let paramName = []
    const regx = pathToRegexp(path, paramName, {end: exct})
    const result = pathname.match(regx)
    let compProps = {
        location: context.location,
        history:context.history,
        match: null
    }
    if (result) {
        const params = {}
        let [url, ...values] = result
        for (let i = 0; i < paramName.length; i++) {
            params[paramName[i]] = values[i]
        }
        compProps.match = {
            path,
            url,
            params,
            isExact: url==pathname
        }
        if(Component){
             return <Component {...compProps}/>
        }else if(render){
            return render(compProps)
        }else if(children){
            return children(compProps)
        }
    }
    return null
}

export default Route;