require('dotenv').config()
const { MongoClient } = require('mongodb'),
  uri =
    `mongodb+srv://kebalepile:${process.env.PWD}@cluster0-l3y3d.mongodb.net/test?retryWrites=true&w=majority`
// hide this key in production
// 
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
      articles = collection.find({}, { projection: { _id: 0 } })
    articles = await articles.toArray()
    // console.log('articles available')
    // console.log(articles)
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
    // console.log(article)
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
    console.log(res)
    client.close()
  } catch (err) {
    console.error(err)
  }
}

async function deleteAll() {
  try {
    let client = await connect(),
      db = client.db('keba_blog'),
      collection = db.collection('articles'),
      res = await collection.deleteMany()
    console.log('deleted all')
    console.log(res.result)
    client.close()
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  articles,
  article,
  upload,
  deleteAll,
}
