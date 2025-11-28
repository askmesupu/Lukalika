const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.classList.toggle('change');
});

// Sidebar show/hide
const sidebarStyle = document.createElement('style');
document.head.appendChild(sidebarStyle);

sidebarStyle.innerHTML = `
    .sidebar.active {
        left: 0;
    }
`;
