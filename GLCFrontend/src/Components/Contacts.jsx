import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Contacts = (props) => {
    const { contacts, changeChat } = props;
    const [currentUser,setCurrentUser] = useState(undefined);
    const [currentSelect, setCurrentSelect] = useState(undefined)

    useEffect(()=>{
        getCurrentUser();
    },[])
    const getCurrentUser = async () => {
        const data = await JSON.parse(localStorage.getItem('current-user'));
        console.log(data)
        setCurrentUser(data?.user)
    }
    const changeCurrentChat = (index,ele) => {
        setCurrentSelect(index);
        changeChat(ele)
    }
    return (
        <Container>
            <div className='brand'>
                <h3>Chatting App</h3>
            </div>
            <div className='contacts'>
                {contacts?.map((ele, index) => {
                    return (
                        <div className={`contact ${index === currentSelect ? "selected" : ""
                            }`} key={index} onClick={() => {
                                changeCurrentChat(index, ele)
                            }}>
                            <div className='avatar'><img src='https://avatar.iran.liara.run/public/boy?username=Ash' alt='avatar' /></div>
                            <div className='username'>
                                <h2>{ele.name}</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='current-user'>
                <div className='avatar'>
                    <img src='https://avatar.iran.liara.run/public/boy?username=Ash' alt='avatar' />
                </div>
                <div className='current-username'>
                    <h2>{currentUser?.name}</h2>
                </div>
            </div>
        </Container>
    )
}


const Container = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between ;
.brand{
    width:100%;
    height:90px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    img{
        width:60px;
        height:60px;
    }
    h3{
        color:#6c3ed6;
    }
}
.contacts{
    width:100%;
    height:80vh;
    display:flex;
    flex-direction:column;
    justify-content: flex-start; 
    align-items:center;
    overflow:auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: red;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact{
        width:99%;
        height:90px;
        cursor:pointer;
        background-color:#131346;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        align-items:center;
        border-bottom:1px solid #000;
        border-radius:10px;
        transition:all 1s ease;
        .avatar img{
            width:60px;
            height:60px;
        }
        .username h2{
            color:white;
        }
    }
    .selected {
      background-color: #9a86f3;
    }
}
.current-user{
  width:100%;
  height:90px;
  background-color:#9ff069;
  border-radius:11px;
  margin-bottom:20px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-around;
  .avatar img{
    height:80px;
    width:80px;
  }
   .current-username h2{
    color:#414542;
  }
}
`
export default Contacts
