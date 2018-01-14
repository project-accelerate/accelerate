const next = require("next");
const { parse } = require("url");
const qs = require("querystring");

exports.frontend = next({
  dev: process.env.NODE_ENV !== "production",
  dir: "modules/frontend"
});

exports.render = (req, res) => {
  const { pathname, query } = parse(req.url);
  return exports.frontend.render(req, res, pathname, qs.parse(query));
};
