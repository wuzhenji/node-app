const express = require("express")
const router = express.Router()
const models = require('../db/models')

router.get('/', async (req, res, next) => { // 查询todo任务
    try {
        let { status, pagesize, pagenum } = req.query
        let limit = +pagesize
        let offset = (pagenum - 1) * limit
        let where = {}
        if(status != -1){
            where.status = status
        }
        let list = await models.Todo.findAndCountAll({
            where,
            limit,
            offset
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

router.post('/create', async (req, res, next) => { // 创建todo任务
    try {
        let { name, deadline, content } = req.body
        await models.Todo.create({
            name,
            deadline,
            content
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

router.post('/update', async (req, res, next) => { // 更新todo任务
    try {
        let { id, name, deadline, content } = req.body
        let info = await models.Todo.findOne({
            where: {
                id
            }
        })
        if (info) {
            info.update({
                name,
                deadline,
                content
            })
            res.json({
                code: 35000,
                data: {},
                message: "success"
            })
        } else {
            res.json({
                code: 500,
                data: {},
                message: "err"
            })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/updateStatus', async (req, res, next) => { // 修改狀態
    try {
        let { id, status } = req.body
        let info = await models.Todo.findOne({
            where: {
                id
            }
        })
        if (info && info.dataValues.status != status) {
            info.update({
                status
            })
            res.json({
                code: 35000,
                data: {},
                message: "success"
            })
        } else {
            res.json({
                code: 500,
                data: {},
                message: "err"
            })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router