const connection = require('../database/db.js');
const { hashedPassword, comparePassword } = require('../helpers/authHelper.js');
const JWT = require('jsonwebtoken');

module.exports.registerController = async (req, res) => {
    try {
        const { userId, name, email, phone, role, password } = req.body;
        connection.query(`SELECT * FROM glcchatapp.user WHERE email='${email}'`, async (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                return res.send({ success: false, data: result, action: 'You are already register with us' })
            }

            const Password = await hashedPassword(password);

            connection.query(`INSERT INTO glcchatapp.user (userId,name,email,pass,phone,roll) VALUES ('${userId}','${name}','${email}','${Password}','${phone}','${role}')`,
                (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.status(200).send({ success: true, action: 'You have register successfully', data: result })
                })

        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while register',
            Error: error
        })
    }
}

module.exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        connection.query(`SELECT * FROM glcchatapp.user WHERE email='${email}'`, async (err, result) => {
            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: 'You email not exits'
                })
            }
            const match = await comparePassword(password, result[0].pass);
            if (match === false) {
                return res.status(200).send({
                    success: false,
                    message: 'Password is wrong'
                })
            }
            const token = await JWT.sign({ id: result.id }, process.env.SECRET_KEY, { expiresIn: '7d' });
            res.status(200).send({
                success: true,
                message: 'User login successfully',
                user: {
                    userId:result[0].userId,
                    name: result[0].name,
                    email: result[0].email,
                    phone: result[0].phone,
                    role: result[0].roll
                },
                token,
            })
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while Login',
            Error: error
        })
    }
}

module.exports.getAllUsers = async (req,res) => {
    try {
        const userId = req.params.id;
        connection.query(`SELECT * FROM glcchatapp.user WHERE userId != '${userId}'`, async (err,result) =>{
            if(err){
                console.log(err);
            }
            else {
            
                res.status(200).send({
                    success:true,
                    message:"All user fetched successfully",
                    users:result
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Facing error while fetching users',
            error:error
        })
    }
}

module.exports.logout=async (req,res,next)=>{
    try{
        if(!req.param.id) return res.json({msg:'User Id i required'});
        onlineUser.delete(req.params.id)
        return res.status(200).send();
    }
    catch(err){
        next(err);
    }
}