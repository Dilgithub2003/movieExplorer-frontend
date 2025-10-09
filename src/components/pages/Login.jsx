import React, { useState } from 'react'
import '../styles/login.css'
import { toast } from 'react-toastify';
import { api } from '../api/Api';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLoginSubmit =async ()=>{
        if( email == "" || password==""){
            toast.error("Please enter username and password.")
        }
        try{
            const response = await api.post('/login',{
                "email" : email,
                "password": password
            })
            console.log(response);
            toast.success(`${response.data.message} Redirecting`);
            localStorage.setItem("token",response.data.token);
            console.log(localStorage.getItem("token"))
            setTimeout(()=>{ navigate('/')},500);
        }catch(err){
            console.log({error:err})
            toast.error("Invalid username or password")
        }
    }
    return (
        <>
        <div className="login">
            <div className="container-log">
                <h1>Welcome Back</h1>
                <p>Sign in to Continue to MovieHub</p>
                <div className="inputField">
                    <p className='inputItem'>Email Address</p>
                    <input type='text'  className="email-input" onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="inputField">
                    <div className='pwdTopic'><p>Password</p><Link to='/regiter'><p>Forgot password</p></Link></div>
                    <input type='text' className="email-input" onChange={(e)=>setPassword(e.target.value)} ></input><br></br>
                </div>
                <div className="inputField">
                    <button className='submit-btn' onClick={handleLoginSubmit}>Sign In</button>
                </div>
                <p>Don't have an account? <Link to='/register' className='link'>Sign up instead</Link></p>
            </div>
        </div>

        </>
    )
}

export default Login
