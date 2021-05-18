import react from 'react'
import Navbar from './Navbar'
import Signup from './signup'
import Login from './Login'
import Footer from './Footer'

const Home =()=>{
    return (<div>
        <Navbar />
        <Login/>
        <Footer/>
    </div>)
}

export default Home;