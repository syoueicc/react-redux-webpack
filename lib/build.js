const webpack = require('webpack');
const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const moment = require('moment');
const shelljs =require('shelljs');
const fs = require('fs');
const _  = require('lodash');

function build(cmpt) {
  const config = require("../build/webpack.config")();
  const hashname = require('../lib/createHashcode')(moment().format('YYYY-MM'));

// function eachDir(_path, arr) {
//   const dir = fs.readdirSync(_path);
//   _.each(dir, d => {
//     let info = fs.statSync( join(_path, d) );
//     if(info.isDirectory()) {
//       eachDir( join(_path, d) )
//     } else {
//       arr.push(join(_path, d));
//     }

//   })
// }

// var conn = new Client();
// conn.on('ready', function() {
//   console.log('Client :: ready');
//   conn.sftp(function(err, sftp) {
//     if (err) throw err;
//     var list = [];
//     eachDir('assets/vue', list);
//     console.log(list)
//   });
// }).connect({
//   host: '172.16.9.4',
//   port: 22,
//   username: 'root',
//   password: 'dvpVrF87sVsc24Qq'
// });
//   return;
  config.entry.app = [];
  config.entry.app.push( resolve(__dirname, `../src/components/${cmpt}/dev`) );
  config.output.path = resolve(__dirname, `../assets/react/${hashname}`);
  config.output.filename = `jsbin/${cmpt}/${cmpt}-[hash:8].js`;
  config.output.publicPath = `//r.plures.net/react/${hashname}/`;
  // config.module.rules.push(
  //   {
  //     test:/\.styl$/,
  //     use: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!stylus-loader')
  //   }
  // )
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
     minimize: true
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, `../src/components/${cmpt}/dev.html`),
      filename: `../../${cmpt}.html`
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin(`cssbin/${cmpt}/${cmpt}-[contenthash:8].css`),
    new webpack.optimize.OccurrenceOrderPlugin(true)
    //new ExtractTextPlugin(`cssbin/${cmpt}/${cmpt}-[hash].css`)
  )

  config.context = resolve(__dirname, "../")

  config.resolve.modules = [ resolve(__dirname, '../node_modules') ];
  var compiler = webpack(config);

  shelljs.rm('-rf', resolve( __dirname, '../assets/react/*' ));

  compiler.run((err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
}
module.exports = build;
