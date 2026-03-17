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
    "It's just another manic monday...",
    "Did you know Tuesday is statistically the most productive day of the week?",
    "It's wednesday my dudes.",
    "With the patience felt with every Thursday, we emerge into Friday.",
    "It's Friday, Friday, gotta get down on Fridayyy.",
    "Happy Saturday!"
];
quoteHolder.innerHTML = `"${quotes[today]}"`;


/* Message Sending Form */
function resetForm() {
    const form = document.getElementById("bootleg-strawpage-form");
    const button = document.getElementById("form-submit");
    button.disabled = true;
    button.textContent = "Sent! 😄"
    form.reset();
    setTimeout(() => {
        button.disabled = false;
        button.textContent = "Send anonymously ✍️🤫"
    }, 5000);
}