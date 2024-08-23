import React from 'react'
import styled from 'styled-components'
import {v4 as uuidv4} from 'uuid'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [uniqueId, setUniqueId] = useState(uuidv4());
    const navigate = useNavigate();

    const generateUUID = () => {
        const newUUID = uuidv4();
        console.log(newUUID); 
        setUniqueId(newUUID);
      };

    const handleRegister = async (e) => {
        e.preventDefault();
        generateUUID();
        const {data} = await axios.post('http://localhost:4500/api/v1/glcChatApp/auth/register',{
            userId:uniqueId,
            name,email,password,phone,role
        })
        if(data.success) {
            navigate('/login');
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('current-user')){
            navigate('/')
        }
      },[])
    return (
        <FormContainer className='border border-success'>
            <form className='border border-secondary' onSubmit={(e) => { handleRegister(e) }}>
                <h2>Signup to Chat</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input required type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input required type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNum">Phone Number</label>
                    <input required type="phone" onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="phoneNum" placeholder="Enter phone number" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input required type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" placeholder="Create password" />
                </div>
                <div className='form-group'>
                    <select required value={role} onChange={(e) => { setRole(e.target.value) }}>
                        <option value='Teacher'>Teacher</option>
                        <option value='Student'>Student</option>
                        <option value='Institute'>Institute</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p><Link to='/login'>Login</Link></p>
            </form>
        </FormContainer>
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
    border-radius:5px;
}
form select {
width:250px;
    height:30px;
    padding-left:15px;
    background:transparent;
    outline:none;
    border:1px solid blue;
    border-radius:5px;
}
`
export default Register
