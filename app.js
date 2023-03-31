/**
 * This program is the main server code which creates the express object, defines
 * the http endpoints, and launches the server.
 * 
 * Implemented by: Jubaer Ahmed Bhuiyan
 * Student ID: 201963519
 */

import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(urlencoded({extended: true}));//incoming objects are strings or arrays

import { create, read_data, update_data, delete_data, deaths } from './controller.js';
import { connectToDB, closeDBConnection } from './db.mjs';

var server;

async function loadDBClient() {
  await connectToDB();
};  
await loadDBClient();


import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/view'));

app.get('/covid/:date', read_data);
app.post('/covid', create);
app.put('/covid/:date', update_data);
app.delete('/covid/:date', delete_data);
app.get('/deaths/:date1.:date2', deaths);
    // start the server
server = app.listen(port, () => {
console.log('Example app listening at http://127.0.0.1:%d', port);
});

// Callback function to capture interrupt signals to close the mongo server
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing Mongo Client.');
  server.close(async function(){
    let msg = await closeDBConnection()   ;
    console.log(msg);
  });
});
