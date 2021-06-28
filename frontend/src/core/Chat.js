// import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState,useContext } from "react"
import io from "socket.io-client"
import UserContext from "./../api/context"
import axios from 'axios'

var arr=[];
var user1="";
function Chat() {
	const [ state, setState ] = useState({ message: "", to: "" ,from:""})
	const [ chat, setChat ] = useState([])
	const { userData, setUserData } = useContext(UserContext);
	const socketRef = useRef()
	
	useEffect(() => {
				console.log(userData.user)
				const data=userData.user
				user1=userData.user.UserName
				 axios.get(`http://localhost:8000/home/checknotf/${userData.user.id}`,userData.user)
				.then((res)=>{
				  //console.log(res.data[0].notification);
				  if(res.length===0){
					console.log("No notification")
				  }
				  else{
					arr=[...res.data[0].notification];
				  }
				  
				})
				.catch(e=>console.log(e));
				
				setState({ ...state, from: user1  })
				setState({ ...state, to: arr[0]  })
			  	socketRef.current = io.connect("http://localhost:8000")
			  	socketRef.current.on("message", ({ to,from, message }) => {
				setChat([ ...chat, { to,from, message } ])
				})
		
				socketRef.current.emit("new",data);
				// return () => socketRef.current.disconnect()
	
		},
		[ chat ]
	)




	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}


	const onMessageSubmit = (e) => {
		const {  message } = state
		const from=user1;
		const to=arr[0];
		// setState({ ...state, from: user1  })
		// setState({ ...state, to: arr[0]  })
		// console.log(to);
		// console.log(from);
		// console.log(state);
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
	)
}

export default Chat

