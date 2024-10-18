<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])){
        $conn = mysqli_connect('localhost','root','','accounts') or die("Connection Failed:" .mysqli_connect_error());
        if(isset($_POST['username']) && isset($_POST['password'])){
            $username = $_POST['username'];
            $password = $_POST['password'];
            // $Upper = "/[A-Z]/";

            // if(strlen($password) < 8 && preg_match($Upper, $password)){
                
            // }

            $sql = "INSERT INTO `accounts` (`username`, `password`) VALUES ('$username', '$password')";

            $query = mysqli_query($conn, $sql);
            if($query){
                echo 'Entry Successful';
            }
            else{
                echo 'Error Occurred';
            }
        }
    }
?>    

