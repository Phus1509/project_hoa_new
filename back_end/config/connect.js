import mysql from "mysql2"

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    port: 3307,
    password: 'Chau_205',
    database: 'db_hoanew'
});



export { 
    connection
};