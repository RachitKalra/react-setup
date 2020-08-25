/**
 * Provides single configuration for the web pack
 * for both client and server side
 * */


const fs = require('fs');
const globby = require("globby");

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
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getConfig(options){
    return {

        mode:options.mode,

        externals: node_modules,
        entry:['./server-init.ts'],

        target:'node',
        output:{
            filename:"www-start",
            path:path.resolve(__dirname,"dist/")
        },

        plugins:[
            new CleanWebpackPlugin(),
            new miniCSSExtractPlugin({
                filename:'./public/compiled/bundle.css'
            }),
            new CopyPlugin({
                patterns:[
                    {
                        from: 'public/stylesheets',
                        to: 'public/stylesheets',
                    },
                    // {
                    //     from: 'public/images',
                    //     to: 'public/images',
                    // },
                    {
                        from: 'views',
                        to: 'views',
                    },
                    {
                        from: 'package*.json',
                        to: '[name].[ext]',
                        globOptions: {
                            ignore: ['**/node_modules/**'],
                        },
                    },
                    {
                        from: 'Dockerfile',
                        to: '[name]',
                    }
                ]
            })
        ],
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        module: {
            rules: [
                {
                    test:/\.tsx?$/,
                    use:'ts-loader',
                    exclude:/node_modules/
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env',{"modules": "commonjs"}],'@babel/preset-react'],
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
                        {
                            loader: 'css-loader',
                            options: {
                                localsConvention: 'camelCase',
                                modules:true
                            }
                        },
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