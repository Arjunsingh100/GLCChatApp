import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BsEmojiSmileFill } from 'react-icons/bs'
import EmojiContainer from 'emoji-picker-react'
const ChatInput = ({handleSendMsg}) => {
    const [hideShowEmojiContainer,setHideShowEmojiContainer] = useState(false);
    const [msg,setMsg] = useState('');
    const handleEmojiContainer = () => {
        setHideShowEmojiContainer(!hideShowEmojiContainer);
    }

    const handleEmojiClick = (emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    }

    const handleSend = (e) => {
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('')
        }
    }
    return (
        <Container>
            <div>
                <div className='emoji'>
                    <BsEmojiSmileFill onClick={handleEmojiContainer} />
                    <div style={{ position: 'absolute', bottom: '70px' }}>
                        {hideShowEmojiContainer && <EmojiContainer width='300px' height='400px' theme='dark' emoji-scroll-wraper='-webkit-scrollbar{background-color:green}' onEmojiClick={handleEmojiClick} />}
                    </div>
                </div>
            </div>
            <form className='input-container' onSubmit={handleSend}>
                <input type='text' name='message' onChange={(e) => { setMsg(e.target.value) }} value={msg} />
                <button type='submit'>Send</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
width:100%;
margin-bottom:15px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
.emoji{
  margin-left:10px;
  position:relative;
  svg{
    font-size:1.5rem;
    color: #ffff00c8;
    cursor: pointer;
  }
   
}
.input-container{
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:center;
  gap:30px;
  input{
    width:80%;
    height:40px;
    background-color:#111;
    padding:15px;
    outline:none;
    border:none;
    font-size:20px;
    color:white;
    border-radius:9px;
  }
  button{
    width:60px;
    height:40px;
    border:none;
    outline:none;
    background-color:green;
    border-radius:7px;
    color:white;
    font-size:15px;
    text-align:center;
    cursor:pointer;
  }
}
`
export default ChatInput
