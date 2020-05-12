const express = require("express")
const router = express.Router()
const models = require('../db/models')

const LinktagAndLink = models.linktag.hasMany(models.link, {
    foreignKey: 'tagid', as: 'links'
})

router.get('/', async (req, res, next) => { // 查询链接
    try {
        let list = await models.linktag.findAll({
            include: [{
                association: LinktagAndLink,
            }],
            order: [['id', 'asc'], [LinktagAndLink, 'createdAt']]
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

router.post('/', async (req, res, next) => { // 创建链接
    try {
        let { name, desc, bg, url, tagid } = req.body
        await models.link.create({
            name,
            desc,
            bg,
            url,
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

router.get('/tag', async (req, res, next) => { // 查询链接标签
    try {
        let list = await models.linktag.findAll()
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