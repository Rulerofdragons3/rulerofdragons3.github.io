console.log("About me script is alive!");
var ageTag = document.getElementById("age");
const momentIWasBorn = new Date("2005-08-18T00:00:00");

function updateAge() {
    const now = Date.now();
    var delta = Math.abs(now - momentIWasBorn);
    // Calculate each component
    const years = Math.floor(delta / (1000 * 60 * 60 * 24 * 365));
    delta -= years * (1000 * 60 * 60 * 24 * 365);

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    delta -= days * (1000 * 60 * 60 * 24);

    const hours = (Math.floor(delta / (1000 * 60 * 60)) % 24) - 1;
    delta -= hours * (1000 * 60 * 60) - 1;

    const minutes = Math.floor(delta / (1000 * 60)) % 60;
    delta -= minutes * (1000 * 60);

    const seconds = Math.floor(delta / 1000) % 60;

    ageTag.textContent = `${years} years, ${days}days, 
    ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
    setTimeout(updateAge, 1000);
}

updateAge();


