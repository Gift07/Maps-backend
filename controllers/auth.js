const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const role = require('../config/role')
require('dotenv').config()


// registering the user
const signUp = async (req, res) => {
    // taking validated values from join
    const { username, email, password } = req.body;
    try {
      //checking if email already exist
        const emailExist = await user.findOne({ email });
        if (emailExist) return res.status(400).json({ message: "Email Already exist" });
      
        console.log('email exists')
        // checking is user exist
        const userExist = await user.findOne({ username });
        if (userExist) return res.status(400).json({ message: "User Already exist" });
      
        console.log('user exists')
        //hashing the passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
      
      
        console.log('password hashed', hashedPassword)
        const User = new user({
          username: username,
          email: email,
          password: hashedPassword,
          
        });
      await User.save();
         // creating jwt token
         const accessToken = jwt.sign(
          { _id: User._id,user_name:User.username,email:User.email,user_role:User.userRole },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
      
        const refreshToken = jwt.sign(
          { _id: User._id,email:User.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "10d" }
        );
      res.status(200).json({User,accessToken,refreshToken, message:"sign up successfull" })
    } catch (error) {
      res.status(400).json(error.message);
    }
};
    
// login the user to get the access and refresh token
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        // checking username exist and fetching it
        const User = await user.findOne({ email });
        if (!User) return res.status(400).json({message: "username or password is wrong"});
        console.log('here')
        // password checking
        const validPassword = await bcrypt.compare(password, User.password);
        if (!validPassword)
          return res.status(400).json({ message: "username or password is wrong" });
      
        // creating jwt token
        const accessToken = jwt.sign(
          { _id: User._id,user_name:User.username,email:User.email,user_role:User.userRole },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        console.log("acces token made")
        console.log(user.username)
        const refreshToken = jwt.sign(
          { _id: User._id,email:User.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "10d" }
        );
      
        //   passing token to the headers
        res.status(200).json({ accessToken, refreshToken ,message:"sign in successful"});
      
    } catch (error) {
      res.status(400).json({
        message:error
      })
    }
};

const fetchUsers = async (req, res) => {
try {
  const data = await user.find()
  res.status(200).json(data)
} catch (error) {
  res.status(400).json(error)
}
}

// updating the user setting him as photographer
const setPhotographer = async (req, res) => {
  console.log("finding user now")
  const {id} = req.body

  const account = await user.findOne(id);

  if (account) {
    account.userRole = role.STAFF
    console.log(account.userRole)
    // saving the user
    const User = await user.findByIdAndUpdate({_id:id}, account, { new: true })
    // creating jwt token
    console.log(User)
        // creating jwt token
            // creating jwt token
            const accessToken = jwt.sign(
              { _id: User._id,user_name:User.username,email:User.email,user_role:User.userRole },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "1d",
              }
            );
    // generating refresh token
    const refreshToken = jwt.sign(
      { _id: User._id,email:User.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "10d" }
    );
    // passing token to the headers
    res.status(200).json({ accessToken, refreshToken, message: "sign in successful" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
}
  
module.exports = { signIn, signUp,fetchUsers,setPhotographer };