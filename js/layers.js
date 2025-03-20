// Prestige Layer (Views -> Subscribers)
addLayer("p", {
    name: "prestige",
    symbol: "S",
    position: 0,
    startData() { 
        return {
            unlocked: true,
            points: new Decimal(0), // Points here are Subscribers
        }
    },
    color: "#ff0400",
    requires: new Decimal(10), 
    resource: "Subscribers", // Resource gained in this layer
    baseResource: "Views", // Resource this layer is based on
    baseAmount() { return player.points }, // Get current Views
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13)); // Prestige upgrade
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 0, 
    hotkeys: [
        { key: "p", description: "P: Reset for Subscribers", onPress(){ if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
    upgrades: {
        11: {
            title: "First Sub!",
            description: "Double your views gain",
            cost: new Decimal(1),
        },
        12: {
            title: "Woah, this is good!",
            description: "Subscribers watch all your videos",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5);
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id)) + "x"; 
            },
        },
        13: {
            title: "Better videos",
            description: "\"smash that subscribe button\"",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15);
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id)) + "x"; 
            },
        },
    },
});

// Money Layer (Subscribers -> Money)
addLayer("m", {
    name: "money",
    symbol: "$",
    position: 1, // Next to the prestige layer
    startData() { 
        return {
            unlocked: true,
            points: new Decimal(0), // Points here are Money
        }
    },
    color: "#00ff00",
    requires: new Decimal(100), // Require 100 Subscribers to gain Money
    resource: "Money", // Resource gained in this layer
    baseResource: "Subscribers", // Resource this layer is based on
    baseAmount() { return player["p"].points }, // Get current Subscribers
    type: "normal",
    exponent: 0.3, // Slower growth than Subscribers
    gainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade('m', 12)) mult = mult.times(1.5);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 1, 
    hotkeys: [
        { key: "m", description: "M: Reset for Money", onPress(){ if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
    upgrades: {
        11: {
            title: "Cash In!",
            description: "Boost money generation by 2x",
            cost: new Decimal(1),
            effect() {
                return new Decimal(2);
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id)) + "x"; 
            },
        },
        12: {
            title: "Big Investment",
            description: "Money boosts itself slightly",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.1);
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id)) + "x"; 
            },
        },
    },
});

// Sponsors Layer (Money -> Sponsors)
addLayer("s", {
    name: "sponsors",
    symbol: "S",
    position: 2, 
    startData() { 
        return {
            unlocked: true,
            points: new Decimal(0), // Points here are Sponsors
        }
    },
    color: "#FFD700",
    requires: new Decimal(500), // Require 500 Money to unlock Sponsors
    resource: "Sponsors", // Resource gained in this layer
    baseResource: "Money", // Resource this layer is based on
    baseAmount() { return player["m"].points }, // Get current Money
    type: "normal",
    exponent: 0.2, 
    gainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade('s', 12)) mult = mult.times(1.5);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 2, 
    hotkeys: [
        { key: "s", description: "S: Reset for Sponsors", onPress(){ if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return player["m"].points.gte(10) || player["s"].unlocked; },
    upgrades: {
        11: {
            title: "Brand Sponsorships",
            description: "Sponsors boost Money generation",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.3);
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id)) + "x"; 
            },
        },
        12: {
            title: "Big Sponsors",
            description: "Sponsors boost Subscribers",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.2);
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id)) + "x"; 
            },
        },
    },
});
