import React, {useContext, useEffect} from 'react';
import RouterContext from "./Context";

const Redirect = props => {
    const context = useContext(RouterContext)
    useEffect(() => {
        console.log(props)
        console.log(context, 'context')
        context.history.push(props.to)
    }, [])
    return null
}

export default Redirect;