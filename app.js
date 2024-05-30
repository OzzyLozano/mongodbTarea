const express = require('express')
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const path = require('path')
const cors = require('cors')

// init app & middleware
const app = express()
app.use(express.json())
app.use(cors())

// Configurar los encabezados CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Reemplaza esto con la URL de tu aplicación
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

// Serve static files (including your HTML file)
app.use(express.static(path.join(__dirname, 'public')))

// db conectino
let db
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('Connecterd to database on port: 3000')
    })
    db = getDb()
  }
})

// routes
app.get('/books', (req, res) => {
  // current page
  // const page = req.query.page || 0
  // const booksPerPage = 3

  let books = []
  db.collection('books')
    .find()
    .sort({ rating: -1 })
    // .skip(page * booksPerPage) // for pagination
    // .limit(booksPerPage) // for pagination
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    }).catch(() => {
      res.status(500).json({error: 'Could not fetch data'})
    })
})

app.get('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc)
      }).catch(err => {
        res.status(500).json({ error: 'Could not fetch data' })
      })
  } else {
    res.status(500).json({ error: 'Not a valid document id' })
  }
})

app.post('/post-book', (req, res) => {
  const book = req.body

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
    }).catch(err => {
      res.status(500).json({ eror: 'Could not create a new document' })
    })
})

app.delete('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result)
      }).catch(err => {
        res.status(500).json({ error: 'Could not delete the document' })
      })
  } else {
    res.status(500).json({ error: 'Not a valid document id' })
  }
})

app.patch('/books/:id', (req, res) => {
  const updates = req.body

  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
      .then(result => {
        res.status(200).json(result)
      }).catch(err => {
        res.status(500).json({ error: 'Could not update the document' })
      })
  } else {
    res.status(500).json({ error: 'Not a valid document id' })
  }
})
