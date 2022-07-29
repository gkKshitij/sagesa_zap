/* globals describe, it, expect */

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);
const should = require("should"); // required to use .exist()
////////////////////////////////////////////

// trigger when a new invoice is created
describe("triggers", () => {
  describe("new invoice trigger", () => {
    it("should load invoices", async (done) => {
      const bundle = {
        authData: {
          username: "rohitkhairnar@winjit.com",
          password: "Rohit@123",
        },
        inputData: {
          companyid: 528617,
          apiKey: "{ACD2957E-7585-4607-833E-999E846741A6}",
          // ID: 1497709240,
        },
      };

      // const results = await appTester(
      appTester(App.triggers.invoice.operation.perform, bundle)
        .then((results) => {
          results.length.should.above(0);

          const invoice = results[0];

          console.log("in test");
          console.log(invoice);

          // const firstInvoice = results[0];
          // console.log(firstInvoice);
          // firstInvoice.name.should.eql("name 2");
          // firstInvoice.directions.should.eql("directions 2");
          done();
        })
        .catch(done);
    });

    it("should load invoices without filters", async (done) => {
      const bundle = {
        authData: {
          username: "rohitkhairnar@winjit.com",
          password: "Rohit@123",
        },
        inputData: {
          companyid: 528617,
          apiKey: "{ACD2957E-7585-4607-833E-999E846741A6}",
          // ID: 1497709240,
        },
      };

      appTester(App.triggers.invoice.operation.perform, bundle)
        .then((results) => {
          results.length.should.above(0);

          // const firstInvoice = results[0];
          // firstInvoice.name.should.eql("name 1");
          // firstInvoice.directions.should.eql("directions 1");
          done();
        })
        .catch(done);
    });
  });
});
