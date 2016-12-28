const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');

module.exports = function devFn(cmpt, port=80) {
  const config = require("../build/webpack.config")();
  config.entry.app = [];
  config.entry.app.push( `webpack-dev-server/client?http://localhost:${port}/`, "webpack/hot/dev-server" );
  config.entry.app.push( resolve(__dirname, `../src/components/${cmpt}/dev`) );
  config.output.path = resolve(__dirname, '../assets');
  config.output.publicPath = "/";

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: resolve(__dirname, `../src/components/${cmpt}/dev.html`),
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin()
  )

  config.resolve.modules = [ resolve(__dirname, '../node_modules') ];
  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    hot: true,
    publicPath: "/",
    historyApiFallback: true,
    stats: { colors: true }
  });

  server.listen(port, function(err) {
    if(err) {
      console.log(err);
      return;
    }
    opn(`http://localhost:${port}`)
  });
}
