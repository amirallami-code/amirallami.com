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