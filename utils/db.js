import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

const queryDatabase = (type) => {
    return new Promise((resolve, reject) => {
        let tableName = '';
        let idName;

        switch (type) {
            case 'users':
                tableName = 'wp_users';
                idName = 'ID';
                break;
            case 'posts':
                tableName = 'wp_posts';
                idName = 'ID';
                break;
            case 'comments':
                tableName = 'wp_comments';
                idName = 'comment_id';
                break;
            case 'terms':
                tableName = 'wp_terms';
                idName = 'term_id';
                break;
            default:
                reject('Invalid type');
                return;
        }

        const query = `SELECT * FROM ${tableName} ORDER BY ${idName} ASC`;
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};


const queryDatabaseForMetadata = (type, id) => {
    return new Promise((resolve, reject) => {
        let tableName;
        let idName;

        switch (type) {
            case 'users':
                tableName = 'wp_usermeta';
                idName = 'user_id';
                break;
            case 'posts':
                tableName = 'wp_postmeta';
                idName = 'post_id';
                break;
            case 'comments':
                tableName = 'wp_commentmeta';
                idName = 'comment_id';
                break;
            case 'terms':
                tableName = 'wp_termmeta';
                idName = 'term_id';
                break;
            default:
                reject('Invalid type');
                return;
        }

        const query = `SELECT * FROM ${tableName} WHERE ${idName} = ?`;

        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};

export { queryDatabase, queryDatabaseForMetadata };