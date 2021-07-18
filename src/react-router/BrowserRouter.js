import React, {useEffect, useRef, useState} from 'react';
import RouterContext from "./Context";

const pushState = window.history.pushState
window.history.pushState = (state, title, url) => {
    pushState.call(window.history, state, title, url)
    window.onpushstate(state, url)
}
// browserRouter 的实现思路： 利用history对象来实现，不监听hashChange，改为监听popstate事件，并重写history.pushState方法, 里面主动调用oldpushstate 方法，
// 通过自己写的方法赋给window对象，里面修改了我们组件的state和pathname值
const BrowserRouter = props => {
    const locationState = useRef(null)
    const messageRef = useRef(null)
    const [location, setLocation] = useState({
        pathname: window.location.pathname, // 路径
        state: locationState.current, // state携带的状态值
    })
    const [history] = useState({
        push(path, state) {
            if (messageRef.current) {
                let confirm = window.confirm(messageRef.current(path))
                if (!confirm) return
            }
            window.history.pushState(state, null, path)
        },
        block(message) {
            messageRef.current = message
        }
    })
    useEffect(() => {

        window.addEventListener('popstate', (event) => {
            setLocation({
                ...location,
                pathname: window.location.pathname,// 取#之后的所有值
                state: event.state
            })
        })
        window.onpushstate = (state, pathname) => {
            setLocation({
                ...location,
                pathname: pathname,
                state: state || null
            })
        }
    }, [])
    return (
        <RouterContext.Provider value={{
            location: location,
            history: history
        }
        }>
            {props.children}
        </RouterContext.Provider>
    );
}

export default BrowserRouter;