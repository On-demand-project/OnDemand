import react,{useState,useContext,createContext, useEffects} from 'react';
import {Redirect, useHistory} from 'react-router-dom'
import UserContext from "../api/context";
import axios from 'axios'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

var arr=[];
const Navbar = () =>{
  // const [ar,setar] = useState({});
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const [notOpen, setnotOpen] = useState(false);
  const tog = () => setnotOpen(!notOpen);


  var res=false;
  var res1=false;
  
   const { userData, setUserData } = useContext(UserContext);
   //console.log(userData.user)

  try{
    if(userData.user.type === 'Service provider')
      res=true;
     if(userData.user.type === 'User')
      res1=true;
    
  }
  catch(err){
    console.log(err);
  }

   if(!res){
    // console.log(userData)
    const res = axios.post('http://localhost:8000/home/checknotf',userData.user)
    .then((res)=>{
      console.log(res.data[0].notification);
      if(res.length===0){
        console.log("No notification")
      }
      else{
        // arr=res.data[0].notification[0];
       arr=[... res.data[0].notification];
      //  setar(arr);
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
               {res1 ?(
                 <div>
             
                 <li class="nav-item space">
                       <li> <a href="Post">Post </a> </li>
                     </li>
                     
                     <li class="nav-item space">
                       <li> <a href="Chat">Text </a> </li>
                     </li>
                     </div>
              ):(<div></div>) }
               
              
          
                     
         {userData.user ? (
         <button className="btn btn-danger logout"onClick={logout}>Logout</button>
         
         ) :(<div></div> )}


         {userData.user ? (
          <div>
          <Button className="btn btn-light user" id="Popover1" type="button">
          <i className="fa fa-user fa-2x"></i>
          </Button>
          <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
            <PopoverHeader>{userData.user.type}</PopoverHeader>
            <PopoverBody>Welcome {userData.user.UserName} ! </PopoverBody>
          </Popover>
        
          <Button className="btn btn-light" id="not" type="button">
          <i class="fa fa-envelope fa-2x"></i>
          </Button>
          <Popover placement="bottom" isOpen={notOpen} target="not" toggle={tog}>
            <PopoverHeader>Notifications</PopoverHeader>
            <PopoverBody> {`${arr[0]} Will be contacting you soon !`} </PopoverBody>
          </Popover>
        </div>
         
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