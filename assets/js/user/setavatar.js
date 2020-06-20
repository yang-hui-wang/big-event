$(function () {
  var options = {
    aspectRatio: 1,
    preview: '.img-preview'
  }
  //1.实现裁剪基本初始化效果
  $('#image').cropper(options)

  //2.点击上传按钮,选择文件
  $('#uploadImg').click(function () {
    //点击上传按钮,触发file标签的点击行为
    // $('#selectImg').click();
    $('#selectImg').trigger('click');
  })

  //3.获取选中的文件的信息
  $('#selectImg').change(function () {
    //change 触发条件,表单输入域内容发生变化时触发
    //获取选中的文件信息
    var file = this.files[0];//获取文件信息
    console.log(file);//name
    //获取文件信息后需要显示在左边图片区域
    //使用URL.createObjectURL方法
    //作用 : 根据文件信息生成一个URL地址
    var imgUrl = URL.createObjectURL(file)
    console.log(imgUrl);
    //修改img标签的src属性
    $('#image').cropper('destroy')//销毁之前的裁剪区域
      .attr('src', imgUrl)//更新图片的路径
      .cropper(options)//重新生成新裁剪区
  })

  //4.点击确认按钮,发送ajax,上传文件
  $('#okbtn').click(function(){
    //获取裁剪后的图片信息,固定语法
    var imgurl = $('#image').cropper('getCroppedCanvas',{
      width : 100,
      height : 100
    })
    //将裁减后的图片信息转化为base64格式的字符串
    .toDataURL('image/png')
    //发送ajax请求
    $.ajax({
      url:'my/update/avatar',
      type:'POST',
      // dataType:'json',
      data:{
        avatar : imgurl,
      },
      success: function(backData){
        if(backData.status === 0){
          //更新头像成功
          layer.msg(backData.message)
          //更新头像
          //window : 当前窗口
          //parent : 父窗口
          console.log(window.parent.$.localStorInfo);
          window.parent.$.localStorInfo();
          // window.parent.$('.welcome>img').remove();
          // console.log(window.parent.$('.welcome img').attr('src'));
          //.prepend('<img src="' + res + '" class="layui-nav-img">');
        }
      }
    });
  })

})