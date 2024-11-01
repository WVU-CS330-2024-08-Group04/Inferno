<?php
    if($_SERVER['REQUEST_METHOD'] == "POST"){
    
            
            $username = $_POST["username"];
            $password = $_POST["password"];
            // $Upper = "/[A-Z]/";

            $passwordHash = password_hash($password, PASSWORD_BCRYPT);

            $mysqli = new mysqli("cs3304.database.windows.net", "cs330admin", "cs330Pass!", "CS_330_4");
            $sql = "INSERT INTO Accounts VALUES ('$username', '$password')";

            $query = mysqli_query($conn, $sql);

        }
    



