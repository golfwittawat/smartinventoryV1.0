// Import Express
const express = require('express')

const router = express.Router()

router.get('', (req,res) => {
    res.render('pages/frontend/index', {title: 'Home'})
})

router.get('/about', (req,res) => {
    res.render('pages/frontend/about', {title: 'About'})
})

router.get('/login',(req, res)=>{
    res.render(
        'pages/frontend/login', 
        { 
            title: 'เข้าสู่ระบบ', 
            layout: './layouts/authen'
        }
    )
})

router.get('/register',(req, res)=>{
    res.render(
        'pages/frontend/register', 
        { 
            title: 'สมัครสมาชิก', 
            layout: './layouts/authen'
        }
    )
})

router.get('/forgotpassword',(req, res)=>{
    res.render(
        'pages/frontend/forgotpassword', 
        { 
            title: 'ลืมรหัสผ่าน', 
            layout: './layouts/authen'
        }
    )
})


module.exports = router