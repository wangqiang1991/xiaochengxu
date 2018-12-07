export default{
  /* 合法uri*/
  validateURL:function(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
  },

  /* 小写字母*/
  validateLowerCase:function(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  },

  /* 大写字母*/
  validateUpperCase:function(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  },

  /* 大小写字母*/
  validatAlphabets:function(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
  },

  /*输入非空验证*/
  validatNull:function(str) {
   let reg = /\S/;
   return reg.test(str);
  },

  /*验证电话号码*/
  validatPhone:(str)=> {
    let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,3,6,7,8])|(19[7,8,9])|(166))\d{8}$/;
    return reg.test(str);
  },

  /*验证数字*/
  validatNumber:(str)=> {
    let reg = /^\d+$/;
    return reg.test(str);
  },

  /*验证邮箱*/
  validateEmail:(str)=> {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(str);
  },

  /*验证金额*/
  validatPrice:function(str) {
    let reg =  /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
    return reg.test(str);
  },

   /*验证正数或者1位小数*/
  validatNumber1:function(str) {
    let reg =  /^(([1-9])|([0-9]\.\d{1}))$/
    return reg.test(str);
  },   

}