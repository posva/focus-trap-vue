const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const outputPath = path.resolve(__dirname, 'demo_dist')

module.exports = ({ mode = 'production' } = {}) => {
  const productionOnlyPlugins = []

  const devOnlyPlugins = [new webpack.HotModuleReplacementPlugin()]

  const extraPlugins =
    mode === 'production' ? productionOnlyPlugins : devOnlyPlugins

  const devOnlyConfig = {
    devtool: 'inline-source-map',
    devServer: {
      // contentBase: outputPath,
      hot: true,
    },
  }

  const productionOnlyConfig = {
    optimization: {
      minimizer: [new TerserPlugin()],
    },
  }

  const extraConfig =
    mode === 'production' ? productionOnlyConfig : devOnlyConfig

  return {
    mode,

    entry: [path.resolve(__dirname, 'demo/index.js')],
    output: {
      path: outputPath,
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
      ],
    },

    ...extraConfig,

    resolve: {
      alias: {
        vue: path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'demo/index.html'),
      }),
      ...extraPlugins,
    ],
  }
}
