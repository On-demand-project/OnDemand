
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./core/Login";
import Postpage from "./core/Postpage";
import Home from "./core/Home";
import Signup from "./core/signup"
import Navbar from "./core/Navbar";
import Contact from "./core/Contact";
import About from "./core/About";
import Footer from "./core/Footer";
import Feed from './core/Feed';
import Post from './core/Postpage'
import {useState,useEffect} from 'react'
import UserContext from './api/context'
import axios from 'axios'

function App() {

  
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  //const { useData, setUserData } = useContext(UserContext);
  console.log(userData);
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      //let token=null;

      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
        console.log(localStorage);
      }
      const tokenResponse = await axios.post('http://localhost:8000/home/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:8000/home/", {
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
      <Route path="/Feed" exact component={ Feed} /> 
       <Route path="/Signup" exact component={ Signup} /> 
       
        <Route path="/About" exact component={About} />
        <Route path="/Contact" exact component={ Contact} /> 
        <Route path="/Post" exact component={Post} />
        {/* <Route path="/post" exact component={Postpage} /> */}
        {/* <Route path="/create/product" exact component={AddProduct} />
        <Route path="/create/uploadproduct" exact component={Upload} /> */}
      
        
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
    <Footer/>
    </div>
  );
}

export default App;