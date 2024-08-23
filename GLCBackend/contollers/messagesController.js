const connection = require('../database/db.js');


module.exports.messagesController = async (req, res) => {
    try {
        const { to, from, msg } = req.body;
        connection.query(`INSERT INTO glcchatapp.messages (senderId,receiverId,msg) VALUES ('${from}','${to}','${msg}')`, async (err, result) => {
            if (err) {
                console.log(err)
            }
            res.status(200).send({
                success: true,
                message: 'Message added successfully to database',
                result
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Erro while creating messages',
            error
        })
    }
}

module.exports.getAllMessages = async (req, res) => {
    try {
        const {from,to} = req.body;
        connection.query(`SELECT * FROM glcchatapp.messages WHERE (senderId='${from}' AND receiverId='${to}') OR (senderId='${to}' AND receiverId='${from}')`, async (err,result) => {
            if(err) {
                console.log(err)
            }
            res.status(200).send({
                success:true,
                message:'All messaged fetched successfully',
                messages:result
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Erro while fetching messages',
            error
        })
    }
}