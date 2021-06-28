import { useState,useContext } from 'react'
// import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { create } from '../api/api';
import UserContext from "../api/context";
import {useAlert} from 'react-alert';

const Post=()=>{
  const history = useHistory();
    const [data,setData] = useState({
      name:" ",
      address:" ",
      phone: " ",
      work:" ",
      date:" ",
      time:" ",
      price:" ",
      city:" ",
      pin:" "
    });
    const alert = useAlert();
    const {userData,setUserData} =  useContext(UserContext);
    // console.log(userData.user);
    // const {name,address,phone,city,pin,price,work,date,time} = data;
    const handleChange=(event)=>{
      const value = event.target.value;
      const name =event.target.name;
      // FormData.set(name,value);
      setData({
        ...data,
        name: userData.user.UserName,
         [name]:value                                                                          
      });
      // setData({
      //   ...data,
      //    name:value                                                                          
      // });
      // console.log(event.target.name);
      // console.log(data);
     
    }

    const handleSubmit=(e)=>{                                                                                                                                                                                                                                                                                                                                                                                                                         
      console.log(data.work)
      e.preventDefault();
      if(data.work!==" " && data.address!==" " && data.city!==" " && data.phone!==0 && data.pin!==0 && data.time!==" " && data.date!==" " && data.price!==" " && data.name!==" "){
        create(data);
        alert.success("Posted your demand successfully. Service provider will contact you soon")
      }
      else{
        alert.error("Enter all the form details")

      }
      
    }
  


    return (
      <form > 
        <div>
            <br/>
            <h1 className="headpost">Post your Demand</h1>
            <br/>
   
            <form className="row g-3 needs-validation" >
      
          <div className="col-md-3">
            <label for="validationCustom01" className="form-label">Demand</label>
              <input type="text"   
               className="form-control" id="type" onChange={handleChange} name="work" placeholder="Demand" required />
  
          </div>
          <div className="col-md-3">
            <label for="validationCustom02" className="form-label">Date</label>
            <input type="date" onChange={handleChange} name="date" className="form-control" id="validationCustom02"  required />
          </div>
          <div className="col-md-2">
            <label for="validationCustom02" className="form-label">Time</label>
            <input type="time" onChange={handleChange} name="time" className="form-control" id="validationCustom02" required />
          </div>
          <div className="col-md-4">
            <label for="validationCustom05" className="form-label">Price</label>
            <input type="number" onChange={handleChange} name="price" className="form-control" id="validationCustom05" placeholder="Enter your estimated  price" required />
          </div>
  
          <div className="col-md-4">
            <label for="validationCustom06" className="form-label">Phone</label>
            <input type="number" name="phone" onChange={handleChange} className="form-control" id="validationCustom06" placeholder="Enter your phone number" required />
          </div>
          <div  className="col-md-4">
            <label for="validationCustom03" className="form-label">City</label>
            <input type="text" onChange={handleChange} name="city" className="form-control" id="validationCustom03" required />
          </div>
          <div className="col-md-6">
            <label for="validationCustom04" className="form-label">Address</label><br/>
            <textarea type="text" name="address" onChange={handleChange} className="form-control" id="validationCustom04" plcaeholder="Enter your full address" required />
          </div>
          <div className="col-md-3">
           <label for="validationCustom05" className="form-label">Pin</label>
           <input type="text" className="form-control" onChange={handleChange} name="pin" id="validationCustom05" placeholder="Pin code" required />
          </div>
          <div className="col-12">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="invalidCheck"  />
            <label className="form-check-label" for="invalidCheck">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
            </div>
          </div>

          <div className="col-12"><br/><br/><br/>
            <button className="btn btn-primary" onClick={handleSubmit}>submit</button><br/><br/><br/>
          </div>
  
      </form>

       </div>
       </form>
    );
}

export default Post;