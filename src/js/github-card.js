// GitHub username to fetch data for
const githubUsername = 'amirallami-code';

// Function to fetch GitHub data and update the card
async function updateGitHubCard() {
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
        const userData = await userResponse.json();

        // Fetch repositories to calculate stars
        const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        const reposData = await reposResponse.json();

        // Calculate total stars
        const totalStars = reposData.reduce((total, repo) => total + repo.stargazers_count, 0);

        // Update the DOM elements
        document.querySelector('.github-self__titles a').textContent = userData.name || userData.login;
        document.querySelector('.github-self__titles a').href = userData.html_url;
        document.querySelector('.github-self__titles .text-gitGray').textContent = `${userData.login}`;
        document.querySelector('.github-self__desc').textContent = userData.bio || '';
        document.querySelector('.github-self__repos').textContent = userData.public_repos;
        document.querySelector('.github-self__followers').textContent = userData.followers;
        document.querySelector('.github-self__stars').textContent = totalStars;

    } catch (error) {
        console.error('Error fetching GitHub data:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateGitHubCard);