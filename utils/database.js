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

    connect = () => {
        this.connection = this.mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.db
        });

        return new Promise((resolve, reject) => {
            this.connection.connect((error) => {
                if (error) {
                    return reject(error);
                }
                return resolve("OK");
            });
        });
    };

    disconnect = () => {
        return new Promise((resolve, reject) => {
            this.connection.end((error) => {
                if (error) {
                    return reject(error);
                }
                return resolve("OK");
            });
        });
    };

    getShoppinglists = (userId) => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `shoppinglist` WHERE `owner` = ? ORDER BY id DESC', [userId], (error, results, fields) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ lists: results });
            });
        });
    };

    addNewList = (userId, title) => {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO shoppinglist (title, owner) VALUES (?, ?)', [title, userId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ lists: results });
            });
        });
    };

    addNewItem = (listId, itemText) => {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO shoppingitem (title, list_id) VALUES (?, ?)', [itemText, listId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ lists: results });
            });
        });
    };

    /**
     * Get all item of given shoppinglist
     */
    getAllItems = (listId) => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * from shoppingitem where list_id = (?)', [listId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ items: results });
            });
        });
    };

    /**
     * Delete a item 
     */
    deleteItem = (id) => {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE from shoppingitem where id = (?)', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ items: results });
            });
        });
    };

    /**
     * Delete all related items of a list
     */
     deleteListItems = (id) => {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE from shoppingitem where list_id = (?)', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ items: results });
            });
        });
    };

    /**
     * Delete a list
     */
     deleteList = (id) => {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE from shoppinglist where id = (?)', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ items: results });
            });
        });
    };

    /**
     * Change item status (complete, incomplete)
     * @param {*} id 
     * @returns 
     */
    changeItemStatus = (id, status) => {
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE shoppingitem SET status=(?) WHERE id = (?)', [status, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve({ result: results });
            });
        });
    };
}

export { Database };
