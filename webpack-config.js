/**
 * Provides single configuration for the web pack
 * for both client and server side
 * */


const fs = require('fs');

// filtering out mode modules which might have native code unfit front end
const node_modules  ={};
fs.readdirSync('node_modules')
    .filter(dir=>{
        //console.log(dir);
        //console.log(['.bin'].indexOf(dir));
        return ['.bin'].indexOf(dir) === - 1
        // return (dir !== ".bin")
    })
    .forEach(module=>{
        node_modules[module] = 'commonjs ' + module
    });

// console.log(node_modules);

const miniCSSExtractPlugin = require('mini-css-extract-plugin');
const path  =require("path");

function getConfig(options){
    return {

        mode:options.mode,

        externals: node_modules,
        entry:['./server-init.js'],

        target:'node',
        output:{
            filename:"www-start",
            path:__dirname
        },

        plugins:[
            new miniCSSExtractPlugin({
                filename:path.join(__dirname, '/public/compiled/bundle.css')
            })
        ],

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env','react'],
                            cacheDirectory: true,
                            plugins: ['react-hot-loader/babel']
                        }
                    }
                },
                {
                    test: /\.css|\.scss/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        miniCSSExtractPlugin.loader,
                        "css-loader?modules=true&camelCase=true",
                        "sass-loader"
                    ]
                },
                {
                    //case for loading css files from the node_module directory
                    //disabling the module of css loader
                    test: /\.css|\.scss/,
                    include: /(node_modules|bower_components)/,
                    use: [
                        miniCSSExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
                ]
        },

    };
}


module.exports =(env,argv)=>{
    let config  = getConfig({
        mode:argv.mode
    });
    console.log("Server Config");
    console.log(config);
    return config;
};