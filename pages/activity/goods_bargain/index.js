// pages/bargain-list/index.js
import { getBargainList } from '../../../api/activity.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bargainList:[],
    page:0,
    limit:20,
    loading:false,
    loadend:false,
    userInfo:{},
    navH:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
  },
  goBack:function(){
    wx.navigateBack({ delta: 1 })
  },
  onLoadFun: function (e) {
    this.getBargainList();
    this.setData({
      userInfo: e.detail
    })
  },
  getBargainList:function(){
    var that = this;
    if (that.data.loadend) return;
    if (that.data.loading) return;
    that.setData({loading:true});
    getBargainList({page:that.data.page,limit:that.data.limit}).then(function (res) {
      that.setData({ 
        bargainList: that.data.bargainList.concat(res.data),
        page: that.data.page+1,
        loadend: that.data.limit > res.data.length,
        loading:false
      });
     }).catch(res=>{
       that.setData({loading:false});
     });
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
    this.getBargainList();
  },
})