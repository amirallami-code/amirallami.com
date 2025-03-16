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

// Move styles to a separate function that runs immediately
function addAnimationStyles() {
    // Check if our styles are already added
    if (document.getElementById('animation-styles')) return;

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
      minHeight: 24px;
      display: inline-flex;
      align-items: center;
      position: relative;
    }
    
    /* Character animation */
    .char {
      display: inline-block;
      white-space: pre;
    }
    
    /* ZoomOut animation for characters */
    @keyframes charZoomOut {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.3);
      }
    }
    
    /* ZoomIn animation for typing characters */
    @keyframes charZoomIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .char-zoom-out {
      animation: charZoomOut 0.3s forwards;
      transform-origin: center;
    }
    
    .char-zoom-in {
      animation: charZoomIn 0.3s forwards;
      transform-origin: center;
    }
    
    @keyframes blink {
      50% { opacity: 0; }
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Add styles immediately to prevent FOUC (Flash of Unstyled Content)
addAnimationStyles();

// Main function wrapped in a way that prevents interference with other scripts
(function () {
    // Ensure the DOM is loaded before executing main code
    function initializeAnimation() {
        // Add horizontal scroll for mobile
        if (window.innerWidth <= 450) {
            const container = document.getElementById('code-content');
            if (container) container.scrollLeft = container.scrollWidth * 0.2;
        }

        // Extract initial role
        const titleElement = document.querySelector('.title-home');
        if (!titleElement) return; // Safety check

        const initialText = titleElement.innerHTML.trim();
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
        const selectionSpeed = 150;
        const pauseEnd = 1500;
        const pauseStart = 500;
        const charDeleteDelay = 70; // Delay between character deletions
        const charTypingDelay = 60; // Delay between character typing

        function updateCodeEditor(currentText, selectedPortion = '', cursorPosition = 'end') {
            const textElement = document.getElementById('role-code-text');
            const cursor = document.querySelector('.cursor-blink');
            if (!textElement || !cursor) return;

            const wrapper = cursor.parentElement;

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

        // Letter-by-letter deletion with zoomOut animation
        async function zoomOutLetterByLetter(text, roleText) {
            // Safety check
            if (!roleText) return '';

            // Convert text to array of characters with proper spacing
            roleText.innerHTML = '';

            // Create spans for each character including spaces
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char; // This preserves spaces due to white-space: pre in CSS
                roleText.appendChild(charSpan);
            }

            const charElements = Array.from(roleText.children);

            // Delete characters one by one with zoomOut animation
            for (let i = charElements.length - 1; i >= 0; i--) {
                try {
                    // If animate.css is available
                    if (typeof animate !== 'undefined' && window.animate) {
                        charElements[i].classList.add('animate__animated', 'animate__zoomOut');
                    } else {
                        // Fallback to our custom animation
                        charElements[i].classList.add('char-zoom-out');
                    }

                    await new Promise(resolve => setTimeout(resolve, charDeleteDelay));
                    if (charElements[i].parentNode === roleText) {
                        charElements[i].remove();
                    }
                } catch (e) {
                    console.error('Animation error:', e);
                    // Continue with next element if there's an error
                }
            }

            return '';
        }

        // Enhanced typing with zoom in effect
        async function typeWithZoomEffect(roleText, currentRole) {
            // Safety check
            if (!roleText) return '';

            let typedText = '';
            roleText.innerHTML = '';

            // Type characters one by one with zoom in animation
            for (let i = 0; i < currentRole.length; i++) {
                try {
                    const char = currentRole[i];
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.textContent = char;

                    // Add zoom in animation
                    if (typeof animate !== 'undefined' && window.animate) {
                        charSpan.classList.add('animate__animated', 'animate__zoomIn');
                    } else {
                        charSpan.classList.add('char-zoom-in');
                    }

                    roleText.appendChild(charSpan);
                    typedText += char;

                    // Update code editor as well
                    updateCodeEditor(typedText);

                    await new Promise(resolve => setTimeout(resolve, charTypingDelay));
                } catch (e) {
                    console.error('Animation error:', e);
                    // Continue with next character if there's an error
                }
            }

            return typedText;
        }

        async function typeWriter() {
            const roleText = document.getElementById('role-text');
            if (!roleText) return; // Safety check

            const currentRole = roles[roleIndex];

            if (!isDeleting && charIndex === 0) {
                // Start typing with zoom effect
                text = await typeWithZoomEffect(roleText, currentRole);
                charIndex = currentRole.length;
                setTimeout(typeWriter, typingSpeed);
            }
            else if (!isDeleting && charIndex === currentRole.length) {
                // Pause before deleting
                isDeleting = true;

                setTimeout(async () => {
                    try {
                        // Animate selection word by word
                        await selectTextWordByWord(text);

                        // Quick delete for code editor
                        updateCodeEditor('');

                        // ZoomOut deletion for title
                        text = await zoomOutLetterByLetter(text, roleText);
                        charIndex = 0;
                        isDeleting = false;
                        roleIndex = (roleIndex + 1) % roles.length;
                        setTimeout(typeWriter, pauseStart);
                    } catch (e) {
                        console.error('Animation cycle error:', e);
                        // Reset state and continue
                        charIndex = 0;
                        isDeleting = false;
                        roleIndex = (roleIndex + 1) % roles.length;
                        setTimeout(typeWriter, pauseStart);
                    }
                }, pauseEnd);
            }
            else if (!isDeleting) {
                // Reset for next word
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeWriter, pauseStart);
            }
        }

        // Initialize WOW.js if available
        if (typeof WOW !== 'undefined') {
            try {
                new WOW().init();
            } catch (e) {
                console.error('WOW.js initialization error:', e);
            }
        }

        // Start the animation
        setTimeout(typeWriter, pauseStart);
    }

    // Run when DOM is ready or immediately if already loaded
    if (document.readyState === "loading") {
        document.addEventListener('DOMContentLoaded', initializeAnimation);
    } else {
        initializeAnimation();
    }
})();