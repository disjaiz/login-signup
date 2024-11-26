const express = require("express");
const app = express();
const mongoose = require('mongoose');
const User  = require("./models/user.js");
const bcrypt = require("bcrypt");
const cors = require("cors");
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/newLoginDb").then(()=>{console.log("connceted to mongoose")})
.catch((err)=>{console.log("err conncting mongoose")});
const corsOptions = {
    origin: 'http://localhost:3001',  // Allow only this domain
  };
app.use(cors() );


// Signin User(Register)
app.post('/register', async(req, res)=>{
    var {name, email, password} = req.body;

        const user = await User.findOne({email});
            if(user){ 
                return res.status(400).json({ message:"email already exists! Try new one."});
            }

        const hashPass = await bcrypt.hash(password, 10)
    .catch(err => {
        console.error("Error hashing password:", err);
        throw err; // Ensure execution stops if hashing fails
    });
    if (!hashPass) {
        console.error("Hashing failed");
        return; // Stop execution if hashPass is undefined
    }
        const newUser = new User({name, 
                                 email,
                                 password: hashPass });

                                 await newUser.save()
                                 .then(user => console.log("User saved:", user))
                                 .catch(err => console.error("Error saving user:", err));
        var users = await User.find();
        res.json({data:users});
})

//Login User
app.post("/login", async (req, res)=>{
    var {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        bcrypt.compare(password, user.password, (err, isMatch) => { 
           
            if (isMatch){
                return res.send({ message:"you are logged in!"});
            }   
            else{
                return res.status(400).json({ message:"sorry wrong pass"});
            }
        });
    }
    else{
        return res.status(400).json({ message: "sorry, email not found!" });
    }
    
})

app.listen(3000, ()=>{
    console.log("listining on port 3000")
})
app.get("/", (req, res)=>{
    res.json({message:"homepage loaded succesfully"});
})






            