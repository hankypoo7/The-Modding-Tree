// Mod Information 
let modInfo = {
    name: "The YouTube Tree",
    author: "Henry Wemmie",
    pointsName: "Views",
    modFiles: ["layers.js", "tree.js"],

    discordName: "",
    discordLink: "",
    initialStartPoints: new Decimal(10),
    offlineLimit: 1, // In hours
}

// Version Info
let VERSION = {
    num: "0.1",
    name: "Sponsors & Scaling",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v0.1</h3><br>
        - Added the Sponsors Layer!<br>
        - Money and Subscribers now interact dynamically.<br>
        - Improved balance and scaling for upgrades.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"] // Don't call these every tick

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints() {
    return true
}

// Function to calculate the point generation per second (Views)
function getPointGen() {
    if (!canGenPoints()) return new Decimal(0);
    let gain = new Decimal(1);
    
    if (hasUpgrade('p', 11)) gain = gain.times(2);
    if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12));
    if (hasUpgrade('m', 13)) gain = gain.times(2); // Money upgrade affects views
    if (hasUpgrade('s', 12)) gain = gain.times(upgradeEffect('s', 12)); // Sponsors boost Subscribers

    return gain;
}

// Function to calculate the money generation per second
function getMoneyGen() {
    let gain = new Decimal(0);
    
    if (hasUpgrade('m', 11)) gain = gain.add(1);
    if (hasUpgrade('m', 12)) gain = gain.times(upgradeEffect('m', 12));
    if (hasUpgrade('s', 11)) gain = gain.times(upgradeEffect('s', 11)); // Sponsors boost Money

    return gain;
}

// Add non-layer related variables that should go into "player"
function addedPlayerData() {
    return {
        money: new Decimal(0),
    };
}

// Dynamic display for stats at the top of the page
var displayThings = [
    () => "You are gaining " + format(getPointGen()) + " views per second.",
    () => "You are gaining " + format(getMoneyGen()) + " money per second.",
];

// Determines when the game "ends"
function isEndgame() {
    return player.points.gte(new Decimal("e280000000")); // Endgame condition for views
}

// Background styles
var backgroundStyle = {}

// Max tick length
function maxTickLength() {
    return 3600 // Default is 1 hour
}

// Fix saves for old versions (no changes needed)
function fixOldSave(oldVersion) {
    // You can add your save fix logic here if necessary
}
