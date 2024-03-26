const mongoose = require('mongoose')

if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('review your input and try again')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://leoguti182:${password}@cluster0c.ygy7q5b.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0C`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const generateId = () => Math.floor(Math.random() * 9999)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    id: generateId(),
    name: name,
    number: number,
})

if (process.argv.length == 5) {
    person.save().then(res => {
        console.log(person)
        mongoose.connection.close()
    })
} else if (process.argv.length == 3) {
    Person.find({}).then(res => {
        console.log('phonebook:')
        res.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}