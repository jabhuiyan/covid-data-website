/**
 * This program contains a class CovidData which is
 * responsible for mapping data records from the database
 * to javascript objects, and also contains static methods 
 * to perform mongodb operation to perform the mapping for
 * specific records.
 * 
 * Implemented by: Jubaer Ahmed Bhuiyan
 * Student ID: 201963519
 */

import { getDb } from './db.mjs';

async function _get_covid_collection (){
    let db = await getDb();
    return await db.collection('canada');
};


export class CovidData {
    constructor(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths){
        this.iso_code = iso_code;
        this.continent = continent;
        this.location = location;
        this.date = date;
        this.total_cases = total_cases;
        this.new_cases = new_cases;
        this.total_deaths = total_deaths;
        this.new_deaths = new_deaths;
    }

    /**
     * A method that saves a new record to the collection
     */
    async save(){
        try {
            let collection = await _get_covid_collection();
            let mongoObj = await collection.insertOne(this);
            console.log('Inserted in the database with id -> '+mongoObj.insertedId);
            return 'Successfully added to database!'
        } catch (err) {
            console.log("Something went wrong at save()");
            throw err
        }
    }

    /**
     * A method that finds a record of a specific date
     * @param {String} date - The specified date
     * @returns - An array with the collection document, if matched
     */
    static async getData(date){
        let collection = await _get_covid_collection();
        let mongoObj = await collection.findOne({"date": date});
        var arr = [];
        if (mongoObj !== null) {
            arr.push(mongoObj);
            console.log('Found the data at getData()');
        } else {
            arr = [];
            console.log('No data exists for this date yet');
        }
        return arr
    }

    /**
     * A method that updates the record of a specific date
     * @param {String} date - The given date
     * @param {CovidData} new_data - The update version of the record that will replace the old one
     * @returns A message confirming the update was successful/unsuccessful
     */
    static async update(date, new_data){
        let collection = await _get_covid_collection();
        // since the data is of Canada's, the only values that
        // would be updated are _cases and _deaths
        let new_vals = {$set: {'new_cases': new_data.new_cases, 'new_deaths': new_data.new_deaths, 'total_cases': new_data.total_cases, 'total_deaths': new_data.total_deaths}};
        let obj = await collection.updateOne({'date': date}, new_vals)
        if (obj.modifiedCount > 0){
            console.log('Updated ' + obj.modifiedCount + ' record(s)');
            return 'Successfully updated.';
        }else{
            console.log('Update unsuccessful at update()');
            return 'Not updated'
        }        
    }

    /**
     * A method that deletes the record of a given date
     * @param {String} date - The specific date
     * @returns A confirmation message of deletion or missing data
     */
    static async delete(date){
        let collection = await _get_covid_collection();
        let obj = await collection.deleteOne({'date': date})
        if (obj.deletedCount > 0){
            console.log('Deleted ' + obj.deletedCount + 'record(s)');
            return 'Contact was deleted.'
        }else{
            console.log('Delete failed at delete()');
            return 'Contact was not found'
        }
    }

    
}

// export the class
const _CovidData = CovidData;
export {_CovidData as Covid };
