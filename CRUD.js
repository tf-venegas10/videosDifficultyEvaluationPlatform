//const assert = require("assert");

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

exports.insertEvaluation = (db, callback, userId, evaluation) => {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("evaluations");
    try {
        collection.find({"userId": userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let challenges = [];
            try {

                if (docs && docs.length > 0) {
                    evaluations = docs[0].evaluations;
                }

                evaluations.push(evaluation);
                collection.updateOne({userId: userId}
                    , {$set: {evaluations: evaluations}}, {upsert: true},
                    function (err, result) {
                        assert.equal(err, null);
                        assert.equal(1, result.result.n);
                        console.log("Added evaluations");
                        callback(result);
                    });
            }
            catch (err) {
                callback(err);
            }


        });
    }
    catch (err) {
        try {

            dbase.createCollection("evaluations", {size: 2148});
            collection = dbase.collection("evaluations");
            console.log(collection);
            collection.updateOne({userId: userId}
                , {$set: {evaluations: [evaluation]}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added evaluation");
                    callback(result);
                });
        }
        catch (err) {
            callback(err);

        }

    }
};