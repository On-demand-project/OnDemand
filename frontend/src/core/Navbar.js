import react,{useState,useContext,createContext, useEffects} from 'react';
import {useHistory} from 'react-router-dom'
import UserContext from "../api/context";

const Navbar = () =>{
   const { userData, setUserData } = useContext(UserContext);

   const logout = () => {
      setUserData({
      token: undefined,
      user: undefined
      })
      localStorage.setItem("auth-token","");
      };
      
    return (

   
        <div>
        <body>
            {/* <div classNameName="loader_bg">
         <div classNameName="loader"><img src="assets/images/loading.gif" alt="#" /></div>
        </div> */}
      <header>        
         <div className="container">
            <div className="row">
               <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                  <div className="full">
                     <div className="center-desk">
                        <div className="logo"> <a href="/"><img src="assets/images/logo.jfif" alt="logo"/></a> </div>
                     </div>
                  </div>
               </div>
         
               <div className="col-xl-7 col-lg-7 col-md-9 col-sm-9">
                  <div className="menu-area">
                     <div className="limit-box">
                        <nav className="main-menu">
                           <ul className="menu-area-main">
                              <li className="active"> <a href="/">Home</a> </li>
                              <li> <a href="About">About</a> </li>
                             {userData.user ?(
                                <div>
                                  <li> <a href="Feed">Browse</a> </li>
                                  <li> <a href="Post"> Post</a> </li>
                                  <li> <a href="Contact">Contact</a> </li>
                                  </div>
                             ):( <li> <a href="Contact">Contact</a> </li>) }
                            

                              {userData.user ? (
         <button className="btn btn-danger" onClick={logout}>Logout</button>
         
         ) :( <button className="btn btn-danger" onClick={logout}>Login</button> )} 
                              
                           </ul>
                        </nav>
                     </div>
                  </div>
               </div>
            
            </div>
         </div>     
      </header>
      
      
        </body>
        </div>
        
    );

}
export default Navbar;