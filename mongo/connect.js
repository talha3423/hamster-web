const monsoose = require('mongoose')
require('dotenv').config()
const Connect = async () => {
    try {
        await monsoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
        process.exit(1)
    }
}
module.exports = Connect