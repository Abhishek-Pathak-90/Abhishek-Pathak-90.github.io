// Function to fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/Abhishek-Pathak-90/repos');
        const repos = await response.json();
        
        // Sort repos by stars
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        const repoList = document.getElementById('repo-list');
        
        repos.forEach(repo => {
            if (!repo.fork) {  // Only show non-forked repositories
                const card = document.createElement('div');
                card.className = 'project-card';
                
                // Create repository content
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <div class="project-meta">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        ${repo.language ? `<span><i class="fas fa-code"></i> ${repo.language}</span>` : ''}
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank">
                            <i class="fab fa-github"></i> View Source
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        ` : ''}
                    </div>
                `;
                
                repoList.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        document.getElementById('repo-list').innerHTML = `
            <div class="error-message">
                <p>Failed to load repositories. Please try again later.</p>
            </div>
        `;
    }
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add navbar background color on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
});
