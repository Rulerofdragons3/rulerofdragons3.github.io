const interactionsJSON = await (await fetch("./interactions.json")).json();
import { getCharacters } from "./character-creator.js";
import { randiRange, divideMarbles, clamp } from '/js/util.js';
const storyListTag = document.getElementById("story-list");
const resultsTag = document.getElementById("results");
const startPage = document.getElementById("start-page");
const gamePage = document.getElementById("game");
const proceedButton = document.getElementById("proceed");
var day = 1;

function generateCharacterObjs() {
    const charr = getCharacters();
    const output = [];
    charr.forEach((n, index) => {
        output.push({
            name: n,
            killWeight: 100
        });
    });
    return output;
}

function weightedRandom(characters) {
    // Sum of total weights
    var sumOfWeights = 0;
    characters.forEach(c => {
        sumOfWeights += c.killWeight;
    });
    // Select a random number between 1 and total.
    var rand = Math.ceil(Math.random() * sumOfWeights);
    //
    var selector = 0;
    for (var i = 0; i < characters.length; i++) {
        selector += characters[i].killWeight;
        if (rand <= characters[i].killWeight) {
            return characters[i];
        }
    }
    //This should never trigger.
    console.log("This triggered!")
    return characters[0]; 
}

function pushToLog(txt) {
    const pTag = document.createElement("p");
    pTag.classList = "outcome"
    pTag.innerHTML = txt;
    storyListTag.appendChild(pTag);
}

function selectRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateResults(contestants) {
    const totalInteractions = clamp(contestants.length + randiRange(1,5), 5, 20);
    // Return an array of 5 elements, with values split amongst total interactions.
    const eventDistributions = divideMarbles(totalInteractions, 5); 
    // Events that can still be called. In form [0,1,2,3,4]
    const remainingEventIDs = [];
    const dead = [];

    // Set up remainingEventIDs
    // Gets all remaining events that can still occur.
    eventDistributions.forEach((value, index) => { 
        if (value > 0) remainingEventIDs.push(index);
    });

    do {
        const selectedEvent = Math.floor(Math.random() * remainingEventIDs.length)
        // Event handler
        switch (selectedEvent) { 
            case 0: // PVP Kills
                const KillerIndex = Math.floor(Math.random() * (contestants.length));
                const Killer = contestants[KillerIndex];
                // Ensures different contestant is chosen.
                const possibleVictims = Array.from(contestants);
                possibleVictims.splice(KillerIndex,1);
                // Selects victim and finds them on the array
                const selection = weightedRandom(possibleVictims);
                const victimIndex = contestants.indexOf(selection)
                // Logs data
                const toLog = selectRandomFromArray(interactionsJSON.PVPKills)
                    .replaceAll("%k",`<b>${Killer.name}</b>`)
                    .replaceAll("%v",`<b>${selection.name}</b>`);
                pushToLog(`⚔️\t| ${toLog}`)
                dead.push(selection);
                // Remove victim from array.
                contestants.splice(victimIndex,1);
                break;
            case 1: // Self-induced kills
                //
                const victim = weightedRandom(contestants);
                const vi = contestants.indexOf(victim);
                // Logs death
                pushToLog(`☠️\t| ${
                    selectRandomFromArray(interactionsJSON.SelfInducedKills)
                    .replaceAll("%v",`<b>${victim.name}</b>`)
                }`);
                dead.push(victim);
                // Remove victim from array.
                contestants.splice(vi,1);
                break;
            case 2: // Idle interactions
                pushToLog(`❔\t| ${
                    selectRandomFromArray(interactionsJSON.IdleInteractions)
                    .replaceAll("%c",`<b>${selectRandomFromArray(contestants).name}</b>`)
                }`);
                break;
            case 3: // P2P interactions
                const c1 = selectRandomFromArray(contestants);
                const c2 = selectRandomFromArray(contestants.filter((c) => c !== c1));
                pushToLog(`💞\t| ${
                    selectRandomFromArray(interactionsJSON.P2PInteractions)
                    .replaceAll("%a", `<b>${c1.name}</b>`)
                    .replaceAll("%b", `<b>${c2.name}</b>`)
                }`);
                break;
            case 4: // Events
                const eventeeIndex = Math.floor(Math.random() * (contestants.length));
                const eventee = contestants[eventeeIndex]; // The one who will be affected by the event.
                const event = selectRandomFromArray(interactionsJSON.Events);
                pushToLog(`‼️\t| ${event.text.replaceAll("%c",`<b>${eventee.name}</b>`)}`);
                contestants[eventeeIndex].killWeight += event.alterKillChance;
                break;
        } 
        // Remove one occurence from eventDistributions
        eventDistributions[selectedEvent] -= 1;
        if (eventDistributions[selectedEvent] <= 0) {
            remainingEventIDs.splice(remainingEventIDs.indexOf(selectedEvent), 1)
        }
    } while (remainingEventIDs.length > 0 && contestants.length > 1);
    var finished = false;
    if (contestants.length == 1) {
        pushToLog(`🏆\t| <b class="winner">${contestants[0].name}</b> wins! <span class=smalltxt>(Hover to reveal)</span>`);
        finished = true;
    }
    return {
        "remaining" : contestants,
        "dead" : dead,
        "finished" : finished
    };

}

function parseList(list, separator) {
    if (list.length == 1) return list[0].name;
    if (list.length == 2) return `${list[0].name} & ${list[1].name}`;

    var s = "";
    for (var i = 0; i < list.length - 1; i++) {
        s += list[i].name + separator;
    }
    s += ('& ' + list[list.length - 1].name);
    return s;
}

async function generateOutput(competitors) {
    scroll(0,0)
    // Clears any messages
    storyListTag.innerHTML = "";
    const output = generateResults(competitors);
    resultsTag.innerHTML = `
    <h1 class="center">Results for day ${day}.</h1>
    <p>Remaining: ${parseList(output.remaining, ", ")}</p>
    <p>Dead: ${parseList(output.dead, ", ")}</p>
    `
    day++;
    // Check if game is finished.
    if (output.finished) {
        // Hide continue button, and show restart button.
        proceedButton.hidden = true;
        restartButton.hidden = false;
        return;
    }
    await new Promise(resolve => {
    // When the button is clicked, resolve the Promise
        proceedButton.onclick = () => {
            resolve();
        };
    });
    generateOutput(output.remaining);
}

function startSimulation() {
    console.log("Starting Game");
    startPage.hidden = true;
    gamePage.hidden = false;
    const competitors = generateCharacterObjs();
    generateOutput(competitors);
}

function endGame() {
    storyListTag.innerHTML = "";
    resultsTag.innerHTML = "";
    startPage.hidden = false;
    gamePage.hidden = true;
    proceedButton.hidden = false;
    restartButton.hidden = true;
    day = 1;
}

const startButton = document.getElementById("start");
startButton.onclick = startSimulation;
const restartButton = document.getElementById("restart");
restartButton.onclick = endGame;