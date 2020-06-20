$(function () {
  // 判断token是否存在
  var mytoken = localStorage.getItem('mytoken')
  if (!mytoken) {
    // 表示token不存在，跳转到登录页面
    location.href = './login.html'
  }
  function localStorInfo() {
    $.ajax({
      url: 'my/userinfo',
      type: 'get',
      // dataType:'json',
      // data:'',
      // headers: {
      //   Authorization: localStorage.getItem('mytoken')
      // },
      success: function (backData) {
        console.log(backData);
        var name = backData.data.username;
        var res = backData.data.user_pic;
        // res = "http://t.cn/RCzsdCq";
        if (backData.status === 0) {
          $('#nav-username').html(name)
          if (res) {
            //存在头像数据,显示一张图片
            //删除默认的头像
            $('#nav-username,#welcome-username').parent()
              .prev('div')
              .remove();
            //添加新的头像
            $('#nav-username,#welcome-username').parent()
              .find('img')
              .remove()
              .end()
              .prepend('<img src= "' + res + '"alt="" style="border-radius:50%"/>');
            // $('#welcome-username').parent()
            //   .parent()
            //   .children('div')
            //   .remove();
          };
        } else {

        }
      }
    });
  }
  localStorInfo();
  // 把 localStorInfo添加给$
  $.localStorInfo = localStorInfo;
  $('#logout-btn').click(function () {
    layer.confirm('你确定退出吗？你退出了还得登录，你想好了吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      //清除token,跳转登录页
      localStorage.removeItem('mytoken')
      //关闭弹窗
      layer.close(index);
      //跳转登录页
      location.href = './login.html'
    });
  })

  //点击文章类别
  $('.article').children().eq(0).click(function () {
    $('#iframe').attr("src", './article/article_category.html')
  });
  //点击文章列表
  $('.article').children().eq(1).click(function () {
    $('#iframe').attr("src", './article/article_list.html')
  });
  //点击发表文章
  $('.article').children().eq(2).click(function () {
    $('#iframe').attr("src", './article/article_publish.html')
  });
  // 点击基本资料
  $('.center>.layui-nav-child').children().eq(0).click(function () {
    $('#iframe').attr("src", './user/repwd.html')
  });
  // 点击修改头像
  // $('.center>.layui-nav-child').children().eq(1).click(function () {
  //   $('#iframe').attr("src", './user//setavatar.html')
  // });
  // 点击修改密码
  // $('.center>.layui-nav-child').children().eq(2).click(function () {
  //   $('#iframe').attr("src", './user/userinfo.html')
  // });
})