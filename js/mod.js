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
    num: "0.1",
    name: "Sponsors & Fixes",
}

let changelog = `<h1>Changelog:</h1><br>
    <h3>v0.1</h3><br>
        - Fixed money per second not working.<br>
        - Made Sponsors layer appear when you reach 10 money.<br>
        - Added debugging display for money.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"] // Don't call these every tick

function getStartPoints() {
    return new Decimal(modInfo.initialStartPoints);
}

function canGenPoints() {
    return true;
}

// Function to calculate the point generation per second
function getPointGen() {
    if (!canGenPoints()) return new Decimal(0);
    let gain = new Decimal(1);
    if (hasUpgrade('p', 11)) gain = gain.times(2);
    if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12));
    if (hasUpgrade('m', 13)) gain = gain.times(2);
    return gain;
}

// Function to calculate the money generation
function getMoneyGen() {
    let gain = new Decimal(0);
    if (hasUpgrade('m', 11)) gain = gain.add(1);
    if (hasUpgrade('m', 12)) gain = gain.times(upgradeEffect('m', 12));
    return gain;
}

// Add non-layer related variables that should go into "player"
function addedPlayerData() {
    return {
        money: new Decimal(0),
    };
}

// Display extra things at the top of the page
var displayThings = [
    "You are gaining " + format(getPointGen()) + " views per second.",
    "You have " + format(player.m.points) + " money.",
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

// Fix saves for old versions
function fixOldSave(oldVersion) {
    // Add save fixes here if necessary
}
