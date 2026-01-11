// Dark Mode Toggle
        function toggleDarkMode() {
            const body = document.body;
            
            body.classList.toggle('dark-mode');
            
            // Save preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        }

        // Load dark mode preference on page load
        window.addEventListener('DOMContentLoaded', () => {
            const darkMode = localStorage.getItem('darkMode');
            const body = document.body;
            
            if (darkMode === 'enabled') {
                body.classList.add('dark-mode');
            }
        });