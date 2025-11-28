const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

document.querySelectorAll('#sidebar a[data-category]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const category = link.getAttribute('data-category');
    loadWatches(category);
    sidebar.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});
