const conn = require('./connection.js');
const user = require('./userApiFn');

// --------------table schema generation

conn.pool.query('CREATE TABLE  IF NOT EXISTS recipees(id SERIAL Primary key,user_id integer REFERENCES users(user_id), name  VARCHAR(100) NOT NULL,ingredients text[]  Not NULL, description varchar(500) NOT NULL ,serve numeric Not Null , type varchar(100))',
    (err, result) => {
        if (err) {
            console.log('error while table creation :', err);
        } else {
            console.log('table recipees created');
        }
    })


//get all recipees

const GetAllRecipees = (key, value) => {
    console.log("called getAllRecipess");
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM recipees';
        console.log(key, ":", value);
        if (key && value) {
            query += ` WHERE ${key} = '${value}'`;
        }

        conn.pool.query(query, (error, response) => {
            if (error) {
                console.log('ERROR: at the time of all recipees selection:', error);
                reject(error);
            } else {
                console.log("get recipee result in function :", response.rows);
                resolve(response.rows);
            }
        });
    });
};



// add new Recipee
const AddRecipee = (requestBody) => {
    return new Promise(async (resolve, reject) => {

        console.log("enter in AddRecipee function");
        const { user_id, name, ingredients, description, serve, type } = requestBody;

        let query = `INSERT INTO recipees(user_id, name, ingredients,description,serve,type)
                VALUES ($1, $2,$3,$4,$5,$6) RETURNING *;`
        let values = [user_id, name, ingredients, description, serve, type];

        //execute insert query
        conn.pool.query(query, values, (error, response) => {
            if (error) {
                console.log('ERROR: at recipee insertion:', error);
                reject(error);
            } else {
                resolve(response.rows);
            }
        });

    });
};

//delete function 
const deleteRecipee = (value) => {
    console.log("enter  id :", value);
    return new Promise((resolve, reject) => {

        //******** if id present in database  */

        const query = `DELETE FROM recipees
                WHERE id = ${value} ;`
        conn.pool.query(query, (error, response) => {
            if (error) {
                console.log('ERROR: at the time of recipee deletion :', error);
                reject(error);
            } else {
                console.log(response.rows);
                resolve(response.rows);
            }
        });
    });
}

// Update Recipee
const updateRecipee = (id,requestBody) => {
    return new Promise(async (resolve, reject) => {

        console.log("enter in updateRecipee function");
        const { user_id, name, ingredients, description, serve, type } = requestBody;

        let query = `update recipees set user_id =$1, name =$2, ingredients =$3,description =$4,serve =$5,type =$6
                where id = ${id}`
        let values = [user_id, name, ingredients, description, serve, type];

        //execute insert query
        conn.pool.query(query, values, (error, response) => {
            if (error) {
                console.log('ERROR: at recipee updation:', error);
                reject(error);
            } else {
                resolve(response.rows);
            }
        });

    });
};



//get all recipees by pagination

const GetRecipeesByPagination = (pageNo, pageSize) => {
    return new Promise((resolve, reject) => {

        const offset = (pageNo - 1) * pageSize;
        let query = 'SELECT * FROM recipees LIMIT $1 OFFSET $2';
        console.log(pageNo, ":", pageSize);
       

        conn.pool.query(query,[pageSize,offset], (error, response) => {
            if (error) {
                console.log('ERROR: at the time of all recipees selection:', error);
                reject(error);
            } else {
             
                resolve(response.rows);
            }
        });
    });
};



//get all data of users and recipee table 
const GetAllRecord = (value) => {
    console.log("called getAllRecord");
    return new Promise((resolve, reject) => {
        let query = `SELECT
        r.id AS Recipee_id,
        u.name AS fullname,
        u.username ,
        u.email,
        r.name AS recipee_name,
        r.ingredients ,
        r.description,
        r.serve,
        r.type
    FROM
        recipees AS r
    JOIN
        users AS u ON r.user_id = u.user_id
    WHERE
        r.id = ${value};
    `;
        console.log("key, :", value);
    

        conn.pool.query(query, (error, response) => {
            if (error) {
                console.log('ERROR: at the time of all record selection:', error);
                reject(error);
            } else {
                console.log("get all records result in function :", response.rows);
                resolve(response.rows);
            }
        });
    });
};

module.exports = { GetAllRecipees, AddRecipee, deleteRecipee ,updateRecipee,GetRecipeesByPagination,GetAllRecord}