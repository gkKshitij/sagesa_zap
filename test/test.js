/* globals describe, it, expect */

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);
const should = require("should"); // required to use .exist()
////////////////////////////////////////////
/* globals describe, it */

// const zapier = require("zapier-platform-core");

// const App = require("../index");
// const appTester = zapier.createAppTester(App);
//////////////////////////////////////////////

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

///////////////////////////////////////////////////
describe("searches", () => {
  describe("search invoice", () => {
    it("should find a invoice", (done) => {
      const bundle = {
        authData: {
          username: "rohitkhairnar@winjit.com",
          password: "Rohit@123",
        },
        inputData: {
          //   style: "style 2",
          companyid: 528617,
          // ID: 1497709240,
        },
      };

      appTester(App.searches.invoice.operation.perform, bundle)
        .then((results) => {
          results.length.should.be.aboveOrEqual(1);

          // console.log(results);

          // const firstInvoice = results[0];
          // console.log("in test");
          // console.log(firstInvoice);

          firstInvoice.TaxReference.should.eql("999999999");

          // firstInvoice.companyid.should.eql("528617");
          // firstInvoice.ID.should.eql("1497709240");
          // should.exist(firstInvoice.CustomerId); // 39118490
          // should.exist(firstInvoice.description); //apple

          done();
        })
        .catch(done);
    });
  });
});

///////////////////////////////////////////
