async function loadWatches(folderPath) {
  try {
    const res = await fetch(`${folderPath}/index.json`);
    const watchNames = await res.json();
    const container = document.querySelector('main');
    container.innerHTML = '';

    for (const name of watchNames) {
      const watchRes = await fetch(`${folderPath}/${name}/watch.json`);
      const watch = await watchRes.json();

      const card = document.createElement('div');
      card.classList.add('watch-card');

      // Multiple images system
      const imagesHtml = watch.images.map(img => `<img src="${img}" alt="${watch.name}">`).join('');

      // Discount system
      let priceHtml = '';
      if (watch.discount && watch.discount > 0) {
        const discountedPrice = (watch.price * (1 - watch.discount/100)).toFixed(0);
        priceHtml = `<span class="original">${watch.price} BDT</span> <span class="discounted">${discountedPrice} BDT</span>`;
      } else {
        priceHtml = `<span>${watch.price} BDT</span>`;
      }

      card.innerHTML = `
        <div class="watch-images">${imagesHtml}</div>
        <h3>${watch.name}</h3>
        <p>${watch.description}</p>
        <div class="price">${priceHtml}</div>
        <button ${watch.stock === 0 ? 'disabled style="opacity:0.5"' : ''}>Buy Now</button>
      `;

      container.appendChild(card);

      // Optional: side scroll for multiple images
      const imageDiv = card.querySelector('.watch-images');
      imageDiv.style.display = 'flex';
      imageDiv.style.overflowX = 'auto';
      imageDiv.style.gap = '5px';
      imageDiv.querySelectorAll('img').forEach(img => {
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '5px';
      });
    }
  } catch (err) {
    const container = document.querySelector('main');
    container.innerHTML = '<p style="color:red;">Failed to load watches.</p>';
    console.error(err);
  }
}

// Example: load top selling watches on homepage
// loadWatches('./Watch-Collection/Top-Selling');
