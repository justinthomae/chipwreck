const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./admin-AVZrfwXU.js","./admin-DuTcPFe-.css"])))=>i.map(i=>d[i]);
var ld=Object.defineProperty;var hd=(i,t,e)=>t in i?ld(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var O=(i,t,e)=>hd(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const ud="modulepreload",dd=function(i,t){return new URL(i,t).href},Dc={},Rh=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=Promise.allSettled(e.map(l=>{if(l=dd(l,n),l in Dc)return;Dc[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(!!n)for(let g=o.length-1;g>=0;g--){const v=o[g];if(v.href===l&&(!h||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${u}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":ud,h||(f.as="script"),f.crossOrigin="",f.href=l,c&&f.setAttribute("nonce",c),document.head.appendChild(f),h)return new Promise((g,v)=>{f.addEventListener("load",g),f.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},Fi=Math.sqrt(3)/2,Ys=.038,Ch=.002,Go=.12,fd=Go*.1,Ph=Object.freeze({radius:1,pocketRadius:Go,pocketInset:fd,ropeInset:Go*(Math.sqrt(3)/2),pieceRadius:Ys,captainRadius:Ys,shooterRadius:Ys,pieceMass:1,captainMass:1,shooterMass:1,postRadius:.0117,postDistance:3*(2*Ys+Ch)}),pd=Ch,Uc=[{x:.5,y:-Fi},{x:-.5,y:-Fi},{x:-1,y:0},{x:-.5,y:Fi},{x:.5,y:Fi},{x:1,y:0}],Bi=6;function Lh(i=Ph){md(i);const t=i.radius,e=t*Fi,n=Uc.map(l=>({x:l.x*t,y:l.y*t})),s=t-i.pocketInset,r=Uc.map(l=>({x:l.x*s,y:l.y*s})),o=[],a=[];for(let l=0;l<Bi;l++){const h=n[l],u=n[(l+1)%Bi],d={x:(h.x+u.x)/2,y:(h.y+u.y)/2},f={x:-d.x/e,y:-d.y/e};o.push({side:l,a:h,b:u,normal:f,offset:e});const g={x:h.x+f.x*i.ropeInset,y:h.y+f.y*i.ropeInset},v=t,m={x:(u.x-h.x)/v,y:(u.y-h.y)/v},p=i.pocketRadius+i.shooterRadius+.005,b=Nc(g,m,r[l],p,1,0),w=Nc(g,m,r[(l+1)%Bi],p,-1,v);a.push({side:l,start:{x:g.x+m.x*b,y:g.y+m.y*b},end:{x:g.x+m.x*w,y:g.y+m.y*w}})}const c=o.map(l=>({x:-l.normal.x*i.postDistance,y:-l.normal.y*i.postDistance}));return{spec:i,apothem:e,corners:n,pockets:r,rails:o,ropes:a,posts:c}}function Nc(i,t,e,n,s,r){const o=e.x-i.x,a=e.y-i.y,c=o*t.x+a*t.y,l=o*o+a*a-c*c,h=n*n;return h<=l?r:c+s*Math.sqrt(h-l)}function md(i){const t=["radius","pocketRadius","pieceRadius","captainRadius","shooterRadius","pieceMass","captainMass","shooterMass","postRadius"];for(const e of t)if(!(Number.isFinite(i[e])&&i[e]>0))throw new Error(`BoardSpec.${e} must be a positive number`);if(!(i.ropeInset>i.shooterRadius))throw new Error("BoardSpec.ropeInset must exceed shooterRadius");if(!(i.pocketInset>=0&&i.pocketInset<i.radius/2))throw new Error("BoardSpec.pocketInset out of range");if(!(i.postDistance>=0&&i.postDistance<i.radius*.6))throw new Error("BoardSpec.postDistance out of range")}function nn(i,t){const e=i.x-t.x,n=i.y-t.y;return e*e+n*n}function gs(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s;if(r===0)return{x:t.x,y:t.y};let o=((i.x-t.x)*n+(i.y-t.y)*s)/r;return o=o<0?0:o>1?1:o,{x:t.x+n*o,y:t.y+s*o}}function gd(i,t){let e=1/0;for(const n of i.rails){const s=n.normal.x*t.x+n.normal.y*t.y+n.offset;s<e&&(e=s)}return e}function vd(i,t,e){const n=e+i.spec.postRadius;for(const s of i.posts)if(nn(t,s)<n*n)return!0;return!1}function Fc(i,t,e){return gd(i,t)>=e-1e-9}function Oc(i,t){const e=i.rails[t].normal;return{x:-e.x,y:-e.y}}const _d=Object.freeze({dt:1/480,friction:.7,damping:.1,restitution:.92,railRestitution:.72,chipFriction:.15,railFriction:.2,spinFriction:30,restSpeed:.004,maxSpeed:7,maxShotSpeed:5,dropTime:.045,lipRestitution:.55,lipHopSpeed:3,jumpSpeed:4.6,jumpCos:.97,popSpeed:3,maxTime:30,iterations:3}),kc=Object.freeze({light:1.1,normal:.7,heavy:.3});function Ih(i){const t={..._d,...i??{}};for(const[e,n]of Object.entries(t))if(!Number.isFinite(n))throw new Error(`PhysicsParams.${e} must be finite`);if(t.dt<=0||t.dt>1/60)throw new Error("PhysicsParams.dt must be in (0, 1/60]");for(const e of["restitution","railRestitution","lipRestitution"])if(t[e]<0||t[e]>1)throw new Error(`${e} must be in [0,1]`);if(t.chipFriction<0||t.railFriction<0||t.spinFriction<0)throw new Error("friction must be >= 0");if(t.iterations<1)throw new Error("iterations must be >= 1");if(t.maxShotSpeed>t.maxSpeed)throw new Error("maxShotSpeed must not exceed maxSpeed");return t}function xd(i,t){const e=Math.min(i.spec.pieceRadius,i.spec.captainRadius,i.spec.shooterRadius),n=t.maxSpeed*t.dt;if(n>=e*.75)throw new Error(`Time step too large: ${n.toFixed(4)} per step vs min radius ${e}`)}class yd{constructor(t,e,n){O(this,"bodies");O(this,"pocketed",[]);O(this,"offBoard",[]);O(this,"params");O(this,"time",0);O(this,"steps",0);O(this,"timedOut",!1);this.geometry=t,this.params=Ih(n),xd(t,this.params);const s=new Set;this.bodies=e.map(r=>{if(s.has(r.id))throw new Error(`Duplicate body id ${r.id}`);s.add(r.id);for(const c of["x","y","vx","vy","r","m"])if(!Number.isFinite(r[c]))throw new Error(`Body ${r.id}.${c} is not finite`);if(r.r<=0||r.m<=0)throw new Error(`Body ${r.id} needs positive radius and mass`);const o=r.w??0,a=r.a??0;if(!Number.isFinite(o)||!Number.isFinite(a))throw new Error(`Body ${r.id} spin is not finite`);return{id:r.id,kind:r.kind,x:r.x,y:r.y,vx:r.vx,vy:r.vy,r:r.r,m:r.m,i:.5*r.m*r.r*r.r,w:o,a,base:r.base??null,hole:null,off:!1,air:0}});for(const r of this.bodies)r.base!==null&&!s.has(r.base)&&(r.base=null),r.base!==null&&(r.vx=r.vy=r.w=0),Md(r,this.params.maxSpeed);this.relax(this.time,[])}get atRest(){for(const t of this.bodies)if(t.vx!==0||t.vy!==0||t.w!==0)return!1;return!0}get finished(){return this.timedOut||this.atRest}relax(t,e){const n=this.params,s=this.bodies,r=(o,a,c)=>this.pinnedAgainstRail(o,a,c);for(let o=0;o<n.iterations;o++){let a=!1;for(let h=0;h<s.length;h++){const u=s[h];if(!(u.base!==null||u.off))for(let d=h+1;d<s.length;d++){const f=s[d];f.base!==null||f.off||Sd(u,f,n,t,e,o===0?r:null)&&(a=!0)}}const c=this.geometry.posts,l=this.geometry.spec.postRadius;for(const h of s)if(!(h.base!==null||h.off)){for(const u of this.geometry.rails)wd(h,u.normal,u.offset,n,t,e)&&(a=!0);for(const u of c)bd(h,u,l,n,t,e)&&(a=!0)}if(!a)break}}pinnedAgainstRail(t,e,n){for(const s of this.geometry.rails)if(s.normal.x*t.x+s.normal.y*t.y+s.offset<t.r+.01&&s.normal.x*e+s.normal.y*n<-.5)return!0;return!1}step(){const t=[];if(this.finished)return t;const e=this.params,n=e.dt,s=this.bodies,r=this.time+n;for(const h of s){if(h.base===null)continue;const u=s.find(d=>d.id===h.base);(!u||u.vx!==0||u.vy!==0)&&(h.base=null)}const o=e.maxSpeed/Math.min(...s.map(h=>h.r),1);for(const h of s){if(h.base!==null)continue;if(h.w!==0){const v=e.spinFriction*n;h.w>v?h.w-=v:h.w<-v?h.w+=v:h.w=0,h.w>o?h.w=o:h.w<-o&&(h.w=-o),h.a+=h.w*n}const u=h.vx*h.vx+h.vy*h.vy;if(u===0)continue;const d=Math.sqrt(u);let f=(d-e.friction*n)*(1-e.damping*n);if(f<e.restSpeed){h.vx=0,h.vy=0;continue}f>e.maxSpeed&&(f=e.maxSpeed);const g=f/d;h.vx*=g,h.vy*=g,h.x+=h.vx*n,h.y+=h.vy*n}this.relax(r,t);const a=this.geometry.pockets,c=this.geometry.spec.pocketRadius,l=c*c;for(let h=s.length-1;h>=0;h--){const u=s[h];if(u.base!==null||u.off)continue;let d=-1,f=0,g=0;for(let p=0;p<a.length;p++)if(f=u.x-a[p].x,g=u.y-a[p].y,f*f+g*g<l){d=p;break}if(d<0){u.hole=null;continue}if(r<u.air)continue;if((!u.hole||u.hole.k!==d)&&(u.hole={k:d,t:r}),r-u.hole.t>=e.dropTime-1e-12){this.pocketed.push({id:u.id,pocket:d,time:r,vx:u.vx,vy:u.vy}),s.splice(h,1);continue}const v=Math.sqrt(f*f+g*g),m=f*u.vx+g*u.vy;if(v>c-.012&&m>0&&v>0){const p=-f/v,b=-g/v,w=-(u.vx*p+u.vy*b),_=$a(u,p,b,e.lipRestitution,e.railFriction);if(_>0&&t.push({time:r,a:u.id,b:"lip",impulse:_}),w>e.lipHopSpeed){let L=.06+(w-e.lipHopSpeed)*.05;L>.2&&(L=.2),u.air=r+L}u.hole={k:d,t:r}}}for(let h=s.length-1;h>=0;h--){const u=s[h];u.off&&(this.offBoard.push({id:u.id,time:r,x:u.x,y:u.y,vx:u.vx,vy:u.vy}),s.splice(h,1))}if(this.time=r,this.steps++,this.time>=e.maxTime&&!this.atRest){this.timedOut=!0;for(const h of s)h.vx=0,h.vy=0,h.w=0}return t}run(){for(;!this.finished;)this.step();return this}outcome(){if(!this.finished)throw new Error("Simulation has not finished");const t=new Map(this.bodies.map(r=>[r.id,r])),e=(r,o=0)=>{if(r.base===null||o>40)return 0;const a=t.get(r.base);return a?e(a,o+1)+1:0},n={};for(const r of this.bodies)n[r.id]=r.base!==null&&t.has(r.base)?{x:r.x,y:r.y,a:r.a,z:e(r),on:r.base}:{x:r.x,y:r.y,a:r.a,z:0};const s=r=>r.map((o,a)=>({e:o,i:a})).sort((o,a)=>o.e.time-a.e.time||a.i-o.i).map(({e:o})=>o);return{positions:n,pocketed:s(this.pocketed),offBoard:s(this.offBoard),time:this.time,timedOut:this.timedOut}}}function Md(i,t){const e=i.vx*i.vx+i.vy*i.vy;if(e>t*t){const n=t/Math.sqrt(e);i.vx*=n,i.vy*=n}}function Sd(i,t,e,n,s,r){const o=t.x-i.x,a=t.y-i.y,c=i.r+t.r,l=o*o+a*a;if(l>=c*c)return!1;let h,u,d;l===0?(h=1,u=0,d=0):(d=Math.sqrt(l),h=o/d,u=a/d);const f=1/i.m,g=1/t.m,v=f+g,m=(t.vx-i.vx)*h+(t.vy-i.vy)*u;if(m<0){const w=-(1+e.restitution)*m/v;i.vx-=w*f*h,i.vy-=w*f*u,t.vx+=w*g*h,t.vy+=w*g*u;const _=-u,L=h,E=(t.vx-i.vx)*_+(t.vy-i.vy)*L-t.w*t.r-i.w*i.r,A=f+g+i.r*i.r/i.i+t.r*t.r/t.i;let P=-E/A;const M=e.chipFriction*w;P>M?P=M:P<-M&&(P=-M),i.vx-=P*f*_,i.vy-=P*f*L,t.vx+=P*g*_,t.vy+=P*g*L,i.w-=P*i.r/i.i,t.w-=P*t.r/t.i,s.push({time:n,a:i.id,b:t.id,impulse:w}),r&&-m>e.popSpeed&&(r(t,h,u)?t.off=!0:r(i,-h,-u)&&(i.off=!0))}const b=(c-d)/v;return i.x-=h*b*f,i.y-=u*b*f,t.x+=h*b*g,t.y+=u*b*g,!0}function $a(i,t,e,n,s){const r=i.vx*t+i.vy*e;if(r>=0)return 0;const o=-(1+n)*r*i.m;i.vx+=o/i.m*t,i.vy+=o/i.m*e;const a=-e,c=t,l=i.vx*a+i.vy*c-i.w*i.r,h=1/i.m+i.r*i.r/i.i;let u=-l/h;const d=s*o;return u>d?u=d:u<-d&&(u=-d),i.vx+=u/i.m*a,i.vy+=u/i.m*c,i.w-=u*i.r/i.i,o}function wd(i,t,e,n,s,r){const o=t.x*i.x+t.y*i.y+e;if(o>=i.r)return!1;const a=i.r-o;i.x+=t.x*a,i.y+=t.y*a;const c=i.vx*t.x+i.vy*t.y;if(c<0){const l=Math.sqrt(i.vx*i.vx+i.vy*i.vy);i.kind!=="shooter"&&-c>n.jumpSpeed&&-c>n.jumpCos*l&&(i.off=!0);const h=$a(i,t.x,t.y,n.railRestitution,n.railFriction);r.push({time:s,a:i.id,b:null,impulse:h})}return!0}function bd(i,t,e,n,s,r){const o=i.x-t.x,a=i.y-t.y,c=i.r+e,l=o*o+a*a;if(l>=c*c)return!1;let h=1,u=0,d=0;l>0&&(d=Math.sqrt(l),h=o/d,u=a/d);const f=c-d;i.x+=h*f,i.y+=u*f;const g=$a(i,h,u,n.railRestitution,n.railFriction);return g>0&&r.push({time:s,a:i.id,b:"post",impulse:g}),!0}function Ed(i,t){const e=Math.abs(i)+Math.abs(t);if(e===0)return 0;const n=i/e;return t>=0?1-n:3+n}const qa=["anchor-dark","anchor-dark","helm-light","helm-light","helm-light","anchor-dark","anchor-light","helm-light","helm-dark","helm-dark","helm-light","anchor-dark","anchor-light","helm-dark","chest-light",null,"anchor-dark","anchor-light","helm-dark","chest-light","chest-dark","anchor-light","anchor-light","chest-dark","helm-dark","chest-light","chest-dark","chest-dark","chest-dark","chest-light","chest-light"];function Dh(i){return qa[i]??null}function Td(i){return qa.flatMap((t,e)=>t===i?[e]:[])}const Ad=["AA","WWWAA","WWWWAA","WCKAA","WCCAAC","WCCCC","CC"],Rd={A:"anchor-dark",W:"helm-dark",C:"chest-dark"};function Cd(i,t){const e=i*2+t,n=[];return Ad.forEach((s,r)=>{const o=(3-r)*Fi*e;for(let a=0;a<s.length;a++){const c=(a-(s.length-1)/2)*e;n.push({x:o===0?0:-o,y:c,letter:s[a]})}}),n}function Pd(i,t=.002,e="normal"){const n=Cd(i,t),s=new Map,r=c=>{const l=Td(c),h=s.get(c)??0;return s.set(c,h+1),l[h%l.length]};if(e==="normal")return n.map((c,l)=>({x:c.x,y:c.y,type:c.letter==="K"?null:qa[l],face:l}));if(e===3)return n.map((c,l)=>{if(c.letter==="K")return{x:c.x,y:c.y,type:null,face:l};const h=Rd[c.letter];return{x:c.x,y:c.y,type:h,face:r(h)}});const o=n.map((c,l)=>({p:c,i:l,ring:Math.round((c.x*c.x+c.y*c.y)*1e6),ang:Ed(c.x,c.y)})).filter(c=>c.p.letter!=="K").sort((c,l)=>c.ring-l.ring||c.ang-l.ang),a=new Map;return o.forEach((c,l)=>a.set(c.i,l%2===0?"helm-dark":"anchor-light")),n.map((c,l)=>{if(c.letter==="K")return{x:c.x,y:c.y,type:null,face:l};const h=a.get(l);return{x:c.x,y:c.y,type:h,face:r(h)}})}const ui="shooter",qi="captain",Ld=6,Ya=["anchor-dark","anchor-light","helm-dark","helm-light","chest-dark","chest-light"],yn={"anchor-dark":"Dark Anchors","anchor-light":"Light Anchors","helm-dark":"Dark Helms","helm-light":"Light Helms","chest-dark":"Dark Chests","chest-light":"Light Chests"},Uh={2:2,3:3,6:"normal"},Id=Object.freeze({1:[0],2:[0,3],3:[0,2,4],4:[0,1,3,4],5:[0,1,2,3,4],6:[0,1,2,3,4,5]});function Nh(){return{shots:0,goodShots:0,rescued:0,forOthers:0,spare:0,lost:0,shooterFaults:0,penalties:0,captainReturns:0,captainFouls:0,overboard:0,bestRun:0,run:0}}function Dd(i){if(i.mode!=="versus"&&i.mode!=="coop")throw new Error(`Unknown mode ${String(i.mode)}`);const t=i.players?.length??0;if(!Number.isInteger(t)||t<1||t>Ld)throw new Error("A match needs 1 to 6 players");const e=i.players.map((l,h)=>{const u={name:Bc(l.name,`Player ${h+1}`),team:l.team};if(l.ai!==void 0){if(l.ai!=="easy"&&l.ai!=="medium"&&l.ai!=="hard")throw new Error(`Player ${h+1} has an unknown computer level`);u.ai=l.ai}return u});let n=(i.teams??[]).map((l,h)=>({name:Bc(l.name,`Team ${h+1}`),color:l.color||"#888888"}));if(i.mode==="versus"){if(t<2)throw new Error("Versus needs at least 2 players");if(!(n.length in Uh))throw new Error("Versus needs 2, 3 or 6 crews");e.forEach((l,h)=>{if(!Number.isInteger(l.team)||l.team<0||l.team>=n.length)throw new Error(`Player ${h+1} has an invalid team`)}),n.forEach((l,h)=>{if(!e.some(u=>u.team===h))throw new Error(`${n[h].name} has no players`)})}else{if(n.length===0&&(n=[{name:"Crew",color:"#e7b73c"}]),n.length!==1)throw new Error("Co-op uses a single crew");e.forEach(l=>l.team=0)}const s=i.captainFoul??"out";if(s!=="out"&&s!=="standby")throw new Error("captainFoul must be out or standby");const r=i.salt??"normal";if(!(r in kc))throw new Error("salt must be light, normal or heavy");const o={...Ph,...i.board??{}};Lh(o);const a=Ih({friction:kc[r],...i.physics??{}}),c=i.aimGuide??!0;if(typeof c!="boolean")throw new Error("aimGuide must be true or false");return{mode:i.mode,players:e,teams:n,captainFoul:s,aimGuide:c,salt:r,board:o,physics:a}}function Bc(i,t){return(typeof i=="string"?i.trim().slice(0,24):"")||t}function ks(i){const t=Dd(i),e=[...Id[t.players.length]],n=Array.from({length:Bi},(c,l)=>t.mode==="coop"&&l%2===1?"shark":"lifeboat"),s=t.mode==="versus"?Uh[t.teams.length]:"normal",r=Pd(Math.max(t.board.pieceRadius,t.board.captainRadius),pd,s),o=new Map,a=r.map(c=>{const l={at:"board",x:c.x,y:c.y};if(c.type===null)return{id:qi,kind:"captain",type:null,face:c.face,loc:l};const h=o.get(c.type)??0;return o.set(c.type,h+1),{id:`${c.type}-${h}`,kind:"sailor",type:c.type,face:c.face,loc:l}});return a.sort((c,l)=>c.kind==="captain"?-1:l.kind==="captain"?1:0),{version:2,config:t,seats:e,pocketRoles:n,pieces:a,claims:t.teams.map(()=>null),out:t.teams.map(()=>!1),standby:null,current:0,turn:1,shotInTurn:0,pocketSeq:0,status:"playing",winner:null,pending:null,history:[],lastReport:null,stats:t.players.map(()=>Nh())}}const zc=new Map;function Ye(i){const t=JSON.stringify(i.config.board);let e=zc.get(t);return e||(e=Lh(i.config.board),zc.set(t,e)),e}function Bs(i){return i.config.players[i.current].team}function Hc(i){return i.seats[i.current]}function tn(i,t=i.current){return Ye(i).ropes[i.seats[t]]}function de(i,t){const e=i.config.board;return t==="shooter"?e.shooterRadius:t==="captain"?e.captainRadius:e.pieceRadius}function Vc(i,t){const e=i.config.board;return t==="shooter"?e.shooterMass:t==="captain"?e.captainMass:e.pieceMass}function jn(i){return i.pieces.filter(t=>t.loc.at==="board")}function ja(i,t){return t.loc.at==="pocket"&&i.pocketRoles[t.loc.pocket]==="lifeboat"}function Ud(i,t){return i.pieces.filter(e=>e.kind==="sailor"&&e.type===t&&ja(i,e)).length}function bs(i,t){if(i.config.mode==="coop")return i.pieces.filter(n=>n.kind==="sailor"&&ja(i,n)).length;const e=i.claims[t];return e?Ud(i,e):0}function Fh(i){return i.pieces.filter(t=>t.kind==="sailor"&&t.loc.at==="pocket"&&i.pocketRoles[t.loc.pocket]==="shark").length}function Br(i){return i.pieces.filter(t=>t.kind==="sailor").length/i.config.teams.length}function Nd(i){return i.config.mode==="versus"?Br(i):i.pieces.filter(t=>t.kind==="sailor").length}function zr(i,t){return i.claims.indexOf(t)}function Fd(i,t){return!i.out[t]&&i.standby!==t}function Oh(i,t){return i.config.mode==="versus"?i.claims[t]!==null&&bs(i,t)>=Br(i):!i.pieces.some(e=>e.kind==="sailor"&&e.loc.at==="board")}function qe(i){if(i.status!=="playing"||i.pending)return!1;const t=i.pieces.find(e=>e.id===qi);return!!t&&t.loc.at==="board"&&Oh(i,Bs(i))}function vn(i){return i.pocketRoles.flatMap((t,e)=>t==="lifeboat"?[e]:[])}const Gc=1e-6;function Es(i,t){if(!Hr(t))return"Shooter position is not a number";const e=tn(i),n=gs(t,e.start,e.end);if(nn(n,t)>Gc*Gc)return"The shooter must sit on your Lifeline Rope";const s=de(i,"shooter");for(const r of jn(i)){const o=s+de(i,r.kind);if(nn(t,r.loc)<o*o)return"The shooter is touching another chip"}return vd(Ye(i),t,s)?"The shooter is touching a peg":null}function kh(i,t){const e=tn(i),n=gs(t,e.start,e.end);if(!Es(i,n))return n;const s=Math.sqrt(nn(e.start,e.end)),r=(e.end.x-e.start.x)/s,o=(e.end.y-e.start.y)/s,a=(n.x-e.start.x)*r+(n.y-e.start.y)*o,c=s/400;for(let l=1;l<=400;l++)for(const h of[a+l*c,a-l*c]){if(h<0||h>s)continue;const u={x:e.start.x+r*h,y:e.start.y+o*h};if(!Es(i,u))return u}return null}function Za(i){const t=tn(i);return kh(i,{x:(t.start.x+t.end.x)/2,y:(t.start.y+t.end.y)/2})}function ai(i,t){if(i.status!=="playing")return"The match is over";if(i.pending)return"Choose which Sailors to claim first";if(!t||!Hr(t.velocity))return"Shot velocity is not a number";const e=t.velocity.x*t.velocity.x+t.velocity.y*t.velocity.y;if(e===0)return"The shot has no power";const n=i.config.physics.maxShotSpeed*(1+1e-9);if(e>n*n)return"The shot is too powerful";const s=Es(i,t.shooter);if(s)return s;if(qe(i)){if(t.calledPocket===void 0)return"Call a lifeboat for the Captain first";if(!Number.isInteger(t.calledPocket)||!vn(i).includes(t.calledPocket))return"That lifeboat cannot be called"}else if(t.calledPocket!==void 0)return"A lifeboat can only be called when beckoning the Captain";return null}function Hr(i){return!!i&&Number.isFinite(i.x)&&Number.isFinite(i.y)}function Od(i,t){const e=ai(i,t);if(e)throw new Error(e);const n=jn(i).map(s=>({id:s.id,kind:s.kind==="captain"?"captain":"piece",x:s.loc.x,y:s.loc.y,vx:0,vy:0,r:de(i,s.kind),m:Vc(i,s.kind),a:s.loc.a??0,base:s.loc.on??null}));return n.push({id:ui,kind:"shooter",x:t.shooter.x,y:t.shooter.y,vx:t.velocity.x,vy:t.velocity.y,r:de(i,"shooter"),m:Vc(i,"shooter")}),n}function Bh(i,t){return new yd(Ye(i),Od(i,t),i.config.physics)}function kd(i,t){const e=Bh(i,t).run().outcome();return{...zh(i,t,e),outcome:e}}function zh(i,t,e){const n=ai(i,t);if(n)throw new Error(n);Bd(i,e);const s=structuredClone(i),r=s.config.mode==="versus",o=s.current,a=Bs(s),c=qe(i),l=c?t.calledPocket:null;for(const g of s.pieces){if(g.loc.at!=="board")continue;const v=e.positions[g.id];v&&(g.loc=Wo(v.x,v.y,v.a,v.on))}const h={player:o,team:a,rescued:[],lost:[],ownRescued:0,claimed:null,claimOptions:null,shooterSunk:!1,shooterPocket:null,overboard:[],shooterOverboard:!1,penalty:null,captain:null,foul:null,calledPocket:l,turnContinues:!1,nextPlayer:o,status:"playing",winner:null,timedOut:e.timedOut};let u=null;for(const g of e.pocketed){if(g.id===ui){h.shooterSunk=!0,h.shooterPocket=g.pocket;continue}const v=s.pieces.find(m=>m.id===g.id);v.loc={at:"pocket",pocket:g.pocket,order:++s.pocketSeq},v.kind==="captain"?u=g.pocket:s.pocketRoles[g.pocket]==="shark"?h.lost.push({id:v.id,pocket:g.pocket}):h.rescued.push({id:v.id,type:v.type,pocket:g.pocket,team:-1})}for(const g of e.offBoard){if(g.id===ui){h.shooterOverboard=!0;continue}Vh(s,s.pieces.find(v=>v.id===g.id)),h.overboard.push(g.id)}let d=!1,f=!1;if(u!==null&&(!r&&s.pocketRoles[u]==="shark"?(h.captain={pocket:u,result:"eaten"},s.status="lost"):c&&u===l&&!h.shooterSunk?(h.captain={pocket:u,result:"rescued"},s.status="won",s.winner=a):r&&!c?(h.captain={pocket:u,result:"foul"},d=f=!0):(h.captain={pocket:u,result:"returned"},d=!0)),r&&s.status==="playing"&&s.claims[a]===null&&!(f&&s.config.captainFoul==="out")){const g=Ya.filter(v=>h.rescued.some(m=>m.type===v)&&zr(s,v)===-1);if(g.length===1)s.claims[a]=g[0],h.claimed=g[0];else if(g.length>1)return h.claimOptions=g,s.pending={report:h,captainReturned:d,foul:f},s.history.push({player:o,input:structuredClone(t)}),s.lastReport=h,{state:s,report:h}}return s.history.push({player:o,input:structuredClone(t)}),Hh(s,h,d,f),{state:s,report:h}}function Ja(i,t){if(!i.pending)throw new Error("There is no claim to make");if(!(i.pending.report.claimOptions??[]).includes(t))throw new Error("That Sailor type cannot be claimed");const n=structuredClone(i),{report:s,captainReturned:r,foul:o}=n.pending;return n.pending=null,n.claims[s.team]=t,s.claimed=t,s.claimOptions=null,n.history.push({player:s.player,claim:t}),Hh(n,s,r,o),{state:n,report:s}}function Hh(i,t,e,n){const s=i.config.mode==="versus",r=t.team,o=i.claims[r];for(const h of t.rescued)h.team=s?zr(i,h.type):0;t.ownRescued=s?t.rescued.filter(h=>o!==null&&h.type===o).length:t.rescued.length;const a=[];if(e&&a.push(i.pieces.find(h=>h.id===qi)),t.shooterSunk&&i.status==="playing"){let h=null;for(const u of i.pieces)u.kind!=="sailor"||!ja(i,u)||s&&(o===null||u.type!==o)||(!h||h.loc.at==="pocket"&&u.loc.at==="pocket"&&u.loc.order>h.loc.order)&&(h=u);h&&(t.penalty=h.id,a.push(h))}for(const h of a)Vh(i,h);if(n&&i.status==="playing"){const h=i.config.captainFoul;if(t.foul={team:r,kind:h},h==="out"){i.out[r]=!0,i.standby===r&&(i.standby=null);const u=i.out.flatMap((d,f)=>d?[]:[f]);u.length===1&&(i.status="won",i.winner=u[0])}else i.standby=r}const c=i.stats[t.player];c.shots++;const l=s?t.ownRescued:t.rescued.length;if(c.rescued+=l,l>0&&c.goodShots++,s)for(const h of t.rescued)h.team!==r&&(h.team>=0?c.forOthers++:c.spare++);if(c.lost+=t.lost.length,t.shooterSunk&&c.shooterFaults++,t.penalty&&c.penalties++,t.captain?.result==="returned"&&c.captainReturns++,t.foul&&c.captainFouls++,c.overboard+=t.overboard.length,c.run+=l,c.run>c.bestRun&&(c.bestRun=c.run),i.status==="playing"){const h=s?t.ownRescued>0:t.rescued.length>0&&t.lost.length===0;t.turnContinues=h&&!t.shooterSunk&&t.captain===null,t.turnContinues?i.shotInTurn++:(c.run=0,i.current=Gh(i,i.current),i.turn++,i.shotInTurn=0)}t.nextPlayer=i.current,t.status=i.status,t.winner=i.winner,i.lastReport=t}function Wo(i,t,e,n){const s={at:"board",x:i,y:t};return e&&(s.a=e),n!==void 0&&(s.on=n),s}function Vh(i,t){const e=de(i,t.kind),n=jn(i).filter(o=>o.id!==t.id&&Math.hypot(o.loc.x,o.loc.y)<e+de(i,o.kind)-1e-9);if(n.length===0){t.loc=Wo(0,0);return}const s=o=>{let a=0;for(let c=o.loc.on;c!==void 0&&a<64;a++){const l=i.pieces.find(h=>h.id===c);c=l&&l.loc.at==="board"?l.loc.on:void 0}return a};n.sort((o,a)=>s(o)-s(a)||(o.id<a.id?-1:o.id>a.id?1:0));let r;for(const o of[...n,t])o.loc=Wo(0,0,o.loc.at==="board"?o.loc.a:void 0,r),r=o.id}function Gh(i,t){const e=i.config.players.length;for(let n=1;n<=e;n++){const s=(t+n)%e;if(Fd(i,i.config.players[s].team))return s}return t}function Bd(i,t){const e=new Set(jn(i).map(s=>s.id));e.add(ui);const n=new Set;for(const s of t.pocketed){if(!e.has(s.id))throw new Error(`Outcome pockets unknown piece ${s.id}`);if(n.has(s.id))throw new Error(`Outcome pockets ${s.id} twice`);if(!Number.isInteger(s.pocket)||s.pocket<0||s.pocket>=Bi)throw new Error("Outcome has a bad pocket");n.add(s.id)}for(const s of t.offBoard??[]){if(!e.has(s.id))throw new Error(`Outcome throws unknown piece ${s.id} overboard`);if(n.has(s.id))throw new Error(`Outcome moves ${s.id} twice`);n.add(s.id)}for(const s of e){if(n.has(s))continue;const r=t.positions[s];if(!r||!Hr(r))throw new Error(`Outcome is missing a position for ${s}`)}}function zd(i){if(i.status!=="playing")throw new Error("The match is over");if(i.pending)throw new Error("Choose which Sailors to claim first");if(Za(i))throw new Error("The rope is not blocked");const t=structuredClone(i);return t.stats[t.current].run=0,t.current=Gh(t,t.current),t.turn++,t.shotInTurn=0,t.lastReport=null,t}function Xo(i){const t=i;if(!t||typeof t!="object"||t.version!==2)throw new Error("Unsupported save");const e=ks(t.config);if(!Array.isArray(t.pieces)||t.pieces.length!==e.pieces.length)throw new Error("Corrupt save: pieces");const n=new Set(e.pieces.map(r=>r.id));for(const r of t.pieces){if(!n.has(r.id))throw new Error("Corrupt save: unknown piece");if(r.loc.at==="board"&&!Hr(r.loc))throw new Error("Corrupt save: position");if(r.loc.at==="board"&&r.loc.a!==void 0&&!Number.isFinite(r.loc.a))throw new Error("Corrupt save: angle");if(r.loc.at==="board"&&r.loc.on!==void 0&&!t.pieces.some(o=>o.id===r.loc.on&&o.loc.at==="board"))throw new Error("Corrupt save: stack");if(r.loc.at==="pocket"&&!(Number.isInteger(r.loc.pocket)&&r.loc.pocket>=0&&r.loc.pocket<Bi))throw new Error("Corrupt save: pocket")}const s=e.config.teams.length;if(!Array.isArray(t.claims)||t.claims.length!==s||t.claims.some(r=>r!==null&&!Ya.includes(r)))throw new Error("Corrupt save: claims");if(!Array.isArray(t.out)||t.out.length!==s)throw new Error("Corrupt save: teams");if(!Number.isInteger(t.current)||t.current<0||t.current>=e.config.players.length)throw new Error("Corrupt save: current player");return{...t,config:e.config,seats:e.seats,pocketRoles:e.pocketRoles,stats:Hd(t.stats,e.config.players.length)}}function Hd(i,t){const e=Array.isArray(i)?i:[];return Array.from({length:t},(n,s)=>{const r=Nh(),o=e[s];if(o&&typeof o=="object")for(const a of Object.keys(r)){const c=o[a];typeof c=="number"&&Number.isInteger(c)&&c>=0&&c<1e6&&(r[a]=c)}return r})}const $o=Object.freeze([{name:"Red Crew",color:"#e5484d"},{name:"Blue Crew",color:"#3b8be0"},{name:"Gold Crew",color:"#e7b73c"},{name:"Green Crew",color:"#3fb37f"},{name:"Purple Crew",color:"#9b6bd6"},{name:"White Crew",color:"#e8e2d4"}]);function qo(i){const t=[],e=(n,s,r,o)=>{if(s===0){n===0&&t.push(o);return}for(let a=Math.min(n-(s-1),r);a>=1;a--)e(n-a,s-1,a,[...o,a])};for(const n of[2,3])i>=n&&e(i,n,i,[]);return i===6&&t.push([1,1,1,1,1,1]),t}function jr(i){const t=qo(i);if(t.length===0)return null;const e=n=>Math.max(...n)-Math.min(...n);return[...t].sort((n,s)=>e(n)-e(s)||n.length-s.length)[0]}function Vd(i){return i.length===6?"6 crews of 1":i.join(" v ")}function Gd(i){return i===2?"15 Dark Helms vs 15 Light Anchors.":i===3?"10 each of Dark Anchors, Dark Helms and Dark Chests.":i===6?"The full set: each player claims one of the six symbols (5 Sailors each).":""}function Wh(i){const t=[...i],e=t.reduce((s,r)=>s+r,0),n=[];for(let s=0;s<e;s++){const r=n[s-1],o=s===e-1?n[0]:void 0;let a=-1;for(const c of[!0,!1]){for(let l=0;l<t.length;l++)t[l]===0||l===r||c&&l===o||(a===-1||t[l]>t[a])&&(a=l);if(a!==-1)break}a===-1&&(a=t.findIndex(c=>c>0)),n.push(a),t[a]--}return n}function Wd(i,t=[],e={}){if(![2,3,6].includes(i.length))throw new Error("Versus needs 2, 3 or 6 crews");const s=Wh(i).map((r,o)=>({name:t[o]??`Player ${o+1}`,team:r}));return{...e,mode:"versus",teams:$o.slice(0,i.length).map(r=>({...r})),players:s}}function Xd(i,t=[],e={}){const n=Array.from({length:i},(s,r)=>({name:t[r]??`Player ${r+1}`,team:0}));return{...e,mode:"coop",teams:[{name:"Crew",color:"#e7b73c"}],players:n}}function $d(i,t,e,n,s,r=4){const o=Math.hypot(n.x,n.y);if(!(o>0))return{point:{...e},distance:0,hit:null};const a=n.x/o,c=n.y/o;let l=r,h=null;for(const u of t){const d=Zr(e,a,c,u,s+u.r);if(d!==null&&d<l){l=d;const f=e.x+a*d,g=e.y+c*d,v=u.x-f,m=u.y-g,p=Math.hypot(v,m)||1;h={type:"piece",id:u.id,push:{x:v/p,y:m/p}}}}for(const u of i.rails){const d=u.normal.x*a+u.normal.y*c;if(d>=0)continue;const f=u.normal.x*e.x+u.normal.y*e.y+u.offset,g=(s-f)/d;g>=0&&g<l&&(l=g,h={type:"rail",side:u.side})}i.posts.forEach((u,d)=>{const f=Zr(e,a,c,u,s+i.spec.postRadius);f!==null&&f<l&&(l=f,h={type:"post",post:d})});for(let u=0;u<i.pockets.length;u++){const d=Zr(e,a,c,i.pockets[u],i.spec.pocketRadius);d!==null&&d<l&&(l=d,h={type:"pocket",pocket:u})}return{point:{x:e.x+a*l,y:e.y+c*l},distance:l,hit:h}}function Zr(i,t,e,n,s){const r=i.x-n.x,o=i.y-n.y,a=r*t+o*e,c=r*r+o*o-s*s;if(c<=0)return 0;if(a>=0)return null;const l=a*a-c;return l<0?null:-a-Math.sqrt(l)}const qd=["easy","medium","hard"],Ts={easy:"Easy",medium:"Medium",hard:"Hard"},Yd={easy:{placements:3,sims:14,random:4,aimError:.065,powerError:.14,positional:!1,robust:!1,sloppy:3},medium:{placements:5,sims:45,random:6,aimError:.024,powerError:.06,positional:!0,robust:!1,sloppy:1},hard:{placements:9,sims:110,random:10,aimError:.006,powerError:.02,positional:!0,robust:!0,sloppy:1}};function jd(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Wc(i){const t=Math.max(1e-12,i());return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*i())}function Xh(i,t){if(i.config.mode==="coop")return"any";const e=i.claims[t];if(e)return new Set([e]);const n=new Set;for(const s of jn(i))s.type&&zr(i,s.type)===-1&&n.add(s.type);return n}function Jr(i,t,e,n){const s=(n.x-i.x)*t.x+(n.y-i.y)*t.y;if(s<=0||s>=e)return 1/0;const r=i.x+t.x*s-n.x,o=i.y+t.y*s-n.y;return Math.sqrt(r*r+o*o)}function Zd(i,t,e){const n=Ye(i),s=tn(i),r=Bs(i),o=i.config.board,a=i.config.physics,c=de(i,"shooter"),l=a.maxShotSpeed,h=qe(i),u=jn(i),d=[];for(let _=0;_<t.placements;_++){const L=t.placements===1?.5:.08+.84*_/(t.placements-1),E=kh(i,{x:s.start.x+(s.end.x-s.start.x)*L,y:s.start.y+(s.end.y-s.start.y)*L});E&&!d.some(A=>nn(E,A)<1e-6)&&d.push(E)}if(d.length===0)return[];const f=h?vn(i):i.pocketRoles.flatMap((_,L)=>_==="lifeboat"?[L]:[]),g=Xh(i,r),v=h?u.filter(_=>_.id===qi):u.filter(_=>_.kind==="sailor"&&(g==="any"||g.has(_.type))),m=[],p=(_,L,E,A)=>{const P=Math.sqrt(2*a.friction*(E+.05))+.35,M=_*(1+a.restitution)*o.shooterMass/(o.shooterMass+A),x=P/Math.max(.15,M);return Math.sqrt(x*x+2*a.friction*L)};for(const _ of v){const L=de(i,_.kind),E=_.kind==="captain"?o.captainMass:o.pieceMass;for(const A of f){const P=n.pockets[A],M=Math.sqrt(nn(P,_.loc)),x={x:(P.x-_.loc.x)/M,y:(P.y-_.loc.y)/M};let C=0;for(const D of u)D.id!==_.id&&Jr(_.loc,x,M,D.loc)<L+de(i,D.kind)&&C++;const B={x:_.loc.x-x.x*(L+c),y:_.loc.y-x.y*(L+c)};for(const D of d){const k=Math.sqrt(nn(B,D));if(k<1e-6)continue;const G={x:(B.x-D.x)/k,y:(B.y-D.y)/k},H=G.x*x.x+G.y*x.y;if(H<.3)continue;let J=0;for(const tt of u)tt.id!==_.id&&Jr(D,G,k,tt.loc)<c+de(i,tt.kind)&&J++;for(const tt of n.posts)Jr(D,G,k,tt)<c+o.postRadius&&J++;const V=p(H,k,M,E),it=H*3-k-M*1.5-J*2.5-C*2;for(const tt of[1,1.3,.85]){const ht=Math.min(l,V*tt),Ct={shooter:D,velocity:{x:G.x*ht,y:G.y*ht}};h&&(Ct.calledPocket=A),m.push({input:Ct,guess:it-Math.abs(tt-1)})}}}}m.sort((_,L)=>L.guess-_.guess);const b=m.slice(0,Math.max(0,t.sims-t.random)),w=u.length?{x:u.reduce((_,L)=>_+L.loc.x,0)/u.length,y:u.reduce((_,L)=>_+L.loc.y,0)/u.length}:{x:0,y:0};for(let _=0;_<t.random;_++){const L=d[Math.floor(e()*d.length)],A=Math.atan2(w.y-L.y,w.x-L.x)+(e()-.5)*.9,P=l*(.45+e()*.55),M={shooter:L,velocity:{x:Math.cos(A)*P,y:Math.sin(A)*P}};if(h){const x=u.find(C=>C.id===qi);M.calledPocket=f.reduce((C,B)=>nn(n.pockets[B],x.loc)<nn(n.pockets[C],x.loc)?B:C,f[0])}b.push({input:M,guess:-99})}return b}function Jd(i,t){const n=Ye(i).pockets.filter((o,a)=>i.pocketRoles[a]==="lifeboat"),s=Xh(i,t);let r=0;for(const o of jn(i)){if(o.kind!=="sailor")continue;let a=1/0;for(const l of n)a=Math.min(a,nn(l,o.loc));const c=Math.max(0,1-Math.sqrt(a)/.55);s==="any"||s.has(o.type)?r+=c*6:i.config.mode==="versus"&&zr(i,o.type)>=0&&(r-=c*6)}return r}function Yo(i,t,e,n){const s=e.team;if(t.status==="won")return t.config.mode==="coop"||t.winner===s?1e5:-1e5;if(t.status==="lost")return-1e5;let r=0;if(i.config.mode==="versus"){r+=e.ownRescued*100;for(const o of e.rescued)o.team!==s&&(r-=o.team>=0?70:15);e.claimed&&(r+=20)}else r+=e.rescued.length*100-e.lost.length*130;return e.shooterSunk&&(r-=90),e.penalty&&(r-=40),e.foul&&(r-=e.foul.kind==="out"?5e4:400),e.captain?.result==="returned"&&(r-=25),e.turnContinues&&(r+=45),n&&(r+=Jd(t,s)*(e.turnContinues?1.4:.7)),r}function Kd(i,t,e=Math.random){const n=i.pending?.report.claimOptions??[];if(n.length===0)throw new Error("There is no claim to make");if(t==="easy")return n[Math.floor(e()*n.length)];let s=n[0],r=-1/0;for(const o of n){const a=Ja(i,o),c=Yo(i,a.state,a.report,!0);c>r&&(r=c,s=o)}return s}function Kr(i,t,e){const n=kd(i,t);if(n.state.pending){let s=-1/0;for(const r of n.report.claimOptions??[]){const o=Ja(n.state,r);s=Math.max(s,Yo(i,o.state,o.report,e.positional))}return s}return Yo(i,n.state,n.report,e.positional)}function Qr(i,t,e,n){const s=Math.cos(t),r=Math.sin(t);let o=(i.velocity.x*s-i.velocity.y*r)*e,a=(i.velocity.x*r+i.velocity.y*s)*e;const c=Math.sqrt(o*o+a*a);return c>n&&(o*=n/c,a*=n/c),{...i,velocity:{x:o,y:a}}}function*Qd(i,t,e=Math.random){const n=Yd[t],s=Zd(i,n,e),r=i.config.physics.maxShotSpeed;if(s.length===0)throw new Error("No legal shot");const o=[],a=s.length+(n.robust?8:0);for(const l of s)o.push({input:l.input,score:Kr(i,l.input,n)}),yield o.length/a;if(o.sort((l,h)=>h.score-l.score),n.robust){for(const l of o.slice(0,4)){const h=Kr(i,Qr(l.input,-.012,1,r),n),u=Kr(i,Qr(l.input,.012,1,r),n);l.score=l.score*.5+(h+u)*.25,yield Math.min(1,(o.length+1)/a)}o.sort((l,h)=>h.score-l.score)}const c=o[Math.min(o.length-1,Math.floor(e()*n.sloppy))];return Qr(c.input,Wc(e)*n.aimError,1+Wc(e)*n.powerError,r)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ka="170",tf=0,Xc=1,ef=2,$h=1,qh=2,mn=3,Xn=0,Pe=1,_n=2,Bn=0,zi=1,$c=2,qc=3,Yc=4,nf=5,ri=100,sf=101,rf=102,of=103,af=104,cf=200,lf=201,hf=202,uf=203,jo=204,Zo=205,df=206,ff=207,pf=208,mf=209,gf=210,vf=211,_f=212,xf=213,yf=214,Jo=0,Ko=1,Qo=2,Yi=3,ta=4,ea=5,na=6,ia=7,Yh=0,Mf=1,Sf=2,zn=0,wf=1,bf=2,Ef=3,jh=4,Tf=5,Af=6,Rf=7,Zh=300,ji=301,Zi=302,sa=303,ra=304,Vr=306,As=1e3,ci=1001,Dr=1002,Je=1003,Cf=1004,js=1005,sn=1006,to=1007,li=1008,bn=1009,Jh=1010,Kh=1011,Rs=1012,Qa=1013,di=1014,Mn=1015,zs=1016,tc=1017,ec=1018,Ji=1020,Qh=35902,tu=1021,eu=1022,Ze=1023,nu=1024,iu=1025,Hi=1026,Ki=1027,su=1028,nc=1029,ru=1030,ic=1031,sc=1033,Tr=33776,Ar=33777,Rr=33778,Cr=33779,oa=35840,aa=35841,ca=35842,la=35843,ha=36196,ua=37492,da=37496,fa=37808,pa=37809,ma=37810,ga=37811,va=37812,_a=37813,xa=37814,ya=37815,Ma=37816,Sa=37817,wa=37818,ba=37819,Ea=37820,Ta=37821,Pr=36492,Aa=36494,Ra=36495,ou=36283,Ca=36284,Pa=36285,La=36286,Pf=3200,Lf=3201,au=0,If=1,Fn="",Ee="srgb",ns="srgb-linear",Gr="linear",ee="srgb",xi=7680,jc=519,Df=512,Uf=513,Nf=514,cu=515,Ff=516,Of=517,kf=518,Bf=519,Zc=35044,Jc="300 es",Sn=2e3,Ur=2001;class is{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Kc=1234567;const vs=Math.PI/180,Cs=180/Math.PI;function gi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Me[i&255]+Me[i>>8&255]+Me[i>>16&255]+Me[i>>24&255]+"-"+Me[t&255]+Me[t>>8&255]+"-"+Me[t>>16&15|64]+Me[t>>24&255]+"-"+Me[e&63|128]+Me[e>>8&255]+"-"+Me[e>>16&255]+Me[e>>24&255]+Me[n&255]+Me[n>>8&255]+Me[n>>16&255]+Me[n>>24&255]).toLowerCase()}function ge(i,t,e){return Math.max(t,Math.min(e,i))}function rc(i,t){return(i%t+t)%t}function zf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Hf(i,t,e){return i!==t?(e-i)/(t-i):0}function _s(i,t,e){return(1-e)*i+e*t}function Vf(i,t,e,n){return _s(i,t,1-Math.exp(-e*n))}function Gf(i,t=1){return t-Math.abs(rc(i,t*2)-t)}function Wf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Xf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function $f(i,t){return i+Math.floor(Math.random()*(t-i+1))}function qf(i,t){return i+Math.random()*(t-i)}function Yf(i){return i*(.5-Math.random())}function jf(i){i!==void 0&&(Kc=i);let t=Kc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Zf(i){return i*vs}function Jf(i){return i*Cs}function Kf(i){return(i&i-1)===0&&i!==0}function Qf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function tp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ep(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ui(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ve={DEG2RAD:vs,RAD2DEG:Cs,generateUUID:gi,clamp:ge,euclideanModulo:rc,mapLinear:zf,inverseLerp:Hf,lerp:_s,damp:Vf,pingpong:Gf,smoothstep:Wf,smootherstep:Xf,randInt:$f,randFloat:qf,randFloatSpread:Yf,seededRandom:jf,degToRad:Zf,radToDeg:Jf,isPowerOfTwo:Kf,ceilPowerOfTwo:Qf,floorPowerOfTwo:tp,setQuaternionFromProperEuler:ep,normalize:Ae,denormalize:Ui};class st{constructor(t=0,e=0){st.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zt{constructor(t,e,n,s,r,o,a,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],b=s[1],w=s[4],_=s[7],L=s[2],E=s[5],A=s[8];return r[0]=o*v+a*b+c*L,r[3]=o*m+a*w+c*E,r[6]=o*p+a*_+c*A,r[1]=l*v+h*b+u*L,r[4]=l*m+h*w+u*E,r[7]=l*p+h*_+u*A,r[2]=d*v+f*b+g*L,r[5]=d*m+f*w+g*E,r[8]=d*p+f*_+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=d*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(eo.makeScale(t,e)),this}rotate(t){return this.premultiply(eo.makeRotation(-t)),this}translate(t,e){return this.premultiply(eo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const eo=new zt;function lu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ps(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function np(){const i=Ps("canvas");return i.style.display="block",i}const Qc={};function ps(i){i in Qc||(Qc[i]=!0,console.warn(i))}function ip(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function sp(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function rp(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:ns,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ee&&(i.r=wn(i.r),i.g=wn(i.g),i.b=wn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ee&&(i.r=Vi(i.r),i.g=Vi(i.g),i.b=Vi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Fn?Gr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function wn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Vi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const tl=[.64,.33,.3,.6,.15,.06],el=[.2126,.7152,.0722],nl=[.3127,.329],il=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sl=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[ns]:{primaries:tl,whitePoint:nl,transfer:Gr,toXYZ:il,fromXYZ:sl,luminanceCoefficients:el,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:tl,whitePoint:nl,transfer:ee,toXYZ:il,fromXYZ:sl,luminanceCoefficients:el,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}});let yi;class op{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{yi===void 0&&(yi=Ps("canvas")),yi.width=t.width,yi.height=t.height;const n=yi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=yi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ps("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=wn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(wn(e[n]/255)*255):e[n]=wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ap=0;class hu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=gi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(no(s[o].image)):r.push(no(s[o]))}else r=no(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function no(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?op.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let cp=0;class Te extends is{constructor(t=Te.DEFAULT_IMAGE,e=Te.DEFAULT_MAPPING,n=ci,s=ci,r=sn,o=li,a=Ze,c=bn,l=Te.DEFAULT_ANISOTROPY,h=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=gi(),this.name="",this.source=new hu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case As:t.x=t.x-Math.floor(t.x);break;case ci:t.x=t.x<0?0:1;break;case Dr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case As:t.y=t.y-Math.floor(t.y);break;case ci:t.y=t.y<0?0:1;break;case Dr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Te.DEFAULT_IMAGE=null;Te.DEFAULT_MAPPING=Zh;Te.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,s=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(l+1)/2,_=(f+1)/2,L=(p+1)/2,E=(h+d)/4,A=(u+v)/4,P=(g+m)/4;return w>_&&w>L?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=E/n,r=A/n):_>L?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=P/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=P/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-v)/b,this.z=(d-h)/b,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lp extends is{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Te(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new hu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fi extends lp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class uu extends Te{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class hp extends Te{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ss{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*v,b=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const L=Math.sqrt(w),E=Math.atan2(L,p*b);m=Math.sin(m*E)/L,a=Math.sin(a*E)/L}const _=a*b;if(c=c*m+d*_,l=l*m+f*_,h=h*m+g*_,u=u*m+v*_,m===1-a){const L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(rl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(rl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return io.copy(this).projectOnVector(t),this.sub(io)}reflect(t){return this.sub(io.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const io=new I,rl=new ss;class Hs{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ge.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ge.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ge.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ge):Ge.fromBufferAttribute(r,o),Ge.applyMatrix4(t.matrixWorld),this.expandByPoint(Ge);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zs.copy(n.boundingBox)),Zs.applyMatrix4(t.matrixWorld),this.union(Zs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ge),Ge.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(cs),Js.subVectors(this.max,cs),Mi.subVectors(t.a,cs),Si.subVectors(t.b,cs),wi.subVectors(t.c,cs),Rn.subVectors(Si,Mi),Cn.subVectors(wi,Si),Jn.subVectors(Mi,wi);let e=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-Jn.z,Jn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,Jn.z,0,-Jn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-Jn.y,Jn.x,0];return!so(e,Mi,Si,wi,Js)||(e=[1,0,0,0,1,0,0,0,1],!so(e,Mi,Si,wi,Js))?!1:(Ks.crossVectors(Rn,Cn),e=[Ks.x,Ks.y,Ks.z],so(e,Mi,Si,wi,Js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ge).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ge).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const hn=[new I,new I,new I,new I,new I,new I,new I,new I],Ge=new I,Zs=new Hs,Mi=new I,Si=new I,wi=new I,Rn=new I,Cn=new I,Jn=new I,cs=new I,Js=new I,Ks=new I,Kn=new I;function so(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Kn.fromArray(i,r);const a=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),c=t.dot(Kn),l=e.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const up=new Hs,ls=new I,ro=new I;class oc{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):up.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ls.subVectors(t,this.center);const e=ls.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ls,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ro.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ls.copy(t.center).add(ro)),this.expandByPoint(ls.copy(t.center).sub(ro))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const un=new I,oo=new I,Qs=new I,Pn=new I,ao=new I,tr=new I,co=new I;class du{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(un.copy(this.origin).addScaledVector(this.direction,e),un.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){oo.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),Pn.copy(this.origin).sub(oo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Qs),a=Pn.dot(this.direction),c=-Pn.dot(Qs),l=Pn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(oo).addScaledVector(Qs,d),f}intersectSphere(t,e){un.subVectors(t.center,this.origin);const n=un.dot(this.direction),s=un.dot(un)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,un)!==null}intersectTriangle(t,e,n,s,r){ao.subVectors(e,t),tr.subVectors(n,t),co.crossVectors(ao,tr);let o=this.direction.dot(co),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pn.subVectors(this.origin,t);const c=a*this.direction.dot(tr.crossVectors(Pn,tr));if(c<0)return null;const l=a*this.direction.dot(ao.cross(Pn));if(l<0||c+l>o)return null;const h=-a*Pn.dot(co);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/bi.setFromMatrixColumn(t,0).length(),r=1/bi.setFromMatrixColumn(t,1).length(),o=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-v*l,e[9]=-a*c,e[2]=v-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,v=l*u;e[0]=d+v*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,v=l*u;e[0]=d-v*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+v,e[1]=c*u,e[5]=v*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(dp,t,fp)}lookAt(t,e,n){const s=this.elements;return De.subVectors(t,e),De.lengthSq()===0&&(De.z=1),De.normalize(),Ln.crossVectors(n,De),Ln.lengthSq()===0&&(Math.abs(n.z)===1?De.x+=1e-4:De.z+=1e-4,De.normalize(),Ln.crossVectors(n,De)),Ln.normalize(),er.crossVectors(De,Ln),s[0]=Ln.x,s[4]=er.x,s[8]=De.x,s[1]=Ln.y,s[5]=er.y,s[9]=De.y,s[2]=Ln.z,s[6]=er.z,s[10]=De.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],b=n[3],w=n[7],_=n[11],L=n[15],E=s[0],A=s[4],P=s[8],M=s[12],x=s[1],C=s[5],B=s[9],D=s[13],k=s[2],G=s[6],H=s[10],J=s[14],V=s[3],it=s[7],tt=s[11],ht=s[15];return r[0]=o*E+a*x+c*k+l*V,r[4]=o*A+a*C+c*G+l*it,r[8]=o*P+a*B+c*H+l*tt,r[12]=o*M+a*D+c*J+l*ht,r[1]=h*E+u*x+d*k+f*V,r[5]=h*A+u*C+d*G+f*it,r[9]=h*P+u*B+d*H+f*tt,r[13]=h*M+u*D+d*J+f*ht,r[2]=g*E+v*x+m*k+p*V,r[6]=g*A+v*C+m*G+p*it,r[10]=g*P+v*B+m*H+p*tt,r[14]=g*M+v*D+m*J+p*ht,r[3]=b*E+w*x+_*k+L*V,r[7]=b*A+w*C+_*G+L*it,r[11]=b*P+w*B+_*H+L*tt,r[15]=b*M+w*D+_*J+L*ht,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+v*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],b=u*m*l-v*d*l+v*c*f-a*m*f-u*c*p+a*d*p,w=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,_=h*v*l-g*u*l+g*a*f-o*v*f-h*a*p+o*u*p,L=g*u*c-h*v*c-g*a*d+o*v*d+h*a*m-o*u*m,E=e*b+n*w+s*_+r*L;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=b*A,t[1]=(v*d*r-u*m*r-v*s*f+n*m*f+u*s*p-n*d*p)*A,t[2]=(a*m*r-v*c*r+v*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*A,t[4]=w*A,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*A,t[8]=_*A,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*A,t[10]=(o*v*r-g*a*r+g*n*l-e*v*l-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*A,t[12]=L*A,t[13]=(h*v*s-g*u*s+g*n*d-e*v*d-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*v*s-g*n*c+e*v*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,b=c*l,w=c*h,_=c*u,L=n.x,E=n.y,A=n.z;return s[0]=(1-(v+p))*L,s[1]=(f+_)*L,s[2]=(g-w)*L,s[3]=0,s[4]=(f-_)*E,s[5]=(1-(d+p))*E,s[6]=(m+b)*E,s[7]=0,s[8]=(g+w)*A,s[9]=(m-b)*A,s[10]=(1-(d+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=bi.set(s[0],s[1],s[2]).length();const o=bi.set(s[4],s[5],s[6]).length(),a=bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],We.copy(this);const l=1/r,h=1/o,u=1/a;return We.elements[0]*=l,We.elements[1]*=l,We.elements[2]*=l,We.elements[4]*=h,We.elements[5]*=h,We.elements[6]*=h,We.elements[8]*=u,We.elements[9]*=u,We.elements[10]*=u,e.setFromRotationMatrix(We),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Sn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===Sn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ur)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Sn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h;let g,v;if(a===Sn)g=(o+r)*u,v=-2*u;else if(a===Ur)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const bi=new I,We=new oe,dp=new I(0,0,0),fp=new I(1,1,1),Ln=new I,er=new I,De=new I,ol=new oe,al=new ss;class on{constructor(t=0,e=0,n=0,s=on.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ol.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ol,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return al.setFromEuler(this),this.setFromQuaternion(al,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class ac{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pp=0;const cl=new I,Ei=new ss,dn=new oe,nr=new I,hs=new I,mp=new I,gp=new ss,ll=new I(1,0,0),hl=new I(0,1,0),ul=new I(0,0,1),dl={type:"added"},vp={type:"removed"},Ti={type:"childadded",child:null},lo={type:"childremoved",child:null};class xe extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new I,e=new on,n=new ss,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new zt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ac,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(ll,t)}rotateY(t){return this.rotateOnAxis(hl,t)}rotateZ(t){return this.rotateOnAxis(ul,t)}translateOnAxis(t,e){return cl.copy(t).applyQuaternion(this.quaternion),this.position.add(cl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ll,t)}translateY(t){return this.translateOnAxis(hl,t)}translateZ(t){return this.translateOnAxis(ul,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?nr.copy(t):nr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(hs,nr,this.up):dn.lookAt(nr,hs,this.up),this.quaternion.setFromRotationMatrix(dn),s&&(dn.extractRotation(s.matrixWorld),Ei.setFromRotationMatrix(dn),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(dl),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vp),lo.child=t,this.dispatchEvent(lo),lo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(dl),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,t,mp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,gp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}xe.DEFAULT_UP=new I(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xe=new I,fn=new I,ho=new I,pn=new I,Ai=new I,Ri=new I,fl=new I,uo=new I,fo=new I,po=new I,mo=new he,go=new he,vo=new he;class je{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Xe.subVectors(t,e),s.cross(Xe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Xe.subVectors(s,e),fn.subVectors(n,e),ho.subVectors(t,e);const o=Xe.dot(Xe),a=Xe.dot(fn),c=Xe.dot(ho),l=fn.dot(fn),h=fn.dot(ho),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,pn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,pn.x),c.addScaledVector(o,pn.y),c.addScaledVector(a,pn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return mo.setScalar(0),go.setScalar(0),vo.setScalar(0),mo.fromBufferAttribute(t,e),go.fromBufferAttribute(t,n),vo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(mo,r.x),o.addScaledVector(go,r.y),o.addScaledVector(vo,r.z),o}static isFrontFacing(t,e,n,s){return Xe.subVectors(n,e),fn.subVectors(t,e),Xe.cross(fn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xe.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),Xe.cross(fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return je.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ai.subVectors(s,n),Ri.subVectors(r,n),uo.subVectors(t,n);const c=Ai.dot(uo),l=Ri.dot(uo);if(c<=0&&l<=0)return e.copy(n);fo.subVectors(t,s);const h=Ai.dot(fo),u=Ri.dot(fo);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ai,o);po.subVectors(t,r);const f=Ai.dot(po),g=Ri.dot(po);if(g>=0&&f<=g)return e.copy(r);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Ri,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return fl.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(fl,a);const p=1/(m+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(Ai,o).addScaledVector(Ri,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const fu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},ir={h:0,s:0,l:0};function _o(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=rc(t,1),e=ge(e,0,1),n=ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=_o(o,r,t+1/3),this.g=_o(o,r,t),this.b=_o(o,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ee){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){const n=fu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wn(t.r),this.g=wn(t.g),this.b=wn(t.b),this}copyLinearToSRGB(t){return this.r=Vi(t.r),this.g=Vi(t.g),this.b=Vi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return qt.fromWorkingColorSpace(Se.copy(this),t),Math.round(ge(Se.r*255,0,255))*65536+Math.round(ge(Se.g*255,0,255))*256+Math.round(ge(Se.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Se.copy(this),e);const n=Se.r,s=Se.g,r=Se.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=Ee){qt.fromWorkingColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,s=Se.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(In),this.setHSL(In.h+t,In.s+e,In.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(In),t.getHSL(ir);const n=_s(In.h,ir.h,e),s=_s(In.s,ir.s,e),r=_s(In.l,ir.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new Xt;Xt.NAMES=fu;let _p=0;class Vs extends is{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=gi(),this.name="",this.blending=zi,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jo,this.blendDst=Zo,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=Yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zi&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==jo&&(n.blendSrc=this.blendSrc),this.blendDst!==Zo&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Nr extends Vs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Yh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new I,sr=new st;class rn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Zc,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)sr.fromBufferAttribute(this,e),sr.applyMatrix3(t),this.setXY(e,sr.x,sr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ui(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ui(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ui(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ui(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ui(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),s=Ae(s,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Zc&&(t.usage=this.usage),t}}class pu extends rn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class mu extends rn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ae extends rn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let xp=0;const ke=new oe,xo=new xe,Ci=new I,Ue=new Hs,us=new Hs,me=new I;class Fe extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(lu(t)?mu:pu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ke.makeRotationFromQuaternion(t),this.applyMatrix4(ke),this}rotateX(t){return ke.makeRotationX(t),this.applyMatrix4(ke),this}rotateY(t){return ke.makeRotationY(t),this.applyMatrix4(ke),this}rotateZ(t){return ke.makeRotationZ(t),this.applyMatrix4(ke),this}translate(t,e,n){return ke.makeTranslation(t,e,n),this.applyMatrix4(ke),this}scale(t,e,n){return ke.makeScale(t,e,n),this.applyMatrix4(ke),this}lookAt(t){return xo.lookAt(t),xo.updateMatrix(),this.applyMatrix4(xo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ae(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ue.setFromBufferAttribute(r),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,Ue.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,Ue.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(Ue.min),this.boundingBox.expandByPoint(Ue.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oc);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Ue.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];us.setFromBufferAttribute(a),this.morphTargetsRelative?(me.addVectors(Ue.min,us.min),Ue.expandByPoint(me),me.addVectors(Ue.max,us.max),Ue.expandByPoint(me)):(Ue.expandByPoint(us.min),Ue.expandByPoint(us.max))}Ue.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)me.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(me));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)me.fromBufferAttribute(a,l),c&&(Ci.fromBufferAttribute(t,l),me.add(Ci)),s=Math.max(s,n.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new I,c[P]=new I;const l=new I,h=new I,u=new I,d=new st,f=new st,g=new st,v=new I,m=new I;function p(P,M,x){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,x),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(C),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),a[P].add(v),a[M].add(v),a[x].add(v),c[P].add(m),c[M].add(m),c[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,M=b.length;P<M;++P){const x=b[P],C=x.start,B=x.count;for(let D=C,k=C+B;D<k;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const w=new I,_=new I,L=new I,E=new I;function A(P){L.fromBufferAttribute(s,P),E.copy(L);const M=a[P];w.copy(M),w.sub(L.multiplyScalar(L.dot(M))).normalize(),_.crossVectors(E,M);const C=_.dot(c[P])<0?-1:1;o.setXYZW(P,w.x,w.y,w.z,C)}for(let P=0,M=b.length;P<M;++P){const x=b[P],C=x.start,B=x.count;for(let D=C,k=C+B;D<k;D+=3)A(t.getX(D+0)),A(t.getX(D+1)),A(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new rn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new rn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Fe,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pl=new oe,Qn=new du,rr=new oc,ml=new I,or=new I,ar=new I,cr=new I,yo=new I,lr=new I,gl=new I,hr=new I;class Jt extends xe{constructor(t=new Fe,e=new Nr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){lr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(yo.fromBufferAttribute(u,t),o?lr.addScaledVector(yo,h):lr.addScaledVector(yo.sub(e),h))}e.add(lr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(r),Qn.copy(t.ray).recast(t.near),!(rr.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(rr,ml)===null||Qn.origin.distanceToSquared(ml)>(t.far-t.near)**2))&&(pl.copy(r).invert(),Qn.copy(t.ray).applyMatrix4(pl),!(n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Qn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),w=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=b,L=w;_<L;_+=3){const E=a.getX(_),A=a.getX(_+1),P=a.getX(_+2);s=ur(this,p,t,n,l,h,u,E,A,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const b=a.getX(m),w=a.getX(m+1),_=a.getX(m+2);s=ur(this,o,t,n,l,h,u,b,w,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),w=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=b,L=w;_<L;_+=3){const E=_,A=_+1,P=_+2;s=ur(this,p,t,n,l,h,u,E,A,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const b=m,w=m+1,_=m+2;s=ur(this,o,t,n,l,h,u,b,w,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function yp(i,t,e,n,s,r,o,a){let c;if(t.side===Pe?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Xn,a),c===null)return null;hr.copy(a),hr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(hr);return l<e.near||l>e.far?null:{distance:l,point:hr.clone(),object:i}}function ur(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,or),i.getVertexPosition(c,ar),i.getVertexPosition(l,cr);const h=yp(i,t,e,n,or,ar,cr,gl);if(h){const u=new I;je.getBarycoord(gl,or,ar,cr,u),s&&(h.uv=je.getInterpolatedAttribute(s,a,c,l,u,new st)),r&&(h.uv1=je.getInterpolatedAttribute(r,a,c,l,u,new st)),o&&(h.normal=je.getInterpolatedAttribute(o,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new I,materialIndex:0};je.getNormal(or,ar,cr,d.normal),h.face=d,h.barycoord=u}return h}class Gs extends Fe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ae(l,3)),this.setAttribute("normal",new ae(h,3)),this.setAttribute("uv",new ae(u,2));function g(v,m,p,b,w,_,L,E,A,P,M){const x=_/A,C=L/P,B=_/2,D=L/2,k=E/2,G=A+1,H=P+1;let J=0,V=0;const it=new I;for(let tt=0;tt<H;tt++){const ht=tt*C-D;for(let Ct=0;Ct<G;Ct++){const Wt=Ct*x-B;it[v]=Wt*b,it[m]=ht*w,it[p]=k,l.push(it.x,it.y,it.z),it[v]=0,it[m]=0,it[p]=E>0?1:-1,h.push(it.x,it.y,it.z),u.push(Ct/A),u.push(1-tt/P),J+=1}}for(let tt=0;tt<P;tt++)for(let ht=0;ht<A;ht++){const Ct=d+ht+G*tt,Wt=d+ht+G*(tt+1),Y=d+(ht+1)+G*(tt+1),rt=d+(ht+1)+G*tt;c.push(Ct,Wt,rt),c.push(Wt,Y,rt),V+=6}a.addGroup(f,V,M),f+=V,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Re(i){const t={};for(let e=0;e<i.length;e++){const n=Qi(i[e]);for(const s in n)t[s]=n[s]}return t}function Mp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function gu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const Sp={clone:Qi,merge:Re};var wp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends Vs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wp,this.fragmentShader=bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qi(t.uniforms),this.uniformsGroups=Mp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class vu extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Sn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new I,vl=new st,_l=new st;class Ne extends vu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z)}getViewSize(t,e){return this.getViewBounds(t,vl,_l),e.subVectors(_l,vl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Pi=-90,Li=1;class Ep extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ne(Pi,Li,t,e);s.layers=this.layers,this.add(s);const r=new Ne(Pi,Li,t,e);r.layers=this.layers,this.add(r);const o=new Ne(Pi,Li,t,e);o.layers=this.layers,this.add(o);const a=new Ne(Pi,Li,t,e);a.layers=this.layers,this.add(a);const c=new Ne(Pi,Li,t,e);c.layers=this.layers,this.add(c);const l=new Ne(Pi,Li,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ur)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class _u extends Te{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ji,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Tp extends fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new _u(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:sn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gs(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pe,blending:Bn});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===li&&(e.minFilter=sn),new Ep(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Mo=new I,Ap=new I,Rp=new zt;class Nn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Mo.subVectors(n,e).cross(Ap.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Mo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Rp.getNormalMatrix(t),s=this.coplanarPoint(Mo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new oc,dr=new I;class cc{constructor(t=new Nn,e=new Nn,n=new Nn,s=new Nn,r=new Nn,o=new Nn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Sn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],b=s[13],w=s[14],_=s[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+o,d+h,m+g,_+b).normalize(),n[3].setComponents(c-o,d-h,m-g,_-b).normalize(),n[4].setComponents(c-a,d-u,m-v,_-w).normalize(),e===Sn)n[5].setComponents(c+a,d+u,m+v,_+w).normalize();else if(e===Ur)n[5].setComponents(a,u,v,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(t){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(dr.x=s.normal.x>0?t.max.x:t.min.x,dr.y=s.normal.y>0?t.max.y:t.min.y,dr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function xu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Cp(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Ws extends Fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const b=p*d-o;for(let w=0;w<l;w++){const _=w*u-r;g.push(_,-b,0),v.push(0,0,1),m.push(w/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){const w=b+l*p,_=b+l*(p+1),L=b+1+l*(p+1),E=b+1+l*p;f.push(w,_,E),f.push(_,L,E)}this.setIndex(f),this.setAttribute("position",new ae(g,3)),this.setAttribute("normal",new ae(v,3)),this.setAttribute("uv",new ae(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ws(t.width,t.height,t.widthSegments,t.heightSegments)}}var Pp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lp=`#ifdef USE_ALPHAHASH
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
#endif`,Ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Up=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Np=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fp=`#ifdef USE_AOMAP
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
#endif`,Op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kp=`#ifdef USE_BATCHING
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
#endif`,Bp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gp=`#ifdef USE_IRIDESCENCE
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
#endif`,Wp=`#ifdef USE_BUMPMAP
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
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Qp=`#define PI 3.141592653589793
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
} // validated`,tm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,em=`vec3 transformedNormal = objectNormal;
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
#endif`,nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,om="gl_FragColor = linearToOutputTexel( gl_FragColor );",am=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cm=`#ifdef USE_ENVMAP
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
#endif`,lm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hm=`#ifdef USE_ENVMAP
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
#endif`,um=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dm=`#ifdef USE_ENVMAP
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
#endif`,fm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vm=`#ifdef USE_GRADIENTMAP
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
}`,_m=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ym=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mm=`uniform bool receiveShadow;
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
#endif`,Sm=`#ifdef USE_ENVMAP
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
#endif`,wm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Em=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Am=`PhysicalMaterial material;
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
#endif`,Rm=`struct PhysicalMaterial {
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
}`,Cm=`
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
#endif`,Pm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Im=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Um=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,km=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bm=`#if defined( USE_POINTS_UV )
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
#endif`,zm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xm=`#ifdef USE_MORPHTARGETS
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
#endif`,$m=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ym=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Km=`#ifdef USE_NORMALMAP
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
#endif`,Qm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ng=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ig=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,og=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ug=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,pg=`float getShadowMask() {
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
}`,mg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gg=`#ifdef USE_SKINNING
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
#endif`,vg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_g=`#ifdef USE_SKINNING
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
#endif`,xg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wg=`#ifdef USE_TRANSMISSION
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
#endif`,bg=`#ifdef USE_TRANSMISSION
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
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pg=`uniform sampler2D t2D;
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
}`,Lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ig=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ug=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ng=`#include <common>
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
}`,Fg=`#if DEPTH_PACKING == 3200
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
}`,Og=`#define DISTANCE
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
}`,kg=`#define DISTANCE
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
}`,Bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hg=`uniform float scale;
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
}`,Vg=`uniform vec3 diffuse;
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
}`,Gg=`#include <common>
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
}`,Wg=`uniform vec3 diffuse;
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
}`,Xg=`#define LAMBERT
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
}`,$g=`#define LAMBERT
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
}`,qg=`#define MATCAP
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
}`,Yg=`#define MATCAP
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
}`,jg=`#define NORMAL
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
}`,Zg=`#define NORMAL
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
}`,Jg=`#define PHONG
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
}`,Kg=`#define PHONG
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
}`,Qg=`#define STANDARD
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
}`,t0=`#define STANDARD
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
}`,e0=`#define TOON
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
}`,n0=`#define TOON
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
}`,i0=`uniform float size;
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
}`,s0=`uniform vec3 diffuse;
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
}`,r0=`#include <common>
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
}`,o0=`uniform vec3 color;
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
}`,a0=`uniform float rotation;
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
}`,c0=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:Pp,alphahash_pars_fragment:Lp,alphamap_fragment:Ip,alphamap_pars_fragment:Dp,alphatest_fragment:Up,alphatest_pars_fragment:Np,aomap_fragment:Fp,aomap_pars_fragment:Op,batching_pars_vertex:kp,batching_vertex:Bp,begin_vertex:zp,beginnormal_vertex:Hp,bsdfs:Vp,iridescence_fragment:Gp,bumpmap_pars_fragment:Wp,clipping_planes_fragment:Xp,clipping_planes_pars_fragment:$p,clipping_planes_pars_vertex:qp,clipping_planes_vertex:Yp,color_fragment:jp,color_pars_fragment:Zp,color_pars_vertex:Jp,color_vertex:Kp,common:Qp,cube_uv_reflection_fragment:tm,defaultnormal_vertex:em,displacementmap_pars_vertex:nm,displacementmap_vertex:im,emissivemap_fragment:sm,emissivemap_pars_fragment:rm,colorspace_fragment:om,colorspace_pars_fragment:am,envmap_fragment:cm,envmap_common_pars_fragment:lm,envmap_pars_fragment:hm,envmap_pars_vertex:um,envmap_physical_pars_fragment:Sm,envmap_vertex:dm,fog_vertex:fm,fog_pars_vertex:pm,fog_fragment:mm,fog_pars_fragment:gm,gradientmap_pars_fragment:vm,lightmap_pars_fragment:_m,lights_lambert_fragment:xm,lights_lambert_pars_fragment:ym,lights_pars_begin:Mm,lights_toon_fragment:wm,lights_toon_pars_fragment:bm,lights_phong_fragment:Em,lights_phong_pars_fragment:Tm,lights_physical_fragment:Am,lights_physical_pars_fragment:Rm,lights_fragment_begin:Cm,lights_fragment_maps:Pm,lights_fragment_end:Lm,logdepthbuf_fragment:Im,logdepthbuf_pars_fragment:Dm,logdepthbuf_pars_vertex:Um,logdepthbuf_vertex:Nm,map_fragment:Fm,map_pars_fragment:Om,map_particle_fragment:km,map_particle_pars_fragment:Bm,metalnessmap_fragment:zm,metalnessmap_pars_fragment:Hm,morphinstance_vertex:Vm,morphcolor_vertex:Gm,morphnormal_vertex:Wm,morphtarget_pars_vertex:Xm,morphtarget_vertex:$m,normal_fragment_begin:qm,normal_fragment_maps:Ym,normal_pars_fragment:jm,normal_pars_vertex:Zm,normal_vertex:Jm,normalmap_pars_fragment:Km,clearcoat_normal_fragment_begin:Qm,clearcoat_normal_fragment_maps:tg,clearcoat_pars_fragment:eg,iridescence_pars_fragment:ng,opaque_fragment:ig,packing:sg,premultiplied_alpha_fragment:rg,project_vertex:og,dithering_fragment:ag,dithering_pars_fragment:cg,roughnessmap_fragment:lg,roughnessmap_pars_fragment:hg,shadowmap_pars_fragment:ug,shadowmap_pars_vertex:dg,shadowmap_vertex:fg,shadowmask_pars_fragment:pg,skinbase_vertex:mg,skinning_pars_vertex:gg,skinning_vertex:vg,skinnormal_vertex:_g,specularmap_fragment:xg,specularmap_pars_fragment:yg,tonemapping_fragment:Mg,tonemapping_pars_fragment:Sg,transmission_fragment:wg,transmission_pars_fragment:bg,uv_pars_fragment:Eg,uv_pars_vertex:Tg,uv_vertex:Ag,worldpos_vertex:Rg,background_vert:Cg,background_frag:Pg,backgroundCube_vert:Lg,backgroundCube_frag:Ig,cube_vert:Dg,cube_frag:Ug,depth_vert:Ng,depth_frag:Fg,distanceRGBA_vert:Og,distanceRGBA_frag:kg,equirect_vert:Bg,equirect_frag:zg,linedashed_vert:Hg,linedashed_frag:Vg,meshbasic_vert:Gg,meshbasic_frag:Wg,meshlambert_vert:Xg,meshlambert_frag:$g,meshmatcap_vert:qg,meshmatcap_frag:Yg,meshnormal_vert:jg,meshnormal_frag:Zg,meshphong_vert:Jg,meshphong_frag:Kg,meshphysical_vert:Qg,meshphysical_frag:t0,meshtoon_vert:e0,meshtoon_frag:n0,points_vert:i0,points_frag:s0,shadow_vert:r0,shadow_frag:o0,sprite_vert:a0,sprite_frag:c0},ut={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},en={basic:{uniforms:Re([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Re([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Re([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Re([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Re([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Re([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Re([ut.points,ut.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Re([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Re([ut.common,ut.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Re([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Re([ut.sprite,ut.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Re([ut.common,ut.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Re([ut.lights,ut.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};en.physical={uniforms:Re([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const fr={r:0,b:0,g:0},ei=new on,l0=new oe;function h0(i,t,e,n,s,r,o){const a=new Xt(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(b){let w=b.isScene===!0?b.background:null;return w&&w.isTexture&&(w=(b.backgroundBlurriness>0?e:t).get(w)),w}function v(b){let w=!1;const _=g(b);_===null?p(a,c):_&&_.isColor&&(p(_,1),w=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,w){const _=g(w);_&&(_.isCubeTexture||_.mapping===Vr)?(h===void 0&&(h=new Jt(new Gs(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:Qi(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:Pe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ei.copy(w.backgroundRotation),ei.x*=-1,ei.y*=-1,ei.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(l0.makeRotationFromEuler(ei)),h.material.toneMapped=qt.getTransfer(_.colorSpace)!==ee,(u!==_||d!==_.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Jt(new Ws(2,2),new $n({name:"BackgroundMaterial",uniforms:Qi(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=qt.getTransfer(_.colorSpace)!==ee,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,w){b.getRGB(fr,gu(i)),n.buffers.color.setClear(fr.r,fr.g,fr.b,w,o)}return{getClearColor:function(){return a},setClearColor:function(b,w=1){a.set(b),c=w,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(a,c)},render:v,addToRenderList:m}}function u0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(x,C,B,D,k){let G=!1;const H=u(D,B,C);r!==H&&(r=H,l(r.object)),G=f(x,D,B,k),G&&g(x,D,B,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,_(x,C,B,D),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,C,B){const D=B.wireframe===!0;let k=n[x.id];k===void 0&&(k={},n[x.id]=k);let G=k[C.id];G===void 0&&(G={},k[C.id]=G);let H=G[D];return H===void 0&&(H=d(c()),G[D]=H),H}function d(x){const C=[],B=[],D=[];for(let k=0;k<e;k++)C[k]=0,B[k]=0,D[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:B,attributeDivisors:D,object:x,attributes:{},index:null}}function f(x,C,B,D){const k=r.attributes,G=C.attributes;let H=0;const J=B.getAttributes();for(const V in J)if(J[V].location>=0){const tt=k[V];let ht=G[V];if(ht===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ht=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ht=x.instanceColor)),tt===void 0||tt.attribute!==ht||ht&&tt.data!==ht.data)return!0;H++}return r.attributesNum!==H||r.index!==D}function g(x,C,B,D){const k={},G=C.attributes;let H=0;const J=B.getAttributes();for(const V in J)if(J[V].location>=0){let tt=G[V];tt===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(tt=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(tt=x.instanceColor));const ht={};ht.attribute=tt,tt&&tt.data&&(ht.data=tt.data),k[V]=ht,H++}r.attributes=k,r.attributesNum=H,r.index=D}function v(){const x=r.newAttributes;for(let C=0,B=x.length;C<B;C++)x[C]=0}function m(x){p(x,0)}function p(x,C){const B=r.newAttributes,D=r.enabledAttributes,k=r.attributeDivisors;B[x]=1,D[x]===0&&(i.enableVertexAttribArray(x),D[x]=1),k[x]!==C&&(i.vertexAttribDivisor(x,C),k[x]=C)}function b(){const x=r.newAttributes,C=r.enabledAttributes;for(let B=0,D=C.length;B<D;B++)C[B]!==x[B]&&(i.disableVertexAttribArray(B),C[B]=0)}function w(x,C,B,D,k,G,H){H===!0?i.vertexAttribIPointer(x,C,B,k,G):i.vertexAttribPointer(x,C,B,D,k,G)}function _(x,C,B,D){v();const k=D.attributes,G=B.getAttributes(),H=C.defaultAttributeValues;for(const J in G){const V=G[J];if(V.location>=0){let it=k[J];if(it===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(it=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(it=x.instanceColor)),it!==void 0){const tt=it.normalized,ht=it.itemSize,Ct=t.get(it);if(Ct===void 0)continue;const Wt=Ct.buffer,Y=Ct.type,rt=Ct.bytesPerElement,vt=Y===i.INT||Y===i.UNSIGNED_INT||it.gpuType===Qa;if(it.isInterleavedBufferAttribute){const at=it.data,Lt=at.stride,Nt=it.offset;if(at.isInstancedInterleavedBuffer){for(let It=0;It<V.locationSize;It++)p(V.location+It,at.meshPerAttribute);x.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let It=0;It<V.locationSize;It++)m(V.location+It);i.bindBuffer(i.ARRAY_BUFFER,Wt);for(let It=0;It<V.locationSize;It++)w(V.location+It,ht/V.locationSize,Y,tt,Lt*rt,(Nt+ht/V.locationSize*It)*rt,vt)}else{if(it.isInstancedBufferAttribute){for(let at=0;at<V.locationSize;at++)p(V.location+at,it.meshPerAttribute);x.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let at=0;at<V.locationSize;at++)m(V.location+at);i.bindBuffer(i.ARRAY_BUFFER,Wt);for(let at=0;at<V.locationSize;at++)w(V.location+at,ht/V.locationSize,Y,tt,ht*rt,ht/V.locationSize*at*rt,vt)}}else if(H!==void 0){const tt=H[J];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(V.location,tt);break;case 3:i.vertexAttrib3fv(V.location,tt);break;case 4:i.vertexAttrib4fv(V.location,tt);break;default:i.vertexAttrib1fv(V.location,tt)}}}}b()}function L(){P();for(const x in n){const C=n[x];for(const B in C){const D=C[B];for(const k in D)h(D[k].object),delete D[k];delete C[B]}delete n[x]}}function E(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const B in C){const D=C[B];for(const k in D)h(D[k].object),delete D[k];delete C[B]}delete n[x.id]}function A(x){for(const C in n){const B=n[C];if(B[x.id]===void 0)continue;const D=B[x.id];for(const k in D)h(D[k].object),delete D[k];delete B[x.id]}}function P(){M(),o=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:L,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function d0(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function f0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Ze&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===zs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==bn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Mn&&!P)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:_,vertexTextures:L,maxSamples:E}}function p0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Nn,a=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const b=r?0:n,w=b*4;let _=p.clippingState||null;c.value=_,_=h(g,d,w,f);for(let L=0;L!==w;++L)_[L]=e[L];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,_=f;w!==v;++w,_+=4)o.copy(u[w]).applyMatrix4(b,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function m0(i){let t=new WeakMap;function e(o,a){return a===sa?o.mapping=ji:a===ra&&(o.mapping=Zi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===sa||a===ra)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Tp(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class yu extends vu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Oi=4,xl=[.125,.215,.35,.446,.526,.582],oi=20,So=new yu,yl=new Xt;let wo=null,bo=0,Eo=0,To=!1;const si=(1+Math.sqrt(5))/2,Ii=1/si,Ml=[new I(-si,Ii,0),new I(si,Ii,0),new I(-Ii,0,si),new I(Ii,0,si),new I(0,si,-Ii),new I(0,si,Ii),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Sl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){wo=this._renderer.getRenderTarget(),bo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),To=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=El(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wo,bo,Eo),this._renderer.xr.enabled=To,t.scissorTest=!1,pr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ji||t.mapping===Zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wo=this._renderer.getRenderTarget(),bo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),To=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:zs,format:Ze,colorSpace:ns,depthBuffer:!1},s=wl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=g0(r)),this._blurMaterial=v0(r,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,So)}_sceneToCubeUV(t,e,n,s){const a=new Ne(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(yl),h.toneMapping=zn,h.autoClear=!1;const f=new Nr({name:"PMREM.Background",side:Pe,depthWrite:!1,depthTest:!1}),g=new Jt(new Gs,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(yl),v=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):b===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const w=this._cubeSize;pr(s,b*w,p>2?w:0,w,w),h.setRenderTarget(s),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ji||t.mapping===Zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=El()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;pr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,So)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ml[(s-r-1)%Ml.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Jt(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*oi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):oi;m>oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);const p=[];let b=0;for(let A=0;A<oi;++A){const P=A/v,M=Math.exp(-P*P/2);p.push(M),A===0?b+=M:A<m&&(b+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:w}=this;d.dTheta.value=g,d.mipInt.value=w-n;const _=this._sizeLods[s],L=3*_*(s>w-Oi?s-w+Oi:0),E=4*(this._cubeSize-_);pr(e,L,E,3*_,2*_),c.setRenderTarget(e),c.render(u,So)}}function g0(i){const t=[],e=[],n=[];let s=i;const r=i-Oi+1+xl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Oi?c=xl[o-i+Oi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,b=new Float32Array(v*g*f),w=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let E=0;E<f;E++){const A=E%3*2/3-1,P=E>2?0:-1,M=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];b.set(M,v*g*E),w.set(d,m*g*E);const x=[E,E,E,E,E,E];_.set(x,p*g*E)}const L=new Fe;L.setAttribute("position",new rn(b,v)),L.setAttribute("uv",new rn(w,m)),L.setAttribute("faceIndex",new rn(_,p)),t.push(L),s>Oi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function wl(i,t,e){const n=new fi(i,t,e);return n.texture.mapping=Vr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function v0(i,t,e){const n=new Float32Array(oi),s=new I(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lc(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function bl(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lc(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function El(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function lc(){return`

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
	`}function _0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===sa||c===ra,h=c===ji||c===Zi;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Sl(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Sl(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function x0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ps("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function y0(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const b=f.array;v=f.version;for(let w=0,_=b.length;w<_;w+=3){const L=b[w+0],E=b[w+1],A=b[w+2];d.push(L,E,E,A,A,L)}}else if(g!==void 0){const b=g.array;v=g.version;for(let w=0,_=b.length/3-1;w<_;w+=3){const L=w+0,E=w+1,A=w+2;d.push(L,E,E,A,A,L)}}else return;const m=new(lu(d)?mu:pu)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function M0(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*v[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function S0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function w0(i,t,e){const n=new WeakMap,s=new he;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let w=0;f===!0&&(w=1),g===!0&&(w=2),v===!0&&(w=3);let _=a.attributes.position.count*w,L=1;_>t.maxTextureSize&&(L=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const E=new Float32Array(_*L*4*u),A=new uu(E,_,L,u);A.type=Mn,A.needsUpdate=!0;const P=w*4;for(let x=0;x<u;x++){const C=m[x],B=p[x],D=b[x],k=_*L*4*x;for(let G=0;G<C.count;G++){const H=G*P;f===!0&&(s.fromBufferAttribute(C,G),E[k+H+0]=s.x,E[k+H+1]=s.y,E[k+H+2]=s.z,E[k+H+3]=0),g===!0&&(s.fromBufferAttribute(B,G),E[k+H+4]=s.x,E[k+H+5]=s.y,E[k+H+6]=s.z,E[k+H+7]=0),v===!0&&(s.fromBufferAttribute(D,G),E[k+H+8]=s.x,E[k+H+9]=s.y,E[k+H+10]=s.z,E[k+H+11]=D.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new st(_,L)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function b0(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class Mu extends Te{constructor(t,e,n,s,r,o,a,c,l,h=Hi){if(h!==Hi&&h!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Hi&&(n=di),n===void 0&&h===Ki&&(n=Ji),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Je,this.minFilter=c!==void 0?c:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Su=new Te,Tl=new Mu(1,1),wu=new uu,bu=new hp,Eu=new _u,Al=[],Rl=[],Cl=new Float32Array(16),Pl=new Float32Array(9),Ll=new Float32Array(4);function rs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Al[s];if(r===void 0&&(r=new Float32Array(s),Al[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function pe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Wr(i,t){let e=Rl[t];e===void 0&&(e=new Int32Array(t),Rl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function E0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function T0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2fv(this.addr,t),pe(e,t)}}function A0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;i.uniform3fv(this.addr,t),pe(e,t)}}function R0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4fv(this.addr,t),pe(e,t)}}function C0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Ll.set(n),i.uniformMatrix2fv(this.addr,!1,Ll),pe(e,n)}}function P0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Pl.set(n),i.uniformMatrix3fv(this.addr,!1,Pl),pe(e,n)}}function L0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Cl.set(n),i.uniformMatrix4fv(this.addr,!1,Cl),pe(e,n)}}function I0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function D0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2iv(this.addr,t),pe(e,t)}}function U0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3iv(this.addr,t),pe(e,t)}}function N0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4iv(this.addr,t),pe(e,t)}}function F0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function O0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2uiv(this.addr,t),pe(e,t)}}function k0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3uiv(this.addr,t),pe(e,t)}}function B0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4uiv(this.addr,t),pe(e,t)}}function z0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Tl.compareFunction=cu,r=Tl):r=Su,e.setTexture2D(t||r,s)}function H0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||bu,s)}function V0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Eu,s)}function G0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||wu,s)}function W0(i){switch(i){case 5126:return E0;case 35664:return T0;case 35665:return A0;case 35666:return R0;case 35674:return C0;case 35675:return P0;case 35676:return L0;case 5124:case 35670:return I0;case 35667:case 35671:return D0;case 35668:case 35672:return U0;case 35669:case 35673:return N0;case 5125:return F0;case 36294:return O0;case 36295:return k0;case 36296:return B0;case 35678:case 36198:case 36298:case 36306:case 35682:return z0;case 35679:case 36299:case 36307:return H0;case 35680:case 36300:case 36308:case 36293:return V0;case 36289:case 36303:case 36311:case 36292:return G0}}function X0(i,t){i.uniform1fv(this.addr,t)}function $0(i,t){const e=rs(t,this.size,2);i.uniform2fv(this.addr,e)}function q0(i,t){const e=rs(t,this.size,3);i.uniform3fv(this.addr,e)}function Y0(i,t){const e=rs(t,this.size,4);i.uniform4fv(this.addr,e)}function j0(i,t){const e=rs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Z0(i,t){const e=rs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function J0(i,t){const e=rs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function K0(i,t){i.uniform1iv(this.addr,t)}function Q0(i,t){i.uniform2iv(this.addr,t)}function tv(i,t){i.uniform3iv(this.addr,t)}function ev(i,t){i.uniform4iv(this.addr,t)}function nv(i,t){i.uniform1uiv(this.addr,t)}function iv(i,t){i.uniform2uiv(this.addr,t)}function sv(i,t){i.uniform3uiv(this.addr,t)}function rv(i,t){i.uniform4uiv(this.addr,t)}function ov(i,t,e){const n=this.cache,s=t.length,r=Wr(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Su,r[o])}function av(i,t,e){const n=this.cache,s=t.length,r=Wr(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||bu,r[o])}function cv(i,t,e){const n=this.cache,s=t.length,r=Wr(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Eu,r[o])}function lv(i,t,e){const n=this.cache,s=t.length,r=Wr(e,s);fe(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||wu,r[o])}function hv(i){switch(i){case 5126:return X0;case 35664:return $0;case 35665:return q0;case 35666:return Y0;case 35674:return j0;case 35675:return Z0;case 35676:return J0;case 5124:case 35670:return K0;case 35667:case 35671:return Q0;case 35668:case 35672:return tv;case 35669:case 35673:return ev;case 5125:return nv;case 36294:return iv;case 36295:return sv;case 36296:return rv;case 35678:case 36198:case 36298:case 36306:case 35682:return ov;case 35679:case 36299:case 36307:return av;case 35680:case 36300:case 36308:case 36293:return cv;case 36289:case 36303:case 36311:case 36292:return lv}}class uv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=W0(e.type)}}class dv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hv(e.type)}}class fv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ao=/(\w+)(\])?(\[|\.)?/g;function Il(i,t){i.seq.push(t),i.map[t.id]=t}function pv(i,t,e){const n=i.name,s=n.length;for(Ao.lastIndex=0;;){const r=Ao.exec(n),o=Ao.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Il(e,l===void 0?new uv(a,i,t):new dv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new fv(a),Il(e,u)),e=u}}}class Lr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);pv(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Dl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const mv=37297;let gv=0;function vv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ul=new zt;function _v(i){qt._getMatrix(Ul,qt.workingColorSpace,i);const t=`mat3( ${Ul.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case Gr:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Nl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+vv(i.getShaderSource(t),o)}else return s}function xv(i,t){const e=_v(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function yv(i,t){let e;switch(t){case wf:e="Linear";break;case bf:e="Reinhard";break;case Ef:e="Cineon";break;case jh:e="ACESFilmic";break;case Af:e="AgX";break;case Rf:e="Neutral";break;case Tf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const mr=new I;function Mv(){qt.getLuminanceCoefficients(mr);const i=mr.x.toFixed(4),t=mr.y.toFixed(4),e=mr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ms).join(`
`)}function wv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function bv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ms(i){return i!==""}function Fl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ol(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ev=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ia(i){return i.replace(Ev,Av)}const Tv=new Map;function Av(i,t){let e=Vt[t];if(e===void 0){const n=Tv.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ia(e)}const Rv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kl(i){return i.replace(Rv,Cv)}function Cv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Pv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===$h?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===qh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===mn&&(t="SHADOWMAP_TYPE_VSM"),t}function Lv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ji:case Zi:t="ENVMAP_TYPE_CUBE";break;case Vr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Iv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Zi:t="ENVMAP_MODE_REFRACTION";break}return t}function Dv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Yh:t="ENVMAP_BLENDING_MULTIPLY";break;case Mf:t="ENVMAP_BLENDING_MIX";break;case Sf:t="ENVMAP_BLENDING_ADD";break}return t}function Uv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Nv(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Pv(e),l=Lv(e),h=Iv(e),u=Dv(e),d=Uv(e),f=Sv(e),g=wv(r),v=s.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ms).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ms).join(`
`),p.length>0&&(p+=`
`)):(m=[Bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ms).join(`
`),p=[Bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==zn?yv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,xv("linearToOutputTexel",e.outputColorSpace),Mv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ms).join(`
`)),o=Ia(o),o=Fl(o,e),o=Ol(o,e),a=Ia(a),a=Fl(a,e),a=Ol(a,e),o=kl(o),a=kl(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Jc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Jc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=b+m+o,_=b+p+a,L=Dl(s,s.VERTEX_SHADER,w),E=Dl(s,s.FRAGMENT_SHADER,_);s.attachShader(v,L),s.attachShader(v,E),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(C){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(v).trim(),D=s.getShaderInfoLog(L).trim(),k=s.getShaderInfoLog(E).trim();let G=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,L,E);else{const J=Nl(s,L,"vertex"),V=Nl(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+J+`
`+V)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(D===""||k==="")&&(H=!1);H&&(C.diagnostics={runnable:G,programLog:B,vertexShader:{log:D,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(L),s.deleteShader(E),P=new Lr(s,v),M=bv(s,v)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,mv)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=gv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=E,this}let Fv=0;class Ov{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new kv(t),e.set(t,n)),n}}class kv{constructor(t){this.id=Fv++,this.code=t,this.usedTimes=0}}function Bv(i,t,e,n,s,r,o){const a=new ac,c=new Ov,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,x,C,B,D){const k=B.fog,G=D.geometry,H=M.isMeshStandardMaterial?B.environment:null,J=(M.isMeshStandardMaterial?e:t).get(M.envMap||H),V=J&&J.mapping===Vr?J.image.height:null,it=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const tt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ht=tt!==void 0?tt.length:0;let Ct=0;G.morphAttributes.position!==void 0&&(Ct=1),G.morphAttributes.normal!==void 0&&(Ct=2),G.morphAttributes.color!==void 0&&(Ct=3);let Wt,Y,rt,vt;if(it){const Qt=en[it];Wt=Qt.vertexShader,Y=Qt.fragmentShader}else Wt=M.vertexShader,Y=M.fragmentShader,c.update(M),rt=c.getVertexShaderID(M),vt=c.getFragmentShaderID(M);const at=i.getRenderTarget(),Lt=i.state.buffers.depth.getReversed(),Nt=D.isInstancedMesh===!0,It=D.isBatchedMesh===!0,_t=!!M.map,$=!!M.matcap,Q=!!J,R=!!M.aoMap,bt=!!M.lightMap,nt=!!M.bumpMap,Mt=!!M.normalMap,lt=!!M.displacementMap,Dt=!!M.emissiveMap,xt=!!M.metalnessMap,T=!!M.roughnessMap,y=M.anisotropy>0,z=M.clearcoat>0,j=M.dispersion>0,et=M.iridescence>0,Z=M.sheen>0,Et=M.transmission>0,dt=y&&!!M.anisotropyMap,yt=z&&!!M.clearcoatMap,Gt=z&&!!M.clearcoatNormalMap,ot=z&&!!M.clearcoatRoughnessMap,St=et&&!!M.iridescenceMap,Ut=et&&!!M.iridescenceThicknessMap,Ft=Z&&!!M.sheenColorMap,wt=Z&&!!M.sheenRoughnessMap,$t=!!M.specularMap,Ht=!!M.specularColorMap,ne=!!M.specularIntensityMap,U=Et&&!!M.transmissionMap,ft=Et&&!!M.thicknessMap,q=!!M.gradientMap,K=!!M.alphaMap,gt=M.alphaTest>0,pt=!!M.alphaHash,kt=!!M.extensions;let le=zn;M.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(le=i.toneMapping);const ye={shaderID:it,shaderType:M.type,shaderName:M.name,vertexShader:Wt,fragmentShader:Y,defines:M.defines,customVertexShaderID:rt,customFragmentShaderID:vt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:It,batchingColor:It&&D._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&D.instanceColor!==null,instancingMorph:Nt&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:ns,alphaToCoverage:!!M.alphaToCoverage,map:_t,matcap:$,envMap:Q,envMapMode:Q&&J.mapping,envMapCubeUVHeight:V,aoMap:R,lightMap:bt,bumpMap:nt,normalMap:Mt,displacementMap:d&&lt,emissiveMap:Dt,normalMapObjectSpace:Mt&&M.normalMapType===If,normalMapTangentSpace:Mt&&M.normalMapType===au,metalnessMap:xt,roughnessMap:T,anisotropy:y,anisotropyMap:dt,clearcoat:z,clearcoatMap:yt,clearcoatNormalMap:Gt,clearcoatRoughnessMap:ot,dispersion:j,iridescence:et,iridescenceMap:St,iridescenceThicknessMap:Ut,sheen:Z,sheenColorMap:Ft,sheenRoughnessMap:wt,specularMap:$t,specularColorMap:Ht,specularIntensityMap:ne,transmission:Et,transmissionMap:U,thicknessMap:ft,gradientMap:q,opaque:M.transparent===!1&&M.blending===zi&&M.alphaToCoverage===!1,alphaMap:K,alphaTest:gt,alphaHash:pt,combine:M.combine,mapUv:_t&&v(M.map.channel),aoMapUv:R&&v(M.aoMap.channel),lightMapUv:bt&&v(M.lightMap.channel),bumpMapUv:nt&&v(M.bumpMap.channel),normalMapUv:Mt&&v(M.normalMap.channel),displacementMapUv:lt&&v(M.displacementMap.channel),emissiveMapUv:Dt&&v(M.emissiveMap.channel),metalnessMapUv:xt&&v(M.metalnessMap.channel),roughnessMapUv:T&&v(M.roughnessMap.channel),anisotropyMapUv:dt&&v(M.anisotropyMap.channel),clearcoatMapUv:yt&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Gt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:wt&&v(M.sheenRoughnessMap.channel),specularMapUv:$t&&v(M.specularMap.channel),specularColorMapUv:Ht&&v(M.specularColorMap.channel),specularIntensityMapUv:ne&&v(M.specularIntensityMap.channel),transmissionMapUv:U&&v(M.transmissionMap.channel),thicknessMapUv:ft&&v(M.thicknessMap.channel),alphaMapUv:K&&v(M.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Mt||y),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!G.attributes.uv&&(_t||K),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Lt,skinning:D.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:Ct,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:le,decodeVideoTexture:_t&&M.map.isVideoTexture===!0&&qt.getTransfer(M.map.colorSpace)===ee,decodeVideoTextureEmissive:Dt&&M.emissiveMap.isVideoTexture===!0&&qt.getTransfer(M.emissiveMap.colorSpace)===ee,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===_n,flipSided:M.side===Pe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:kt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&M.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ye.vertexUv1s=l.has(1),ye.vertexUv2s=l.has(2),ye.vertexUv3s=l.has(3),l.clear(),ye}function p(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)x.push(C),x.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(b(x,M),w(x,M),x.push(i.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function b(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function w(M,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){const x=g[M.type];let C;if(x){const B=en[x];C=Sp.clone(B.uniforms)}else C=M.uniforms;return C}function L(M,x){let C;for(let B=0,D=h.length;B<D;B++){const k=h[B];if(k.cacheKey===x){C=k,++C.usedTimes;break}}return C===void 0&&(C=new Nv(i,x,M,r),h.push(C)),C}function E(M){if(--M.usedTimes===0){const x=h.indexOf(M);h[x]=h[h.length-1],h.pop(),M.destroy()}}function A(M){c.remove(M)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:L,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:P}}function zv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Hv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function zl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Hl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Hv),n.length>1&&n.sort(d||zl),s.length>1&&s.sort(d||zl)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Vv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Hl,i.set(n,[o])):s>=r.length?(o=new Hl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Gv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Xt};break;case"SpotLight":e={position:new I,direction:new I,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function Wv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Xv=0;function $v(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function qv(i){const t=new Gv,e=Wv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new oe,o=new oe;function a(l){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,b=0,w=0,_=0,L=0,E=0,A=0;l.sort($v);for(let M=0,x=l.length;M<x;M++){const C=l[M],B=C.color,D=C.intensity,k=C.distance,G=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=B.r*D,u+=B.g*D,d+=B.b*D;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],D);A++}else if(C.isDirectionalLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,V=e.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=G,n.directionalShadowMatrix[f]=C.shadow.matrix,b++}n.directional[f]=H,f++}else if(C.isSpotLight){const H=t.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(B).multiplyScalar(D),H.distance=k,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[v]=H;const J=C.shadow;if(C.map&&(n.spotLightMap[L]=C.map,L++,J.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[v]=J.matrix,C.castShadow){const V=e.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=G,_++}v++}else if(C.isRectAreaLight){const H=t.get(C);H.color.copy(B).multiplyScalar(D),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=H,m++}else if(C.isPointLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const J=C.shadow,V=e.get(C);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=C.shadow.matrix,w++}n.point[g]=H,g++}else if(C.isHemisphereLight){const H=t.get(C);H.skyColor.copy(C.color).multiplyScalar(D),H.groundColor.copy(C.groundColor).multiplyScalar(D),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==b||P.numPointShadows!==w||P.numSpotShadows!==_||P.numSpotMaps!==L||P.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=_+L-E,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,P.directionalLength=f,P.pointLength=g,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=b,P.numPointShadows=w,P.numSpotShadows=_,P.numSpotMaps=L,P.numLightProbes=A,n.version=Xv++)}function c(l,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){const w=l[p];if(w.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(w.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(w.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(w.width*.5,0,0),_.halfHeight.set(0,w.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(w.matrixWorld),_.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(w.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function Vl(i){const t=new qv(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Yv(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Vl(i),t.set(s,[a])):r>=o.length?(a=new Vl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class jv extends Vs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Pf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Zv extends Vs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Jv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kv=`uniform sampler2D shadow_pass;
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
}`;function Qv(i,t,e){let n=new cc;const s=new st,r=new st,o=new he,a=new jv({depthPacking:Lf}),c=new Zv,l={},h=e.maxTextureSize,u={[Xn]:Pe,[Pe]:Xn,[_n]:_n},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:Jv,fragmentShader:Kv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Fe;g.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Jt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$h;let p=this.type;this.render=function(E,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const M=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Bn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const D=p!==mn&&this.type===mn,k=p===mn&&this.type!==mn;for(let G=0,H=E.length;G<H;G++){const J=E[G],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const it=V.getFrameExtents();if(s.multiply(it),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,V.mapSize.y=r.y)),V.map===null||D===!0||k===!0){const ht=this.type!==mn?{minFilter:Je,magFilter:Je}:{};V.map!==null&&V.map.dispose(),V.map=new fi(s.x,s.y,ht),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const tt=V.getViewportCount();for(let ht=0;ht<tt;ht++){const Ct=V.getViewport(ht);o.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),B.viewport(o),V.updateMatrices(J,ht),n=V.getFrustum(),_(A,P,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===mn&&b(V,P),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,x,C)};function b(E,A){const P=t.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new fi(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,P,d,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,P,f,v,null)}function w(E,A,P,M){let x=null;const C=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)x=C;else if(x=P.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=x.uuid,D=A.uuid;let k=l[B];k===void 0&&(k={},l[B]=k);let G=k[D];G===void 0&&(G=x.clone(),k[D]=G,A.addEventListener("dispose",L)),x=G}if(x.visible=A.visible,x.wireframe=A.wireframe,M===mn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=i.properties.get(x);B.light=P}return x}function _(E,A,P,M,x){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&x===mn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);const D=t.update(E),k=E.material;if(Array.isArray(k)){const G=D.groups;for(let H=0,J=G.length;H<J;H++){const V=G[H],it=k[V.materialIndex];if(it&&it.visible){const tt=w(E,it,M,x);E.onBeforeShadow(i,E,A,P,D,tt,V),i.renderBufferDirect(P,null,D,tt,E,V),E.onAfterShadow(i,E,A,P,D,tt,V)}}}else if(k.visible){const G=w(E,k,M,x);E.onBeforeShadow(i,E,A,P,D,G,null),i.renderBufferDirect(P,null,D,G,E,null),E.onAfterShadow(i,E,A,P,D,G,null)}}const B=E.children;for(let D=0,k=B.length;D<k;D++)_(B[D],A,P,M,x)}function L(E){E.target.removeEventListener("dispose",L);for(const P in l){const M=l[P],x=E.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}const t_={[Jo]:Ko,[Qo]:na,[ta]:ia,[Yi]:ea,[Ko]:Jo,[na]:Qo,[ia]:ta,[ea]:Yi};function e_(i,t){function e(){let U=!1;const ft=new he;let q=null;const K=new he(0,0,0,0);return{setMask:function(gt){q!==gt&&!U&&(i.colorMask(gt,gt,gt,gt),q=gt)},setLocked:function(gt){U=gt},setClear:function(gt,pt,kt,le,ye){ye===!0&&(gt*=le,pt*=le,kt*=le),ft.set(gt,pt,kt,le),K.equals(ft)===!1&&(i.clearColor(gt,pt,kt,le),K.copy(ft))},reset:function(){U=!1,q=null,K.set(-1,0,0,0)}}}function n(){let U=!1,ft=!1,q=null,K=null,gt=null;return{setReversed:function(pt){if(ft!==pt){const kt=t.get("EXT_clip_control");ft?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT);const le=gt;gt=null,this.setClear(le)}ft=pt},getReversed:function(){return ft},setTest:function(pt){pt?at(i.DEPTH_TEST):Lt(i.DEPTH_TEST)},setMask:function(pt){q!==pt&&!U&&(i.depthMask(pt),q=pt)},setFunc:function(pt){if(ft&&(pt=t_[pt]),K!==pt){switch(pt){case Jo:i.depthFunc(i.NEVER);break;case Ko:i.depthFunc(i.ALWAYS);break;case Qo:i.depthFunc(i.LESS);break;case Yi:i.depthFunc(i.LEQUAL);break;case ta:i.depthFunc(i.EQUAL);break;case ea:i.depthFunc(i.GEQUAL);break;case na:i.depthFunc(i.GREATER);break;case ia:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=pt}},setLocked:function(pt){U=pt},setClear:function(pt){gt!==pt&&(ft&&(pt=1-pt),i.clearDepth(pt),gt=pt)},reset:function(){U=!1,q=null,K=null,gt=null,ft=!1}}}function s(){let U=!1,ft=null,q=null,K=null,gt=null,pt=null,kt=null,le=null,ye=null;return{setTest:function(Qt){U||(Qt?at(i.STENCIL_TEST):Lt(i.STENCIL_TEST))},setMask:function(Qt){ft!==Qt&&!U&&(i.stencilMask(Qt),ft=Qt)},setFunc:function(Qt,ze,cn){(q!==Qt||K!==ze||gt!==cn)&&(i.stencilFunc(Qt,ze,cn),q=Qt,K=ze,gt=cn)},setOp:function(Qt,ze,cn){(pt!==Qt||kt!==ze||le!==cn)&&(i.stencilOp(Qt,ze,cn),pt=Qt,kt=ze,le=cn)},setLocked:function(Qt){U=Qt},setClear:function(Qt){ye!==Qt&&(i.clearStencil(Qt),ye=Qt)},reset:function(){U=!1,ft=null,q=null,K=null,gt=null,pt=null,kt=null,le=null,ye=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,b=null,w=null,_=null,L=null,E=null,A=new Xt(0,0,0),P=0,M=!1,x=null,C=null,B=null,D=null,k=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,J=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),H=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),H=J>=2);let it=null,tt={};const ht=i.getParameter(i.SCISSOR_BOX),Ct=i.getParameter(i.VIEWPORT),Wt=new he().fromArray(ht),Y=new he().fromArray(Ct);function rt(U,ft,q,K){const gt=new Uint8Array(4),pt=i.createTexture();i.bindTexture(U,pt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<q;kt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(ft+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return pt}const vt={};vt[i.TEXTURE_2D]=rt(i.TEXTURE_2D,i.TEXTURE_2D,1),vt[i.TEXTURE_CUBE_MAP]=rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[i.TEXTURE_2D_ARRAY]=rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),vt[i.TEXTURE_3D]=rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc(Yi),nt(!1),Mt(Xc),at(i.CULL_FACE),R(Bn);function at(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Lt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Nt(U,ft){return u[U]!==ft?(i.bindFramebuffer(U,ft),u[U]=ft,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function It(U,ft){let q=f,K=!1;if(U){q=d.get(ft),q===void 0&&(q=[],d.set(ft,q));const gt=U.textures;if(q.length!==gt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let pt=0,kt=gt.length;pt<kt;pt++)q[pt]=i.COLOR_ATTACHMENT0+pt;q.length=gt.length,K=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,K=!0);K&&i.drawBuffers(q)}function _t(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const $={[ri]:i.FUNC_ADD,[sf]:i.FUNC_SUBTRACT,[rf]:i.FUNC_REVERSE_SUBTRACT};$[of]=i.MIN,$[af]=i.MAX;const Q={[cf]:i.ZERO,[lf]:i.ONE,[hf]:i.SRC_COLOR,[jo]:i.SRC_ALPHA,[gf]:i.SRC_ALPHA_SATURATE,[pf]:i.DST_COLOR,[df]:i.DST_ALPHA,[uf]:i.ONE_MINUS_SRC_COLOR,[Zo]:i.ONE_MINUS_SRC_ALPHA,[mf]:i.ONE_MINUS_DST_COLOR,[ff]:i.ONE_MINUS_DST_ALPHA,[vf]:i.CONSTANT_COLOR,[_f]:i.ONE_MINUS_CONSTANT_COLOR,[xf]:i.CONSTANT_ALPHA,[yf]:i.ONE_MINUS_CONSTANT_ALPHA};function R(U,ft,q,K,gt,pt,kt,le,ye,Qt){if(U===Bn){v===!0&&(Lt(i.BLEND),v=!1);return}if(v===!1&&(at(i.BLEND),v=!0),U!==nf){if(U!==m||Qt!==M){if((p!==ri||_!==ri)&&(i.blendEquation(i.FUNC_ADD),p=ri,_=ri),Qt)switch(U){case zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $c:i.blendFunc(i.ONE,i.ONE);break;case qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $c:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,w=null,L=null,E=null,A.set(0,0,0),P=0,m=U,M=Qt}return}gt=gt||ft,pt=pt||q,kt=kt||K,(ft!==p||gt!==_)&&(i.blendEquationSeparate($[ft],$[gt]),p=ft,_=gt),(q!==b||K!==w||pt!==L||kt!==E)&&(i.blendFuncSeparate(Q[q],Q[K],Q[pt],Q[kt]),b=q,w=K,L=pt,E=kt),(le.equals(A)===!1||ye!==P)&&(i.blendColor(le.r,le.g,le.b,ye),A.copy(le),P=ye),m=U,M=!1}function bt(U,ft){U.side===_n?Lt(i.CULL_FACE):at(i.CULL_FACE);let q=U.side===Pe;ft&&(q=!q),nt(q),U.blending===zi&&U.transparent===!1?R(Bn):R(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const K=U.stencilWrite;a.setTest(K),K&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function nt(U){x!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),x=U)}function Mt(U){U!==tf?(at(i.CULL_FACE),U!==C&&(U===Xc?i.cullFace(i.BACK):U===ef?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Lt(i.CULL_FACE),C=U}function lt(U){U!==B&&(H&&i.lineWidth(U),B=U)}function Dt(U,ft,q){U?(at(i.POLYGON_OFFSET_FILL),(D!==ft||k!==q)&&(i.polygonOffset(ft,q),D=ft,k=q)):Lt(i.POLYGON_OFFSET_FILL)}function xt(U){U?at(i.SCISSOR_TEST):Lt(i.SCISSOR_TEST)}function T(U){U===void 0&&(U=i.TEXTURE0+G-1),it!==U&&(i.activeTexture(U),it=U)}function y(U,ft,q){q===void 0&&(it===null?q=i.TEXTURE0+G-1:q=it);let K=tt[q];K===void 0&&(K={type:void 0,texture:void 0},tt[q]=K),(K.type!==U||K.texture!==ft)&&(it!==q&&(i.activeTexture(q),it=q),i.bindTexture(U,ft||vt[U]),K.type=U,K.texture=ft)}function z(){const U=tt[it];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function yt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Gt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(U){Wt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Wt.copy(U))}function wt(U){Y.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Y.copy(U))}function $t(U,ft){let q=l.get(ft);q===void 0&&(q=new WeakMap,l.set(ft,q));let K=q.get(U);K===void 0&&(K=i.getUniformBlockIndex(ft,U.name),q.set(U,K))}function Ht(U,ft){const K=l.get(ft).get(U);c.get(ft)!==K&&(i.uniformBlockBinding(ft,K,U.__bindingPointIndex),c.set(ft,K))}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},it=null,tt={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,b=null,w=null,_=null,L=null,E=null,A=new Xt(0,0,0),P=0,M=!1,x=null,C=null,B=null,D=null,k=null,Wt.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:Lt,bindFramebuffer:Nt,drawBuffers:It,useProgram:_t,setBlending:R,setMaterial:bt,setFlipSided:nt,setCullFace:Mt,setLineWidth:lt,setPolygonOffset:Dt,setScissorTest:xt,activeTexture:T,bindTexture:y,unbindTexture:z,compressedTexImage2D:j,compressedTexImage3D:et,texImage2D:St,texImage3D:Ut,updateUBOMapping:$t,uniformBlockBinding:Ht,texStorage2D:Gt,texStorage3D:ot,texSubImage2D:Z,texSubImage3D:Et,compressedTexSubImage2D:dt,compressedTexSubImage3D:yt,scissor:Ft,viewport:wt,reset:ne}}function Gl(i,t,e,n){const s=n_(n);switch(e){case tu:return i*t;case nu:return i*t;case iu:return i*t*2;case su:return i*t/s.components*s.byteLength;case nc:return i*t/s.components*s.byteLength;case ru:return i*t*2/s.components*s.byteLength;case ic:return i*t*2/s.components*s.byteLength;case eu:return i*t*3/s.components*s.byteLength;case Ze:return i*t*4/s.components*s.byteLength;case sc:return i*t*4/s.components*s.byteLength;case Tr:case Ar:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Rr:case Cr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:case la:return Math.max(i,16)*Math.max(t,8)/4;case oa:case ca:return Math.max(i,8)*Math.max(t,8)/2;case ha:case ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case pa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ma:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ga:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case va:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case _a:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case xa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ya:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case wa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ba:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ea:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Pr:case Aa:case Ra:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ou:case Ca:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Pa:case La:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function n_(i){switch(i){case bn:case Jh:return{byteLength:1,components:1};case Rs:case Kh:case zs:return{byteLength:2,components:1};case tc:case ec:return{byteLength:2,components:4};case di:case Qa:case Mn:return{byteLength:4,components:1};case Qh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function i_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new st,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,y){return f?new OffscreenCanvas(T,y):Ps("canvas")}function v(T,y,z){let j=1;const et=xt(T);if((et.width>z||et.height>z)&&(j=z/Math.max(et.width,et.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Z=Math.floor(j*et.width),Et=Math.floor(j*et.height);u===void 0&&(u=g(Z,Et));const dt=y?g(Z,Et):u;return dt.width=Z,dt.height=Et,dt.getContext("2d").drawImage(T,0,0,Z,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+Z+"x"+Et+")."),dt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(T,y,z,j,et=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Z=y;if(y===i.RED&&(z===i.FLOAT&&(Z=i.R32F),z===i.HALF_FLOAT&&(Z=i.R16F),z===i.UNSIGNED_BYTE&&(Z=i.R8)),y===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.R8UI),z===i.UNSIGNED_SHORT&&(Z=i.R16UI),z===i.UNSIGNED_INT&&(Z=i.R32UI),z===i.BYTE&&(Z=i.R8I),z===i.SHORT&&(Z=i.R16I),z===i.INT&&(Z=i.R32I)),y===i.RG&&(z===i.FLOAT&&(Z=i.RG32F),z===i.HALF_FLOAT&&(Z=i.RG16F),z===i.UNSIGNED_BYTE&&(Z=i.RG8)),y===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RG8UI),z===i.UNSIGNED_SHORT&&(Z=i.RG16UI),z===i.UNSIGNED_INT&&(Z=i.RG32UI),z===i.BYTE&&(Z=i.RG8I),z===i.SHORT&&(Z=i.RG16I),z===i.INT&&(Z=i.RG32I)),y===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),z===i.UNSIGNED_INT&&(Z=i.RGB32UI),z===i.BYTE&&(Z=i.RGB8I),z===i.SHORT&&(Z=i.RGB16I),z===i.INT&&(Z=i.RGB32I)),y===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),z===i.UNSIGNED_INT&&(Z=i.RGBA32UI),z===i.BYTE&&(Z=i.RGBA8I),z===i.SHORT&&(Z=i.RGBA16I),z===i.INT&&(Z=i.RGBA32I)),y===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),y===i.RGBA){const Et=et?Gr:qt.getTransfer(j);z===i.FLOAT&&(Z=i.RGBA32F),z===i.HALF_FLOAT&&(Z=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Z=Et===ee?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(T,y){let z;return T?y===null||y===di||y===Ji?z=i.DEPTH24_STENCIL8:y===Mn?z=i.DEPTH32F_STENCIL8:y===Rs&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===di||y===Ji?z=i.DEPTH_COMPONENT24:y===Mn?z=i.DEPTH_COMPONENT32F:y===Rs&&(z=i.DEPTH_COMPONENT16),z}function L(T,y){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Je&&T.minFilter!==sn?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function E(T){const y=T.target;y.removeEventListener("dispose",E),P(y),y.isVideoTexture&&h.delete(y)}function A(T){const y=T.target;y.removeEventListener("dispose",A),x(y)}function P(T){const y=n.get(T);if(y.__webglInit===void 0)return;const z=T.source,j=d.get(z);if(j){const et=j[y.__cacheKey];et.usedTimes--,et.usedTimes===0&&M(T),Object.keys(j).length===0&&d.delete(z)}n.remove(T)}function M(T){const y=n.get(T);i.deleteTexture(y.__webglTexture);const z=T.source,j=d.get(z);delete j[y.__cacheKey],o.memory.textures--}function x(T){const y=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let et=0;et<y.__webglFramebuffer[j].length;et++)i.deleteFramebuffer(y.__webglFramebuffer[j][et]);else i.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)i.deleteFramebuffer(y.__webglFramebuffer[j]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const z=T.textures;for(let j=0,et=z.length;j<et;j++){const Z=n.get(z[j]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(z[j])}n.remove(T)}let C=0;function B(){C=0}function D(){const T=C;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),C+=1,T}function k(T){const y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function G(T,y){const z=n.get(T);if(T.isVideoTexture&&lt(T),T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,T,y);return}}e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+y)}function H(T,y){const z=n.get(T);if(T.version>0&&z.__version!==T.version){Y(z,T,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+y)}function J(T,y){const z=n.get(T);if(T.version>0&&z.__version!==T.version){Y(z,T,y);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+y)}function V(T,y){const z=n.get(T);if(T.version>0&&z.__version!==T.version){rt(z,T,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+y)}const it={[As]:i.REPEAT,[ci]:i.CLAMP_TO_EDGE,[Dr]:i.MIRRORED_REPEAT},tt={[Je]:i.NEAREST,[Cf]:i.NEAREST_MIPMAP_NEAREST,[js]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[to]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},ht={[Df]:i.NEVER,[Bf]:i.ALWAYS,[Uf]:i.LESS,[cu]:i.LEQUAL,[Nf]:i.EQUAL,[kf]:i.GEQUAL,[Ff]:i.GREATER,[Of]:i.NOTEQUAL};function Ct(T,y){if(y.type===Mn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===sn||y.magFilter===to||y.magFilter===js||y.magFilter===li||y.minFilter===sn||y.minFilter===to||y.minFilter===js||y.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,it[y.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,it[y.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,it[y.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,tt[y.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,tt[y.minFilter]),y.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ht[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Je||y.minFilter!==js&&y.minFilter!==li||y.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Wt(T,y){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",E));const j=y.source;let et=d.get(j);et===void 0&&(et={},d.set(j,et));const Z=k(y);if(Z!==T.__cacheKey){et[Z]===void 0&&(et[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),et[Z].usedTimes++;const Et=et[T.__cacheKey];Et!==void 0&&(et[T.__cacheKey].usedTimes--,Et.usedTimes===0&&M(y)),T.__cacheKey=Z,T.__webglTexture=et[Z].texture}return z}function Y(T,y,z){let j=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=i.TEXTURE_3D);const et=Wt(T,y),Z=y.source;e.bindTexture(j,T.__webglTexture,i.TEXTURE0+z);const Et=n.get(Z);if(Z.version!==Et.__version||et===!0){e.activeTexture(i.TEXTURE0+z);const dt=qt.getPrimaries(qt.workingColorSpace),yt=y.colorSpace===Fn?null:qt.getPrimaries(y.colorSpace),Gt=y.colorSpace===Fn||dt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let ot=v(y.image,!1,s.maxTextureSize);ot=Dt(y,ot);const St=r.convert(y.format,y.colorSpace),Ut=r.convert(y.type);let Ft=w(y.internalFormat,St,Ut,y.colorSpace,y.isVideoTexture);Ct(j,y);let wt;const $t=y.mipmaps,Ht=y.isVideoTexture!==!0,ne=Et.__version===void 0||et===!0,U=Z.dataReady,ft=L(y,ot);if(y.isDepthTexture)Ft=_(y.format===Ki,y.type),ne&&(Ht?e.texStorage2D(i.TEXTURE_2D,1,Ft,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,Ft,ot.width,ot.height,0,St,Ut,null));else if(y.isDataTexture)if($t.length>0){Ht&&ne&&e.texStorage2D(i.TEXTURE_2D,ft,Ft,$t[0].width,$t[0].height);for(let q=0,K=$t.length;q<K;q++)wt=$t[q],Ht?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,Ut,wt.data):e.texImage2D(i.TEXTURE_2D,q,Ft,wt.width,wt.height,0,St,Ut,wt.data);y.generateMipmaps=!1}else Ht?(ne&&e.texStorage2D(i.TEXTURE_2D,ft,Ft,ot.width,ot.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ot.width,ot.height,St,Ut,ot.data)):e.texImage2D(i.TEXTURE_2D,0,Ft,ot.width,ot.height,0,St,Ut,ot.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ht&&ne&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Ft,$t[0].width,$t[0].height,ot.depth);for(let q=0,K=$t.length;q<K;q++)if(wt=$t[q],y.format!==Ze)if(St!==null)if(Ht){if(U)if(y.layerUpdates.size>0){const gt=Gl(wt.width,wt.height,y.format,y.type);for(const pt of y.layerUpdates){const kt=wt.data.subarray(pt*gt/wt.data.BYTES_PER_ELEMENT,(pt+1)*gt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,pt,wt.width,wt.height,1,St,kt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,wt.width,wt.height,ot.depth,St,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ft,wt.width,wt.height,ot.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,wt.width,wt.height,ot.depth,St,Ut,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Ft,wt.width,wt.height,ot.depth,0,St,Ut,wt.data)}else{Ht&&ne&&e.texStorage2D(i.TEXTURE_2D,ft,Ft,$t[0].width,$t[0].height);for(let q=0,K=$t.length;q<K;q++)wt=$t[q],y.format!==Ze?St!==null?Ht?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Ft,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,Ut,wt.data):e.texImage2D(i.TEXTURE_2D,q,Ft,wt.width,wt.height,0,St,Ut,wt.data)}else if(y.isDataArrayTexture)if(Ht){if(ne&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Ft,ot.width,ot.height,ot.depth),U)if(y.layerUpdates.size>0){const q=Gl(ot.width,ot.height,y.format,y.type);for(const K of y.layerUpdates){const gt=ot.data.subarray(K*q/ot.data.BYTES_PER_ELEMENT,(K+1)*q/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,ot.width,ot.height,1,St,Ut,gt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,St,Ut,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ft,ot.width,ot.height,ot.depth,0,St,Ut,ot.data);else if(y.isData3DTexture)Ht?(ne&&e.texStorage3D(i.TEXTURE_3D,ft,Ft,ot.width,ot.height,ot.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,St,Ut,ot.data)):e.texImage3D(i.TEXTURE_3D,0,Ft,ot.width,ot.height,ot.depth,0,St,Ut,ot.data);else if(y.isFramebufferTexture){if(ne)if(Ht)e.texStorage2D(i.TEXTURE_2D,ft,Ft,ot.width,ot.height);else{let q=ot.width,K=ot.height;for(let gt=0;gt<ft;gt++)e.texImage2D(i.TEXTURE_2D,gt,Ft,q,K,0,St,Ut,null),q>>=1,K>>=1}}else if($t.length>0){if(Ht&&ne){const q=xt($t[0]);e.texStorage2D(i.TEXTURE_2D,ft,Ft,q.width,q.height)}for(let q=0,K=$t.length;q<K;q++)wt=$t[q],Ht?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,St,Ut,wt):e.texImage2D(i.TEXTURE_2D,q,Ft,St,Ut,wt);y.generateMipmaps=!1}else if(Ht){if(ne){const q=xt(ot);e.texStorage2D(i.TEXTURE_2D,ft,Ft,q.width,q.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,Ut,ot)}else e.texImage2D(i.TEXTURE_2D,0,Ft,St,Ut,ot);m(y)&&p(j),Et.__version=Z.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function rt(T,y,z){if(y.image.length!==6)return;const j=Wt(T,y),et=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+z);const Z=n.get(et);if(et.version!==Z.__version||j===!0){e.activeTexture(i.TEXTURE0+z);const Et=qt.getPrimaries(qt.workingColorSpace),dt=y.colorSpace===Fn?null:qt.getPrimaries(y.colorSpace),yt=y.colorSpace===Fn||Et===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const Gt=y.isCompressedTexture||y.image[0].isCompressedTexture,ot=y.image[0]&&y.image[0].isDataTexture,St=[];for(let K=0;K<6;K++)!Gt&&!ot?St[K]=v(y.image[K],!0,s.maxCubemapSize):St[K]=ot?y.image[K].image:y.image[K],St[K]=Dt(y,St[K]);const Ut=St[0],Ft=r.convert(y.format,y.colorSpace),wt=r.convert(y.type),$t=w(y.internalFormat,Ft,wt,y.colorSpace),Ht=y.isVideoTexture!==!0,ne=Z.__version===void 0||j===!0,U=et.dataReady;let ft=L(y,Ut);Ct(i.TEXTURE_CUBE_MAP,y);let q;if(Gt){Ht&&ne&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,$t,Ut.width,Ut.height);for(let K=0;K<6;K++){q=St[K].mipmaps;for(let gt=0;gt<q.length;gt++){const pt=q[gt];y.format!==Ze?Ft!==null?Ht?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,pt.width,pt.height,Ft,pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,$t,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,pt.width,pt.height,Ft,wt,pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,$t,pt.width,pt.height,0,Ft,wt,pt.data)}}}else{if(q=y.mipmaps,Ht&&ne){q.length>0&&ft++;const K=xt(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,$t,K.width,K.height)}for(let K=0;K<6;K++)if(ot){Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,St[K].width,St[K].height,Ft,wt,St[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,$t,St[K].width,St[K].height,0,Ft,wt,St[K].data);for(let gt=0;gt<q.length;gt++){const kt=q[gt].image[K].image;Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,kt.width,kt.height,Ft,wt,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,$t,kt.width,kt.height,0,Ft,wt,kt.data)}}else{Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ft,wt,St[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,$t,Ft,wt,St[K]);for(let gt=0;gt<q.length;gt++){const pt=q[gt];Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,Ft,wt,pt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,$t,Ft,wt,pt.image[K])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),Z.__version=et.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function vt(T,y,z,j,et,Z){const Et=r.convert(z.format,z.colorSpace),dt=r.convert(z.type),yt=w(z.internalFormat,Et,dt,z.colorSpace),Gt=n.get(y),ot=n.get(z);if(ot.__renderTarget=y,!Gt.__hasExternalTextures){const St=Math.max(1,y.width>>Z),Ut=Math.max(1,y.height>>Z);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,Z,yt,St,Ut,y.depth,0,Et,dt,null):e.texImage2D(et,Z,yt,St,Ut,0,Et,dt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),Mt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,et,ot.__webglTexture,0,nt(y)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,et,ot.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(T,y,z){if(i.bindRenderbuffer(i.RENDERBUFFER,T),y.depthBuffer){const j=y.depthTexture,et=j&&j.isDepthTexture?j.type:null,Z=_(y.stencilBuffer,et),Et=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=nt(y);Mt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,dt,Z,y.width,y.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,Z,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Z,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Et,i.RENDERBUFFER,T)}else{const j=y.textures;for(let et=0;et<j.length;et++){const Z=j[et],Et=r.convert(Z.format,Z.colorSpace),dt=r.convert(Z.type),yt=w(Z.internalFormat,Et,dt,Z.colorSpace),Gt=nt(y);z&&Mt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,yt,y.width,y.height):Mt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt,yt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,yt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Lt(T,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(y.depthTexture);j.__renderTarget=y,(!j.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const et=j.__webglTexture,Z=nt(y);if(y.depthTexture.format===Hi)Mt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(y.depthTexture.format===Ki)Mt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Nt(T){const y=n.get(T),z=T.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==T.depthTexture){const j=T.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){const et=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",et)};j.addEventListener("dispose",et),y.__depthDisposeCallback=et}y.__boundDepthTexture=j}if(T.depthTexture&&!y.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Lt(y.__webglFramebuffer,T)}else if(z){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=i.createRenderbuffer(),at(y.__webglDepthbuffer[j],T,!1);else{const et=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=y.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),at(y.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(T,y,z){const j=n.get(T);y!==void 0&&vt(j.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Nt(T)}function _t(T){const y=T.texture,z=n.get(T),j=n.get(y);T.addEventListener("dispose",A);const et=T.textures,Z=T.isWebGLCubeRenderTarget===!0,Et=et.length>1;if(Et||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=y.version,o.memory.textures++),Z){z.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[dt]=[];for(let yt=0;yt<y.mipmaps.length;yt++)z.__webglFramebuffer[dt][yt]=i.createFramebuffer()}else z.__webglFramebuffer[dt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let dt=0;dt<y.mipmaps.length;dt++)z.__webglFramebuffer[dt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Et)for(let dt=0,yt=et.length;dt<yt;dt++){const Gt=n.get(et[dt]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&Mt(T)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let dt=0;dt<et.length;dt++){const yt=et[dt];z.__webglColorRenderbuffer[dt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[dt]);const Gt=r.convert(yt.format,yt.colorSpace),ot=r.convert(yt.type),St=w(yt.internalFormat,Gt,ot,yt.colorSpace,T.isXRRenderTarget===!0),Ut=nt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,St,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,z.__webglColorRenderbuffer[dt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),at(z.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,y);for(let dt=0;dt<6;dt++)if(y.mipmaps&&y.mipmaps.length>0)for(let yt=0;yt<y.mipmaps.length;yt++)vt(z.__webglFramebuffer[dt][yt],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,yt);else vt(z.__webglFramebuffer[dt],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);m(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let dt=0,yt=et.length;dt<yt;dt++){const Gt=et[dt],ot=n.get(Gt);e.bindTexture(i.TEXTURE_2D,ot.__webglTexture),Ct(i.TEXTURE_2D,Gt),vt(z.__webglFramebuffer,T,Gt,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,0),m(Gt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let dt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(dt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,j.__webglTexture),Ct(dt,y),y.mipmaps&&y.mipmaps.length>0)for(let yt=0;yt<y.mipmaps.length;yt++)vt(z.__webglFramebuffer[yt],T,y,i.COLOR_ATTACHMENT0,dt,yt);else vt(z.__webglFramebuffer,T,y,i.COLOR_ATTACHMENT0,dt,0);m(y)&&p(dt),e.unbindTexture()}T.depthBuffer&&Nt(T)}function $(T){const y=T.textures;for(let z=0,j=y.length;z<j;z++){const et=y[z];if(m(et)){const Z=b(T),Et=n.get(et).__webglTexture;e.bindTexture(Z,Et),p(Z),e.unbindTexture()}}}const Q=[],R=[];function bt(T){if(T.samples>0){if(Mt(T)===!1){const y=T.textures,z=T.width,j=T.height;let et=i.COLOR_BUFFER_BIT;const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=n.get(T),dt=y.length>1;if(dt)for(let yt=0;yt<y.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let yt=0;yt<y.length;yt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),dt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Et.__webglColorRenderbuffer[yt]);const Gt=n.get(y[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Gt,0)}i.blitFramebuffer(0,0,z,j,0,0,z,j,et,i.NEAREST),c===!0&&(Q.length=0,R.length=0,Q.push(i.COLOR_ATTACHMENT0+yt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Q.push(Z),R.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,R)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),dt)for(let yt=0;yt<y.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,Et.__webglColorRenderbuffer[yt]);const Gt=n.get(y[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function nt(T){return Math.min(s.maxSamples,T.samples)}function Mt(T){const y=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function lt(T){const y=o.render.frame;h.get(T)!==y&&(h.set(T,y),T.update())}function Dt(T,y){const z=T.colorSpace,j=T.format,et=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==ns&&z!==Fn&&(qt.getTransfer(z)===ee?(j!==Ze||et!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),y}function xt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=B,this.setTexture2D=G,this.setTexture2DArray=H,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=It,this.setupRenderTarget=_t,this.updateRenderTargetMipmap=$,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Mt}function s_(i,t){function e(n,s=Fn){let r;const o=qt.getTransfer(s);if(n===bn)return i.UNSIGNED_BYTE;if(n===tc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ec)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Jh)return i.BYTE;if(n===Kh)return i.SHORT;if(n===Rs)return i.UNSIGNED_SHORT;if(n===Qa)return i.INT;if(n===di)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===zs)return i.HALF_FLOAT;if(n===tu)return i.ALPHA;if(n===eu)return i.RGB;if(n===Ze)return i.RGBA;if(n===nu)return i.LUMINANCE;if(n===iu)return i.LUMINANCE_ALPHA;if(n===Hi)return i.DEPTH_COMPONENT;if(n===Ki)return i.DEPTH_STENCIL;if(n===su)return i.RED;if(n===nc)return i.RED_INTEGER;if(n===ru)return i.RG;if(n===ic)return i.RG_INTEGER;if(n===sc)return i.RGBA_INTEGER;if(n===Tr||n===Ar||n===Rr||n===Cr)if(o===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Tr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Tr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Cr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oa||n===aa||n===ca||n===la)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===oa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ca)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===la)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ha||n===ua||n===da)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ha||n===ua)return o===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===da)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fa||n===pa||n===ma||n===ga||n===va||n===_a||n===xa||n===ya||n===Ma||n===Sa||n===wa||n===ba||n===Ea||n===Ta)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===fa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===pa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ma)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ga)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===va)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_a)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ya)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ma)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ba)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ea)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ta)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pr||n===Aa||n===Ra)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Pr)return o===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Aa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ra)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ou||n===Ca||n===Pa||n===La)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Pr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ca)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Pa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===La)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class r_ extends Ne{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class kn extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const o_={type:"move"};class Ro{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(o_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new kn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const a_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,c_=`
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

}`;class l_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Te,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new $n({vertexShader:a_,fragmentShader:c_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Ws(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h_ extends is{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const v=new l_,m=e.getContextAttributes();let p=null,b=null;const w=[],_=[],L=new st;let E=null;const A=new Ne;A.viewport=new he;const P=new Ne;P.viewport=new he;const M=[A,P],x=new r_;let C=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let rt=w[Y];return rt===void 0&&(rt=new Ro,w[Y]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Y){let rt=w[Y];return rt===void 0&&(rt=new Ro,w[Y]=rt),rt.getGripSpace()},this.getHand=function(Y){let rt=w[Y];return rt===void 0&&(rt=new Ro,w[Y]=rt),rt.getHandSpace()};function D(Y){const rt=_.indexOf(Y.inputSource);if(rt===-1)return;const vt=w[rt];vt!==void 0&&(vt.update(Y.inputSource,Y.frame,l||o),vt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",G);for(let Y=0;Y<w.length;Y++){const rt=_[Y];rt!==null&&(_[Y]=null,w[Y].disconnect(rt))}C=null,B=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,b=null,Wt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",k),s.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const rt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new fi(f.framebufferWidth,f.framebufferHeight,{format:Ze,type:bn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let rt=null,vt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=m.stencil?Ki:Hi,vt=m.stencil?Ji:di);const Lt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Lt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new fi(d.textureWidth,d.textureHeight,{format:Ze,type:bn,depthTexture:new Mu(d.textureWidth,d.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Wt.setContext(s),Wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function G(Y){for(let rt=0;rt<Y.removed.length;rt++){const vt=Y.removed[rt],at=_.indexOf(vt);at>=0&&(_[at]=null,w[at].disconnect(vt))}for(let rt=0;rt<Y.added.length;rt++){const vt=Y.added[rt];let at=_.indexOf(vt);if(at===-1){for(let Nt=0;Nt<w.length;Nt++)if(Nt>=_.length){_.push(vt),at=Nt;break}else if(_[Nt]===null){_[Nt]=vt,at=Nt;break}if(at===-1)break}const Lt=w[at];Lt&&Lt.connect(vt)}}const H=new I,J=new I;function V(Y,rt,vt){H.setFromMatrixPosition(rt.matrixWorld),J.setFromMatrixPosition(vt.matrixWorld);const at=H.distanceTo(J),Lt=rt.projectionMatrix.elements,Nt=vt.projectionMatrix.elements,It=Lt[14]/(Lt[10]-1),_t=Lt[14]/(Lt[10]+1),$=(Lt[9]+1)/Lt[5],Q=(Lt[9]-1)/Lt[5],R=(Lt[8]-1)/Lt[0],bt=(Nt[8]+1)/Nt[0],nt=It*R,Mt=It*bt,lt=at/(-R+bt),Dt=lt*-R;if(rt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Dt),Y.translateZ(lt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Lt[10]===-1)Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const xt=It+lt,T=_t+lt,y=nt-Dt,z=Mt+(at-Dt),j=$*_t/T*xt,et=Q*_t/T*xt;Y.projectionMatrix.makePerspective(y,z,j,et,xt,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function it(Y,rt){rt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(rt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let rt=Y.near,vt=Y.far;v.texture!==null&&(v.depthNear>0&&(rt=v.depthNear),v.depthFar>0&&(vt=v.depthFar)),x.near=P.near=A.near=rt,x.far=P.far=A.far=vt,(C!==x.near||B!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,B=x.far),A.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,x.layers.mask=A.layers.mask|P.layers.mask;const at=Y.parent,Lt=x.cameras;it(x,at);for(let Nt=0;Nt<Lt.length;Nt++)it(Lt[Nt],at);Lt.length===2?V(x,A,P):x.projectionMatrix.copy(A.projectionMatrix),tt(Y,x,at)};function tt(Y,rt,vt){vt===null?Y.matrix.copy(rt.matrixWorld):(Y.matrix.copy(vt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(rt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Cs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let ht=null;function Ct(Y,rt){if(h=rt.getViewerPose(l||o),g=rt,h!==null){const vt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let at=!1;vt.length!==x.cameras.length&&(x.cameras.length=0,at=!0);for(let Nt=0;Nt<vt.length;Nt++){const It=vt[Nt];let _t=null;if(f!==null)_t=f.getViewport(It);else{const Q=u.getViewSubImage(d,It);_t=Q.viewport,Nt===0&&(t.setRenderTargetTextures(b,Q.colorTexture,d.ignoreDepthValues?void 0:Q.depthStencilTexture),t.setRenderTarget(b))}let $=M[Nt];$===void 0&&($=new Ne,$.layers.enable(Nt),$.viewport=new he,M[Nt]=$),$.matrix.fromArray(It.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(It.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(_t.x,_t.y,_t.width,_t.height),Nt===0&&(x.matrix.copy($.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),at===!0&&x.cameras.push($)}const Lt=s.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")){const Nt=u.getDepthInformation(vt[0]);Nt&&Nt.isValid&&Nt.texture&&v.init(t,Nt,s.renderState)}}for(let vt=0;vt<w.length;vt++){const at=_[vt],Lt=w[vt];at!==null&&Lt!==void 0&&Lt.update(at,rt,l||o)}ht&&ht(Y,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),g=null}const Wt=new xu;Wt.setAnimationLoop(Ct),this.setAnimationLoop=function(Y){ht=Y},this.dispose=function(){}}}const ni=new on,u_=new oe;function d_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,gu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,w,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Pe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Pe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),w=b.envMap,_=b.envMapRotation;w&&(m.envMap.value=w,ni.copy(_),ni.x*=-1,ni.y*=-1,ni.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),m.envMapRotation.value.setFromMatrix4(u_.makeRotationFromEuler(ni)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=w*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Pe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function f_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,w){const _=w.program;n.uniformBlockBinding(b,_)}function l(b,w){let _=s[b.id];_===void 0&&(g(b),_=h(b),s[b.id]=_,b.addEventListener("dispose",m));const L=w.program;n.updateUBOMapping(b,L);const E=t.render.frame;r[b.id]!==E&&(d(b),r[b.id]=E)}function h(b){const w=u();b.__bindingPointIndex=w;const _=i.createBuffer(),L=b.__size,E=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,L,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,_),_}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const w=s[b.id],_=b.uniforms,L=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let E=0,A=_.length;E<A;E++){const P=Array.isArray(_[E])?_[E]:[_[E]];for(let M=0,x=P.length;M<x;M++){const C=P[M];if(f(C,E,M,L)===!0){const B=C.__offset,D=Array.isArray(C.value)?C.value:[C.value];let k=0;for(let G=0;G<D.length;G++){const H=D[G],J=v(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,B+k,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,k),k+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,w,_,L){const E=b.value,A=w+"_"+_;if(L[A]===void 0)return typeof E=="number"||typeof E=="boolean"?L[A]=E:L[A]=E.clone(),!0;{const P=L[A];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return L[A]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function g(b){const w=b.uniforms;let _=0;const L=16;for(let A=0,P=w.length;A<P;A++){const M=Array.isArray(w[A])?w[A]:[w[A]];for(let x=0,C=M.length;x<C;x++){const B=M[x],D=Array.isArray(B.value)?B.value:[B.value];for(let k=0,G=D.length;k<G;k++){const H=D[k],J=v(H),V=_%L,it=V%J.boundary,tt=V+it;_+=it,tt!==0&&L-tt<J.storage&&(_+=L-tt),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=_,_+=J.storage}}}const E=_%L;return E>0&&(_+=L-E),b.__size=_,b.__cache={},this}function v(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function m(b){const w=b.target;w.removeEventListener("dispose",m);const _=o.indexOf(w.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class p_{constructor(t={}){const{canvas:e=np(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const b=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ee,this.toneMapping=zn,this.toneMappingExposure=1;const _=this;let L=!1,E=0,A=0,P=null,M=-1,x=null;const C=new he,B=new he;let D=null;const k=new Xt(0);let G=0,H=e.width,J=e.height,V=1,it=null,tt=null;const ht=new he(0,0,H,J),Ct=new he(0,0,H,J);let Wt=!1;const Y=new cc;let rt=!1,vt=!1;const at=new oe,Lt=new oe,Nt=new I,It=new he,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $=!1;function Q(){return P===null?V:1}let R=n;function bt(S,N){return e.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ka}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),R===null){const N="webgl2";if(R=bt(N,S),R===null)throw bt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let nt,Mt,lt,Dt,xt,T,y,z,j,et,Z,Et,dt,yt,Gt,ot,St,Ut,Ft,wt,$t,Ht,ne,U;function ft(){nt=new x0(R),nt.init(),Ht=new s_(R,nt),Mt=new f0(R,nt,t,Ht),lt=new e_(R,nt),Mt.reverseDepthBuffer&&d&&lt.buffers.depth.setReversed(!0),Dt=new S0(R),xt=new zv,T=new i_(R,nt,lt,xt,Mt,Ht,Dt),y=new m0(_),z=new _0(_),j=new Cp(R),ne=new u0(R,j),et=new y0(R,j,Dt,ne),Z=new b0(R,et,j,Dt),Ft=new w0(R,Mt,T),ot=new p0(xt),Et=new Bv(_,y,z,nt,Mt,ne,ot),dt=new d_(_,xt),yt=new Vv,Gt=new Yv(nt),Ut=new h0(_,y,z,lt,Z,f,c),St=new Qv(_,Z,Mt),U=new f_(R,Dt,Mt,lt),wt=new d0(R,nt,Dt),$t=new M0(R,nt,Dt),Dt.programs=Et.programs,_.capabilities=Mt,_.extensions=nt,_.properties=xt,_.renderLists=yt,_.shadowMap=St,_.state=lt,_.info=Dt}ft();const q=new h_(_,R);this.xr=q,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const S=nt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=nt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(H,J,!1))},this.getSize=function(S){return S.set(H,J)},this.setSize=function(S,N,W=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=S,J=N,e.width=Math.floor(S*V),e.height=Math.floor(N*V),W===!0&&(e.style.width=S+"px",e.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(H*V,J*V).floor()},this.setDrawingBufferSize=function(S,N,W){H=S,J=N,V=W,e.width=Math.floor(S*W),e.height=Math.floor(N*W),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(C)},this.getViewport=function(S){return S.copy(ht)},this.setViewport=function(S,N,W,X){S.isVector4?ht.set(S.x,S.y,S.z,S.w):ht.set(S,N,W,X),lt.viewport(C.copy(ht).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(Ct)},this.setScissor=function(S,N,W,X){S.isVector4?Ct.set(S.x,S.y,S.z,S.w):Ct.set(S,N,W,X),lt.scissor(B.copy(Ct).multiplyScalar(V).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(S){lt.setScissorTest(Wt=S)},this.setOpaqueSort=function(S){it=S},this.setTransparentSort=function(S){tt=S},this.getClearColor=function(S){return S.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(S=!0,N=!0,W=!0){let X=0;if(S){let F=!1;if(P!==null){const ct=P.texture.format;F=ct===sc||ct===ic||ct===nc}if(F){const ct=P.texture.type,mt=ct===bn||ct===di||ct===Rs||ct===Ji||ct===tc||ct===ec,Tt=Ut.getClearColor(),At=Ut.getClearAlpha(),Ot=Tt.r,Bt=Tt.g,Rt=Tt.b;mt?(g[0]=Ot,g[1]=Bt,g[2]=Rt,g[3]=At,R.clearBufferuiv(R.COLOR,0,g)):(v[0]=Ot,v[1]=Bt,v[2]=Rt,v[3]=At,R.clearBufferiv(R.COLOR,0,v))}else X|=R.COLOR_BUFFER_BIT}N&&(X|=R.DEPTH_BUFFER_BIT),W&&(X|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),yt.dispose(),Gt.dispose(),xt.dispose(),y.dispose(),z.dispose(),Z.dispose(),ne.dispose(),U.dispose(),Et.dispose(),q.dispose(),q.removeEventListener("sessionstart",Ec),q.removeEventListener("sessionend",Tc),Zn.stop()};function K(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const S=Dt.autoReset,N=St.enabled,W=St.autoUpdate,X=St.needsUpdate,F=St.type;ft(),Dt.autoReset=S,St.enabled=N,St.autoUpdate=W,St.needsUpdate=X,St.type=F}function pt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function kt(S){const N=S.target;N.removeEventListener("dispose",kt),le(N)}function le(S){ye(S),xt.remove(S)}function ye(S){const N=xt.get(S).programs;N!==void 0&&(N.forEach(function(W){Et.releaseProgram(W)}),S.isShaderMaterial&&Et.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,W,X,F,ct){N===null&&(N=_t);const mt=F.isMesh&&F.matrixWorld.determinant()<0,Tt=od(S,N,W,X,F);lt.setMaterial(X,mt);let At=W.index,Ot=1;if(X.wireframe===!0){if(At=et.getWireframeAttribute(W),At===void 0)return;Ot=2}const Bt=W.drawRange,Rt=W.attributes.position;let Yt=Bt.start*Ot,ie=(Bt.start+Bt.count)*Ot;ct!==null&&(Yt=Math.max(Yt,ct.start*Ot),ie=Math.min(ie,(ct.start+ct.count)*Ot)),At!==null?(Yt=Math.max(Yt,0),ie=Math.min(ie,At.count)):Rt!=null&&(Yt=Math.max(Yt,0),ie=Math.min(ie,Rt.count));const se=ie-Yt;if(se<0||se===1/0)return;ne.setup(F,X,Tt,W,At);let Le,jt=wt;if(At!==null&&(Le=j.get(At),jt=$t,jt.setIndex(Le)),F.isMesh)X.wireframe===!0?(lt.setLineWidth(X.wireframeLinewidth*Q()),jt.setMode(R.LINES)):jt.setMode(R.TRIANGLES);else if(F.isLine){let Pt=X.linewidth;Pt===void 0&&(Pt=1),lt.setLineWidth(Pt*Q()),F.isLineSegments?jt.setMode(R.LINES):F.isLineLoop?jt.setMode(R.LINE_LOOP):jt.setMode(R.LINE_STRIP)}else F.isPoints?jt.setMode(R.POINTS):F.isSprite&&jt.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)jt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))jt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Pt=F._multiDrawStarts,ln=F._multiDrawCounts,Zt=F._multiDrawCount,He=At?j.get(At).bytesPerElement:1,_i=xt.get(X).currentProgram.getUniforms();for(let Ie=0;Ie<Zt;Ie++)_i.setValue(R,"_gl_DrawID",Ie),jt.render(Pt[Ie]/He,ln[Ie])}else if(F.isInstancedMesh)jt.renderInstances(Yt,se,F.count);else if(W.isInstancedBufferGeometry){const Pt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ln=Math.min(W.instanceCount,Pt);jt.renderInstances(Yt,se,ln)}else jt.render(Yt,se)};function Qt(S,N,W){S.transparent===!0&&S.side===_n&&S.forceSinglePass===!1?(S.side=Pe,S.needsUpdate=!0,qs(S,N,W),S.side=Xn,S.needsUpdate=!0,qs(S,N,W),S.side=_n):qs(S,N,W)}this.compile=function(S,N,W=null){W===null&&(W=S),p=Gt.get(W),p.init(N),w.push(p),W.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),S!==W&&S.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const X=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ct=F.material;if(ct)if(Array.isArray(ct))for(let mt=0;mt<ct.length;mt++){const Tt=ct[mt];Qt(Tt,W,F),X.add(Tt)}else Qt(ct,W,F),X.add(ct)}),w.pop(),p=null,X},this.compileAsync=function(S,N,W=null){const X=this.compile(S,N,W);return new Promise(F=>{function ct(){if(X.forEach(function(mt){xt.get(mt).currentProgram.isReady()&&X.delete(mt)}),X.size===0){F(S);return}setTimeout(ct,10)}nt.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let ze=null;function cn(S){ze&&ze(S)}function Ec(){Zn.stop()}function Tc(){Zn.start()}const Zn=new xu;Zn.setAnimationLoop(cn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(S){ze=S,q.setAnimationLoop(S),S===null?Zn.stop():Zn.start()},q.addEventListener("sessionstart",Ec),q.addEventListener("sessionend",Tc),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(N),N=q.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,N,P),p=Gt.get(S,w.length),p.init(N),w.push(p),Lt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Y.setFromProjectionMatrix(Lt),vt=this.localClippingEnabled,rt=ot.init(this.clippingPlanes,vt),m=yt.get(S,b.length),m.init(),b.push(m),q.enabled===!0&&q.isPresenting===!0){const ct=_.xr.getDepthSensingMesh();ct!==null&&Yr(ct,N,-1/0,_.sortObjects)}Yr(S,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(it,tt),$=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,$&&Ut.addToRenderList(m,S),this.info.render.frame++,rt===!0&&ot.beginShadows();const W=p.state.shadowsArray;St.render(W,S,N),rt===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){const ct=N.cameras;if(F.length>0)for(let mt=0,Tt=ct.length;mt<Tt;mt++){const At=ct[mt];Rc(X,F,S,At)}$&&Ut.render(S);for(let mt=0,Tt=ct.length;mt<Tt;mt++){const At=ct[mt];Ac(m,S,At,At.viewport)}}else F.length>0&&Rc(X,F,S,N),$&&Ut.render(S),Ac(m,S,N);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(_,S,N),ne.resetDefaultState(),M=-1,x=null,w.pop(),w.length>0?(p=w[w.length-1],rt===!0&&ot.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Yr(S,N,W,X){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){X&&It.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Lt);const mt=Z.update(S),Tt=S.material;Tt.visible&&m.push(S,mt,Tt,W,It.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){const mt=Z.update(S),Tt=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),It.copy(S.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),It.copy(mt.boundingSphere.center)),It.applyMatrix4(S.matrixWorld).applyMatrix4(Lt)),Array.isArray(Tt)){const At=mt.groups;for(let Ot=0,Bt=At.length;Ot<Bt;Ot++){const Rt=At[Ot],Yt=Tt[Rt.materialIndex];Yt&&Yt.visible&&m.push(S,mt,Yt,W,It.z,Rt)}}else Tt.visible&&m.push(S,mt,Tt,W,It.z,null)}}const ct=S.children;for(let mt=0,Tt=ct.length;mt<Tt;mt++)Yr(ct[mt],N,W,X)}function Ac(S,N,W,X){const F=S.opaque,ct=S.transmissive,mt=S.transparent;p.setupLightsView(W),rt===!0&&ot.setGlobalState(_.clippingPlanes,W),X&&lt.viewport(C.copy(X)),F.length>0&&$s(F,N,W),ct.length>0&&$s(ct,N,W),mt.length>0&&$s(mt,N,W),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function Rc(S,N,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new fi(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?zs:bn,minFilter:li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const ct=p.state.transmissionRenderTarget[X.id],mt=X.viewport||C;ct.setSize(mt.z,mt.w);const Tt=_.getRenderTarget();_.setRenderTarget(ct),_.getClearColor(k),G=_.getClearAlpha(),G<1&&_.setClearColor(16777215,.5),_.clear(),$&&Ut.render(W);const At=_.toneMapping;_.toneMapping=zn;const Ot=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),rt===!0&&ot.setGlobalState(_.clippingPlanes,X),$s(S,W,X),T.updateMultisampleRenderTarget(ct),T.updateRenderTargetMipmap(ct),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let Rt=0,Yt=N.length;Rt<Yt;Rt++){const ie=N[Rt],se=ie.object,Le=ie.geometry,jt=ie.material,Pt=ie.group;if(jt.side===_n&&se.layers.test(X.layers)){const ln=jt.side;jt.side=Pe,jt.needsUpdate=!0,Cc(se,W,X,Le,jt,Pt),jt.side=ln,jt.needsUpdate=!0,Bt=!0}}Bt===!0&&(T.updateMultisampleRenderTarget(ct),T.updateRenderTargetMipmap(ct))}_.setRenderTarget(Tt),_.setClearColor(k,G),Ot!==void 0&&(X.viewport=Ot),_.toneMapping=At}function $s(S,N,W){const X=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ct=S.length;F<ct;F++){const mt=S[F],Tt=mt.object,At=mt.geometry,Ot=X===null?mt.material:X,Bt=mt.group;Tt.layers.test(W.layers)&&Cc(Tt,N,W,At,Ot,Bt)}}function Cc(S,N,W,X,F,ct){S.onBeforeRender(_,N,W,X,F,ct),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(_,N,W,X,S,ct),F.transparent===!0&&F.side===_n&&F.forceSinglePass===!1?(F.side=Pe,F.needsUpdate=!0,_.renderBufferDirect(W,N,X,F,S,ct),F.side=Xn,F.needsUpdate=!0,_.renderBufferDirect(W,N,X,F,S,ct),F.side=_n):_.renderBufferDirect(W,N,X,F,S,ct),S.onAfterRender(_,N,W,X,F,ct)}function qs(S,N,W){N.isScene!==!0&&(N=_t);const X=xt.get(S),F=p.state.lights,ct=p.state.shadowsArray,mt=F.state.version,Tt=Et.getParameters(S,F.state,ct,N,W),At=Et.getProgramCacheKey(Tt);let Ot=X.programs;X.environment=S.isMeshStandardMaterial?N.environment:null,X.fog=N.fog,X.envMap=(S.isMeshStandardMaterial?z:y).get(S.envMap||X.environment),X.envMapRotation=X.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Ot===void 0&&(S.addEventListener("dispose",kt),Ot=new Map,X.programs=Ot);let Bt=Ot.get(At);if(Bt!==void 0){if(X.currentProgram===Bt&&X.lightsStateVersion===mt)return Lc(S,Tt),Bt}else Tt.uniforms=Et.getUniforms(S),S.onBeforeCompile(Tt,_),Bt=Et.acquireProgram(Tt,At),Ot.set(At,Bt),X.uniforms=Tt.uniforms;const Rt=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=ot.uniform),Lc(S,Tt),X.needsLights=cd(S),X.lightsStateVersion=mt,X.needsLights&&(Rt.ambientLightColor.value=F.state.ambient,Rt.lightProbe.value=F.state.probe,Rt.directionalLights.value=F.state.directional,Rt.directionalLightShadows.value=F.state.directionalShadow,Rt.spotLights.value=F.state.spot,Rt.spotLightShadows.value=F.state.spotShadow,Rt.rectAreaLights.value=F.state.rectArea,Rt.ltc_1.value=F.state.rectAreaLTC1,Rt.ltc_2.value=F.state.rectAreaLTC2,Rt.pointLights.value=F.state.point,Rt.pointLightShadows.value=F.state.pointShadow,Rt.hemisphereLights.value=F.state.hemi,Rt.directionalShadowMap.value=F.state.directionalShadowMap,Rt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Rt.spotShadowMap.value=F.state.spotShadowMap,Rt.spotLightMatrix.value=F.state.spotLightMatrix,Rt.spotLightMap.value=F.state.spotLightMap,Rt.pointShadowMap.value=F.state.pointShadowMap,Rt.pointShadowMatrix.value=F.state.pointShadowMatrix),X.currentProgram=Bt,X.uniformsList=null,Bt}function Pc(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=Lr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Lc(S,N){const W=xt.get(S);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function od(S,N,W,X,F){N.isScene!==!0&&(N=_t),T.resetTextureUnits();const ct=N.fog,mt=X.isMeshStandardMaterial?N.environment:null,Tt=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ns,At=(X.isMeshStandardMaterial?z:y).get(X.envMap||mt),Ot=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Bt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Rt=!!W.morphAttributes.position,Yt=!!W.morphAttributes.normal,ie=!!W.morphAttributes.color;let se=zn;X.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(se=_.toneMapping);const Le=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,jt=Le!==void 0?Le.length:0,Pt=xt.get(X),ln=p.state.lights;if(rt===!0&&(vt===!0||S!==x)){const Oe=S===x&&X.id===M;ot.setState(X,S,Oe)}let Zt=!1;X.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==ln.state.version||Pt.outputColorSpace!==Tt||F.isBatchedMesh&&Pt.batching===!1||!F.isBatchedMesh&&Pt.batching===!0||F.isBatchedMesh&&Pt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pt.instancing===!1||!F.isInstancedMesh&&Pt.instancing===!0||F.isSkinnedMesh&&Pt.skinning===!1||!F.isSkinnedMesh&&Pt.skinning===!0||F.isInstancedMesh&&Pt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pt.instancingMorph===!1&&F.morphTexture!==null||Pt.envMap!==At||X.fog===!0&&Pt.fog!==ct||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==ot.numPlanes||Pt.numIntersection!==ot.numIntersection)||Pt.vertexAlphas!==Ot||Pt.vertexTangents!==Bt||Pt.morphTargets!==Rt||Pt.morphNormals!==Yt||Pt.morphColors!==ie||Pt.toneMapping!==se||Pt.morphTargetsCount!==jt)&&(Zt=!0):(Zt=!0,Pt.__version=X.version);let He=Pt.currentProgram;Zt===!0&&(He=qs(X,N,F));let _i=!1,Ie=!1,os=!1;const re=He.getUniforms(),Ke=Pt.uniforms;if(lt.useProgram(He.program)&&(_i=!0,Ie=!0,os=!0),X.id!==M&&(M=X.id,Ie=!0),_i||x!==S){lt.buffers.depth.getReversed()?(at.copy(S.projectionMatrix),sp(at),rp(at),re.setValue(R,"projectionMatrix",at)):re.setValue(R,"projectionMatrix",S.projectionMatrix),re.setValue(R,"viewMatrix",S.matrixWorldInverse);const Tn=re.map.cameraPosition;Tn!==void 0&&Tn.setValue(R,Nt.setFromMatrixPosition(S.matrixWorld)),Mt.logarithmicDepthBuffer&&re.setValue(R,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&re.setValue(R,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Ie=!0,os=!0)}if(F.isSkinnedMesh){re.setOptional(R,F,"bindMatrix"),re.setOptional(R,F,"bindMatrixInverse");const Oe=F.skeleton;Oe&&(Oe.boneTexture===null&&Oe.computeBoneTexture(),re.setValue(R,"boneTexture",Oe.boneTexture,T))}F.isBatchedMesh&&(re.setOptional(R,F,"batchingTexture"),re.setValue(R,"batchingTexture",F._matricesTexture,T),re.setOptional(R,F,"batchingIdTexture"),re.setValue(R,"batchingIdTexture",F._indirectTexture,T),re.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&re.setValue(R,"batchingColorTexture",F._colorsTexture,T));const as=W.morphAttributes;if((as.position!==void 0||as.normal!==void 0||as.color!==void 0)&&Ft.update(F,W,He),(Ie||Pt.receiveShadow!==F.receiveShadow)&&(Pt.receiveShadow=F.receiveShadow,re.setValue(R,"receiveShadow",F.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Ke.envMap.value=At,Ke.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&N.environment!==null&&(Ke.envMapIntensity.value=N.environmentIntensity),Ie&&(re.setValue(R,"toneMappingExposure",_.toneMappingExposure),Pt.needsLights&&ad(Ke,os),ct&&X.fog===!0&&dt.refreshFogUniforms(Ke,ct),dt.refreshMaterialUniforms(Ke,X,V,J,p.state.transmissionRenderTarget[S.id]),Lr.upload(R,Pc(Pt),Ke,T)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Lr.upload(R,Pc(Pt),Ke,T),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&re.setValue(R,"center",F.center),re.setValue(R,"modelViewMatrix",F.modelViewMatrix),re.setValue(R,"normalMatrix",F.normalMatrix),re.setValue(R,"modelMatrix",F.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Oe=X.uniformsGroups;for(let Tn=0,An=Oe.length;Tn<An;Tn++){const Ic=Oe[Tn];U.update(Ic,He),U.bind(Ic,He)}}return He}function ad(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function cd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,N,W){xt.get(S.texture).__webglTexture=N,xt.get(S.depthTexture).__webglTexture=W;const X=xt.get(S);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,N){const W=xt.get(S);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,W=0){P=S,E=N,A=W;let X=!0,F=null,ct=!1,mt=!1;if(S){const At=xt.get(S);if(At.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(R.FRAMEBUFFER,null),X=!1;else if(At.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(At.__hasExternalTextures)T.rebindTextures(S,xt.get(S.texture).__webglTexture,xt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Rt=S.depthTexture;if(At.__boundDepthTexture!==Rt){if(Rt!==null&&xt.has(Rt)&&(S.width!==Rt.image.width||S.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}const Ot=S.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(mt=!0);const Bt=xt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Bt[N])?F=Bt[N][W]:F=Bt[N],ct=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?F=xt.get(S).__webglMultisampledFramebuffer:Array.isArray(Bt)?F=Bt[W]:F=Bt,C.copy(S.viewport),B.copy(S.scissor),D=S.scissorTest}else C.copy(ht).multiplyScalar(V).floor(),B.copy(Ct).multiplyScalar(V).floor(),D=Wt;if(lt.bindFramebuffer(R.FRAMEBUFFER,F)&&X&&lt.drawBuffers(S,F),lt.viewport(C),lt.scissor(B),lt.setScissorTest(D),ct){const At=xt.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,At.__webglTexture,W)}else if(mt){const At=xt.get(S.texture),Ot=N||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,At.__webglTexture,W||0,Ot)}M=-1},this.readRenderTargetPixels=function(S,N,W,X,F,ct,mt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=xt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&mt!==void 0&&(Tt=Tt[mt]),Tt){lt.bindFramebuffer(R.FRAMEBUFFER,Tt);try{const At=S.texture,Ot=At.format,Bt=At.type;if(!Mt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Mt.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-X&&W>=0&&W<=S.height-F&&R.readPixels(N,W,X,F,Ht.convert(Ot),Ht.convert(Bt),ct)}finally{const At=P!==null?xt.get(P).__webglFramebuffer:null;lt.bindFramebuffer(R.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(S,N,W,X,F,ct,mt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=xt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&mt!==void 0&&(Tt=Tt[mt]),Tt){const At=S.texture,Ot=At.format,Bt=At.type;if(!Mt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Mt.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-X&&W>=0&&W<=S.height-F){lt.bindFramebuffer(R.FRAMEBUFFER,Tt);const Rt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Rt),R.bufferData(R.PIXEL_PACK_BUFFER,ct.byteLength,R.STREAM_READ),R.readPixels(N,W,X,F,Ht.convert(Ot),Ht.convert(Bt),0);const Yt=P!==null?xt.get(P).__webglFramebuffer:null;lt.bindFramebuffer(R.FRAMEBUFFER,Yt);const ie=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await ip(R,ie,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Rt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ct),R.deleteBuffer(Rt),R.deleteSync(ie),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,W=0){S.isTexture!==!0&&(ps("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1]);const X=Math.pow(2,-W),F=Math.floor(S.image.width*X),ct=Math.floor(S.image.height*X),mt=N!==null?N.x:0,Tt=N!==null?N.y:0;T.setTexture2D(S,0),R.copyTexSubImage2D(R.TEXTURE_2D,W,0,0,mt,Tt,F,ct),lt.unbindTexture()},this.copyTextureToTexture=function(S,N,W=null,X=null,F=0){S.isTexture!==!0&&(ps("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,S=arguments[1],N=arguments[2],F=arguments[3]||0,W=null);let ct,mt,Tt,At,Ot,Bt,Rt,Yt,ie;const se=S.isCompressedTexture?S.mipmaps[F]:S.image;W!==null?(ct=W.max.x-W.min.x,mt=W.max.y-W.min.y,Tt=W.isBox3?W.max.z-W.min.z:1,At=W.min.x,Ot=W.min.y,Bt=W.isBox3?W.min.z:0):(ct=se.width,mt=se.height,Tt=se.depth||1,At=0,Ot=0,Bt=0),X!==null?(Rt=X.x,Yt=X.y,ie=X.z):(Rt=0,Yt=0,ie=0);const Le=Ht.convert(N.format),jt=Ht.convert(N.type);let Pt;N.isData3DTexture?(T.setTexture3D(N,0),Pt=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Pt=R.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Pt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const ln=R.getParameter(R.UNPACK_ROW_LENGTH),Zt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),He=R.getParameter(R.UNPACK_SKIP_PIXELS),_i=R.getParameter(R.UNPACK_SKIP_ROWS),Ie=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,se.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,se.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,At),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ot),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Bt);const os=S.isDataArrayTexture||S.isData3DTexture,re=N.isDataArrayTexture||N.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const Ke=xt.get(S),as=xt.get(N),Oe=xt.get(Ke.__renderTarget),Tn=xt.get(as.__renderTarget);lt.bindFramebuffer(R.READ_FRAMEBUFFER,Oe.__webglFramebuffer),lt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Tn.__webglFramebuffer);for(let An=0;An<Tt;An++)os&&R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,xt.get(S).__webglTexture,F,Bt+An),S.isDepthTexture?(re&&R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,xt.get(N).__webglTexture,F,ie+An),R.blitFramebuffer(At,Ot,ct,mt,Rt,Yt,ct,mt,R.DEPTH_BUFFER_BIT,R.NEAREST)):re?R.copyTexSubImage3D(Pt,F,Rt,Yt,ie+An,At,Ot,ct,mt):R.copyTexSubImage2D(Pt,F,Rt,Yt,ie+An,At,Ot,ct,mt);lt.bindFramebuffer(R.READ_FRAMEBUFFER,null),lt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else re?S.isDataTexture||S.isData3DTexture?R.texSubImage3D(Pt,F,Rt,Yt,ie,ct,mt,Tt,Le,jt,se.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(Pt,F,Rt,Yt,ie,ct,mt,Tt,Le,se.data):R.texSubImage3D(Pt,F,Rt,Yt,ie,ct,mt,Tt,Le,jt,se):S.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,F,Rt,Yt,ct,mt,Le,jt,se.data):S.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,F,Rt,Yt,se.width,se.height,Le,se.data):R.texSubImage2D(R.TEXTURE_2D,F,Rt,Yt,ct,mt,Le,jt,se);R.pixelStorei(R.UNPACK_ROW_LENGTH,ln),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Zt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,He),R.pixelStorei(R.UNPACK_SKIP_ROWS,_i),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ie),F===0&&N.generateMipmaps&&R.generateMipmap(Pt),lt.unbindTexture()},this.copyTextureToTexture3D=function(S,N,W=null,X=null,F=0){return S.isTexture!==!0&&(ps("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,S=arguments[2],N=arguments[3],F=arguments[4]||0),ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,W,X,F)},this.initRenderTarget=function(S){xt.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),lt.unbindTexture()},this.resetState=function(){E=0,A=0,P=null,lt.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class hc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Xt(t),this.near=e,this.far=n}clone(){return new hc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class m_ extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Tu extends Te{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class an{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new st:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,s=[],r=[],o=[],a=new I,c=new oe;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ge(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ge(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class uc extends an{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new st){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class g_ extends uc{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function dc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const gr=new I,Co=new dc,Po=new dc,Lo=new dc;class v_ extends an{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(gr.subVectors(s[0],s[1]).add(s[0]),l=gr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(gr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=gr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Co.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,v,m),Po.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,v,m),Lo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Co.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Po.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Lo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Co.calc(c),Po.calc(c),Lo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Wl(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function __(i,t){const e=1-i;return e*e*t}function x_(i,t){return 2*(1-i)*i*t}function y_(i,t){return i*i*t}function xs(i,t,e,n){return __(i,t)+x_(i,e)+y_(i,n)}function M_(i,t){const e=1-i;return e*e*e*t}function S_(i,t){const e=1-i;return 3*e*e*i*t}function w_(i,t){return 3*(1-i)*i*i*t}function b_(i,t){return i*i*i*t}function ys(i,t,e,n,s){return M_(i,t)+S_(i,e)+w_(i,n)+b_(i,s)}class Au extends an{constructor(t=new st,e=new st,n=new st,s=new st){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new st){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ys(t,s.x,r.x,o.x,a.x),ys(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class E_ extends an{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ys(t,s.x,r.x,o.x,a.x),ys(t,s.y,r.y,o.y,a.y),ys(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ru extends an{constructor(t=new st,e=new st){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new st){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new st){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class T_ extends an{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cu extends an{constructor(t=new st,e=new st,n=new st){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new st){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(xs(t,s.x,r.x,o.x),xs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class A_ extends an{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(xs(t,s.x,r.x,o.x),xs(t,s.y,r.y,o.y),xs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pu extends an{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new st){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Wl(a,c.x,l.x,h.x,u.x),Wl(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new st().fromArray(s))}return this}}var Da=Object.freeze({__proto__:null,ArcCurve:g_,CatmullRomCurve3:v_,CubicBezierCurve:Au,CubicBezierCurve3:E_,EllipseCurve:uc,LineCurve:Ru,LineCurve3:T_,QuadraticBezierCurve:Cu,QuadraticBezierCurve3:A_,SplineCurve:Pu});class R_ extends an{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Da[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Da[s.type]().fromJSON(s))}return this}}class Ua extends R_{constructor(t){super(),this.type="Path",this.currentPoint=new st,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ru(this.currentPoint.clone(),new st(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Cu(this.currentPoint.clone(),new st(t,e),new st(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Au(this.currentPoint.clone(),new st(t,e),new st(n,s),new st(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Pu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new uc(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class fc extends Fe{constructor(t=[new st(0,-.5),new st(.5,0),new st(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ge(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/e,u=new I,d=new st,f=new I,g=new I,v=new I;let m=0,p=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(g)}for(let b=0;b<=e;b++){const w=n+b*h*s,_=Math.sin(w),L=Math.cos(w);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*_,u.y=t[E].y,u.z=t[E].x*L,o.push(u.x,u.y,u.z),d.x=b/e,d.y=E/(t.length-1),a.push(d.x,d.y);const A=c[3*E+0]*_,P=c[3*E+1],M=c[3*E+0]*L;l.push(A,P,M)}}for(let b=0;b<e;b++)for(let w=0;w<t.length-1;w++){const _=w+b*t.length,L=_,E=_+t.length,A=_+t.length+1,P=_+1;r.push(L,E,P),r.push(A,P,E)}this.setIndex(r),this.setAttribute("position",new ae(o,3)),this.setAttribute("uv",new ae(a,2)),this.setAttribute("normal",new ae(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fc(t.points,t.segments,t.phiStart,t.phiLength)}}class Gi extends Fe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new I,h=new st;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ae(o,3)),this.setAttribute("normal",new ae(a,3)),this.setAttribute("uv",new ae(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Wi extends Fe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;b(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new ae(u,3)),this.setAttribute("normal",new ae(d,3)),this.setAttribute("uv",new ae(f,2));function b(){const _=new I,L=new I;let E=0;const A=(e-t)/n;for(let P=0;P<=r;P++){const M=[],x=P/r,C=x*(e-t)+t;for(let B=0;B<=s;B++){const D=B/s,k=D*c+a,G=Math.sin(k),H=Math.cos(k);L.x=C*G,L.y=-x*n+m,L.z=C*H,u.push(L.x,L.y,L.z),_.set(G,A,H).normalize(),d.push(_.x,_.y,_.z),f.push(D,1-x),M.push(g++)}v.push(M)}for(let P=0;P<s;P++)for(let M=0;M<r;M++){const x=v[M][P],C=v[M+1][P],B=v[M+1][P+1],D=v[M][P+1];(t>0||M!==0)&&(h.push(x,C,D),E+=3),(e>0||M!==r-1)&&(h.push(C,B,D),E+=3)}l.addGroup(p,E,0),p+=E}function w(_){const L=g,E=new st,A=new I;let P=0;const M=_===!0?t:e,x=_===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const C=g;for(let B=0;B<=s;B++){const k=B/s*c+a,G=Math.cos(k),H=Math.sin(k);A.x=M*H,A.y=m*x,A.z=M*G,u.push(A.x,A.y,A.z),d.push(0,x,0),E.x=G*.5+.5,E.y=H*.5*x+.5,f.push(E.x,E.y),g++}for(let B=0;B<s;B++){const D=L+B,k=C+B;_===!0?h.push(k,k+1,D):h.push(k+1,k,D),P+=3}l.addGroup(p,P,_===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class pc extends Wi{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new pc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hi extends Ua{constructor(t){super(t),this.uuid=gi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Ua().fromJSON(s))}return this}}const C_={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Lu(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=U_(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Ls(r,o,e,a,c,f,0),o}};function Lu(i,t,e,n,s){let r,o;if(s===X_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Xl(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Xl(r,i[r],i[r+1],o);return o&&Xr(o,o.next)&&(Ds(o),o=o.next),o}function pi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Xr(e,e.next)||ce(e.prev,e,e.next)===0)){if(Ds(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ls(i,t,e,n,s,r,o){if(!i)return;!o&&r&&B_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?L_(i,n,s,r):P_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Ds(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=I_(pi(i),t,e),Ls(i,t,e,n,s,r,2)):o===2&&D_(i,t,e,n,s,r):Ls(pi(i),t,e,n,s,r,1);break}}}function P_(i){const t=i.prev,e=i,n=i.next;if(ce(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&ki(s,a,r,c,o,l,g.x,g.y)&&ce(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function L_(i,t,e,n){const s=i.prev,r=i,o=i.next;if(ce(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,v=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=Na(f,g,t,e,n),b=Na(v,m,t,e,n);let w=i.prevZ,_=i.nextZ;for(;w&&w.z>=p&&_&&_.z<=b;){if(w.x>=f&&w.x<=v&&w.y>=g&&w.y<=m&&w!==s&&w!==o&&ki(a,h,c,u,l,d,w.x,w.y)&&ce(w.prev,w,w.next)>=0||(w=w.prevZ,_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&ki(a,h,c,u,l,d,_.x,_.y)&&ce(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;w&&w.z>=p;){if(w.x>=f&&w.x<=v&&w.y>=g&&w.y<=m&&w!==s&&w!==o&&ki(a,h,c,u,l,d,w.x,w.y)&&ce(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;_&&_.z<=b;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&ki(a,h,c,u,l,d,_.x,_.y)&&ce(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function I_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Xr(s,r)&&Iu(s,n,n.next,r)&&Is(s,r)&&Is(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Ds(n),Ds(n.next),n=i=r),n=n.next}while(n!==i);return pi(n)}function D_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&V_(o,a)){let c=Du(o,a);o=pi(o,o.next),c=pi(c,c.next),Ls(o,t,e,n,s,r,0),Ls(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function U_(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Lu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(H_(l));for(s.sort(N_),r=0;r<s.length;r++)e=F_(s[r],e);return e}function N_(i,t){return i.x-t.x}function F_(i,t){const e=O_(i,t);if(!e)return t;const n=Du(e,i);return pi(n,n.next),pi(e,e.next)}function O_(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&ki(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Is(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&k_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function k_(i,t){return ce(i.prev,i,t.prev)<0&&ce(t.next,i,i.next)<0}function B_(i,t,e,n){let s=i;do s.z===0&&(s.z=Na(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,z_(s)}function z_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function Na(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function H_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ki(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function V_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!G_(i,t)&&(Is(i,t)&&Is(t,i)&&W_(i,t)&&(ce(i.prev,i,t.prev)||ce(i,t.prev,t))||Xr(i,t)&&ce(i.prev,i,i.next)>0&&ce(t.prev,t,t.next)>0)}function ce(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Xr(i,t){return i.x===t.x&&i.y===t.y}function Iu(i,t,e,n){const s=_r(ce(i,t,e)),r=_r(ce(i,t,n)),o=_r(ce(e,n,i)),a=_r(ce(e,n,t));return!!(s!==r&&o!==a||s===0&&vr(i,e,t)||r===0&&vr(i,n,t)||o===0&&vr(e,i,n)||a===0&&vr(e,t,n))}function vr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function _r(i){return i>0?1:i<0?-1:0}function G_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Iu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Is(i,t){return ce(i.prev,i,i.next)<0?ce(i,t,i.next)>=0&&ce(i,i.prev,t)>=0:ce(i,t,i.prev)<0||ce(i,i.next,t)<0}function W_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Du(i,t){const e=new Fa(i.i,i.x,i.y),n=new Fa(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Xl(i,t,e,n){const s=new Fa(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ds(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Fa(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function X_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Hn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Hn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];$l(t),ql(n,t);let o=t.length;e.forEach($l);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,ql(n,e[c]);const a=C_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function $l(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ql(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Ms extends Fe{constructor(t=new hi([new st(.5,.5),new st(-.5,.5),new st(-.5,-.5),new st(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new ae(s,3)),this.setAttribute("uv",new ae(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:$_;let w,_=!1,L,E,A,P;p&&(w=p.getSpacedPoints(h),_=!0,d=!1,L=p.computeFrenetFrames(h,!1),E=new I,A=new I,P=new I),d||(m=0,f=0,g=0,v=0);const M=a.extractPoints(l);let x=M.shape;const C=M.holes;if(!Hn.isClockWise(x)){x=x.reverse();for(let $=0,Q=C.length;$<Q;$++){const R=C[$];Hn.isClockWise(R)&&(C[$]=R.reverse())}}const D=Hn.triangulateShape(x,C),k=x;for(let $=0,Q=C.length;$<Q;$++){const R=C[$];x=x.concat(R)}function G($,Q,R){return Q||console.error("THREE.ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(Q,R)}const H=x.length,J=D.length;function V($,Q,R){let bt,nt,Mt;const lt=$.x-Q.x,Dt=$.y-Q.y,xt=R.x-$.x,T=R.y-$.y,y=lt*lt+Dt*Dt,z=lt*T-Dt*xt;if(Math.abs(z)>Number.EPSILON){const j=Math.sqrt(y),et=Math.sqrt(xt*xt+T*T),Z=Q.x-Dt/j,Et=Q.y+lt/j,dt=R.x-T/et,yt=R.y+xt/et,Gt=((dt-Z)*T-(yt-Et)*xt)/(lt*T-Dt*xt);bt=Z+lt*Gt-$.x,nt=Et+Dt*Gt-$.y;const ot=bt*bt+nt*nt;if(ot<=2)return new st(bt,nt);Mt=Math.sqrt(ot/2)}else{let j=!1;lt>Number.EPSILON?xt>Number.EPSILON&&(j=!0):lt<-Number.EPSILON?xt<-Number.EPSILON&&(j=!0):Math.sign(Dt)===Math.sign(T)&&(j=!0),j?(bt=-Dt,nt=lt,Mt=Math.sqrt(y)):(bt=lt,nt=Dt,Mt=Math.sqrt(y/2))}return new st(bt/Mt,nt/Mt)}const it=[];for(let $=0,Q=k.length,R=Q-1,bt=$+1;$<Q;$++,R++,bt++)R===Q&&(R=0),bt===Q&&(bt=0),it[$]=V(k[$],k[R],k[bt]);const tt=[];let ht,Ct=it.concat();for(let $=0,Q=C.length;$<Q;$++){const R=C[$];ht=[];for(let bt=0,nt=R.length,Mt=nt-1,lt=bt+1;bt<nt;bt++,Mt++,lt++)Mt===nt&&(Mt=0),lt===nt&&(lt=0),ht[bt]=V(R[bt],R[Mt],R[lt]);tt.push(ht),Ct=Ct.concat(ht)}for(let $=0;$<m;$++){const Q=$/m,R=f*Math.cos(Q*Math.PI/2),bt=g*Math.sin(Q*Math.PI/2)+v;for(let nt=0,Mt=k.length;nt<Mt;nt++){const lt=G(k[nt],it[nt],bt);at(lt.x,lt.y,-R)}for(let nt=0,Mt=C.length;nt<Mt;nt++){const lt=C[nt];ht=tt[nt];for(let Dt=0,xt=lt.length;Dt<xt;Dt++){const T=G(lt[Dt],ht[Dt],bt);at(T.x,T.y,-R)}}}const Wt=g+v;for(let $=0;$<H;$++){const Q=d?G(x[$],Ct[$],Wt):x[$];_?(A.copy(L.normals[0]).multiplyScalar(Q.x),E.copy(L.binormals[0]).multiplyScalar(Q.y),P.copy(w[0]).add(A).add(E),at(P.x,P.y,P.z)):at(Q.x,Q.y,0)}for(let $=1;$<=h;$++)for(let Q=0;Q<H;Q++){const R=d?G(x[Q],Ct[Q],Wt):x[Q];_?(A.copy(L.normals[$]).multiplyScalar(R.x),E.copy(L.binormals[$]).multiplyScalar(R.y),P.copy(w[$]).add(A).add(E),at(P.x,P.y,P.z)):at(R.x,R.y,u/h*$)}for(let $=m-1;$>=0;$--){const Q=$/m,R=f*Math.cos(Q*Math.PI/2),bt=g*Math.sin(Q*Math.PI/2)+v;for(let nt=0,Mt=k.length;nt<Mt;nt++){const lt=G(k[nt],it[nt],bt);at(lt.x,lt.y,u+R)}for(let nt=0,Mt=C.length;nt<Mt;nt++){const lt=C[nt];ht=tt[nt];for(let Dt=0,xt=lt.length;Dt<xt;Dt++){const T=G(lt[Dt],ht[Dt],bt);_?at(T.x,T.y+w[h-1].y,w[h-1].x+R):at(T.x,T.y,u+R)}}}Y(),rt();function Y(){const $=s.length/3;if(d){let Q=0,R=H*Q;for(let bt=0;bt<J;bt++){const nt=D[bt];Lt(nt[2]+R,nt[1]+R,nt[0]+R)}Q=h+m*2,R=H*Q;for(let bt=0;bt<J;bt++){const nt=D[bt];Lt(nt[0]+R,nt[1]+R,nt[2]+R)}}else{for(let Q=0;Q<J;Q++){const R=D[Q];Lt(R[2],R[1],R[0])}for(let Q=0;Q<J;Q++){const R=D[Q];Lt(R[0]+H*h,R[1]+H*h,R[2]+H*h)}}n.addGroup($,s.length/3-$,0)}function rt(){const $=s.length/3;let Q=0;vt(k,Q),Q+=k.length;for(let R=0,bt=C.length;R<bt;R++){const nt=C[R];vt(nt,Q),Q+=nt.length}n.addGroup($,s.length/3-$,1)}function vt($,Q){let R=$.length;for(;--R>=0;){const bt=R;let nt=R-1;nt<0&&(nt=$.length-1);for(let Mt=0,lt=h+m*2;Mt<lt;Mt++){const Dt=H*Mt,xt=H*(Mt+1),T=Q+bt+Dt,y=Q+nt+Dt,z=Q+nt+xt,j=Q+bt+xt;Nt(T,y,z,j)}}}function at($,Q,R){c.push($),c.push(Q),c.push(R)}function Lt($,Q,R){It($),It(Q),It(R);const bt=s.length/3,nt=b.generateTopUV(n,s,bt-3,bt-2,bt-1);_t(nt[0]),_t(nt[1]),_t(nt[2])}function Nt($,Q,R,bt){It($),It(Q),It(bt),It(Q),It(R),It(bt);const nt=s.length/3,Mt=b.generateSideWallUV(n,s,nt-6,nt-3,nt-2,nt-1);_t(Mt[0]),_t(Mt[1]),_t(Mt[3]),_t(Mt[1]),_t(Mt[2]),_t(Mt[3])}function It($){s.push(c[$*3+0]),s.push(c[$*3+1]),s.push(c[$*3+2])}function _t($){r.push($.x),r.push($.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return q_(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Da[s.type]().fromJSON(s)),new Ms(n,t.options)}}const $_={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new st(r,o),new st(a,c),new st(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new st(o,1-c),new st(l,1-u),new st(d,1-g),new st(v,1-p)]:[new st(a,1-c),new st(h,1-u),new st(f,1-g),new st(m,1-p)]}};function q_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ss extends Fe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new I,g=new st;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const b=p+m,w=b,_=b+n+1,L=b+n+2,E=b+1;a.push(w,_,E),a.push(_,L,E)}}this.setIndex(a),this.setAttribute("position",new ae(c,3)),this.setAttribute("normal",new ae(l,3)),this.setAttribute("uv",new ae(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ss(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class $r extends Fe{constructor(t=new hi([new st(0,.5),new st(-.5,-.5),new st(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new ae(s,3)),this.setAttribute("normal",new ae(r,3)),this.setAttribute("uv",new ae(o,2));function l(h){const u=s.length/3,d=h.extractPoints(e);let f=d.shape;const g=d.holes;Hn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const b=g[m];Hn.isClockWise(b)===!0&&(g[m]=b.reverse())}const v=Hn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const b=g[m];f=f.concat(b)}for(let m=0,p=f.length;m<p;m++){const b=f[m];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,p=v.length;m<p;m++){const b=v[m],w=b[0]+u,_=b[1]+u,L=b[2]+u;n.push(w,_,L),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Y_(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new $r(n,t.curveSegments)}}function Y_(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class be extends Vs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=au,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Yl={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class j_{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Z_=new j_;class mc{constructor(t){this.manager=t!==void 0?t:Z_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}mc.DEFAULT_MATERIAL_NAME="__DEFAULT";class J_ extends mc{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Yl.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=Ps("img");function c(){h(),Yl.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class K_ extends mc{constructor(t){super(t)}load(t,e,n,s){const r=new Te,o=new J_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Uu extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Q_ extends Uu{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Io=new oe,jl=new I,Zl=new I;class tx{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cc,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;jl.setFromMatrixPosition(t.matrixWorld),e.position.copy(jl),Zl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zl),e.updateMatrixWorld(),Io.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Io),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Io)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class ex extends tx{constructor(){super(new yu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Jl extends Uu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new ex}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Kl=new oe;class nx{constructor(t,e,n=0,s=1/0){this.ray=new du(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ac,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Kl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Kl),this}intersectObject(t,e=!0,n=[]){return Oa(t,this,n,e),n.sort(Ql),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Oa(t[s],this,n,e);return n.sort(Ql),n}}function Ql(i,t){return i.distance-t.distance}function Oa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Oa(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ka}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ka);function _e(i,t=0,e=new I){return e.set(i.x,t,-i.y)}function ix(i){return{x:i.x,y:-i.z}}const sx=["anchor-dark","anchor-light","helm-dark","helm-light","chest-dark","chest-light","captain"],rx=["clack","rail","peg","lip","rescue","sink","overboard","win"],_y={clack:"Chip hits chip",rail:"Chip hits the frame",peg:"Chip hits a peg",lip:"Rattle on a lifeboat edge",rescue:"Sailor into a lifeboat",sink:"Shooter or shark-water drop",overboard:"Chip flies out of the water",win:"Win fanfare"},ox=`Your crew of sailors have been involved in a daring encounter at sea and the ship has gone down in
battle. It's up to you to rescue each sailor and save the Captain from the wreckage. But as all sailors know, the
Captain refuses to be rescued until every sailor is safe.`,ax=`<h3>On your turn</h3>
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
</ul>`,Un=(i=1)=>({url:null,volume:i}),Nu=Object.freeze({version:1,room:{background:"#140c07",tableColor:"#462d1e",tableImage:null,fog:!0,light:1},frame:{woodColor:"#70482a",image:null},deck:{color:"#deb87c",grain:1,image:null},rope:{color:"#462d19",width:1,style:"twist",image:null},helm:{color:"#462d19",size:1,image:null},tokens:{edgeColor:"#c99a74",faceTint:"#ffffff",faces:{"anchor-dark":null,"anchor-light":null,"helm-dark":null,"helm-light":null,"chest-dark":null,"chest-light":null,captain:null}},shooter:{edgeColor:"#b98262",faceColor:"#d6ac84",faceImage:null,band:{color:"#b3312c",width:.16,image:null}},text:{logo:null,tagline:"The Legendary Rescue",story:ox,rules:ax,credit:"Created by Justin Thomae · Est. 2016"},fonts:{title:"IM Fell English",body:""},sounds:{clack:Un(),rail:Un(),peg:Un(),lip:Un(),rescue:Un(),sink:Un(),overboard:Un(),win:Un()},music:{tracks:[],volume:.5,shuffle:!1}}),cx=i=>typeof i=="string"&&/^#[0-9a-f]{6}$/i.test(i),Fu=i=>typeof i=="string"&&i.length<5e6&&(/^https:\/\//.test(i)||/^data:(image|audio)\//.test(i)||/^\.?\/[\w./-]+$/.test(i)),ii=(i,t,e,n)=>typeof i=="number"&&Number.isFinite(i)?Math.min(n,Math.max(e,i)):t,Do=(i,t,e=200)=>typeof i=="string"?i.slice(0,e):t,$e=(i,t)=>cx(i)?i.toLowerCase():t,Qe=i=>Fu(i)?i:null,th=(i,t)=>typeof i=="boolean"?i:t,we=i=>i&&typeof i=="object"&&!Array.isArray(i)?i:{},eh=(i,t)=>typeof i=="string"&&/^[\w \-]{0,60}$/.test(i)?i.trim():t;function nh(i,t=2e4){if(typeof i!="string")return"";const e=new Set(["b","strong","i","em","u","br","p","h3","ul","ol","li"]);return i.slice(0,t).replace(/<!--[\s\S]*?-->/g,"").replace(/<(script|style|iframe|object|embed|svg|math)[\s\S]*?<\/\1>/gi,"").replace(/<\/?([a-z0-9]+)(\s[^>]*)?>/gi,(n,s)=>{const r=s.toLowerCase();return e.has(r)?n.startsWith("</")?`</${r}>`:`<${r}>`:""})}function qr(i){const t=Nu,e=we(i),n=we(e.room),s=we(e.frame),r=we(e.deck),o=we(e.rope),a=we(e.helm),c=we(e.tokens),l=we(c.faces),h=we(e.shooter),u=we(h.band),d=we(e.text),f=we(e.fonts),g=we(e.sounds),v=we(e.music);return{version:1,room:{background:$e(n.background,t.room.background),tableColor:$e(n.tableColor,t.room.tableColor),tableImage:Qe(n.tableImage),fog:th(n.fog,t.room.fog),light:ii(n.light,t.room.light,.3,2)},frame:{woodColor:$e(s.woodColor,t.frame.woodColor),image:Qe(s.image)},deck:{color:$e(r.color,t.deck.color),grain:ii(r.grain,t.deck.grain,0,2),image:Qe(r.image)},rope:{color:$e(o.color,t.rope.color),width:ii(o.width,t.rope.width,.3,4),style:o.style==="solid"||o.style==="dashed"?o.style:"twist",image:Qe(o.image)},helm:{color:$e(a.color,t.helm.color),size:ii(a.size,t.helm.size,.3,3),image:Qe(a.image)},tokens:{edgeColor:$e(c.edgeColor,t.tokens.edgeColor),faceTint:$e(c.faceTint,t.tokens.faceTint),faces:Object.fromEntries(sx.map(m=>[m,Qe(l[m])]))},shooter:{edgeColor:$e(h.edgeColor,t.shooter.edgeColor),faceColor:$e(h.faceColor,t.shooter.faceColor),faceImage:Qe(h.faceImage),band:{color:$e(u.color,t.shooter.band.color),width:ii(u.width,t.shooter.band.width,0,.45),image:Qe(u.image)}},text:{logo:Qe(d.logo),tagline:Do(d.tagline,t.text.tagline,120),story:nh(d.story??t.text.story,4e3),rules:d.rules===void 0?t.text.rules:nh(d.rules),credit:Do(d.credit,t.text.credit,160)},fonts:{title:eh(f.title,t.fonts.title)||t.fonts.title,body:eh(f.body,t.fonts.body)},sounds:Object.fromEntries(rx.map(m=>{const p=we(g[m]);return[m,{url:Qe(p.url),volume:ii(p.volume,1,0,2)}]})),music:{tracks:(Array.isArray(v.tracks)?v.tracks:[]).map(m=>we(m)).filter(m=>Fu(m.url)).slice(0,30).map(m=>({name:Do(m.name,"Track",80)||"Track",url:m.url})),volume:ii(v.volume,t.music.volume,0,1),shuffle:th(v.shuffle,t.music.shuffle)}}}let Us=qr(Nu);const ka=new Set;function ve(){return Us}function Ou(i){Us=qr(i),ka.forEach(t=>t(Us))}function lx(i){return ka.add(i),()=>ka.delete(i)}const Ba=new Map;function hx(i){return new Promise(t=>{const e=new Image;e.crossOrigin="anonymous",e.decoding="async",e.onload=()=>t(e),e.onerror=()=>t(null),e.src=i})}function ux(i){const t=[i.room.tableImage,i.frame.image,i.deck.image,i.rope.image,i.helm.image,i.shooter.faceImage,i.shooter.band.image,...Object.values(i.tokens.faces)];return[...new Set(t.filter(e=>!!e))]}async function gc(i=Us,t=8e3){const e=ux(i).filter(s=>!Ba.has(s));if(!e.length)return;const n=Promise.all(e.map(async s=>Ba.set(s,await hx(s))));await Promise.race([n,new Promise(s=>setTimeout(s,t))])}function Vn(i){return i?Ba.get(i)??null:null}const dx=new Set(["IM Fell English"]);function ku(i=Us){const t=document.documentElement,e=(o,a)=>o?`'${o}', ${a}`:a;t.style.setProperty("--font-title",e(i.fonts.title,"Georgia, serif")),t.style.setProperty("--font-body",e(i.fonts.body,"ui-rounded, 'SF Pro Rounded', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif")),t.style.setProperty("--room",i.room.background);const n=[i.fonts.title,i.fonts.body].filter(o=>o&&!dx.has(o)),s="theme-fonts";let r=document.getElementById(s);if(n.length){const o=`https://fonts.googleapis.com/css2?${n.map(a=>`family=${encodeURIComponent(a).replace(/%20/g,"+")}`).join("&")}&display=swap`;r||(r=document.createElement("link"),r.id=s,r.rel="stylesheet",document.head.append(r)),r.href!==o&&(r.href=o)}else r?.remove()}function En(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2D canvas unavailable");return[e,n]}function Xi(i){const t=parseInt(i.slice(1),16);return[t>>16&255,t>>8&255,t&255]}function ts(i,t,e,n,s,r){const o=Math.max(s/t.width,r/t.height),a=s/o,c=r/o;i.drawImage(t,(t.width-a)/2,(t.height-c)/2,a,c,e,n,s,r)}function mi(i,t){const e=new Tu(i);return e.colorSpace=Ee,e.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy()),e.needsUpdate=!0,e}function es(i){const t=(n,s)=>{let r=n*374761393+s*668265263+i*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296},e=n=>n*n*(3-2*n);return(n,s)=>{const r=Math.floor(n),o=Math.floor(s),a=e(n-r),c=e(s-o),l=t(r,o),h=t(r+1,o),u=t(r,o+1),d=t(r+1,o+1);return l+(h-l)*a+(u-l)*c+(l-h-u+d)*a*c}}function fx(i,t){const e=t.size??2048,n=ve(),s=t.geometry.spec.radius,r=A=>[(A.x/s*.5+.5)*e,(1-(A.y/s*.5+.5))*e],o=e/(2*s),[a,c]=En(e,e);c.imageSmoothingQuality="high";const l=Vn(n.deck.image);if(l)ts(c,l,0,0,e,e);else{const A=e/2,[P,M]=En(A,A),x=M.createImageData(A,A),C=es(11),B=es(23),[D,k,G]=Xi(n.deck.color),H=n.deck.grain;for(let J=0;J<A;J++)for(let V=0;V<A;V++){const it=V/A,tt=J/A,ht=C(it*3,tt*2)*6+B(it*9,tt*6)*.8,Ct=Math.sin((tt*9+ht)*Math.PI),Wt=Math.pow(Math.abs(Ct),6),Y=B(it*220,tt*40)*.05,rt=1-(Wt*.18+Y-C(it*2,tt*5)*.06)*H,vt=(J*A+V)*4;x.data[vt]=Math.min(255,D*rt),x.data[vt+1]=Math.min(255,k*rt),x.data[vt+2]=Math.min(255,G*rt),x.data[vt+3]=255}M.putImageData(x,0,0),c.drawImage(P,0,0,e,e)}const[h,u,d]=Xi(n.rope.color),f=`rgba(${h},${u},${d},0.85)`,g=Vn(n.rope.image);for(const A of t.geometry.ropes){const[P,M]=r(A.start),[x,C]=r(A.end),B=Math.hypot(x-P,C-M),D=(x-P)/B,k=(C-M)/B,G=o*.0045*n.rope.width,H=o*(t.geometry.spec.pocketRadius+t.geometry.spec.shooterRadius)*.45,J=P-D*H,V=M-k*H,it=B+H*2;if(g){c.save(),c.translate(J,V),c.rotate(Math.atan2(k,D));const tt=G*2.6,ht=g.width/g.height*tt;c.beginPath(),c.rect(0,-tt/2,it,tt),c.clip();for(let Ct=0;Ct<it;Ct+=ht)c.drawImage(g,Ct,-tt/2,ht,tt);c.restore();continue}if(c.strokeStyle=f,c.fillStyle=f,c.lineWidth=Math.max(1,o*.0011*Math.sqrt(n.rope.width)),n.rope.style==="solid"){c.lineWidth=G*1.4,c.beginPath(),c.moveTo(J,V),c.lineTo(J+D*it,V+k*it),c.stroke();continue}if(n.rope.style==="dashed"){c.lineWidth=G*1.2,c.setLineDash([G*3,G*2]),c.beginPath(),c.moveTo(J,V),c.lineTo(J+D*it,V+k*it),c.stroke(),c.setLineDash([]);continue}for(const tt of[-1,1])c.beginPath(),c.moveTo(J-k*G*tt,V+D*G*tt),c.lineTo(J+D*it-k*G*tt,V+k*it+D*G*tt),c.stroke();for(let tt=0;tt<it;tt+=G*1.6){const ht=J+D*tt,Ct=V+k*tt;c.beginPath(),c.moveTo(ht-k*G-D*G*.7,Ct+D*G-k*G*.7),c.lineTo(ht+k*G+D*G*.7,Ct-D*G+k*G*.7),c.stroke()}}const[v,m]=r({x:0,y:0}),p=o*.075*n.helm.size,[b,w,_]=Xi(n.helm.color),L=`rgba(${b},${w},${_},0.85)`,E=Vn(n.helm.image);if(c.save(),c.translate(v,m),E){const A=p*2.5,P=Math.min(A/E.width,A/E.height);c.drawImage(E,-E.width*P/2,-E.height*P/2,E.width*P,E.height*P),c.restore()}else{c.strokeStyle=L,c.fillStyle=L,c.lineWidth=p*.09,c.beginPath(),c.arc(0,0,p*.78,0,Math.PI*2),c.stroke(),c.lineWidth=p*.05,c.beginPath(),c.arc(0,0,p*.62,0,Math.PI*2),c.stroke(),c.beginPath(),c.arc(0,0,p*.14,0,Math.PI*2),c.fill();for(let A=0;A<8;A++){const P=A*Math.PI/4+Math.PI/8;c.lineWidth=p*.07,c.beginPath(),c.moveTo(Math.cos(P)*p*.14,Math.sin(P)*p*.14),c.lineTo(Math.cos(P)*p*1.12,Math.sin(P)*p*1.12),c.stroke(),c.beginPath(),c.ellipse(Math.cos(P)*p*1.15,Math.sin(P)*p*1.15,p*.09,p*.06,P,0,Math.PI*2),c.fill()}c.restore()}return t.geometry.pockets.forEach((A,P)=>{if(t.pocketRoles[P]!=="shark")return;const[M,x]=r(A),C=t.geometry.spec.pocketRadius*o;c.strokeStyle="rgba(200,40,40,0.75)",c.lineWidth=C*.16,c.setLineDash([C*.25,C*.15]),c.beginPath(),c.arc(M,x,C*1.12,0,Math.PI*2),c.stroke(),c.setLineDash([])}),mi(a,i)}function px(i,t,e){const s=ve(),r=Vn(s.frame.image);if(r){const[v,m]=En(1024,1024);return ts(m,r,0,0,1024,1024),mi(v,i)}const[o,a,c]=Xi(s.frame.woodColor),l=es(5),h=es(9),[u,d]=En(1024,1024),f=d.createImageData(1024,1024),g=t.rails.map(v=>({n:v.normal,t:{x:-v.normal.y,y:v.normal.x}}));for(let v=0;v<1024;v++)for(let m=0;m<1024;m++){const p=(m/1024*2-1)*e,b=(1-v/1024*2)*e;let w=0,_=-1/0;for(let B=0;B<6;B++){const D=-(g[B].n.x*p+g[B].n.y*b);D>_&&(_=D,w=B)}const L=g[w].t.x*p+g[w].t.y*b,E=L>0?1:0,A=_*60+l(L*3+E*17,_*8)*2.2,P=Math.abs(Math.sin(A*Math.PI)),M=h(L*140,_*30);let x=.62+.18*Math.pow(P,3)+.1*M+(E?.04:-.02)+(w%2?.03:0);Math.abs(L)<.004&&(x*=.55);const C=(v*1024+m)*4;f.data[C]=o*x,f.data[C+1]=a*x,f.data[C+2]=c*x,f.data[C+3]=255}return d.putImageData(f,0,0),mi(u,i)}function mx(i){const e=ve(),n=Vn(e.room.tableImage);if(n){const[d,f]=En(512,512);ts(f,n,0,0,512,512);const g=mi(d,i);return g.wrapS=g.wrapT=As,g}const[s,r,o]=Xi(e.room.tableColor),a=es(31),[c,l]=En(512,512),h=l.createImageData(512,512);for(let d=0;d<512;d++)for(let f=0;f<512;f++){const g=f/512,v=d/512,m=Math.abs(Math.sin((v*22+a(g*4,v*8)*3)*Math.PI)),p=.7+.2*Math.pow(m,4)+a(g*60,v*9)*.1,b=(d*512+f)*4;h.data[b]=s*p,h.data[b+1]=r*p,h.data[b+2]=o*p,h.data[b+3]=255}l.putImageData(h,0,0);const u=mi(c,i);return u.wrapS=u.wrapT=Dr,u}function gx(i){const e=ve().shooter,[n,s]=En(256,256),[r,o,a]=Xi(e.faceColor),c=es(77),l=s.createImageData(256,256);for(let d=0;d<256;d++)for(let f=0;f<256;f++){const g=Math.hypot(f-38.4,d+153.6)/256,v=Math.abs(Math.sin((g*26+c(f/30,d/30)*.6)*Math.PI)),m=.93+.05*Math.pow(v,6)+c(f/6,d/40)*.05,p=(d*256+f)*4;l.data[p]=Math.min(255,r*m),l.data[p+1]=Math.min(255,o*m),l.data[p+2]=Math.min(255,a*m),l.data[p+3]=255}s.putImageData(l,0,0);const h=Vn(e.faceImage);h&&ts(s,h,0,0,256,256);const u=e.band.width*(256/2);if(u>.5){s.save(),s.beginPath(),s.arc(256/2,256/2,256/2,0,Math.PI*2),s.arc(256/2,256/2,256/2-u,0,Math.PI*2,!0),s.clip();const d=Vn(e.band.image);d?ts(s,d,0,0,256,256):(s.fillStyle=e.band.color,s.fillRect(0,0,256,256)),s.restore(),s.strokeStyle="rgba(0,0,0,0.35)",s.lineWidth=2,s.beginPath(),s.arc(256/2,256/2,256/2-u,0,Math.PI*2),s.stroke()}return mi(n,i)}const ih=new Map;function Bu(i,t,e){const n=Dh(e)??"captain",s=ve().tokens.faces[n],r=Vn(s);if(!r||!s)return _x(t,e);let o=ih.get(s);if(!o){const[l,h]=En(256,256);ts(h,r,0,0,256,256),o=l,ih.set(s,o)}const a=new Tu(o);return a.colorSpace=Ee,a.anisotropy=Math.min(8,i.capabilities.getMaxAnisotropy()),a}const $i={"anchor-dark":0,"anchor-light":6,"helm-dark":8,"helm-light":2,"chest-dark":20,"chest-light":14,captain:15},vx="./textures/chips.jpg",xr=8,sh=4;function zu(i,t){const e=new K_().load(vx,t);return e.colorSpace=Ee,e.anisotropy=Math.min(8,i.capabilities.getMaxAnisotropy()),e}function _x(i,t){const e=i.clone();return e.repeat.set(1/xr,1/sh),e.offset.set(t%xr/xr,1-(Math.floor(t/xr)+1)/sh),e}function xx(i){const[t,e]=En(64,16);e.clearRect(0,0,64,16),e.fillStyle="#ffffff",e.beginPath(),e.roundRect(4,2,34,12,6),e.fill();const n=mi(t,i);return n.wrapS=As,n}const gn=.0035;function yx(){const i=new Ws(1,1);return i.rotateX(-Math.PI/2),i}function yr(i,t,e,n,s=gn){const r=e.x-t.x,o=e.y-t.y,a=Math.hypot(r,o);return _e({x:(t.x+e.x)/2,y:(t.y+e.y)/2},s,i.position),i.rotation.set(0,Math.atan2(o,r),0),i.scale.set(Math.max(a,1e-4),1,n),a}class Mx{constructor(t,e){O(this,"group",new kn);O(this,"rope");O(this,"ropeMat");O(this,"shooterRing");O(this,"ringMat");O(this,"arrowBody");O(this,"arrowHead");O(this,"arrowMat");O(this,"guide");O(this,"guideMat");O(this,"ghost");O(this,"push");O(this,"pocketMarkers",[]);O(this,"markerMats",[]);O(this,"beacons",[]);O(this,"beaconMats",[]);O(this,"disposables",[]);O(this,"time",0);O(this,"callable",[]);O(this,"called",null);this.g=e;const n=yx();this.disposables.push(n);const s=(d,f=1)=>{const g=new Nr({color:d,transparent:!0,opacity:f,depthWrite:!1});return this.disposables.push(g),g};this.ropeMat=s("#fff2b0",.35),this.rope=new Jt(n,this.ropeMat),this.rope.renderOrder=1;const r=new Ss(1,1.25,48);r.rotateX(-Math.PI/2),this.disposables.push(r),this.ringMat=s("#ffffff",.85),this.shooterRing=new Jt(r,this.ringMat),this.shooterRing.renderOrder=2,this.arrowMat=s("#7be07b",.9),this.arrowBody=new Jt(n,this.arrowMat);const o=new hi([new st(0,-.5),new st(1,0),new st(0,.5)]),a=new $r(o);a.rotateX(-Math.PI/2),this.disposables.push(a),this.arrowHead=new Jt(a,this.arrowMat),this.arrowBody.renderOrder=this.arrowHead.renderOrder=3;const c=xx(t);this.disposables.push(c),this.guideMat=new Nr({map:c,transparent:!0,opacity:.8,depthWrite:!1}),this.disposables.push(this.guideMat),this.guide=new Jt(n,this.guideMat),this.guide.renderOrder=2;const l=new Ss(.9,1,40);l.rotateX(-Math.PI/2),this.disposables.push(l),this.ghost=new Jt(l,s("#ffffff",.7)),this.push=new Jt(n,s("#ffd166",.85));const h=new Ss(1,1.22,48);h.rotateX(-Math.PI/2);const u=new pc(.035,.08,20);u.rotateX(Math.PI),this.disposables.push(h,u);for(let d=0;d<e.pockets.length;d++){const f=s("#ffd166",.9),g=new Jt(h,f);_e(e.pockets[d],gn*2,g.position),g.renderOrder=4,g.visible=!1,this.pocketMarkers.push(g),this.markerMats.push(f),this.group.add(g);const v=new be({color:"#ffffff",emissive:"#ffd166",emissiveIntensity:.6,roughness:.4});this.disposables.push(v);const m=new Jt(u,v);_e(e.pockets[d],.12,m.position),m.visible=!1,m.castShadow=!0,this.beacons.push(m),this.beaconMats.push(v),this.group.add(m)}this.group.add(this.rope,this.shooterRing,this.arrowBody,this.arrowHead,this.guide,this.ghost,this.push),this.hideAll()}hideAll(){this.rope.visible=!1,this.shooterRing.visible=!1,this.clearAim(),this.setCallable([],null)}showRope(t,e){yr(this.rope,t.start,t.end,.025,gn*.5),this.ropeMat.color.set(e),this.rope.visible=!0}showShooter(t,e,n){_e(t,gn,this.shooterRing.position),this.shooterRing.scale.setScalar(e*1.15),this.ringMat.color.set(n?"#ffffff":"#ff4d4d"),this.shooterRing.visible=!0}clearAim(){this.arrowBody.visible=this.arrowHead.visible=this.guide.visible=this.ghost.visible=this.push.visible=!1}showAim(t,e,n,s,r){const o=new Xt().setHSL(.33-.33*n,.85,.55);this.arrowMat.color.copy(o);const a={x:t.x+e.x*s*1.4,y:t.y+e.y*s*1.4},c=.05+n*.32,l={x:a.x+e.x*c,y:a.y+e.y*c};if(yr(this.arrowBody,a,l,.022,gn*3),_e(l,gn*3,this.arrowHead.position),this.arrowHead.rotation.set(0,Math.atan2(e.y,e.x),0),this.arrowHead.scale.set(.06,1,.07),this.arrowBody.visible=this.arrowHead.visible=!0,r&&r.distance>s*.5){const h=yr(this.guide,t,r.point,.012,gn*2);if(this.guideMat.map.repeat.set(h/.05,1),this.guide.visible=!0,_e(r.point,gn*2,this.ghost.position),this.ghost.scale.setScalar(s),this.ghost.visible=!0,r.hit?.type==="piece"){const u=r.hit.push,d={x:r.point.x+u.x*s*2.2,y:r.point.y+u.y*s*2.2};yr(this.push,d,{x:d.x+u.x*.18,y:d.y+u.y*.18},.01,gn*2),this.push.visible=!0}else this.push.visible=!1}else this.guide.visible=this.ghost.visible=this.push.visible=!1}setCallable(t,e){this.callable=t,this.called=e,this.pocketMarkers.forEach((n,s)=>n.visible=t.includes(s)),this.beacons.forEach((n,s)=>n.visible=t.includes(s))}update(t){this.time+=t;const e=.5+.5*Math.sin(this.time*4);this.ropeMat.opacity=.22+.2*e;const n=this.g.spec.pocketRadius;for(const s of this.callable){const r=this.pocketMarkers[s],o=s===this.called;r.scale.setScalar(n*(o?1.75:1.6+.15*e)),this.markerMats[s].color.set(o?"#ffd166":"#ffffff"),this.markerMats[s].opacity=o?1:.5+.4*e;const a=this.beacons[s];a.position.y=(o?.1:.12)+Math.sin(this.time*5+s)*.015,a.scale.setScalar(o?1.35:1),this.beaconMats[s].color.set(o?"#ffd166":"#ffffff"),this.beaconMats[s].emissiveIntensity=o?.9:.3+.3*e}}dispose(){this.disposables.forEach(t=>t.dispose())}}const rh=.03,Uo=.17,oh=.05,Ni=-.07,Mr=.027,ah=.065,ch=.3,Sr=i=>new st(i.x,i.y);function Hu(i,t,e,n,s,r=20){let o=n-e;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;const a=[];for(let c=0;c<=r;c++){const l=e+o*c/r;a.push({x:i.x+Math.cos(l)*t,y:i.y+Math.sin(l)*t})}return a}function Sx(i){const t=i.spec.pocketRadius,e=[];for(let n=0;n<6;n++){const s=i.corners[n],r=i.corners[(n+1)%6],o=Math.hypot(r.x-s.x,r.y-s.y),a={x:(r.x-s.x)/o,y:(r.y-s.y)/o},c=i.corners[(n+2)%6],l={x:(c.x-r.x)/o,y:(c.y-r.y)/o},h=i.pockets[(n+1)%6],u=lh(s,a,h,t,-1),d=lh(r,l,h,t,1);e.push(...Hu(h,t,Math.atan2(u.y-h.y,u.x-h.x),Math.atan2(d.y-h.y,d.x-h.x)))}return e}function lh(i,t,e,n,s){const r=e.x-i.x,o=e.y-i.y,a=r*t.x+o*t.y,c=r*r+o*o-a*a,l=a+s*Math.sqrt(Math.max(0,n*n-c));return{x:i.x+t.x*l,y:i.y+t.y*l}}function hh(i,t,e){const n=t/(Math.sqrt(3)/2),s=[];for(let r=0;r<6;r++){const o=i.corners[r],a=Math.hypot(o.x,o.y),c={x:o.x/a,y:o.y/a},l={x:c.x*(n-e/(Math.sqrt(3)/2)),y:c.y*(n-e/(Math.sqrt(3)/2))},h=Math.atan2(c.y,c.x);s.push(...Hu(l,e,h+Math.PI/6,h-Math.PI/6,!1,20))}return s}function wx(i,t){const e=t.geometry,n=new kn,s=[],r=_t=>(s.push(_t),_t),o=_t=>(_t.rotateX(-Math.PI/2),_t),a=new hi(Sx(e).map(Sr)),c=r(o(new Ms(a,{depth:rh,bevelEnabled:!1,curveSegments:24})));c.translate(0,-rh,0);const l=r(fx(i,{geometry:e,pocketRoles:t.pocketRoles}));l.repeat.set(.5/e.spec.radius,.5/e.spec.radius),l.offset.set(.5,.5);const h=new Jt(c,[r(new be({map:l,roughness:.62})),r(new be({color:"#2a1a0e",roughness:.95}))]);h.receiveShadow=!0,n.add(h);const u=e.apothem+Uo,d=hh(e,u,ch),f=new hi(d.map(Sr)),g=.006;f.holes.push(new Ua(hh(e,e.apothem+g,ch-Uo).map(Sr).reverse()));const v=oh-Ni,m=r(o(new Ms(f,{depth:v,bevelEnabled:!0,bevelThickness:.008,bevelSize:g,bevelSegments:3,curveSegments:24})));m.translate(0,Ni,0);const p=Math.max(...d.map(_t=>Math.hypot(_t.x,_t.y))),b=r(px(i,e,p));b.repeat.set(.5/p,.5/p),b.offset.set(.5,.5);const w=new Jt(m,r(new be({map:b,roughness:.38,metalness:.02})));w.castShadow=!0,w.receiveShadow=!0,n.add(w);const _=r(o(new $r(new hi(d.map(Sr))))),L=new Jt(_,r(new be({color:"#2b1a10",roughness:.9})));L.position.y=Ni+.001,n.add(L);const E=-Ni-.008,A=e.spec.pocketRadius,P=r(new Wi(A,A,E,48,1,!0)),M=r(new be({color:"#1e120a",roughness:.95,side:Pe})),x=r(o(new Gi(A,48))),C=r(new be({color:"#3b2615",roughness:.9})),B=r(new be({color:"#1d3b52",roughness:.3,emissive:"#06121c"}));e.pockets.forEach((_t,$)=>{const Q=new Jt(P,M);_e(_t,-E/2-.003,Q.position),n.add(Q);const R=new Jt(x,t.pocketRoles[$]==="shark"?B:C);_e(_t,-E+.002,R.position),R.receiveShadow=!0,n.add(R)});const D=new hi([new st(-.035,0),new st(.03,0),new st(-.02,.05)]),k=r(new Ms(D,{depth:.008,bevelEnabled:!1}));k.translate(0,0,-.004);const G=r(new be({color:"#56626c",roughness:.5})),H=[];e.pockets.forEach((_t,$)=>{if(t.pocketRoles[$]!=="shark")return;const Q=new Jt(k,G);n.add(Q),H.push({mesh:Q,centre:_t,phase:$})});const J=r(new Wi(e.spec.postRadius,e.spec.postRadius,ah,20)),V=r(new be({color:"#d8bf8c",roughness:.55}));for(const _t of e.posts){const $=new Jt(J,V);_e(_t,ah/2,$.position),$.castShadow=!0,n.add($)}const it=r(new Wi(.052,.052,.004,40)),tt=r(o(new Gi(.044,40))),ht=r(zu(i,()=>{})),Ct=new Map,Wt=_t=>{let $=Ct.get(_t);return $||($=r(new be({map:r(Bu(i,ht,_t)),roughness:.6})),Ct.set(_t,$)),$},Y=[];e.rails.forEach((_t,$)=>{const Q=t.seatColors[$];if(!Q)return void Y.push(null);const R=new Jt(it,r(new be({color:Q,roughness:.4,metalness:.2}))),bt=e.apothem+Uo*.5;_e({x:-_t.normal.x*bt,y:-_t.normal.y*bt},oh+.009,R.position),n.add(R);const nt=new Jt(tt,Wt(0));nt.position.copy(R.position),nt.position.y+=.0025,nt.rotation.y=Math.atan2(-_t.normal.x,_t.normal.y),nt.visible=!1,n.add(nt),Y.push(nt)});const rt=_t=>{Y.forEach(($,Q)=>{if(!$)return;const R=_t[Q];$.visible=R!=null,$.visible&&($.material=Wt(R))})},vt=r(mx(i));vt.repeat.set(6,6);const at=new Jt(r(o(new Gi(9,64))),r(new be({map:vt,roughness:.7})));at.position.y=Ni,at.receiveShadow=!0,n.add(at);const Lt=u+.13,Nt=(_t,$=new I)=>_e(e.pockets[_t],-E+.004,$),It=_t=>{for(const $ of H){const Q=_t*1.6+$.phase,R=A*.55;_e({x:$.centre.x+Math.cos(Q)*R,y:$.centre.y+Math.sin(Q)*R},-E+.004,$.mesh.position),$.mesh.rotation.y=Math.atan2(Math.cos(Q),-Math.sin(Q))}};return{group:n,pocketDepth:Nt,extent:Lt+.05,setSeatSymbols:rt,update:It,dispose:()=>s.forEach(_t=>_t.dispose())}}const uh=new I(0,1,0),bx=i=>i*37%11/11*1.2-.6,Ex=new ss;class dh{constructor(t,e,n){O(this,"group",new kn);O(this,"views",new Map);O(this,"disposables",[]);O(this,"shooter");this.board=e;const s=de(n,"sailor"),r=Mr,o=.004,a=new fc([new st(0,0),new st(s-o,0),new st(s,o),new st(s,r-o),new st(s-o,r),new st(0,r)],40),c=new Gi(s-o*.5,40);c.rotateX(-Math.PI/2),c.translate(0,r+3e-4,0),this.disposables.push(a,c);const l=zu(t,()=>{});this.disposables.push(l);const h=ve(),u=new be({color:h.tokens.edgeColor,roughness:.55}),d=new be({color:h.shooter.edgeColor,roughness:.5});this.disposables.push(u,d);const f=(g,v,m="#ffffff")=>{const p=new be({map:g,roughness:.6,color:m});this.disposables.push(g,p);const b=new kn,w=new Jt(a,v),_=new Jt(c,p);return w.castShadow=_.castShadow=!0,w.receiveShadow=!0,b.add(w,_),b};for(const g of n.pieces){const v=f(Bu(t,l,g.face),u,h.tokens.faceTint);v.name=g.id,this.group.add(v),this.views.set(g.id,{obj:v,tweens:[],yaw:0})}this.shooter=f(gx(t),d),this.shooter.name="shooter",this.group.add(this.shooter),this.views.set("shooter",{obj:this.shooter,tweens:[],yaw:0}),this.syncToState(n,!1)}setLive(t,e,n=0,s=0){const r=this.views.get(t);!r||r.tweens.length||(_e(e,s*Mr,r.obj.position),this.orient(r,n),r.obj.visible=!0)}drop(t,e,n,s,r=0,o=0){const a=this.views.get(t);if(!a)return;const c=this.pocketSlot(e,n),l=Math.hypot(r,o),h=l>1e-6?new I(-o/l,0,-r/l):new I(1,0,0),u=.6+Math.min(1,l/2.5)*.9;a.tweens=[{from:a.obj.position.clone(),to:c,t:0,dur:.24+Math.min(.12,l*.03),arc:0,hideAtEnd:s,yaw:a.yaw+bx(n),tilt:{axis:h,angle:u}}]}fly(t,e,n,s,r,o){const a=this.views.get(t);if(!a)return;const c=Math.hypot(s,r)||1,l=.3+Math.min(.25,c*.04),h=_e({x:e+s/c*l,y:n+r/c*l},Ni),u=new I(-r/c,0,-s/c);a.tweens=[{from:a.obj.position.clone(),to:h,t:0,dur:.5,arc:.22,hideAtEnd:o,yaw:a.yaw+2.5,tilt:{axis:u,angle:Math.PI*2,spin:!0}}]}pocketSlot(t,e){const n=this.board.pocketDepth(t),s=Math.floor(e/7),r=e%7,o=r===0?0:.076,a=(r-1)*(Math.PI/3)+s*.5;return n.x+=Math.cos(a)*o,n.z+=Math.sin(a)*o,n.y+=s*Mr+(r===0?0:e*7%5*.0015),n}orient(t,e){t.yaw=e,t.obj.quaternion.setFromAxisAngle(uh,e)}syncToState(t,e){const n=new Map,s=new Map(t.pieces.map(l=>[l.id,l])),r=l=>{let h=0;for(let u=l;u&&u.loc.at==="board"&&u.loc.on!==void 0&&h<64;h++)u=s.get(u.loc.on);return h};for(const l of t.pieces)l.loc.at==="board"&&n.set(l.id,{pos:_e(l.loc,r(l)*Mr),visible:!0,yaw:l.loc.a??0});const o=t.pieces.filter(l=>l.loc.at==="pocket").sort((l,h)=>l.loc.at==="pocket"&&h.loc.at==="pocket"?l.loc.order-h.loc.order:0),a=new Map;for(const l of o){if(l.loc.at!=="pocket")continue;const h=l.loc.pocket,u=a.get(h)??0;a.set(h,u+1);const d=t.pocketRoles[h]==="shark",f=this.views.get(l.id);n.set(l.id,{pos:this.pocketSlot(h,u),visible:!d,yaw:f.yaw})}let c=0;for(const[l,h]of n){const u=this.views.get(l),d=u.tweens[u.tweens.length-1],f=d?d.to.clone():u.obj.position.clone(),g=f.distanceTo(h.pos)>1e-4;if(!e){u.tweens=[],u.obj.position.copy(h.pos),this.orient(u,h.yaw),u.obj.visible=h.visible;continue}if(!g){d||this.orient(u,h.yaw),!h.visible&&!d&&(u.obj.visible=!1);continue}const v=.55+Math.min(.4,f.distanceTo(h.pos)*.25);u.tweens.push({from:f.clone(),to:f.clone(),t:0,dur:c,arc:0,hideAtEnd:!1},{from:f,to:h.pos,t:0,dur:v,arc:Math.min(.25,f.distanceTo(h.pos)*.6),hideAtEnd:!h.visible,yaw:h.yaw}),c+=.06}}static heapSizes(t){const e=[0,0,0,0,0,0];for(const n of t.pieces)n.loc.at==="pocket"&&e[n.loc.pocket]++;return e}placeShooter(t,e=!1){const n=this.views.get("shooter");if(!t){n.tweens=[],this.shooter.visible=!1;return}const s=_e(t,0),r=n.obj.position.clone(),o=r.distanceTo(s);if(e&&o>.01){const a=!this.shooter.visible||r.y<-.01||n.tweens.length>0,c=s.x-r.x,l=s.z-r.z,h=Math.hypot(c,l)||1;n.tweens=[{from:r,to:s,t:0,dur:Math.min(1,.45+o*.28),arc:Math.min(.45,.08+o*.16),hideAtEnd:!1,yaw:0,tilt:a?{axis:new I(l/h,0,-c/h),angle:Math.PI*2,spin:!0}:void 0}],this.shooter.visible=!0;return}n.tweens=[],this.shooter.visible=!0,this.shooter.position.copy(s),this.orient(n,0)}get busy(){for(const t of this.views.values())if(t.tweens.length)return!0;return!1}update(t){for(const e of this.views.values()){const n=e.tweens[0];if(!n)continue;n.t+=t;const s=n.dur<=0?1:Math.min(1,n.t/n.dur),r=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;if(e.obj.position.lerpVectors(n.from,n.to,r),e.obj.position.y+=Math.sin(Math.PI*r)*n.arc,n.yaw!==void 0||n.tilt){const o=n.yaw===void 0?e.yaw:e.yaw+(n.yaw-e.yaw)*r;if(e.obj.quaternion.setFromAxisAngle(uh,o),n.tilt){const a=n.tilt.spin?n.tilt.angle*r:Math.sin(Math.PI*Math.min(1,s*1.15))*n.tilt.angle;e.obj.quaternion.premultiply(Ex.setFromAxisAngle(n.tilt.axis,a))}}n.dur>0&&(e.obj.visible=!0),s>=1&&(e.tweens.shift(),n.yaw!==void 0&&this.orient(e,n.yaw),n.hideAtEnd&&(e.obj.visible=!1))}}dispose(){this.disposables.forEach(t=>t.dispose())}}const No=["table","top","first"],Fr={table:"3D",top:"Top",first:"Seat"},Fo=.92,Tx=1.55,fh=.12,ph=1.56,mh=.05,gh=1.3,vh=1.3,Di=.5,Ax=.78,Oo=1.2,Rx=7,_h=1.04,wr={orbit:45,first:50},ko=.3,Bo=1.5,br=.006,xh=.0035;class Cx{constructor(t){O(this,"renderer");O(this,"scene",new m_);O(this,"camera",new Ne(45,1,.05,60));O(this,"yaw",Math.PI/2);O(this,"targetYaw",Math.PI/2);O(this,"orbitYaw",0);O(this,"targetOrbitYaw",0);O(this,"pitch",Fo);O(this,"targetPitch",Fo);O(this,"lookYaw",0);O(this,"targetLookYaw",0);O(this,"lookDown",Di);O(this,"targetLookDown",Di);O(this,"seatFit",{d:Oo,h:Oo*Math.tan(Di),look:Di});O(this,"seat",0);O(this,"viewMode","table");O(this,"insets",{top:0,bottom:0});O(this,"raycaster",new nx);O(this,"plane",new Nn(new I(0,1,0),0));O(this,"width",1);O(this,"height",1);O(this,"zoom",1);O(this,"targetZoom",1);O(this,"orbitPos",new I);O(this,"seatPos",new I);O(this,"orbitTarget",new I(0,-.02,0));O(this,"seatTarget",new I);O(this,"lookAt",new I);O(this,"saved",{});O(this,"seatSpin",0);O(this,"targetSeatSpin",0);O(this,"seatRise",0);O(this,"targetSeatRise",0);O(this,"extent",1.35);O(this,"lights",[]);this.canvas=t,this.renderer=new p_({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=Ee,this.renderer.toneMapping=jh,this.renderer.toneMappingExposure=1.1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=qh;const e=new Q_("#fff3e0","#3a2414",1.15);this.scene.add(e);const n=new Jl("#fff1d6",2.6);this.lights=[[e,1.15],[n,2.6]],n.position.set(1.6,4,1.2),n.castShadow=!0,n.shadow.mapSize.set(2048,2048);const s=n.shadow.camera;s.left=-1.6,s.right=1.6,s.top=1.6,s.bottom=-1.6,s.near=1,s.far=8,n.shadow.bias=-4e-4,n.shadow.normalBias=.01,this.scene.add(n);const r=new Jl("#9cc9ff",.35);r.position.set(-2,2,-1.5),this.scene.add(r),this.lights.push([r,.35]),this.applyRoom(ve())}zoomBy(t){this.targetZoom=Math.min(Bo,Math.max(ko,this.targetZoom*t))}get magnification(){return 1/this.targetZoom}get canZoomIn(){return this.targetZoom>ko+1e-6}get canZoomOut(){return this.targetZoom<Bo-1e-6}resetZoom(){this.targetZoom=1}orbitBy(t,e){this.viewMode==="first"?(this.targetLookYaw=Ve.clamp(this.targetLookYaw-t*xh,-vh,vh),this.targetLookDown=Ve.clamp(this.targetLookDown-e*xh,mh,gh)):(this.targetOrbitYaw+=t*br,this.targetPitch=Ve.clamp(this.targetPitch+e*br,fh,ph))}setSavedViews(t){this.saved={...t}}currentView(){return this.viewMode==="first"?{angle:this.targetLookDown,zoom:this.targetZoom}:{angle:this.targetPitch,zoom:this.targetZoom}}standard(){const t=this.saved[this.viewMode],e=this.viewMode==="top"?Tx:Fo;return{pitch:t&&this.viewMode!=="first"?Ve.clamp(t.angle,fh,ph):e,look:t&&this.viewMode==="first"?Ve.clamp(t.angle,mh,gh):this.seatFit.look,zoom:t?Ve.clamp(t.zoom,ko,Bo):1}}orbitCenterBy(t,e){if(this.viewMode!=="first")return this.orbitBy(t,e);this.targetSeatSpin+=t*br;const n=Math.atan2(this.seatFit.h,this.seatFit.d);this.targetSeatRise=Ve.clamp(this.targetSeatRise+e*br,.12-n,1.35-n)}resetView(){const t=this.standard();this.targetSeatSpin=0,this.targetSeatRise=0,this.targetOrbitYaw=0,this.targetPitch=t.pitch,this.targetLookYaw=0,this.targetLookDown=t.look,this.targetZoom=t.zoom}get adjusted(){const t=this.standard();return this.viewMode==="first"?Math.abs(this.targetSeatSpin)>.02||Math.abs(this.targetSeatRise)>.02||Math.abs(this.targetLookYaw)>.02||Math.abs(this.targetLookDown-t.look)>.02||Math.abs(this.targetZoom-t.zoom)>.02:Math.abs(this.targetOrbitYaw)>.02||Math.abs(this.targetPitch-t.pitch)>.02||Math.abs(this.targetZoom-t.zoom)>.02}applyRoom(t){this.scene.background=new Xt(t.room.background),this.scene.fog=t.room.fog?new hc(t.room.background,4,11):null;for(const[e,n]of this.lights)e.intensity=n*t.room.light}faceSeat(t,e=!1){let n=Math.atan2(-t.y,t.x);for(;n-this.yaw>Math.PI;)n-=Math.PI*2;for(;n-this.yaw<-Math.PI;)n+=Math.PI*2;this.targetYaw=n,e&&(this.yaw=n)}setViewMode(t,e=!1){this.viewMode=t,this.resetView(),e&&(this.pitch=this.targetPitch,this.orbitYaw=this.targetOrbitYaw,this.lookYaw=this.targetLookYaw,this.lookDown=this.targetLookDown,this.zoom=this.targetZoom,this.seat=t==="first"?1:0)}get mode(){return this.viewMode}setInsets(t){this.insets=t,this.resize()}resize(){const t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.width=t,this.height=e,this.renderer.setSize(t,e,!1),this.camera.aspect=t/e;const n=(this.insets.top-this.insets.bottom)/2;this.camera.setViewOffset(t,e,0,-n,t,e),this.camera.updateProjectionMatrix(),this.fitSeat()}get sizeChanged(){const t=this.canvas.clientWidth,e=this.canvas.clientHeight;return t>0&&e>0&&(t!==this.width||e!==this.height)}fitSeat(){const t=new Ne(wr.first,this.width/this.height,.05,60),e=(this.insets.top-this.insets.bottom)/2;t.setViewOffset(this.width,this.height,0,-e,this.width,this.height),t.updateProjectionMatrix();const n=1-2*(this.insets.top+6)/this.height,s=-1+2*(this.insets.bottom+6)/this.height,r=[];for(let f=0;f<24;f++){const g=f/24*Math.PI*2;r.push(new I(Math.cos(g)*_h,0,Math.sin(g)*_h))}const o=new I,a=this.width/this.height,c=Ve.clamp((1.2-a)/.6,0,1),l=Di+c*(Ax-Di),h=Math.tan(l);let u=Oo;for(;u<Rx&&(t.position.set(u,u*h,0),t.lookAt(0,0,0),t.updateMatrixWorld(),!r.every(f=>(o.copy(f).project(t),o.z<1&&Math.abs(o.x)<=.97&&o.y<=n&&o.y>=s)));u+=.05);const d=Math.abs(this.targetLookDown-this.seatFit.look)<1e-6;this.seatFit={d:u,h:u*h,look:l},d&&!this.saved.first&&(this.targetLookDown=this.seatFit.look)}distance(){const t=Math.max(120,this.height-this.insets.top-this.insets.bottom),e=Ve.degToRad(this.camera.fov),n=Math.tan(e/2),s=n*(this.width/this.height),r=this.extent,o=r/s,c=r*(Math.sin(this.pitch)+.25*Math.cos(this.pitch))/n*(this.height/t);return Math.max(o,c)}update(t){const e=1-Math.exp(-t*5),n=1-Math.exp(-t*12);this.yaw+=(this.targetYaw-this.yaw)*e,this.orbitYaw+=(this.targetOrbitYaw-this.orbitYaw)*n,this.pitch+=(this.targetPitch-this.pitch)*n,this.lookYaw+=(this.targetLookYaw-this.lookYaw)*n,this.lookDown+=(this.targetLookDown-this.lookDown)*n,this.zoom+=(this.targetZoom-this.zoom)*n,this.seat+=((this.viewMode==="first"?1:0)-this.seat)*e;const s=this.yaw+this.orbitYaw,r=this.distance()*this.zoom,o=Math.cos(this.pitch);this.orbitPos.set(Math.cos(s)*o*r,Math.sin(this.pitch)*r,Math.sin(s)*o*r),this.seatSpin+=(this.targetSeatSpin-this.seatSpin)*n,this.seatRise+=(this.targetSeatRise-this.seatRise)*n;const a=this.yaw+this.seatSpin,c=Math.hypot(this.seatFit.d,this.seatFit.h),l=Math.atan2(this.seatFit.h,this.seatFit.d)+this.seatRise,h=Math.cos(a)*Math.cos(l)*c,u=Math.sin(a)*Math.cos(l)*c,d=a+Math.PI+this.lookYaw,f=this.lookDown+this.seatRise,g=Math.cos(f),v=Math.cos(d)*g,m=-Math.sin(f),p=Math.sin(d)*g;this.seatPos.set(h,Math.sin(l)*c,u),this.seatTarget.set(this.seatPos.x+v,this.seatPos.y+m,this.seatPos.z+p);const b=this.seat*this.seat*(3-2*this.seat);this.camera.position.lerpVectors(this.orbitPos,this.seatPos,b),this.lookAt.lerpVectors(this.orbitTarget,this.seatTarget,b);const w=Ve.clamp(wr.first*this.zoom,12,85),_=wr.orbit+(w-wr.orbit)*b;Math.abs(this.camera.fov-_)>.001&&(this.camera.fov=_,this.camera.updateProjectionMatrix()),this.camera.lookAt(this.lookAt)}render(){this.renderer.render(this.scene,this.camera)}pick(t,e){const n=this.canvas.getBoundingClientRect(),s=new st((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);this.raycaster.setFromCamera(s,this.camera);const r=new I;return this.raycaster.ray.intersectPlane(this.plane,r)?ix(r):null}worldPerPixel(){const t=Math.max(.6,this.camera.position.distanceTo(this.lookAt)),e=Ve.degToRad(this.camera.fov);return 2*t*Math.tan(e/2)/this.height}dispose(){this.renderer.dispose()}}function te(i,t={},...e){const n=document.createElement(i);for(const[s,r]of Object.entries(t))r!==void 0&&(s==="class"?n.className=r:n.setAttribute(s,r));for(const s of e)s==null||s===!1||n.append(typeof s=="string"?document.createTextNode(s):s);return n}function Kt(i){return i.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function ws(i,t=22,e=""){const n=ve().tokens.faces[Dh(i)??"captain"];if(n)return`<span class="face" role="img" aria-label="${Kt(e)}" style="width:${t}px;height:${t}px;background-image:url('${Kt(n)}');background-size:cover;background-position:center"></span>`;const s=i%8/7*100,r=Math.floor(i/8)/3*100;return`<span class="face" role="img" aria-label="${Kt(e)}" style="width:${t}px;height:${t}px;background-image:url(./textures/chips.jpg);background-position:${s}% ${r}%"></span>`}class Px{constructor(t,e){O(this,"root");O(this,"scores");O(this,"who");O(this,"hint");O(this,"toastEl");O(this,"power");O(this,"powerFill");O(this,"slider");O(this,"viewBtn");O(this,"lookBtn");O(this,"resetBtn");O(this,"adjusted",!1);O(this,"zoomPanel");O(this,"zoomLabel");O(this,"zoomIn");O(this,"zoomOut");O(this,"zoomText","");O(this,"top");O(this,"bottom");O(this,"toastTimer",0);this.scores=te("div",{class:"scores"}),this.scores.addEventListener("click",s=>{const r=s.target.closest("[data-team]");r&&e.onScores(Number(r.dataset.team))}),this.who=te("div",{class:"who"}),this.hint=te("div",{class:"hint"}),this.top=te("div",{class:"hud-top"},this.scores,te("div",{class:"turn"},this.who,this.hint)),this.toastEl=te("div",{class:"toast",role:"status","aria-live":"polite"}),this.powerFill=te("div",{class:"fill"}),this.power=te("div",{class:"power","aria-hidden":"true"},this.powerFill),this.slider=te("input",{type:"range",min:"0",max:"1000",value:"500","aria-label":"Slide the shooter along your rope line"}),this.slider.addEventListener("input",()=>e.onSlide(1-Number(this.slider.value)/1e3)),this.viewBtn=te("button",{class:"icon-btn","aria-label":"Change camera view",title:"Camera view (V)"},"3D"),this.viewBtn.addEventListener("click",e.onToggleView),this.lookBtn=te("button",{class:"icon-btn","aria-pressed":"false",title:"Look around (L)"},"Look"),this.lookBtn.addEventListener("click",e.onToggleLook),this.resetBtn=te("button",{class:"icon-btn reset-view","aria-label":"Reset camera view",title:"Reset view (R)",hidden:""},"⟲"),this.resetBtn.addEventListener("click",e.onResetView);const n=te("button",{class:"icon-btn","aria-label":"Menu"},"☰");n.addEventListener("click",e.onMenu),this.bottom=te("div",{class:"hud-bottom"},this.power,te("div",{class:"controls"},this.viewBtn,this.lookBtn,this.resetBtn,te("label",{class:"slider"},te("span",{},"Slide"),this.slider),n)),this.zoomIn=te("button",{class:"icon-btn zoom-btn","aria-label":"Zoom in",title:"Zoom in (+)"},"+"),this.zoomOut=te("button",{class:"icon-btn zoom-btn","aria-label":"Zoom out",title:"Zoom out (−)"},"−"),this.zoomLabel=te("span",{class:"zoom-level","aria-live":"polite"},"1×");for(const[s,r]of[[this.zoomIn,1],[this.zoomOut,-1]])Lx(s,()=>e.onZoom(r));this.zoomPanel=te("div",{class:"zoom-panel",role:"group","aria-label":"Zoom",hidden:""},this.zoomIn,this.zoomLabel,this.zoomOut),this.root=te("div",{class:"hud"},this.top,this.toastEl,this.zoomPanel,this.bottom),t.append(this.root)}setViewLabel(t){this.viewBtn.textContent=Fr[t],this.viewBtn.setAttribute("aria-label",`Camera view: ${Fr[t]}. Tap to change.`)}setLooking(t){this.lookBtn.classList.toggle("on",t),this.lookBtn.setAttribute("aria-pressed",String(t)),this.zoomPanel.hidden=!t}setZoom(t,e,n){const s=`${t>=2?t.toFixed(1):t.toFixed(2).replace(/0$/,"")}×`;s!==this.zoomText&&(this.zoomText=s,this.zoomLabel.textContent=s),this.zoomIn.disabled===e&&(this.zoomIn.disabled=!e),this.zoomOut.disabled===n&&(this.zoomOut.disabled=!n)}setViewAdjusted(t){t!==this.adjusted&&(this.adjusted=t,this.resetBtn.hidden=!t)}update(t,e){const n=t.config,s=[];if(n.mode==="versus")n.teams.forEach((a,c)=>{const l=t.claims[c],h=bs(t,c),u=Oh(t,c),d=Bs(t)===c&&t.status==="playing",f=l?ws($i[l],20,yn[l]):'<span class="face unknown" aria-label="No Sailors claimed yet">?</span>',g=Br(t),v=t.out[c]?"Out":t.standby===c?"Standby":u?"Captain!":`${h}/${g}`,m=n.players.filter(b=>b.team===c).map(b=>Kt(b.name)).join(" & "),p=l?`${m} · ${yn[l]}`:m;s.push(`<button type="button" class="chip${d?" active":""}${t.out[c]||t.standby===c?" benched":""}" style="--team:${Kt(a.color)}" data-team="${c}" aria-label="${Kt(a.name)}: ${v}. Show each player’s rescues.">${f}<span class="name">${Kt(a.name)}</span><span class="count">${v}</span><span class="crew">${p}</span><span class="bar"><i style="width:${100*h/g}%"></i></span></button>`)});else{const a=bs(t,0),c=Fh(t),l=Nd(t)-a-c,h=t.pieces.find(u=>u.id===qi)?.loc.at==="pocket";s.push(`<button type="button" class="chip coop" data-team="0"><span class="name">Rescued</span><span class="count">${a}</span></button>`,`<button type="button" class="chip coop shark" data-team="0"><span class="name">Sharks</span><span class="count">${c}</span></button>`,`<button type="button" class="chip coop with-icon" data-team="0">${ws($i.captain,20,"Captain")}<span class="name">${h?"Saved":"Adrift"}</span><span class="count">${h?"✓":l}</span></button>`)}this.scores.innerHTML=s.join(""),this.scores.classList.toggle("many",n.teams.length>3),this.scores.classList.toggle("three",n.teams.length===3);const r=n.players[t.current],o=n.teams[r.team];if(t.status==="playing"){const a=t.shotInTurn>0?" · again!":"",c=qe(t)?" · beckon the Captain!":"",l=n.mode==="versus"?t.claims[r.team]:null,h=l?`<span class="who-face">${ws($i[l],26,yn[l])}</span>`:`<span class="swatch" style="background:${Kt(o.color)}"></span>`,u=l?`<span class="who-crew"> · ${yn[l]}</span>`:"";this.who.innerHTML=`${h}<span class="who-text">${Kt(r.name)}${u}${a}${c}</span>`}else this.who.textContent=t.status==="won"?"The Captain is saved!":"The sharks got the Captain";this.hint.textContent=e}setSlider(t,e){this.slider.value=String(Math.round((1-t)*1e3)),this.slider.disabled=!e}setPower(t){this.power.classList.toggle("show",t!==null),t!==null&&(this.powerFill.style.width=`${Math.round(t*100)}%`,this.powerFill.style.background=`hsl(${120-120*t} 80% 50%)`)}toast(t,e="info",n=1800){this.toastEl.textContent=t,this.toastEl.className=`toast show ${e}`,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastEl.className="toast",n)}insets(){return{top:this.top.getBoundingClientRect().bottom,bottom:window.innerHeight-this.bottom.getBoundingClientRect().top}}dispose(){window.clearTimeout(this.toastTimer),this.root.remove()}}function Er(i,t,e,n){return new Promise(s=>{const r=te("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":t});r.innerHTML=`<h2>${Kt(t)}</h2><div class="sheet-body">${e}</div>`;const o=te("div",{class:"sheet-buttons"});for(const c of n){const l=te("button",{class:c.primary?"btn primary":"btn","aria-label":c.label},c.html?"":c.label);c.html&&(l.innerHTML=c.html),l.addEventListener("click",()=>{a.remove(),s(c.id)}),o.append(l)}r.append(o);const a=te("div",{class:"overlay"},r);i.append(a),o.querySelector(".primary")?.focus()})}function Lx(i,t){let e=0;const n=()=>{window.clearTimeout(e),window.clearInterval(e),e=0};i.addEventListener("pointerdown",s=>{s.preventDefault(),!i.disabled&&(t(),n(),e=window.setTimeout(()=>e=window.setInterval(t,60),300))});for(const s of["pointerup","pointerleave","pointercancel"])i.addEventListener(s,n);i.addEventListener("click",s=>{s.detail===0&&t()})}class Ix{constructor(){O(this,"ctx",null);O(this,"noise",null);O(this,"lastClick",0);O(this,"buffers",new Map);O(this,"enabled",!0)}loadCustom(){const t=this.ctx;if(t)for(const e of Object.values(ve().sounds)){if(!e.url||this.buffers.has(e.url))continue;const n=e.url;this.buffers.set(n,null),fetch(n).then(s=>s.arrayBuffer()).then(s=>t.decodeAudioData(s)).then(s=>this.buffers.set(n,s)).catch(()=>{})}}custom(t,e=1){const n=ve().sounds[t];if(!n.url)return!1;const s=this.ctx,r=this.buffers.get(n.url);if(!s||!r)return!!r;const o=s.createBufferSource();o.buffer=r;const a=s.createGain();return a.gain.value=Math.min(2,n.volume*e),o.connect(a).connect(s.destination),o.start(),!0}vol(t){return ve().sounds[t].volume}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(t)try{this.ctx=new t;const e=Math.floor(this.ctx.sampleRate*.05);this.noise=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noise.getChannelData(0);for(let s=0;s<e;s++)n[s]=(Math.random()*2-1)*Math.pow(1-s/e,3);this.loadCustom()}catch{this.ctx=null}}hit(t,e){const n=this.ctx;if(!n||!this.noise||!this.enabled)return;const s=n.currentTime;if(s-this.lastClick<.025)return;this.lastClick=s;const r=t!=="clack",o=Math.min(1,e*(r?.25:.6));if(o<.02||this.custom(t,o))return;const a=o*this.vol(t);if(a<.02)return;const c=n.createBufferSource();c.buffer=this.noise;const l=n.createBiquadFilter();l.type="bandpass",l.frequency.value=r?700:2600+Math.random()*600,l.Q.value=r?1.2:3;const h=n.createGain();h.gain.value=a,c.connect(l).connect(h).connect(n.destination),c.start(s)}plop(t){const e=this.ctx;if(!e||!this.enabled||this.custom(t?"rescue":"sink"))return;const n=this.vol(t?"rescue":"sink"),s=e.currentTime,r=e.createOscillator(),o=e.createGain();r.type="sine",r.frequency.setValueAtTime(t?520:300,s),r.frequency.exponentialRampToValueAtTime(t?180:70,s+.18),o.gain.setValueAtTime(.35*n,s),o.gain.exponentialRampToValueAtTime(.001,s+.25),r.connect(o).connect(e.destination),r.start(s),r.stop(s+.26)}overboard(){if(!this.ctx||!this.enabled||this.custom("overboard"))return;const t=this.lastClick;this.lastClick=0,this.hit("rail",4*this.vol("overboard")),this.lastClick=t}fanfare(){const t=this.ctx;if(!t||!this.enabled||this.custom("win"))return;const e=this.vol("win"),n=t.currentTime;[523,659,784,1046].forEach((s,r)=>{const o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.value=s;const c=n+r*.13;a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(Math.max(2e-4,.25*e),c+.02),a.gain.exponentialRampToValueAtTime(.001,c+.4),o.connect(a).connect(t.destination),o.start(c),o.stop(c+.42)})}}function ds(i){try{navigator.vibrate?.(i)}catch{}}function Dx(i,t){const e=i.config,n=e.players[t.player].name,s=a=>e.teams[a]?.name??"Crew";if(t.captain?.result==="rescued")return e.mode==="versus"?{text:`The Captain is saved! ${s(t.team)} wins!`,tone:"good"}:{text:"The Captain is saved! Mission complete!",tone:"good"};if(t.captain?.result==="eaten")return{text:"The sharks got the Captain! Mission failed.",tone:"bad"};if(t.foul){const a="The Captain refuses to leave before his Sailors! Back to the Bridge —";return t.status==="won"&&t.winner!==null?{text:`${a} ${s(t.foul.team)} is out. ${s(t.winner)} wins!`,tone:"bad"}:{text:`${a} ${s(t.foul.team)} is ${t.foul.kind==="out"?"out of the game":"on standby"}.`,tone:"bad"}}const r=[];if(t.captain?.result==="returned"&&r.push("Wrong lifeboat — the Captain is back on the Bridge."),t.overboard.length){const a=t.overboard.length;r.push(a===1?"A chip flew out of the water — back on the helm!":`${a} chips flew out of the water — back on the helm!`)}if(t.shooterSunk&&r.push(t.penalty?"Shooter in a lifeboat! One of your Sailors goes back to the Bridge.":"Shooter in a lifeboat!"),e.mode==="versus"){t.claimed&&r.unshift(`${s(t.team)} is rescuing the ${yn[t.claimed]}!`),t.ownRescued>0&&r.unshift(`${t.ownRescued} rescued!`);const a=t.rescued.filter(c=>c.team!==t.team);for(const c of new Set(a.map(l=>l.team))){const l=a.filter(h=>h.team===c).length;r.push(c>=0?`${l} rescued for ${s(c)}.`:`${l} spare Sailor${l>1?"s":""} rescued.`)}}else t.rescued.length&&r.unshift(`${t.rescued.length} rescued!`),t.lost.length&&r.push(`${t.lost.length} lost to the sharks!`);if(t.turnContinues&&r.push(`${n}, go again!`),t.timedOut&&r.push("(Shot stopped after the time limit.)"),r.length===0||r.length===1&&t.overboard.length&&!t.turnContinues)return{text:`${r.length?`${r[0]} `:"No rescue. "}${e.players[t.nextPlayer].name}'s turn.`,tone:"info"};const o=t.shooterSunk||t.lost.length>0||t.captain?.result==="returned";return{text:r.join(" "),tone:o?"bad":t.turnContinues?"good":"info"}}class Ux{constructor(){O(this,"online",!1);O(this,"isHost",!0);O(this,"h",null)}canAct(){return!0}submit(t){queueMicrotask(()=>this.h?.action(t))}connect(t){this.h=t}applied(){}idle(){}waiting(){return null}sending(){return!1}dispose(){this.h=null}}class Nx{constructor(){O(this,"worker",null);O(this,"nextId",1);O(this,"pending",new Map);try{this.worker=new Worker(new URL(""+new URL("ai.worker-Bk7gpWwC.js",import.meta.url).href,import.meta.url),{type:"module"}),this.worker.onmessage=t=>{const e=this.pending.get(t.data.id);e&&(this.pending.delete(t.data.id),t.data.input?e.resolve(t.data.input):e.reject(new Error(t.data.error??"AI failed")))},this.worker.onerror=()=>this.fallBack()}catch{this.worker=null}}plan(t,e){const n=Math.random()*4294967296>>>0;if(this.worker){const s=this.nextId++;return new Promise((o,a)=>{this.pending.set(s,{resolve:o,reject:a}),this.worker.postMessage({id:s,state:t,level:e,seed:n})}).catch(()=>this.sliced(t,e,n))}return this.sliced(t,e,n)}sliced(t,e,n){const s=Qd(t,e,jd(n));return new Promise((r,o)=>{const a=()=>{try{const c=performance.now()+10;for(;;){const l=s.next();if(l.done)return r(l.value);if(performance.now()>c)break}setTimeout(a,0)}catch(c){o(c instanceof Error?c:new Error(String(c)))}};setTimeout(a,0)})}fallBack(){this.worker?.terminate(),this.worker=null;for(const t of this.pending.values())t.reject(new Error("retry"));this.pending.clear()}dispose(){this.worker?.terminate(),this.worker=null,this.pending.clear()}}class Fx{constructor(t){O(this,"audio",null);O(this,"order",[]);O(this,"pos",0);O(this,"wanted",!1);O(this,"unlocked",!1);O(this,"key","");this.wanted=t;const e=()=>{this.unlocked=!0,this.sync(),window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e)};window.addEventListener("pointerdown",e),window.addEventListener("keydown",e),lx(()=>this.sync()),document.addEventListener("visibilitychange",()=>{document.hidden?this.audio?.pause():this.sync()})}get enabled(){return this.wanted}get available(){return ve().music.tracks.length>0}setEnabled(t){this.wanted=t,this.sync()}sync(){const t=ve().music,e=JSON.stringify([t.tracks.map(n=>n.url),t.shuffle]);if(e!==this.key){if(this.key=e,this.order=t.tracks.map((n,s)=>s),t.shuffle)for(let n=this.order.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[this.order[n],this.order[s]]=[this.order[s],this.order[n]]}this.pos=0,this.audio?.pause(),this.audio=null}if(!this.wanted||!this.unlocked||!t.tracks.length||document.hidden){this.audio?.pause();return}this.audio||this.load(),this.audio.volume=t.volume,this.audio.play().catch(()=>{})}load(){const t=ve().music,e=t.tracks[this.order[this.pos%this.order.length]],n=new Audio(e.url);n.preload="auto",n.volume=t.volume,n.addEventListener("ended",()=>{this.pos=(this.pos+1)%Math.max(1,this.order.length),this.audio=null,this.sync()}),n.addEventListener("error",()=>{this.order.length>1&&(this.pos++,this.audio=null,setTimeout(()=>this.sync(),500))}),this.audio=n}}const za=new Fx(!0),Ox=90,kx=3.2;function Bx(i,t,e,n){const s=Math.max(Ox,e*2.2),r=i.filter(h=>t-h.t<=s);if(r.length<2)return{vx:0,vy:0,power:0};const o=r[0],a=r[r.length-1],c=Math.max(1,a.t-o.t)/1e3,l=Math.hypot(a.x-o.x,a.y-o.y)/c;return{vx:a.w.x-o.w.x,vy:a.w.y-o.w.y,power:Math.min(1,l/(n*kx))}}const Ns="chipwreck.match.v2",Vu="chipwreck.prefs.v1";function Gu(i){try{i.status==="playing"?localStorage.setItem(Ns,JSON.stringify(i)):localStorage.removeItem(Ns)}catch{}}function yh(){try{const i=localStorage.getItem(Ns);return i?Xo(JSON.parse(i)):null}catch{try{localStorage.removeItem(Ns)}catch{}return null}}function Ha(){try{localStorage.removeItem(Ns)}catch{}}function zx(i){const t={};if(!i||typeof i!="object")return t;for(const e of["table","top","first"]){const n=i[e];n&&Number.isFinite(n.angle)&&Number.isFinite(n.zoom)&&(t[e]={angle:Number(n.angle),zoom:Number(n.zoom)})}return t}function Hx(){const i={sound:!0,view:"table",flick:"pull",names:[],music:!0,views:{}};try{const t=JSON.parse(localStorage.getItem(Vu)??"{}");return{sound:typeof t.sound=="boolean"?t.sound:i.sound,view:t.view==="top"||t.view==="first"?t.view:"table",flick:t.flick==="flick"?"flick":"pull",names:Array.isArray(t.names)?t.names.filter(e=>typeof e=="string").slice(0,6):[],music:typeof t.music=="boolean"?t.music:i.music,views:zx(t.views)}}catch{return i}}function On(i){try{localStorage.setItem(Vu,JSON.stringify(i))}catch{}}const Mh=typeof matchMedia=="function"&&matchMedia("(pointer: fine)").matches,Vx=.34,Sh=.05,Gx=2400;class Wu{constructor(t,e,n,s,r,o=new Ux,a=0,c=()=>[]){O(this,"board");O(this,"pieces");O(this,"aim");O(this,"hud");O(this,"phase","aim");O(this,"shooter",{x:0,y:0});O(this,"called",null);O(this,"drag",null);O(this,"sim",null);O(this,"simInput",null);O(this,"seenPocketed",0);O(this,"seenOffBoard",0);O(this,"heaps",[]);O(this,"acc",0);O(this,"speed",1);O(this,"raf",0);O(this,"last",0);O(this,"clock",0);O(this,"disposed",!1);O(this,"settleTimer",0);O(this,"looking",!1);O(this,"pointers",new Map);O(this,"queue",[]);O(this,"frameMs",16);O(this,"correction",null);O(this,"sfx",new Ix);O(this,"ai",new Nx);O(this,"aiTurn",null);O(this,"turnSeq",0);O(this,"cleanup",[]);O(this,"frame",t=>{if(this.disposed)return;const e=Math.min(.1,Math.max(0,(t-this.last)/1e3)),n=this.last;this.last=t,this.clock+=e,this.frameMs+=(Math.min(1e3,Math.max(0,t-n))-this.frameMs)*.2,this.stage.sizeChanged&&this.layout(),this.phase==="rolling"&&this.sim&&this.stepSimulation(e),this.aiTurn&&this.driveAi(e),this.pieces.update(e),this.phase==="settling"&&this.afterSettle(),this.aim.update(e),this.board.update(this.clock),this.stage.update(e),this.hud.setViewAdjusted(this.stage.adjusted),this.looking&&this.hud.setZoom(this.stage.magnification,this.stage.canZoomIn,this.stage.canZoomOut),this.stage.render(),this.raf=requestAnimationFrame(this.frame)});this.root=t,this.stage=e,this.state=n,this.prefs=s,this.exit=r,this.link=o,this.applied=a,this.menuExtras=c,this.sfx.enabled=s.sound,e.applyRoom(ve());const l=Ye(n),h=Array.from({length:6},(f,g)=>{const v=n.seats.indexOf(g);return v>=0?n.config.teams[n.config.players[v].team].color:null});this.board=wx(e.renderer,{geometry:l,pocketRoles:n.pocketRoles,seatColors:h}),e.extent=this.board.extent,this.pieces=new dh(e.renderer,this.board,n),this.aim=new Mx(e.renderer,l),e.scene.add(this.board.group,this.pieces.group,this.aim.group),this.hud=new Px(t,{onSlide:f=>this.slideTo(f),onToggleView:()=>this.toggleView(),onToggleLook:()=>this.toggleLook(),onResetView:()=>this.stage.resetView(),onZoom:f=>this.stage.zoomBy(f>0?1/1.08:1.08),onMenu:()=>void this.openMenu(),onScores:f=>void this.showCrew(f)}),e.setSavedViews(s.views),e.setViewMode(s.view,!0),this.hud.setViewLabel(s.view);const u=e.canvas,d=(f,g,v)=>{f.addEventListener(g,v,{passive:!1}),this.cleanup.push(()=>f.removeEventListener(g,v))};d(u,"pointerdown",f=>this.onDown(f)),d(u,"pointermove",f=>this.onMove(f)),d(u,"pointerup",f=>this.onUp(f)),d(u,"pointercancel",f=>{this.pointers.delete(f.pointerId),this.cancelDrag()}),d(u,"pointerleave",()=>u.style.cursor=""),d(u,"wheel",f=>{f.preventDefault(),this.stage.zoomBy(f.deltaY>0?1.08:1/1.08)}),d(window,"keydown",f=>this.onKey(f)),d(u,"contextmenu",f=>f.preventDefault()),d(window,"resize",()=>this.layout()),this.layout(),o.connect({action:f=>{this.queue.push(f),this.pump()},correct:(f,g)=>this.adopt(f,g)}),this.pieces.syncToState(this.state,!1),this.beginTurn(!0),this.last=performance.now(),this.raf=requestAnimationFrame(this.frame),this.exposeDebug()}beginTurn(t=!1){this.correction&&(this.state=this.correction.state,this.applied=this.correction.count,this.correction=null,this.pieces.syncToState(this.state,!0));const e=this.state;if(this.turnSeq++,this.aiTurn=null,e.status!=="playing"){this.gameOver();return}if(e.pending){this.askClaim(e.pending.report);return}const n=Za(this.state);if(!n){this.phase="aim",this.aim.hideAll(),this.pieces.placeShooter(null),this.hud.toast(`${this.state.config.players[this.state.current].name}'s rope is blocked — passing the turn.`,"info"),this.link.canAct(this.state.current)&&this.link.submit({t:"p"}),this.refreshHud(),this.link.idle(this.state),this.pump();return}this.phase="aim",this.called=null,this.shooter=n,this.stage.faceSeat(Oc(Ye(e),Hc(e)),t),e.shotInTurn===0&&this.stage.resetView();const s=e.config.teams[Bs(e)].color;this.aim.showRope(tn(e),s),this.aim.setCallable(qe(e)&&this.canAim()?vn(e):[],null),this.refreshShooter(!t),this.isAi(e.current)&&this.startAiTurn(),this.refreshHud(),this.link.idle(this.state),this.pump()}isComputer(t){return!!this.state.config.players[t]?.ai}isAi(t){return this.isComputer(t)&&this.link.isHost}startAiTurn(){const t=this.turnSeq,e=this.state.config.players[this.state.current].ai;this.aiTurn={seq:t,stage:"thinking",input:null,from:{...this.shooter},t:0,readyAt:this.clock+1.1},this.ai.plan(this.state,e).then(n=>{this.disposed||!this.aiTurn||this.aiTurn.seq!==t||(this.aiTurn.input=n)},n=>{console.error(n),!(this.disposed||!this.aiTurn||this.aiTurn.seq!==t)&&(this.aiTurn.input=this.fallbackShot())})}fallbackShot(){const t=this.state,e=Oc(Ye(t),Hc(t)),n=t.config.physics.maxShotSpeed*.7,s={shooter:{...this.shooter},velocity:{x:-e.x*n,y:-e.y*n}};return qe(t)&&(s.calledPocket=vn(t)[0]),s}driveAi(t){const e=this.aiTurn;if(!e||this.phase!=="aim"||e.seq!==this.turnSeq)return;if(e.stage==="thinking"){if(!e.input||this.clock<e.readyAt)return;ai(this.state,e.input)&&(e.input=this.fallbackShot()),e.stage="moving",e.t=0,e.from={...this.shooter},e.input.calledPocket!==void 0&&(this.called=e.input.calledPocket,this.aim.setCallable(vn(this.state),this.called));return}const n=e.input;if(e.t+=t,e.stage==="moving"){const l=Math.min(1,e.t/.6),h=l<.5?2*l*l:1-Math.pow(-2*l+2,2)/2;this.shooter={x:e.from.x+(n.shooter.x-e.from.x)*h,y:e.from.y+(n.shooter.y-e.from.y)*h},l>=1&&(this.shooter={...n.shooter},e.stage="aiming",e.t=0),this.refreshShooter(),this.hud.setSlider(this.ropeT(),!1);return}const s=this.state.config.physics.maxShotSpeed,r=Math.hypot(n.velocity.x,n.velocity.y),o=Math.max(0,Math.min(1,(r/s-.04)/.96)),a=Math.min(1,e.t/.7),c={x:n.velocity.x/r,y:n.velocity.y/r};this.aim.showAim(this.shooter,c,o*a,de(this.state,"shooter"),null),a>=1&&e.t>.9&&(this.aiTurn=null,this.aim.clearAim(),this.link.submit({t:"s",i:ai(this.state,n)?this.fallbackShot():n}),ds(12))}netChanged(){this.disposed||(this.phase==="aim"&&(this.aim.setCallable(qe(this.state)&&this.canAim()?vn(this.state):[],this.called),this.refreshShooter()),this.refreshHud())}canAim(){return this.phase==="aim"&&this.link.canAct(this.state.current)&&!this.isAi(this.state.current)&&!this.link.sending()&&this.state.status==="playing"}pump(){const t=this.queue[0];if(!(!t||this.disposed)){if(t.t==="c"){if(this.phase!=="claiming"||!this.state.pending)return;this.queue.shift(),this.applyClaim(t.k);return}if(!(this.phase!=="aim"||this.state.pending)){if(this.queue.shift(),t.t==="p"){try{this.state=zd(this.state)}catch(e){return console.error(e),this.pump()}this.afterAction(),this.phase="settling",this.refreshHud();return}this.startShot(t.i)}}}afterAction(){this.applied++,this.link.online||Gu(this.state),this.link.applied(this.state,this.applied)}adopt(t,e){if(this.sim||this.phase==="rolling"){this.correction={state:t,count:e};return}this.state=t,this.applied=e,this.pieces.syncToState(t,!0),this.refreshHud(),this.phase==="aim"&&this.beginTurn()}hint(){if(this.state.status!=="playing"||this.phase==="over")return"";if(this.phase==="rolling")return"Tap to speed up";if(this.phase==="settling")return"";if(this.phase==="aim"&&this.isComputer(this.state.current)&&!this.state.pending){const n=this.state.config.players[this.state.current];return`${n.name.startsWith("Computer")?`${n.name} (${Ts[n.ai]})`:`${n.name} (computer · ${Ts[n.ai]})`} is lining up a shot…`}const t=this.link.waiting(this.state);if(t)return t;if(this.phase!=="aim")return"";if(qe(this.state)&&this.called===null)return"Beckon the Captain: tap the lifeboat you’re aiming for";if(this.looking)return Mh?"Look around: drag to turn · scroll or + − to zoom · L to aim again":"Look around: drag to turn · pinch or + − to zoom · tap Look to aim";const e=this.prefs.flick==="flick";return Mh?`Drag along your rope (or ← →) · ${e?"click the shooter and flick":"pull back from the shooter to flick"} · drag the frame to look around`:`Slide along your rope · ${e?"press the shooter and flick":"pull back from the shooter to flick"} · drag the frame to look around`}refreshHud(){this.hud.update(this.state,this.hint()),this.board.setSeatSymbols(this.seatSymbols()),this.hud.setSlider(this.ropeT(),this.canAim())}seatSymbols(){const t=this.state;return Array.from({length:6},(e,n)=>{const s=t.seats.indexOf(n),r=s>=0&&t.config.mode==="versus"?t.claims[t.config.players[s].team]:null;return r?$i[r]:null})}refreshShooter(t=!1){const e=!Es(this.state,this.shooter);this.pieces.placeShooter(this.shooter,t),this.aim.showShooter(this.shooter,de(this.state,"shooter"),e)}slideTo(t){if(!this.canAim())return;const e=tn(this.state);this.shooter={x:e.start.x+(e.end.x-e.start.x)*t,y:e.start.y+(e.end.y-e.start.y)*t},this.refreshShooter()}shoot(t,e){const n=this.state,s=n.config.physics.maxShotSpeed*(.04+.96*e),r={shooter:{...this.shooter},velocity:{x:t.x*s,y:t.y*s}};if(qe(n)){if(this.called===null){this.hud.toast("Announce your lifeboat first — tap one of the glowing pockets.","info",2600);return}r.calledPocket=this.called}const o=ai(n,r);if(o){this.hud.toast(o,"bad");return}this.canAim()&&(this.aim.clearAim(),this.hud.setPower(null),this.link.submit({t:"s",i:r}),this.refreshHud(),ds(12))}startShot(t){const e=this.state,n=ai(e,t);if(n)return console.error("Dropped an illegal shot:",n),this.pump();this.shooter={...t.shooter},this.called=t.calledPocket??null,this.pieces.placeShooter(this.shooter),this.sim=Bh(e,t),this.simInput=t,this.seenPocketed=0,this.seenOffBoard=0,this.heaps=dh.heapSizes(this.state),this.acc=0,this.speed=1,this.phase="rolling",this.aim.clearAim(),this.aim.hideAll(),this.aim.setCallable(this.called!==null?[this.called]:[],this.called),this.hud.setPower(null),this.refreshHud()}stepSimulation(t){const e=this.sim;this.acc+=Math.min(t,.1)*this.speed;let n=0;for(;this.acc>=e.params.dt&&!e.finished&&n<Gx;){const r=e.step();for(const o of r)this.sfx.hit(o.b===null?"rail":o.b==="lip"?"lip":o.b==="post"?"peg":"clack",o.impulse);this.acc-=e.params.dt,n++}for(;this.seenPocketed<e.pocketed.length;this.seenPocketed++){const r=e.pocketed[this.seenPocketed],a=this.state.pocketRoles[r.pocket]==="shark"||r.id===ui,c=this.heaps[r.pocket]??0;r.id!==ui&&(this.heaps[r.pocket]=c+1),this.pieces.drop(r.id,r.pocket,c,a,r.vx,r.vy),this.sfx.plop(!a),ds(a?[20,40,20]:25)}for(;this.seenOffBoard<e.offBoard.length;this.seenOffBoard++){const r=e.offBoard[this.seenOffBoard];this.pieces.fly(r.id,r.x,r.y,r.vx,r.vy,r.id===ui),this.sfx.overboard(),ds([15,30,15])}const s=new Map(e.bodies.map(r=>[r.id,r]));for(const r of e.bodies){let o=0;for(let a=r.base;a!==null&&o<64;o++)a=s.get(a)?.base??null;this.pieces.setLive(r.id,r,r.a,o)}e.finished&&this.resolveShot()}resolveShot(){const t=this.sim,e=this.simInput;this.sim=null,this.simInput=null,this.phase="settling";let n;try{n=zh(this.state,e,t.outcome())}catch(s){console.error(s),this.hud.toast("Something went wrong with that shot — retake it.","bad"),this.pieces.syncToState(this.state,!1),this.beginTurn();return}if(this.state=n.state,this.pieces.syncToState(this.state,!0),this.afterAction(),this.state.pending){this.askClaim(n.report);return}this.announce(n.report)}async askClaim(t){if(this.phase="claiming",this.refreshHud(),this.link.idle(this.state),!this.link.canAct(t.player))return this.hud.toast(`${this.state.config.players[t.player].name} is choosing which Sailors to rescue…`,"info",3e3),this.pump();if(this.isAi(t.player)){const s=this.state.config.players[t.player].ai,r=Kd(this.state,s);this.hud.toast(`${this.state.config.players[t.player].name} is rescuing the ${yn[r]}!`,"info",2400);const o=()=>{this.disposed||(this.phase==="claiming"?this.link.submit({t:"c",k:r}):this.phase==="paused"&&window.setTimeout(o,300))};window.setTimeout(o,900);return}const e=t.claimOptions??[],n=await Er(this.root,"Choose your Sailors",`<p>${t.rescued.length} Sailors made it to the lifeboats. Which crew will ${this.state.config.teams[t.team].name} rescue?</p>`,e.map((s,r)=>({id:s,label:yn[s],html:`${ws($i[s],34,"")}<span>${yn[s]}</span>`,primary:r===0})));this.disposed||this.link.submit({t:"c",k:n})}applyClaim(t){let e;try{e=Ja(this.state,t)}catch(n){console.error(n);return}this.state=e.state,this.pieces.syncToState(this.state,!0),this.afterAction(),this.phase="settling",this.announce(e.report)}announce(t){const e=Dx(this.state,t);this.hud.toast(e.text,e.tone,2600),t.status==="won"&&this.sfx.fanfare(),this.refreshHud()}afterSettle(){this.phase!=="settling"||this.pieces.busy||this.settleTimer||(this.settleTimer=window.setTimeout(()=>{this.settleTimer=0,!(this.disposed||this.phase!=="settling")&&this.beginTurn()},this.state.status==="playing"?650:900))}async gameOver(){this.phase="over",this.aim.hideAll(),this.pieces.placeShooter(null),this.refreshHud(),Ha();const t=this.state,e=t.status==="won"?t.config.mode==="versus"?`${t.config.teams[t.winner].name} wins!`:"Mission complete!":"Mission failed",n=t.config.players.filter(l=>l.team===t.winner).map(l=>l.name).join(" & "),s=t.pieces.filter(l=>l.kind==="sailor"&&l.loc.at==="pocket"&&t.pocketRoles[l.loc.pocket]==="lifeboat").length,r=t.pieces.some(l=>l.kind==="captain"&&l.loc.at==="pocket"&&t.pocketRoles[l.loc.pocket]==="lifeboat"),o=`${ws($i.captain,72,"The Captain")}`+(t.config.mode==="versus"?`<p>${n} ${r?"saved the Captain":"are the last crew standing"} after ${t.turn} turn${t.turn===1?"":"s"}.</p>`:`<p>${s} of 30 Sailors rescued${r?", and the Captain is safe":""}.</p>`),a=this.link.online&&!this.link.isHost,c=await Er(this.root,e,o+(a?"<p>Waiting for the host to start a rematch…</p>":""),a?[{id:"menu",label:"Leave game"}]:[{id:"rematch",label:"Play again",primary:!0},{id:"menu",label:this.link.online?"End online game":"Main menu"}]);this.disposed||this.exit(c==="rematch"?"rematch":"menu")}async showCrew(t){if(document.querySelector(".overlay"))return;const e=this.state,n=e.config,s=n.players.map((v,m)=>({p:v,i:m})).filter(({p:v})=>n.mode==="coop"||v.team===t),r=n.mode==="versus",o=[[r?"Own crew rescued":"Sailors rescued",v=>v.rescued,!1],...r?[["Rescued for other crews",v=>v.forOthers,!0]]:[],...r?[["Unclaimed rescued",v=>v.spare,!1]]:[],...r?[]:[["Lost to sharks",v=>v.lost,!0]],["Shooter faults",v=>v.shooterFaults,!0],["Sailors pulled back",v=>v.penalties,!0],["Captain sent back",v=>v.captainReturns+v.captainFouls,!0],["Chips out of the water",v=>v.overboard,!1],["Shots",v=>v.shots,!1],["Best run (one turn)",v=>v.bestRun,!1]],a=v=>s.reduce((m,p)=>m+v(e.stats[p.i]),0),c=(v,m)=>m?`${Math.round(100*v/m)}%`:"–",l=s.length>1,h=`<tr><th></th>${s.map(({p:v})=>`<th>${Kt(v.name)}${v.ai?" 🤖":""}</th>`).join("")}${l?"<th>Crew</th>":""}</tr>`,u=o.map(([v,m,p])=>{const b=s.map(w=>{const _=m(e.stats[w.i]);return`<td${p&&_>0?' class="bad"':""}>${_}</td>`}).join("");return`<tr><td>${v}</td>${b}${l?`<td>${a(m)}</td>`:""}</tr>`}).join("")+`<tr class="total"><td>Shots that rescued</td>${s.map(v=>`<td>${c(e.stats[v.i].goodShots,e.stats[v.i].shots)}</td>`).join("")}${l?`<td>${c(a(v=>v.goodShots),a(v=>v.shots))}</td>`:""}</tr>`,d=n.teams[r?t:0],f=r?e.claims[t]:null,g=r?`<p>${f?`Rescuing the ${yn[f]} · ${bs(e,t)} of ${Br(e)} safe`:"Hasn’t claimed a crew yet"}.</p>`:`<p>${bs(e,0)} rescued · ${Fh(e)} lost to the sharks.</p>`;await Er(this.root,r?d.name:"The crew",`${g}<div class="breakdown-wrap"><table class="breakdown"><thead>${h}</thead><tbody>${u}</tbody></table></div>`,[{id:"close",label:"Close",primary:!0}])}async openMenu(){if(this.phase==="over"||this.phase==="paused")return;const t=this.phase;this.phase="paused",this.cancelDrag();const e=this.link.online,n=this.menuExtras(),s=await Er(this.root,e?"Menu":"Paused",`<p>Turn ${this.state.turn} · ${this.state.config.players[this.state.current].name} to shoot.</p>`,[{id:"resume",label:"Resume",primary:!0},{id:"sound",label:this.prefs.sound?"Sound: on":"Sound: off"},...za.available?[{id:"music",label:this.prefs.music?"Music: on":"Music: off"}]:[],{id:"saveview",label:`Save this ${Fr[this.stage.mode]} view as my default`},...this.prefs.views[this.stage.mode]?[{id:"forgetview",label:`Use the standard ${Fr[this.stage.mode]} view`}]:[],{id:"flick",label:`Flick style: ${this.prefs.flick==="flick"?"Flick":"Pull back"}`},...n.map(r=>({id:`x:${r.id}`,label:r.label})),...e?[]:[{id:"restart",label:"Restart match"}],{id:"menu",label:e?this.link.isHost?"End online game":"Leave game":"Save & quit"}]);if(!this.disposed){if(this.phase=t,s.startsWith("x:")){n.find(r=>`x:${r.id}`===s)?.run(),this.refreshHud(),this.pump();return}if(this.pump(),s==="sound")this.prefs.sound=!this.prefs.sound,this.sfx.enabled=this.prefs.sound,On(this.prefs),this.openMenu();else if(s==="saveview"||s==="forgetview"){const r=this.stage.mode;s==="saveview"?this.prefs.views[r]=this.stage.currentView():delete this.prefs.views[r],this.stage.setSavedViews(this.prefs.views),On(this.prefs),s==="forgetview"&&this.stage.resetView(),this.hud.toast(s==="saveview"?"Saved — every game starts with this view.":"Back to the standard view.","good",2200),this.refreshHud()}else s==="music"?(this.prefs.music=!this.prefs.music,za.setEnabled(this.prefs.music),On(this.prefs),this.openMenu()):s==="flick"?(this.prefs.flick=this.prefs.flick==="flick"?"pull":"flick",On(this.prefs),this.refreshHud(),this.openMenu()):s==="restart"?(Ha(),this.exit("rematch")):s==="menu"&&this.exit("menu")}}toggleView(t){const e=t??No[(No.indexOf(this.stage.mode)+1)%No.length];this.stage.setViewMode(e),this.hud.setViewLabel(e),this.prefs.view=e,On(this.prefs)}toggleLook(){this.looking=!this.looking,this.hud.setLooking(this.looking),this.cancelDrag(),this.refreshHud()}layout(){this.stage.resize(),this.stage.setInsets(this.hud.insets())}touchTolerance(){return Math.max(.06,26*this.stage.worldPerPixel())}onDown(t){if(t.preventDefault(),this.sfx.unlock(),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.capture(t.pointerId,!0),this.pointers.size===2){this.cancelDrag();const[u,d]=[...this.pointers.values()];this.drag={kind:"orbit2",cx:(u.x+d.x)/2,cy:(u.y+d.y)/2,dist:Math.hypot(u.x-d.x,u.y-d.y)};return}if(this.drag||this.phase==="over"||this.phase==="paused")return;const e=this.phase==="rolling"||this.phase==="settling",n=t.pointerType==="mouse"&&(t.button===1||t.button===2);if(e||n||this.looking||this.phase==="claiming"||this.phase==="aim"&&!this.canAim()){this.drag={kind:"orbit",pointerId:t.pointerId,x:t.clientX,y:t.clientY,moved:0,tapSpeedsUp:e};return}if(this.phase!=="aim"||this.drag)return;const s=this.stage.pick(t.clientX,t.clientY),r=this.state,o=Ye(r),a=this.touchTolerance(),c=!!s&&Math.hypot(s.x-this.shooter.x,s.y-this.shooter.y)<de(r,"shooter")+a*.6;if(!s||!c&&!Fc(o,s,0)){this.drag={kind:"orbit",pointerId:t.pointerId,x:t.clientX,y:t.clientY,moved:0,tapSpeedsUp:!1,centre:!0};return}if(qe(r))for(const u of vn(r)){const d=o.pockets[u];if(Math.hypot(s.x-d.x,s.y-d.y)<o.spec.pocketRadius+a){this.called=this.called===u?null:u,this.aim.setCallable(vn(r),this.called),this.refreshHud(),ds(8);return}}const l=tn(r);Math.hypot(...(()=>{const u=gs(s,l.start,l.end);return[u.x-s.x,u.y-s.y]})())<a&&!c?(this.drag={kind:"slide",pointerId:t.pointerId},this.moveShooterTo(s)):this.drag={kind:"pull",style:this.prefs.flick,pointerId:t.pointerId,sx:t.clientX,sy:t.clientY,start:s,dir:null,power:0,samples:[{t:t.timeStamp,x:t.clientX,y:t.clientY,w:s}]}}onKey(t){if(t.target?.closest?.("input, textarea, .overlay"))return;const e=t.key;if(e==="Escape"){this.drag?this.cancelDrag():this.openMenu(),t.preventDefault();return}if(e==="v"||e==="V"){this.toggleView();return}if(e==="+"||e==="=")return this.stage.zoomBy(1/1.15);if(e==="-"||e==="_")return this.stage.zoomBy(1.15);if(e==="0"||e==="r"||e==="R")return this.stage.resetView();if(e==="f"||e==="F")return this.toggleView(this.stage.mode==="first"?"table":"first");if(e==="l"||e==="L")return this.toggleLook();const n=24;if(e==="q"||e==="Q")return this.stage.orbitBy(-n,0);if(e==="e"||e==="E")return this.stage.orbitBy(n,0);if(e==="w"||e==="W")return this.stage.orbitBy(0,-n);if(e==="s"||e==="S")return this.stage.orbitBy(0,n);if(!(this.phase!=="aim"||this.drag)&&(e==="ArrowLeft"||e==="ArrowRight"||e==="a"||e==="d"||e==="A"||e==="D")){t.preventDefault();const s=e==="ArrowLeft"||e==="a"||e==="A"?1:-1,r=t.shiftKey?.004:.025;this.slideTo(Math.min(1,Math.max(0,this.ropeT()+s*r))),this.refreshHud()}}ropeT(){const t=tn(this.state),e=t.end.x-t.start.x,n=t.end.y-t.start.y;return((this.shooter.x-t.start.x)*e+(this.shooter.y-t.start.y)*n)/(e*e+n*n)}updateCursor(t){if(t.pointerType!=="mouse")return;const e=this.stage.canvas;if(this.drag){e.style.cursor=this.drag.kind==="slide"?"ew-resize":"grabbing";return}if(this.looking){e.style.cursor="grab";return}if(this.phase!=="aim"){e.style.cursor=this.phase==="rolling"?"pointer":"default";return}const n=this.stage.pick(t.clientX,t.clientY),s=this.state,r=Ye(s),o=this.touchTolerance();if(!n||!Fc(r,n,0)&&Math.hypot(n.x-this.shooter.x,n.y-this.shooter.y)>de(s,"shooter")+o*.6){e.style.cursor="grab";return}if(qe(s)&&vn(s).some(h=>Math.hypot(n.x-r.pockets[h].x,n.y-r.pockets[h].y)<r.spec.pocketRadius+o)){e.style.cursor="pointer";return}const a=tn(s),c=gs(n,a.start,a.end),l=Math.hypot(n.x-this.shooter.x,n.y-this.shooter.y)<de(s,"shooter")+o*.6;e.style.cursor=!l&&Math.hypot(c.x-n.x,c.y-n.y)<o?"ew-resize":"grab"}onMove(t){this.updateCursor(t),this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY});const e=this.drag;if(e?.kind==="orbit2"){t.preventDefault();const u=[...this.pointers.values()];if(u.length<2)return;const[d,f]=u,g=(d.x+f.x)/2,v=(d.y+f.y)/2,m=Math.hypot(d.x-f.x,d.y-f.y);this.stage.orbitBy(g-e.cx,v-e.cy),e.dist>10&&m>10&&this.stage.zoomBy(e.dist/m),e.cx=g,e.cy=v,e.dist=m;return}if(e?.kind==="orbit"){if(e.pointerId!==t.pointerId)return;t.preventDefault();const u=t.clientX-e.x,d=t.clientY-e.y;e.moved+=Math.abs(u)+Math.abs(d),e.x=t.clientX,e.y=t.clientY,e.centre?this.stage.orbitCenterBy(u,d):this.stage.orbitBy(u,d);return}if(!e||e.pointerId!==t.pointerId||this.phase!=="aim")return;t.preventDefault();const n=this.stage.pick(t.clientX,t.clientY);if(!n)return;if(e.kind==="slide"){this.moveShooterTo(n);return}let s,r,o;if(e.style==="flick"){e.samples.push({t:t.timeStamp,x:t.clientX,y:t.clientY,w:n}),e.samples.length>24&&e.samples.shift();const u=this.flickOf(e.samples,t.timeStamp);s=u.power,r=u.vx,o=u.vy}else{const u=Math.hypot(t.clientX-e.sx,t.clientY-e.sy),d=Math.min(window.innerWidth,window.innerHeight)*Vx;s=Math.min(1,u/d),r=e.start.x-n.x,o=e.start.y-n.y}const a=Math.hypot(r,o);if(s<Sh||a<1e-6){e.dir=null,e.power=0,this.aim.clearAim(),this.hud.setPower(null);return}e.dir={x:r/a,y:o/a},e.power=s;const c=this.state,l=jn(c).map(u=>({id:u.id,x:u.loc.x,y:u.loc.y,r:de(c,u.kind)})),h=c.config.aimGuide?$d(Ye(c),l,this.shooter,e.dir,de(c,"shooter")):null;this.aim.showAim(this.shooter,e.dir,s,de(c,"shooter"),h),this.hud.setPower(s)}onUp(t){this.pointers.delete(t.pointerId),this.capture(t.pointerId,!1);const e=this.drag;if(e?.kind==="orbit2"){this.drag=null;return}if(!e||e.pointerId!==t.pointerId)return;if(this.drag=null,e.kind==="orbit"){e.tapSpeedsUp&&e.moved<8&&(this.speed=3);return}if(this.aim.clearAim(),this.hud.setPower(null),e.kind==="pull"&&e.style==="flick"){const s=this.stage.pick(t.clientX,t.clientY);s&&e.samples.push({t:t.timeStamp,x:t.clientX,y:t.clientY,w:s});const r=this.flickOf(e.samples,t.timeStamp),o=Math.hypot(r.vx,r.vy);e.dir=o>1e-6?{x:r.vx/o,y:r.vy/o}:null,e.power=r.power}if(e.kind!=="pull"||this.phase!=="aim"||!e.dir||e.power<Sh)return;if(Es(this.state,this.shooter)){this.hud.toast("Slide the shooter clear of other pieces first.","bad");return}this.shoot(e.dir,e.power)}flickOf(t,e){return Bx(t,e,this.frameMs,Math.min(window.innerWidth,window.innerHeight))}capture(t,e){try{e?this.stage.canvas.setPointerCapture(t):this.stage.canvas.releasePointerCapture(t)}catch{}}cancelDrag(){this.drag=null,this.stage.canvas.style.cursor="",this.aim.clearAim(),this.hud.setPower(null)}moveShooterTo(t){const e=tn(this.state);this.shooter=gs(t,e.start,e.end),this.refreshShooter(),this.refreshHud()}get actionsApplied(){return this.applied}exposeDebug(){window.__chipwreck={state:()=>this.state,phase:()=>this.phase,ai:()=>this.aiTurn?{stage:this.aiTurn.stage,planned:!!this.aiTurn.input}:null,shooterAt:()=>[...this.pieces.shooter.position.toArray(),this.pieces.shooter.visible],shoot:(t,e,n,s)=>{s!==void 0&&(this.called=s);const r=Math.hypot(t,e);this.shoot({x:t/r,y:e/r},n)},slide:t=>this.slideTo(t),drag:()=>this.drag&&this.drag.kind==="pull"?{style:this.drag.style,power:this.drag.power,dir:this.drag.dir}:this.drag?.kind??null,view:()=>this.toggleView(),screen:(t,e)=>{const n=_e({x:t,y:e},0).project(this.stage.camera),s=this.stage.canvas.getBoundingClientRect();return[s.left+(n.x+1)/2*s.width,s.top+(1-n.y)/2*s.height]},adjusted:()=>this.stage.adjusted,shooterSpot:()=>({...this.shooter})}}dispose(){this.disposed=!0,this.ai.dispose(),cancelAnimationFrame(this.raf),window.clearTimeout(this.settleTimer),this.cleanup.forEach(t=>t()),this.stage.scene.remove(this.board.group,this.pieces.group,this.aim.group),this.board.dispose(),this.pieces.dispose(),this.aim.dispose(),this.hud.dispose(),document.querySelectorAll(".overlay").forEach(t=>t.remove())}}function Wx(i){if(!/^https?:$/.test(location.protocol))return;const t=()=>{i()&&fetch(`version.json?t=${Date.now()}`,{cache:"no-store"}).then(e=>e.ok?e.json():null).then(e=>{if(!e||!(typeof e.build=="number"&&e.build>2610141755)||!i())return;try{if(sessionStorage.getItem("chipwreck.reload")===String(e.build))return;sessionStorage.setItem("chipwreck.reload",String(e.build))}catch{}const n=new URL(location.href);n.searchParams.set("v",String(e.build)),location.replace(n.href)}).catch(()=>{})};t(),addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&t()})}function Xu(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4)}class $u{constructor(t,e,n,s){O(this,"mine",{});O(this,"others",new Map);O(this,"listeners",new Set);O(this,"gone",!1);this.name=t,this.me=e,this.writeMine=n,this.onLeave=s}async presence(t){if(this.gone)return;const e={...this.mine};for(const[n,s]of Object.entries(t))s==null?delete e[n]:e[n]=s;this.mine=e,await this.writeMine(e),this.emit()}remote(t,e){this.gone||t===this.me||(e?this.others.set(t,e):this.others.delete(t),this.emit())}replaceAll(t){this.gone||(this.others=new Map([...t].filter(([e])=>e!==this.me)),this.emit())}current(){return this.mine}peers(){return[{peer:this.me,isMe:!0,presence:this.mine},...[...this.others].map(([t,e])=>({peer:t,isMe:!1,presence:e}))]}onPeers(t){return this.listeners.add(t),queueMicrotask(()=>this.listeners.has(t)&&t(this.peers())),()=>this.listeners.delete(t)}emit(){const t=this.peers();for(const e of[...this.listeners])e(t)}async leave(){this.gone||(this.gone=!0,this.listeners.clear(),await this.onLeave())}}const Xx={apiKey:"AIzaSyDLVtNfjOTYy9_Fl3_X45plld08udcGh5k",authDomain:"jelly-flip.firebaseapp.com",databaseURL:"https://jelly-flip-default-rtdb.firebaseio.com",projectId:"jelly-flip",storageBucket:"jelly-flip.firebasestorage.app",messagingSenderId:"790326695298",appId:"1:790326695298:web:fb983b84ae5e33c3f82b9b"},$x="https://www.gstatic.com/firebasejs/10.12.2/",wh="jf/rooms";class qx{constructor(){O(this,"kind","firebase");O(this,"me",Xu());O(this,"status","loading");O(this,"statusMsg","");O(this,"core",null);O(this,"listeners",new Set)}onStatus(t){return this.listeners.add(t),()=>this.listeners.delete(t)}set(t,e=""){this.status==="error"&&t!=="error"||(this.status=t,this.statusMsg=e,this.listeners.forEach(n=>n(t)))}connect(){if(!this.core){this.core=(async()=>{const e=l=>import($x+l),[n,s,r]=await Promise.all(["firebase-app.js","firebase-auth.js","firebase-database.js"].map(e)),o=n.initializeApp(Xx,"chipwreck");this.set("connecting");const a=(await s.signInAnonymously(s.getAuth(o))).user.uid,c=r.getDatabase(o);return r.onValue(r.ref(c,".info/connected"),l=>this.set(l.val()?"online":"connecting")),{D:r,db:c,uid:a}})();const t=new Promise((e,n)=>setTimeout(()=>n(new Error("timed out")),2e4));Promise.race([this.core,t]).catch(e=>this.set("error",String(e&&(e.code||e.message)||e)))}return this.core}async join(t){const{D:e,db:n,uid:s}=await this.connect(),r=e.ref(n,`${wh}/${t}/peers`),o=e.ref(n,`${wh}/${t}/peers/${this.me}`);let a=null;const c=new $u(t,this.me,l=>e.set(o,{uid:s,p:JSON.stringify(l),t:e.serverTimestamp()}),async()=>{a?.();try{await e.onDisconnect(o).cancel(),await e.remove(o)}catch{}});return e.onDisconnect(o).remove(),await c.presence({}),a=e.onValue(r,l=>{const h=l.val()??{},u=new Map;for(const[d,f]of Object.entries(h))try{u.set(d,JSON.parse(f?.p??"{}"))}catch{u.set(d,{})}c.replaceAll(u)},l=>this.set("error",String(l?.code??l))),c}}class Yx{constructor(){O(this,"kind","local");O(this,"me",Xu());O(this,"status","online");O(this,"statusMsg","");O(this,"ch",new BroadcastChannel("chipwreck-net"));O(this,"rooms",new Map);this.ch.onmessage=t=>{const e=t.data,n=this.rooms.get(e.room);!n||e.peer===this.me||(n.remote(e.peer,e.p),e.hello&&this.ch.postMessage({room:e.room,peer:this.me,p:n.current()}))},addEventListener("pagehide",()=>{for(const t of this.rooms.keys())this.ch.postMessage({room:t,peer:this.me,p:null})})}onStatus(){return()=>{}}async join(t){const e=new $u(t,this.me,async n=>this.ch.postMessage({room:t,peer:this.me,p:n}),async()=>{this.rooms.delete(t),this.ch.postMessage({room:t,peer:this.me,p:null})});return this.rooms.set(t,e),this.ch.postMessage({room:t,peer:this.me,p:{},hello:!0}),e}}const bh="abcdefghjkmnpqrstuvwxyz";function jx(i=Math.random){return Array.from({length:4},()=>bh[Math.floor(i()*bh.length)]).join("")}function vc(i){return String(i??"").toLowerCase().replace(/[^a-z]/g,"").slice(0,4)}function Fs(i,t=16){return String(i??"").replace(/[\u0000-\u001f<>]/g,"").trim().slice(0,t)}const qu=i=>`cw-${i}`,Zx="cw-lobby";function Yu(i){return JSON.stringify(i)}function ju(i){if(typeof i!="string"||i.length>400)return null;let t;try{t=JSON.parse(i)}catch{return null}const e=t;if(!e||typeof e!="object")return null;if(e.t==="c")return Ya.includes(e.k)?{t:"c",k:e.k}:null;if(e.t==="p")return{t:"p"};if(e.t!=="s")return null;const n=e.i,s=c=>{const l=c;return l&&typeof l.x=="number"&&typeof l.y=="number"&&Number.isFinite(l.x)&&Number.isFinite(l.y)?{x:l.x,y:l.y}:null},r=s(n?.shooter),o=s(n?.velocity);if(!r||!o)return null;const a={shooter:r,velocity:o};if(n.calledPocket!==void 0){if(!Number.isInteger(n.calledPocket))return null;a.calledPocket=n.calledPocket}return{t:"s",i:a}}function Eh(i,t,e){return i.status!=="playing"?"The match is over":e.t==="c"?i.pending?i.pending.report.player!==t?"Not your choice":(i.pending.report.claimOptions??[]).includes(e.k)?null:"That type cannot be claimed":"Nothing to choose":i.pending?"Waiting for a claim choice":i.current!==t?"Not your turn":e.t==="p"?Za(i)?"You can only pass when your rope is blocked":null:ai(i,e.i)}function Jx(i){return JSON.stringify({...i,history:[]})}function Kx(i,t){const e=n=>JSON.stringify([n.pieces,n.current,n.turn,n.shotInTurn,n.claims,n.out,n.standby,n.status,n.winner,n.pending?.report.claimOptions??null]);return e(i)===e(t)}function zo(i,t){return i.here.flatMap((e,n)=>!e&&!(i.seats[n]&&t.has(i.seats[n]))?[n]:[])}function fs(i){return new Set(i.map(t=>t.peer))}function Va(i){return i.pending?i.pending.report.player:i.current}class _c{constructor(t){O(this,"games",[]);O(this,"listeners",new Set);this.room=t,t.onPeers(e=>{this.games=e.filter(n=>!n.isMe).map(n=>n.presence.host).filter(n=>!!n&&typeof n.code=="string"&&n.st!=="over").map(n=>({code:n.code.replace(/[^a-z]/g,"").slice(0,4),name:Fs(n.name)||"Someone",open:Number(n.open)|0,st:n.st})),this.listeners.forEach(n=>n())})}static async open(t){return new _c(await t.join(Zx))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}announce(t){this.room.presence({host:t}).catch(()=>{})}}class xc{constructor(t,e,n,s,r){O(this,"g");O(this,"peers",[]);O(this,"listeners",new Set);O(this,"starts",new Set);O(this,"handlers",null);O(this,"ready",null);O(this,"closed",!1);this.room=t,this.lobby=e,this.g={v:1,code:r,st:"wait",round:0,cfg:structuredClone(n),here:[...s],seats:{},log:[],n:0,snap:null,acks:{}},t.onPeers(o=>this.onPeers(o)),this.publish()}static async open(t,e,n,s){if(s.length!==n.players.length)throw new Error("here[] must match players");if(!s.some(o=>!o))throw new Error("An online game needs at least one remote player");const r=jx();return new xc(await t.join(qu(r)),e,n,s,r)}get code(){return this.g.code}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}onStart(t){return this.starts.add(t),()=>this.starts.delete(t)}emit(){this.listeners.forEach(t=>t())}publish(){if(this.closed)return;this.room.presence({g:this.g}).catch(()=>{});const t=fs(this.peers);this.lobby?.announce({code:this.g.code,name:this.hostName(),open:zo(this.g,t).length,st:this.g.st})}hostName(){const t=this.g.here.findIndex((e,n)=>e&&!this.g.cfg.players[n].ai);return t>=0?this.g.cfg.players[t].name:"Host"}seat(t){if(this.g.here[t])return{kind:"here"};const e=this.g.seats[t];return e?{kind:"taken",present:fs(this.peers).has(e)}:{kind:"open"}}canStart(){return zo(this.g,fs(this.peers)).length===0}onPeers(t){this.peers=t;const e=fs(t);let n=!1;for(const s of t){if(s.isMe)continue;const r=s.presence,o=r.claim;if(!Number.isInteger(o)||o<0||o>=this.g.here.length||this.g.here[o])continue;const a=this.g.seats[o],c=Fs(r.name);if(a===s.peer){c&&this.g.st==="wait"&&c!==this.g.cfg.players[o].name&&(this.g.cfg.players[o].name=c,n=!0);continue}a&&e.has(a)||Object.values(this.g.seats).includes(s.peer)||(this.g.seats[o]=s.peer,c&&this.g.st==="wait"&&(this.g.cfg.players[o].name=c),n=!0)}n?this.publish():this.lobby?.announce({code:this.g.code,name:this.hostName(),open:zo(this.g,e).length,st:this.g.st}),this.tryRequests(),this.emit()}start(){this.g.st="play",this.g.round++,this.g.log=[],this.g.n=0,this.g.snap=null,this.g.acks={},this.ready=null,this.publish();const t=ks(this.g.cfg),e=this.link();this.starts.forEach(n=>n(t,0,e)),this.emit()}takeOver(t){this.g.here[t]===void 0||this.g.here[t]||(this.g.here[t]=!0,delete this.g.seats[t],this.publish(),this.emit())}append(t){this.ready=null,this.g.log.push(Yu(t)),this.publish(),this.handlers?.action(t)}tryRequests(){const t=this.ready;if(!t||this.g.st!=="play")return;let e=!1;for(const n of this.peers){if(n.isMe)continue;const s=n.presence.req;if(!s||!Number.isInteger(s.n))continue;const r=Object.keys(this.g.seats).find(a=>this.g.seats[a]===n.peer);if(r===void 0||s.n<=(this.g.acks[r]??0))continue;this.g.acks[r]=s.n,e=!0;const o=ju(s.a);if(o&&!Eh(t,Number(r),o))return this.append(o)}e&&this.publish()}link(){const t=this;return{online:!0,isHost:!0,canAct:e=>!!t.g.here[e],submit:e=>{t.ready&&!Eh(t.ready,Va(t.ready),e)&&t.append(e)},connect:e=>{t.handlers=e},applied:(e,n)=>{t.g.n=n,t.g.snap=Jx(e),e.status!=="playing"&&(t.g.st="over"),t.publish()},idle:e=>{t.ready=e,t.tryRequests()},waiting:e=>{const n=Va(e);if(e.status!=="playing"||t.g.here[n])return null;const s=e.config.players[n].name,r=t.g.seats[n];return r&&fs(t.peers).has(r)?`Waiting for ${s}…`:`Waiting for ${s} to reconnect… (Menu → play their turns here)`},sending:()=>!1,dispose:()=>{t.handlers=null}}}async leave(){this.closed||(this.closed=!0,this.lobby?.announce(null),this.listeners.clear(),this.starts.clear(),await this.room.leave())}}class yc{constructor(t,e,n,s){O(this,"g",null);O(this,"hostHere",!1);O(this,"name");O(this,"listeners",new Set);O(this,"starts",new Set);O(this,"handlers",null);O(this,"round",-1);O(this,"delivered",0);O(this,"reqN",0);O(this,"waitingAck",!1);O(this,"lastApplied",null);O(this,"closed",!1);O(this,"joinedAt",Date.now());this.net=t,this.room=e,this.code=n,this.name=Fs(s)||"Friend",e.presence({name:this.name}).catch(()=>{}),e.onPeers(r=>this.onPeers(r))}static async join(t,e,n){return new yc(t,await t.join(qu(e)),e,n)}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}onStart(t){return this.starts.add(t),()=>this.starts.delete(t)}get mySeat(){if(!this.g)return null;const t=Object.keys(this.g.seats).find(e=>this.g.seats[e]===this.net.me);return t===void 0?null:Number(t)}claim(t){this.room.presence({claim:t,name:this.name}).catch(()=>{})}setName(t){this.name=Fs(t)||this.name,this.room.presence({name:this.name}).catch(()=>{})}onPeers(t){const e=t.find(n=>!n.isMe&&n.presence.g?.code===this.code);if(this.hostHere=!!e,e){const n=e.presence.g;this.g=n;const s=this.mySeat;this.waitingAck&&s!==null&&(n.acks[s]??0)>=this.reqN&&(this.waitingAck=!1),(n.st==="play"||n.st==="over")&&n.round!==this.round?this.startRound(n):n.round===this.round&&this.deliver(n)}this.emit()}startRound(t){this.round=t.round;let e;try{e=t.snap?Xo(JSON.parse(t.snap)):ks(t.cfg)}catch{return}this.delivered=t.snap?t.n:0,this.lastApplied=null,this.waitingAck=!1;const n=this.link();this.starts.forEach(s=>s(e,this.delivered,n)),this.deliver(t)}deliver(t){for(;this.handlers&&this.delivered<t.log.length;){const e=ju(t.log[this.delivered]);this.delivered++,e&&this.handlers.action(e)}this.checkSnapshot()}checkSnapshot(){const t=this.g,e=this.lastApplied;if(!(!t?.snap||!e||t.n!==e.count))try{const n=Xo(JSON.parse(t.snap));Kx(e.state,n)||(this.lastApplied={state:n,count:t.n},this.handlers?.correct(n,t.n))}catch{}}emit(){this.listeners.forEach(t=>t())}link(){const t=this;return{online:!0,isHost:!1,canAct:e=>t.hostHere&&t.mySeat===e,submit:e=>{const n=t.mySeat;n===null||t.waitingAck||(t.reqN=Math.max(t.reqN,t.g?.acks[n]??0)+1,t.waitingAck=!0,t.room.presence({req:{n:t.reqN,a:Yu(e)}}).catch(()=>t.waitingAck=!1))},connect:e=>{t.handlers=e,t.g&&t.deliver(t.g)},applied:(e,n)=>{t.lastApplied={state:e,count:n},t.checkSnapshot()},idle:()=>{},waiting:e=>{if(!t.hostHere)return"The host has left — waiting for them to come back…";if(t.waitingAck)return"Sending your shot to the table…";const n=Va(e);return e.status!=="playing"||t.mySeat===n?null:`Waiting for ${e.config.players[n].name}…`},sending:()=>t.waitingAck,dispose:()=>{t.handlers=null}}}async leave(){this.closed||(this.closed=!0,this.listeners.clear(),this.starts.clear(),await this.room.leave())}}const Zu="https://figgdkwdlqwdkqhwslcp.supabase.co",Ju="sb_publishable_dEymxz_QMyqHqzMmw0oxBw_sXZJumbt",Th="chipwreck",Mc="chipwreck.theme.cache.v1";function Qx(i){try{const t=localStorage.getItem(i);return t?JSON.parse(t):null}catch{return null}}function Ku(i,t){try{return t===null?localStorage.removeItem(i):localStorage.setItem(i,JSON.stringify(t)),!0}catch{return!1}}function ty(){const i=Qx(Mc);return i?qr(i):null}async function Qu(i=5e3){const t=new AbortController,e=setTimeout(()=>t.abort(),i);try{const n=await fetch(`${Zu}/rest/v1/chipwreck_content?id=eq.theme&select=data`,{headers:{apikey:Ju},signal:t.signal,cache:"no-store"});if(!n.ok)return null;const s=await n.json();return s[0]?(Ku(Mc,s[0].data),qr(s[0].data)):null}catch{return null}finally{clearTimeout(e)}}let Ho=null;function td(){return Ho||(Ho=Rh(async()=>{const{createClient:i}=await import("./index-T0LSmlZh.js");return{createClient:i}},[],import.meta.url).then(({createClient:i})=>i(Zu,Ju,{auth:{flowType:"pkce",detectSessionInUrl:!0,persistSession:!0}}))),Ho}const ey=40*1024*1024;function ny(i){const t=i.lastIndexOf("."),e=t>0?i.slice(t+1).toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,5):"bin";return`${(t>0?i.slice(0,t):i).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40)||"file"}-${Date.now().toString(36)}.${e}`}function iy(i){if(i.size>ey)throw new Error(`That file is ${(i.size/1048576).toFixed(1)} MB — the limit is 40 MB.`);if(!/^(image|audio)\//.test(i.type))throw new Error("Only pictures and sound files can be uploaded.")}async function xy(){const i=await td(),{data:t}=await i.auth.getSession(),e=t.session?.user;if(!e)return null;const{data:n}=await i.from("chipwreck_admins").select("user_id").eq("user_id",e.id).maybeSingle(),s=e.user_metadata??{};return{online:!0,name:s.full_name||s.name||e.email||"Signed in",email:e.email??"",isAdmin:!!n,upload:async(r,o)=>{iy(r);const a=`${o.replace(/[^a-z0-9/-]/gi,"")}/${ny(r.name)}`,{error:c}=await i.storage.from(Th).upload(a,r,{cacheControl:"31536000",contentType:r.type,upsert:!1});if(c)throw new Error(`Upload failed: ${c.message}`);return i.storage.from(Th).getPublicUrl(a).data.publicUrl},publish:async r=>{const{error:o}=await i.from("chipwreck_content").upsert({id:"theme",data:r,updated_at:new Date().toISOString()});if(o)throw new Error(`Publishing failed: ${o.message}`);Ku(Mc,r)},published:()=>Qu(),signOut:async()=>{await i.auth.signOut()}}}async function yy(){const i=await td(),t=new URL(location.href);t.hash="";const{error:e}=await i.auth.signInWithOAuth({provider:"google",options:{redirectTo:t.href}});if(e)throw new Error(e.message)}function sy(i){const t=new URL(location.href);return t.search="",t.hash="",t.searchParams.set("join",i),t.href}async function ry(i,t){const e=sy(i);try{if(navigator.share){await navigator.share({title:"ChipWreck",text:`Join my ChipWreck game — code ${i.toUpperCase()}`,url:e});return}await navigator.clipboard.writeText(e),t.textContent="Link copied!",setTimeout(()=>t.textContent="Copy link",1800)}catch{}}function oy(i,t,e,n){const s=te("div",{class:"wait"});i.append(s);const r=()=>{const a=t.g,c=a.cfg.players.map((l,h)=>{const u=a.cfg.teams[l.team],d=t.seat(h),f=l.ai?`Computer · ${Ts[l.ai]}`:d.kind==="here"?"On this device":d.kind==="open"?"Waiting for a player…":d.present?"Joined ✓":"Left — waiting for them to come back",g=d.kind==="here"||d.kind==="taken"&&d.present;return`<div class="wait-seat" style="--team:${Kt(u.color)}"><span class="who">${Kt(d.kind==="open"?`Seat ${h+1}`:l.name)}</span><span class="st${g?" ok":""}">${f}</span></div>`}).join("");s.innerHTML=`<div class="wait-card">
      <h2>Waiting for players</h2>
      <div class="roomcode"><span class="label">Game code</span><b class="code">${Kt(a.code.toUpperCase())}</b>
        <button class="btn small" data-act="share">${typeof navigator.share=="function"?"Share link":"Copy link"}</button></div>
      <p class="note">Friends tap <b>Have a game code?</b> on the ChipWreck start screen, or open the link, and they’re taken straight here. It also shows under <b>Online games</b> as “${Kt(t.hostName())}’s game”.</p>
      <div class="wait-seats">${c}</div>
      <button class="btn primary wide" data-act="start" ${t.canStart()?"":"disabled"}>${t.canStart()?"Start the game":"Waiting for everyone to join…"}</button>
      <button class="btn wide" data-act="cancel">Cancel</button>
    </div>`};s.addEventListener("click",a=>{const c=a.target.closest("button");c&&(c.dataset.act==="share"&&ry(t.code,c),c.dataset.act==="start"&&t.canStart()&&e(),c.dataset.act==="cancel"&&n())});const o=t.onChange(r);return r(),()=>{o(),s.remove()}}function ay(i,t,e){const n=te("div",{class:"wait"});i.append(n);let s=!1;const r=()=>{const a=t.g;s||(n.innerHTML=`<div class="wait-card">
        <h2>Game ${Kt(t.code.toUpperCase())}</h2>
        <div class="wait-head"></div>
        <label class="player" style="--team:#e7b73c"><span class="seat">You</span><input data-myname maxlength="16" value="${Kt(t.name)}" aria-label="Your name" /><span></span></label>
        <div class="wait-seats"></div>
        <button class="btn wide" data-act="leave">Leave</button>
      </div>`,s=!0);const c=n.querySelector(".wait-head"),l=n.querySelector(".wait-seats");if(!a){const u=Date.now()-t.joinedAt>6e3;u||setTimeout(r,6200),c.innerHTML=`<p class="note">${u?"No open game has this code yet. Check the code with the host; if they’re still setting up, it appears here as soon as they open it.":"Finding the game…"}</p>`,l.innerHTML="";return}const h=t.mySeat;c.innerHTML=`<p class="note">${t.hostHere?h===null?"Pick your seat:":a.st==="wait"?"You’re in! Waiting for the host to start the game…":"Rejoining the game…":"The host isn’t here right now — the game continues when they’re back."}</p>`,l.innerHTML=a.cfg.players.map((u,d)=>{const f=a.cfg.teams[u.team],g=!a.here[d],v=!!a.seats[d],m=h===d,p=m?'<span class="st ok">Your seat ✓</span>':u.ai?`<span class="st">Computer · ${Ts[u.ai]}</span>`:g?`<button class="btn small${v?"":" primary"}" data-seat="${d}">${v?"Take over":"Take seat"}</button>`:'<span class="st">Host’s device</span>';return`<div class="wait-seat${m?" mine":""}" style="--team:${Kt(f.color)}"><span class="who">${Kt(u.name)}<small class="st"> · ${Kt(f.name)}</small></span>${p}</div>`}).join("")};n.addEventListener("click",a=>{const c=a.target.closest("button");c&&(c.dataset.seat&&t.claim(Number(c.dataset.seat)),c.dataset.act==="leave"&&e())}),n.addEventListener("input",a=>{const c=a.target;if(c.dataset.myname===void 0)return;const l=Fs(c.value);l&&t.setName(l)});const o=t.onChange(r);return r(),()=>{o(),n.remove()}}function cy(i,t){let e="versus",n="normal",s="out",r=!0,o=t.flick,a="local";const c=[!0,!1,!1,!1,!1,!1],l=[null,null,null,null,null,null];let h="",u="",d=2,f=jr(2);const g=Array.from({length:6},(L,E)=>t.names[E]??`Player ${E+1}`),v=te("div",{class:"setup"});i.append(v);const m=()=>{const L=ve(),E=e==="versus"?qo(d):[],A=e==="versus"?Wh(f):Array.from({length:d},()=>-1),P=e==="versus"?2:1;v.innerHTML=`
      <div class="setup-card">
        <div class="badge" aria-label="ChipWreck — ${Kt(L.text.tagline)}">
          <img class="logo-img" src="${Kt(L.text.logo??"logo.webp")}" ${L.text.logo?"":'width="1004" height="400" '}alt="ChipWreck" decoding="async" />
          ${L.text.tagline?`<div class="tag">${Kt(L.text.tagline)}</div>`:""}
        </div>
        ${t.canResume?'<button class="btn primary wide" data-act="resume">Resume saved game</button>':""}
        <div class="seg" role="tablist" aria-label="Game mode">
          <button role="tab" aria-selected="${e==="versus"}" data-mode="versus">Versus</button>
          <button role="tab" aria-selected="${e==="coop"}" data-mode="coop">Rescue (co-op)</button>
        </div>
        <div class="row">
          <span class="label">Players</span>
          <div class="stepper">
            <button data-step="-1" aria-label="Fewer players" ${d<=P?"disabled":""}>−</button>
            <output aria-live="polite">${d}</output>
            <button data-step="1" aria-label="More players" ${d>=6?"disabled":""}>+</button>
          </div>
        </div>
        ${e==="versus"?`
        <div class="row wrap">
          <span class="label">Teams</span>
          <div class="layouts">
            ${E.map((M,x)=>`<button class="pill${M.join()===f.join()?" on":""}" data-layout="${x}">${Vd(M)}</button>`).join("")}
          </div>
        </div>
        <p class="note">${Gd(f.length)}</p>`:""}
        ${t.online?`
        <div class="seg" role="tablist" aria-label="Where is everyone playing">
          <button role="tab" aria-selected="${a==="local"}" data-where="local">Same device</button>
          <button role="tab" aria-selected="${a==="online"}" data-where="online">Online</button>
        </div>`:""}
        <div class="players">
          ${A.map((M,x)=>{const C=M>=0?$o[M].color:"#e7b73c",B=M>=0?$o[M].name:"Crew",D=`<select class="who${l[x]?" cpu":""}" data-ai="${x}" aria-label="Who plays seat ${x+1}">
                  <option value=""${l[x]?"":" selected"}>Person</option>
                  ${qd.map(H=>`<option value="${H}"${l[x]===H?" selected":""}>Computer · ${Ts[H]}</option>`).join("")}
                </select>`,k=a==="online"&&!l[x]?`<button class="pill where${c[x]?" on":""}" data-here="${x}" aria-pressed="${c[x]}">${c[x]?"This device":"Online"}</button>`:"",G=`<div class="seat-opts">${D}${k}</div>`;return`<label class="player with-where" style="--team:${C}"><span class="seat">${x+1}</span>
              <input data-name="${x}" maxlength="24" value="${Kt(g[x])}" aria-label="Player ${x+1} name"${a==="online"&&!c[x]&&!l[x]?' placeholder="Joins online"':""} />
              <span class="team">${B}</span>${G}</label>`}).join("")}
        </div>
        ${a==="online"?'<p class="note">Players marked Online join from their own phone or computer with a game code. Their names fill in when they join.</p>':""}
        <p class="note">Seat 1 starts — by lifeboat tradition, the youngest sailor. Play passes to the left.</p>
        <div class="row">
          <span class="label">Sea salt</span>
          <div class="layouts">
            ${["light","normal","heavy"].map(M=>`<button class="pill${n===M?" on":""}" data-salt="${M}">${M==="light"?"Light":M==="normal"?"Normal":"Heavy"}</button>`).join("")}
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
        ${u?`<p class="err">${Kt(u)}</p>`:""}
        ${t.online?'<section class="online-panel" aria-label="Online games"></section>':""}
        <details class="rules"><summary>How to play</summary>${L.text.story?`<p class="story">${L.text.story}</p>`:""}${L.text.rules}</details>
        <footer class="credits">
          <p>${Kt(L.text.credit)}</p>
          <p>Copyright © ${new Date().getFullYear()} <a href="https://grudgematchgames.com" target="_blank" rel="noopener">Grudge Match Games</a></p>
        </footer>
      </div>`};v.addEventListener("click",L=>{const E=L.target.closest("button");if(E){if(E.dataset.mode)e=E.dataset.mode,e==="versus"&&d<2&&(d=2),f=jr(Math.max(2,d))??[1,1];else if(E.dataset.step)d=Math.min(6,Math.max(e==="versus"?2:1,d+Number(E.dataset.step))),e==="versus"&&(f=jr(d));else if(E.dataset.where)a=E.dataset.where,u="";else if(E.dataset.here){const A=Number(E.dataset.here);c[A]=!c[A],u=""}else if(E.dataset.joinCode!==void 0){t.online?.join(E.dataset.joinCode,g[0].trim()||"Friend");return}else if(E.dataset.act==="join"){const A=vc(h);if(A.length!==4)return u="Game codes are 4 letters.",m();t.online?.join(A,g[0].trim()||"Friend");return}else if(E.dataset.salt)n=E.dataset.salt;else if(E.dataset.flick)o=E.dataset.flick,t.onFlick(o);else if(E.dataset.guide)r=E.dataset.guide==="on";else if(E.dataset.foul)s=E.dataset.foul;else if(E.dataset.layout)f=qo(d)[Number(E.dataset.layout)];else if(E.dataset.act==="resume"){t.onResume();return}else if(E.dataset.act==="start"){const A=l.slice(0,d),P=A.filter(Boolean).length>1,M=g.slice(0,d).map((D,k)=>{const G=D.trim();return A[k]&&(!G||G===`Player ${k+1}`)?P?`Computer ${k+1}`:"Computer":G||`Player ${k+1}`});if(A.every(Boolean))return u="At least one seat needs a person — set one to “Person”.",m();const x={salt:n,captainFoul:s,aimGuide:r},C=e==="versus"?Wd(f,M,x):Xd(d,M,x);A.forEach((D,k)=>{D&&(C.players[k].ai=D)});const B={config:C,names:g};if(a==="online"&&t.online){const D=c.slice(0,d).map((k,G)=>k||!!A[G]);if(!D.includes(!1))return u="Mark at least one person as Online — or play on this device with “Same device”.",m();t.online.host(B,D);return}t.onStart(B);return}m(),p()}}),v.addEventListener("change",L=>{const E=L.target;E.dataset.ai!==void 0&&(l[Number(E.dataset.ai)]=E.value||null,u="",m(),p())}),v.addEventListener("input",L=>{const E=L.target;E.dataset.name&&(g[Number(E.dataset.name)]=E.value),E.dataset.code!==void 0&&(h=E.value)}),v.addEventListener("keydown",L=>{const E=L.target;L.key==="Enter"&&E.dataset.code!==void 0&&v.querySelector('[data-act="join"]')?.click()});const p=()=>{const L=v.querySelector(".online-panel");if(!L||!t.online)return;const E=document.activeElement instanceof HTMLInputElement&&document.activeElement.dataset.code!==void 0,A=t.online.games(),P=t.online.status(),M=A.length?`<div class="hosts">${A.map(C=>`<div class="hostrow"><div><b>${Kt(C.name)}’s game</b><small>${C.st==="play"?"In progress":"Waiting for players"} · ${C.open} open seat${C.open===1?"":"s"}</small></div><button class="btn primary small" data-join-code="${Kt(C.code)}">Join</button></div>`).join("")}</div>`:'<p class="note">No games open right now.</p>',x=`<div class="joinrow"><input data-code maxlength="4" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="Code" aria-label="Game code" value="${Kt(h.toUpperCase())}" /><button class="btn small" data-act="join">Join</button></div>`;if(E){const C=L.querySelector(".games");C&&(C.innerHTML=M);return}L.innerHTML=`<h3>Online games</h3><div class="games">${M}</div><p class="label small">Have a game code?</p>${x}${P?`<p class="note">${Kt(P)}</p>`:""}`},b=t.online?.onChange(p),w=m,_=()=>{w(),p()};return v.addEventListener("click",()=>queueMicrotask(p)),_(),()=>{b?.(),v.remove()}}const vi=document.getElementById("app"),ly=document.getElementById("scene"),Be=Hx();za.setEnabled(Be.music);const Sc=new URLSearchParams(location.search),ed=Sc.has("admin");{const i=ty();i&&Ou(i),ku()}let qn;try{qn=new Cx(ly)}catch(i){throw console.error(i),vi.innerHTML='<div class="fatal"><h1>ChipWreck</h1><p>This device could not start 3D graphics (WebGL). Try another browser or update your device.</p></div>',i}let Ce=null,Os=null,Or=null;const xn=Sc.get("net")==="local"?new Yx:new qx;let kr=null,nd="";const Ga=new Set,Ir=()=>Ga.forEach(i=>i());let Yn=null,Gn=null;_c.open(xn).then(i=>{kr=i,i.onChange(Ir),Ir()}).catch(i=>{nd="Online play is unavailable right now.",console.warn("lobby",i),Ir()});xn.onStatus(Ir);const hy={status:()=>nd||xn.status==="error"?`Online play is unavailable right now${xn.statusMsg?` (${xn.statusMsg})`:""}.`:kr&&(xn.status==="online"||xn.kind!=="firebase")?"":"Connecting…",games:()=>kr?.games??[],onChange:i=>(Ga.add(i),()=>Ga.delete(i)),host:({config:i,names:t},e)=>{Be.names=t,On(Be),uy(i,e)},join:(i,t)=>void id(i,t)};function Xs(){Os?.(),Os=null}async function uy(i,t){let e;try{e=await xc.open(xn,kr,i,t)}catch(n){console.warn(n),alert("Couldn’t open an online game right now. Try again in a moment.");return}Yn=e,Xs(),e.onStart((n,s,r)=>sd(n,s,r)),e.onChange(()=>Ce?.netChanged()),Os=oy(vi,e,()=>e.start(),()=>void wc().then(Wn))}async function id(i,t){const e=vc(i);if(e.length!==4)return;let n;try{n=await yc.join(xn,e,t)}catch(r){console.warn(r),alert("Couldn’t join that game. Ask the host to check it’s still open.");return}Gn=n,Xs(),n.onStart((r,o,a)=>sd(r,o,a)),n.onChange(()=>Ce?.netChanged()),Os=ay(vi,n,()=>void wc().then(Wn));const s=rd();s?.code===e&&s.seat!==null&&n.claim(s.seat)}async function wc(){Ce?.dispose(),Ce=null;const i=Yn,t=Gn;Yn=Gn=null,my(),await Promise.all([i?.leave(),t?.leave()])}function dy(){const i=Yn;return i?i.g.cfg.players.flatMap((t,e)=>{const n=i.seat(e);return n.kind==="taken"&&!n.present||n.kind==="open"?[{id:`take-${e}`,label:`Play ${t.name}’s turns on this device`,run:()=>i.takeOver(e)}]:[]}):[]}function sd(i,t,e){gc().then(()=>fy(i,t,e))}function fy(i,t,e){Xs(),Ce?.dispose(),Gn&&py({code:Gn.code,seat:Gn.mySeat}),Ce=new Wu(vi,qn,i,Be,n=>{if(n==="rematch"&&Yn){Yn.start();return}wc().then(Wn)},e,t,dy)}const bc="chipwreck.rejoin.v1";function py(i){try{sessionStorage.setItem(bc,JSON.stringify(i))}catch{}}function rd(){try{const i=JSON.parse(sessionStorage.getItem(bc)??"null");return i&&typeof i.code=="string"?{code:i.code,seat:Number.isInteger(i.seat)?i.seat:null}:null}catch{return null}}function my(){try{sessionStorage.removeItem(bc)}catch{}}function Wa(i){gc().then(()=>gy(i))}function gy(i){Xs(),Ce?.dispose(),Gu(i),Ce=new Wu(vi,qn,i,Be,t=>{Ce?.dispose(),Ce=null,t==="rematch"&&Or?Wa(ks(Or)):Wn()})}function Wn(){Ce?.dispose(),Ce=null,qn.resize(),Xs(),Os=cy(vi,{names:Be.names,flick:Be.flick,onFlick:i=>{Be.flick=i,On(Be)},canResume:!!yh(),onResume:()=>{const i=yh();if(!i)return Wn();Or=i.config,Wa(i)},onStart:({config:i,names:t})=>{Be.names=t,On(Be),Ha(),Or=i,Wa(ks(i))},online:hy})}function Xa(){Ce||(qn.resize(),qn.render()),requestAnimationFrame(Xa)}ed?Rh(async()=>{const{startAdmin:i}=await import("./admin-AVZrfwXU.js");return{startAdmin:i}},__vite__mapDeps([0,1]),import.meta.url).then(({startAdmin:i})=>i(vi,qn,()=>{Wn(),Xa()})):(Wn(),Xa(),Qu().then(async i=>{!i||JSON.stringify(i)===JSON.stringify(ve())||(Ou(i),ku(),await gc(),qn.applyRoom(ve()),!Ce&&!Yn&&!Gn&&Wn())}));Wx(()=>Ce===null&&!Yn&&!Gn&&!ed);const Vo=vc(Sc.get("join")),Ah=rd();if(Vo.length===4||Ah){const i=new URL(location.href);i.searchParams.delete("join"),history.replaceState(null,"",i.href),setTimeout(()=>void id(Vo.length===4?Vo:Ah.code,Be.names[0]||"Friend"),300)}export{qi as C,Nu as D,$i as I,dh as P,rx as S,sx as T,ks as a,Vh as b,wx as c,Za as d,ty as e,yy as f,Ye as g,te as h,nh as i,Ou as j,ku as k,xy as l,Qu as m,qr as n,Kt as o,gc as p,_y as q,ws as r,Oc as s,ve as t,yn as u,Wd as v};
