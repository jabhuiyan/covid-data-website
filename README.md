# covid-data-website

----------------------------------------
implementation of a javascript server and its client side to access a MongoDB database containing Canadian covid data. Canadian covid data has been taken from <https://ourworldindata.org/coronavirus> and provided in the data file `can.csv`.

The repository contains the following:

### can.csv

The covid data file.

### package.json

The package informations and type module of the files.

### db.mjs

This program creates and maintains a connection to the mongodb server

### covid.mjs

This program contains a class CovidData which is responsible for mapping data records from the database to javascript objects, and also contains static methods to perform mongodb operation to perform the mapping for specific records.

### controller.js

This program contains the the endpoint functions for express request-response definitions.

### app.js

This program is the main server code which creates the express object, defines the http endpoints, and launches the server.

### test

_folder that contains unit tests for the application_
- #### tests.js
- A Mocha unit test program with  five client-side test applications: one test for each of the standard CRUD operations performed on a single record invoked as an http request to the server; and a fifth test that reports the number of deaths between two given dates.

### view

_folder that contains the client side of the application website_
- #### js
A folder of javascript files that manage the functions of the tabs and buttons in the webpage. Contains:
   - ##### deaths.js (This program manages the total deaths count in the Deaths tab.)
   - ##### list.js (This program manages the components of the READ, UPDATE and DELETE functions from the Retrieve tab.)
   - ##### main.js (This script adds the main behavior of the tabs.)


- #### index.html

The html structure of the webpage

- #### style.css

The styling of the webpage

----------------------------------------
## Running the files
----------------------------------------

#### server side:

Note: The files are dependent on the packages 'express', 'mongodb', 'axios' and 'mocha'. The data can be uploaded to MongoDB by choosing the directory that has the data file in it and then typing the following in a terminal:
 
               $ mongoimport --db=covid --type=csv --headerline --collection=canada can.csv


_The files can be run by choosing this folder as a directory in a terminal and then:_

1. first the mongo server has to be run using:

               $ sudo systemctl start mongod
    
2. once the data has been imported on Mongo, run the javascript server using:

               $ node app.js

3. once the server is connected succesfully, the test can be run from another terminal by using:

               $ npm test

#### client side:

After running the surver successfully, head over to http://127.0.0.1:3000/ in a browser. Click on the "Retrieve" tab to perform the C(R)(U)(D) operations; and click on the "Deaths" tab to find the number of total deaths between a starting date and an ending date.

_Note: Dates must be placed in the text boxes in the following format YYYY-MM-DD_

## Attributions

1. _Contacts v5 by Amilcar Soares (link: http://www.cs.mun.ca/~brown/3100/Soares/contacts-v5ES6.zip), overall design implementation_
2. _Prof B's Student Q&A discord, with tips and discussion of Professor Edward Brown_
