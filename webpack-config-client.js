
const miniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const path = require("path");

function getConfig(options){
    return {
        mode: options.mode,

        entry:options.entry.concat([
            "./client-init.tsx"
        ]),

        output:{
            path: path.resolve( "dist/public/compiled/"),
            publicPath:"/compiled/",
            filename:"bundle.js"
        },

        plugins:[
            new miniCSSExtractPlugin({
                filename:"bundle.css"
            })
        ].concat(options.plugins),

        optimization: {
            noEmitOnErrors: true
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        module:{
            rules:[
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
                            presets: ['@babel/preset-env','@babel/preset-react'],
                            cacheDirectory: true,
                            plugins: ['react-hot-loader/babel']
                        }
                    }
                },
                {
                    test: /\.css|\.scss/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        options.mode==="production"?miniCSSExtractPlugin.loader:"style-loader",
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
                //case for loading css files from the node_module directory
                //disabling the module of css loader
                {
                    test: /\.css|\.scss/,
                    include: /(node_modules|bower_components)/,
                    use: [
                        options.mode==="production"?miniCSSExtractPlugin.loader:"style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ].concat(options.module.rules)
        }
    }

}

function getDevelopmentConfig(){
    return getConfig({
        mode:"development",
        entry:[
            'webpack-hot-middleware/client',
        ],
        plugins:[
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        module:{
            rules:[]
        }
    })
}

function getProductionConfig() {
    return getConfig({
        mode:"production",
        entry:[],
        plugins:[
            new webpack.NamedModulesPlugin(),
        ],
        module:{
            rules:[]
        }
    })
}

module.exports = (env,argv)=>{
    if(argv.mode !== "production"){
        console.log("getting development config for client");
        return getDevelopmentConfig();
    }
    else{
        console.log("getting production config for client");
        return getProductionConfig();
    }
};