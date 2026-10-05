// data.js - Deterministic data generator for Operations Dashboard
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const categories = ["Electronics", "Home", "Garden", "Sports", "Office"];
const names = ["Desk Lamp", "Monitor Stand", "Trail Backpack", "Garden Hose", "Wireless Mouse"];

function generateOrders(count, seed = 42) {
  const rnd = mulberry32(seed);
  const rows = [];
  for (let i = 1; i <= count; i++) {
    rows.push({
      ID: i,
      Product: names[Math.floor(rnd() * names.length)] + " " + (100 + Math.floor(rnd() * 900)),
      Category: categories[Math.floor(rnd() * categories.length)],
      Price: Math.round((5 + rnd() * 495) * 100) / 100,
      Stock: Math.floor(rnd() * 500),
      Rating: Math.round((1 + rnd() * 4) * 10) / 10,
      Restocked: new Date(2026, Math.floor(rnd() * 12), 1 + Math.floor(rnd() * 28))
    });
  }
  return rows;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { mulberry32, generateOrders, categories, names };
}
