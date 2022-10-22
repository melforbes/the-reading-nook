const fs = require('fs').promises
const express = require('express')
const router = express.Router()

//routes

router.post('/books', (req, res) => {
  const bookByMood = req.body.mood
  console.log(bookByMood)

  fs.readFile('./books.json', 'utf-8')
    .then((data) => {
      const parsedData = JSON.parse(data)
      const selectedMood = {
        books: parsedData.books.filter(
          (element) => element.mood === bookByMood
        ),
      }
      return res.render('books', selectedMood)
    })
    .catch((err) => {
      return res.status(400).send(err.message)
    })
})

router.get('/moods', (req, res) => {
  const mood = req.body.definition
  console.log(mood)

  fs.readFile('./books.json', 'utf-8')
    .then((data) => {
      const parsedData = JSON.parse(data)
      const moodDefinitions = {
        books: parsedData.books.find(
          (definitions) => definitions.definition === mood
        ),
      }
      return res.render('moods', moodDefinitions)
    })
    .catch((err) => {
      return res.status(400).send(err.message)
    })
})

module.exports = router
