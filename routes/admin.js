const express = require('express');
const adminMiddleware = require('../middleware/admin')
const {Admin , User, Course} = require('../db')
const {JWT_SECRET} = require("../config");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post('/signup', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

   await  Admin.create({
        username,
        password
    })
    
    res.json({
        msg : "Admin Created Successfully"
    })
})


router.post('/signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(JWT_SECRET);
    
    const user = await User.find({
        username,
        password
    })
        if(user){
            const token =  jwt.sign({
                username          
            }, JWT_SECRET);

            res.json({
                msg : token
            })
        }
        else{
            res.status(400).json({
                msg : "Incorrect inputs"
            })
    }
    
});

router.post('/course', adminMiddleware , async (req,res) => {
    const {title, description, price, imageUrl} = req.body;
    
    const newCourse = await Course.create({
        title,
        description,
        price,
        imageUrl
    })

    res.json({
        msg : "Course Created Successfully" , newCourse
    })

})

router.get('/courses' ,adminMiddleware, async (req,res) => {
    const course = await Course.find({})
    res.send({
        msg : course
    })
})

module.exports = router