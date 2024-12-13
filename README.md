# Inferno: Wildfire Control & Tracking
## Overview
The Wildfire Control & Tracking System is platform designed to provide tools for tracking, monitoring, and managing wildfire events. 
This project integrates geographic visualization, user account management, information about the creators and the platforms purpose, and informational resources to aid in wildfire prevention and response.
## Motivation
Wildfires pose a significant threat to lives, property, and the environment. The motivation behind this project is to provide an accessible tool for individuals, communities, and organizations to better monitor wildfire activity and respond effectively.
## Screenshots
### Logo
<img width="535" alt="Screenshot 2024-12-13 at 9 52 34 AM" src="https://github.com/user-attachments/assets/1577373c-fed1-4808-9277-eb2071633077" />]
### Demo
<img width="1470" alt="Screenshot 2024-12-13 at 9 54 05 AM" src="https://github.com/user-attachments/assets/5653859e-1019-48b4-aa2e-5e3da78b1f58" />

## Code Style
This project adheres to JavaScript Standard Style
## Features
### Welcome 
- Handles the welcome page functionality of the application
- Displays Inferno logo
- Offers login and create account options
- Continue to map and about page options on bottom
### Map Page
- Integrates NOAA data for accurate fire prediction and tracking
- Interactive map for zooming, panning, and selecting specific areas of interest
- Displays real-time wildfire data

### Dark Mode
- Toggle between light and dark mode
- Saves preferences and carries over pages

### Login
- Secure user authentication with password encryption
- Login and logout functionality

### Account Settings
- Allows users to update personal information
- Option to change password
- Access fire prevention tips

### About Page
- Provides information about the project’s goal and contributors
- Shares data sources
- Links to relevant wildfire safety and prevention resources

## Code Example
Example of rendering a map and centering it on the US
```javascript
 const map = L.map(mapContainerRef.current).setView([39.8283, -98.5795], 4); // Center on US
    mapRef.current = map;)
```

## Technical 
### Backend
- Language: Node.js
- Files: Found in the backend folder
- Purpose: Handles API requests, user authentication, and data processing

### Frontend
- Languages: HTML, CSS, Javascript, React
- Features: Interactive user interface, Map visualization, and user settings management

### Data Incorporation
- Source: NOAA data

### Database
- Storage: User account information, preferences, and activity logs

## Setup
### Prerequisites
- Node.js and npm installed
- Database server set up and configuration

## Usage
1. Create an account or log in
2. Explore the map for real-time wildfire updates
3. Customize account settings
4. Access resources and project details on the About page

## How to Use
1. Register for an account or log in
2. Navigate to the map page to view real-time wildfire data
3. Customize alert settings through the account settings page
4. Visit the About page to learn more about wildfire prevention

## Acknowledgments
- NOAA
- Leaflet.js

  

