import React, {useRef} from "react";
import {connect} from 'react-redux'
import actions from "./store/action/login";
// import {HashRouter, Route, Switch, Redirect} from './react-router'
// import Home from "./Home";
// import User from "./User";

function App(props) {
    console.log(props)
    const nameRef = useRef()
    const pasRef = useRef()
    const login = () => {
        const username = nameRef.current.value
        const password = pasRef.current.value
        props.login(username, password)
    }
    const loginForm = () => {
        return <>
            <label>用户名</label><input ref={nameRef} />
            <label>密码</label><input ref={pasRef} />
            <button onClick={login}>登录</button>
        </>
    }
    const logoutForm = () => {
        return <>
            <p>props.username</p>
            <button onClick={props.logout}>退出</button>
        </>
    }
    return !props.token ? loginForm() : logoutForm()
    // return <div>你好</div>
}

export default connect(state => state.user, actions)(App)