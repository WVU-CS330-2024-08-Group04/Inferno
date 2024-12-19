export function calculateRisk(inputData) {

     //the risk level is compared to the data pulled by NOAA to assess the likelihood a fire could happen
    
    //high risk level 
        const highRisk = { 
        temperature: 85, //F
        relativeHumidity: 0.30, //%
        windSpeed: 15, //mph
        precipitation: 0.01 //inches
    };

    //median risk level
    const medianRisk = {
        temperature: 77, 
        relativeHumidity: 0.40, 
        windSpeed: 12.5, 
        precipitation: 0.2 //inches 
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
        
    //compares soil moisture
    if (precipitation <= highRisk.precipitation) {
        count += 2;
    } else if (precipitation <= medianRisk.precipitation) {
        count++;
    }
    
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
    