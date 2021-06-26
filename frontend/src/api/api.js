import axios from "axios";

export const create =(data)=>{
    axios.post('https://ondemand-00.herokuapp.com/home/post',data)
    .then(res => console.log(res))
    .catch(e => console.log(e));
};