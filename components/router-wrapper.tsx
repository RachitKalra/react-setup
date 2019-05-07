import {BrowserRouter,StaticRouter} from "react-router-dom";
import * as React from 'react';


/**
 * wraps the component in respective router
 *
 * if <b>server<b> flag in present then renders as static router
 * else renders as Browser router
 * */
export default function(Component){


    return (props)=>{
        console.log(props,StaticRouter,Component);

        const comp = <Component {...props}/>;

        //using the respective router using the flag provided by the server
        if(props.server){
            console.log("Static Router");
            return(
                <StaticRouter context ={props.context} location={props.url}>
                    {comp}
                </StaticRouter>
            )
        }
        else {
            console.log("Browser Router");
            return (
                <BrowserRouter>
                    {comp}
                </BrowserRouter>
            )
        }
    };
}