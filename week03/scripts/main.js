// Footer info
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind Chill Calculation
function calculateWindChill(temp, windSpeed) {
    // Celsius formula (Iceland)
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);
}

function displayWindChill() {
    const temp = parseFloat(document.getElementById("temp").textContent);     // 2
    const wind = parseFloat(document.getElementById("wind").textContent);     // 15
    
    const windChillEl = document.getElementById("windChillDisplay");
    
    // Check conditions for viable calculation
    if (temp <= 10 && wind > 4.8) {
        const windChill = calculateWindChill(temp, wind);
        windChillEl.textContent = `${windChill}°C`;
    } else {
        windChillEl.textContent = "N/A";
    }
}

// Run when page loads
window.addEventListener("load", displayWindChill);