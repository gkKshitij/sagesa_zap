/* globals describe, it, expect */

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);
const should = require("should"); // required to use .exist()
////////////////////////////////////////////

// testing authentication true credentials
describe("basic auth", () => {
  it("automatically has Authorize Header add", async () => {
    const bundle = {
      authData: {
        username: "rohitkhairnar@winjit.com",
        password: "Rohit@123",
      },
    };

    const response = await appTester(App.authentication.test, bundle);

    expect(response.status).toBe(200);
    expect(response.request.headers.Authorization).toBe(
      "Basic cm9oaXRraGFpcm5hckB3aW5qaXQuY29tOlJvaGl0QDEyMw=="
    );
  });

  ////////////////////////////////////////////
  // testing authentication false credentials
  it("fails on bad auth", async () => {
    const bundle = {
      authData: {
        username: "user",
        password: "badpwd",
        apiKey: "apiKey",
      },
    };

    try {
      await appTester(App.authentication.test, bundle);
    } catch (err) {
      expect(err.message).toContain(
        "The username and/or password you supplied is incorrect"
      );
      return;
    }
    throw new Error("appTester should have thrown");
  });
});
