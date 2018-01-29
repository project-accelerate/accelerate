/**
 * Get development config from appropriate source.
 *
 * When running on server, we read from process.ENV.
 *
 * When running in browser, we read from window.ENV, which contains
 * whitelisted configuration variables passed through from the server.
 *
 * We use this approach rather than baking config vars into the js bundle
 * to support Heroku pipelines, which serve the same js bundles regardless
 * of which stage in the pipeline we're at.
 */

module.exports = process.browser ? window.ENV : process.env;
