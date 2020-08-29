const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

const EmployeeRoute = require('./routes/employeeRoute')
const AuthRoute = require('./routes/auhRoute')

mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    console.log('database connection established')
})


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))
const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)
