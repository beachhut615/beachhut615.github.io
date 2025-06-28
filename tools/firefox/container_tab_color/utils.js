// Firefox's predefined container color names mapped to hex
const containerColorHexMap = {
  blue: "#4A90E2",
  turquoise: "#1ABC9C",
  green: "#2ECC71",
  yellow: "#F1C40F",
  orange: "#E67E22",
  red: "#E74C3C",
  pink: "#FF69B4",
  purple: "#9B59B6",
  toolbar: "#5E5E5E" // fallback/default
};

// Converts hex to rgba string with alpha (default 0.25)
function hexToRgba(hex, alpha = 0.25) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Get map of container cookieStoreId => hex color
async function getContainerColorMap() {
  const identities = await browser.contextualIdentities.query({});
  const map = {};
  for (const identity of identities) {
    const hex = containerColorHexMap[identity.color] || containerColorHexMap.toolbar;
    map[identity.cookieStoreId] = hex;
  }
  return map;
}
