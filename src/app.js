const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require("body-parser") // req.body
// const todoRouter = require("./todo.router")


const link = require("./link.router")
const common = require("./common.router")
const blogRouter = require("./blog.router")
const blogTag = require("./blog.tag.router")
const blogCommentRouter = require("./blog.comment.router")

app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //允许所有跨域请求
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Request-Method", "GET,POST");
    // res.header("Content-Type", "text/html;charset=UTF-8")
    next();
})

// app.use("/todo", todoRouter)
app.use("/link", link) // 友情链接
app.use("/common", common) // 通用接口
app.use("/blog", blogRouter) // 博客
app.use("/blogtag", blogTag) // 博客标签
app.use("/blogcomment", blogCommentRouter) // 博客评论
app.use('/file', express.static(path.join(__dirname, '../public'))) // 访问静态文件
app.use(not_found_handler) // 404

function not_found_handler(req, res, next) {
    res.json({
        code: 404,
        message: 'api不存在'
    })
}

app.use((err, req, res, next) => { // 全局的异常处理
    if (err) {
        res.status(500).json({
            code: 500,
            message: err.message
        })
    }
})

app.listen(3000, () => {
    console.log('server 启动成功')
})