<!DOCTYPE html>  <!-- create_account.php -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Creation Page</title>
</head>
<body>

    <?php
        if($_SERVER["REQUEST_METHOD"] == "POST"){

            $username = $_POST["username"];
            $password = $_POST["password"];
        
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        
            $mysqli = new mysqli("localhost", "username", "password", "database");
            $sql = "INSERT INTO Users VALUES ('" . $mysqli->real_escape_string($username) . "', '$passwordHash')";
            if($mysqli->query($sql)){
                echo "<p>Account Created.</p>",
                    "<p><a href='login.php'>Login</a></p></html>";
                die;
            }
            elseif($mysqli->errno == 1062){
                echo "<p>The username already exists.","Please re-enter.</p>";
            }
            else{
                die("Error");
            }
        }
        
    ?>

    <form method = "post" action="create_account.php">
        <p>
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" autofocus>
        </p>
        <p>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password">
        </p>
        <input type="submit" value="Create Account">
    </form>
</body>
</html>

