require('dotenv').config()
const jwt = require("jsonwebtoken")

async function verify(token) {
  try {
    const ok = await jwt.verify(token, process.env.SK).ok
    return ok
  } catch (err) {
    // console.error(err)
  }
}

async function sign() {
  const payload = {
    ok : true,
    PK: process.env.PSK
  }, opt = {
    expiresIn : '2min'
  }
  try {
    let token =  jwt.sign(payload,process.env.SK,opt)
    return token
    
  } catch (err) {
    // console.error(err)
  }
}

module.exports = {
  sign,
  verify,
}
