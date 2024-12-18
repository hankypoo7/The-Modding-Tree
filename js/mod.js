let modInfo = {
    name: "The YouTube Tree",
    author: "Henry Wemmie",
    pointsName: "Views & Money",
    modFiles: ["layers.js", "tree.js"],

    discordName: "",
    discordLink: "",
    initialStartPoints: new Decimal(10),
    offlineLimit: 1,  // In hours
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

function getPointGen() {
    if (!canGenPoints())
        return new Decimal(0);
    let gain = new Decimal(1);
    if (hasUpgrade('p', 11)) gain = gain.times(2);
    if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12));
    if (hasUpgrade('m', 11)) gain = gain.times(upgradeEffect('m', 11)); // Money upgrades
    return gain;
}

function addedPlayerData() {
    return {
        money: new Decimal(0), // Starting money
    };
}

var displayThings = [
    "You are gaining " + format(getPointGen()) + " views per second.",
    "You have " + format(player["m"].points) + " money.", // Display money
];

function isEndgame() {
    return player.points.gte(new Decimal("e280000000")) && player["m"].points.gte(new Decimal(1e6));
}

var backgroundStyle = {}

function maxTickLength() {
    return(3600) // Default is 1 hour
}

function fixOldSave(oldVersion) {}
