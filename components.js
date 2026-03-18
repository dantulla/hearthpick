const C={
  nav(active='',base='../'){
    const cats=HP.getCats().filter(c=>c.on);
    const home=base==='./';
    const pf=home?'pages/':'';
    return`<nav id="main-nav">
<div class="nav-inner">
  <a href="${base}index.html" class="nav-logo">Hearth<span>pick</span></a>
  <ul class="nav-links">
    <li class="nav-dd"><a href="#" class="${active==='shop'?'active':''}">Shop ▾</a>
      <div class="dd-menu">
        ${cats.map(c=>`<a href="${base}${pf}category.html?id=${c.id}">${c.name}</a>`).join('')}
        <a href="${base}${pf}shop.html" style="border-top:1px solid #EDE3D5;margin-top:4px;padding-top:10px;font-weight:500">All Finds →</a>
      </div>
    </li>
    <li><a href="${base}${pf}blog.html" class="${active==='blog'?'active':''}">The Edit</a></li>
    <li><a href="${base}${pf}about.html" class="${active==='about'?'active':''}">About</a></li>
    <li><a href="#newsletter" class="nav-cta">Get the Edit</a></li>
  </ul>
  <button class="hamburger" id="hbg" aria-label="Menu"><span></span><span></span><span></span></button>
</div>
</nav>
<div class="mob-nav" id="mob-nav">
  <a href="${base}index.html">Home</a>
  <div class="mob-sec">Shop by Room</div>
  ${cats.map(c=>`<a href="${base}${pf}category.html?id=${c.id}">${c.name}</a>`).join('')}
  <a href="${base}${pf}shop.html">All Finds</a>
  <div class="mob-sec">Explore</div>
  <a href="${base}${pf}blog.html">The Edit (Blog)</a>
  <a href="${base}${pf}about.html">About</a>
  <a href="#newsletter">Newsletter</a>
</div>`;
  },

  newsletter(){
    return`<section class="nl-wrap" id="newsletter">
<div class="container">
  <div class="nl-inner">
    <div>
      <div class="nl-eye">The Weekly Edit</div>
      <h2 class="nl-title">Get the <em>best finds</em><br>before everyone else.</h2>
      <p class="nl-desc">Every Thursday — 5 hand-picked home finds, exclusive deals, one styling tip, and the one piece worth splurging on this week. No spam, ever.</p>
    </div>
    <div>
      <div class="nl-form">
        <div id="nl-msg" style="display:none"></div>
        <input type="text" class="nl-input" id="nl-name" placeholder="Your first name">
        <input type="email" class="nl-input" id="nl-email" placeholder="Your email address">
        <button class="btn btn-terra" onclick="C.subscribe()" style="align-self:flex-start">Subscribe — it's free</button>
        <p class="nl-note">No spam. Unsubscribe anytime. Affiliate links disclosed.</p>
      </div>
    </div>
  </div>
</div>
</section>`;
  },

  footer(base='../'){
    const cfg=HP.getCfg();const home=base==='./';const pf=home?'pages/':'';
    return`<footer id="footer">
<div class="container">
  <div class="ft-grid">
    <div>
      <a href="${base}index.html" class="ft-logo">Hearth<span>pick</span></a>
      <p class="ft-tag">Curated home finds for every room, budget, and aesthetic. Pinned with love, linked with honesty.</p>
      <div class="ft-soc">
        <a href="${cfg.pin||'#'}" class="soc-btn" target="_blank">P</a>
        <a href="${cfg.ig||'#'}" class="soc-btn" target="_blank">IG</a>
        <a href="${cfg.tk||'#'}" class="soc-btn" target="_blank">TK</a>
      </div>
    </div>
    <div class="ft-col"><h4>Shop</h4><ul>
      ${HP.getCats().filter(c=>c.on).map(c=>`<li><a href="${base}${pf}category.html?id=${c.id}">${c.name}</a></li>`).join('')}
    </ul></div>
    <div class="ft-col"><h4>Hearthpick</h4><ul>
      <li><a href="${base}${pf}about.html">About</a></li>
      <li><a href="${base}${pf}blog.html">The Edit</a></li>
      <li><a href="${cfg.pin||'#'}" target="_blank">Pinterest Boards</a></li>
      <li><a href="mailto:${cfg.email||'hello@hearthpick.com'}">Contact</a></li>
    </ul></div>
    <div class="ft-col"><h4>Legal</h4><ul>
      <li><a href="${base}${pf}privacy.html">Privacy Policy</a></li>
      <li><a href="${base}${pf}affiliate-disclaimer.html">Affiliate Disclaimer</a></li>
      <li><a href="${base}${pf}terms.html">Terms of Service</a></li>
    </ul></div>
  </div>
  <div class="ft-bot">
    <p class="ft-copy">© ${new Date().getFullYear()} Hearthpick. All rights reserved.</p>
    <p class="ft-disc">${cfg.disc||''}</p>
  </div>
</div>
</footer>`;
  },

  prodCard(p,i,base='../'){
    const color=HP.pc(i);
    const img=p.img?`<img src="${p.img}" alt="${p.name}" loading="lazy">`:`<div style="position:absolute;inset:0;background:${color};display:flex;align-items:center;justify-content:center"><span style="font-family:'Playfair Display',serif;font-size:.95rem;font-style:italic;color:rgba(44,40,37,.35)">${HP.catName(p.cat)}</span></div>`;
    return`<div class="product-card">
  <div class="card-img">${img}${p.badge?`<div class="card-badge">${p.badge}</div>`:''}</div>
  <div class="card-body">
    <div class="card-source">${p.src}</div>
    <div class="card-name">${p.name}</div>
    <div class="card-desc">${p.desc}</div>
    <div class="card-footer">
      <div class="card-price">$${p.price}</div>
      <a href="${p.url}" target="_blank" rel="noopener sponsored" class="card-cta">Shop Now →</a>
    </div>
  </div>
</div>`;
  },

  blogCard(post,base='../'){
    const home=base==='./';const pf=home?'pages/':'';
    const cat=HP.getCats().find(c=>c.id===post.cat);
    return`<a href="${base}${pf}post.html?id=${post.id}" class="blog-card">
  <div class="blog-img" style="background:${cat?cat.color:'#C5B5A0'}">
    <span style="font-family:'Playfair Display',serif;font-size:1.1rem;font-style:italic;color:rgba(255,255,255,.35)">${cat?cat.name:'Editorial'}</span>
  </div>
  <div class="blog-body">
    <span class="blog-cat">${cat?cat.name:'Editorial'}</span>
    <h3 class="blog-title">${post.title}</h3>
    <p class="blog-excerpt">${post.excerpt}</p>
    <div class="blog-meta"><span>${post.author}</span><span class="meta-dot"></span><span>${new Date(post.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span></div>
  </div>
</a>`;
  },

  subscribe(){
    const name=document.getElementById('nl-name').value.trim();
    const email=document.getElementById('nl-email').value.trim();
    const msg=document.getElementById('nl-msg');
    if(!name||!email){msg.style.display='block';msg.className='alert a-err';msg.textContent='Please fill in both fields.';return}
    if(!email.includes('@')){msg.style.display='block';msg.className='alert a-err';msg.textContent='Please enter a valid email.';return}
    const ok=HP.addSub(name,email);
    msg.style.display='block';
    if(ok){msg.className='alert a-ok';msg.textContent=`Welcome, ${name}! The Thursday edit is coming your way.`;document.getElementById('nl-name').value='';document.getElementById('nl-email').value='';}
    else{msg.className='alert a-inf';msg.textContent="You're already on the list — thank you!"}
  },

  initNav(){
    const nav=document.getElementById('main-nav');
    const hbg=document.getElementById('hbg');
    const mob=document.getElementById('mob-nav');
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30));
    hbg?.addEventListener('click',()=>mob.classList.toggle('open'));
  }
};
