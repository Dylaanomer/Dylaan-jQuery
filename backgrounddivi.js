chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pauseDiviSlider
    });
});

function pauseDiviSlider() {
    console.log("Pausing Divi Slider autoplay...");

    let slider = document.querySelector('.et_pb_slider_0'); // Target the Divi slider

    if (slider) {
        // Pause autoplay by removing animation classes
        slider.classList.add('et_slider_paused');
        let style = document.createElement("style");
        style.innerHTML = `
        .et_slider_paused .et_pb_slide {
        animation: none !important;
    }
`;
document.head.appendChild(style); // Custom class to mark pause
        slider.setAttribute('data-auto', 'false'); // Disable autoplay
        
        let slides = slider.querySelectorAll('.et_pb_slide');
        slides.forEach(slide => {
            slide.style.animationPlayState = 'paused'; // Stop animations
        });

        console.log("Divi slider autoplay paused");

        // Wait 3 minutes, then resume
        setTimeout(() => {
            console.log("Resuming Divi slider autoplay...");

            slider.classList.remove('et_slider_paused'); // Remove pause marker
            slider.setAttribute('data-auto', 'true'); // Enable autoplay

            slides.forEach(slide => {
                slide.style.animationPlayState = 'running'; // Resume animations
            });

            // Try reinitializing Divi slider if needed
            if (typeof et_pb_reinit_waypoint_modules === "function") {
                et_pb_reinit_waypoint_modules();
                console.log("Divi slider reinitialized");
            }
        }, 180000); // 3 minutes delay
    } else {
        console.log("Divi Slider not found.");
    }
}

