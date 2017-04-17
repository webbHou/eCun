<?php
header('Content-type:text/html; charset="utf-8"');
$upload_dir = 'upload/';

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status(array('code'=>1,'msg'=>'错误提交方式'));
}
//iconv('UTF-8', 'GBK', $pic)中文转码
if(array_key_exists('file',$_FILES) && $_FILES['file']['error'] == 0 ){
	
	$pic = $_FILES['file']['name'];
	if(move_uploaded_file($_FILES['file']['tmp_name'], iconv('UTF-8', 'GBK', $upload_dir.$pic))){

		exit_status(array('code'=>0,'msg'=>'上传成功','url'=>$upload_dir.$pic));
	}

}
exit_status(array('code'=>1,'msg'=>'出现了一些错误','PATH'=>$_FILES['file']['error']));

function exit_status($str){
	echo json_encode($str);
	exit;
}
?>