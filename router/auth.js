const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middelware/authenticate');
const cookieParser = require('cookie-parser')

router.use(cookieParser());

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res)=>{
    res.send('Hello world from the server router js')
})


// router.post('/register', (req, res)=>{
//     const {name, email, phone, work, password, cpassword} = req.body;
//     // console.log(name);
//     // console.log(email);
//     // res.json({message:req.body})
//     // res.send('xyz register');
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({ error: "Plz filled the field properly"});
//     }

//     User.findOne({ email: email })
//         .then((userExist)=>{
//             if (userExist) {
//             return res.status(422).json({error: "Email already Exist"});
//         }

//         const user = new User({name, email, phone, work, password, cpassword})

//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfuly"});
//         }).catch((err)=>res.status(500).json({error: "Failed to registered"}));
//     }).catch(err => { console.log(err); });
// });

router.post('/register', async (req, res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({ error: "Plz filled the field properly"});
    }

    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({error: "Email already Exist"});
        }else if (password != cpassword){
            return res.status(422).json({error: "password are not matching"});
        }else{
            const user = new User({name, email, phone, work, password, cpassword})

            await user.save();

            // console.log(`${user} user Registered successfully`);
            // console.log(userRegister)

            res.status(201).json({message:"user registered successfuly"});
        }

        // if (userRegister){
        //     res.status(201).json({message:"user registered successfuly"});
        // }else{
        //     res.status(500).json({error: "Failed to registered"});
        // }
    } catch (err) {
        console.log(err);
    }
});

router.post('/signin', async(req, res)=>{
    // console.log(req.body);
    // res.json({message:"Awsome"});
    try{
        const { email, password } = req.body;

        if (!email || !password){
            return res.status(400).json({error:"Plz filled the data"});
        }

        const userLogin = await User.findOne({email: email});

        // console.log(userLogin);
        if (userLogin){

            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie('jwtoken', token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({error: "Invalid credientials pass"})
            }else{
                res.json({message: "user signin successfully"})
            }
        }else{
            res.status(400).json({error: "Invalid credientials"})
        }
        
        // if(!userLogin){
        //     res.status(400).json({error: "Invalid credie ntials"})
        // }else{
        //     res.json({message: "user signin successfully"})
        // }
    } catch(err){
        console.log(err);
    }
});

router.get('/about', authenticate, (req, res)=>{
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// get user data for contact us and home page

router.get('/getdata', authenticate, (req, res)=>{
    console.log(`Hello my About`);
    res.send(req.rootUser);
})

// contact us page
router.post('/contact', authenticate, async (req, res) => {
    try{
        
        const {name, email, phone, message} = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form")
            return res.json({ error: "plz filled the contact form" });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({message:"user contact successfully"})
        }
    } catch (err){
        console.log(err)
    }
})

// Logout page
router.get('/logout', (req, res)=>{
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User Logout');
});

module.exports = router;