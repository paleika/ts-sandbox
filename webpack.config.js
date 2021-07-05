const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const { mode = 'development' } = env;
  return {
    entry: {
      index: "./src/index.js"
    },
    mode: mode,
    devtool: "inline-source-map",
    devServer: {
      contentBase: './dist',
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "TS Box",
        template: "./index.html"
      })
    ],

    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    devServer: {

    }
  }
}
