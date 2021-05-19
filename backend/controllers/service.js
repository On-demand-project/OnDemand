const Service = require("../models/service.model")
const User = require("../models/users.model")
const formidable = require('formidable');
const _ = require('lodash');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
exports.readserv =  (req,res) =>{
    // console.log("fgidf");
    //name : req.user.UserName
    console.log(req.user)
    Service.find({})
    .exec((err,service)=>{
        console.log(err); 
        if(err || !service){
            res.status(400).json({
                err:"Not found", 
            })
        }
        // console.log(service)
        res.json(service);
    })
}; 

exports.postserv = (req,res)=>{ 
    console.log(req.user)
    const newPost = new Service(req.body)
    newPost.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
    // console.log(req.body);
}

exports.deleteserv = async (req,res) => {
    console.log(req.params.sid);
    Service.deleteOne({_id:req.params.sid})
    .exec((err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Service cancelled',
            });
        }
        if(data){
        return res.status(500).json({
            message: 'Service served. Thank You !!',
        });
    }
    });
    
}



exports.notify = async (req,res) =>{
  try{
      console.log(req.body.UserName)
   
      User.update({UserName:req.body.UserName},{$addToSet:{notification : req.body.curuser.UserName}})
      .exec((err,data)=>{
          console.log(err); 
          if(err || !data){
              res.status(400).json({
                  err:"Not found", 
              })
          }
          console.log(data)
          res.json(data);
      })


    
      
      
  }
  catch(err){
      console.log(err);
  }
}


exports.checknotf = async (req,res) =>{
  try{
      console.log(req.body);
      User.find({UserName:req.body.UserName})
      .exec((err,data)=>{
          console.log(err); 
          if(err || !data){
              res.status(400).json({
                  err:"Not found", 
              })
          }
          console.log(data)
          res.json(data);
      })
  }
  catch(err){
    console.log(err);
  }
}



exports.register = async (req, res) => {
    try {
      let { email, password, passwordCheck, UserName , type } = req.body;
  
      // validate
      
      if (!email || !password || !passwordCheck)
        return res.status(400).json({ msg: "Not all fields have been entered." });
      if (password.length < 5)
        return res
          .status(400)
          .json({ msg: "The password needs to be at least 5 characters long." });
      if (password !== passwordCheck)
        return res
          .status(400)
          .json({ msg: "Enter the same password twice for verification." });
  
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });
  
    //   if (!displayName) displayName = email;
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        email,
        password: passwordHash,
        UserName,
        type
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  exports.login =async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      // validate 
      if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET );
      console.log("token",token);
      res.json({
        token,
        user: {
          id: user._id,
          UserName: user.UserName,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    } 
  }

