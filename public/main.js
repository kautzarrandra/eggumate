/* main.js */
function loadEggData() {
    const date = document.getElementById("filterDate").value;
    const tbody = document.getElementById("eggTableBody");
    console.log("Fetching data for date:", date);
    tbody.innerHTML = "<tr><td colspan='2'>Memuat...</td></tr>";
    if (!date) return;
    db.ref("eggs/" + date).once("value", (snapshot) => {
        const data = snapshot.val();
        if (!data) {
        tbody.innerHTML = "<tr><td colspan='2'>Tidak ada data</td></tr>";
        return;
        }
        tbody.innerHTML = "";
        Object.keys(data).forEach((time) => {
        const entry = data[time];
        const row = `<tr><td>${entry.timestamp}</td><td>${entry.weight}</td></tr>`;
        tbody.innerHTML += row;
        });
    });
}

function calculateFCR() {
    const date = document.getElementById("fcrDate").value;
    const feed = parseFloat(document.getElementById("feedInput").value);

    const output = document.getElementById("fcrOutput");
    const rating = document.getElementById("fcrRating");
    const eggCount = document.getElementById("fcrEggCount");
    const totalWeightEgg = document.getElementById("fcrTotalWeight");

    if (!date || isNaN(feed)) {
        output.textContent = "Input tidak valid";
        rating.textContent = "-";
        eggCount.textContent = "-";
        totalWeightEgg.textContent = "-";
        return;
    }

    db.ref("eggs/" + date).once("value", (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            output.textContent = "0";
            rating.textContent = "Tidak ada telur";
            eggCount.textContent = "0";
            totalWeightEgg.textContent = "0";
            return;
        }

        let totalWeight = 0;
        let count = 0;

        Object.values(data).forEach((egg) => {
            const weight = parseFloat(egg.weight);
            if (!isNaN(weight)) {
                totalWeight += weight;
                count++;
            }
        });

        const fcr = (feed / totalWeight).toFixed(2);

        output.textContent = fcr;
        eggCount.textContent = count;
        totalWeightEgg.textContent = totalWeight.toFixed(1);

        if (fcr < 1.8) rating.textContent = "🥚 Egg-celent! Your farm is profitable!";
        else if (fcr < 2.2) rating.textContent = "👍 Good";
        else rating.textContent = "⚠️ Bad :( Your farm is unprofitable!";
    });
}
