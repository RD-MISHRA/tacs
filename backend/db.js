const mongoose = require('mongoose')


const URL =`mongodb+srv://rdmmmut:73zZsJDP55NxPoJX@cluster0.aqprrhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(URL, { family: 4 })
    .then(() => { console.log('connected  Database') })
    .catch((err) => { console.log('error in connection with database ' + err) })


const schema = new mongoose.Schema({
   
    name: String,
    notes: [{
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        status: Boolean
    }]
})

const collection = mongoose.model('keepnote', schema)

module.exports = collection
