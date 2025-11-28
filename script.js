const toggle = document.getElementById('toggle');
const sidebar = document.getElementById('sidebar');
const homeBtn = document.getElementById('home-btn');
const watchContainer = document.getElementById('watch-container');

// Sidebar toggle
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  sidebar.classList.toggle('show');
});

// Load watches function
function loadWatches(collection) {
  fetch(`./Watch-Collection/${collection}/index.json`)
    .then(res => res.json())
    .then(folders => {
      watchContainer.innerHTML = '';
      folders.forEach(folder => {
        fetch(`./Watch-Collection/${collection}/${folder}/watch.json`)
          .then(res => res.json())
          .then(watch => {
            const div = document.createElement('div');
            div.className = 'watch-item';
            div.innerHTML = `
              <img src="${watch.img}" alt="${watch.name}">
              <h3>${watch.name}</h3>
              <p>${watch.brand}</p>
              <p>${watch.price} BDT</p>
              ${watch.discount > 0 ? `<p class="discount">BDT ${watch.discount}</p>` : ''}
              <button class="add-to-cart">Add to Cart</button>
            `;
            watchContainer.appendChild(div);
          });
      });
    })
    .catch(err => {
      watchContainer.innerHTML = '<p class="error">Failed to load watches.</p>';
      console.error(err);
    });
}

// Home button click
homeBtn.addEventListener('click', () => {
  loadWatches('Top-Selling'); // Default top-selling watches
  toggle.classList.remove('open');
  sidebar.classList.remove('show');
});

// Initially load top-selling watches
loadWatches('Top-Selling');
