 function getInfo() {
    const stopId = document.getElementById("stopId").value;
    const stopName = document.getElementById("stopName");
    const busesData = document.getElementById("buses");

    stopName.textContent = "";
    busesData.textContent = "";

    const url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;

    fetch(url)
        .then(response => response.json())
        .then(stops => {
            stopName.textContent = stops.name;

            Object.entries(stops.buses)
                .forEach(([busId, time]) => {
                    const busLi = document.createElement("li");
                    busLi.textContent = `Bus ${busId} arrives in ${time} minutes`;
                    busesData.appendChild(busLi);
                })
        })
        .catch(() => stopName.textContent = "Error");
}