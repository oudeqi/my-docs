const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(env, argv){

    let PUBLIC_PATH = env.PUBLIC_PATH;
    let NODE_ENV = process.env.NODE_ENV;
    /*
        使用 “set NODE_ENV=production && webpack” 配置环境变量 "production " 后面有空格，仅能在win系统下面生效
        使用 “cross-env NODE_ENV=development webpack”配置环境变量 "production" 后面无空格，可以跨平台
    */
    return {
        devtool: 'eval-source-map',
        // devtool: 'none',
        entry: {
            main: './app/index.js',
            // main2: './app/index2.js',
            vendor: ['jquery', 'swiper', 'swiper/dist/css/swiper.css']
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'assets/scripts/[name].[chunkhash:8].js',
            publicPath: PUBLIC_PATH,
            pathinfo: true//告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。
        },
        // resolve: {
     //        extensions: ['.js', '.css'],
     //        alias: {
     //            '@': path.join(__dirname, 'app')
     //        }
     //    },
     //     externals: {
     //        jquery: 'jQuery'//jquery不会被打包，需要手动通过外部引用的方法
     //    },
        devServer: {
            host: "192.168.0.12",
            contentBase: [path.join(__dirname, 'dist')],
            headers: {
                "X-Custom-Foo": "bar"
            },
            historyApiFallback: true,
            compress: true,//对资源启用 gzip 压缩
            publicPath: '/',
            inline: true,
            port: 4000,
            clientLogLevel: "none",//none, error, warning 或者 info（默认值）
            noInfo: false,
            open: true,
            // openPage: '/different/page'
        },
        module: {
            // noParse: /jquery|backbone/,//希望直接引入 dist版本,webpack 将会直接引入这个模块并且不会解析它
            rules: [
                // {
                //     test: require.resolve('jquery'),
                //     use: 'imports-loader?define=>false'
                // },
                // {
                //     test: require.resolve('swiper'),
                //     use: 'imports-loader?define=>false'
                // },
                {
                    test: /(\.jsx|\.js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        publicPath: '../../',
                        use: [{
                            loader: "css-loader",
                            options: {
                                modules: false //css模块功能
                            }
                        }, {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: './postcss.config.js',
                                    ctx: {
                                        autoprefixer: {browsers: ['> 1%']}
                                    }
                                }
                            }
                        }],
                    })
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                    loader: 'url-loader',
                    options: {
                        name: 'assets/images/[name].[hash:8].[ext]',
                        limit: 1024 * 3
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-withimg-loader",
                            options: {
                                // exclude: /image/,//排除image目录
                                min: false,//默认会去除html中的换行符，配置min=false可不去除
                                deep: false,//将关闭include语法嵌套子页面的功能
                            }
                        },
                        {
                            loader: "html-loader",
                            options: {
                                attrs: ['img:data-src'],
                                interpolate: true,//为 ES6 模板字符串启用插值语法
                                minimize: false,
                                removeComments: false,
                                collapseWhitespace: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[hash:8].[ext]',
                        publicPath: '../../',
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.HashedModuleIdsPlugin(),//prod 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
            new webpack.BannerPlugin('版权所有，翻版必究'),//prod
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(NODE_ENV),
                    'PUBLIC_PATH': JSON.stringify(PUBLIC_PATH),
                    'SERVICE_URL': JSON.stringify('http://dev.example.com')
                }
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new webpack.optimize.UglifyJsPlugin({//prod 这个插件需要替换
                // sourceMap: true,
                compress: {
                    // warnings: true,
                    drop_console: false,
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor'],
                minChunks: Infinity,
                filename: 'assets/scripts/[name].[chunkhash:8].js',
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity
            }),
            new ExtractTextPlugin({
                filename: 'assets/styles/[name].[contenthash:8].css',
                allChunks: false
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'html-withimg-loader!app/index.html',
                chunks: ['manifest', 'vendor', 'main'],
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency'
            })
        ]
    }
}
