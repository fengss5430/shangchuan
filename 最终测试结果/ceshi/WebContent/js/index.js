(function(){
    //切片试验
	
    var load = $("#sliceUpload").sliceUpload({
        sliceValue:50*1024*1024,//默认是每片50M，可自定义修改此值，具体参见SliceUpload.js
        url:"upload/uploadFiless",
        isTrigger:false
    });

    load.change(function (data) {
        console.log(data);//文件后缀名
    });
    $("#upload").click(function () {
        console.log("...");
        load.uploadClick(function (a,b) {
            console.log(b);//返回进度数
        });
  
    });
    $("#output").click(function () {
        console.log("###");
        load.stopPost(function () {
            console.log("abc");
        });//此方法用来取消上传--中断
    });

})(ef);