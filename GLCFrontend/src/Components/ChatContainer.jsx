import React, { useRef } from 'react'
import { useState, useEffect, } from 'react'
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';

const ChatContainer = (props) => {
  const { currentChat, currentUser, handleConatactsDis, socket } = props;
  const scrollRef = useRef();
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [condition, setCondition] = useState(true);
  const handleSendMsg = async (msg) => {
    try {
      await axios.post('http://localhost:4500/api/v1/glcChatApp/messages/createMessages', {
        from: currentUser?.user?.userId,
        to: currentChat?.userId,
        msg: msg
      })

      socket.current.emit('send-msg', {
        to: currentChat.userId,
        from: currentUser.user.userId,
        message: msg
      })

      const msgs = [...message];
      msgs.push({ fromSelf: true, msg: msg });
      setMessage(msgs);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, msg: msg });
      })
    }
  }, [])

  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [message])

  useEffect(() => {
    fetchAllMessages();
  }, [currentChat])
  const fetchAllMessages = async () => {
    const messages = await axios.post('http://localhost:4500/api/v1/glcChatApp/messages/getAllMessages', {
      from: currentUser.user.userId,
      to: currentChat.userId,
    });
    setMessage(messages?.data?.messages)
  }

  const handleSendCondition = () => {
    handleConatactsDis(condition)
  }

  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <h3 onClick={handleSendCondition}>Back</h3>
          <img src='https://avatar.iran.liara.run/public/boy?username=Ash' alt='Avatar' />
          <h2>{currentChat.name}</h2>
        </div>
        <Logout></Logout>
      </div>
      <div className='chat-message'>{
        message?.map((msg, index) => {
          return (
            <div className='msg-container' ref={scrollRef} key={index}>
              <p className={`${msg.fromSelf || msg.senderId == currentUser?.user?.userId ? "sended" : "recieved"}`}>{msg.msg}</p>
            </div>
          )
        })
      }</div>
      <ChatInput className='chat-input' handleSendMsg={handleSendMsg}></ChatInput>
    </Container>
  )
}

const Container = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
jus tify-content:space-between;
.chat-header{
  width:100%;
  height:80px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-around;
  background-color:#444;
  .user-details{
    display:flex;
    align-items:center;
    gap:20px;
    img{
      width:60px;
      height:60px;
    }
    h2{
      color:#f7f2f7;
    }
    h3{
      color:#f7f2f7;
    }
  }
  }
  .chat-message{
    width:100%;
    min-height:80%;
    padding-left:20px;
    display:flex;
    flex-direction:column;
    row-gap:20px;
    align-items:flex-end;
    overflow-y:scroll;
    &::-webkit-scrollbar{
      width:0.5remrem;
      &-thumb{
        background-color:red;
        width: 1rem;
        border-radius: 0.3rem;
      }
    }
    .msg-container {
      width:100%;
      margin-bottom:10px;
      .sended{
        width:60%;
        margin-left:85px;
        display:inline;
        background-color: #4f04ff21;
        padding:10px;
        border-radius:6px;
        color:gray;
      }
      .recieved {
        width:60%;
        color:gray;
        padding-right:150px;
        display:inline;
        padding:10px;
        background-color:#9900ff20;
        border-radius:6px;
      }
    }
}
.chat-input{
    width:100%;
    height:80px;
    background-color:#4565ff;
  }
  @media screen and (min-width:500px){
     .chat-header .user-details h3{
        display:none;
      }
     }
`
export default ChatContainer
