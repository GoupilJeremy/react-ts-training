let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');

let basePath = __dirname;

module.exports = {
 context: path.join(basePath, "src"),
 resolve: {
   extensions: ['.js', '.ts', '.tsx', 'css']
 },
 entry: [
   './main.tsx',
   '../node_modules/bootstrap/dist/css/bootstrap.css',
   './content/site.css'
 ],
 output: {
   path: path.join(basePath, 'dist'),
   filename: 'bundle.js'
 },
 devtool: 'source-map',
 devServer: {
   contentBase: './dist', // Content base
   inline: true, // Enable watch and live reload
   host: 'localhost',
   port: 8080,
   stats: 'errors-only'
 },
 module: {
   rules: [
     {
       test: /\.(ts|tsx)$/,
       exclude: /node_modules/,
       loader: 'awesome-typescript-loader',
       options: {
         useBabel: true,
       },
     },
     {
       test: /\.css$/,  
       include: /node_modules/,      
       use: [MiniCssExtractPlugin.loader, "css-loader"]
     },
     // Use CSS modules for custom stylesheets
     {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            camelCase: true,
          }
        }
      ]
     },
     // Do not use CSS modules in node_modules folder
     {
       test: /\.(png|jpg|gif|svg)$/,
       loader: 'file-loader',
       options: {
         name: 'assets/img/[name].[ext]?[hash]'
       }
     },
   ],
 },
 plugins: [
   //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
   new HtmlWebpackPlugin({
     filename: 'index.html', //Name of file in ./dist/
     template: 'index.html', //Name of template in ./src
     hash: true,
   }),
   new MiniCssExtractPlugin({
     filename: "[name].css",
     chunkFilename: "[id].css"
   }),
 ],
};