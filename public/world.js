export const SIZE=1800;
export const GIFT_TYPES=[
  {id:'sneakers',name:'Rocket sneakers',description:'Run faster for 8 seconds',color:'#ff7867'},
  {id:'snack',name:'Cosmic snack',description:'Restore two hearts',color:'#ffdc6b'},
  {id:'shield',name:'Disco shield',description:'Protection for 10 seconds',color:'#8fd5ff'}
];
export function onLand(x,y){return x>110&&y>110&&x<1690&&y<1690&&!((x<390&&y<480)||(x>1400&&y<360)||(x<310&&y>1280)||(x>1390&&y>1400));}
export function createWorld(level=1){return {level,player:{x:900,y:1450,hp:5,inventory:{sneakers:0,snack:0,shield:0},invincible:0,boost:0,effects:{shield:0,snack:0}},parts:[{x:490,y:650},{x:1250,y:500},{x:1120,y:1130}].map(p=>({...p,taken:false})),gifts:[{x:820,y:1280},{x:540,y:970},{x:1160,y:720},{x:800,y:430},{x:1380,y:1040}].map((p,i)=>({...p,kind:GIFT_TYPES[i%3].id,taken:false})),enemies:Array.from({length:4+level},(_,i)=>({x:450+(i*271)%900,y:400+(i*193)%700,phase:i*2,kind:['dancer','mower','devil','mailbox','bees'][i%5]})),exit:{x:900,y:250},time:0,collected:0,finished:false};}
export function step(w,dt,input={}){if(w.finished)return [];dt=Math.min(dt,.05);w.time+=dt;const p=w.player,events=[];p.invincible=Math.max(0,p.invincible-dt);p.boost=Math.max(0,p.boost-dt);for(const kind of ['shield','snack'])p.effects[kind]=Math.max(0,p.effects[kind]-dt);let dx=(input.right?1:0)-(input.left?1:0),dy=(input.down?1:0)-(input.up?1:0);const len=Math.hypot(dx,dy)||1,speed=p.boost>0?290:175;dx=dx/len*speed*dt;dy=dy/len*speed*dt;if(onLand(p.x+dx,p.y))p.x+=dx;if(onLand(p.x,p.y+dy))p.y+=dy;for(const part of w.parts)if(!part.taken&&Math.hypot(part.x-p.x,part.y-p.y)<45){part.taken=true;w.collected++;events.push('Ship part recovered!');}for(const gift of w.gifts)if(!gift.taken&&Math.hypot(gift.x-p.x,gift.y-p.y)<40){gift.taken=true;p.inventory[gift.kind]++;events.push(GIFT_TYPES.find(t=>t.id===gift.kind).name+' collected! Choose it in the toolbar.');}for(const e of w.enemies){const distance=Math.hypot(p.x-e.x,p.y-e.y);let ex,ey;if(distance<350){ex=(p.x-e.x)/(distance||1);ey=(p.y-e.y)/(distance||1);}else{ex=Math.cos(w.time*.6+e.phase);ey=Math.sin(w.time*.6+e.phase);}const speed=65+w.level*10;if(onLand(e.x+ex*speed*dt,e.y))e.x+=ex*speed*dt;if(onLand(e.x,e.y+ey*speed*dt))e.y+=ey*speed*dt;if(distance<36&&p.invincible===0){p.hp--;p.invincible=2;events.push('Ouch! Watch out for the locals.');if(p.hp<=0){w.finished=true;events.push('lost');}}}if(!w.finished&&w.collected===3&&Math.hypot(p.x-w.exit.x,p.y-w.exit.y)<55){w.finished=true;events.push(w.level===3?'won':'next');}return events;}
export function openPresent(w,kind='sneakers'){
  const p=w.player;
  if(w.finished||!GIFT_TYPES.some(t=>t.id===kind)||!p.inventory[kind])return 'Find this gift first!';
  p.inventory[kind]--;
  if(kind==='sneakers'){p.boost=8;return 'ROCKET SNEAKERS! Speed boost for 8 seconds.';}
  if(kind==='snack'){p.hp=Math.min(5,p.hp+2);p.effects.snack=1.5;return 'COSMIC SNACK! Health restored.';}
  p.invincible=10;p.effects.shield=10;return 'DISCO SHIELD! Invincible for 10 seconds.';
}
export function nextWorld(w){
  const next=createWorld(w.level+1);
  Object.assign(next.player,{hp:w.player.hp,inventory:{...w.player.inventory},boost:w.player.boost,invincible:w.player.invincible,effects:{...w.player.effects}});
  return next;
}
