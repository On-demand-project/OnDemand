const express = require("express");
const Service = require("../models/service.model")
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const{
    postserv,
    readserv,
    deleteserv,
    register,
    login,
    notify,
    checknotf,
} = require('../controllers/service'); 

router.get('/service',readserv);
router.post('/post',postserv);
router.delete('/:sid',deleteserv);
router.post("/register", register);
router.post("/login", login);
router.post("/notify",notify); 
router.get("/checknotf/:uid",checknotf);




router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      console.log(token);
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) {
          
          return res.json(false);
      }
      const user = await User.findById(verified.id);
      if (!user) {
        console.log("not user")
          return res.json(false);
      }
      return res.json(true);
    } catch (err) {
        console.log(err.message)
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get("/", auth, async (req, res) => {
      console.log(req.user)
    const user = await User.findById(req.user);
    res.json({
      UserName: user.UserName,
      id: user._id,
      type: user.type,
    });
  });


module.exports = router; 