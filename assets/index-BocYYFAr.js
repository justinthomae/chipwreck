var xu=Object.defineProperty;var yu=(i,t,e)=>t in i?xu(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var O=(i,t,e)=>yu(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Si=Math.sqrt(3)/2,Us=.038,Zl=.002,So=.12,Mu=So*.1,Jl=Object.freeze({radius:1,pocketRadius:So,pocketInset:Mu,ropeInset:So*(Math.sqrt(3)/2),pieceRadius:Us,captainRadius:Us,shooterRadius:Us,pieceMass:1,captainMass:1,shooterMass:1,postRadius:.0117,postDistance:3*(2*Us+Zl)}),Su=Zl,ac=[{x:.5,y:-Si},{x:-.5,y:-Si},{x:-1,y:0},{x:-.5,y:Si},{x:.5,y:Si},{x:1,y:0}],bi=6;function Kl(i=Jl){Eu(i);const t=i.radius,e=t*Si,n=ac.map(l=>({x:l.x*t,y:l.y*t})),s=t-i.pocketInset,r=ac.map(l=>({x:l.x*s,y:l.y*s})),o=[],a=[];for(let l=0;l<bi;l++){const h=n[l],u=n[(l+1)%bi],d={x:(h.x+u.x)/2,y:(h.y+u.y)/2},f={x:-d.x/e,y:-d.y/e};o.push({side:l,a:h,b:u,normal:f,offset:e});const g={x:h.x+f.x*i.ropeInset,y:h.y+f.y*i.ropeInset},v=t,m={x:(u.x-h.x)/v,y:(u.y-h.y)/v},p=i.pocketRadius+i.shooterRadius+.005,w=cc(g,m,r[l],p,1,0),E=cc(g,m,r[(l+1)%bi],p,-1,v);a.push({side:l,start:{x:g.x+m.x*w,y:g.y+m.y*w},end:{x:g.x+m.x*E,y:g.y+m.y*E}})}const c=o.map(l=>({x:-l.normal.x*i.postDistance,y:-l.normal.y*i.postDistance}));return{spec:i,apothem:e,corners:n,pockets:r,rails:o,ropes:a,posts:c}}function cc(i,t,e,n,s,r){const o=e.x-i.x,a=e.y-i.y,c=o*t.x+a*t.y,l=o*o+a*a-c*c,h=n*n;return h<=l?r:c+s*Math.sqrt(h-l)}function Eu(i){const t=["radius","pocketRadius","pieceRadius","captainRadius","shooterRadius","pieceMass","captainMass","shooterMass","postRadius"];for(const e of t)if(!(Number.isFinite(i[e])&&i[e]>0))throw new Error(`BoardSpec.${e} must be a positive number`);if(!(i.ropeInset>i.shooterRadius))throw new Error("BoardSpec.ropeInset must exceed shooterRadius");if(!(i.pocketInset>=0&&i.pocketInset<i.radius/2))throw new Error("BoardSpec.pocketInset out of range");if(!(i.postDistance>=0&&i.postDistance<i.radius*.6))throw new Error("BoardSpec.postDistance out of range")}function Je(i,t){const e=i.x-t.x,n=i.y-t.y;return e*e+n*n}function rs(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s;if(r===0)return{x:t.x,y:t.y};let o=((i.x-t.x)*n+(i.y-t.y)*s)/r;return o=o<0?0:o>1?1:o,{x:t.x+n*o,y:t.y+s*o}}function wu(i,t,e){const n=e+i.spec.postRadius;for(const s of i.posts)if(Je(t,s)<n*n)return!0;return!1}function lc(i,t){const e=i.rails[t].normal;return{x:-e.x,y:-e.y}}const bu=Object.freeze({dt:1/480,friction:.7,damping:.1,restitution:.92,railRestitution:.72,chipFriction:.15,railFriction:.2,spinFriction:30,restSpeed:.004,maxSpeed:7,maxShotSpeed:5,dropTime:.045,lipRestitution:.55,lipHopSpeed:3,jumpSpeed:4.6,jumpCos:.97,popSpeed:3,maxTime:30,iterations:3}),hc=Object.freeze({light:1.1,normal:.7,heavy:.3});function Ql(i){const t={...bu,...i??{}};for(const[e,n]of Object.entries(t))if(!Number.isFinite(n))throw new Error(`PhysicsParams.${e} must be finite`);if(t.dt<=0||t.dt>1/60)throw new Error("PhysicsParams.dt must be in (0, 1/60]");for(const e of["restitution","railRestitution","lipRestitution"])if(t[e]<0||t[e]>1)throw new Error(`${e} must be in [0,1]`);if(t.chipFriction<0||t.railFriction<0||t.spinFriction<0)throw new Error("friction must be >= 0");if(t.iterations<1)throw new Error("iterations must be >= 1");if(t.maxShotSpeed>t.maxSpeed)throw new Error("maxShotSpeed must not exceed maxSpeed");return t}function Tu(i,t){const e=Math.min(i.spec.pieceRadius,i.spec.captainRadius,i.spec.shooterRadius),n=t.maxSpeed*t.dt;if(n>=e*.75)throw new Error(`Time step too large: ${n.toFixed(4)} per step vs min radius ${e}`)}class Au{constructor(t,e,n){O(this,"bodies");O(this,"pocketed",[]);O(this,"offBoard",[]);O(this,"params");O(this,"time",0);O(this,"steps",0);O(this,"timedOut",!1);this.geometry=t,this.params=Ql(n),Tu(t,this.params);const s=new Set;this.bodies=e.map(r=>{if(s.has(r.id))throw new Error(`Duplicate body id ${r.id}`);s.add(r.id);for(const c of["x","y","vx","vy","r","m"])if(!Number.isFinite(r[c]))throw new Error(`Body ${r.id}.${c} is not finite`);if(r.r<=0||r.m<=0)throw new Error(`Body ${r.id} needs positive radius and mass`);const o=r.w??0,a=r.a??0;if(!Number.isFinite(o)||!Number.isFinite(a))throw new Error(`Body ${r.id} spin is not finite`);return{id:r.id,kind:r.kind,x:r.x,y:r.y,vx:r.vx,vy:r.vy,r:r.r,m:r.m,i:.5*r.m*r.r*r.r,w:o,a,base:r.base??null,hole:null,off:!1,air:0}});for(const r of this.bodies)r.base!==null&&!s.has(r.base)&&(r.base=null),r.base!==null&&(r.vx=r.vy=r.w=0),Ru(r,this.params.maxSpeed);this.relax(this.time,[])}get atRest(){for(const t of this.bodies)if(t.vx!==0||t.vy!==0||t.w!==0)return!1;return!0}get finished(){return this.timedOut||this.atRest}relax(t,e){const n=this.params,s=this.bodies,r=(o,a,c)=>this.pinnedAgainstRail(o,a,c);for(let o=0;o<n.iterations;o++){let a=!1;for(let h=0;h<s.length;h++){const u=s[h];if(!(u.base!==null||u.off))for(let d=h+1;d<s.length;d++){const f=s[d];f.base!==null||f.off||Cu(u,f,n,t,e,o===0?r:null)&&(a=!0)}}const c=this.geometry.posts,l=this.geometry.spec.postRadius;for(const h of s)if(!(h.base!==null||h.off)){for(const u of this.geometry.rails)Pu(h,u.normal,u.offset,n,t,e)&&(a=!0);for(const u of c)Lu(h,u,l,n,t,e)&&(a=!0)}if(!a)break}}pinnedAgainstRail(t,e,n){for(const s of this.geometry.rails)if(s.normal.x*t.x+s.normal.y*t.y+s.offset<t.r+.01&&s.normal.x*e+s.normal.y*n<-.5)return!0;return!1}step(){const t=[];if(this.finished)return t;const e=this.params,n=e.dt,s=this.bodies,r=this.time+n;for(const h of s){if(h.base===null)continue;const u=s.find(d=>d.id===h.base);(!u||u.vx!==0||u.vy!==0)&&(h.base=null)}const o=e.maxSpeed/Math.min(...s.map(h=>h.r),1);for(const h of s){if(h.base!==null)continue;if(h.w!==0){const v=e.spinFriction*n;h.w>v?h.w-=v:h.w<-v?h.w+=v:h.w=0,h.w>o?h.w=o:h.w<-o&&(h.w=-o),h.a+=h.w*n}const u=h.vx*h.vx+h.vy*h.vy;if(u===0)continue;const d=Math.sqrt(u);let f=(d-e.friction*n)*(1-e.damping*n);if(f<e.restSpeed){h.vx=0,h.vy=0;continue}f>e.maxSpeed&&(f=e.maxSpeed);const g=f/d;h.vx*=g,h.vy*=g,h.x+=h.vx*n,h.y+=h.vy*n}this.relax(r,t);const a=this.geometry.pockets,c=this.geometry.spec.pocketRadius,l=c*c;for(let h=s.length-1;h>=0;h--){const u=s[h];if(u.base!==null||u.off)continue;let d=-1,f=0,g=0;for(let p=0;p<a.length;p++)if(f=u.x-a[p].x,g=u.y-a[p].y,f*f+g*g<l){d=p;break}if(d<0){u.hole=null;continue}if(r<u.air)continue;if((!u.hole||u.hole.k!==d)&&(u.hole={k:d,t:r}),r-u.hole.t>=e.dropTime-1e-12){this.pocketed.push({id:u.id,pocket:d,time:r,vx:u.vx,vy:u.vy}),s.splice(h,1);continue}const v=Math.sqrt(f*f+g*g),m=f*u.vx+g*u.vy;if(v>c-.012&&m>0&&v>0){const p=-f/v,w=-g/v,E=-(u.vx*p+u.vy*w),_=Ea(u,p,w,e.lipRestitution,e.railFriction);if(_>0&&t.push({time:r,a:u.id,b:"lip",impulse:_}),E>e.lipHopSpeed){let L=.06+(E-e.lipHopSpeed)*.05;L>.2&&(L=.2),u.air=r+L}u.hole={k:d,t:r}}}for(let h=s.length-1;h>=0;h--){const u=s[h];u.off&&(this.offBoard.push({id:u.id,time:r,x:u.x,y:u.y,vx:u.vx,vy:u.vy}),s.splice(h,1))}if(this.time=r,this.steps++,this.time>=e.maxTime&&!this.atRest){this.timedOut=!0;for(const h of s)h.vx=0,h.vy=0,h.w=0}return t}run(){for(;!this.finished;)this.step();return this}outcome(){if(!this.finished)throw new Error("Simulation has not finished");const t=new Map(this.bodies.map(r=>[r.id,r])),e=(r,o=0)=>{if(r.base===null||o>40)return 0;const a=t.get(r.base);return a?e(a,o+1)+1:0},n={};for(const r of this.bodies)n[r.id]=r.base!==null&&t.has(r.base)?{x:r.x,y:r.y,a:r.a,z:e(r),on:r.base}:{x:r.x,y:r.y,a:r.a,z:0};const s=r=>r.map((o,a)=>({e:o,i:a})).sort((o,a)=>o.e.time-a.e.time||a.i-o.i).map(({e:o})=>o);return{positions:n,pocketed:s(this.pocketed),offBoard:s(this.offBoard),time:this.time,timedOut:this.timedOut}}}function Ru(i,t){const e=i.vx*i.vx+i.vy*i.vy;if(e>t*t){const n=t/Math.sqrt(e);i.vx*=n,i.vy*=n}}function Cu(i,t,e,n,s,r){const o=t.x-i.x,a=t.y-i.y,c=i.r+t.r,l=o*o+a*a;if(l>=c*c)return!1;let h,u,d;l===0?(h=1,u=0,d=0):(d=Math.sqrt(l),h=o/d,u=a/d);const f=1/i.m,g=1/t.m,v=f+g,m=(t.vx-i.vx)*h+(t.vy-i.vy)*u;if(m<0){const E=-(1+e.restitution)*m/v;i.vx-=E*f*h,i.vy-=E*f*u,t.vx+=E*g*h,t.vy+=E*g*u;const _=-u,L=h,b=(t.vx-i.vx)*_+(t.vy-i.vy)*L-t.w*t.r-i.w*i.r,R=f+g+i.r*i.r/i.i+t.r*t.r/t.i;let C=-b/R;const M=e.chipFriction*E;C>M?C=M:C<-M&&(C=-M),i.vx-=C*f*_,i.vy-=C*f*L,t.vx+=C*g*_,t.vy+=C*g*L,i.w-=C*i.r/i.i,t.w-=C*t.r/t.i,s.push({time:n,a:i.id,b:t.id,impulse:E}),r&&-m>e.popSpeed&&(r(t,h,u)?t.off=!0:r(i,-h,-u)&&(i.off=!0))}const w=(c-d)/v;return i.x-=h*w*f,i.y-=u*w*f,t.x+=h*w*g,t.y+=u*w*g,!0}function Ea(i,t,e,n,s){const r=i.vx*t+i.vy*e;if(r>=0)return 0;const o=-(1+n)*r*i.m;i.vx+=o/i.m*t,i.vy+=o/i.m*e;const a=-e,c=t,l=i.vx*a+i.vy*c-i.w*i.r,h=1/i.m+i.r*i.r/i.i;let u=-l/h;const d=s*o;return u>d?u=d:u<-d&&(u=-d),i.vx+=u/i.m*a,i.vy+=u/i.m*c,i.w-=u*i.r/i.i,o}function Pu(i,t,e,n,s,r){const o=t.x*i.x+t.y*i.y+e;if(o>=i.r)return!1;const a=i.r-o;i.x+=t.x*a,i.y+=t.y*a;const c=i.vx*t.x+i.vy*t.y;if(c<0){const l=Math.sqrt(i.vx*i.vx+i.vy*i.vy);i.kind!=="shooter"&&-c>n.jumpSpeed&&-c>n.jumpCos*l&&(i.off=!0);const h=Ea(i,t.x,t.y,n.railRestitution,n.railFriction);r.push({time:s,a:i.id,b:null,impulse:h})}return!0}function Lu(i,t,e,n,s,r){const o=i.x-t.x,a=i.y-t.y,c=i.r+e,l=o*o+a*a;if(l>=c*c)return!1;let h=1,u=0,d=0;l>0&&(d=Math.sqrt(l),h=o/d,u=a/d);const f=c-d;i.x+=h*f,i.y+=u*f;const g=Ea(i,h,u,n.railRestitution,n.railFriction);return g>0&&r.push({time:s,a:i.id,b:"post",impulse:g}),!0}function Iu(i,t){const e=Math.abs(i)+Math.abs(t);if(e===0)return 0;const n=i/e;return t>=0?1-n:3+n}const th=["anchor-dark","anchor-dark","helm-light","helm-light","helm-light","anchor-dark","anchor-light","helm-light","helm-dark","helm-dark","helm-light","anchor-dark","anchor-light","helm-dark","chest-light",null,"anchor-dark","anchor-light","helm-dark","chest-light","chest-dark","anchor-light","anchor-light","chest-dark","helm-dark","chest-light","chest-dark","chest-dark","chest-dark","chest-light","chest-light"];function Du(i){return th.flatMap((t,e)=>t===i?[e]:[])}const Uu=["AA","WWWAA","WWWWAA","WCKAA","WCCAAC","WCCCC","CC"],Nu={A:"anchor-dark",W:"helm-dark",C:"chest-dark"};function Fu(i,t){const e=i*2+t,n=[];return Uu.forEach((s,r)=>{const o=(3-r)*Si*e;for(let a=0;a<s.length;a++){const c=(a-(s.length-1)/2)*e;n.push({x:o===0?0:-o,y:c,letter:s[a]})}}),n}function Ou(i,t=.002,e="normal"){const n=Fu(i,t),s=new Map,r=c=>{const l=Du(c),h=s.get(c)??0;return s.set(c,h+1),l[h%l.length]};if(e==="normal")return n.map((c,l)=>({x:c.x,y:c.y,type:c.letter==="K"?null:th[l],face:l}));if(e===3)return n.map((c,l)=>{if(c.letter==="K")return{x:c.x,y:c.y,type:null,face:l};const h=Nu[c.letter];return{x:c.x,y:c.y,type:h,face:r(h)}});const o=n.map((c,l)=>({p:c,i:l,ring:Math.round((c.x*c.x+c.y*c.y)*1e6),ang:Iu(c.x,c.y)})).filter(c=>c.p.letter!=="K").sort((c,l)=>c.ring-l.ring||c.ang-l.ang),a=new Map;return o.forEach((c,l)=>a.set(c.i,l%2===0?"helm-dark":"anchor-light")),n.map((c,l)=>{if(c.letter==="K")return{x:c.x,y:c.y,type:null,face:l};const h=a.get(l);return{x:c.x,y:c.y,type:h,face:r(h)}})}const Jn="shooter",Di="captain",ku=6,wa=["anchor-dark","anchor-light","helm-dark","helm-light","chest-dark","chest-light"],Cn={"anchor-dark":"Dark Anchors","anchor-light":"Light Anchors","helm-dark":"Dark Helms","helm-light":"Light Helms","chest-dark":"Dark Chests","chest-light":"Light Chests"},eh={2:2,3:3,6:"normal"},Bu=Object.freeze({1:[0],2:[0,3],3:[0,2,4],4:[0,1,3,4],5:[0,1,2,3,4],6:[0,1,2,3,4,5]});function zu(i){if(i.mode!=="versus"&&i.mode!=="coop")throw new Error(`Unknown mode ${String(i.mode)}`);const t=i.players?.length??0;if(!Number.isInteger(t)||t<1||t>ku)throw new Error("A match needs 1 to 6 players");const e=i.players.map((l,h)=>{const u={name:uc(l.name,`Player ${h+1}`),team:l.team};if(l.ai!==void 0){if(l.ai!=="easy"&&l.ai!=="medium"&&l.ai!=="hard")throw new Error(`Player ${h+1} has an unknown computer level`);u.ai=l.ai}return u});let n=(i.teams??[]).map((l,h)=>({name:uc(l.name,`Team ${h+1}`),color:l.color||"#888888"}));if(i.mode==="versus"){if(t<2)throw new Error("Versus needs at least 2 players");if(!(n.length in eh))throw new Error("Versus needs 2, 3 or 6 crews");e.forEach((l,h)=>{if(!Number.isInteger(l.team)||l.team<0||l.team>=n.length)throw new Error(`Player ${h+1} has an invalid team`)}),n.forEach((l,h)=>{if(!e.some(u=>u.team===h))throw new Error(`${n[h].name} has no players`)})}else{if(n.length===0&&(n=[{name:"Crew",color:"#e7b73c"}]),n.length!==1)throw new Error("Co-op uses a single crew");e.forEach(l=>l.team=0)}const s=i.captainFoul??"out";if(s!=="out"&&s!=="standby")throw new Error("captainFoul must be out or standby");const r=i.salt??"normal";if(!(r in hc))throw new Error("salt must be light, normal or heavy");const o={...Jl,...i.board??{}};Kl(o);const a=Ql({friction:hc[r],...i.physics??{}}),c=i.aimGuide??!0;if(typeof c!="boolean")throw new Error("aimGuide must be true or false");return{mode:i.mode,players:e,teams:n,captainFoul:s,aimGuide:c,salt:r,board:o,physics:a}}function uc(i,t){return(typeof i=="string"?i.trim().slice(0,24):"")||t}function Es(i){const t=zu(i),e=[...Bu[t.players.length]],n=Array.from({length:bi},(c,l)=>t.mode==="coop"&&l%2===1?"shark":"lifeboat"),s=t.mode==="versus"?eh[t.teams.length]:"normal",r=Ou(Math.max(t.board.pieceRadius,t.board.captainRadius),Su,s),o=new Map,a=r.map(c=>{const l={at:"board",x:c.x,y:c.y};if(c.type===null)return{id:Di,kind:"captain",type:null,face:c.face,loc:l};const h=o.get(c.type)??0;return o.set(c.type,h+1),{id:`${c.type}-${h}`,kind:"sailor",type:c.type,face:c.face,loc:l}});return a.sort((c,l)=>c.kind==="captain"?-1:l.kind==="captain"?1:0),{version:2,config:t,seats:e,pocketRoles:n,pieces:a,claims:t.teams.map(()=>null),out:t.teams.map(()=>!1),standby:null,current:0,turn:1,shotInTurn:0,pocketSeq:0,status:"playing",winner:null,pending:null,history:[],lastReport:null}}const fc=new Map;function Ge(i){const t=JSON.stringify(i.config.board);let e=fc.get(t);return e||(e=Kl(i.config.board),fc.set(t,e)),e}function ws(i){return i.config.players[i.current].team}function dc(i){return i.seats[i.current]}function je(i,t=i.current){return Ge(i).ropes[i.seats[t]]}function me(i,t){const e=i.config.board;return t==="shooter"?e.shooterRadius:t==="captain"?e.captainRadius:e.pieceRadius}function pc(i,t){const e=i.config.board;return t==="shooter"?e.shooterMass:t==="captain"?e.captainMass:e.pieceMass}function Fn(i){return i.pieces.filter(t=>t.loc.at==="board")}function ba(i,t){return t.loc.at==="pocket"&&i.pocketRoles[t.loc.pocket]==="lifeboat"}function Hu(i,t){return i.pieces.filter(e=>e.kind==="sailor"&&e.type===t&&ba(i,e)).length}function Eo(i,t){if(i.config.mode==="coop")return i.pieces.filter(n=>n.kind==="sailor"&&ba(i,n)).length;const e=i.claims[t];return e?Hu(i,e):0}function Vu(i){return i.pieces.filter(t=>t.kind==="sailor"&&t.loc.at==="pocket"&&i.pocketRoles[t.loc.pocket]==="shark").length}function Ta(i){return i.pieces.filter(t=>t.kind==="sailor").length/i.config.teams.length}function Gu(i){return i.config.mode==="versus"?Ta(i):i.pieces.filter(t=>t.kind==="sailor").length}function wr(i,t){return i.claims.indexOf(t)}function Wu(i,t){return!i.out[t]&&i.standby!==t}function nh(i,t){return i.config.mode==="versus"?i.claims[t]!==null&&Eo(i,t)>=Ta(i):!i.pieces.some(e=>e.kind==="sailor"&&e.loc.at==="board")}function Ve(i){if(i.status!=="playing"||i.pending)return!1;const t=i.pieces.find(e=>e.id===Di);return!!t&&t.loc.at==="board"&&nh(i,ws(i))}function fn(i){return i.pocketRoles.flatMap((t,e)=>t==="lifeboat"?[e]:[])}const mc=1e-6;function ds(i,t){if(!br(t))return"Shooter position is not a number";const e=je(i),n=rs(t,e.start,e.end);if(Je(n,t)>mc*mc)return"The shooter must sit on your Lifeline Rope";const s=me(i,"shooter");for(const r of Fn(i)){const o=s+me(i,r.kind);if(Je(t,r.loc)<o*o)return"The shooter is touching another chip"}return wu(Ge(i),t,s)?"The shooter is touching a peg":null}function ih(i,t){const e=je(i),n=rs(t,e.start,e.end);if(!ds(i,n))return n;const s=Math.sqrt(Je(e.start,e.end)),r=(e.end.x-e.start.x)/s,o=(e.end.y-e.start.y)/s,a=(n.x-e.start.x)*r+(n.y-e.start.y)*o,c=s/400;for(let l=1;l<=400;l++)for(const h of[a+l*c,a-l*c]){if(h<0||h>s)continue;const u={x:e.start.x+r*h,y:e.start.y+o*h};if(!ds(i,u))return u}return null}function Aa(i){const t=je(i);return ih(i,{x:(t.start.x+t.end.x)/2,y:(t.start.y+t.end.y)/2})}function qn(i,t){if(i.status!=="playing")return"The match is over";if(i.pending)return"Choose which Sailors to claim first";if(!t||!br(t.velocity))return"Shot velocity is not a number";const e=t.velocity.x*t.velocity.x+t.velocity.y*t.velocity.y;if(e===0)return"The shot has no power";const n=i.config.physics.maxShotSpeed*(1+1e-9);if(e>n*n)return"The shot is too powerful";const s=ds(i,t.shooter);if(s)return s;if(Ve(i)){if(t.calledPocket===void 0)return"Call a lifeboat for the Captain first";if(!Number.isInteger(t.calledPocket)||!fn(i).includes(t.calledPocket))return"That lifeboat cannot be called"}else if(t.calledPocket!==void 0)return"A lifeboat can only be called when beckoning the Captain";return null}function br(i){return!!i&&Number.isFinite(i.x)&&Number.isFinite(i.y)}function Xu(i,t){const e=qn(i,t);if(e)throw new Error(e);const n=Fn(i).map(s=>({id:s.id,kind:s.kind==="captain"?"captain":"piece",x:s.loc.x,y:s.loc.y,vx:0,vy:0,r:me(i,s.kind),m:pc(i,s.kind),a:s.loc.a??0,base:s.loc.on??null}));return n.push({id:Jn,kind:"shooter",x:t.shooter.x,y:t.shooter.y,vx:t.velocity.x,vy:t.velocity.y,r:me(i,"shooter"),m:pc(i,"shooter")}),n}function sh(i,t){return new Au(Ge(i),Xu(i,t),i.config.physics)}function $u(i,t){const e=sh(i,t).run().outcome();return{...rh(i,t,e),outcome:e}}function rh(i,t,e){const n=qn(i,t);if(n)throw new Error(n);qu(i,e);const s=structuredClone(i),r=s.config.mode==="versus",o=s.current,a=ws(s),c=Ve(i),l=c?t.calledPocket:null;for(const g of s.pieces){if(g.loc.at!=="board")continue;const v=e.positions[g.id];v&&(g.loc=wo(v.x,v.y,v.a,v.on))}const h={player:o,team:a,rescued:[],lost:[],ownRescued:0,claimed:null,claimOptions:null,shooterSunk:!1,shooterPocket:null,overboard:[],shooterOverboard:!1,penalty:null,captain:null,foul:null,calledPocket:l,turnContinues:!1,nextPlayer:o,status:"playing",winner:null,timedOut:e.timedOut};let u=null;for(const g of e.pocketed){if(g.id===Jn){h.shooterSunk=!0,h.shooterPocket=g.pocket;continue}const v=s.pieces.find(m=>m.id===g.id);v.loc={at:"pocket",pocket:g.pocket,order:++s.pocketSeq},v.kind==="captain"?u=g.pocket:s.pocketRoles[g.pocket]==="shark"?h.lost.push({id:v.id,pocket:g.pocket}):h.rescued.push({id:v.id,type:v.type,pocket:g.pocket,team:-1})}for(const g of e.offBoard){if(g.id===Jn){h.shooterOverboard=!0;continue}ah(s,s.pieces.find(v=>v.id===g.id)),h.overboard.push(g.id)}let d=!1,f=!1;if(u!==null&&(!r&&s.pocketRoles[u]==="shark"?(h.captain={pocket:u,result:"eaten"},s.status="lost"):c&&u===l&&!h.shooterSunk?(h.captain={pocket:u,result:"rescued"},s.status="won",s.winner=a):r&&!c?(h.captain={pocket:u,result:"foul"},d=f=!0):(h.captain={pocket:u,result:"returned"},d=!0)),r&&s.status==="playing"&&s.claims[a]===null&&!(f&&s.config.captainFoul==="out")){const g=wa.filter(v=>h.rescued.some(m=>m.type===v)&&wr(s,v)===-1);if(g.length===1)s.claims[a]=g[0],h.claimed=g[0];else if(g.length>1)return h.claimOptions=g,s.pending={report:h,captainReturned:d,foul:f},s.history.push({player:o,input:structuredClone(t)}),s.lastReport=h,{state:s,report:h}}return s.history.push({player:o,input:structuredClone(t)}),oh(s,h,d,f),{state:s,report:h}}function Ra(i,t){if(!i.pending)throw new Error("There is no claim to make");if(!(i.pending.report.claimOptions??[]).includes(t))throw new Error("That Sailor type cannot be claimed");const n=structuredClone(i),{report:s,captainReturned:r,foul:o}=n.pending;return n.pending=null,n.claims[s.team]=t,s.claimed=t,s.claimOptions=null,n.history.push({player:s.player,claim:t}),oh(n,s,r,o),{state:n,report:s}}function oh(i,t,e,n){const s=i.config.mode==="versus",r=t.team,o=i.claims[r];for(const c of t.rescued)c.team=s?wr(i,c.type):0;t.ownRescued=s?t.rescued.filter(c=>o!==null&&c.type===o).length:t.rescued.length;const a=[];if(e&&a.push(i.pieces.find(c=>c.id===Di)),t.shooterSunk&&i.status==="playing"){let c=null;for(const l of i.pieces)l.kind!=="sailor"||!ba(i,l)||s&&(o===null||l.type!==o)||(!c||c.loc.at==="pocket"&&l.loc.at==="pocket"&&l.loc.order>c.loc.order)&&(c=l);c&&(t.penalty=c.id,a.push(c))}for(const c of a)ah(i,c);if(n&&i.status==="playing"){const c=i.config.captainFoul;if(t.foul={team:r,kind:c},c==="out"){i.out[r]=!0,i.standby===r&&(i.standby=null);const l=i.out.flatMap((h,u)=>h?[]:[u]);l.length===1&&(i.status="won",i.winner=l[0])}else i.standby=r}if(i.status==="playing"){const c=s?t.ownRescued>0:t.rescued.length>0&&t.lost.length===0;t.turnContinues=c&&!t.shooterSunk&&t.captain===null,t.turnContinues?i.shotInTurn++:(i.current=ch(i,i.current),i.turn++,i.shotInTurn=0)}t.nextPlayer=i.current,t.status=i.status,t.winner=i.winner,i.lastReport=t}function wo(i,t,e,n){const s={at:"board",x:i,y:t};return e&&(s.a=e),n!==void 0&&(s.on=n),s}function ah(i,t){const e=me(i,t.kind),n=Fn(i).filter(o=>o.id!==t.id&&Math.hypot(o.loc.x,o.loc.y)<e+me(i,o.kind)-1e-9);if(n.length===0){t.loc=wo(0,0);return}const s=o=>{let a=0;for(let c=o.loc.on;c!==void 0&&a<64;a++){const l=i.pieces.find(h=>h.id===c);c=l&&l.loc.at==="board"?l.loc.on:void 0}return a};n.sort((o,a)=>s(o)-s(a)||(o.id<a.id?-1:o.id>a.id?1:0));let r;for(const o of[...n,t])o.loc=wo(0,0,o.loc.at==="board"?o.loc.a:void 0,r),r=o.id}function ch(i,t){const e=i.config.players.length;for(let n=1;n<=e;n++){const s=(t+n)%e;if(Wu(i,i.config.players[s].team))return s}return t}function qu(i,t){const e=new Set(Fn(i).map(s=>s.id));e.add(Jn);const n=new Set;for(const s of t.pocketed){if(!e.has(s.id))throw new Error(`Outcome pockets unknown piece ${s.id}`);if(n.has(s.id))throw new Error(`Outcome pockets ${s.id} twice`);if(!Number.isInteger(s.pocket)||s.pocket<0||s.pocket>=bi)throw new Error("Outcome has a bad pocket");n.add(s.id)}for(const s of t.offBoard??[]){if(!e.has(s.id))throw new Error(`Outcome throws unknown piece ${s.id} overboard`);if(n.has(s.id))throw new Error(`Outcome moves ${s.id} twice`);n.add(s.id)}for(const s of e){if(n.has(s))continue;const r=t.positions[s];if(!r||!br(r))throw new Error(`Outcome is missing a position for ${s}`)}}function Yu(i){if(i.status!=="playing")throw new Error("The match is over");if(i.pending)throw new Error("Choose which Sailors to claim first");if(Aa(i))throw new Error("The rope is not blocked");const t=structuredClone(i);return t.current=ch(t,t.current),t.turn++,t.shotInTurn=0,t.lastReport=null,t}function bo(i){const t=i;if(!t||typeof t!="object"||t.version!==2)throw new Error("Unsupported save");const e=Es(t.config);if(!Array.isArray(t.pieces)||t.pieces.length!==e.pieces.length)throw new Error("Corrupt save: pieces");const n=new Set(e.pieces.map(r=>r.id));for(const r of t.pieces){if(!n.has(r.id))throw new Error("Corrupt save: unknown piece");if(r.loc.at==="board"&&!br(r.loc))throw new Error("Corrupt save: position");if(r.loc.at==="board"&&r.loc.a!==void 0&&!Number.isFinite(r.loc.a))throw new Error("Corrupt save: angle");if(r.loc.at==="board"&&r.loc.on!==void 0&&!t.pieces.some(o=>o.id===r.loc.on&&o.loc.at==="board"))throw new Error("Corrupt save: stack");if(r.loc.at==="pocket"&&!(Number.isInteger(r.loc.pocket)&&r.loc.pocket>=0&&r.loc.pocket<bi))throw new Error("Corrupt save: pocket")}const s=e.config.teams.length;if(!Array.isArray(t.claims)||t.claims.length!==s||t.claims.some(r=>r!==null&&!wa.includes(r)))throw new Error("Corrupt save: claims");if(!Array.isArray(t.out)||t.out.length!==s)throw new Error("Corrupt save: teams");if(!Number.isInteger(t.current)||t.current<0||t.current>=e.config.players.length)throw new Error("Corrupt save: current player");return{...t,config:e.config,seats:e.seats,pocketRoles:e.pocketRoles}}const To=Object.freeze([{name:"Red Crew",color:"#e5484d"},{name:"Blue Crew",color:"#3b8be0"},{name:"Gold Crew",color:"#e7b73c"},{name:"Green Crew",color:"#3fb37f"},{name:"Purple Crew",color:"#9b6bd6"},{name:"White Crew",color:"#e8e2d4"}]);function Ao(i){const t=[],e=(n,s,r,o)=>{if(s===0){n===0&&t.push(o);return}for(let a=Math.min(n-(s-1),r);a>=1;a--)e(n-a,s-1,a,[...o,a])};for(const n of[2,3])i>=n&&e(i,n,i,[]);return i===6&&t.push([1,1,1,1,1,1]),t}function Ir(i){const t=Ao(i);if(t.length===0)return null;const e=n=>Math.max(...n)-Math.min(...n);return[...t].sort((n,s)=>e(n)-e(s)||n.length-s.length)[0]}function ju(i){return i.length===6?"6 crews of 1":i.join(" v ")}function Zu(i){return i===2?"15 Dark Helms vs 15 Light Anchors.":i===3?"10 each of Dark Anchors, Dark Helms and Dark Chests.":i===6?"The full set: each player claims one of the six symbols (5 Sailors each).":""}function lh(i){const t=[...i],e=t.reduce((s,r)=>s+r,0),n=[];for(let s=0;s<e;s++){const r=n[s-1],o=s===e-1?n[0]:void 0;let a=-1;for(const c of[!0,!1]){for(let l=0;l<t.length;l++)t[l]===0||l===r||c&&l===o||(a===-1||t[l]>t[a])&&(a=l);if(a!==-1)break}a===-1&&(a=t.findIndex(c=>c>0)),n.push(a),t[a]--}return n}function Ju(i,t=[],e={}){if(![2,3,6].includes(i.length))throw new Error("Versus needs 2, 3 or 6 crews");const s=lh(i).map((r,o)=>({name:t[o]??`Player ${o+1}`,team:r}));return{...e,mode:"versus",teams:To.slice(0,i.length).map(r=>({...r})),players:s}}function Ku(i,t=[],e={}){const n=Array.from({length:i},(s,r)=>({name:t[r]??`Player ${r+1}`,team:0}));return{...e,mode:"coop",teams:[{name:"Crew",color:"#e7b73c"}],players:n}}function Qu(i,t,e,n,s,r=4){const o=Math.hypot(n.x,n.y);if(!(o>0))return{point:{...e},distance:0,hit:null};const a=n.x/o,c=n.y/o;let l=r,h=null;for(const u of t){const d=Dr(e,a,c,u,s+u.r);if(d!==null&&d<l){l=d;const f=e.x+a*d,g=e.y+c*d,v=u.x-f,m=u.y-g,p=Math.hypot(v,m)||1;h={type:"piece",id:u.id,push:{x:v/p,y:m/p}}}}for(const u of i.rails){const d=u.normal.x*a+u.normal.y*c;if(d>=0)continue;const f=u.normal.x*e.x+u.normal.y*e.y+u.offset,g=(s-f)/d;g>=0&&g<l&&(l=g,h={type:"rail",side:u.side})}i.posts.forEach((u,d)=>{const f=Dr(e,a,c,u,s+i.spec.postRadius);f!==null&&f<l&&(l=f,h={type:"post",post:d})});for(let u=0;u<i.pockets.length;u++){const d=Dr(e,a,c,i.pockets[u],i.spec.pocketRadius);d!==null&&d<l&&(l=d,h={type:"pocket",pocket:u})}return{point:{x:e.x+a*l,y:e.y+c*l},distance:l,hit:h}}function Dr(i,t,e,n,s){const r=i.x-n.x,o=i.y-n.y,a=r*t+o*e,c=r*r+o*o-s*s;if(c<=0)return 0;if(a>=0)return null;const l=a*a-c;return l<0?null:-a-Math.sqrt(l)}const tf=["easy","medium","hard"],Ro={easy:"Easy",medium:"Medium",hard:"Hard"},ef={easy:{placements:3,sims:14,random:4,aimError:.065,powerError:.14,positional:!1,robust:!1,sloppy:3},medium:{placements:5,sims:45,random:6,aimError:.024,powerError:.06,positional:!0,robust:!1,sloppy:1},hard:{placements:9,sims:110,random:10,aimError:.006,powerError:.02,positional:!0,robust:!0,sloppy:1}};function nf(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function gc(i){const t=Math.max(1e-12,i());return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*i())}function hh(i,t){if(i.config.mode==="coop")return"any";const e=i.claims[t];if(e)return new Set([e]);const n=new Set;for(const s of Fn(i))s.type&&wr(i,s.type)===-1&&n.add(s.type);return n}function Ur(i,t,e,n){const s=(n.x-i.x)*t.x+(n.y-i.y)*t.y;if(s<=0||s>=e)return 1/0;const r=i.x+t.x*s-n.x,o=i.y+t.y*s-n.y;return Math.sqrt(r*r+o*o)}function sf(i,t,e){const n=Ge(i),s=je(i),r=ws(i),o=i.config.board,a=i.config.physics,c=me(i,"shooter"),l=a.maxShotSpeed,h=Ve(i),u=Fn(i),d=[];for(let _=0;_<t.placements;_++){const L=t.placements===1?.5:.08+.84*_/(t.placements-1),b=ih(i,{x:s.start.x+(s.end.x-s.start.x)*L,y:s.start.y+(s.end.y-s.start.y)*L});b&&!d.some(R=>Je(b,R)<1e-6)&&d.push(b)}if(d.length===0)return[];const f=h?fn(i):i.pocketRoles.flatMap((_,L)=>_==="lifeboat"?[L]:[]),g=hh(i,r),v=h?u.filter(_=>_.id===Di):u.filter(_=>_.kind==="sailor"&&(g==="any"||g.has(_.type))),m=[],p=(_,L,b,R)=>{const C=Math.sqrt(2*a.friction*(b+.05))+.35,M=_*(1+a.restitution)*o.shooterMass/(o.shooterMass+R),x=C/Math.max(.15,M);return Math.sqrt(x*x+2*a.friction*L)};for(const _ of v){const L=me(i,_.kind),b=_.kind==="captain"?o.captainMass:o.pieceMass;for(const R of f){const C=n.pockets[R],M=Math.sqrt(Je(C,_.loc)),x={x:(C.x-_.loc.x)/M,y:(C.y-_.loc.y)/M};let P=0;for(const F of u)F.id!==_.id&&Ur(_.loc,x,M,F.loc)<L+me(i,F.kind)&&P++;const z={x:_.loc.x-x.x*(L+c),y:_.loc.y-x.y*(L+c)};for(const F of d){const k=Math.sqrt(Je(z,F));if(k<1e-6)continue;const X={x:(z.x-F.x)/k,y:(z.y-F.y)/k},H=X.x*x.x+X.y*x.y;if(H<.3)continue;let et=0;for(const ct of u)ct.id!==_.id&&Ur(F,X,k,ct.loc)<c+me(i,ct.kind)&&et++;for(const ct of n.posts)Ur(F,X,k,ct)<c+o.postRadius&&et++;const $=p(H,k,M,b),at=H*3-k-M*1.5-et*2.5-P*2;for(const ct of[1,1.3,.85]){const gt=Math.min(l,$*ct),It={shooter:F,velocity:{x:X.x*gt,y:X.y*gt}};h&&(It.calledPocket=R),m.push({input:It,guess:at-Math.abs(ct-1)})}}}}m.sort((_,L)=>L.guess-_.guess);const w=m.slice(0,Math.max(0,t.sims-t.random)),E=u.length?{x:u.reduce((_,L)=>_+L.loc.x,0)/u.length,y:u.reduce((_,L)=>_+L.loc.y,0)/u.length}:{x:0,y:0};for(let _=0;_<t.random;_++){const L=d[Math.floor(e()*d.length)],R=Math.atan2(E.y-L.y,E.x-L.x)+(e()-.5)*.9,C=l*(.45+e()*.55),M={shooter:L,velocity:{x:Math.cos(R)*C,y:Math.sin(R)*C}};if(h){const x=u.find(P=>P.id===Di);M.calledPocket=f.reduce((P,z)=>Je(n.pockets[z],x.loc)<Je(n.pockets[P],x.loc)?z:P,f[0])}w.push({input:M,guess:-99})}return w}function rf(i,t){const n=Ge(i).pockets.filter((o,a)=>i.pocketRoles[a]==="lifeboat"),s=hh(i,t);let r=0;for(const o of Fn(i)){if(o.kind!=="sailor")continue;let a=1/0;for(const l of n)a=Math.min(a,Je(l,o.loc));const c=Math.max(0,1-Math.sqrt(a)/.55);s==="any"||s.has(o.type)?r+=c*6:i.config.mode==="versus"&&wr(i,o.type)>=0&&(r-=c*6)}return r}function Co(i,t,e,n){const s=e.team;if(t.status==="won")return t.config.mode==="coop"||t.winner===s?1e5:-1e5;if(t.status==="lost")return-1e5;let r=0;if(i.config.mode==="versus"){r+=e.ownRescued*100;for(const o of e.rescued)o.team!==s&&(r-=o.team>=0?70:15);e.claimed&&(r+=20)}else r+=e.rescued.length*100-e.lost.length*130;return e.shooterSunk&&(r-=90),e.penalty&&(r-=40),e.foul&&(r-=e.foul.kind==="out"?5e4:400),e.captain?.result==="returned"&&(r-=25),e.turnContinues&&(r+=45),n&&(r+=rf(t,s)*(e.turnContinues?1.4:.7)),r}function of(i,t,e=Math.random){const n=i.pending?.report.claimOptions??[];if(n.length===0)throw new Error("There is no claim to make");if(t==="easy")return n[Math.floor(e()*n.length)];let s=n[0],r=-1/0;for(const o of n){const a=Ra(i,o),c=Co(i,a.state,a.report,!0);c>r&&(r=c,s=o)}return s}function Nr(i,t,e){const n=$u(i,t);if(n.state.pending){let s=-1/0;for(const r of n.report.claimOptions??[]){const o=Ra(n.state,r);s=Math.max(s,Co(i,o.state,o.report,e.positional))}return s}return Co(i,n.state,n.report,e.positional)}function Fr(i,t,e,n){const s=Math.cos(t),r=Math.sin(t);let o=(i.velocity.x*s-i.velocity.y*r)*e,a=(i.velocity.x*r+i.velocity.y*s)*e;const c=Math.sqrt(o*o+a*a);return c>n&&(o*=n/c,a*=n/c),{...i,velocity:{x:o,y:a}}}function*af(i,t,e=Math.random){const n=ef[t],s=sf(i,n,e),r=i.config.physics.maxShotSpeed;if(s.length===0)throw new Error("No legal shot");const o=[],a=s.length+(n.robust?8:0);for(const l of s)o.push({input:l.input,score:Nr(i,l.input,n)}),yield o.length/a;if(o.sort((l,h)=>h.score-l.score),n.robust){for(const l of o.slice(0,4)){const h=Nr(i,Fr(l.input,-.012,1,r),n),u=Nr(i,Fr(l.input,.012,1,r),n);l.score=l.score*.5+(h+u)*.25,yield Math.min(1,(o.length+1)/a)}o.sort((l,h)=>h.score-l.score)}const c=o[Math.min(o.length-1,Math.floor(e()*n.sloppy))];return Fr(c.input,gc(e)*n.aimError,1+gc(e)*n.powerError,r)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ca="170",cf=0,vc=1,lf=2,uh=1,fh=2,hn=3,Un=0,Ae=1,dn=2,Ln=0,Ti=1,_c=2,xc=3,yc=4,hf=5,Xn=100,uf=101,ff=102,df=103,pf=104,mf=200,gf=201,vf=202,_f=203,Po=204,Lo=205,xf=206,yf=207,Mf=208,Sf=209,Ef=210,wf=211,bf=212,Tf=213,Af=214,Io=0,Do=1,Uo=2,Ui=3,No=4,Fo=5,Oo=6,ko=7,dh=0,Rf=1,Cf=2,In=0,Pf=1,Lf=2,If=3,ph=4,Df=5,Uf=6,Nf=7,mh=300,Ni=301,Fi=302,Bo=303,zo=304,Tr=306,_r=1e3,Yn=1001,xr=1002,qe=1003,Ff=1004,Ns=1005,Ke=1006,Or=1007,jn=1008,_n=1009,gh=1010,vh=1011,ps=1012,Pa=1013,Qn=1014,mn=1015,bs=1016,La=1017,Ia=1018,Oi=1020,_h=35902,xh=1021,yh=1022,$e=1023,Mh=1024,Sh=1025,Ai=1026,ki=1027,Eh=1028,Da=1029,wh=1030,Ua=1031,Na=1033,ur=33776,fr=33777,dr=33778,pr=33779,Ho=35840,Vo=35841,Go=35842,Wo=35843,Xo=36196,$o=37492,qo=37496,Yo=37808,jo=37809,Zo=37810,Jo=37811,Ko=37812,Qo=37813,ta=37814,ea=37815,na=37816,ia=37817,sa=37818,ra=37819,oa=37820,aa=37821,mr=36492,ca=36494,la=36495,bh=36283,ha=36284,ua=36285,fa=36286,Of=3200,kf=3201,Th=0,Bf=1,Rn="",Te="srgb",Gi="srgb-linear",Ar="linear",te="srgb",ri=7680,Mc=519,zf=512,Hf=513,Vf=514,Ah=515,Gf=516,Wf=517,Xf=518,$f=519,Sc=35044,Ec="300 es",gn=2e3,yr=2001;class Wi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let wc=1234567;const os=Math.PI/180,ms=180/Math.PI;function ii(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xe[i&255]+xe[i>>8&255]+xe[i>>16&255]+xe[i>>24&255]+"-"+xe[t&255]+xe[t>>8&255]+"-"+xe[t>>16&15|64]+xe[t>>24&255]+"-"+xe[e&63|128]+xe[e>>8&255]+"-"+xe[e>>16&255]+xe[e>>24&255]+xe[n&255]+xe[n>>8&255]+xe[n>>16&255]+xe[n>>24&255]).toLowerCase()}function ge(i,t,e){return Math.max(t,Math.min(e,i))}function Fa(i,t){return(i%t+t)%t}function qf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Yf(i,t,e){return i!==t?(e-i)/(t-i):0}function as(i,t,e){return(1-e)*i+e*t}function jf(i,t,e,n){return as(i,t,1-Math.exp(-e*n))}function Zf(i,t=1){return t-Math.abs(Fa(i,t*2)-t)}function Jf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Kf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Qf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function td(i,t){return i+Math.random()*(t-i)}function ed(i){return i*(.5-Math.random())}function nd(i){i!==void 0&&(wc=i);let t=wc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function id(i){return i*os}function sd(i){return i*ms}function rd(i){return(i&i-1)===0&&i!==0}function od(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ad(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cd(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function we(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const oi={DEG2RAD:os,RAD2DEG:ms,generateUUID:ii,clamp:ge,euclideanModulo:Fa,mapLinear:qf,inverseLerp:Yf,lerp:as,damp:jf,pingpong:Zf,smoothstep:Jf,smootherstep:Kf,randInt:Qf,randFloat:td,randFloatSpread:ed,seededRandom:nd,degToRad:id,radToDeg:sd,isPowerOfTwo:rd,ceilPowerOfTwo:od,floorPowerOfTwo:ad,setQuaternionFromProperEuler:cd,normalize:we,denormalize:yi};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zt{constructor(t,e,n,s,r,o,a,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],w=s[1],E=s[4],_=s[7],L=s[2],b=s[5],R=s[8];return r[0]=o*v+a*w+c*L,r[3]=o*m+a*E+c*b,r[6]=o*p+a*_+c*R,r[1]=l*v+h*w+u*L,r[4]=l*m+h*E+u*b,r[7]=l*p+h*_+u*R,r[2]=d*v+f*w+g*L,r[5]=d*m+f*E+g*b,r[8]=d*p+f*_+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=d*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(kr.makeScale(t,e)),this}rotate(t){return this.premultiply(kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const kr=new zt;function Rh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function gs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ld(){const i=gs("canvas");return i.style.display="block",i}const bc={};function is(i){i in bc||(bc[i]=!0,console.warn(i))}function hd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function ud(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function fd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:Gi,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===te&&(i.r=vn(i.r),i.g=vn(i.g),i.b=vn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===te&&(i.r=Ri(i.r),i.g=Ri(i.g),i.b=Ri(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Rn?Ar:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function vn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ri(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Tc=[.64,.33,.3,.6,.15,.06],Ac=[.2126,.7152,.0722],Rc=[.3127,.329],Cc=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pc=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[Gi]:{primaries:Tc,whitePoint:Rc,transfer:Ar,toXYZ:Cc,fromXYZ:Pc,luminanceCoefficients:Ac,workingColorSpaceConfig:{unpackColorSpace:Te},outputColorSpaceConfig:{drawingBufferColorSpace:Te}},[Te]:{primaries:Tc,whitePoint:Rc,transfer:te,toXYZ:Cc,fromXYZ:Pc,luminanceCoefficients:Ac,outputColorSpaceConfig:{drawingBufferColorSpace:Te}}});let ai;class dd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ai===void 0&&(ai=gs("canvas")),ai.width=t.width,ai.height=t.height;const n=ai.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ai}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=gs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=vn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vn(e[n]/255)*255):e[n]=vn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let pd=0;class Ch{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=ii(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Br(s[o].image)):r.push(Br(s[o]))}else r=Br(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Br(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?dd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let md=0;class Ee extends Wi{constructor(t=Ee.DEFAULT_IMAGE,e=Ee.DEFAULT_MAPPING,n=Yn,s=Yn,r=Ke,o=jn,a=$e,c=_n,l=Ee.DEFAULT_ANISOTROPY,h=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=ii(),this.name="",this.source=new Ch(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _r:t.x=t.x-Math.floor(t.x);break;case Yn:t.x=t.x<0?0:1;break;case xr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _r:t.y=t.y-Math.floor(t.y);break;case Yn:t.y=t.y<0?0:1;break;case xr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=mh;Ee.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,s=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,_=(f+1)/2,L=(p+1)/2,b=(h+d)/4,R=(u+v)/4,C=(g+m)/4;return E>_&&E>L?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=b/n,r=R/n):_>L?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=b/s,r=C/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=R/r,s=C/r),this.set(n,s,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-v)/w,this.z=(d-h)/w,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gd extends Wi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ee(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ch(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ti extends gd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ph extends Ee{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vd extends Ee{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*v,w=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const L=Math.sqrt(E),b=Math.atan2(L,p*w);m=Math.sin(m*b)/L,a=Math.sin(a*b)/L}const _=a*w;if(c=c*m+d*_,l=l*m+f*_,h=h*m+g*_,u=u*m+v*_,m===1-a){const L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Lc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Lc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zr.copy(this).projectOnVector(t),this.sub(zr)}reflect(t){return this.sub(zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zr=new I,Lc=new Xi;class Ts{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Be.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Be.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Be.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Be):Be.fromBufferAttribute(r,o),Be.applyMatrix4(t.matrixWorld),this.expandByPoint(Be);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Fs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fs.copy(n.boundingBox)),Fs.applyMatrix4(t.matrixWorld),this.union(Fs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Be),Be.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ji),Os.subVectors(this.max,Ji),ci.subVectors(t.a,Ji),li.subVectors(t.b,Ji),hi.subVectors(t.c,Ji),Mn.subVectors(li,ci),Sn.subVectors(hi,li),kn.subVectors(ci,hi);let e=[0,-Mn.z,Mn.y,0,-Sn.z,Sn.y,0,-kn.z,kn.y,Mn.z,0,-Mn.x,Sn.z,0,-Sn.x,kn.z,0,-kn.x,-Mn.y,Mn.x,0,-Sn.y,Sn.x,0,-kn.y,kn.x,0];return!Hr(e,ci,li,hi,Os)||(e=[1,0,0,0,1,0,0,0,1],!Hr(e,ci,li,hi,Os))?!1:(ks.crossVectors(Mn,Sn),e=[ks.x,ks.y,ks.z],Hr(e,ci,li,hi,Os))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Be).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Be).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const rn=[new I,new I,new I,new I,new I,new I,new I,new I],Be=new I,Fs=new Ts,ci=new I,li=new I,hi=new I,Mn=new I,Sn=new I,kn=new I,Ji=new I,Os=new I,ks=new I,Bn=new I;function Hr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Bn.fromArray(i,r);const a=s.x*Math.abs(Bn.x)+s.y*Math.abs(Bn.y)+s.z*Math.abs(Bn.z),c=t.dot(Bn),l=e.dot(Bn),h=n.dot(Bn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const _d=new Ts,Ki=new I,Vr=new I;class Oa{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):_d.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ki.subVectors(t,this.center);const e=Ki.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ki,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ki.copy(t.center).add(Vr)),this.expandByPoint(Ki.copy(t.center).sub(Vr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const on=new I,Gr=new I,Bs=new I,En=new I,Wr=new I,zs=new I,Xr=new I;class Lh{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,on)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=on.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(on.copy(this.origin).addScaledVector(this.direction,e),on.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Gr.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),En.copy(this.origin).sub(Gr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Bs),a=En.dot(this.direction),c=-En.dot(Bs),l=En.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Gr).addScaledVector(Bs,d),f}intersectSphere(t,e){on.subVectors(t.center,this.origin);const n=on.dot(this.direction),s=on.dot(on)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,on)!==null}intersectTriangle(t,e,n,s,r){Wr.subVectors(e,t),zs.subVectors(n,t),Xr.crossVectors(Wr,zs);let o=this.direction.dot(Xr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;En.subVectors(this.origin,t);const c=a*this.direction.dot(zs.crossVectors(En,zs));if(c<0)return null;const l=a*this.direction.dot(Wr.cross(En));if(l<0||c+l>o)return null;const h=-a*En.dot(Xr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ui.setFromMatrixColumn(t,0).length(),r=1/ui.setFromMatrixColumn(t,1).length(),o=1/ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-v*l,e[9]=-a*c,e[2]=v-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,v=l*u;e[0]=d+v*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,v=l*u;e[0]=d-v*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+v,e[1]=c*u,e[5]=v*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xd,t,yd)}lookAt(t,e,n){const s=this.elements;return Le.subVectors(t,e),Le.lengthSq()===0&&(Le.z=1),Le.normalize(),wn.crossVectors(n,Le),wn.lengthSq()===0&&(Math.abs(n.z)===1?Le.x+=1e-4:Le.z+=1e-4,Le.normalize(),wn.crossVectors(n,Le)),wn.normalize(),Hs.crossVectors(Le,wn),s[0]=wn.x,s[4]=Hs.x,s[8]=Le.x,s[1]=wn.y,s[5]=Hs.y,s[9]=Le.y,s[2]=wn.z,s[6]=Hs.z,s[10]=Le.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],w=n[3],E=n[7],_=n[11],L=n[15],b=s[0],R=s[4],C=s[8],M=s[12],x=s[1],P=s[5],z=s[9],F=s[13],k=s[2],X=s[6],H=s[10],et=s[14],$=s[3],at=s[7],ct=s[11],gt=s[15];return r[0]=o*b+a*x+c*k+l*$,r[4]=o*R+a*P+c*X+l*at,r[8]=o*C+a*z+c*H+l*ct,r[12]=o*M+a*F+c*et+l*gt,r[1]=h*b+u*x+d*k+f*$,r[5]=h*R+u*P+d*X+f*at,r[9]=h*C+u*z+d*H+f*ct,r[13]=h*M+u*F+d*et+f*gt,r[2]=g*b+v*x+m*k+p*$,r[6]=g*R+v*P+m*X+p*at,r[10]=g*C+v*z+m*H+p*ct,r[14]=g*M+v*F+m*et+p*gt,r[3]=w*b+E*x+_*k+L*$,r[7]=w*R+E*P+_*X+L*at,r[11]=w*C+E*z+_*H+L*ct,r[15]=w*M+E*F+_*et+L*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+v*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],w=u*m*l-v*d*l+v*c*f-a*m*f-u*c*p+a*d*p,E=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,_=h*v*l-g*u*l+g*a*f-o*v*f-h*a*p+o*u*p,L=g*u*c-h*v*c-g*a*d+o*v*d+h*a*m-o*u*m,b=e*w+n*E+s*_+r*L;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/b;return t[0]=w*R,t[1]=(v*d*r-u*m*r-v*s*f+n*m*f+u*s*p-n*d*p)*R,t[2]=(a*m*r-v*c*r+v*s*l-n*m*l-a*s*p+n*c*p)*R,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*R,t[4]=E*R,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*R,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*R,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*R,t[8]=_*R,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*R,t[10]=(o*v*r-g*a*r+g*n*l-e*v*l-o*n*p+e*a*p)*R,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*R,t[12]=L*R,t[13]=(h*v*s-g*u*s+g*n*d-e*v*d-h*n*m+e*u*m)*R,t[14]=(g*a*s-o*v*s-g*n*c+e*v*c+o*n*m-e*a*m)*R,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*R,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,w=c*l,E=c*h,_=c*u,L=n.x,b=n.y,R=n.z;return s[0]=(1-(v+p))*L,s[1]=(f+_)*L,s[2]=(g-E)*L,s[3]=0,s[4]=(f-_)*b,s[5]=(1-(d+p))*b,s[6]=(m+w)*b,s[7]=0,s[8]=(g+E)*R,s[9]=(m-w)*R,s[10]=(1-(d+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ui.set(s[0],s[1],s[2]).length();const o=ui.set(s[4],s[5],s[6]).length(),a=ui.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ze.copy(this);const l=1/r,h=1/o,u=1/a;return ze.elements[0]*=l,ze.elements[1]*=l,ze.elements[2]*=l,ze.elements[4]*=h,ze.elements[5]*=h,ze.elements[6]*=h,ze.elements[8]*=u,ze.elements[9]*=u,ze.elements[10]*=u,e.setFromRotationMatrix(ze),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=gn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===gn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===yr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=gn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h;let g,v;if(a===gn)g=(o+r)*u,v=-2*u;else if(a===yr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ui=new I,ze=new re,xd=new I(0,0,0),yd=new I(1,1,1),wn=new I,Hs=new I,Le=new I,Ic=new re,Dc=new Xi;class tn{constructor(t=0,e=0,n=0,s=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ic.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ic,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Dc.setFromEuler(this),this.setFromQuaternion(Dc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class ka{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Md=0;const Uc=new I,fi=new Xi,an=new re,Vs=new I,Qi=new I,Sd=new I,Ed=new Xi,Nc=new I(1,0,0),Fc=new I(0,1,0),Oc=new I(0,0,1),kc={type:"added"},wd={type:"removed"},di={type:"childadded",child:null},$r={type:"childremoved",child:null};class ve extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new I,e=new tn,n=new Xi,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new re},normalMatrix:{value:new zt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ka,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.multiply(fi),this}rotateOnWorldAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.premultiply(fi),this}rotateX(t){return this.rotateOnAxis(Nc,t)}rotateY(t){return this.rotateOnAxis(Fc,t)}rotateZ(t){return this.rotateOnAxis(Oc,t)}translateOnAxis(t,e){return Uc.copy(t).applyQuaternion(this.quaternion),this.position.add(Uc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Nc,t)}translateY(t){return this.translateOnAxis(Fc,t)}translateZ(t){return this.translateOnAxis(Oc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Vs.copy(t):Vs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Qi,Vs,this.up):an.lookAt(Vs,Qi,this.up),this.quaternion.setFromRotationMatrix(an),s&&(an.extractRotation(s.matrixWorld),fi.setFromRotationMatrix(an),this.quaternion.premultiply(fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(kc),di.child=t,this.dispatchEvent(di),di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wd),$r.child=t,this.dispatchEvent($r),$r.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),an.multiply(t.parent.matrixWorld)),t.applyMatrix4(an),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(kc),di.child=t,this.dispatchEvent(di),di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,t,Sd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,Ed,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ve.DEFAULT_UP=new I(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const He=new I,cn=new I,qr=new I,ln=new I,pi=new I,mi=new I,Bc=new I,Yr=new I,jr=new I,Zr=new I,Jr=new he,Kr=new he,Qr=new he;class Xe{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),He.subVectors(t,e),s.cross(He);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){He.subVectors(s,e),cn.subVectors(n,e),qr.subVectors(t,e);const o=He.dot(He),a=He.dot(cn),c=He.dot(qr),l=cn.dot(cn),h=cn.dot(qr),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ln.x),c.addScaledVector(o,ln.y),c.addScaledVector(a,ln.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Jr.setScalar(0),Kr.setScalar(0),Qr.setScalar(0),Jr.fromBufferAttribute(t,e),Kr.fromBufferAttribute(t,n),Qr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Jr,r.x),o.addScaledVector(Kr,r.y),o.addScaledVector(Qr,r.z),o}static isFrontFacing(t,e,n,s){return He.subVectors(n,e),cn.subVectors(t,e),He.cross(cn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return He.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),He.cross(cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Xe.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Xe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;pi.subVectors(s,n),mi.subVectors(r,n),Yr.subVectors(t,n);const c=pi.dot(Yr),l=mi.dot(Yr);if(c<=0&&l<=0)return e.copy(n);jr.subVectors(t,s);const h=pi.dot(jr),u=mi.dot(jr);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(pi,o);Zr.subVectors(t,r);const f=pi.dot(Zr),g=mi.dot(Zr);if(g>=0&&f<=g)return e.copy(r);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(mi,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Bc.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Bc,a);const p=1/(m+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(pi,o).addScaledVector(mi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ih={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bn={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function to(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Te){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=Fa(t,1),e=ge(e,0,1),n=ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=to(o,r,t+1/3),this.g=to(o,r,t),this.b=to(o,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Te){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Te){const n=Ih[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vn(t.r),this.g=vn(t.g),this.b=vn(t.b),this}copyLinearToSRGB(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Te){return qt.fromWorkingColorSpace(ye.copy(this),t),Math.round(ge(ye.r*255,0,255))*65536+Math.round(ge(ye.g*255,0,255))*256+Math.round(ge(ye.b*255,0,255))}getHexString(t=Te){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(ye.copy(this),e);const n=ye.r,s=ye.g,r=ye.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(ye.copy(this),e),t.r=ye.r,t.g=ye.g,t.b=ye.b,t}getStyle(t=Te){qt.fromWorkingColorSpace(ye.copy(this),t);const e=ye.r,n=ye.g,s=ye.b;return t!==Te?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(bn),this.setHSL(bn.h+t,bn.s+e,bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(bn),t.getHSL(Gs);const n=as(bn.h,Gs.h,e),s=as(bn.s,Gs.s,e),r=as(bn.l,Gs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ye=new Wt;Wt.NAMES=Ih;let bd=0;class As extends Wi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=ii(),this.name="",this.blending=Ti,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Po,this.blendDst=Lo,this.blendEquation=Xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Ui,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ti&&(n.blending=this.blending),this.side!==Un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Po&&(n.blendSrc=this.blendSrc),this.blendDst!==Lo&&(n.blendDst=this.blendDst),this.blendEquation!==Xn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ui&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Mr extends As{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new I,Ws=new nt;class Qe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sc,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ws.fromBufferAttribute(this,e),Ws.applyMatrix3(t),this.setXY(e,Ws.x,Ws.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=we(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yi(e,this.array)),e}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yi(e,this.array)),e}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yi(e,this.array)),e}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array),s=we(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array),s=we(s,this.array),r=we(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sc&&(t.usage=this.usage),t}}class Dh extends Qe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Uh extends Qe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends Qe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Td=0;const Ne=new re,eo=new ve,gi=new I,Ie=new Ts,ts=new Ts,pe=new I;class De extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Rh(t)?Uh:Dh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ne.makeRotationFromQuaternion(t),this.applyMatrix4(Ne),this}rotateX(t){return Ne.makeRotationX(t),this.applyMatrix4(Ne),this}rotateY(t){return Ne.makeRotationY(t),this.applyMatrix4(Ne),this}rotateZ(t){return Ne.makeRotationZ(t),this.applyMatrix4(Ne),this}translate(t,e,n){return Ne.makeTranslation(t,e,n),this.applyMatrix4(Ne),this}scale(t,e,n){return Ne.makeScale(t,e,n),this.applyMatrix4(Ne),this}lookAt(t){return eo.lookAt(t),eo.updateMatrix(),this.applyMatrix4(eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new oe(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ts);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ie.setFromBufferAttribute(r),this.morphTargetsRelative?(pe.addVectors(this.boundingBox.min,Ie.min),this.boundingBox.expandByPoint(pe),pe.addVectors(this.boundingBox.max,Ie.max),this.boundingBox.expandByPoint(pe)):(this.boundingBox.expandByPoint(Ie.min),this.boundingBox.expandByPoint(Ie.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Ie.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ts.setFromBufferAttribute(a),this.morphTargetsRelative?(pe.addVectors(Ie.min,ts.min),Ie.expandByPoint(pe),pe.addVectors(Ie.max,ts.max),Ie.expandByPoint(pe)):(Ie.expandByPoint(ts.min),Ie.expandByPoint(ts.max))}Ie.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(pe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)pe.fromBufferAttribute(a,l),c&&(gi.fromBufferAttribute(t,l),pe.add(gi)),s=Math.max(s,n.distanceToSquared(pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new I,c[C]=new I;const l=new I,h=new I,u=new I,d=new nt,f=new nt,g=new nt,v=new I,m=new I;function p(C,M,x){l.fromBufferAttribute(n,C),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,x),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[C].add(v),a[M].add(v),a[x].add(v),c[C].add(m),c[M].add(m),c[x].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let C=0,M=w.length;C<M;++C){const x=w[C],P=x.start,z=x.count;for(let F=P,k=P+z;F<k;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const E=new I,_=new I,L=new I,b=new I;function R(C){L.fromBufferAttribute(s,C),b.copy(L);const M=a[C];E.copy(M),E.sub(L.multiplyScalar(L.dot(M))).normalize(),_.crossVectors(b,M);const P=_.dot(c[C])<0?-1:1;o.setXYZW(C,E.x,E.y,E.z,P)}for(let C=0,M=w.length;C<M;++C){const x=w[C],P=x.start,z=x.count;for(let F=P,k=P+z;F<k;F+=3)R(t.getX(F+0)),R(t.getX(F+1)),R(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pe.fromBufferAttribute(t,e),pe.normalize(),t.setXYZ(e,pe.x,pe.y,pe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Qe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new De,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zc=new re,zn=new Lh,Xs=new Oa,Hc=new I,$s=new I,qs=new I,Ys=new I,no=new I,js=new I,Vc=new I,Zs=new I;class Jt extends ve{constructor(t=new De,e=new Mr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){js.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(no.fromBufferAttribute(u,t),o?js.addScaledVector(no,h):js.addScaledVector(no.sub(e),h))}e.add(js)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(r),zn.copy(t.ray).recast(t.near),!(Xs.containsPoint(zn.origin)===!1&&(zn.intersectSphere(Xs,Hc)===null||zn.origin.distanceToSquared(Hc)>(t.far-t.near)**2))&&(zc.copy(r).invert(),zn.copy(t.ray).applyMatrix4(zc),!(n.boundingBox!==null&&zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,zn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],w=Math.max(m.start,f.start),E=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=w,L=E;_<L;_+=3){const b=a.getX(_),R=a.getX(_+1),C=a.getX(_+2);s=Js(this,p,t,n,l,h,u,b,R,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const w=a.getX(m),E=a.getX(m+1),_=a.getX(m+2);s=Js(this,o,t,n,l,h,u,w,E,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],w=Math.max(m.start,f.start),E=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=w,L=E;_<L;_+=3){const b=_,R=_+1,C=_+2;s=Js(this,p,t,n,l,h,u,b,R,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const w=m,E=m+1,_=m+2;s=Js(this,o,t,n,l,h,u,w,E,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Ad(i,t,e,n,s,r,o,a){let c;if(t.side===Ae?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Un,a),c===null)return null;Zs.copy(a),Zs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Zs);return l<e.near||l>e.far?null:{distance:l,point:Zs.clone(),object:i}}function Js(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,$s),i.getVertexPosition(c,qs),i.getVertexPosition(l,Ys);const h=Ad(i,t,e,n,$s,qs,Ys,Vc);if(h){const u=new I;Xe.getBarycoord(Vc,$s,qs,Ys,u),s&&(h.uv=Xe.getInterpolatedAttribute(s,a,c,l,u,new nt)),r&&(h.uv1=Xe.getInterpolatedAttribute(r,a,c,l,u,new nt)),o&&(h.normal=Xe.getInterpolatedAttribute(o,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new I,materialIndex:0};Xe.getNormal($s,qs,Ys,d.normal),h.face=d,h.barycoord=u}return h}class Rs extends De{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(v,m,p,w,E,_,L,b,R,C,M){const x=_/R,P=L/C,z=_/2,F=L/2,k=b/2,X=R+1,H=C+1;let et=0,$=0;const at=new I;for(let ct=0;ct<H;ct++){const gt=ct*P-F;for(let It=0;It<X;It++){const $t=It*x-z;at[v]=$t*w,at[m]=gt*E,at[p]=k,l.push(at.x,at.y,at.z),at[v]=0,at[m]=0,at[p]=b>0?1:-1,h.push(at.x,at.y,at.z),u.push(It/R),u.push(1-ct/C),et+=1}}for(let ct=0;ct<C;ct++)for(let gt=0;gt<R;gt++){const It=d+gt+X*ct,$t=d+gt+X*(ct+1),Y=d+(gt+1)+X*(ct+1),st=d+(gt+1)+X*ct;c.push(It,$t,st),c.push($t,Y,st),$+=6}a.addGroup(f,$,M),f+=$,d+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Bi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function be(i){const t={};for(let e=0;e<i.length;e++){const n=Bi(i[e]);for(const s in n)t[s]=n[s]}return t}function Rd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Nh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const Cd={clone:Bi,merge:be};var Pd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ld=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nn extends As{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pd,this.fragmentShader=Ld,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Bi(t.uniforms),this.uniformsGroups=Rd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Fh extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Tn=new I,Gc=new nt,Wc=new nt;class Fe extends Fh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ms*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(os*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ms*2*Math.atan(Math.tan(os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z),Tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z)}getViewSize(t,e){return this.getViewBounds(t,Gc,Wc),e.subVectors(Wc,Gc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(os*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const vi=-90,_i=1;class Id extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Fe(vi,_i,t,e);s.layers=this.layers,this.add(s);const r=new Fe(vi,_i,t,e);r.layers=this.layers,this.add(r);const o=new Fe(vi,_i,t,e);o.layers=this.layers,this.add(o);const a=new Fe(vi,_i,t,e);a.layers=this.layers,this.add(a);const c=new Fe(vi,_i,t,e);c.layers=this.layers,this.add(c);const l=new Fe(vi,_i,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Oh extends Ee{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ni,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Dd extends ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Oh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ke}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Rs(5,5,5),r=new Nn({name:"CubemapFromEquirect",uniforms:Bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ae,blending:Ln});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===jn&&(e.minFilter=Ke),new Id(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const io=new I,Ud=new I,Nd=new zt;class An{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=io.subVectors(n,e).cross(Ud.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(io),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Nd.getNormalMatrix(t),s=this.coplanarPoint(io).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new Oa,Ks=new I;class Ba{constructor(t=new An,e=new An,n=new An,s=new An,r=new An,o=new An){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],w=s[13],E=s[14],_=s[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+o,d+h,m+g,_+w).normalize(),n[3].setComponents(c-o,d-h,m-g,_-w).normalize(),n[4].setComponents(c-a,d-u,m-v,_-E).normalize(),e===gn)n[5].setComponents(c+a,d+u,m+v,_+E).normalize();else if(e===yr)n[5].setComponents(a,u,v,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(t){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ks.x=s.normal.x>0?t.max.x:t.min.x,Ks.y=s.normal.y>0?t.max.y:t.min.y,Ks.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ks)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Fd(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Cs extends De{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const w=p*d-o;for(let E=0;E<l;E++){const _=E*u-r;g.push(_,-w,0),v.push(0,0,1),m.push(E/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<a;w++){const E=w+l*p,_=w+l*(p+1),L=w+1+l*(p+1),b=w+1+l*p;f.push(E,_,b),f.push(_,L,b)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(v,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.width,t.height,t.widthSegments,t.heightSegments)}}var Od=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$d=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,np=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,op=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ap=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dp="gl_FragColor = linearToOutputTexel( gl_FragColor );",pp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_p=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ep=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ap=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Cp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Up=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Np=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Fp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Op=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,kp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$p=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,em=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,om=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,am=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,um=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,fm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_m=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,xm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ym=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Em=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Am=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Om=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Jm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Km=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,eg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ig=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,og=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ag=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:Od,alphahash_pars_fragment:kd,alphamap_fragment:Bd,alphamap_pars_fragment:zd,alphatest_fragment:Hd,alphatest_pars_fragment:Vd,aomap_fragment:Gd,aomap_pars_fragment:Wd,batching_pars_vertex:Xd,batching_vertex:$d,begin_vertex:qd,beginnormal_vertex:Yd,bsdfs:jd,iridescence_fragment:Zd,bumpmap_pars_fragment:Jd,clipping_planes_fragment:Kd,clipping_planes_pars_fragment:Qd,clipping_planes_pars_vertex:tp,clipping_planes_vertex:ep,color_fragment:np,color_pars_fragment:ip,color_pars_vertex:sp,color_vertex:rp,common:op,cube_uv_reflection_fragment:ap,defaultnormal_vertex:cp,displacementmap_pars_vertex:lp,displacementmap_vertex:hp,emissivemap_fragment:up,emissivemap_pars_fragment:fp,colorspace_fragment:dp,colorspace_pars_fragment:pp,envmap_fragment:mp,envmap_common_pars_fragment:gp,envmap_pars_fragment:vp,envmap_pars_vertex:_p,envmap_physical_pars_fragment:Cp,envmap_vertex:xp,fog_vertex:yp,fog_pars_vertex:Mp,fog_fragment:Sp,fog_pars_fragment:Ep,gradientmap_pars_fragment:wp,lightmap_pars_fragment:bp,lights_lambert_fragment:Tp,lights_lambert_pars_fragment:Ap,lights_pars_begin:Rp,lights_toon_fragment:Pp,lights_toon_pars_fragment:Lp,lights_phong_fragment:Ip,lights_phong_pars_fragment:Dp,lights_physical_fragment:Up,lights_physical_pars_fragment:Np,lights_fragment_begin:Fp,lights_fragment_maps:Op,lights_fragment_end:kp,logdepthbuf_fragment:Bp,logdepthbuf_pars_fragment:zp,logdepthbuf_pars_vertex:Hp,logdepthbuf_vertex:Vp,map_fragment:Gp,map_pars_fragment:Wp,map_particle_fragment:Xp,map_particle_pars_fragment:$p,metalnessmap_fragment:qp,metalnessmap_pars_fragment:Yp,morphinstance_vertex:jp,morphcolor_vertex:Zp,morphnormal_vertex:Jp,morphtarget_pars_vertex:Kp,morphtarget_vertex:Qp,normal_fragment_begin:tm,normal_fragment_maps:em,normal_pars_fragment:nm,normal_pars_vertex:im,normal_vertex:sm,normalmap_pars_fragment:rm,clearcoat_normal_fragment_begin:om,clearcoat_normal_fragment_maps:am,clearcoat_pars_fragment:cm,iridescence_pars_fragment:lm,opaque_fragment:hm,packing:um,premultiplied_alpha_fragment:fm,project_vertex:dm,dithering_fragment:pm,dithering_pars_fragment:mm,roughnessmap_fragment:gm,roughnessmap_pars_fragment:vm,shadowmap_pars_fragment:_m,shadowmap_pars_vertex:xm,shadowmap_vertex:ym,shadowmask_pars_fragment:Mm,skinbase_vertex:Sm,skinning_pars_vertex:Em,skinning_vertex:wm,skinnormal_vertex:bm,specularmap_fragment:Tm,specularmap_pars_fragment:Am,tonemapping_fragment:Rm,tonemapping_pars_fragment:Cm,transmission_fragment:Pm,transmission_pars_fragment:Lm,uv_pars_fragment:Im,uv_pars_vertex:Dm,uv_vertex:Um,worldpos_vertex:Nm,background_vert:Fm,background_frag:Om,backgroundCube_vert:km,backgroundCube_frag:Bm,cube_vert:zm,cube_frag:Hm,depth_vert:Vm,depth_frag:Gm,distanceRGBA_vert:Wm,distanceRGBA_frag:Xm,equirect_vert:$m,equirect_frag:qm,linedashed_vert:Ym,linedashed_frag:jm,meshbasic_vert:Zm,meshbasic_frag:Jm,meshlambert_vert:Km,meshlambert_frag:Qm,meshmatcap_vert:tg,meshmatcap_frag:eg,meshnormal_vert:ng,meshnormal_frag:ig,meshphong_vert:sg,meshphong_frag:rg,meshphysical_vert:og,meshphysical_frag:ag,meshtoon_vert:cg,meshtoon_frag:lg,points_vert:hg,points_frag:ug,shadow_vert:fg,shadow_frag:dg,sprite_vert:pg,sprite_frag:mg},ht={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},Ze={basic:{uniforms:be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:be([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:be([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:be([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:be([ht.points,ht.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:be([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:be([ht.common,ht.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:be([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:be([ht.sprite,ht.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:be([ht.common,ht.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:be([ht.lights,ht.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Ze.physical={uniforms:be([Ze.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const Qs={r:0,b:0,g:0},Vn=new tn,gg=new re;function vg(i,t,e,n,s,r,o){const a=new Wt(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(w){let E=w.isScene===!0?w.background:null;return E&&E.isTexture&&(E=(w.backgroundBlurriness>0?e:t).get(E)),E}function v(w){let E=!1;const _=g(w);_===null?p(a,c):_&&_.isColor&&(p(_,1),E=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,E){const _=g(E);_&&(_.isCubeTexture||_.mapping===Tr)?(h===void 0&&(h=new Jt(new Rs(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:Bi(Ze.backgroundCube.uniforms),vertexShader:Ze.backgroundCube.vertexShader,fragmentShader:Ze.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Vn.copy(E.backgroundRotation),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gg.makeRotationFromEuler(Vn)),h.material.toneMapped=qt.getTransfer(_.colorSpace)!==te,(u!==_||d!==_.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Jt(new Cs(2,2),new Nn({name:"BackgroundMaterial",uniforms:Bi(Ze.background.uniforms),vertexShader:Ze.background.vertexShader,fragmentShader:Ze.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=qt.getTransfer(_.colorSpace)!==te,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function p(w,E){w.getRGB(Qs,Nh(i)),n.buffers.color.setClear(Qs.r,Qs.g,Qs.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(w,E=1){a.set(w),c=E,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,p(a,c)},render:v,addToRenderList:m}}function _g(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(x,P,z,F,k){let X=!1;const H=u(F,z,P);r!==H&&(r=H,l(r.object)),X=f(x,F,z,k),X&&g(x,F,z,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,_(x,P,z,F),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,P,z){const F=z.wireframe===!0;let k=n[x.id];k===void 0&&(k={},n[x.id]=k);let X=k[P.id];X===void 0&&(X={},k[P.id]=X);let H=X[F];return H===void 0&&(H=d(c()),X[F]=H),H}function d(x){const P=[],z=[],F=[];for(let k=0;k<e;k++)P[k]=0,z[k]=0,F[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:F,object:x,attributes:{},index:null}}function f(x,P,z,F){const k=r.attributes,X=P.attributes;let H=0;const et=z.getAttributes();for(const $ in et)if(et[$].location>=0){const ct=k[$];let gt=X[$];if(gt===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(gt=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(gt=x.instanceColor)),ct===void 0||ct.attribute!==gt||gt&&ct.data!==gt.data)return!0;H++}return r.attributesNum!==H||r.index!==F}function g(x,P,z,F){const k={},X=P.attributes;let H=0;const et=z.getAttributes();for(const $ in et)if(et[$].location>=0){let ct=X[$];ct===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor));const gt={};gt.attribute=ct,ct&&ct.data&&(gt.data=ct.data),k[$]=gt,H++}r.attributes=k,r.attributesNum=H,r.index=F}function v(){const x=r.newAttributes;for(let P=0,z=x.length;P<z;P++)x[P]=0}function m(x){p(x,0)}function p(x,P){const z=r.newAttributes,F=r.enabledAttributes,k=r.attributeDivisors;z[x]=1,F[x]===0&&(i.enableVertexAttribArray(x),F[x]=1),k[x]!==P&&(i.vertexAttribDivisor(x,P),k[x]=P)}function w(){const x=r.newAttributes,P=r.enabledAttributes;for(let z=0,F=P.length;z<F;z++)P[z]!==x[z]&&(i.disableVertexAttribArray(z),P[z]=0)}function E(x,P,z,F,k,X,H){H===!0?i.vertexAttribIPointer(x,P,z,k,X):i.vertexAttribPointer(x,P,z,F,k,X)}function _(x,P,z,F){v();const k=F.attributes,X=z.getAttributes(),H=P.defaultAttributeValues;for(const et in X){const $=X[et];if($.location>=0){let at=k[et];if(at===void 0&&(et==="instanceMatrix"&&x.instanceMatrix&&(at=x.instanceMatrix),et==="instanceColor"&&x.instanceColor&&(at=x.instanceColor)),at!==void 0){const ct=at.normalized,gt=at.itemSize,It=t.get(at);if(It===void 0)continue;const $t=It.buffer,Y=It.type,st=It.bytesPerElement,Mt=Y===i.INT||Y===i.UNSIGNED_INT||at.gpuType===Pa;if(at.isInterleavedBufferAttribute){const rt=at.data,Pt=rt.stride,Nt=at.offset;if(rt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<$.locationSize;Lt++)p($.location+Lt,rt.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Lt=0;Lt<$.locationSize;Lt++)m($.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let Lt=0;Lt<$.locationSize;Lt++)E($.location+Lt,gt/$.locationSize,Y,ct,Pt*st,(Nt+gt/$.locationSize*Lt)*st,Mt)}else{if(at.isInstancedBufferAttribute){for(let rt=0;rt<$.locationSize;rt++)p($.location+rt,at.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let rt=0;rt<$.locationSize;rt++)m($.location+rt);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let rt=0;rt<$.locationSize;rt++)E($.location+rt,gt/$.locationSize,Y,ct,gt*st,gt/$.locationSize*rt*st,Mt)}}else if(H!==void 0){const ct=H[et];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv($.location,ct);break;case 3:i.vertexAttrib3fv($.location,ct);break;case 4:i.vertexAttrib4fv($.location,ct);break;default:i.vertexAttrib1fv($.location,ct)}}}}w()}function L(){C();for(const x in n){const P=n[x];for(const z in P){const F=P[z];for(const k in F)h(F[k].object),delete F[k];delete P[z]}delete n[x]}}function b(x){if(n[x.id]===void 0)return;const P=n[x.id];for(const z in P){const F=P[z];for(const k in F)h(F[k].object),delete F[k];delete P[z]}delete n[x.id]}function R(x){for(const P in n){const z=n[P];if(z[x.id]===void 0)continue;const F=z[x.id];for(const k in F)h(F[k].object),delete F[k];delete z[x.id]}}function C(){M(),o=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:M,dispose:L,releaseStatesOfGeometry:b,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:w}}function xg(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function yg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==$e&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const C=R===bs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==_n&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==mn&&!C)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:E,maxFragmentUniforms:_,vertexTextures:L,maxSamples:b}}function Mg(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new An,a=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const w=r?0:n,E=w*4;let _=p.clippingState||null;c.value=_,_=h(g,d,E,f);for(let L=0;L!==E;++L)_[L]=e[L];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,_=f;E!==v;++E,_+=4)o.copy(u[E]).applyMatrix4(w,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Sg(i){let t=new WeakMap;function e(o,a){return a===Bo?o.mapping=Ni:a===zo&&(o.mapping=Fi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Bo||a===zo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Dd(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Bh extends Fh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ei=4,Xc=[.125,.215,.35,.446,.526,.582],$n=20,so=new Bh,$c=new Wt;let ro=null,oo=0,ao=0,co=!1;const Wn=(1+Math.sqrt(5))/2,xi=1/Wn,qc=[new I(-Wn,xi,0),new I(Wn,xi,0),new I(-xi,0,Wn),new I(xi,0,Wn),new I(0,Wn,-xi),new I(0,Wn,xi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Yc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){ro=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),ao=this._renderer.getActiveMipmapLevel(),co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ro,oo,ao),this._renderer.xr.enabled=co,t.scissorTest=!1,tr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ni||t.mapping===Fi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ro=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),ao=this._renderer.getActiveMipmapLevel(),co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:bs,format:$e,colorSpace:Gi,depthBuffer:!1},s=jc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Eg(r)),this._blurMaterial=wg(r,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,so)}_sceneToCubeUV(t,e,n,s){const a=new Fe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor($c),h.toneMapping=In,h.autoClear=!1;const f=new Mr({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),g=new Jt(new Rs,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy($c),v=!0);for(let p=0;p<6;p++){const w=p%3;w===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):w===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const E=this._cubeSize;tr(s,w*E,p>2?E:0,E,E),h.setRenderTarget(s),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ni||t.mapping===Fi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;tr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,so)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=qc[(s-r-1)%qc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Jt(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*$n-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):$n;m>$n&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$n}`);const p=[];let w=0;for(let R=0;R<$n;++R){const C=R/v,M=Math.exp(-C*C/2);p.push(M),R===0?w+=M:R<m&&(w+=2*M)}for(let R=0;R<p.length;R++)p[R]=p[R]/w;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:E}=this;d.dTheta.value=g,d.mipInt.value=E-n;const _=this._sizeLods[s],L=3*_*(s>E-Ei?s-E+Ei:0),b=4*(this._cubeSize-_);tr(e,L,b,3*_,2*_),c.setRenderTarget(e),c.render(u,so)}}function Eg(i){const t=[],e=[],n=[];let s=i;const r=i-Ei+1+Xc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Ei?c=Xc[o-i+Ei-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,w=new Float32Array(v*g*f),E=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let b=0;b<f;b++){const R=b%3*2/3-1,C=b>2?0:-1,M=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];w.set(M,v*g*b),E.set(d,m*g*b);const x=[b,b,b,b,b,b];_.set(x,p*g*b)}const L=new De;L.setAttribute("position",new Qe(w,v)),L.setAttribute("uv",new Qe(E,m)),L.setAttribute("faceIndex",new Qe(_,p)),t.push(L),s>Ei&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function jc(i,t,e){const n=new ti(i,t,e);return n.texture.mapping=Tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function tr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function wg(i,t,e){const n=new Float32Array($n),s=new I(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:$n,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Zc(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Jc(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function za(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Bo||c===zo,h=c===Ni||c===Fi;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Yc(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Yc(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Tg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&is("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ag(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const w=f.array;v=f.version;for(let E=0,_=w.length;E<_;E+=3){const L=w[E+0],b=w[E+1],R=w[E+2];d.push(L,b,b,R,R,L)}}else if(g!==void 0){const w=g.array;v=g.version;for(let E=0,_=w.length/3-1;E<_;E+=3){const L=E+0,b=E+1,R=E+2;d.push(L,b,b,R,R,L)}}else return;const m=new(Rh(d)?Uh:Dh)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Rg(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let w=0;w<g;w++)p+=f[w]*v[w];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Cg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Pg(i,t,e){const n=new WeakMap,s=new he;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let E=0;f===!0&&(E=1),g===!0&&(E=2),v===!0&&(E=3);let _=a.attributes.position.count*E,L=1;_>t.maxTextureSize&&(L=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const b=new Float32Array(_*L*4*u),R=new Ph(b,_,L,u);R.type=mn,R.needsUpdate=!0;const C=E*4;for(let x=0;x<u;x++){const P=m[x],z=p[x],F=w[x],k=_*L*4*x;for(let X=0;X<P.count;X++){const H=X*C;f===!0&&(s.fromBufferAttribute(P,X),b[k+H+0]=s.x,b[k+H+1]=s.y,b[k+H+2]=s.z,b[k+H+3]=0),g===!0&&(s.fromBufferAttribute(z,X),b[k+H+4]=s.x,b[k+H+5]=s.y,b[k+H+6]=s.z,b[k+H+7]=0),v===!0&&(s.fromBufferAttribute(F,X),b[k+H+8]=s.x,b[k+H+9]=s.y,b[k+H+10]=s.z,b[k+H+11]=F.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new nt(_,L)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Lg(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class zh extends Ee{constructor(t,e,n,s,r,o,a,c,l,h=Ai){if(h!==Ai&&h!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ai&&(n=Qn),n===void 0&&h===ki&&(n=Oi),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:qe,this.minFilter=c!==void 0?c:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Hh=new Ee,Kc=new zh(1,1),Vh=new Ph,Gh=new vd,Wh=new Oh,Qc=[],tl=[],el=new Float32Array(16),nl=new Float32Array(9),il=new Float32Array(4);function $i(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Qc[s];if(r===void 0&&(r=new Float32Array(s),Qc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function de(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Rr(i,t){let e=tl[t];e===void 0&&(e=new Int32Array(t),tl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ig(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Dg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2fv(this.addr,t),de(e,t)}}function Ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;i.uniform3fv(this.addr,t),de(e,t)}}function Ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4fv(this.addr,t),de(e,t)}}function Fg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;il.set(n),i.uniformMatrix2fv(this.addr,!1,il),de(e,n)}}function Og(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;nl.set(n),i.uniformMatrix3fv(this.addr,!1,nl),de(e,n)}}function kg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;el.set(n),i.uniformMatrix4fv(this.addr,!1,el),de(e,n)}}function Bg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2iv(this.addr,t),de(e,t)}}function Hg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3iv(this.addr,t),de(e,t)}}function Vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4iv(this.addr,t),de(e,t)}}function Gg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Wg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2uiv(this.addr,t),de(e,t)}}function Xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3uiv(this.addr,t),de(e,t)}}function $g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4uiv(this.addr,t),de(e,t)}}function qg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Kc.compareFunction=Ah,r=Kc):r=Hh,e.setTexture2D(t||r,s)}function Yg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Gh,s)}function jg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Wh,s)}function Zg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Vh,s)}function Jg(i){switch(i){case 5126:return Ig;case 35664:return Dg;case 35665:return Ug;case 35666:return Ng;case 35674:return Fg;case 35675:return Og;case 35676:return kg;case 5124:case 35670:return Bg;case 35667:case 35671:return zg;case 35668:case 35672:return Hg;case 35669:case 35673:return Vg;case 5125:return Gg;case 36294:return Wg;case 36295:return Xg;case 36296:return $g;case 35678:case 36198:case 36298:case 36306:case 35682:return qg;case 35679:case 36299:case 36307:return Yg;case 35680:case 36300:case 36308:case 36293:return jg;case 36289:case 36303:case 36311:case 36292:return Zg}}function Kg(i,t){i.uniform1fv(this.addr,t)}function Qg(i,t){const e=$i(t,this.size,2);i.uniform2fv(this.addr,e)}function tv(i,t){const e=$i(t,this.size,3);i.uniform3fv(this.addr,e)}function ev(i,t){const e=$i(t,this.size,4);i.uniform4fv(this.addr,e)}function nv(i,t){const e=$i(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function iv(i,t){const e=$i(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function sv(i,t){const e=$i(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function rv(i,t){i.uniform1iv(this.addr,t)}function ov(i,t){i.uniform2iv(this.addr,t)}function av(i,t){i.uniform3iv(this.addr,t)}function cv(i,t){i.uniform4iv(this.addr,t)}function lv(i,t){i.uniform1uiv(this.addr,t)}function hv(i,t){i.uniform2uiv(this.addr,t)}function uv(i,t){i.uniform3uiv(this.addr,t)}function fv(i,t){i.uniform4uiv(this.addr,t)}function dv(i,t,e){const n=this.cache,s=t.length,r=Rr(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Hh,r[o])}function pv(i,t,e){const n=this.cache,s=t.length,r=Rr(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Gh,r[o])}function mv(i,t,e){const n=this.cache,s=t.length,r=Rr(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Wh,r[o])}function gv(i,t,e){const n=this.cache,s=t.length,r=Rr(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Vh,r[o])}function vv(i){switch(i){case 5126:return Kg;case 35664:return Qg;case 35665:return tv;case 35666:return ev;case 35674:return nv;case 35675:return iv;case 35676:return sv;case 5124:case 35670:return rv;case 35667:case 35671:return ov;case 35668:case 35672:return av;case 35669:case 35673:return cv;case 5125:return lv;case 36294:return hv;case 36295:return uv;case 36296:return fv;case 35678:case 36198:case 36298:case 36306:case 35682:return dv;case 35679:case 36299:case 36307:return pv;case 35680:case 36300:case 36308:case 36293:return mv;case 36289:case 36303:case 36311:case 36292:return gv}}class _v{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Jg(e.type)}}class xv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=vv(e.type)}}class yv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const lo=/(\w+)(\])?(\[|\.)?/g;function sl(i,t){i.seq.push(t),i.map[t.id]=t}function Mv(i,t,e){const n=i.name,s=n.length;for(lo.lastIndex=0;;){const r=lo.exec(n),o=lo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){sl(e,l===void 0?new _v(a,i,t):new xv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new yv(a),sl(e,u)),e=u}}}class gr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Mv(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function rl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Sv=37297;let Ev=0;function wv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const ol=new zt;function bv(i){qt._getMatrix(ol,qt.workingColorSpace,i);const t=`mat3( ${ol.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case Ar:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function al(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+wv(i.getShaderSource(t),o)}else return s}function Tv(i,t){const e=bv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Av(i,t){let e;switch(t){case Pf:e="Linear";break;case Lf:e="Reinhard";break;case If:e="Cineon";break;case ph:e="ACESFilmic";break;case Uf:e="AgX";break;case Nf:e="Neutral";break;case Df:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const er=new I;function Rv(){qt.getLuminanceCoefficients(er);const i=er.x.toFixed(4),t=er.y.toFixed(4),e=er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ss).join(`
`)}function Pv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Lv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ss(i){return i!==""}function cl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ll(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Iv=/^[ \t]*#include +<([\w\d./]+)>/gm;function da(i){return i.replace(Iv,Uv)}const Dv=new Map;function Uv(i,t){let e=Vt[t];if(e===void 0){const n=Dv.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return da(e)}const Nv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hl(i){return i.replace(Nv,Fv)}function Fv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ul(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ov(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===uh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===fh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===hn&&(t="SHADOWMAP_TYPE_VSM"),t}function kv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ni:case Fi:t="ENVMAP_TYPE_CUBE";break;case Tr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Bv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fi:t="ENVMAP_MODE_REFRACTION";break}return t}function zv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case dh:t="ENVMAP_BLENDING_MULTIPLY";break;case Rf:t="ENVMAP_BLENDING_MIX";break;case Cf:t="ENVMAP_BLENDING_ADD";break}return t}function Hv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Vv(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Ov(e),l=kv(e),h=Bv(e),u=zv(e),d=Hv(e),f=Cv(e),g=Pv(r),v=s.createProgram();let m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ss).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ss).join(`
`),p.length>0&&(p+=`
`)):(m=[ul(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ss).join(`
`),p=[ul(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==In?"#define TONE_MAPPING":"",e.toneMapping!==In?Vt.tonemapping_pars_fragment:"",e.toneMapping!==In?Av("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,Tv("linearToOutputTexel",e.outputColorSpace),Rv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ss).join(`
`)),o=da(o),o=cl(o,e),o=ll(o,e),a=da(a),a=cl(a,e),a=ll(a,e),o=hl(o),a=hl(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Ec?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ec?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=w+m+o,_=w+p+a,L=rl(s,s.VERTEX_SHADER,E),b=rl(s,s.FRAGMENT_SHADER,_);s.attachShader(v,L),s.attachShader(v,b),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(P){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(v).trim(),F=s.getShaderInfoLog(L).trim(),k=s.getShaderInfoLog(b).trim();let X=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,L,b);else{const et=al(s,L,"vertex"),$=al(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+et+`
`+$)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||k==="")&&(H=!1);H&&(P.diagnostics={runnable:X,programLog:z,vertexShader:{log:F,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(L),s.deleteShader(b),C=new gr(s,v),M=Lv(s,v)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,Sv)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ev++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=b,this}let Gv=0;class Wv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Xv(t),e.set(t,n)),n}}class Xv{constructor(t){this.id=Gv++,this.code=t,this.usedTimes=0}}function $v(i,t,e,n,s,r,o){const a=new ka,c=new Wv,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,x,P,z,F){const k=z.fog,X=F.geometry,H=M.isMeshStandardMaterial?z.environment:null,et=(M.isMeshStandardMaterial?e:t).get(M.envMap||H),$=et&&et.mapping===Tr?et.image.height:null,at=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ct=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,gt=ct!==void 0?ct.length:0;let It=0;X.morphAttributes.position!==void 0&&(It=1),X.morphAttributes.normal!==void 0&&(It=2),X.morphAttributes.color!==void 0&&(It=3);let $t,Y,st,Mt;if(at){const Kt=Ze[at];$t=Kt.vertexShader,Y=Kt.fragmentShader}else $t=M.vertexShader,Y=M.fragmentShader,c.update(M),st=c.getVertexShaderID(M),Mt=c.getFragmentShaderID(M);const rt=i.getRenderTarget(),Pt=i.state.buffers.depth.getReversed(),Nt=F.isInstancedMesh===!0,Lt=F.isBatchedMesh===!0,vt=!!M.map,W=!!M.matcap,K=!!et,A=!!M.aoMap,wt=!!M.lightMap,tt=!!M.bumpMap,yt=!!M.normalMap,lt=!!M.displacementMap,Dt=!!M.emissiveMap,_t=!!M.metalnessMap,T=!!M.roughnessMap,y=M.anisotropy>0,B=M.clearcoat>0,j=M.dispersion>0,Q=M.iridescence>0,Z=M.sheen>0,bt=M.transmission>0,ut=y&&!!M.anisotropyMap,xt=B&&!!M.clearcoatMap,Gt=B&&!!M.clearcoatNormalMap,it=B&&!!M.clearcoatRoughnessMap,St=Q&&!!M.iridescenceMap,Ut=Q&&!!M.iridescenceThicknessMap,Ft=Z&&!!M.sheenColorMap,Et=Z&&!!M.sheenRoughnessMap,Xt=!!M.specularMap,Ht=!!M.specularColorMap,ee=!!M.specularIntensityMap,D=bt&&!!M.transmissionMap,ft=bt&&!!M.thicknessMap,q=!!M.gradientMap,J=!!M.alphaMap,mt=M.alphaTest>0,dt=!!M.alphaHash,kt=!!M.extensions;let ce=In;M.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(ce=i.toneMapping);const _e={shaderID:at,shaderType:M.type,shaderName:M.name,vertexShader:$t,fragmentShader:Y,defines:M.defines,customVertexShaderID:st,customFragmentShaderID:Mt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Lt,batchingColor:Lt&&F._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&F.instanceColor!==null,instancingMorph:Nt&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Gi,alphaToCoverage:!!M.alphaToCoverage,map:vt,matcap:W,envMap:K,envMapMode:K&&et.mapping,envMapCubeUVHeight:$,aoMap:A,lightMap:wt,bumpMap:tt,normalMap:yt,displacementMap:d&&lt,emissiveMap:Dt,normalMapObjectSpace:yt&&M.normalMapType===Bf,normalMapTangentSpace:yt&&M.normalMapType===Th,metalnessMap:_t,roughnessMap:T,anisotropy:y,anisotropyMap:ut,clearcoat:B,clearcoatMap:xt,clearcoatNormalMap:Gt,clearcoatRoughnessMap:it,dispersion:j,iridescence:Q,iridescenceMap:St,iridescenceThicknessMap:Ut,sheen:Z,sheenColorMap:Ft,sheenRoughnessMap:Et,specularMap:Xt,specularColorMap:Ht,specularIntensityMap:ee,transmission:bt,transmissionMap:D,thicknessMap:ft,gradientMap:q,opaque:M.transparent===!1&&M.blending===Ti&&M.alphaToCoverage===!1,alphaMap:J,alphaTest:mt,alphaHash:dt,combine:M.combine,mapUv:vt&&v(M.map.channel),aoMapUv:A&&v(M.aoMap.channel),lightMapUv:wt&&v(M.lightMap.channel),bumpMapUv:tt&&v(M.bumpMap.channel),normalMapUv:yt&&v(M.normalMap.channel),displacementMapUv:lt&&v(M.displacementMap.channel),emissiveMapUv:Dt&&v(M.emissiveMap.channel),metalnessMapUv:_t&&v(M.metalnessMap.channel),roughnessMapUv:T&&v(M.roughnessMap.channel),anisotropyMapUv:ut&&v(M.anisotropyMap.channel),clearcoatMapUv:xt&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Gt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Et&&v(M.sheenRoughnessMap.channel),specularMapUv:Xt&&v(M.specularMap.channel),specularColorMapUv:Ht&&v(M.specularColorMap.channel),specularIntensityMapUv:ee&&v(M.specularIntensityMap.channel),transmissionMapUv:D&&v(M.transmissionMap.channel),thicknessMapUv:ft&&v(M.thicknessMap.channel),alphaMapUv:J&&v(M.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(yt||y),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(vt||J),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Pt,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:It,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ce,decodeVideoTexture:vt&&M.map.isVideoTexture===!0&&qt.getTransfer(M.map.colorSpace)===te,decodeVideoTextureEmissive:Dt&&M.emissiveMap.isVideoTexture===!0&&qt.getTransfer(M.emissiveMap.colorSpace)===te,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===dn,flipSided:M.side===Ae,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:kt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&M.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return _e.vertexUv1s=l.has(1),_e.vertexUv2s=l.has(2),_e.vertexUv3s=l.has(3),l.clear(),_e}function p(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)x.push(P),x.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(w(x,M),E(x,M),x.push(i.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function w(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function E(M,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){const x=g[M.type];let P;if(x){const z=Ze[x];P=Cd.clone(z.uniforms)}else P=M.uniforms;return P}function L(M,x){let P;for(let z=0,F=h.length;z<F;z++){const k=h[z];if(k.cacheKey===x){P=k,++P.usedTimes;break}}return P===void 0&&(P=new Vv(i,x,M,r),h.push(P)),P}function b(M){if(--M.usedTimes===0){const x=h.indexOf(M);h[x]=h[h.length-1],h.pop(),M.destroy()}}function R(M){c.remove(M)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:L,releaseProgram:b,releaseShaderCache:R,programs:h,dispose:C}}function qv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Yv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function fl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function dl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Yv),n.length>1&&n.sort(d||fl),s.length>1&&s.sort(d||fl)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function jv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new dl,i.set(n,[o])):s>=r.length?(o=new dl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Zv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Wt};break;case"SpotLight":e={position:new I,direction:new I,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function Jv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Kv=0;function Qv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function t_(i){const t=new Zv,e=Jv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new re,o=new re;function a(l){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,w=0,E=0,_=0,L=0,b=0,R=0;l.sort(Qv);for(let M=0,x=l.length;M<x;M++){const P=l[M],z=P.color,F=P.intensity,k=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=z.r*F,u+=z.g*F,d+=z.b*F;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],F);R++}else if(P.isDirectionalLight){const H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const et=P.shadow,$=e.get(P);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=P.shadow.matrix,w++}n.directional[f]=H,f++}else if(P.isSpotLight){const H=t.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(z).multiplyScalar(F),H.distance=k,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[v]=H;const et=P.shadow;if(P.map&&(n.spotLightMap[L]=P.map,L++,et.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[v]=et.matrix,P.castShadow){const $=e.get(P);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,n.spotShadow[v]=$,n.spotShadowMap[v]=X,_++}v++}else if(P.isRectAreaLight){const H=t.get(P);H.color.copy(z).multiplyScalar(F),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=H,m++}else if(P.isPointLight){const H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const et=P.shadow,$=e.get(P);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,$.shadowCameraNear=et.camera.near,$.shadowCameraFar=et.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=H,g++}else if(P.isHemisphereLight){const H=t.get(P);H.skyColor.copy(P.color).multiplyScalar(F),H.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==w||C.numPointShadows!==E||C.numSpotShadows!==_||C.numSpotMaps!==L||C.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=_+L-b,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=R,C.directionalLength=f,C.pointLength=g,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=w,C.numPointShadows=E,C.numSpotShadows=_,C.numSpotMaps=L,C.numLightProbes=R,n.version=Kv++)}function c(l,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,w=l.length;p<w;p++){const E=l[p];if(E.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(E.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(E.width*.5,0,0),_.halfHeight.set(0,E.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(E.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function pl(i){const t=new t_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function e_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new pl(i),t.set(s,[a])):r>=o.length?(a=new pl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class n_ extends As{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Of,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class i_ extends As{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const s_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function o_(i,t,e){let n=new Ba;const s=new nt,r=new nt,o=new he,a=new n_({depthPacking:kf}),c=new i_,l={},h=e.maxTextureSize,u={[Un]:Ae,[Ae]:Un,[dn]:dn},d=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:s_,fragmentShader:r_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new De;g.setAttribute("position",new Qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Jt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uh;let p=this.type;this.render=function(b,R,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const M=i.getRenderTarget(),x=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Ln),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const F=p!==hn&&this.type===hn,k=p===hn&&this.type!==hn;for(let X=0,H=b.length;X<H;X++){const et=b[X],$=et.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const at=$.getFrameExtents();if(s.multiply(at),r.copy($.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/at.x),s.x=r.x*at.x,$.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/at.y),s.y=r.y*at.y,$.mapSize.y=r.y)),$.map===null||F===!0||k===!0){const gt=this.type!==hn?{minFilter:qe,magFilter:qe}:{};$.map!==null&&$.map.dispose(),$.map=new ti(s.x,s.y,gt),$.map.texture.name=et.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();const ct=$.getViewportCount();for(let gt=0;gt<ct;gt++){const It=$.getViewport(gt);o.set(r.x*It.x,r.y*It.y,r.x*It.z,r.y*It.w),z.viewport(o),$.updateMatrices(et,gt),n=$.getFrustum(),_(R,C,$.camera,et,this.type)}$.isPointLightShadow!==!0&&this.type===hn&&w($,C),$.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,x,P)};function w(b,R){const C=t.update(v);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ti(s.x,s.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,C,d,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,C,f,v,null)}function E(b,R,C,M){let x=null;const P=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)x=P;else if(x=C.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const z=x.uuid,F=R.uuid;let k=l[z];k===void 0&&(k={},l[z]=k);let X=k[F];X===void 0&&(X=x.clone(),k[F]=X,R.addEventListener("dispose",L)),x=X}if(x.visible=R.visible,x.wireframe=R.wireframe,M===hn?x.side=R.shadowSide!==null?R.shadowSide:R.side:x.side=R.shadowSide!==null?R.shadowSide:u[R.side],x.alphaMap=R.alphaMap,x.alphaTest=R.alphaTest,x.map=R.map,x.clipShadows=R.clipShadows,x.clippingPlanes=R.clippingPlanes,x.clipIntersection=R.clipIntersection,x.displacementMap=R.displacementMap,x.displacementScale=R.displacementScale,x.displacementBias=R.displacementBias,x.wireframeLinewidth=R.wireframeLinewidth,x.linewidth=R.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const z=i.properties.get(x);z.light=C}return x}function _(b,R,C,M,x){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&x===hn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const F=t.update(b),k=b.material;if(Array.isArray(k)){const X=F.groups;for(let H=0,et=X.length;H<et;H++){const $=X[H],at=k[$.materialIndex];if(at&&at.visible){const ct=E(b,at,M,x);b.onBeforeShadow(i,b,R,C,F,ct,$),i.renderBufferDirect(C,null,F,ct,b,$),b.onAfterShadow(i,b,R,C,F,ct,$)}}}else if(k.visible){const X=E(b,k,M,x);b.onBeforeShadow(i,b,R,C,F,X,null),i.renderBufferDirect(C,null,F,X,b,null),b.onAfterShadow(i,b,R,C,F,X,null)}}const z=b.children;for(let F=0,k=z.length;F<k;F++)_(z[F],R,C,M,x)}function L(b){b.target.removeEventListener("dispose",L);for(const C in l){const M=l[C],x=b.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}const a_={[Io]:Do,[Uo]:Oo,[No]:ko,[Ui]:Fo,[Do]:Io,[Oo]:Uo,[ko]:No,[Fo]:Ui};function c_(i,t){function e(){let D=!1;const ft=new he;let q=null;const J=new he(0,0,0,0);return{setMask:function(mt){q!==mt&&!D&&(i.colorMask(mt,mt,mt,mt),q=mt)},setLocked:function(mt){D=mt},setClear:function(mt,dt,kt,ce,_e){_e===!0&&(mt*=ce,dt*=ce,kt*=ce),ft.set(mt,dt,kt,ce),J.equals(ft)===!1&&(i.clearColor(mt,dt,kt,ce),J.copy(ft))},reset:function(){D=!1,q=null,J.set(-1,0,0,0)}}}function n(){let D=!1,ft=!1,q=null,J=null,mt=null;return{setReversed:function(dt){if(ft!==dt){const kt=t.get("EXT_clip_control");ft?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT);const ce=mt;mt=null,this.setClear(ce)}ft=dt},getReversed:function(){return ft},setTest:function(dt){dt?rt(i.DEPTH_TEST):Pt(i.DEPTH_TEST)},setMask:function(dt){q!==dt&&!D&&(i.depthMask(dt),q=dt)},setFunc:function(dt){if(ft&&(dt=a_[dt]),J!==dt){switch(dt){case Io:i.depthFunc(i.NEVER);break;case Do:i.depthFunc(i.ALWAYS);break;case Uo:i.depthFunc(i.LESS);break;case Ui:i.depthFunc(i.LEQUAL);break;case No:i.depthFunc(i.EQUAL);break;case Fo:i.depthFunc(i.GEQUAL);break;case Oo:i.depthFunc(i.GREATER);break;case ko:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=dt}},setLocked:function(dt){D=dt},setClear:function(dt){mt!==dt&&(ft&&(dt=1-dt),i.clearDepth(dt),mt=dt)},reset:function(){D=!1,q=null,J=null,mt=null,ft=!1}}}function s(){let D=!1,ft=null,q=null,J=null,mt=null,dt=null,kt=null,ce=null,_e=null;return{setTest:function(Kt){D||(Kt?rt(i.STENCIL_TEST):Pt(i.STENCIL_TEST))},setMask:function(Kt){ft!==Kt&&!D&&(i.stencilMask(Kt),ft=Kt)},setFunc:function(Kt,Oe,nn){(q!==Kt||J!==Oe||mt!==nn)&&(i.stencilFunc(Kt,Oe,nn),q=Kt,J=Oe,mt=nn)},setOp:function(Kt,Oe,nn){(dt!==Kt||kt!==Oe||ce!==nn)&&(i.stencilOp(Kt,Oe,nn),dt=Kt,kt=Oe,ce=nn)},setLocked:function(Kt){D=Kt},setClear:function(Kt){_e!==Kt&&(i.clearStencil(Kt),_e=Kt)},reset:function(){D=!1,ft=null,q=null,J=null,mt=null,dt=null,kt=null,ce=null,_e=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,w=null,E=null,_=null,L=null,b=null,R=new Wt(0,0,0),C=0,M=!1,x=null,P=null,z=null,F=null,k=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,et=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec($)[1]),H=et>=1):$.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),H=et>=2);let at=null,ct={};const gt=i.getParameter(i.SCISSOR_BOX),It=i.getParameter(i.VIEWPORT),$t=new he().fromArray(gt),Y=new he().fromArray(It);function st(D,ft,q,J){const mt=new Uint8Array(4),dt=i.createTexture();i.bindTexture(D,dt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<q;kt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,mt):i.texImage2D(ft+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,mt);return dt}const Mt={};Mt[i.TEXTURE_2D]=st(i.TEXTURE_2D,i.TEXTURE_2D,1),Mt[i.TEXTURE_CUBE_MAP]=st(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[i.TEXTURE_2D_ARRAY]=st(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Mt[i.TEXTURE_3D]=st(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(i.DEPTH_TEST),o.setFunc(Ui),tt(!1),yt(vc),rt(i.CULL_FACE),A(Ln);function rt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Pt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Nt(D,ft){return u[D]!==ft?(i.bindFramebuffer(D,ft),u[D]=ft,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function Lt(D,ft){let q=f,J=!1;if(D){q=d.get(ft),q===void 0&&(q=[],d.set(ft,q));const mt=D.textures;if(q.length!==mt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let dt=0,kt=mt.length;dt<kt;dt++)q[dt]=i.COLOR_ATTACHMENT0+dt;q.length=mt.length,J=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,J=!0);J&&i.drawBuffers(q)}function vt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const W={[Xn]:i.FUNC_ADD,[uf]:i.FUNC_SUBTRACT,[ff]:i.FUNC_REVERSE_SUBTRACT};W[df]=i.MIN,W[pf]=i.MAX;const K={[mf]:i.ZERO,[gf]:i.ONE,[vf]:i.SRC_COLOR,[Po]:i.SRC_ALPHA,[Ef]:i.SRC_ALPHA_SATURATE,[Mf]:i.DST_COLOR,[xf]:i.DST_ALPHA,[_f]:i.ONE_MINUS_SRC_COLOR,[Lo]:i.ONE_MINUS_SRC_ALPHA,[Sf]:i.ONE_MINUS_DST_COLOR,[yf]:i.ONE_MINUS_DST_ALPHA,[wf]:i.CONSTANT_COLOR,[bf]:i.ONE_MINUS_CONSTANT_COLOR,[Tf]:i.CONSTANT_ALPHA,[Af]:i.ONE_MINUS_CONSTANT_ALPHA};function A(D,ft,q,J,mt,dt,kt,ce,_e,Kt){if(D===Ln){v===!0&&(Pt(i.BLEND),v=!1);return}if(v===!1&&(rt(i.BLEND),v=!0),D!==hf){if(D!==m||Kt!==M){if((p!==Xn||_!==Xn)&&(i.blendEquation(i.FUNC_ADD),p=Xn,_=Xn),Kt)switch(D){case Ti:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _c:i.blendFunc(i.ONE,i.ONE);break;case xc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ti:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _c:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case xc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}w=null,E=null,L=null,b=null,R.set(0,0,0),C=0,m=D,M=Kt}return}mt=mt||ft,dt=dt||q,kt=kt||J,(ft!==p||mt!==_)&&(i.blendEquationSeparate(W[ft],W[mt]),p=ft,_=mt),(q!==w||J!==E||dt!==L||kt!==b)&&(i.blendFuncSeparate(K[q],K[J],K[dt],K[kt]),w=q,E=J,L=dt,b=kt),(ce.equals(R)===!1||_e!==C)&&(i.blendColor(ce.r,ce.g,ce.b,_e),R.copy(ce),C=_e),m=D,M=!1}function wt(D,ft){D.side===dn?Pt(i.CULL_FACE):rt(i.CULL_FACE);let q=D.side===Ae;ft&&(q=!q),tt(q),D.blending===Ti&&D.transparent===!1?A(Ln):A(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const J=D.stencilWrite;a.setTest(J),J&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Dt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):Pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(D){x!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),x=D)}function yt(D){D!==cf?(rt(i.CULL_FACE),D!==P&&(D===vc?i.cullFace(i.BACK):D===lf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pt(i.CULL_FACE),P=D}function lt(D){D!==z&&(H&&i.lineWidth(D),z=D)}function Dt(D,ft,q){D?(rt(i.POLYGON_OFFSET_FILL),(F!==ft||k!==q)&&(i.polygonOffset(ft,q),F=ft,k=q)):Pt(i.POLYGON_OFFSET_FILL)}function _t(D){D?rt(i.SCISSOR_TEST):Pt(i.SCISSOR_TEST)}function T(D){D===void 0&&(D=i.TEXTURE0+X-1),at!==D&&(i.activeTexture(D),at=D)}function y(D,ft,q){q===void 0&&(at===null?q=i.TEXTURE0+X-1:q=at);let J=ct[q];J===void 0&&(J={type:void 0,texture:void 0},ct[q]=J),(J.type!==D||J.texture!==ft)&&(at!==q&&(i.activeTexture(q),at=q),i.bindTexture(D,ft||Mt[D]),J.type=D,J.texture=ft)}function B(){const D=ct[at];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Gt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ft(D){$t.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),$t.copy(D))}function Et(D){Y.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Y.copy(D))}function Xt(D,ft){let q=l.get(ft);q===void 0&&(q=new WeakMap,l.set(ft,q));let J=q.get(D);J===void 0&&(J=i.getUniformBlockIndex(ft,D.name),q.set(D,J))}function Ht(D,ft){const J=l.get(ft).get(D);c.get(ft)!==J&&(i.uniformBlockBinding(ft,J,D.__bindingPointIndex),c.set(ft,J))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},at=null,ct={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,w=null,E=null,_=null,L=null,b=null,R=new Wt(0,0,0),C=0,M=!1,x=null,P=null,z=null,F=null,k=null,$t.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:rt,disable:Pt,bindFramebuffer:Nt,drawBuffers:Lt,useProgram:vt,setBlending:A,setMaterial:wt,setFlipSided:tt,setCullFace:yt,setLineWidth:lt,setPolygonOffset:Dt,setScissorTest:_t,activeTexture:T,bindTexture:y,unbindTexture:B,compressedTexImage2D:j,compressedTexImage3D:Q,texImage2D:St,texImage3D:Ut,updateUBOMapping:Xt,uniformBlockBinding:Ht,texStorage2D:Gt,texStorage3D:it,texSubImage2D:Z,texSubImage3D:bt,compressedTexSubImage2D:ut,compressedTexSubImage3D:xt,scissor:Ft,viewport:Et,reset:ee}}function ml(i,t,e,n){const s=l_(n);switch(e){case xh:return i*t;case Mh:return i*t;case Sh:return i*t*2;case Eh:return i*t/s.components*s.byteLength;case Da:return i*t/s.components*s.byteLength;case wh:return i*t*2/s.components*s.byteLength;case Ua:return i*t*2/s.components*s.byteLength;case yh:return i*t*3/s.components*s.byteLength;case $e:return i*t*4/s.components*s.byteLength;case Na:return i*t*4/s.components*s.byteLength;case ur:case fr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case dr:case pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vo:case Wo:return Math.max(i,16)*Math.max(t,8)/4;case Ho:case Go:return Math.max(i,8)*Math.max(t,8)/2;case Xo:case $o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case qo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case jo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Zo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Jo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ko:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Qo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ta:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ea:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case na:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ia:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case sa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ra:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case oa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case aa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case mr:case ca:case la:return Math.ceil(i/4)*Math.ceil(t/4)*16;case bh:case ha:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ua:case fa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function l_(i){switch(i){case _n:case gh:return{byteLength:1,components:1};case ps:case vh:case bs:return{byteLength:2,components:1};case La:case Ia:return{byteLength:2,components:4};case Qn:case Pa:case mn:return{byteLength:4,components:1};case _h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function h_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new nt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,y){return f?new OffscreenCanvas(T,y):gs("canvas")}function v(T,y,B){let j=1;const Q=_t(T);if((Q.width>B||Q.height>B)&&(j=B/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Z=Math.floor(j*Q.width),bt=Math.floor(j*Q.height);u===void 0&&(u=g(Z,bt));const ut=y?g(Z,bt):u;return ut.width=Z,ut.height=bt,ut.getContext("2d").drawImage(T,0,0,Z,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+bt+")."),ut}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(T,y,B,j,Q=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Z=y;if(y===i.RED&&(B===i.FLOAT&&(Z=i.R32F),B===i.HALF_FLOAT&&(Z=i.R16F),B===i.UNSIGNED_BYTE&&(Z=i.R8)),y===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.R8UI),B===i.UNSIGNED_SHORT&&(Z=i.R16UI),B===i.UNSIGNED_INT&&(Z=i.R32UI),B===i.BYTE&&(Z=i.R8I),B===i.SHORT&&(Z=i.R16I),B===i.INT&&(Z=i.R32I)),y===i.RG&&(B===i.FLOAT&&(Z=i.RG32F),B===i.HALF_FLOAT&&(Z=i.RG16F),B===i.UNSIGNED_BYTE&&(Z=i.RG8)),y===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RG8UI),B===i.UNSIGNED_SHORT&&(Z=i.RG16UI),B===i.UNSIGNED_INT&&(Z=i.RG32UI),B===i.BYTE&&(Z=i.RG8I),B===i.SHORT&&(Z=i.RG16I),B===i.INT&&(Z=i.RG32I)),y===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),B===i.UNSIGNED_INT&&(Z=i.RGB32UI),B===i.BYTE&&(Z=i.RGB8I),B===i.SHORT&&(Z=i.RGB16I),B===i.INT&&(Z=i.RGB32I)),y===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),B===i.UNSIGNED_INT&&(Z=i.RGBA32UI),B===i.BYTE&&(Z=i.RGBA8I),B===i.SHORT&&(Z=i.RGBA16I),B===i.INT&&(Z=i.RGBA32I)),y===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),y===i.RGBA){const bt=Q?Ar:qt.getTransfer(j);B===i.FLOAT&&(Z=i.RGBA32F),B===i.HALF_FLOAT&&(Z=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Z=bt===te?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(T,y){let B;return T?y===null||y===Qn||y===Oi?B=i.DEPTH24_STENCIL8:y===mn?B=i.DEPTH32F_STENCIL8:y===ps&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Qn||y===Oi?B=i.DEPTH_COMPONENT24:y===mn?B=i.DEPTH_COMPONENT32F:y===ps&&(B=i.DEPTH_COMPONENT16),B}function L(T,y){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==qe&&T.minFilter!==Ke?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function b(T){const y=T.target;y.removeEventListener("dispose",b),C(y),y.isVideoTexture&&h.delete(y)}function R(T){const y=T.target;y.removeEventListener("dispose",R),x(y)}function C(T){const y=n.get(T);if(y.__webglInit===void 0)return;const B=T.source,j=d.get(B);if(j){const Q=j[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(T),Object.keys(j).length===0&&d.delete(B)}n.remove(T)}function M(T){const y=n.get(T);i.deleteTexture(y.__webglTexture);const B=T.source,j=d.get(B);delete j[y.__cacheKey],o.memory.textures--}function x(T){const y=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let Q=0;Q<y.__webglFramebuffer[j].length;Q++)i.deleteFramebuffer(y.__webglFramebuffer[j][Q]);else i.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)i.deleteFramebuffer(y.__webglFramebuffer[j]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const B=T.textures;for(let j=0,Q=B.length;j<Q;j++){const Z=n.get(B[j]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(B[j])}n.remove(T)}let P=0;function z(){P=0}function F(){const T=P;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function k(T){const y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function X(T,y){const B=n.get(T);if(T.isVideoTexture&&lt(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(B,T,y);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+y)}function H(T,y){const B=n.get(T);if(T.version>0&&B.__version!==T.version){Y(B,T,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+y)}function et(T,y){const B=n.get(T);if(T.version>0&&B.__version!==T.version){Y(B,T,y);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+y)}function $(T,y){const B=n.get(T);if(T.version>0&&B.__version!==T.version){st(B,T,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+y)}const at={[_r]:i.REPEAT,[Yn]:i.CLAMP_TO_EDGE,[xr]:i.MIRRORED_REPEAT},ct={[qe]:i.NEAREST,[Ff]:i.NEAREST_MIPMAP_NEAREST,[Ns]:i.NEAREST_MIPMAP_LINEAR,[Ke]:i.LINEAR,[Or]:i.LINEAR_MIPMAP_NEAREST,[jn]:i.LINEAR_MIPMAP_LINEAR},gt={[zf]:i.NEVER,[$f]:i.ALWAYS,[Hf]:i.LESS,[Ah]:i.LEQUAL,[Vf]:i.EQUAL,[Xf]:i.GEQUAL,[Gf]:i.GREATER,[Wf]:i.NOTEQUAL};function It(T,y){if(y.type===mn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Ke||y.magFilter===Or||y.magFilter===Ns||y.magFilter===jn||y.minFilter===Ke||y.minFilter===Or||y.minFilter===Ns||y.minFilter===jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,at[y.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,at[y.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,at[y.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ct[y.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ct[y.minFilter]),y.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,gt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===qe||y.minFilter!==Ns&&y.minFilter!==jn||y.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function $t(T,y){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",b));const j=y.source;let Q=d.get(j);Q===void 0&&(Q={},d.set(j,Q));const Z=k(y);if(Z!==T.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[Z].usedTimes++;const bt=Q[T.__cacheKey];bt!==void 0&&(Q[T.__cacheKey].usedTimes--,bt.usedTimes===0&&M(y)),T.__cacheKey=Z,T.__webglTexture=Q[Z].texture}return B}function Y(T,y,B){let j=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=i.TEXTURE_3D);const Q=$t(T,y),Z=y.source;e.bindTexture(j,T.__webglTexture,i.TEXTURE0+B);const bt=n.get(Z);if(Z.version!==bt.__version||Q===!0){e.activeTexture(i.TEXTURE0+B);const ut=qt.getPrimaries(qt.workingColorSpace),xt=y.colorSpace===Rn?null:qt.getPrimaries(y.colorSpace),Gt=y.colorSpace===Rn||ut===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let it=v(y.image,!1,s.maxTextureSize);it=Dt(y,it);const St=r.convert(y.format,y.colorSpace),Ut=r.convert(y.type);let Ft=E(y.internalFormat,St,Ut,y.colorSpace,y.isVideoTexture);It(j,y);let Et;const Xt=y.mipmaps,Ht=y.isVideoTexture!==!0,ee=bt.__version===void 0||Q===!0,D=Z.dataReady,ft=L(y,it);if(y.isDepthTexture)Ft=_(y.format===ki,y.type),ee&&(Ht?e.texStorage2D(i.TEXTURE_2D,1,Ft,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Ft,it.width,it.height,0,St,Ut,null));else if(y.isDataTexture)if(Xt.length>0){Ht&&ee&&e.texStorage2D(i.TEXTURE_2D,ft,Ft,Xt[0].width,Xt[0].height);for(let q=0,J=Xt.length;q<J;q++)Et=Xt[q],Ht?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Et.width,Et.height,St,Ut,Et.data):e.texImage2D(i.TEXTURE_2D,q,Ft,Et.width,Et.height,0,St,Ut,Et.data);y.generateMipmaps=!1}else Ht?(ee&&e.texStorage2D(i.TEXTURE_2D,ft,Ft,it.width,it.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,St,Ut,it.data)):e.texImage2D(i.TEXTURE_2D,0,Ft,it.width,it.height,0,St,Ut,it.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ht&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Ft,Xt[0].width,Xt[0].height,it.depth);for(let q=0,J=Xt.length;q<J;q++)if(Et=Xt[q],y.format!==$e)if(St!==null)if(Ht){if(D)if(y.layerUpdates.size>0){const mt=ml(Et.width,Et.height,y.format,y.type);for(const dt of y.layerUpdates){const kt=Et.data.subarray(dt*mt/Et.data.BYTES_PER_ELEMENT,(dt+1)*mt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,dt,Et.width,Et.height,1,St,kt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Et.width,Et.height,it.depth,St,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ft,Et.width,Et.height,it.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Et.width,Et.height,it.depth,St,Ut,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Ft,Et.width,Et.height,it.depth,0,St,Ut,Et.data)}else{Ht&&ee&&e.texStorage2D(i.TEXTURE_2D,ft,Ft,Xt[0].width,Xt[0].height);for(let q=0,J=Xt.length;q<J;q++)Et=Xt[q],y.format!==$e?St!==null?Ht?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,Et.width,Et.height,St,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Ft,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Et.width,Et.height,St,Ut,Et.data):e.texImage2D(i.TEXTURE_2D,q,Ft,Et.width,Et.height,0,St,Ut,Et.data)}else if(y.isDataArrayTexture)if(Ht){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Ft,it.width,it.height,it.depth),D)if(y.layerUpdates.size>0){const q=ml(it.width,it.height,y.format,y.type);for(const J of y.layerUpdates){const mt=it.data.subarray(J*q/it.data.BYTES_PER_ELEMENT,(J+1)*q/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,it.width,it.height,1,St,Ut,mt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,St,Ut,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ft,it.width,it.height,it.depth,0,St,Ut,it.data);else if(y.isData3DTexture)Ht?(ee&&e.texStorage3D(i.TEXTURE_3D,ft,Ft,it.width,it.height,it.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,St,Ut,it.data)):e.texImage3D(i.TEXTURE_3D,0,Ft,it.width,it.height,it.depth,0,St,Ut,it.data);else if(y.isFramebufferTexture){if(ee)if(Ht)e.texStorage2D(i.TEXTURE_2D,ft,Ft,it.width,it.height);else{let q=it.width,J=it.height;for(let mt=0;mt<ft;mt++)e.texImage2D(i.TEXTURE_2D,mt,Ft,q,J,0,St,Ut,null),q>>=1,J>>=1}}else if(Xt.length>0){if(Ht&&ee){const q=_t(Xt[0]);e.texStorage2D(i.TEXTURE_2D,ft,Ft,q.width,q.height)}for(let q=0,J=Xt.length;q<J;q++)Et=Xt[q],Ht?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,St,Ut,Et):e.texImage2D(i.TEXTURE_2D,q,Ft,St,Ut,Et);y.generateMipmaps=!1}else if(Ht){if(ee){const q=_t(it);e.texStorage2D(i.TEXTURE_2D,ft,Ft,q.width,q.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,Ut,it)}else e.texImage2D(i.TEXTURE_2D,0,Ft,St,Ut,it);m(y)&&p(j),bt.__version=Z.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function st(T,y,B){if(y.image.length!==6)return;const j=$t(T,y),Q=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const Z=n.get(Q);if(Q.version!==Z.__version||j===!0){e.activeTexture(i.TEXTURE0+B);const bt=qt.getPrimaries(qt.workingColorSpace),ut=y.colorSpace===Rn?null:qt.getPrimaries(y.colorSpace),xt=y.colorSpace===Rn||bt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Gt=y.isCompressedTexture||y.image[0].isCompressedTexture,it=y.image[0]&&y.image[0].isDataTexture,St=[];for(let J=0;J<6;J++)!Gt&&!it?St[J]=v(y.image[J],!0,s.maxCubemapSize):St[J]=it?y.image[J].image:y.image[J],St[J]=Dt(y,St[J]);const Ut=St[0],Ft=r.convert(y.format,y.colorSpace),Et=r.convert(y.type),Xt=E(y.internalFormat,Ft,Et,y.colorSpace),Ht=y.isVideoTexture!==!0,ee=Z.__version===void 0||j===!0,D=Q.dataReady;let ft=L(y,Ut);It(i.TEXTURE_CUBE_MAP,y);let q;if(Gt){Ht&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Xt,Ut.width,Ut.height);for(let J=0;J<6;J++){q=St[J].mipmaps;for(let mt=0;mt<q.length;mt++){const dt=q[mt];y.format!==$e?Ft!==null?Ht?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,mt,0,0,dt.width,dt.height,Ft,dt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,mt,Xt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,mt,0,0,dt.width,dt.height,Ft,Et,dt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,mt,Xt,dt.width,dt.height,0,Ft,Et,dt.data)}}}else{if(q=y.mipmaps,Ht&&ee){q.length>0&&ft++;const J=_t(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Xt,J.width,J.height)}for(let J=0;J<6;J++)if(it){Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,St[J].width,St[J].height,Ft,Et,St[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Xt,St[J].width,St[J].height,0,Ft,Et,St[J].data);for(let mt=0;mt<q.length;mt++){const kt=q[mt].image[J].image;Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,mt+1,0,0,kt.width,kt.height,Ft,Et,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,mt+1,Xt,kt.width,kt.height,0,Ft,Et,kt.data)}}else{Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ft,Et,St[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Xt,Ft,Et,St[J]);for(let mt=0;mt<q.length;mt++){const dt=q[mt];Ht?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,mt+1,0,0,Ft,Et,dt.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,mt+1,Xt,Ft,Et,dt.image[J])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),Z.__version=Q.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function Mt(T,y,B,j,Q,Z){const bt=r.convert(B.format,B.colorSpace),ut=r.convert(B.type),xt=E(B.internalFormat,bt,ut,B.colorSpace),Gt=n.get(y),it=n.get(B);if(it.__renderTarget=y,!Gt.__hasExternalTextures){const St=Math.max(1,y.width>>Z),Ut=Math.max(1,y.height>>Z);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,Z,xt,St,Ut,y.depth,0,bt,ut,null):e.texImage2D(Q,Z,xt,St,Ut,0,bt,ut,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),yt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,it.__webglTexture,0,tt(y)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,it.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(T,y,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),y.depthBuffer){const j=y.depthTexture,Q=j&&j.isDepthTexture?j.type:null,Z=_(y.stencilBuffer,Q),bt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=tt(y);yt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut,Z,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,Z,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Z,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,T)}else{const j=y.textures;for(let Q=0;Q<j.length;Q++){const Z=j[Q],bt=r.convert(Z.format,Z.colorSpace),ut=r.convert(Z.type),xt=E(Z.internalFormat,bt,ut,Z.colorSpace),Gt=tt(y);B&&yt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,xt,y.width,y.height):yt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt,xt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,xt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pt(T,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(y.depthTexture);j.__renderTarget=y,(!j.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X(y.depthTexture,0);const Q=j.__webglTexture,Z=tt(y);if(y.depthTexture.format===Ai)yt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(y.depthTexture.format===ki)yt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Nt(T){const y=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==T.depthTexture){const j=T.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){const Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=j}if(T.depthTexture&&!y.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Pt(y.__webglFramebuffer,T)}else if(B){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=i.createRenderbuffer(),rt(y.__webglDepthbuffer[j],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=y.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),rt(y.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(T,y,B){const j=n.get(T);y!==void 0&&Mt(j.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Nt(T)}function vt(T){const y=T.texture,B=n.get(T),j=n.get(y);T.addEventListener("dispose",R);const Q=T.textures,Z=T.isWebGLCubeRenderTarget===!0,bt=Q.length>1;if(bt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=y.version,o.memory.textures++),Z){B.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[ut]=[];for(let xt=0;xt<y.mipmaps.length;xt++)B.__webglFramebuffer[ut][xt]=i.createFramebuffer()}else B.__webglFramebuffer[ut]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let ut=0;ut<y.mipmaps.length;ut++)B.__webglFramebuffer[ut]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(bt)for(let ut=0,xt=Q.length;ut<xt;ut++){const Gt=n.get(Q[ut]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&yt(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ut=0;ut<Q.length;ut++){const xt=Q[ut];B.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ut]);const Gt=r.convert(xt.format,xt.colorSpace),it=r.convert(xt.type),St=E(xt.internalFormat,Gt,it,xt.colorSpace,T.isXRRenderTarget===!0),Ut=tt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,St,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,B.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),rt(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),It(i.TEXTURE_CUBE_MAP,y);for(let ut=0;ut<6;ut++)if(y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)Mt(B.__webglFramebuffer[ut][xt],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,xt);else Mt(B.__webglFramebuffer[ut],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ut=0,xt=Q.length;ut<xt;ut++){const Gt=Q[ut],it=n.get(Gt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),It(i.TEXTURE_2D,Gt),Mt(B.__webglFramebuffer,T,Gt,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,0),m(Gt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ut=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ut=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,j.__webglTexture),It(ut,y),y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)Mt(B.__webglFramebuffer[xt],T,y,i.COLOR_ATTACHMENT0,ut,xt);else Mt(B.__webglFramebuffer,T,y,i.COLOR_ATTACHMENT0,ut,0);m(y)&&p(ut),e.unbindTexture()}T.depthBuffer&&Nt(T)}function W(T){const y=T.textures;for(let B=0,j=y.length;B<j;B++){const Q=y[B];if(m(Q)){const Z=w(T),bt=n.get(Q).__webglTexture;e.bindTexture(Z,bt),p(Z),e.unbindTexture()}}}const K=[],A=[];function wt(T){if(T.samples>0){if(yt(T)===!1){const y=T.textures,B=T.width,j=T.height;let Q=i.COLOR_BUFFER_BIT;const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(T),ut=y.length>1;if(ut)for(let xt=0;xt<y.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let xt=0;xt<y.length;xt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ut){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[xt]);const Gt=n.get(y[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Gt,0)}i.blitFramebuffer(0,0,B,j,0,0,B,j,Q,i.NEAREST),c===!0&&(K.length=0,A.length=0,K.push(i.COLOR_ATTACHMENT0+xt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(K.push(Z),A.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,A)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,K))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let xt=0;xt<y.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,bt.__webglColorRenderbuffer[xt]);const Gt=n.get(y[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function tt(T){return Math.min(s.maxSamples,T.samples)}function yt(T){const y=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function lt(T){const y=o.render.frame;h.get(T)!==y&&(h.set(T,y),T.update())}function Dt(T,y){const B=T.colorSpace,j=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Gi&&B!==Rn&&(qt.getTransfer(B)===te?(j!==$e||Q!==_n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),y}function _t(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=z,this.setTexture2D=X,this.setTexture2DArray=H,this.setTexture3D=et,this.setTextureCube=$,this.rebindTextures=Lt,this.setupRenderTarget=vt,this.updateRenderTargetMipmap=W,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=yt}function u_(i,t){function e(n,s=Rn){let r;const o=qt.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===La)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===_h)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gh)return i.BYTE;if(n===vh)return i.SHORT;if(n===ps)return i.UNSIGNED_SHORT;if(n===Pa)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===bs)return i.HALF_FLOAT;if(n===xh)return i.ALPHA;if(n===yh)return i.RGB;if(n===$e)return i.RGBA;if(n===Mh)return i.LUMINANCE;if(n===Sh)return i.LUMINANCE_ALPHA;if(n===Ai)return i.DEPTH_COMPONENT;if(n===ki)return i.DEPTH_STENCIL;if(n===Eh)return i.RED;if(n===Da)return i.RED_INTEGER;if(n===wh)return i.RG;if(n===Ua)return i.RG_INTEGER;if(n===Na)return i.RGBA_INTEGER;if(n===ur||n===fr||n===dr||n===pr)if(o===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ho||n===Vo||n===Go||n===Wo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Vo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Go)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xo||n===$o||n===qo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xo||n===$o)return o===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===qo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yo||n===jo||n===Zo||n===Jo||n===Ko||n===Qo||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===oa||n===aa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Yo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Zo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ko)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Qo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ta)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ea)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===na)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ia)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ra)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===aa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mr||n===ca||n===la)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===mr)return o===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ca)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===la)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bh||n===ha||n===ua||n===fa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===mr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ha)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Oi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class f_ extends Fe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Pn extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const d_={type:"move"};class ho{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(d_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Pn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const p_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class g_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ee,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Nn({vertexShader:p_,fragmentShader:m_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Cs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class v_ extends Wi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const v=new g_,m=e.getContextAttributes();let p=null,w=null;const E=[],_=[],L=new nt;let b=null;const R=new Fe;R.viewport=new he;const C=new Fe;C.viewport=new he;const M=[R,C],x=new f_;let P=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let st=E[Y];return st===void 0&&(st=new ho,E[Y]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Y){let st=E[Y];return st===void 0&&(st=new ho,E[Y]=st),st.getGripSpace()},this.getHand=function(Y){let st=E[Y];return st===void 0&&(st=new ho,E[Y]=st),st.getHandSpace()};function F(Y){const st=_.indexOf(Y.inputSource);if(st===-1)return;const Mt=E[st];Mt!==void 0&&(Mt.update(Y.inputSource,Y.frame,l||o),Mt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",X);for(let Y=0;Y<E.length;Y++){const st=_[Y];st!==null&&(_[Y]=null,E[Y].disconnect(st))}P=null,z=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,w=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",k),s.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const st={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new ti(f.framebufferWidth,f.framebufferHeight,{format:$e,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let st=null,Mt=null,rt=null;m.depth&&(rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=m.stencil?ki:Ai,Mt=m.stencil?Oi:Qn);const Pt={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Pt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new ti(d.textureWidth,d.textureHeight,{format:$e,type:_n,depthTexture:new zh(d.textureWidth,d.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),$t.setContext(s),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function X(Y){for(let st=0;st<Y.removed.length;st++){const Mt=Y.removed[st],rt=_.indexOf(Mt);rt>=0&&(_[rt]=null,E[rt].disconnect(Mt))}for(let st=0;st<Y.added.length;st++){const Mt=Y.added[st];let rt=_.indexOf(Mt);if(rt===-1){for(let Nt=0;Nt<E.length;Nt++)if(Nt>=_.length){_.push(Mt),rt=Nt;break}else if(_[Nt]===null){_[Nt]=Mt,rt=Nt;break}if(rt===-1)break}const Pt=E[rt];Pt&&Pt.connect(Mt)}}const H=new I,et=new I;function $(Y,st,Mt){H.setFromMatrixPosition(st.matrixWorld),et.setFromMatrixPosition(Mt.matrixWorld);const rt=H.distanceTo(et),Pt=st.projectionMatrix.elements,Nt=Mt.projectionMatrix.elements,Lt=Pt[14]/(Pt[10]-1),vt=Pt[14]/(Pt[10]+1),W=(Pt[9]+1)/Pt[5],K=(Pt[9]-1)/Pt[5],A=(Pt[8]-1)/Pt[0],wt=(Nt[8]+1)/Nt[0],tt=Lt*A,yt=Lt*wt,lt=rt/(-A+wt),Dt=lt*-A;if(st.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Dt),Y.translateZ(lt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Pt[10]===-1)Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const _t=Lt+lt,T=vt+lt,y=tt-Dt,B=yt+(rt-Dt),j=W*vt/T*_t,Q=K*vt/T*_t;Y.projectionMatrix.makePerspective(y,B,j,Q,_t,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function at(Y,st){st===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(st.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let st=Y.near,Mt=Y.far;v.texture!==null&&(v.depthNear>0&&(st=v.depthNear),v.depthFar>0&&(Mt=v.depthFar)),x.near=C.near=R.near=st,x.far=C.far=R.far=Mt,(P!==x.near||z!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,z=x.far),R.layers.mask=Y.layers.mask|2,C.layers.mask=Y.layers.mask|4,x.layers.mask=R.layers.mask|C.layers.mask;const rt=Y.parent,Pt=x.cameras;at(x,rt);for(let Nt=0;Nt<Pt.length;Nt++)at(Pt[Nt],rt);Pt.length===2?$(x,R,C):x.projectionMatrix.copy(R.projectionMatrix),ct(Y,x,rt)};function ct(Y,st,Mt){Mt===null?Y.matrix.copy(st.matrixWorld):(Y.matrix.copy(Mt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(st.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ms*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let gt=null;function It(Y,st){if(h=st.getViewerPose(l||o),g=st,h!==null){const Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(w,f.framebuffer),t.setRenderTarget(w));let rt=!1;Mt.length!==x.cameras.length&&(x.cameras.length=0,rt=!0);for(let Nt=0;Nt<Mt.length;Nt++){const Lt=Mt[Nt];let vt=null;if(f!==null)vt=f.getViewport(Lt);else{const K=u.getViewSubImage(d,Lt);vt=K.viewport,Nt===0&&(t.setRenderTargetTextures(w,K.colorTexture,d.ignoreDepthValues?void 0:K.depthStencilTexture),t.setRenderTarget(w))}let W=M[Nt];W===void 0&&(W=new Fe,W.layers.enable(Nt),W.viewport=new he,M[Nt]=W),W.matrix.fromArray(Lt.transform.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale),W.projectionMatrix.fromArray(Lt.projectionMatrix),W.projectionMatrixInverse.copy(W.projectionMatrix).invert(),W.viewport.set(vt.x,vt.y,vt.width,vt.height),Nt===0&&(x.matrix.copy(W.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),rt===!0&&x.cameras.push(W)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const Nt=u.getDepthInformation(Mt[0]);Nt&&Nt.isValid&&Nt.texture&&v.init(t,Nt,s.renderState)}}for(let Mt=0;Mt<E.length;Mt++){const rt=_[Mt],Pt=E[Mt];rt!==null&&Pt!==void 0&&Pt.update(rt,st,l||o)}gt&&gt(Y,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const $t=new kh;$t.setAnimationLoop(It),this.setAnimationLoop=function(Y){gt=Y},this.dispose=function(){}}}const Gn=new tn,__=new re;function x_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Nh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,E,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,w,E):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ae&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ae&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=t.get(p),E=w.envMap,_=w.envMapRotation;E&&(m.envMap.value=E,Gn.copy(_),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),m.envMapRotation.value.setFromMatrix4(__.makeRotationFromEuler(Gn)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,w,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ae&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function y_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,E){const _=E.program;n.uniformBlockBinding(w,_)}function l(w,E){let _=s[w.id];_===void 0&&(g(w),_=h(w),s[w.id]=_,w.addEventListener("dispose",m));const L=E.program;n.updateUBOMapping(w,L);const b=t.render.frame;r[w.id]!==b&&(d(w),r[w.id]=b)}function h(w){const E=u();w.__bindingPointIndex=E;const _=i.createBuffer(),L=w.__size,b=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,L,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,_),_}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const E=s[w.id],_=w.uniforms,L=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let b=0,R=_.length;b<R;b++){const C=Array.isArray(_[b])?_[b]:[_[b]];for(let M=0,x=C.length;M<x;M++){const P=C[M];if(f(P,b,M,L)===!0){const z=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let X=0;X<F.length;X++){const H=F[X],et=v(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,z+k,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,k),k+=et.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(w,E,_,L){const b=w.value,R=E+"_"+_;if(L[R]===void 0)return typeof b=="number"||typeof b=="boolean"?L[R]=b:L[R]=b.clone(),!0;{const C=L[R];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return L[R]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function g(w){const E=w.uniforms;let _=0;const L=16;for(let R=0,C=E.length;R<C;R++){const M=Array.isArray(E[R])?E[R]:[E[R]];for(let x=0,P=M.length;x<P;x++){const z=M[x],F=Array.isArray(z.value)?z.value:[z.value];for(let k=0,X=F.length;k<X;k++){const H=F[k],et=v(H),$=_%L,at=$%et.boundary,ct=$+at;_+=at,ct!==0&&L-ct<et.storage&&(_+=L-ct),z.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=et.storage}}}const b=_%L;return b>0&&(_+=L-b),w.__size=_,w.__cache={},this}function v(w){const E={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(E.boundary=4,E.storage=4):w.isVector2?(E.boundary=8,E.storage=8):w.isVector3||w.isColor?(E.boundary=16,E.storage=12):w.isVector4?(E.boundary=16,E.storage=16):w.isMatrix3?(E.boundary=48,E.storage=48):w.isMatrix4?(E.boundary=64,E.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),E}function m(w){const E=w.target;E.removeEventListener("dispose",m);const _=o.indexOf(E.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const w in s)i.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class M_{constructor(t={}){const{canvas:e=ld(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const w=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Te,this.toneMapping=In,this.toneMappingExposure=1;const _=this;let L=!1,b=0,R=0,C=null,M=-1,x=null;const P=new he,z=new he;let F=null;const k=new Wt(0);let X=0,H=e.width,et=e.height,$=1,at=null,ct=null;const gt=new he(0,0,H,et),It=new he(0,0,H,et);let $t=!1;const Y=new Ba;let st=!1,Mt=!1;const rt=new re,Pt=new re,Nt=new I,Lt=new he,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let W=!1;function K(){return C===null?$:1}let A=n;function wt(S,U){return e.getContext(S,U)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ca}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),A===null){const U="webgl2";if(A=wt(U,S),A===null)throw wt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let tt,yt,lt,Dt,_t,T,y,B,j,Q,Z,bt,ut,xt,Gt,it,St,Ut,Ft,Et,Xt,Ht,ee,D;function ft(){tt=new Tg(A),tt.init(),Ht=new u_(A,tt),yt=new yg(A,tt,t,Ht),lt=new c_(A,tt),yt.reverseDepthBuffer&&d&&lt.buffers.depth.setReversed(!0),Dt=new Cg(A),_t=new qv,T=new h_(A,tt,lt,_t,yt,Ht,Dt),y=new Sg(_),B=new bg(_),j=new Fd(A),ee=new _g(A,j),Q=new Ag(A,j,Dt,ee),Z=new Lg(A,Q,j,Dt),Ft=new Pg(A,yt,T),it=new Mg(_t),bt=new $v(_,y,B,tt,yt,ee,it),ut=new x_(_,_t),xt=new jv,Gt=new e_(tt),Ut=new vg(_,y,B,lt,Z,f,c),St=new o_(_,Z,yt),D=new y_(A,Dt,yt,lt),Et=new xg(A,tt,Dt),Xt=new Rg(A,tt,Dt),Dt.programs=bt.programs,_.capabilities=yt,_.extensions=tt,_.properties=_t,_.renderLists=xt,_.shadowMap=St,_.state=lt,_.info=Dt}ft();const q=new v_(_,A);this.xr=q,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const S=tt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=tt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(H,et,!1))},this.getSize=function(S){return S.set(H,et)},this.setSize=function(S,U,V=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=S,et=U,e.width=Math.floor(S*$),e.height=Math.floor(U*$),V===!0&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(H*$,et*$).floor()},this.setDrawingBufferSize=function(S,U,V){H=S,et=U,$=V,e.width=Math.floor(S*V),e.height=Math.floor(U*V),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(gt)},this.setViewport=function(S,U,V,G){S.isVector4?gt.set(S.x,S.y,S.z,S.w):gt.set(S,U,V,G),lt.viewport(P.copy(gt).multiplyScalar($).round())},this.getScissor=function(S){return S.copy(It)},this.setScissor=function(S,U,V,G){S.isVector4?It.set(S.x,S.y,S.z,S.w):It.set(S,U,V,G),lt.scissor(z.copy(It).multiplyScalar($).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(S){lt.setScissorTest($t=S)},this.setOpaqueSort=function(S){at=S},this.setTransparentSort=function(S){ct=S},this.getClearColor=function(S){return S.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(S=!0,U=!0,V=!0){let G=0;if(S){let N=!1;if(C!==null){const ot=C.texture.format;N=ot===Na||ot===Ua||ot===Da}if(N){const ot=C.texture.type,pt=ot===_n||ot===Qn||ot===ps||ot===Oi||ot===La||ot===Ia,Tt=Ut.getClearColor(),At=Ut.getClearAlpha(),Ot=Tt.r,Bt=Tt.g,Rt=Tt.b;pt?(g[0]=Ot,g[1]=Bt,g[2]=Rt,g[3]=At,A.clearBufferuiv(A.COLOR,0,g)):(v[0]=Ot,v[1]=Bt,v[2]=Rt,v[3]=At,A.clearBufferiv(A.COLOR,0,v))}else G|=A.COLOR_BUFFER_BIT}U&&(G|=A.DEPTH_BUFFER_BIT),V&&(G|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),xt.dispose(),Gt.dispose(),_t.dispose(),y.dispose(),B.dispose(),Z.dispose(),ee.dispose(),D.dispose(),bt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Qa),q.removeEventListener("sessionend",tc),On.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const S=Dt.autoReset,U=St.enabled,V=St.autoUpdate,G=St.needsUpdate,N=St.type;ft(),Dt.autoReset=S,St.enabled=U,St.autoUpdate=V,St.needsUpdate=G,St.type=N}function dt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function kt(S){const U=S.target;U.removeEventListener("dispose",kt),ce(U)}function ce(S){_e(S),_t.remove(S)}function _e(S){const U=_t.get(S).programs;U!==void 0&&(U.forEach(function(V){bt.releaseProgram(V)}),S.isShaderMaterial&&bt.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,V,G,N,ot){U===null&&(U=vt);const pt=N.isMesh&&N.matrixWorld.determinant()<0,Tt=gu(S,U,V,G,N);lt.setMaterial(G,pt);let At=V.index,Ot=1;if(G.wireframe===!0){if(At=Q.getWireframeAttribute(V),At===void 0)return;Ot=2}const Bt=V.drawRange,Rt=V.attributes.position;let Yt=Bt.start*Ot,ne=(Bt.start+Bt.count)*Ot;ot!==null&&(Yt=Math.max(Yt,ot.start*Ot),ne=Math.min(ne,(ot.start+ot.count)*Ot)),At!==null?(Yt=Math.max(Yt,0),ne=Math.min(ne,At.count)):Rt!=null&&(Yt=Math.max(Yt,0),ne=Math.min(ne,Rt.count));const ie=ne-Yt;if(ie<0||ie===1/0)return;ee.setup(N,G,Tt,V,At);let Re,jt=Et;if(At!==null&&(Re=j.get(At),jt=Xt,jt.setIndex(Re)),N.isMesh)G.wireframe===!0?(lt.setLineWidth(G.wireframeLinewidth*K()),jt.setMode(A.LINES)):jt.setMode(A.TRIANGLES);else if(N.isLine){let Ct=G.linewidth;Ct===void 0&&(Ct=1),lt.setLineWidth(Ct*K()),N.isLineSegments?jt.setMode(A.LINES):N.isLineLoop?jt.setMode(A.LINE_LOOP):jt.setMode(A.LINE_STRIP)}else N.isPoints?jt.setMode(A.POINTS):N.isSprite&&jt.setMode(A.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)jt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))jt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ct=N._multiDrawStarts,sn=N._multiDrawCounts,Zt=N._multiDrawCount,ke=At?j.get(At).bytesPerElement:1,si=_t.get(G).currentProgram.getUniforms();for(let Pe=0;Pe<Zt;Pe++)si.setValue(A,"_gl_DrawID",Pe),jt.render(Ct[Pe]/ke,sn[Pe])}else if(N.isInstancedMesh)jt.renderInstances(Yt,ie,N.count);else if(V.isInstancedBufferGeometry){const Ct=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,sn=Math.min(V.instanceCount,Ct);jt.renderInstances(Yt,ie,sn)}else jt.render(Yt,ie)};function Kt(S,U,V){S.transparent===!0&&S.side===dn&&S.forceSinglePass===!1?(S.side=Ae,S.needsUpdate=!0,Ds(S,U,V),S.side=Un,S.needsUpdate=!0,Ds(S,U,V),S.side=dn):Ds(S,U,V)}this.compile=function(S,U,V=null){V===null&&(V=S),p=Gt.get(V),p.init(U),E.push(p),V.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),S!==V&&S.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const G=new Set;return S.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ot=N.material;if(ot)if(Array.isArray(ot))for(let pt=0;pt<ot.length;pt++){const Tt=ot[pt];Kt(Tt,V,N),G.add(Tt)}else Kt(ot,V,N),G.add(ot)}),E.pop(),p=null,G},this.compileAsync=function(S,U,V=null){const G=this.compile(S,U,V);return new Promise(N=>{function ot(){if(G.forEach(function(pt){_t.get(pt).currentProgram.isReady()&&G.delete(pt)}),G.size===0){N(S);return}setTimeout(ot,10)}tt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Oe=null;function nn(S){Oe&&Oe(S)}function Qa(){On.stop()}function tc(){On.start()}const On=new kh;On.setAnimationLoop(nn),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(S){Oe=S,q.setAnimationLoop(S),S===null?On.stop():On.start()},q.addEventListener("sessionstart",Qa),q.addEventListener("sessionend",tc),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(U),U=q.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,U,C),p=Gt.get(S,E.length),p.init(U),E.push(p),Pt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(Pt),Mt=this.localClippingEnabled,st=it.init(this.clippingPlanes,Mt),m=xt.get(S,w.length),m.init(),w.push(m),q.enabled===!0&&q.isPresenting===!0){const ot=_.xr.getDepthSensingMesh();ot!==null&&Lr(ot,U,-1/0,_.sortObjects)}Lr(S,U,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(at,ct),W=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,W&&Ut.addToRenderList(m,S),this.info.render.frame++,st===!0&&it.beginShadows();const V=p.state.shadowsArray;St.render(V,S,U),st===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const ot=U.cameras;if(N.length>0)for(let pt=0,Tt=ot.length;pt<Tt;pt++){const At=ot[pt];nc(G,N,S,At)}W&&Ut.render(S);for(let pt=0,Tt=ot.length;pt<Tt;pt++){const At=ot[pt];ec(m,S,At,At.viewport)}}else N.length>0&&nc(G,N,S,U),W&&Ut.render(S),ec(m,S,U);C!==null&&(T.updateMultisampleRenderTarget(C),T.updateRenderTargetMipmap(C)),S.isScene===!0&&S.onAfterRender(_,S,U),ee.resetDefaultState(),M=-1,x=null,E.pop(),E.length>0?(p=E[E.length-1],st===!0&&it.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Lr(S,U,V,G){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){G&&Lt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Pt);const pt=Z.update(S),Tt=S.material;Tt.visible&&m.push(S,pt,Tt,V,Lt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){const pt=Z.update(S),Tt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Lt.copy(S.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),Lt.copy(pt.boundingSphere.center)),Lt.applyMatrix4(S.matrixWorld).applyMatrix4(Pt)),Array.isArray(Tt)){const At=pt.groups;for(let Ot=0,Bt=At.length;Ot<Bt;Ot++){const Rt=At[Ot],Yt=Tt[Rt.materialIndex];Yt&&Yt.visible&&m.push(S,pt,Yt,V,Lt.z,Rt)}}else Tt.visible&&m.push(S,pt,Tt,V,Lt.z,null)}}const ot=S.children;for(let pt=0,Tt=ot.length;pt<Tt;pt++)Lr(ot[pt],U,V,G)}function ec(S,U,V,G){const N=S.opaque,ot=S.transmissive,pt=S.transparent;p.setupLightsView(V),st===!0&&it.setGlobalState(_.clippingPlanes,V),G&&lt.viewport(P.copy(G)),N.length>0&&Is(N,U,V),ot.length>0&&Is(ot,U,V),pt.length>0&&Is(pt,U,V),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function nc(S,U,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new ti(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?bs:_n,minFilter:jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const ot=p.state.transmissionRenderTarget[G.id],pt=G.viewport||P;ot.setSize(pt.z,pt.w);const Tt=_.getRenderTarget();_.setRenderTarget(ot),_.getClearColor(k),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear(),W&&Ut.render(V);const At=_.toneMapping;_.toneMapping=In;const Ot=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),st===!0&&it.setGlobalState(_.clippingPlanes,G),Is(S,V,G),T.updateMultisampleRenderTarget(ot),T.updateRenderTargetMipmap(ot),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let Rt=0,Yt=U.length;Rt<Yt;Rt++){const ne=U[Rt],ie=ne.object,Re=ne.geometry,jt=ne.material,Ct=ne.group;if(jt.side===dn&&ie.layers.test(G.layers)){const sn=jt.side;jt.side=Ae,jt.needsUpdate=!0,ic(ie,V,G,Re,jt,Ct),jt.side=sn,jt.needsUpdate=!0,Bt=!0}}Bt===!0&&(T.updateMultisampleRenderTarget(ot),T.updateRenderTargetMipmap(ot))}_.setRenderTarget(Tt),_.setClearColor(k,X),Ot!==void 0&&(G.viewport=Ot),_.toneMapping=At}function Is(S,U,V){const G=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ot=S.length;N<ot;N++){const pt=S[N],Tt=pt.object,At=pt.geometry,Ot=G===null?pt.material:G,Bt=pt.group;Tt.layers.test(V.layers)&&ic(Tt,U,V,At,Ot,Bt)}}function ic(S,U,V,G,N,ot){S.onBeforeRender(_,U,V,G,N,ot),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),N.onBeforeRender(_,U,V,G,S,ot),N.transparent===!0&&N.side===dn&&N.forceSinglePass===!1?(N.side=Ae,N.needsUpdate=!0,_.renderBufferDirect(V,U,G,N,S,ot),N.side=Un,N.needsUpdate=!0,_.renderBufferDirect(V,U,G,N,S,ot),N.side=dn):_.renderBufferDirect(V,U,G,N,S,ot),S.onAfterRender(_,U,V,G,N,ot)}function Ds(S,U,V){U.isScene!==!0&&(U=vt);const G=_t.get(S),N=p.state.lights,ot=p.state.shadowsArray,pt=N.state.version,Tt=bt.getParameters(S,N.state,ot,U,V),At=bt.getProgramCacheKey(Tt);let Ot=G.programs;G.environment=S.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(S.isMeshStandardMaterial?B:y).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Ot===void 0&&(S.addEventListener("dispose",kt),Ot=new Map,G.programs=Ot);let Bt=Ot.get(At);if(Bt!==void 0){if(G.currentProgram===Bt&&G.lightsStateVersion===pt)return rc(S,Tt),Bt}else Tt.uniforms=bt.getUniforms(S),S.onBeforeCompile(Tt,_),Bt=bt.acquireProgram(Tt,At),Ot.set(At,Bt),G.uniforms=Tt.uniforms;const Rt=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=it.uniform),rc(S,Tt),G.needsLights=_u(S),G.lightsStateVersion=pt,G.needsLights&&(Rt.ambientLightColor.value=N.state.ambient,Rt.lightProbe.value=N.state.probe,Rt.directionalLights.value=N.state.directional,Rt.directionalLightShadows.value=N.state.directionalShadow,Rt.spotLights.value=N.state.spot,Rt.spotLightShadows.value=N.state.spotShadow,Rt.rectAreaLights.value=N.state.rectArea,Rt.ltc_1.value=N.state.rectAreaLTC1,Rt.ltc_2.value=N.state.rectAreaLTC2,Rt.pointLights.value=N.state.point,Rt.pointLightShadows.value=N.state.pointShadow,Rt.hemisphereLights.value=N.state.hemi,Rt.directionalShadowMap.value=N.state.directionalShadowMap,Rt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Rt.spotShadowMap.value=N.state.spotShadowMap,Rt.spotLightMatrix.value=N.state.spotLightMatrix,Rt.spotLightMap.value=N.state.spotLightMap,Rt.pointShadowMap.value=N.state.pointShadowMap,Rt.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=Bt,G.uniformsList=null,Bt}function sc(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=gr.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function rc(S,U){const V=_t.get(S);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function gu(S,U,V,G,N){U.isScene!==!0&&(U=vt),T.resetTextureUnits();const ot=U.fog,pt=G.isMeshStandardMaterial?U.environment:null,Tt=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Gi,At=(G.isMeshStandardMaterial?B:y).get(G.envMap||pt),Ot=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Bt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Rt=!!V.morphAttributes.position,Yt=!!V.morphAttributes.normal,ne=!!V.morphAttributes.color;let ie=In;G.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ie=_.toneMapping);const Re=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,jt=Re!==void 0?Re.length:0,Ct=_t.get(G),sn=p.state.lights;if(st===!0&&(Mt===!0||S!==x)){const Ue=S===x&&G.id===M;it.setState(G,S,Ue)}let Zt=!1;G.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==sn.state.version||Ct.outputColorSpace!==Tt||N.isBatchedMesh&&Ct.batching===!1||!N.isBatchedMesh&&Ct.batching===!0||N.isBatchedMesh&&Ct.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ct.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ct.instancing===!1||!N.isInstancedMesh&&Ct.instancing===!0||N.isSkinnedMesh&&Ct.skinning===!1||!N.isSkinnedMesh&&Ct.skinning===!0||N.isInstancedMesh&&Ct.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ct.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ct.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ct.instancingMorph===!1&&N.morphTexture!==null||Ct.envMap!==At||G.fog===!0&&Ct.fog!==ot||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==it.numPlanes||Ct.numIntersection!==it.numIntersection)||Ct.vertexAlphas!==Ot||Ct.vertexTangents!==Bt||Ct.morphTargets!==Rt||Ct.morphNormals!==Yt||Ct.morphColors!==ne||Ct.toneMapping!==ie||Ct.morphTargetsCount!==jt)&&(Zt=!0):(Zt=!0,Ct.__version=G.version);let ke=Ct.currentProgram;Zt===!0&&(ke=Ds(G,U,N));let si=!1,Pe=!1,ji=!1;const se=ke.getUniforms(),Ye=Ct.uniforms;if(lt.useProgram(ke.program)&&(si=!0,Pe=!0,ji=!0),G.id!==M&&(M=G.id,Pe=!0),si||x!==S){lt.buffers.depth.getReversed()?(rt.copy(S.projectionMatrix),ud(rt),fd(rt),se.setValue(A,"projectionMatrix",rt)):se.setValue(A,"projectionMatrix",S.projectionMatrix),se.setValue(A,"viewMatrix",S.matrixWorldInverse);const xn=se.map.cameraPosition;xn!==void 0&&xn.setValue(A,Nt.setFromMatrixPosition(S.matrixWorld)),yt.logarithmicDepthBuffer&&se.setValue(A,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&se.setValue(A,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Pe=!0,ji=!0)}if(N.isSkinnedMesh){se.setOptional(A,N,"bindMatrix"),se.setOptional(A,N,"bindMatrixInverse");const Ue=N.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),se.setValue(A,"boneTexture",Ue.boneTexture,T))}N.isBatchedMesh&&(se.setOptional(A,N,"batchingTexture"),se.setValue(A,"batchingTexture",N._matricesTexture,T),se.setOptional(A,N,"batchingIdTexture"),se.setValue(A,"batchingIdTexture",N._indirectTexture,T),se.setOptional(A,N,"batchingColorTexture"),N._colorsTexture!==null&&se.setValue(A,"batchingColorTexture",N._colorsTexture,T));const Zi=V.morphAttributes;if((Zi.position!==void 0||Zi.normal!==void 0||Zi.color!==void 0)&&Ft.update(N,V,ke),(Pe||Ct.receiveShadow!==N.receiveShadow)&&(Ct.receiveShadow=N.receiveShadow,se.setValue(A,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ye.envMap.value=At,Ye.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(Ye.envMapIntensity.value=U.environmentIntensity),Pe&&(se.setValue(A,"toneMappingExposure",_.toneMappingExposure),Ct.needsLights&&vu(Ye,ji),ot&&G.fog===!0&&ut.refreshFogUniforms(Ye,ot),ut.refreshMaterialUniforms(Ye,G,$,et,p.state.transmissionRenderTarget[S.id]),gr.upload(A,sc(Ct),Ye,T)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(gr.upload(A,sc(Ct),Ye,T),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&se.setValue(A,"center",N.center),se.setValue(A,"modelViewMatrix",N.modelViewMatrix),se.setValue(A,"normalMatrix",N.normalMatrix),se.setValue(A,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ue=G.uniformsGroups;for(let xn=0,yn=Ue.length;xn<yn;xn++){const oc=Ue[xn];D.update(oc,ke),D.bind(oc,ke)}}return ke}function vu(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function _u(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(S,U,V){_t.get(S.texture).__webglTexture=U,_t.get(S.depthTexture).__webglTexture=V;const G=_t.get(S);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=V===void 0,G.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){const V=_t.get(S);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,V=0){C=S,b=U,R=V;let G=!0,N=null,ot=!1,pt=!1;if(S){const At=_t.get(S);if(At.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(A.FRAMEBUFFER,null),G=!1;else if(At.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(At.__hasExternalTextures)T.rebindTextures(S,_t.get(S.texture).__webglTexture,_t.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Rt=S.depthTexture;if(At.__boundDepthTexture!==Rt){if(Rt!==null&&_t.has(Rt)&&(S.width!==Rt.image.width||S.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}const Ot=S.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(pt=!0);const Bt=_t.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Bt[U])?N=Bt[U][V]:N=Bt[U],ot=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?N=_t.get(S).__webglMultisampledFramebuffer:Array.isArray(Bt)?N=Bt[V]:N=Bt,P.copy(S.viewport),z.copy(S.scissor),F=S.scissorTest}else P.copy(gt).multiplyScalar($).floor(),z.copy(It).multiplyScalar($).floor(),F=$t;if(lt.bindFramebuffer(A.FRAMEBUFFER,N)&&G&&lt.drawBuffers(S,N),lt.viewport(P),lt.scissor(z),lt.setScissorTest(F),ot){const At=_t.get(S.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+U,At.__webglTexture,V)}else if(pt){const At=_t.get(S.texture),Ot=U||0;A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,At.__webglTexture,V||0,Ot)}M=-1},this.readRenderTargetPixels=function(S,U,V,G,N,ot,pt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=_t.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&pt!==void 0&&(Tt=Tt[pt]),Tt){lt.bindFramebuffer(A.FRAMEBUFFER,Tt);try{const At=S.texture,Ot=At.format,Bt=At.type;if(!yt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-G&&V>=0&&V<=S.height-N&&A.readPixels(U,V,G,N,Ht.convert(Ot),Ht.convert(Bt),ot)}finally{const At=C!==null?_t.get(C).__webglFramebuffer:null;lt.bindFramebuffer(A.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(S,U,V,G,N,ot,pt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=_t.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&pt!==void 0&&(Tt=Tt[pt]),Tt){const At=S.texture,Ot=At.format,Bt=At.type;if(!yt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-G&&V>=0&&V<=S.height-N){lt.bindFramebuffer(A.FRAMEBUFFER,Tt);const Rt=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Rt),A.bufferData(A.PIXEL_PACK_BUFFER,ot.byteLength,A.STREAM_READ),A.readPixels(U,V,G,N,Ht.convert(Ot),Ht.convert(Bt),0);const Yt=C!==null?_t.get(C).__webglFramebuffer:null;lt.bindFramebuffer(A.FRAMEBUFFER,Yt);const ne=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await hd(A,ne,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Rt),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,ot),A.deleteBuffer(Rt),A.deleteSync(ne),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,U=null,V=0){S.isTexture!==!0&&(is("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);const G=Math.pow(2,-V),N=Math.floor(S.image.width*G),ot=Math.floor(S.image.height*G),pt=U!==null?U.x:0,Tt=U!==null?U.y:0;T.setTexture2D(S,0),A.copyTexSubImage2D(A.TEXTURE_2D,V,0,0,pt,Tt,N,ot),lt.unbindTexture()},this.copyTextureToTexture=function(S,U,V=null,G=null,N=0){S.isTexture!==!0&&(is("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,S=arguments[1],U=arguments[2],N=arguments[3]||0,V=null);let ot,pt,Tt,At,Ot,Bt,Rt,Yt,ne;const ie=S.isCompressedTexture?S.mipmaps[N]:S.image;V!==null?(ot=V.max.x-V.min.x,pt=V.max.y-V.min.y,Tt=V.isBox3?V.max.z-V.min.z:1,At=V.min.x,Ot=V.min.y,Bt=V.isBox3?V.min.z:0):(ot=ie.width,pt=ie.height,Tt=ie.depth||1,At=0,Ot=0,Bt=0),G!==null?(Rt=G.x,Yt=G.y,ne=G.z):(Rt=0,Yt=0,ne=0);const Re=Ht.convert(U.format),jt=Ht.convert(U.type);let Ct;U.isData3DTexture?(T.setTexture3D(U,0),Ct=A.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),Ct=A.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),Ct=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,U.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,U.unpackAlignment);const sn=A.getParameter(A.UNPACK_ROW_LENGTH),Zt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),ke=A.getParameter(A.UNPACK_SKIP_PIXELS),si=A.getParameter(A.UNPACK_SKIP_ROWS),Pe=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,ie.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,ie.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,At),A.pixelStorei(A.UNPACK_SKIP_ROWS,Ot),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Bt);const ji=S.isDataArrayTexture||S.isData3DTexture,se=U.isDataArrayTexture||U.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const Ye=_t.get(S),Zi=_t.get(U),Ue=_t.get(Ye.__renderTarget),xn=_t.get(Zi.__renderTarget);lt.bindFramebuffer(A.READ_FRAMEBUFFER,Ue.__webglFramebuffer),lt.bindFramebuffer(A.DRAW_FRAMEBUFFER,xn.__webglFramebuffer);for(let yn=0;yn<Tt;yn++)ji&&A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,_t.get(S).__webglTexture,N,Bt+yn),S.isDepthTexture?(se&&A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,N,ne+yn),A.blitFramebuffer(At,Ot,ot,pt,Rt,Yt,ot,pt,A.DEPTH_BUFFER_BIT,A.NEAREST)):se?A.copyTexSubImage3D(Ct,N,Rt,Yt,ne+yn,At,Ot,ot,pt):A.copyTexSubImage2D(Ct,N,Rt,Yt,ne+yn,At,Ot,ot,pt);lt.bindFramebuffer(A.READ_FRAMEBUFFER,null),lt.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else se?S.isDataTexture||S.isData3DTexture?A.texSubImage3D(Ct,N,Rt,Yt,ne,ot,pt,Tt,Re,jt,ie.data):U.isCompressedArrayTexture?A.compressedTexSubImage3D(Ct,N,Rt,Yt,ne,ot,pt,Tt,Re,ie.data):A.texSubImage3D(Ct,N,Rt,Yt,ne,ot,pt,Tt,Re,jt,ie):S.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,N,Rt,Yt,ot,pt,Re,jt,ie.data):S.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,N,Rt,Yt,ie.width,ie.height,Re,ie.data):A.texSubImage2D(A.TEXTURE_2D,N,Rt,Yt,ot,pt,Re,jt,ie);A.pixelStorei(A.UNPACK_ROW_LENGTH,sn),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Zt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,ke),A.pixelStorei(A.UNPACK_SKIP_ROWS,si),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Pe),N===0&&U.generateMipmaps&&A.generateMipmap(Ct),lt.unbindTexture()},this.copyTextureToTexture3D=function(S,U,V=null,G=null,N=0){return S.isTexture!==!0&&(is("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,G=arguments[1]||null,S=arguments[2],U=arguments[3],N=arguments[4]||0),is('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,U,V,G,N)},this.initRenderTarget=function(S){_t.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),lt.unbindTexture()},this.resetState=function(){b=0,R=0,C=null,lt.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class Ha{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=n}clone(){return new Ha(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class S_ extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class E_ extends Ee{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class en{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new nt:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,s=[],r=[],o=[],a=new I,c=new re;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ge(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ge(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Va extends en{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new nt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class w_ extends Va{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ga(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const nr=new I,uo=new Ga,fo=new Ga,po=new Ga;class b_ extends en{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(nr.subVectors(s[0],s[1]).add(s[0]),l=nr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(nr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=nr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),uo.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,v,m),fo.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,v,m),po.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(uo.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),fo.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),po.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(uo.calc(c),fo.calc(c),po.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function gl(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function T_(i,t){const e=1-i;return e*e*t}function A_(i,t){return 2*(1-i)*i*t}function R_(i,t){return i*i*t}function cs(i,t,e,n){return T_(i,t)+A_(i,e)+R_(i,n)}function C_(i,t){const e=1-i;return e*e*e*t}function P_(i,t){const e=1-i;return 3*e*e*i*t}function L_(i,t){return 3*(1-i)*i*i*t}function I_(i,t){return i*i*i*t}function ls(i,t,e,n,s){return C_(i,t)+P_(i,e)+L_(i,n)+I_(i,s)}class Xh extends en{constructor(t=new nt,e=new nt,n=new nt,s=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new nt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ls(t,s.x,r.x,o.x,a.x),ls(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class D_ extends en{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ls(t,s.x,r.x,o.x,a.x),ls(t,s.y,r.y,o.y,a.y),ls(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $h extends en{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class U_ extends en{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qh extends en{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(cs(t,s.x,r.x,o.x),cs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class N_ extends en{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(cs(t,s.x,r.x,o.x),cs(t,s.y,r.y,o.y),cs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yh extends en{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(gl(a,c.x,l.x,h.x,u.x),gl(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new nt().fromArray(s))}return this}}var pa=Object.freeze({__proto__:null,ArcCurve:w_,CatmullRomCurve3:b_,CubicBezierCurve:Xh,CubicBezierCurve3:D_,EllipseCurve:Va,LineCurve:$h,LineCurve3:U_,QuadraticBezierCurve:qh,QuadraticBezierCurve3:N_,SplineCurve:Yh});class F_ extends en{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new pa[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new pa[s.type]().fromJSON(s))}return this}}class ma extends F_{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new $h(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new qh(this.currentPoint.clone(),new nt(t,e),new nt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Xh(this.currentPoint.clone(),new nt(t,e),new nt(n,s),new nt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Yh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new Va(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Wa extends De{constructor(t=[new nt(0,-.5),new nt(.5,0),new nt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ge(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/e,u=new I,d=new nt,f=new I,g=new I,v=new I;let m=0,p=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(g)}for(let w=0;w<=e;w++){const E=n+w*h*s,_=Math.sin(E),L=Math.cos(E);for(let b=0;b<=t.length-1;b++){u.x=t[b].x*_,u.y=t[b].y,u.z=t[b].x*L,o.push(u.x,u.y,u.z),d.x=w/e,d.y=b/(t.length-1),a.push(d.x,d.y);const R=c[3*b+0]*_,C=c[3*b+1],M=c[3*b+0]*L;l.push(R,C,M)}}for(let w=0;w<e;w++)for(let E=0;E<t.length-1;E++){const _=E+w*t.length,L=_,b=_+t.length,R=_+t.length+1,C=_+1;r.push(L,b,C),r.push(R,C,b)}this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("uv",new oe(a,2)),this.setAttribute("normal",new oe(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wa(t.points,t.segments,t.phiStart,t.phiLength)}}class Ci extends De{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new I,h=new nt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("normal",new oe(a,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ci(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Pi extends De{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;w(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(f,2));function w(){const _=new I,L=new I;let b=0;const R=(e-t)/n;for(let C=0;C<=r;C++){const M=[],x=C/r,P=x*(e-t)+t;for(let z=0;z<=s;z++){const F=z/s,k=F*c+a,X=Math.sin(k),H=Math.cos(k);L.x=P*X,L.y=-x*n+m,L.z=P*H,u.push(L.x,L.y,L.z),_.set(X,R,H).normalize(),d.push(_.x,_.y,_.z),f.push(F,1-x),M.push(g++)}v.push(M)}for(let C=0;C<s;C++)for(let M=0;M<r;M++){const x=v[M][C],P=v[M+1][C],z=v[M+1][C+1],F=v[M][C+1];(t>0||M!==0)&&(h.push(x,P,F),b+=3),(e>0||M!==r-1)&&(h.push(P,z,F),b+=3)}l.addGroup(p,b,0),p+=b}function E(_){const L=g,b=new nt,R=new I;let C=0;const M=_===!0?t:e,x=_===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const P=g;for(let z=0;z<=s;z++){const k=z/s*c+a,X=Math.cos(k),H=Math.sin(k);R.x=M*H,R.y=m*x,R.z=M*X,u.push(R.x,R.y,R.z),d.push(0,x,0),b.x=X*.5+.5,b.y=H*.5*x+.5,f.push(b.x,b.y),g++}for(let z=0;z<s;z++){const F=L+z,k=P+z;_===!0?h.push(k,k+1,F):h.push(k+1,k,F),C+=3}l.addGroup(p,C,_===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Xa extends Pi{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Xa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Zn extends ma{constructor(t){super(t),this.uuid=ii(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ma().fromJSON(s))}return this}}const O_={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=jh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=V_(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return vs(r,o,e,a,c,f,0),o}};function jh(i,t,e,n,s){let r,o;if(s===Q_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=vl(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=vl(r,i[r],i[r+1],o);return o&&Cr(o,o.next)&&(xs(o),o=o.next),o}function ei(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Cr(e,e.next)||ae(e.prev,e,e.next)===0)){if(xs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function vs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&q_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?B_(i,n,s,r):k_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),xs(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=z_(ei(i),t,e),vs(i,t,e,n,s,r,2)):o===2&&H_(i,t,e,n,s,r):vs(ei(i),t,e,n,s,r,1);break}}}function k_(i){const t=i.prev,e=i,n=i.next;if(ae(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&wi(s,a,r,c,o,l,g.x,g.y)&&ae(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function B_(i,t,e,n){const s=i.prev,r=i,o=i.next;if(ae(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,v=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=ga(f,g,t,e,n),w=ga(v,m,t,e,n);let E=i.prevZ,_=i.nextZ;for(;E&&E.z>=p&&_&&_.z<=w;){if(E.x>=f&&E.x<=v&&E.y>=g&&E.y<=m&&E!==s&&E!==o&&wi(a,h,c,u,l,d,E.x,E.y)&&ae(E.prev,E,E.next)>=0||(E=E.prevZ,_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&wi(a,h,c,u,l,d,_.x,_.y)&&ae(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;E&&E.z>=p;){if(E.x>=f&&E.x<=v&&E.y>=g&&E.y<=m&&E!==s&&E!==o&&wi(a,h,c,u,l,d,E.x,E.y)&&ae(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;_&&_.z<=w;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&wi(a,h,c,u,l,d,_.x,_.y)&&ae(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function z_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Cr(s,r)&&Zh(s,n,n.next,r)&&_s(s,r)&&_s(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),xs(n),xs(n.next),n=i=r),n=n.next}while(n!==i);return ei(n)}function H_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Z_(o,a)){let c=Jh(o,a);o=ei(o,o.next),c=ei(c,c.next),vs(o,t,e,n,s,r,0),vs(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function V_(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=jh(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(j_(l));for(s.sort(G_),r=0;r<s.length;r++)e=W_(s[r],e);return e}function G_(i,t){return i.x-t.x}function W_(i,t){const e=X_(i,t);if(!e)return t;const n=Jh(e,i);return ei(n,n.next),ei(e,e.next)}function X_(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&wi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),_s(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&$_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function $_(i,t){return ae(i.prev,i,t.prev)<0&&ae(t.next,i,i.next)<0}function q_(i,t,e,n){let s=i;do s.z===0&&(s.z=ga(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Y_(s)}function Y_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function ga(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function j_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function wi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Z_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!J_(i,t)&&(_s(i,t)&&_s(t,i)&&K_(i,t)&&(ae(i.prev,i,t.prev)||ae(i,t.prev,t))||Cr(i,t)&&ae(i.prev,i,i.next)>0&&ae(t.prev,t,t.next)>0)}function ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Cr(i,t){return i.x===t.x&&i.y===t.y}function Zh(i,t,e,n){const s=sr(ae(i,t,e)),r=sr(ae(i,t,n)),o=sr(ae(e,n,i)),a=sr(ae(e,n,t));return!!(s!==r&&o!==a||s===0&&ir(i,e,t)||r===0&&ir(i,n,t)||o===0&&ir(e,i,n)||a===0&&ir(e,t,n))}function ir(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function sr(i){return i>0?1:i<0?-1:0}function J_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Zh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function _s(i,t){return ae(i.prev,i,i.next)<0?ae(i,t,i.next)>=0&&ae(i,i.prev,t)>=0:ae(i,t,i.prev)<0||ae(i,i.next,t)<0}function K_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Jh(i,t){const e=new va(i.i,i.x,i.y),n=new va(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function vl(i,t,e,n){const s=new va(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function xs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function va(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Q_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Dn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Dn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];_l(t),xl(n,t);let o=t.length;e.forEach(_l);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,xl(n,e[c]);const a=O_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function _l(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function xl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class hs extends De{constructor(t=new Zn([new nt(.5,.5),new nt(-.5,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new oe(s,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:t0;let E,_=!1,L,b,R,C;p&&(E=p.getSpacedPoints(h),_=!0,d=!1,L=p.computeFrenetFrames(h,!1),b=new I,R=new I,C=new I),d||(m=0,f=0,g=0,v=0);const M=a.extractPoints(l);let x=M.shape;const P=M.holes;if(!Dn.isClockWise(x)){x=x.reverse();for(let W=0,K=P.length;W<K;W++){const A=P[W];Dn.isClockWise(A)&&(P[W]=A.reverse())}}const F=Dn.triangulateShape(x,P),k=x;for(let W=0,K=P.length;W<K;W++){const A=P[W];x=x.concat(A)}function X(W,K,A){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),W.clone().addScaledVector(K,A)}const H=x.length,et=F.length;function $(W,K,A){let wt,tt,yt;const lt=W.x-K.x,Dt=W.y-K.y,_t=A.x-W.x,T=A.y-W.y,y=lt*lt+Dt*Dt,B=lt*T-Dt*_t;if(Math.abs(B)>Number.EPSILON){const j=Math.sqrt(y),Q=Math.sqrt(_t*_t+T*T),Z=K.x-Dt/j,bt=K.y+lt/j,ut=A.x-T/Q,xt=A.y+_t/Q,Gt=((ut-Z)*T-(xt-bt)*_t)/(lt*T-Dt*_t);wt=Z+lt*Gt-W.x,tt=bt+Dt*Gt-W.y;const it=wt*wt+tt*tt;if(it<=2)return new nt(wt,tt);yt=Math.sqrt(it/2)}else{let j=!1;lt>Number.EPSILON?_t>Number.EPSILON&&(j=!0):lt<-Number.EPSILON?_t<-Number.EPSILON&&(j=!0):Math.sign(Dt)===Math.sign(T)&&(j=!0),j?(wt=-Dt,tt=lt,yt=Math.sqrt(y)):(wt=lt,tt=Dt,yt=Math.sqrt(y/2))}return new nt(wt/yt,tt/yt)}const at=[];for(let W=0,K=k.length,A=K-1,wt=W+1;W<K;W++,A++,wt++)A===K&&(A=0),wt===K&&(wt=0),at[W]=$(k[W],k[A],k[wt]);const ct=[];let gt,It=at.concat();for(let W=0,K=P.length;W<K;W++){const A=P[W];gt=[];for(let wt=0,tt=A.length,yt=tt-1,lt=wt+1;wt<tt;wt++,yt++,lt++)yt===tt&&(yt=0),lt===tt&&(lt=0),gt[wt]=$(A[wt],A[yt],A[lt]);ct.push(gt),It=It.concat(gt)}for(let W=0;W<m;W++){const K=W/m,A=f*Math.cos(K*Math.PI/2),wt=g*Math.sin(K*Math.PI/2)+v;for(let tt=0,yt=k.length;tt<yt;tt++){const lt=X(k[tt],at[tt],wt);rt(lt.x,lt.y,-A)}for(let tt=0,yt=P.length;tt<yt;tt++){const lt=P[tt];gt=ct[tt];for(let Dt=0,_t=lt.length;Dt<_t;Dt++){const T=X(lt[Dt],gt[Dt],wt);rt(T.x,T.y,-A)}}}const $t=g+v;for(let W=0;W<H;W++){const K=d?X(x[W],It[W],$t):x[W];_?(R.copy(L.normals[0]).multiplyScalar(K.x),b.copy(L.binormals[0]).multiplyScalar(K.y),C.copy(E[0]).add(R).add(b),rt(C.x,C.y,C.z)):rt(K.x,K.y,0)}for(let W=1;W<=h;W++)for(let K=0;K<H;K++){const A=d?X(x[K],It[K],$t):x[K];_?(R.copy(L.normals[W]).multiplyScalar(A.x),b.copy(L.binormals[W]).multiplyScalar(A.y),C.copy(E[W]).add(R).add(b),rt(C.x,C.y,C.z)):rt(A.x,A.y,u/h*W)}for(let W=m-1;W>=0;W--){const K=W/m,A=f*Math.cos(K*Math.PI/2),wt=g*Math.sin(K*Math.PI/2)+v;for(let tt=0,yt=k.length;tt<yt;tt++){const lt=X(k[tt],at[tt],wt);rt(lt.x,lt.y,u+A)}for(let tt=0,yt=P.length;tt<yt;tt++){const lt=P[tt];gt=ct[tt];for(let Dt=0,_t=lt.length;Dt<_t;Dt++){const T=X(lt[Dt],gt[Dt],wt);_?rt(T.x,T.y+E[h-1].y,E[h-1].x+A):rt(T.x,T.y,u+A)}}}Y(),st();function Y(){const W=s.length/3;if(d){let K=0,A=H*K;for(let wt=0;wt<et;wt++){const tt=F[wt];Pt(tt[2]+A,tt[1]+A,tt[0]+A)}K=h+m*2,A=H*K;for(let wt=0;wt<et;wt++){const tt=F[wt];Pt(tt[0]+A,tt[1]+A,tt[2]+A)}}else{for(let K=0;K<et;K++){const A=F[K];Pt(A[2],A[1],A[0])}for(let K=0;K<et;K++){const A=F[K];Pt(A[0]+H*h,A[1]+H*h,A[2]+H*h)}}n.addGroup(W,s.length/3-W,0)}function st(){const W=s.length/3;let K=0;Mt(k,K),K+=k.length;for(let A=0,wt=P.length;A<wt;A++){const tt=P[A];Mt(tt,K),K+=tt.length}n.addGroup(W,s.length/3-W,1)}function Mt(W,K){let A=W.length;for(;--A>=0;){const wt=A;let tt=A-1;tt<0&&(tt=W.length-1);for(let yt=0,lt=h+m*2;yt<lt;yt++){const Dt=H*yt,_t=H*(yt+1),T=K+wt+Dt,y=K+tt+Dt,B=K+tt+_t,j=K+wt+_t;Nt(T,y,B,j)}}}function rt(W,K,A){c.push(W),c.push(K),c.push(A)}function Pt(W,K,A){Lt(W),Lt(K),Lt(A);const wt=s.length/3,tt=w.generateTopUV(n,s,wt-3,wt-2,wt-1);vt(tt[0]),vt(tt[1]),vt(tt[2])}function Nt(W,K,A,wt){Lt(W),Lt(K),Lt(wt),Lt(K),Lt(A),Lt(wt);const tt=s.length/3,yt=w.generateSideWallUV(n,s,tt-6,tt-3,tt-2,tt-1);vt(yt[0]),vt(yt[1]),vt(yt[3]),vt(yt[1]),vt(yt[2]),vt(yt[3])}function Lt(W){s.push(c[W*3+0]),s.push(c[W*3+1]),s.push(c[W*3+2])}function vt(W){r.push(W.x),r.push(W.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return e0(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new pa[s.type]().fromJSON(s)),new hs(n,t.options)}}const t0={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new nt(r,o),new nt(a,c),new nt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new nt(o,1-c),new nt(l,1-u),new nt(d,1-g),new nt(v,1-p)]:[new nt(a,1-c),new nt(h,1-u),new nt(f,1-g),new nt(m,1-p)]}};function e0(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class us extends De{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new I,g=new nt;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const w=p+m,E=w,_=w+n+1,L=w+n+2,b=w+1;a.push(E,_,b),a.push(_,L,b)}}this.setIndex(a),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(l,3)),this.setAttribute("uv",new oe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new us(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Pr extends De{constructor(t=new Zn([new nt(0,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new oe(s,3)),this.setAttribute("normal",new oe(r,3)),this.setAttribute("uv",new oe(o,2));function l(h){const u=s.length/3,d=h.extractPoints(e);let f=d.shape;const g=d.holes;Dn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const w=g[m];Dn.isClockWise(w)===!0&&(g[m]=w.reverse())}const v=Dn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const w=g[m];f=f.concat(w)}for(let m=0,p=f.length;m<p;m++){const w=f[m];s.push(w.x,w.y,0),r.push(0,0,1),o.push(w.x,w.y)}for(let m=0,p=v.length;m<p;m++){const w=v[m],E=w[0]+u,_=w[1]+u,L=w[2]+u;n.push(E,_,L),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return n0(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new Pr(n,t.curveSegments)}}function n0(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Me extends As{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Th,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const yl={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class i0{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const s0=new i0;class $a{constructor(t){this.manager=t!==void 0?t:s0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}$a.DEFAULT_MATERIAL_NAME="__DEFAULT";class r0 extends $a{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=yl.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=gs("img");function c(){h(),yl.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class o0 extends $a{constructor(t){super(t)}load(t,e,n,s){const r=new Ee,o=new r0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Kh extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class a0 extends Kh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const mo=new re,Ml=new I,Sl=new I;class c0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ba,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ml.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ml),Sl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Sl),e.updateMatrixWorld(),mo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(mo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class l0 extends c0{constructor(){super(new Bh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class El extends Kh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new l0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const wl=new re;class h0{constructor(t,e,n=0,s=1/0){this.ray=new Lh(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ka,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return wl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wl),this}intersectObject(t,e=!0,n=[]){return _a(t,this,n,e),n.sort(bl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)_a(t[s],this,n,e);return n.sort(bl),n}}function bl(i,t){return i.distance-t.distance}function _a(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)_a(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);function Se(i,t=0,e=new I){return e.set(i.x,t,-i.y)}function u0(i){return{x:i.x,y:-i.z}}function zi(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2D canvas unavailable");return[e,n]}function Ps(i,t){const e=new E_(i);return e.colorSpace=Te,e.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy()),e.needsUpdate=!0,e}function Hi(i){const t=(n,s)=>{let r=n*374761393+s*668265263+i*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296},e=n=>n*n*(3-2*n);return(n,s)=>{const r=Math.floor(n),o=Math.floor(s),a=e(n-r),c=e(s-o),l=t(r,o),h=t(r+1,o),u=t(r,o+1),d=t(r+1,o+1);return l+(h-l)*a+(u-l)*c+(l-h-u+d)*a*c}}function f0(i,t){const e=t.size??2048,n=t.geometry.spec.radius,s=w=>[(w.x/n*.5+.5)*e,(1-(w.y/n*.5+.5))*e],r=e/(2*n),o=e/2,[a,c]=zi(o,o),l=c.createImageData(o,o),h=Hi(11),u=Hi(23);for(let w=0;w<o;w++)for(let E=0;E<o;E++){const _=E/o,L=w/o,b=h(_*3,L*2)*6+u(_*9,L*6)*.8,R=Math.sin((L*9+b)*Math.PI),C=Math.pow(Math.abs(R),6),M=u(_*220,L*40)*.05,x=1-C*.18-M+h(_*2,L*5)*.06,P=(w*o+E)*4;l.data[P]=Math.min(255,222*x),l.data[P+1]=Math.min(255,184*x),l.data[P+2]=Math.min(255,124*x),l.data[P+3]=255}c.putImageData(l,0,0);const[d,f]=zi(e,e);f.imageSmoothingQuality="high",f.drawImage(a,0,0,e,e);const g="rgba(70,45,25,0.85)";for(const w of t.geometry.ropes){const[E,_]=s(w.start),[L,b]=s(w.end),R=Math.hypot(L-E,b-_),C=(L-E)/R,M=(b-_)/R,x=r*.0045,P=r*(t.geometry.spec.pocketRadius+t.geometry.spec.shooterRadius)*.45,z=E-C*P,F=_-M*P,k=R+P*2;f.strokeStyle=g,f.lineWidth=Math.max(1,r*.0011);for(const X of[-1,1])f.beginPath(),f.moveTo(z-M*x*X,F+C*x*X),f.lineTo(z+C*k-M*x*X,F+M*k+C*x*X),f.stroke();for(let X=0;X<k;X+=x*1.6){const H=z+C*X,et=F+M*X;f.beginPath(),f.moveTo(H-M*x-C*x*.7,et+C*x-M*x*.7),f.lineTo(H+M*x+C*x*.7,et-C*x+M*x*.7),f.stroke()}}const[v,m]=s({x:0,y:0}),p=r*.075;f.save(),f.translate(v,m),f.strokeStyle=g,f.fillStyle=g,f.lineWidth=p*.09,f.beginPath(),f.arc(0,0,p*.78,0,Math.PI*2),f.stroke(),f.lineWidth=p*.05,f.beginPath(),f.arc(0,0,p*.62,0,Math.PI*2),f.stroke(),f.beginPath(),f.arc(0,0,p*.14,0,Math.PI*2),f.fill();for(let w=0;w<8;w++){const E=w*Math.PI/4+Math.PI/8;f.lineWidth=p*.07,f.beginPath(),f.moveTo(Math.cos(E)*p*.14,Math.sin(E)*p*.14),f.lineTo(Math.cos(E)*p*1.12,Math.sin(E)*p*1.12),f.stroke(),f.beginPath(),f.ellipse(Math.cos(E)*p*1.15,Math.sin(E)*p*1.15,p*.09,p*.06,E,0,Math.PI*2),f.fill()}return f.restore(),t.geometry.pockets.forEach((w,E)=>{if(t.pocketRoles[E]!=="shark")return;const[_,L]=s(w),b=t.geometry.spec.pocketRadius*r;f.strokeStyle="rgba(200,40,40,0.75)",f.lineWidth=b*.16,f.setLineDash([b*.25,b*.15]),f.beginPath(),f.arc(_,L,b*1.12,0,Math.PI*2),f.stroke(),f.setLineDash([])}),Ps(d,i)}function d0(i,t,e){const s=Hi(5),r=Hi(9),[o,a]=zi(1024,1024),c=a.createImageData(1024,1024),l=t.rails.map(h=>({n:h.normal,t:{x:-h.normal.y,y:h.normal.x}}));for(let h=0;h<1024;h++)for(let u=0;u<1024;u++){const d=(u/1024*2-1)*e,f=(1-h/1024*2)*e;let g=0,v=-1/0;for(let R=0;R<6;R++){const C=-(l[R].n.x*d+l[R].n.y*f);C>v&&(v=C,g=R)}const m=l[g].t.x*d+l[g].t.y*f,p=m>0?1:0,w=v*60+s(m*3+p*17,v*8)*2.2,E=Math.abs(Math.sin(w*Math.PI)),_=r(m*140,v*30);let L=.62+.18*Math.pow(E,3)+.1*_+(p?.04:-.02)+(g%2?.03:0);Math.abs(m)<.004&&(L*=.55);const b=(h*1024+u)*4;c.data[b]=112*L,c.data[b+1]=72*L,c.data[b+2]=42*L,c.data[b+3]=255}return a.putImageData(c,0,0),Ps(o,i)}function p0(i){const e=Hi(31),[n,s]=zi(512,512),r=s.createImageData(512,512);for(let a=0;a<512;a++)for(let c=0;c<512;c++){const l=c/512,h=a/512,u=Math.abs(Math.sin((h*22+e(l*4,h*8)*3)*Math.PI)),d=.7+.2*Math.pow(u,4)+e(l*60,h*9)*.1,f=(a*512+c)*4;r.data[f]=70*d,r.data[f+1]=45*d,r.data[f+2]=30*d,r.data[f+3]=255}s.putImageData(r,0,0);const o=Ps(n,i);return o.wrapS=o.wrapT=xr,o}function m0(i){const[e,n]=zi(256,256),s=Hi(77),r=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const c=Math.hypot(a-38.4,o+153.6)/256,l=Math.abs(Math.sin((c*26+s(a/30,o/30)*.6)*Math.PI)),h=.93+.05*Math.pow(l,6)+s(a/6,o/40)*.05,u=(o*256+a)*4;r.data[u]=214*h,r.data[u+1]=172*h,r.data[u+2]=132*h,r.data[u+3]=255}return n.putImageData(r,0,0),Ps(e,i)}const Li={"anchor-dark":0,"anchor-light":6,"helm-dark":8,"helm-light":2,"chest-dark":20,"chest-light":14,captain:15},g0="./textures/chips.jpg",rr=8,Tl=4;function Qh(i,t){const e=new o0().load(g0,t);return e.colorSpace=Te,e.anisotropy=Math.min(8,i.capabilities.getMaxAnisotropy()),e}function tu(i,t){const e=i.clone();return e.repeat.set(1/rr,1/Tl),e.offset.set(t%rr/rr,1-(Math.floor(t/rr)+1)/Tl),e}function v0(i){const[t,e]=zi(64,16);e.clearRect(0,0,64,16),e.fillStyle="#ffffff",e.beginPath(),e.roundRect(4,2,34,12,6),e.fill();const n=Ps(t,i);return n.wrapS=_r,n}const un=.0035;function _0(){const i=new Cs(1,1);return i.rotateX(-Math.PI/2),i}function or(i,t,e,n,s=un){const r=e.x-t.x,o=e.y-t.y,a=Math.hypot(r,o);return Se({x:(t.x+e.x)/2,y:(t.y+e.y)/2},s,i.position),i.rotation.set(0,Math.atan2(o,r),0),i.scale.set(Math.max(a,1e-4),1,n),a}class x0{constructor(t,e){O(this,"group",new Pn);O(this,"rope");O(this,"ropeMat");O(this,"shooterRing");O(this,"ringMat");O(this,"arrowBody");O(this,"arrowHead");O(this,"arrowMat");O(this,"guide");O(this,"guideMat");O(this,"ghost");O(this,"push");O(this,"pocketMarkers",[]);O(this,"markerMats",[]);O(this,"beacons",[]);O(this,"beaconMats",[]);O(this,"disposables",[]);O(this,"time",0);O(this,"callable",[]);O(this,"called",null);this.g=e;const n=_0();this.disposables.push(n);const s=(d,f=1)=>{const g=new Mr({color:d,transparent:!0,opacity:f,depthWrite:!1});return this.disposables.push(g),g};this.ropeMat=s("#fff2b0",.35),this.rope=new Jt(n,this.ropeMat),this.rope.renderOrder=1;const r=new us(1,1.25,48);r.rotateX(-Math.PI/2),this.disposables.push(r),this.ringMat=s("#ffffff",.85),this.shooterRing=new Jt(r,this.ringMat),this.shooterRing.renderOrder=2,this.arrowMat=s("#7be07b",.9),this.arrowBody=new Jt(n,this.arrowMat);const o=new Zn([new nt(0,-.5),new nt(1,0),new nt(0,.5)]),a=new Pr(o);a.rotateX(-Math.PI/2),this.disposables.push(a),this.arrowHead=new Jt(a,this.arrowMat),this.arrowBody.renderOrder=this.arrowHead.renderOrder=3;const c=v0(t);this.disposables.push(c),this.guideMat=new Mr({map:c,transparent:!0,opacity:.8,depthWrite:!1}),this.disposables.push(this.guideMat),this.guide=new Jt(n,this.guideMat),this.guide.renderOrder=2;const l=new us(.9,1,40);l.rotateX(-Math.PI/2),this.disposables.push(l),this.ghost=new Jt(l,s("#ffffff",.7)),this.push=new Jt(n,s("#ffd166",.85));const h=new us(1,1.22,48);h.rotateX(-Math.PI/2);const u=new Xa(.035,.08,20);u.rotateX(Math.PI),this.disposables.push(h,u);for(let d=0;d<e.pockets.length;d++){const f=s("#ffd166",.9),g=new Jt(h,f);Se(e.pockets[d],un*2,g.position),g.renderOrder=4,g.visible=!1,this.pocketMarkers.push(g),this.markerMats.push(f),this.group.add(g);const v=new Me({color:"#ffffff",emissive:"#ffd166",emissiveIntensity:.6,roughness:.4});this.disposables.push(v);const m=new Jt(u,v);Se(e.pockets[d],.12,m.position),m.visible=!1,m.castShadow=!0,this.beacons.push(m),this.beaconMats.push(v),this.group.add(m)}this.group.add(this.rope,this.shooterRing,this.arrowBody,this.arrowHead,this.guide,this.ghost,this.push),this.hideAll()}hideAll(){this.rope.visible=!1,this.shooterRing.visible=!1,this.clearAim(),this.setCallable([],null)}showRope(t,e){or(this.rope,t.start,t.end,.025,un*.5),this.ropeMat.color.set(e),this.rope.visible=!0}showShooter(t,e,n){Se(t,un,this.shooterRing.position),this.shooterRing.scale.setScalar(e*1.15),this.ringMat.color.set(n?"#ffffff":"#ff4d4d"),this.shooterRing.visible=!0}clearAim(){this.arrowBody.visible=this.arrowHead.visible=this.guide.visible=this.ghost.visible=this.push.visible=!1}showAim(t,e,n,s,r){const o=new Wt().setHSL(.33-.33*n,.85,.55);this.arrowMat.color.copy(o);const a={x:t.x+e.x*s*1.4,y:t.y+e.y*s*1.4},c=.05+n*.32,l={x:a.x+e.x*c,y:a.y+e.y*c};if(or(this.arrowBody,a,l,.022,un*3),Se(l,un*3,this.arrowHead.position),this.arrowHead.rotation.set(0,Math.atan2(e.y,e.x),0),this.arrowHead.scale.set(.06,1,.07),this.arrowBody.visible=this.arrowHead.visible=!0,r&&r.distance>s*.5){const h=or(this.guide,t,r.point,.012,un*2);if(this.guideMat.map.repeat.set(h/.05,1),this.guide.visible=!0,Se(r.point,un*2,this.ghost.position),this.ghost.scale.setScalar(s),this.ghost.visible=!0,r.hit?.type==="piece"){const u=r.hit.push,d={x:r.point.x+u.x*s*2.2,y:r.point.y+u.y*s*2.2};or(this.push,d,{x:d.x+u.x*.18,y:d.y+u.y*.18},.01,un*2),this.push.visible=!0}else this.push.visible=!1}else this.guide.visible=this.ghost.visible=this.push.visible=!1}setCallable(t,e){this.callable=t,this.called=e,this.pocketMarkers.forEach((n,s)=>n.visible=t.includes(s)),this.beacons.forEach((n,s)=>n.visible=t.includes(s))}update(t){this.time+=t;const e=.5+.5*Math.sin(this.time*4);this.ropeMat.opacity=.22+.2*e;const n=this.g.spec.pocketRadius;for(const s of this.callable){const r=this.pocketMarkers[s],o=s===this.called;r.scale.setScalar(n*(o?1.75:1.6+.15*e)),this.markerMats[s].color.set(o?"#ffd166":"#ffffff"),this.markerMats[s].opacity=o?1:.5+.4*e;const a=this.beacons[s];a.position.y=(o?.1:.12)+Math.sin(this.time*5+s)*.015,a.scale.setScalar(o?1.35:1),this.beaconMats[s].color.set(o?"#ffd166":"#ffffff"),this.beaconMats[s].emissiveIntensity=o?.9:.3+.3*e}}dispose(){this.disposables.forEach(t=>t.dispose())}}const Al=.03,go=.17,Rl=.05,Mi=-.07,ar=.027,Cl=.065,Pl=.3,cr=i=>new nt(i.x,i.y);function eu(i,t,e,n,s,r=20){let o=n-e;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;const a=[];for(let c=0;c<=r;c++){const l=e+o*c/r;a.push({x:i.x+Math.cos(l)*t,y:i.y+Math.sin(l)*t})}return a}function y0(i){const t=i.spec.pocketRadius,e=[];for(let n=0;n<6;n++){const s=i.corners[n],r=i.corners[(n+1)%6],o=Math.hypot(r.x-s.x,r.y-s.y),a={x:(r.x-s.x)/o,y:(r.y-s.y)/o},c=i.corners[(n+2)%6],l={x:(c.x-r.x)/o,y:(c.y-r.y)/o},h=i.pockets[(n+1)%6],u=Ll(s,a,h,t,-1),d=Ll(r,l,h,t,1);e.push(...eu(h,t,Math.atan2(u.y-h.y,u.x-h.x),Math.atan2(d.y-h.y,d.x-h.x)))}return e}function Ll(i,t,e,n,s){const r=e.x-i.x,o=e.y-i.y,a=r*t.x+o*t.y,c=r*r+o*o-a*a,l=a+s*Math.sqrt(Math.max(0,n*n-c));return{x:i.x+t.x*l,y:i.y+t.y*l}}function Il(i,t,e){const n=t/(Math.sqrt(3)/2),s=[];for(let r=0;r<6;r++){const o=i.corners[r],a=Math.hypot(o.x,o.y),c={x:o.x/a,y:o.y/a},l={x:c.x*(n-e/(Math.sqrt(3)/2)),y:c.y*(n-e/(Math.sqrt(3)/2))},h=Math.atan2(c.y,c.x);s.push(...eu(l,e,h+Math.PI/6,h-Math.PI/6,!1,20))}return s}function M0(i,t){const e=t.geometry,n=new Pn,s=[],r=vt=>(s.push(vt),vt),o=vt=>(vt.rotateX(-Math.PI/2),vt),a=new Zn(y0(e).map(cr)),c=r(o(new hs(a,{depth:Al,bevelEnabled:!1,curveSegments:24})));c.translate(0,-Al,0);const l=r(f0(i,{geometry:e,pocketRoles:t.pocketRoles}));l.repeat.set(.5/e.spec.radius,.5/e.spec.radius),l.offset.set(.5,.5);const h=new Jt(c,[r(new Me({map:l,roughness:.62})),r(new Me({color:"#2a1a0e",roughness:.95}))]);h.receiveShadow=!0,n.add(h);const u=e.apothem+go,d=Il(e,u,Pl),f=new Zn(d.map(cr)),g=.006;f.holes.push(new ma(Il(e,e.apothem+g,Pl-go).map(cr).reverse()));const v=Rl-Mi,m=r(o(new hs(f,{depth:v,bevelEnabled:!0,bevelThickness:.008,bevelSize:g,bevelSegments:3,curveSegments:24})));m.translate(0,Mi,0);const p=Math.max(...d.map(vt=>Math.hypot(vt.x,vt.y))),w=r(d0(i,e,p));w.repeat.set(.5/p,.5/p),w.offset.set(.5,.5);const E=new Jt(m,r(new Me({map:w,roughness:.38,metalness:.02})));E.castShadow=!0,E.receiveShadow=!0,n.add(E);const _=r(o(new Pr(new Zn(d.map(cr))))),L=new Jt(_,r(new Me({color:"#2b1a10",roughness:.9})));L.position.y=Mi+.001,n.add(L);const b=-Mi-.008,R=e.spec.pocketRadius,C=r(new Pi(R,R,b,48,1,!0)),M=r(new Me({color:"#1e120a",roughness:.95,side:Ae})),x=r(o(new Ci(R,48))),P=r(new Me({color:"#3b2615",roughness:.9})),z=r(new Me({color:"#1d3b52",roughness:.3,emissive:"#06121c"}));e.pockets.forEach((vt,W)=>{const K=new Jt(C,M);Se(vt,-b/2-.003,K.position),n.add(K);const A=new Jt(x,t.pocketRoles[W]==="shark"?z:P);Se(vt,-b+.002,A.position),A.receiveShadow=!0,n.add(A)});const F=new Zn([new nt(-.035,0),new nt(.03,0),new nt(-.02,.05)]),k=r(new hs(F,{depth:.008,bevelEnabled:!1}));k.translate(0,0,-.004);const X=r(new Me({color:"#56626c",roughness:.5})),H=[];e.pockets.forEach((vt,W)=>{if(t.pocketRoles[W]!=="shark")return;const K=new Jt(k,X);n.add(K),H.push({mesh:K,centre:vt,phase:W})});const et=r(new Pi(e.spec.postRadius,e.spec.postRadius,Cl,20)),$=r(new Me({color:"#d8bf8c",roughness:.55}));for(const vt of e.posts){const W=new Jt(et,$);Se(vt,Cl/2,W.position),W.castShadow=!0,n.add(W)}const at=r(new Pi(.052,.052,.004,40)),ct=r(o(new Ci(.044,40))),gt=r(Qh(i,()=>{})),It=new Map,$t=vt=>{let W=It.get(vt);return W||(W=r(new Me({map:r(tu(gt,vt)),roughness:.6})),It.set(vt,W)),W},Y=[];e.rails.forEach((vt,W)=>{const K=t.seatColors[W];if(!K)return void Y.push(null);const A=new Jt(at,r(new Me({color:K,roughness:.4,metalness:.2}))),wt=e.apothem+go*.5;Se({x:-vt.normal.x*wt,y:-vt.normal.y*wt},Rl+.009,A.position),n.add(A);const tt=new Jt(ct,$t(0));tt.position.copy(A.position),tt.position.y+=.0025,tt.rotation.y=Math.atan2(-vt.normal.x,vt.normal.y),tt.visible=!1,n.add(tt),Y.push(tt)});const st=vt=>{Y.forEach((W,K)=>{if(!W)return;const A=vt[K];W.visible=A!=null,W.visible&&(W.material=$t(A))})},Mt=r(p0(i));Mt.repeat.set(6,6);const rt=new Jt(r(o(new Ci(9,64))),r(new Me({map:Mt,roughness:.7})));rt.position.y=Mi,rt.receiveShadow=!0,n.add(rt);const Pt=u+.13,Nt=(vt,W=new I)=>Se(e.pockets[vt],-b+.004,W),Lt=vt=>{for(const W of H){const K=vt*1.6+W.phase,A=R*.55;Se({x:W.centre.x+Math.cos(K)*A,y:W.centre.y+Math.sin(K)*A},-b+.004,W.mesh.position),W.mesh.rotation.y=Math.atan2(Math.cos(K),-Math.sin(K))}};return{group:n,pocketDepth:Nt,extent:Pt+.05,setSeatSymbols:st,update:Lt,dispose:()=>s.forEach(vt=>vt.dispose())}}const Dl=new I(0,1,0),S0=i=>i*37%11/11*1.2-.6,E0=new Xi;class Ul{constructor(t,e,n){O(this,"group",new Pn);O(this,"views",new Map);O(this,"disposables",[]);O(this,"shooter");this.board=e;const s=me(n,"sailor"),r=ar,o=.004,a=new Wa([new nt(0,0),new nt(s-o,0),new nt(s,o),new nt(s,r-o),new nt(s-o,r),new nt(0,r)],40),c=new Ci(s-o*.5,40);c.rotateX(-Math.PI/2),c.translate(0,r+3e-4,0),this.disposables.push(a,c);const l=Qh(t,()=>{});this.disposables.push(l);const h=new Me({color:"#c99a74",roughness:.55}),u=new Me({color:"#b98262",roughness:.5});this.disposables.push(h,u);const d=(f,g)=>{const v=new Me({map:f,roughness:.6});this.disposables.push(f,v);const m=new Pn,p=new Jt(a,g),w=new Jt(c,v);return p.castShadow=w.castShadow=!0,p.receiveShadow=!0,m.add(p,w),m};for(const f of n.pieces){const g=d(tu(l,f.face),h);g.name=f.id,this.group.add(g),this.views.set(f.id,{obj:g,tweens:[],yaw:0})}this.shooter=d(m0(t),u),this.shooter.name="shooter",this.group.add(this.shooter),this.views.set("shooter",{obj:this.shooter,tweens:[],yaw:0}),this.syncToState(n,!1)}setLive(t,e,n=0,s=0){const r=this.views.get(t);!r||r.tweens.length||(Se(e,s*ar,r.obj.position),this.orient(r,n),r.obj.visible=!0)}drop(t,e,n,s,r=0,o=0){const a=this.views.get(t);if(!a)return;const c=this.pocketSlot(e,n),l=Math.hypot(r,o),h=l>1e-6?new I(-o/l,0,-r/l):new I(1,0,0),u=.6+Math.min(1,l/2.5)*.9;a.tweens=[{from:a.obj.position.clone(),to:c,t:0,dur:.24+Math.min(.12,l*.03),arc:0,hideAtEnd:s,yaw:a.yaw+S0(n),tilt:{axis:h,angle:u}}]}fly(t,e,n,s,r,o){const a=this.views.get(t);if(!a)return;const c=Math.hypot(s,r)||1,l=.3+Math.min(.25,c*.04),h=Se({x:e+s/c*l,y:n+r/c*l},Mi),u=new I(-r/c,0,-s/c);a.tweens=[{from:a.obj.position.clone(),to:h,t:0,dur:.5,arc:.22,hideAtEnd:o,yaw:a.yaw+2.5,tilt:{axis:u,angle:Math.PI*2,spin:!0}}]}pocketSlot(t,e){const n=this.board.pocketDepth(t),s=Math.floor(e/7),r=e%7,o=r===0?0:.076,a=(r-1)*(Math.PI/3)+s*.5;return n.x+=Math.cos(a)*o,n.z+=Math.sin(a)*o,n.y+=s*ar+(r===0?0:e*7%5*.0015),n}orient(t,e){t.yaw=e,t.obj.quaternion.setFromAxisAngle(Dl,e)}syncToState(t,e){const n=new Map,s=new Map(t.pieces.map(l=>[l.id,l])),r=l=>{let h=0;for(let u=l;u&&u.loc.at==="board"&&u.loc.on!==void 0&&h<64;h++)u=s.get(u.loc.on);return h};for(const l of t.pieces)l.loc.at==="board"&&n.set(l.id,{pos:Se(l.loc,r(l)*ar),visible:!0,yaw:l.loc.a??0});const o=t.pieces.filter(l=>l.loc.at==="pocket").sort((l,h)=>l.loc.at==="pocket"&&h.loc.at==="pocket"?l.loc.order-h.loc.order:0),a=new Map;for(const l of o){if(l.loc.at!=="pocket")continue;const h=l.loc.pocket,u=a.get(h)??0;a.set(h,u+1);const d=t.pocketRoles[h]==="shark",f=this.views.get(l.id);n.set(l.id,{pos:this.pocketSlot(h,u),visible:!d,yaw:f.yaw})}let c=0;for(const[l,h]of n){const u=this.views.get(l),d=u.tweens[u.tweens.length-1],f=d?d.to.clone():u.obj.position.clone(),g=f.distanceTo(h.pos)>1e-4;if(!e){u.tweens=[],u.obj.position.copy(h.pos),this.orient(u,h.yaw),u.obj.visible=h.visible;continue}if(!g){d||this.orient(u,h.yaw),!h.visible&&!d&&(u.obj.visible=!1);continue}const v=.55+Math.min(.4,f.distanceTo(h.pos)*.25);u.tweens.push({from:f.clone(),to:f.clone(),t:0,dur:c,arc:0,hideAtEnd:!1},{from:f,to:h.pos,t:0,dur:v,arc:Math.min(.25,f.distanceTo(h.pos)*.6),hideAtEnd:!h.visible,yaw:h.yaw}),c+=.06}}static heapSizes(t){const e=[0,0,0,0,0,0];for(const n of t.pieces)n.loc.at==="pocket"&&e[n.loc.pocket]++;return e}placeShooter(t){const e=this.views.get("shooter");if(e.tweens=[],!t){this.shooter.visible=!1;return}this.shooter.visible=!0,Se(t,0,this.shooter.position),this.orient(e,0)}get busy(){for(const t of this.views.values())if(t.tweens.length)return!0;return!1}update(t){for(const e of this.views.values()){const n=e.tweens[0];if(!n)continue;n.t+=t;const s=n.dur<=0?1:Math.min(1,n.t/n.dur),r=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;if(e.obj.position.lerpVectors(n.from,n.to,r),e.obj.position.y+=Math.sin(Math.PI*r)*n.arc,n.yaw!==void 0||n.tilt){const o=n.yaw===void 0?e.yaw:e.yaw+(n.yaw-e.yaw)*r;if(e.obj.quaternion.setFromAxisAngle(Dl,o),n.tilt){const a=n.tilt.spin?n.tilt.angle*r:Math.sin(Math.PI*Math.min(1,s*1.15))*n.tilt.angle;e.obj.quaternion.premultiply(E0.setFromAxisAngle(n.tilt.axis,a))}}n.dur>0&&(e.obj.visible=!0),s>=1&&(e.tweens.shift(),n.yaw!==void 0&&this.orient(e,n.yaw),n.hideAtEnd&&(e.obj.visible=!1))}}dispose(){this.disposables.forEach(t=>t.dispose())}}const vo=["table","top","first"],Nl={table:"3D",top:"Top",first:"Seat"},lr=.92,Fl=1.55,w0=.12,b0=1.56,hr=.56,T0=.05,A0=1.3,Ol=1.3,kl=1.2,R0=.36,_o={orbit:45,first:60},Bl=.3,zl=1.5,Hl=.006,Vl=.0035;class C0{constructor(t){O(this,"renderer");O(this,"scene",new S_);O(this,"camera",new Fe(45,1,.05,60));O(this,"yaw",Math.PI/2);O(this,"targetYaw",Math.PI/2);O(this,"orbitYaw",0);O(this,"targetOrbitYaw",0);O(this,"pitch",lr);O(this,"targetPitch",lr);O(this,"lookYaw",0);O(this,"targetLookYaw",0);O(this,"lookDown",hr);O(this,"targetLookDown",hr);O(this,"seat",0);O(this,"viewMode","table");O(this,"insets",{top:0,bottom:0});O(this,"raycaster",new h0);O(this,"plane",new An(new I(0,1,0),0));O(this,"width",1);O(this,"height",1);O(this,"zoom",1);O(this,"targetZoom",1);O(this,"orbitPos",new I);O(this,"seatPos",new I);O(this,"orbitTarget",new I(0,-.02,0));O(this,"seatTarget",new I);O(this,"lookAt",new I);O(this,"extent",1.35);this.canvas=t,this.renderer=new M_({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=Te,this.renderer.toneMapping=ph,this.renderer.toneMappingExposure=1.1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=fh,this.scene.background=new Wt("#140c07"),this.scene.fog=new Ha("#140c07",4,11);const e=new a0("#fff3e0","#3a2414",1.15);this.scene.add(e);const n=new El("#fff1d6",2.6);n.position.set(1.6,4,1.2),n.castShadow=!0,n.shadow.mapSize.set(2048,2048);const s=n.shadow.camera;s.left=-1.6,s.right=1.6,s.top=1.6,s.bottom=-1.6,s.near=1,s.far=8,n.shadow.bias=-4e-4,n.shadow.normalBias=.01,this.scene.add(n);const r=new El("#9cc9ff",.35);r.position.set(-2,2,-1.5),this.scene.add(r)}zoomBy(t){this.targetZoom=Math.min(zl,Math.max(Bl,this.targetZoom*t))}get magnification(){return 1/this.targetZoom}get canZoomIn(){return this.targetZoom>Bl+1e-6}get canZoomOut(){return this.targetZoom<zl-1e-6}resetZoom(){this.targetZoom=1}orbitBy(t,e){this.viewMode==="first"?(this.targetLookYaw=oi.clamp(this.targetLookYaw-t*Vl,-Ol,Ol),this.targetLookDown=oi.clamp(this.targetLookDown-e*Vl,T0,A0)):(this.targetOrbitYaw+=t*Hl,this.targetPitch=oi.clamp(this.targetPitch+e*Hl,w0,b0))}resetView(){this.targetOrbitYaw=0,this.targetPitch=this.viewMode==="top"?Fl:lr,this.targetLookYaw=0,this.targetLookDown=hr,this.targetZoom=1}get adjusted(){const t=this.viewMode==="top"?Fl:lr;return this.viewMode==="first"?Math.abs(this.targetLookYaw)>.02||Math.abs(this.targetLookDown-hr)>.02||Math.abs(this.targetZoom-1)>.02:Math.abs(this.targetOrbitYaw)>.02||Math.abs(this.targetPitch-t)>.02||Math.abs(this.targetZoom-1)>.02}faceSeat(t,e=!1){let n=Math.atan2(-t.y,t.x);for(;n-this.yaw>Math.PI;)n-=Math.PI*2;for(;n-this.yaw<-Math.PI;)n+=Math.PI*2;this.targetYaw=n,e&&(this.yaw=n)}setViewMode(t,e=!1){this.viewMode=t,this.resetView(),e&&(this.pitch=this.targetPitch,this.orbitYaw=this.targetOrbitYaw,this.lookYaw=this.targetLookYaw,this.lookDown=this.targetLookDown,this.zoom=this.targetZoom,this.seat=t==="first"?1:0)}get mode(){return this.viewMode}setInsets(t){this.insets=t,this.resize()}resize(){const t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.width=t,this.height=e,this.renderer.setSize(t,e,!1),this.camera.aspect=t/e;const n=(this.insets.top-this.insets.bottom)/2;this.camera.setViewOffset(t,e,0,-n,t,e),this.camera.updateProjectionMatrix()}distance(){const t=Math.max(120,this.height-this.insets.top-this.insets.bottom),e=oi.degToRad(this.camera.fov),n=Math.tan(e/2),s=n*(this.width/this.height),r=this.extent,o=r/s,c=r*(Math.sin(this.pitch)+.25*Math.cos(this.pitch))/n*(this.height/t);return Math.max(o,c)}update(t){const e=1-Math.exp(-t*5),n=1-Math.exp(-t*12);this.yaw+=(this.targetYaw-this.yaw)*e,this.orbitYaw+=(this.targetOrbitYaw-this.orbitYaw)*n,this.pitch+=(this.targetPitch-this.pitch)*n,this.lookYaw+=(this.targetLookYaw-this.lookYaw)*n,this.lookDown+=(this.targetLookDown-this.lookDown)*n,this.zoom+=(this.targetZoom-this.zoom)*n,this.seat+=((this.viewMode==="first"?1:0)-this.seat)*e;const s=this.yaw+this.orbitYaw,r=this.distance()*this.zoom,o=Math.cos(this.pitch);this.orbitPos.set(Math.cos(s)*o*r,Math.sin(this.pitch)*r,Math.sin(s)*o*r);const a=Math.cos(this.yaw)*kl,c=Math.sin(this.yaw)*kl,l=this.yaw+Math.PI+this.lookYaw,h=Math.cos(this.lookDown),u=Math.cos(l)*h,d=-Math.sin(this.lookDown),f=Math.sin(l)*h;this.seatPos.set(a,R0,c),this.seatTarget.set(this.seatPos.x+u,this.seatPos.y+d,this.seatPos.z+f);const g=this.seat*this.seat*(3-2*this.seat);this.camera.position.lerpVectors(this.orbitPos,this.seatPos,g),this.lookAt.lerpVectors(this.orbitTarget,this.seatTarget,g);const v=oi.clamp(_o.first*this.zoom,12,85),m=_o.orbit+(v-_o.orbit)*g;Math.abs(this.camera.fov-m)>.001&&(this.camera.fov=m,this.camera.updateProjectionMatrix()),this.camera.lookAt(this.lookAt)}render(){this.renderer.render(this.scene,this.camera)}pick(t,e){const n=this.canvas.getBoundingClientRect(),s=new nt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);this.raycaster.setFromCamera(s,this.camera);const r=new I;return this.raycaster.ray.intersectPlane(this.plane,r)?u0(r):null}worldPerPixel(){const t=Math.max(.6,this.camera.position.distanceTo(this.lookAt)),e=oi.degToRad(this.camera.fov);return 2*t*Math.tan(e/2)/this.height}dispose(){this.renderer.dispose()}}function Qt(i,t={},...e){const n=document.createElement(i);for(const[s,r]of Object.entries(t))r!==void 0&&(s==="class"?n.className=r:n.setAttribute(s,r));for(const s of e)s==null||s===!1||n.append(typeof s=="string"?document.createTextNode(s):s);return n}function le(i){return i.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function fs(i,t=22,e=""){const n=i%8/7*100,s=Math.floor(i/8)/3*100;return`<span class="face" role="img" aria-label="${le(e)}" style="width:${t}px;height:${t}px;background-image:url(./textures/chips.jpg);background-position:${n}% ${s}%"></span>`}class P0{constructor(t,e){O(this,"root");O(this,"scores");O(this,"who");O(this,"hint");O(this,"toastEl");O(this,"power");O(this,"powerFill");O(this,"slider");O(this,"viewBtn");O(this,"lookBtn");O(this,"resetBtn");O(this,"adjusted",!1);O(this,"zoomPanel");O(this,"zoomLabel");O(this,"zoomIn");O(this,"zoomOut");O(this,"zoomText","");O(this,"top");O(this,"bottom");O(this,"toastTimer",0);this.scores=Qt("div",{class:"scores"}),this.who=Qt("div",{class:"who"}),this.hint=Qt("div",{class:"hint"}),this.top=Qt("div",{class:"hud-top"},this.scores,Qt("div",{class:"turn"},this.who,this.hint)),this.toastEl=Qt("div",{class:"toast",role:"status","aria-live":"polite"}),this.powerFill=Qt("div",{class:"fill"}),this.power=Qt("div",{class:"power","aria-hidden":"true"},this.powerFill),this.slider=Qt("input",{type:"range",min:"0",max:"1000",value:"500","aria-label":"Slide the shooter along your rope line"}),this.slider.addEventListener("input",()=>e.onSlide(1-Number(this.slider.value)/1e3)),this.viewBtn=Qt("button",{class:"icon-btn","aria-label":"Change camera view",title:"Camera view (V)"},"3D"),this.viewBtn.addEventListener("click",e.onToggleView),this.lookBtn=Qt("button",{class:"icon-btn","aria-pressed":"false",title:"Look around (L)"},"Look"),this.lookBtn.addEventListener("click",e.onToggleLook),this.resetBtn=Qt("button",{class:"icon-btn reset-view","aria-label":"Reset camera view",title:"Reset view (R)",hidden:""},"⟲"),this.resetBtn.addEventListener("click",e.onResetView);const n=Qt("button",{class:"icon-btn","aria-label":"Menu"},"☰");n.addEventListener("click",e.onMenu),this.bottom=Qt("div",{class:"hud-bottom"},this.power,Qt("div",{class:"controls"},this.viewBtn,this.lookBtn,this.resetBtn,Qt("label",{class:"slider"},Qt("span",{},"Slide"),this.slider),n)),this.zoomIn=Qt("button",{class:"icon-btn zoom-btn","aria-label":"Zoom in",title:"Zoom in (+)"},"+"),this.zoomOut=Qt("button",{class:"icon-btn zoom-btn","aria-label":"Zoom out",title:"Zoom out (−)"},"−"),this.zoomLabel=Qt("span",{class:"zoom-level","aria-live":"polite"},"1×");for(const[s,r]of[[this.zoomIn,1],[this.zoomOut,-1]])L0(s,()=>e.onZoom(r));this.zoomPanel=Qt("div",{class:"zoom-panel",role:"group","aria-label":"Zoom",hidden:""},this.zoomIn,this.zoomLabel,this.zoomOut),this.root=Qt("div",{class:"hud"},this.top,this.toastEl,this.zoomPanel,this.bottom),t.append(this.root)}setViewLabel(t){this.viewBtn.textContent=Nl[t],this.viewBtn.setAttribute("aria-label",`Camera view: ${Nl[t]}. Tap to change.`)}setLooking(t){this.lookBtn.classList.toggle("on",t),this.lookBtn.setAttribute("aria-pressed",String(t)),this.zoomPanel.hidden=!t}setZoom(t,e,n){const s=`${t>=2?t.toFixed(1):t.toFixed(2).replace(/0$/,"")}×`;s!==this.zoomText&&(this.zoomText=s,this.zoomLabel.textContent=s),this.zoomIn.disabled===e&&(this.zoomIn.disabled=!e),this.zoomOut.disabled===n&&(this.zoomOut.disabled=!n)}setViewAdjusted(t){t!==this.adjusted&&(this.adjusted=t,this.resetBtn.hidden=!t)}update(t,e){const n=t.config,s=[];if(n.mode==="versus")n.teams.forEach((a,c)=>{const l=t.claims[c],h=Eo(t,c),u=nh(t,c),d=ws(t)===c&&t.status==="playing",f=l?fs(Li[l],20,Cn[l]):'<span class="face unknown" aria-label="No Sailors claimed yet">?</span>',g=Ta(t),v=t.out[c]?"Out":t.standby===c?"Standby":u?"Captain!":`${h}/${g}`,m=n.players.filter(w=>w.team===c).map(w=>le(w.name)).join(" & "),p=l?`${m} · ${Cn[l]}`:m;s.push(`<div class="chip${d?" active":""}${t.out[c]||t.standby===c?" benched":""}" style="--team:${le(a.color)}">${f}<span class="name">${le(a.name)}</span><span class="count">${v}</span><span class="crew">${p}</span><span class="bar"><i style="width:${100*h/g}%"></i></span></div>`)});else{const a=Eo(t,0),c=Vu(t),l=Gu(t)-a-c,h=t.pieces.find(u=>u.id===Di)?.loc.at==="pocket";s.push(`<div class="chip coop"><span class="name">Rescued</span><span class="count">${a}</span></div>`,`<div class="chip coop shark"><span class="name">Sharks</span><span class="count">${c}</span></div>`,`<div class="chip coop with-icon">${fs(Li.captain,20,"Captain")}<span class="name">${h?"Saved":"Adrift"}</span><span class="count">${h?"✓":l}</span></div>`)}this.scores.innerHTML=s.join(""),this.scores.classList.toggle("many",n.teams.length>3);const r=n.players[t.current],o=n.teams[r.team];if(t.status==="playing"){const a=t.shotInTurn>0?" · again!":"",c=Ve(t)?" · beckon the Captain!":"",l=n.mode==="versus"?t.claims[r.team]:null,h=l?`<span class="who-face">${fs(Li[l],26,Cn[l])}</span>`:`<span class="swatch" style="background:${le(o.color)}"></span>`,u=l?`<span class="who-crew"> · ${Cn[l]}</span>`:"";this.who.innerHTML=`${h}<span class="who-text">${le(r.name)}${u}${a}${c}</span>`}else this.who.textContent=t.status==="won"?"The Captain is saved!":"The sharks got the Captain";this.hint.textContent=e}setSlider(t,e){this.slider.value=String(Math.round((1-t)*1e3)),this.slider.disabled=!e}setPower(t){this.power.classList.toggle("show",t!==null),t!==null&&(this.powerFill.style.width=`${Math.round(t*100)}%`,this.powerFill.style.background=`hsl(${120-120*t} 80% 50%)`)}toast(t,e="info",n=1800){this.toastEl.textContent=t,this.toastEl.className=`toast show ${e}`,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastEl.className="toast",n)}insets(){return{top:this.top.getBoundingClientRect().bottom,bottom:window.innerHeight-this.bottom.getBoundingClientRect().top}}dispose(){window.clearTimeout(this.toastTimer),this.root.remove()}}function xo(i,t,e,n){return new Promise(s=>{const r=Qt("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":t});r.innerHTML=`<h2>${le(t)}</h2><div class="sheet-body">${e}</div>`;const o=Qt("div",{class:"sheet-buttons"});for(const c of n){const l=Qt("button",{class:c.primary?"btn primary":"btn","aria-label":c.label},c.html?"":c.label);c.html&&(l.innerHTML=c.html),l.addEventListener("click",()=>{a.remove(),s(c.id)}),o.append(l)}r.append(o);const a=Qt("div",{class:"overlay"},r);i.append(a),o.querySelector(".primary")?.focus()})}function L0(i,t){let e=0;const n=()=>{window.clearTimeout(e),window.clearInterval(e),e=0};i.addEventListener("pointerdown",s=>{s.preventDefault(),!i.disabled&&(t(),n(),e=window.setTimeout(()=>e=window.setInterval(t,60),300))});for(const s of["pointerup","pointerleave","pointercancel"])i.addEventListener(s,n);i.addEventListener("click",s=>{s.detail===0&&t()})}class I0{constructor(){O(this,"ctx",null);O(this,"noise",null);O(this,"lastClick",0);O(this,"enabled",!0)}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(t)try{this.ctx=new t;const e=Math.floor(this.ctx.sampleRate*.05);this.noise=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noise.getChannelData(0);for(let s=0;s<e;s++)n[s]=(Math.random()*2-1)*Math.pow(1-s/e,3)}catch{this.ctx=null}}clack(t,e=!1){const n=this.ctx;if(!n||!this.noise||!this.enabled)return;const s=n.currentTime;if(s-this.lastClick<.025)return;this.lastClick=s;const r=Math.min(1,t*(e?.25:.6));if(r<.02)return;const o=n.createBufferSource();o.buffer=this.noise;const a=n.createBiquadFilter();a.type="bandpass",a.frequency.value=e?700:2600+Math.random()*600,a.Q.value=e?1.2:3;const c=n.createGain();c.gain.value=r,o.connect(a).connect(c).connect(n.destination),o.start(s)}plop(t){const e=this.ctx;if(!e||!this.enabled)return;const n=e.currentTime,s=e.createOscillator(),r=e.createGain();s.type="sine",s.frequency.setValueAtTime(t?520:300,n),s.frequency.exponentialRampToValueAtTime(t?180:70,n+.18),r.gain.setValueAtTime(.35,n),r.gain.exponentialRampToValueAtTime(.001,n+.25),s.connect(r).connect(e.destination),s.start(n),s.stop(n+.26)}fanfare(){const t=this.ctx;if(!t||!this.enabled)return;const e=t.currentTime;[523,659,784,1046].forEach((n,s)=>{const r=t.createOscillator(),o=t.createGain();r.type="triangle",r.frequency.value=n;const a=e+s*.13;o.gain.setValueAtTime(1e-4,a),o.gain.exponentialRampToValueAtTime(.25,a+.02),o.gain.exponentialRampToValueAtTime(.001,a+.4),r.connect(o).connect(t.destination),r.start(a),r.stop(a+.42)})}}function es(i){try{navigator.vibrate?.(i)}catch{}}function D0(i,t){const e=i.config,n=e.players[t.player].name,s=a=>e.teams[a]?.name??"Crew";if(t.captain?.result==="rescued")return e.mode==="versus"?{text:`The Captain is saved! ${s(t.team)} wins!`,tone:"good"}:{text:"The Captain is saved! Mission complete!",tone:"good"};if(t.captain?.result==="eaten")return{text:"The sharks got the Captain! Mission failed.",tone:"bad"};if(t.foul){const a="The Captain refuses to leave before his Sailors! Back to the Bridge —";return t.status==="won"&&t.winner!==null?{text:`${a} ${s(t.foul.team)} is out. ${s(t.winner)} wins!`,tone:"bad"}:{text:`${a} ${s(t.foul.team)} is ${t.foul.kind==="out"?"out of the game":"on standby"}.`,tone:"bad"}}const r=[];if(t.captain?.result==="returned"&&r.push("Wrong lifeboat — the Captain is back on the Bridge."),t.overboard.length){const a=t.overboard.length;r.push(a===1?"A chip flew out of the water — back on the helm!":`${a} chips flew out of the water — back on the helm!`)}if(t.shooterSunk&&r.push(t.penalty?"Shooter in a lifeboat! One of your Sailors goes back to the Bridge.":"Shooter in a lifeboat!"),e.mode==="versus"){t.claimed&&r.unshift(`${s(t.team)} is rescuing the ${Cn[t.claimed]}!`),t.ownRescued>0&&r.unshift(`${t.ownRescued} rescued!`);const a=t.rescued.filter(c=>c.team!==t.team);for(const c of new Set(a.map(l=>l.team))){const l=a.filter(h=>h.team===c).length;r.push(c>=0?`${l} rescued for ${s(c)}.`:`${l} spare Sailor${l>1?"s":""} rescued.`)}}else t.rescued.length&&r.unshift(`${t.rescued.length} rescued!`),t.lost.length&&r.push(`${t.lost.length} lost to the sharks!`);if(t.turnContinues&&r.push(`${n}, go again!`),t.timedOut&&r.push("(Shot stopped after the time limit.)"),r.length===0||r.length===1&&t.overboard.length&&!t.turnContinues)return{text:`${r.length?`${r[0]} `:"No rescue. "}${e.players[t.nextPlayer].name}'s turn.`,tone:"info"};const o=t.shooterSunk||t.lost.length>0||t.captain?.result==="returned";return{text:r.join(" "),tone:o?"bad":t.turnContinues?"good":"info"}}class U0{constructor(){O(this,"online",!1);O(this,"isHost",!0);O(this,"h",null)}canAct(){return!0}submit(t){queueMicrotask(()=>this.h?.action(t))}connect(t){this.h=t}applied(){}idle(){}waiting(){return null}sending(){return!1}dispose(){this.h=null}}class N0{constructor(){O(this,"worker",null);O(this,"nextId",1);O(this,"pending",new Map);try{this.worker=new Worker(new URL(""+new URL("ai.worker-CHcxGjnd.js",import.meta.url).href,import.meta.url),{type:"module"}),this.worker.onmessage=t=>{const e=this.pending.get(t.data.id);e&&(this.pending.delete(t.data.id),t.data.input?e.resolve(t.data.input):e.reject(new Error(t.data.error??"AI failed")))},this.worker.onerror=()=>this.fallBack()}catch{this.worker=null}}plan(t,e){const n=Math.random()*4294967296>>>0;if(this.worker){const s=this.nextId++;return new Promise((o,a)=>{this.pending.set(s,{resolve:o,reject:a}),this.worker.postMessage({id:s,state:t,level:e,seed:n})}).catch(()=>this.sliced(t,e,n))}return this.sliced(t,e,n)}sliced(t,e,n){const s=af(t,e,nf(n));return new Promise((r,o)=>{const a=()=>{try{const c=performance.now()+10;for(;;){const l=s.next();if(l.done)return r(l.value);if(performance.now()>c)break}setTimeout(a,0)}catch(c){o(c instanceof Error?c:new Error(String(c)))}};setTimeout(a,0)})}fallBack(){this.worker?.terminate(),this.worker=null;for(const t of this.pending.values())t.reject(new Error("retry"));this.pending.clear()}dispose(){this.worker?.terminate(),this.worker=null,this.pending.clear()}}const F0=90,O0=3.2;function k0(i,t,e,n){const s=Math.max(F0,e*2.2),r=i.filter(h=>t-h.t<=s);if(r.length<2)return{vx:0,vy:0,power:0};const o=r[0],a=r[r.length-1],c=Math.max(1,a.t-o.t)/1e3,l=Math.hypot(a.x-o.x,a.y-o.y)/c;return{vx:a.w.x-o.w.x,vy:a.w.y-o.w.y,power:Math.min(1,l/(n*O0))}}const ys="chipwreck.match.v2",nu="chipwreck.prefs.v1";function iu(i){try{i.status==="playing"?localStorage.setItem(ys,JSON.stringify(i)):localStorage.removeItem(ys)}catch{}}function Gl(){try{const i=localStorage.getItem(ys);return i?bo(JSON.parse(i)):null}catch{try{localStorage.removeItem(ys)}catch{}return null}}function xa(){try{localStorage.removeItem(ys)}catch{}}function B0(){const i={sound:!0,view:"table",flick:"pull",names:[]};try{const t=JSON.parse(localStorage.getItem(nu)??"{}");return{sound:typeof t.sound=="boolean"?t.sound:i.sound,view:t.view==="top"||t.view==="first"?t.view:"table",flick:t.flick==="flick"?"flick":"pull",names:Array.isArray(t.names)?t.names.filter(e=>typeof e=="string").slice(0,6):[]}}catch{return i}}function Ii(i){try{localStorage.setItem(nu,JSON.stringify(i))}catch{}}const Wl=typeof matchMedia=="function"&&matchMedia("(pointer: fine)").matches,z0=.34,Xl=.05,H0=2400;class su{constructor(t,e,n,s,r,o=new U0,a=0,c=()=>[]){O(this,"board");O(this,"pieces");O(this,"aim");O(this,"hud");O(this,"phase","aim");O(this,"shooter",{x:0,y:0});O(this,"called",null);O(this,"drag",null);O(this,"sim",null);O(this,"simInput",null);O(this,"seenPocketed",0);O(this,"seenOffBoard",0);O(this,"heaps",[]);O(this,"acc",0);O(this,"speed",1);O(this,"raf",0);O(this,"last",0);O(this,"clock",0);O(this,"disposed",!1);O(this,"settleTimer",0);O(this,"looking",!1);O(this,"pointers",new Map);O(this,"queue",[]);O(this,"frameMs",16);O(this,"correction",null);O(this,"sfx",new I0);O(this,"ai",new N0);O(this,"aiTurn",null);O(this,"turnSeq",0);O(this,"cleanup",[]);O(this,"frame",t=>{if(this.disposed)return;const e=Math.min(.1,Math.max(0,(t-this.last)/1e3)),n=this.last;this.last=t,this.clock+=e,this.frameMs+=(Math.min(1e3,Math.max(0,t-n))-this.frameMs)*.2,this.phase==="rolling"&&this.sim&&this.stepSimulation(e),this.aiTurn&&this.driveAi(e),this.pieces.update(e),this.phase==="settling"&&this.afterSettle(),this.aim.update(e),this.board.update(this.clock),this.stage.update(e),this.hud.setViewAdjusted(this.stage.adjusted),this.looking&&this.hud.setZoom(this.stage.magnification,this.stage.canZoomIn,this.stage.canZoomOut),this.stage.render(),this.raf=requestAnimationFrame(this.frame)});this.root=t,this.stage=e,this.state=n,this.prefs=s,this.exit=r,this.link=o,this.applied=a,this.menuExtras=c,this.sfx.enabled=s.sound;const l=Ge(n),h=Array.from({length:6},(f,g)=>{const v=n.seats.indexOf(g);return v>=0?n.config.teams[n.config.players[v].team].color:null});this.board=M0(e.renderer,{geometry:l,pocketRoles:n.pocketRoles,seatColors:h}),e.extent=this.board.extent,this.pieces=new Ul(e.renderer,this.board,n),this.aim=new x0(e.renderer,l),e.scene.add(this.board.group,this.pieces.group,this.aim.group),this.hud=new P0(t,{onSlide:f=>this.slideTo(f),onToggleView:()=>this.toggleView(),onToggleLook:()=>this.toggleLook(),onResetView:()=>this.stage.resetView(),onZoom:f=>this.stage.zoomBy(f>0?1/1.08:1.08),onMenu:()=>void this.openMenu()}),e.setViewMode(s.view,!0),this.hud.setViewLabel(s.view);const u=e.canvas,d=(f,g,v)=>{f.addEventListener(g,v,{passive:!1}),this.cleanup.push(()=>f.removeEventListener(g,v))};d(u,"pointerdown",f=>this.onDown(f)),d(u,"pointermove",f=>this.onMove(f)),d(u,"pointerup",f=>this.onUp(f)),d(u,"pointercancel",f=>{this.pointers.delete(f.pointerId),this.cancelDrag()}),d(u,"pointerleave",()=>u.style.cursor=""),d(u,"wheel",f=>{f.preventDefault(),this.stage.zoomBy(f.deltaY>0?1.08:1/1.08)}),d(window,"keydown",f=>this.onKey(f)),d(u,"contextmenu",f=>f.preventDefault()),d(window,"resize",()=>this.layout()),this.layout(),o.connect({action:f=>{this.queue.push(f),this.pump()},correct:(f,g)=>this.adopt(f,g)}),this.pieces.syncToState(this.state,!1),this.beginTurn(!0),this.last=performance.now(),this.raf=requestAnimationFrame(this.frame),this.exposeDebug()}beginTurn(t=!1){this.correction&&(this.state=this.correction.state,this.applied=this.correction.count,this.correction=null,this.pieces.syncToState(this.state,!0));const e=this.state;if(this.turnSeq++,this.aiTurn=null,e.status!=="playing"){this.gameOver();return}if(e.pending){this.askClaim(e.pending.report);return}const n=Aa(this.state);if(!n){this.phase="aim",this.aim.hideAll(),this.pieces.placeShooter(null),this.hud.toast(`${this.state.config.players[this.state.current].name}'s rope is blocked — passing the turn.`,"info"),this.link.canAct(this.state.current)&&this.link.submit({t:"p"}),this.refreshHud(),this.link.idle(this.state),this.pump();return}this.phase="aim",this.called=null,this.shooter=n,this.stage.faceSeat(lc(Ge(e),dc(e)),t),e.shotInTurn===0&&this.stage.resetView(),this.pieces.placeShooter(n);const s=e.config.teams[ws(e)].color;this.aim.showRope(je(e),s),this.aim.setCallable(Ve(e)&&this.canAim()?fn(e):[],null),this.refreshShooter(),this.isAi(e.current)&&this.startAiTurn(),this.refreshHud(),this.link.idle(this.state),this.pump()}isAi(t){return!this.link.online&&!!this.state.config.players[t]?.ai}startAiTurn(){const t=this.turnSeq,e=this.state.config.players[this.state.current].ai;this.aiTurn={seq:t,stage:"thinking",input:null,from:{...this.shooter},t:0,readyAt:this.clock+.8},this.ai.plan(this.state,e).then(n=>{this.disposed||!this.aiTurn||this.aiTurn.seq!==t||(this.aiTurn.input=n)},n=>{console.error(n),!(this.disposed||!this.aiTurn||this.aiTurn.seq!==t)&&(this.aiTurn.input=this.fallbackShot())})}fallbackShot(){const t=this.state,e=lc(Ge(t),dc(t)),n=t.config.physics.maxShotSpeed*.7,s={shooter:{...this.shooter},velocity:{x:-e.x*n,y:-e.y*n}};return Ve(t)&&(s.calledPocket=fn(t)[0]),s}driveAi(t){const e=this.aiTurn;if(!e||this.phase!=="aim"||e.seq!==this.turnSeq)return;if(e.stage==="thinking"){if(!e.input||this.clock<e.readyAt)return;qn(this.state,e.input)&&(e.input=this.fallbackShot()),e.stage="moving",e.t=0,e.from={...this.shooter},e.input.calledPocket!==void 0&&(this.called=e.input.calledPocket,this.aim.setCallable(fn(this.state),this.called));return}const n=e.input;if(e.t+=t,e.stage==="moving"){const l=Math.min(1,e.t/.6),h=l<.5?2*l*l:1-Math.pow(-2*l+2,2)/2;this.shooter={x:e.from.x+(n.shooter.x-e.from.x)*h,y:e.from.y+(n.shooter.y-e.from.y)*h},l>=1&&(this.shooter={...n.shooter},e.stage="aiming",e.t=0),this.refreshShooter(),this.hud.setSlider(this.ropeT(),!1);return}const s=this.state.config.physics.maxShotSpeed,r=Math.hypot(n.velocity.x,n.velocity.y),o=Math.max(0,Math.min(1,(r/s-.04)/.96)),a=Math.min(1,e.t/.7),c={x:n.velocity.x/r,y:n.velocity.y/r};this.aim.showAim(this.shooter,c,o*a,me(this.state,"shooter"),null),a>=1&&e.t>.9&&(this.aiTurn=null,this.aim.clearAim(),this.link.submit({t:"s",i:qn(this.state,n)?this.fallbackShot():n}),es(12))}netChanged(){this.disposed||(this.phase==="aim"&&(this.aim.setCallable(Ve(this.state)&&this.canAim()?fn(this.state):[],this.called),this.refreshShooter()),this.refreshHud())}canAim(){return this.phase==="aim"&&this.link.canAct(this.state.current)&&!this.isAi(this.state.current)&&!this.link.sending()&&this.state.status==="playing"}pump(){const t=this.queue[0];if(!(!t||this.disposed)){if(t.t==="c"){if(this.phase!=="claiming"||!this.state.pending)return;this.queue.shift(),this.applyClaim(t.k);return}if(!(this.phase!=="aim"||this.state.pending)){if(this.queue.shift(),t.t==="p"){try{this.state=Yu(this.state)}catch(e){return console.error(e),this.pump()}this.afterAction(),this.phase="settling",this.refreshHud();return}this.startShot(t.i)}}}afterAction(){this.applied++,this.link.online||iu(this.state),this.link.applied(this.state,this.applied)}adopt(t,e){if(this.sim||this.phase==="rolling"){this.correction={state:t,count:e};return}this.state=t,this.applied=e,this.pieces.syncToState(t,!0),this.refreshHud(),this.phase==="aim"&&this.beginTurn()}hint(){if(this.state.status!=="playing"||this.phase==="over")return"";if(this.phase==="rolling")return"Tap to speed up";if(this.phase==="settling")return"";const t=this.link.waiting(this.state);if(t)return t;if(this.phase==="aim"&&this.isAi(this.state.current)){const n=this.state.config.players[this.state.current];return`${n.name.startsWith("Computer")?`${n.name} (${Ro[n.ai]})`:`${n.name} (computer · ${Ro[n.ai]})`} is lining up a shot…`}if(this.phase!=="aim")return"";if(Ve(this.state)&&this.called===null)return"Beckon the Captain: tap the lifeboat you’re aiming for";if(this.looking)return Wl?"Look around: drag to turn · scroll or + − to zoom · L to aim again":"Look around: drag to turn · pinch or + − to zoom · tap Look to aim";const e=this.prefs.flick==="flick";return Wl?`Drag along your rope (or ← →) · ${e?"click and flick toward your target":"pull back anywhere to flick"} · right-drag to turn the view`:`Slide along your rope · ${e?"press and flick toward your target":"pull back anywhere to flick"} · two fingers to turn the view`}refreshHud(){this.hud.update(this.state,this.hint()),this.board.setSeatSymbols(this.seatSymbols()),this.hud.setSlider(this.ropeT(),this.canAim())}seatSymbols(){const t=this.state;return Array.from({length:6},(e,n)=>{const s=t.seats.indexOf(n),r=s>=0&&t.config.mode==="versus"?t.claims[t.config.players[s].team]:null;return r?Li[r]:null})}refreshShooter(){const t=!ds(this.state,this.shooter);this.pieces.placeShooter(this.shooter),this.aim.showShooter(this.shooter,me(this.state,"shooter"),t)}slideTo(t){if(!this.canAim())return;const e=je(this.state);this.shooter={x:e.start.x+(e.end.x-e.start.x)*t,y:e.start.y+(e.end.y-e.start.y)*t},this.refreshShooter()}shoot(t,e){const n=this.state,s=n.config.physics.maxShotSpeed*(.04+.96*e),r={shooter:{...this.shooter},velocity:{x:t.x*s,y:t.y*s}};if(Ve(n)){if(this.called===null){this.hud.toast("Announce your lifeboat first — tap one of the glowing pockets.","info",2600);return}r.calledPocket=this.called}const o=qn(n,r);if(o){this.hud.toast(o,"bad");return}this.canAim()&&(this.aim.clearAim(),this.hud.setPower(null),this.link.submit({t:"s",i:r}),this.refreshHud(),es(12))}startShot(t){const e=this.state,n=qn(e,t);if(n)return console.error("Dropped an illegal shot:",n),this.pump();this.shooter={...t.shooter},this.called=t.calledPocket??null,this.pieces.placeShooter(this.shooter),this.sim=sh(e,t),this.simInput=t,this.seenPocketed=0,this.seenOffBoard=0,this.heaps=Ul.heapSizes(this.state),this.acc=0,this.speed=1,this.phase="rolling",this.aim.clearAim(),this.aim.hideAll(),this.aim.setCallable(this.called!==null?[this.called]:[],this.called),this.hud.setPower(null),this.refreshHud()}stepSimulation(t){const e=this.sim;this.acc+=Math.min(t,.1)*this.speed;let n=0;for(;this.acc>=e.params.dt&&!e.finished&&n<H0;){const r=e.step();for(const o of r)this.sfx.clack(o.impulse,o.b===null||o.b==="lip");this.acc-=e.params.dt,n++}for(;this.seenPocketed<e.pocketed.length;this.seenPocketed++){const r=e.pocketed[this.seenPocketed],a=this.state.pocketRoles[r.pocket]==="shark"||r.id===Jn,c=this.heaps[r.pocket]??0;r.id!==Jn&&(this.heaps[r.pocket]=c+1),this.pieces.drop(r.id,r.pocket,c,a,r.vx,r.vy),this.sfx.plop(!a),es(a?[20,40,20]:25)}for(;this.seenOffBoard<e.offBoard.length;this.seenOffBoard++){const r=e.offBoard[this.seenOffBoard];this.pieces.fly(r.id,r.x,r.y,r.vx,r.vy,r.id===Jn),this.sfx.clack(4,!0),es([15,30,15])}const s=new Map(e.bodies.map(r=>[r.id,r]));for(const r of e.bodies){let o=0;for(let a=r.base;a!==null&&o<64;o++)a=s.get(a)?.base??null;this.pieces.setLive(r.id,r,r.a,o)}e.finished&&this.resolveShot()}resolveShot(){const t=this.sim,e=this.simInput;this.sim=null,this.simInput=null,this.phase="settling";let n;try{n=rh(this.state,e,t.outcome())}catch(s){console.error(s),this.hud.toast("Something went wrong with that shot — retake it.","bad"),this.pieces.syncToState(this.state,!1),this.beginTurn();return}if(this.state=n.state,this.pieces.syncToState(this.state,!0),this.afterAction(),this.state.pending){this.askClaim(n.report);return}this.announce(n.report)}async askClaim(t){if(this.phase="claiming",this.refreshHud(),this.link.idle(this.state),!this.link.canAct(t.player))return this.hud.toast(`${this.state.config.players[t.player].name} is choosing which Sailors to rescue…`,"info",3e3),this.pump();if(this.isAi(t.player)){const s=this.state.config.players[t.player].ai,r=of(this.state,s);this.hud.toast(`${this.state.config.players[t.player].name} is rescuing the ${Cn[r]}!`,"info",2400);const o=()=>{this.disposed||(this.phase==="claiming"?this.link.submit({t:"c",k:r}):this.phase==="paused"&&window.setTimeout(o,300))};window.setTimeout(o,900);return}const e=t.claimOptions??[],n=await xo(this.root,"Choose your Sailors",`<p>${t.rescued.length} Sailors made it to the lifeboats. Which crew will ${this.state.config.teams[t.team].name} rescue?</p>`,e.map((s,r)=>({id:s,label:Cn[s],html:`${fs(Li[s],34,"")}<span>${Cn[s]}</span>`,primary:r===0})));this.disposed||this.link.submit({t:"c",k:n})}applyClaim(t){let e;try{e=Ra(this.state,t)}catch(n){console.error(n);return}this.state=e.state,this.pieces.syncToState(this.state,!0),this.afterAction(),this.phase="settling",this.announce(e.report)}announce(t){const e=D0(this.state,t);this.hud.toast(e.text,e.tone,2600),t.status==="won"&&this.sfx.fanfare(),this.refreshHud()}afterSettle(){this.phase!=="settling"||this.pieces.busy||this.settleTimer||(this.settleTimer=window.setTimeout(()=>{this.settleTimer=0,!(this.disposed||this.phase!=="settling")&&this.beginTurn()},this.state.status==="playing"?650:900))}async gameOver(){this.phase="over",this.aim.hideAll(),this.pieces.placeShooter(null),this.refreshHud(),xa();const t=this.state,e=t.status==="won"?t.config.mode==="versus"?`${t.config.teams[t.winner].name} wins!`:"Mission complete!":"Mission failed",n=t.config.players.filter(l=>l.team===t.winner).map(l=>l.name).join(" & "),s=t.pieces.filter(l=>l.kind==="sailor"&&l.loc.at==="pocket"&&t.pocketRoles[l.loc.pocket]==="lifeboat").length,r=t.pieces.some(l=>l.kind==="captain"&&l.loc.at==="pocket"&&t.pocketRoles[l.loc.pocket]==="lifeboat"),o=`${fs(Li.captain,72,"The Captain")}`+(t.config.mode==="versus"?`<p>${n} ${r?"saved the Captain":"are the last crew standing"} after ${t.turn} turn${t.turn===1?"":"s"}.</p>`:`<p>${s} of 30 Sailors rescued${r?", and the Captain is safe":""}.</p>`),a=this.link.online&&!this.link.isHost,c=await xo(this.root,e,o+(a?"<p>Waiting for the host to start a rematch…</p>":""),a?[{id:"menu",label:"Leave game"}]:[{id:"rematch",label:"Play again",primary:!0},{id:"menu",label:this.link.online?"End online game":"Main menu"}]);this.disposed||this.exit(c==="rematch"?"rematch":"menu")}async openMenu(){if(this.phase==="over"||this.phase==="paused")return;const t=this.phase;this.phase="paused",this.cancelDrag();const e=this.link.online,n=this.menuExtras(),s=await xo(this.root,e?"Menu":"Paused",`<p>Turn ${this.state.turn} · ${this.state.config.players[this.state.current].name} to shoot.</p>`,[{id:"resume",label:"Resume",primary:!0},{id:"sound",label:this.prefs.sound?"Sound: on":"Sound: off"},{id:"flick",label:`Flick style: ${this.prefs.flick==="flick"?"Flick":"Pull back"}`},...n.map(r=>({id:`x:${r.id}`,label:r.label})),...e?[]:[{id:"restart",label:"Restart match"}],{id:"menu",label:e?this.link.isHost?"End online game":"Leave game":"Save & quit"}]);if(!this.disposed){if(this.phase=t,s.startsWith("x:")){n.find(r=>`x:${r.id}`===s)?.run(),this.refreshHud(),this.pump();return}this.pump(),s==="sound"?(this.prefs.sound=!this.prefs.sound,this.sfx.enabled=this.prefs.sound,Ii(this.prefs),this.openMenu()):s==="flick"?(this.prefs.flick=this.prefs.flick==="flick"?"pull":"flick",Ii(this.prefs),this.refreshHud(),this.openMenu()):s==="restart"?(xa(),this.exit("rematch")):s==="menu"&&this.exit("menu")}}toggleView(t){const e=t??vo[(vo.indexOf(this.stage.mode)+1)%vo.length];this.stage.setViewMode(e),this.hud.setViewLabel(e),this.prefs.view=e,Ii(this.prefs)}toggleLook(){this.looking=!this.looking,this.hud.setLooking(this.looking),this.cancelDrag(),this.refreshHud()}layout(){this.stage.resize(),this.stage.setInsets(this.hud.insets())}touchTolerance(){return Math.max(.06,26*this.stage.worldPerPixel())}onDown(t){if(t.preventDefault(),this.sfx.unlock(),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.capture(t.pointerId,!0),this.pointers.size===2){this.cancelDrag();const[u,d]=[...this.pointers.values()];this.drag={kind:"orbit2",cx:(u.x+d.x)/2,cy:(u.y+d.y)/2,dist:Math.hypot(u.x-d.x,u.y-d.y)};return}if(this.drag||this.phase==="over"||this.phase==="paused")return;const e=this.phase==="rolling"||this.phase==="settling",n=t.pointerType==="mouse"&&(t.button===1||t.button===2);if(e||n||this.looking||this.phase==="claiming"||this.phase==="aim"&&!this.canAim()){this.drag={kind:"orbit",pointerId:t.pointerId,x:t.clientX,y:t.clientY,moved:0,tapSpeedsUp:e};return}if(this.phase!=="aim"||this.drag)return;const s=this.stage.pick(t.clientX,t.clientY);if(!s)return;const r=this.state,o=Ge(r),a=this.touchTolerance();if(Ve(r))for(const u of fn(r)){const d=o.pockets[u];if(Math.hypot(s.x-d.x,s.y-d.y)<o.spec.pocketRadius+a){this.called=this.called===u?null:u,this.aim.setCallable(fn(r),this.called),this.refreshHud(),es(8);return}}const c=je(r),l=Math.hypot(s.x-this.shooter.x,s.y-this.shooter.y)<me(r,"shooter")+a*.6;Math.hypot(...(()=>{const u=rs(s,c.start,c.end);return[u.x-s.x,u.y-s.y]})())<a&&!l?(this.drag={kind:"slide",pointerId:t.pointerId},this.moveShooterTo(s)):this.drag={kind:"pull",style:this.prefs.flick,pointerId:t.pointerId,sx:t.clientX,sy:t.clientY,start:s,dir:null,power:0,samples:[{t:t.timeStamp,x:t.clientX,y:t.clientY,w:s}]}}onKey(t){if(t.target?.closest?.("input, textarea, .overlay"))return;const e=t.key;if(e==="Escape"){this.drag?this.cancelDrag():this.openMenu(),t.preventDefault();return}if(e==="v"||e==="V"){this.toggleView();return}if(e==="+"||e==="=")return this.stage.zoomBy(1/1.15);if(e==="-"||e==="_")return this.stage.zoomBy(1.15);if(e==="0"||e==="r"||e==="R")return this.stage.resetView();if(e==="f"||e==="F")return this.toggleView(this.stage.mode==="first"?"table":"first");if(e==="l"||e==="L")return this.toggleLook();const n=24;if(e==="q"||e==="Q")return this.stage.orbitBy(-n,0);if(e==="e"||e==="E")return this.stage.orbitBy(n,0);if(e==="w"||e==="W")return this.stage.orbitBy(0,-n);if(e==="s"||e==="S")return this.stage.orbitBy(0,n);if(!(this.phase!=="aim"||this.drag)&&(e==="ArrowLeft"||e==="ArrowRight"||e==="a"||e==="d"||e==="A"||e==="D")){t.preventDefault();const s=e==="ArrowLeft"||e==="a"||e==="A"?1:-1,r=t.shiftKey?.004:.025;this.slideTo(Math.min(1,Math.max(0,this.ropeT()+s*r))),this.refreshHud()}}ropeT(){const t=je(this.state),e=t.end.x-t.start.x,n=t.end.y-t.start.y;return((this.shooter.x-t.start.x)*e+(this.shooter.y-t.start.y)*n)/(e*e+n*n)}updateCursor(t){if(t.pointerType!=="mouse")return;const e=this.stage.canvas;if(this.drag){e.style.cursor=this.drag.kind==="slide"?"ew-resize":"grabbing";return}if(this.looking){e.style.cursor="grab";return}if(this.phase!=="aim"){e.style.cursor=this.phase==="rolling"?"pointer":"default";return}const n=this.stage.pick(t.clientX,t.clientY);if(!n)return;const s=this.state,r=Ge(s),o=this.touchTolerance();if(Ve(s)&&fn(s).some(h=>Math.hypot(n.x-r.pockets[h].x,n.y-r.pockets[h].y)<r.spec.pocketRadius+o)){e.style.cursor="pointer";return}const a=je(s),c=rs(n,a.start,a.end),l=Math.hypot(n.x-this.shooter.x,n.y-this.shooter.y)<me(s,"shooter")+o*.6;e.style.cursor=!l&&Math.hypot(c.x-n.x,c.y-n.y)<o?"ew-resize":"grab"}onMove(t){this.updateCursor(t),this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY});const e=this.drag;if(e?.kind==="orbit2"){t.preventDefault();const u=[...this.pointers.values()];if(u.length<2)return;const[d,f]=u,g=(d.x+f.x)/2,v=(d.y+f.y)/2,m=Math.hypot(d.x-f.x,d.y-f.y);this.stage.orbitBy(g-e.cx,v-e.cy),e.dist>10&&m>10&&this.stage.zoomBy(e.dist/m),e.cx=g,e.cy=v,e.dist=m;return}if(e?.kind==="orbit"){if(e.pointerId!==t.pointerId)return;t.preventDefault();const u=t.clientX-e.x,d=t.clientY-e.y;e.moved+=Math.abs(u)+Math.abs(d),e.x=t.clientX,e.y=t.clientY,this.stage.orbitBy(u,d);return}if(!e||e.pointerId!==t.pointerId||this.phase!=="aim")return;t.preventDefault();const n=this.stage.pick(t.clientX,t.clientY);if(!n)return;if(e.kind==="slide"){this.moveShooterTo(n);return}let s,r,o;if(e.style==="flick"){e.samples.push({t:t.timeStamp,x:t.clientX,y:t.clientY,w:n}),e.samples.length>24&&e.samples.shift();const u=this.flickOf(e.samples,t.timeStamp);s=u.power,r=u.vx,o=u.vy}else{const u=Math.hypot(t.clientX-e.sx,t.clientY-e.sy),d=Math.min(window.innerWidth,window.innerHeight)*z0;s=Math.min(1,u/d),r=e.start.x-n.x,o=e.start.y-n.y}const a=Math.hypot(r,o);if(s<Xl||a<1e-6){e.dir=null,e.power=0,this.aim.clearAim(),this.hud.setPower(null);return}e.dir={x:r/a,y:o/a},e.power=s;const c=this.state,l=Fn(c).map(u=>({id:u.id,x:u.loc.x,y:u.loc.y,r:me(c,u.kind)})),h=c.config.aimGuide?Qu(Ge(c),l,this.shooter,e.dir,me(c,"shooter")):null;this.aim.showAim(this.shooter,e.dir,s,me(c,"shooter"),h),this.hud.setPower(s)}onUp(t){this.pointers.delete(t.pointerId),this.capture(t.pointerId,!1);const e=this.drag;if(e?.kind==="orbit2"){this.drag=null;return}if(!e||e.pointerId!==t.pointerId)return;if(this.drag=null,e.kind==="orbit"){e.tapSpeedsUp&&e.moved<8&&(this.speed=3);return}if(this.aim.clearAim(),this.hud.setPower(null),e.kind==="pull"&&e.style==="flick"){const s=this.stage.pick(t.clientX,t.clientY);s&&e.samples.push({t:t.timeStamp,x:t.clientX,y:t.clientY,w:s});const r=this.flickOf(e.samples,t.timeStamp),o=Math.hypot(r.vx,r.vy);e.dir=o>1e-6?{x:r.vx/o,y:r.vy/o}:null,e.power=r.power}if(e.kind!=="pull"||this.phase!=="aim"||!e.dir||e.power<Xl)return;if(ds(this.state,this.shooter)){this.hud.toast("Slide the shooter clear of other pieces first.","bad");return}this.shoot(e.dir,e.power)}flickOf(t,e){return k0(t,e,this.frameMs,Math.min(window.innerWidth,window.innerHeight))}capture(t,e){try{e?this.stage.canvas.setPointerCapture(t):this.stage.canvas.releasePointerCapture(t)}catch{}}cancelDrag(){this.drag=null,this.stage.canvas.style.cursor="",this.aim.clearAim(),this.hud.setPower(null)}moveShooterTo(t){const e=je(this.state);this.shooter=rs(t,e.start,e.end),this.refreshShooter(),this.refreshHud()}get actionsApplied(){return this.applied}exposeDebug(){window.__chipwreck={state:()=>this.state,phase:()=>this.phase,ai:()=>this.aiTurn?{stage:this.aiTurn.stage,planned:!!this.aiTurn.input}:null,shoot:(t,e,n,s)=>{s!==void 0&&(this.called=s);const r=Math.hypot(t,e);this.shoot({x:t/r,y:e/r},n)},slide:t=>this.slideTo(t),drag:()=>this.drag&&this.drag.kind==="pull"?{style:this.drag.style,power:this.drag.power,dir:this.drag.dir}:this.drag?.kind??null,view:()=>this.toggleView()}}dispose(){this.disposed=!0,this.ai.dispose(),cancelAnimationFrame(this.raf),window.clearTimeout(this.settleTimer),this.cleanup.forEach(t=>t()),this.stage.scene.remove(this.board.group,this.pieces.group,this.aim.group),this.board.dispose(),this.pieces.dispose(),this.aim.dispose(),this.hud.dispose(),document.querySelectorAll(".overlay").forEach(t=>t.remove())}}function V0(i){if(!/^https?:$/.test(location.protocol))return;const t=()=>{i()&&fetch(`version.json?t=${Date.now()}`,{cache:"no-store"}).then(e=>e.ok?e.json():null).then(e=>{if(!e||!(typeof e.build=="number"&&e.build>2610140258)||!i())return;try{if(sessionStorage.getItem("chipwreck.reload")===String(e.build))return;sessionStorage.setItem("chipwreck.reload",String(e.build))}catch{}const n=new URL(location.href);n.searchParams.set("v",String(e.build)),location.replace(n.href)}).catch(()=>{})};t(),addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&t()})}function ru(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4)}class ou{constructor(t,e,n,s){O(this,"mine",{});O(this,"others",new Map);O(this,"listeners",new Set);O(this,"gone",!1);this.name=t,this.me=e,this.writeMine=n,this.onLeave=s}async presence(t){if(this.gone)return;const e={...this.mine};for(const[n,s]of Object.entries(t))s==null?delete e[n]:e[n]=s;this.mine=e,await this.writeMine(e),this.emit()}remote(t,e){this.gone||t===this.me||(e?this.others.set(t,e):this.others.delete(t),this.emit())}replaceAll(t){this.gone||(this.others=new Map([...t].filter(([e])=>e!==this.me)),this.emit())}current(){return this.mine}peers(){return[{peer:this.me,isMe:!0,presence:this.mine},...[...this.others].map(([t,e])=>({peer:t,isMe:!1,presence:e}))]}onPeers(t){return this.listeners.add(t),queueMicrotask(()=>this.listeners.has(t)&&t(this.peers())),()=>this.listeners.delete(t)}emit(){const t=this.peers();for(const e of[...this.listeners])e(t)}async leave(){this.gone||(this.gone=!0,this.listeners.clear(),await this.onLeave())}}const G0={apiKey:"AIzaSyDLVtNfjOTYy9_Fl3_X45plld08udcGh5k",authDomain:"jelly-flip.firebaseapp.com",databaseURL:"https://jelly-flip-default-rtdb.firebaseio.com",projectId:"jelly-flip",storageBucket:"jelly-flip.firebasestorage.app",messagingSenderId:"790326695298",appId:"1:790326695298:web:fb983b84ae5e33c3f82b9b"},W0="https://www.gstatic.com/firebasejs/10.12.2/",$l="jf/rooms";class X0{constructor(){O(this,"kind","firebase");O(this,"me",ru());O(this,"status","loading");O(this,"statusMsg","");O(this,"core",null);O(this,"listeners",new Set)}onStatus(t){return this.listeners.add(t),()=>this.listeners.delete(t)}set(t,e=""){this.status==="error"&&t!=="error"||(this.status=t,this.statusMsg=e,this.listeners.forEach(n=>n(t)))}connect(){if(!this.core){this.core=(async()=>{const e=l=>import(W0+l),[n,s,r]=await Promise.all(["firebase-app.js","firebase-auth.js","firebase-database.js"].map(e)),o=n.initializeApp(G0,"chipwreck");this.set("connecting");const a=(await s.signInAnonymously(s.getAuth(o))).user.uid,c=r.getDatabase(o);return r.onValue(r.ref(c,".info/connected"),l=>this.set(l.val()?"online":"connecting")),{D:r,db:c,uid:a}})();const t=new Promise((e,n)=>setTimeout(()=>n(new Error("timed out")),2e4));Promise.race([this.core,t]).catch(e=>this.set("error",String(e&&(e.code||e.message)||e)))}return this.core}async join(t){const{D:e,db:n,uid:s}=await this.connect(),r=e.ref(n,`${$l}/${t}/peers`),o=e.ref(n,`${$l}/${t}/peers/${this.me}`);let a=null;const c=new ou(t,this.me,l=>e.set(o,{uid:s,p:JSON.stringify(l),t:e.serverTimestamp()}),async()=>{a?.();try{await e.onDisconnect(o).cancel(),await e.remove(o)}catch{}});return e.onDisconnect(o).remove(),await c.presence({}),a=e.onValue(r,l=>{const h=l.val()??{},u=new Map;for(const[d,f]of Object.entries(h))try{u.set(d,JSON.parse(f?.p??"{}"))}catch{u.set(d,{})}c.replaceAll(u)},l=>this.set("error",String(l?.code??l))),c}}class $0{constructor(){O(this,"kind","local");O(this,"me",ru());O(this,"status","online");O(this,"statusMsg","");O(this,"ch",new BroadcastChannel("chipwreck-net"));O(this,"rooms",new Map);this.ch.onmessage=t=>{const e=t.data,n=this.rooms.get(e.room);!n||e.peer===this.me||(n.remote(e.peer,e.p),e.hello&&this.ch.postMessage({room:e.room,peer:this.me,p:n.current()}))},addEventListener("pagehide",()=>{for(const t of this.rooms.keys())this.ch.postMessage({room:t,peer:this.me,p:null})})}onStatus(){return()=>{}}async join(t){const e=new ou(t,this.me,async n=>this.ch.postMessage({room:t,peer:this.me,p:n}),async()=>{this.rooms.delete(t),this.ch.postMessage({room:t,peer:this.me,p:null})});return this.rooms.set(t,e),this.ch.postMessage({room:t,peer:this.me,p:{},hello:!0}),e}}const ql="abcdefghjkmnpqrstuvwxyz";function q0(i=Math.random){return Array.from({length:4},()=>ql[Math.floor(i()*ql.length)]).join("")}function qa(i){return String(i??"").toLowerCase().replace(/[^a-z]/g,"").slice(0,4)}function Ms(i,t=16){return String(i??"").replace(/[\u0000-\u001f<>]/g,"").trim().slice(0,t)}const au=i=>`cw-${i}`,Y0="cw-lobby";function cu(i){return JSON.stringify(i)}function lu(i){if(typeof i!="string"||i.length>400)return null;let t;try{t=JSON.parse(i)}catch{return null}const e=t;if(!e||typeof e!="object")return null;if(e.t==="c")return wa.includes(e.k)?{t:"c",k:e.k}:null;if(e.t==="p")return{t:"p"};if(e.t!=="s")return null;const n=e.i,s=c=>{const l=c;return l&&typeof l.x=="number"&&typeof l.y=="number"&&Number.isFinite(l.x)&&Number.isFinite(l.y)?{x:l.x,y:l.y}:null},r=s(n?.shooter),o=s(n?.velocity);if(!r||!o)return null;const a={shooter:r,velocity:o};if(n.calledPocket!==void 0){if(!Number.isInteger(n.calledPocket))return null;a.calledPocket=n.calledPocket}return{t:"s",i:a}}function Yl(i,t,e){return i.status!=="playing"?"The match is over":e.t==="c"?i.pending?i.pending.report.player!==t?"Not your choice":(i.pending.report.claimOptions??[]).includes(e.k)?null:"That type cannot be claimed":"Nothing to choose":i.pending?"Waiting for a claim choice":i.current!==t?"Not your turn":e.t==="p"?Aa(i)?"You can only pass when your rope is blocked":null:qn(i,e.i)}function j0(i){return JSON.stringify({...i,history:[]})}function Z0(i,t){const e=n=>JSON.stringify([n.pieces,n.current,n.turn,n.shotInTurn,n.claims,n.out,n.standby,n.status,n.winner,n.pending?.report.claimOptions??null]);return e(i)===e(t)}function yo(i,t){return i.here.flatMap((e,n)=>!e&&!(i.seats[n]&&t.has(i.seats[n]))?[n]:[])}function ns(i){return new Set(i.map(t=>t.peer))}function ya(i){return i.pending?i.pending.report.player:i.current}class Ya{constructor(t){O(this,"games",[]);O(this,"listeners",new Set);this.room=t,t.onPeers(e=>{this.games=e.filter(n=>!n.isMe).map(n=>n.presence.host).filter(n=>!!n&&typeof n.code=="string"&&n.st!=="over").map(n=>({code:n.code.replace(/[^a-z]/g,"").slice(0,4),name:Ms(n.name)||"Someone",open:Number(n.open)|0,st:n.st})),this.listeners.forEach(n=>n())})}static async open(t){return new Ya(await t.join(Y0))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}announce(t){this.room.presence({host:t}).catch(()=>{})}}class ja{constructor(t,e,n,s,r){O(this,"g");O(this,"peers",[]);O(this,"listeners",new Set);O(this,"starts",new Set);O(this,"handlers",null);O(this,"ready",null);O(this,"closed",!1);this.room=t,this.lobby=e,this.g={v:1,code:r,st:"wait",round:0,cfg:structuredClone(n),here:[...s],seats:{},log:[],n:0,snap:null,acks:{}},t.onPeers(o=>this.onPeers(o)),this.publish()}static async open(t,e,n,s){if(s.length!==n.players.length)throw new Error("here[] must match players");if(!s.some(o=>!o))throw new Error("An online game needs at least one remote player");const r=q0();return new ja(await t.join(au(r)),e,n,s,r)}get code(){return this.g.code}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}onStart(t){return this.starts.add(t),()=>this.starts.delete(t)}emit(){this.listeners.forEach(t=>t())}publish(){if(this.closed)return;this.room.presence({g:this.g}).catch(()=>{});const t=ns(this.peers);this.lobby?.announce({code:this.g.code,name:this.hostName(),open:yo(this.g,t).length,st:this.g.st})}hostName(){const t=this.g.here.indexOf(!0);return t>=0?this.g.cfg.players[t].name:"Host"}seat(t){if(this.g.here[t])return{kind:"here"};const e=this.g.seats[t];return e?{kind:"taken",present:ns(this.peers).has(e)}:{kind:"open"}}canStart(){return yo(this.g,ns(this.peers)).length===0}onPeers(t){this.peers=t;const e=ns(t);let n=!1;for(const s of t){if(s.isMe)continue;const r=s.presence,o=r.claim;if(!Number.isInteger(o)||o<0||o>=this.g.here.length||this.g.here[o])continue;const a=this.g.seats[o],c=Ms(r.name);if(a===s.peer){c&&this.g.st==="wait"&&c!==this.g.cfg.players[o].name&&(this.g.cfg.players[o].name=c,n=!0);continue}a&&e.has(a)||Object.values(this.g.seats).includes(s.peer)||(this.g.seats[o]=s.peer,c&&this.g.st==="wait"&&(this.g.cfg.players[o].name=c),n=!0)}n?this.publish():this.lobby?.announce({code:this.g.code,name:this.hostName(),open:yo(this.g,e).length,st:this.g.st}),this.tryRequests(),this.emit()}start(){this.g.st="play",this.g.round++,this.g.log=[],this.g.n=0,this.g.snap=null,this.g.acks={},this.ready=null,this.publish();const t=Es(this.g.cfg),e=this.link();this.starts.forEach(n=>n(t,0,e)),this.emit()}takeOver(t){this.g.here[t]===void 0||this.g.here[t]||(this.g.here[t]=!0,delete this.g.seats[t],this.publish(),this.emit())}append(t){this.ready=null,this.g.log.push(cu(t)),this.publish(),this.handlers?.action(t)}tryRequests(){const t=this.ready;if(!t||this.g.st!=="play")return;let e=!1;for(const n of this.peers){if(n.isMe)continue;const s=n.presence.req;if(!s||!Number.isInteger(s.n))continue;const r=Object.keys(this.g.seats).find(a=>this.g.seats[a]===n.peer);if(r===void 0||s.n<=(this.g.acks[r]??0))continue;this.g.acks[r]=s.n,e=!0;const o=lu(s.a);if(o&&!Yl(t,Number(r),o))return this.append(o)}e&&this.publish()}link(){const t=this;return{online:!0,isHost:!0,canAct:e=>!!t.g.here[e],submit:e=>{t.ready&&!Yl(t.ready,ya(t.ready),e)&&t.append(e)},connect:e=>{t.handlers=e},applied:(e,n)=>{t.g.n=n,t.g.snap=j0(e),e.status!=="playing"&&(t.g.st="over"),t.publish()},idle:e=>{t.ready=e,t.tryRequests()},waiting:e=>{const n=ya(e);if(e.status!=="playing"||t.g.here[n])return null;const s=e.config.players[n].name,r=t.g.seats[n];return r&&ns(t.peers).has(r)?`Waiting for ${s}…`:`Waiting for ${s} to reconnect… (Menu → play their turns here)`},sending:()=>!1,dispose:()=>{t.handlers=null}}}async leave(){this.closed||(this.closed=!0,this.lobby?.announce(null),this.listeners.clear(),this.starts.clear(),await this.room.leave())}}class Za{constructor(t,e,n,s){O(this,"g",null);O(this,"hostHere",!1);O(this,"name");O(this,"listeners",new Set);O(this,"starts",new Set);O(this,"handlers",null);O(this,"round",-1);O(this,"delivered",0);O(this,"reqN",0);O(this,"waitingAck",!1);O(this,"lastApplied",null);O(this,"closed",!1);O(this,"joinedAt",Date.now());this.net=t,this.room=e,this.code=n,this.name=Ms(s)||"Friend",e.presence({name:this.name}).catch(()=>{}),e.onPeers(r=>this.onPeers(r))}static async join(t,e,n){return new Za(t,await t.join(au(e)),e,n)}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}onStart(t){return this.starts.add(t),()=>this.starts.delete(t)}get mySeat(){if(!this.g)return null;const t=Object.keys(this.g.seats).find(e=>this.g.seats[e]===this.net.me);return t===void 0?null:Number(t)}claim(t){this.room.presence({claim:t,name:this.name}).catch(()=>{})}setName(t){this.name=Ms(t)||this.name,this.room.presence({name:this.name}).catch(()=>{})}onPeers(t){const e=t.find(n=>!n.isMe&&n.presence.g?.code===this.code);if(this.hostHere=!!e,e){const n=e.presence.g;this.g=n;const s=this.mySeat;this.waitingAck&&s!==null&&(n.acks[s]??0)>=this.reqN&&(this.waitingAck=!1),(n.st==="play"||n.st==="over")&&n.round!==this.round?this.startRound(n):n.round===this.round&&this.deliver(n)}this.emit()}startRound(t){this.round=t.round;let e;try{e=t.snap?bo(JSON.parse(t.snap)):Es(t.cfg)}catch{return}this.delivered=t.snap?t.n:0,this.lastApplied=null,this.waitingAck=!1;const n=this.link();this.starts.forEach(s=>s(e,this.delivered,n)),this.deliver(t)}deliver(t){for(;this.handlers&&this.delivered<t.log.length;){const e=lu(t.log[this.delivered]);this.delivered++,e&&this.handlers.action(e)}this.checkSnapshot()}checkSnapshot(){const t=this.g,e=this.lastApplied;if(!(!t?.snap||!e||t.n!==e.count))try{const n=bo(JSON.parse(t.snap));Z0(e.state,n)||(this.lastApplied={state:n,count:t.n},this.handlers?.correct(n,t.n))}catch{}}emit(){this.listeners.forEach(t=>t())}link(){const t=this;return{online:!0,isHost:!1,canAct:e=>t.hostHere&&t.mySeat===e,submit:e=>{const n=t.mySeat;n===null||t.waitingAck||(t.reqN=Math.max(t.reqN,t.g?.acks[n]??0)+1,t.waitingAck=!0,t.room.presence({req:{n:t.reqN,a:cu(e)}}).catch(()=>t.waitingAck=!1))},connect:e=>{t.handlers=e,t.g&&t.deliver(t.g)},applied:(e,n)=>{t.lastApplied={state:e,count:n},t.checkSnapshot()},idle:()=>{},waiting:e=>{if(!t.hostHere)return"The host has left — waiting for them to come back…";if(t.waitingAck)return"Sending your shot to the table…";const n=ya(e);return e.status!=="playing"||t.mySeat===n?null:`Waiting for ${e.config.players[n].name}…`},sending:()=>t.waitingAck,dispose:()=>{t.handlers=null}}}async leave(){this.closed||(this.closed=!0,this.listeners.clear(),this.starts.clear(),await this.room.leave())}}function J0(i){const t=new URL(location.href);return t.search="",t.hash="",t.searchParams.set("join",i),t.href}async function K0(i,t){const e=J0(i);try{if(navigator.share){await navigator.share({title:"ChipWreck",text:`Join my ChipWreck game — code ${i.toUpperCase()}`,url:e});return}await navigator.clipboard.writeText(e),t.textContent="Link copied!",setTimeout(()=>t.textContent="Copy link",1800)}catch{}}function Q0(i,t,e,n){const s=Qt("div",{class:"wait"});i.append(s);const r=()=>{const a=t.g,c=a.cfg.players.map((l,h)=>{const u=a.cfg.teams[l.team],d=t.seat(h),f=d.kind==="here"?"On this device":d.kind==="open"?"Waiting for a player…":d.present?"Joined ✓":"Left — waiting for them to come back",g=d.kind==="here"||d.kind==="taken"&&d.present;return`<div class="wait-seat" style="--team:${le(u.color)}"><span class="who">${le(d.kind==="open"?`Seat ${h+1}`:l.name)}</span><span class="st${g?" ok":""}">${f}</span></div>`}).join("");s.innerHTML=`<div class="wait-card">
      <h2>Waiting for players</h2>
      <div class="roomcode"><span class="label">Game code</span><b class="code">${le(a.code.toUpperCase())}</b>
        <button class="btn small" data-act="share">${typeof navigator.share=="function"?"Share link":"Copy link"}</button></div>
      <p class="note">Friends tap <b>Have a game code?</b> on the ChipWreck start screen, or open the link, and they’re taken straight here. It also shows under <b>Online games</b> as “${le(t.hostName())}’s game”.</p>
      <div class="wait-seats">${c}</div>
      <button class="btn primary wide" data-act="start" ${t.canStart()?"":"disabled"}>${t.canStart()?"Start the game":"Waiting for everyone to join…"}</button>
      <button class="btn wide" data-act="cancel">Cancel</button>
    </div>`};s.addEventListener("click",a=>{const c=a.target.closest("button");c&&(c.dataset.act==="share"&&K0(t.code,c),c.dataset.act==="start"&&t.canStart()&&e(),c.dataset.act==="cancel"&&n())});const o=t.onChange(r);return r(),()=>{o(),s.remove()}}function tx(i,t,e){const n=Qt("div",{class:"wait"});i.append(n);let s=!1;const r=()=>{const a=t.g;s||(n.innerHTML=`<div class="wait-card">
        <h2>Game ${le(t.code.toUpperCase())}</h2>
        <div class="wait-head"></div>
        <label class="player" style="--team:#e7b73c"><span class="seat">You</span><input data-myname maxlength="16" value="${le(t.name)}" aria-label="Your name" /><span></span></label>
        <div class="wait-seats"></div>
        <button class="btn wide" data-act="leave">Leave</button>
      </div>`,s=!0);const c=n.querySelector(".wait-head"),l=n.querySelector(".wait-seats");if(!a){const u=Date.now()-t.joinedAt>6e3;u||setTimeout(r,6200),c.innerHTML=`<p class="note">${u?"No open game has this code yet. Check the code with the host; if they’re still setting up, it appears here as soon as they open it.":"Finding the game…"}</p>`,l.innerHTML="";return}const h=t.mySeat;c.innerHTML=`<p class="note">${t.hostHere?h===null?"Pick your seat:":a.st==="wait"?"You’re in! Waiting for the host to start the game…":"Rejoining the game…":"The host isn’t here right now — the game continues when they’re back."}</p>`,l.innerHTML=a.cfg.players.map((u,d)=>{const f=a.cfg.teams[u.team],g=!a.here[d],v=!!a.seats[d],m=h===d,p=m?'<span class="st ok">Your seat ✓</span>':g?`<button class="btn small${v?"":" primary"}" data-seat="${d}">${v?"Take over":"Take seat"}</button>`:'<span class="st">Host’s device</span>';return`<div class="wait-seat${m?" mine":""}" style="--team:${le(f.color)}"><span class="who">${le(u.name)}<small class="st"> · ${le(f.name)}</small></span>${p}</div>`}).join("")};n.addEventListener("click",a=>{const c=a.target.closest("button");c&&(c.dataset.seat&&t.claim(Number(c.dataset.seat)),c.dataset.act==="leave"&&e())}),n.addEventListener("input",a=>{const c=a.target;if(c.dataset.myname===void 0)return;const l=Ms(c.value);l&&t.setName(l)});const o=t.onChange(r);return r(),()=>{o(),n.remove()}}const ex=`
<p class="story">Your crew of sailors have been involved in a daring encounter at sea and the ship has gone down in
battle. It's up to you to rescue each sailor and save the Captain from the wreckage. But as all sailors know, the
Captain refuses to be rescued until every sailor is safe.</p>
<h3>On your turn</h3>
<ul>
  <li>Place your shooter on the Lifeline Rope in front of you and flick it in any direction.</li>
  <li>Your first rescue decides your crew: Anchors, Wheels or Treasure Chests. Rescue more than one kind at once and you choose.</li>
  <li>Rescue one or more of your Sailors and you shoot again.</li>
  <li>Your turn ends if your shooter lands in a lifeboat, or you don't rescue one of your crew-mates.</li>
  <li>Rescuing an opponent's Sailor counts for them.</li>
</ul>
<h3>Penalties</h3>
<ul>
  <li>Shooter in a lifeboat: pull one of your Sailors out of a lifeboat and place it on the Bridge.</li>
  <li>Save the Captain before all your Sailors and he goes back to the Bridge — and your crew is out of the game
  (or on standby, with the optional rule).</li>
</ul>
<h3>Winning</h3>
<ul>
  <li>Rescue all ten of your Sailors, then beckon the Captain: announce a lifeboat and sink him into it.
  The wrong lifeboat puts him back on the Bridge and ends your turn.</li>
</ul>
<h3>Rescue mission (co-op)</h3>
<ul>
  <li>Everyone plays together. Lifeboats and shark-infested water alternate around the corners.</li>
  <li>Sailors in shark water are lost. If the sharks get the Captain, the mission fails.</li>
</ul>`;function nx(i,t){let e="versus",n="normal",s="out",r=!0,o=t.flick,a="local";const c=[!0,!1,!1,!1,!1,!1],l=[null,null,null,null,null,null];let h="",u="",d=2,f=Ir(2);const g=Array.from({length:6},(L,b)=>t.names[b]??`Player ${b+1}`),v=Qt("div",{class:"setup"});i.append(v);const m=()=>{const L=e==="versus"?Ao(d):[],b=e==="versus"?lh(f):Array.from({length:d},()=>-1),R=e==="versus"?2:1;v.innerHTML=`
      <div class="setup-card">
        <div class="badge" aria-label="ChipWreck — The Legendary Rescue">
          <img class="logo-img" src="logo.webp" width="1004" height="400" alt="ChipWreck" decoding="async" />
          <div class="tag">The Legendary Rescue</div>
        </div>
        ${t.canResume?'<button class="btn primary wide" data-act="resume">Resume saved game</button>':""}
        <div class="seg" role="tablist" aria-label="Game mode">
          <button role="tab" aria-selected="${e==="versus"}" data-mode="versus">Versus</button>
          <button role="tab" aria-selected="${e==="coop"}" data-mode="coop">Rescue (co-op)</button>
        </div>
        <div class="row">
          <span class="label">Players</span>
          <div class="stepper">
            <button data-step="-1" aria-label="Fewer players" ${d<=R?"disabled":""}>−</button>
            <output aria-live="polite">${d}</output>
            <button data-step="1" aria-label="More players" ${d>=6?"disabled":""}>+</button>
          </div>
        </div>
        ${e==="versus"?`
        <div class="row wrap">
          <span class="label">Teams</span>
          <div class="layouts">
            ${L.map((C,M)=>`<button class="pill${C.join()===f.join()?" on":""}" data-layout="${M}">${ju(C)}</button>`).join("")}
          </div>
        </div>
        <p class="note">${Zu(f.length)}</p>`:""}
        ${t.online?`
        <div class="seg" role="tablist" aria-label="Where is everyone playing">
          <button role="tab" aria-selected="${a==="local"}" data-where="local">Same device</button>
          <button role="tab" aria-selected="${a==="online"}" data-where="online">Online</button>
        </div>`:""}
        <div class="players">
          ${b.map((C,M)=>{const x=C>=0?To[C].color:"#e7b73c",P=C>=0?To[C].name:"Crew",z=a==="online"?`<button class="pill where${c[M]?" on":""}" data-here="${M}" aria-pressed="${c[M]}">${c[M]?"This device":"Online"}</button>`:`<select class="who${l[M]?" cpu":""}" data-ai="${M}" aria-label="Who plays seat ${M+1}">
                  <option value=""${l[M]?"":" selected"}>Person</option>
                  ${tf.map(F=>`<option value="${F}"${l[M]===F?" selected":""}>Computer · ${Ro[F]}</option>`).join("")}
                </select>`;return`<label class="player with-where" style="--team:${x}"><span class="seat">${M+1}</span>
              <input data-name="${M}" maxlength="24" value="${le(g[M])}" aria-label="Player ${M+1} name"${a==="online"&&!c[M]?' placeholder="Joins online"':""} />
              <span class="team">${P}</span>${z}</label>`}).join("")}
        </div>
        ${a==="online"?'<p class="note">Players marked Online join from their own phone or computer with a game code. Their names fill in when they join.</p>':""}
        <p class="note">Seat 1 starts — by lifeboat tradition, the youngest sailor. Play passes to the left.</p>
        <div class="row">
          <span class="label">Sea salt</span>
          <div class="layouts">
            ${["light","normal","heavy"].map(C=>`<button class="pill${n===C?" on":""}" data-salt="${C}">${C==="light"?"Light":C==="normal"?"Normal":"Heavy"}</button>`).join("")}
          </div>
        </div>
        <p class="note">How freely the chips glide. Normal: a full-power shooter banks off the walls three times.</p>
        <div class="row">
          <span class="label">Aim guide</span>
          <div class="layouts">
            <button class="pill${r?" on":""}" data-guide="on">On</button>
            <button class="pill${r?"":" on"}" data-guide="off">Off</button>
          </div>
        </div>
        <p class="note">On: a dashed line shows the first chip your shot hits and where it will go. Off: power arrow only.</p>
        <div class="row">
          <span class="label">Flick style</span>
          <div class="layouts">
            <button class="pill${o==="pull"?" on":""}" data-flick="pull">Pull back</button>
            <button class="pill${o==="flick"?" on":""}" data-flick="flick">Flick</button>
          </div>
        </div>
        <p class="note">${o==="flick"?"Press (or click) and flick toward your target — the faster the flick, the harder the shot.":"Drag back like a slingshot and release — the further you pull, the harder the shot."} Saved on this device; change it any time from the in-game menu.</p>
        ${e==="versus"?`
        <div class="row">
          <span class="label">Early Captain</span>
          <div class="layouts">
            <button class="pill${s==="out"?" on":""}" data-foul="out">Crew out</button>
            <button class="pill${s==="standby"?" on":""}" data-foul="standby">Standby</button>
          </div>
        </div>`:""}
        <button class="btn primary wide" data-act="start">${a==="online"?"Open online game":"Set sail"}</button>
        ${u?`<p class="err">${le(u)}</p>`:""}
        ${t.online?'<section class="online-panel" aria-label="Online games"></section>':""}
        <details class="rules"><summary>How to play</summary>${ex}</details>
        <footer class="credits">
          <p>Created by Justin Thomae · Est. 2016</p>
          <p>Copyright © ${new Date().getFullYear()} <a href="https://grudgematchgames.com" target="_blank" rel="noopener">Grudge Match Games</a></p>
        </footer>
      </div>`};v.addEventListener("click",L=>{const b=L.target.closest("button");if(b){if(b.dataset.mode)e=b.dataset.mode,e==="versus"&&d<2&&(d=2),f=Ir(Math.max(2,d))??[1,1];else if(b.dataset.step)d=Math.min(6,Math.max(e==="versus"?2:1,d+Number(b.dataset.step))),e==="versus"&&(f=Ir(d));else if(b.dataset.where)a=b.dataset.where,u="";else if(b.dataset.here){const R=Number(b.dataset.here);c[R]=!c[R],u=""}else if(b.dataset.joinCode!==void 0){t.online?.join(b.dataset.joinCode,g[0].trim()||"Friend");return}else if(b.dataset.act==="join"){const R=qa(h);if(R.length!==4)return u="Game codes are 4 letters.",m();t.online?.join(R,g[0].trim()||"Friend");return}else if(b.dataset.salt)n=b.dataset.salt;else if(b.dataset.flick)o=b.dataset.flick,t.onFlick(o);else if(b.dataset.guide)r=b.dataset.guide==="on";else if(b.dataset.foul)s=b.dataset.foul;else if(b.dataset.layout)f=Ao(d)[Number(b.dataset.layout)];else if(b.dataset.act==="resume"){t.onResume();return}else if(b.dataset.act==="start"){const R=a!=="online"||!t.online,C=R?l.slice(0,d):[],M=C.filter(Boolean).length>1,x=g.slice(0,d).map((k,X)=>{const H=k.trim();return C[X]&&(!H||H===`Player ${X+1}`)?M?`Computer ${X+1}`:"Computer":H||`Player ${X+1}`});if(R&&C.length&&C.every(Boolean))return u="At least one seat needs a person — set one to “Person”.",m();const P={salt:n,captainFoul:s,aimGuide:r},z=e==="versus"?Ju(f,x,P):Ku(d,x,P);C.forEach((k,X)=>{k&&(z.players[X].ai=k)});const F={config:z,names:g};if(a==="online"&&t.online){const k=c.slice(0,d);if(!k.includes(!1))return u="Mark at least one player as Online — or play on this device with “Same device”.",m();t.online.host(F,k);return}t.onStart(F);return}m(),p()}}),v.addEventListener("change",L=>{const b=L.target;b.dataset.ai!==void 0&&(l[Number(b.dataset.ai)]=b.value||null,u="",m(),p())}),v.addEventListener("input",L=>{const b=L.target;b.dataset.name&&(g[Number(b.dataset.name)]=b.value),b.dataset.code!==void 0&&(h=b.value)}),v.addEventListener("keydown",L=>{const b=L.target;L.key==="Enter"&&b.dataset.code!==void 0&&v.querySelector('[data-act="join"]')?.click()});const p=()=>{const L=v.querySelector(".online-panel");if(!L||!t.online)return;const b=document.activeElement instanceof HTMLInputElement&&document.activeElement.dataset.code!==void 0,R=t.online.games(),C=t.online.status(),M=R.length?`<div class="hosts">${R.map(P=>`<div class="hostrow"><div><b>${le(P.name)}’s game</b><small>${P.st==="play"?"In progress":"Waiting for players"} · ${P.open} open seat${P.open===1?"":"s"}</small></div><button class="btn primary small" data-join-code="${le(P.code)}">Join</button></div>`).join("")}</div>`:'<p class="note">No games open right now.</p>',x=`<div class="joinrow"><input data-code maxlength="4" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="Code" aria-label="Game code" value="${le(h.toUpperCase())}" /><button class="btn small" data-act="join">Join</button></div>`;if(b){const P=L.querySelector(".games");P&&(P.innerHTML=M);return}L.innerHTML=`<h3>Online games</h3><div class="games">${M}</div><p class="label small">Have a game code?</p>${x}${C?`<p class="note">${le(C)}</p>`:""}`},w=t.online?.onChange(p),E=m,_=()=>{E(),p()};return v.addEventListener("click",()=>queueMicrotask(p)),_(),()=>{w?.(),v.remove()}}const qi=document.getElementById("app"),ix=document.getElementById("scene"),We=B0();let Vi;try{Vi=new C0(ix)}catch(i){throw console.error(i),qi.innerHTML='<div class="fatal"><h1>ChipWreck</h1><p>This device could not start 3D graphics (WebGL). Try another browser or update your device.</p></div>',i}let Ce=null,Ss=null,Sr=null;const hu=new URLSearchParams(location.search),pn=hu.get("net")==="local"?new $0:new X0;let Er=null,uu="";const Ma=new Set,vr=()=>Ma.forEach(i=>i());let ni=null,Kn=null;Ya.open(pn).then(i=>{Er=i,i.onChange(vr),vr()}).catch(i=>{uu="Online play is unavailable right now.",console.warn("lobby",i),vr()});pn.onStatus(vr);const sx={status:()=>uu||pn.status==="error"?`Online play is unavailable right now${pn.statusMsg?` (${pn.statusMsg})`:""}.`:Er&&(pn.status==="online"||pn.kind!=="firebase")?"":"Connecting…",games:()=>Er?.games??[],onChange:i=>(Ma.add(i),()=>Ma.delete(i)),host:({config:i,names:t},e)=>{We.names=t,Ii(We),rx(i,e)},join:(i,t)=>void fu(i,t)};function Ls(){Ss?.(),Ss=null}async function rx(i,t){let e;try{e=await ja.open(pn,Er,i,t)}catch(n){console.warn(n),alert("Couldn’t open an online game right now. Try again in a moment.");return}ni=e,Ls(),e.onStart((n,s,r)=>du(n,s,r)),e.onChange(()=>Ce?.netChanged()),Ss=Q0(qi,e,()=>e.start(),()=>void Ja().then(Yi))}async function fu(i,t){const e=qa(i);if(e.length!==4)return;let n;try{n=await Za.join(pn,e,t)}catch(r){console.warn(r),alert("Couldn’t join that game. Ask the host to check it’s still open.");return}Kn=n,Ls(),n.onStart((r,o,a)=>du(r,o,a)),n.onChange(()=>Ce?.netChanged()),Ss=tx(qi,n,()=>void Ja().then(Yi));const s=pu();s?.code===e&&s.seat!==null&&n.claim(s.seat)}async function Ja(){Ce?.dispose(),Ce=null;const i=ni,t=Kn;ni=Kn=null,cx(),await Promise.all([i?.leave(),t?.leave()])}function ox(){const i=ni;return i?i.g.cfg.players.flatMap((t,e)=>{const n=i.seat(e);return n.kind==="taken"&&!n.present||n.kind==="open"?[{id:`take-${e}`,label:`Play ${t.name}’s turns on this device`,run:()=>i.takeOver(e)}]:[]}):[]}function du(i,t,e){Ls(),Ce?.dispose(),Kn&&ax({code:Kn.code,seat:Kn.mySeat}),Ce=new su(qi,Vi,i,We,n=>{if(n==="rematch"&&ni){ni.start();return}Ja().then(Yi)},e,t,ox)}const Ka="chipwreck.rejoin.v1";function ax(i){try{sessionStorage.setItem(Ka,JSON.stringify(i))}catch{}}function pu(){try{const i=JSON.parse(sessionStorage.getItem(Ka)??"null");return i&&typeof i.code=="string"?{code:i.code,seat:Number.isInteger(i.seat)?i.seat:null}:null}catch{return null}}function cx(){try{sessionStorage.removeItem(Ka)}catch{}}function Sa(i){Ls(),Ce?.dispose(),iu(i),Ce=new su(qi,Vi,i,We,t=>{Ce?.dispose(),Ce=null,t==="rematch"&&Sr?Sa(Es(Sr)):Yi()})}function Yi(){Ce?.dispose(),Ce=null,Vi.resize(),Ls(),Ss=nx(qi,{names:We.names,flick:We.flick,onFlick:i=>{We.flick=i,Ii(We)},canResume:!!Gl(),onResume:()=>{const i=Gl();if(!i)return Yi();Sr=i.config,Sa(i)},onStart:({config:i,names:t})=>{We.names=t,Ii(We),xa(),Sr=i,Sa(Es(i))},online:sx})}function mu(){Ce||(Vi.resize(),Vi.render()),requestAnimationFrame(mu)}Yi();mu();V0(()=>Ce===null&&!ni&&!Kn);const Mo=qa(hu.get("join")),jl=pu();if(Mo.length===4||jl){const i=new URL(location.href);i.searchParams.delete("join"),history.replaceState(null,"",i.href),setTimeout(()=>void fu(Mo.length===4?Mo:jl.code,We.names[0]||"Friend"),300)}
