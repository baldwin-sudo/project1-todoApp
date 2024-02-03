import express from "express";
import User from "../models/user.js";


const router = express.Router();
router.use(express.json());
//middleware
export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated
      res.status(401).json({ message: "Unauthorized" });
    }
  };
// sign on
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        const savedUser = await user.save();
        res.status(200).json({ user: savedUser });
    } catch (err) {
        res.status(400).json({ message: "error" });
    }
});
// sign in 
router.post("/signin", async (req, res) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        console.log(username);
        if(!user) res.status(400).json({message:"user not found ! pelase sign up"});
        else if(user.password.localeCompare(password)!=0) res.status(400).json({message:"incorrect password "});
        else {
            // Store user information in the session
            req.session.user = user;
            res.status(200).json({ user })}
       
    } catch (err) {
        res.status(400).json({ message: "error" });
    }
});

export default router ;