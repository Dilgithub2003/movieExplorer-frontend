import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../styles/Signup.css'
import { api } from '../api/Api';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function Signup() {
    const [formData, setFormData] = useState({
        name : "",
        email: "",
        password: "",
    });
        const navigate = useNavigate();
    
    const [userInterest, setUserInterest] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{ 
        setFormData(
            prev =>({
                ...prev,
                [e.target.name] : e.target.value
            }));
        };

    // 🔹 Toggle selected genres
    const handleUserInterest = (e) => {
    const { value } = e.target;
    setUserInterest(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //  fixed typo
    console.log(formData)
        setLoading(true); // start spinner

    try {
      const response = await api.post('/register', {
        ...formData,
        genres: userInterest
      });
       toast.success("Registration successful! Redirecting..."); //  Toast message
      setTimeout(() => navigate("/login"), 1000); //  Redirect after 2s

      //console.log(" Registration successful:", response.data);
      // Optionally redirect or show message
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
       const msg = err.response?.data?.message || "Something went wrong!";
      toast.error("error " + msg); 
    }finally {
      setLoading(false);
    }
  };

    return (
        <>
        <div className="register">
            <div className="container-reg">
                <h1>Welcome Back</h1>
                <p>Sign in to Continue to MovieHub</p>

                <div className="inputField">
                    <p className='inputItem'>Full Name</p>
                    <input type='text' name='name' onChange={handleChange} className="email-input"></input>
                </div>

                <div className="inputField">
                    <p className='inputItem'>Email Address</p>
                    <input type='text' name='email' onChange={handleChange}  className="email-input"></input>
                </div>

                <div className="inputField">
                    <p className='inputItem'>Password</p>
                    <input type='password' name='password' onChange={handleChange}  className="email-input"></input>
                </div>

                <div className="inputField">
                    <p className='inputItem'>Confirm Password</p>
                    <input type='password' name='passwordConfirm' className="email-input"></input>
                </div>


                <div className="inputField">
                    <p className='inputItem'>Your interest</p>
                <div className="checkboxField">
                        <input type='checkbox'  value={"28"} onChange={handleUserInterest} className="checkbox"/> <p>Action</p>
                        <input type='checkbox' value={"12"} onChange={handleUserInterest} className="checkbox"/><p>Adventure</p>
                        <input type='checkbox' value={"16"} onChange={handleUserInterest} className="checkbox"/><p>Animation</p>

                        <br></br><br></br>
                        <input type='checkbox' value={"35"} onChange={handleUserInterest} className="checkbox"/><p>Comedy</p>
                        <input type='checkbox' value={"80"} onChange={handleUserInterest} className="checkbox"/><p>Crime</p>
                        <input type='checkbox' value={"99"} onChange={handleUserInterest} className="checkbox"/><p>Documentary</p>
                        <input type='checkbox' value={"27"} onChange={handleUserInterest} className="checkbox"/><p>Horror</p>
                        <input type='checkbox' value={"14"} onChange={handleUserInterest} className="checkbox"/><p>Fantasy</p><br/>
                        <input type='checkbox' value={"36"} onChange={handleUserInterest} className="checkbox"/><p>History</p>             
                </div>
                </div>
                <div className="inputField">
                    <button className='submit-btn' onClick={handleSubmit} disabled={loading}>Sign In</button>
                </div>
                <p>Already have an account?  <Link to='/login' className='link'> Sign in instead</Link></p>
            </div>
        </div>

        </>
    )
}

export default Signup
