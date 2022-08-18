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

router.get("", (req, res) => {
  res.render("pages/backend/dashboard", {
    title: "Dashboard",
    heading: "Dashboard",
    layout: "./layouts/backend",
  });
});

// CRUD Category ================================================
// Read Category อ่านดาต้าเบส
router.get("/category", async (req, res) => {
  const category = await db
    .collection("category")
    .find({})
    .sort({ CategoryID: -1 })
    .toArray();
  //   res.json(category);

  res.render("pages/backend/category", {
    title: "Category",
    heading: "Category",
    layout: "./layouts/backend",
    data: category,
    moment: moment,
  });
});

// Create Category
router.get("/create_category", (req, res) => {
  res.render("pages/backend/create_category", {
    title: "Create Category",
    heading: "Create Category",
    layout: "./layouts/backend",
  });
});

// Create Category POST
router.post("/create_category", async (req, res) => {
  //การอ่านหมายเลข CategoryID ล่าสุด
  const category = await db
    .collection("category")
    .findOne({}, { sort: { CategoryID: -1 }, limit: 1 }); //เลขเรียงจากมากไปน้อย เอามา1 รายการ
  const categoryID = category.CategoryID + 1;
  //   console.log(category.CategoryID); //แสดงค่าเลข ID ตัวสุดท้าย
  //   return 0;//รันคำสั่งสุดท้าย แทนการกด//

  // รับค่าจากฟอร์ม
  //   let CategoryID = req.body.CategoryID; //ถ้าสร้างรับค่สตัวเลขสุดท้ายและ+1 มาแล้วไม่ต้องสร้าง
  let CategoryName = req.body.CategoryName;
  let CategoryStatus = req.body.CategoryStatus;
  let curdatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  let errors = false;

  // console.log(CategoryID+CategoryName+CategoryStatus)
  // Validate ฟอร์มว่าป้อนข้อมูลครบหรือยัง
  if (CategoryName.length === 0 || CategoryStatus === "") {
    errors = true;
    // แสดงข้อความแจ้งเตือน
    req.flash("error", "ป้อนข้อมูลในฟิลด์ให้ครบก่อน");
    // ให้ทำการ reload ฟอร์ม
    res.render("pages/backend/create_category", {
      title: "Create Category",
      heading: "Create Category",
      layout: "./layouts/backend",
    });
  } else {
    // Insert to mongodb
    await db.collection("category").insertOne({
      CategoryID: categoryID,
      CategoryName: CategoryName,
      CategoryStatus: parseInt(CategoryStatus),
      CreatedDate: curdatetime,
      ModifiedDate: curdatetime,
    });

    // แสดงข้อความแจ้งเตือน
    req.flash("success", "เพิ่มหมวดหมู่สินค้าเรียบร้อยแล้ว");

    res.render("pages/backend/create_category", {
      title: "Create Category",
      heading: "Create Category",
      layout: "./layouts/backend",
    });
  }
});

// Edit Category
router.get("/edit_category/:id", async (req, res) => {
  const objID = new objectId(req.params.id);
  const category = await db
    .collection("category")
    .find({ _id: objID })
    .toArray();

  res.render("pages/backend/edit_category", {
    title: "Edit Category",
    heading: "Edit Category",
    layout: "./layouts/backend",
    data: category,
  });
});

// CRUD Product ================================================
// Read Product
router.get("/products", async (req, res) => {
  // const products = await db.collection('products').find({}).toArray()

  // Lookup from category and products collection
  const products = await db
    .collection("category")
    .aggregate([
      {
        $lookup: {
          from: "products",
          localField: "CategoryID",
          foreignField: "CategoryID",
          as: "products",
        },
      },
      {
        $match: {
          products: { $ne: [] },
        },
      },
    ])
    .toArray();

  // res.json(products)

  res.render("pages/backend/products", {
    title: "Products",
    heading: "Products",
    layout: "./layouts/backend",
    data: products,
  });
});

// Create Product
router.get("/create_product", (req, res) => {
  res.render("pages/backend/create_product", {
    title: "Create Product",
    heading: "Create Product",
    layout: "./layouts/backend",
  });
});

// Edit Product
router.get("/edit_product", (req, res) => {
  res.render("pages/backend/edit_product", {
    title: "Edit Products",
    heading: "Edit Products",
    layout: "./layouts/backend",
  });
});

module.exports = router;
