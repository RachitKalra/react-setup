const express = require('express');
const router = express.Router();
import App from "./../components/main-root"
import ReactDom from 'react-dom/server';
import React from 'react';


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        "react_app":ReactDom.renderToString(<App/>)
    });
});

module.exports = router;
