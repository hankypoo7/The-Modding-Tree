// Mod Information
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

// Version Info
let VERSION = {
    num: "0.0",
    name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v0.0</h3><br>
        - Added things.<br>
        - Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"] // Don't call these every tick

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints() {
    return true
}

// Function to calculate the point generation per second
function getPointGen() {
    if (!canGenPoints())
        return new Decimal(0);
    let gain = new Decimal(1);
    if (hasUpgrade('p', 11)) gain = gain.times(2);
    if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12));
    return gain;
}

// Function to calculate the money generation (if applicable)
function getMoneyGen() {
    let gain = new Decimal(0); // Money generation logic
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
    "You are gaining " + format(getMoneyGen()) + " money per second.", // Display for money
];

// Determines when the game "ends"
function isEndgame() {
    return player.points.gte(new Decimal("e280000000")); // Endgame condition for views
}

// Background styles
var backgroundStyle = {}

// Max tick length
var speedMultiplier = 1; // Multiplier for speeding up the game

// Create Speed-Up button and display
let speedUpButton = document.createElement("button");
speedUpButton.innerText = "Speed Up Game!";
document.body.appendChild(speedUpButton);

let speedText = document.createElement("p");
speedText.innerText = "Speed Multiplier: " + speedMultiplier + "x";
document.body.appendChild(speedText);

// Button to speed up the game by modifying the tick length
speedUpButton.addEventListener("click", function() {
    speedMultiplier *= 2; // Double the speed each time
    speedText.innerText = "Speed Multiplier: " + speedMultiplier + "x"; // Update text with new speed
});

// Function to adjust the tick speed
function maxTickLength() {
    return 3600 / speedMultiplier; // Speed multiplier affects tick rate
}

// Function for fixing old saves if needed (keeping it empty for now)
function fixOldSave(oldVersion) {
    // You can add your save fix logic here if necessary
}
