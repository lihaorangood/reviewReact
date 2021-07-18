import React from "react";
import ReduxContext from "./context";

const Provider = function (props) {
    return <ReduxContext.Provider value={{store: props.store}}>
        {props.children}
    </ReduxContext.Provider>
}
export default Provider