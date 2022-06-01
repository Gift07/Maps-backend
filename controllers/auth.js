const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const role = require('../config/role')
const nodemailer = require("nodemailer");
const crypto = require('crypto')
require('dotenv').config()


// registering the user
const signUp = async (req, res) => {
    // taking validated values from join
    const { firstname,lastname,nationalId, email, password } = req.body;
    try {
      //checking if email already exist
        const emailExist = await user.findOne({ email });
        if (emailExist) return res.status(400).json({ message: "Email Already exist" });
      
        console.log('email exists')
        //hashing the passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
      
      
        console.log('password hashed', hashedPassword)
        const User = new user({
          firstname,
          lastname,
          nationalId,
          email,
          emailToken:crypto.randomBytes(64).toString('hex'),
          password: hashedPassword,
          
        });
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail', // true for 465, false for other ports
        auth: {
          user: "madegaramadhani@gmail.com", // generated ethereal user
          pass: "0716574734", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
     await transporter.sendMail({
        from: 'madegaramadhani@gmail.com', // sender address
        to: User.email,
        subject: 'bikes-rental system verify your email',
        text: `
        Hello ${User.firstname}, thanks for registering on our site
        please verify your email by clicking the link below
        http://${req.headers.host}/api/auth/verify-email?token=${User.emailToken}
        `,
        html: `
        <h1>Hello ${User.firstname}</h1>
        <p> thanks for registering on our site</p>
        <p>please verify your email by clicking the link below</p>
        <a href="http://${req.headers.host}/api/auth/verify-email?token=${User.emailToken}">verify your email</a>
        `
     })
        .then((data) => console.log(data))
        await User.save();
        res.status(200).json({ message: 'thanks for registering, please check your email fro verification' })
    } catch (error) {
      res.status(400).json(error.message);
    }
};
// verifying the email address
const verifyEmail = async (req, res) => {
  const { token } = req.query
  
  try {
    const User = await user.findOne({ emailToken: token })
    if (!User) return res.status(400).json({ message: "User not found" })
    
    User.emailToken = null
    User.is_verified = true
    const VerifiedUser = await user.findByIdAndUpdate(User._id,User, { new: true })
    // creating jwt token
    // passing token to the headers
    res.status(200).redirect(`https://bikesrenting.netlify.app/user/sign-in`)
  } catch (error) {
    res.status(400).json(error)
  }
}
    
// login the user to get the access and refresh token
const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password })
  console.log(email)
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
          { _id: User._id,firstname:User.firstname,lastname:User.lastname,email:User.email,user_role:User.userRole },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10d",
          }
        );
        console.log("acces token made")
        //   passing token to the headers
        res.status(200).json({ accessToken,message:"sign in successful"});
      
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
  const { userId } = req.body
  console.log(req.body)
  const account = await user.findById(userId);

  if (account) {
    account.userRole = role.STAFF
    console.log(account.userRole)
    // saving the user
    const User = await user.findByIdAndUpdate(userId, account, { new: true })
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
  
module.exports = { signIn, signUp,fetchUsers,setPhotographer,verifyEmail };