const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/files'),
  filename: (req, file, cb) => {
    const name = uuidv4() + path.extname(file.originalname)
    cb(null, name)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 104857600 },
}).single('file')

module.exports = upload
