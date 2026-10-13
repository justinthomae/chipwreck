var nu=Object.defineProperty;var iu=(i,t,e)=>t in i?nu(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var k=(i,t,e)=>iu(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Tn=Math.sqrt(3)/2,Ps=.042,Ol=.002,vo=.12,su=vo*.1,Fl=Object.freeze({radius:1,pocketRadius:vo,pocketInset:su,ropeInset:vo*(Math.sqrt(3)/2),pieceRadius:Ps,captainRadius:Ps,shooterRadius:Ps,pieceMass:1,captainMass:1,shooterMass:1,postRadius:.013,postDistance:3*(2*Ps+Ol)}),ru=Ol,Qa=[{x:.5,y:-Tn},{x:-.5,y:-Tn},{x:-1,y:0},{x:-.5,y:Tn},{x:.5,y:Tn},{x:1,y:0}],Si=6;function kl(i=Fl){ou(i);const t=i.radius,e=t*Tn,n=Qa.map(l=>({x:l.x*t,y:l.y*t})),s=t-i.pocketInset,r=Qa.map(l=>({x:l.x*s,y:l.y*s})),o=[],a=[];for(let l=0;l<Si;l++){const h=n[l],u=n[(l+1)%Si],f={x:(h.x+u.x)/2,y:(h.y+u.y)/2},d={x:-f.x/e,y:-f.y/e};o.push({side:l,a:h,b:u,normal:d,offset:e});const g={x:h.x+d.x*i.ropeInset,y:h.y+d.y*i.ropeInset},_=t,m={x:(u.x-h.x)/_,y:(u.y-h.y)/_},p=i.pocketRadius+i.shooterRadius+.005,b=tc(g,m,r[l],p,1,0),S=tc(g,m,r[(l+1)%Si],p,-1,_);a.push({side:l,start:{x:g.x+m.x*b,y:g.y+m.y*b},end:{x:g.x+m.x*S,y:g.y+m.y*S}})}const c=o.map(l=>({x:-l.normal.x*i.postDistance,y:-l.normal.y*i.postDistance}));return{spec:i,apothem:e,corners:n,pockets:r,rails:o,ropes:a,posts:c}}function tc(i,t,e,n,s,r){const o=e.x-i.x,a=e.y-i.y,c=o*t.x+a*t.y,l=o*o+a*a-c*c,h=n*n;return h<=l?r:c+s*Math.sqrt(h-l)}function ou(i){const t=["radius","pocketRadius","pieceRadius","captainRadius","shooterRadius","pieceMass","captainMass","shooterMass","postRadius"];for(const e of t)if(!(Number.isFinite(i[e])&&i[e]>0))throw new Error(`BoardSpec.${e} must be a positive number`);if(!(i.ropeInset>i.shooterRadius))throw new Error("BoardSpec.ropeInset must exceed shooterRadius");if(!(i.pocketInset>=0&&i.pocketInset<i.radius/2))throw new Error("BoardSpec.pocketInset out of range");if(!(i.postDistance>=0&&i.postDistance<i.radius*.6))throw new Error("BoardSpec.postDistance out of range")}function Ci(i,t){const e=i.x-t.x,n=i.y-t.y;return e*e+n*n}function ts(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s;if(r===0)return{x:t.x,y:t.y};let o=((i.x-t.x)*n+(i.y-t.y)*s)/r;return o=o<0?0:o>1?1:o,{x:t.x+n*o,y:t.y+s*o}}function au(i,t){let e=1/0;for(const n of i.rails){const s=n.normal.x*t.x+n.normal.y*t.y+n.offset;s<e&&(e=s)}return e}function cu(i,t,e){const n=e+i.spec.postRadius;for(const s of i.posts)if(Ci(t,s)<n*n)return!0;return!1}function lu(i,t,e){return au(i,t)>=e-1e-9}function hu(i,t){const e=i.rails[t].normal;return{x:-e.x,y:-e.y}}const uu=Object.freeze({dt:1/480,friction:.7,damping:.1,restitution:.92,railRestitution:.72,railFriction:.08,restSpeed:.004,maxSpeed:7,maxShotSpeed:5,maxTime:30,iterations:3}),ec=Object.freeze({light:1.1,normal:.7,heavy:.3});function Bl(i){const t={...uu,...i??{}};for(const[e,n]of Object.entries(t))if(!Number.isFinite(n))throw new Error(`PhysicsParams.${e} must be finite`);if(t.dt<=0||t.dt>1/60)throw new Error("PhysicsParams.dt must be in (0, 1/60]");if(t.restitution<0||t.restitution>1)throw new Error("restitution must be in [0,1]");if(t.railRestitution<0||t.railRestitution>1)throw new Error("railRestitution must be in [0,1]");if(t.iterations<1)throw new Error("iterations must be >= 1");if(t.maxShotSpeed>t.maxSpeed)throw new Error("maxShotSpeed must not exceed maxSpeed");return t}function du(i,t){const e=Math.min(i.spec.pieceRadius,i.spec.captainRadius,i.spec.shooterRadius),n=t.maxSpeed*t.dt;if(n>=e*.75)throw new Error(`Time step too large: ${n.toFixed(4)} per step vs min radius ${e}`)}class fu{constructor(t,e,n){k(this,"bodies");k(this,"pocketed",[]);k(this,"params");k(this,"time",0);k(this,"steps",0);k(this,"timedOut",!1);this.geometry=t,this.params=Bl(n),du(t,this.params);const s=new Set;this.bodies=e.map(r=>{if(s.has(r.id))throw new Error(`Duplicate body id ${r.id}`);s.add(r.id);for(const o of["x","y","vx","vy","r","m"])if(!Number.isFinite(r[o]))throw new Error(`Body ${r.id}.${o} is not finite`);if(r.r<=0||r.m<=0)throw new Error(`Body ${r.id} needs positive radius and mass`);return{...r}});for(const r of this.bodies)pu(r,this.params.maxSpeed);this.relax(this.time,[])}relax(t,e){const n=this.params,s=this.bodies;for(let r=0;r<n.iterations;r++){let o=!1;for(let l=0;l<s.length;l++){const h=s[l];for(let u=l+1;u<s.length;u++)mu(h,s[u],n.restitution,t,e)&&(o=!0)}const a=this.geometry.posts,c=this.geometry.spec.postRadius;for(const l of s){for(const h of this.geometry.rails)gu(l,h.normal,h.offset,n,t,e)&&(o=!0);for(const h of a)_u(l,h,c,n,t,e)&&(o=!0)}if(!o)break}}get atRest(){for(const t of this.bodies)if(t.vx!==0||t.vy!==0)return!1;return!0}get finished(){return this.timedOut||this.atRest}step(){const t=[];if(this.finished)return t;const e=this.params,n=e.dt,s=this.bodies;for(const c of s){const l=c.vx*c.vx+c.vy*c.vy;if(l===0)continue;const h=Math.sqrt(l);let u=(h-e.friction*n)*(1-e.damping*n);if(u<e.restSpeed){c.vx=0,c.vy=0;continue}u>e.maxSpeed&&(u=e.maxSpeed);const f=u/h;c.vx*=f,c.vy*=f,c.x+=c.vx*n,c.y+=c.vy*n}const r=this.time+n;this.relax(r,t);const o=this.geometry.pockets,a=this.geometry.spec.pocketRadius*this.geometry.spec.pocketRadius;for(let c=s.length-1;c>=0;c--){const l=s[c];for(let h=0;h<o.length;h++){const u=o[h],f=l.x-u.x,d=l.y-u.y;if(f*f+d*d<a){this.pocketed.push({id:l.id,pocket:h,time:r}),s.splice(c,1);break}}}if(this.time=r,this.steps++,this.time>=e.maxTime&&!this.atRest){this.timedOut=!0;for(const c of s)c.vx=0,c.vy=0}return t}run(){for(;!this.finished;)this.step();return this}outcome(){if(!this.finished)throw new Error("Simulation has not finished");const t={};for(const n of this.bodies)t[n.id]={x:n.x,y:n.y};const e=this.pocketed.map((n,s)=>({e:n,i:s})).sort((n,s)=>n.e.time-s.e.time||s.i-n.i).map(({e:n})=>n);return{positions:t,pocketed:e,time:this.time,timedOut:this.timedOut}}}function pu(i,t){const e=i.vx*i.vx+i.vy*i.vy;if(e>t*t){const n=t/Math.sqrt(e);i.vx*=n,i.vy*=n}}function mu(i,t,e,n,s){const r=t.x-i.x,o=t.y-i.y,a=i.r+t.r,c=r*r+o*o;if(c>=a*a)return!1;let l,h,u;c===0?(l=1,h=0,u=0):(u=Math.sqrt(c),l=r/u,h=o/u);const f=1/i.m,d=1/t.m,g=f+d,_=(t.vx-i.vx)*l+(t.vy-i.vy)*h;if(_<0){const b=-(1+e)*_/g;i.vx-=b*f*l,i.vy-=b*f*h,t.vx+=b*d*l,t.vy+=b*d*h,s.push({time:n,a:i.id,b:t.id,impulse:b})}const p=(a-u)/g;return i.x-=l*p*f,i.y-=h*p*f,t.x+=l*p*d,t.y+=h*p*d,!0}function gu(i,t,e,n,s,r){const o=t.x*i.x+t.y*i.y+e;if(o>=i.r)return!1;const a=i.r-o;i.x+=t.x*a,i.y+=t.y*a;const c=i.vx*t.x+i.vy*t.y;if(c<0){const l=i.vx-c*t.x,h=i.vy-c*t.y,u=1-n.railFriction,f=-c*n.railRestitution;i.vx=l*u+f*t.x,i.vy=h*u+f*t.y,r.push({time:s,a:i.id,b:null,impulse:-c*i.m*(1+n.railRestitution)})}return!0}function _u(i,t,e,n,s,r){const o=i.x-t.x,a=i.y-t.y,c=i.r+e,l=o*o+a*a;if(l>=c*c)return!1;let h=1,u=0,f=0;l>0&&(f=Math.sqrt(l),h=o/f,u=a/f);const d=c-f;i.x+=h*d,i.y+=u*d;const g=i.vx*h+i.vy*u;if(g<0){const _=(1+n.railRestitution)*g;i.vx-=_*h,i.vy-=_*u,r.push({time:s,a:i.id,b:"post",impulse:-g*i.m*(1+n.railRestitution)})}return!0}function zl(i,t){const e=Math.abs(i)+Math.abs(t);if(e===0)return 0;const n=i/e;return t>=0?1-n:3+n}const Ls=new Map;function vu(i,t){const e=`${i}:${t}`;let n=Ls.get(e);return n||(n=xu(i,t),Ls.size>32&&Ls.clear(),Ls.set(e,n)),n}function xu(i,t){const e=[];for(let n=-t;n<=t;n++)for(let s=-t;s<=t;s++){const r=s*s+s*n+n*n;if(r>t*t)continue;const o=(s+n*.5)*i,a=n*Tn*i;e.push({x:o,y:a,norm:r,angle:zl(s+n*.5,n*Tn)})}return e.sort((n,s)=>n.norm-s.norm||n.angle-s.angle),e}const Hl=["anchor-dark","anchor-dark","helm-light","helm-light","helm-light","anchor-dark","anchor-light","helm-light","helm-dark","helm-dark","helm-light","anchor-dark","anchor-light","helm-dark","chest-light",null,"anchor-dark","anchor-light","helm-dark","chest-light","chest-dark","anchor-light","anchor-light","chest-dark","helm-dark","chest-light","chest-dark","chest-dark","chest-dark","chest-light","chest-light"];function yu(i){return Hl.flatMap((t,e)=>t===i?[e]:[])}const Mu=["AA","WWWAA","WWWWAA","WCKAA","WCCAAC","WCCCC","CC"],Su={A:"anchor-dark",W:"helm-dark",C:"chest-dark"};function Eu(i,t){const e=i*2+t,n=[];return Mu.forEach((s,r)=>{const o=(3-r)*Tn*e;for(let a=0;a<s.length;a++){const c=(a-(s.length-1)/2)*e;n.push({x:o===0?0:-o,y:c,letter:s[a]})}}),n}function bu(i,t=.002,e="normal"){const n=Eu(i,t),s=new Map,r=c=>{const l=yu(c),h=s.get(c)??0;return s.set(c,h+1),l[h%l.length]};if(e==="normal")return n.map((c,l)=>({x:c.x,y:c.y,type:c.letter==="K"?null:Hl[l],face:l}));if(e===3)return n.map((c,l)=>{if(c.letter==="K")return{x:c.x,y:c.y,type:null,face:l};const h=Su[c.letter];return{x:c.x,y:c.y,type:h,face:r(h)}});const o=n.map((c,l)=>({p:c,i:l,ring:Math.round((c.x*c.x+c.y*c.y)*1e6),ang:zl(c.x,c.y)})).filter(c=>c.p.letter!=="K").sort((c,l)=>c.ring-l.ring||c.ang-l.ang),a=new Map;return o.forEach((c,l)=>a.set(c.i,l%2===0?"helm-dark":"anchor-light")),n.map((c,l)=>{if(c.letter==="K")return{x:c.x,y:c.y,type:null,face:l};const h=a.get(l);return{x:c.x,y:c.y,type:h,face:r(h)}})}function wu(i,t,e,n=.002){const s=[...t,...i.posts.map(a=>({x:a.x,y:a.y,r:i.spec.postRadius}))],r=(e+n)*.5,o=i.spec.pocketRadius;for(const a of vu(r,80)){if(!lu(i,a,e))continue;let c=!0;for(const l of i.pockets)if(Ci(a,l)<(o+e)*(o+e)){c=!1;break}if(c){for(const l of s){const h=l.r+e+n;if(Ci(a,l)<h*h-1e-12){c=!1;break}}if(c)return{x:a.x,y:a.y}}}throw new Error("No free spot on the board")}const yr="shooter",Pi="captain",Tu=6,Mr=["anchor-dark","anchor-light","helm-dark","helm-light","chest-dark","chest-light"],Wn={"anchor-dark":"Dark Anchors","anchor-light":"Light Anchors","helm-dark":"Dark Helms","helm-light":"Light Helms","chest-dark":"Dark Chests","chest-light":"Light Chests"},Vl={2:2,3:3,6:"normal"},Au=Object.freeze({1:[0],2:[0,3],3:[0,2,4],4:[0,1,3,4],5:[0,1,2,3,4],6:[0,1,2,3,4,5]});function Ru(i){if(i.mode!=="versus"&&i.mode!=="coop")throw new Error(`Unknown mode ${String(i.mode)}`);const t=i.players?.length??0;if(!Number.isInteger(t)||t<1||t>Tu)throw new Error("A match needs 1 to 6 players");const e=i.players.map((l,h)=>({name:nc(l.name,`Player ${h+1}`),team:l.team}));let n=(i.teams??[]).map((l,h)=>({name:nc(l.name,`Team ${h+1}`),color:l.color||"#888888"}));if(i.mode==="versus"){if(t<2)throw new Error("Versus needs at least 2 players");if(!(n.length in Vl))throw new Error("Versus needs 2, 3 or 6 crews");e.forEach((l,h)=>{if(!Number.isInteger(l.team)||l.team<0||l.team>=n.length)throw new Error(`Player ${h+1} has an invalid team`)}),n.forEach((l,h)=>{if(!e.some(u=>u.team===h))throw new Error(`${n[h].name} has no players`)})}else{if(n.length===0&&(n=[{name:"Crew",color:"#e7b73c"}]),n.length!==1)throw new Error("Co-op uses a single crew");e.forEach(l=>l.team=0)}const s=i.captainFoul??"out";if(s!=="out"&&s!=="standby")throw new Error("captainFoul must be out or standby");const r=i.salt??"normal";if(!(r in ec))throw new Error("salt must be light, normal or heavy");const o={...Fl,...i.board??{}};kl(o);const a=Bl({friction:ec[r],...i.physics??{}}),c=i.aimGuide??!0;if(typeof c!="boolean")throw new Error("aimGuide must be true or false");return{mode:i.mode,players:e,teams:n,captainFoul:s,aimGuide:c,salt:r,board:o,physics:a}}function nc(i,t){return(typeof i=="string"?i.trim().slice(0,24):"")||t}function vs(i){const t=Ru(i),e=[...Au[t.players.length]],n=Array.from({length:Si},(c,l)=>t.mode==="coop"&&l%2===1?"shark":"lifeboat"),s=t.mode==="versus"?Vl[t.teams.length]:"normal",r=bu(Math.max(t.board.pieceRadius,t.board.captainRadius),ru,s),o=new Map,a=r.map(c=>{const l={at:"board",x:c.x,y:c.y};if(c.type===null)return{id:Pi,kind:"captain",type:null,face:c.face,loc:l};const h=o.get(c.type)??0;return o.set(c.type,h+1),{id:`${c.type}-${h}`,kind:"sailor",type:c.type,face:c.face,loc:l}});return a.sort((c,l)=>c.kind==="captain"?-1:l.kind==="captain"?1:0),{version:2,config:t,seats:e,pocketRoles:n,pieces:a,claims:t.teams.map(()=>null),out:t.teams.map(()=>!1),standby:null,current:0,turn:1,shotInTurn:0,pocketSeq:0,status:"playing",winner:null,pending:null,history:[],lastReport:null}}const ic=new Map;function ln(i){const t=JSON.stringify(i.config.board);let e=ic.get(t);return e||(e=kl(i.config.board),ic.set(t,e)),e}function Sr(i){return i.config.players[i.current].team}function Cu(i){return i.seats[i.current]}function an(i,t=i.current){return ln(i).ropes[i.seats[t]]}function De(i,t){const e=i.config.board;return t==="shooter"?e.shooterRadius:t==="captain"?e.captainRadius:e.pieceRadius}function sc(i,t){const e=i.config.board;return t==="shooter"?e.shooterMass:t==="captain"?e.captainMass:e.pieceMass}function xs(i){return i.pieces.filter(t=>t.loc.at==="board")}function _a(i,t){return t.loc.at==="pocket"&&i.pocketRoles[t.loc.pocket]==="lifeboat"}function Pu(i,t){return i.pieces.filter(e=>e.kind==="sailor"&&e.type===t&&_a(i,e)).length}function xo(i,t){if(i.config.mode==="coop")return i.pieces.filter(n=>n.kind==="sailor"&&_a(i,n)).length;const e=i.claims[t];return e?Pu(i,e):0}function Lu(i){return i.pieces.filter(t=>t.kind==="sailor"&&t.loc.at==="pocket"&&i.pocketRoles[t.loc.pocket]==="shark").length}function va(i){return i.pieces.filter(t=>t.kind==="sailor").length/i.config.teams.length}function Du(i){return i.config.mode==="versus"?va(i):i.pieces.filter(t=>t.kind==="sailor").length}function Gl(i){return Mr.filter(t=>i.pieces.some(e=>e.type===t))}function xa(i,t){return i.claims.indexOf(t)}function Iu(i,t){return!i.out[t]&&i.standby!==t}function Wl(i,t){return i.config.mode==="versus"?i.claims[t]!==null&&xo(i,t)>=va(i):!i.pieces.some(e=>e.kind==="sailor"&&e.loc.at==="board")}function cn(i){if(i.status!=="playing"||i.pending)return!1;const t=i.pieces.find(e=>e.id===Pi);return!!t&&t.loc.at==="board"&&Wl(i,Sr(i))}function vi(i){return i.pocketRoles.flatMap((t,e)=>t==="lifeboat"?[e]:[])}const rc=1e-6;function as(i,t){if(!Er(t))return"Shooter position is not a number";const e=an(i),n=ts(t,e.start,e.end);if(Ci(n,t)>rc*rc)return"The shooter must sit on your Lifeline Rope";const s=De(i,"shooter");for(const r of xs(i)){const o=s+De(i,r.kind);if(Ci(t,r.loc)<o*o)return"The shooter is touching another chip"}return cu(ln(i),t,s)?"The shooter is touching a peg":null}function Uu(i,t){const e=an(i),n=ts(t,e.start,e.end);if(!as(i,n))return n;const s=Math.sqrt(Ci(e.start,e.end)),r=(e.end.x-e.start.x)/s,o=(e.end.y-e.start.y)/s,a=(n.x-e.start.x)*r+(n.y-e.start.y)*o,c=s/400;for(let l=1;l<=400;l++)for(const h of[a+l*c,a-l*c]){if(h<0||h>s)continue;const u={x:e.start.x+r*h,y:e.start.y+o*h};if(!as(i,u))return u}return null}function ya(i){const t=an(i);return Uu(i,{x:(t.start.x+t.end.x)/2,y:(t.start.y+t.end.y)/2})}function cs(i,t){if(i.status!=="playing")return"The match is over";if(i.pending)return"Choose which Sailors to claim first";if(!t||!Er(t.velocity))return"Shot velocity is not a number";const e=t.velocity.x*t.velocity.x+t.velocity.y*t.velocity.y;if(e===0)return"The shot has no power";const n=i.config.physics.maxShotSpeed*(1+1e-9);if(e>n*n)return"The shot is too powerful";const s=as(i,t.shooter);if(s)return s;if(cn(i)){if(t.calledPocket===void 0)return"Call a lifeboat for the Captain first";if(!Number.isInteger(t.calledPocket)||!vi(i).includes(t.calledPocket))return"That lifeboat cannot be called"}else if(t.calledPocket!==void 0)return"A lifeboat can only be called when beckoning the Captain";return null}function Er(i){return!!i&&Number.isFinite(i.x)&&Number.isFinite(i.y)}function Nu(i,t){const e=cs(i,t);if(e)throw new Error(e);const n=xs(i).map(s=>({id:s.id,kind:s.kind==="captain"?"captain":"piece",x:s.loc.x,y:s.loc.y,vx:0,vy:0,r:De(i,s.kind),m:sc(i,s.kind)}));return n.push({id:yr,kind:"shooter",x:t.shooter.x,y:t.shooter.y,vx:t.velocity.x,vy:t.velocity.y,r:De(i,"shooter"),m:sc(i,"shooter")}),n}function Ou(i,t){return new fu(ln(i),Nu(i,t),i.config.physics)}function Fu(i,t,e){const n=cs(i,t);if(n)throw new Error(n);Bu(i,e);const s=structuredClone(i),r=s.config.mode==="versus",o=s.current,a=Sr(s),c=cn(i),l=c?t.calledPocket:null;for(const g of s.pieces){if(g.loc.at!=="board")continue;const _=e.positions[g.id];_&&(g.loc={at:"board",x:_.x,y:_.y})}const h={player:o,team:a,rescued:[],lost:[],ownRescued:0,claimed:null,claimOptions:null,shooterSunk:!1,shooterPocket:null,penalty:null,captain:null,foul:null,calledPocket:l,turnContinues:!1,nextPlayer:o,status:"playing",winner:null,timedOut:e.timedOut};let u=null;for(const g of e.pocketed){if(g.id===yr){h.shooterSunk=!0,h.shooterPocket=g.pocket;continue}const _=s.pieces.find(m=>m.id===g.id);_.loc={at:"pocket",pocket:g.pocket,order:++s.pocketSeq},_.kind==="captain"?u=g.pocket:s.pocketRoles[g.pocket]==="shark"?h.lost.push({id:_.id,pocket:g.pocket}):h.rescued.push({id:_.id,type:_.type,pocket:g.pocket,team:-1})}let f=!1,d=!1;if(u!==null&&(!r&&s.pocketRoles[u]==="shark"?(h.captain={pocket:u,result:"eaten"},s.status="lost"):c&&u===l&&!h.shooterSunk?(h.captain={pocket:u,result:"rescued"},s.status="won",s.winner=a):r&&!c?(h.captain={pocket:u,result:"foul"},f=d=!0):(h.captain={pocket:u,result:"returned"},f=!0)),r&&s.status==="playing"&&s.claims[a]===null&&!(d&&s.config.captainFoul==="out")){const g=Mr.filter(_=>h.rescued.some(m=>m.type===_)&&xa(s,_)===-1);if(g.length===1)s.claims[a]=g[0],h.claimed=g[0];else if(g.length>1)return h.claimOptions=g,s.pending={report:h,captainReturned:f,foul:d},s.history.push({player:o,input:structuredClone(t)}),s.lastReport=h,{state:s,report:h}}return s.history.push({player:o,input:structuredClone(t)}),Xl(s,h,f,d),{state:s,report:h}}function ku(i,t){if(!i.pending)throw new Error("There is no claim to make");if(!(i.pending.report.claimOptions??[]).includes(t))throw new Error("That Sailor type cannot be claimed");const n=structuredClone(i),{report:s,captainReturned:r,foul:o}=n.pending;return n.pending=null,n.claims[s.team]=t,s.claimed=t,s.claimOptions=null,n.history.push({player:s.player,claim:t}),Xl(n,s,r,o),{state:n,report:s}}function Xl(i,t,e,n){const s=i.config.mode==="versus",r=t.team,o=i.claims[r];for(const c of t.rescued)c.team=s?xa(i,c.type):0;t.ownRescued=s?t.rescued.filter(c=>o!==null&&c.type===o).length:t.rescued.length;const a=[];if(e&&a.push(i.pieces.find(c=>c.id===Pi)),t.shooterSunk&&i.status==="playing"){let c=null;for(const l of i.pieces)l.kind!=="sailor"||!_a(i,l)||s&&(o===null||l.type!==o)||(!c||c.loc.at==="pocket"&&l.loc.at==="pocket"&&l.loc.order>c.loc.order)&&(c=l);c&&(t.penalty=c.id,a.push(c))}for(const c of a){const l=xs(i).map(u=>({x:u.loc.x,y:u.loc.y,r:De(i,u.kind)})),h=wu(ln(i),l,De(i,c.kind));c.loc={at:"board",x:h.x,y:h.y}}if(n&&i.status==="playing"){const c=i.config.captainFoul;if(t.foul={team:r,kind:c},c==="out"){i.out[r]=!0,i.standby===r&&(i.standby=null);const l=i.out.flatMap((h,u)=>h?[]:[u]);l.length===1&&(i.status="won",i.winner=l[0])}else i.standby=r}if(i.status==="playing"){const c=s?t.ownRescued>0:t.rescued.length>0&&t.lost.length===0;t.turnContinues=c&&!t.shooterSunk&&t.captain===null,t.turnContinues?i.shotInTurn++:(i.current=ql(i,i.current),i.turn++,i.shotInTurn=0)}t.nextPlayer=i.current,t.status=i.status,t.winner=i.winner,i.lastReport=t}function ql(i,t){const e=i.config.players.length;for(let n=1;n<=e;n++){const s=(t+n)%e;if(Iu(i,i.config.players[s].team))return s}return t}function Bu(i,t){const e=new Set(xs(i).map(s=>s.id));e.add(yr);const n=new Set;for(const s of t.pocketed){if(!e.has(s.id))throw new Error(`Outcome pockets unknown piece ${s.id}`);if(n.has(s.id))throw new Error(`Outcome pockets ${s.id} twice`);if(!Number.isInteger(s.pocket)||s.pocket<0||s.pocket>=Si)throw new Error("Outcome has a bad pocket");n.add(s.id)}for(const s of e){if(n.has(s))continue;const r=t.positions[s];if(!r||!Er(r))throw new Error(`Outcome is missing a position for ${s}`)}}function zu(i){if(i.status!=="playing")throw new Error("The match is over");if(i.pending)throw new Error("Choose which Sailors to claim first");if(ya(i))throw new Error("The rope is not blocked");const t=structuredClone(i);return t.current=ql(t,t.current),t.turn++,t.shotInTurn=0,t.lastReport=null,t}function yo(i){const t=i;if(!t||typeof t!="object"||t.version!==2)throw new Error("Unsupported save");const e=vs(t.config);if(!Array.isArray(t.pieces)||t.pieces.length!==e.pieces.length)throw new Error("Corrupt save: pieces");const n=new Set(e.pieces.map(r=>r.id));for(const r of t.pieces){if(!n.has(r.id))throw new Error("Corrupt save: unknown piece");if(r.loc.at==="board"&&!Er(r.loc))throw new Error("Corrupt save: position");if(r.loc.at==="pocket"&&!(Number.isInteger(r.loc.pocket)&&r.loc.pocket>=0&&r.loc.pocket<Si))throw new Error("Corrupt save: pocket")}const s=e.config.teams.length;if(!Array.isArray(t.claims)||t.claims.length!==s||t.claims.some(r=>r!==null&&!Mr.includes(r)))throw new Error("Corrupt save: claims");if(!Array.isArray(t.out)||t.out.length!==s)throw new Error("Corrupt save: teams");if(!Number.isInteger(t.current)||t.current<0||t.current>=e.config.players.length)throw new Error("Corrupt save: current player");return{...t,config:e.config,seats:e.seats,pocketRoles:e.pocketRoles}}const Mo=Object.freeze([{name:"Red Crew",color:"#e5484d"},{name:"Blue Crew",color:"#3b8be0"},{name:"Gold Crew",color:"#e7b73c"},{name:"Green Crew",color:"#3fb37f"},{name:"Purple Crew",color:"#9b6bd6"},{name:"White Crew",color:"#e8e2d4"}]);function So(i){const t=[],e=(n,s,r,o)=>{if(s===0){n===0&&t.push(o);return}for(let a=Math.min(n-(s-1),r);a>=1;a--)e(n-a,s-1,a,[...o,a])};for(const n of[2,3])i>=n&&e(i,n,i,[]);return i===6&&t.push([1,1,1,1,1,1]),t}function Pr(i){const t=So(i);if(t.length===0)return null;const e=n=>Math.max(...n)-Math.min(...n);return[...t].sort((n,s)=>e(n)-e(s)||n.length-s.length)[0]}function Hu(i){return i.length===6?"6 crews of 1":i.join(" v ")}function Vu(i){return i===2?"15 Dark Helms vs 15 Light Anchors.":i===3?"10 each of Dark Anchors, Dark Helms and Dark Chests.":i===6?"The full set: each player claims one of the six symbols (5 Sailors each).":""}function $l(i){const t=[...i],e=t.reduce((s,r)=>s+r,0),n=[];for(let s=0;s<e;s++){const r=n[s-1],o=s===e-1?n[0]:void 0;let a=-1;for(const c of[!0,!1]){for(let l=0;l<t.length;l++)t[l]===0||l===r||c&&l===o||(a===-1||t[l]>t[a])&&(a=l);if(a!==-1)break}a===-1&&(a=t.findIndex(c=>c>0)),n.push(a),t[a]--}return n}function Gu(i,t=[],e={}){if(![2,3,6].includes(i.length))throw new Error("Versus needs 2, 3 or 6 crews");const s=$l(i).map((r,o)=>({name:t[o]??`Player ${o+1}`,team:r}));return{...e,mode:"versus",teams:Mo.slice(0,i.length).map(r=>({...r})),players:s}}function Wu(i,t=[],e={}){const n=Array.from({length:i},(s,r)=>({name:t[r]??`Player ${r+1}`,team:0}));return{...e,mode:"coop",teams:[{name:"Crew",color:"#e7b73c"}],players:n}}function Xu(i,t,e,n,s,r=4){const o=Math.hypot(n.x,n.y);if(!(o>0))return{point:{...e},distance:0,hit:null};const a=n.x/o,c=n.y/o;let l=r,h=null;for(const u of t){const f=Lr(e,a,c,u,s+u.r);if(f!==null&&f<l){l=f;const d=e.x+a*f,g=e.y+c*f,_=u.x-d,m=u.y-g,p=Math.hypot(_,m)||1;h={type:"piece",id:u.id,push:{x:_/p,y:m/p}}}}for(const u of i.rails){const f=u.normal.x*a+u.normal.y*c;if(f>=0)continue;const d=u.normal.x*e.x+u.normal.y*e.y+u.offset,g=(s-d)/f;g>=0&&g<l&&(l=g,h={type:"rail",side:u.side})}i.posts.forEach((u,f)=>{const d=Lr(e,a,c,u,s+i.spec.postRadius);d!==null&&d<l&&(l=d,h={type:"post",post:f})});for(let u=0;u<i.pockets.length;u++){const f=Lr(e,a,c,i.pockets[u],i.spec.pocketRadius);f!==null&&f<l&&(l=f,h={type:"pocket",pocket:u})}return{point:{x:e.x+a*l,y:e.y+c*l},distance:l,hit:h}}function Lr(i,t,e,n,s){const r=i.x-n.x,o=i.y-n.y,a=r*t+o*e,c=r*r+o*o-s*s;if(c<=0)return 0;if(a>=0)return null;const l=a*a-c;return l<0?null:-a-Math.sqrt(l)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ma="170",qu=0,oc=1,$u=2,Yl=1,Zl=2,rn=3,Dn=0,Te=1,hn=2,Rn=0,Ei=1,ac=2,cc=3,lc=4,Yu=5,Vn=100,Zu=101,ju=102,Ju=103,Ku=104,Qu=200,td=201,ed=202,nd=203,Eo=204,bo=205,id=206,sd=207,rd=208,od=209,ad=210,cd=211,ld=212,hd=213,ud=214,wo=0,To=1,Ao=2,Li=3,Ro=4,Co=5,Po=6,Lo=7,jl=0,dd=1,fd=2,Cn=0,pd=1,md=2,gd=3,Jl=4,_d=5,vd=6,xd=7,Kl=300,Di=301,Ii=302,Do=303,Io=304,br=306,fr=1e3,Xn=1001,pr=1002,We=1003,yd=1004,Ds=1005,$e=1006,Dr=1007,qn=1008,mn=1009,Ql=1010,th=1011,ls=1012,Sa=1013,jn=1014,dn=1015,ys=1016,Ea=1017,ba=1018,Ui=1020,eh=35902,nh=1021,ih=1022,Ge=1023,sh=1024,rh=1025,bi=1026,Ni=1027,oh=1028,wa=1029,ah=1030,Ta=1031,Aa=1033,or=33776,ar=33777,cr=33778,lr=33779,Uo=35840,No=35841,Oo=35842,Fo=35843,ko=36196,Bo=37492,zo=37496,Ho=37808,Vo=37809,Go=37810,Wo=37811,Xo=37812,qo=37813,$o=37814,Yo=37815,Zo=37816,jo=37817,Jo=37818,Ko=37819,Qo=37820,ta=37821,hr=36492,ea=36494,na=36495,ch=36283,ia=36284,sa=36285,ra=36286,Md=3200,Sd=3201,lh=0,Ed=1,wn="",we="srgb",zi="srgb-linear",wr="linear",te="srgb",ni=7680,hc=519,bd=512,wd=513,Td=514,hh=515,Ad=516,Rd=517,Cd=518,Pd=519,uc=35044,dc="300 es",fn=2e3,mr=2001;class Hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fc=1234567;const es=Math.PI/180,hs=180/Math.PI;function ti(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ve[i&255]+ve[i>>8&255]+ve[i>>16&255]+ve[i>>24&255]+"-"+ve[t&255]+ve[t>>8&255]+"-"+ve[t>>16&15|64]+ve[t>>24&255]+"-"+ve[e&63|128]+ve[e>>8&255]+"-"+ve[e>>16&255]+ve[e>>24&255]+ve[n&255]+ve[n>>8&255]+ve[n>>16&255]+ve[n>>24&255]).toLowerCase()}function me(i,t,e){return Math.max(t,Math.min(e,i))}function Ra(i,t){return(i%t+t)%t}function Ld(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Dd(i,t,e){return i!==t?(e-i)/(t-i):0}function ns(i,t,e){return(1-e)*i+e*t}function Id(i,t,e,n){return ns(i,t,1-Math.exp(-e*n))}function Ud(i,t=1){return t-Math.abs(Ra(i,t*2)-t)}function Nd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Od(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Fd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function kd(i,t){return i+Math.random()*(t-i)}function Bd(i){return i*(.5-Math.random())}function zd(i){i!==void 0&&(fc=i);let t=fc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Hd(i){return i*es}function Vd(i){return i*hs}function Gd(i){return(i&i-1)===0&&i!==0}function Wd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Xd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function qd(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function xi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ii={DEG2RAD:es,RAD2DEG:hs,generateUUID:ti,clamp:me,euclideanModulo:Ra,mapLinear:Ld,inverseLerp:Dd,lerp:ns,damp:Id,pingpong:Ud,smoothstep:Nd,smootherstep:Od,randInt:Fd,randFloat:kd,randFloatSpread:Bd,seededRandom:zd,degToRad:Hd,radToDeg:Vd,isPowerOfTwo:Gd,ceilPowerOfTwo:Wd,floorPowerOfTwo:Xd,setQuaternionFromProperEuler:qd,normalize:Ee,denormalize:xi};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Bt{constructor(t,e,n,s,r,o,a,c,l){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],b=s[1],S=s[4],v=s[7],L=s[2],R=s[5],A=s[8];return r[0]=o*_+a*b+c*L,r[3]=o*m+a*S+c*R,r[6]=o*p+a*v+c*A,r[1]=l*_+h*b+u*L,r[4]=l*m+h*S+u*R,r[7]=l*p+h*v+u*A,r[2]=f*_+d*b+g*L,r[5]=f*m+d*S+g*R,r[8]=f*p+d*v+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ir.makeScale(t,e)),this}rotate(t){return this.premultiply(Ir.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ir.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ir=new Bt;function uh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $d(){const i=us("canvas");return i.style.display="block",i}const pc={};function Ki(i){i in pc||(pc[i]=!0,console.warn(i))}function Yd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Zd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function jd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $t={enabled:!0,workingColorSpace:zi,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===te&&(i.r=pn(i.r),i.g=pn(i.g),i.b=pn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===te&&(i.r=wi(i.r),i.g=wi(i.g),i.b=wi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===wn?wr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function pn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function wi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const mc=[.64,.33,.3,.6,.15,.06],gc=[.2126,.7152,.0722],_c=[.3127,.329],vc=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xc=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$t.define({[zi]:{primaries:mc,whitePoint:_c,transfer:wr,toXYZ:vc,fromXYZ:xc,luminanceCoefficients:gc,workingColorSpaceConfig:{unpackColorSpace:we},outputColorSpaceConfig:{drawingBufferColorSpace:we}},[we]:{primaries:mc,whitePoint:_c,transfer:te,toXYZ:vc,fromXYZ:xc,luminanceCoefficients:gc,outputColorSpaceConfig:{drawingBufferColorSpace:we}}});let si;class Jd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{si===void 0&&(si=us("canvas")),si.width=t.width,si.height=t.height;const n=si.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=si}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=us("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=pn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(pn(e[n]/255)*255):e[n]=pn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Kd=0;class dh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=ti(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ur(s[o].image)):r.push(Ur(s[o]))}else r=Ur(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ur(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qd=0;class Se extends Hi{constructor(t=Se.DEFAULT_IMAGE,e=Se.DEFAULT_MAPPING,n=Xn,s=Xn,r=$e,o=qn,a=Ge,c=mn,l=Se.DEFAULT_ANISOTROPY,h=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=ti(),this.name="",this.source=new dh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fr:t.x=t.x-Math.floor(t.x);break;case Xn:t.x=t.x<0?0:1;break;case pr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fr:t.y=t.y-Math.floor(t.y);break;case Xn:t.y=t.y<0?0:1;break;case pr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Se.DEFAULT_IMAGE=null;Se.DEFAULT_MAPPING=Kl;Se.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,s=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,v=(d+1)/2,L=(p+1)/2,R=(h+f)/4,A=(u+_)/4,P=(g+m)/4;return S>v&&S>L?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=R/n,r=A/n):v>L?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=R/s,r=P/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=P/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(f-h)/b,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tf extends Hi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Se(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new dh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends tf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class fh extends Se{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ef extends Se{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ms{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-a;const p=c*f+l*d+h*g+u*_,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const L=Math.sqrt(S),R=Math.atan2(L,p*b);m=Math.sin(m*R)/L,a=Math.sin(a*R)/L}const v=a*b;if(c=c*m+f*v,l=l*m+d*v,h=h*m+g*v,u=u*m+_*v,m===1-a){const L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Nr.copy(this).projectOnVector(t),this.sub(Nr)}reflect(t){return this.sub(Nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Nr=new D,yc=new Ms;class Ss{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Be.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Be.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Be.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Be):Be.fromBufferAttribute(r,o),Be.applyMatrix4(t.matrixWorld),this.expandByPoint(Be);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Is.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Is.copy(n.boundingBox)),Is.applyMatrix4(t.matrixWorld),this.union(Is)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Be),Be.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($i),Us.subVectors(this.max,$i),ri.subVectors(t.a,$i),oi.subVectors(t.b,$i),ai.subVectors(t.c,$i),vn.subVectors(oi,ri),xn.subVectors(ai,oi),Nn.subVectors(ri,ai);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Nn.z,Nn.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Nn.z,0,-Nn.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Nn.y,Nn.x,0];return!Or(e,ri,oi,ai,Us)||(e=[1,0,0,0,1,0,0,0,1],!Or(e,ri,oi,ai,Us))?!1:(Ns.crossVectors(vn,xn),e=[Ns.x,Ns.y,Ns.z],Or(e,ri,oi,ai,Us))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Be).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Be).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qe[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qe[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qe[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qe[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qe[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qe[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qe[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qe[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qe),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Qe=[new D,new D,new D,new D,new D,new D,new D,new D],Be=new D,Is=new Ss,ri=new D,oi=new D,ai=new D,vn=new D,xn=new D,Nn=new D,$i=new D,Us=new D,Ns=new D,On=new D;function Or(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){On.fromArray(i,r);const a=s.x*Math.abs(On.x)+s.y*Math.abs(On.y)+s.z*Math.abs(On.z),c=t.dot(On),l=e.dot(On),h=n.dot(On);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const nf=new Ss,Yi=new D,Fr=new D;class Ca{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):nf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Yi.subVectors(t,this.center);const e=Yi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Yi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yi.copy(t.center).add(Fr)),this.expandByPoint(Yi.copy(t.center).sub(Fr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const tn=new D,kr=new D,Os=new D,yn=new D,Br=new D,Fs=new D,zr=new D;class ph{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(tn.copy(this.origin).addScaledVector(this.direction,e),tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){kr.copy(t).add(e).multiplyScalar(.5),Os.copy(e).sub(t).normalize(),yn.copy(this.origin).sub(kr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Os),a=yn.dot(this.direction),c=-yn.dot(Os),l=yn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(kr).addScaledVector(Os,f),d}intersectSphere(t,e){tn.subVectors(t.center,this.origin);const n=tn.dot(this.direction),s=tn.dot(tn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,tn)!==null}intersectTriangle(t,e,n,s,r){Br.subVectors(e,t),Fs.subVectors(n,t),zr.crossVectors(Br,Fs);let o=this.direction.dot(zr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;yn.subVectors(this.origin,t);const c=a*this.direction.dot(Fs.crossVectors(yn,Fs));if(c<0)return null;const l=a*this.direction.dot(Br.cross(yn));if(l<0||c+l>o)return null;const h=-a*yn.dot(zr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ci.setFromMatrixColumn(t,0).length(),r=1/ci.setFromMatrixColumn(t,1).length(),o=1/ci.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sf,t,rf)}lookAt(t,e,n){const s=this.elements;return Pe.subVectors(t,e),Pe.lengthSq()===0&&(Pe.z=1),Pe.normalize(),Mn.crossVectors(n,Pe),Mn.lengthSq()===0&&(Math.abs(n.z)===1?Pe.x+=1e-4:Pe.z+=1e-4,Pe.normalize(),Mn.crossVectors(n,Pe)),Mn.normalize(),ks.crossVectors(Pe,Mn),s[0]=Mn.x,s[4]=ks.x,s[8]=Pe.x,s[1]=Mn.y,s[5]=ks.y,s[9]=Pe.y,s[2]=Mn.z,s[6]=ks.z,s[10]=Pe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],S=n[7],v=n[11],L=n[15],R=s[0],A=s[4],P=s[8],E=s[12],y=s[1],C=s[5],H=s[9],F=s[13],V=s[2],q=s[6],G=s[10],K=s[14],W=s[3],ct=s[7],pt=s[11],yt=s[15];return r[0]=o*R+a*y+c*V+l*W,r[4]=o*A+a*C+c*q+l*ct,r[8]=o*P+a*H+c*G+l*pt,r[12]=o*E+a*F+c*K+l*yt,r[1]=h*R+u*y+f*V+d*W,r[5]=h*A+u*C+f*q+d*ct,r[9]=h*P+u*H+f*G+d*pt,r[13]=h*E+u*F+f*K+d*yt,r[2]=g*R+_*y+m*V+p*W,r[6]=g*A+_*C+m*q+p*ct,r[10]=g*P+_*H+m*G+p*pt,r[14]=g*E+_*F+m*K+p*yt,r[3]=b*R+S*y+v*V+L*W,r[7]=b*A+S*C+v*q+L*ct,r[11]=b*P+S*H+v*G+L*pt,r[15]=b*E+S*F+v*K+L*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=u*m*l-_*f*l+_*c*d-a*m*d-u*c*p+a*f*p,S=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,v=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,L=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,R=e*b+n*S+s*v+r*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=b*A,t[1]=(_*f*r-u*m*r-_*s*d+n*m*d+u*s*p-n*f*p)*A,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*A,t[4]=S*A,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*A,t[8]=v*A,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*A,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*A,t[12]=L*A,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,_=o*h,m=o*u,p=a*u,b=c*l,S=c*h,v=c*u,L=n.x,R=n.y,A=n.z;return s[0]=(1-(_+p))*L,s[1]=(d+v)*L,s[2]=(g-S)*L,s[3]=0,s[4]=(d-v)*R,s[5]=(1-(f+p))*R,s[6]=(m+b)*R,s[7]=0,s[8]=(g+S)*A,s[9]=(m-b)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ci.set(s[0],s[1],s[2]).length();const o=ci.set(s[4],s[5],s[6]).length(),a=ci.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ze.copy(this);const l=1/r,h=1/o,u=1/a;return ze.elements[0]*=l,ze.elements[1]*=l,ze.elements[2]*=l,ze.elements[4]*=h,ze.elements[5]*=h,ze.elements[6]*=h,ze.elements[8]*=u,ze.elements[9]*=u,ze.elements[10]*=u,e.setFromRotationMatrix(ze),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=fn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let d,g;if(a===fn)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===mr)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=fn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),f=(e+t)*l,d=(n+s)*h;let g,_;if(a===fn)g=(o+r)*u,_=-2*u;else if(a===mr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ci=new D,ze=new re,sf=new D(0,0,0),rf=new D(1,1,1),Mn=new D,ks=new D,Pe=new D,Mc=new re,Sc=new Ms;class Ze{constructor(t=0,e=0,n=0,s=Ze.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-me(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(me(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(me(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Mc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sc.setFromEuler(this),this.setFromQuaternion(Sc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ze.DEFAULT_ORDER="XYZ";class Pa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let of=0;const Ec=new D,li=new Ms,en=new re,Bs=new D,Zi=new D,af=new D,cf=new Ms,bc=new D(1,0,0),wc=new D(0,1,0),Tc=new D(0,0,1),Ac={type:"added"},lf={type:"removed"},hi={type:"childadded",child:null},Hr={type:"childremoved",child:null};class ge extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new D,e=new Ze,n=new Ms,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new re},normalMatrix:{value:new Bt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return li.setFromAxisAngle(t,e),this.quaternion.multiply(li),this}rotateOnWorldAxis(t,e){return li.setFromAxisAngle(t,e),this.quaternion.premultiply(li),this}rotateX(t){return this.rotateOnAxis(bc,t)}rotateY(t){return this.rotateOnAxis(wc,t)}rotateZ(t){return this.rotateOnAxis(Tc,t)}translateOnAxis(t,e){return Ec.copy(t).applyQuaternion(this.quaternion),this.position.add(Ec.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bc,t)}translateY(t){return this.translateOnAxis(wc,t)}translateZ(t){return this.translateOnAxis(Tc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(en.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Bs.copy(t):Bs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?en.lookAt(Zi,Bs,this.up):en.lookAt(Bs,Zi,this.up),this.quaternion.setFromRotationMatrix(en),s&&(en.extractRotation(s.matrixWorld),li.setFromRotationMatrix(en),this.quaternion.premultiply(li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ac),hi.child=t,this.dispatchEvent(hi),hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lf),Hr.child=t,this.dispatchEvent(Hr),Hr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),en.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),en.multiply(t.parent.matrixWorld)),t.applyMatrix4(en),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ac),hi.child=t,this.dispatchEvent(hi),hi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,t,af),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,cf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ge.DEFAULT_UP=new D(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const He=new D,nn=new D,Vr=new D,sn=new D,ui=new D,di=new D,Rc=new D,Gr=new D,Wr=new D,Xr=new D,qr=new he,$r=new he,Yr=new he;class Ve{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),He.subVectors(t,e),s.cross(He);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){He.subVectors(s,e),nn.subVectors(n,e),Vr.subVectors(t,e);const o=He.dot(He),a=He.dot(nn),c=He.dot(Vr),l=nn.dot(nn),h=nn.dot(Vr),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,sn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,sn.x),c.addScaledVector(o,sn.y),c.addScaledVector(a,sn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return qr.setScalar(0),$r.setScalar(0),Yr.setScalar(0),qr.fromBufferAttribute(t,e),$r.fromBufferAttribute(t,n),Yr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(qr,r.x),o.addScaledVector($r,r.y),o.addScaledVector(Yr,r.z),o}static isFrontFacing(t,e,n,s){return He.subVectors(n,e),nn.subVectors(t,e),He.cross(nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return He.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),He.cross(nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ve.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ve.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ve.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ve.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ve.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ui.subVectors(s,n),di.subVectors(r,n),Gr.subVectors(t,n);const c=ui.dot(Gr),l=di.dot(Gr);if(c<=0&&l<=0)return e.copy(n);Wr.subVectors(t,s);const h=ui.dot(Wr),u=di.dot(Wr);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ui,o);Xr.subVectors(t,r);const d=ui.dot(Xr),g=di.dot(Xr);if(g>=0&&d<=g)return e.copy(r);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(di,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Rc.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Rc,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(ui,o).addScaledVector(di,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},zs={h:0,s:0,l:0};function Zr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=Ra(t,1),e=me(e,0,1),n=me(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Zr(o,r,t+1/3),this.g=Zr(o,r,t),this.b=Zr(o,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=we){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){const n=mh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=pn(t.r),this.g=pn(t.g),this.b=pn(t.b),this}copyLinearToSRGB(t){return this.r=wi(t.r),this.g=wi(t.g),this.b=wi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return $t.fromWorkingColorSpace(xe.copy(this),t),Math.round(me(xe.r*255,0,255))*65536+Math.round(me(xe.g*255,0,255))*256+Math.round(me(xe.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(xe.copy(this),e);const n=xe.r,s=xe.g,r=xe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(xe.copy(this),e),t.r=xe.r,t.g=xe.g,t.b=xe.b,t}getStyle(t=we){$t.fromWorkingColorSpace(xe.copy(this),t);const e=xe.r,n=xe.g,s=xe.b;return t!==we?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Sn),this.setHSL(Sn.h+t,Sn.s+e,Sn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Sn),t.getHSL(zs);const n=ns(Sn.h,zs.h,e),s=ns(Sn.s,zs.s,e),r=ns(Sn.l,zs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xe=new Wt;Wt.NAMES=mh;let hf=0;class Es extends Hi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=ti(),this.name="",this.blending=Ei,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=bo,this.blendEquation=Vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Li,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Eo&&(n.blendSrc=this.blendSrc),this.blendDst!==bo&&(n.blendDst=this.blendDst),this.blendEquation!==Vn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Li&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class gr extends Es{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new D,Hs=new nt;class Ye{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=uc,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Hs.fromBufferAttribute(this,e),Hs.applyMatrix3(t),this.setXY(e,Hs.x,Hs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=xi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=xi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=xi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=xi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=xi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uc&&(t.usage=this.usage),t}}class gh extends Ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class _h extends Ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends Ye{constructor(t,e,n){super(new Float32Array(t),e,n)}}let uf=0;const Ne=new re,jr=new ge,fi=new D,Le=new Ss,ji=new Ss,pe=new D;class Ie extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=ti(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(uh(t)?_h:gh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ne.makeRotationFromQuaternion(t),this.applyMatrix4(Ne),this}rotateX(t){return Ne.makeRotationX(t),this.applyMatrix4(Ne),this}rotateY(t){return Ne.makeRotationY(t),this.applyMatrix4(Ne),this}rotateZ(t){return Ne.makeRotationZ(t),this.applyMatrix4(Ne),this}translate(t,e,n){return Ne.makeTranslation(t,e,n),this.applyMatrix4(Ne),this}scale(t,e,n){return Ne.makeScale(t,e,n),this.applyMatrix4(Ne),this}lookAt(t){return jr.lookAt(t),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new oe(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ss);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Le.setFromBufferAttribute(r),this.morphTargetsRelative?(pe.addVectors(this.boundingBox.min,Le.min),this.boundingBox.expandByPoint(pe),pe.addVectors(this.boundingBox.max,Le.max),this.boundingBox.expandByPoint(pe)):(this.boundingBox.expandByPoint(Le.min),this.boundingBox.expandByPoint(Le.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ca);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Le.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ji.setFromBufferAttribute(a),this.morphTargetsRelative?(pe.addVectors(Le.min,ji.min),Le.expandByPoint(pe),pe.addVectors(Le.max,ji.max),Le.expandByPoint(pe)):(Le.expandByPoint(ji.min),Le.expandByPoint(ji.max))}Le.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(pe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)pe.fromBufferAttribute(a,l),c&&(fi.fromBufferAttribute(t,l),pe.add(fi)),s=Math.max(s,n.distanceToSquared(pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new D,c[P]=new D;const l=new D,h=new D,u=new D,f=new nt,d=new nt,g=new nt,_=new D,m=new D;function p(P,E,y){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,P),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,y),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(C),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(C),a[P].add(_),a[E].add(_),a[y].add(_),c[P].add(m),c[E].add(m),c[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,E=b.length;P<E;++P){const y=b[P],C=y.start,H=y.count;for(let F=C,V=C+H;F<V;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const S=new D,v=new D,L=new D,R=new D;function A(P){L.fromBufferAttribute(s,P),R.copy(L);const E=a[P];S.copy(E),S.sub(L.multiplyScalar(L.dot(E))).normalize(),v.crossVectors(R,E);const C=v.dot(c[P])<0?-1:1;o.setXYZW(P,S.x,S.y,S.z,C)}for(let P=0,E=b.length;P<E;++P){const y=b[P],C=y.start,H=y.count;for(let F=C,V=C+H;F<V;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,h=new D,u=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pe.fromBufferAttribute(t,e),pe.normalize(),t.setXYZ(e,pe.x,pe.y,pe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Ye(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ie,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cc=new re,Fn=new ph,Vs=new Ca,Pc=new D,Gs=new D,Ws=new D,Xs=new D,Jr=new D,qs=new D,Lc=new D,$s=new D;class Jt extends ge{constructor(t=new Ie,e=new gr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){qs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Jr.fromBufferAttribute(u,t),o?qs.addScaledVector(Jr,h):qs.addScaledVector(Jr.sub(e),h))}e.add(qs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(r),Fn.copy(t.ray).recast(t.near),!(Vs.containsPoint(Fn.origin)===!1&&(Fn.intersectSphere(Vs,Pc)===null||Fn.origin.distanceToSquared(Pc)>(t.far-t.near)**2))&&(Cc.copy(r).invert(),Fn.copy(t.ray).applyMatrix4(Cc),!(n.boundingBox!==null&&Fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Fn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,L=S;v<L;v+=3){const R=a.getX(v),A=a.getX(v+1),P=a.getX(v+2);s=Ys(this,p,t,n,l,h,u,R,A,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);s=Ys(this,o,t,n,l,h,u,b,S,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,L=S;v<L;v+=3){const R=v,A=v+1,P=v+2;s=Ys(this,p,t,n,l,h,u,R,A,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const b=m,S=m+1,v=m+2;s=Ys(this,o,t,n,l,h,u,b,S,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function df(i,t,e,n,s,r,o,a){let c;if(t.side===Te?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Dn,a),c===null)return null;$s.copy(a),$s.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo($s);return l<e.near||l>e.far?null:{distance:l,point:$s.clone(),object:i}}function Ys(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Gs),i.getVertexPosition(c,Ws),i.getVertexPosition(l,Xs);const h=df(i,t,e,n,Gs,Ws,Xs,Lc);if(h){const u=new D;Ve.getBarycoord(Lc,Gs,Ws,Xs,u),s&&(h.uv=Ve.getInterpolatedAttribute(s,a,c,l,u,new nt)),r&&(h.uv1=Ve.getInterpolatedAttribute(r,a,c,l,u,new nt)),o&&(h.normal=Ve.getInterpolatedAttribute(o,a,c,l,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new D,materialIndex:0};Ve.getNormal(Gs,Ws,Xs,f.normal),h.face=f,h.barycoord=u}return h}class bs extends Ie{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(_,m,p,b,S,v,L,R,A,P,E){const y=v/A,C=L/P,H=v/2,F=L/2,V=R/2,q=A+1,G=P+1;let K=0,W=0;const ct=new D;for(let pt=0;pt<G;pt++){const yt=pt*C-F;for(let Nt=0;Nt<q;Nt++){const qt=Nt*y-H;ct[_]=qt*b,ct[m]=yt*S,ct[p]=V,l.push(ct.x,ct.y,ct.z),ct[_]=0,ct[m]=0,ct[p]=R>0?1:-1,h.push(ct.x,ct.y,ct.z),u.push(Nt/A),u.push(1-pt/P),K+=1}}for(let pt=0;pt<P;pt++)for(let yt=0;yt<A;yt++){const Nt=f+yt+q*pt,qt=f+yt+q*(pt+1),Y=f+(yt+1)+q*(pt+1),it=f+(yt+1)+q*pt;c.push(Nt,qt,it),c.push(qt,Y,it),W+=6}a.addGroup(d,W,E),d+=W,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Oi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function be(i){const t={};for(let e=0;e<i.length;e++){const n=Oi(i[e]);for(const s in n)t[s]=n[s]}return t}function ff(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function vh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const pf={clone:Oi,merge:be};var mf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class In extends Es{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mf,this.fragmentShader=gf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Oi(t.uniforms),this.uniformsGroups=ff(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class xh extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new D,Dc=new nt,Ic=new nt;class Oe extends xh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=hs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(es*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(En.x,En.y).multiplyScalar(-t/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-t/En.z)}getViewSize(t,e){return this.getViewBounds(t,Dc,Ic),e.subVectors(Ic,Dc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(es*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const pi=-90,mi=1;class _f extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Oe(pi,mi,t,e);s.layers=this.layers,this.add(s);const r=new Oe(pi,mi,t,e);r.layers=this.layers,this.add(r);const o=new Oe(pi,mi,t,e);o.layers=this.layers,this.add(o);const a=new Oe(pi,mi,t,e);a.layers=this.layers,this.add(a);const c=new Oe(pi,mi,t,e);c.layers=this.layers,this.add(c);const l=new Oe(pi,mi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class yh extends Se{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Di,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vf extends Jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new yh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:$e}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new bs(5,5,5),r=new In({name:"CubemapFromEquirect",uniforms:Oi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Te,blending:Rn});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===qn&&(e.minFilter=$e),new _f(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Kr=new D,xf=new D,yf=new Bt;class bn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Kr.subVectors(n,e).cross(xf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Kr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||yf.getNormalMatrix(t),s=this.coplanarPoint(Kr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kn=new Ca,Zs=new D;class La{constructor(t=new bn,e=new bn,n=new bn,s=new bn,r=new bn,o=new bn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=fn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],b=s[13],S=s[14],v=s[15];if(n[0].setComponents(c-r,f-l,m-d,v-p).normalize(),n[1].setComponents(c+r,f+l,m+d,v+p).normalize(),n[2].setComponents(c+o,f+h,m+g,v+b).normalize(),n[3].setComponents(c-o,f-h,m-g,v-b).normalize(),n[4].setComponents(c-a,f-u,m-_,v-S).normalize(),e===fn)n[5].setComponents(c+a,f+u,m+_,v+S).normalize();else if(e===mr)n[5].setComponents(a,u,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),kn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),kn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(kn)}intersectsSprite(t){return kn.center.set(0,0,0),kn.radius=.7071067811865476,kn.applyMatrix4(t.matrixWorld),this.intersectsSphere(kn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Zs.x=s.normal.x>0?t.max.x:t.min.x,Zs.y=s.normal.y>0?t.max.y:t.min.y,Zs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Mh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Mf(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class ws extends Ie{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const b=p*f-o;for(let S=0;S<l;S++){const v=S*u-r;g.push(v,-b,0),_.push(0,0,1),m.push(S/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){const S=b+l*p,v=b+l*(p+1),L=b+1+l*(p+1),R=b+1+l*p;d.push(S,v,R),d.push(v,L,R)}this.setIndex(d),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ws(t.width,t.height,t.widthSegments,t.heightSegments)}}var Sf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ef=`#ifdef USE_ALPHAHASH
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
#endif`,bf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Af=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rf=`#ifdef USE_AOMAP
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
#endif`,Cf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pf=`#ifdef USE_BATCHING
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
#endif`,Lf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,If=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nf=`#ifdef USE_IRIDESCENCE
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
#endif`,Of=`#ifdef USE_BUMPMAP
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
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Xf=`#define PI 3.141592653589793
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
} // validated`,qf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$f=`vec3 transformedNormal = objectNormal;
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
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tp=`#ifdef USE_ENVMAP
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
#endif`,ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,np=`#ifdef USE_ENVMAP
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
#endif`,ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
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
#endif`,rp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,op=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ap=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lp=`#ifdef USE_GRADIENTMAP
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
}`,hp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,up=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fp=`uniform bool receiveShadow;
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
#endif`,pp=`#ifdef USE_ENVMAP
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
#endif`,mp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_p=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xp=`PhysicalMaterial material;
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
#endif`,yp=`struct PhysicalMaterial {
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
}`,Mp=`
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ep=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lp=`#if defined( USE_POINTS_UV )
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
#endif`,Dp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ip=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Up=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Np=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Op=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fp=`#ifdef USE_MORPHTARGETS
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
#endif`,kp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wp=`#ifdef USE_NORMALMAP
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
#endif`,Xp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$p=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,em=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,om=`float getShadowMask() {
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
}`,am=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cm=`#ifdef USE_SKINNING
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
#endif`,lm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hm=`#ifdef USE_SKINNING
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
#endif`,um=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mm=`#ifdef USE_TRANSMISSION
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
#endif`,gm=`#ifdef USE_TRANSMISSION
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
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ym=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sm=`uniform sampler2D t2D;
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`#include <common>
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
}`,Rm=`#if DEPTH_PACKING == 3200
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
}`,Cm=`#define DISTANCE
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
}`,Pm=`#define DISTANCE
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`uniform float scale;
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
}`,Um=`uniform vec3 diffuse;
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
}`,Nm=`#include <common>
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
}`,Om=`uniform vec3 diffuse;
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
}`,Fm=`#define LAMBERT
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
}`,km=`#define LAMBERT
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
}`,Bm=`#define MATCAP
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
}`,zm=`#define MATCAP
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
}`,Hm=`#define NORMAL
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
}`,Vm=`#define NORMAL
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
}`,Gm=`#define PHONG
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
}`,Wm=`#define PHONG
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
}`,Xm=`#define STANDARD
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
}`,qm=`#define STANDARD
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
}`,$m=`#define TOON
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
}`,Ym=`#define TOON
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
}`,Zm=`uniform float size;
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
}`,jm=`uniform vec3 diffuse;
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
}`,Jm=`#include <common>
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
}`,Km=`uniform vec3 color;
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
}`,Qm=`uniform float rotation;
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
}`,tg=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:Sf,alphahash_pars_fragment:Ef,alphamap_fragment:bf,alphamap_pars_fragment:wf,alphatest_fragment:Tf,alphatest_pars_fragment:Af,aomap_fragment:Rf,aomap_pars_fragment:Cf,batching_pars_vertex:Pf,batching_vertex:Lf,begin_vertex:Df,beginnormal_vertex:If,bsdfs:Uf,iridescence_fragment:Nf,bumpmap_pars_fragment:Of,clipping_planes_fragment:Ff,clipping_planes_pars_fragment:kf,clipping_planes_pars_vertex:Bf,clipping_planes_vertex:zf,color_fragment:Hf,color_pars_fragment:Vf,color_pars_vertex:Gf,color_vertex:Wf,common:Xf,cube_uv_reflection_fragment:qf,defaultnormal_vertex:$f,displacementmap_pars_vertex:Yf,displacementmap_vertex:Zf,emissivemap_fragment:jf,emissivemap_pars_fragment:Jf,colorspace_fragment:Kf,colorspace_pars_fragment:Qf,envmap_fragment:tp,envmap_common_pars_fragment:ep,envmap_pars_fragment:np,envmap_pars_vertex:ip,envmap_physical_pars_fragment:pp,envmap_vertex:sp,fog_vertex:rp,fog_pars_vertex:op,fog_fragment:ap,fog_pars_fragment:cp,gradientmap_pars_fragment:lp,lightmap_pars_fragment:hp,lights_lambert_fragment:up,lights_lambert_pars_fragment:dp,lights_pars_begin:fp,lights_toon_fragment:mp,lights_toon_pars_fragment:gp,lights_phong_fragment:_p,lights_phong_pars_fragment:vp,lights_physical_fragment:xp,lights_physical_pars_fragment:yp,lights_fragment_begin:Mp,lights_fragment_maps:Sp,lights_fragment_end:Ep,logdepthbuf_fragment:bp,logdepthbuf_pars_fragment:wp,logdepthbuf_pars_vertex:Tp,logdepthbuf_vertex:Ap,map_fragment:Rp,map_pars_fragment:Cp,map_particle_fragment:Pp,map_particle_pars_fragment:Lp,metalnessmap_fragment:Dp,metalnessmap_pars_fragment:Ip,morphinstance_vertex:Up,morphcolor_vertex:Np,morphnormal_vertex:Op,morphtarget_pars_vertex:Fp,morphtarget_vertex:kp,normal_fragment_begin:Bp,normal_fragment_maps:zp,normal_pars_fragment:Hp,normal_pars_vertex:Vp,normal_vertex:Gp,normalmap_pars_fragment:Wp,clearcoat_normal_fragment_begin:Xp,clearcoat_normal_fragment_maps:qp,clearcoat_pars_fragment:$p,iridescence_pars_fragment:Yp,opaque_fragment:Zp,packing:jp,premultiplied_alpha_fragment:Jp,project_vertex:Kp,dithering_fragment:Qp,dithering_pars_fragment:tm,roughnessmap_fragment:em,roughnessmap_pars_fragment:nm,shadowmap_pars_fragment:im,shadowmap_pars_vertex:sm,shadowmap_vertex:rm,shadowmask_pars_fragment:om,skinbase_vertex:am,skinning_pars_vertex:cm,skinning_vertex:lm,skinnormal_vertex:hm,specularmap_fragment:um,specularmap_pars_fragment:dm,tonemapping_fragment:fm,tonemapping_pars_fragment:pm,transmission_fragment:mm,transmission_pars_fragment:gm,uv_pars_fragment:_m,uv_pars_vertex:vm,uv_vertex:xm,worldpos_vertex:ym,background_vert:Mm,background_frag:Sm,backgroundCube_vert:Em,backgroundCube_frag:bm,cube_vert:wm,cube_frag:Tm,depth_vert:Am,depth_frag:Rm,distanceRGBA_vert:Cm,distanceRGBA_frag:Pm,equirect_vert:Lm,equirect_frag:Dm,linedashed_vert:Im,linedashed_frag:Um,meshbasic_vert:Nm,meshbasic_frag:Om,meshlambert_vert:Fm,meshlambert_frag:km,meshmatcap_vert:Bm,meshmatcap_frag:zm,meshnormal_vert:Hm,meshnormal_frag:Vm,meshphong_vert:Gm,meshphong_frag:Wm,meshphysical_vert:Xm,meshphysical_frag:qm,meshtoon_vert:$m,meshtoon_frag:Ym,points_vert:Zm,points_frag:jm,shadow_vert:Jm,shadow_frag:Km,sprite_vert:Qm,sprite_frag:tg},ht={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},qe={basic:{uniforms:be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:be([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:be([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:be([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:be([ht.points,ht.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:be([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:be([ht.common,ht.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:be([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:be([ht.sprite,ht.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:be([ht.common,ht.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:be([ht.lights,ht.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};qe.physical={uniforms:be([qe.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const js={r:0,b:0,g:0},Bn=new Ze,eg=new re;function ng(i,t,e,n,s,r,o){const a=new Wt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function _(b){let S=!1;const v=g(b);v===null?p(a,c):v&&v.isColor&&(p(v,1),S=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,S){const v=g(S);v&&(v.isCubeTexture||v.mapping===br)?(h===void 0&&(h=new Jt(new bs(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:Oi(qe.backgroundCube.uniforms),vertexShader:qe.backgroundCube.vertexShader,fragmentShader:qe.backgroundCube.fragmentShader,side:Te,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Bn.copy(S.backgroundRotation),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(eg.makeRotationFromEuler(Bn)),h.material.toneMapped=$t.getTransfer(v.colorSpace)!==te,(u!==v||f!==v.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Jt(new ws(2,2),new In({name:"BackgroundMaterial",uniforms:Oi(qe.background.uniforms),vertexShader:qe.background.vertexShader,fragmentShader:qe.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=$t.getTransfer(v.colorSpace)!==te,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,S){b.getRGB(js,vh(i)),n.buffers.color.setClear(js.r,js.g,js.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),c=S,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(a,c)},render:_,addToRenderList:m}}function ig(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(y,C,H,F,V){let q=!1;const G=u(F,H,C);r!==G&&(r=G,l(r.object)),q=d(y,F,H,V),q&&g(y,F,H,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(y,C,H,F),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,C,H){const F=H.wireframe===!0;let V=n[y.id];V===void 0&&(V={},n[y.id]=V);let q=V[C.id];q===void 0&&(q={},V[C.id]=q);let G=q[F];return G===void 0&&(G=f(c()),q[F]=G),G}function f(y){const C=[],H=[],F=[];for(let V=0;V<e;V++)C[V]=0,H[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:F,object:y,attributes:{},index:null}}function d(y,C,H,F){const V=r.attributes,q=C.attributes;let G=0;const K=H.getAttributes();for(const W in K)if(K[W].location>=0){const pt=V[W];let yt=q[W];if(yt===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(yt=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(yt=y.instanceColor)),pt===void 0||pt.attribute!==yt||yt&&pt.data!==yt.data)return!0;G++}return r.attributesNum!==G||r.index!==F}function g(y,C,H,F){const V={},q=C.attributes;let G=0;const K=H.getAttributes();for(const W in K)if(K[W].location>=0){let pt=q[W];pt===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(pt=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(pt=y.instanceColor));const yt={};yt.attribute=pt,pt&&pt.data&&(yt.data=pt.data),V[W]=yt,G++}r.attributes=V,r.attributesNum=G,r.index=F}function _(){const y=r.newAttributes;for(let C=0,H=y.length;C<H;C++)y[C]=0}function m(y){p(y,0)}function p(y,C){const H=r.newAttributes,F=r.enabledAttributes,V=r.attributeDivisors;H[y]=1,F[y]===0&&(i.enableVertexAttribArray(y),F[y]=1),V[y]!==C&&(i.vertexAttribDivisor(y,C),V[y]=C)}function b(){const y=r.newAttributes,C=r.enabledAttributes;for(let H=0,F=C.length;H<F;H++)C[H]!==y[H]&&(i.disableVertexAttribArray(H),C[H]=0)}function S(y,C,H,F,V,q,G){G===!0?i.vertexAttribIPointer(y,C,H,V,q):i.vertexAttribPointer(y,C,H,F,V,q)}function v(y,C,H,F){_();const V=F.attributes,q=H.getAttributes(),G=C.defaultAttributeValues;for(const K in q){const W=q[K];if(W.location>=0){let ct=V[K];if(ct===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(ct=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(ct=y.instanceColor)),ct!==void 0){const pt=ct.normalized,yt=ct.itemSize,Nt=t.get(ct);if(Nt===void 0)continue;const qt=Nt.buffer,Y=Nt.type,it=Nt.bytesPerElement,Et=Y===i.INT||Y===i.UNSIGNED_INT||ct.gpuType===Sa;if(ct.isInterleavedBufferAttribute){const at=ct.data,Rt=at.stride,Dt=ct.offset;if(at.isInstancedInterleavedBuffer){for(let Lt=0;Lt<W.locationSize;Lt++)p(W.location+Lt,at.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Lt=0;Lt<W.locationSize;Lt++)m(W.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,qt);for(let Lt=0;Lt<W.locationSize;Lt++)S(W.location+Lt,yt/W.locationSize,Y,pt,Rt*it,(Dt+yt/W.locationSize*Lt)*it,Et)}else{if(ct.isInstancedBufferAttribute){for(let at=0;at<W.locationSize;at++)p(W.location+at,ct.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let at=0;at<W.locationSize;at++)m(W.location+at);i.bindBuffer(i.ARRAY_BUFFER,qt);for(let at=0;at<W.locationSize;at++)S(W.location+at,yt/W.locationSize,Y,pt,yt*it,yt/W.locationSize*at*it,Et)}}else if(G!==void 0){const pt=G[K];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(W.location,pt);break;case 3:i.vertexAttrib3fv(W.location,pt);break;case 4:i.vertexAttrib4fv(W.location,pt);break;default:i.vertexAttrib1fv(W.location,pt)}}}}b()}function L(){P();for(const y in n){const C=n[y];for(const H in C){const F=C[H];for(const V in F)h(F[V].object),delete F[V];delete C[H]}delete n[y]}}function R(y){if(n[y.id]===void 0)return;const C=n[y.id];for(const H in C){const F=C[H];for(const V in F)h(F[V].object),delete F[V];delete C[H]}delete n[y.id]}function A(y){for(const C in n){const H=n[C];if(H[y.id]===void 0)continue;const F=H[y.id];for(const V in F)h(F[V].object),delete F[V];delete H[y.id]}}function P(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function sg(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function rg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Ge&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===ys&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==mn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==dn&&!P)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:L,maxSamples:R}}function og(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new bn,a=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const b=r?0:n,S=b*4;let v=p.clippingState||null;c.value=v,v=h(g,f,S,d);for(let L=0;L!==S;++L)v[L]=e[L];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=d;S!==_;++S,v+=4)o.copy(u[S]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function ag(i){let t=new WeakMap;function e(o,a){return a===Do?o.mapping=Di:a===Io&&(o.mapping=Ii),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Do||a===Io)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new vf(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Sh extends xh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const yi=4,Uc=[.125,.215,.35,.446,.526,.582],Gn=20,Qr=new Sh,Nc=new Wt;let to=null,eo=0,no=0,io=!1;const Hn=(1+Math.sqrt(5))/2,gi=1/Hn,Oc=[new D(-Hn,gi,0),new D(Hn,gi,0),new D(-gi,0,Hn),new D(gi,0,Hn),new D(0,Hn,-gi),new D(0,Hn,gi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Fc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){to=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(to,eo,no),this._renderer.xr.enabled=io,t.scissorTest=!1,Js(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Di||t.mapping===Ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),to=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:ys,format:Ge,colorSpace:zi,depthBuffer:!1},s=kc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cg(r)),this._blurMaterial=lg(r,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,Qr)}_sceneToCubeUV(t,e,n,s){const a=new Oe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Nc),h.toneMapping=Cn,h.autoClear=!1;const d=new gr({name:"PMREM.Background",side:Te,depthWrite:!1,depthTest:!1}),g=new Jt(new bs,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Nc),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):b===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const S=this._cubeSize;Js(s,b*S,p>2?S:0,S,S),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Di||t.mapping===Ii;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Js(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Qr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Oc[(s-r-1)%Oc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Jt(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Gn-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Gn;m>Gn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gn}`);const p=[];let b=0;for(let A=0;A<Gn;++A){const P=A/_,E=Math.exp(-P*P/2);p.push(E),A===0?b+=E:A<m&&(b+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const v=this._sizeLods[s],L=3*v*(s>S-yi?s-S+yi:0),R=4*(this._cubeSize-v);Js(e,L,R,3*v,2*v),c.setRenderTarget(e),c.render(u,Qr)}}function cg(i){const t=[],e=[],n=[];let s=i;const r=i-yi+1+Uc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-yi?c=Uc[o-i+yi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),S=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let R=0;R<d;R++){const A=R%3*2/3-1,P=R>2?0:-1,E=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];b.set(E,_*g*R),S.set(f,m*g*R);const y=[R,R,R,R,R,R];v.set(y,p*g*R)}const L=new Ie;L.setAttribute("position",new Ye(b,_)),L.setAttribute("uv",new Ye(S,m)),L.setAttribute("faceIndex",new Ye(v,p)),t.push(L),s>yi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function kc(i,t,e){const n=new Jn(i,t,e);return n.texture.mapping=br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Js(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function lg(i,t,e){const n=new Float32Array(Gn),s=new D(0,1,0);return new In({name:"SphericalGaussianBlur",defines:{n:Gn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Da(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Bc(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Da(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function zc(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Da(){return`

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
	`}function hg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Do||c===Io,h=c===Di||c===Ii;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Fc(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Fc(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ug(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ki("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function dg(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const b=d.array;_=d.version;for(let S=0,v=b.length;S<v;S+=3){const L=b[S+0],R=b[S+1],A=b[S+2];f.push(L,R,R,A,A,L)}}else if(g!==void 0){const b=g.array;_=g.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const L=S+0,R=S+1,A=S+2;f.push(L,R,R,A,A,L)}}else return;const m=new(uh(f)?_h:gh)(f,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function fg(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=d[b]*_[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function pg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function mg(i,t,e){const n=new WeakMap,s=new he;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let L=a.attributes.position.count*v,R=1;L>t.maxTextureSize&&(R=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const A=new Float32Array(L*R*4*u),P=new fh(A,L,R,u);P.type=dn,P.needsUpdate=!0;const E=v*4;for(let C=0;C<u;C++){const H=p[C],F=b[C],V=S[C],q=L*R*4*C;for(let G=0;G<H.count;G++){const K=G*E;g===!0&&(s.fromBufferAttribute(H,G),A[q+K+0]=s.x,A[q+K+1]=s.y,A[q+K+2]=s.z,A[q+K+3]=0),_===!0&&(s.fromBufferAttribute(F,G),A[q+K+4]=s.x,A[q+K+5]=s.y,A[q+K+6]=s.z,A[q+K+7]=0),m===!0&&(s.fromBufferAttribute(V,G),A[q+K+8]=s.x,A[q+K+9]=s.y,A[q+K+10]=s.z,A[q+K+11]=V.itemSize===4?s.w:1)}}f={count:u,texture:P,size:new nt(L,R)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function gg(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class Eh extends Se{constructor(t,e,n,s,r,o,a,c,l,h=bi){if(h!==bi&&h!==Ni)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===bi&&(n=jn),n===void 0&&h===Ni&&(n=Ui),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:We,this.minFilter=c!==void 0?c:We,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const bh=new Se,Hc=new Eh(1,1),wh=new fh,Th=new ef,Ah=new yh,Vc=[],Gc=[],Wc=new Float32Array(16),Xc=new Float32Array(9),qc=new Float32Array(4);function Vi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Vc[s];if(r===void 0&&(r=new Float32Array(s),Vc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function de(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function fe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Tr(i,t){let e=Gc[t];e===void 0&&(e=new Int32Array(t),Gc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function _g(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2fv(this.addr,t),fe(e,t)}}function xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(de(e,t))return;i.uniform3fv(this.addr,t),fe(e,t)}}function yg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4fv(this.addr,t),fe(e,t)}}function Mg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),fe(e,t)}else{if(de(e,n))return;qc.set(n),i.uniformMatrix2fv(this.addr,!1,qc),fe(e,n)}}function Sg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),fe(e,t)}else{if(de(e,n))return;Xc.set(n),i.uniformMatrix3fv(this.addr,!1,Xc),fe(e,n)}}function Eg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),fe(e,t)}else{if(de(e,n))return;Wc.set(n),i.uniformMatrix4fv(this.addr,!1,Wc),fe(e,n)}}function bg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function wg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2iv(this.addr,t),fe(e,t)}}function Tg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(de(e,t))return;i.uniform3iv(this.addr,t),fe(e,t)}}function Ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4iv(this.addr,t),fe(e,t)}}function Rg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2uiv(this.addr,t),fe(e,t)}}function Pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(de(e,t))return;i.uniform3uiv(this.addr,t),fe(e,t)}}function Lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4uiv(this.addr,t),fe(e,t)}}function Dg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Hc.compareFunction=hh,r=Hc):r=bh,e.setTexture2D(t||r,s)}function Ig(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Th,s)}function Ug(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ah,s)}function Ng(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||wh,s)}function Og(i){switch(i){case 5126:return _g;case 35664:return vg;case 35665:return xg;case 35666:return yg;case 35674:return Mg;case 35675:return Sg;case 35676:return Eg;case 5124:case 35670:return bg;case 35667:case 35671:return wg;case 35668:case 35672:return Tg;case 35669:case 35673:return Ag;case 5125:return Rg;case 36294:return Cg;case 36295:return Pg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Dg;case 35679:case 36299:case 36307:return Ig;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Ng}}function Fg(i,t){i.uniform1fv(this.addr,t)}function kg(i,t){const e=Vi(t,this.size,2);i.uniform2fv(this.addr,e)}function Bg(i,t){const e=Vi(t,this.size,3);i.uniform3fv(this.addr,e)}function zg(i,t){const e=Vi(t,this.size,4);i.uniform4fv(this.addr,e)}function Hg(i,t){const e=Vi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Vg(i,t){const e=Vi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Gg(i,t){const e=Vi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Wg(i,t){i.uniform1iv(this.addr,t)}function Xg(i,t){i.uniform2iv(this.addr,t)}function qg(i,t){i.uniform3iv(this.addr,t)}function $g(i,t){i.uniform4iv(this.addr,t)}function Yg(i,t){i.uniform1uiv(this.addr,t)}function Zg(i,t){i.uniform2uiv(this.addr,t)}function jg(i,t){i.uniform3uiv(this.addr,t)}function Jg(i,t){i.uniform4uiv(this.addr,t)}function Kg(i,t,e){const n=this.cache,s=t.length,r=Tr(e,s);de(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||bh,r[o])}function Qg(i,t,e){const n=this.cache,s=t.length,r=Tr(e,s);de(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Th,r[o])}function t_(i,t,e){const n=this.cache,s=t.length,r=Tr(e,s);de(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ah,r[o])}function e_(i,t,e){const n=this.cache,s=t.length,r=Tr(e,s);de(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||wh,r[o])}function n_(i){switch(i){case 5126:return Fg;case 35664:return kg;case 35665:return Bg;case 35666:return zg;case 35674:return Hg;case 35675:return Vg;case 35676:return Gg;case 5124:case 35670:return Wg;case 35667:case 35671:return Xg;case 35668:case 35672:return qg;case 35669:case 35673:return $g;case 5125:return Yg;case 36294:return Zg;case 36295:return jg;case 36296:return Jg;case 35678:case 36198:case 36298:case 36306:case 35682:return Kg;case 35679:case 36299:case 36307:return Qg;case 35680:case 36300:case 36308:case 36293:return t_;case 36289:case 36303:case 36311:case 36292:return e_}}class i_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Og(e.type)}}class s_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=n_(e.type)}}class r_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const so=/(\w+)(\])?(\[|\.)?/g;function $c(i,t){i.seq.push(t),i.map[t.id]=t}function o_(i,t,e){const n=i.name,s=n.length;for(so.lastIndex=0;;){const r=so.exec(n),o=so.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){$c(e,l===void 0?new i_(a,i,t):new s_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new r_(a),$c(e,u)),e=u}}}class ur{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);o_(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Yc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const a_=37297;let c_=0;function l_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Zc=new Bt;function h_(i){$t._getMatrix(Zc,$t.workingColorSpace,i);const t=`mat3( ${Zc.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case wr:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function jc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+l_(i.getShaderSource(t),o)}else return s}function u_(i,t){const e=h_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function d_(i,t){let e;switch(t){case pd:e="Linear";break;case md:e="Reinhard";break;case gd:e="Cineon";break;case Jl:e="ACESFilmic";break;case vd:e="AgX";break;case xd:e="Neutral";break;case _d:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ks=new D;function f_(){$t.getLuminanceCoefficients(Ks);const i=Ks.x.toFixed(4),t=Ks.y.toFixed(4),e=Ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function p_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qi).join(`
`)}function m_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function g_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Qi(i){return i!==""}function Jc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const __=/^[ \t]*#include +<([\w\d./]+)>/gm;function oa(i){return i.replace(__,x_)}const v_=new Map;function x_(i,t){let e=Ht[t];if(e===void 0){const n=v_.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return oa(e)}const y_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qc(i){return i.replace(y_,M_)}function M_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function S_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Yl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Zl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===rn&&(t="SHADOWMAP_TYPE_VSM"),t}function E_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Di:case Ii:t="ENVMAP_TYPE_CUBE";break;case br:t="ENVMAP_TYPE_CUBE_UV";break}return t}function b_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ii:t="ENVMAP_MODE_REFRACTION";break}return t}function w_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case jl:t="ENVMAP_BLENDING_MULTIPLY";break;case dd:t="ENVMAP_BLENDING_MIX";break;case fd:t="ENVMAP_BLENDING_ADD";break}return t}function T_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function A_(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=S_(e),l=E_(e),h=b_(e),u=w_(e),f=T_(e),d=p_(e),g=m_(r),_=s.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Qi).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Qi).join(`
`),p.length>0&&(p+=`
`)):(m=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qi).join(`
`),p=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Cn?"#define TONE_MAPPING":"",e.toneMapping!==Cn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Cn?d_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,u_("linearToOutputTexel",e.outputColorSpace),f_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Qi).join(`
`)),o=oa(o),o=Jc(o,e),o=Kc(o,e),a=oa(a),a=Jc(a,e),a=Kc(a,e),o=Qc(o),a=Qc(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===dc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===dc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+o,v=b+p+a,L=Yc(s,s.VERTEX_SHADER,S),R=Yc(s,s.FRAGMENT_SHADER,v);s.attachShader(_,L),s.attachShader(_,R),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(C){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(_).trim(),F=s.getShaderInfoLog(L).trim(),V=s.getShaderInfoLog(R).trim();let q=!0,G=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,L,R);else{const K=jc(s,L,"vertex"),W=jc(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+K+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(F===""||V==="")&&(G=!1);G&&(C.diagnostics={runnable:q,programLog:H,vertexShader:{log:F,prefix:m},fragmentShader:{log:V,prefix:p}})}s.deleteShader(L),s.deleteShader(R),P=new ur(s,_),E=g_(s,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,a_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=c_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=R,this}let R_=0;class C_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new P_(t),e.set(t,n)),n}}class P_{constructor(t){this.id=R_++,this.code=t,this.usedTimes=0}}function L_(i,t,e,n,s,r,o){const a=new Pa,c=new C_,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,y,C,H,F){const V=H.fog,q=F.geometry,G=E.isMeshStandardMaterial?H.environment:null,K=(E.isMeshStandardMaterial?e:t).get(E.envMap||G),W=K&&K.mapping===br?K.image.height:null,ct=g[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const pt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,yt=pt!==void 0?pt.length:0;let Nt=0;q.morphAttributes.position!==void 0&&(Nt=1),q.morphAttributes.normal!==void 0&&(Nt=2),q.morphAttributes.color!==void 0&&(Nt=3);let qt,Y,it,Et;if(ct){const Kt=qe[ct];qt=Kt.vertexShader,Y=Kt.fragmentShader}else qt=E.vertexShader,Y=E.fragmentShader,c.update(E),it=c.getVertexShaderID(E),Et=c.getFragmentShaderID(E);const at=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Dt=F.isInstancedMesh===!0,Lt=F.isBatchedMesh===!0,Gt=!!E.map,Q=!!E.matcap,$=!!K,T=!!E.aoMap,lt=!!E.lightMap,J=!!E.bumpMap,ft=!!E.normalMap,rt=!!E.displacementMap,Pt=!!E.emissiveMap,_t=!!E.metalnessMap,w=!!E.roughnessMap,x=E.anisotropy>0,O=E.clearcoat>0,Z=E.dispersion>0,et=E.iridescence>0,j=E.sheen>0,bt=E.transmission>0,ut=x&&!!E.anisotropyMap,xt=O&&!!E.clearcoatMap,Vt=O&&!!E.clearcoatNormalMap,st=O&&!!E.clearcoatRoughnessMap,Mt=et&&!!E.iridescenceMap,It=et&&!!E.iridescenceThicknessMap,Ut=j&&!!E.sheenColorMap,St=j&&!!E.sheenRoughnessMap,Xt=!!E.specularMap,zt=!!E.specularColorMap,ee=!!E.specularIntensityMap,I=bt&&!!E.transmissionMap,dt=bt&&!!E.thicknessMap,X=!!E.gradientMap,tt=!!E.alphaMap,vt=E.alphaTest>0,mt=!!E.alphaHash,Ft=!!E.extensions;let ce=Cn;E.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(ce=i.toneMapping);const _e={shaderID:ct,shaderType:E.type,shaderName:E.name,vertexShader:qt,fragmentShader:Y,defines:E.defines,customVertexShaderID:it,customFragmentShaderID:Et,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:Lt,batchingColor:Lt&&F._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&F.instanceColor!==null,instancingMorph:Dt&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:zi,alphaToCoverage:!!E.alphaToCoverage,map:Gt,matcap:Q,envMap:$,envMapMode:$&&K.mapping,envMapCubeUVHeight:W,aoMap:T,lightMap:lt,bumpMap:J,normalMap:ft,displacementMap:f&&rt,emissiveMap:Pt,normalMapObjectSpace:ft&&E.normalMapType===Ed,normalMapTangentSpace:ft&&E.normalMapType===lh,metalnessMap:_t,roughnessMap:w,anisotropy:x,anisotropyMap:ut,clearcoat:O,clearcoatMap:xt,clearcoatNormalMap:Vt,clearcoatRoughnessMap:st,dispersion:Z,iridescence:et,iridescenceMap:Mt,iridescenceThicknessMap:It,sheen:j,sheenColorMap:Ut,sheenRoughnessMap:St,specularMap:Xt,specularColorMap:zt,specularIntensityMap:ee,transmission:bt,transmissionMap:I,thicknessMap:dt,gradientMap:X,opaque:E.transparent===!1&&E.blending===Ei&&E.alphaToCoverage===!1,alphaMap:tt,alphaTest:vt,alphaHash:mt,combine:E.combine,mapUv:Gt&&_(E.map.channel),aoMapUv:T&&_(E.aoMap.channel),lightMapUv:lt&&_(E.lightMap.channel),bumpMapUv:J&&_(E.bumpMap.channel),normalMapUv:ft&&_(E.normalMap.channel),displacementMapUv:rt&&_(E.displacementMap.channel),emissiveMapUv:Pt&&_(E.emissiveMap.channel),metalnessMapUv:_t&&_(E.metalnessMap.channel),roughnessMapUv:w&&_(E.roughnessMap.channel),anisotropyMapUv:ut&&_(E.anisotropyMap.channel),clearcoatMapUv:xt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:It&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:St&&_(E.sheenRoughnessMap.channel),specularMapUv:Xt&&_(E.specularMap.channel),specularColorMapUv:zt&&_(E.specularColorMap.channel),specularIntensityMapUv:ee&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:dt&&_(E.thicknessMap.channel),alphaMapUv:tt&&_(E.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(ft||x),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!q.attributes.uv&&(Gt||tt),fog:!!V,useFog:E.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Rt,skinning:F.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Nt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ce,decodeVideoTexture:Gt&&E.map.isVideoTexture===!0&&$t.getTransfer(E.map.colorSpace)===te,decodeVideoTextureEmissive:Pt&&E.emissiveMap.isVideoTexture===!0&&$t.getTransfer(E.emissiveMap.colorSpace)===te,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===hn,flipSided:E.side===Te,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ft&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&E.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return _e.vertexUv1s=l.has(1),_e.vertexUv2s=l.has(2),_e.vertexUv3s=l.has(3),l.clear(),_e}function p(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const C in E.defines)y.push(C),y.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(b(y,E),S(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function b(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function S(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),E.push(a.mask)}function v(E){const y=g[E.type];let C;if(y){const H=qe[y];C=pf.clone(H.uniforms)}else C=E.uniforms;return C}function L(E,y){let C;for(let H=0,F=h.length;H<F;H++){const V=h[H];if(V.cacheKey===y){C=V,++C.usedTimes;break}}return C===void 0&&(C=new A_(i,y,E,r),h.push(C)),C}function R(E){if(--E.usedTimes===0){const y=h.indexOf(E);h[y]=h[h.length-1],h.pop(),E.destroy()}}function A(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:L,releaseProgram:R,releaseShaderCache:A,programs:h,dispose:P}}function D_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function I_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function el(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function nl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||I_),n.length>1&&n.sort(f||el),s.length>1&&s.sort(f||el)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function U_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new nl,i.set(n,[o])):s>=r.length?(o=new nl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function N_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Wt};break;case"SpotLight":e={position:new D,direction:new D,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function O_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let F_=0;function k_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function B_(i){const t=new N_,e=O_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const s=new D,r=new re,o=new re;function a(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,b=0,S=0,v=0,L=0,R=0,A=0;l.sort(k_);for(let E=0,y=l.length;E<y;E++){const C=l[E],H=C.color,F=C.intensity,V=C.distance,q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=H.r*F,u+=H.g*F,f+=H.b*F;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],F);A++}else if(C.isDirectionalLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const K=C.shadow,W=e.get(C);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.directionalShadow[d]=W,n.directionalShadowMap[d]=q,n.directionalShadowMatrix[d]=C.shadow.matrix,b++}n.directional[d]=G,d++}else if(C.isSpotLight){const G=t.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(H).multiplyScalar(F),G.distance=V,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[_]=G;const K=C.shadow;if(C.map&&(n.spotLightMap[L]=C.map,L++,K.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[_]=K.matrix,C.castShadow){const W=e.get(C);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=q,v++}_++}else if(C.isRectAreaLight){const G=t.get(C);G.color.copy(H).multiplyScalar(F),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=G,m++}else if(C.isPointLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){const K=C.shadow,W=e.get(C);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,W.shadowCameraNear=K.camera.near,W.shadowCameraFar=K.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=C.shadow.matrix,S++}n.point[g]=G,g++}else if(C.isHemisphereLight){const G=t.get(C);G.skyColor.copy(C.color).multiplyScalar(F),G.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[p]=G,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==d||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==b||P.numPointShadows!==S||P.numSpotShadows!==v||P.numSpotMaps!==L||P.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+L-R,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,P.directionalLength=d,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=b,P.numPointShadows=S,P.numSpotShadows=v,P.numSpotMaps=L,P.numLightProbes=A,n.version=F_++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){const S=l[p];if(S.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(S.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function il(i){const t=new B_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function z_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new il(i),t.set(s,[a])):r>=o.length?(a=new il(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class H_ extends Es{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class V_ extends Es{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const G_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,W_=`uniform sampler2D shadow_pass;
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
}`;function X_(i,t,e){let n=new La;const s=new nt,r=new nt,o=new he,a=new H_({depthPacking:Sd}),c=new V_,l={},h=e.maxTextureSize,u={[Dn]:Te,[Te]:Dn,[hn]:hn},f=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:G_,fragmentShader:W_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ie;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Jt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yl;let p=this.type;this.render=function(R,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Rn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const F=p!==rn&&this.type===rn,V=p===rn&&this.type!==rn;for(let q=0,G=R.length;q<G;q++){const K=R[q],W=K.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const ct=W.getFrameExtents();if(s.multiply(ct),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ct.x),s.x=r.x*ct.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ct.y),s.y=r.y*ct.y,W.mapSize.y=r.y)),W.map===null||F===!0||V===!0){const yt=this.type!==rn?{minFilter:We,magFilter:We}:{};W.map!==null&&W.map.dispose(),W.map=new Jn(s.x,s.y,yt),W.map.texture.name=K.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const pt=W.getViewportCount();for(let yt=0;yt<pt;yt++){const Nt=W.getViewport(yt);o.set(r.x*Nt.x,r.y*Nt.y,r.x*Nt.z,r.y*Nt.w),H.viewport(o),W.updateMatrices(K,yt),n=W.getFrustum(),v(A,P,W.camera,K,this.type)}W.isPointLightShadow!==!0&&this.type===rn&&b(W,P),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,y,C)};function b(R,A){const P=t.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Jn(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(A,null,P,f,_,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(A,null,P,d,_,null)}function S(R,A,P,E){let y=null;const C=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)y=C;else if(y=P.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=y.uuid,F=A.uuid;let V=l[H];V===void 0&&(V={},l[H]=V);let q=V[F];q===void 0&&(q=y.clone(),V[F]=q,A.addEventListener("dispose",L)),y=q}if(y.visible=A.visible,y.wireframe=A.wireframe,E===rn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:u[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const H=i.properties.get(y);H.light=P}return y}function v(R,A,P,E,y){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===rn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const F=t.update(R),V=R.material;if(Array.isArray(V)){const q=F.groups;for(let G=0,K=q.length;G<K;G++){const W=q[G],ct=V[W.materialIndex];if(ct&&ct.visible){const pt=S(R,ct,E,y);R.onBeforeShadow(i,R,A,P,F,pt,W),i.renderBufferDirect(P,null,F,pt,R,W),R.onAfterShadow(i,R,A,P,F,pt,W)}}}else if(V.visible){const q=S(R,V,E,y);R.onBeforeShadow(i,R,A,P,F,q,null),i.renderBufferDirect(P,null,F,q,R,null),R.onAfterShadow(i,R,A,P,F,q,null)}}const H=R.children;for(let F=0,V=H.length;F<V;F++)v(H[F],A,P,E,y)}function L(R){R.target.removeEventListener("dispose",L);for(const P in l){const E=l[P],y=R.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const q_={[wo]:To,[Ao]:Po,[Ro]:Lo,[Li]:Co,[To]:wo,[Po]:Ao,[Lo]:Ro,[Co]:Li};function $_(i,t){function e(){let I=!1;const dt=new he;let X=null;const tt=new he(0,0,0,0);return{setMask:function(vt){X!==vt&&!I&&(i.colorMask(vt,vt,vt,vt),X=vt)},setLocked:function(vt){I=vt},setClear:function(vt,mt,Ft,ce,_e){_e===!0&&(vt*=ce,mt*=ce,Ft*=ce),dt.set(vt,mt,Ft,ce),tt.equals(dt)===!1&&(i.clearColor(vt,mt,Ft,ce),tt.copy(dt))},reset:function(){I=!1,X=null,tt.set(-1,0,0,0)}}}function n(){let I=!1,dt=!1,X=null,tt=null,vt=null;return{setReversed:function(mt){if(dt!==mt){const Ft=t.get("EXT_clip_control");dt?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const ce=vt;vt=null,this.setClear(ce)}dt=mt},getReversed:function(){return dt},setTest:function(mt){mt?at(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(mt){X!==mt&&!I&&(i.depthMask(mt),X=mt)},setFunc:function(mt){if(dt&&(mt=q_[mt]),tt!==mt){switch(mt){case wo:i.depthFunc(i.NEVER);break;case To:i.depthFunc(i.ALWAYS);break;case Ao:i.depthFunc(i.LESS);break;case Li:i.depthFunc(i.LEQUAL);break;case Ro:i.depthFunc(i.EQUAL);break;case Co:i.depthFunc(i.GEQUAL);break;case Po:i.depthFunc(i.GREATER);break;case Lo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=mt}},setLocked:function(mt){I=mt},setClear:function(mt){vt!==mt&&(dt&&(mt=1-mt),i.clearDepth(mt),vt=mt)},reset:function(){I=!1,X=null,tt=null,vt=null,dt=!1}}}function s(){let I=!1,dt=null,X=null,tt=null,vt=null,mt=null,Ft=null,ce=null,_e=null;return{setTest:function(Kt){I||(Kt?at(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(Kt){dt!==Kt&&!I&&(i.stencilMask(Kt),dt=Kt)},setFunc:function(Kt,Fe,Je){(X!==Kt||tt!==Fe||vt!==Je)&&(i.stencilFunc(Kt,Fe,Je),X=Kt,tt=Fe,vt=Je)},setOp:function(Kt,Fe,Je){(mt!==Kt||Ft!==Fe||ce!==Je)&&(i.stencilOp(Kt,Fe,Je),mt=Kt,Ft=Fe,ce=Je)},setLocked:function(Kt){I=Kt},setClear:function(Kt){_e!==Kt&&(i.clearStencil(Kt),_e=Kt)},reset:function(){I=!1,dt=null,X=null,tt=null,vt=null,mt=null,Ft=null,ce=null,_e=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,L=null,R=null,A=new Wt(0,0,0),P=0,E=!1,y=null,C=null,H=null,F=null,V=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,K=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=K>=1):W.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=K>=2);let ct=null,pt={};const yt=i.getParameter(i.SCISSOR_BOX),Nt=i.getParameter(i.VIEWPORT),qt=new he().fromArray(yt),Y=new he().fromArray(Nt);function it(I,dt,X,tt){const vt=new Uint8Array(4),mt=i.createTexture();i.bindTexture(I,mt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ft=0;Ft<X;Ft++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(dt+Ft,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return mt}const Et={};Et[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),Et[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Et[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc(Li),J(!1),ft(oc),at(i.CULL_FACE),T(Rn);function at(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Rt(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Dt(I,dt){return u[I]!==dt?(i.bindFramebuffer(I,dt),u[I]=dt,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=dt),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Lt(I,dt){let X=d,tt=!1;if(I){X=f.get(dt),X===void 0&&(X=[],f.set(dt,X));const vt=I.textures;if(X.length!==vt.length||X[0]!==i.COLOR_ATTACHMENT0){for(let mt=0,Ft=vt.length;mt<Ft;mt++)X[mt]=i.COLOR_ATTACHMENT0+mt;X.length=vt.length,tt=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,tt=!0);tt&&i.drawBuffers(X)}function Gt(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const Q={[Vn]:i.FUNC_ADD,[Zu]:i.FUNC_SUBTRACT,[ju]:i.FUNC_REVERSE_SUBTRACT};Q[Ju]=i.MIN,Q[Ku]=i.MAX;const $={[Qu]:i.ZERO,[td]:i.ONE,[ed]:i.SRC_COLOR,[Eo]:i.SRC_ALPHA,[ad]:i.SRC_ALPHA_SATURATE,[rd]:i.DST_COLOR,[id]:i.DST_ALPHA,[nd]:i.ONE_MINUS_SRC_COLOR,[bo]:i.ONE_MINUS_SRC_ALPHA,[od]:i.ONE_MINUS_DST_COLOR,[sd]:i.ONE_MINUS_DST_ALPHA,[cd]:i.CONSTANT_COLOR,[ld]:i.ONE_MINUS_CONSTANT_COLOR,[hd]:i.CONSTANT_ALPHA,[ud]:i.ONE_MINUS_CONSTANT_ALPHA};function T(I,dt,X,tt,vt,mt,Ft,ce,_e,Kt){if(I===Rn){_===!0&&(Rt(i.BLEND),_=!1);return}if(_===!1&&(at(i.BLEND),_=!0),I!==Yu){if(I!==m||Kt!==E){if((p!==Vn||v!==Vn)&&(i.blendEquation(i.FUNC_ADD),p=Vn,v=Vn),Kt)switch(I){case Ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ac:i.blendFunc(i.ONE,i.ONE);break;case cc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ac:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case cc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}b=null,S=null,L=null,R=null,A.set(0,0,0),P=0,m=I,E=Kt}return}vt=vt||dt,mt=mt||X,Ft=Ft||tt,(dt!==p||vt!==v)&&(i.blendEquationSeparate(Q[dt],Q[vt]),p=dt,v=vt),(X!==b||tt!==S||mt!==L||Ft!==R)&&(i.blendFuncSeparate($[X],$[tt],$[mt],$[Ft]),b=X,S=tt,L=mt,R=Ft),(ce.equals(A)===!1||_e!==P)&&(i.blendColor(ce.r,ce.g,ce.b,_e),A.copy(ce),P=_e),m=I,E=!1}function lt(I,dt){I.side===hn?Rt(i.CULL_FACE):at(i.CULL_FACE);let X=I.side===Te;dt&&(X=!X),J(X),I.blending===Ei&&I.transparent===!1?T(Rn):T(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const tt=I.stencilWrite;a.setTest(tt),tt&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Pt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function ft(I){I!==qu?(at(i.CULL_FACE),I!==C&&(I===oc?i.cullFace(i.BACK):I===$u?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),C=I}function rt(I){I!==H&&(G&&i.lineWidth(I),H=I)}function Pt(I,dt,X){I?(at(i.POLYGON_OFFSET_FILL),(F!==dt||V!==X)&&(i.polygonOffset(dt,X),F=dt,V=X)):Rt(i.POLYGON_OFFSET_FILL)}function _t(I){I?at(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function w(I){I===void 0&&(I=i.TEXTURE0+q-1),ct!==I&&(i.activeTexture(I),ct=I)}function x(I,dt,X){X===void 0&&(ct===null?X=i.TEXTURE0+q-1:X=ct);let tt=pt[X];tt===void 0&&(tt={type:void 0,texture:void 0},pt[X]=tt),(tt.type!==I||tt.texture!==dt)&&(ct!==X&&(i.activeTexture(X),ct=X),i.bindTexture(I,dt||Et[I]),tt.type=I,tt.texture=dt)}function O(){const I=pt[ct];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function bt(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ut(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Vt(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Mt(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function It(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ut(I){qt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),qt.copy(I))}function St(I){Y.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Y.copy(I))}function Xt(I,dt){let X=l.get(dt);X===void 0&&(X=new WeakMap,l.set(dt,X));let tt=X.get(I);tt===void 0&&(tt=i.getUniformBlockIndex(dt,I.name),X.set(I,tt))}function zt(I,dt){const tt=l.get(dt).get(I);c.get(dt)!==tt&&(i.uniformBlockBinding(dt,tt,I.__bindingPointIndex),c.set(dt,tt))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ct=null,pt={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,L=null,R=null,A=new Wt(0,0,0),P=0,E=!1,y=null,C=null,H=null,F=null,V=null,qt.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:Rt,bindFramebuffer:Dt,drawBuffers:Lt,useProgram:Gt,setBlending:T,setMaterial:lt,setFlipSided:J,setCullFace:ft,setLineWidth:rt,setPolygonOffset:Pt,setScissorTest:_t,activeTexture:w,bindTexture:x,unbindTexture:O,compressedTexImage2D:Z,compressedTexImage3D:et,texImage2D:Mt,texImage3D:It,updateUBOMapping:Xt,uniformBlockBinding:zt,texStorage2D:Vt,texStorage3D:st,texSubImage2D:j,texSubImage3D:bt,compressedTexSubImage2D:ut,compressedTexSubImage3D:xt,scissor:Ut,viewport:St,reset:ee}}function sl(i,t,e,n){const s=Y_(n);switch(e){case nh:return i*t;case sh:return i*t;case rh:return i*t*2;case oh:return i*t/s.components*s.byteLength;case wa:return i*t/s.components*s.byteLength;case ah:return i*t*2/s.components*s.byteLength;case Ta:return i*t*2/s.components*s.byteLength;case ih:return i*t*3/s.components*s.byteLength;case Ge:return i*t*4/s.components*s.byteLength;case Aa:return i*t*4/s.components*s.byteLength;case or:case ar:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case cr:case lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case No:case Fo:return Math.max(i,16)*Math.max(t,8)/4;case Uo:case Oo:return Math.max(i,8)*Math.max(t,8)/2;case ko:case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case zo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Go:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case $o:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Jo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ta:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case hr:case ea:case na:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ch:case ia:return Math.ceil(i/4)*Math.ceil(t/4)*8;case sa:case ra:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Y_(i){switch(i){case mn:case Ql:return{byteLength:1,components:1};case ls:case th:case ys:return{byteLength:2,components:1};case Ea:case ba:return{byteLength:2,components:4};case jn:case Sa:case dn:return{byteLength:4,components:1};case eh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Z_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new nt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return d?new OffscreenCanvas(w,x):us("canvas")}function _(w,x,O){let Z=1;const et=_t(w);if((et.width>O||et.height>O)&&(Z=O/Math.max(et.width,et.height)),Z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const j=Math.floor(Z*et.width),bt=Math.floor(Z*et.height);u===void 0&&(u=g(j,bt));const ut=x?g(j,bt):u;return ut.width=j,ut.height=bt,ut.getContext("2d").drawImage(w,0,0,j,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+j+"x"+bt+")."),ut}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(w,x,O,Z,et=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let j=x;if(x===i.RED&&(O===i.FLOAT&&(j=i.R32F),O===i.HALF_FLOAT&&(j=i.R16F),O===i.UNSIGNED_BYTE&&(j=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.R8UI),O===i.UNSIGNED_SHORT&&(j=i.R16UI),O===i.UNSIGNED_INT&&(j=i.R32UI),O===i.BYTE&&(j=i.R8I),O===i.SHORT&&(j=i.R16I),O===i.INT&&(j=i.R32I)),x===i.RG&&(O===i.FLOAT&&(j=i.RG32F),O===i.HALF_FLOAT&&(j=i.RG16F),O===i.UNSIGNED_BYTE&&(j=i.RG8)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RG8UI),O===i.UNSIGNED_SHORT&&(j=i.RG16UI),O===i.UNSIGNED_INT&&(j=i.RG32UI),O===i.BYTE&&(j=i.RG8I),O===i.SHORT&&(j=i.RG16I),O===i.INT&&(j=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RGB8UI),O===i.UNSIGNED_SHORT&&(j=i.RGB16UI),O===i.UNSIGNED_INT&&(j=i.RGB32UI),O===i.BYTE&&(j=i.RGB8I),O===i.SHORT&&(j=i.RGB16I),O===i.INT&&(j=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),O===i.UNSIGNED_INT&&(j=i.RGBA32UI),O===i.BYTE&&(j=i.RGBA8I),O===i.SHORT&&(j=i.RGBA16I),O===i.INT&&(j=i.RGBA32I)),x===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),x===i.RGBA){const bt=et?wr:$t.getTransfer(Z);O===i.FLOAT&&(j=i.RGBA32F),O===i.HALF_FLOAT&&(j=i.RGBA16F),O===i.UNSIGNED_BYTE&&(j=bt===te?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function v(w,x){let O;return w?x===null||x===jn||x===Ui?O=i.DEPTH24_STENCIL8:x===dn?O=i.DEPTH32F_STENCIL8:x===ls&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===jn||x===Ui?O=i.DEPTH_COMPONENT24:x===dn?O=i.DEPTH_COMPONENT32F:x===ls&&(O=i.DEPTH_COMPONENT16),O}function L(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==We&&w.minFilter!==$e?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function R(w){const x=w.target;x.removeEventListener("dispose",R),P(x),x.isVideoTexture&&h.delete(x)}function A(w){const x=w.target;x.removeEventListener("dispose",A),y(x)}function P(w){const x=n.get(w);if(x.__webglInit===void 0)return;const O=w.source,Z=f.get(O);if(Z){const et=Z[x.__cacheKey];et.usedTimes--,et.usedTimes===0&&E(w),Object.keys(Z).length===0&&f.delete(O)}n.remove(w)}function E(w){const x=n.get(w);i.deleteTexture(x.__webglTexture);const O=w.source,Z=f.get(O);delete Z[x.__cacheKey],o.memory.textures--}function y(w){const x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(x.__webglFramebuffer[Z]))for(let et=0;et<x.__webglFramebuffer[Z].length;et++)i.deleteFramebuffer(x.__webglFramebuffer[Z][et]);else i.deleteFramebuffer(x.__webglFramebuffer[Z]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Z])}else{if(Array.isArray(x.__webglFramebuffer))for(let Z=0;Z<x.__webglFramebuffer.length;Z++)i.deleteFramebuffer(x.__webglFramebuffer[Z]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Z=0;Z<x.__webglColorRenderbuffer.length;Z++)x.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Z]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=w.textures;for(let Z=0,et=O.length;Z<et;Z++){const j=n.get(O[Z]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(O[Z])}n.remove(w)}let C=0;function H(){C=0}function F(){const w=C;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),C+=1,w}function V(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function q(w,x){const O=n.get(w);if(w.isVideoTexture&&rt(w),w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){const Z=w.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,w,x);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function G(w,x){const O=n.get(w);if(w.version>0&&O.__version!==w.version){Y(O,w,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function K(w,x){const O=n.get(w);if(w.version>0&&O.__version!==w.version){Y(O,w,x);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function W(w,x){const O=n.get(w);if(w.version>0&&O.__version!==w.version){it(O,w,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}const ct={[fr]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[pr]:i.MIRRORED_REPEAT},pt={[We]:i.NEAREST,[yd]:i.NEAREST_MIPMAP_NEAREST,[Ds]:i.NEAREST_MIPMAP_LINEAR,[$e]:i.LINEAR,[Dr]:i.LINEAR_MIPMAP_NEAREST,[qn]:i.LINEAR_MIPMAP_LINEAR},yt={[bd]:i.NEVER,[Pd]:i.ALWAYS,[wd]:i.LESS,[hh]:i.LEQUAL,[Td]:i.EQUAL,[Cd]:i.GEQUAL,[Ad]:i.GREATER,[Rd]:i.NOTEQUAL};function Nt(w,x){if(x.type===dn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===$e||x.magFilter===Dr||x.magFilter===Ds||x.magFilter===qn||x.minFilter===$e||x.minFilter===Dr||x.minFilter===Ds||x.minFilter===qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,ct[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ct[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ct[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,pt[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,pt[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,yt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===We||x.minFilter!==Ds&&x.minFilter!==qn||x.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function qt(w,x){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",R));const Z=x.source;let et=f.get(Z);et===void 0&&(et={},f.set(Z,et));const j=V(x);if(j!==w.__cacheKey){et[j]===void 0&&(et[j]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),et[j].usedTimes++;const bt=et[w.__cacheKey];bt!==void 0&&(et[w.__cacheKey].usedTimes--,bt.usedTimes===0&&E(x)),w.__cacheKey=j,w.__webglTexture=et[j].texture}return O}function Y(w,x,O){let Z=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Z=i.TEXTURE_3D);const et=qt(w,x),j=x.source;e.bindTexture(Z,w.__webglTexture,i.TEXTURE0+O);const bt=n.get(j);if(j.version!==bt.__version||et===!0){e.activeTexture(i.TEXTURE0+O);const ut=$t.getPrimaries($t.workingColorSpace),xt=x.colorSpace===wn?null:$t.getPrimaries(x.colorSpace),Vt=x.colorSpace===wn||ut===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let st=_(x.image,!1,s.maxTextureSize);st=Pt(x,st);const Mt=r.convert(x.format,x.colorSpace),It=r.convert(x.type);let Ut=S(x.internalFormat,Mt,It,x.colorSpace,x.isVideoTexture);Nt(Z,x);let St;const Xt=x.mipmaps,zt=x.isVideoTexture!==!0,ee=bt.__version===void 0||et===!0,I=j.dataReady,dt=L(x,st);if(x.isDepthTexture)Ut=v(x.format===Ni,x.type),ee&&(zt?e.texStorage2D(i.TEXTURE_2D,1,Ut,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Ut,st.width,st.height,0,Mt,It,null));else if(x.isDataTexture)if(Xt.length>0){zt&&ee&&e.texStorage2D(i.TEXTURE_2D,dt,Ut,Xt[0].width,Xt[0].height);for(let X=0,tt=Xt.length;X<tt;X++)St=Xt[X],zt?I&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,St.width,St.height,Mt,It,St.data):e.texImage2D(i.TEXTURE_2D,X,Ut,St.width,St.height,0,Mt,It,St.data);x.generateMipmaps=!1}else zt?(ee&&e.texStorage2D(i.TEXTURE_2D,dt,Ut,st.width,st.height),I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,Mt,It,st.data)):e.texImage2D(i.TEXTURE_2D,0,Ut,st.width,st.height,0,Mt,It,st.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){zt&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Ut,Xt[0].width,Xt[0].height,st.depth);for(let X=0,tt=Xt.length;X<tt;X++)if(St=Xt[X],x.format!==Ge)if(Mt!==null)if(zt){if(I)if(x.layerUpdates.size>0){const vt=sl(St.width,St.height,x.format,x.type);for(const mt of x.layerUpdates){const Ft=St.data.subarray(mt*vt/St.data.BYTES_PER_ELEMENT,(mt+1)*vt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,mt,St.width,St.height,1,Mt,Ft)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,St.width,St.height,st.depth,Mt,St.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,Ut,St.width,St.height,st.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,St.width,St.height,st.depth,Mt,It,St.data):e.texImage3D(i.TEXTURE_2D_ARRAY,X,Ut,St.width,St.height,st.depth,0,Mt,It,St.data)}else{zt&&ee&&e.texStorage2D(i.TEXTURE_2D,dt,Ut,Xt[0].width,Xt[0].height);for(let X=0,tt=Xt.length;X<tt;X++)St=Xt[X],x.format!==Ge?Mt!==null?zt?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,St.width,St.height,Mt,St.data):e.compressedTexImage2D(i.TEXTURE_2D,X,Ut,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?I&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,St.width,St.height,Mt,It,St.data):e.texImage2D(i.TEXTURE_2D,X,Ut,St.width,St.height,0,Mt,It,St.data)}else if(x.isDataArrayTexture)if(zt){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Ut,st.width,st.height,st.depth),I)if(x.layerUpdates.size>0){const X=sl(st.width,st.height,x.format,x.type);for(const tt of x.layerUpdates){const vt=st.data.subarray(tt*X/st.data.BYTES_PER_ELEMENT,(tt+1)*X/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,st.width,st.height,1,Mt,It,vt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,Mt,It,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ut,st.width,st.height,st.depth,0,Mt,It,st.data);else if(x.isData3DTexture)zt?(ee&&e.texStorage3D(i.TEXTURE_3D,dt,Ut,st.width,st.height,st.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,Mt,It,st.data)):e.texImage3D(i.TEXTURE_3D,0,Ut,st.width,st.height,st.depth,0,Mt,It,st.data);else if(x.isFramebufferTexture){if(ee)if(zt)e.texStorage2D(i.TEXTURE_2D,dt,Ut,st.width,st.height);else{let X=st.width,tt=st.height;for(let vt=0;vt<dt;vt++)e.texImage2D(i.TEXTURE_2D,vt,Ut,X,tt,0,Mt,It,null),X>>=1,tt>>=1}}else if(Xt.length>0){if(zt&&ee){const X=_t(Xt[0]);e.texStorage2D(i.TEXTURE_2D,dt,Ut,X.width,X.height)}for(let X=0,tt=Xt.length;X<tt;X++)St=Xt[X],zt?I&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,Mt,It,St):e.texImage2D(i.TEXTURE_2D,X,Ut,Mt,It,St);x.generateMipmaps=!1}else if(zt){if(ee){const X=_t(st);e.texStorage2D(i.TEXTURE_2D,dt,Ut,X.width,X.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,It,st)}else e.texImage2D(i.TEXTURE_2D,0,Ut,Mt,It,st);m(x)&&p(Z),bt.__version=j.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function it(w,x,O){if(x.image.length!==6)return;const Z=qt(w,x),et=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+O);const j=n.get(et);if(et.version!==j.__version||Z===!0){e.activeTexture(i.TEXTURE0+O);const bt=$t.getPrimaries($t.workingColorSpace),ut=x.colorSpace===wn?null:$t.getPrimaries(x.colorSpace),xt=x.colorSpace===wn||bt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Vt=x.isCompressedTexture||x.image[0].isCompressedTexture,st=x.image[0]&&x.image[0].isDataTexture,Mt=[];for(let tt=0;tt<6;tt++)!Vt&&!st?Mt[tt]=_(x.image[tt],!0,s.maxCubemapSize):Mt[tt]=st?x.image[tt].image:x.image[tt],Mt[tt]=Pt(x,Mt[tt]);const It=Mt[0],Ut=r.convert(x.format,x.colorSpace),St=r.convert(x.type),Xt=S(x.internalFormat,Ut,St,x.colorSpace),zt=x.isVideoTexture!==!0,ee=j.__version===void 0||Z===!0,I=et.dataReady;let dt=L(x,It);Nt(i.TEXTURE_CUBE_MAP,x);let X;if(Vt){zt&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Xt,It.width,It.height);for(let tt=0;tt<6;tt++){X=Mt[tt].mipmaps;for(let vt=0;vt<X.length;vt++){const mt=X[vt];x.format!==Ge?Ut!==null?zt?I&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,mt.width,mt.height,Ut,mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,Xt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,mt.width,mt.height,Ut,St,mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,Xt,mt.width,mt.height,0,Ut,St,mt.data)}}}else{if(X=x.mipmaps,zt&&ee){X.length>0&&dt++;const tt=_t(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Xt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(st){zt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Mt[tt].width,Mt[tt].height,Ut,St,Mt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Xt,Mt[tt].width,Mt[tt].height,0,Ut,St,Mt[tt].data);for(let vt=0;vt<X.length;vt++){const Ft=X[vt].image[tt].image;zt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Ft.width,Ft.height,Ut,St,Ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,Xt,Ft.width,Ft.height,0,Ut,St,Ft.data)}}else{zt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ut,St,Mt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Xt,Ut,St,Mt[tt]);for(let vt=0;vt<X.length;vt++){const mt=X[vt];zt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Ut,St,mt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,Xt,Ut,St,mt.image[tt])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),j.__version=et.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Et(w,x,O,Z,et,j){const bt=r.convert(O.format,O.colorSpace),ut=r.convert(O.type),xt=S(O.internalFormat,bt,ut,O.colorSpace),Vt=n.get(x),st=n.get(O);if(st.__renderTarget=x,!Vt.__hasExternalTextures){const Mt=Math.max(1,x.width>>j),It=Math.max(1,x.height>>j);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,j,xt,Mt,It,x.depth,0,bt,ut,null):e.texImage2D(et,j,xt,Mt,It,0,bt,ut,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),ft(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,et,st.__webglTexture,0,J(x)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,et,st.__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(w,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){const Z=x.depthTexture,et=Z&&Z.isDepthTexture?Z.type:null,j=v(x.stencilBuffer,et),bt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=J(x);ft(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut,j,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,j,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,j,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,w)}else{const Z=x.textures;for(let et=0;et<Z.length;et++){const j=Z[et],bt=r.convert(j.format,j.colorSpace),ut=r.convert(j.type),xt=S(j.internalFormat,bt,ut,j.colorSpace),Vt=J(x);O&&ft(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt,xt,x.width,x.height):ft(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Vt,xt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,xt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(x.depthTexture);Z.__renderTarget=x,(!Z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),q(x.depthTexture,0);const et=Z.__webglTexture,j=J(x);if(x.depthTexture.format===bi)ft(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(x.depthTexture.format===Ni)ft(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Dt(w){const x=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const Z=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Z){const et=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Z.removeEventListener("dispose",et)};Z.addEventListener("dispose",et),x.__depthDisposeCallback=et}x.__boundDepthTexture=Z}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Rt(x.__webglFramebuffer,w)}else if(O){x.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Z]),x.__webglDepthbuffer[Z]===void 0)x.__webglDepthbuffer[Z]=i.createRenderbuffer(),at(x.__webglDepthbuffer[Z],w,!1);else{const et=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,j)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),at(x.__webglDepthbuffer,w,!1);else{const Z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(w,x,O){const Z=n.get(w);x!==void 0&&Et(Z.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Dt(w)}function Gt(w){const x=w.texture,O=n.get(w),Z=n.get(x);w.addEventListener("dispose",A);const et=w.textures,j=w.isWebGLCubeRenderTarget===!0,bt=et.length>1;if(bt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=x.version,o.memory.textures++),j){O.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[ut]=[];for(let xt=0;xt<x.mipmaps.length;xt++)O.__webglFramebuffer[ut][xt]=i.createFramebuffer()}else O.__webglFramebuffer[ut]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let ut=0;ut<x.mipmaps.length;ut++)O.__webglFramebuffer[ut]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(bt)for(let ut=0,xt=et.length;ut<xt;ut++){const Vt=n.get(et[ut]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&ft(w)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ut=0;ut<et.length;ut++){const xt=et[ut];O.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ut]);const Vt=r.convert(xt.format,xt.colorSpace),st=r.convert(xt.type),Mt=S(xt.internalFormat,Vt,st,xt.colorSpace,w.isXRRenderTarget===!0),It=J(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,It,Mt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,O.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),at(O.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Nt(i.TEXTURE_CUBE_MAP,x);for(let ut=0;ut<6;ut++)if(x.mipmaps&&x.mipmaps.length>0)for(let xt=0;xt<x.mipmaps.length;xt++)Et(O.__webglFramebuffer[ut][xt],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,xt);else Et(O.__webglFramebuffer[ut],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(x)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ut=0,xt=et.length;ut<xt;ut++){const Vt=et[ut],st=n.get(Vt);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),Nt(i.TEXTURE_2D,Vt),Et(O.__webglFramebuffer,w,Vt,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,0),m(Vt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ut=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ut=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,Z.__webglTexture),Nt(ut,x),x.mipmaps&&x.mipmaps.length>0)for(let xt=0;xt<x.mipmaps.length;xt++)Et(O.__webglFramebuffer[xt],w,x,i.COLOR_ATTACHMENT0,ut,xt);else Et(O.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,ut,0);m(x)&&p(ut),e.unbindTexture()}w.depthBuffer&&Dt(w)}function Q(w){const x=w.textures;for(let O=0,Z=x.length;O<Z;O++){const et=x[O];if(m(et)){const j=b(w),bt=n.get(et).__webglTexture;e.bindTexture(j,bt),p(j),e.unbindTexture()}}}const $=[],T=[];function lt(w){if(w.samples>0){if(ft(w)===!1){const x=w.textures,O=w.width,Z=w.height;let et=i.COLOR_BUFFER_BIT;const j=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(w),ut=x.length>1;if(ut)for(let xt=0;xt<x.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let xt=0;xt<x.length;xt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),ut){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[xt]);const Vt=n.get(x[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Vt,0)}i.blitFramebuffer(0,0,O,Z,0,0,O,Z,et,i.NEAREST),c===!0&&($.length=0,T.length=0,$.push(i.COLOR_ATTACHMENT0+xt),w.depthBuffer&&w.resolveDepthBuffer===!1&&($.push(j),T.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,T)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let xt=0;xt<x.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,bt.__webglColorRenderbuffer[xt]);const Vt=n.get(x[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function J(w){return Math.min(s.maxSamples,w.samples)}function ft(w){const x=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function rt(w){const x=o.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function Pt(w,x){const O=w.colorSpace,Z=w.format,et=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==zi&&O!==wn&&($t.getTransfer(O)===te?(Z!==Ge||et!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function _t(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=H,this.setTexture2D=q,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=W,this.rebindTextures=Lt,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ft}function j_(i,t){function e(n,s=wn){let r;const o=$t.getTransfer(s);if(n===mn)return i.UNSIGNED_BYTE;if(n===Ea)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ba)return i.UNSIGNED_SHORT_5_5_5_1;if(n===eh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ql)return i.BYTE;if(n===th)return i.SHORT;if(n===ls)return i.UNSIGNED_SHORT;if(n===Sa)return i.INT;if(n===jn)return i.UNSIGNED_INT;if(n===dn)return i.FLOAT;if(n===ys)return i.HALF_FLOAT;if(n===nh)return i.ALPHA;if(n===ih)return i.RGB;if(n===Ge)return i.RGBA;if(n===sh)return i.LUMINANCE;if(n===rh)return i.LUMINANCE_ALPHA;if(n===bi)return i.DEPTH_COMPONENT;if(n===Ni)return i.DEPTH_STENCIL;if(n===oh)return i.RED;if(n===wa)return i.RED_INTEGER;if(n===ah)return i.RG;if(n===Ta)return i.RG_INTEGER;if(n===Aa)return i.RGBA_INTEGER;if(n===or||n===ar||n===cr||n===lr)if(o===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Uo||n===No||n===Oo||n===Fo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Uo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===No)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ko||n===Bo||n===zo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ko||n===Bo)return o===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===zo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ho||n===Vo||n===Go||n===Wo||n===Xo||n===qo||n===$o||n===Yo||n===Zo||n===jo||n===Jo||n===Ko||n===Qo||n===ta)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ho)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Go)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$o)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===jo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Qo)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ta)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===hr||n===ea||n===na)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===hr)return o===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ea)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===na)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ch||n===ia||n===sa||n===ra)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===hr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ia)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===sa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ra)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ui?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class J_ extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class An extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const K_={type:"move"};class ro{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new An,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new An,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new An,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(K_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new An;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Q_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tv=`
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

}`;class ev{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Se,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new In({vertexShader:Q_,fragmentShader:tv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new ws(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nv extends Hi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const _=new ev,m=e.getContextAttributes();let p=null,b=null;const S=[],v=[],L=new nt;let R=null;const A=new Oe;A.viewport=new he;const P=new Oe;P.viewport=new he;const E=[A,P],y=new J_;let C=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let it=S[Y];return it===void 0&&(it=new ro,S[Y]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Y){let it=S[Y];return it===void 0&&(it=new ro,S[Y]=it),it.getGripSpace()},this.getHand=function(Y){let it=S[Y];return it===void 0&&(it=new ro,S[Y]=it),it.getHandSpace()};function F(Y){const it=v.indexOf(Y.inputSource);if(it===-1)return;const Et=S[it];Et!==void 0&&(Et.update(Y.inputSource,Y.frame,l||o),Et.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",q);for(let Y=0;Y<S.length;Y++){const it=v[Y];it!==null&&(v[Y]=null,S[Y].disconnect(it))}C=null,H=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,b=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",V),s.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new Jn(d.framebufferWidth,d.framebufferHeight,{format:Ge,type:mn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,Et=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?Ni:bi,Et=m.stencil?Ui:jn);const Rt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Rt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new Jn(f.textureWidth,f.textureHeight,{format:Ge,type:mn,depthTexture:new Eh(f.textureWidth,f.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),qt.setContext(s),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q(Y){for(let it=0;it<Y.removed.length;it++){const Et=Y.removed[it],at=v.indexOf(Et);at>=0&&(v[at]=null,S[at].disconnect(Et))}for(let it=0;it<Y.added.length;it++){const Et=Y.added[it];let at=v.indexOf(Et);if(at===-1){for(let Dt=0;Dt<S.length;Dt++)if(Dt>=v.length){v.push(Et),at=Dt;break}else if(v[Dt]===null){v[Dt]=Et,at=Dt;break}if(at===-1)break}const Rt=S[at];Rt&&Rt.connect(Et)}}const G=new D,K=new D;function W(Y,it,Et){G.setFromMatrixPosition(it.matrixWorld),K.setFromMatrixPosition(Et.matrixWorld);const at=G.distanceTo(K),Rt=it.projectionMatrix.elements,Dt=Et.projectionMatrix.elements,Lt=Rt[14]/(Rt[10]-1),Gt=Rt[14]/(Rt[10]+1),Q=(Rt[9]+1)/Rt[5],$=(Rt[9]-1)/Rt[5],T=(Rt[8]-1)/Rt[0],lt=(Dt[8]+1)/Dt[0],J=Lt*T,ft=Lt*lt,rt=at/(-T+lt),Pt=rt*-T;if(it.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Pt),Y.translateZ(rt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Rt[10]===-1)Y.projectionMatrix.copy(it.projectionMatrix),Y.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const _t=Lt+rt,w=Gt+rt,x=J-Pt,O=ft+(at-Pt),Z=Q*Gt/w*_t,et=$*Gt/w*_t;Y.projectionMatrix.makePerspective(x,O,Z,et,_t,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ct(Y,it){it===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(it.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let it=Y.near,Et=Y.far;_.texture!==null&&(_.depthNear>0&&(it=_.depthNear),_.depthFar>0&&(Et=_.depthFar)),y.near=P.near=A.near=it,y.far=P.far=A.far=Et,(C!==y.near||H!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,H=y.far),A.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,y.layers.mask=A.layers.mask|P.layers.mask;const at=Y.parent,Rt=y.cameras;ct(y,at);for(let Dt=0;Dt<Rt.length;Dt++)ct(Rt[Dt],at);Rt.length===2?W(y,A,P):y.projectionMatrix.copy(A.projectionMatrix),pt(Y,y,at)};function pt(Y,it,Et){Et===null?Y.matrix.copy(it.matrixWorld):(Y.matrix.copy(Et.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(it.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(it.projectionMatrix),Y.projectionMatrixInverse.copy(it.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=hs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let yt=null;function Nt(Y,it){if(h=it.getViewerPose(l||o),g=it,h!==null){const Et=h.views;d!==null&&(t.setRenderTargetFramebuffer(b,d.framebuffer),t.setRenderTarget(b));let at=!1;Et.length!==y.cameras.length&&(y.cameras.length=0,at=!0);for(let Dt=0;Dt<Et.length;Dt++){const Lt=Et[Dt];let Gt=null;if(d!==null)Gt=d.getViewport(Lt);else{const $=u.getViewSubImage(f,Lt);Gt=$.viewport,Dt===0&&(t.setRenderTargetTextures(b,$.colorTexture,f.ignoreDepthValues?void 0:$.depthStencilTexture),t.setRenderTarget(b))}let Q=E[Dt];Q===void 0&&(Q=new Oe,Q.layers.enable(Dt),Q.viewport=new he,E[Dt]=Q),Q.matrix.fromArray(Lt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Lt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Gt.x,Gt.y,Gt.width,Gt.height),Dt===0&&(y.matrix.copy(Q.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),at===!0&&y.cameras.push(Q)}const Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Dt=u.getDepthInformation(Et[0]);Dt&&Dt.isValid&&Dt.texture&&_.init(t,Dt,s.renderState)}}for(let Et=0;Et<S.length;Et++){const at=v[Et],Rt=S[Et];at!==null&&Rt!==void 0&&Rt.update(at,it,l||o)}yt&&yt(Y,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const qt=new Mh;qt.setAnimationLoop(Nt),this.setAnimationLoop=function(Y){yt=Y},this.dispose=function(){}}}const zn=new Ze,iv=new re;function sv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,vh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Te&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Te&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,zn.copy(v),zn.x*=-1,zn.y*=-1,zn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),m.envMapRotation.value.setFromMatrix4(iv.makeRotationFromEuler(zn)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Te&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function rv(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,S){const v=S.program;n.uniformBlockBinding(b,v)}function l(b,S){let v=s[b.id];v===void 0&&(g(b),v=h(b),s[b.id]=v,b.addEventListener("dispose",m));const L=S.program;n.updateUBOMapping(b,L);const R=t.render.frame;r[b.id]!==R&&(f(b),r[b.id]=R)}function h(b){const S=u();b.__bindingPointIndex=S;const v=i.createBuffer(),L=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,L,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=s[b.id],v=b.uniforms,L=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let R=0,A=v.length;R<A;R++){const P=Array.isArray(v[R])?v[R]:[v[R]];for(let E=0,y=P.length;E<y;E++){const C=P[E];if(d(C,R,E,L)===!0){const H=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let q=0;q<F.length;q++){const G=F[q],K=_(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,H+V,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,V),V+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,S,v,L){const R=b.value,A=S+"_"+v;if(L[A]===void 0)return typeof R=="number"||typeof R=="boolean"?L[A]=R:L[A]=R.clone(),!0;{const P=L[A];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return L[A]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(b){const S=b.uniforms;let v=0;const L=16;for(let A=0,P=S.length;A<P;A++){const E=Array.isArray(S[A])?S[A]:[S[A]];for(let y=0,C=E.length;y<C;y++){const H=E[y],F=Array.isArray(H.value)?H.value:[H.value];for(let V=0,q=F.length;V<q;V++){const G=F[V],K=_(G),W=v%L,ct=W%K.boundary,pt=W+ct;v+=ct,pt!==0&&L-pt<K.storage&&(v+=L-pt),H.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=K.storage}}}const R=v%L;return R>0&&(v+=L-R),b.__size=v,b.__cache={},this}function _(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class ov{constructor(t={}){const{canvas:e=$d(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=we,this.toneMapping=Cn,this.toneMappingExposure=1;const v=this;let L=!1,R=0,A=0,P=null,E=-1,y=null;const C=new he,H=new he;let F=null;const V=new Wt(0);let q=0,G=e.width,K=e.height,W=1,ct=null,pt=null;const yt=new he(0,0,G,K),Nt=new he(0,0,G,K);let qt=!1;const Y=new La;let it=!1,Et=!1;const at=new re,Rt=new re,Dt=new D,Lt=new he,Gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function $(){return P===null?W:1}let T=n;function lt(M,U){return e.getContext(M,U)}try{const M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ma}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),T===null){const U="webgl2";if(T=lt(U,M),T===null)throw lt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let J,ft,rt,Pt,_t,w,x,O,Z,et,j,bt,ut,xt,Vt,st,Mt,It,Ut,St,Xt,zt,ee,I;function dt(){J=new ug(T),J.init(),zt=new j_(T,J),ft=new rg(T,J,t,zt),rt=new $_(T,J),ft.reverseDepthBuffer&&f&&rt.buffers.depth.setReversed(!0),Pt=new pg(T),_t=new D_,w=new Z_(T,J,rt,_t,ft,zt,Pt),x=new ag(v),O=new hg(v),Z=new Mf(T),ee=new ig(T,Z),et=new dg(T,Z,Pt,ee),j=new gg(T,et,Z,Pt),Ut=new mg(T,ft,w),st=new og(_t),bt=new L_(v,x,O,J,ft,ee,st),ut=new sv(v,_t),xt=new U_,Vt=new z_(J),It=new ng(v,x,O,rt,j,d,c),Mt=new X_(v,j,ft),I=new rv(T,Pt,ft,rt),St=new sg(T,J,Pt),Xt=new fg(T,J,Pt),Pt.programs=bt.programs,v.capabilities=ft,v.extensions=J,v.properties=_t,v.renderLists=xt,v.shadowMap=Mt,v.state=rt,v.info=Pt}dt();const X=new nv(v,T);this.xr=X,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const M=J.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=J.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(M){M!==void 0&&(W=M,this.setSize(G,K,!1))},this.getSize=function(M){return M.set(G,K)},this.setSize=function(M,U,B=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=M,K=U,e.width=Math.floor(M*W),e.height=Math.floor(U*W),B===!0&&(e.style.width=M+"px",e.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(G*W,K*W).floor()},this.setDrawingBufferSize=function(M,U,B){G=M,K=U,W=B,e.width=Math.floor(M*B),e.height=Math.floor(U*B),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(C)},this.getViewport=function(M){return M.copy(yt)},this.setViewport=function(M,U,B,z){M.isVector4?yt.set(M.x,M.y,M.z,M.w):yt.set(M,U,B,z),rt.viewport(C.copy(yt).multiplyScalar(W).round())},this.getScissor=function(M){return M.copy(Nt)},this.setScissor=function(M,U,B,z){M.isVector4?Nt.set(M.x,M.y,M.z,M.w):Nt.set(M,U,B,z),rt.scissor(H.copy(Nt).multiplyScalar(W).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(M){rt.setScissorTest(qt=M)},this.setOpaqueSort=function(M){ct=M},this.setTransparentSort=function(M){pt=M},this.getClearColor=function(M){return M.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(M=!0,U=!0,B=!0){let z=0;if(M){let N=!1;if(P!==null){const ot=P.texture.format;N=ot===Aa||ot===Ta||ot===wa}if(N){const ot=P.texture.type,gt=ot===mn||ot===jn||ot===ls||ot===Ui||ot===Ea||ot===ba,wt=It.getClearColor(),Tt=It.getClearAlpha(),Ot=wt.r,kt=wt.g,At=wt.b;gt?(g[0]=Ot,g[1]=kt,g[2]=At,g[3]=Tt,T.clearBufferuiv(T.COLOR,0,g)):(_[0]=Ot,_[1]=kt,_[2]=At,_[3]=Tt,T.clearBufferiv(T.COLOR,0,_))}else z|=T.COLOR_BUFFER_BIT}U&&(z|=T.DEPTH_BUFFER_BIT),B&&(z|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),xt.dispose(),Vt.dispose(),_t.dispose(),x.dispose(),O.dispose(),j.dispose(),ee.dispose(),I.dispose(),bt.dispose(),X.dispose(),X.removeEventListener("sessionstart",Xa),X.removeEventListener("sessionend",qa),Un.stop()};function tt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const M=Pt.autoReset,U=Mt.enabled,B=Mt.autoUpdate,z=Mt.needsUpdate,N=Mt.type;dt(),Pt.autoReset=M,Mt.enabled=U,Mt.autoUpdate=B,Mt.needsUpdate=z,Mt.type=N}function mt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ft(M){const U=M.target;U.removeEventListener("dispose",Ft),ce(U)}function ce(M){_e(M),_t.remove(M)}function _e(M){const U=_t.get(M).programs;U!==void 0&&(U.forEach(function(B){bt.releaseProgram(B)}),M.isShaderMaterial&&bt.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,B,z,N,ot){U===null&&(U=Gt);const gt=N.isMesh&&N.matrixWorld.determinant()<0,wt=Qh(M,U,B,z,N);rt.setMaterial(z,gt);let Tt=B.index,Ot=1;if(z.wireframe===!0){if(Tt=et.getWireframeAttribute(B),Tt===void 0)return;Ot=2}const kt=B.drawRange,At=B.attributes.position;let Yt=kt.start*Ot,ne=(kt.start+kt.count)*Ot;ot!==null&&(Yt=Math.max(Yt,ot.start*Ot),ne=Math.min(ne,(ot.start+ot.count)*Ot)),Tt!==null?(Yt=Math.max(Yt,0),ne=Math.min(ne,Tt.count)):At!=null&&(Yt=Math.max(Yt,0),ne=Math.min(ne,At.count));const ie=ne-Yt;if(ie<0||ie===1/0)return;ee.setup(N,z,wt,B,Tt);let Ae,Zt=St;if(Tt!==null&&(Ae=Z.get(Tt),Zt=Xt,Zt.setIndex(Ae)),N.isMesh)z.wireframe===!0?(rt.setLineWidth(z.wireframeLinewidth*$()),Zt.setMode(T.LINES)):Zt.setMode(T.TRIANGLES);else if(N.isLine){let Ct=z.linewidth;Ct===void 0&&(Ct=1),rt.setLineWidth(Ct*$()),N.isLineSegments?Zt.setMode(T.LINES):N.isLineLoop?Zt.setMode(T.LINE_LOOP):Zt.setMode(T.LINE_STRIP)}else N.isPoints?Zt.setMode(T.POINTS):N.isSprite&&Zt.setMode(T.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Zt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))Zt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ct=N._multiDrawStarts,Ke=N._multiDrawCounts,jt=N._multiDrawCount,ke=Tt?Z.get(Tt).bytesPerElement:1,ei=_t.get(z).currentProgram.getUniforms();for(let Ce=0;Ce<jt;Ce++)ei.setValue(T,"_gl_DrawID",Ce),Zt.render(Ct[Ce]/ke,Ke[Ce])}else if(N.isInstancedMesh)Zt.renderInstances(Yt,ie,N.count);else if(B.isInstancedBufferGeometry){const Ct=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ke=Math.min(B.instanceCount,Ct);Zt.renderInstances(Yt,ie,Ke)}else Zt.render(Yt,ie)};function Kt(M,U,B){M.transparent===!0&&M.side===hn&&M.forceSinglePass===!1?(M.side=Te,M.needsUpdate=!0,Cs(M,U,B),M.side=Dn,M.needsUpdate=!0,Cs(M,U,B),M.side=hn):Cs(M,U,B)}this.compile=function(M,U,B=null){B===null&&(B=M),p=Vt.get(B),p.init(U),S.push(p),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),M!==B&&M.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const z=new Set;return M.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ot=N.material;if(ot)if(Array.isArray(ot))for(let gt=0;gt<ot.length;gt++){const wt=ot[gt];Kt(wt,B,N),z.add(wt)}else Kt(ot,B,N),z.add(ot)}),S.pop(),p=null,z},this.compileAsync=function(M,U,B=null){const z=this.compile(M,U,B);return new Promise(N=>{function ot(){if(z.forEach(function(gt){_t.get(gt).currentProgram.isReady()&&z.delete(gt)}),z.size===0){N(M);return}setTimeout(ot,10)}J.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Fe=null;function Je(M){Fe&&Fe(M)}function Xa(){Un.stop()}function qa(){Un.start()}const Un=new Mh;Un.setAnimationLoop(Je),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(M){Fe=M,X.setAnimationLoop(M),M===null?Un.stop():Un.start()},X.addEventListener("sessionstart",Xa),X.addEventListener("sessionend",qa),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(U),U=X.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,U,P),p=Vt.get(M,S.length),p.init(U),S.push(p),Rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(Rt),Et=this.localClippingEnabled,it=st.init(this.clippingPlanes,Et),m=xt.get(M,b.length),m.init(),b.push(m),X.enabled===!0&&X.isPresenting===!0){const ot=v.xr.getDepthSensingMesh();ot!==null&&Cr(ot,U,-1/0,v.sortObjects)}Cr(M,U,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ct,pt),Q=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Q&&It.addToRenderList(m,M),this.info.render.frame++,it===!0&&st.beginShadows();const B=p.state.shadowsArray;Mt.render(B,M,U),it===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const ot=U.cameras;if(N.length>0)for(let gt=0,wt=ot.length;gt<wt;gt++){const Tt=ot[gt];Ya(z,N,M,Tt)}Q&&It.render(M);for(let gt=0,wt=ot.length;gt<wt;gt++){const Tt=ot[gt];$a(m,M,Tt,Tt.viewport)}}else N.length>0&&Ya(z,N,M,U),Q&&It.render(M),$a(m,M,U);P!==null&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),M.isScene===!0&&M.onAfterRender(v,M,U),ee.resetDefaultState(),E=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],it===!0&&st.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Cr(M,U,B,z){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Y.intersectsSprite(M)){z&&Lt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Rt);const gt=j.update(M),wt=M.material;wt.visible&&m.push(M,gt,wt,B,Lt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Y.intersectsObject(M))){const gt=j.update(M),wt=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Lt.copy(M.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Lt.copy(gt.boundingSphere.center)),Lt.applyMatrix4(M.matrixWorld).applyMatrix4(Rt)),Array.isArray(wt)){const Tt=gt.groups;for(let Ot=0,kt=Tt.length;Ot<kt;Ot++){const At=Tt[Ot],Yt=wt[At.materialIndex];Yt&&Yt.visible&&m.push(M,gt,Yt,B,Lt.z,At)}}else wt.visible&&m.push(M,gt,wt,B,Lt.z,null)}}const ot=M.children;for(let gt=0,wt=ot.length;gt<wt;gt++)Cr(ot[gt],U,B,z)}function $a(M,U,B,z){const N=M.opaque,ot=M.transmissive,gt=M.transparent;p.setupLightsView(B),it===!0&&st.setGlobalState(v.clippingPlanes,B),z&&rt.viewport(C.copy(z)),N.length>0&&Rs(N,U,B),ot.length>0&&Rs(ot,U,B),gt.length>0&&Rs(gt,U,B),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function Ya(M,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Jn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?ys:mn,minFilter:qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const ot=p.state.transmissionRenderTarget[z.id],gt=z.viewport||C;ot.setSize(gt.z,gt.w);const wt=v.getRenderTarget();v.setRenderTarget(ot),v.getClearColor(V),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Q&&It.render(B);const Tt=v.toneMapping;v.toneMapping=Cn;const Ot=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),it===!0&&st.setGlobalState(v.clippingPlanes,z),Rs(M,B,z),w.updateMultisampleRenderTarget(ot),w.updateRenderTargetMipmap(ot),J.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let At=0,Yt=U.length;At<Yt;At++){const ne=U[At],ie=ne.object,Ae=ne.geometry,Zt=ne.material,Ct=ne.group;if(Zt.side===hn&&ie.layers.test(z.layers)){const Ke=Zt.side;Zt.side=Te,Zt.needsUpdate=!0,Za(ie,B,z,Ae,Zt,Ct),Zt.side=Ke,Zt.needsUpdate=!0,kt=!0}}kt===!0&&(w.updateMultisampleRenderTarget(ot),w.updateRenderTargetMipmap(ot))}v.setRenderTarget(wt),v.setClearColor(V,q),Ot!==void 0&&(z.viewport=Ot),v.toneMapping=Tt}function Rs(M,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ot=M.length;N<ot;N++){const gt=M[N],wt=gt.object,Tt=gt.geometry,Ot=z===null?gt.material:z,kt=gt.group;wt.layers.test(B.layers)&&Za(wt,U,B,Tt,Ot,kt)}}function Za(M,U,B,z,N,ot){M.onBeforeRender(v,U,B,z,N,ot),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(v,U,B,z,M,ot),N.transparent===!0&&N.side===hn&&N.forceSinglePass===!1?(N.side=Te,N.needsUpdate=!0,v.renderBufferDirect(B,U,z,N,M,ot),N.side=Dn,N.needsUpdate=!0,v.renderBufferDirect(B,U,z,N,M,ot),N.side=hn):v.renderBufferDirect(B,U,z,N,M,ot),M.onAfterRender(v,U,B,z,N,ot)}function Cs(M,U,B){U.isScene!==!0&&(U=Gt);const z=_t.get(M),N=p.state.lights,ot=p.state.shadowsArray,gt=N.state.version,wt=bt.getParameters(M,N.state,ot,U,B),Tt=bt.getProgramCacheKey(wt);let Ot=z.programs;z.environment=M.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(M.isMeshStandardMaterial?O:x).get(M.envMap||z.environment),z.envMapRotation=z.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Ot===void 0&&(M.addEventListener("dispose",Ft),Ot=new Map,z.programs=Ot);let kt=Ot.get(Tt);if(kt!==void 0){if(z.currentProgram===kt&&z.lightsStateVersion===gt)return Ja(M,wt),kt}else wt.uniforms=bt.getUniforms(M),M.onBeforeCompile(wt,v),kt=bt.acquireProgram(wt,Tt),Ot.set(Tt,kt),z.uniforms=wt.uniforms;const At=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(At.clippingPlanes=st.uniform),Ja(M,wt),z.needsLights=eu(M),z.lightsStateVersion=gt,z.needsLights&&(At.ambientLightColor.value=N.state.ambient,At.lightProbe.value=N.state.probe,At.directionalLights.value=N.state.directional,At.directionalLightShadows.value=N.state.directionalShadow,At.spotLights.value=N.state.spot,At.spotLightShadows.value=N.state.spotShadow,At.rectAreaLights.value=N.state.rectArea,At.ltc_1.value=N.state.rectAreaLTC1,At.ltc_2.value=N.state.rectAreaLTC2,At.pointLights.value=N.state.point,At.pointLightShadows.value=N.state.pointShadow,At.hemisphereLights.value=N.state.hemi,At.directionalShadowMap.value=N.state.directionalShadowMap,At.directionalShadowMatrix.value=N.state.directionalShadowMatrix,At.spotShadowMap.value=N.state.spotShadowMap,At.spotLightMatrix.value=N.state.spotLightMatrix,At.spotLightMap.value=N.state.spotLightMap,At.pointShadowMap.value=N.state.pointShadowMap,At.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=kt,z.uniformsList=null,kt}function ja(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=ur.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Ja(M,U){const B=_t.get(M);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function Qh(M,U,B,z,N){U.isScene!==!0&&(U=Gt),w.resetTextureUnits();const ot=U.fog,gt=z.isMeshStandardMaterial?U.environment:null,wt=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:zi,Tt=(z.isMeshStandardMaterial?O:x).get(z.envMap||gt),Ot=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,kt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),At=!!B.morphAttributes.position,Yt=!!B.morphAttributes.normal,ne=!!B.morphAttributes.color;let ie=Cn;z.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ie=v.toneMapping);const Ae=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Zt=Ae!==void 0?Ae.length:0,Ct=_t.get(z),Ke=p.state.lights;if(it===!0&&(Et===!0||M!==y)){const Ue=M===y&&z.id===E;st.setState(z,M,Ue)}let jt=!1;z.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Ke.state.version||Ct.outputColorSpace!==wt||N.isBatchedMesh&&Ct.batching===!1||!N.isBatchedMesh&&Ct.batching===!0||N.isBatchedMesh&&Ct.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ct.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ct.instancing===!1||!N.isInstancedMesh&&Ct.instancing===!0||N.isSkinnedMesh&&Ct.skinning===!1||!N.isSkinnedMesh&&Ct.skinning===!0||N.isInstancedMesh&&Ct.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ct.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ct.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ct.instancingMorph===!1&&N.morphTexture!==null||Ct.envMap!==Tt||z.fog===!0&&Ct.fog!==ot||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==st.numPlanes||Ct.numIntersection!==st.numIntersection)||Ct.vertexAlphas!==Ot||Ct.vertexTangents!==kt||Ct.morphTargets!==At||Ct.morphNormals!==Yt||Ct.morphColors!==ne||Ct.toneMapping!==ie||Ct.morphTargetsCount!==Zt)&&(jt=!0):(jt=!0,Ct.__version=z.version);let ke=Ct.currentProgram;jt===!0&&(ke=Cs(z,U,N));let ei=!1,Ce=!1,Xi=!1;const se=ke.getUniforms(),Xe=Ct.uniforms;if(rt.useProgram(ke.program)&&(ei=!0,Ce=!0,Xi=!0),z.id!==E&&(E=z.id,Ce=!0),ei||y!==M){rt.buffers.depth.getReversed()?(at.copy(M.projectionMatrix),Zd(at),jd(at),se.setValue(T,"projectionMatrix",at)):se.setValue(T,"projectionMatrix",M.projectionMatrix),se.setValue(T,"viewMatrix",M.matrixWorldInverse);const gn=se.map.cameraPosition;gn!==void 0&&gn.setValue(T,Dt.setFromMatrixPosition(M.matrixWorld)),ft.logarithmicDepthBuffer&&se.setValue(T,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&se.setValue(T,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,Ce=!0,Xi=!0)}if(N.isSkinnedMesh){se.setOptional(T,N,"bindMatrix"),se.setOptional(T,N,"bindMatrixInverse");const Ue=N.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),se.setValue(T,"boneTexture",Ue.boneTexture,w))}N.isBatchedMesh&&(se.setOptional(T,N,"batchingTexture"),se.setValue(T,"batchingTexture",N._matricesTexture,w),se.setOptional(T,N,"batchingIdTexture"),se.setValue(T,"batchingIdTexture",N._indirectTexture,w),se.setOptional(T,N,"batchingColorTexture"),N._colorsTexture!==null&&se.setValue(T,"batchingColorTexture",N._colorsTexture,w));const qi=B.morphAttributes;if((qi.position!==void 0||qi.normal!==void 0||qi.color!==void 0)&&Ut.update(N,B,ke),(Ce||Ct.receiveShadow!==N.receiveShadow)&&(Ct.receiveShadow=N.receiveShadow,se.setValue(T,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Xe.envMap.value=Tt,Xe.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(Xe.envMapIntensity.value=U.environmentIntensity),Ce&&(se.setValue(T,"toneMappingExposure",v.toneMappingExposure),Ct.needsLights&&tu(Xe,Xi),ot&&z.fog===!0&&ut.refreshFogUniforms(Xe,ot),ut.refreshMaterialUniforms(Xe,z,W,K,p.state.transmissionRenderTarget[M.id]),ur.upload(T,ja(Ct),Xe,w)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ur.upload(T,ja(Ct),Xe,w),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&se.setValue(T,"center",N.center),se.setValue(T,"modelViewMatrix",N.modelViewMatrix),se.setValue(T,"normalMatrix",N.normalMatrix),se.setValue(T,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ue=z.uniformsGroups;for(let gn=0,_n=Ue.length;gn<_n;gn++){const Ka=Ue[gn];I.update(Ka,ke),I.bind(Ka,ke)}}return ke}function tu(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function eu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(M,U,B){_t.get(M.texture).__webglTexture=U,_t.get(M.depthTexture).__webglTexture=B;const z=_t.get(M);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,U){const B=_t.get(M);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(M,U=0,B=0){P=M,R=U,A=B;let z=!0,N=null,ot=!1,gt=!1;if(M){const Tt=_t.get(M);if(Tt.__useDefaultFramebuffer!==void 0)rt.bindFramebuffer(T.FRAMEBUFFER,null),z=!1;else if(Tt.__webglFramebuffer===void 0)w.setupRenderTarget(M);else if(Tt.__hasExternalTextures)w.rebindTextures(M,_t.get(M.texture).__webglTexture,_t.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const At=M.depthTexture;if(Tt.__boundDepthTexture!==At){if(At!==null&&_t.has(At)&&(M.width!==At.image.width||M.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(M)}}const Ot=M.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(gt=!0);const kt=_t.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(kt[U])?N=kt[U][B]:N=kt[U],ot=!0):M.samples>0&&w.useMultisampledRTT(M)===!1?N=_t.get(M).__webglMultisampledFramebuffer:Array.isArray(kt)?N=kt[B]:N=kt,C.copy(M.viewport),H.copy(M.scissor),F=M.scissorTest}else C.copy(yt).multiplyScalar(W).floor(),H.copy(Nt).multiplyScalar(W).floor(),F=qt;if(rt.bindFramebuffer(T.FRAMEBUFFER,N)&&z&&rt.drawBuffers(M,N),rt.viewport(C),rt.scissor(H),rt.setScissorTest(F),ot){const Tt=_t.get(M.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+U,Tt.__webglTexture,B)}else if(gt){const Tt=_t.get(M.texture),Ot=U||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Tt.__webglTexture,B||0,Ot)}E=-1},this.readRenderTargetPixels=function(M,U,B,z,N,ot,gt){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=_t.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&gt!==void 0&&(wt=wt[gt]),wt){rt.bindFramebuffer(T.FRAMEBUFFER,wt);try{const Tt=M.texture,Ot=Tt.format,kt=Tt.type;if(!ft.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-z&&B>=0&&B<=M.height-N&&T.readPixels(U,B,z,N,zt.convert(Ot),zt.convert(kt),ot)}finally{const Tt=P!==null?_t.get(P).__webglFramebuffer:null;rt.bindFramebuffer(T.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(M,U,B,z,N,ot,gt){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=_t.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&gt!==void 0&&(wt=wt[gt]),wt){const Tt=M.texture,Ot=Tt.format,kt=Tt.type;if(!ft.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=M.width-z&&B>=0&&B<=M.height-N){rt.bindFramebuffer(T.FRAMEBUFFER,wt);const At=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,At),T.bufferData(T.PIXEL_PACK_BUFFER,ot.byteLength,T.STREAM_READ),T.readPixels(U,B,z,N,zt.convert(Ot),zt.convert(kt),0);const Yt=P!==null?_t.get(P).__webglFramebuffer:null;rt.bindFramebuffer(T.FRAMEBUFFER,Yt);const ne=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Yd(T,ne,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,At),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,ot),T.deleteBuffer(At),T.deleteSync(ne),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,U=null,B=0){M.isTexture!==!0&&(Ki("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,M=arguments[1]);const z=Math.pow(2,-B),N=Math.floor(M.image.width*z),ot=Math.floor(M.image.height*z),gt=U!==null?U.x:0,wt=U!==null?U.y:0;w.setTexture2D(M,0),T.copyTexSubImage2D(T.TEXTURE_2D,B,0,0,gt,wt,N,ot),rt.unbindTexture()},this.copyTextureToTexture=function(M,U,B=null,z=null,N=0){M.isTexture!==!0&&(Ki("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,M=arguments[1],U=arguments[2],N=arguments[3]||0,B=null);let ot,gt,wt,Tt,Ot,kt,At,Yt,ne;const ie=M.isCompressedTexture?M.mipmaps[N]:M.image;B!==null?(ot=B.max.x-B.min.x,gt=B.max.y-B.min.y,wt=B.isBox3?B.max.z-B.min.z:1,Tt=B.min.x,Ot=B.min.y,kt=B.isBox3?B.min.z:0):(ot=ie.width,gt=ie.height,wt=ie.depth||1,Tt=0,Ot=0,kt=0),z!==null?(At=z.x,Yt=z.y,ne=z.z):(At=0,Yt=0,ne=0);const Ae=zt.convert(U.format),Zt=zt.convert(U.type);let Ct;U.isData3DTexture?(w.setTexture3D(U,0),Ct=T.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(w.setTexture2DArray(U,0),Ct=T.TEXTURE_2D_ARRAY):(w.setTexture2D(U,0),Ct=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,U.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,U.unpackAlignment);const Ke=T.getParameter(T.UNPACK_ROW_LENGTH),jt=T.getParameter(T.UNPACK_IMAGE_HEIGHT),ke=T.getParameter(T.UNPACK_SKIP_PIXELS),ei=T.getParameter(T.UNPACK_SKIP_ROWS),Ce=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,ie.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ie.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Tt),T.pixelStorei(T.UNPACK_SKIP_ROWS,Ot),T.pixelStorei(T.UNPACK_SKIP_IMAGES,kt);const Xi=M.isDataArrayTexture||M.isData3DTexture,se=U.isDataArrayTexture||U.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const Xe=_t.get(M),qi=_t.get(U),Ue=_t.get(Xe.__renderTarget),gn=_t.get(qi.__renderTarget);rt.bindFramebuffer(T.READ_FRAMEBUFFER,Ue.__webglFramebuffer),rt.bindFramebuffer(T.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let _n=0;_n<wt;_n++)Xi&&T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_t.get(M).__webglTexture,N,kt+_n),M.isDepthTexture?(se&&T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,N,ne+_n),T.blitFramebuffer(Tt,Ot,ot,gt,At,Yt,ot,gt,T.DEPTH_BUFFER_BIT,T.NEAREST)):se?T.copyTexSubImage3D(Ct,N,At,Yt,ne+_n,Tt,Ot,ot,gt):T.copyTexSubImage2D(Ct,N,At,Yt,ne+_n,Tt,Ot,ot,gt);rt.bindFramebuffer(T.READ_FRAMEBUFFER,null),rt.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else se?M.isDataTexture||M.isData3DTexture?T.texSubImage3D(Ct,N,At,Yt,ne,ot,gt,wt,Ae,Zt,ie.data):U.isCompressedArrayTexture?T.compressedTexSubImage3D(Ct,N,At,Yt,ne,ot,gt,wt,Ae,ie.data):T.texSubImage3D(Ct,N,At,Yt,ne,ot,gt,wt,Ae,Zt,ie):M.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,N,At,Yt,ot,gt,Ae,Zt,ie.data):M.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,N,At,Yt,ie.width,ie.height,Ae,ie.data):T.texSubImage2D(T.TEXTURE_2D,N,At,Yt,ot,gt,Ae,Zt,ie);T.pixelStorei(T.UNPACK_ROW_LENGTH,Ke),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,jt),T.pixelStorei(T.UNPACK_SKIP_PIXELS,ke),T.pixelStorei(T.UNPACK_SKIP_ROWS,ei),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ce),N===0&&U.generateMipmaps&&T.generateMipmap(Ct),rt.unbindTexture()},this.copyTextureToTexture3D=function(M,U,B=null,z=null,N=0){return M.isTexture!==!0&&(Ki("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,M=arguments[2],U=arguments[3],N=arguments[4]||0),Ki('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,U,B,z,N)},this.initRenderTarget=function(M){_t.get(M).__webglFramebuffer===void 0&&w.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?w.setTextureCube(M,0):M.isData3DTexture?w.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?w.setTexture2DArray(M,0):w.setTexture2D(M,0),rt.unbindTexture()},this.resetState=function(){R=0,A=0,P=null,rt.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class Ia{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=n}clone(){return new Ia(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class av extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ze,this.environmentIntensity=1,this.environmentRotation=new Ze,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class cv extends Se{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class je{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new nt:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,s=[],r=[],o=[],a=new D,c=new re;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(me(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(me(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ua extends je{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new nt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class lv extends Ua{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Na(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Qs=new D,oo=new Na,ao=new Na,co=new Na;class hv extends je{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Qs.subVectors(s[0],s[1]).add(s[0]),l=Qs);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Qs.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Qs),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),oo.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),ao.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),co.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(oo.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),ao.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),co.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(oo.calc(c),ao.calc(c),co.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function rl(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function uv(i,t){const e=1-i;return e*e*t}function dv(i,t){return 2*(1-i)*i*t}function fv(i,t){return i*i*t}function is(i,t,e,n){return uv(i,t)+dv(i,e)+fv(i,n)}function pv(i,t){const e=1-i;return e*e*e*t}function mv(i,t){const e=1-i;return 3*e*e*i*t}function gv(i,t){return 3*(1-i)*i*i*t}function _v(i,t){return i*i*i*t}function ss(i,t,e,n,s){return pv(i,t)+mv(i,e)+gv(i,n)+_v(i,s)}class Rh extends je{constructor(t=new nt,e=new nt,n=new nt,s=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new nt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ss(t,s.x,r.x,o.x,a.x),ss(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vv extends je{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ss(t,s.x,r.x,o.x,a.x),ss(t,s.y,r.y,o.y,a.y),ss(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ch extends je{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xv extends je{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ph extends je{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(is(t,s.x,r.x,o.x),is(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yv extends je{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(is(t,s.x,r.x,o.x),is(t,s.y,r.y,o.y),is(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lh extends je{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(rl(a,c.x,l.x,h.x,u.x),rl(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new nt().fromArray(s))}return this}}var aa=Object.freeze({__proto__:null,ArcCurve:lv,CatmullRomCurve3:hv,CubicBezierCurve:Rh,CubicBezierCurve3:vv,EllipseCurve:Ua,LineCurve:Ch,LineCurve3:xv,QuadraticBezierCurve:Ph,QuadraticBezierCurve3:yv,SplineCurve:Lh});class Mv extends je{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new aa[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new aa[s.type]().fromJSON(s))}return this}}class ca extends Mv{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ch(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Ph(this.currentPoint.clone(),new nt(t,e),new nt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Rh(this.currentPoint.clone(),new nt(t,e),new nt(n,s),new nt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Lh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new Ua(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Oa extends Ie{constructor(t=[new nt(0,-.5),new nt(.5,0),new nt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=me(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/e,u=new D,f=new nt,d=new D,g=new D,_=new D;let m=0,p=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let b=0;b<=e;b++){const S=n+b*h*s,v=Math.sin(S),L=Math.cos(S);for(let R=0;R<=t.length-1;R++){u.x=t[R].x*v,u.y=t[R].y,u.z=t[R].x*L,o.push(u.x,u.y,u.z),f.x=b/e,f.y=R/(t.length-1),a.push(f.x,f.y);const A=c[3*R+0]*v,P=c[3*R+1],E=c[3*R+0]*L;l.push(A,P,E)}}for(let b=0;b<e;b++)for(let S=0;S<t.length-1;S++){const v=S+b*t.length,L=v,R=v+t.length,A=v+t.length+1,P=v+1;r.push(L,R,P),r.push(A,P,R)}this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("uv",new oe(a,2)),this.setAttribute("normal",new oe(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oa(t.points,t.segments,t.phiStart,t.phiLength)}}class Ti extends Ie{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new D,h=new nt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("normal",new oe(a,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ti(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ai extends Ie{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;b(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(f,3)),this.setAttribute("uv",new oe(d,2));function b(){const v=new D,L=new D;let R=0;const A=(e-t)/n;for(let P=0;P<=r;P++){const E=[],y=P/r,C=y*(e-t)+t;for(let H=0;H<=s;H++){const F=H/s,V=F*c+a,q=Math.sin(V),G=Math.cos(V);L.x=C*q,L.y=-y*n+m,L.z=C*G,u.push(L.x,L.y,L.z),v.set(q,A,G).normalize(),f.push(v.x,v.y,v.z),d.push(F,1-y),E.push(g++)}_.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){const y=_[E][P],C=_[E+1][P],H=_[E+1][P+1],F=_[E][P+1];(t>0||E!==0)&&(h.push(y,C,F),R+=3),(e>0||E!==r-1)&&(h.push(C,H,F),R+=3)}l.addGroup(p,R,0),p+=R}function S(v){const L=g,R=new nt,A=new D;let P=0;const E=v===!0?t:e,y=v===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),g++;const C=g;for(let H=0;H<=s;H++){const V=H/s*c+a,q=Math.cos(V),G=Math.sin(V);A.x=E*G,A.y=m*y,A.z=E*q,u.push(A.x,A.y,A.z),f.push(0,y,0),R.x=q*.5+.5,R.y=G*.5*y+.5,d.push(R.x,R.y),g++}for(let H=0;H<s;H++){const F=L+H,V=C+H;v===!0?h.push(V,V+1,F):h.push(V+1,V,F),P+=3}l.addGroup(p,P,v===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ai(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fa extends Ai{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Fa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $n extends ca{constructor(t){super(t),this.uuid=ti(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ca().fromJSON(s))}return this}}const Sv={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Dh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,f,d;if(n&&(r=Av(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],f=i[g+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-a,h-c),d=d!==0?32767/d:0}return ds(r,o,e,a,c,d,0),o}};function Dh(i,t,e,n,s){let r,o;if(s===kv(i,t,e,n)>0)for(r=t;r<e;r+=n)o=ol(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=ol(r,i[r],i[r+1],o);return o&&Ar(o,o.next)&&(ps(o),o=o.next),o}function Kn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ar(e,e.next)||ae(e.prev,e,e.next)===0)){if(ps(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ds(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Dv(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?bv(i,n,s,r):Ev(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),ps(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=wv(Kn(i),t,e),ds(i,t,e,n,s,r,2)):o===2&&Tv(i,t,e,n,s,r):ds(Kn(i),t,e,n,s,r,1);break}}}function Ev(i){const t=i.prev,e=i,n=i.next;if(ae(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Mi(s,a,r,c,o,l,g.x,g.y)&&ae(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function bv(i,t,e,n){const s=i.prev,r=i,o=i.next;if(ae(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>f?h:f:u>f?u:f,p=la(d,g,t,e,n),b=la(_,m,t,e,n);let S=i.prevZ,v=i.nextZ;for(;S&&S.z>=p&&v&&v.z<=b;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Mi(a,h,c,u,l,f,S.x,S.y)&&ae(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Mi(a,h,c,u,l,f,v.x,v.y)&&ae(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Mi(a,h,c,u,l,f,S.x,S.y)&&ae(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=b;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Mi(a,h,c,u,l,f,v.x,v.y)&&ae(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function wv(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Ar(s,r)&&Ih(s,n,n.next,r)&&fs(s,r)&&fs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ps(n),ps(n.next),n=i=r),n=n.next}while(n!==i);return Kn(n)}function Tv(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Nv(o,a)){let c=Uh(o,a);o=Kn(o,o.next),c=Kn(c,c.next),ds(o,t,e,n,s,r,0),ds(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Av(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Dh(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Uv(l));for(s.sort(Rv),r=0;r<s.length;r++)e=Cv(s[r],e);return e}function Rv(i,t){return i.x-t.x}function Cv(i,t){const e=Pv(i,t);if(!e)return t;const n=Uh(e,i);return Kn(n,n.next),Kn(e,e.next)}function Pv(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Mi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),fs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Lv(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function Lv(i,t){return ae(i.prev,i,t.prev)<0&&ae(t.next,i,i.next)<0}function Dv(i,t,e,n){let s=i;do s.z===0&&(s.z=la(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Iv(s)}function Iv(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function la(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Uv(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Mi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Nv(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Ov(i,t)&&(fs(i,t)&&fs(t,i)&&Fv(i,t)&&(ae(i.prev,i,t.prev)||ae(i,t.prev,t))||Ar(i,t)&&ae(i.prev,i,i.next)>0&&ae(t.prev,t,t.next)>0)}function ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ar(i,t){return i.x===t.x&&i.y===t.y}function Ih(i,t,e,n){const s=er(ae(i,t,e)),r=er(ae(i,t,n)),o=er(ae(e,n,i)),a=er(ae(e,n,t));return!!(s!==r&&o!==a||s===0&&tr(i,e,t)||r===0&&tr(i,n,t)||o===0&&tr(e,i,n)||a===0&&tr(e,t,n))}function tr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function er(i){return i>0?1:i<0?-1:0}function Ov(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Ih(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function fs(i,t){return ae(i.prev,i,i.next)<0?ae(i,t,i.next)>=0&&ae(i,i.prev,t)>=0:ae(i,t,i.prev)<0||ae(i,i.next,t)<0}function Fv(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Uh(i,t){const e=new ha(i.i,i.x,i.y),n=new ha(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ol(i,t,e,n){const s=new ha(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ps(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ha(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function kv(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Pn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Pn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];al(t),cl(n,t);let o=t.length;e.forEach(al);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,cl(n,e[c]);const a=Sv.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function al(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function cl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class rs extends Ie{constructor(t=new $n([new nt(.5,.5),new nt(-.5,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new oe(s,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:Bv;let S,v=!1,L,R,A,P;p&&(S=p.getSpacedPoints(h),v=!0,f=!1,L=p.computeFrenetFrames(h,!1),R=new D,A=new D,P=new D),f||(m=0,d=0,g=0,_=0);const E=a.extractPoints(l);let y=E.shape;const C=E.holes;if(!Pn.isClockWise(y)){y=y.reverse();for(let Q=0,$=C.length;Q<$;Q++){const T=C[Q];Pn.isClockWise(T)&&(C[Q]=T.reverse())}}const F=Pn.triangulateShape(y,C),V=y;for(let Q=0,$=C.length;Q<$;Q++){const T=C[Q];y=y.concat(T)}function q(Q,$,T){return $||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector($,T)}const G=y.length,K=F.length;function W(Q,$,T){let lt,J,ft;const rt=Q.x-$.x,Pt=Q.y-$.y,_t=T.x-Q.x,w=T.y-Q.y,x=rt*rt+Pt*Pt,O=rt*w-Pt*_t;if(Math.abs(O)>Number.EPSILON){const Z=Math.sqrt(x),et=Math.sqrt(_t*_t+w*w),j=$.x-Pt/Z,bt=$.y+rt/Z,ut=T.x-w/et,xt=T.y+_t/et,Vt=((ut-j)*w-(xt-bt)*_t)/(rt*w-Pt*_t);lt=j+rt*Vt-Q.x,J=bt+Pt*Vt-Q.y;const st=lt*lt+J*J;if(st<=2)return new nt(lt,J);ft=Math.sqrt(st/2)}else{let Z=!1;rt>Number.EPSILON?_t>Number.EPSILON&&(Z=!0):rt<-Number.EPSILON?_t<-Number.EPSILON&&(Z=!0):Math.sign(Pt)===Math.sign(w)&&(Z=!0),Z?(lt=-Pt,J=rt,ft=Math.sqrt(x)):(lt=rt,J=Pt,ft=Math.sqrt(x/2))}return new nt(lt/ft,J/ft)}const ct=[];for(let Q=0,$=V.length,T=$-1,lt=Q+1;Q<$;Q++,T++,lt++)T===$&&(T=0),lt===$&&(lt=0),ct[Q]=W(V[Q],V[T],V[lt]);const pt=[];let yt,Nt=ct.concat();for(let Q=0,$=C.length;Q<$;Q++){const T=C[Q];yt=[];for(let lt=0,J=T.length,ft=J-1,rt=lt+1;lt<J;lt++,ft++,rt++)ft===J&&(ft=0),rt===J&&(rt=0),yt[lt]=W(T[lt],T[ft],T[rt]);pt.push(yt),Nt=Nt.concat(yt)}for(let Q=0;Q<m;Q++){const $=Q/m,T=d*Math.cos($*Math.PI/2),lt=g*Math.sin($*Math.PI/2)+_;for(let J=0,ft=V.length;J<ft;J++){const rt=q(V[J],ct[J],lt);at(rt.x,rt.y,-T)}for(let J=0,ft=C.length;J<ft;J++){const rt=C[J];yt=pt[J];for(let Pt=0,_t=rt.length;Pt<_t;Pt++){const w=q(rt[Pt],yt[Pt],lt);at(w.x,w.y,-T)}}}const qt=g+_;for(let Q=0;Q<G;Q++){const $=f?q(y[Q],Nt[Q],qt):y[Q];v?(A.copy(L.normals[0]).multiplyScalar($.x),R.copy(L.binormals[0]).multiplyScalar($.y),P.copy(S[0]).add(A).add(R),at(P.x,P.y,P.z)):at($.x,$.y,0)}for(let Q=1;Q<=h;Q++)for(let $=0;$<G;$++){const T=f?q(y[$],Nt[$],qt):y[$];v?(A.copy(L.normals[Q]).multiplyScalar(T.x),R.copy(L.binormals[Q]).multiplyScalar(T.y),P.copy(S[Q]).add(A).add(R),at(P.x,P.y,P.z)):at(T.x,T.y,u/h*Q)}for(let Q=m-1;Q>=0;Q--){const $=Q/m,T=d*Math.cos($*Math.PI/2),lt=g*Math.sin($*Math.PI/2)+_;for(let J=0,ft=V.length;J<ft;J++){const rt=q(V[J],ct[J],lt);at(rt.x,rt.y,u+T)}for(let J=0,ft=C.length;J<ft;J++){const rt=C[J];yt=pt[J];for(let Pt=0,_t=rt.length;Pt<_t;Pt++){const w=q(rt[Pt],yt[Pt],lt);v?at(w.x,w.y+S[h-1].y,S[h-1].x+T):at(w.x,w.y,u+T)}}}Y(),it();function Y(){const Q=s.length/3;if(f){let $=0,T=G*$;for(let lt=0;lt<K;lt++){const J=F[lt];Rt(J[2]+T,J[1]+T,J[0]+T)}$=h+m*2,T=G*$;for(let lt=0;lt<K;lt++){const J=F[lt];Rt(J[0]+T,J[1]+T,J[2]+T)}}else{for(let $=0;$<K;$++){const T=F[$];Rt(T[2],T[1],T[0])}for(let $=0;$<K;$++){const T=F[$];Rt(T[0]+G*h,T[1]+G*h,T[2]+G*h)}}n.addGroup(Q,s.length/3-Q,0)}function it(){const Q=s.length/3;let $=0;Et(V,$),$+=V.length;for(let T=0,lt=C.length;T<lt;T++){const J=C[T];Et(J,$),$+=J.length}n.addGroup(Q,s.length/3-Q,1)}function Et(Q,$){let T=Q.length;for(;--T>=0;){const lt=T;let J=T-1;J<0&&(J=Q.length-1);for(let ft=0,rt=h+m*2;ft<rt;ft++){const Pt=G*ft,_t=G*(ft+1),w=$+lt+Pt,x=$+J+Pt,O=$+J+_t,Z=$+lt+_t;Dt(w,x,O,Z)}}}function at(Q,$,T){c.push(Q),c.push($),c.push(T)}function Rt(Q,$,T){Lt(Q),Lt($),Lt(T);const lt=s.length/3,J=b.generateTopUV(n,s,lt-3,lt-2,lt-1);Gt(J[0]),Gt(J[1]),Gt(J[2])}function Dt(Q,$,T,lt){Lt(Q),Lt($),Lt(lt),Lt($),Lt(T),Lt(lt);const J=s.length/3,ft=b.generateSideWallUV(n,s,J-6,J-3,J-2,J-1);Gt(ft[0]),Gt(ft[1]),Gt(ft[3]),Gt(ft[1]),Gt(ft[2]),Gt(ft[3])}function Lt(Q){s.push(c[Q*3+0]),s.push(c[Q*3+1]),s.push(c[Q*3+2])}function Gt(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return zv(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new aa[s.type]().fromJSON(s)),new rs(n,t.options)}}const Bv={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new nt(r,o),new nt(a,c),new nt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new nt(o,1-c),new nt(l,1-u),new nt(f,1-g),new nt(_,1-p)]:[new nt(a,1-c),new nt(h,1-u),new nt(d,1-g),new nt(m,1-p)]}};function zv(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class os extends Ie{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const f=(e-t)/s,d=new D,g=new nt;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const b=p+m,S=b,v=b+n+1,L=b+n+2,R=b+1;a.push(S,v,R),a.push(v,L,R)}}this.setIndex(a),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(l,3)),this.setAttribute("uv",new oe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new os(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Rr extends Ie{constructor(t=new $n([new nt(0,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new oe(s,3)),this.setAttribute("normal",new oe(r,3)),this.setAttribute("uv",new oe(o,2));function l(h){const u=s.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;Pn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const b=g[m];Pn.isClockWise(b)===!0&&(g[m]=b.reverse())}const _=Pn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const b=g[m];d=d.concat(b)}for(let m=0,p=d.length;m<p;m++){const b=d[m];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,p=_.length;m<p;m++){const b=_[m],S=b[0]+u,v=b[1]+u,L=b[2]+u;n.push(S,v,L),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Hv(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new Rr(n,t.curveSegments)}}function Hv(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class ye extends Es{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lh,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const ll={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Vv{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){const d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}}const Gv=new Vv;class ka{constructor(t){this.manager=t!==void 0?t:Gv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ka.DEFAULT_MATERIAL_NAME="__DEFAULT";class Wv extends ka{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=ll.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=us("img");function c(){h(),ll.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class Xv extends ka{constructor(t){super(t)}load(t,e,n,s){const r=new Se,o=new Wv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Nh extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class qv extends Nh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const lo=new re,hl=new D,ul=new D;class $v{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new La,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;hl.setFromMatrixPosition(t.matrixWorld),e.position.copy(hl),ul.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ul),e.updateMatrixWorld(),lo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(lo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Yv extends $v{constructor(){super(new Sh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dl extends Nh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new Yv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const fl=new re;class Zv{constructor(t,e,n=0,s=1/0){this.ray=new ph(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Pa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return fl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(fl),this}intersectObject(t,e=!0,n=[]){return ua(t,this,n,e),n.sort(pl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ua(t[s],this,n,e);return n.sort(pl),n}}function pl(i,t){return i.distance-t.distance}function ua(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)ua(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ma}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ma);function Me(i,t=0,e=new D){return e.set(i.x,t,-i.y)}function jv(i){return{x:i.x,y:-i.z}}function Fi(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2D canvas unavailable");return[e,n]}function Ts(i,t){const e=new cv(i);return e.colorSpace=we,e.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy()),e.needsUpdate=!0,e}function ki(i){const t=(n,s)=>{let r=n*374761393+s*668265263+i*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296},e=n=>n*n*(3-2*n);return(n,s)=>{const r=Math.floor(n),o=Math.floor(s),a=e(n-r),c=e(s-o),l=t(r,o),h=t(r+1,o),u=t(r,o+1),f=t(r+1,o+1);return l+(h-l)*a+(u-l)*c+(l-h-u+f)*a*c}}function Jv(i,t){const e=t.size??2048,n=t.geometry.spec.radius,s=b=>[(b.x/n*.5+.5)*e,(1-(b.y/n*.5+.5))*e],r=e/(2*n),o=e/2,[a,c]=Fi(o,o),l=c.createImageData(o,o),h=ki(11),u=ki(23);for(let b=0;b<o;b++)for(let S=0;S<o;S++){const v=S/o,L=b/o,R=h(v*3,L*2)*6+u(v*9,L*6)*.8,A=Math.sin((L*9+R)*Math.PI),P=Math.pow(Math.abs(A),6),E=u(v*220,L*40)*.05,y=1-P*.18-E+h(v*2,L*5)*.06,C=(b*o+S)*4;l.data[C]=Math.min(255,222*y),l.data[C+1]=Math.min(255,184*y),l.data[C+2]=Math.min(255,124*y),l.data[C+3]=255}c.putImageData(l,0,0);const[f,d]=Fi(e,e);d.imageSmoothingQuality="high",d.drawImage(a,0,0,e,e);const g="rgba(70,45,25,0.85)";for(const b of t.geometry.ropes){const[S,v]=s(b.start),[L,R]=s(b.end),A=Math.hypot(L-S,R-v),P=(L-S)/A,E=(R-v)/A,y=r*.0045,C=r*(t.geometry.spec.pocketRadius+t.geometry.spec.shooterRadius)*.45,H=S-P*C,F=v-E*C,V=A+C*2;d.strokeStyle=g,d.lineWidth=Math.max(1,r*.0011);for(const q of[-1,1])d.beginPath(),d.moveTo(H-E*y*q,F+P*y*q),d.lineTo(H+P*V-E*y*q,F+E*V+P*y*q),d.stroke();for(let q=0;q<V;q+=y*1.6){const G=H+P*q,K=F+E*q;d.beginPath(),d.moveTo(G-E*y-P*y*.7,K+P*y-E*y*.7),d.lineTo(G+E*y+P*y*.7,K-P*y+E*y*.7),d.stroke()}}const[_,m]=s({x:0,y:0}),p=r*.075;d.save(),d.translate(_,m),d.strokeStyle=g,d.fillStyle=g,d.lineWidth=p*.09,d.beginPath(),d.arc(0,0,p*.78,0,Math.PI*2),d.stroke(),d.lineWidth=p*.05,d.beginPath(),d.arc(0,0,p*.62,0,Math.PI*2),d.stroke(),d.beginPath(),d.arc(0,0,p*.14,0,Math.PI*2),d.fill();for(let b=0;b<8;b++){const S=b*Math.PI/4+Math.PI/8;d.lineWidth=p*.07,d.beginPath(),d.moveTo(Math.cos(S)*p*.14,Math.sin(S)*p*.14),d.lineTo(Math.cos(S)*p*1.12,Math.sin(S)*p*1.12),d.stroke(),d.beginPath(),d.ellipse(Math.cos(S)*p*1.15,Math.sin(S)*p*1.15,p*.09,p*.06,S,0,Math.PI*2),d.fill()}return d.restore(),t.geometry.pockets.forEach((b,S)=>{if(t.pocketRoles[S]!=="shark")return;const[v,L]=s(b),R=t.geometry.spec.pocketRadius*r;d.strokeStyle="rgba(200,40,40,0.75)",d.lineWidth=R*.16,d.setLineDash([R*.25,R*.15]),d.beginPath(),d.arc(v,L,R*1.12,0,Math.PI*2),d.stroke(),d.setLineDash([])}),Ts(f,i)}function Kv(i,t,e){const s=ki(5),r=ki(9),[o,a]=Fi(1024,1024),c=a.createImageData(1024,1024),l=t.rails.map(h=>({n:h.normal,t:{x:-h.normal.y,y:h.normal.x}}));for(let h=0;h<1024;h++)for(let u=0;u<1024;u++){const f=(u/1024*2-1)*e,d=(1-h/1024*2)*e;let g=0,_=-1/0;for(let A=0;A<6;A++){const P=-(l[A].n.x*f+l[A].n.y*d);P>_&&(_=P,g=A)}const m=l[g].t.x*f+l[g].t.y*d,p=m>0?1:0,b=_*60+s(m*3+p*17,_*8)*2.2,S=Math.abs(Math.sin(b*Math.PI)),v=r(m*140,_*30);let L=.62+.18*Math.pow(S,3)+.1*v+(p?.04:-.02)+(g%2?.03:0);Math.abs(m)<.004&&(L*=.55);const R=(h*1024+u)*4;c.data[R]=112*L,c.data[R+1]=72*L,c.data[R+2]=42*L,c.data[R+3]=255}return a.putImageData(c,0,0),Ts(o,i)}function Qv(i){const e=ki(31),[n,s]=Fi(512,512),r=s.createImageData(512,512);for(let a=0;a<512;a++)for(let c=0;c<512;c++){const l=c/512,h=a/512,u=Math.abs(Math.sin((h*22+e(l*4,h*8)*3)*Math.PI)),f=.7+.2*Math.pow(u,4)+e(l*60,h*9)*.1,d=(a*512+c)*4;r.data[d]=70*f,r.data[d+1]=45*f,r.data[d+2]=30*f,r.data[d+3]=255}s.putImageData(r,0,0);const o=Ts(n,i);return o.wrapS=o.wrapT=pr,o}function t0(i){const[e,n]=Fi(256,256),s=ki(77),r=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const c=Math.hypot(a-38.4,o+153.6)/256,l=Math.abs(Math.sin((c*26+s(a/30,o/30)*.6)*Math.PI)),h=.93+.05*Math.pow(l,6)+s(a/6,o/40)*.05,u=(o*256+a)*4;r.data[u]=214*h,r.data[u+1]=172*h,r.data[u+2]=132*h,r.data[u+3]=255}return n.putImageData(r,0,0),Ts(e,i)}const Yn={"anchor-dark":0,"anchor-light":6,"helm-dark":8,"helm-light":2,"chest-dark":20,"chest-light":14,captain:15},e0="./textures/chips.jpg",nr=8,ml=4;function Oh(i,t){const e=new Xv().load(e0,t);return e.colorSpace=we,e.anisotropy=Math.min(8,i.capabilities.getMaxAnisotropy()),e}function Fh(i,t){const e=i.clone();return e.repeat.set(1/nr,1/ml),e.offset.set(t%nr/nr,1-(Math.floor(t/nr)+1)/ml),e}function n0(i){const[t,e]=Fi(64,16);e.clearRect(0,0,64,16),e.fillStyle="#ffffff",e.beginPath(),e.roundRect(4,2,34,12,6),e.fill();const n=Ts(t,i);return n.wrapS=fr,n}const on=.0035;function i0(){const i=new ws(1,1);return i.rotateX(-Math.PI/2),i}function ir(i,t,e,n,s=on){const r=e.x-t.x,o=e.y-t.y,a=Math.hypot(r,o);return Me({x:(t.x+e.x)/2,y:(t.y+e.y)/2},s,i.position),i.rotation.set(0,Math.atan2(o,r),0),i.scale.set(Math.max(a,1e-4),1,n),a}class s0{constructor(t,e){k(this,"group",new An);k(this,"rope");k(this,"ropeMat");k(this,"shooterRing");k(this,"ringMat");k(this,"arrowBody");k(this,"arrowHead");k(this,"arrowMat");k(this,"guide");k(this,"guideMat");k(this,"ghost");k(this,"push");k(this,"pocketMarkers",[]);k(this,"markerMats",[]);k(this,"beacons",[]);k(this,"beaconMats",[]);k(this,"disposables",[]);k(this,"time",0);k(this,"callable",[]);k(this,"called",null);this.g=e;const n=i0();this.disposables.push(n);const s=(f,d=1)=>{const g=new gr({color:f,transparent:!0,opacity:d,depthWrite:!1});return this.disposables.push(g),g};this.ropeMat=s("#fff2b0",.35),this.rope=new Jt(n,this.ropeMat),this.rope.renderOrder=1;const r=new os(1,1.25,48);r.rotateX(-Math.PI/2),this.disposables.push(r),this.ringMat=s("#ffffff",.85),this.shooterRing=new Jt(r,this.ringMat),this.shooterRing.renderOrder=2,this.arrowMat=s("#7be07b",.9),this.arrowBody=new Jt(n,this.arrowMat);const o=new $n([new nt(0,-.5),new nt(1,0),new nt(0,.5)]),a=new Rr(o);a.rotateX(-Math.PI/2),this.disposables.push(a),this.arrowHead=new Jt(a,this.arrowMat),this.arrowBody.renderOrder=this.arrowHead.renderOrder=3;const c=n0(t);this.disposables.push(c),this.guideMat=new gr({map:c,transparent:!0,opacity:.8,depthWrite:!1}),this.disposables.push(this.guideMat),this.guide=new Jt(n,this.guideMat),this.guide.renderOrder=2;const l=new os(.9,1,40);l.rotateX(-Math.PI/2),this.disposables.push(l),this.ghost=new Jt(l,s("#ffffff",.7)),this.push=new Jt(n,s("#ffd166",.85));const h=new os(1,1.22,48);h.rotateX(-Math.PI/2);const u=new Fa(.035,.08,20);u.rotateX(Math.PI),this.disposables.push(h,u);for(let f=0;f<e.pockets.length;f++){const d=s("#ffd166",.9),g=new Jt(h,d);Me(e.pockets[f],on*2,g.position),g.renderOrder=4,g.visible=!1,this.pocketMarkers.push(g),this.markerMats.push(d),this.group.add(g);const _=new ye({color:"#ffffff",emissive:"#ffd166",emissiveIntensity:.6,roughness:.4});this.disposables.push(_);const m=new Jt(u,_);Me(e.pockets[f],.12,m.position),m.visible=!1,m.castShadow=!0,this.beacons.push(m),this.beaconMats.push(_),this.group.add(m)}this.group.add(this.rope,this.shooterRing,this.arrowBody,this.arrowHead,this.guide,this.ghost,this.push),this.hideAll()}hideAll(){this.rope.visible=!1,this.shooterRing.visible=!1,this.clearAim(),this.setCallable([],null)}showRope(t,e){ir(this.rope,t.start,t.end,.025,on*.5),this.ropeMat.color.set(e),this.rope.visible=!0}showShooter(t,e,n){Me(t,on,this.shooterRing.position),this.shooterRing.scale.setScalar(e*1.15),this.ringMat.color.set(n?"#ffffff":"#ff4d4d"),this.shooterRing.visible=!0}clearAim(){this.arrowBody.visible=this.arrowHead.visible=this.guide.visible=this.ghost.visible=this.push.visible=!1}showAim(t,e,n,s,r){const o=new Wt().setHSL(.33-.33*n,.85,.55);this.arrowMat.color.copy(o);const a={x:t.x+e.x*s*1.4,y:t.y+e.y*s*1.4},c=.05+n*.32,l={x:a.x+e.x*c,y:a.y+e.y*c};if(ir(this.arrowBody,a,l,.022,on*3),Me(l,on*3,this.arrowHead.position),this.arrowHead.rotation.set(0,Math.atan2(e.y,e.x),0),this.arrowHead.scale.set(.06,1,.07),this.arrowBody.visible=this.arrowHead.visible=!0,r&&r.distance>s*.5){const h=ir(this.guide,t,r.point,.012,on*2);if(this.guideMat.map.repeat.set(h/.05,1),this.guide.visible=!0,Me(r.point,on*2,this.ghost.position),this.ghost.scale.setScalar(s),this.ghost.visible=!0,r.hit?.type==="piece"){const u=r.hit.push,f={x:r.point.x+u.x*s*2.2,y:r.point.y+u.y*s*2.2};ir(this.push,f,{x:f.x+u.x*.18,y:f.y+u.y*.18},.01,on*2),this.push.visible=!0}else this.push.visible=!1}else this.guide.visible=this.ghost.visible=this.push.visible=!1}setCallable(t,e){this.callable=t,this.called=e,this.pocketMarkers.forEach((n,s)=>n.visible=t.includes(s)),this.beacons.forEach((n,s)=>n.visible=t.includes(s))}update(t){this.time+=t;const e=.5+.5*Math.sin(this.time*4);this.ropeMat.opacity=.22+.2*e;const n=this.g.spec.pocketRadius;for(const s of this.callable){const r=this.pocketMarkers[s],o=s===this.called;r.scale.setScalar(n*(o?1.75:1.6+.15*e)),this.markerMats[s].color.set(o?"#ffd166":"#ffffff"),this.markerMats[s].opacity=o?1:.5+.4*e;const a=this.beacons[s];a.position.y=(o?.1:.12)+Math.sin(this.time*5+s)*.015,a.scale.setScalar(o?1.35:1),this.beaconMats[s].color.set(o?"#ffd166":"#ffffff"),this.beaconMats[s].emissiveIntensity=o?.9:.3+.3*e}}dispose(){this.disposables.forEach(t=>t.dispose())}}const gl=.03,_l=.17,vl=.05,_i=-.07,da=.03,xl=.065,r0=.3,ho=i=>new nt(i.x,i.y);function kh(i,t,e,n,s,r=20){let o=n-e;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;const a=[];for(let c=0;c<=r;c++){const l=e+o*c/r;a.push({x:i.x+Math.cos(l)*t,y:i.y+Math.sin(l)*t})}return a}function o0(i){const t=i.spec.pocketRadius,e=[];for(let n=0;n<6;n++){const s=i.corners[n],r=i.corners[(n+1)%6],o=Math.hypot(r.x-s.x,r.y-s.y),a={x:(r.x-s.x)/o,y:(r.y-s.y)/o},c=i.corners[(n+2)%6],l={x:(c.x-r.x)/o,y:(c.y-r.y)/o},h=i.pockets[(n+1)%6],u=yl(s,a,h,t,-1),f=yl(r,l,h,t,1);e.push(...kh(h,t,Math.atan2(u.y-h.y,u.x-h.x),Math.atan2(f.y-h.y,f.x-h.x)))}return e}function yl(i,t,e,n,s){const r=e.x-i.x,o=e.y-i.y,a=r*t.x+o*t.y,c=r*r+o*o-a*a,l=a+s*Math.sqrt(Math.max(0,n*n-c));return{x:i.x+t.x*l,y:i.y+t.y*l}}function a0(i,t,e){const n=t/(Math.sqrt(3)/2),s=[];for(let r=0;r<6;r++){const o=i.corners[r],a=Math.hypot(o.x,o.y),c={x:o.x/a,y:o.y/a},l={x:c.x*(n-e/(Math.sqrt(3)/2)),y:c.y*(n-e/(Math.sqrt(3)/2))},h=Math.atan2(c.y,c.x);s.push(...kh(l,e,h+Math.PI/6,h-Math.PI/6,!1,20))}return s}function c0(i,t){const e=t.geometry,n=new An,s=[],r=$=>(s.push($),$),o=$=>($.rotateX(-Math.PI/2),$),a=new $n(o0(e).map(ho)),c=r(o(new rs(a,{depth:gl,bevelEnabled:!1,curveSegments:24})));c.translate(0,-gl,0);const l=r(Jv(i,{geometry:e,pocketRoles:t.pocketRoles}));l.repeat.set(.5/e.spec.radius,.5/e.spec.radius),l.offset.set(.5,.5);const h=new Jt(c,[r(new ye({map:l,roughness:.62})),r(new ye({color:"#2a1a0e",roughness:.95}))]);h.receiveShadow=!0,n.add(h);const u=e.apothem+_l,f=a0(e,u,r0),d=new $n(f.map(ho)),g=.006,_=(e.spec.radius+g/(Math.sqrt(3)/2))/e.spec.radius;d.holes.push(new ca(e.corners.map($=>new nt($.x*_,$.y*_)).reverse()));const m=vl-_i,p=r(o(new rs(d,{depth:m,bevelEnabled:!0,bevelThickness:.008,bevelSize:g,bevelSegments:3,curveSegments:24})));p.translate(0,_i,0);const b=Math.max(...f.map($=>Math.hypot($.x,$.y))),S=r(Kv(i,e,b));S.repeat.set(.5/b,.5/b),S.offset.set(.5,.5);const v=new Jt(p,r(new ye({map:S,roughness:.38,metalness:.02})));v.castShadow=!0,v.receiveShadow=!0,n.add(v);const L=r(o(new Rr(new $n(f.map(ho))))),R=new Jt(L,r(new ye({color:"#2b1a10",roughness:.9})));R.position.y=_i+.001,n.add(R);const A=-_i-.008,P=e.spec.pocketRadius,E=r(new Ai(P,P,A,48,1,!0)),y=r(new ye({color:"#1e120a",roughness:.95,side:Te})),C=r(o(new Ti(P,48))),H=r(new ye({color:"#3b2615",roughness:.9})),F=r(new ye({color:"#1d3b52",roughness:.3,emissive:"#06121c"}));e.pockets.forEach(($,T)=>{const lt=new Jt(E,y);Me($,-A/2-.003,lt.position),n.add(lt);const J=new Jt(C,t.pocketRoles[T]==="shark"?F:H);Me($,-A+.002,J.position),J.receiveShadow=!0,n.add(J)});const V=new $n([new nt(-.035,0),new nt(.03,0),new nt(-.02,.05)]),q=r(new rs(V,{depth:.008,bevelEnabled:!1}));q.translate(0,0,-.004);const G=r(new ye({color:"#56626c",roughness:.5})),K=[];e.pockets.forEach(($,T)=>{if(t.pocketRoles[T]!=="shark")return;const lt=new Jt(q,G);n.add(lt),K.push({mesh:lt,centre:$,phase:T})});const W=r(new Ai(e.spec.postRadius,e.spec.postRadius,xl,20)),ct=r(new ye({color:"#d8bf8c",roughness:.55}));for(const $ of e.posts){const T=new Jt(W,ct);Me($,xl/2,T.position),T.castShadow=!0,n.add(T)}const pt=r(new Ai(.052,.052,.004,40)),yt=r(o(new Ti(.044,40))),Nt=r(Oh(i,()=>{})),qt=new Map,Y=$=>{let T=qt.get($);return T||(T=r(new ye({map:r(Fh(Nt,$)),roughness:.6})),qt.set($,T)),T},it=[];e.rails.forEach(($,T)=>{const lt=t.seatColors[T];if(!lt)return void it.push(null);const J=new Jt(pt,r(new ye({color:lt,roughness:.4,metalness:.2}))),ft=e.apothem+_l*.5;Me({x:-$.normal.x*ft,y:-$.normal.y*ft},vl+.009,J.position),n.add(J);const rt=new Jt(yt,Y(0));rt.position.copy(J.position),rt.position.y+=.0025,rt.rotation.y=Math.atan2(-$.normal.x,$.normal.y),rt.visible=!1,n.add(rt),it.push(rt)});const Et=$=>{it.forEach((T,lt)=>{if(!T)return;const J=$[lt];T.visible=J!=null,T.visible&&(T.material=Y(J))})},at=r(Qv(i));at.repeat.set(6,6);const Rt=new Jt(r(o(new Ti(9,64))),r(new ye({map:at,roughness:.7})));Rt.position.y=_i,Rt.receiveShadow=!0,n.add(Rt);const Dt=u+.13,Lt=($,T,lt=new D)=>{const J=e.rails[$.side].normal,ft={x:-J.y,y:J.x},rt=Math.floor(T/5),Pt=T%5,_t=$.offset*(.3+rt*.095);return Me({x:-J.x*Dt+ft.x*_t,y:-J.y*Dt+ft.y*_t},_i+Pt*da,lt)},Gt=($,T=new D)=>Me(e.pockets[$],-A+.004,T),Q=$=>{for(const T of K){const lt=$*1.6+T.phase,J=P*.55;Me({x:T.centre.x+Math.cos(lt)*J,y:T.centre.y+Math.sin(lt)*J},-A+.004,T.mesh.position),T.mesh.rotation.y=Math.atan2(Math.cos(lt),-Math.sin(lt))}};return{group:n,pileSlot:Lt,pocketDepth:Gt,extent:Dt+.05,setSeatSymbols:Et,update:Q,dispose:()=>s.forEach($=>$.dispose())}}function l0(i){const t={},e=[0,1,2,3,4,5].filter(r=>!i.seats.includes(r));let n=0,s=0;return Gl(i).forEach((r,o)=>{if(i.config.mode==="coop"){t[r]={side:(o*2+1)%6,offset:o<3?1:-1};return}const a=xa(i,r);a>=0?t[r]={side:i.seats[i.config.players.findIndex(c=>c.team===a)],offset:1}:n<e.length?t[r]={side:e[n++],offset:1}:t[r]={side:i.seats[s++%i.seats.length],offset:-1}}),t}class h0{constructor(t,e,n){k(this,"group",new An);k(this,"views",new Map);k(this,"disposables",[]);k(this,"shooter");this.board=e;const s=De(n,"sailor"),r=da,o=.004,a=new Oa([new nt(0,0),new nt(s-o,0),new nt(s,o),new nt(s,r-o),new nt(s-o,r),new nt(0,r)],40),c=new Ti(s-o*.5,40);c.rotateX(-Math.PI/2),c.translate(0,r+3e-4,0),this.disposables.push(a,c);const l=Oh(t,()=>{});this.disposables.push(l);const h=new ye({color:"#c99a74",roughness:.55}),u=new ye({color:"#b98262",roughness:.5});this.disposables.push(h,u);const f=(d,g)=>{const _=new ye({map:d,roughness:.6});this.disposables.push(d,_);const m=new An,p=new Jt(a,g),b=new Jt(c,_);return p.castShadow=b.castShadow=!0,p.receiveShadow=!0,m.add(p,b),m};for(const d of n.pieces){const g=f(Fh(l,d.face),h);g.name=d.id,this.group.add(g),this.views.set(d.id,{obj:g,tweens:[]})}this.shooter=f(t0(t),u),this.shooter.name="shooter",this.group.add(this.shooter),this.views.set("shooter",{obj:this.shooter,tweens:[]}),this.syncToState(n,!1)}setLive(t,e){const n=this.views.get(t);!n||n.tweens.length||(Me(e,0,n.obj.position),n.obj.visible=!0)}drop(t,e,n){const s=this.views.get(t);s&&(s.tweens=[{from:s.obj.position.clone(),to:this.board.pocketDepth(e),t:0,dur:.2,arc:0,hideAtEnd:n}])}syncToState(t,e){const n=l0(t),s=new Map,r=new Map,o=t.pieces.filter(l=>l.loc.at==="pocket").sort((l,h)=>l.loc.at==="pocket"&&h.loc.at==="pocket"?l.loc.order-h.loc.order:0);for(const l of t.pieces)l.loc.at==="board"&&s.set(l.id,{pos:Me(l.loc),visible:!0});for(const l of o)if(l.loc.at==="pocket"){if(t.pocketRoles[l.loc.pocket]==="shark")s.set(l.id,{pos:this.board.pocketDepth(l.loc.pocket),visible:!1});else if(l.type){const h=r.get(l.type)??0;r.set(l.type,h+1),s.set(l.id,{pos:this.board.pileSlot(n[l.type],h),visible:!0})}}const a=t.pieces.find(l=>l.id===Pi);if(a.loc.at==="pocket"&&t.pocketRoles[a.loc.pocket]==="lifeboat"){const l=Gl(t),h=(t.config.mode==="versus"&&t.winner!==null?t.claims[t.winner]:null)??l.reduce((f,d)=>(r.get(d)??0)>(r.get(f)??0)?d:f),u=this.board.pileSlot(n[h],Math.max(0,(r.get(h)??0)-1));u.y+=da,s.set(Pi,{pos:u,visible:!0})}let c=0;for(const[l,h]of s){const u=this.views.get(l),f=u.tweens[u.tweens.length-1],d=f?f.to.clone():u.obj.position.clone(),g=d.distanceTo(h.pos)>1e-4;if(!e){u.tweens=[],u.obj.position.copy(h.pos),u.obj.visible=h.visible;continue}if(!g){!h.visible&&!f&&(u.obj.visible=!1);continue}const _=.55+Math.min(.4,d.distanceTo(h.pos)*.25);u.tweens.push({from:d.clone(),to:d.clone(),t:0,dur:c,arc:0,hideAtEnd:!1},{from:d,to:h.pos,t:0,dur:_,arc:.25,hideAtEnd:!h.visible}),c+=.06}}placeShooter(t){const e=this.views.get("shooter");if(e.tweens=[],!t){this.shooter.visible=!1;return}this.shooter.visible=!0,Me(t,0,this.shooter.position)}get busy(){for(const t of this.views.values())if(t.tweens.length)return!0;return!1}update(t){for(const e of this.views.values()){const n=e.tweens[0];if(!n)continue;n.t+=t;const s=n.dur<=0?1:Math.min(1,n.t/n.dur),r=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;e.obj.position.lerpVectors(n.from,n.to,r),e.obj.position.y+=Math.sin(Math.PI*r)*n.arc,n.dur>0&&(e.obj.visible=!0),s>=1&&(e.tweens.shift(),n.hideAtEnd&&(e.obj.visible=!1))}}dispose(){this.disposables.forEach(t=>t.dispose())}}const uo=["table","top","first"],Ml={table:"3D",top:"Top",first:"Seat"},sr=.92,Sl=1.55,u0=.12,d0=1.56,rr=.56,f0=.05,p0=1.3,El=1.3,bl=1.2,m0=.36,fo={orbit:45,first:60},wl=.3,Tl=1.5,Al=.006,Rl=.0035;class g0{constructor(t){k(this,"renderer");k(this,"scene",new av);k(this,"camera",new Oe(45,1,.05,60));k(this,"yaw",Math.PI/2);k(this,"targetYaw",Math.PI/2);k(this,"orbitYaw",0);k(this,"targetOrbitYaw",0);k(this,"pitch",sr);k(this,"targetPitch",sr);k(this,"lookYaw",0);k(this,"targetLookYaw",0);k(this,"lookDown",rr);k(this,"targetLookDown",rr);k(this,"seat",0);k(this,"viewMode","table");k(this,"insets",{top:0,bottom:0});k(this,"raycaster",new Zv);k(this,"plane",new bn(new D(0,1,0),0));k(this,"width",1);k(this,"height",1);k(this,"zoom",1);k(this,"targetZoom",1);k(this,"orbitPos",new D);k(this,"seatPos",new D);k(this,"orbitTarget",new D(0,-.02,0));k(this,"seatTarget",new D);k(this,"lookAt",new D);k(this,"extent",1.35);this.canvas=t,this.renderer=new ov({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=we,this.renderer.toneMapping=Jl,this.renderer.toneMappingExposure=1.1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Zl,this.scene.background=new Wt("#140c07"),this.scene.fog=new Ia("#140c07",4,11);const e=new qv("#fff3e0","#3a2414",1.15);this.scene.add(e);const n=new dl("#fff1d6",2.6);n.position.set(1.6,4,1.2),n.castShadow=!0,n.shadow.mapSize.set(2048,2048);const s=n.shadow.camera;s.left=-1.6,s.right=1.6,s.top=1.6,s.bottom=-1.6,s.near=1,s.far=8,n.shadow.bias=-4e-4,n.shadow.normalBias=.01,this.scene.add(n);const r=new dl("#9cc9ff",.35);r.position.set(-2,2,-1.5),this.scene.add(r)}zoomBy(t){this.targetZoom=Math.min(Tl,Math.max(wl,this.targetZoom*t))}get magnification(){return 1/this.targetZoom}get canZoomIn(){return this.targetZoom>wl+1e-6}get canZoomOut(){return this.targetZoom<Tl-1e-6}resetZoom(){this.targetZoom=1}orbitBy(t,e){this.viewMode==="first"?(this.targetLookYaw=ii.clamp(this.targetLookYaw-t*Rl,-El,El),this.targetLookDown=ii.clamp(this.targetLookDown-e*Rl,f0,p0)):(this.targetOrbitYaw+=t*Al,this.targetPitch=ii.clamp(this.targetPitch+e*Al,u0,d0))}resetView(){this.targetOrbitYaw=0,this.targetPitch=this.viewMode==="top"?Sl:sr,this.targetLookYaw=0,this.targetLookDown=rr,this.targetZoom=1}get adjusted(){const t=this.viewMode==="top"?Sl:sr;return this.viewMode==="first"?Math.abs(this.targetLookYaw)>.02||Math.abs(this.targetLookDown-rr)>.02||Math.abs(this.targetZoom-1)>.02:Math.abs(this.targetOrbitYaw)>.02||Math.abs(this.targetPitch-t)>.02||Math.abs(this.targetZoom-1)>.02}faceSeat(t,e=!1){let n=Math.atan2(-t.y,t.x);for(;n-this.yaw>Math.PI;)n-=Math.PI*2;for(;n-this.yaw<-Math.PI;)n+=Math.PI*2;this.targetYaw=n,e&&(this.yaw=n)}setViewMode(t,e=!1){this.viewMode=t,this.resetView(),e&&(this.pitch=this.targetPitch,this.orbitYaw=this.targetOrbitYaw,this.lookYaw=this.targetLookYaw,this.lookDown=this.targetLookDown,this.zoom=this.targetZoom,this.seat=t==="first"?1:0)}get mode(){return this.viewMode}setInsets(t){this.insets=t,this.resize()}resize(){const t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.width=t,this.height=e,this.renderer.setSize(t,e,!1),this.camera.aspect=t/e;const n=(this.insets.top-this.insets.bottom)/2;this.camera.setViewOffset(t,e,0,-n,t,e),this.camera.updateProjectionMatrix()}distance(){const t=Math.max(120,this.height-this.insets.top-this.insets.bottom),e=ii.degToRad(this.camera.fov),n=Math.tan(e/2),s=n*(this.width/this.height),r=this.extent,o=r/s,c=r*(Math.sin(this.pitch)+.25*Math.cos(this.pitch))/n*(this.height/t);return Math.max(o,c)}update(t){const e=1-Math.exp(-t*5),n=1-Math.exp(-t*12);this.yaw+=(this.targetYaw-this.yaw)*e,this.orbitYaw+=(this.targetOrbitYaw-this.orbitYaw)*n,this.pitch+=(this.targetPitch-this.pitch)*n,this.lookYaw+=(this.targetLookYaw-this.lookYaw)*n,this.lookDown+=(this.targetLookDown-this.lookDown)*n,this.zoom+=(this.targetZoom-this.zoom)*n,this.seat+=((this.viewMode==="first"?1:0)-this.seat)*e;const s=this.yaw+this.orbitYaw,r=this.distance()*this.zoom,o=Math.cos(this.pitch);this.orbitPos.set(Math.cos(s)*o*r,Math.sin(this.pitch)*r,Math.sin(s)*o*r);const a=Math.cos(this.yaw)*bl,c=Math.sin(this.yaw)*bl,l=this.yaw+Math.PI+this.lookYaw,h=Math.cos(this.lookDown),u=Math.cos(l)*h,f=-Math.sin(this.lookDown),d=Math.sin(l)*h;this.seatPos.set(a,m0,c),this.seatTarget.set(this.seatPos.x+u,this.seatPos.y+f,this.seatPos.z+d);const g=this.seat*this.seat*(3-2*this.seat);this.camera.position.lerpVectors(this.orbitPos,this.seatPos,g),this.lookAt.lerpVectors(this.orbitTarget,this.seatTarget,g);const _=ii.clamp(fo.first*this.zoom,12,85),m=fo.orbit+(_-fo.orbit)*g;Math.abs(this.camera.fov-m)>.001&&(this.camera.fov=m,this.camera.updateProjectionMatrix()),this.camera.lookAt(this.lookAt)}render(){this.renderer.render(this.scene,this.camera)}pick(t,e){const n=this.canvas.getBoundingClientRect(),s=new nt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);this.raycaster.setFromCamera(s,this.camera);const r=new D;return this.raycaster.ray.intersectPlane(this.plane,r)?jv(r):null}worldPerPixel(){const t=Math.max(.6,this.camera.position.distanceTo(this.lookAt)),e=ii.degToRad(this.camera.fov);return 2*t*Math.tan(e/2)/this.height}dispose(){this.renderer.dispose()}}function Qt(i,t={},...e){const n=document.createElement(i);for(const[s,r]of Object.entries(t))r!==void 0&&(s==="class"?n.className=r:n.setAttribute(s,r));for(const s of e)s==null||s===!1||n.append(typeof s=="string"?document.createTextNode(s):s);return n}function le(i){return i.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Ri(i,t=22,e=""){const n=i%8/7*100,s=Math.floor(i/8)/3*100;return`<span class="face" role="img" aria-label="${le(e)}" style="width:${t}px;height:${t}px;background-image:url(./textures/chips.jpg);background-position:${n}% ${s}%"></span>`}class _0{constructor(t,e){k(this,"root");k(this,"scores");k(this,"who");k(this,"hint");k(this,"toastEl");k(this,"power");k(this,"powerFill");k(this,"slider");k(this,"viewBtn");k(this,"lookBtn");k(this,"resetBtn");k(this,"adjusted",!1);k(this,"zoomPanel");k(this,"zoomLabel");k(this,"zoomIn");k(this,"zoomOut");k(this,"zoomText","");k(this,"top");k(this,"bottom");k(this,"toastTimer",0);this.scores=Qt("div",{class:"scores"}),this.who=Qt("div",{class:"who"}),this.hint=Qt("div",{class:"hint"}),this.top=Qt("div",{class:"hud-top"},this.scores,Qt("div",{class:"turn"},this.who,this.hint)),this.toastEl=Qt("div",{class:"toast",role:"status","aria-live":"polite"}),this.powerFill=Qt("div",{class:"fill"}),this.power=Qt("div",{class:"power","aria-hidden":"true"},this.powerFill),this.slider=Qt("input",{type:"range",min:"0",max:"1000",value:"500","aria-label":"Slide the shooter along your rope line"}),this.slider.addEventListener("input",()=>e.onSlide(1-Number(this.slider.value)/1e3)),this.viewBtn=Qt("button",{class:"icon-btn","aria-label":"Change camera view",title:"Camera view (V)"},"3D"),this.viewBtn.addEventListener("click",e.onToggleView),this.lookBtn=Qt("button",{class:"icon-btn","aria-pressed":"false",title:"Look around (L)"},"Look"),this.lookBtn.addEventListener("click",e.onToggleLook),this.resetBtn=Qt("button",{class:"icon-btn reset-view","aria-label":"Reset camera view",title:"Reset view (R)",hidden:""},"⟲"),this.resetBtn.addEventListener("click",e.onResetView);const n=Qt("button",{class:"icon-btn","aria-label":"Menu"},"☰");n.addEventListener("click",e.onMenu),this.bottom=Qt("div",{class:"hud-bottom"},this.power,Qt("div",{class:"controls"},this.viewBtn,this.lookBtn,this.resetBtn,Qt("label",{class:"slider"},Qt("span",{},"Slide"),this.slider),n)),this.zoomIn=Qt("button",{class:"icon-btn zoom-btn","aria-label":"Zoom in",title:"Zoom in (+)"},"+"),this.zoomOut=Qt("button",{class:"icon-btn zoom-btn","aria-label":"Zoom out",title:"Zoom out (−)"},"−"),this.zoomLabel=Qt("span",{class:"zoom-level","aria-live":"polite"},"1×");for(const[s,r]of[[this.zoomIn,1],[this.zoomOut,-1]])v0(s,()=>e.onZoom(r));this.zoomPanel=Qt("div",{class:"zoom-panel",role:"group","aria-label":"Zoom",hidden:""},this.zoomIn,this.zoomLabel,this.zoomOut),this.root=Qt("div",{class:"hud"},this.top,this.toastEl,this.zoomPanel,this.bottom),t.append(this.root)}setViewLabel(t){this.viewBtn.textContent=Ml[t],this.viewBtn.setAttribute("aria-label",`Camera view: ${Ml[t]}. Tap to change.`)}setLooking(t){this.lookBtn.classList.toggle("on",t),this.lookBtn.setAttribute("aria-pressed",String(t)),this.zoomPanel.hidden=!t}setZoom(t,e,n){const s=`${t>=2?t.toFixed(1):t.toFixed(2).replace(/0$/,"")}×`;s!==this.zoomText&&(this.zoomText=s,this.zoomLabel.textContent=s),this.zoomIn.disabled===e&&(this.zoomIn.disabled=!e),this.zoomOut.disabled===n&&(this.zoomOut.disabled=!n)}setViewAdjusted(t){t!==this.adjusted&&(this.adjusted=t,this.resetBtn.hidden=!t)}update(t,e){const n=t.config,s=[];if(n.mode==="versus")n.teams.forEach((a,c)=>{const l=t.claims[c],h=xo(t,c),u=Wl(t,c),f=Sr(t)===c&&t.status==="playing",d=l?Ri(Yn[l],20,Wn[l]):'<span class="face unknown" aria-label="No Sailors claimed yet">?</span>',g=va(t),_=t.out[c]?"Out":t.standby===c?"Standby":u?"Captain!":`${h}/${g}`,m=n.players.filter(b=>b.team===c).map(b=>le(b.name)).join(" & "),p=l?`${m} · ${Wn[l]}`:m;s.push(`<div class="chip${f?" active":""}${t.out[c]||t.standby===c?" benched":""}" style="--team:${le(a.color)}">${d}<span class="name">${le(a.name)}</span><span class="count">${_}</span><span class="crew">${p}</span><span class="bar"><i style="width:${100*h/g}%"></i></span></div>`)});else{const a=xo(t,0),c=Lu(t),l=Du(t)-a-c,h=t.pieces.find(u=>u.id===Pi)?.loc.at==="pocket";s.push(`<div class="chip coop"><span class="name">Rescued</span><span class="count">${a}</span></div>`,`<div class="chip coop shark"><span class="name">Sharks</span><span class="count">${c}</span></div>`,`<div class="chip coop with-icon">${Ri(Yn.captain,20,"Captain")}<span class="name">${h?"Saved":"Adrift"}</span><span class="count">${h?"✓":l}</span></div>`)}this.scores.innerHTML=s.join(""),this.scores.classList.toggle("many",n.teams.length>3);const r=n.players[t.current],o=n.teams[r.team];if(t.status==="playing"){const a=t.shotInTurn>0?" · again!":"",c=cn(t)?" · beckon the Captain!":"",l=n.mode==="versus"?t.claims[r.team]:null,h=l?`<span class="who-face">${Ri(Yn[l],26,Wn[l])}</span>`:`<span class="swatch" style="background:${le(o.color)}"></span>`,u=l?`<span class="who-crew"> · ${Wn[l]}</span>`:"";this.who.innerHTML=`${h}${le(r.name)}${u}${a}${c}`}else this.who.textContent=t.status==="won"?"The Captain is saved!":"The sharks got the Captain";this.hint.textContent=e}setSlider(t,e){this.slider.value=String(Math.round((1-t)*1e3)),this.slider.disabled=!e}setPower(t){this.power.classList.toggle("show",t!==null),t!==null&&(this.powerFill.style.width=`${Math.round(t*100)}%`,this.powerFill.style.background=`hsl(${120-120*t} 80% 50%)`)}toast(t,e="info",n=1800){this.toastEl.textContent=t,this.toastEl.className=`toast show ${e}`,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastEl.className="toast",n)}insets(){return{top:this.top.getBoundingClientRect().bottom,bottom:window.innerHeight-this.bottom.getBoundingClientRect().top}}dispose(){window.clearTimeout(this.toastTimer),this.root.remove()}}function po(i,t,e,n){return new Promise(s=>{const r=Qt("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":t});r.innerHTML=`<h2>${le(t)}</h2><div class="sheet-body">${e}</div>`;const o=Qt("div",{class:"sheet-buttons"});for(const c of n){const l=Qt("button",{class:c.primary?"btn primary":"btn","aria-label":c.label},c.html?"":c.label);c.html&&(l.innerHTML=c.html),l.addEventListener("click",()=>{a.remove(),s(c.id)}),o.append(l)}r.append(o);const a=Qt("div",{class:"overlay"},r);i.append(a),o.querySelector(".primary")?.focus()})}function v0(i,t){let e=0;const n=()=>{window.clearTimeout(e),window.clearInterval(e),e=0};i.addEventListener("pointerdown",s=>{s.preventDefault(),!i.disabled&&(t(),n(),e=window.setTimeout(()=>e=window.setInterval(t,60),300))});for(const s of["pointerup","pointerleave","pointercancel"])i.addEventListener(s,n);i.addEventListener("click",s=>{s.detail===0&&t()})}class x0{constructor(){k(this,"ctx",null);k(this,"noise",null);k(this,"lastClick",0);k(this,"enabled",!0)}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(t)try{this.ctx=new t;const e=Math.floor(this.ctx.sampleRate*.05);this.noise=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noise.getChannelData(0);for(let s=0;s<e;s++)n[s]=(Math.random()*2-1)*Math.pow(1-s/e,3)}catch{this.ctx=null}}clack(t,e=!1){const n=this.ctx;if(!n||!this.noise||!this.enabled)return;const s=n.currentTime;if(s-this.lastClick<.025)return;this.lastClick=s;const r=Math.min(1,t*(e?.25:.6));if(r<.02)return;const o=n.createBufferSource();o.buffer=this.noise;const a=n.createBiquadFilter();a.type="bandpass",a.frequency.value=e?700:2600+Math.random()*600,a.Q.value=e?1.2:3;const c=n.createGain();c.gain.value=r,o.connect(a).connect(c).connect(n.destination),o.start(s)}plop(t){const e=this.ctx;if(!e||!this.enabled)return;const n=e.currentTime,s=e.createOscillator(),r=e.createGain();s.type="sine",s.frequency.setValueAtTime(t?520:300,n),s.frequency.exponentialRampToValueAtTime(t?180:70,n+.18),r.gain.setValueAtTime(.35,n),r.gain.exponentialRampToValueAtTime(.001,n+.25),s.connect(r).connect(e.destination),s.start(n),s.stop(n+.26)}fanfare(){const t=this.ctx;if(!t||!this.enabled)return;const e=t.currentTime;[523,659,784,1046].forEach((n,s)=>{const r=t.createOscillator(),o=t.createGain();r.type="triangle",r.frequency.value=n;const a=e+s*.13;o.gain.setValueAtTime(1e-4,a),o.gain.exponentialRampToValueAtTime(.25,a+.02),o.gain.exponentialRampToValueAtTime(.001,a+.4),r.connect(o).connect(t.destination),r.start(a),r.stop(a+.42)})}}function mo(i){try{navigator.vibrate?.(i)}catch{}}function y0(i,t){const e=i.config,n=e.players[t.player].name,s=a=>e.teams[a]?.name??"Crew";if(t.captain?.result==="rescued")return e.mode==="versus"?{text:`The Captain is saved! ${s(t.team)} wins!`,tone:"good"}:{text:"The Captain is saved! Mission complete!",tone:"good"};if(t.captain?.result==="eaten")return{text:"The sharks got the Captain! Mission failed.",tone:"bad"};if(t.foul){const a="The Captain refuses to leave before his Sailors! Back to the Bridge —";return t.status==="won"&&t.winner!==null?{text:`${a} ${s(t.foul.team)} is out. ${s(t.winner)} wins!`,tone:"bad"}:{text:`${a} ${s(t.foul.team)} is ${t.foul.kind==="out"?"out of the game":"on standby"}.`,tone:"bad"}}const r=[];if(t.captain?.result==="returned"&&r.push("Wrong lifeboat — the Captain is back on the Bridge."),t.shooterSunk&&r.push(t.penalty?"Shooter in a lifeboat! One of your Sailors goes back to the Bridge.":"Shooter in a lifeboat!"),e.mode==="versus"){t.claimed&&r.unshift(`${s(t.team)} is rescuing the ${Wn[t.claimed]}!`),t.ownRescued>0&&r.unshift(`${t.ownRescued} rescued!`);const a=t.rescued.filter(c=>c.team!==t.team);for(const c of new Set(a.map(l=>l.team))){const l=a.filter(h=>h.team===c).length;r.push(c>=0?`${l} rescued for ${s(c)}.`:`${l} spare Sailor${l>1?"s":""} rescued.`)}}else t.rescued.length&&r.unshift(`${t.rescued.length} rescued!`),t.lost.length&&r.push(`${t.lost.length} lost to the sharks!`);if(t.turnContinues&&r.push(`${n}, go again!`),t.timedOut&&r.push("(Shot stopped after the time limit.)"),r.length===0)return{text:`No rescue. ${e.players[t.nextPlayer].name}'s turn.`,tone:"info"};const o=t.shooterSunk||t.lost.length>0||t.captain?.result==="returned";return{text:r.join(" "),tone:o?"bad":t.turnContinues?"good":"info"}}class M0{constructor(){k(this,"online",!1);k(this,"isHost",!0);k(this,"h",null)}canAct(){return!0}submit(t){queueMicrotask(()=>this.h?.action(t))}connect(t){this.h=t}applied(){}idle(){}waiting(){return null}sending(){return!1}dispose(){this.h=null}}const ms="chipwreck.match.v2",Bh="chipwreck.prefs.v1";function zh(i){try{i.status==="playing"?localStorage.setItem(ms,JSON.stringify(i)):localStorage.removeItem(ms)}catch{}}function Cl(){try{const i=localStorage.getItem(ms);return i?yo(JSON.parse(i)):null}catch{try{localStorage.removeItem(ms)}catch{}return null}}function fa(){try{localStorage.removeItem(ms)}catch{}}function S0(){const i={sound:!0,view:"table",names:[]};try{const t=JSON.parse(localStorage.getItem(Bh)??"{}");return{sound:typeof t.sound=="boolean"?t.sound:i.sound,view:t.view==="top"||t.view==="first"?t.view:"table",names:Array.isArray(t.names)?t.names.filter(e=>typeof e=="string").slice(0,6):[]}}catch{return i}}function _r(i){try{localStorage.setItem(Bh,JSON.stringify(i))}catch{}}const Pl=typeof matchMedia=="function"&&matchMedia("(pointer: fine)").matches,E0=.34,Ll=.05,b0=2400;class Hh{constructor(t,e,n,s,r,o=new M0,a=0,c=()=>[]){k(this,"board");k(this,"pieces");k(this,"aim");k(this,"hud");k(this,"phase","aim");k(this,"shooter",{x:0,y:0});k(this,"called",null);k(this,"drag",null);k(this,"sim",null);k(this,"simInput",null);k(this,"seenPocketed",0);k(this,"acc",0);k(this,"speed",1);k(this,"raf",0);k(this,"last",0);k(this,"clock",0);k(this,"disposed",!1);k(this,"settleTimer",0);k(this,"looking",!1);k(this,"pointers",new Map);k(this,"queue",[]);k(this,"correction",null);k(this,"sfx",new x0);k(this,"cleanup",[]);k(this,"frame",t=>{if(this.disposed)return;const e=Math.min(.1,Math.max(0,(t-this.last)/1e3));this.last=t,this.clock+=e,this.phase==="rolling"&&this.sim&&this.stepSimulation(e),this.pieces.update(e),this.phase==="settling"&&this.afterSettle(),this.aim.update(e),this.board.update(this.clock),this.stage.update(e),this.hud.setViewAdjusted(this.stage.adjusted),this.looking&&this.hud.setZoom(this.stage.magnification,this.stage.canZoomIn,this.stage.canZoomOut),this.stage.render(),this.raf=requestAnimationFrame(this.frame)});this.root=t,this.stage=e,this.state=n,this.prefs=s,this.exit=r,this.link=o,this.applied=a,this.menuExtras=c,this.sfx.enabled=s.sound;const l=ln(n),h=Array.from({length:6},(d,g)=>{const _=n.seats.indexOf(g);return _>=0?n.config.teams[n.config.players[_].team].color:null});this.board=c0(e.renderer,{geometry:l,pocketRoles:n.pocketRoles,seatColors:h}),e.extent=this.board.extent,this.pieces=new h0(e.renderer,this.board,n),this.aim=new s0(e.renderer,l),e.scene.add(this.board.group,this.pieces.group,this.aim.group),this.hud=new _0(t,{onSlide:d=>this.slideTo(d),onToggleView:()=>this.toggleView(),onToggleLook:()=>this.toggleLook(),onResetView:()=>this.stage.resetView(),onZoom:d=>this.stage.zoomBy(d>0?1/1.08:1.08),onMenu:()=>void this.openMenu()}),e.setViewMode(s.view,!0),this.hud.setViewLabel(s.view);const u=e.canvas,f=(d,g,_)=>{d.addEventListener(g,_,{passive:!1}),this.cleanup.push(()=>d.removeEventListener(g,_))};f(u,"pointerdown",d=>this.onDown(d)),f(u,"pointermove",d=>this.onMove(d)),f(u,"pointerup",d=>this.onUp(d)),f(u,"pointercancel",d=>{this.pointers.delete(d.pointerId),this.cancelDrag()}),f(u,"pointerleave",()=>u.style.cursor=""),f(u,"wheel",d=>{d.preventDefault(),this.stage.zoomBy(d.deltaY>0?1.08:1/1.08)}),f(window,"keydown",d=>this.onKey(d)),f(u,"contextmenu",d=>d.preventDefault()),f(window,"resize",()=>this.layout()),this.layout(),o.connect({action:d=>{this.queue.push(d),this.pump()},correct:(d,g)=>this.adopt(d,g)}),this.pieces.syncToState(this.state,!1),this.beginTurn(!0),this.last=performance.now(),this.raf=requestAnimationFrame(this.frame),this.exposeDebug()}beginTurn(t=!1){this.correction&&(this.state=this.correction.state,this.applied=this.correction.count,this.correction=null,this.pieces.syncToState(this.state,!0));const e=this.state;if(e.status!=="playing"){this.gameOver();return}if(e.pending){this.askClaim(e.pending.report);return}const n=ya(this.state);if(!n){this.phase="aim",this.aim.hideAll(),this.pieces.placeShooter(null),this.hud.toast(`${this.state.config.players[this.state.current].name}'s rope is blocked — passing the turn.`,"info"),this.link.canAct(this.state.current)&&this.link.submit({t:"p"}),this.refreshHud(),this.link.idle(this.state),this.pump();return}this.phase="aim",this.called=null,this.shooter=n,this.stage.faceSeat(hu(ln(e),Cu(e)),t),e.shotInTurn===0&&this.stage.resetView(),this.pieces.placeShooter(n);const s=e.config.teams[Sr(e)].color;this.aim.showRope(an(e),s),this.aim.setCallable(cn(e)&&this.canAim()?vi(e):[],null),this.refreshShooter(),this.refreshHud(),this.link.idle(this.state),this.pump()}netChanged(){this.disposed||(this.phase==="aim"&&(this.aim.setCallable(cn(this.state)&&this.canAim()?vi(this.state):[],this.called),this.refreshShooter()),this.refreshHud())}canAim(){return this.phase==="aim"&&this.link.canAct(this.state.current)&&!this.link.sending()&&this.state.status==="playing"}pump(){const t=this.queue[0];if(!(!t||this.disposed)){if(t.t==="c"){if(this.phase!=="claiming"||!this.state.pending)return;this.queue.shift(),this.applyClaim(t.k);return}if(!(this.phase!=="aim"||this.state.pending)){if(this.queue.shift(),t.t==="p"){try{this.state=zu(this.state)}catch(e){return console.error(e),this.pump()}this.afterAction(),this.phase="settling",this.refreshHud();return}this.startShot(t.i)}}}afterAction(){this.applied++,this.link.online||zh(this.state),this.link.applied(this.state,this.applied)}adopt(t,e){if(this.sim||this.phase==="rolling"){this.correction={state:t,count:e};return}this.state=t,this.applied=e,this.pieces.syncToState(t,!0),this.refreshHud(),this.phase==="aim"&&this.beginTurn()}hint(){if(this.state.status!=="playing"||this.phase==="over")return"";if(this.phase==="rolling")return"Tap to speed up";if(this.phase==="settling")return"";const t=this.link.waiting(this.state);return t||(this.phase!=="aim"?"":cn(this.state)&&this.called===null?"Beckon the Captain: tap the lifeboat you’re aiming for":this.looking?Pl?"Look around: drag to turn · scroll or + − to zoom · L to aim again":"Look around: drag to turn · pinch or + − to zoom · tap Look to aim":Pl?"Drag along your rope (or ← →) · pull back anywhere to flick · right-drag to turn the view":"Slide along your rope · pull back anywhere to flick · two fingers to turn the view")}refreshHud(){this.hud.update(this.state,this.hint()),this.board.setSeatSymbols(this.seatSymbols()),this.hud.setSlider(this.ropeT(),this.phase==="aim")}seatSymbols(){const t=this.state;return Array.from({length:6},(e,n)=>{const s=t.seats.indexOf(n),r=s>=0&&t.config.mode==="versus"?t.claims[t.config.players[s].team]:null;return r?Yn[r]:null})}refreshShooter(){const t=!as(this.state,this.shooter);this.pieces.placeShooter(this.shooter),this.aim.showShooter(this.shooter,De(this.state,"shooter"),t)}slideTo(t){if(this.phase!=="aim")return;const e=an(this.state);this.shooter={x:e.start.x+(e.end.x-e.start.x)*t,y:e.start.y+(e.end.y-e.start.y)*t},this.refreshShooter()}shoot(t,e){const n=this.state,s=n.config.physics.maxShotSpeed*(.04+.96*e),r={shooter:{...this.shooter},velocity:{x:t.x*s,y:t.y*s}};if(cn(n)){if(this.called===null){this.hud.toast("Announce your lifeboat first — tap one of the glowing pockets.","info",2600);return}r.calledPocket=this.called}const o=cs(n,r);if(o){this.hud.toast(o,"bad");return}this.canAim()&&(this.aim.clearAim(),this.hud.setPower(null),this.link.submit({t:"s",i:r}),this.refreshHud(),mo(12))}startShot(t){const e=this.state,n=cs(e,t);if(n)return console.error("Dropped an illegal shot:",n),this.pump();this.shooter={...t.shooter},this.called=t.calledPocket??null,this.pieces.placeShooter(this.shooter),this.sim=Ou(e,t),this.simInput=t,this.seenPocketed=0,this.acc=0,this.speed=1,this.phase="rolling",this.aim.clearAim(),this.aim.hideAll(),this.aim.setCallable(this.called!==null?[this.called]:[],this.called),this.hud.setPower(null),this.refreshHud()}stepSimulation(t){const e=this.sim;this.acc+=Math.min(t,.1)*this.speed;let n=0;for(;this.acc>=e.params.dt&&!e.finished&&n<b0;){const s=e.step();for(const r of s)this.sfx.clack(r.impulse,r.b===null);this.acc-=e.params.dt,n++}for(;this.seenPocketed<e.pocketed.length;this.seenPocketed++){const s=e.pocketed[this.seenPocketed],o=this.state.pocketRoles[s.pocket]==="shark"||s.id===yr;this.pieces.drop(s.id,s.pocket,o),this.sfx.plop(!o),mo(o?[20,40,20]:25)}for(const s of e.bodies)this.pieces.setLive(s.id,s);e.finished&&this.resolveShot()}resolveShot(){const t=this.sim,e=this.simInput;this.sim=null,this.simInput=null,this.phase="settling";let n;try{n=Fu(this.state,e,t.outcome())}catch(s){console.error(s),this.hud.toast("Something went wrong with that shot — retake it.","bad"),this.pieces.syncToState(this.state,!1),this.beginTurn();return}if(this.state=n.state,this.pieces.syncToState(this.state,!0),this.afterAction(),this.state.pending){this.askClaim(n.report);return}this.announce(n.report)}async askClaim(t){if(this.phase="claiming",this.refreshHud(),this.link.idle(this.state),!this.link.canAct(t.player))return this.hud.toast(`${this.state.config.players[t.player].name} is choosing which Sailors to rescue…`,"info",3e3),this.pump();const e=t.claimOptions??[],n=await po(this.root,"Choose your Sailors",`<p>${t.rescued.length} Sailors made it to the lifeboats. Which crew will ${this.state.config.teams[t.team].name} rescue?</p>`,e.map((s,r)=>({id:s,label:Wn[s],html:`${Ri(Yn[s],34,"")}<span>${Wn[s]}</span>`,primary:r===0})));this.disposed||this.link.submit({t:"c",k:n})}applyClaim(t){let e;try{e=ku(this.state,t)}catch(n){console.error(n);return}this.state=e.state,this.pieces.syncToState(this.state,!0),this.afterAction(),this.phase="settling",this.announce(e.report)}announce(t){const e=y0(this.state,t);this.hud.toast(e.text,e.tone,2600),t.status==="won"&&this.sfx.fanfare(),this.refreshHud()}afterSettle(){this.phase!=="settling"||this.pieces.busy||this.settleTimer||(this.settleTimer=window.setTimeout(()=>{this.settleTimer=0,!(this.disposed||this.phase!=="settling")&&this.beginTurn()},this.state.status==="playing"?650:900))}async gameOver(){this.phase="over",this.aim.hideAll(),this.pieces.placeShooter(null),this.refreshHud(),fa();const t=this.state,e=t.status==="won"?t.config.mode==="versus"?`${t.config.teams[t.winner].name} wins!`:"Mission complete!":"Mission failed",n=t.config.players.filter(l=>l.team===t.winner).map(l=>l.name).join(" & "),s=t.pieces.filter(l=>l.kind==="sailor"&&l.loc.at==="pocket"&&t.pocketRoles[l.loc.pocket]==="lifeboat").length,r=t.pieces.some(l=>l.kind==="captain"&&l.loc.at==="pocket"&&t.pocketRoles[l.loc.pocket]==="lifeboat"),o=`${Ri(Yn.captain,72,"The Captain")}`+(t.config.mode==="versus"?`<p>${n} ${r?"saved the Captain":"are the last crew standing"} after ${t.turn} turn${t.turn===1?"":"s"}.</p>`:`<p>${s} of 30 Sailors rescued${r?", and the Captain is safe":""}.</p>`),a=this.link.online&&!this.link.isHost,c=await po(this.root,e,o+(a?"<p>Waiting for the host to start a rematch…</p>":""),a?[{id:"menu",label:"Leave game"}]:[{id:"rematch",label:"Play again",primary:!0},{id:"menu",label:this.link.online?"End online game":"Main menu"}]);this.disposed||this.exit(c==="rematch"?"rematch":"menu")}async openMenu(){if(this.phase==="over"||this.phase==="paused")return;const t=this.phase;this.phase="paused",this.cancelDrag();const e=this.link.online,n=this.menuExtras(),s=await po(this.root,e?"Menu":"Paused",`<p>Turn ${this.state.turn} · ${this.state.config.players[this.state.current].name} to shoot.</p>`,[{id:"resume",label:"Resume",primary:!0},{id:"sound",label:this.prefs.sound?"Sound: on":"Sound: off"},...n.map(r=>({id:`x:${r.id}`,label:r.label})),...e?[]:[{id:"restart",label:"Restart match"}],{id:"menu",label:e?this.link.isHost?"End online game":"Leave game":"Save & quit"}]);if(!this.disposed){if(this.phase=t,s.startsWith("x:")){n.find(r=>`x:${r.id}`===s)?.run(),this.refreshHud(),this.pump();return}this.pump(),s==="sound"?(this.prefs.sound=!this.prefs.sound,this.sfx.enabled=this.prefs.sound,_r(this.prefs),this.openMenu()):s==="restart"?(fa(),this.exit("rematch")):s==="menu"&&this.exit("menu")}}toggleView(t){const e=t??uo[(uo.indexOf(this.stage.mode)+1)%uo.length];this.stage.setViewMode(e),this.hud.setViewLabel(e),this.prefs.view=e,_r(this.prefs)}toggleLook(){this.looking=!this.looking,this.hud.setLooking(this.looking),this.cancelDrag(),this.refreshHud()}layout(){this.stage.resize(),this.stage.setInsets(this.hud.insets())}touchTolerance(){return Math.max(.06,26*this.stage.worldPerPixel())}onDown(t){if(t.preventDefault(),this.sfx.unlock(),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.stage.canvas.setPointerCapture?.(t.pointerId),this.pointers.size===2){this.cancelDrag();const[u,f]=[...this.pointers.values()];this.drag={kind:"orbit2",cx:(u.x+f.x)/2,cy:(u.y+f.y)/2,dist:Math.hypot(u.x-f.x,u.y-f.y)};return}if(this.drag||this.phase==="over"||this.phase==="paused")return;const e=this.phase==="rolling"||this.phase==="settling",n=t.pointerType==="mouse"&&(t.button===1||t.button===2);if(e||n||this.looking||this.phase==="claiming"||this.phase==="aim"&&!this.canAim()){this.drag={kind:"orbit",pointerId:t.pointerId,x:t.clientX,y:t.clientY,moved:0,tapSpeedsUp:e};return}if(this.phase!=="aim"||this.drag)return;const s=this.stage.pick(t.clientX,t.clientY);if(!s)return;const r=this.state,o=ln(r),a=this.touchTolerance();if(cn(r))for(const u of vi(r)){const f=o.pockets[u];if(Math.hypot(s.x-f.x,s.y-f.y)<o.spec.pocketRadius+a){this.called=this.called===u?null:u,this.aim.setCallable(vi(r),this.called),this.refreshHud(),mo(8);return}}const c=an(r),l=Math.hypot(s.x-this.shooter.x,s.y-this.shooter.y)<De(r,"shooter")+a*.6;Math.hypot(...(()=>{const u=ts(s,c.start,c.end);return[u.x-s.x,u.y-s.y]})())<a&&!l?(this.drag={kind:"slide",pointerId:t.pointerId},this.moveShooterTo(s)):this.drag={kind:"pull",pointerId:t.pointerId,sx:t.clientX,sy:t.clientY,start:s,dir:null,power:0}}onKey(t){if(t.target?.closest?.("input, textarea, .overlay"))return;const e=t.key;if(e==="Escape"){this.drag?this.cancelDrag():this.openMenu(),t.preventDefault();return}if(e==="v"||e==="V"){this.toggleView();return}if(e==="+"||e==="=")return this.stage.zoomBy(1/1.15);if(e==="-"||e==="_")return this.stage.zoomBy(1.15);if(e==="0"||e==="r"||e==="R")return this.stage.resetView();if(e==="f"||e==="F")return this.toggleView(this.stage.mode==="first"?"table":"first");if(e==="l"||e==="L")return this.toggleLook();const n=24;if(e==="q"||e==="Q")return this.stage.orbitBy(-n,0);if(e==="e"||e==="E")return this.stage.orbitBy(n,0);if(e==="w"||e==="W")return this.stage.orbitBy(0,-n);if(e==="s"||e==="S")return this.stage.orbitBy(0,n);if(!(this.phase!=="aim"||this.drag)&&(e==="ArrowLeft"||e==="ArrowRight"||e==="a"||e==="d"||e==="A"||e==="D")){t.preventDefault();const s=e==="ArrowLeft"||e==="a"||e==="A"?1:-1,r=t.shiftKey?.004:.025;this.slideTo(Math.min(1,Math.max(0,this.ropeT()+s*r))),this.refreshHud()}}ropeT(){const t=an(this.state),e=t.end.x-t.start.x,n=t.end.y-t.start.y;return((this.shooter.x-t.start.x)*e+(this.shooter.y-t.start.y)*n)/(e*e+n*n)}updateCursor(t){if(t.pointerType!=="mouse")return;const e=this.stage.canvas;if(this.drag){e.style.cursor=this.drag.kind==="slide"?"ew-resize":"grabbing";return}if(this.looking){e.style.cursor="grab";return}if(this.phase!=="aim"){e.style.cursor=this.phase==="rolling"?"pointer":"default";return}const n=this.stage.pick(t.clientX,t.clientY);if(!n)return;const s=this.state,r=ln(s),o=this.touchTolerance();if(cn(s)&&vi(s).some(h=>Math.hypot(n.x-r.pockets[h].x,n.y-r.pockets[h].y)<r.spec.pocketRadius+o)){e.style.cursor="pointer";return}const a=an(s),c=ts(n,a.start,a.end),l=Math.hypot(n.x-this.shooter.x,n.y-this.shooter.y)<De(s,"shooter")+o*.6;e.style.cursor=!l&&Math.hypot(c.x-n.x,c.y-n.y)<o?"ew-resize":"grab"}onMove(t){this.updateCursor(t),this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY});const e=this.drag;if(e?.kind==="orbit2"){t.preventDefault();const d=[...this.pointers.values()];if(d.length<2)return;const[g,_]=d,m=(g.x+_.x)/2,p=(g.y+_.y)/2,b=Math.hypot(g.x-_.x,g.y-_.y);this.stage.orbitBy(m-e.cx,p-e.cy),e.dist>10&&b>10&&this.stage.zoomBy(e.dist/b),e.cx=m,e.cy=p,e.dist=b;return}if(e?.kind==="orbit"){if(e.pointerId!==t.pointerId)return;t.preventDefault();const d=t.clientX-e.x,g=t.clientY-e.y;e.moved+=Math.abs(d)+Math.abs(g),e.x=t.clientX,e.y=t.clientY,this.stage.orbitBy(d,g);return}if(!e||e.pointerId!==t.pointerId||this.phase!=="aim")return;t.preventDefault();const n=this.stage.pick(t.clientX,t.clientY);if(!n)return;if(e.kind==="slide"){this.moveShooterTo(n);return}const s=Math.hypot(t.clientX-e.sx,t.clientY-e.sy),r=Math.min(window.innerWidth,window.innerHeight)*E0,o=Math.min(1,s/r),a=e.start.x-n.x,c=e.start.y-n.y,l=Math.hypot(a,c);if(o<Ll||l<1e-6){e.dir=null,e.power=0,this.aim.clearAim(),this.hud.setPower(null);return}e.dir={x:a/l,y:c/l},e.power=o;const h=this.state,u=xs(h).map(d=>({id:d.id,x:d.loc.x,y:d.loc.y,r:De(h,d.kind)})),f=h.config.aimGuide?Xu(ln(h),u,this.shooter,e.dir,De(h,"shooter")):null;this.aim.showAim(this.shooter,e.dir,o,De(h,"shooter"),f),this.hud.setPower(o)}onUp(t){this.pointers.delete(t.pointerId),this.stage.canvas.releasePointerCapture?.(t.pointerId);const e=this.drag;if(e?.kind==="orbit2"){this.drag=null;return}if(!e||e.pointerId!==t.pointerId)return;if(this.drag=null,e.kind==="orbit"){e.tapSpeedsUp&&e.moved<8&&(this.speed=3);return}if(this.aim.clearAim(),this.hud.setPower(null),e.kind!=="pull"||this.phase!=="aim"||!e.dir||e.power<Ll)return;if(as(this.state,this.shooter)){this.hud.toast("Slide the shooter clear of other pieces first.","bad");return}this.shoot(e.dir,e.power)}cancelDrag(){this.drag=null,this.stage.canvas.style.cursor="",this.aim.clearAim(),this.hud.setPower(null)}moveShooterTo(t){const e=an(this.state);this.shooter=ts(t,e.start,e.end),this.refreshShooter(),this.refreshHud()}get actionsApplied(){return this.applied}exposeDebug(){window.__chipwreck={state:()=>this.state,phase:()=>this.phase,shoot:(t,e,n,s)=>{s!==void 0&&(this.called=s);const r=Math.hypot(t,e);this.shoot({x:t/r,y:e/r},n)},slide:t=>this.slideTo(t),view:()=>this.toggleView()}}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),window.clearTimeout(this.settleTimer),this.cleanup.forEach(t=>t()),this.stage.scene.remove(this.board.group,this.pieces.group,this.aim.group),this.board.dispose(),this.pieces.dispose(),this.aim.dispose(),this.hud.dispose(),document.querySelectorAll(".overlay").forEach(t=>t.remove())}}function w0(i){if(!/^https?:$/.test(location.protocol))return;const t=()=>{i()&&fetch(`version.json?t=${Date.now()}`,{cache:"no-store"}).then(e=>e.ok?e.json():null).then(e=>{if(!e||!(typeof e.build=="number"&&e.build>2610132202)||!i())return;try{if(sessionStorage.getItem("chipwreck.reload")===String(e.build))return;sessionStorage.setItem("chipwreck.reload",String(e.build))}catch{}const n=new URL(location.href);n.searchParams.set("v",String(e.build)),location.replace(n.href)}).catch(()=>{})};t(),addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&t()})}function Vh(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4)}class Gh{constructor(t,e,n,s){k(this,"mine",{});k(this,"others",new Map);k(this,"listeners",new Set);k(this,"gone",!1);this.name=t,this.me=e,this.writeMine=n,this.onLeave=s}async presence(t){if(this.gone)return;const e={...this.mine};for(const[n,s]of Object.entries(t))s==null?delete e[n]:e[n]=s;this.mine=e,await this.writeMine(e),this.emit()}remote(t,e){this.gone||t===this.me||(e?this.others.set(t,e):this.others.delete(t),this.emit())}replaceAll(t){this.gone||(this.others=new Map([...t].filter(([e])=>e!==this.me)),this.emit())}current(){return this.mine}peers(){return[{peer:this.me,isMe:!0,presence:this.mine},...[...this.others].map(([t,e])=>({peer:t,isMe:!1,presence:e}))]}onPeers(t){return this.listeners.add(t),queueMicrotask(()=>this.listeners.has(t)&&t(this.peers())),()=>this.listeners.delete(t)}emit(){const t=this.peers();for(const e of[...this.listeners])e(t)}async leave(){this.gone||(this.gone=!0,this.listeners.clear(),await this.onLeave())}}const T0={apiKey:"AIzaSyDLVtNfjOTYy9_Fl3_X45plld08udcGh5k",authDomain:"jelly-flip.firebaseapp.com",databaseURL:"https://jelly-flip-default-rtdb.firebaseio.com",projectId:"jelly-flip",storageBucket:"jelly-flip.firebasestorage.app",messagingSenderId:"790326695298",appId:"1:790326695298:web:fb983b84ae5e33c3f82b9b"},A0="https://www.gstatic.com/firebasejs/10.12.2/",Dl="jf/rooms";class R0{constructor(){k(this,"kind","firebase");k(this,"me",Vh());k(this,"status","loading");k(this,"statusMsg","");k(this,"core",null);k(this,"listeners",new Set)}onStatus(t){return this.listeners.add(t),()=>this.listeners.delete(t)}set(t,e=""){this.status==="error"&&t!=="error"||(this.status=t,this.statusMsg=e,this.listeners.forEach(n=>n(t)))}connect(){if(!this.core){this.core=(async()=>{const e=l=>import(A0+l),[n,s,r]=await Promise.all(["firebase-app.js","firebase-auth.js","firebase-database.js"].map(e)),o=n.initializeApp(T0,"chipwreck");this.set("connecting");const a=(await s.signInAnonymously(s.getAuth(o))).user.uid,c=r.getDatabase(o);return r.onValue(r.ref(c,".info/connected"),l=>this.set(l.val()?"online":"connecting")),{D:r,db:c,uid:a}})();const t=new Promise((e,n)=>setTimeout(()=>n(new Error("timed out")),2e4));Promise.race([this.core,t]).catch(e=>this.set("error",String(e&&(e.code||e.message)||e)))}return this.core}async join(t){const{D:e,db:n,uid:s}=await this.connect(),r=e.ref(n,`${Dl}/${t}/peers`),o=e.ref(n,`${Dl}/${t}/peers/${this.me}`);let a=null;const c=new Gh(t,this.me,l=>e.set(o,{uid:s,p:JSON.stringify(l),t:e.serverTimestamp()}),async()=>{a?.();try{await e.onDisconnect(o).cancel(),await e.remove(o)}catch{}});return e.onDisconnect(o).remove(),await c.presence({}),a=e.onValue(r,l=>{const h=l.val()??{},u=new Map;for(const[f,d]of Object.entries(h))try{u.set(f,JSON.parse(d?.p??"{}"))}catch{u.set(f,{})}c.replaceAll(u)},l=>this.set("error",String(l?.code??l))),c}}class C0{constructor(){k(this,"kind","local");k(this,"me",Vh());k(this,"status","online");k(this,"statusMsg","");k(this,"ch",new BroadcastChannel("chipwreck-net"));k(this,"rooms",new Map);this.ch.onmessage=t=>{const e=t.data,n=this.rooms.get(e.room);!n||e.peer===this.me||(n.remote(e.peer,e.p),e.hello&&this.ch.postMessage({room:e.room,peer:this.me,p:n.current()}))},addEventListener("pagehide",()=>{for(const t of this.rooms.keys())this.ch.postMessage({room:t,peer:this.me,p:null})})}onStatus(){return()=>{}}async join(t){const e=new Gh(t,this.me,async n=>this.ch.postMessage({room:t,peer:this.me,p:n}),async()=>{this.rooms.delete(t),this.ch.postMessage({room:t,peer:this.me,p:null})});return this.rooms.set(t,e),this.ch.postMessage({room:t,peer:this.me,p:{},hello:!0}),e}}const Il="abcdefghjkmnpqrstuvwxyz";function P0(i=Math.random){return Array.from({length:4},()=>Il[Math.floor(i()*Il.length)]).join("")}function Ba(i){return String(i??"").toLowerCase().replace(/[^a-z]/g,"").slice(0,4)}function gs(i,t=16){return String(i??"").replace(/[\u0000-\u001f<>]/g,"").trim().slice(0,t)}const Wh=i=>`cw-${i}`,L0="cw-lobby";function Xh(i){return JSON.stringify(i)}function qh(i){if(typeof i!="string"||i.length>400)return null;let t;try{t=JSON.parse(i)}catch{return null}const e=t;if(!e||typeof e!="object")return null;if(e.t==="c")return Mr.includes(e.k)?{t:"c",k:e.k}:null;if(e.t==="p")return{t:"p"};if(e.t!=="s")return null;const n=e.i,s=c=>{const l=c;return l&&typeof l.x=="number"&&typeof l.y=="number"&&Number.isFinite(l.x)&&Number.isFinite(l.y)?{x:l.x,y:l.y}:null},r=s(n?.shooter),o=s(n?.velocity);if(!r||!o)return null;const a={shooter:r,velocity:o};if(n.calledPocket!==void 0){if(!Number.isInteger(n.calledPocket))return null;a.calledPocket=n.calledPocket}return{t:"s",i:a}}function Ul(i,t,e){return i.status!=="playing"?"The match is over":e.t==="c"?i.pending?i.pending.report.player!==t?"Not your choice":(i.pending.report.claimOptions??[]).includes(e.k)?null:"That type cannot be claimed":"Nothing to choose":i.pending?"Waiting for a claim choice":i.current!==t?"Not your turn":e.t==="p"?ya(i)?"You can only pass when your rope is blocked":null:cs(i,e.i)}function D0(i){return JSON.stringify({...i,history:[]})}function I0(i,t){const e=n=>JSON.stringify([n.pieces,n.current,n.turn,n.shotInTurn,n.claims,n.out,n.standby,n.status,n.winner,n.pending?.report.claimOptions??null]);return e(i)===e(t)}function go(i,t){return i.here.flatMap((e,n)=>!e&&!(i.seats[n]&&t.has(i.seats[n]))?[n]:[])}function Ji(i){return new Set(i.map(t=>t.peer))}function pa(i){return i.pending?i.pending.report.player:i.current}class za{constructor(t){k(this,"games",[]);k(this,"listeners",new Set);this.room=t,t.onPeers(e=>{this.games=e.filter(n=>!n.isMe).map(n=>n.presence.host).filter(n=>!!n&&typeof n.code=="string"&&n.st!=="over").map(n=>({code:n.code.replace(/[^a-z]/g,"").slice(0,4),name:gs(n.name)||"Someone",open:Number(n.open)|0,st:n.st})),this.listeners.forEach(n=>n())})}static async open(t){return new za(await t.join(L0))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}announce(t){this.room.presence({host:t}).catch(()=>{})}}class Ha{constructor(t,e,n,s,r){k(this,"g");k(this,"peers",[]);k(this,"listeners",new Set);k(this,"starts",new Set);k(this,"handlers",null);k(this,"ready",null);k(this,"closed",!1);this.room=t,this.lobby=e,this.g={v:1,code:r,st:"wait",round:0,cfg:structuredClone(n),here:[...s],seats:{},log:[],n:0,snap:null,acks:{}},t.onPeers(o=>this.onPeers(o)),this.publish()}static async open(t,e,n,s){if(s.length!==n.players.length)throw new Error("here[] must match players");if(!s.some(o=>!o))throw new Error("An online game needs at least one remote player");const r=P0();return new Ha(await t.join(Wh(r)),e,n,s,r)}get code(){return this.g.code}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}onStart(t){return this.starts.add(t),()=>this.starts.delete(t)}emit(){this.listeners.forEach(t=>t())}publish(){if(this.closed)return;this.room.presence({g:this.g}).catch(()=>{});const t=Ji(this.peers);this.lobby?.announce({code:this.g.code,name:this.hostName(),open:go(this.g,t).length,st:this.g.st})}hostName(){const t=this.g.here.indexOf(!0);return t>=0?this.g.cfg.players[t].name:"Host"}seat(t){if(this.g.here[t])return{kind:"here"};const e=this.g.seats[t];return e?{kind:"taken",present:Ji(this.peers).has(e)}:{kind:"open"}}canStart(){return go(this.g,Ji(this.peers)).length===0}onPeers(t){this.peers=t;const e=Ji(t);let n=!1;for(const s of t){if(s.isMe)continue;const r=s.presence,o=r.claim;if(!Number.isInteger(o)||o<0||o>=this.g.here.length||this.g.here[o])continue;const a=this.g.seats[o],c=gs(r.name);if(a===s.peer){c&&this.g.st==="wait"&&c!==this.g.cfg.players[o].name&&(this.g.cfg.players[o].name=c,n=!0);continue}a&&e.has(a)||Object.values(this.g.seats).includes(s.peer)||(this.g.seats[o]=s.peer,c&&this.g.st==="wait"&&(this.g.cfg.players[o].name=c),n=!0)}n?this.publish():this.lobby?.announce({code:this.g.code,name:this.hostName(),open:go(this.g,e).length,st:this.g.st}),this.tryRequests(),this.emit()}start(){this.g.st="play",this.g.round++,this.g.log=[],this.g.n=0,this.g.snap=null,this.g.acks={},this.ready=null,this.publish();const t=vs(this.g.cfg),e=this.link();this.starts.forEach(n=>n(t,0,e)),this.emit()}takeOver(t){this.g.here[t]===void 0||this.g.here[t]||(this.g.here[t]=!0,delete this.g.seats[t],this.publish(),this.emit())}append(t){this.ready=null,this.g.log.push(Xh(t)),this.publish(),this.handlers?.action(t)}tryRequests(){const t=this.ready;if(!t||this.g.st!=="play")return;let e=!1;for(const n of this.peers){if(n.isMe)continue;const s=n.presence.req;if(!s||!Number.isInteger(s.n))continue;const r=Object.keys(this.g.seats).find(a=>this.g.seats[a]===n.peer);if(r===void 0||s.n<=(this.g.acks[r]??0))continue;this.g.acks[r]=s.n,e=!0;const o=qh(s.a);if(o&&!Ul(t,Number(r),o))return this.append(o)}e&&this.publish()}link(){const t=this;return{online:!0,isHost:!0,canAct:e=>!!t.g.here[e],submit:e=>{t.ready&&!Ul(t.ready,pa(t.ready),e)&&t.append(e)},connect:e=>{t.handlers=e},applied:(e,n)=>{t.g.n=n,t.g.snap=D0(e),e.status!=="playing"&&(t.g.st="over"),t.publish()},idle:e=>{t.ready=e,t.tryRequests()},waiting:e=>{const n=pa(e);if(e.status!=="playing"||t.g.here[n])return null;const s=e.config.players[n].name,r=t.g.seats[n];return r&&Ji(t.peers).has(r)?`Waiting for ${s}…`:`Waiting for ${s} to reconnect… (Menu → play their turns here)`},sending:()=>!1,dispose:()=>{t.handlers=null}}}async leave(){this.closed||(this.closed=!0,this.lobby?.announce(null),this.listeners.clear(),this.starts.clear(),await this.room.leave())}}class Va{constructor(t,e,n,s){k(this,"g",null);k(this,"hostHere",!1);k(this,"name");k(this,"listeners",new Set);k(this,"starts",new Set);k(this,"handlers",null);k(this,"round",-1);k(this,"delivered",0);k(this,"reqN",0);k(this,"waitingAck",!1);k(this,"lastApplied",null);k(this,"closed",!1);k(this,"joinedAt",Date.now());this.net=t,this.room=e,this.code=n,this.name=gs(s)||"Friend",e.presence({name:this.name}).catch(()=>{}),e.onPeers(r=>this.onPeers(r))}static async join(t,e,n){return new Va(t,await t.join(Wh(e)),e,n)}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}onStart(t){return this.starts.add(t),()=>this.starts.delete(t)}get mySeat(){if(!this.g)return null;const t=Object.keys(this.g.seats).find(e=>this.g.seats[e]===this.net.me);return t===void 0?null:Number(t)}claim(t){this.room.presence({claim:t,name:this.name}).catch(()=>{})}setName(t){this.name=gs(t)||this.name,this.room.presence({name:this.name}).catch(()=>{})}onPeers(t){const e=t.find(n=>!n.isMe&&n.presence.g?.code===this.code);if(this.hostHere=!!e,e){const n=e.presence.g;this.g=n;const s=this.mySeat;this.waitingAck&&s!==null&&(n.acks[s]??0)>=this.reqN&&(this.waitingAck=!1),(n.st==="play"||n.st==="over")&&n.round!==this.round?this.startRound(n):n.round===this.round&&this.deliver(n)}this.emit()}startRound(t){this.round=t.round;let e;try{e=t.snap?yo(JSON.parse(t.snap)):vs(t.cfg)}catch{return}this.delivered=t.snap?t.n:0,this.lastApplied=null,this.waitingAck=!1;const n=this.link();this.starts.forEach(s=>s(e,this.delivered,n)),this.deliver(t)}deliver(t){for(;this.handlers&&this.delivered<t.log.length;){const e=qh(t.log[this.delivered]);this.delivered++,e&&this.handlers.action(e)}this.checkSnapshot()}checkSnapshot(){const t=this.g,e=this.lastApplied;if(!(!t?.snap||!e||t.n!==e.count))try{const n=yo(JSON.parse(t.snap));I0(e.state,n)||(this.lastApplied={state:n,count:t.n},this.handlers?.correct(n,t.n))}catch{}}emit(){this.listeners.forEach(t=>t())}link(){const t=this;return{online:!0,isHost:!1,canAct:e=>t.hostHere&&t.mySeat===e,submit:e=>{const n=t.mySeat;n===null||t.waitingAck||(t.reqN=Math.max(t.reqN,t.g?.acks[n]??0)+1,t.waitingAck=!0,t.room.presence({req:{n:t.reqN,a:Xh(e)}}).catch(()=>t.waitingAck=!1))},connect:e=>{t.handlers=e,t.g&&t.deliver(t.g)},applied:(e,n)=>{t.lastApplied={state:e,count:n},t.checkSnapshot()},idle:()=>{},waiting:e=>{if(!t.hostHere)return"The host has left — waiting for them to come back…";if(t.waitingAck)return"Sending your shot to the table…";const n=pa(e);return e.status!=="playing"||t.mySeat===n?null:`Waiting for ${e.config.players[n].name}…`},sending:()=>t.waitingAck,dispose:()=>{t.handlers=null}}}async leave(){this.closed||(this.closed=!0,this.listeners.clear(),this.starts.clear(),await this.room.leave())}}function U0(i){const t=new URL(location.href);return t.search="",t.hash="",t.searchParams.set("join",i),t.href}async function N0(i,t){const e=U0(i);try{if(navigator.share){await navigator.share({title:"ChipWreck",text:`Join my ChipWreck game — code ${i.toUpperCase()}`,url:e});return}await navigator.clipboard.writeText(e),t.textContent="Link copied!",setTimeout(()=>t.textContent="Copy link",1800)}catch{}}function O0(i,t,e,n){const s=Qt("div",{class:"wait"});i.append(s);const r=()=>{const a=t.g,c=a.cfg.players.map((l,h)=>{const u=a.cfg.teams[l.team],f=t.seat(h),d=f.kind==="here"?"On this device":f.kind==="open"?"Waiting for a player…":f.present?"Joined ✓":"Left — waiting for them to come back",g=f.kind==="here"||f.kind==="taken"&&f.present;return`<div class="wait-seat" style="--team:${le(u.color)}"><span class="who">${le(f.kind==="open"?`Seat ${h+1}`:l.name)}</span><span class="st${g?" ok":""}">${d}</span></div>`}).join("");s.innerHTML=`<div class="wait-card">
      <h2>Waiting for players</h2>
      <div class="roomcode"><span class="label">Game code</span><b class="code">${le(a.code.toUpperCase())}</b>
        <button class="btn small" data-act="share">${typeof navigator.share=="function"?"Share link":"Copy link"}</button></div>
      <p class="note">Friends tap <b>Have a game code?</b> on the ChipWreck start screen, or open the link, and they’re taken straight here. It also shows under <b>Online games</b> as “${le(t.hostName())}’s game”.</p>
      <div class="wait-seats">${c}</div>
      <button class="btn primary wide" data-act="start" ${t.canStart()?"":"disabled"}>${t.canStart()?"Start the game":"Waiting for everyone to join…"}</button>
      <button class="btn wide" data-act="cancel">Cancel</button>
    </div>`};s.addEventListener("click",a=>{const c=a.target.closest("button");c&&(c.dataset.act==="share"&&N0(t.code,c),c.dataset.act==="start"&&t.canStart()&&e(),c.dataset.act==="cancel"&&n())});const o=t.onChange(r);return r(),()=>{o(),s.remove()}}function F0(i,t,e){const n=Qt("div",{class:"wait"});i.append(n);let s=!1;const r=()=>{const a=t.g;s||(n.innerHTML=`<div class="wait-card">
        <h2>Game ${le(t.code.toUpperCase())}</h2>
        <div class="wait-head"></div>
        <label class="player" style="--team:#e7b73c"><span class="seat">You</span><input data-myname maxlength="16" value="${le(t.name)}" aria-label="Your name" /><span></span></label>
        <div class="wait-seats"></div>
        <button class="btn wide" data-act="leave">Leave</button>
      </div>`,s=!0);const c=n.querySelector(".wait-head"),l=n.querySelector(".wait-seats");if(!a){const u=Date.now()-t.joinedAt>6e3;u||setTimeout(r,6200),c.innerHTML=`<p class="note">${u?"No open game has this code yet. Check the code with the host; if they’re still setting up, it appears here as soon as they open it.":"Finding the game…"}</p>`,l.innerHTML="";return}const h=t.mySeat;c.innerHTML=`<p class="note">${t.hostHere?h===null?"Pick your seat:":a.st==="wait"?"You’re in! Waiting for the host to start the game…":"Rejoining the game…":"The host isn’t here right now — the game continues when they’re back."}</p>`,l.innerHTML=a.cfg.players.map((u,f)=>{const d=a.cfg.teams[u.team],g=!a.here[f],_=!!a.seats[f],m=h===f,p=m?'<span class="st ok">Your seat ✓</span>':g?`<button class="btn small${_?"":" primary"}" data-seat="${f}">${_?"Take over":"Take seat"}</button>`:'<span class="st">Host’s device</span>';return`<div class="wait-seat${m?" mine":""}" style="--team:${le(d.color)}"><span class="who">${le(u.name)}<small class="st"> · ${le(d.name)}</small></span>${p}</div>`}).join("")};n.addEventListener("click",a=>{const c=a.target.closest("button");c&&(c.dataset.seat&&t.claim(Number(c.dataset.seat)),c.dataset.act==="leave"&&e())}),n.addEventListener("input",a=>{const c=a.target;if(c.dataset.myname===void 0)return;const l=gs(c.value);l&&t.setName(l)});const o=t.onChange(r);return r(),()=>{o(),n.remove()}}const k0=`
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
</ul>`;function B0(i,t){let e="versus",n="normal",s="out",r=!0,o="local";const a=[!0,!1,!1,!1,!1,!1];let c="",l="",h=2,u=Pr(2);const f=Array.from({length:6},(S,v)=>t.names[v]??`Player ${v+1}`),d=Qt("div",{class:"setup"});i.append(d);const g=()=>{const S=e==="versus"?So(h):[],v=e==="versus"?$l(u):Array.from({length:h},()=>-1),L=e==="versus"?2:1;d.innerHTML=`
      <div class="setup-card">
        <div class="badge" aria-label="ChipWreck — The Legendary Rescue">
          ${Ri(Yn.captain,96,"The Captain")}
          <div class="logo">ChipWreck</div>
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
            <button data-step="-1" aria-label="Fewer players" ${h<=L?"disabled":""}>−</button>
            <output aria-live="polite">${h}</output>
            <button data-step="1" aria-label="More players" ${h>=6?"disabled":""}>+</button>
          </div>
        </div>
        ${e==="versus"?`
        <div class="row wrap">
          <span class="label">Teams</span>
          <div class="layouts">
            ${S.map((R,A)=>`<button class="pill${R.join()===u.join()?" on":""}" data-layout="${A}">${Hu(R)}</button>`).join("")}
          </div>
        </div>
        <p class="note">${Vu(u.length)}</p>`:""}
        ${t.online?`
        <div class="seg" role="tablist" aria-label="Where is everyone playing">
          <button role="tab" aria-selected="${o==="local"}" data-where="local">Same device</button>
          <button role="tab" aria-selected="${o==="online"}" data-where="online">Online</button>
        </div>`:""}
        <div class="players">
          ${v.map((R,A)=>{const P=R>=0?Mo[R].color:"#e7b73c",E=R>=0?Mo[R].name:"Crew",y=o==="online"?`<button class="pill where${a[A]?" on":""}" data-here="${A}" aria-pressed="${a[A]}">${a[A]?"This device":"Online"}</button>`:"";return`<label class="player${o==="online"?" with-where":""}" style="--team:${P}"><span class="seat">${A+1}</span>
              <input data-name="${A}" maxlength="24" value="${le(f[A])}" aria-label="Player ${A+1} name"${o==="online"&&!a[A]?' placeholder="Joins online"':""} />
              <span class="team">${E}</span>${y}</label>`}).join("")}
        </div>
        ${o==="online"?'<p class="note">Players marked Online join from their own phone or computer with a game code. Their names fill in when they join.</p>':""}
        <p class="note">Seat 1 starts — by lifeboat tradition, the youngest sailor. Play passes to the left.</p>
        <div class="row">
          <span class="label">Sea salt</span>
          <div class="layouts">
            ${["light","normal","heavy"].map(R=>`<button class="pill${n===R?" on":""}" data-salt="${R}">${R==="light"?"Light":R==="normal"?"Normal":"Heavy"}</button>`).join("")}
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
        ${e==="versus"?`
        <div class="row">
          <span class="label">Early Captain</span>
          <div class="layouts">
            <button class="pill${s==="out"?" on":""}" data-foul="out">Crew out</button>
            <button class="pill${s==="standby"?" on":""}" data-foul="standby">Standby</button>
          </div>
        </div>`:""}
        <button class="btn primary wide" data-act="start">${o==="online"?"Open online game":"Set sail"}</button>
        ${l?`<p class="err">${le(l)}</p>`:""}
        ${t.online?'<section class="online-panel" aria-label="Online games"></section>':""}
        <details class="rules"><summary>How to play</summary>${k0}</details>
        <footer class="credits">
          <p>Created by Justin Thomae · Est. 2016</p>
          <p>Copyright © ${new Date().getFullYear()} <a href="https://grudgematchgames.com" target="_blank" rel="noopener">Grudge Match Games</a></p>
        </footer>
      </div>`};d.addEventListener("click",S=>{const v=S.target.closest("button");if(v){if(v.dataset.mode)e=v.dataset.mode,e==="versus"&&h<2&&(h=2),u=Pr(Math.max(2,h))??[1,1];else if(v.dataset.step)h=Math.min(6,Math.max(e==="versus"?2:1,h+Number(v.dataset.step))),e==="versus"&&(u=Pr(h));else if(v.dataset.where)o=v.dataset.where,l="";else if(v.dataset.here){const L=Number(v.dataset.here);a[L]=!a[L],l=""}else if(v.dataset.joinCode!==void 0){t.online?.join(v.dataset.joinCode,f[0].trim()||"Friend");return}else if(v.dataset.act==="join"){const L=Ba(c);if(L.length!==4)return l="Game codes are 4 letters.",g();t.online?.join(L,f[0].trim()||"Friend");return}else if(v.dataset.salt)n=v.dataset.salt;else if(v.dataset.guide)r=v.dataset.guide==="on";else if(v.dataset.foul)s=v.dataset.foul;else if(v.dataset.layout)u=So(h)[Number(v.dataset.layout)];else if(v.dataset.act==="resume"){t.onResume();return}else if(v.dataset.act==="start"){const L=f.slice(0,h).map((P,E)=>P.trim()||`Player ${E+1}`),R={salt:n,captainFoul:s,aimGuide:r},A={config:e==="versus"?Gu(u,L,R):Wu(h,L,R),names:f};if(o==="online"&&t.online){const P=a.slice(0,h);if(!P.includes(!1))return l="Mark at least one player as Online — or play on this device with “Same device”.",g();t.online.host(A,P);return}t.onStart(A);return}g(),_()}}),d.addEventListener("input",S=>{const v=S.target;v.dataset.name&&(f[Number(v.dataset.name)]=v.value),v.dataset.code!==void 0&&(c=v.value)}),d.addEventListener("keydown",S=>{const v=S.target;S.key==="Enter"&&v.dataset.code!==void 0&&d.querySelector('[data-act="join"]')?.click()});const _=()=>{const S=d.querySelector(".online-panel");if(!S||!t.online)return;const v=document.activeElement instanceof HTMLInputElement&&document.activeElement.dataset.code!==void 0,L=t.online.games(),R=t.online.status(),A=L.length?`<div class="hosts">${L.map(E=>`<div class="hostrow"><div><b>${le(E.name)}’s game</b><small>${E.st==="play"?"In progress":"Waiting for players"} · ${E.open} open seat${E.open===1?"":"s"}</small></div><button class="btn primary small" data-join-code="${le(E.code)}">Join</button></div>`).join("")}</div>`:'<p class="note">No games open right now.</p>',P=`<div class="joinrow"><input data-code maxlength="4" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="Code" aria-label="Game code" value="${le(c.toUpperCase())}" /><button class="btn small" data-act="join">Join</button></div>`;if(v){const E=S.querySelector(".games");E&&(E.innerHTML=A);return}S.innerHTML=`<h3>Online games</h3><div class="games">${A}</div><p class="label small">Have a game code?</p>${P}${R?`<p class="note">${le(R)}</p>`:""}`},m=t.online?.onChange(_),p=g,b=()=>{p(),_()};return d.addEventListener("click",()=>queueMicrotask(_)),b(),()=>{m?.(),d.remove()}}const Gi=document.getElementById("app"),z0=document.getElementById("scene"),Ln=S0();let Bi;try{Bi=new g0(z0)}catch(i){throw console.error(i),Gi.innerHTML='<div class="fatal"><h1>ChipWreck</h1><p>This device could not start 3D graphics (WebGL). Try another browser or update your device.</p></div>',i}let Re=null,_s=null,vr=null;const $h=new URLSearchParams(location.search),un=$h.get("net")==="local"?new C0:new R0;let xr=null,Yh="";const ma=new Set,dr=()=>ma.forEach(i=>i());let Qn=null,Zn=null;za.open(un).then(i=>{xr=i,i.onChange(dr),dr()}).catch(i=>{Yh="Online play is unavailable right now.",console.warn("lobby",i),dr()});un.onStatus(dr);const H0={status:()=>Yh||un.status==="error"?`Online play is unavailable right now${un.statusMsg?` (${un.statusMsg})`:""}.`:xr&&(un.status==="online"||un.kind!=="firebase")?"":"Connecting…",games:()=>xr?.games??[],onChange:i=>(ma.add(i),()=>ma.delete(i)),host:({config:i,names:t},e)=>{Ln.names=t,_r(Ln),V0(i,e)},join:(i,t)=>void Zh(i,t)};function As(){_s?.(),_s=null}async function V0(i,t){let e;try{e=await Ha.open(un,xr,i,t)}catch(n){console.warn(n),alert("Couldn’t open an online game right now. Try again in a moment.");return}Qn=e,As(),e.onStart((n,s,r)=>jh(n,s,r)),e.onChange(()=>Re?.netChanged()),_s=O0(Gi,e,()=>e.start(),()=>void Ga().then(Wi))}async function Zh(i,t){const e=Ba(i);if(e.length!==4)return;let n;try{n=await Va.join(un,e,t)}catch(r){console.warn(r),alert("Couldn’t join that game. Ask the host to check it’s still open.");return}Zn=n,As(),n.onStart((r,o,a)=>jh(r,o,a)),n.onChange(()=>Re?.netChanged()),_s=F0(Gi,n,()=>void Ga().then(Wi));const s=Jh();s?.code===e&&s.seat!==null&&n.claim(s.seat)}async function Ga(){Re?.dispose(),Re=null;const i=Qn,t=Zn;Qn=Zn=null,X0(),await Promise.all([i?.leave(),t?.leave()])}function G0(){const i=Qn;return i?i.g.cfg.players.flatMap((t,e)=>{const n=i.seat(e);return n.kind==="taken"&&!n.present||n.kind==="open"?[{id:`take-${e}`,label:`Play ${t.name}’s turns on this device`,run:()=>i.takeOver(e)}]:[]}):[]}function jh(i,t,e){As(),Re?.dispose(),Zn&&W0({code:Zn.code,seat:Zn.mySeat}),Re=new Hh(Gi,Bi,i,Ln,n=>{if(n==="rematch"&&Qn){Qn.start();return}Ga().then(Wi)},e,t,G0)}const Wa="chipwreck.rejoin.v1";function W0(i){try{sessionStorage.setItem(Wa,JSON.stringify(i))}catch{}}function Jh(){try{const i=JSON.parse(sessionStorage.getItem(Wa)??"null");return i&&typeof i.code=="string"?{code:i.code,seat:Number.isInteger(i.seat)?i.seat:null}:null}catch{return null}}function X0(){try{sessionStorage.removeItem(Wa)}catch{}}function ga(i){As(),Re?.dispose(),zh(i),Re=new Hh(Gi,Bi,i,Ln,t=>{Re?.dispose(),Re=null,t==="rematch"&&vr?ga(vs(vr)):Wi()})}function Wi(){Re?.dispose(),Re=null,Bi.resize(),As(),_s=B0(Gi,{names:Ln.names,canResume:!!Cl(),onResume:()=>{const i=Cl();if(!i)return Wi();vr=i.config,ga(i)},onStart:({config:i,names:t})=>{Ln.names=t,_r(Ln),fa(),vr=i,ga(vs(i))},online:H0})}function Kh(){Re||(Bi.resize(),Bi.render()),requestAnimationFrame(Kh)}Wi();Kh();w0(()=>Re===null&&!Qn&&!Zn);const _o=Ba($h.get("join")),Nl=Jh();if(_o.length===4||Nl){const i=new URL(location.href);i.searchParams.delete("join"),history.replaceState(null,"",i.href),setTimeout(()=>void Zh(_o.length===4?_o:Nl.code,Ln.names[0]||"Friend"),300)}
