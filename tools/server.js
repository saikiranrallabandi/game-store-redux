import express from "express";
import webpack from "webpack";
import path from "path";
import config from "../webpack.config.dev";
import favicon from "serve-favicon";

const port = 12090;
const app = express();
const compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath
  })
);

app.use(require("webpack-hot-middleware")(compiler));
app.use(favicon(path.join(__dirname, "../public", "assets", "favicon.ico")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
