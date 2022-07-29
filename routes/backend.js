// Import Express
const express = require('express')

// Import Moment เพื่อไว้จัดรูปแบบวันที่
const moment = require('moment')

const router = express.Router()

// Import mongodb_dbconfig
const { connectDb, getDb } = require('../config/mongdb_dbconfig')
var db
connectDb(() => (db = getDb()))

router.get('',(req, res)=>{
    res.render(
        'pages/backend/dashboard', 
        { 
            title: 'Dashboard', 
            heading: 'Dashboard',
            layout: './layouts/backend'
        }
    )
})

// CRUD Category ================================================
// Read Category
router.get('/category', async (req, res)=>{

    const category = await db.collection('category').find({}).toArray()
    // res.json(category)

    res.render(
        'pages/backend/category', 
        { 
            title: 'Category', 
            heading: 'Category',
            layout: './layouts/backend',
            data: category,
            moment: moment
        }
    )
})

// Create Category
router.get('/create_category',(req, res)=>{
    res.render(
        'pages/backend/create_category', 
        { 
            title: 'Create Category', 
            heading: 'Create Category',
            layout: './layouts/backend'
        }
    )
})

// Create Category POST
router.post('/create_category', async (req, res)=>{

    // รับค่าจากฟอร์ม
    let CategoryID = req.body.CategoryID
    let CategoryName = req.body.CategoryName
    let CategoryStatus = req.body.CategoryStatus
    let curdatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    let errors = false

    // console.log(CategoryID+CategoryName+CategoryStatus)
    // Validate ฟอร์มว่าป้อนข้อมูลครบหรือยัง
    if(CategoryID === '' || CategoryName.length === 0 || CategoryStatus === '')
    {
        errors = true
        // แสดงข้อความแจ้งเตือน
        req.flash('error','ป้อนข้อมูลในฟิลด์ให้ครบก่อน')
        // ให้ทำการ reload ฟอร์ม
        res.render(
            'pages/backend/create_category', 
            { 
                title: 'Create Category', 
                heading: 'Create Category',
                layout: './layouts/backend'
            }
        )

    }else{
        // Insert to mongodb
        await db.collection('category').insertOne({
            CategoryID: parseInt(CategoryID),
            CategoryName: CategoryName,
            CategoryStatus: parseInt(CategoryStatus),
            CreatedDate: curdatetime,
            ModifiedDate: curdatetime
        })

        // แสดงข้อความแจ้งเตือน
        req.flash('success','เพิ่มหมวดหมู่สินค้าเรียบร้อยแล้ว')

        res.render(
            'pages/backend/create_category', 
            { 
                title: 'Create Category', 
                heading: 'Create Category',
                layout: './layouts/backend'
            }
        )
    }
})

// Edit Category
router.get('/edit_category',(req, res)=>{
    res.render(
        'pages/backend/edit_category', 
        { 
            title: 'Edit Category', 
            heading: 'Edit Category',
            layout: './layouts/backend'
        }
    )
})

router.get('/products',(req, res)=>{
    res.render(
        'pages/backend/products', 
        { 
            title: 'Products', 
            heading: 'Products',
            layout: './layouts/backend'
        }
    )
})


// Create Product
router.get('/create_product',(req, res)=>{
    res.render(
        'pages/backend/create_product', 
        { 
            title: 'Create Product', 
            heading: 'Create Product',
            layout: './layouts/backend'
        }
    )
})

// Edit Product
router.get('/edit_product',(req, res)=>{

    res.render(
        'pages/backend/edit_product', 
        { 
            title: 'Edit Products', 
            heading: 'Edit Products',
            layout: './layouts/backend'
        }
    )
})

module.exports = router