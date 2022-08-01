// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: "invoice",

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: "Invoice",
  display: {
    label: "Create Invoice",
    description: "Creates a new invoice.",
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {
        key: "directions",
        required: true,
        type: "text",
        helpText: "Explain how should one make the invoice, step by step.",
      },
      {
        key: "style",
        required: false,
        type: "string",
        helpText: "Explain what style of cuisine this is.",
      },
    ],
    perform: (z, bundle) => {
      const promise = z.request({
        url: "https://accounting.sageone.co.za/api/2.0.0/TaxInvoice/Save?useSystemDocumentNumber={useSystemDocumentNumber}",

        // Put the search value in a query param. The details of how to build
        // a search URL will depend on how your API works.
        options: {
          params: {
            companyid: bundle.inputData.companyid,
            apiKey: bundle.inputData.apiKey,
            id: bundle.inputData.id,

            // $filter: "Counter eq '".concat(bundle.inputData.counter, "'"),
          },
        },

        method: "POST",
        body: {
          name: bundle.inputData.name,
          directions: bundle.inputData.directions,
          authorId: bundle.inputData.authorId,
          style: bundle.inputData.style,
        },

        headers: {
          "content-type": "application/json",

          // This is NOT how you normally do authentication. This is just to demo how to write a create here.
          // Refer to this doc to set up authentication:
          // https://zapier.github.io/zapier-platform-cli/#authentication
          "X-API-Key": "secret",
        },
      });

      return promise.then((response) => response.data);
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      DueDate: "2022-07-31T00:00:00Z",
      FromDocument: "SO0000012",
      FromDocumentId: 1497706259,
      FromDocumentTypeId: 13,
      Status: "Unpaid",
      AllowOnlinePayment: true,
      Paid: false,
      Locked: false,
      CustomerId: 39118490,
      CustomerName: "cust 01",
      Modified: "2022-07-07T12:00:56.18",
      Created: "2022-07-07T12:00:56.18",
      ID: 1497709240,
      Date: "2022-07-07T00:00:00Z",
      Inclusive: false,
      DiscountPercentage: 0.0,
      TaxReference: "",
      DocumentNumber: "INV0000009",
      Reference: "",
      Message: "",
      Discount: 0.0,
      Exclusive: 12.0,
      Tax: 1.8,
      Rounding: 0.0,
      Total: 13.8,
      AmountDue: 13.8,
      PostalAddress01: "",
      PostalAddress02: "",
      PostalAddress03: "",
      PostalAddress04: "",
      PostalAddress05: "",
      DeliveryAddress01: "",
      DeliveryAddress02: "",
      DeliveryAddress03: "",
      DeliveryAddress04: "",
      DeliveryAddress05: "",
      Printed: false,
      Editable: true,
      HasAttachments: false,
      HasNotes: false,
      HasAnticipatedDate: false,
      Lines: [
        {
          SelectionId: 58993542,
          TaxTypeId: 5984275,
          ID: 1032023820,
          Description: "apple",
          LineType: 0,
          Quantity: 1.0,
          UnitPriceExclusive: 12.0,
          Unit: "",
          UnitPriceInclusive: 13.8,
          TaxPercentage: 0.15,
          DiscountPercentage: 0.0,
          Exclusive: 12.0,
          Discount: 0.0,
          Tax: 1.8,
          Total: 13.8,
          Comments: "",
          UnitCost: 10.0,
        },
      ],
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    // outputFields: [
    //   { key: "id", label: "ID" },
    //   { key: "createdAt", label: "Created At" },
    //   { key: "name", label: "Name" },
    //   { key: "directions", label: "Directions" },
    //   { key: "authorId", label: "Author ID" },
    //   { key: "style", label: "Style" },
    // ],
  },
};
