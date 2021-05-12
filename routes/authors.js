const express = require('express')
const router = express.Router()
const Author = require('../models/author')


// show all the authors
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i') // i for  case sensitive
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions: req.query })
    } catch {
        res.redirect('/')
    }
})

// takes us to create new author
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})


// add new author to the list
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthors._id}`)
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error while creating author'
        })
    }

})

module.exports = router;