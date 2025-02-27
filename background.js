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


//SOFT FREEZE

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

//HARD FREEZE

setTimeout(() => {
    console.log('Hard freezing the page for 3 minutes...');
    
    const stopTime = Date.now() + 180000; // 3 minutes
    while (Date.now() < stopTime) {} // Infinite loop until time passes

    console.log('Resuming page...');
}, 1000);

//DEBUGGER

setTimeout(() => {
    console.log("Pausing JavaScript execution for 3 minutes...");
    debugger; // Pauses execution
    setTimeout(() => {
        console.log("Resuming JavaScript execution...");
    }, 180000); // 3 minutes
}, 1000);

//STOP DIVI SLIDER

setTimeout(() => {
    console.log("Stopping Divi Slider autoplay...");
    
    let slider = document.querySelector('.et_pb_slider_0');
    
    if (slider) {
        let clone = slider.cloneNode(true);
        slider.parentNode.replaceChild(clone, slider); // Replaces it with a static version
        console.log("Slider frozen");
        
        setTimeout(() => {
            console.log("Resuming slider...");
            location.reload(); // Reloads the page after 3 minutes to resume autoplay
        }, 180000); // 3-minute delay
    }
}, 1000);
