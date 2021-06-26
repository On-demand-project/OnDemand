
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./core/Login";
import Signup from "./core/signup"
import Navbar from "./core/Navbar";
import Contact from "./core/Contact";
import About from "./core/About";
import Footer from "./core/Footer";
import Feed from './core/Feed';
import Post from './core/Postpage'
import Profile from './core/Profile'
import {useState,useEffect} from 'react'
import UserContext from './api/context'
import axios from 'axios'
import Chat from './core/Chat'

function App() {

  
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined,
 
  });
  //const { useData, setUserData } = useContext(UserContext);
  console.log(userData);
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
        console.log(localStorage);
      }
      const tokenResponse = await axios.post('https://ondemand-00.herokuapp.com/home/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data) {
        const userRes = await axios.get("https://ondemand-00.herokuapp.com/home/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
         
        });
      } 
    }

    checkLoggedIn();
  }, []);


  
  return (
    <div>
      
      <div className="se-pre-con"></div>
  
    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
      <Navbar />
      <Switch>
      <Route path="/" exact component={ Login} />
      <Route path="/Signup" exact component={ Signup} /> 
      {(userData.user) ?
       <Route path="/Feed" exact component={ Feed} /> 
       :<div></div>} 
      
       
       {(userData.user) ?
       <Route path="/Chat" exact component={Chat} />
       :<div></div>}
       
        <Route path="/About" exact component={About} />
        <Route path="/Contact" exact component={ Contact} /> 
        <Route path="/Post" exact component={Post} />
        <Route path="/Profile" exact component={Profile} />
        
        
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
    <Footer/>
    </div>
  );
}

export default App;