/**
 * mapComponents.js
 * 
 * This file handles the map page backend calculations of the application. 
 * 
 * Responsibilities:
 * -calculate risk of fire 
 * 
 * Group 4
 */

//exports function to calculate the risk of a fire
export function calculateRisk(inputData) {

    //the risk level is compared to the data pulled by NOAA to assess the likelihood a fire could happen

    //high risk level 
    const highRisk = { 
        temperature: 85, 
        relativeHumidity: 0.30, 
        windSpeed: 15, 
        precipitation: 0.04 //inches or 1mm 
    };

    //median risk level
    const medianRisk = {
        temperature: 77, 
        relativeHumidity: 0.40, 
        windSpeed: 12.5, 
        precipitation: 0.2 //inches or 5mm  
    };

    const { temperature, relativeHumidity, windSpeed, precipitation, activeFires } = inputData;

    //count determines the risk level
    let count = 0;

    //compares temperature
    if (temperature >= highRisk.temperature) {
        count += 2;
    } else if (temperature >= medianRisk.temperature) {
        count++;
    }
        
    //compares humidity
    if (relativeHumidity <= highRisk.relativeHumidity) {
        count += 2;
    } else if (relativeHumidity <= medianRisk.relativeHumidity) {
        count++;
    }
    
    //compares wind speed
    if (windSpeed >= highRisk.windSpeed) {
        count += 2;
    } else if (windSpeed >= medianRisk.windSpeed) {
        count++;
    }
    
    //compares precipitation
    if (precipitation <= highRisk.precipitation) {
        count += 2;
    } else if (precipitation <= medianRisk.precipitation) {
        count++;
    }

    console.log('Input Data:', inputData);
    console.log('High Risk Thresholds:', highRisk);
    console.log('Median Risk Thresholds:', medianRisk);
    console.log('Count:', count);

    //returns risk level based on count
    if (count >= 6 || activeFires) {
        return { risk: "High Risk", color: "#e30808", message: "Wildfire Likely" };
    } else if (count >= 4) {
        return { risk: "Medium Risk", color: "#faa064", message: "Elevated Wildfire Risk" };
    } else if (count >= 2) {
        return { risk: "Low Risk", color: "#f0e300", message: "Minimal Wildfire Risk" };
    } else {
        return { risk: "Safe", color: "#26c454", message: "Low Wildfire Risk" };
    }
}
