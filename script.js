const toggle = document.getElementById('toggle');
const sidebar = document.getElementById('sidebar');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  sidebar.classList.toggle('show');
});
