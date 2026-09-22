document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menu && nav) {
    menu.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  const target = new Date('2026-09-30T09:00:00+05:30').getTime();
  const els = {
    days: document.getElementById('timeline-days'), hours: document.getElementById('timeline-hours'),
    minutes: document.getElementById('timeline-minutes'), seconds: document.getElementById('timeline-seconds'),
    status: document.getElementById('live-status'), progress: document.getElementById('timeline-progress')
  };
  if (!els.days) return;
  const start = new Date('2026-09-01T00:00:00+05:30').getTime();
  function tick(){
    const now=Date.now(), diff=Math.max(0,target-now), total=Math.floor(diff/1000);
    els.days.textContent=String(Math.floor(total/86400)).padStart(2,'0');
    els.hours.textContent=String(Math.floor(total%86400/3600)).padStart(2,'0');
    els.minutes.textContent=String(Math.floor(total%3600/60)).padStart(2,'0');
    els.seconds.textContent=String(total%60).padStart(2,'0');
    if(now>=target){els.status.textContent='LIVE'; els.progress.style.width='100%';}
    else{els.status.textContent='UPCOMING'; els.progress.style.width=Math.max(0,Math.min(100,(now-start)/(target-start)*100))+'%';}
  }
  tick(); setInterval(tick,1000);
});
