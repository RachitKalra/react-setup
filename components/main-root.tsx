import * as  React from 'react'
import { hot } from 'react-hot-loader'
import {routerWrapper,WrapperProps} from "./router-wrapper";
import {Route} from "react-router-dom";

const App = (props) =>{
    return(
        <Route path = "/"  render={()=><div>Welcome to Root</div>}/>
    )
};

export default hot(module)(routerWrapper(App)) as React.FunctionComponent<WrapperProps>