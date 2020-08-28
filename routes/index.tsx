import {StaticRouterContext} from "react-router";

const express = require('express');
const router = express.Router();
import App from "../components/main-root"
import {renderToString} from 'react-dom/server';
import * as React from 'react';


/* GET home page. */
router.get('*', function(req, res, next) {

    const ctx:StaticRouterContext={};

    const reactHtml = renderToString(<App server={true} context={ctx} url={req.url} />);
    if(ctx.action==="REPLACE"&&ctx.url!==req.url){
        res.writeHead(302,{Location:ctx.url});
        res.end();
    }else{
        res.render('index', {
            title: 'Express',
            "react_app":reactHtml
        });
    }

});

export default router;
