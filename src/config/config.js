const dotenv = require('dotenv')

dotenv.config()
const prod = process.env.NODE_ENV === 'production'
module.exports = {
    backendUrl: prod ? process.env.BACKEND_URL : 'http://localhost:3005',
}