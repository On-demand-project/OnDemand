import {useEffect,useState,useContext,useRef} from 'react'
import axios from "axios";
import UserContext from '../api/context'
// import TextField from "@material-ui/core/TextField"
import io from "socket.io-client"
import { useAlert } from 'react-alert'

var name=""
const Feed=()=>{
   const { userData, setUserData } = useContext(UserContext);
   const [ state, setState ] = useState({ message: "", to: "" ,from:""})
	const [ chat, setChat ] = useState([])
   const [visible,setVisible] = useState("");
   const [showchat,setshowchat]=useState(false);

   const [providerList,setproviderList]=useState([]);
   const socketRef = useRef()
   const alert = useAlert()
   var res=true;


   useEffect(()=>{
      axios.get('http://localhost:8000/home/service').then((response)=>{
         setproviderList(response.data);
      });
   },[]) 


   useEffect(
		() => {
         const data=userData.user;
         console.log(userData.user);
			socketRef.current = io.connect("http://localhost:8000")
			socketRef.current.on("message", ({ to,from, message }) => {
				setChat([ ...chat, { to,from, message } ])
			})
        
			socketRef.current.emit("new",data);
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)



   const selected=(event)=>{
      alert.success('You have successfully booked our service! Use chat option to contact him Thank you! ')
      // var flag=true;
      // setVisible(true)
      
      // Feed.render(chatbut, document.getElementById('root'));
      console.log(event.target.value);
      name=event.target.value;
      // console.log(res);
      // res=true;
      // setState({... state, to:event.target.value})
      // setState({... state, from:userData.user.UserName})
      console.log(state);
     
      const data={
         UserName:name,
         curuser : userData.user
      }
      console.log(data);
      const res1 = axios.post('http://localhost:8000/home/notify',data)
      .then((res)=>console.log(res))
      .catch(e=>console.log(e));
   }


   const finalchat=()=>{
      setshowchat(true);
   }
   const showch=()=>{
         return         <div> <br/><button className="btn btn-primary" onClick={finalchat}>Chat</button> </div>
      
     
   }

   
   const search=(event)=>{
     console.log(event.target.value)
      axios.get(`http://localhost:8000/home/service/filter/${event.target.value}`)
      .then((res)=>{console.log(res);
            setproviderList(res.data)
      })
      .catch(e=>{console.log(e);
         axios.get('http://localhost:8000/home/service').then((response)=>{
            setproviderList(response.data);
         });
      })
   }

 
   

	

	

	const onTextChange = (e) => {
      
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { message } = state
      console.log(name)
      const to=name
      const from=userData.user.UserName
      setState({ ... state, to,from })
      console.log(state)
		socketRef.current.emit("message", { to,from, message })
		e.preventDefault()
		setState({ message: "", to,from })
	}

	const renderChat = () => {
		return chat.map(({ from, message }, index) => (
			<div key={index}>
				<h3>
					{from}: <span>{message}</span>
				</h3>
			</div>
		))
	}


      return (
<div>
 <div class="brand_color">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Demands </h2>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div >
    <div className="input-group" style={{width: "50%" , margin: "auto" }} >
  <input type="search" id="search"  onChange={search} className="form-control rounded" placeholder="Search" aria-label="Search"
     />
  <button type="button" class="btn btn-outline-primary"    >Search</button>
</div>
    </div>
   

{showchat?

<div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card card-bordered">
				<form onSubmit={onMessageSubmit}>
                    <div class="card-header">
                        <h4 class="card-title"><strong 	>Messenger</strong></h4> 
                    </div>
                    <div class="ps-container ps-theme-default ps-active-y ovr" id="chat-content" style={{overflowY: "scroll !important", height:"400px !important"}}>
                        
                        <div class="media media-chat"> <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                            <div class="media-body">
							{renderChat()}
                            </div>
                        </div>
                        
                        
                        <div class="ps-scrollbar-x-rail" style={{left: "0px", bottom: "0px"}}>
                            <div class="ps-scrollbar-x" tabindex="0" style={{left: "0px", width: "0px"}}></div>
                        </div>
                        <div class="ps-scrollbar-y-rail" style={{top: "0px" ,height: "0px",right: "2px"}}>
                            <div class="ps-scrollbar-y" tabindex="0" style={{top: "0px", height: "2px"}}></div>
                        </div>
                    </div>
                    <div class="publisher bt-1 border-light"> <img class="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/> <input class="publisher-input" name="message"
						            onChange={(e) => onTextChange(e)}
						            value={state.message}
						            id="outlined-multiline-static"
					             	variant="outlined"
						            label="Message" type="text" placeholder="Write something"/>  <button className="btn btn-success">Send</button>	 </div>
					</form>
			    </div>
				
            </div>
        </div>
    </div>
</div>
:<div></div>}
   

  

{/* <div  class="filter">
<Filter />
</div> */}
<div class="product">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="title">
                     
                     <span>We urge to deliver you the best services in your city.</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

     
      {providerList.map((val,key)=>{
         return(
            <div class="product-bg-white">
         <div class="container">
            <div class="row">
               <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <div class="product-box">
                     <i><img src="assets/icon/p1.jpg" alt="/"/></i>
                     <br/>
                     <h2>{val.work.toUpperCase()} </h2>
                     <h3>$ {val.price} </h3>
                     <span>{val.name}</span>
                     <br/>
                     <span>Phone: {val.phone} </span>
                     <br/>
                     <span>Date: {val.date}  </span>
                     <span>Time: {val.time} </span>
                     <br/>
                     <span>Address: {val.address} </span>
                     <span>{val.pin}</span>
                     <br/>
                     <span>City: {val.city} </span>
                     <br/>
                     <button className="btn btn-primary" value={val.name}  onClick={(event)=>{selected(event); setVisible(val.name)}}  >Book</button>
                     <span>  {visible===val.name?<div>{showch()} </div>:<div></div>} </span>
                     
                                
           
                  </div>
               </div>
               </div>
            </div>
         </div>
            );
            })
            }
               
           

        </div>
      );
    }

export default Feed;

