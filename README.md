# Zapier Platform for sagevfs

#### Some important good to know points that were discovered during Development of this project

- There are 4 main methods zapier-platform provides trigger(on new or update), create (a new or update), search & delete.
- Looping is in beta stage
- Folder structure that zapier recommends
- many more that I forgot will add as I remember...

###### FileStructure

<!-- prettier-ignore -->
<pre>
root
|
|--triggers
|    |--new
|    |    |--Invoice
|    |    |--Customer
|    |    |--Supplier
|    |    |--Receipts
|    |    |--Contacts
|    |
|    |--update
|         |--Invoice
|         |--Customer
|         |--Supplier
|         |--Receipts
|         |--Contacts
|
|--create
|    |--new
|    |--update
|
|--search
|    |--single
|    |--multiple (through loops)
|
|--delete
|    |--single
|    |--multiple (through loops but might be complex)
</pre>

## Completed Quests

> DISCLAIMER : I don't know Javascript.

**STORY LINE** : 20% completed (searches, triggers _{testing left as I ran out of zapier subscription}_ )
_**This doesnt include DLC content.**_

**MAIN QUESTS** :

- [x] figured out how to loop to return multiple queries.
- [x] learnt to write zapier tests and how they work

## TODO:

**STORY LINE**

- [ ] and all other usecases i.e. : Customer, Supplier, Receipts, Payments, Contacts

**MAIN QUESTS**

- [ ] \*VERY IMPORTANT\* : ask if the contents of lines [array] variable is important and if it should be included in the returning result (cause half of the variables are already there) as the functions will be needed to be modified accordingly.

**SIDE QUEST**

- [ ] rename or define outputs in all functions if required [phase 1.5 😛]

- [ ] While testing, test the search invoice method with invoice ID, because the response with and without ID parameter are different. (might turn out helpful)

- [ ] Add link to postman collection

- [ ] try and use filters to return the latest invoice in get/search invoices (optional but will be efficient and maybe even solution to some problems)

> `http://[API URL]/api/[ver]/customer/Get?$skip=2&$top=20&$orderby=ID&apikey=39478ac6-ac2a-44d8-a31c-7e7e14af4de3&companyid=1`} quoted from [DeveloperProgram API](https://accounting.sageone.co.za/Marketing/DeveloperProgram.aspx)

**DLC**

- [ ] create & update for all will be second phase so not working right now.
