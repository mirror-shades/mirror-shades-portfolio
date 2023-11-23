import fs from 'fs';

let db: any = {};  // This is your JSON database

export function updateDB(id: string, tokens: number) {
    // Check if id exists in the database
    if (db.hasOwnProperty(id)) {
        // If id exists, update the number
        db[id] = tokens;
    } else {
        // If id does not exist, add the id and the number to the database
        db[id] = tokens;
    }
    
    // Persist database
    fs.writeFile('db.json', JSON.stringify(db), (err: any) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    return db;  // Return the updated database
}