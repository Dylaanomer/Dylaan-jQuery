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


setTimeout(() => {
    console.log('Freezing the page for 3 minutes...');
    
    let startTime = performance.now();
    
    function freezeFrame(timestamp) {
        if (timestamp - startTime < 180000) { // 3 minutes
            requestAnimationFrame(freezeFrame);
        } else {
            console.log('Resuming page execution...');
        }
    }

    requestAnimationFrame(freezeFrame);
}, 1000); // Starts freezing after 1 second
