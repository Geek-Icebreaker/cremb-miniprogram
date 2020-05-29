// pages/group-list/index.js
import { getCombinationList } from '../../../api/activity.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '拼团列表',
      'color': true,
      'class': '0'
    },
    combinationList: [],
    limit: 10,
    page: 1,
    loading:false,
    loadend:false,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCombinationList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  getCombinationList:function(){
    var that = this;
    if (that.data.loadend) return;
    if (that.data.loading) return;
    var data = { page: that.data.page, limit: that.data.limit};
    that.setData({loading:true});
    getCombinationList(data).then(function (res) {
      var combinationList = that.data.combinationList;
      var limit = that.data.limit;
      that.data.page++;
      that.setData({
        loadend: limit > res.data.length,
        combinationList: combinationList.concat(res.data),
        page: that.data.page,
        loading:false,
      });
    }).catch(()=>{
      that.setData({loading:false});
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getCombinationList();
  }
})