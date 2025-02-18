// Mobile Menu logic (Open/Close)
const menuIcon = document.getElementById('menu-icon')
const closeIcon = document.getElementById('x-icon')

function toggleMenu() {
    const menu = document.getElementById("navbar-sticky");
    menu.classList.toggle("hidden");
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");

}

// Mobile Menu Logic (Sections)
const sections = document.querySelectorAll('section');
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

const updateActiveMenuItem = () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    menuItems.forEach(item => {
        const href = item.getAttribute('href').substring(1);
        if (href === currentSection) {
            menuItems.forEach(item => item.classList.remove('active'));
            item.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveMenuItem);
updateActiveMenuItem();


// Typewriter Logic
document.addEventListener('DOMContentLoaded', function () {
    // Get the h1 element
    const titleElement = document.querySelector('.title');

    // Store the base text and the alternating professions
    const baseText = "Hi, My name is Amir. I'm a ";
    const professions = ["Front-end Developer", "Graphic Designer"];
    let currentProfessionIndex = 0;

    // Set the initial text
    titleElement.textContent = baseText;

    // Variables to control the typing effect
    let isTyping = true;
    let charIndex = 0;
    let currentText = professions[currentProfessionIndex];

    function typeWriter() {
        if (isTyping) {
            // Typing forward
            if (charIndex < currentText.length) {
                titleElement.textContent = baseText + currentText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeWriter, 100); // Typing speed
            } else {
                // Pause at the end of typing before starting to erase
                isTyping = false;
                setTimeout(typeWriter, 2000); // Pause before erasing
            }
        } else {
            // Erasing
            if (charIndex > 0) {
                titleElement.textContent = baseText + currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeWriter, 50); // Erasing speed (faster than typing)
            } else {
                // Switch to the next profession
                isTyping = true;
                currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
                currentText = professions[currentProfessionIndex];
                setTimeout(typeWriter, 500); // Pause before typing the next profession
            }
        }
    }

    // Start the typewriter effect
    typeWriter();
});