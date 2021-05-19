import react,{useState,useContext,createContext, useEffects} from 'react';
import {Redirect, useHistory} from 'react-router-dom'
import UserContext from "../api/context";
import axios from 'axios'

const Navbar = () =>{
  var res=false;
   const { userData, setUserData } = useContext(UserContext);
   console.log(userData.user)

  try{
    if(userData.user.type === 'Service Provider')
      res=true;
    // else
    //   res=false;
  }
  catch(err){
    console.log(err);
  }

   if(!res){
    console.log(userData)
    const res = axios.post('http://localhost:8000/home/checknotf',userData.user)
    .then((res)=>{
      console.log(res.data);
      if(res.length===0){
        console.log("No notification")
      }
      else{
        res.data.forEach(ele => {
          console.log(ele + "Will be contacting you shortly")
        });
       
      }
    })
    .catch(e=>console.log(e));
  }





   const logout = () => {
      setUserData({
      token: undefined,
      user: undefined,
      })
      localStorage.setItem("auth-token","");
      };
    return (
    
      
   
        <div>
        <body>
        
      

   <nav class="navbar sticky-top navbar-expand-lg nav" style={{backgroundColor: "white"}}>
    <div class="container">
    <div className="center-desk">
         <div className="logo"> <a href="/"><img src="assets/images/logo.jfif" alt="logo"/></a> </div>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <i class="fa fa-bars"></i>
  </button>

      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto w-100 justify-content-end">
          <li class="nav-item active space">
          <a href="/">Home </a> 
          </li>
          <li class="nav-item space">
           <a href="About">About </a> 
            </li>
            <li class="nav-item space">
             <a href="Contact">Contact </a> 
              </li>
              {/* .type == 'Service Provider' */}
             {(res) ?(
                 <li class="nav-item space">
                     <li> <a href="Feed">Browse </a> </li>
                     </li>
              ):(<div></div>) }
               {!res ?(
             
                 <li class="nav-item space">
                       <li> <a href="Post">Post </a> </li>
                     </li>
                     
              ):(<div></div>) }
               
              
           {userData.user ?(
                 <li class="nav-item space">
                    <li> <a href="Profile">Profile </a> </li>
               </li>
              ):(<div></div>) }
                     
         {userData.user ? (
         <button className="btn btn-danger logout"onClick={logout}>Logout</button>
         
         ) :(<div></div> )} 
        </ul>
      </div>
    </div>
  </nav>
     
      
        </body>

        </div>
        
    );

}
export default Navbar;