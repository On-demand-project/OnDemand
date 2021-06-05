import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState ,useContext} from "react"
import io from "socket.io-client"
import UserContext from "../api/context";

const Chat=()=>{
	const { userData, setUserData } = useContext(UserContext);
	const token =userData.token;
    const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()
	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:8000",{ transports: ["websocket"] ,
				query: {token}
			  })
            console.log(socketRef.current)
			socketRef.current.on("message", ({ name, message }) => {
				
				setChat([ ...chat, { name, message } ])
			})
			socketRef.current.on("private", ( data ) => {
				console.log(data);
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const val="Hrtg rtk l";
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		socketRef.current.emit("private", {val })
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

	return (
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
	)
}

export default Chat;



	{/* <form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
				</div>
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
			</form> */}