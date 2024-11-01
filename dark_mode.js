function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var clickMeText = document.getElementById("clickMeText");
    var buttonIcon = document.querySelector(".button_icon ion-icon");

    // Check if dark mode is enabled
    if (element.classList.contains("dark-mode")) {
        clickMeText.textContent = "Light Mode";
        buttonIcon.setAttribute("name", "sunny");
        document.getElementById('image').src ='Dark Mode Inferno Full Logo cropped.png';
        localStorage.setItem('theme', 'dark'); // Save preference
    } else {
        clickMeText.textContent = "Dark Mode";
        buttonIcon.setAttribute("name", "moon");
        document.getElementById('image').src ='Inferno wildfire full logo cropped.png';
        localStorage.setItem('theme', 'light'); // Save preference
    }

}
    function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById("clickMeText").textContent = "Light Mode";
        document.querySelector(".button_icon ion-icon").setAttribute("name", "sunny");
        }
    }
    
    window.onload(setInitialTheme());

