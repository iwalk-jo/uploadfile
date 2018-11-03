// Init App
var myApp = new Framework7({
    modalTitle: 'Framework7',
    // Enable Material theme
    material: true,
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
});

myApp.onPageInit('upload',function(page){

    var pictureSource;
    var destinationType;
    document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady(){
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

	$$("#getcamera").on("click",function(){
		navigator.camera.getPicture(onSuccess,onFail,{
            quality:30,
            saveToPhotoAlbum:true,
            destinationType:Camera.DestinationType.FILE_URI
        });
	});

    function onSuccess(imageURI){
        myApp.alert("Camera Success.., URI: "+imageURI);
        $$("#camera").attr("src",imageURI);
    }

    function onFail(message){
        myApp.alert('Failed because : '+message);
    }

    $$("#upload").on("click",function(){
       $$("loading").show();
       $$("loading").text("Wait...!");

       var imageURI=$$("#camera").attr("src");
       var name=$$("#name").val();
       var age=$$("#age").val();
       var options=new FileUploadOptions();
       
       options.fileKey="test";
       options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
       options.mimeType="image/jpeg";

       var params=new Object();
       options.params=params;
       options.chunkedMode=false;

       var ft=new FileTransfer();
       ft.upload(imageURI,"https://webhozz-training.com/androidMaster/uploadfile/upload.php?name="+name+"&age="+age,win,fail,options,true);

    });

    function win(r){
        myApp.alert("Upload Success");
        $$("#loading").hide();
    }

    function fail(error){
        myApp.alert("Error occured "+error.code);
    }
});

