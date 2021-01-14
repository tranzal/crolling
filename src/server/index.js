// server/index.js

const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

let dbConfig = {
    user: "WINGSEDU",
    password: "wings_4172",
    connectString: "222.239.73.170:1537/wpms07"
}

oracledb.autoCommit = true;

router.get('/', (req, res) => {

});

module.exports = router;