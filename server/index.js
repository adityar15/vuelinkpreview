const express = require('express')
const app = express()
const preview = require("link-preview-js")
const helmet = require('helmet')
const cors = require('cors')


const origins = [
    "http://localhost:5173",
]

app.use(helmet())
app.use(cors({
    origin: origins
}))

app.use(express.json())

app.post('/preview', async (req, res) => {

    const {text} = req.body

    // extract the url from the text
    const urls = text.match(/\bhttps?:\/\/\S+/gi);
   
    if(!urls) {
        return res.status(400).send("No URL found in the text")
    }
   

    const data = await preview.getLinkPreview(urls[0])

    console.log("data", data)

    res.send(data)
   
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})