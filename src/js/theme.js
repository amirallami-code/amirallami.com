const toggleButton = document.getElementById('theme-switch');
const toggleCheckbox = document.getElementById('toggle');
const htmlElement = document.documentElement;

// Function to set the theme
const setTheme = (theme) => {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        toggleCheckbox.checked = true; // Ensure the checkbox reflects the theme
    } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        toggleCheckbox.checked = false; // Ensure the checkbox reflects the theme
    }
};

// Function to toggle the theme
const toggleTheme = () => {
    if (htmlElement.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
};

// Check user's browser theme preference
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Apply the theme
if (savedTheme) {
    setTheme(savedTheme); // Use saved theme from localStorage
} else {
    setTheme(userPrefersDark ? 'dark' : 'light'); // Use browser preference if no saved theme
}

// Event listener for the toggle button
toggleButton.addEventListener('click', (event) => {
    // Prevent the default behavior of the label (if any)
    event.preventDefault();
    toggleTheme();
});

toggleCheckbox.addEventListener('change', () => {
    toggleTheme();
});