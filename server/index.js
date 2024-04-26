const express = require('express')
const app = express()
const preview = require('link-preview-js')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')

const FileUpload = require('./controller/FileUpload')

dotenv.config()

const origins = ['http://localhost:5173']

app.use(helmet())
app.use(
  cors({
    origin: origins
  })
)

app.use(express.json())

app.post('/preview', async (req, res) => {
  const { text } = req.body

  // extract the url from the text
  const urls = text.match(/\bhttps?:\/\/\S+/gi)

  if (!urls) {
    return res.status(400).send('No URL found in the text')
  }

  try {
    const data = await preview.getLinkPreview(urls[0], {
      timeout: 50000
    })
    res.send(data)
  } catch (e) {
    console.log('error', e)
    res.status(500).send('Internal server error')
  }
})

app.post('/upload', FileUpload.upload)
app.get('/uploadprogress', FileUpload.uploaderProgress)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
