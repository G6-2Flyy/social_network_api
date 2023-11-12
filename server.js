require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')


const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Database is connected! '))
.catch(error => console.log(error))

mongoose.set('debug', true)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", require('./controllers'));

app.listen(PORT, () => console.log('Now listening'));
