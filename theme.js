// Theme Toggle - AI Leadership Notes
// Handles dark/light mode switching with localStorage persistence

(function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            if (newTheme === 'light') {
                html.setAttribute('data-theme', 'light');
            } else {
                html.removeAttribute('data-theme');
            }

            localStorage.setItem('theme', newTheme);
        });
    }
})();
