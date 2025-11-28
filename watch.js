function loadWatches(jsonPath) {
const container = document.getElementById('watch-container');
container.innerHTML = 'Loading...';
fetch(jsonPath)
.then(res => res.json())
.then(data => {
container.innerHTML = '';
data.forEach(watch => {
const card = document.createElement('div');
card.className = 'watch-card';

            // Images scroll
            let imgHtml = `<div class="image-scroll">`;
            watch.images.forEach(img => {
                imgHtml += `<img src="${img}" alt="${watch.name}">`;
            });
            imgHtml += `</div>`;
            
            card.innerHTML = `
                ${imgHtml}
                <div class="watch-name">${watch.name}</div>
                ${watch.discount > 0 ? `<div class="watch-price"><s>${watch.price} BDT</s></div>
                <div class="discount-price">${watch.price - (watch.price * watch.discount / 100)} BDT</div>` : `<div class="watch-price">${watch.price} BDT</div>`}
                <button ${watch.stock === 0 ? 'disabled' : ''}>Buy Now / Add to Cart</button>
            `;
            container.appendChild(card);
        });
    })
    .catch(err => {
        console.error(err);
        container.innerHTML = 'Failed to load watches.';
    });

}
