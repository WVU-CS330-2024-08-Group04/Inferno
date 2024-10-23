document.addEventListener("DOMContentLoaded", function() {
    var username = "username"; 
    var version = "1.0.0"; 

    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric',
        month: 'long',  
        day: 'numeric'
    });

    document.getElementById("accountInfo").innerHTML = `
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Website Version:</strong> ${version}</p>
        <p><strong>Today's Date:</strong> ${formattedDate}</p>
    `;
});

function openUp(popUpId) {
    document.getElementById(popUpId).style.display = "block";
}

function closeUp(popUpId) {
    document.getElementById(popUpId).style.display = "none";
}

function submitUsernameChange() {
    var oldUsername = document.getElementById("oldUsername").value;
    var newUsername = document.getElementById("newUsername").value;
    var confirmUsername = document.getElementById("confirmUsername").value;

    if (newUsername !== confirmUsername) {
        alert("New usernames do not match!");
        return;
    }

    alert("Username changed successfully!");
    closeUp('usernamePopUp');
}

function submitPasswordChange() {
    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
    }

    alert("Password changed successfully!");
    closeUp('passwordPopUp');
}

function confirmDeleteAccount() {
    var confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
        alert("Account deleted successfully!");
        closeUp('deleteAccountPopUp');
    } else {
        closeUp('deleteAccountPopUp');
    }
}

function signOut(){
    window.location.href = 'AccLogin.html'
    
}

document.getElementById('signOutButton').addEventListener('click',signOut)
