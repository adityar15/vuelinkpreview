const formidable = require('formidable')
const AWS = require('aws-sdk')
const fs = require('fs')

class FileUploadController {

  s3
  uploader

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    })


    this.upload = this.upload.bind(this);
    this.uploaderProgress = this.uploaderProgress.bind(this);
  }

  upload(req, res) {


    const form = new formidable.IncomingForm()





    form.parse(req, (err, fields, files) => {
      // form.parse starts here

      console.log('fields', fields)

      if (err) {
        // Send error immediately and close the response
        res.write('data: ' + JSON.stringify({ error: 'Invalid request' }) + '\n\n');
        return res.end();
      }


      const file = files.file[0]

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${file.originalFilename}`,
        Body: fs.createReadStream(file.filepath)
      }

      this.uploader = this.s3.upload(params)
      res.send({ message: 'File upload initiated' })
      // form.parse ends here
    })
  }



  uploaderProgress(req, res) {

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })


    this.uploader.on('httpUploadProgress', (evt) => {
      const progress = {
        loaded: evt.loaded,
        total: evt.total
      }
      res.write('data: ' + JSON.stringify({ progress }) + '\n\n')
    })

    this.uploader.send((error, data) => {
      if (error) {
        res.write('data: ' + JSON.stringify({ error: error.message }) + '\n\n')
      } else {
        res.write('data: ' + JSON.stringify({ url: data.Location }) + '\n\n')
      }
      res.end()
    })

  }
}

module.exports = new FileUploadController()
