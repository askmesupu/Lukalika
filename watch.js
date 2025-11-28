const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

if(category){
    fetch(`Watch-Collection/${category}/index.json`)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("watch-container");
        container.innerHTML = "";
        data.forEach(watch => {
            let stockClass = watch.stock === "out" ? "out-of-stock" : "";
            container.innerHTML += `
                <div class="watch-card ${stockClass}">
                    <div class="watch-images">
                        ${watch.images.map(img => `<img src="${img}" />`).join('')}
                    </div>
                    <h3>${watch.brand} - ${watch.model}</h3>
                    <p>${watch.description}</p>
                    ${watch.discount ? `<p class="price"><span class="original">${watch.price}</span> ${watch.discountedPrice}</p>` : `<p class="price">${watch.price}</p>`}
                    ${watch.stock === "out" ? `<button disabled>Out of Stock</button>` : `<button onclick="addToCart('${watch.id}')">Add to Cart</button>`}
                </div>
            `;
        });
    })
    .catch(err => console.error(err));
           }
