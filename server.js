const express = require('express')
const app = express()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const path = require('path');

const port = 8080

app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(port, ()=>{
    console.log("Done")
})