const express = require("express")
const router = express.Router()
const models = require('../db/models')
const path = require('path')
const formidable = require('formidable');
fs = require('fs');

router.post('/upload', async (req, res, next) => { // 创建blog
    try {
        const form = new formidable.IncomingForm();
        await form.parse(req, function (error, fields, files) {
            let file = files.file
            let filepath = file.path.split('_')[1]
            let fileSuffix = file.name.split('.')[1] || file.type.split('/')[1] 
            // 读取文件流并写入到public文件夹内
            fs.writeFileSync(path.join(__dirname, `../public/${filepath}.${fileSuffix}`), fs.readFileSync(file.path));
            let fileInfo = {
                name: file.name.split('.')[0],
                size: file.size,
                type: file.type,
                url: `${filepath}.${fileSuffix}`,
            }
            models.upload_file.create({
                ...fileInfo,
                createdAt: new Date()
            })
            res.json({
                code: 35000,
                data: fileInfo,
                message: "success"
            })
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router