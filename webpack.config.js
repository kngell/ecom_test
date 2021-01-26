const path = require("path");
const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DelWebpackPlugin = require("del-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  devtool: false,
  entry: {
    "js/main": ["./src/assets/js/main/main.js", "./src/assets/js/pages/home.js"],
    "css/main": ["./src/assets/scss/main/main.scss", "./src/assets/scss/pages/home.scss"],
  },
  output: {
    filename: "public/assets/[name].js",
    path: path.resolve(__dirname, "kngell"),
  },
  devServer: {
    contentBase: path.join(__dirname, "kngell"),
    // open: true,
    index: "app/views/index.html",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src", "assets", "js")],
        exclude: [path.resolve(__dirname, "node_modules")],
        enforce: "pre",
        enforce: "post",
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "public/assets/fonts/",
              publicPath: "../fonts/",
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: devMode ? "[name].[ext]" : "[name].[hash].[ext]",
            outputPath: "public/assets/img/",
            publicPath: (url) => {
              return "../../public/assets/img/" + url;
            },
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attributes: true,
            esModule: false,
            minimize: false,
          },
        },
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: "public/assets/[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: "app/views/index.html",
      template: "src/views/index.html",
      inject: "body",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "global.jQuery": "jquery",
      "popper.js": "popperjs",
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      proxy: "localhost:8080",
      browser: "chrome",
    }),
    new DelWebpackPlugin({
      include: ["*.js", "*.css"], //"*.js",
      info: true,
      keepGeneratedAssets: true,
      allowExternal: false,
    }),
  ],
  optimization: {
    removeEmptyChunks: true,
  },
};
