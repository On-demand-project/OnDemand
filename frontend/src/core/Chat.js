import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState,useContext } from "react"
import io from "socket.io-client"
import UserContext from "./../api/context"
function Chat() {
	const [ state, setState ] = useState({ message: "", to: "" ,from:""})
	const [ chat, setChat ] = useState([])
	const { userData, setUserData } = useContext(UserContext);

	const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:8000")
			socketRef.current.on("message", ({ to,from, message }) => {
				setChat([ ...chat, { to,from, message } ])
			})
			// console.log(userData.user.UserName)
			var data={
				username:"New"
			}
			socketRef.current.emit("new",data);
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const {  message } = state
		const to="newserv";
		const from="New";
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

