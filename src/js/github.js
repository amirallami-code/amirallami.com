document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const githubLoader = document.getElementById('github-loader');
    const githubInformation = document.getElementById('github-information');
    const githubProfileImg = document.getElementById('github-profile-img');
    const githubName = document.querySelector('.github-self__name');
    const githubId = document.querySelector('.github-self__id');
    const githubDesc = document.querySelector('.github-self__desc');
    const githubRepos = document.querySelector('.github-self__repos');
    const githubFollowers = document.querySelector('.github-self__followers');
    const githubStars = document.querySelector('.github-self__stars');

    // GitHub username
    const username = 'amirallami-code';

    // Track API requests to avoid exceeding rate limit
    let requestCount = 0;
    const MAX_REQUESTS = 60; // GitHub API rate limit

    // Function to show loader and hide content
    function showLoader() {
        if (githubLoader) githubLoader.classList.remove('hidden');
        if (githubInformation) githubInformation.classList.add('hidden');
    }

    // Function to hide loader and show content
    function hideLoader() {
        if (githubLoader) {
            githubLoader.classList.add('flex')
            githubLoader.classList.add('hidden')
        };
        if (githubInformation) {
            githubInformation.classList.remove('hidden')
            githubInformation.classList.remove('flex')
        }
    }

    // Function to check if we're within rate limit
    function canMakeRequest() {
        // Check localStorage for when the rate limit counter was last reset
        const resetTime = localStorage.getItem('github_reset_time');
        const currentTime = Date.now();

        // If an hour has passed since the last reset, reset the counter
        if (!resetTime || currentTime - parseInt(resetTime) > 3600000) {
            requestCount = 0;
            localStorage.setItem('github_reset_time', currentTime.toString());
            localStorage.setItem('github_request_count', '0');
            return true;
        }

        // Get current request count from localStorage
        requestCount = parseInt(localStorage.getItem('github_request_count') || '0');

        return requestCount < MAX_REQUESTS;
    }

    // Function to update request count
    function incrementRequestCount() {
        requestCount++;
        localStorage.setItem('github_request_count', requestCount.toString());
    }

    // Function to fetch GitHub profile data
    async function fetchGitHubData() {
        showLoader();

        // Check if we can make API requests
        if (!canMakeRequest()) {
            // If we can't make requests, try to use cached data
            const cachedData = localStorage.getItem('github_user_data');
            const cachedStars = localStorage.getItem('github_stars_data');

            if (cachedData && cachedStars) {
                try {
                    updateUI(JSON.parse(cachedData), parseInt(cachedStars));
                } catch (e) {
                    console.error('Error parsing cached data:', e);
                    githubDesc.textContent = "Error loading cached GitHub data.";
                }
                hideLoader();
                return;
            }

            // If no cached data, show error message
            githubDesc.textContent = "API rate limit exceeded. Please try again later.";
            hideLoader();
            return;
        }

        try {
            // Fetch user data
            incrementRequestCount();
            const userResponse = await fetch(`https://api.github.com/users/${username}`);

            if (!userResponse.ok) {
                throw new Error(`GitHub API returned ${userResponse.status}: ${userResponse.statusText}`);
            }

            const userData = await userResponse.json();

            // Cache user data
            localStorage.setItem('github_user_data', JSON.stringify(userData));

            // Fetch repositories to calculate stars
            incrementRequestCount();
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);

            if (!reposResponse.ok) {
                throw new Error(`GitHub API returned ${reposResponse.status}: ${reposResponse.statusText}`);
            }

            const reposData = await reposResponse.json();

            // Calculate total stars - make sure reposData is an array
            let stars = 0;
            if (Array.isArray(reposData)) {
                stars = reposData.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
            }

            // Cache stars data
            localStorage.setItem('github_stars_data', stars.toString());

            // Update UI with fetched data
            updateUI(userData, stars);
        } catch (error) {
            console.error('Error fetching GitHub data:', error);

            // Try to use cached data on error
            const cachedData = localStorage.getItem('github_user_data');
            const cachedStars = localStorage.getItem('github_stars_data');

            if (cachedData && cachedStars) {
                try {
                    updateUI(JSON.parse(cachedData), parseInt(cachedStars));
                    githubDesc.textContent = userData.bio || "Using cached data. API rate limit may be exceeded.";
                } catch (e) {
                    githubDesc.textContent = "Error loading GitHub data. Please try again later.";
                }
            } else {
                githubDesc.textContent = "Error loading GitHub data. Please try again later.";
            }
        } finally {
            hideLoader();
        }
    }

    // Function to update UI with GitHub data
    function updateUI(userData, stars) {
        // Update profile image if it exists
        if (userData.avatar_url) {
            githubProfileImg.src = userData.avatar_url;
            githubProfileImg.classList.remove('hidden')
        }

        // Update Name and ID
        githubName.textContent = userData.name || "Amirhossein Allami";
        githubId.textContent = `${userData.login || username} · he/him`;

        // Update bio/description
        githubDesc.textContent = userData.bio || "No bio available";

        // Update stats
        githubRepos.textContent = `${userData.public_repos} repositories`;
        githubFollowers.textContent = `${userData.followers} followers`;
        githubStars.textContent = `${stars} stars earned`;
    }

    // Fetch GitHub data when page loads
    fetchGitHubData();
});