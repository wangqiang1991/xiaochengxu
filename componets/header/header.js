// componets/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    str:String,
    setObj:{
      type:Object,
      observer: (newVal, oldVal)=>{
        console.log(newVal)
        console.log(oldVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    name:'组件内自定义属性'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setData() {
      let obj= {
        name:'wang',
        age:18
      }
      this.triggerEvent('myevent',obj)
    }
  }
})
