import {useState} from 'react'
// import Body from './Body'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Signup=()=>{
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [UserName, setUserName] = useState();
  const [type,setType] = useState();
  // const [error, setError] = useState();

  // const { setUserData } = useContext(createContext(null));
  const history = useHistory();
  const submit = async (e) => {
      e.preventDefault();
      try{
          const newUser = {email, password, passwordCheck, UserName, type};
          //console.log(newUser);
          await axios.post("https://ondemand-00.herokuapp.com/home/register", newUser);
          const loginResponse = await axios.post("https://ondemand-00.herokuapp.com/home/login", {
              email, password
          });
          // setUserData({
          //     token: loginResponse.data.token,
          //     user: loginResponse.data.user
          // });
          localStorage.setItem("auth-token", loginResponse.data.token);
          history.push("/");
      } catch(err) {
        console.log(err.response.data.msg)
          // err.response.data.msg && setError(err.response.data.msg)
      }
      
  };

    return (<div>
        <section class="slider_section">
      <div id="main_slider" class="carousel slide banner-main" data-ride="carousel">

         <div class="carousel-inner" style={{backgroundimage: 'assets/images/banner2.jpg'}} >
            <div class="carousel-item active" >
               
               <div class="wrapper1" >
               <form onSubmit={submit}>
                  <h3>Signup: </h3>
                 
                  <div class="mb-3">
                    <label for="exampleInputUsername" class="form-label">Username <br/></label>
                    <input type="text" onChange={e => setUserName(e.target.value)} class="form-control" id="exampleInputUsername" placeholder="Username" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address<br/></label>
                    <input type="email" onChange={e => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/> 
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password <br/></label>
                    <input type="password" onChange={e => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label">Confirm password <br/></label>
                    <input type="password" onChange={e => setPasswordCheck(e.target.value)}  class="form-control" id="exampleInputPassword2" placeholder="Confirm Password" />
                </div>
                <div class="form-check">
                  <input class="form-check-input" onClick ={e => setType(e.target.value)} type="radio" value="User" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                   User 
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" onClick ={e => setType(e.target.value)} type="radio" value="Service provider" name="flexRadioDefault" id="flexRadioDefault2"/ >
                  <label class="form-check-label" for="flexRadioDefault2">
                    Service provider
                  </label>
                </div>
                  
                  <button type="submit" class="btn btn-primary">Submit</button>
                
                </form>
                </div>
               </div>
               </div>
               
            </div>
   </section>
   </div>
    );
}

export default Signup;