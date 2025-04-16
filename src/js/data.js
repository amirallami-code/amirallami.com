const techStackData = {
    categories: [
        {
            name: "Frontend Development",
            skills: [
                {
                    name: "HTML",
                    fullName: "Hyper Text Markup Language (HTML)",
                    icon: "https://skillicons.dev/icons?i=html",
                    proficiency: "Advanced",
                    proficiencyColor: "green",
                    features: [
                        "Semantic HTML5",
                        "Accessibility (ARIA)",
                        "SEO Optimization"
                    ],
                    projects: [
                        {
                            name: "Personal Portfolio Website",
                            url: "https://github.com/amirallami-code/amirallami.com"
                        },
                        {
                            name: "Language Translator",
                            url: "https://github.com/amirallami-code/language-translator"
                        }
                    ]
                },
                {
                    name: "CSS",
                    fullName: "Cascading Style Sheets (CSS)",
                    icon: "https://skillicons.dev/icons?i=css",
                    proficiency: "Advanced",
                    proficiencyColor: "green",
                    features: [
                        "Flexbox & Grid",
                        "Responsive Design",
                        "Animations"
                    ],
                    projects: [
                        {
                            name: "Responsive Portfolio Layout",
                            url: "https://github.com/amirallami-code/amirallami.com"
                        },
                        {
                            name: "Rock Paper Scissors Game",
                            url: "https://github.com/amirallami-code/rock-paper-scissors-game"
                        }
                    ]
                },
                {
                    name: "JavaScript",
                    fullName: "JavaScript",
                    icon: "https://skillicons.dev/icons?i=js",
                    proficiency: "Intermediate",
                    proficiencyColor: "blue",
                    features: [
                        "DOM Manipulation",
                        "ES6 Features",
                        "Async/Await"
                    ],
                    projects: [
                        {
                            name: "Personal Portfolio Website",
                            url: "https://github.com/amirallami-code/amirallami.com"
                        },
                        {
                            name: "Language Translator App",
                            url: "https://github.com/amirallami-code/language-translator"
                        },
                        {
                            name: "Binary Search Algorithm",
                            url: "https://github.com/amirallami-code/binary-search-algorithm"
                        },
                        {
                            name: "Leetcode Problems",
                            url: "https://leetcode.com/u/amirallami-code/"
                        },
                    ]
                },
                {
                    name: "React",
                    fullName: "ReactJS",
                    icon: "https://skillicons.dev/icons?i=react",
                    proficiency: "Beginner",
                    proficiencyColor: "yellow",
                    features: [
                        "Component-Based Architecture",
                        "Virtual DOM",
                        "React Hooks"
                    ],
                    projects: [
                    ]
                },
                {
                    name: "Tailwind CSS",
                    fullName: "Tailwind",
                    icon: "https://skillicons.dev/icons?i=tailwind",
                    proficiency: "Intermediate",
                    proficiencyColor: "blue",
                    features: [
                        "Utility-First CSS",
                        "Responsive Design",
                        "Custom Themes"
                    ],
                    projects: [
                        {
                            name: "My Portfolio Website",
                            url: "https://github.com/amirallami-code/amirallami.com"
                        },
                    ]
                },
            ]
        },
        {
            name: "Version Control & Collaboration",
            skills: [
                {
                    name: "Git",
                    fullName: "Git",
                    icon: "https://skillicons.dev/icons?i=git",
                    proficiency: "Beginner",
                    proficiencyColor: "yellow",
                    features: [
                        "Branching & Merging",
                        "Version Control",
                        "Collaboration"
                    ],
                    projects: [
                        {
                            name: "License Guide",
                            url: "https://github.com/amirallami-code/license-guide"
                        },
                        {
                            name: "Personal Portfolio Website",
                            url: "https://github.com/amirallami-code/amirallami.com"
                        },
                    ]
                },
                {
                    name: "Github",
                    fullName: "Github",
                    icon: "https://skillicons.dev/icons?i=github",
                    proficiency: "Intermediate",
                    proficiencyColor: "blue",
                    features: [
                        "Repository Management",
                        "Pull Requests",
                        "CI/CD Integration"
                    ],
                    projects: [
                        {
                            name: "My Github Account",
                            url: "https://github.com/amirallami-code/"
                        },
                    ]
                },
            ]
        }
    ]
};

const certificatesData = [
    {
        title: "Introduction to Front-end Development",
        provider: "Meta",
        platform: "Coursera",
        earnedOn: "Jul 7, 2024",
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/HF7Y6KJLLGK9",
        downloadPath: "images/certificates/pdf/cer-IFD.pdf",
        imagePath: "images/certificates/png/cer-IFD.jpg",
        imageAlt: "Coursera Certificate - Introduction to Front-end Development",
        providerLogo: "images/certificates/provider/meta-logo.webp"
    },
    {
        title: "Programming with JavaScript",
        provider: "Meta",
        platform: "Coursera",
        earnedOn: "Jan 25, 2025",
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/C8G31UOCMO46",
        downloadPath: "images/certificates/pdf/cer-JS.pdf",
        imagePath: "images/certificates/png/cer-js.jpg",
        imageAlt: "Coursera Certificate - Programming with JavaScript",
        providerLogo: "images/certificates/provider/meta-logo.webp"
    },
    {
        title: "Version Control",
        provider: "Meta",
        platform: "Coursera",
        earnedOn: "Mar 3, 2025",
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/0XEJ04PVV5ZW",
        downloadPath: "images/certificates/pdf/cer-VC.pdf",
        imagePath: "images/certificates/png/cer-VC.jpg",
        imageAlt: "Coursera Certificate - Version Control",
        providerLogo: "images/certificates/provider/meta-logo.webp"
    },
];

// Export the data for use in other files
export { techStackData, certificatesData };