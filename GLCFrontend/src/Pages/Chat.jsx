import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Contacts from '../Components/Contacts';
import ChatContainer from '../Components/ChatContainer';
import Welcome from '../Components/Welcome';
import axios from 'axios';
import { io } from 'socket.io-client';

const Chat = () => {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState();
  const [currentChat, setCurrentChat] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    settingCurrentUser();
  }, [])
  const settingCurrentUser = async () => {
    if (!localStorage.getItem('current-user')) {
      navigate('/login');
    }
    else {
      setCurrentUser(
        await JSON.parse(localStorage.getItem('current-user'))
      );
    }
  }
  useEffect(() => {
    if (currentUser) {
      socket.current = io('http://localhost:4500');
      socket.current.emit('add-user', currentUser?.user?.userId)
    }
  }, [currentUser])
  useEffect(() => {
    getContacts();
  }, [currentUser])
  const getContacts = async () => {
    if (currentUser) {
      const { data } = await axios.get(`http://localhost:4500/api/v1/glcChatApp/auth/getUsers/${currentUser?.user?.userId}`);
      console.log(data)
      setContacts(data?.users);
    }
  }

  const handleChangeChat = (chat) => {
    setCurrentChat(chat)
  }

  const checkScreen = window.matchMedia("(min-width:500px)");
  const contactsDisplay = useRef("");
  const chatDisplay = useRef("");
  const handleStyle = (e) => {
    if (checkScreen.matches) {
      e.preventDefault();
      e.stopPropagation();
    }
    else {
      chatDisplay.current.style.display = 'inline-block';
      chatDisplay.current.style.width = '100vw'
      contactsDisplay.current.style.display = 'none';
    }
  }
  const handleConatactsDis = (condition) => {
    chatDisplay.current.style.display = 'none';
    contactsDisplay.current.style.display = 'inline-block';
    contactsDisplay.current.style.width = '100vw';
  }

  return (
    <Container>
      <div className="container" onClick={handleStyle} ref={contactsDisplay}>
        <Contacts contacts={contacts} changeChat={handleChangeChat} />
      </div>
      <div className="chat-container" ref={chatDisplay}>
        {
          currentChat === undefined ? (<Welcome />) : (<ChatContainer currentUser={currentUser} currentChat={currentChat} handleConatactsDis={handleConatactsDis} socket={socket} />)
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
width:100vw;
height:100vh;
overfloy-y:hidden;
display:flex;
flex-direction:row;
justify-content:center;
column-gap:10px;
padding-top:15px;
background-color:#ebe9e6;
.container{
  width:28vw;
  height:100vh;
  background-color:#fff;
  border-radius:12px;
}
 .chat-container{
  width:68vw;
  border-radius:12px;
  overflow:hidden;
  background-color:#fff;
 }
@media screen and (max-width:992px){
  .container{
    width:45vw;
  }
  .chat-container{
    width:55vw;
  }
}
@media screen and (max-width:500px){
  .container{
    width:100vw;
  }
  .chat-container{
    display:none;
  }
}
`

export default Chat
