// Sidebar toggle
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.sidebar-toggle');

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  toggle.classList.toggle('open');
});

// Close sidebar if click outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove('show');
    toggle.classList.remove('open');
  }
});
