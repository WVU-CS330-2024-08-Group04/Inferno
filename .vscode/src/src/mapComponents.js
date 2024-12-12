

export function calculateRisk(inputData) {
    const highRisk = { 
        temperature: 85, 
        relativeHumidity: 0.30, 
        windSpeed: 15, 
        soilMoisture: 0.10 
    };

    const medianRisk = {
        temperature: 77, 
        relativeHumidity: 0.40, 
        windSpeed: 12.5, 
        soilMoisture: 0.15 
    };

    const { temperature, relativeHumidity, windSpeed, soilMoisture, activeFires } = inputData;

    let count = 0;

    if (temperature >= highRisk.temperature) {
        count += 2;
    } else if (temperature >= medianRisk.temperature) {
        count++;
    }
        
    if (relativeHumidity >= highRisk.relativeHumidity) {
        count += 2;
    } else if (relativeHumidity >= medianRisk.relativeHumidity) {
        count++;
    }
        
    if (windSpeed >= highRisk.windSpeed) {
        count += 2;
    } else if (windSpeed >= medianRisk.windSpeed) {
        count++;
    }
    
    if (soilMoisture >= highRisk.soilMoisture) {
        count += 2;
    } else if (soilMoisture >= medianRisk.soilMoisture) {
        count++;
    }

    if (count >= 6 || activeFires) {
        return { risk: "High Risk", color: "red", message: "Wildfire Likely" };
    } else if (count >= 4) {
        return { risk: "Medium Risk", color: "orange", message: "Elevated Wildfire Risk" };
    } else if (count >= 2) {
        return { risk: "Low Risk", color: "yellow", message: "Minimal Wildfire Risk" };
    } else {
        return { risk: "Safe", color: "green", message: "Low Wildfire Risk" };
    }
}
