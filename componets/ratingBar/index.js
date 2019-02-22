// componets/ratingBar/index.js
Component({
  options: {
    multipleSlots: false
  },
  data: {
    mark: 0,
    range: [1, 2, 3, 4, 5],
    enable: false
  },
  properties: {
    mark: {
      type: Number,
      value: 5,
      observer: 'update'
    },
    enable: {
      type: Boolean,
      value: true,
      observer: 'updateEnable'
    }
  },
  methods: {
    update: function(newVal, oldVal) {
      this.setData({
        mark: newVal
      })
    },
    updateEnable: function(newVal, oldVal) {
      this.setData({
        enable: newVal
      })
    },
    tapMark(e) {
      if (!this.data.enable) {
        return;
      }
      let mark = parseInt(e.target.dataset.mark) || 0;
      if (mark > 0) {
        this.setData({
          mark: mark
        });
        this.triggerEvent('markChange', {
          mark: mark
        }, {})
      }
    }
  }
})