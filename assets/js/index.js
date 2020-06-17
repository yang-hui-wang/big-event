$(function () {
  // 判断token是否存在
  var mytoken = localStorage.getItem('mytoken')
  if (!mytoken) {
    // 表示token不存在，跳转到登录页面
    location.href = './login.html'
  }
  function localStorInfo(){
    $.ajax({
      url:'http://ajax.frontend.itheima.net/my/userinfo',
      type:'get',
      // dataType:'json',
      // data:'',
      headers:{
        Authorization:localStorage.getItem('mytoken')
      },
      success: function(backData){
        console.log(backData);
      }
    });
  }
  localStorInfo();
})