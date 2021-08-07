const webpack = require('webpack');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

const packageJson = require('./../package.json');
const utils = require('./utils.js');

module.exports = (options) => ({
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],
        mainFields: ['browser', 'module', 'main'],
        alias: utils.mapTypescriptAliasToWebpackAlias()
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: {
                        caseSensitive: true,
                        removeAttributeQuotes:false,
                        minifyJS:false,
                        minifyCSS:false
                    }
                },
                exclude: utils.root('src/main/webapp/index.html')
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loader: 'file-loader',
                options: {
                    digest: 'hex',
                    hash: 'sha512',
                    // For fixing src attr of image
                    // See https://github.com/jhipster/generator-jhipster/issues/11209
                    name: 'content/[hash].[ext]',
                    esModule: false
                }
            },
            {
                test: /manifest.webapp$/,
                loader: 'file-loader',
                options: {
                    name: 'manifest.webapp'
                }
            },
            {
                test    : /\.(js)$/,
                exclude : /(node_modules|build|dist\/)/,
                use     : ['babel-loader'],
            },
            // Ignore warnings about System.import in Angular
            { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${options.env}'`,
                BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
                VERSION: `'${packageJson.version}'`,
                DEBUG_INFO_ENABLED: options.env === 'development',
                // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
                // If this URL is left empty (""), then it will be relative to the current context.
                // If you use an API server, in `prod` mode, you will need to enable CORS
                // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
                SERVER_API_URL: `'http://35.188.100.195:8086/'`
            }
        }),
        new CopyWebpackPlugin([
            { from: './node_modules/swagger-ui-dist/*.{js,css,html,png}', to: 'swagger-ui', flatten: true, ignore: ['index.html'] },
            { from: './node_modules/axios/dist/axios.min.js', to: 'swagger-ui' },
            { from: './src/main/webapp/swagger-ui/', to: 'swagger-ui' },
            { from: './src/main/webapp/content/', to: 'content' },
            { from: './src/main/webapp/favicon.ico', to: 'favicon.ico' },
            { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
            // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
            { from: './src/main/webapp/robots.txt', to: 'robots.txt' }
        ]),
        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/ar-ly/*.json", fileName: "./i18n/ar-ly.json" },
                    { pattern: "./src/main/webapp/i18n/zh-cn/*.json", fileName: "./i18n/zh-cn.json" },
                    { pattern: "./src/main/webapp/i18n/zh-tw/*.json", fileName: "./i18n/zh-tw.json" },
                    { pattern: "./src/main/webapp/i18n/fr/*.json", fileName: "./i18n/fr.json" },
                    { pattern: "./src/main/webapp/i18n/de/*.json", fileName: "./i18n/de.json" },
                    { pattern: "./src/main/webapp/i18n/el/*.json", fileName: "./i18n/el.json" },
                    { pattern: "./src/main/webapp/i18n/hi/*.json", fileName: "./i18n/hi.json" },
                    { pattern: "./src/main/webapp/i18n/it/*.json", fileName: "./i18n/it.json" },
                    { pattern: "./src/main/webapp/i18n/ja/*.json", fileName: "./i18n/ja.json" },
                    { pattern: "./src/main/webapp/i18n/ko/*.json", fileName: "./i18n/ko.json" },
                    { pattern: "./src/main/webapp/i18n/pl/*.json", fileName: "./i18n/pl.json" },
                    { pattern: "./src/main/webapp/i18n/ru/*.json", fileName: "./i18n/ru.json" },
                    { pattern: "./src/main/webapp/i18n/es/*.json", fileName: "./i18n/es.json" },
                    { pattern: "./src/main/webapp/i18n/tr/*.json", fileName: "./i18n/tr.json" },
                    { pattern: "./src/main/webapp/i18n/th/*.json", fileName: "./i18n/th.json" },
                    { pattern: "./src/main/webapp/i18n/vi/*.json", fileName: "./i18n/vi.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
          }),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/index.html',
            chunks: ['polyfills', 'main', 'global', 'libs'],
            chunksSortMode: 'manual',
            inject: 'body'
        }),
        new BaseHrefWebpackPlugin({ baseHref: '/' }),
        new AngularCompilerPlugin({
            mainPath: utils.root('src/main/webapp/app/app.main.ts'),
            tsConfigPath: utils.root('tsconfig.app.json'),
            sourceMap: true
        })
    ]
});
