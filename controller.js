
/**
 * This program contains the the endpoint functions for express request-response
 * definitions.
 * 
 * Implemented by: Jubaer Ahmed Bhuiyan
 * Student ID: 201963519
 */

import { Covid } from "./covid.mjs";

/**
 * A function for Create operation (C)RUD
 * @param {Request} req - a request object
 * @param {Response} res - a response object
 */
export async function create(req, res) {
    let iso_code = req.body.iso_code;
    let continent = req.body.continent;
    let location = req.body.location;
    let date = req.body.date;
    let total_cases = req.body.total_cases;
    let new_cases = req.body.new_cases;
    let total_deaths = req.body.total_deaths;
    let new_deaths = req.body.new_deaths;

    let new_entry = new Covid(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths);
    let msg = await new_entry.save();
    res.send(msg);

}

/**
 * A function for Read operation C(R)UD
 * @param {Request} req - a request object
 * @param {Response} res - a response object
 */
export async function read_data(req, res){
    let date = req.params.date;
    let obj = await Covid.getData(date);
    if (obj.length > 0) {
        console.log(obj.length+' item(s) sent.');
        res.send(obj[0]);
    } else {
        res.send('No items found!');
    }
}

/**
 * A function for Update operation CR(U)D
 * @param {Request} req - a request object
 * @param {Response} res - a response object
 */
export async function update_data(req, res){
    let date_match = req.params.date;
    let iso_code = req.body.iso_code;
    let continent = req.body.continent;
    let location = req.body.location;
    let date = req.body.date;
    let total_cases = req.body.total_cases;
    let new_cases = req.body.new_cases;
    let total_deaths = req.body.total_deaths;
    let new_deaths = req.body.new_deaths;
    
    let msg = await Covid.update(date_match, new Covid(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths))
    res.send(msg);
}

/**
 * A function for Delete operation CRU(D)
 * @param {Request} req - a request object
 * @param {Response} res - a response object
 */
export async function delete_data(req, res){
    let date_to_delete = req.params.date;
    let msg = await Covid.delete(date_to_delete);
    res.send(msg);
}

/**
 * A function that gives the total number of deaths from date1 to date2
 * @param {Request} req 
 * @param {Response} res 
 */
export async function deaths(req, res){
    const start = req.params.date1;
    const end = req.params.date2;
    let obj1 = await Covid.getData(start);
    let obj2 = await Covid.getData(end);
    
    let death1 = obj1[0].total_deaths
    let death2 = obj2[0].total_deaths
    
    
    if (obj1.length > 0) {
        let msg = (death2 - death1).toString();
        console.log('Found total number of deaths');
        res.send(msg);
    } else {
        console.log('Could not find data');
        res.send('Invalid end date!');
    }
}
