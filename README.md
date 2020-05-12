## 初始化数据库配置
    npx sequelize init
## 生成模型文件 在db文件下操作
    npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string
## 持久化 创建表
    npx sequelize db:migrate