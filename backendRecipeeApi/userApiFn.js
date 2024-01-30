const conn = require('./connection.js');
// --------------table schema generation

conn.pool.query('CREATE TABLE  IF NOT EXISTS users(user_id SERIAL Primary key,name varchar(100) not null, email varchar(100) not null, username  VARCHAR(100) NOT NULL,password varchar(100)  Not NULL)',
    (err, result) => {
        if (err) {
            console.log('error while table creation :', err);
        } else {
            console.log('table user created');
        }
    })



//-------select all employees-----

const GetAllUsers = (key, value) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM users';
        console.log(key, ":", value);
        if (key && value) {
            query += ` WHERE ${key} = '${value}'`;
        }

        conn.pool.query(query, (error, response) => {
            if (error) {
                console.log('ERROR: at the time of all user selection:', error);
                reject(error);
            } else {
                resolve(response.rows);
            }
        });
    });
};


// add new user
const AddUser = (requestBody) => {
    return new Promise(async (resolve, reject) => {

        console.log("enter in adduser function");
        const { name,email ,username , password } = requestBody; 
         // check user already exist or not
        const userexist = await GetAllUsers("username", username);
        const emailexist = await GetAllUsers("email", email);
       
        console.log("username Exist length :",userexist.length)
        console.log("email Exist length :",emailexist.length)

        if (userexist.length != 1 && emailexist.length != 1) {
            let query = `INSERT INTO users(name ,email,username,password)
                VALUES ($1, $2,$3,$4) RETURNING *;`

            conn.pool.query(query, [name,email, username, password], (error, response) => {
                if (error) {
                    console.log('ERROR: at user insertion:', error);
                    reject(error);
                } else {
                    resolve(response.rows);
                }
            });
        } else {
            if(userexist.length ==1 ){
            reject({ Error: "username alredy exist" });
            }else{
                reject({ Error: "email  alredy exist" });
            }
        }
    });
};

module.exports = {
    GetAllUsers, AddUser
}





