import react,{useState,useContext,createContext} from 'react'
import Body from './Body'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import UserContext from "../api/context";

const Login=()=>{

  const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [error, setError] = useState();
    
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault(); 
        console.log(setUserData)
        try{
            const loginUser = {email, password};
            console.log(loginUser)
            const loginResponse = await axios.post("http://localhost:8000/home/login", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
          console.log(err.response.data.msg)
            //err.response.data.msg && setError(err.response.data.msg)
        }
        

        if(userData.user){
          console.log(userData)
          const res = axios.post('http://localhost:8000/home/checknotf',userData.user)
          .then((res)=>console.log(res))
          .catch(e=>console.log(e));
        }
       
    };

    const logout = () => {
      setUserData({
      token: undefined,
      user: undefined
      })
      localStorage.setItem("auth-token","");
      };
      
  return(<div>
 
  <section class="slider_section">
         <div id="main_slider" class="carousel slide banner-main" data-ride="carousel">
          {userData.user ? (
<div></div>

) : ( 
            <div class="carousel-inner" style={{backgroundimage: 'assets/images/banner2.jpg'  }}>
               <div class="carousel-item active" >
                  
                  <div class="wrapper" >
                  <form onSubmit={submit}>
                     <h3>Login</h3>
                     <div class="mb-3">
                       <label for="exampleInputEmail1" class="form-label">Email address</label>
                       <input type="email" class="form-control" id="exampleInputEmail1" onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Email"/> 
                       <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                     </div>
                     <div class="mb-3">
                       <label for="exampleInputPassword1" class="form-label">Password</label>
                       <input type="password" class="form-control" onChange={e => setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password"/>
                     </div>
                     <div class="mb-3 form-check">
                       <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                       <label class="form-check-label" for="exampleCheck1">Check me out</label>
                     </div>
                     <button type="submit" class="btn btn-primary">Login</button>
                     <p>No account?      <a href="Signup">      Sign Up</a></p>
                   </form>
                   </div>
                  
                  
               </div>
               </div>
 )} 
               </div>
               

            

      </section>
      <Body />
      </div>);
}

export default Login;