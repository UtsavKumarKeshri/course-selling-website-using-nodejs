const express = require("express")
const app = express();
const path = require("path");
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/course-selling', {useNewUrlParser:true});
const port = 80;

//Defining Schemas 

//contact page schemas
    var contactSchema = new mongoose.Schema({
        First_Name:String,
        Last_Name:String,
        mobile:Number,
        Email:String,
        state:String,
        District:String,
        message:String
    })
    var contact = mongoose.model('contact', contactSchema);

// Registration Page Schemas
    var registrationSchema = new mongoose.Schema({
        First_Name:String,
        Last_Name:String,
        Email:String,
        Mobile:Number,
        aadhaar:Number,
        gender:String,
        courseSelection:String,
        correspondenceAddress:String,
        permanentAddress:String,
        Message:String
    })
    var registration = mongoose.model('registration', registrationSchema);
//serving static file
app.use('/static', express.static('static'))
app.use(express.urlencoded());

// setting template engine as views
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// get request for all the pages
app.get("/About", (req, res)=>{
    res.status(200).render("About.pug")
})
app.get("/contact", (req, res)=>{
    res.status(200).render("contact.pug")
})
app.get("/courses", (req, res)=>{
    res.status(200).render("courses.pug")
})
app.get("/", (req, res)=>{
    res.status(200).render("home.pug")
})
app.get("/login", (req, res)=>{
    res.status(200).render("login.pug")
})
app.get("/registrationForm", (req, res)=>{
    res.status(200).render("registrationForm.pug")
})

//handling post requent from client side
app.post("/contact", (req,res)=>{
    var contactData = new contact(req.body);
    contactData.save().then(()=>{
        res.send('Your request is successfully submitted');
    }).catch(()=>{
        res.status(400).send('Error saving data to the database. Please try again after sometime.')
    });
})

app.post("/registrationForm", (req, res)=>{
    var registrationData = new registration(req.body);
    registrationData.save().then(()=>{
        res.send('You are successfully enrolled in the course, we will soon get in touch with you');
    }).catch(()=>{
        res.status(404).send('Error saving data to the database. Please try after sometime.')
    });
})
//statrting the server
app.listen(port, ()=>{
    console.log(`Website is successfully launched at port ${port} `)
})