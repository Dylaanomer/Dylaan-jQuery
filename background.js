chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pauseInteractions
    });
});

function pauseInteractions() {
    document.body.style.pointerEvents = "none"; // Disable interactions
    setTimeout(() => {
        document.body.style.pointerEvents = "auto"; // Re-enable interactions
    }, 180000); // 3 minutes
}
