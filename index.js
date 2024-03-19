const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

//app.use(express.static('dist'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => Math.floor(Math.random() * 9999)


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const d = new Date()
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
    <p>${d}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person)
        res.json(person)
    else
        res.status(400).json({
            error: 'id not found'
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id != id)
    res.status(200).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const list = persons.filter(p => p.name == '')

    if (list.length > 0) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: "number missing or name already exists"
        })
    }

    const personObject = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(personObject)
    res.status(200).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})