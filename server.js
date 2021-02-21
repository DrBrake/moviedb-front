var path = require("path");
var express = require("express");
var http = require("http");
var expressStaticGzip = require("express-static-gzip");

const isDeveloping = process.env.NODE_ENV === "development";
const app = express();

if (isDeveloping) {
  let webpack = require("webpack");
  let webpackMiddleware = require("webpack-dev-middleware");
  let webpackHotMiddleware = require("webpack-hot-middleware");
  let config = require("./webpack.config.dev");

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    quite: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500,
      ignored: /node_modules/,
    },
    stats: {
      colors: true,
    },
  });

  const bundlePath = path.join(__dirname, "/dist/index.html");
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get("*", function response(req, res) {
    res.set("Content-Type", "text/html; charset=UTF-8");
    res.write(middleware.fileSystem.readFileSync(bundlePath));
    res.end();
  });
} else {
  const staticPath = path.join(__dirname, "dist");
  app.use(expressStaticGzip(staticPath));
  app.get("*", function (req, res) {
    res.sendFile(staticPath + "/index.html");
  });
}

http.createServer(app).listen(3000, "0.0.0.0", function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("==> Listening on port 3000, open up localhost in your browser");
});
