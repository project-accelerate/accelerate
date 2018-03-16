const next = require("next");
const { parse } = require("url");
const qs = require("querystring");

exports.createFrontend = ({ dev }) => {
  const server = next({
    dev,
    dir: __dirname,
    conf: {
      distDir: ".build"
    }
  });

  const render = (req, res) => {
    const { pathname, query } = parse(req.url);
    return server.render(req, res, pathname, qs.parse(query));
  };

  return { server, render };
};
