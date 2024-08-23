import React from 'react'
import styled from 'styled-components'
const Welcome = () => {
  return (
    <Container>
      <h2>Welcome to Chatting App</h2>
    </Container>
  )
}

const Container = styled.div`
height:80vh;
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
`

export default Welcome
