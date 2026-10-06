export const SIZE=3200;
export const LEVEL_COUNT=10;
export const GIFT_TYPES=[
 {id:'sneakers',name:'Rocket sneakers',description:'Run faster for 8 seconds',color:'#ff7867',duration:8},
 {id:'snack',name:'Cosmic snack',description:'Restore two hearts',color:'#ffdc6b',duration:1.5},
 {id:'shield',name:'Disco shield',description:'Protection for 10 seconds',color:'#8fd5ff',duration:10},
 {id:'spring',name:'Spring shoes',description:'Bounce past enemies for 12 seconds',color:'#da9bff',duration:12},
 {id:'tomatoes',name:'Tomato launcher',description:'Auto-fire at nearby locals for 15 seconds',color:'#f44d63',duration:15},
 {id:'boombox',name:'Boom box',description:'Make nearby locals dance for 10 seconds',color:'#88d9ca',duration:10},
 {id:'invisible',name:'Invisibility',description:'Hide from locals for 10 seconds',color:'#d1ddf4',duration:10},
 {id:'teleport',name:'Doorway',description:'Warp safely toward a missing ship part',color:'#f2aa58',duration:2},
 {id:'umbrella',name:'Umbrella',description:'Float safely above locals for 12 seconds',color:'#fa85ba',duration:12}
];
export const THEMES=[
 {name:'Funky foothills',grass:'#85cb45',water:'#324fc5'},
 {name:'Bubblegum bay',grass:'#9fd06b',water:'#8c5baf'},
 {name:'Sunset shores',grass:'#c8b75c',water:'#506aab'},
 {name:'Moonlight meadow',grass:'#67b58e',water:'#23397a'},
 {name:'Electric jungle',grass:'#64bd42',water:'#285887'}
];
export function coastline(size=SIZE,level=1){const m=110,a=420+(level*73)%220,b=size-480-(level*57)%220;return [[a,m],[b,m],[b,380],[size-m,380],[size-m,size-520],[size-430,size-520],[size-430,size-m],[350+(level*37)%180,size-m],[350+(level*37)%180,size-450],[m,size-450],[m,480],[a,480]];}
export function onLand(x,y,w){const poly=w?.outline||coastline();let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)inside=!inside;}return inside;}
function random(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
export function createWorld(level=1){
 const size=SIZE+(level-1)*100,rng=random(level*7919),outline=coastline(size,level),spawn={x:size/2,y:size-350};
 const w={level,size,outline,theme:THEMES[(level-1)%THEMES.length],spawn,player:{...spawn,hp:5,inventory:Object.fromEntries(GIFT_TYPES.map(t=>[t.id,0])),invincible:0,boost:0,effects:Object.fromEntries(GIFT_TYPES.map(t=>[t.id,0])),facing:{x:0,y:-1}},parts:[],gifts:[],enemies:[],decor:[],projectiles:[],exit:{x:size/2,y:250},time:0,collected:0,finished:false,shotCooldown:0};
 function position(){for(let i=0;i<500;i++){const p={x:240+rng()*(size-480),y:240+rng()*(size-480)};if(onLand(p.x,p.y,w))return p;}return {...spawn};}
 w.parts=[{x:size*.23,y:size*.3},{x:size*.77,y:size*.26},{x:size*.72,y:size*.67}].map(p=>({...p,taken:false}));
 w.gifts=Array.from({length:18+level},(_,i)=>({...i<3?{x:spawn.x-80+i*80,y:spawn.y-170}:position(),kind:GIFT_TYPES[i%GIFT_TYPES.length].id,taken:false}));
 w.enemies=Array.from({length:7+level*2},(_,i)=>{let p=position();while(Math.hypot(p.x-spawn.x,p.y-spawn.y)<600)p=position();return {...p,home:{...p},phase:i*2,kind:['dancer','mower','devil','mailbox','bees'][i%5],triggerRadius:[145,175,160,120,190][i%5],releaseRadius:330,chasing:false,stunned:0,defeated:false};});
 w.decor=Array.from({length:240+level*8},()=>({...position(),type:'tree'}));return w;
}
export function step(w,dt,input={}){
 if(w.finished)return [];dt=Math.max(0,Math.min(dt,.05));w.time+=dt;const p=w.player,events=[];
 p.invincible=Math.max(0,p.invincible-dt);p.boost=Math.max(0,p.boost-dt);for(const kind of Object.keys(p.effects))p.effects[kind]=Math.max(0,p.effects[kind]-dt);
 let dx=(input.right?1:0)-(input.left?1:0),dy=(input.down?1:0)-(input.up?1:0);const len=Math.hypot(dx,dy)||1,speed=p.boost>0?320:p.effects.spring>0?235:185;
 if(dx||dy)p.facing={x:dx/len,y:dy/len};dx=dx/len*speed*dt;dy=dy/len*speed*dt;
 if(onLand(p.x+dx,p.y,w))p.x+=dx;if(onLand(p.x,p.y+dy,w))p.y+=dy;
 for(const part of w.parts)if(!part.taken&&Math.hypot(part.x-p.x,part.y-p.y)<45){part.taken=true;w.collected++;events.push('Ship part recovered!');}
 for(const gift of w.gifts)if(!gift.taken&&Math.hypot(gift.x-p.x,gift.y-p.y)<40){gift.taken=true;p.inventory[gift.kind]++;events.push(GIFT_TYPES.find(t=>t.id===gift.kind).name+' collected! Choose it in the toolbar.');}
 w.shotCooldown=Math.max(0,w.shotCooldown-dt);
 if(p.effects.tomatoes>0&&w.shotCooldown===0){const target=w.enemies.filter(e=>!e.defeated&&Math.hypot(e.x-p.x,e.y-p.y)<400).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];if(target){const d=Math.hypot(target.x-p.x,target.y-p.y)||1;w.projectiles.push({x:p.x,y:p.y,vx:(target.x-p.x)/d*480,vy:(target.y-p.y)/d*480,life:1.2});w.shotCooldown=.45;}}
 for(const shot of w.projectiles){shot.x+=shot.vx*dt;shot.y+=shot.vy*dt;shot.life-=dt;for(const e of w.enemies)if(!e.defeated&&shot.life>0&&Math.hypot(e.x-shot.x,e.y-shot.y)<27){e.defeated=true;shot.life=0;events.push('Tomato splat! Local sent packing.');break;}}
 w.projectiles=w.projectiles.filter(s=>s.life>0);
 for(const e of w.enemies){
  if(e.defeated)continue;e.stunned=Math.max(0,(e.stunned||0)-dt);const distance=Math.hypot(p.x-e.x,p.y-e.y),radius=e.triggerRadius??160;
  if(p.effects.boombox>0&&distance<420)e.stunned=.15;
  if(p.effects.invisible>0||e.stunned>0||distance>(e.releaseRadius??330))e.chasing=false;
  else if(distance<radius)e.chasing=true;
  if(e.stunned>0)continue;
  const home=e.home||{x:e.x,y:e.y};let ex,ey;
  if(e.chasing){ex=(p.x-e.x)/(distance||1);ey=(p.y-e.y)/(distance||1);}else{ex=Math.cos(w.time*.5+e.phase);ey=Math.sin(w.time*.5+e.phase);if(Math.hypot(e.x-home.x,e.y-home.y)>70){const d=Math.hypot(home.x-e.x,home.y-e.y)||1;ex=(home.x-e.x)/d;ey=(home.y-e.y)/d;}}
  const enemySpeed=e.chasing?75+Math.min(w.level,10)*4:23;
  if(onLand(e.x+ex*enemySpeed*dt,e.y,w))e.x+=ex*enemySpeed*dt;if(onLand(e.x,e.y+ey*enemySpeed*dt,w))e.y+=ey*enemySpeed*dt;
  const protectedPlayer=p.invincible>0||p.effects.shield>0||p.effects.spring>0||p.effects.umbrella>0||p.effects.invisible>0;
  if(distance<36&&!protectedPlayer){p.hp--;p.invincible=2;events.push('Ouch! Watch out for the locals.');if(p.hp<=0){w.finished=true;events.push('lost');}}
 }
 if(!w.finished&&w.collected===3&&Math.hypot(p.x-w.exit.x,p.y-w.exit.y)<55){w.finished=true;events.push(w.level===LEVEL_COUNT?'won':'next');}return events;
}
export function openPresent(w,kind='sneakers'){
 const p=w.player,type=GIFT_TYPES.find(t=>t.id===kind);if(w.finished||!type||!p.inventory[kind])return 'Find this gift first!';p.inventory[kind]--;p.effects[kind]=type.duration;
 if(kind==='sneakers')p.boost=type.duration;
 if(kind==='snack')p.hp=Math.min(5,p.hp+2);
 if(kind==='shield')p.invincible=type.duration;
 if(kind==='invisible')for(const e of w.enemies)e.chasing=false;
 if(kind==='teleport'){
  const target=w.parts.find(t=>!t.taken)||w.exit;
  const candidates=[{x:target.x,y:target.y+75},{x:target.x+120,y:target.y},{x:target.x-120,y:target.y},{...w.spawn}];
  const dest=candidates.find(d=>onLand(d.x,d.y,w)&&!w.enemies.some(e=>!e.defeated&&Math.hypot(e.x-d.x,e.y-d.y)<100))||w.spawn;p.x=dest.x;p.y=dest.y;p.invincible=Math.max(p.invincible,2);
 }
 return `${type.name.toUpperCase()}! ${type.description}.`;
}
export function nextWorld(w){const next=createWorld(w.level+1);Object.assign(next.player,{hp:w.player.hp,inventory:{...w.player.inventory},boost:w.player.boost,invincible:w.player.invincible,effects:{...w.player.effects}});return next;}
