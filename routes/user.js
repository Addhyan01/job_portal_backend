const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../schema/user.schema");


//register an user

router.post(("/register"), async (req, res) => {
    // console.log(req.body);
    const  { name, email, password } = req.body; 
    const ifUserExist = await User.findOne({ email });
    //checking if the user already exist in the database or not if the user already exist then we are sending the response to the client that the user already exist or else we are creating a new user and saving it to the database   
    if (ifUserExist) {
        return res.status(400).json({ message: "User already exist" });
    }
    // here we are hashing the password before saving it to the database because we don't want to save the password in plain text;
    const hashedPassword = await bycrypt.hash(password, 10);

    //creating a new user with the hashed password and saving it to the database 
    const user = new User({ name, email, password: hashedPassword });

    //sending the response to the client and also saving the user to the database
    await user.save();
    // here we are sending the response to the client that the user is created successfully 
    res.status(201).json({ message: "User created successfully" });


});

//login an user
router.post(("/login"), async (req, res) => {

}); 

//get all the users
router.get(("/"), async (req, res) => {
    // here we are fetching all the users from the database and sending it to the client
    const users = (await User.find().select("-password").select("-__v").select("-_id")); 
    // .select("-password") is used to exclude the password field from the response
    // here we are sending the response to the client that all the users are fetched successfully       
    res.status(200).json( users );

})

//get a single user by email 
//why we fetch daya using query not body because we are not sending the data in the body we are sending the data in the query some browser block the data in the body so we are sending the data in the query and fetching the data using query (safari browser block the data in the body)

router.get(("/:email"), async (req, res) => {
   const { email } = req.params; //fetching the email from the query, params is used to fetch the data from the query (url)
   const user = await User.find({ email }).select("-password").select("-__v").select("-_id");
   if (!user) {
       return res.status(404).json({ message: "User not found" });
   }
    res.status(200).json(user);
});



module.exports = router;