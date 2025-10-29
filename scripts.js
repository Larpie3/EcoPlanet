(function(){
  'use strict';
  function setupThemeToggle(btnId){
    var btn = document.getElementById(btnId);
    if(!btn) return;
    btn.addEventListener('click', function(){
      var isDark = document.body.classList.toggle('theme-dark');
      document.body.classList.toggle('theme-light', !isDark);
      btn.setAttribute('aria-pressed', String(isDark));
      try{ localStorage.setItem('eco-theme', isDark ? 'dark' : 'light'); }catch(e){}
      btn.animate([{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:180});
    });
  }
  setupThemeToggle('themeToggle'); setupThemeToggle('themeToggle2'); setupThemeToggle('themeToggle3');
  try{
    var saved = localStorage.getItem('eco-theme');
    if(saved === 'dark'){ document.body.classList.add('theme-dark'); document.body.classList.remove('theme-light'); }
    else { document.body.classList.add('theme-light'); document.body.classList.remove('theme-dark'); }
  }catch(e){}
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('reveal--visible'); entry.target.style.opacity='1'; entry.target.style.transform='none'; io.unobserve(entry.target); }
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  function openJoinModal(projectName){
    var modal = document.getElementById('joinModal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    var title = document.getElementById('joinProjectName');
    if(title) title.textContent = projectName || '';
  }
  function closeJoinModal(){
    var modal = document.getElementById('joinModal'); if(!modal) return; modal.setAttribute('aria-hidden','true');
  }

  document.addEventListener('click', function(e){
    var t = e.target;
    if(t.matches('[data-open-join]')){ var project = t.getAttribute('data-project') || 'Project'; openJoinModal(project); }
    if(t.id === 'closeJoin') closeJoinModal();
  });

  var joinForm = document.getElementById('joinForm');
  if(joinForm){
    joinForm.addEventListener('submit', function(e){
      e.preventDefault();
      var name = joinForm.querySelector('input[name="name"]').value || 'Friend';
      var modal = document.getElementById('joinModal');
      if(modal) modal.setAttribute('aria-hidden','true');
      showToast('Thanks ' + name + '! We received your interest — we\'ll be in touch.');
      joinForm.reset();
    });
  }

  function showToast(msg){
    var t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    Object.assign(t.style,{position:'fixed',right:'1rem',bottom:'1rem',background:'#083a2b',color:'#dff7e8',padding:'0.8rem 1rem',borderRadius:'8px',boxShadow:'0 8px 30px rgba(0,0,0,0.3)'});
    document.body.appendChild(t);
    setTimeout(function(){ t.style.transition='opacity .4s'; t.style.opacity='0'; setTimeout(function(){ t.remove(); },400); },4000);
  }

})();