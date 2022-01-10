const mongoose = require('mongoose');

const serviceSchema =  mongoose.Schema({
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    phone:{
        type:Number 
    },
    work:{
        type:String
    },
   date:{
         type:String
    },
    time:{
         type:String
    },
    price:{
         type:String
     },
    city:{
         type:String
    },
    pin:{
        type:Number
    }
});

const Service = mongoose.model('Service',serviceSchema);

module.exports = Service ;