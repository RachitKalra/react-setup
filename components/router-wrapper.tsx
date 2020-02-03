import {BrowserRouter,  StaticRouter} from "react-router-dom";
import * as React from 'react';

interface WrapperProps{
    server?:boolean,
    context?:any,
    url?:any
}

/**
 * wraps the component in respective router
 *
 * if <b>server<b> flag in present then renders as static router
 * else renders as Browser router
 * */
function routerWrapper<A extends WrapperProps>(Component):React.FunctionComponent<A>{


    return (props)=>{
        console.log(props);


        //using the respective router using the flag provided by the server
        if(props.server){
            console.log("Static Router");
            return(
                <StaticRouter context ={props.context} location={props.url} >

                    <Component {...props}/>
                </StaticRouter>
            )
        }
        else {
            console.log("Browser Router");
            return (
                <BrowserRouter >
                    <Component {...props}/>
                </BrowserRouter>
            )
        }
    };
}


export {routerWrapper,WrapperProps}