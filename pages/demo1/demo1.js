
Page({
  data: {
    flag:true,
    show: 0,
    number1:0,
    number2:0,
    operat:0,
    eq:0
  },
 numberInput:function(e){
  let number = +e.target.id;
  if(this.data.flag){
    if (this.data.number1 == 0) {
      this.data.number1 = number;
    } else {
      this.data.number1 = this.data.number1 * 10 + number;
    }
    this.setData({
      show: this.data.number1
    })
  }else{
    if (this.data.number2 == 0) {
      this.data.number2 = number;
    } else {
      this.data.number2 = this.data.number2 * 10 + number;
    }

    this.setData({
      show: this.data.show.slice(0, this.data.show.indexOf(this.data.operat)+1) + this.data.number2
    })
  }
 },

 operat:function(e){
   
   this.data.flag = false;
   if (e.target.id == 1){
     this.setData({
       show: this.data.number1 + '+',
       operat: '+'
     })
   }
   if (e.target.id == 2) {
     this.setData({
       show: this.data.number1 + '-',
       operat: '-'
     })
   }
   if (e.target.id == 3) {
     this.setData({
       show: this.data.number1 + '*',
       operat: '*'
     })
   }
   if (e.target.id == 4) {
     this.setData({
       show: this.data.number1 + '/',
       operat: '/'
     })
   }
 },
 eq:function(){
   if(this.data.operat == '+'){
      this.setData({
        eq: this.data.number1 + this.data.number2
      })
   }
   if (this.data.operat == '-') {
     this.setData({
       eq: this.data.number1 - this.data.number2
     })
   }
   if (this.data.operat == '*') {
     this.setData({
       eq: this.data.number1 * this.data.number2
     })
   }
   if (this.data.operat == '/') {
     this.setData({
       eq: this.data.number1 / this.data.number2
     });
   }
 },
 rest:function(){
  this.setData({
    flag: true,
    show: 0,
    number1: 0,
    number2: 0,
    operat: 0,
    eq: 0
  })
 }
})
