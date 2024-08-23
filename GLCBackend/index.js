const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const socket = require('socket.io');
const DB = require('./database/dbConnection.js');
const authRoute = require('./routes/authRoutes.js');
const messagesRoute = require('./routes/messageRoute.js');

dotenv.config();
//middlewares
app.use(express.json());
app.use(cors());

app.use('/api/v1/glcChatApp/auth',authRoute)
app.use('/api/v1/glcChatApp/messages',messagesRoute)

//database connection
DB();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server has started on port ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:'http://localhost:5173',
        credentials: true
    }
})

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user',(userId) => {
        onlineUsers.set(userId,socket.id);
    })
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve',data.message);
        }
    })
})