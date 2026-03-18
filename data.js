const HP={
  sc:[
    {id:'c1',name:'Living Room',slug:'living-room',desc:'Sofas, rugs, lighting and accent pieces that anchor your living space.',color:'#C5B5A0',cnt:148,on:true},
    {id:'c2',name:'Bedroom',slug:'bedroom',desc:'Bedding, nightstands, lamps and everything for your most personal space.',color:'#B8BFAD',cnt:203,on:true},
    {id:'c3',name:'Kitchen',slug:'kitchen',desc:'Serveware, organisers, small appliances and countertop finds.',color:'#C1603A',cnt:91,on:true},
    {id:'c4',name:'Outdoor',slug:'outdoor',desc:'Patio furniture, planters and garden accessories worth splurging on.',color:'#7A9E7E',cnt:67,on:true},
    {id:'c5',name:'Home Office',slug:'home-office',desc:'Desks, chairs, storage and décor for a workspace you want to be in.',color:'#9B8F85',cnt:54,on:true},
    {id:'c6',name:'Bathroom',slug:'bathroom',desc:'Vanity trays, towels, storage and spa-worthy additions.',color:'#A8C4AB',cnt:39,on:true},
  ],
  sp:[
    {id:'p1',name:'Linen Channel Tufted Sofa',cat:'c1',src:'Amazon',price:649,badge:'New Find',desc:'Soft bouclé texture, solid wood legs, 8 earthy tone options. Seat depth is generous enough for proper lounging.',url:'https://amazon.com',img:'',feat:true,status:'published',date:'2026-03-01'},
    {id:'p2',name:'Rattan Arc Floor Lamp',cat:'c1',src:'Wayfair',price:189,badge:'',desc:'Warm woven shade, adjustable arm, pairs with any boho or Japandi palette.',url:'https://wayfair.com',img:'',feat:true,status:'published',date:'2026-03-02'},
    {id:'p3',name:'STOCKHOLM Woven Rug',cat:'c1',src:'IKEA',price:49,badge:'Under $50',desc:'Flat-woven, reversible, handcrafted texture in natural wool colours.',url:'https://ikea.com',img:'',feat:true,status:'published',date:'2026-03-03'},
    {id:'p4',name:'Travertine Side Table',cat:'c2',src:'Amazon',price:128,badge:'',desc:'Natural stone top with powder-coated matte black frame. Museum-worthy at bedroom price.',url:'https://amazon.com',img:'',feat:true,status:'published',date:'2026-03-04'},
    {id:'p5',name:'Stoneware Vase Set — Sage',cat:'c1',src:'Target',price:38,badge:"Editor's Pick",desc:'Set of 3 in graduating heights. Matte sage glaze that photographs beautifully.',url:'https://target.com',img:'',feat:true,status:'published',date:'2026-03-05'},
    {id:'p6',name:'Solid Wood Bookcase — Oak',cat:'c5',src:'Wayfair',price:299,badge:'',desc:'5-shelf, adjustable, sustainably sourced. The anchor piece every room deserves.',url:'https://wayfair.com',img:'',feat:true,status:'published',date:'2026-03-06'},
    {id:'p7',name:'Linen Duvet Cover Set',cat:'c2',src:'Amazon',price:89,badge:'Bestseller',desc:'Stone-washed linen, gets softer with every wash. 12 colour options.',url:'https://amazon.com',img:'',feat:false,status:'published',date:'2026-03-07'},
    {id:'p8',name:'Cast Iron Skillet Set',cat:'c3',src:'Amazon',price:75,badge:'',desc:'Pre-seasoned, oven-safe to 500°F, lasts decades.',url:'https://amazon.com',img:'',feat:false,status:'published',date:'2026-03-08'},
    {id:'p9',name:'Velvet Accent Chair',cat:'c1',src:'Wayfair',price:349,badge:'',desc:'Deep forest green velvet, tapered brass legs. The statement chair every living room needs.',url:'https://wayfair.com',img:'',feat:false,status:'published',date:'2026-03-09'},
    {id:'p10',name:'Bamboo Bath Caddy',cat:'c6',src:'Amazon',price:35,badge:'Under $50',desc:'Expandable, holds a book, wine glass, and phone. Instantly spa-like.',url:'https://amazon.com',img:'',feat:false,status:'published',date:'2026-03-10'},
  ],
  spo:[
    {id:'b1',title:'10 Amazon Home Finds Under $50 That Look Expensive',slug:'amazon-finds-under-50',cat:'c1',excerpt:"You don't need a designer budget to have a beautiful home. These are the pieces we keep recommending to everyone.",content:'<p>Finding affordable home décor that actually looks good is harder than it should be. We spent weeks testing and returning before landing on these 10 pieces that consistently photograph well, hold up to daily use, and cost less than a dinner out.</p><h2>1. The Linen Throw</h2><p>The single item that transforms any sofa from flat to editorial is a good throw. This pre-washed linen option comes in 14 muted tones and drapes naturally without looking staged.</p><h2>2. Woven Seagrass Basket</h2><p>Storage that looks intentional. Use it for throws, magazines, or plant pots. The weave holds up to daily handling and the natural material fits every aesthetic from boho to minimal.</p><h2>3. Ceramic Table Lamp</h2><p>A brushed ceramic base in any earthy tone does more for a bedroom than most furniture updates. Pair with a linen shade and the room feels designed, not decorated.</p>',tags:'amazon,budget,living room',author:'Hearthpick Editorial',status:'published',feat:true,date:'2026-03-10'},
    {id:'b2',title:'The Japandi Bedroom: A Starter Guide',slug:'japandi-bedroom-guide',cat:'c2',excerpt:"Japandi is not a trend — it's a philosophy. Here's how to bring its principles into your bedroom without a full renovation.",content:'<p>Japandi — the design philosophy that blends Japanese minimalism with Scandinavian warmth — has moved from Pinterest boards into mainstream interiors for good reason. It is one of the few styles that looks better over time as pieces age and patina.</p><h2>Start with the Palette</h2><p>Warm whites, oat tones, charcoal, and muted sage. No bright whites, no cold greys. The palette should feel like a sigh of relief when you walk in.</p><h2>The Bed is the Anchor</h2><p>A low-profile platform bed in natural wood is the centrepiece. Linen bedding in undyed or stone-washed tones. Two pillows maximum — Japandi bedrooms do not pile cushions.</p><h2>What to Remove</h2><p>The edit is as important as the add. Remove anything with a visible brand logo. Remove anything plastic that is not deliberately chosen. Remove wall art that does not have negative space.</p>',tags:'japandi,bedroom,style guide',author:'Hearthpick Editorial',status:'published',feat:true,date:'2026-03-08'},
    {id:'b3',title:'How We Curate: The Hearthpick Selection Process',slug:'how-we-curate',cat:'c1',excerpt:"Every find on this site went through a real test. Here's exactly how we decide what makes the cut.",content:'<p>We get this question a lot: how do you decide what to feature? The answer is more rigorous than most people expect from an affiliate site. We test, read reviews critically, and only feature things we would actually recommend to a close friend.</p><h2>Step 1: The Longlist</h2><p>We monitor Pinterest trending boards, retailer new arrivals, and reader suggestions. Anything that appears across multiple credible sources goes onto a longlist for review.</p><h2>Step 2: The Review Deep-Dive</h2><p>We read the 1-star and 2-star reviews first. This tells you more about a product than the 5-star ones. We look for patterns — if multiple people mention the same flaw, it is real and we will not feature the product.</p><h2>Step 3: The Final Cut</h2><p>We ask ourselves one question: would we recommend this to a friend who trusts our taste? If the answer is anything other than yes — it does not make the cut.</p>',tags:'about,curation,process',author:'Hearthpick Editorial',status:'published',feat:false,date:'2026-03-05'},
  ],
  g(k){try{return JSON.parse(localStorage.getItem('hp_'+k))}catch{return null}},
  s(k,v){localStorage.setItem('hp_'+k,JSON.stringify(v))},
  init(){
    if(!this.g('ok')){
      this.s('cats',this.sc);this.s('prods',this.sp);this.s('posts',this.spo);
      this.s('cfg',{name:'Hearthpick',tag:'Curated Home Finds, Pinned with Love',email:'hello@hearthpick.com',pin:'https://pinterest.com/hearthpick',ig:'#',tk:'#',adminPin:'1234',disc:'Hearthpick is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.'});
      this.s('subs',[]);this.s('ok',1);
    }
  },
  getCats(){return this.g('cats')||[]},
  saveCat(c){const a=this.getCats();const i=a.findIndex(x=>x.id===c.id);if(i>-1)a[i]=c;else a.push(c);this.s('cats',a)},
  delCat(id){this.s('cats',this.getCats().filter(c=>c.id!==id))},
  getProds(f={}){let p=this.g('prods')||[];if(f.cat)p=p.filter(x=>x.cat===f.cat);if(f.status)p=p.filter(x=>x.status===f.status);if(f.feat)p=p.filter(x=>x.feat);return p},
  saveProd(p){const a=this.g('prods')||[];const i=a.findIndex(x=>x.id===p.id);if(i>-1)a[i]=p;else a.push(p);this.s('prods',a)},
  delProd(id){this.s('prods',(this.g('prods')||[]).filter(p=>p.id!==id))},
  getPosts(f={}){let p=this.g('posts')||[];if(f.status)p=p.filter(x=>x.status===f.status);if(f.feat)p=p.filter(x=>x.feat);if(f.cat)p=p.filter(x=>x.cat===f.cat);return p},
  savePost(p){const a=this.g('posts')||[];const i=a.findIndex(x=>x.id===p.id);if(i>-1)a[i]=p;else a.push(p);this.s('posts',a)},
  delPost(id){this.s('posts',(this.g('posts')||[]).filter(p=>p.id!==id))},
  getCfg(){return this.g('cfg')||{}},
  saveCfg(c){this.s('cfg',c)},
  addSub(name,email){const a=this.g('subs')||[];if(a.find(s=>s.email===email))return false;a.push({name,email,date:new Date().toISOString()});this.s('subs',a);return true},
  getSubs(){return this.g('subs')||[]},
  authOk(){return sessionStorage.getItem('hp_auth')==='1'},
  login(pin){const c=this.getCfg();if(pin===(c.adminPin||'1234')){sessionStorage.setItem('hp_auth','1');return true}return false},
  logout(){sessionStorage.removeItem('hp_auth')},
  slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')},
  uid(){return 'x'+Date.now()+Math.random().toString(36).substr(2,5)},
  catName(id){const c=this.getCats().find(x=>x.id===id);return c?c.name:'—'},
  colors:['#EDE0D0','#D5DDD0','#F0E0D5','#D8D0C8','#C8D5C5','#E8D8C5','#D5C8D5','#C8DDE0'],
  pc(i){return this.colors[i%this.colors.length]},
};
HP.init();
