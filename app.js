const STORES = [
  {name:'Amazon', color:'#ff9900', search:q=>'https://www.amazon.com/s?k='+encodeURIComponent(q), deals:'https://www.amazon.com/gp/goldbox'},
  {name:'eBay', color:'#e53238', search:q=>'https://www.ebay.com/sch/i.html?_nkw='+encodeURIComponent(q), deals:'https://www.ebay.com/deals'},
  {name:'Temu', color:'#fb7701', search:q=>'https://www.temu.com/search_result.html?search_key='+encodeURIComponent(q), deals:'https://www.temu.com/channel.html'},
  {name:'Shein', color:'#111827', search:q=>'https://us.shein.com/search/?search='+encodeURIComponent(q), deals:'https://us.shein.com/sale.html'},
  {name:'Walmart', color:'#0071dc', search:q=>'https://www.walmart.com/search?q='+encodeURIComponent(q), deals:'https://www.walmart.com/shop/deals'},
];
const CATEGORIES = ['smartwatch','freidora de aire','zapatos','auriculares','ropa','televisor','juguetes','belleza'];
const chipsEl = document.getElementById('chips');
CATEGORIES.forEach(c=>{
  const b=document.createElement('button');
  b.type='button'; b.textContent=c;
  b.onclick=()=>{ document.getElementById('q').value=c; buscar(); };
  chipsEl.appendChild(b);
});
function card(store, url, label, isDeal){
  const fav = localStorage.getItem('fav-'+store.name) ? ' ★' : '';
  return `<article class="card"><h3>${store.name}${fav}</h3><p>${label}</p><a class="${isDeal?'deal':''}" href="${url}" target="_blank" rel="noopener">Abrir en ${store.name} ↗</a> <button data-fav="${store.name}">⭐ Favorito</button></article>`;
}
function buscar(){
  const q=document.getElementById('q').value.trim();
  if(!q){ alert('Escribe un producto primero.'); return; }
  document.getElementById('resultados').hidden=false;
  document.getElementById('resultTitle').textContent='Resultados para «'+q+'»';
  document.getElementById('storeCards').innerHTML = STORES.map(s=>card(s, s.search(q), 'Buscar «'+q+'» en '+s.name+'. El precio real se ve en la tienda.')).join('');
  document.getElementById('resultados').scrollIntoView({behavior:'smooth'});
  bindFav();
}
function mostrarOfertas(){
  document.getElementById('offerCards').innerHTML = STORES.map(s=>card(s, s.deals, 'Página oficial de ofertas de '+s.name+'.', true)).join('');
  document.getElementById('ofertas').scrollIntoView({behavior:'smooth'});
  bindFav();
}
function bindFav(){
  document.querySelectorAll('[data-fav]').forEach(b=>{
    b.onclick=()=>{
      const k='fav-'+b.dataset.fav;
      if(localStorage.getItem(k)) localStorage.removeItem(k); else localStorage.setItem(k,'1');
      buscarOfertasRefresh();
    };
  });
}
function buscarOfertasRefresh(){
  const q=document.getElementById('q').value.trim();
  if(q) buscar(); else mostrarOfertas();
}
document.getElementById('btnBuscar').onclick=buscar;
document.getElementById('q').addEventListener('keydown',e=>{ if(e.key==='Enter') buscar(); });
document.getElementById('btnOfertas').onclick=mostrarOfertas;
document.getElementById('btnOfertasFijo').onclick=mostrarOfertas;
mostrarOfertas();
if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }
