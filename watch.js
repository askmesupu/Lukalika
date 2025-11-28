async function loadWatches(collection='Top-Selling') {
  const container = document.getElementById('watch-container');
  container.innerHTML = '';
  try{
    const res = await fetch(`./Watch-Collection/${collection}/index.json`);
    const folders = await res.json();
    for(const folder of folders){
      const watchRes = await fetch(`./Watch-Collection/${collection}/${folder}/watch.json`);
      const watch = await watchRes.json();
      const imagesHtml = watch.images.map(img=>`<img src="${img}" alt="${watch.name}">`).join('');
      let priceHtml = '';
      if(watch.discount && watch.discount>0){
        const discounted = (watch.price*(1-watch.discount/100)).toFixed(0);
        priceHtml=`<span class="original">${watch.price} BDT</span><span class="discounted">${discounted} BDT</span>`;
      } else priceHtml=`<span>${watch.price} BDT</span>`;
      const card = document.createElement('div');
      card.classList.add('watch-card');
      card.innerHTML=`
        <div class="watch-images">${imagesHtml}</div>
        <h3>${watch.name}</h3>
        <p>${watch.description}</p>
        <div class="price">${priceHtml}</div>
        <button ${watch.stock===0?'disabled style="opacity:0.5"':''}>Buy Now</button>
      `;
      container.appendChild(card);
      const imgDiv=card.querySelector('.watch-images');
      imgDiv.style.display='flex';
      imgDiv.style.overflowX='auto';
      imgDiv.style.gap='5px';
      imgDiv.querySelectorAll('img').forEach(img=>{
        img.style.width='100px';
        img.style.height='100px';
        img.style.objectFit='cover';
        img.style.borderRadius='5px';
      });
    }
  }catch(e){
    container.innerHTML='<p style="color:red;">Failed to load watches.</p>';
    console.error(e);
  }
}

// Load default Top-Selling
loadWatches();

// Sidebar menu click
document.querySelectorAll('.sidebar-menu li[data-collection]').forEach(item=>{
  item.addEventListener('click',()=>loadWatches(item.dataset.collection));
});
