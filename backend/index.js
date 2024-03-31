const express = require('express')
const cors = require('cors')
//const port = process.env.PORT || 8000;
const port =8000;
const app = express()

const collection = require('./db');

//middleware
app.use(express.json())
app.use(cors())

app.get("/abc", (req, res) => {
    res.send("hello")
})

app.get("/note", async (req, res) => {
    try {
        const doc = await collection.findOne({ name: "user" })
        // console.log("data : " + doc)
        res.send(doc)
    } catch (error) {
        console.log(error)
    }
})


app.post("/note", async (req, res) => {
    try {
        const doc = await collection.findOne({ name: "user" })
        // console.log(doc)
        doc.notes.push(req.body)
        const result = await doc.save()

        if (result) {
            // console.log(result.notes)
            res.send(result.notes)
        }
        else {
            res.send("notadded")
        }
    } catch (error) {
        console.log(error)
    }
})

app.post('/note/done/:id', async (req, res) => {
    const id = req.params.id
    try {
        const doc = await collection.findOne({ name: "user" })
        let ans = doc.notes[id].status
        doc.notes[id].status = !ans
        doc.save()
        res.send(doc)
    } catch (error) {
        console.log("error while note done patch : " + error)
    }
})
app.patch("/note/:id", async (req, res) => {
    const id = req.params.id
    const { title, content } = req.body
    try {
        const doc = await collection.findOne({ name: "user" })
        doc.notes[id] = { title: title, content: content }
        doc.save()
        res.send(doc.notes)
    } catch (error) {
        console.log("error while note patch : " + error)
    }
})

app.delete("/note/:id", async (req, res) => {
    const id = req.params.id
    try {
        const doc = await collection.findOne({ name: "user" })
        doc.notes.splice(id, 1)
        doc.save()

        res.send("deleted")
    } catch (error) {
        console.log("error while note delete : " + error)
    }

})


app.post("/notes", async (req, res) => {
    // console.log(req.body)
    // const {title , content}=req.body
    try {
        const data = new collection({
            name: "user",
            notes: []
        })
        const doc = await data.save()
        console.log(doc)
        res.send("done")
    } catch (error) {
        console.log("error")
    }
})




app.listen(port, () => {
    console.log('listening to port ' + port)
})