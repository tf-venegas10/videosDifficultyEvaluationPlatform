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

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * Function that retrieves all the specified learning resources defined the research constraints
 * @param connection The connection to the db that contains all the information of the learning resources
 * @param callback A function to send the result to the client
 * @param educationlevel level or course of the user
 */
exports.getLearningResources = (connection,educationlevel, callback) => {
    connection.connect();
    //Courses: algorithms-part1, intro-programming, JAVA programming design principles
    if(educationlevel<3) {
        connection.query('SELECT L.ID FROM (VIDEO_QUALIFICATION Q INNER JOIN LEARNING_RESOURCES L ON Q.VIDEO_ID = L.ID) ' +
            'INNER JOIN VIDEO_DURATION D ON D.VIDEO_ID=Q.VIDEO_ID ' +
            'WHERE QUALIFICATION_AMOUNT<3 AND ( ID BETWEEN 3246 AND 3297 OR ID BETWEEN 5403 AND 5473 OR ID BETWEEN 875 AND 980) AND D.VALUE<8 AND D.VALUE>4;', (err, rows, fields) => {
            if (err) {
                console.log(err);
                throw new Error("Something went wrong with DB");
            }
            if (rows) {
                console.log("RESOURCES OBTAINED");
                let ids = [];
                rows.forEach((r) => {
                    ids.push(r.ID);
                });
                ids = shuffle(ids);
                let res = {};
                res.ids = ids;
                callback(res);
            }
        });
        connection.end();
    }
    else if(educationlevel<5) {
        connection.query('SELECT L.ID FROM (VIDEO_QUALIFICATION Q INNER JOIN LEARNING_RESOURCES L ON Q.VIDEO_ID = L.ID) ' +
            'INNER JOIN VIDEO_DURATION D ON D.VIDEO_ID=Q.VIDEO_ID ' +
            'WHERE QUALIFICATION_AMOUNT<3 AND (ID BETWEEN 5126 AND 5172 ' +
            'OR ID BETWEEN 3246 AND 3297 OR ID BETWEEN 5403 AND 5473 OR ID BETWEEN 875 AND 980) AND D.VALUE<8 AND D.VALUE>4;', (err, rows, fields) => {
            if (err) {
                console.log(err);
                throw new Error("Something went wrong with DB");
            }
            if (rows) {
                console.log("RESOURCES OBTAINED");
                let ids = [];
                rows.forEach((r) => {
                    ids.push(r.ID);
                });
                ids = shuffle(ids);
                let res = {};
                res.ids = ids;
                callback(res);
            }
        });
        connection.end();
    }
    else if(educationlevel<7){
        connection.query('SELECT L.ID FROM (VIDEO_QUALIFICATION Q INNER JOIN LEARNING_RESOURCES L ON Q.VIDEO_ID = L.ID) ' +
            'INNER JOIN VIDEO_DURATION D ON D.VIDEO_ID=Q.VIDEO_ID ' +
            'WHERE QUALIFICATION_AMOUNT<3 AND (ID BETWEEN 5173 AND 5233 ' +
            'OR ID BETWEEN 5173 AND 5233 OR ID BETWEEN 715 AND 758) AND D.VALUE<8 AND D.VALUE>4;', (err, rows, fields) => {
            if (err) {
                console.log(err);
                throw new Error("Something went wrong with DB");
            }
            if (rows) {
                console.log("RESOURCES OBTAINED");
                let ids = [];
                rows.forEach((r) => {
                    ids.push(r.ID);
                });
                ids = shuffle(ids);
                let res = {};
                res.ids = ids;
                callback(res);
            }
        });
        connection.end();
    }
    else {
        connection.query('SELECT L.ID FROM (VIDEO_QUALIFICATION Q INNER JOIN LEARNING_RESOURCES L ON Q.VIDEO_ID = L.ID) ' +
            'INNER JOIN VIDEO_DURATION D ON D.VIDEO_ID=Q.VIDEO_ID ' +
            'WHERE QUALIFICATION_AMOUNT<3 AND (ID BETWEEN 5234 AND 5276 ' +
            'OR ID BETWEEN 5173 AND 5233 OR ID BETWEEN 653 AND 655' +
            ' OR ID BETWEEN 666 AND 668 OR ID BETWEEN 715 AND 758) AND D.VALUE<8 AND D.VALUE>4;', (err, rows, fields) => {
            if (err) {
                console.log(err);
                throw new Error("Something went wrong with DB");
            }
            if (rows) {
                console.log("RESOURCES OBTAINED");
                let ids = [];
                rows.forEach((r) => {
                    ids.push(r.ID);
                });
                ids = shuffle(ids);
                let res = {};
                res.ids = ids;
                callback(res);
            }
        });
        connection.end();
    }
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
};

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
    let quer = 'SELECT * FROM concept_resource_association cr join concept c on cr.concept_id=c.id  WHERE cr.resource_id=' + (videoId) + ';';
    connection.query(quer, (err, rows, fields) => {
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