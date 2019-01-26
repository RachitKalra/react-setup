const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const http =  require("http");
const config = require("./configuration_var");

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('./public'));

//loading the hot re-loader only in development
(()=>{

    if (process.env.NODE_ENV !== 'production') {
        console.log("Enabling middle ware");
        const webpack = require('webpack');
        const webpackConfig = require('./webpack-config-client')({},{mode:"development"});
        console.log(webpackConfig);
        const compiler = webpack(webpackConfig);
        console.log(webpackConfig.output.publicPath);
        app.use(require('webpack-dev-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath
        }));

        app.use(require("webpack-hot-middleware")(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000
        }))
    }
    else{
        console.log("disabling middle ware for production");
    }

})();


app.use('/users', usersRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server  =  http.createServer(app);

server.listen(config.port,config.address,()=>{
    let addr = server.address();
    console.log("Server listing on:" );
    console.log(addr);
});

//closing server gracefully on crash
server.on("error",err=>{
   console.error(err);
   server.close();
});