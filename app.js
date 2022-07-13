const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');
// const User = require('./model/userSchema');
app.use(express.json());

app.use(require('./router/auth'));

// 2:step heroku
const PORT = process.env.PORT || 3001;



// middelware
// const middelware = (req, res, next) =>{
//     console.warn(`Hello my middelware`);
//     next();
// }

// app.get('/', (req, res) => {
//     res.send(`Hello world from the server app.js`);
// });

// app.get('/about', middelware, (req, res)=>{
//     res.send(`Hello world from about us page`);
// })

// app.get('/contact', (req, res)=>{
//     res.cookie("Test", 'thapa')
//     res.send(`Hello world from contact us page`)
// })

// app.get('/signin', (req, res)=>{
//     res.send(`Hello from login page`)
// })

app.get('/signup', (req, res)=>{
    res.send(`Hello from signup page`)
})

// 3. step heroku
if (process.env.NODE_ENV == "production"){
    app.use(express.static("profile/build"));
}

app.listen(PORT, () =>{
    console.warn(`server is running port no ${PORT}`)
})