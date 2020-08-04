function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const stopsInfo = document.getElementsByClassName("info")[0];

    let currentStop = '';
    let nextStop = '';

    function depart() {
        const currentId = stopsInfo.textContent === 'Not Connected' ? 'depot' : nextStop;
        const url = `https://judgetests.firebaseio.com/schedule/${currentId}.json`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                currentStop = data.name;
                nextStop = data.next;

                stopsInfo.textContent = `Next stop ${currentStop}`;
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch(() => {
                stopsInfo.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function arrive() {
        stopsInfo.textContent = `Arriving at ${currentStop}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();