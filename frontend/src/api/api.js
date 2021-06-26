import axios from "axios";

export const create =(data)=>{
    axios.post('http://localhost:8000/home/post',data)
    .then(res => console.log(res))
    .catch(e => console.log(e));
};