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
        toggleMenu()
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

    // Add horizontal scroll to the code editor for devices with an innerWidth under 450px.
    if (window.innerWidth <= 450) {
        const container = document.getElementById('code-content');
        container.scrollLeft = container.scrollWidth * 0.15;
    }

    // Extract the initial role from the title
    const titleElement = document.querySelector('.title');
    const initialText = titleElement.textContent.trim();
    const rolePart = initialText.split("I'm a ")[1] || "Front-end developer";

    // Define the roles to cycle through, starting with the current one
    const roles = [
        rolePart,
        "Graphic Designer"
    ];

    // Find the span that will change in the title
    const titleSpan = document.createElement('span');
    titleSpan.id = 'role-text';

    // Replace the text after "I'm a " with the span
    titleElement.innerHTML = initialText.split("I'm a ")[0] + "I'm a ";
    titleElement.appendChild(titleSpan);

    let roleIndex = 0;
    let isDeleting = false;
    let text = '';
    let charIndex = 0;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseEnd = 1500;
    let pauseStart = 500;

    function typeWriter() {
        const roleText = document.getElementById('role-text');
        const roleCodeText = document.getElementById('role-code-text');
        const currentRole = roles[roleIndex];

        if (!roleText || !roleCodeText) return;

        // Typing effect
        if (!isDeleting && charIndex < currentRole.length) {
            text += currentRole.charAt(charIndex);
            roleText.textContent = text;
            roleCodeText.textContent = text;
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
        // Pause at the end before deleting
        else if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseEnd);
        }
        // Deleting effect
        else if (isDeleting && charIndex > 0) {
            charIndex--;
            text = currentRole.substring(0, charIndex);
            roleText.textContent = text;
            roleCodeText.textContent = text;
            setTimeout(typeWriter, deletingSpeed);
        }
        // Move to next role
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeWriter, pauseStart);
        }
    }

    // Start the typewriter effect
    setTimeout(typeWriter, pauseStart);
});