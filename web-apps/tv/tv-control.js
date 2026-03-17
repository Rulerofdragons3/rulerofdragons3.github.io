/* Channel Handling */
const channels = await (await fetch("channels.json")).json();
const channelDisplay = document.getElementById("channel");
const tvStatic = document.getElementById("static");
const iFrame = document.getElementById("video");
const clickSound = new Audio("https://www.myinstants.com/media/sounds/dog-clicker_IygBqAk.mp3");
clickSound.preload = true;
function changeChannel(channelID) {
    //console.log("Changing Channel...");
    channelInput = "";
    tvStatic.hidden = false;
    if (!(channelID in channels)) {
        channelDisplay.innerText = "No Signal";
        iFrame.src = "";
        return;
    }
    iFrame.src = channels[channelID].url;

    setTimeout(() => {
        tvStatic.hidden = true;
    }, 500)
    setTimeout(() => {
        channelDisplay.hidden = true;
    }, 2000)
}

/* Channel Changing Handling */
var channelInput = "";
var timer;
function pressChannelButton(n) {
    clickSound.currentTime = 0.35;
    clickSound.play();
    if (channelInput.length >= 3) return;
    //console.log("Showing stuff!")
    channelDisplay.hidden = false;
    channelInput += n;
    //console.log(n, channelInput);
    channelDisplay.innerText = channelInput;
    if (timer) {
        // Resets timer on button press.
        clearTimeout(timer);
    }
    timer = setTimeout(changeChannel.bind(null, 
        parseInt(channelInput, 10) // Removes leading zeros.
    ),3000);
}

/* Remote controller control */

function buildRemote() {
    const remote = document.getElementById("numpad")
    for (var i = 1; i <= 10; i++) {
        const button = document.createElement("button");
        const bnum = i != 10 ? i : 0; // Makes the last button zero.
        button.innerText = bnum;
        button.classList = "remote-button"
        button.addEventListener('click', pressChannelButton.bind(null, bnum));
        remote.appendChild(button);
    }
}

buildRemote();


/* Guide Builder */

const guide = document.getElementById("channels");

Object.keys(channels).forEach(channel => {
    if (channels[channel].name) {
        const p = document.createElement("p");
        p.innerText = `${channel < 10 ? "0" + channel : channel} - ${channels[channel].name}`;
        p.classList = "guide-element"
        guide.appendChild(p);
    }
});