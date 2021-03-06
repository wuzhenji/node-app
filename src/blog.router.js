const express = require("express")
const router = express.Router()
const models = require('../db/models')
const sequelize = require("sequelize")
const Op = sequelize.Op;

const BlogAndComment = models.blog.hasMany(models.blogcomment, {
    foreignKey: 'blogid', as: 'comment'
})

router.get('/', async (req, res, next) => { // 查询blog列表
    try {
        let { title, tagid, pagesize, pagenum } = req.query
        let limit = +pagesize
        let offset = (pagenum - 1) * limit
        let where = {}
        if (title) {
            where.title = {
                [Op.like]: `%${title}%`,
            }
        }
        if (tagid) where.tagid = tagid
        let list = await models.blog.findAndCountAll({
            include: [{
                association: BlogAndComment,
            }],
            limit,
            offset,
            where: where,
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

router.get('/byid',async (req, res, next) => { // 根据id查询blog
    try {
        let { id } = req.query
        let info = await models.blog.findOne({
            include: [{
                association: BlogAndComment,
            }],
            where: {
                id
            },
            order: [['updatedAt', 'DESC']]
        })
        res.json({
            code: 35000,
            data: info,
            message: "查询成功"
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => { // 创建blog
    try {
        let { title, tagid, content, html } = req.body
        await models.blog.create({
            title,
            content,
            html,
            tagid,
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