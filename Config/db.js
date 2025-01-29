const mssql = require('mssql');

const dbConfig = {
    user: "sa",
    password: "sas",
    server: "DESKTOP-Q14UK2C",
    database: "work_item",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }

}


const executeQuery = async (query, params = {}) => {

    // Create a Pool connection
    let pool;

    try {
        pool = await mssql.connect(dbConfig);
        const request = pool.request();

        for (const [key, values] of Object.entries(params)) {
            request.input(key, values);
        }
        const result = await request.query(query);
        // console.log(result)
        return result;

    } catch (error) {
        console.log(error.message, "db");
        throw error


    } finally {
        if (pool) await pool.close();
    }


}

module.exports = executeQuery
// executeQuery();