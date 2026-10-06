// One clock drives both the elevator animation and the world swap.
export class LevelTransition{
 constructor(){this.elapsed=0;this.running=false;this.swapped=false;}
 start(kind='next'){this.kind=kind;this.elapsed=0;this.running=true;this.swapped=false;}
 advance(dt){if(!this.running)return {};this.elapsed+=Math.max(0,Math.min(dt,.1));const swap=!this.swapped&&this.elapsed>=1.5;if(swap)this.swapped=true;const complete=this.elapsed>=3;if(complete)this.running=false;return {swap,complete};}
 get progress(){return Math.min(1,this.elapsed/3);}
 get doors(){return this.elapsed<.8?this.elapsed/.8:this.elapsed<2.2?1:Math.max(0,(3-this.elapsed)/.8);}
}
