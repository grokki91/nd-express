import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        !fs.existsSync(`./public/img/`) && fs.mkdirSync(`./public/img/`, { recursive: true })
        callback(null, 'public/img')
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

export default multer({storage})