import react,{Component,useEffect,useState,useContext,useRef} from 'react'
import ReactDOM from 'react-dom';
import axios from "axios";
import UserContext from '../api/context'
import { Button } from 'reactstrap';
import TextField from "@material-ui/core/TextField"
import io from "socket.io-client"
// const URL = "http://localhost:8000";
// const socket = io(URL, { autoConnect: false });


// socket.on("connect", () => {
//    console.log(socket.id); 
//  });


const Feed=()=>{
   // let socket=window.socket
   const { userData, setUserData } = useContext(UserContext);

   const [providerList,setproviderList]=useState([]);





   const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()
    var socket=io.connect();
	useEffect(
		() => {
            
			socketRef.current = io.connect("http://localhost:8000",{ transports: ["websocket"] })
            console.log(socketRef.current)
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					<span>{message}</span>
				</h3>
			</div>
		))
	}












   useEffect(()=>{
      axios.get('http://localhost:8000/home/service').then((response)=>{
         setproviderList(response.data);
      });
   },[])



   const showchat=(event)=>{
      console.log(event.target.value);
      ReactDOM.render(<button class='btn btn-primary' onClick={chat(event.target)}>Text</button>, document.getElementById('chat'));
      
   }

   // const chat=(e)=>{
   //    console.log(e.value);

      

// Emit events
// btn.addEventListener('click', function(){
   //  console.log(socket.id);
//     socket.emit('private message', {
//         message: message.value,
//         handle: handle.value
       
//     } , { id: socket.id});
//     message.value = "";
// });

// message.addEventListener('keypress', function(){
//     socket.emit('typing', handle.value);
// })

// Listen for events
// socket.on('private message', function(data){
//     feedback.innerHTML = '';
//     output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
// });

// socket.on('typing', function(data){
//     feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
// });


   // }
   
   const msg=(event)=>{
      
      var obbj={
         user: userData.user.UserName,
         m:event.target.value,
      }
      console.log(obbj);
   }


   const selected=(event)=>{

      showchat(event);

      







      console.log(event.target.value);
      const name=event.target.value;
      const data={
         UserName:name,
         curuser : userData.user
      }
      console.log(data);
      const res = axios.post('http://localhost:8000/home/notify',data)
      .then((res)=>console.log(res))
      .catch(e=>console.log(e));
   }

   

      return (
<div>
 <div class="brand_color">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Service Providers</h2>
                    </div>
                </div>
            </div>
        </div>

    </div>



  

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
                     <i><img src="assets/icon/p1.jpg"/></i>
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
                     <button className="btn btn-primary" value={val.name} onClick={selected}>Book</button>
                     


            
                     
                  </div>
               </div>
               </div>
            </div>
         </div>
            );
            })
            }








<div className="card">
		
      <div className="render-chat">
         <h1>Chat Log</h1>
         {renderChat()}
         <form onSubmit={onMessageSubmit}>
            <div>
               <TextField
               name="message"
               onChange={(e) => onTextChange(e)}
               value={state.message}
               id="outlined-multiline-static"
               variant="outlined"
               label="Message"
               />
            </div>
            <button>Send Message</button>
         </form>
      </div>
         
   </div>
   

         {/* <div id="mario-chat" >
            <h2>Chat</h2>
            <div id="chat-window">
                <div id="output"></div>
                <div id="feedback"></div>
            </div>
            <input id="handle" type="text" placeholder="Handle" />
            <input id="message" type="text" onChange={msg} placeholder="Message" />
            <button id="send">Send</button>
        </div>    */}
           

        </div>
      );
    }

export default Feed;








// import { io } from "socket.io-client";
 
// const io = require("socket.io-client");
// const socket = io("https://127.0.0.1:8000", {
//   withCredentials: true,
//   transportOptions: {
//     polling: {
//       extraHeaders: {
//         "my-custom-header": "abcd"
//       }
//     }
//   }
// });

// var socket = io.connect('http://localhost:8000');