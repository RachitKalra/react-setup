import * as React from 'react'
import * as ReactDom from 'react-dom'
import App from './components/main-root'

declare const window;

window.addEventListener("load",()=>{
    ReactDom.hydrate(
        <App/>,
        document.getElementById('react-root'),
        ()=>console.log("rendering react app on client")
    )
});