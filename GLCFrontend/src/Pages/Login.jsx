import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
      }

      useEffect(()=>{
        if(localStorage.getItem('current-user')){
            navigate('/')
        }
      },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        const { data } = await axios.post('http://localhost:4500/api/v1/glcChatApp/auth/login', { email, password });
        console.log(data)
        if(data?.success) {
            toast.error(data.message,toastOptions)
        }
        if (data?.success) {
            navigate('/');
            toast.success(data.message,toastOptions)
            localStorage.setItem('current-user', JSON.stringify(data));
        }
    }
    return (
        <>
            <FormContainer className='border border-success'>
                <form className='border border-secondary' onSubmit={(e) => { handleSubmit(e) }}>
                    <h2>Login to Chat</h2>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p><Link to='/register'>Register</Link></p>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
width:100vw;
height:100vh;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;

form{
    width:300px;
    height:auto;
    padding:15px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    row-gap:20px;
    border:2px solid white;
    border-radius:5px;
    p{
      a {
      text-decoration:none;
      }
    }
    button{
        width:100px;
        height:30px;
        background:green;
        color:white;
        text-align:center;
        outline:none;
        border:none;
        cursor:pointer;
    }
}
form input{
    width:250px;
    height:30px;
    padding-left:15px;
    background:transparent;
    outline:none;
    border:1px solid blue;
    color:gray;
    border-radius:5px;
}
`
export default Login
