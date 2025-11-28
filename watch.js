// watch.js
const watchContainer = document.getElementById("watch-container");
const watchCategory = watchContainer?.dataset.category; // category: Top-Selling, Men, Women, Popular

fetch(`Watch-Collection/${watchCategory}/index.json`)
  .then(res => res.json())
  .then(watchList => {
    watchContainer.innerHTML = "";
    watchList.forEach(watchFolder => {
      fetch(`Watch-Collection/${watchCategory}/${watchFolder}/watch.json`)
        .then(res => res.json())
        .then(watchData => {
          watchData.forEach(watch => {
            const card = document.createElement("div");
            card.classList.add("watch-card");

            // Multiple images scrollable
            let imgHtml = `<div class="watch-images">`;
            watch.images.forEach(img => {
              imgHtml += `<img src="${img}" alt="${watch.name}">`;
            });
            imgHtml += `</div>`;

            // Watch card HTML
            card.innerHTML = `
              ${imgHtml}
              <div class="watch-name">${watch.name}</div>
              <div class="watch-description">${watch.description}</div>
              ${watch.discount > 0 
                ? `<div class="watch-price"><s>${watch.price} BDT</s></div>
                   <div class="discount-price">${watch.price - (watch.price * watch.discount / 100)} BDT</div>`
                : `<div class="watch-price">${watch.price} BDT</div>`
              }
              <button ${watch.stock === 0 ? 'disabled class="out-of-stock"' : ''}>
                ${watch.stock === 0 ? 'Out of Stock' : 'Buy Now / Add to Cart'}
              </button>
            `;
            watchContainer.appendChild(card);
          });
        });
    });
  });
