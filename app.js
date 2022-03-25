// 引入
let express = require('express')
let bodyParser = require('body-parser')
let mysql = require('mysql')
let formidable = require('formidable')
let co = require('co')
let OSS = require('ali-oss')
let fs = require('fs')
let session = require('express-session')
let cookieParser = require("cookie-parser")

// formidable配置
const form = formidable({ uploadDir: './uploads', keepExtensions: true })

// mysql配置
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'delivery'
})

connection.connect()

// 实例化
let app = express()

// 设置模板引擎
app.set('view engine', 'jade')
app.set('views', './views')

// body-parser配置
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 内置中间件：处理静态资源
app.use(express.static('node_modules'))
app.use(express.static('public'))

app.use(session({
  secret: 'iloveyou',
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: 1800000 }
}))

app.use(cookieParser())

// 登录处理
// login处理
app.get('/login', (req, res) => {
  res.render('login/login')
})

app.post('/loginsubmit', (req, res) => {
  let name = req.body.name
  let password = req.body.password

  let sql = `SELECT * FROM adminlist WHERE name = "${name}"`

  connection.query(sql, (err, results, fields) => {
    if (results.length <= 0) {
      res.setHeader('content-type', 'text/html;charset=utf-8')
      // 已经是发送给客户端了，不能再设置res.redirect()，所以只能在客户端设置重定向
      res.write(`<h1>用户不存在！</h1><script>setTimeout(function () {location.href='/login'}, 3000)</script>`)
      res.end()
    } else {
      if (password === results[0].password) {
        // 登陆成功，把登录信息存储在session里
        req.session.name = name

        res.setHeader('content-type', 'text/html;charset=utf-8')
        res.write(`<h1>登陆成功！</h1><script>setTimeout(function () {location.href='/index'}, 3000)</script>`)
        res.end()
      } else {
        res.setHeader('content-type', 'text/html;charset=utf-8')
        res.write(`<h1>密码有误。</h1><script>setTimeout(function () {location.href='/login'}, 3000)</script>`)
        res.end()
      }
    }
  })
})

// 封装登录检测函数
function logincheck(req, res, next) {
  // 未登录，未登录则返回undefined
  if (!req.session.name) {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(`<h1>请登录。</h1><script>setTimeout(function () {location.href='/login'}, 3000)</script>`)
    res.end()
  } else {
    next()
  }
}

// 处理路由
// index页面
app.get("/index", logincheck, function (req, res) {
  // 获取商家总数量
  connection.query("select count(*) as shoplistcount from shoplist", (error, results, fields) => {
    // console.log(results[0].shoplistcount)
    let shoplistcount = results[0].shoplistcount
    // 获取管理员总数
    connection.query("select count(*) as adminlistcount from adminlist", (error, results, fields) => {
      let adminlistcount = results[0].adminlistcount
      //分配模块类型和销量
      let xAxis = ["管理员", "用户", "商家", "商家食品", "订单"]
      let series = [adminlistcount, "3", shoplistcount, "10", "5"]
      //加载模板
      res.render("index/index", { xAxis: xAxis, series: series, name: req.session.name });
    })
  })
})

// 管理员添加页面
app.get('/adminadd', logincheck, (req, res) => {
  res.render('admin/adminadd', { name: req.session.name })
})

// 管理员添加提交
app.post('/adminaddsubmit', (req, res) => {
  let name = req.body.name
  let password = req.body.password

  // 操作数据库
  let sql = `INSERT INTO adminlist (name, password) VALUES ("${name}", "${password}")`

  connection.query(sql, (err, results, fields) => {
    if (results.affectedRows > 0) {
      res.redirect('/adminlist')
    } else {
      res.redirect('/adminadd')
    }
  })
})

// 管理员列表页面
app.get('/adminlist', logincheck, (req, res) => {
  let sql = `SELECT * FROM adminlist`

  connection.query(sql, (err, results, fields) => {
    res.render('admin/adminlist', { data: results, name: req.session.name })
  })
})

// 管理员删除
app.get('/admindel', logincheck, (req, res) => {
  let id = req.query.id

  let sql = `DELETE FROM adminlist WHERE id = ${id}`

  connection.query(sql, (err, results, fields) => {
    if (results.affectedRows > 0) {
      res.redirect('/adminlist')
    }
  })
})

// 管理员修改
app.get('/adminedit', logincheck, (req, res) => {
  let id = req.query.id

  let sql = `SELECT * FROM adminlist WHERE id = ${id}`

  connection.query(sql, (err, results, fields) => {
    res.render('admin/adminedit', { data: results[0], name: req.session.name })
  })
})

// 管理员修改提交
app.post('/admineditsubmit', (req, res) => {
  // 根据id来更新管理员
  let id = req.body.id
  let name = req.body.name
  let password = req.body.password

  let sql = `UPDATE adminlist SET name = "${name}", password = "${password}" WHERE id = ${id}`

  connection.query(sql, (err, results, fields) => {
    if (results.affectedRows > 0) {
      res.redirect('/adminlist')
    } else {
      res.redirect('/adminedit')
    }
  })
})

// 用户列表
app.get('/userslist', logincheck, (req, res) => {
  let sql = `SELECT * FROM userslist`

  connection.query(sql, (err, results, fields) => {
    res.render('users/userslist', { data: results, name: req.session.name })
  })
})

// 用户搜索
app.get('/userssearch', logincheck, (req, res) => {
  let keyword = req.query.keyword

  let sql = `SELECT * FROM userslist WHERE name LIKE "%${keyword}%"`

  connection.query(sql, (err, results, fields) => {
    res.render('users/userslist', { data: results, name: req.session.name })
  })
})

// 用户详情
app.get('/usersinfo', logincheck, (req, res) => {
  // 通过id查找另一个表中对应的数据
  let id = req.query.id

  let sql = `SELECT * FROM usersinfo WHERE u_id = ${id}`

  // 用户详情是一对一关系
  connection.query(sql, (err, results, fields) => {
    res.render('users/usersinfo', { data: results[0], name: req.session.name })
  })
})

// 收货地址：一对多关系
app.get('/usersaddress', logincheck, (req, res) => {
  let name = req.query.name

  // 通过name查找另一个表中对应的数据
  let sql = `SELECT * FROM usersaddress WHERE u_name = "${name}"`

  connection.query(sql, (err, results, fields) => {
    res.render('users/usersaddress', { data: results, name: req.session.name })
  })
})

// 商家添加
app.get('/shopadd', logincheck, (req, res) => {
  res.render('shop/shopadd', { name: req.session.name })
})

// 封装文件上传函数
function uploadPic(path, pic) {
  // 将图片上传到服务器
  let client = new OSS({
    region: 'oss-cn-beijing',  // 地域
    accessKeyId: 'LTAI5tS9LdnScn4sWaWH6ExB',  // keyid
    accessKeySecret: '7DCYJA2l72Fo79V2oOFtnSFSIqslKs',  // 密钥
    bucket: 'delivery-yolo'  // 仓库名字
  })

  let ali_oss = {
    bucket: 'delivery-yolo',
    endPoint: 'oss-cn-beijing.aliyuncs.com'  // 物理服务器
  }

  co(function* () {
    client.useBucket(ali_oss.bucket)
    yield client.put(pic, path)  // pic上传文件名字，path上传文件路径
    fs.unlinkSync(path)  // 上传之后删除本地文件
    // res.setHeader('content-type','text/html;charset=utf-8')
    // res.end(JSON.stringify({status:'100', msg:'上传成功'}))
  }).catch(function (err) {
    // res.setHeader('content-type','text/html;charset=utf-8')
    // res.end(JSON.stringify({status:'101', msg:'上传失败', error:JSON.stringify(err)}))
  })
}

// 商家添加提交
app.post('/shopaddsubmit', (req, res) => {
  // 解析包含文件上传的表单
  form.parse(req, (err, fields, files) => {
    let name = fields.name

    let path = files.pic.filepath  // 图片路径
    let pic = path.split('\\')[path.split('\\').length - 1]  // 图片名字

    let descs = fields.descs
    let fee = fields.fee

    uploadPic(path, pic)

    // 操作数据库
    let sql = `INSERT INTO shoplist (name, pic, descs, fee) VALUES ("${name}", "${pic}", "${descs}", "${fee}")`

    connection.query(sql, (err, results, fields) => {
      if (results.affectedRows > 0) {
        res.redirect('/shoplist')
      } else {
        res.redirect('/shopadd')
      }
    })
  })
})

// 商家列表
app.get('/shoplist', logincheck, (req, res) => {
  // 通过侧栏点击进入时，没有传递参数，此时page=undefined
  let page = (req.query.page === undefined) ? 1 - 1 : req.query.page  // page：当前页-1

  // 从数据库获取数据，然后渲染到show页面
  let count = 'SELECT COUNT(*) AS count FROM shoplist'  // 获取商家数量
  let sql = `SELECT * FROM shoplist LIMIT ${page * 3}, 3`  // 获取当前页的数据（每页显示3条）

  // 执行mysql语句 
  connection.query(count, function (error, results, fields) {
    let countNum = results[0].count  // 商家的数量
    connection.query(sql, function (error, results, fields) {
      res.render('shop/shoplist', { data: results, count: countNum, page: page, name: req.session.name })
    })
  })
})

// 商家删除
app.get('/shopdel', logincheck, (req, res) => {
  let id = req.query.id

  let sql = `DELETE FROM shoplist WHERE id = ${id}`

  connection.query(sql, (err, results, fields) => {
    if (results.affectedRows > 0) {
      res.redirect('/shoplist')
    }
  })
})

// 商家修改
app.get('/shopedit', logincheck, (req, res) => {
  let id = req.query.id

  let sql = `SELECT * FROM shoplist WHERE id = ${id}`

  connection.query(sql, (err, results, fields) => {
    res.render('shop/shopedit', { data: results[0], name: req.session.name })
  })
})

// 商家修改提交
app.post('/shopeditsubmit', (req, res) => {
  form.parse(req, (err, fields, files) => {
    let id = fields.id
    let name = fields.name
    let descs = fields.descs
    let fee = fields.fee
    let sql

    // 判断是否修改图片
    if (files.pic.size > 0) {
      let path = files.pic.filepath
      let pic = path.split('\\')[path.split('\\').length - 1]

      uploadPic(path, pic)

      sql = `UPDATE shoplist SET name = "${name}", pic = "${pic}", descs = "${descs}", fee = "${fee}" WHERE id = ${id}`
    } else {
      sql = `UPDATE shoplist SET name = "${name}", descs = "${descs}", fee = "${fee}" WHERE id = ${id}`
    }

    connection.query(sql, (err, results, fields) => {
      if (results.affectedRows > 0) {
        res.redirect('/shoplist')
      } else {
        res.redirect('/shopedit')
      }
    })
  })
})

// 食品添加
app.get('/foodadd', logincheck, (req, res) => {
  let sql = `SELECT * FROM shoplist`

  connection.query(sql, (err, results, fields) => {
    res.render('food/foodadd', { data: results, name: req.session.name })
  })
})

// 食品添加提交
app.post('/foodaddsubmit', (req, res) => {
  form.parse(req, (err, fields, files) => {
    let name = fields.name

    let path = files.pic.filepath
    let pic = path.split('\\')[path.split('\\').length - 1]

    let descs = fields.descs
    let price = fields.price
    let shoplist_name = fields.shoplist_name

    // 上传
    uploadPic(path, pic)

    // 操作数据库
    let sql = `INSERT INTO foodlist (name, pic, descs, price, shoplist_name) VALUES ("${name}", "${pic}", "${descs}", "${price}", "${shoplist_name}")`

    connection.query(sql, (err, results, fields) => {
      if (results.affectedRows > 0) {
        res.redirect('/foodlist')
      } else {
        res.redirect('/foodadd')
      }
    })
  })
})

// 食品列表
app.get('/foodlist', logincheck, (req, res) => {
  // 如果要关联表获取配送费
  // let sql = `SELECT foodlist.id,foodlist.name,foodlist.pic,foodlist.descs,foodlist.price,shoplist.fee AS fee FROM foodlist,shoplist WHERE foodlist.shoplist_name = shoplist.name`
  let sql = `SELECT * FROM foodlist`

  connection.query(sql, (err, results, fields) => {
    res.render('food/foodlist', { data: results, name: req.session.name })
  })
})

// 订单列表
app.get('/orderlist', logincheck, (req, res) => {
  let sql = `SELECT * FROM orderlist`

  connection.query(sql, (err, results, fields) => {
    res.render('order/orderlist', { data: results, name: req.session.name })
  })
})

// 订单详情
app.get('/orderinfo', logincheck, (req, res) => {
  let id = req.query.id

  let sql = `SELECT * FROM orderinfo WHERE order_id = ${id}`

  connection.query(sql, (err, results, fields) => {
    res.render('order/orderinfo', { data: results, name: req.session.name })
  })
})

// 给vue开放商家数据
app.get('/vueShoplist', (req, res) => {
  let sql = `SELECT * FROM shoplist`

  connection.query(sql, (err, results, fields) => {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(results))
    res.end()
  })
})

// 用户注册
app.post("/register", (req, res) => {
  // 获取表单的提交数据
  let name = req.body.name
  let password = req.body.password

  let sql = `INSERT INTO userslist (name, password) VALUES ("${name}", "${password}")`

  connection.query(sql, (err, results, fields) => {
    if (results.affectedRows > 0) {
      res.cookie('name', name, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
      res.write(JSON.stringify({ msg: 'ok' }))
      res.end()
    } else {
      res.write(JSON.stringify({ msg: 'error' }))
      res.end()
    }
  })
})

// 用户登录
app.post("/loginusers", (req, res) => {
  let name = req.body.name
  let password = req.body.password

  let sql = `SELECT * FROM userslist WHERE name = "${name}"`

  connection.query(sql, (err, results, fields) => {
    if (results.length <= 0) {
      // 用户名有误
      res.write(JSON.stringify({ msg: 'usernameiserror' }))
      res.end()
    } else {
      // 检测密码
      if (password == results[0].password) {
        res.cookie('name', name, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        res.write(JSON.stringify({ msg: 'ok' }))
        res.end()
      } else {
        res.write(JSON.stringify({ msg: 'userpassiserror' }))
        res.end()
      }
    }
  })
})

// 检测cookie
app.get('/cookiecheck', function (req, res) {
  if (!req.cookies.name) {
    res.write(JSON.stringify({ msg1: '' }))
    res.end()
  } else {
    res.write(JSON.stringify({ msg1: req.cookies.name }))  // 因为未登录显示的是 注册/登录，所以不需要都返回msg
    res.end()
  }
})

// 获取单个商家的食品数据
app.get("/vueshopgoods", function (req, res) {
  let id = req.query.id
  // 通过表关联遍历出shoplist里面的id数据和foodlist的所有数据
  let sql = `SELECT foodlist.id,foodlist.name,foodlist.pic,foodlist.descs,foodlist.price,shoplist.id AS shoplist_id FROM foodlist,shoplist WHERE foodlist.shoplist_name = shoplist.name`

  connection.query(sql, function (error, results, fields) {
    let arr = []

    // 筛选符合条件的数据
    for (let item of results) {
      if (item.shoplist_id == id) {
        arr.push(item)
      }
    }

    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(arr))
    res.end()
  })
})

// 获取单个商家的评论数据
app.get("/vuecomments", function (req, res) {
  let id = req.query.id
  let sql = `SELECT * FROM comments WHERE shoplist_id = ${id}`

  connection.query(sql, function (error, results, fields) {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(results))
    res.end()
  })
})

// 获取商家数据
app.get('/vueshop', (req, res) => {
  let id = req.query.id
  let sql = `SELECT * FROM shoplist WHERE id = ${id}`

  connection.query(sql, (err, results, fields) => {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(results[0]))
    res.end()
  })
})

// 用户添加收货地址
app.post("/addaddress", (req, res) => {
  let name = req.body.name
  let phone = req.body.phone
  let address = req.body.address
  let u_name = req.body.u_name

  let sql = "INSERT INTO usersaddress (name, phone, address, u_name) VALUES ('" + name + "','" + phone + "','" + address + "','" + u_name + "')"

  connection.query(sql, (error, results, fields) => {
    if (results.affectedRows > 0) {
      res.write(JSON.stringify({ 'msg': 'ok' }))
      res.end()
    } else {
      res.write(JSON.stringify({ 'msg': 'error' }))
      res.end()
    }
  })
})

// 获取用户收货地址
app.get("/useraddress", function (req, res) {
  let u_name = req.query.u_name

  let sql = `SELECT * FROM usersaddress WHERE u_name = "${u_name}"`

  connection.query(sql, function (error, results, fields) {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(results))
    res.end()
  })
})

// 生成订单
app.post("/addorder", (req, res) => {
  let orderme = req.body.order * 1
  let total = req.body.total * 1
  let name = req.body.name
  let address_id = req.body.address_id  // 地址
  let shop_id = req.body.shop_id * 1  // 商家id
  let didcomment = 0  // 0代表还没有评价

  let sql = `INSERT INTO orderlist (orderme, total, name, address_id, shop_id, didcomment) VALUES (${orderme}, ${total}, "${name}", ${address_id}, ${shop_id}, 0)`

  connection.query(sql, (error, results, fields) => {
    if (results.affectedRows > 0) {
      res.write(JSON.stringify({ 'msg': 'ok', 'insertid': results.insertId }))  // 返回该条订单插入的id
      res.end()
    } else {
      res.write(JSON.stringify({ 'msg': 'error' }))
      res.end()
    }
  })
})

//生成订单详情
app.post("/addorderinfo", (req, res) => {
  let food = req.body.food
  let pic = req.body.pic
  let count = req.body.count
  let order_id = req.body.order_id

  let sql = `INSERT INTO orderinfo (food, pic, count, order_id) VALUES ("${food}", "${pic}", ${count}, ${order_id})`
  connection.query(sql, (error, results, fields) => {
    if (results.affectedRows > 0) {
      res.write(JSON.stringify({ 'msg': 'ok', 'insertid': results.insertId }))
      res.end()
    } else {
      res.write(JSON.stringify({ 'msg': 'error' }))
      res.end()
    }
  })
})

// 获取登录用户的订单数据
app.get("/userorderlist", function (req, res) {
  let name = req.query.name

  let sql = `SELECT * FROM orderlist WHERE name = "${name}"`

  connection.query(sql, function (error, results, fields) {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(results))
    res.end()
  })
})

// 获取订单的详情数据
app.get("/vueorderinfo", function (req, res) {
  let order_id = req.query.order_id

  let sql = `SELECT * FROM orderinfo WHERE order_id = ${order_id}`

  connection.query(sql, function (error, results, fields) {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(results))
    res.end()
  })
})

// 个人中心，用户详情
app.get("/userinfo", function (req, res) {
  let name = req.query.name

  // 关联表，为通过u_name查找做准备
  let sql = `SELECT usersinfo.id,usersinfo.name,usersinfo.pic,usersinfo.phone,usersinfo.email,usersinfo.hobby,userslist.name AS u_name FROM usersinfo,userslist WHERE usersinfo.u_id = userslist.id`
  connection.query(sql, function (error, results, fields) {
    let myresults = { name: "" }

    results.forEach((item) => {
      if (item.u_name === name) {
        myresults = item
      }
    })

    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(myresults))
    res.end()
  })
})

// 用户详情修改
app.post("/updateuser", (req, res) => {
  form.parse(req, (err, fields, files) => {
    let path = files.pic.filepath  // 图片路径
    let pic = path.split('\\')[path.split('\\').length - 1]  // 图片名字

    let name = fields.name
    let phone = fields.phone
    let email = fields.email
    let hobby = fields.hobby
    let id = fields.id
    let u_name = fields.u_name
    let sql

    // 是否上传图片
    if (/\.(jpg|jpeg|png|gif|webp)$/.test(pic)) {
      uploadPic(path, pic)
      sql = `UPDATE usersinfo SET name = "${name}", pic = "${pic}", phone = "${phone}", email = "${email}", hobby = "${hobby}" WHERE id = ${id}`
    } else {
      sql = `UPDATE usersinfo SET name = "${name}", phone = "${phone}", email = "${email}", hobby = "${hobby}" WHERE id = ${id}`
    }

    connection.query(sql, (error, results, fields) => {
      if (results.affectedRows > 0) {
        res.set("Access-Control-Allow-Origin", "*")
        res.redirect(`/api/#/userinfo/${u_name}`)
      }
    })
  })
})

// 插入用户详情
app.post("/insertuserinfo", (req, res) => {
  form.parse(req, (err, fields, files) => {
    let path = files.pic.filepath  // 图片路径
    let pic = path.split('\\')[path.split('\\').length - 1]  // 图片名字

    let name = fields.name
    let phone = fields.phone
    let email = fields.email
    let hobby = fields.hobby
    let u_name = fields.u_name
    let u_id
    let sql2

    connection.query(`SELECT * FROM userslist WHERE name = "${u_name}"`, (err, results, fields) => {
      u_id = results[0].id
      // 是否上传图片
      if (/\.(jpg|jpeg|png|gif|webp)$/.test(pic)) {
        uploadPic(path, pic)
        sql2 = `INSERT INTO usersinfo (name, pic, phone, email, hobby, u_id) VALUES ("${name}", "${pic}", "${phone}", "${email}", "${hobby}", ${u_id})`
      } else {
        sql2 = `INSERT INTO usersinfo (name, pic, phone, email, hobby, u_id) VALUES ("${name}", "southeast.jpg", "${phone}", "${email}", "${hobby}", ${u_id})`
      }

      connection.query(sql2, (error, results, fields) => {
        if (results.affectedRows > 0) {
          res.set("Access-Control-Allow-Origin", "*")
          res.redirect(`/api/#/userinfo/${u_name}`)
        }
      })
    })
  })
})

app.get('/inputsearch', (req, res) => {
  let content = req.query.content
  // 模糊查询
  let sql = `SELECT * FROM shoplist WHERE name LIKE "%${content}%"`
  let sql1 = `SELECT * FROM foodlist WHERE name LIKE "%${content}%"`
  let sql2 = `SELECT * FROM shoplist`
  let arr = []
  let arr1 = []
  let arr2 = []
  let arr3 = []
  let arr4 = []

  // 商家列表
  connection.query(sql, (err, results, fields) => {
    arr = results

    // 食品列表
    connection.query(sql1, (err, results, fields) => {
      arr1 = results

      // 所有商家
      connection.query(sql2, (err, results, fields) => {
        arr2 = results

        // 遍历食品，找到对应的商家id（因为需要跳转到店铺），返回新的食品列表
        arr1.forEach(item => {
          let id

          arr2.forEach(item1 => {
            if (item.shoplist_name === item1.name) {
              id = item1.id
            }
          })

          item.shoplist_id = id
          arr3.push(item)
        })

        arr4 = arr.concat(arr3)

        res.setHeader('content-type', 'text/html;charset=utf-8')
        res.write(JSON.stringify(arr4))
        res.end()
      })
    })
  })
})

// 添加评价
app.get('/commentadd', (req, res) => {
  let name = req.query.name
  let pic
  let comment = req.query.comment
  let content_time = req.query.content_time
  let shoplist_id = req.query.shoplist_id * 1
  let o_orderme = parseInt(req.query.o_orderme)

  let sql1 = `SELECT userslist.name,usersinfo.name AS tname,usersinfo.pic FROM userslist,usersinfo WHERE userslist.id = usersinfo.u_id`

  // 获得头像
  connection.query(sql1, (err, results, fields) => {
    let obj = results.find(item => item.name === name)
    pic = obj.pic

    // 插入评论
    let sql2 = `INSERT INTO comments (name, pic, content, content_time, shoplist_id, o_orderme) VALUES ("${name}", "${pic}", "${comment}", "${content_time}", ${shoplist_id}, ${o_orderme})`

    connection.query(sql2, (err, results, fields) => {
      if (results.affectedRows > 0) {
        // 更新为已评价
        let sql3 = `UPDATE orderlist SET didcomment = 1 WHERE orderme = ${o_orderme}`

        connection.query(sql3, (err, results, fields) => {
          if (results.affectedRows > 0) {
            res.write(JSON.stringify({ 'msg': 'ok' }))
            res.end()
          }
        })

      }
    })
  })
})

// 获取单条评论
app.get('/commentget', (req, res) => {
  let o_orderme = parseInt(req.query.orderme)

  connection.query(`SELECT * FROM comments WHERE o_orderme = ${o_orderme}`, (err, results, fields) => {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.write(JSON.stringify(results[0]))
    res.end()
  })
})

// 前台退出登录
app.get("/vuelogout", function (req, res) {
  // 清除cookie
  res.clearCookie('name')
  res.write(JSON.stringify({ msg: 0 }))
  res.end()
})

// 登录退出
app.get('/logout', (req, res) => {
  req.session.name = ''
  res.redirect('/login')
  res.end()
})

// 404
app.use((req, res) => {
  res.write('404 not found')
  res.end()
})

// 监听端口
app.listen(8000, () => {
  console.log('express服务器已经启动。')
})
