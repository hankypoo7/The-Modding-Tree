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

// Add a dev tools button to speed up the game (integrated into Version Control tab)
function addDevTools() {
    // Create version control panel with speed multiplier control
    let versionControlDiv = document.createElement("div");
    versionControlDiv.style.position = "fixed";
    versionControlDiv.style.top = "10px";
    versionControlDiv.style.left = "10px";
    versionControlDiv.style.padding = "10px";
    versionControlDiv.style.fontSize = "16px";
    versionControlDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    versionControlDiv.style.color = "white";
    versionControlDiv.style.zIndex = "1000";
    versionControlDiv.innerHTML = `
        <h3>Version Control</h3>
        <p>Speed Multiplier: <span id="speedDisplay">1x</span></p>
        <button id="speedUpButton">Speed Up Game</button>
    `;
    
    document.body.appendChild(versionControlDiv);
    
    // Button functionality
    document.getElementById("speedUpButton").onclick = function() {
        speedMultiplier *= 2; // Double the speed each time the button is clicked
        document.getElementById("speedDisplay").innerText = speedMultiplier + "x"; // Update display
        console.log("Game speed is now: " + speedMultiplier + "x");
    };
}

// Add hotkeys to control speed (e.g., "S" to speed up)
function setupHotkeys() {
    hotkeys.push({
        key: "S",
        description: "Speed up the game",
        onPress() {
            speedMultiplier *= 2; // Double the speed on pressing "S"
            document.getElementById("speedDisplay").innerText = speedMultiplier + "x"; // Update display
            console.log("Game speed is now: " + speedMultiplier + "x");
        }
    });
}

// Initialize dev tools when the game starts
addDevTools();
setupHotkeys();
