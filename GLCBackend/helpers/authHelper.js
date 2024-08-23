const bcrypt = require('bcrypt');

module.exports.hashedPassword = async (password) =>{
    try {
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password,saltRound);
        return hashPassword;
    } catch (error) {
        console.log(error)
    }
}

module.exports.comparePassword = async (password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword);
}