import axios from "axios";
import { Message, MessageBox, Loading } from "element-ui";
import { getToken } from "./auth";

let loadingObj = null;
let apiCount = 0;

// 创建axios实例
let service = axios.create({
  baseURL: "", // api的base_url process.env.BASE_API
  timeout: 5000, // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken("token")) {
      config.headers = {
        Authorization: "Token " + getToken("token"), //携带权限参数
      };
    }

    // 每次请求请求次数加+1
    apiCount += 1;
    loadingObj = Loading.service({
      text: "加载中",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    // 相应成功后请求次数减1 为0时关闭加载遮罩层
    const res = response.data;

    apiCount -= 1;
    if (apiCount === 0) {
      loadingObj.close();
    }
    
    if(res.Code||res.Code==0){
      // console.log(1212,res.Code)
      switch (res.Code) {
        case 0:
          res.flag=true
          return res
          break;
        case 1005:
          var DeviceID=null;
          //deviceID=1来源为公众号
          DeviceID=DeviceID==null?1:DeviceID;
          //https://wclwx.gzcloudbeing.com
          //https://wx.wechatlee.com
          //window.location.origin
          location.replace("https://wx.wechatlee.com/WXPayExample/ProductPage.aspx?url=" + escape(location.href + (location.href.indexOf('?') >= 0 ? '&DeviceID=' : '?DeviceID=')+DeviceID));
          (location.href.indexOf('?') >= 0 ? '&DeviceID=1' : '?DeviceID=1')
          break;
        default:
          res.flag=false       
          return res
          break;
      }
    }else{   
      return res;
    }     
    /**
     * code:200,接口正常返回;
     */
    // if (res.code !== 200) {
    //   // Message({
    //   //   message: res.message,
    //   //   type: "error",
    //   //   duration: 5 * 1000,
    //   // });
    //   // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
    //   if (res.code === 401) {
    //     MessageBox.confirm("登录已过期", "确定退出", {
    //       confirmButtonText: "重新登录",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     }).then(() => {
    //       // store.dispatch("LogOut").then(() => {
    //       //   location.reload(); // 为了重新实例化vue-router对象 避免bug
    //       // });

    //       location.reload();
    //     });
    //   }
    //   return Promise.reject("error");
    // } else {
    //   // res.code === 200,正常返回数据
    //   return response.data?.data;
    // }
  },
  (error) => {
    apiCount -= 1;
    if (apiCount === 0) {
      loadingObj.close();
    }

    // if (error.static === 401 || error.state === 401) {
    //   MessageBox.confirm("登录已过期", "确定退出", {
    //     confirmButtonText: "重新登录",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     // store.dispatch("LogOut").then(() => {
    //     //   location.reload(); // 为了重新实例化vue-router对象 避免bug
    //     // });

    //     location.reload();
    //   });
    // }

    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000,
    // });
    return Promise.reject(error);
  }
);

export default service;
