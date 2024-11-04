function predictRisk() {
    const highRisk = { temperature: 85, relativeHumidity: 0.30, windSpeed: 15, soilMoisture: 0.10 };
    const medianRisk = { temperature: 77, relativeHumidity: 0.40, windSpeed: 12.5, soilMoisture: 0.15 };
    const temperature = parseFloat(document.getElementById('temperature').value);
    const relativeHumidity = parseFloat(document.getElementById('relativeHumidity').value) / 100;
    const windSpeed = parseFloat(document.getElementById('windSpeed').value);
    const soilMoisture = parseFloat(document.getElementById('soilMoisture').value) / 100;
    const activeFires = document.getElementById('activeFires').checked;
    let count = 0;
    
    if (temperature > highRisk.temperature) count += 2;
    else if (temperature > medianRisk.temperature) count++;

    if (relativeHumidity > highRisk.relativeHumidity) count += 2;
    else if (relativeHumidity > medianRisk.relativeHumidity) count++;

    if (windSpeed > highRisk.windSpeed) count += 2;
    else if (windSpeed > medianRisk.windSpeed) count++;

    if (soilMoisture > highRisk.soilMoisture) count += 2;
    else if (soilMoisture > medianRisk.soilMoisture) count++;

    const outputDiv = document.getElementById('predictionOutput');
    outputDiv.className = 'risk-level';

    if (count >= 6 || activeFires) {
        outputDiv.classList.add('high-risk');
        outputDiv.textContent = "High Risk (Red): Wildfire Likely";
    } else if (count >= 4) {
        outputDiv.classList.add('medium-risk');
        outputDiv.textContent = "Medium Risk (Orange): Elevated Wildfire Risk";
    } else if (count >= 2) {
        outputDiv.classList.add('low-risk');
        outputDiv.textContent = "Low Risk (Yellow): Minimal Wildfire Risk";
    } else {
        outputDiv.classList.add('safe');
        outputDiv.textContent = "Safe (Green): Low Wildfire Risk";
    }
}
