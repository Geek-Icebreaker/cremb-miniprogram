const app = getApp();

import { getMenuList, getUserInfo, getUserPhoneNumber} from '../../api/user.js';
import { switchH5Login } from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '0',
      'title': '个人中心',
      'color': true,
      'class': '0'
    },
    userInfo:{},
    MyMenus:[],
    isGoIndex:false,
    iShidden:true,
    isAuto:false,
    switchActive:false,
    loginType: app.globalData.loginType,
    orderStatusNum:{},
  },

  close:function(){
    this.setData({ switchActive:false});
  },
  /**
   * 授权回调
  */
  onLoadFun:function(e){
    this.getUserInfo();
    this.getMyMenus();
  },
  /**
   *
   * 获取个人中心图标
  */
  getMyMenus: function () {
    var that = this;
    if (this.data.MyMenus.length) return;
    getMenuList().then(res=>{
      that.setData({ MyMenus: res.data.routine_my_menus });
    });
  },
  /**
   * 获取个人用户信息
  */
  getUserInfo:function(){
    var that=this;
    getUserInfo().then(res=>{
      // 设置全局用户信息
      app.globalData.userInfo = res.data;
      that.setData({ userInfo: res.data, loginType: res.data.login_type, orderStatusNum: res.data.orderStatusNum});
    });
  },

  /**
   * 获取用户手机号
   */
  getPhoneNumber: function (e) {
    var that = this;

    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.getStorage({
        key: 'cache_key',
        success (res) {
          var data = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            cache_key: res.data,
            uid:that.data.userInfo.uid
          }
          getUserPhoneNumber(data).then(res => {
            app.globalData.userInfo.phone = res.data.phone;
            that.setData({ userInfo: app.globalData.userInfo});
          })
        }
      })
    }
  },
  /**
   * 页面跳转
  */
  goPages:function(e){
    if(app.globalData.isLog){
      if (e.currentTarget.dataset.url == '/pages/user_spread_user/index' && this.data.userInfo.statu==1) {
        if (!this.data.userInfo.is_promoter) return app.Tips({ title: '您还没有推广权限！！' });
      }
      if (e.currentTarget.dataset.url == '/pages/logon/index') return this.setData({ switchActive:true});
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }else{
      this.setData({ iShidden:false});
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ MyMenus:app.globalData.MyMenus});
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ switchActive: false });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  onShow:function(){
    let that = this;
    if (app.globalData.isLog) this.getUserInfo();
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
})
