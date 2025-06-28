async function updateThemeForTab(tabId) {
  try {
    const tab = await browser.tabs.get(tabId);
    if (!tab || !tab.cookieStoreId) return;

    if (tab.cookieStoreId === "firefox-default") {
      // Non-container tab: reset theme to default
      await browser.theme.reset();
      return;
    }

    const containerMap = await getContainerColorMap();
    const colorHex = containerMap[tab.cookieStoreId];
    if (!colorHex) return;

    let themeColor;
    if (colorHex.toLowerCase() === "#000000") {
      themeColor = "#000000"; // solid black, no opacity
    } else {
      themeColor = hexToRgba(colorHex, 0.25); // 25% opacity for others
    }

    await browser.theme.update({
      colors: {
        frame: themeColor,
        tab_background_text: "#ffffff"
      }
    });
  } catch (e) {
    console.error("Theme update error:", e);
  }
}

// Update theme on tab activation
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  await updateThemeForTab(tabId);
});

// Update theme when a tab finishes loading
browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    await updateThemeForTab(tabId);
  }
});

// Update theme when switching windows
browser.windows.onFocusChanged.addListener(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (tab) await updateThemeForTab(tab.id);
});
