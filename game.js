import {LevelTransition} from './transition.js?v=compact-icons-5';
import {giftIcons,giftSvg} from './gift-art.js?v=compact-icons-5';
import {createWorld,step,openPresent,onLand,GIFT_TYPES,nextWorld,LEVEL_COUNT} from './world.js?v=compact-icons-5';
const canvas=document.querySelector('canvas'),c=canvas.getContext('2d'),overlay=document.querySelector('#overlay'),play=document.querySelector('#play');
let world=createWorld(),active=false,paused=false,last=0,toastTimer,selectedGift='sneakers';const keys=new Set();const transition=new LevelTransition();const travel=document.querySelector('#level-travel');
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.style.display='none',2800);}
function reset(){world=createWorld();selectedGift='sneakers';active=true;paused=false;overlay.style.display='none';keys.clear();beginTravel('start');toast('Find three ship parts, then head north to the elevator.');}
play.onclick=reset;document.querySelector('#restart').onclick=reset;
addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.repeat)return;if(e.code==='Space'&&active&&!paused&&!transition.running)toast(openPresent(world,selectedGift));if(/^Digit[1-9]$/.test(e.code)){selectedGift=GIFT_TYPES[Number(e.code.slice(-1))-1].id;updateToolbar();}if(e.code==='KeyP'&&active){paused=!paused;toast(paused?'Paused. Press P to continue.':'Back to the funk.');}});addEventListener('keyup',e=>keys.delete(e.code));addEventListener('blur',()=>{keys.clear();if(active)paused=true;});

const slots=GIFT_TYPES.map((type,i)=>{
 const button=document.createElement('button');button.className=`gift-slot gift-${type.id}`;
 button.innerHTML=`${giftSvg(type.id)}<span class="quantity" aria-hidden="true"></span><span class="duration-track" aria-hidden="true"><span></span></span>`;
 button.onclick=()=>{selectedGift=type.id;if(active&&!paused&&!transition.running)toast(openPresent(world,type.id));updateToolbar();};document.querySelector('#gift-slots').append(button);return button;
});

function giftTime(kind){return kind==='sneakers'?world.player.boost:world.player.effects[kind]||0;}

function updateToolbar(){
 let visible=0;
 GIFT_TYPES.forEach((type,i)=>{
  const b=slots[i],count=world.player.inventory[type.id],timer=giftTime(type.id);
  b.hidden=count===0&&timer===0;if(!b.hidden)visible++;
  b.classList.toggle('selected',selectedGift===type.id);b.classList.toggle('powered',timer>0);
  b.disabled=!active||paused||transition.running||count===0;
  b.setAttribute('aria-pressed',String(selectedGift===type.id));
  const state=timer>0?`Active: ${Math.ceil(timer)} seconds left.`:'';
  b.setAttribute('aria-label',`${type.name}: ${count} in inventory. ${state} ${type.description}.`);
  b.title=`${i+1}: ${type.name} — ${count} in inventory. ${state} ${type.description}`;
  b.querySelector('.quantity').textContent=count>1?String(count):'';
  b.querySelector('.duration-track').hidden=timer===0;
  b.querySelector('.duration-track span').style.width=`${100*timer/type.duration}%`;
 });
 const toolbar=document.querySelector('#gift-toolbar');toolbar.hidden=visible===0;
 toolbar.classList.toggle('paused',paused||!active||transition.running);
}

function ellipse(x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
function round(x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
// Chunky hand-drawn sprites: a three-legged space explorer and eccentric Earth locals.
function pixel(x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);}
function alien(x,y,enemy=false,phase=0,kind='dancer'){
 ellipse(x,y+18,24,8,'#152c4560');c.save();if(!enemy&&world.player.effects.invisible>0)c.globalAlpha=.35;const bounce=!enemy&&world.player.effects.spring>0?-Math.abs(Math.sin(world.time*9))*28:!enemy&&world.player.effects.umbrella>0?-20:0;c.translate(Math.round(x),Math.round(y+Math.sin(world.time*7+phase)*2+bounce));
 if(!enemy&&document.querySelector('#character').value==='big'){
  pixel(-20,-15,40,30,'#f4d64b');pixel(-25,-8,50,18,'#f4d64b');pixel(-17,-31,34,20,'#eb9558');pixel(-14,-40,28,10,'#5c92d1');pixel(-24,-32,17,5,'#5c92d1');pixel(-8,-25,4,4,'#34274b');pixel(7,-25,4,4,'#34274b');pixel(-5,-15,13,3,'#7b3f43');pixel(-19,12,38,12,'#4876be');pixel(-19,23,15,7,'#fff1c8');pixel(4,23,15,7,'#fff1c8');pixel(-28,-3,8,14,'#eb9558');pixel(20,-3,8,14,'#eb9558');
 }else if(!enemy){
  pixel(-12,-29,24,34,'#ef534a');pixel(-16,-17,32,22,'#ef534a');pixel(-18,-30,34,7,'#fce354');pixel(-11,-38,23,9,'#fce354');pixel(-15,-24,31,7,'#26305a');pixel(-10,-23,7,3,'#91e4ff');pixel(5,-23,7,3,'#91e4ff');pixel(10,-12,12,6,'#ff846b');pixel(-9,-6,16,3,'#682442');
  for(const leg of [-15,-2,11]){pixel(leg,7,6,10,'#ed544d');pixel(leg-3,15,13,7,'#fff3c2');pixel(leg-3,20,13,3,'#7356a9');}
 }else if(kind==='dancer'){
  pixel(-12,-34,24,14,'#513457');pixel(-8,-30,16,18,'#edb077');pixel(-7,-12,14,15,'#edb077');pixel(-21,-10,14,5,'#edb077');pixel(7,-10,16,5,'#edb077');pixel(-11,-8,22,6,'#ee69a1');pixel(-16,1,32,15,'#58bb58');for(let i=-12;i<15;i+=7)pixel(i,4,3,13,'#f0df74');pixel(-10,16,6,8,'#edb077');pixel(5,16,6,8,'#edb077');pixel(-13,-30,27,4,'#ff78ad');
 }else if(kind==='mower'){
  pixel(-10,-40,20,7,'#e4e977');pixel(-7,-33,15,12,'#e8b583');pixel(-13,-20,26,22,'#fbf0cb');pixel(-12,-3,10,18,'#486dcb');pixel(3,-3,10,18,'#486dcb');pixel(15,-9,4,25,'#dee3e5');pixel(17,13,25,12,'#ed5f53');pixel(16,23,7,6,'#26304c');pixel(35,23,7,6,'#26304c');
 }else if(kind==='devil'){
  pixel(-14,-26,28,38,'#ef484f');pixel(-15,-35,6,13,'#f5dc93');pixel(9,-35,6,13,'#f5dc93');pixel(-8,-21,5,5,'#fff1d3');pixel(4,-21,5,5,'#fff1d3');pixel(-7,-7,14,4,'#692341');pixel(-14,12,9,10,'#b93657');pixel(5,12,9,10,'#b93657');pixel(23,-31,3,54,'#eab455');pixel(15,-32,20,4,'#f5d172');pixel(15,-41,3,13,'#f5d172');pixel(24,-44,3,15,'#f5d172');pixel(32,-41,3,13,'#f5d172');
 }else if(kind==='mailbox'){
  pixel(-4,-6,8,26,'#ded6aa');pixel(-20,-30,40,26,'#477cc3');pixel(-15,-35,30,5,'#477cc3');pixel(-15,-24,30,4,'#233750');pixel(15,-37,3,18,'#df5c62');pixel(18,-37,10,6,'#df5c62');pixel(-17,18,13,5,'#26344e');pixel(5,18,13,5,'#26344e');
 }else{
  for(let i=0;i<3;i++){const bx=Math.sin(world.time*8+i*2)*17,by=-15+Math.cos(world.time*6+i)*12;pixel(bx-5,by-6,5,5,'#d7f5ff');pixel(bx+3,by-6,5,5,'#d7f5ff');pixel(bx-6,by,16,8,'#ffe35c');pixel(bx-2,by,3,8,'#263049');pixel(bx+5,by,3,8,'#263049');}
 }
 c.restore();if(!enemy&&world.player.effects.umbrella>0){pixel(x-29,y-68,58,10,'#ff84b6');pixel(x-19,y-79,38,11,'#ffd4e5');pixel(x-2,y-59,4,36,'#fdf2c7');}if(!enemy&&world.player.effects.boombox>0){c.strokeStyle='#eacf75';c.lineWidth=2;for(const off of [0,60,120]){c.beginPath();c.arc(x,y,(world.time*100+off)%150,0,Math.PI*2);c.stroke();}}if(!enemy&&world.player.invincible>0){c.strokeStyle='#abf6ff';c.lineWidth=3;c.beginPath();c.arc(x,y-3,36,0,Math.PI*2);c.stroke();}
}
function drawGift(gift){
 const {x,y,kind}=gift;const bob=Math.sin(world.time*3+x)*3;
 ellipse(x,y+20,25,9,'#24472d60');c.save();c.translate(Math.round(x),Math.round(y+bob));
 if(kind==='sneakers'){
  pixel(-25,-13,50,30,'#713459');pixel(-23,-15,46,28,'#f06a61');pixel(-26,-18,52,7,'#ffa98b');pixel(-25,12,50,5,'#ad344f');
  for(let i=-20;i<24;i+=10)pixel(i,-10,4,4,'#ffd68c');
 }else if(kind==='snack'){
  pixel(-19,-24,38,44,'#997834');pixel(-17,-24,34,42,'#ffc95c');pixel(-20,-26,40,7,'#ffea93');
  for(let i=-13;i<18;i+=10)pixel(i,-18,4,33,'#ffed9a');
 }else if(kind==='shield'){
  pixel(-21,-21,42,39,'#284d9c');pixel(-19,-21,38,37,'#7aaaf2');pixel(-23,-25,46,8,'#bddbff');
  for(let xx=-15;xx<18;xx+=12)for(let yy=-14;yy<16;yy+=12)pixel(xx,yy,4,4,'#eee8ff');
 }
 if(!['sneakers','snack','shield'].includes(kind)){const color=GIFT_TYPES.find(t=>t.id===kind).color;pixel(-21,-20,42,38,'#432657');pixel(-19,-22,38,38,color);pixel(-23,-25,46,7,'#fff0b1');for(let i=-14;i<17;i+=10)pixel(i,-16,4,5,'#fff0b1');}
 // The same content icon is drawn on the package and its inventory slot.
 pixel(-15,-12,30,29,'#20194b');c.save();c.translate(-12,-10);c.scale(.72,.72);
 const svg=giftIcons[kind];for(const match of svg.matchAll(/<path fill="([^"]+)" d="([^"]+)"\/>/g)){c.fillStyle=match[1];c.fill(new Path2D(match[2]));}c.restore();
 c.fillStyle='#fff7bc';c.font='9px monospace';c.textAlign='center';c.fillText(GIFT_TYPES.find(t=>t.id===kind).name.toUpperCase(),0,31);c.restore();
}
function draw(){c.fillStyle=world.theme.water;c.fillRect(0,0,1200,680);for(let y=0;y<680;y+=55)for(let x=0;x<1200;x+=90){c.strokeStyle='#8999ef70';c.beginPath();const drift=Math.sin(world.time+x)*5;c.moveTo(x+drift,y);c.lineTo(x+25+drift,y);c.stroke();}const camX=world.player.x-600,camY=world.player.y-340;c.save();c.translate(-camX,-camY);
c.beginPath();world.outline.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.save();c.translate(0,25);c.fillStyle='#986140';c.strokeStyle='#986140';c.lineWidth=36;c.lineJoin='round';c.fill();c.stroke();c.restore();c.fillStyle='#f8d987';c.strokeStyle='#f8d987';c.lineJoin='round';c.lineWidth=36;c.stroke();c.fill();c.lineWidth=3;c.strokeStyle='#3d882f';c.fillStyle=world.theme.grass;c.stroke();c.fill();
for(let i=0;i<900;i++){const x=150+(i*113+world.level*59)%(world.size-300),y=150+(i*239)%(world.size-300);if(onLand(x,y,world)){c.fillStyle=i%3?'#43973588':'#e5ed6188';c.fillRect(x,y,3,5);}}
for(let i=0;i<140;i++){const x=240+(i*337)%(world.size-480),y=240+(i*491)%(world.size-480);if(onLand(x,y,world)){pixel(x,y,3,10,'#327f40');pixel(x-4,y-4,11,7,i%2?'#fff591':'#fa92c7');pixel(x,y-2,3,3,'#ffd154');}}
// Winding walking paths and a landing pad.
c.strokeStyle='#c4d56588';c.lineWidth=45;c.lineCap='round';c.beginPath();c.moveTo(world.spawn.x,world.spawn.y);c.bezierCurveTo(world.size*.4,world.size*.7,world.size*.65,world.size*.45,world.exit.x,world.exit.y);c.stroke();ellipse(world.spawn.x,world.spawn.y+30,80,35,'#768f78');c.fillStyle='#d5e1bc';c.font='bold 13px monospace';c.textAlign='center';c.fillText('CRASH SITE',world.spawn.x,world.spawn.y+35);
const exit=world.exit;ellipse(exit.x,exit.y+30,65,24,'#577564');round(exit.x-40,exit.y-40,80,80,12,'#263f4c');round(exit.x-25,exit.y-26,50,62,5,world.collected===3?'#d4f776':'#678a8b');c.fillStyle='#f5f0da';c.font='bold 12px monospace';c.fillText(world.collected===3?'BEAM UP ↑':'3 PARTS TO UNLOCK',exit.x,exit.y-57);
const objects=[...world.decor,...world.parts.filter(p=>!p.taken).map(p=>({...p,type:'part'})),...world.gifts.filter(p=>!p.taken).map(p=>({...p,type:'gift'})),...world.enemies.filter(e=>!e.defeated).map(p=>({...p,type:'enemy'})),{...world.player,type:'player'}].filter(o=>Math.abs(o.x-world.player.x)<700&&Math.abs(o.y-world.player.y)<450).sort((a,b)=>a.y-b.y);
for(const o of objects){const{x,y}=o;if(o.type==='tree'){ellipse(x,y+10,30,10,'#28533750');pixel(x-5,y-40,10,53,'#a96736');pixel(x-3,y-34,3,45,'#efbb62');for(const [dx,dy,w,h] of [[-40,-45,35,10],[-25,-58,27,12],[3,-58,28,12],[5,-45,38,10],[-40,-35,18,11],[25,-35,18,11]])pixel(x+dx,y+dy,w,h,'#247b46');pixel(x-20,y-52,39,10,'#4aa744');pixel(x-8,y-43,9,9,'#dc974e');pixel(x+4,y-41,9,9,'#dc974e');}if(o.type==='part'){const b=Math.sin(world.time*3)*5;ellipse(x,y+18,23,9,'#42674d40');ellipse(x,y-5+b,30,30,'#f9e1a330');c.save();c.translate(x,y+b);c.rotate(world.time*.4);round(-16,-14,32,28,6,'#f8ce76');round(-9,-8,18,16,3,'#677f8e');c.restore();c.fillStyle='#fff4ca';c.font='18px sans-serif';c.fillText('✦',x,y-36+b);}if(o.type==='gift')drawGift(o);if(o.type==='enemy'){alien(x,y,true,o.phase,o.kind);if(o.chasing){c.fillStyle='#ffde69';c.font='bold 22px monospace';c.fillText('!',x,y-50);}if(o.stunned>0){c.fillStyle='#ffe89e';c.font='20px monospace';c.fillText('♫',x,y-50+Math.sin(world.time*5)*5);}}if(o.type==='player')alien(x,y);}
for(const shot of world.projectiles){ellipse(shot.x,shot.y,7,6,'#fa5363');pixel(shot.x-2,shot.y-8,4,4,'#7ab83e');}c.restore();drawMap();updateToolbar();document.querySelector('#level').textContent='ISLAND '+String(world.level).padStart(2,'0')+' / '+LEVEL_COUNT;document.querySelector('#parts').textContent='SHIP PARTS '+world.collected+' / 3';document.querySelector('#health').textContent='♥ '.repeat(world.player.hp)+'♡ '.repeat(5-world.player.hp);if(paused&&active){c.fillStyle='#101b2470';c.fillRect(0,0,1200,680);c.fillStyle='#fff7df';c.font='bold 32px sans-serif';c.textAlign='center';c.fillText('PAUSED · PRESS P',600,340);}}
function end(won){active=false;overlay.style.display='flex';overlay.querySelector('.badge').textContent=won?'MISSION COMPLETE':'SIGNAL LOST';overlay.querySelector('h2').innerHTML=won?'Back to<br>the stars.':'Earth got<br>the best of you.';overlay.querySelector('p').innerHTML=won?'All thirty ship parts recovered.<br>The galaxy owes you a cosmic snack.':'Those locals are a handful.<br>Try presents for a shield or a speed boost.';play.textContent='PLAY AGAIN →';}

function drawMap(){
 const x=18,y=18,size=130,scale=size/world.size;c.save();c.translate(x,y);c.fillStyle='#172443dc';c.fillRect(-5,-5,size+10,size+35);c.fillStyle=world.theme.grass;c.beginPath();world.outline.forEach(([xx,yy],i)=>i?c.lineTo(xx*scale,yy*scale):c.moveTo(xx*scale,yy*scale));c.closePath();c.fill();for(const p of world.parts)if(!p.taken){c.fillStyle='#fff278';c.fillRect(p.x*scale-3,p.y*scale-3,6,6);}c.fillStyle=world.collected===3?'#ffffff':'#764eae';c.fillRect(world.exit.x*scale-4,world.exit.y*scale-4,8,8);c.fillStyle='#ff514b';c.fillRect(world.player.x*scale-3,world.player.y*scale-3,6,6);c.strokeStyle='#ffffff80';c.strokeRect((world.player.x-600)*scale,(world.player.y-340)*scale,1200*scale,680*scale);c.fillStyle='#ffecba';c.font='9px monospace';c.textAlign='left';c.fillText(world.theme.name.toUpperCase(),0,size+17);c.restore();
}
function beginTravel(kind){transition.start(kind);keys.clear();travel.hidden=false;travel.querySelector('h3').textContent=kind==='won'?'NEXT STOP: HOME':kind==='start'?'LANDING ON EARTH':`ELEVATOR TO ISLAND ${world.level+1}`;travel.querySelector('p').textContent=kind==='won'?'Thirty parts. One very funky escape.':'Hold tight, space cadet…';}
function animateTravel(dt){
 if(!transition.running)return;const result=transition.advance(dt);travel.style.setProperty('--door',transition.doors);travel.style.setProperty('--travel',transition.progress);travel.dataset.kind=transition.kind;
 if(result.swap&&transition.kind==='next')world=nextWorld(world);
 if(result.complete){travel.hidden=true;if(transition.kind==='won')end(true);else toast(`Island ${world.level}: ${world.theme.name}. Find three parts!`);}
}
function frame(t){
 const dt=Math.min(.05,(t-last)/1000);last=t;
 if(active&&!paused){if(transition.running)animateTravel(dt);else{
  const events=step(world,dt,{left:keys.has('KeyA')||keys.has('ArrowLeft'),right:keys.has('KeyD')||keys.has('ArrowRight'),up:keys.has('KeyW')||keys.has('ArrowUp'),down:keys.has('KeyS')||keys.has('ArrowDown')});
  for(const event of events){if(event==='next'||event==='won')beginTravel(event);else if(event==='lost')end(false);else{if(event.includes('collected!')&&world.player.inventory[selectedGift]===0)selectedGift=GIFT_TYPES.find(t=>world.player.inventory[t.id]>0)?.id||selectedGift;toast(event);}}
 }}draw();requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
