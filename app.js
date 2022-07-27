// Import Express
const express = require("express");

// Import EJS Layout
const expressLayouts = require("express-ejs-layouts");

// Import Router frontend.js
const frontendRouter = require("./routes/frontend");

// Create express object
const app = express();

// กำหนด Folder สำหรับบอกตัว express ว่าไฟล์ css , images อยู่ path ไหน
app.use(express.static("assets"));

// กำหนด Template Engine
app.use(expressLayouts);
app.set("layout", "./layouts/frontend");
app.set("view engine", "ejs");

// เรียกใช้งาน Routes
app.use("/", frontendRouter);

// Run Express Server ที่ Port 5000
app.listen(5000, () => {
  console.log("Server run at port 5000");
});
