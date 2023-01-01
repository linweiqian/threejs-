const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const os = require("os");
function getNetworkIp() {
  let needHost = ""; // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces();
    for (let dev in network) {
      let iface = network[dev];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          needHost = alias.address;
        }
      }
    }
  } catch (e) {
    needHost = "localhost";
  }
  return needHost;
}

const HOST = getNetworkIp();
const POST = 8080;

module.exports = merge(base, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify("development"),
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${HOST}:${POST}`],
      },
    }),
  ],
  stats: "errors-only",
  devServer: {
    host: HOST,
    port: POST,
    open: false,
    historyApiFallback: true,
    allowedHosts: "all",
    hot: true,
    proxy: {
      "/fileService": {
        target: "http://zsbwgtest.cloudbeing.cn",
        changeOrigin: true,
      },
      "/websiteAPI": {
        target: "http://zsbwgtest.cloudbeing.cn",
        changeOrigin: true,
      },
      "/net":{
        // http://192.168.6.41:8080
        // https://wx.wechatlee.com
        target: "https://wx.wechatlee.com",
        changeOrigin: true,
      }
    },
  },
});
