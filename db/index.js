const mongo = require('mongoose')


mongo.connect("mongodb+srv://PraveenChasta:W4A9w4SqbdRZrqCL@cluster0.zg5y6pc.mongodb.net/json-auth");


const AdminSchema = mongo.Schema({
    username : String,
    password : String,
});

const UserSchema = mongo.Schema({
    username : String,
    password : String,

    purchasedCourse : {
        type : mongo.Schema.Types.ObjectId,
        ref : "Course"
    }
})

const CourseSchema = mongo.Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
})

const Admin = mongo.model('Admin', AdminSchema)
const User = mongo.model('User', UserSchema)
const Course = mongo.model('Course', CourseSchema)


module.exports = {
    Admin,
    User,
    Course
}