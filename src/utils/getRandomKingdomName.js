const kingdomTypes = [
    "kingdom",
    "sultinate",
    "caliphate",
    "empire",
    "republic",
    "emirate",
    "dynasty",
    "duchy",
    "dominion",
    "confederation",
    "tsardom",
    "theocracy"
]
const nouns = [
    "computer",
    "action",
    "sword",
    "eagle",
    "hill",
    "field",
    "infrastructure",
    "knight",
    "mountain",
    "composer",
]
const ofNouns = [
    "computers",
    "greatness",
    "action",
    "swords",
    "eagles",
    "hills",
    "fields",
    "infrastructure",
    "knights",
    "mountains",
    "composers",
]
const adjectives = [
    "golden",
    "flowering",
    "quick",
    "eternal",
    "calm",
    "humble",
    "green",
    "good",
    "swift",
    "furious",
]

export default function getRandomKingdomName(){
    const type = kingdomTypes[Math.floor(Math.random() * kingdomTypes.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    const randomWordOrder = Math.floor(Math.random()*2)
    if(randomWordOrder === 0){
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${adjective} ${noun} ${type}`.trim();
    }
    if(randomWordOrder === 1){
        const noun = ofNouns[Math.floor(Math.random() * ofNouns.length)];
        return `${type} of ${adjective} ${noun}`.trim();
    }
}