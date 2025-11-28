// ==================== script.js ====================

// Sidebar toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
menuToggle.classList.toggle('active');
sidebar.classList.toggle('active');
});

// Close sidebar on link click
const sidebarLinks = sidebar.querySelectorAll('a');
sidebarLinks.forEach(link => {
link.addEventListener('click', () => {
menuToggle.classList.remove('active');
sidebar.classList.remove('active');
});
});
