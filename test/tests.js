/**
 * Mocha unit testing for the CRUD functions
 *
 * Implemented by: Jubaer Ahmed Bhuiyan
 * Student ID: 201963519
 */

import { strictEqual } from 'assert';
import axios from 'axios';
const create = axios.create;

var myurl = 'http://127.0.0.1:3000';           
// Let's configure the base url
const instance = create({
    baseURL: myurl,
    timeout: 10000, //10 seconds max
    headers: {'content-type': 'application/json'}
});



describe('Covid app - Tests with Mocha', function(){
  describe('Test Models', function(){
    describe('Test API calls', function(){
      it('Test 1. POST - create a record and add to db', async function(){
        let data = {
          iso_code: 'CAN',
          continent: 'North America',
          location: 'Canada',
          date: '2023-03-10',
          total_cases: 1000,
          new_cases: 50,
          total_deaths: 20,
          new_deaths: 1
        };
        let res_post = await instance.post('/covid', data);
        strictEqual(res_post.data, 'Successfully added to database!');
        let res_del = await instance.delete('/covid/'+data.date);
        strictEqual( res_del.data, 'Contact was deleted.');
      });

      it('Test 2. GET - with an invalid date', async function(){
        let random_date = '2029-04-11';
        let res_get = await instance.get('/covid/'+random_date)
        strictEqual(res_get.data,'No items found!');
      });

      it('Test 3. DELETE - delete a record from db', async function(){
        let random_data = {
          iso_code: 'CAN',
          continent: 'North America',
          location: 'Canada',
          date: '2024-03-10',
          total_cases: 1420,
          new_cases: 69,
          total_deaths: 22,
          new_deaths: 3
        };
        let res_post = await instance.post('/covid', random_data);
        let res_del = await instance.delete('/covid/'+random_data.date);
        strictEqual( res_del.data, 'Contact was deleted.');
      });

      it('Test 4. PUT - update a record', async function(){
        let random_data = {
          iso_code: 'CAN',
          continent: 'North America',
          location: 'Canada',
          date: '2029-03-10',
          total_cases: 1420,
          new_cases: 69,
          total_deaths: 22,
          new_deaths: 3
        };

        let updated_data = {
          iso_code: 'CAN',
          continent: 'North America',
          location: 'Canada',
          date: '2029-03-10',
          total_cases: 1420,
          new_cases: 72,
          total_deaths: 22,
          new_deaths: 3
        }
        let res_post = await instance.post('/covid', random_data);
        let res_up = await instance.put('/covid/'+random_data.date, updated_data);
        strictEqual( res_up.data, 'Successfully updated.');
        let res_get = await instance.get('/covid/'+updated_data.date);
        strictEqual(res_get.data.new_cases, 72);
        let res_del = await instance.delete('/covid/'+updated_data.date);
        strictEqual( res_del.data, 'Contact was deleted.');
      });

      it('Test 5. DEATH - check total number of deaths', async function(){
        let start_date = '2022-01-01';
        let end_date = '2022-01-02';
        let res_get = await instance.get('/deaths/'+start_date+'.'+end_date)
        strictEqual(res_get.data, 30);
      });

    });
  });
  
});
