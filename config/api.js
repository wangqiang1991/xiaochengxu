//本地环境
let baseUrl = 'http://192.168.20.104:8082';

//测试环境
// let baseUrl = 'http://test.wx.goochao.com';

//线上环境
//let baseUrl = 'https://wx.goochao.com';

export default{
  get_session_key: baseUrl + '/api/login/session-key',
  login:baseUrl + '/api/login/wx',
  getPhone: baseUrl + '/api/login/get-phone',
  house_list: baseUrl + "/api/house",
  order_list: baseUrl + "/api/housekeeping-order",
  order_hasten: baseUrl + "/api/housekeeping-order/hasten/:orderId",
  save_information: baseUrl + "/api/house-manager",
  order_detail: baseUrl + "/api/housekeeping-order/:orderId",
  house_keeping: baseUrl + "/api/house-keeping",
  create_house_keeping: baseUrl + "/api/housekeeping-order/create",
  order_comment: baseUrl + "/api/housekeeping-order/comment",
  upload_token: baseUrl + '/api/upload/token',
  fill_basic_info: baseUrl + "/api/login/fill/basic-info"
}