const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('sidebarToggle');
toggle.addEventListener('click',()=>{
  sidebar.classList.toggle('show');
  toggle.classList.toggle('open');
});

const content = document.getElementById('content');

async function loadWatches(category='Top-Selling'){
  content.innerHTML = '<p>Loading...</p>';
  try{
    const res = await fetch(`Watch-Collection/${category}/index.json`);
    if(!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    content.innerHTML='';
    data.forEach(watch=>{
      const div=document.createElement('div');
      div.className='watch-card';
      let priceHtml='';
      if(watch.discount && watch.discount>0){
        const discounted = watch.price - (watch.price*watch.discount/100);
        priceHtml=`<p class="price"><span class="original">BDT ${watch.price}</span> <span class="discounted">BDT ${discounted}</span></p>`;
      }else priceHtml=`<p class="price">BDT ${watch.price}</p>`;
      div.innerHTML=`
        <img src="${watch.images[0]}" alt="${watch.name}">
        <h3>${watch.name}</h3>
        <p>${watch.description}</p>
        ${priceHtml}
        <button>Add to Cart</button>
      `;
      content.appendChild(div);
    });
  }catch(err){
    content.innerHTML='<p>Failed to load watches.</p>';
  }
}

// Sidebar menu click
document.querySelectorAll('.menu-items li[data-page]').forEach(li=>{
  li.addEventListener('click',()=>{
    loadWatches(li.getAttribute('data-page'));
    sidebar.classList.remove('show');
    toggle.classList.remove('open');
  });
});

loadWatches();
