const spamton = document.getElementById("spamton");
const db = document.getElementById("spamton-dialogue");
const introDialogue = [
    "HEY      EVERY      !! IT'S ME!!!",
    "EV3RY  BUDDY  'S FAVORITE [[Number 1 Rated Salesman1997]]",
    "SPAMT<br>* SPAMTON G. SPAMTON!!",
    "WEL1COME TO TH E [[Save big]] PAGE!!"
];
const dialogue = [
    "DEALS SO GOOD I'LL [$!$$] MYSELF",
    "SALES, GONE TO THE [[Moon]] [[Moon]]??",
    "WELL HAVE I GOT A [[Specil Deal]] FOR LONELY [[Hearts]] LIKE YOU!!",
    "[[Hyperlink Blocked]].",
    "HAEAHAEAHAEAHAEAH!!",
    "TRANSMIT KROMER",
    "Get Big and WIN [W1ld Pr1zes!]",
    "MEET LOCAL SINGLES STRAIGHT FROM [My] [rulerofdragons3.github.io/web-apps/sales-tracker]",
    "Deals so hot that we [IT BURNS]! !!",
    "DON'T WORRY KIDS I'M AN [HonestMan]",
    "JUST TAKE YOUR DAMN [claim now for free]!!<br>I know that's what [youu] are here for!!  !"
];
const bonusSprites = [
    "danceton.webp",
    "spamton laugh.webp",
    "danceton 2.gif"
];

var di = -introDialogue.length;
var hasSpecialSprite = false;

async function updateDialogue() {
    if (di < 0) {
        db.innerHTML = "* " + introDialogue[introDialogue.length + di];
    }
    else {
        db.innerHTML = "* " + dialogue[di];
        if (Math.floor(Math.random() * 4) === 0) {
            spamton.setAttribute("src", `/assets/spamton/${bonusSprites[Math.floor(Math.random() * bonusSprites.length)]}`);
            hasSpecialSprite = true;
        }
        else if (hasSpecialSprite) {
            hasSpecialSprite = false;
            spamton.setAttribute("src", `/assets/spamton/spamton.png`);
        }
    }
    di++
    if (di >= dialogue.length) di = 0;
    setTimeout(updateDialogue, 5000);
} 

updateDialogue()