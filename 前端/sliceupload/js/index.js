(function(){
    //切片试验
    var load = $("#sliceUpload").sliceUpload({
        sliceValue:50,//默认是每片50M，可自定义修改此值，具体参见SliceUpload.js
        url:"test.php",
        isTrigger:false
    });

    load.change(function (data) {
        console.log(data);
    });
    $("#upload").click(function () {
        console.log("...");
        load.uploadClick(function (a,b) {
            console.log(b);
        });
        //load.stopPost(function () {
        //    console.log("abc");
        //});//此方法用来取消上传--中断


    });

})(ef);