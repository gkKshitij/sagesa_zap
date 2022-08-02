const listInvoice = async (z, bundle) => {
  // `z.console.log()` is similar to `console.log()`.
  // z.console.log("console says hello world!");

  const params = {
    companyid: bundle.inputData.companyid,
    apiKey: bundle.inputData.apiKey,
    // id: bundle.inputData.id,
  };
  //   if (bundle.inputData.style) {
  //     //// TODO: use this method for single invoice maybe
  //     params.style = bundle.inputData.style;
  //   }

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const requestOptions = {
    url: "https://accounting.sageone.co.za/api/2.0.0/TaxInvoice/Get",
    params: params,
  };

  ///////////////////////////
  // z.request() returns an HTTP Response Object https://github.com/zapier/zapier-platform/tree/master/packages/cli#http-response-object
  // const response = await z.request(requestOptions);

  //   return response.data;
  ///////////////////////////////

  return z.request(requestOptions).then((response) => {
    response.throwForStatus();
    const results = response.json.Results;
    // z.console.log("response");
    // z.console.log(response);

    // // if id is missing in json but sage maybe has one
    const downloads = results.map((item) => {
      const id = item.ID;
      return Object.assign(item, {
        id,
        // _id: item.id, // Real item id
      });
    });

    // console.log(downloads);
    // console.log("downloads");
    return downloads;
  });
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: "invoice",

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: "Invoice",
  display: {
    label: "New Invoice",
    description: "Triggers when a new invoice is added.",
  },

  // `operation` is where the business logic goes.
  operation: {
    // `inputFields` can define the fields a user could provide,
    // we'll pass them in as `bundle.inputData` later.
    // inputFields: [
    //   {
    //     key: "style",
    //     type: "string",
    //     helpText: "Which styles of cuisine this should trigger on.",
    //   },
    // ],
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
      // {
      //   key: "id",
      //   type: "string",
      //   label: "Invoice ID",
      //   helpText: "invoice ID=1497289436",
      // },
      // {
      //   key: "&%24orderby=DueDate%20desc",
      //   type: "string",
      //   label: "apiKey",
      //   helpText: "{ACD2957E-7585-4607-833E-999E846741A6}",
      // },
    ],

    perform: listInvoice,

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
    //   outputFields: [
    //    () => { return []; }
    //   ]
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields.
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
