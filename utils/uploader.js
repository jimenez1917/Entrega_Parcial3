const multer = require('multer');

const uploader = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'./public')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname);
        }
    })
})

module.exports = uploader;