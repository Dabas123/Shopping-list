class Database {

    constructor() {
        this.mysql = require('mysql2');
        this.connection = null;
        this.host = process.env.DB_host;
        this.port = process.env.DB_port;
        this.db = process.env.DB_db;
        this.user = process.env.DB_user;
        this.password = process.env.DB_password;
    }

    connect = () =>{
        this.connection = this.mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.db
        });

        return new Promise((resolve, reject)=>{
            this.connection.connect((error)=>{
                if(error){
                    return reject(error);
                }
                return resolve("OK");
            });
        });
    };

    disconnect = () =>{ 
        return new Promise((resolve, reject)=>{
            this.connection.end((error)=>{
                if(error){
                    return reject(error);
                }
                return resolve("OK");
            });
        });
    };

    getShoppinglists = (userId) =>{ 
        return new Promise((resolve, reject)=>{
            this.connection.query('SELECT * FROM `shoppinglist` WHERE `owner` = ?', [userId] ,(error, results, fields)=>{
                if(error){
                    return reject(error);
                }
                return resolve({lists: results});
            });
        });
    };

    addNewList = (userId, title) =>{ 
        return new Promise((resolve, reject)=>{
            this.connection.query('INSERT INTO shoppinglist (title, owner) VALUES (?, ?)', [title, userId] ,(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve({lists: results});
            });
        });
    };
}

export { Database };
