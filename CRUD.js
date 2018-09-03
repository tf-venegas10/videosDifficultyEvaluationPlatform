const assert = require("assert");

exports.getConcepts = (connection, callback) => {
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

exports.getLearningResource = (connection, resourceId, callback) => {
    connection.connect();
    connection.query('SELECT * FROM learning_resources WHERE id=' + resourceId + ';', (err, rows, fields) => {
        if (err) {
            console.log(err);
            throw new Error("Something went wrong with DB");
        }
        if (rows) {
            callback(rows[0]);
            console.log("Concepts obtained");
        }
    });
    connection.end();
};

//Crud that gets ID from DB
exports.getEvaluations = (db, callback, userId) => {
    const dbase = db.db("evaluations"); //here
    let collection = dbase.collection("evaluations");
    try {
        collection.find({"userId": userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            let evaluations = [];
            try {
                if (docs && docs.length > 0) {
                    evaluations = docs[0].evaluations;
                }
                callback(evaluations)
            }
            catch (err) {
                callback(err);
            }
        });
    } catch (e) {
        callback(err);
    }
}

exports.insertEvaluation = (db, callback, userId, evaluation) => {

    const dbase = db.db("evaluations"); //here
    // Get the documents collection
    let collection = dbase.collection("evaluations");
    try {
        collection.find({"userId": userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            let evaluations = [];
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
                    }, (err) => {
                        console.log(err);
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

exports.getConceptsForVideo = (connection, videoId, callback) => {
    connection.connect();
    connection.query('SELECT * FROM concept_resource_association cr join concept c on cr.resource_id=c.id  WHERE resource_id=' + (videoId) + ';', (err, rows, fields) => {
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