const cc = document.getElementById("character-creator");
const addCharButton = document.getElementById("add-char");
const removeCharButton = document.getElementById("remove-char");
var characterCount = 0; //This variable should NEVER go below zero.
const emptyCharacterNames = [
    "Anonymous", "Nameless", "Unnamed", "Unknown",
    "Mr. E", "A Mysterious Competitor", "Someone", "Unspecified",
    "Anon", "Incognito", "Unidentified", "Innominate",
    "Jane Doe", "John Doe", "???", "Unavowed"
];

function addCharacter() {
    if (characterCount >= 99) {
        console.log("Theres no way you need more than 100 characters.")
        return
    };
    characterCount += 1
    const newDiv = document.createElement("div");
    newDiv.id = `character-entry-${characterCount}`
    newDiv.classList = "character-entry"
    newDiv.innerHTML = `
    <label for="char-name-${characterCount}">Name:</label>
    <input type="text" id="char-name-${characterCount}"></input>
    `
    cc.appendChild(newDiv);
    console.log("A new character is approaching!")
}

function removeCharacter() {
    if (characterCount <= 2) {
        console.log("You can't have zero characters!!!")    
        return;
    }
    const oldDiv = document.getElementById(`character-entry-${characterCount}`);
    cc.removeChild(oldDiv);
    characterCount -= 1
    console.log("Killed...")
}

function getCharacters() {
    const charr = [];
    for (var i = 1; i <= characterCount; i++) {
        const charName = document.getElementById(`char-name-${i}`).value
        if (charName.length === 0) {// Checks for an empty string 
            var newName = emptyCharacterNames[Math.floor(Math.random() * emptyCharacterNames.length)]
            if (charr.includes(newName)) 
                newName = `${newName} (${i})`;
            //console.log(`Renaming empty-named character ${i} to ${newName}`);
            charr.push(newName);
        }
        else charr.push(charName);
    }
    console.log(charr);
    return charr;
}

addCharButton.onclick = addCharacter 
removeCharButton.onclick = removeCharacter

addCharacter()
addCharacter()

export {getCharacters}