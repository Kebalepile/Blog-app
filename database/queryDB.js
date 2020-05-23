require('dotenv').config()
const { MongoClient } = require('mongodb'),
  uri = `mongodb+srv://kebalepile:${process.env.PWD}@cluster0-l3y3d.mongodb.net/test?retryWrites=true&w=majority`

async function connect() {
  try {
    let client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    client = await client.connect()
    return client
  } catch (err) {
    console.error(err)
  }
}

async function articles() {
  try {
    let client = await connect(),
      db = client.db('keba_blog'),
      collection = db.collection('articles'),
      articles = await collection.find({}, { projection: { _id: 0 } }).toArray()

    client.close()
    return articles
  } catch (err) {
    console.error(err)
  }
}

async function article(id) {
  try {
    let client = await connect(),
      db = client.db('keba_blog'),
      collection = db.collection('articles'),
      article = await collection.findOne({ id }, { projection: { _id: 0 } })

    client.close()
    return article
  } catch (err) {
    console.error(err)
  }
}
async function upload(article) {
  try {
    let client = await connect(),
      db = client.db('keba_blog'),
      collection = db.collection('articles'),
      res = await collection.insertOne(article)

    client.close()
    return res.result.ok === 1 ? true : false
  } catch (err) {
    console.error(err)
  }
}

async function deleteAll(name) {
  try {
    let client = await connect(),
      db = client.db('keba_blog'),
      collection = db.collection(name),
      res = await collection.deleteMany()
    console.log(res)
    client.close()
  } catch (err) {
    console.error(err)
  }
}

async function credentials() {
  try {
    let client = await connect(),
      db = client.db('keba_blog'),
      collection = db.collection('credentials'),
      user = await collection.find({}, { projection: { _id: 0 } }).toArray()
    client.close()
    return user[0].pwd
  } catch (err) {
    console.error(err)
  }
}
async function getCollections() {
  try {
    let client = await connect(),
      db = client.db('keba_blog'),
      list = await db.listCollections().toArray()

    client.close()
    return list
  } catch (error) {
    console.error(error)
  }
}

async function createCollection(name) {
  try {
    let client = await connect(),
      db = client.db('keba_blog')

    await db.createCollection(name)
    client.close()
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  articles,
  article,
  upload,
  deleteAll,
  credentials,
  getCollections,
  createCollection,
}
