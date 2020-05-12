const express = require("express")
const router = express.Router()
const models = require('../db/models')

router.get('/', async (req, res, next) => { // 查询blog
    try {
        let list = await models.tag.findAll()
        res.json({
            code: 35000,
            data: list,
            message: "查询成功"
        })
    } catch (error) {
        next(error)
    }
})

const BlogAndTagid = models.tag.hasMany(models.blog, {
    foreignKey: 'tagid', as: 'blog'
})

router.get('/statistics', async (req, res, next) => { // 查询blog按标签分类
    try {
        let list = []
        let tagidList = await models.tag.findAll({
            include: [{
                association: BlogAndTagid
            }]
        })
        tagidList.forEach(v => {
            v.dataValues.count = v.blog.length
            list.push({
                id: v.id,
                name: v.name,
                value: v.blog.length
            })
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

module.exports = router