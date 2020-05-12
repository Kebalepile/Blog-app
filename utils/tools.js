const { compare, genSalt, hash } = require('bcrypt')
// turns response to json
module.exports.stringify = (obj) => {
  return JSON.stringify(obj)
}
// turns data to js object
module.exports.parse = (obj) => {
  return JSON.parse(obj)
}
module.exports.match = async (hashed, value) => {
  try {
    let res = await compare(value, hashed)
      // returns boolean
    return res
  } catch (err) {
    return err.message
  }
}
module.exports.hash = async (value) => {
  const rounds = 10
  try {
    let salt = await genSalt(rounds)
    let hasedValue = await hash(value, salt)
    return hasedValue
  } catch (err) {
    return 'hash function not working'
  }
}
// check if requirements are true
module.exports.pass = ({ req, method}) => {
  if (req.method.toLowerCase() === method) {
    return true
  }
  return false
}
