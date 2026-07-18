const db = require("../models/db");

exports.getUsers = (req, res) => {

    db.query("SELECT * FROM users", (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

exports.addUser = (req, res) => {

    const { name, email } = req.body;

    db.query(
        "INSERT INTO users(name,email) VALUES(?,?)",
        [name, email],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "User Added"
            });

        }
    );

};