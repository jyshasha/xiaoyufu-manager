import axios from 'axios'

// 服务器请求基本路径
axios.defaults.baseURL = 'http://127.0.0.1:5000'
// 10.头像上传接口
export const AVATAR_UPLOAD = axios.defaults.baseURL + "/users/avatar_upload"
// 17.商品图片上传接口
export const GOODS_IMG_UPLOAD = axios.defaults.baseURL + "/goods/goods_img_upload"
// 商品图片路径拼接
export const goodsimgURL = axios.defaults.baseURL + '/upload/imgs/goods_img/'
// 27.店铺图片上传接口/shop/upload
export const SHOP_UPLOAD = axios.defaults.baseURL + "/shop/upload"
// 店铺图片路径拼接
export const shopimgURL = axios.defaults.baseURL + '/upload/shop/'


/* ============================== 账号管理模块 ======================================= */
// 1.登录接口 account:账号 password:密码
export let login = (account, password) => axios.post('/users/checkLogin', {account,password})

// 2.添加账号接口 account:账号 password:密码 userGroup:用户组
export let usersadd = (account, password,userGroup) => axios.post('/users/add', {account,password,userGroup})

// 3.获取账号列表  currentPage:当前页码  pageSize:每页条数
export let userslist = (currentPage,pageSize) => axios.get('/users/list', {params:{currentPage,pageSize}})

// 4.删除账号  id
export let usersdel = (id) => axios.get('/users/del', {params:{id}})

// 5.批量删除账号
export let usersbatchdel = (ids) => axios.get('/users/batchdel', {params:{ids}})

// 6.修改账号 
export let usersedit = (id, account, userGroup) => axios.post('/users/edit', {id, account,userGroup})

// 7.检查旧密码是否正确 oldPwd：旧密码  id：id
export let checkoldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', {params:{oldPwd, id}})

// 8.修改密码  newPwd:新密码
export let editpwd = (newPwd,id) => axios.post('/users/editpwd', {newPwd,id})

// 9.获取账号（个人中心）信息
export let accountinfo = (id) => axios.get('/users/accountinfo', {params:{id}})

// 10.头像上传接口

// 11.验证token是否过期接口 token:token值
export let checktoken = (token) => axios.get('/users/checktoken', {params:{token}})

/* ============================ 商品管理模块 ======================================== */
// 12.添加分类
export let addcate = (cateName,state) => axios.post('/goods/addcate', {cateName,state})

// 13.获取分类
export let catelist = (currentPage,pageSize) => axios.get('/goods/catelist', {params:{currentPage,pageSize}})

// 14.删除分类
export let delcate = (id) => axios.get('/goods/delcate', {params:{id}})

// 15.修改分类
export let editcate = (id,cateName,state) => axios.post('/goods/editcate', {id,cateName,state})

// 16.查询所有分类名称
export let categories = () => axios.get('/goods/categories', {params:{}})

// 17.商品图片上传接口

// 18.商品添加
export let goodsadd = (params) => axios.post('/goods/add', params)

// 19.获取商品列表
export let goodslist = (currentPage,pageSize) => axios.get('/goods/list', {params:{currentPage,pageSize}})

// 20.删除商品
export let goodsdel = (id) => axios.get('/goods/del', {params:{id}})

// 21.修改商品
export let goodsedit = (params) => axios.post('/goods/edit', params)

/* ========================== 订单管理模块 ============================================ */
// 22.获取订单列表(带查询功能)
export let orderlist = (params) => axios.get('/order/list', {params})

// 23.查询
export let ordersearch = (params) => axios.get('/order/search', {params})


// 25.修改订单
export let orderedit = (params) => axios.post('/order/edit', params)

/* ================================= 店铺管理模块 ----------------------------------- */
// 26.获取店铺详情
export let shopinfo = () => axios.get('/shop/info')

// 28.店铺内容修改
export let shopedit = (params) => axios.post('/shop/edit', params)

/* =============================== 报表统计 ------------------------------------------ */
// 29.首页报表接口
export let totaldata = () => axios.get('/order/totaldata')

// 30.订单报表接口
export let ordertotal = (params) => axios.get('/order/ordertotal',{params})

