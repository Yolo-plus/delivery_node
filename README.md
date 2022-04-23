# 外卖后台

## 一、实现功能
首页ECharts可视化展示，管理员、商家、商家食品增删改，用户详情，用户收货地址，用户搜索，分页实现，订单列表和详情，管理员登录，退出登录等

## 二、技术应用
使用Node + express + jade + mysql + session + 阿里oss等热门技术

## 三、功能展示
### 后台首页
![图片](https://user-images.githubusercontent.com/61956206/160039449-05343193-f3b9-449c-ac13-f6e366a46520.png)

### 管理员页面
<img width="960" alt="管理员" src="https://user-images.githubusercontent.com/61956206/161951223-fa5a11c0-2016-477a-bc95-1a72a84186dc.png">

### 商家页面
<img width="960" alt="商家" src="https://user-images.githubusercontent.com/61956206/161951272-27df9b1b-9f8f-4ac8-94bd-c81a684a5e04.png">

### 商家食品页面
<img width="960" alt="商家食品" src="https://user-images.githubusercontent.com/61956206/161951298-bc838ba3-75c5-4f48-a644-56b62508ba00.png">

### 商家添加
<img width="960" alt="商家添加" src="https://user-images.githubusercontent.com/61956206/161951353-ed08fe55-f35f-4c8d-ad6f-387282c982a9.png">

### 商家修改
<img width="960" alt="商家修改" src="https://user-images.githubusercontent.com/61956206/161951379-0cae4372-5ada-4339-b155-dfd224ee0701.png">

### 用户页面
<img width="960" alt="用户" src="https://user-images.githubusercontent.com/61956206/161951421-70bf340c-b8d9-4522-807e-ba80fa8f79f6.png">

### 用户详情
<img width="960" alt="用户详情" src="https://user-images.githubusercontent.com/61956206/161951452-89617a5d-2cb8-4a8c-be1e-481bcbf77e75.png">

### 收货地址
<img width="960" alt="收货地址" src="https://user-images.githubusercontent.com/61956206/161951506-ec10809b-3b61-45f5-bd9e-4a72ada508f2.png">

### 搜索
<img width="960" alt="搜索" src="https://user-images.githubusercontent.com/61956206/161951549-36e5839a-6bf8-444e-ad46-ac13ac6263dc.png">

### 订单
<img width="960" alt="订单" src="https://user-images.githubusercontent.com/61956206/161951565-6d0793a6-3a08-4b9c-bf5a-b871ca72b84d.png">

### 订单详情
<img width="960" alt="订单详情" src="https://user-images.githubusercontent.com/61956206/161951597-83e1a121-e449-4eb8-9674-9edc16f32bca.png">

### 管理员登录
![图片](https://user-images.githubusercontent.com/61956206/160039065-53d8c579-5b95-4bf7-bea0-ed7faf921629.png)

## 四、使用：
1. 导入数据库 - delivery.sql
2. 下载依赖 - npm install
3. 开启后台 - nodemon app.js
4. localhost:8000/index

## 五、注：
1. 登录信息位于adminlist表中
2. app.js第244行需要输入自己的阿里云AccessKey，否则上传文件的时候会报错
