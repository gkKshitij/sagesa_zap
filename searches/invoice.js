module.exports = {
  key: "invoice",

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: "Invoice",
  display: {
    label: "Find a Invoice",
    description: "Search for invoice by ID.",
  },

  // `operation` is where we make the call to your API to do the search
  operation: {
    // This search only has one search field. Your searches might have just one, or many
    // search fields.
    inputFields: [
      {
        key: "companyid",
        type: "string",
        label: "companyid",
        helpText: "company id = 528617",
      },
      {
        key: "apiKey",
        type: "string",
        label: "apiKey",
        helpText: "{ACD2957E-7585-4607-833E-999E846741A6}",
      },
      {
        key: "ID",
        type: "string",
        label: "Invoice ID",
        helpText: "invoice ID=1497289436",
      },
      // {
      //   key: "&%24orderby=DueDate%20desc",
      //   type: "string",
      //   label: "apiKey",
      //   helpText: "{ACD2957E-7585-4607-833E-999E846741A6}",
      // },
    ],

    perform: (z, bundle) => {
      const url = "https://accounting.sageone.co.za/api/2.0.0/TaxInvoice/Get";

      // Put the search value in a query param. The details of how to build
      // a search URL will depend on how your API works.
      const options = {
        params: {
          //   style: bundle.inputData.style,
          //   ID: bundle.inputData.id,
          companyid: bundle.inputData.companyid,
          apiKey: bundle.inputData.apiKey,

          // $filter: "Counter eq '".concat(bundle.inputData.counter, "'"),

          // below 2 are rather useless
          //   includeDetails: true,
          //   includeCustomerDetails: true,
        },
      };

      // return z.request(url, options).then((response) => response.data.Results);
      //////////////////////////////////////
      return z.request(url, options).then((response) => {
        response.throwForStatus();
        const results = response.json;
        // console.log("invoices results");
        // console.log(results);
        // z.console.log("invoice results");
        // z.console.log(results.Results.length);
        // z.console.log(results);

        const maxlenofloops = results.TotalResults;
        // console.log("maxlenofloops", maxlenofloops);
        let counter = 1;
        const downloads = results.Results.map((item, counter) => {
          counter = counter++;
          // maxlenofloops = maxlenofloops;

          return Object.assign(item, {
            counter,
            maxlenofloops,
            // _id: item.id, // Real item id
          });
        });

        // console.log(downloads);
        // console.log("downloads");
        return downloads;
      });
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
    /////////////////////////////////
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
