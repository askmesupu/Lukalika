const watchContainer = document.getElementById('watch-container');

async function loadWatches(path) {
try {
const res = await fetch(path);
const data = await res.json();
displayWatches(data);
} catch (err) {
console.error("Failed to load watches:", err);
watchContainer.innerHTML = "<p>Failed to load watches.</p>";
}
}

function displayWatches(watches) {
watchContainer.innerHTML = '';
watches.forEach(watch => {
// price HTML
let priceHTML;
if (watch.discount && watch.discount > 0) {
const discountedPrice = Math.round(watch.price * (1 - watch.discount / 100));
priceHTML = "<p class="price"> <span class="original-price">BDT ${watch.price}</span> <span class="discounted-price">BDT ${discountedPrice}</span> </p>";
} else {
priceHTML = "<p class="price">BDT ${watch.price}</p>";
}

// stock check
const buyBtn = watch.stock === 'available'
  ? `<button class="buy-btn" onclick="addToCart('${watch.id}')">Add to Cart</button>`
  : `<button class="buy-btn disabled" disabled>Out of Stock</button>`;

// images slider
let imagesHTML = '<div class="watch-images">';
watch.images.forEach(img => {
  imagesHTML += `<img src="${img}" alt="${watch.brand} ${watch.model}">`;
});
imagesHTML += '</div>';

// full watch card
const watchCard = document.createElement('div');
watchCard.className = 'watch-card';
watchCard.innerHTML = `
  <h3>${watch.brand} ${watch.model}</h3>
  ${imagesHTML}
  <p>${watch.description}</p>
  ${priceHTML}
  ${buyBtn}
`;

watchContainer.appendChild(watchCard);

});
}

// Example addToCart function (you can expand with localStorage)
function addToCart(watchId) {
console.log("Added to cart:", watchId);
alert("Added to cart: " + watchId);
    }
