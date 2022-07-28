const {
  config: authentication,
  befores = [],
  afters = [],
} = require("./authentication");

const addAuthHeader = (request, z, bundle) => {
  // Hard-coded auth header just for demo
  request.headers["X-API-Key"] = "secret";
  return request;
};

const search = require("./searches/invoice");
const searchs = require("./searches/invoices");
const trigger = require("./triggers/invoice");

const App = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require("./package.json").version,
  platformVersion: require("zapier-platform-core").version,

  authentication,

  beforeRequest: [...befores, addAuthHeader], //addAuthHeader

  afterResponse: [...afters],

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [trigger.key]: trigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
    [search.key]: search, // same as invoice that is search=invoice
    [searchs.key]: searchs,
  },

  // If you want your creates to show up, you better include it here!
  creates: {},

  resources: {},
}; // Ignored

module.exports = App;
