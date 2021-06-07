import react,{Component,useEffect,useState,useContext,useRef} from 'react'
import axios from "axios";
import UserContext from '../api/context'
import TextField from "@material-ui/core/TextField"
import io from "socket.io-client"

const Feed=()=>{
   const { userData, setUserData } = useContext(UserContext);

   const [providerList,setproviderList]=useState([]);

   useEffect(()=>{
      axios.get('http://localhost:8000/home/service').then((response)=>{
         setproviderList(response.data);
      });
   },[])

   const selected=(event)=>{
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

   



   const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:8000")
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
					{name}: <span>{message}</span>
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
                        <h2>Service Providers</h2>
                    </div>
                </div>
            </div>
        </div>

    </div>


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
               
           

        </div>
      );
    }

export default Feed;

