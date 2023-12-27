const User = require("../db/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const findByEmail = asyncHandler(async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  }
  return false;
});

//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    req.status(400);
    throw new Error("All fields are mandatory");
  }
  //   const existingUser = findByEmail(email);
  //   if (existingUser) {
  //     res.status(400).json({ error: "Email id is already present" });
  //     return;
  //   }

  const userAvail = await User.findOne({ email });
  if (userAvail) {
    res.status(400).json({error: "User already registered"});
    throw new Error("User already registered");
  }
  
  const usernameAvail = await User.findOne({ username });
  if (usernameAvail) {
    res.status(400).json({error: "username already registered"});
    throw new Error("User already registered");
  }
  //hash password
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  console.log(`User Created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not Valid");
  }

  res.status(200).json("User resgistered successfully");
});

//@desc Login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Both fields are required");
    }

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json("Valid User");
        // const accessToken = jwt.sign(
        //     {
        //       user: {
        //         username: user.username,
        //         email: user.email,
        //         id: user.id,
        //       },
        //     },
        //     process.env.ACCESS_TOKEN_SECERT,
        //     { expiresIn: "15m" }
        //   );
        //   res.status(200).json({ accessToken });
    }
    else{
        res.status(401).json({error: "Email or Password is not Valid"})
    }



});

module.exports = {
  registerUser,
  loginUser
};
