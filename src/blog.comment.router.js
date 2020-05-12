const express = require("express")
const router = express.Router()
const models = require('../db/models')

router.get('/', async (req, res, next) => { // 查询评论
    try {
        let blogid = req.query.id
        let list = await models.blogcomment.findAll({
            where:{
                blogid
            },
            order: [['updatedAt', 'DESC']]
        })
        res.json({
            code: 35000,
            data: list,
            message: "查询成功"
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => { // 创建评论
    try {
        let { id, name, content } = req.body
        console.log({ id, name, content })
        await models.blogcomment.create({
            blogid: id,
            name,
            content,
            createdAt: new Date()
        })
        res.json({
            code: 35000,
            data: {},
            message: "success"
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router