import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState,useContext } from "react"
import io from "socket.io-client"
import UserContext from "./../api/context"
import axios from 'axios'

function Chat() {
	const [ state, setState ] = useState({ message: "", to: "" ,from:""})
	const [ chat, setChat ] = useState([])
	const { userData, setUserData } = useContext(UserContext);
	const socketRef = useRef()
	var data;
	var to1;
	var to;
	var from;
	var user="";
	useEffect(
		() => {

			if(userData.user){
				// data=userData.user
				user=userData.user.UserName
				const res = axios.post('http://localhost:8000/home/checknotf',userData.user)
				.then((res)=>{
				  console.log(res.data[0].notification);
				  if(res.length===0){
					console.log("No notification")
				  }
				  else{
				    to1=res.data[0].notification[0];
				  }
				  
				})
				.catch(e=>console.log(e));
				
			  }
			  socketRef.current = io.connect("http://localhost:8000")
			  socketRef.current.on("message", ({ to,from, message }) => {
				setChat([ ...chat, { to,from, message } ])
			})
			var data={
				UserName:"New"
			}
			// if(userData.user){
			setState({ ...state, from: user  })
			socketRef.current.emit("new",data);
			return () => socketRef.current.disconnect()
			// }

			
		},
		[ chat ]
	)




	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const {  message } = state
		//const to="newserv";
		console.log(state)
		const from=state.from;
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
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
				{/* <div className="name-field">
					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
				</div> */}
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
	)
}

export default Chat

