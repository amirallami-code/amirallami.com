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


// Add required styles to CSS
const styles = `
.cursor-blink {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #526fff;
  margin-left: 1px;
  animation: blink 1s step-end infinite;
  position: relative;
  justifyContent: center;
  top: 2px;
}
html.dark .cursor-blink {
    background-color: #528bff;
}

.selected-text {
  background-color: #e5e5e6;
  padding-left: 2px;
  padding-right: 2px;
}

html.dark .selected-text {
background-color: #3e4451;
}

.code-wrapper {
  minHeight: 24px
  display: inline-flex;
  align-items: center;
  position: relative;
}

@keyframes blink {
  50% { opacity: 0; }
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', function () {
    // Add horizontal scroll for mobile
    if (window.innerWidth <= 450) {
        const container = document.getElementById('code-content');
        container.scrollLeft = container.scrollWidth * 0.2;
    }

    // Extract initial role
    const titleElement = document.querySelector('.title-home');
    const initialText = titleElement.textContent.trim();
    const rolePart = initialText.split("I'm a ")[1] || "Front-end developer";

    const roles = [rolePart, "Graphic Designer", "UI/UX Designer"];

    // Create span for title
    const titleSpan = document.createElement('span');
    titleSpan.id = 'role-text';

    // Replace title text
    titleElement.innerHTML = initialText.split("I'm a ")[0] + "I'm a ";
    titleElement.appendChild(titleSpan);

    // Create wrapper for code text and cursor
    const codeWrapper = document.createElement('span');
    codeWrapper.className = 'code-wrapper';

    // Setup code text element
    const roleCodeText = document.getElementById('role-code-text');
    if (roleCodeText) {
        // Replace the original element with the wrapper
        roleCodeText.parentNode.replaceChild(codeWrapper, roleCodeText);

        // Create text element
        const textElement = document.createElement('span');
        textElement.id = 'role-code-text';

        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';

        // Add elements to wrapper
        codeWrapper.appendChild(textElement);
        codeWrapper.appendChild(cursor);
    }

    let roleIndex = 0;
    let isDeleting = false;
    let text = '';
    let charIndex = 0;
    const typingSpeed = 100;
    const quickDeleteSpeed = 30;
    const selectionSpeed = 150;
    const pauseEnd = 1500;
    const pauseStart = 500;

    function updateCodeEditor(currentText, selectedPortion = '', cursorPosition = 'end') {
        const textElement = document.getElementById('role-code-text');
        const cursor = document.querySelector('.cursor-blink');
        const wrapper = cursor.parentElement;

        if (!textElement || !cursor) return;

        if (selectedPortion) {
            const unselectedText = currentText.slice(0, -selectedPortion.length);
            // Create elements
            const unselectedSpan = document.createElement('span');
            unselectedSpan.textContent = unselectedText;
            const selectedSpan = document.createElement('span');
            selectedSpan.className = 'selected-text';
            selectedSpan.textContent = selectedPortion;

            // Clear and rebuild content
            textElement.innerHTML = '';
            if (unselectedText) {
                textElement.appendChild(unselectedSpan);
            }
            textElement.appendChild(selectedSpan);

            // Move cursor
            if (cursorPosition === 'beforeSelection') {
                wrapper.insertBefore(cursor, selectedSpan.nextSibling);
            }
        } else {
            textElement.textContent = currentText;
            wrapper.appendChild(cursor);
        }
    }

    async function selectTextWordByWord(text) {
        const words = text.split(' ').filter(word => word.length > 0);
        let selectedPortion = '';

        // Select from right to left
        for (let i = words.length - 1; i >= 0; i--) {
            const currentWords = words.slice(i).join(' ');
            selectedPortion = currentWords;
            updateCodeEditor(text, selectedPortion, 'beforeSelection');
            await new Promise(resolve => setTimeout(resolve, selectionSpeed));
        }
    }

    async function quickDelete(text, roleText) {
        let currentText = text;
        while (currentText.length > 0) {
            currentText = currentText.slice(0, -1);
            roleText.textContent = currentText;
            await new Promise(resolve => setTimeout(resolve, quickDeleteSpeed));
        }
        return '';
    }

    async function typeWriter() {
        const roleText = document.getElementById('role-text');
        const currentRole = roles[roleIndex];

        if (!roleText) return;

        if (!isDeleting && charIndex < currentRole.length) {
            // Typing effect
            text += currentRole.charAt(charIndex);
            roleText.textContent = text;
            updateCodeEditor(text);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
        else if (!isDeleting && charIndex === currentRole.length) {
            // Pause before deleting
            isDeleting = true;

            setTimeout(async () => {
                // Animate selection word by word
                await selectTextWordByWord(text);

                // Quick delete for code editor
                updateCodeEditor('');

                // Character by character delete for title
                text = await quickDelete(text, roleText);
                charIndex = 0;
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeWriter, pauseStart);
            }, pauseEnd);
        }
        else if (!isDeleting) {
            // Reset for next word
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeWriter, pauseStart);
        }
    }

    // Start the animation
    setTimeout(typeWriter, pauseStart);
});