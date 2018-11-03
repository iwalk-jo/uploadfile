<?php
	
	header('Access-Control-Allow-Origin:*');

	include "connection.php";

	$yourname=$_GET['name'];
	$age=$_GET['age'];

	move_uploaded_file($_FILES["test"]["tmp_name"], 'file/'.$_FILES["test"]["name"]);

	$photo='file/'.$_FILES["test"]["name"];

	$insert="INSERT INTO photo(photo,name,age) VALUES('$photo','$yourname','$age')";

	$result=mysqli_query($conn,$insert) or die(mysqli_error());

?>