<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

 <?php
 if ($_SERVER['REQUEST_METHOD'] == "POST") {
 
     $username = $_POST["username"];
     $password = $_POST["password"];
 
     // Hash the password
     $passwordHash = password_hash($password, PASSWORD_BCRYPT);
 
     // Database connection details
     $host = 'cs3304.database.windows.net';
     $adminusername = 'cs330admin';
     $adminpassword = 'cs330Pass!';
     $db_name = 'CS_330_4';
 
     // Create a new MySQLi connection
     $mysqli = new mysqli($host, $adminusername, $adminpassword, $db_name);
 
     // Check for connection errors
     if ($mysqli->connect_error) {
         die("Connection failed: " . $mysqli->connect_error);
     }
 
     // Prepare and bind the SQL statement to prevent SQL injection
     $stmt = $mysqli->prepare("INSERT INTO Accounts (username, password) VALUES (?, ?)");
     $stmt->bind_param("ss", $username, $passwordHash);
 
     // Execute the query and check if it was successful
     if ($stmt->execute()) {
         echo "<p>Your account has been created.</p>";
     } else {
         echo "<p>There was an error creating your account.</p>";
     }
 
     // Close the statement and connection
     $stmt->close();
     $mysqli->close();
 }
 ?>
 
    // if($_SERVER['REQUEST_METHOD'] == "POST"){
    
            
    //         $username = $_POST["username"];
    //         $password = $_POST["password"];
    //         // $Upper = "/[A-Z]/";

    //         $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    //         $host = 'cs3304.database.windows.net';
    //         $adminusername = 'cs330admin';
    //         $adminpassword = 'cs330Pass!';
    //         $db_name = 'CS_330_4';

    //         $mysqli = new mysqli($host, $adminusername, $adminpassword, $db_name);
    //         $sql = "INSERT INTO Accounts VALUES ('" . $mysqli->real_escape_string($username) . "', '$passwordHash')";
    //         if($mysqli->query($sql)){
    //             echo "<p>Your account has been created.</p>";
    //         }

    //     }
?> 

</body>
</html>

    



