# Zapier Platform for SAGE [SBCA]

#### Some important good to know points that were discovered during Development of this project

- There are 4 main methods zapier-platform provides trigger(on new or update), create (a new or update), search & delete.
- Looping is in beta stage
- In some recent articles on zapier and stackoverflow its mentioned that they disabled polling for trigger actions
  > which means that now it wont automatically scan for changes and we might need to add a webhook to zapier to tell there is an update to trigger the scan
- many more that I forgot will add as I remember...

###### FileStructure/Folder structure that zapier recommends

<!-- prettier-ignore -->
<pre>
root
|
|--triggers
|    |--new
|    |    |--Invoice [Completed][v1.1.3]
|    |    |--Customer [WIP][v1.1.4]
|    |    |--Supplier []
|    |    |--Receipts []
|    |    |--Contacts []
|    |
|    |--update
|         |--Invoice [Completed][v1.1.3]
|         |--Customer [WIP][v1.1.4]
|         |--Supplier []
|         |--Receipts []
|         |--Contacts []
|
|--search
|    |--single
|    |    |--Invoice [Completed][v1.1.3]
|    |    |--Customer [WIP][v1.1.4]
|    |    |--Supplier []
|    |    |--Receipts []
|    |    |--Contacts []
|    |
|    |--multiple (through loops)
|    |    |--Invoice [Completed][v1.1.3]
|    |    |--Customer [WIP][v1.1.4]
|    |    |--Supplier []
|    |    |--Receipts []
|    |    |--Contacts []
|
|--delete [Status & Plan - Unknown]
|    |--single
|    |--multiple (through loops but might be complex)
|
|--create [DLC Content CodeName-POST Name-REDACTED]
|    |--new
|    |--update
</pre>

## Completed Quests

> DISCLAIMER : I don't know Javascript.

**STORY LINE** : 20% completed (searches, triggers _{testing left as I ran out of zapier subscription}_ )
_**This doesn't include DLC content.**_

**MAIN QUESTS** :

- [x] figured out how to loop to return multiple queries.
- [x] learnt to write zapier tests and how they work

## TODO:

**STORY LINE**

- [ ] Add all other usecases i.e. : Customer [WIP v1.1.4], Supplier, Receipts, Payments, Contacts [80% left]

**MAIN QUESTS**

- [ ] \*VERY IMPORTANT\* : ask if the contents of lines [array] variable is important and if it should be included in the returning result (cause half of the variables are already there) as the functions will be needed to be modified accordingly.

**SIDE QUEST**

- [ ] rename or define outputs in all functions if required [phase 1.5 😛]

- [ ] While testing, test the search invoice method with invoice ID, because the response with and without ID parameter are different. (might turn out helpful)

- [ ] Add link to postman collection

- [ ] try and use filters to return the latest invoice in get/search invoices (optional but will be efficient and maybe even solution to some problems)

  > `http://[API URL]/api/[ver]/customer/Get?$skip=2&$top=20&$orderby=ID&apikey=39478ac6-ac2a-44d8-a31c-7e7e14af4de3&companyid=1`} quoted from [DeveloperProgram API](https://accounting.sageone.co.za/Marketing/DeveloperProgram.aspx)

**DLC**

- [ ] create, delete & update for all will be second phase so not working right now.
