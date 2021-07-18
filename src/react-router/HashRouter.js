import React, {useEffect, useRef, useState} from 'react';
import RouterContext from "./Context";

const HashRouter = props => {
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
            window.location.hash = path
            locationState.current = state
            setLocation({
                ...location,
                pathname: path
            })
        },
        block(message) {
            messageRef.current = message
        }
    })
    useEffect(() => {
        window.location.hash = window.location.hash || '/'

        window.addEventListener('hashchange', () => {
            setLocation({
                ...location,
                pathname: window.location.hash.slice(1) // 取#之后的所有值
            })
        })
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

export default HashRouter;