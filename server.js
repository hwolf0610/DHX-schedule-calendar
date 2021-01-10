const express = require('express');
var path = require('path');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = express.Router();
// const PORT = 4000;
const PORT = process.env.PORT || 4000;

const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

app.get('/apitest', function (req, res) {
    res.json({
        status: '200',
        message: 'my skype is live:.cid.73febdac7a6c327d'
    })
})

app.get('/read_event', function (req, res) {
    let rawdata = fs.readFileSync('event.json');
    let student = JSON.parse(rawdata);
    console.log(student);
    res.json({
        status: '200',
        data: student
    })
})

app.post('/add_events', function(req, res){
    console.log("req:", req.body)
    let newData = [];
    let rawdata = fs.readFileSync('event.json');
    let read_student = JSON.parse(rawdata);
    newData = [...read_student, req.body];
    let data = JSON.stringify(newData);
    fs.writeFileSync('event.json', data);

    res.json({
        status: '200',
        message: newData
    })
})

app.get('/write_event', function (req, res) {
    let student = {
        name: 'Mike',
        age: 23,
        gender: 'Male',
        department: 'English',
        car: 'Honda'
    };

    let newData = [];
    let rawdata = fs.readFileSync('student.json');
    let read_student = JSON.parse(rawdata);
    newData = [...read_student, student];
    // newData = read_student
    // newData = newData.push(student)

    let data = JSON.stringify(newData);
    fs.writeFileSync('student.json', data);

    res.json({
        status: '200',
        message: newData
    })
})

app.post('/write_event', function (req, res) {
    console.log("res", req.body)
    let student = {
        id: req.body.id,
        start_date: req.body.start_date,
        title: req.body.title,
        label: req.body.label,
        start: req.body.start,
        end: req.body.end,
        price: req.body.price
    };

    let newData = [];
    let rawdata = fs.readFileSync('student.json');
    let read_student = JSON.parse(rawdata);
    newData = [...read_student, student];
    // newData = read_student
    // newData = newData.push(student)

    let data = JSON.stringify(newData);
    fs.writeFileSync('student.json', data);

    res.json({
        status: '200',
        message: newData
    })
})

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});