 // withRouter是一个高阶函数，我们仅仅需要利用Route将context 对象传递给组件即可
 import React from 'react'
 import Route from "./Route";
 export default function (WrapperComponent){
    return <Route component={WrapperComponent} />
 }