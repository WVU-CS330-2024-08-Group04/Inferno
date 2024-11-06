// Dropdown filter logic
const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdownContent = document.querySelector('.dropdown-content');
dropdownContent.style.display = 'none';

dropdownTrigger.addEventListener('click', function () {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    dropdownContent.style.textAlign = "left";
});

// Close dropdown if clicked outside
document.addEventListener('click', function (event) {
    if (!dropdownTrigger.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});

// Get selected filters
function getFilters() {
    const checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
    const selectedFilters = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    console.log(selectedFilters);
}

// Apply filters button
const applyButton = dropdownContent.querySelector('button');
applyButton.addEventListener('click', function () {
    getFilters();
    dropdownContent.style.display = 'none'; // Close dropdown after applying filters
});
document.addEventListener("DOMContentLoaded", function () {
    const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";
    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
        setDarkModeUI(true);
    }
});


// Initialize map 
var map = L.map('map').setView([39.8283, -98.5795], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    setView: 3,
    attribution: '© OpenStreetMap'
}).addTo(map);

//setting max bounds
var southWest = L.latLng(24.396308, -125.0); // Approximate southwest corner of the US 
var northEast = L.latLng(49.384358, -66.93457); // Approximate northeast corner of the US 
var bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);
map.setMinZoom( map.getBoundsZoom( map.options.maxBounds ) );

//ensure drag doesn't go past bounds
map.on('drag', function(){
    map.panInsideBounds(bounds, {animate:false});
});

//add stac layer
var stacLayer = L.tileLayer('planetary_computer_NClimGrid.html', { 
    maxZoom: 19,
    
}).addTo(map);

// Add elevation layer
const demLayer = L.tileLayer.wms("https://elevation.nationalmap.gov/arcgis/services/3DEPElevation/ImageServer/WMSServer?", {
    layers: "3DEPElevation:Hillshade Elevation Tinted",
    format: "image/png",
    transparent: true,
    opacity: 0.6
});

// Add elevation layer to the map initially if checked
if (document.getElementById('toggleDEM').checked) {
   demLayer.addTo(map);
}

// Toggle elevation layer on checkbox change
document.getElementById('toggleDEM').addEventListener('change', function () {
    if (this.checked) {
        demLayer.addTo(map); 
    } else {
        map.removeLayer(demLayer); 
    }
});

 var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend');

div.innerHTML += '<strong>Chance of Fire<strong><br>'
div.innerHTML += '<i style = "background:#E30808;"></i>High Chance<strong><br>'
div.innerHTML += '<i style = "background:#FAA064;"></i>Moderate Chance<strong><br>'
div.innerHTML += '<i style = "background:#F0E300;"></i>Low Chance<strong><br>'
div.innerHTML += '<i style = "background:#26C454;"></i>No Chance<strong><br>'
return div;
};

legend.addTo(map);


// Other functionalities: Search location, save location, etc.
var currentMarker;
var savedLocations = [];
var lastSearchedLocation;

function searchLocation() {
    var location = document.getElementById('locationInput').value;
    var geocodeURL = 'https://nominatim.openstreetmap.org/search?format=json&q=' + location;

    fetch(geocodeURL)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);
                var displayName = data[0].display_name;
            
            if(!bounds.contains([lat,lon])){
                L.popup()
                    .setLatLng([lat,lon])
                    alert("Location is out of bounds.")
                    .openOn(map);
            }
            else{

                map.setView([lat, lon], 13);

                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }

                currentMarker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(displayName)
                    .openPopup();

                lastSearchedLocation = {
                    name: displayName,
                    lat: lat,
                    lon: lon
                };

                document.getElementById('saveLocationBtn').style.display = 'inline';
            }
        }   else {
                alert("Location not found. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
        });
}

document.getElementById('locationInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchLocation();
    }
});


//adds implementation of saving locations for later
function saveLocation() {
    if (lastSearchedLocation) {
        var name = lastSearchedLocation.name;
        var lat = lastSearchedLocation.lat;
        var lon = lastSearchedLocation.lon;

        if (!savedLocations.some(loc => loc.name === name)) {
            savedLocations.push({ name: name, lat: lat, lon: lon });

            var dropdown = document.getElementById('savedLocations');
            var option = document.createElement('option');
            option.text = name;
            option.value = JSON.stringify({ lat: lat, lon: lon });
            dropdown.add(option);

            document.getElementById('saveLocationBtn').style.display = 'none';
        } else {
            alert("Location is already saved.");
        }
    }
}

//jumps to a selected location from dropdown
function jumpToSavedLocation() {
    var dropdown = document.getElementById('savedLocations');
    var selectedValue = dropdown.value;

    if (selectedValue) {
        var location = JSON.parse(selectedValue);
        var lat = location.lat;
        var lon = location.lon;

        map.setView([lat, lon], 13);

        if (currentMarker) {
            map.removeLayer(currentMarker);
        }

        currentMarker = L.marker([lat, lon]).addTo(map)
            .bindPopup(dropdown.options[dropdown.selectedIndex].text)
            .openPopup();
    }
}

//function to retrieve dates from user input
function getDates() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (startDate && endDate) {
        document.getElementById('selected-dates').innerText = `Selected Dates: ${startDate} to ${endDate}`;
    }
}