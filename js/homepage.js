/*  Confetti button */
const confettiButton = document.getElementById("confetti-button");
const confettiGif = document.getElementById("confetti");
//const partyHorn = document.getElementById("party-blower-sound");
const cgif = "/assets/confetti.gif";
var pressCooldown = false;
confettiGif.src = cgif + "?t=" + new Date().getTime();
confettiButton.onclick = () => {
    const cooldown = 5500;
    if (pressCooldown) return;
    //partyHorn.play();
    pressCooldown = true;
    confettiGif.hidden = false;
    setTimeout(() => {
        confettiGif.hidden = true;
        pressCooldown = false;
        // Resets the gif's playback.
        confettiGif.src = cgif + "?t=" + new Date().getTime();
        //partyHorn.currentTime = 0;
    }, cooldown);

}

/* Quote of the day */
const quoteHolder = document.getElementById("quoteHolder");
const today = new Date().getDay(); //0 - Sunday, 6 - Saturday
const quotes = [
    "The Lord declared Sundays as days of rest. Take this time to procrastinate.",
    "I hate mondays...", //"It's just another manic monday...",
    "Did you know Tuesday is statistically the most productive day of the week?",
    "It's wednesday my dudes.",
    "Although Friday can be seen on the horizon, don't forget to enjoy the gift of Thursday.",
    "It's Friday! Friday! 'Gotta get down on Fridayyy. Everybody's looking forward to the weekend!",
    "Take a break today, you earned it."
];
quoteHolder.innerHTML = `"${quotes[today]}"`;


/* Message Sending Form */
const form = document.getElementById("bootleg-strawpage-form");
form.reset();
form.addEventListener("submit", resetForm);
function resetForm() {
    const button = document.getElementById("form-submit");
    button.disabled = true;
    button.textContent = "Sent! 😄"
    setTimeout(() => {
        form.reset();
        button.disabled = false;
        button.textContent = "Send anonymously ✍️🤫"
    }, 5000);
}

/* Mii news animation */
const box = document.getElementById("newsBox");
box.style = `
background-image: url("https://media1.tenor.com/m/coTPyF4nejIAAAAC/tomodachi-life-mii.gif?t=${new Date().getTime()}");
height: 250px;
`;
box.childNodes.forEach((c) => {
    c.hidden = true;
});
setTimeout(() => {
    box.style = 'height: 250px;';
    box.childNodes.forEach((c) => {
    c.hidden = false;
    });
}, 2500)