// Import Express
const express = require("express");

// Import Moment เพื่อไว้จัดรูปแบบวันที่
const moment = require("moment");

//Import OjectID ของMongoDB
const objectId = require("mongodb").ObjectId;

const router = express.Router();

// Import mongodb_dbconfig
const { connectDb, getDb } = require("../config/mongdb_dbconfig");
var db;
connectDb(() => (db = getDb()));

// CRUD Category ================================================
// Read Category อ่านดาต้าเบส
router.get("/categories", async (req, res) => {
    const categories = await db
      .collection("category")
      .find({})
      .sort({ CategoryID: -1 })
      .toArray();
      res.json(categories);
  });

  module.exports = router;