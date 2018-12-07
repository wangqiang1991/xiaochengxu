//本地环境
let baseUrl = 'http://192.168.20.102:8080';

//测试环境
//let baseUrl = 'http://test.wx.goochao.com';

//线上环境
//let baseUrl = 'https://wx.goochao.com';

export default{
  index: baseUrl + '/app/api/home/v2',
  shoppingCat_number: baseUrl + '/app/api/shopping-cart/count',
}