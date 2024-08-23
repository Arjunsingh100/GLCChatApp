import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
      const id= await JSON.parse(localStorage.getItem('current-user')).user.userId;
      const data=await axios.get(`http://localhost:4500/api/v1/glcChatApp/auth/logout/${id}`)
       if(data.status===200){
          localStorage.clear();
          navigate('/login');
       }
    }
  return (
    <Container>
    <button onClick={handleLogout}>Logout</button>
    </Container>
  )
}

const Container = styled.div`
button{
    width:100px;
    height:30px;
    background-color:red;
    color:white;
    text-align:center;
    font-size:15px;
    outline:none;
    border:none;
    border-radius:5px;
}
`

export default Logout
