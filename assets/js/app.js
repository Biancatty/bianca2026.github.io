(function(){
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('bianca-theme');
  if(savedTheme === 'dark') document.body.classList.add('dark');
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('bianca-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  }));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const fmt = d => {const x=new Date(d+'T00:00:00');return `${x.getFullYear()}年${String(x.getMonth()+1).padStart(2,'0')}月${String(x.getDate()).padStart(2,'0')}日`;};
  const loadPosts = () => fetch('data/posts.json').then(r=>r.json()).then(posts => posts.sort((a,b)=>b.date.localeCompare(a.date)));
  const card = p => `<article class="post-card"><a href="post.html?slug=${encodeURIComponent(p.slug)}"><img class="post-cover" src="${esc(p.cover||'assets/images/bianca-placeholder.svg')}" alt=""></a><div><p class="post-meta">${fmt(p.date)} · 阅读 ${p.minutes||1} 分钟</p><h4><a href="post.html?slug=${encodeURIComponent(p.slug)}">${esc(p.title)}</a></h4><p class="post-excerpt">${esc(p.excerpt||'')}</p><div class="post-tags">${(p.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></div></article>`;
  const home = document.getElementById('postList');
  if(home) loadPosts().then(posts => {const render=xs=>{home.innerHTML=xs.map(card).join('');document.getElementById('postCount').textContent=`共 ${xs.length} 篇`;document.getElementById('emptyState').hidden=xs.length>0;};render(posts);document.getElementById('searchInput').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();render(posts.filter(p=>[p.title,p.excerpt,p.category,...(p.tags||[])].join(' ').toLowerCase().includes(q)));});}).catch(()=>{home.innerHTML='<p class="empty-state">文章列表加载失败，请检查 data/posts.json。</p>';});
  const archive = document.getElementById('archiveList');
  if(archive) loadPosts().then(posts => {const groups={};posts.forEach(p=>{const d=new Date(p.date+'T00:00:00'),y=d.getFullYear(),m=d.getMonth()+1;groups[y]??={};groups[y][m]??=[];groups[y][m].push(p);});archive.innerHTML=Object.keys(groups).sort((a,b)=>b-a).map(y=>`<section><h3 class="archive-year">${y}</h3>${Object.keys(groups[y]).sort((a,b)=>b-a).map(m=>`<div><p class="archive-month">${new Date(2000,m-1,1).toLocaleString('zh-CN',{month:'long'})}</p>${groups[y][m].map(p=>`<div class="archive-item"><a href="post.html?slug=${encodeURIComponent(p.slug)}">${esc(p.title)}</a><span class="archive-date">${fmt(p.date)}</span></div>`).join('')}</div>`).join('')}</section>`).join('');});
  const post = document.getElementById('postContent');
  if(post) {const slug=new URLSearchParams(location.search).get('slug');loadPosts().then(posts=>{const p=posts.find(x=>x.slug===slug)||posts[0];if(!p){post.innerHTML='<p class="not-found">还没有这篇文章。</p>';return;}fetch(`posts/${p.date.slice(0,4)}/${p.date.slice(5,7)}/${p.slug}.html`).then(r=>r.text()).then(body=>{post.innerHTML=`<a class="post-back" href="index.html">← 返回文章列表</a><header class="post-header"><p class="post-meta">${fmt(p.date)} · ${esc(p.category)} · 阅读 ${p.minutes||1} 分钟</p><h2>${esc(p.title)}</h2><div class="post-tags">${(p.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></header>${body}<div class="post-footer">感谢你读到这里 · Bianca</div>`;});});}
})();
