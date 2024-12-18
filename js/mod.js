let modInfo = {
    name: "The YouTube Tree",
    author: "Henry Wemmie",
    pointsName: "Views", // Keep this focused on views
    modFiles: ["layers.js", "tree.js"],

    discordName: "",
    discordLink: "",
    initialStartPoints: new Decimal(10), // Used for views/points
    offlineLimit: 1, // In hours
}

let VERSION = {
    num: "0.0",
    name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v0.0</h3><br>
        - Added things.<br>
        - Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints() {
    return true
}

// Separate views/points generation
function getPointGen() {
    if (!canGenPoints())
        return new Decimal(0);
    let gain = new Decimal(1);
    if (hasUpgrade('p', 11)) gain = gain.times(2);
    if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12));
    return gain;
}

// Separate money generation (if applicable)
function getMoneyGen() {
    let gain = new Decimal(0); // Money generation logic goes here
    if (hasUpgrade('m', 11)) gain = gain.add(1); // Example: +1 money/sec with upgrade
    return gain;
}

// Add non-layer related variables that should go into "player"
function addedPlayerData() {
    return {
        money: new Decimal(0), // Add starting money separately
    };
}

// Display extra things at the top of the page
var displayThings = [
    "You are gaining " + format(getPointGen()) + " views per second.",
    "You are gaining " + format(getMoneyGen()) + " money per second.", // Separate display for money
];

// Determines when the game "ends"
function isEndgame() {
    return player.points.gte(new Decimal("e280000000")); // Endgame only considers views/points for now
}

// Background styles
var backgroundStyle = {}

// Max tick length
function maxTickLength() {
    return(3600 / speedMultiplier) // Default is 1 hour, adjust based on multiplier
}

// Fix saves for old versions
function fixOldSave(oldVersion) {
    // This function is kept empty, as originally intended.
    // You can add future save fixes here if needed.
}

// Add a speed multiplier for the game
var speedMultiplier = 1;

// Modify maxTickLength to be controlled by speedMultiplier
function maxTickLength() {
    return 3600 / speedMultiplier; // Default is 1 hour, adjust based on multiplier
}

// Add a dev tools button to speed up the game
function addDevTools() {
    let button = document.createElement("button");
    button.innerHTML = "Speed Up Game";
    button.style.position = "absolute";
    button.style.top = "10px";
    button.style.left = "10px";
    button.style.padding = "10px";
    button.style.fontSize = "16px";
    button.onclick = function() {
        speedMultiplier *= 2; // Double the speed each time the button is clicked
        console.log("Game speed is now: " + speedMultiplier + "x");
    };
    document.body.appendChild(button);
}

// Add hotkeys to control speed (e.g., "S" to speed up)
function setupHotkeys() {
    hotkeys.push({
        key: "S",
        description: "Speed up the game",
        onPress() {
            speedMultiplier *= 2; // Double the speed on pressing "S"
            console.log("Game speed is now: " + speedMultiplier + "x");
        }
    });
}

// Initialize dev tools when the game starts
addDevTools();
setupHotkeys();
