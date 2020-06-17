$(function () {
  // 判断token是否存在
  var mytoken = localStorage.getItem('mytoken')
  if (!mytoken) {
    // 表示token不存在，跳转到登录页面
    location.href = './login.html'
  }
  function localStorInfo() {
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/my/userinfo',
      type: 'get',
      // dataType:'json',
      // data:'',
      headers: {
        Authorization: localStorage.getItem('mytoken')
      },
      success: function (backData) {
        console.log(backData);
        var res = backData.user_pic;
        res = "http://t.cn/RCzsdCq";
        if (backData.status === 0) {
          if (res) {
            $('.welcome').prepend('<img src="' + res + '" class="layui-nav-img">');
            $('.welcome>div').remove();
          };
          var uname = backData.data.username;
          $('.layui-nav-item>.welcome>img').after('<i>' + uname + '</i>');
          $('.layui-side-scroll>.welcome>span').text('欢迎 ' + uname)
        }
      }
    });
  }
  localStorInfo();

  $('#logout-btn').click(function () {
    layer.confirm('你确定退出吗？你退出了还得登录，你想好了吗?', {icon: 3, title:'提示'}, function(index){
      //do something
      //清除token,跳转登录页
      localStorage.removeItem('mytoken')
      //关闭弹窗
      layer.close(index);
      //跳转登录页
      location.href = './login.html'
    });   
  })
})