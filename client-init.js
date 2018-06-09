import React from 'react'
import ReactDom from 'react-dom'
import App from './components/main-root'



window.addEventListener("load",()=>{
    ReactDom.hydrate(
        <App/>,
        document.getElementById('react-root'),
        ()=>console.log("rendering react app on client")
    )
});