require('dotenv').config();

const express = require ('express')
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')

//express app
const app = express()

//middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes, attaches all of workoutRoutes to the app
app.use('/api/workouts', workoutRoutes)
// app.get('/', (req,res) => {
//     res.json({msg: 'Welcome to the app!'})
// })

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests when connected to database
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port 4000')
        })
    })
    .catch(err => {
        console.log(err)
    })