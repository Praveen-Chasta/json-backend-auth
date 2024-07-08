const express = require('express');
const userMiddleware = require('../middleware/user')
const {Admin , User, Course} = require('../db')
const {JWT_SECRET} = require("../config");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post('/signup', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    })

    res.json({
        msg : "User Created Successfully"
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
})


router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const username = req.username;
    const courseId = req.params.courseId;
    console.log(username);
    try {
        await User.updateOne({
            username
        }, {
            '$push': {
                purchasedCourse: courseId
            }
        });

        res.status(200).json({
            msg: "Purchase complete!"
        });
    } catch (e) {
        console.error(e); // Log the error for debugging purposes
        res.status(500).json({
            msg: "Something Went Wrong"
        });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
     // Implement fetching all courses logic
     const response = await Course.find({});

     res.json({
         courses: response
     })
});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    });
    console.log(courses)
    res.json({
        Courses: courses
    })
});

module.exports = router