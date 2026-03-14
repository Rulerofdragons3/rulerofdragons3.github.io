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