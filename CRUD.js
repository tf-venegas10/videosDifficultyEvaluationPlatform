exports.getConcepts = (connection, callback)=>{
    connection.connect();
    connection.query('SELECT * FROM concept;', (err, rows, fields) => {
        if (err) {
            console.log(err);
            throw new Error("Something went wrong with DB");
        }
        if (rows) {
            callback(rows);
            console.log("Concepts obtained");
        }
    });
    connection.end();
};

exports.getLearningResource = (connection, resourceId,callback)=>{
    connection.connect();
    connection.query('SELECT * FROM learning_resources WHERE ID='+resourceId+';', (err, rows, fields) => {
        if (err) {
            console.log(err);
            throw new Error("Something went wrong with DB");
        }
        if (rows) {
            callback(rows);
            console.log("Concepts obtained");
        }
    });
    connection.end();
};