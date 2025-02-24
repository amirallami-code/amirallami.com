document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');

    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            // First make it transparent
            loadingScreen.classList.add('opacity-0');

            // Then remove it from DOM after transition completes
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1000); // This should match the duration in the transition class (1000ms)
        }, 200); // Initial delay before starting the fade
    });
});

// Enhanced show/hide functions with transitions
function showLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.remove('hidden');
    // Force a reflow
    loadingScreen.offsetHeight;
    loadingScreen.classList.remove('opacity-0');
}

function hideLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('opacity-0');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
}