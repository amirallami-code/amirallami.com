"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookMarked, Star } from 'lucide-react';
import dynamic from 'next/dynamic';

const GithubGlobeContainer = dynamic(() => import('./ui/github-globe'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-[400px] lg:h-[500px]">
            <div className="animate-pulse text-gray-500">Loading Globe...</div>
        </div>
    )
});

interface GitHubUser {
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    bio: string | null;
    followers: number;
    public_repos: number;
}

interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    private: boolean;
    fork: boolean;
}

interface GitHubData {
    profile: GitHubUser;
    repositories: GitHubRepo[];
    totalStars: number;
    totalRepos: number;
}

const MyGithub: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [githubData, setGithubData] = useState<GitHubData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const GITHUB_USERNAME = "amirallami-code";

    useEffect(() => {
        const fetchGithubData = async (): Promise<void> => {
            try {
                setIsLoading(true);

                // Fetch user profile
                const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                const userData: GitHubUser = await userResponse.json();

                // Fetch repositories
                const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&direction=desc&per_page=100`);
                if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
                const reposData: GitHubRepo[] = await reposResponse.json();

                // Calculate total stars earned (GitHub API doesn't provide this directly)
                const totalStars = reposData.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);

                // Get top 2 repositories (by stars)
                const topRepos = reposData
                    .filter((repo: GitHubRepo) => !repo.fork) // Exclude forked repositories
                    .slice(0, 2);

                setGithubData({
                    profile: userData,
                    repositories: topRepos,
                    totalStars,
                    totalRepos: userData.public_repos
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                console.error('Error fetching GitHub data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    const getLanguageColor = (language: string): string => {
        const colors: Record<string, string> = {
            JavaScript: '#f1e05a',
            TypeScript: '#3178c6',
            Python: '#3572A5',
            Java: '#b07219',
            'C++': '#f34b7d',
            C: '#555555',
            HTML: '#e34c26',
            CSS: '#1572B6',
            PHP: '#4F5D95',
            Ruby: '#701516',
            Go: '#00ADD8',
            Rust: '#dea584',
            Swift: '#ffac45',
            Kotlin: '#A97BFF',
            Dart: '#00B4AB',
            Shell: '#89e051',
        };
        return colors[language] || '#586069';
    };

    if (error) {
        return (
            <section id="github" className="section github-section">
                <div className="container section-padding flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5">
                    <div className="flex-1 flex flex-col gap-5">
                        <h2 className="section-title text-github-text">My Github</h2>
                        <div className="text-red-500">
                            Error loading GitHub data: {error}
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <GithubGlobeContainer />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="github" className="section github-section relative overflow-hidden max-w-screen">
            <div className="container section-padding relative flex flex-col lg:flex-row flex-wrap items-center justify-start">
                <div className="flex-1 flex flex-col gap-5">
                    <h2 className="section-title text-github-text">My Github</h2>

                    {isLoading ? (
                        <div role="status" className="w-full h-52 flex items-center justify-center">
                            <svg aria-hidden="true"
                                 className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-github-text"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : githubData ? (
                        <div className="flex flex-col items-start justify-center gap-0 font-github-sans font-medium">
                            <div className="w-fit flex flex-col gap-2 border-2 border-github-border p-3 rounded-2xl">
                                <div className="w-full flex flex-row gap-3 items-center">
                                    <img
                                        id="github-profile-img"
                                        src={githubData.profile.avatar_url}
                                        alt="Github Profile"
                                        className="max-w-12 max-h-12 rounded-full"
                                    />
                                    <div className="flex flex-col gap-0 h-full">
                                        <a
                                            href={githubData.profile.html_url}
                                            className="font-bold"
                                        >
                                            {githubData.profile.name || githubData.profile.login}
                                        </a>

                                        <p className="text-github-muted text-sm">{githubData.profile.login} · he/him</p>
                                    </div>
                                </div>
                                <p>{githubData.profile.bio || "Front-end enthusiast by day, algorithm adventurer by night."}</p>
                                <div className="flex flex-row flex-wrap gap-2 text-xs md:text-sm opacity-75">
                                    <p>
                                        <b>{githubData.totalRepos}</b> repositories
                                    </p>
                                    <p>
                                        <b>{githubData.profile.followers}</b> followers
                                    </p>
                                    <p>
                                        <b>{githubData.totalStars}</b> stars earned
                                    </p>
                                </div>
                            </div>

                            <div className="github-repos">
                                {githubData.repositories.map((repo: GitHubRepo) => (
                                    <div key={repo.id} className="github-repo">
                                        <div className="flex flex-row gap-2 items-center">
                                            <BookMarked width={15} height={15} className="w-3.5 h-3.5 opacity-60"/>
                                            <Link href={repo.html_url} className="text-sm font-semibold text-github-accent line-clamp-1 hover:underline underline-offset-2">
                                                {repo.name}
                                            </Link>
                                            <span className="text-tiny opacity-75 bg-slate-100 dark:bg-slate-800/10 border border-github-border px-1.5 py-0.5 rounded-full">
                                            {repo.private ? 'Private' : 'Public'}
                                        </span>
                                        </div>
                                        <p className="text-xs opacity-75 line-clamp-2">
                                            {repo.description || "No description available"}
                                        </p>
                                        <div className="flex flex-row items-center justify-start gap-3">
                                            {repo.language && (
                                                <div className="flex flex-row items-center gap-1">
                                                    <div
                                                        className="w-3 h-3 rounded-full border border-github-border"
                                                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                                                    ></div>
                                                    <span className="text-tiny md:text-xs opacity-75 tracking-wide">
                                                    {repo.language}
                                                </span>
                                                </div>
                                            )}
                                            {repo.stargazers_count > 0 && (
                                                <div className="h-full flex flex-row items-center justify-center gap-1">
                                                    <Star width={15} height={15} className="text-github-muted" />
                                                    <span className="h-full text-xs opacity-75 my-auto">
                                                {repo.stargazers_count}
                                            </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="flex-1 relative w-full h-full overflow-hidden -mx-5 select-none">
                    <div className="w-[90vw] md:w-[650px] h-[100vw] md:h-[500px] relative m-auto">
                        <GithubGlobeContainer />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyGithub;