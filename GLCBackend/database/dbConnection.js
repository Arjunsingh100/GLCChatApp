const connection = require('./db.js')

const DB = async () => {
    await connection.connect((err)=>{
        if(err){
            console.log('There is some error while connecting database')
        }
        console.log('Database connected successfully');
    })
}

module.exports=DB;

