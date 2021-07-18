import React, {useContext} from 'react';
import RouterContext from "./Context";

const Link = props => {
    const context = useContext(RouterContext)
    const handleClick = () => {
        const {to} = props
        if(typeof to == 'object'){
        //     说明是通过对象传过来的，可能携带有state 一共有两个参数  pathname state
            context.history.push(to.pathname, to.state)
        }else{
        //     说明是string this string is the path just pushstate
            window.location.hash = to
        }
    }
    return <a href="void(0)" onClick={handleClick}>{props.children}</a>
}

export default Link;