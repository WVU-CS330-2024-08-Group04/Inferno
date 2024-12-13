# Inferno: Wildfire Control & Tracking
## Old Src 
### Overview
The Wildfire Control & Tracking System was originally created with only HTML, CSS, and some Javascript. These files design the welcome page,
about page, map page, as well as the login. The HTML was later integrated into the Javascript.
### Motivation
When the team first began creating this platform, the original motivation was for the public to have access to fire location tracking as well as fire prevention tips. Since then the team has added to the motivation behind this project; to provide an accessible tool for individuals, communities, and organizations to better monitor wildfire activity and respond effectively.
### Features

#### Welcome 
- Original design was onlny HTML, CSS, and minimal Javascript
- Offers a dark mode button that saves preferences
- Links to Login and Account Create

#### Account Create
- Provides a registration form for new users
- Sends the registration details to the backend, and if successful, redirects to the login page

#### Login
- Provides a login form that authenticates the user
- Upon successful login, it updates the authentication state and navigates to the map page

#### Account Settings
- Handles the user settings page functionality of the application
- Always accessible by clicking the user icon in the top right of all pages excluding the welcome page

#### About
- Handles the about page functionality of the application
- Access educational resources
- Access infomration about the platform creators

#### Map
- Handles the map page functionality of the application
- Integrates NOAA data for accurate fire prediction and tracking
- Interactive map for zooming, panning, and selecting specific areas of interest

#### Dark Mode
- Toggle between light and dark mode
- Saves preferences and carries over pages

#### Banner
- The logo in the top left corner links back to the welcome page
- The about button links to the about page
- The profile image leads to account settings

### Code Style: HTML and CSS
- HTML: Follows semantic and accessible structure, with consistent 2-space indentation and meaningful class/ID names. 
- CSS: Styles are grouped logically and follow consistent formatting.



