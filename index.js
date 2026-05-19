const zone = 'SGR01';
const now = new Date();
const day = now.getDate();          // 1 - 31
const month = now.getMonth() + 1;  // 0-based, so +1
const year = now.getFullYear();
const date = `${day}/${month}/${year}`;

function displayDate(){
    const dateDisplay = document.getElementById("date")

    dateDisplay.textContent = date;
}

async function getPrayerTime(){
    try {
        const response = await fetch(`https://api.waktusolat.app/solat/${zone}/${day}?year=${year}&month=${month}`);
        if(!response.ok){
            throw new Error('error: ' + response.status);
        }
        const data = await response.json();
        console.log(data);
        return {
            fajr: data.prayerTime.fajr,
            sunrise: data.prayerTime.syuruk,
            dhuhr: data.prayerTime.dhuhr,
            asr: data.prayerTime.asr,
            maghrib: data.prayerTime.maghrib,
            isha: data.prayerTime.isha
        };
    }
    catch (error) {
        console.log(error);
    }
}

function displayPrayerTime(data){
    const fajrDisplay = document.getElementById("fajr");
    fajrDisplay.textContent = data.fajr;

    const sunriseDisplay = document.getElementById("sunrise");
    sunriseDisplay.textContent = data.sunrise;

    const dhuhrDisplay = document.getElementById("dhuhr");
    dhuhrDisplay.textContent = data.dhuhr;

    const asrDisplay = document.getElementById("asr");
    asrDisplay.textContent = data.asr;

    const maghribDisplay = document.getElementById("maghrib");
    maghribDisplay.textContent = data.maghrib;

    const ishaDisplay = document.getElementById("isha");
    ishaDisplay.textContent = data.isha;
}


async function loadPrayerTime() {
    displayDate();

    const prayerData = await getPrayerTime();

    displayPrayerTime(prayerData);
}

loadPrayerTime();
