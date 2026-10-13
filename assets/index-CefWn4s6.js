var ph=Object.defineProperty;var mh=(i,t,e)=>t in i?ph(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var tt=(i,t,e)=>mh(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const En=Math.sqrt(3)/2,_s=.042,ul=.002,io=.12,gh=io*.1,fl=Object.freeze({radius:1,pocketRadius:io,pocketInset:gh,ropeInset:io*(Math.sqrt(3)/2),pieceRadius:_s,captainRadius:_s,shooterRadius:_s,pieceMass:1,captainMass:1,shooterMass:1,postRadius:.013,postDistance:3*(2*_s+ul)}),_h=ul,Ua=[{x:.5,y:-En},{x:-.5,y:-En},{x:-1,y:0},{x:-.5,y:En},{x:.5,y:En},{x:1,y:0}],pi=6;function dl(i=fl){vh(i);const t=i.radius,e=t*En,n=Ua.map(l=>({x:l.x*t,y:l.y*t})),s=t-i.pocketInset,r=Ua.map(l=>({x:l.x*s,y:l.y*s})),o=[],a=[];for(let l=0;l<pi;l++){const h=n[l],u=n[(l+1)%pi],d={x:(h.x+u.x)/2,y:(h.y+u.y)/2},f={x:-d.x/e,y:-d.y/e};o.push({side:l,a:h,b:u,normal:f,offset:e});const g={x:h.x+f.x*i.ropeInset,y:h.y+f.y*i.ropeInset},_=t,m={x:(u.x-h.x)/_,y:(u.y-h.y)/_},p=i.pocketRadius+i.shooterRadius+.005,b=Na(g,m,r[l],p,1,0),S=Na(g,m,r[(l+1)%pi],p,-1,_);a.push({side:l,start:{x:g.x+m.x*b,y:g.y+m.y*b},end:{x:g.x+m.x*S,y:g.y+m.y*S}})}const c=o.map(l=>({x:-l.normal.x*i.postDistance,y:-l.normal.y*i.postDistance}));return{spec:i,apothem:e,corners:n,pockets:r,rails:o,ropes:a,posts:c}}function Na(i,t,e,n,s,r){const o=e.x-i.x,a=e.y-i.y,c=o*t.x+a*t.y,l=o*o+a*a-c*c,h=n*n;return h<=l?r:c+s*Math.sqrt(h-l)}function vh(i){const t=["radius","pocketRadius","pieceRadius","captainRadius","shooterRadius","pieceMass","captainMass","shooterMass","postRadius"];for(const e of t)if(!(Number.isFinite(i[e])&&i[e]>0))throw new Error(`BoardSpec.${e} must be a positive number`);if(!(i.ropeInset>i.shooterRadius))throw new Error("BoardSpec.ropeInset must exceed shooterRadius");if(!(i.pocketInset>=0&&i.pocketInset<i.radius/2))throw new Error("BoardSpec.pocketInset out of range");if(!(i.postDistance>=0&&i.postDistance<i.radius*.6))throw new Error("BoardSpec.postDistance out of range")}function xi(i,t){const e=i.x-t.x,n=i.y-t.y;return e*e+n*n}function Vi(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s;if(r===0)return{x:t.x,y:t.y};let o=((i.x-t.x)*n+(i.y-t.y)*s)/r;return o=o<0?0:o>1?1:o,{x:t.x+n*o,y:t.y+s*o}}function xh(i,t){let e=1/0;for(const n of i.rails){const s=n.normal.x*t.x+n.normal.y*t.y+n.offset;s<e&&(e=s)}return e}function yh(i,t,e){const n=e+i.spec.postRadius;for(const s of i.posts)if(xi(t,s)<n*n)return!0;return!1}function Mh(i,t,e){return xh(i,t)>=e-1e-9}function Sh(i,t){const e=i.rails[t].normal;return{x:-e.x,y:-e.y}}const Eh=Object.freeze({dt:1/480,friction:.7,damping:.1,restitution:.92,railRestitution:.72,railFriction:.08,restSpeed:.004,maxSpeed:7,maxShotSpeed:5,maxTime:30,iterations:3}),Fa=Object.freeze({light:1.1,normal:.7,heavy:.3});function pl(i){const t={...Eh,...i??{}};for(const[e,n]of Object.entries(t))if(!Number.isFinite(n))throw new Error(`PhysicsParams.${e} must be finite`);if(t.dt<=0||t.dt>1/60)throw new Error("PhysicsParams.dt must be in (0, 1/60]");if(t.restitution<0||t.restitution>1)throw new Error("restitution must be in [0,1]");if(t.railRestitution<0||t.railRestitution>1)throw new Error("railRestitution must be in [0,1]");if(t.iterations<1)throw new Error("iterations must be >= 1");if(t.maxShotSpeed>t.maxSpeed)throw new Error("maxShotSpeed must not exceed maxSpeed");return t}function bh(i,t){const e=Math.min(i.spec.pieceRadius,i.spec.captainRadius,i.spec.shooterRadius),n=t.maxSpeed*t.dt;if(n>=e*.75)throw new Error(`Time step too large: ${n.toFixed(4)} per step vs min radius ${e}`)}class wh{constructor(t,e,n){tt(this,"bodies");tt(this,"pocketed",[]);tt(this,"params");tt(this,"time",0);tt(this,"steps",0);tt(this,"timedOut",!1);this.geometry=t,this.params=pl(n),bh(t,this.params);const s=new Set;this.bodies=e.map(r=>{if(s.has(r.id))throw new Error(`Duplicate body id ${r.id}`);s.add(r.id);for(const o of["x","y","vx","vy","r","m"])if(!Number.isFinite(r[o]))throw new Error(`Body ${r.id}.${o} is not finite`);if(r.r<=0||r.m<=0)throw new Error(`Body ${r.id} needs positive radius and mass`);return{...r}});for(const r of this.bodies)Th(r,this.params.maxSpeed);this.relax(this.time,[])}relax(t,e){const n=this.params,s=this.bodies;for(let r=0;r<n.iterations;r++){let o=!1;for(let l=0;l<s.length;l++){const h=s[l];for(let u=l+1;u<s.length;u++)Ah(h,s[u],n.restitution,t,e)&&(o=!0)}const a=this.geometry.posts,c=this.geometry.spec.postRadius;for(const l of s){for(const h of this.geometry.rails)Rh(l,h.normal,h.offset,n,t,e)&&(o=!0);for(const h of a)Ch(l,h,c,n,t,e)&&(o=!0)}if(!o)break}}get atRest(){for(const t of this.bodies)if(t.vx!==0||t.vy!==0)return!1;return!0}get finished(){return this.timedOut||this.atRest}step(){const t=[];if(this.finished)return t;const e=this.params,n=e.dt,s=this.bodies;for(const c of s){const l=c.vx*c.vx+c.vy*c.vy;if(l===0)continue;const h=Math.sqrt(l);let u=(h-e.friction*n)*(1-e.damping*n);if(u<e.restSpeed){c.vx=0,c.vy=0;continue}u>e.maxSpeed&&(u=e.maxSpeed);const d=u/h;c.vx*=d,c.vy*=d,c.x+=c.vx*n,c.y+=c.vy*n}const r=this.time+n;this.relax(r,t);const o=this.geometry.pockets,a=this.geometry.spec.pocketRadius*this.geometry.spec.pocketRadius;for(let c=s.length-1;c>=0;c--){const l=s[c];for(let h=0;h<o.length;h++){const u=o[h],d=l.x-u.x,f=l.y-u.y;if(d*d+f*f<a){this.pocketed.push({id:l.id,pocket:h,time:r}),s.splice(c,1);break}}}if(this.time=r,this.steps++,this.time>=e.maxTime&&!this.atRest){this.timedOut=!0;for(const c of s)c.vx=0,c.vy=0}return t}run(){for(;!this.finished;)this.step();return this}outcome(){if(!this.finished)throw new Error("Simulation has not finished");const t={};for(const n of this.bodies)t[n.id]={x:n.x,y:n.y};const e=this.pocketed.map((n,s)=>({e:n,i:s})).sort((n,s)=>n.e.time-s.e.time||s.i-n.i).map(({e:n})=>n);return{positions:t,pocketed:e,time:this.time,timedOut:this.timedOut}}}function Th(i,t){const e=i.vx*i.vx+i.vy*i.vy;if(e>t*t){const n=t/Math.sqrt(e);i.vx*=n,i.vy*=n}}function Ah(i,t,e,n,s){const r=t.x-i.x,o=t.y-i.y,a=i.r+t.r,c=r*r+o*o;if(c>=a*a)return!1;let l,h,u;c===0?(l=1,h=0,u=0):(u=Math.sqrt(c),l=r/u,h=o/u);const d=1/i.m,f=1/t.m,g=d+f,_=(t.vx-i.vx)*l+(t.vy-i.vy)*h;if(_<0){const b=-(1+e)*_/g;i.vx-=b*d*l,i.vy-=b*d*h,t.vx+=b*f*l,t.vy+=b*f*h,s.push({time:n,a:i.id,b:t.id,impulse:b})}const p=(a-u)/g;return i.x-=l*p*d,i.y-=h*p*d,t.x+=l*p*f,t.y+=h*p*f,!0}function Rh(i,t,e,n,s,r){const o=t.x*i.x+t.y*i.y+e;if(o>=i.r)return!1;const a=i.r-o;i.x+=t.x*a,i.y+=t.y*a;const c=i.vx*t.x+i.vy*t.y;if(c<0){const l=i.vx-c*t.x,h=i.vy-c*t.y,u=1-n.railFriction,d=-c*n.railRestitution;i.vx=l*u+d*t.x,i.vy=h*u+d*t.y,r.push({time:s,a:i.id,b:null,impulse:-c*i.m*(1+n.railRestitution)})}return!0}function Ch(i,t,e,n,s,r){const o=i.x-t.x,a=i.y-t.y,c=i.r+e,l=o*o+a*a;if(l>=c*c)return!1;let h=1,u=0,d=0;l>0&&(d=Math.sqrt(l),h=o/d,u=a/d);const f=c-d;i.x+=h*f,i.y+=u*f;const g=i.vx*h+i.vy*u;if(g<0){const _=(1+n.railRestitution)*g;i.vx-=_*h,i.vy-=_*u,r.push({time:s,a:i.id,b:"post",impulse:-g*i.m*(1+n.railRestitution)})}return!0}function Ph(i,t){const e=Math.abs(i)+Math.abs(t);if(e===0)return 0;const n=i/e;return t>=0?1-n:3+n}const vs=new Map;function Lh(i,t){const e=`${i}:${t}`;let n=vs.get(e);return n||(n=Dh(i,t),vs.size>32&&vs.clear(),vs.set(e,n)),n}function Dh(i,t){const e=[];for(let n=-t;n<=t;n++)for(let s=-t;s<=t;s++){const r=s*s+s*n+n*n;if(r>t*t)continue;const o=(s+n*.5)*i,a=n*En*i;e.push({x:o,y:a,norm:r,angle:Ph(s+n*.5,n*En)})}return e.sort((n,s)=>n.norm-s.norm||n.angle-s.angle),e}const Ih=["AA","WWWAA","WWWWAA","WCKAA","WCCAAC","WCCCC","CC"],Uh={A:"anchor",W:"wheel",C:"chest",K:null};function Nh(i,t=.002){const e=i*2+t,n=[];return Ih.forEach((s,r)=>{const o=(3-r)*En*e;for(let a=0;a<s.length;a++){const c=(a-(s.length-1)/2)*e;n.push({x:o===0?0:-o,y:c,type:Uh[s[a]],face:n.length})}}),n}function Fh(i,t,e,n=.002){const s=[...t,...i.posts.map(a=>({x:a.x,y:a.y,r:i.spec.postRadius}))],r=(e+n)*.5,o=i.spec.pocketRadius;for(const a of Lh(r,80)){if(!Mh(i,a,e))continue;let c=!0;for(const l of i.pockets)if(xi(a,l)<(o+e)*(o+e)){c=!1;break}if(c){for(const l of s){const h=l.r+e+n;if(xi(a,l)<h*h-1e-12){c=!1;break}}if(c)return{x:a.x,y:a.y}}}throw new Error("No free spot on the board")}const cr="shooter",yi="captain",Oh=6,lr=["anchor","wheel","chest"],er=10,nr={anchor:"Anchors",wheel:"Wheels",chest:"Treasure Chests"},Bh=Object.freeze({1:[0],2:[0,3],3:[0,2,4],4:[0,1,3,4],5:[0,1,2,3,4],6:[0,1,2,3,4,5]});function kh(i){if(i.mode!=="versus"&&i.mode!=="coop")throw new Error(`Unknown mode ${String(i.mode)}`);const t=i.players?.length??0;if(!Number.isInteger(t)||t<1||t>Oh)throw new Error("A match needs 1 to 6 players");const e=i.players.map((c,l)=>({name:Oa(c.name,`Player ${l+1}`),team:c.team}));let n=(i.teams??[]).map((c,l)=>({name:Oa(c.name,`Team ${l+1}`),color:c.color||"#888888"}));if(i.mode==="versus"){if(t<2)throw new Error("Versus needs at least 2 players");if(n.length<2||n.length>3)throw new Error("Versus needs 2 or 3 teams");e.forEach((c,l)=>{if(!Number.isInteger(c.team)||c.team<0||c.team>=n.length)throw new Error(`Player ${l+1} has an invalid team`)}),n.forEach((c,l)=>{if(!e.some(h=>h.team===l))throw new Error(`${n[l].name} has no players`)})}else{if(n.length===0&&(n=[{name:"Crew",color:"#e7b73c"}]),n.length!==1)throw new Error("Co-op uses a single crew");e.forEach(c=>c.team=0)}const s=i.captainFoul??"out";if(s!=="out"&&s!=="standby")throw new Error("captainFoul must be out or standby");const r=i.salt??"normal";if(!(r in Fa))throw new Error("salt must be light, normal or heavy");const o={...fl,...i.board??{}};dl(o);const a=pl({friction:Fa[r],...i.physics??{}});return{mode:i.mode,players:e,teams:n,captainFoul:s,salt:r,board:o,physics:a}}function Oa(i,t){return(typeof i=="string"?i.trim().slice(0,24):"")||t}function na(i){const t=kh(i),e=[...Bh[t.players.length]],n=Array.from({length:pi},(a,c)=>t.mode==="coop"&&c%2===1?"shark":"lifeboat"),s=Nh(Math.max(t.board.pieceRadius,t.board.captainRadius),_h),r={anchor:0,wheel:0,chest:0},o=s.map(a=>{const c={at:"board",x:a.x,y:a.y};return a.type===null?{id:yi,kind:"captain",type:null,face:a.face,loc:c}:{id:`${a.type}-${r[a.type]++}`,kind:"sailor",type:a.type,face:a.face,loc:c}});return o.sort((a,c)=>a.kind==="captain"?-1:c.kind==="captain"?1:0),{version:2,config:t,seats:e,pocketRoles:n,pieces:o,claims:t.teams.map(()=>null),out:t.teams.map(()=>!1),standby:null,current:0,turn:1,shotInTurn:0,pocketSeq:0,status:"playing",winner:null,pending:null,history:[],lastReport:null}}const Ba=new Map;function on(i){const t=JSON.stringify(i.config.board);let e=Ba.get(t);return e||(e=dl(i.config.board),Ba.set(t,e)),e}function hr(i){return i.config.players[i.current].team}function zh(i){return i.seats[i.current]}function rn(i,t=i.current){return on(i).ropes[i.seats[t]]}function Pe(i,t){const e=i.config.board;return t==="shooter"?e.shooterRadius:t==="captain"?e.captainRadius:e.pieceRadius}function ka(i,t){const e=i.config.board;return t==="shooter"?e.shooterMass:t==="captain"?e.captainMass:e.pieceMass}function as(i){return i.pieces.filter(t=>t.loc.at==="board")}function ia(i,t){return t.loc.at==="pocket"&&i.pocketRoles[t.loc.pocket]==="lifeboat"}function Hh(i,t){return i.pieces.filter(e=>e.kind==="sailor"&&e.type===t&&ia(i,e)).length}function so(i,t){if(i.config.mode==="coop")return i.pieces.filter(n=>n.kind==="sailor"&&ia(i,n)).length;const e=i.claims[t];return e?Hh(i,e):0}function Vh(i){return i.pieces.filter(t=>t.kind==="sailor"&&t.loc.at==="pocket"&&i.pocketRoles[t.loc.pocket]==="shark").length}function Gh(i){return i.config.mode==="versus"?er:i.pieces.filter(t=>t.kind==="sailor").length}function sa(i,t){return i.claims.indexOf(t)}function Wh(i,t){return!i.out[t]&&i.standby!==t}function ml(i,t){return i.config.mode==="versus"?i.claims[t]!==null&&so(i,t)>=er:!i.pieces.some(e=>e.kind==="sailor"&&e.loc.at==="board")}function Mn(i){if(i.status!=="playing"||i.pending)return!1;const t=i.pieces.find(e=>e.id===yi);return!!t&&t.loc.at==="board"&&ml(i,hr(i))}function ki(i){return i.pocketRoles.flatMap((t,e)=>t==="lifeboat"?[e]:[])}const za=1e-6;function Zi(i,t){if(!ur(t))return"Shooter position is not a number";const e=rn(i),n=Vi(t,e.start,e.end);if(xi(n,t)>za*za)return"The shooter must sit on your Lifeline Rope";const s=Pe(i,"shooter");for(const r of as(i)){const o=s+Pe(i,r.kind);if(xi(t,r.loc)<o*o)return"The shooter is touching another chip"}return yh(on(i),t,s)?"The shooter is touching a peg":null}function Xh(i,t){const e=rn(i),n=Vi(t,e.start,e.end);if(!Zi(i,n))return n;const s=Math.sqrt(xi(e.start,e.end)),r=(e.end.x-e.start.x)/s,o=(e.end.y-e.start.y)/s,a=(n.x-e.start.x)*r+(n.y-e.start.y)*o,c=s/400;for(let l=1;l<=400;l++)for(const h of[a+l*c,a-l*c]){if(h<0||h>s)continue;const u={x:e.start.x+r*h,y:e.start.y+o*h};if(!Zi(i,u))return u}return null}function gl(i){const t=rn(i);return Xh(i,{x:(t.start.x+t.end.x)/2,y:(t.start.y+t.end.y)/2})}function ra(i,t){if(i.status!=="playing")return"The match is over";if(i.pending)return"Choose which Sailors to claim first";if(!t||!ur(t.velocity))return"Shot velocity is not a number";const e=t.velocity.x*t.velocity.x+t.velocity.y*t.velocity.y;if(e===0)return"The shot has no power";const n=i.config.physics.maxShotSpeed*(1+1e-9);if(e>n*n)return"The shot is too powerful";const s=Zi(i,t.shooter);if(s)return s;if(Mn(i)){if(t.calledPocket===void 0)return"Call a lifeboat for the Captain first";if(!Number.isInteger(t.calledPocket)||!ki(i).includes(t.calledPocket))return"That lifeboat cannot be called"}else if(t.calledPocket!==void 0)return"A lifeboat can only be called when beckoning the Captain";return null}function ur(i){return!!i&&Number.isFinite(i.x)&&Number.isFinite(i.y)}function Yh(i,t){const e=ra(i,t);if(e)throw new Error(e);const n=as(i).map(s=>({id:s.id,kind:s.kind==="captain"?"captain":"piece",x:s.loc.x,y:s.loc.y,vx:0,vy:0,r:Pe(i,s.kind),m:ka(i,s.kind)}));return n.push({id:cr,kind:"shooter",x:t.shooter.x,y:t.shooter.y,vx:t.velocity.x,vy:t.velocity.y,r:Pe(i,"shooter"),m:ka(i,"shooter")}),n}function qh(i,t){return new wh(on(i),Yh(i,t),i.config.physics)}function $h(i,t,e){const n=ra(i,t);if(n)throw new Error(n);Jh(i,e);const s=structuredClone(i),r=s.config.mode==="versus",o=s.current,a=hr(s),c=Mn(i),l=c?t.calledPocket:null;for(const g of s.pieces){if(g.loc.at!=="board")continue;const _=e.positions[g.id];_&&(g.loc={at:"board",x:_.x,y:_.y})}const h={player:o,team:a,rescued:[],lost:[],ownRescued:0,claimed:null,claimOptions:null,shooterSunk:!1,shooterPocket:null,penalty:null,captain:null,foul:null,calledPocket:l,turnContinues:!1,nextPlayer:o,status:"playing",winner:null,timedOut:e.timedOut};let u=null;for(const g of e.pocketed){if(g.id===cr){h.shooterSunk=!0,h.shooterPocket=g.pocket;continue}const _=s.pieces.find(m=>m.id===g.id);_.loc={at:"pocket",pocket:g.pocket,order:++s.pocketSeq},_.kind==="captain"?u=g.pocket:s.pocketRoles[g.pocket]==="shark"?h.lost.push({id:_.id,pocket:g.pocket}):h.rescued.push({id:_.id,type:_.type,pocket:g.pocket,team:-1})}let d=!1,f=!1;if(u!==null&&(!r&&s.pocketRoles[u]==="shark"?(h.captain={pocket:u,result:"eaten"},s.status="lost"):c&&u===l&&!h.shooterSunk?(h.captain={pocket:u,result:"rescued"},s.status="won",s.winner=a):r&&!c?(h.captain={pocket:u,result:"foul"},d=f=!0):(h.captain={pocket:u,result:"returned"},d=!0)),r&&s.status==="playing"&&s.claims[a]===null&&!(f&&s.config.captainFoul==="out")){const g=lr.filter(_=>h.rescued.some(m=>m.type===_)&&sa(s,_)===-1);if(g.length===1)s.claims[a]=g[0],h.claimed=g[0];else if(g.length>1)return h.claimOptions=g,s.pending={report:h,captainReturned:d,foul:f},s.history.push({player:o,input:structuredClone(t)}),s.lastReport=h,{state:s,report:h}}return s.history.push({player:o,input:structuredClone(t)}),_l(s,h,d,f),{state:s,report:h}}function Zh(i,t){if(!i.pending)throw new Error("There is no claim to make");if(!(i.pending.report.claimOptions??[]).includes(t))throw new Error("That Sailor type cannot be claimed");const n=structuredClone(i),{report:s,captainReturned:r,foul:o}=n.pending;return n.pending=null,n.claims[s.team]=t,s.claimed=t,s.claimOptions=null,n.history.push({player:s.player,claim:t}),_l(n,s,r,o),{state:n,report:s}}function _l(i,t,e,n){const s=i.config.mode==="versus",r=t.team,o=i.claims[r];for(const c of t.rescued)c.team=s?sa(i,c.type):0;t.ownRescued=s?t.rescued.filter(c=>o!==null&&c.type===o).length:t.rescued.length;const a=[];if(e&&a.push(i.pieces.find(c=>c.id===yi)),t.shooterSunk&&i.status==="playing"){let c=null;for(const l of i.pieces)l.kind!=="sailor"||!ia(i,l)||s&&(o===null||l.type!==o)||(!c||c.loc.at==="pocket"&&l.loc.at==="pocket"&&l.loc.order>c.loc.order)&&(c=l);c&&(t.penalty=c.id,a.push(c))}for(const c of a){const l=as(i).map(u=>({x:u.loc.x,y:u.loc.y,r:Pe(i,u.kind)})),h=Fh(on(i),l,Pe(i,c.kind));c.loc={at:"board",x:h.x,y:h.y}}if(n&&i.status==="playing"){const c=i.config.captainFoul;if(t.foul={team:r,kind:c},c==="out"){i.out[r]=!0,i.standby===r&&(i.standby=null);const l=i.out.flatMap((h,u)=>h?[]:[u]);l.length===1&&(i.status="won",i.winner=l[0])}else i.standby=r}if(i.status==="playing"){const c=s?t.ownRescued>0:t.rescued.length>0&&t.lost.length===0;t.turnContinues=c&&!t.shooterSunk&&t.captain===null,t.turnContinues?i.shotInTurn++:(i.current=vl(i,i.current),i.turn++,i.shotInTurn=0)}t.nextPlayer=i.current,t.status=i.status,t.winner=i.winner,i.lastReport=t}function vl(i,t){const e=i.config.players.length;for(let n=1;n<=e;n++){const s=(t+n)%e;if(Wh(i,i.config.players[s].team))return s}return t}function Jh(i,t){const e=new Set(as(i).map(s=>s.id));e.add(cr);const n=new Set;for(const s of t.pocketed){if(!e.has(s.id))throw new Error(`Outcome pockets unknown piece ${s.id}`);if(n.has(s.id))throw new Error(`Outcome pockets ${s.id} twice`);if(!Number.isInteger(s.pocket)||s.pocket<0||s.pocket>=pi)throw new Error("Outcome has a bad pocket");n.add(s.id)}for(const s of e){if(n.has(s))continue;const r=t.positions[s];if(!r||!ur(r))throw new Error(`Outcome is missing a position for ${s}`)}}function Kh(i){if(i.status!=="playing")throw new Error("The match is over");if(i.pending)throw new Error("Choose which Sailors to claim first");if(gl(i))throw new Error("The rope is not blocked");const t=structuredClone(i);return t.current=vl(t,t.current),t.turn++,t.shotInTurn=0,t.lastReport=null,t}function jh(i){const t=i;if(!t||typeof t!="object"||t.version!==2)throw new Error("Unsupported save");const e=na(t.config);if(!Array.isArray(t.pieces)||t.pieces.length!==e.pieces.length)throw new Error("Corrupt save: pieces");const n=new Set(e.pieces.map(r=>r.id));for(const r of t.pieces){if(!n.has(r.id))throw new Error("Corrupt save: unknown piece");if(r.loc.at==="board"&&!ur(r.loc))throw new Error("Corrupt save: position");if(r.loc.at==="pocket"&&!(Number.isInteger(r.loc.pocket)&&r.loc.pocket>=0&&r.loc.pocket<pi))throw new Error("Corrupt save: pocket")}const s=e.config.teams.length;if(!Array.isArray(t.claims)||t.claims.length!==s||t.claims.some(r=>r!==null&&!lr.includes(r)))throw new Error("Corrupt save: claims");if(!Array.isArray(t.out)||t.out.length!==s)throw new Error("Corrupt save: teams");if(!Number.isInteger(t.current)||t.current<0||t.current>=e.config.players.length)throw new Error("Corrupt save: current player");return{...t,config:e.config,seats:e.seats,pocketRoles:e.pocketRoles}}const ro=Object.freeze([{name:"Red Crew",color:"#e5484d"},{name:"Blue Crew",color:"#3b8be0"},{name:"Gold Crew",color:"#e7b73c"}]);function oo(i){const t=[],e=(n,s,r,o)=>{if(s===0){n===0&&t.push(o);return}for(let a=Math.min(n-(s-1),r);a>=1;a--)e(n-a,s-1,a,[...o,a])};for(const n of[2,3])i>=n&&e(i,n,i,[]);return t}function vr(i){const t=oo(i);if(t.length===0)return null;const e=n=>Math.max(...n)-Math.min(...n);return[...t].sort((n,s)=>e(n)-e(s)||n.length-s.length)[0]}function Qh(i){return i.join(" v ")}function xl(i){const t=[...i],e=t.reduce((s,r)=>s+r,0),n=[];for(let s=0;s<e;s++){const r=n[s-1],o=s===e-1?n[0]:void 0;let a=-1;for(const c of[!0,!1]){for(let l=0;l<t.length;l++)t[l]===0||l===r||c&&l===o||(a===-1||t[l]>t[a])&&(a=l);if(a!==-1)break}a===-1&&(a=t.findIndex(c=>c>0)),n.push(a),t[a]--}return n}function tu(i,t=[],e={}){if(i.length<2||i.length>3)throw new Error("Versus needs 2 or 3 teams");const s=xl(i).map((r,o)=>({name:t[o]??`Player ${o+1}`,team:r}));return{...e,mode:"versus",teams:ro.slice(0,i.length).map(r=>({...r})),players:s}}function eu(i,t=[],e={}){const n=Array.from({length:i},(s,r)=>({name:t[r]??`Player ${r+1}`,team:0}));return{...e,mode:"coop",teams:[{name:"Crew",color:"#e7b73c"}],players:n}}function nu(i,t,e,n,s,r=4){const o=Math.hypot(n.x,n.y);if(!(o>0))return{point:{...e},distance:0,hit:null};const a=n.x/o,c=n.y/o;let l=r,h=null;for(const u of t){const d=xr(e,a,c,u,s+u.r);if(d!==null&&d<l){l=d;const f=e.x+a*d,g=e.y+c*d,_=u.x-f,m=u.y-g,p=Math.hypot(_,m)||1;h={type:"piece",id:u.id,push:{x:_/p,y:m/p}}}}for(const u of i.rails){const d=u.normal.x*a+u.normal.y*c;if(d>=0)continue;const f=u.normal.x*e.x+u.normal.y*e.y+u.offset,g=(s-f)/d;g>=0&&g<l&&(l=g,h={type:"rail",side:u.side})}i.posts.forEach((u,d)=>{const f=xr(e,a,c,u,s+i.spec.postRadius);f!==null&&f<l&&(l=f,h={type:"post",post:d})});for(let u=0;u<i.pockets.length;u++){const d=xr(e,a,c,i.pockets[u],i.spec.pocketRadius);d!==null&&d<l&&(l=d,h={type:"pocket",pocket:u})}return{point:{x:e.x+a*l,y:e.y+c*l},distance:l,hit:h}}function xr(i,t,e,n,s){const r=i.x-n.x,o=i.y-n.y,a=r*t+o*e,c=r*r+o*o-s*s;if(c<=0)return 0;if(a>=0)return null;const l=a*a-c;return l<0?null:-a-Math.sqrt(l)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oa="170",iu=0,Ha=1,su=2,yl=1,Ml=2,nn=3,Cn=0,we=1,an=2,Tn=0,mi=1,Va=2,Ga=3,Wa=4,ru=5,kn=100,ou=101,au=102,cu=103,lu=104,hu=200,uu=201,fu=202,du=203,ao=204,co=205,pu=206,mu=207,gu=208,_u=209,vu=210,xu=211,yu=212,Mu=213,Su=214,lo=0,ho=1,uo=2,Mi=3,fo=4,po=5,mo=6,go=7,Sl=0,Eu=1,bu=2,An=0,wu=1,Tu=2,Au=3,El=4,Ru=5,Cu=6,Pu=7,bl=300,Si=301,Ei=302,_o=303,vo=304,fr=306,ir=1e3,Hn=1001,sr=1002,Ve=1003,Lu=1004,xs=1005,Xe=1006,yr=1007,Vn=1008,un=1009,wl=1010,Tl=1011,Ji=1012,aa=1013,Xn=1014,cn=1015,cs=1016,ca=1017,la=1018,bi=1020,Al=35902,Rl=1021,Cl=1022,He=1023,Pl=1024,Ll=1025,gi=1026,wi=1027,Dl=1028,ha=1029,Il=1030,ua=1031,fa=1033,qs=33776,$s=33777,Zs=33778,Js=33779,xo=35840,yo=35841,Mo=35842,So=35843,Eo=36196,bo=37492,wo=37496,To=37808,Ao=37809,Ro=37810,Co=37811,Po=37812,Lo=37813,Do=37814,Io=37815,Uo=37816,No=37817,Fo=37818,Oo=37819,Bo=37820,ko=37821,Ks=36492,zo=36494,Ho=36495,Ul=36283,Vo=36284,Go=36285,Wo=36286,Du=3200,Iu=3201,Nl=0,Uu=1,Sn="",be="srgb",Ci="srgb-linear",dr="linear",Qt="srgb",Jn=7680,Xa=519,Nu=512,Fu=513,Ou=514,Fl=515,Bu=516,ku=517,zu=518,Hu=519,Ya=35044,qa="300 es",ln=2e3,rr=2001;class Pi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const _e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $a=1234567;const Gi=Math.PI/180,Ki=180/Math.PI;function $n(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]).toLowerCase()}function pe(i,t,e){return Math.max(t,Math.min(e,i))}function da(i,t){return(i%t+t)%t}function Vu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Gu(i,t,e){return i!==t?(e-i)/(t-i):0}function Wi(i,t,e){return(1-e)*i+e*t}function Wu(i,t,e,n){return Wi(i,t,1-Math.exp(-e*n))}function Xu(i,t=1){return t-Math.abs(da(i,t*2)-t)}function Yu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function qu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function $u(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Zu(i,t){return i+Math.random()*(t-i)}function Ju(i){return i*(.5-Math.random())}function Ku(i){i!==void 0&&($a=i);let t=$a+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ju(i){return i*Gi}function Qu(i){return i*Ki}function tf(i){return(i&i-1)===0&&i!==0}function ef(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function nf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function sf(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ui(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ui={DEG2RAD:Gi,RAD2DEG:Ki,generateUUID:$n,clamp:pe,euclideanModulo:da,mapLinear:Vu,inverseLerp:Gu,lerp:Wi,damp:Wu,pingpong:Xu,smoothstep:Yu,smootherstep:qu,randInt:$u,randFloat:Zu,randFloatSpread:Ju,seededRandom:Ku,degToRad:ju,radToDeg:Qu,isPowerOfTwo:tf,ceilPowerOfTwo:ef,floorPowerOfTwo:nf,setQuaternionFromProperEuler:sf,normalize:Me,denormalize:ui};class et{constructor(t=0,e=0){et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kt{constructor(t,e,n,s,r,o,a,c,l){kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],b=s[1],S=s[4],y=s[7],N=s[2],R=s[5],A=s[8];return r[0]=o*_+a*b+c*N,r[3]=o*m+a*S+c*R,r[6]=o*p+a*y+c*A,r[1]=l*_+h*b+u*N,r[4]=l*m+h*S+u*R,r[7]=l*p+h*y+u*A,r[2]=d*_+f*b+g*N,r[5]=d*m+f*S+g*R,r[8]=d*p+f*y+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Mr.makeScale(t,e)),this}rotate(t){return this.premultiply(Mr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Mr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Mr=new kt;function Ol(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ji(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function rf(){const i=ji("canvas");return i.style.display="block",i}const Za={};function zi(i){i in Za||(Za[i]=!0,console.warn(i))}function of(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function af(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function cf(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:Ci,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Qt&&(i.r=hn(i.r),i.g=hn(i.g),i.b=hn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Qt&&(i.r=_i(i.r),i.g=_i(i.g),i.b=_i(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Sn?dr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function hn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ja=[.64,.33,.3,.6,.15,.06],Ka=[.2126,.7152,.0722],ja=[.3127,.329],Qa=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tc=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[Ci]:{primaries:Ja,whitePoint:ja,transfer:dr,toXYZ:Qa,fromXYZ:tc,luminanceCoefficients:Ka,workingColorSpaceConfig:{unpackColorSpace:be},outputColorSpaceConfig:{drawingBufferColorSpace:be}},[be]:{primaries:Ja,whitePoint:ja,transfer:Qt,toXYZ:Qa,fromXYZ:tc,luminanceCoefficients:Ka,outputColorSpaceConfig:{drawingBufferColorSpace:be}}});let Kn;class lf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Kn===void 0&&(Kn=ji("canvas")),Kn.width=t.width,Kn.height=t.height;const n=Kn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Kn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ji("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=hn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hn(e[n]/255)*255):e[n]=hn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let hf=0;class Bl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=$n(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Sr(s[o].image)):r.push(Sr(s[o]))}else r=Sr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Sr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?lf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let uf=0;class ye extends Pi{constructor(t=ye.DEFAULT_IMAGE,e=ye.DEFAULT_MAPPING,n=Hn,s=Hn,r=Xe,o=Vn,a=He,c=un,l=ye.DEFAULT_ANISOTROPY,h=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=$n(),this.name="",this.source=new Bl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ir:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case sr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ir:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case sr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ye.DEFAULT_IMAGE=null;ye.DEFAULT_MAPPING=bl;ye.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,n=0,s=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,y=(f+1)/2,N=(p+1)/2,R=(h+d)/4,A=(u+_)/4,P=(g+m)/4;return S>y&&S>N?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=R/n,r=A/n):y>N?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=R/s,r=P/s):N<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),n=A/r,s=P/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ff extends Pi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new ye(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Bl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yn extends ff{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class kl extends ye{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class df extends ye{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ls{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*_,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const N=Math.sqrt(S),R=Math.atan2(N,p*b);m=Math.sin(m*R)/N,a=Math.sin(a*R)/N}const y=a*b;if(c=c*m+d*y,l=l*m+f*y,h=h*m+g*y,u=u*m+_*y,m===1-a){const N=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=N,l*=N,h*=N,u*=N}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ec.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ec.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Er.copy(this).projectOnVector(t),this.sub(Er)}reflect(t){return this.sub(Er.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Er=new L,ec=new ls;class hs{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Oe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Oe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Oe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Oe):Oe.fromBufferAttribute(r,o),Oe.applyMatrix4(t.matrixWorld),this.expandByPoint(Oe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ys.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ys.copy(n.boundingBox)),ys.applyMatrix4(t.matrixWorld),this.union(ys)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Oe),Oe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ni),Ms.subVectors(this.max,Ni),jn.subVectors(t.a,Ni),Qn.subVectors(t.b,Ni),ti.subVectors(t.c,Ni),pn.subVectors(Qn,jn),mn.subVectors(ti,Qn),Dn.subVectors(jn,ti);let e=[0,-pn.z,pn.y,0,-mn.z,mn.y,0,-Dn.z,Dn.y,pn.z,0,-pn.x,mn.z,0,-mn.x,Dn.z,0,-Dn.x,-pn.y,pn.x,0,-mn.y,mn.x,0,-Dn.y,Dn.x,0];return!br(e,jn,Qn,ti,Ms)||(e=[1,0,0,0,1,0,0,0,1],!br(e,jn,Qn,ti,Ms))?!1:(Ss.crossVectors(pn,mn),e=[Ss.x,Ss.y,Ss.z],br(e,jn,Qn,ti,Ms))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Oe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Oe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ke[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ke[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ke[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ke[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ke[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ke[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ke[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ke[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ke),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ke=[new L,new L,new L,new L,new L,new L,new L,new L],Oe=new L,ys=new hs,jn=new L,Qn=new L,ti=new L,pn=new L,mn=new L,Dn=new L,Ni=new L,Ms=new L,Ss=new L,In=new L;function br(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){In.fromArray(i,r);const a=s.x*Math.abs(In.x)+s.y*Math.abs(In.y)+s.z*Math.abs(In.z),c=t.dot(In),l=e.dot(In),h=n.dot(In);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const pf=new hs,Fi=new L,wr=new L;class pa{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):pf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fi.subVectors(t,this.center);const e=Fi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Fi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fi.copy(t.center).add(wr)),this.expandByPoint(Fi.copy(t.center).sub(wr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const je=new L,Tr=new L,Es=new L,gn=new L,Ar=new L,bs=new L,Rr=new L;class zl{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,je)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=je.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(je.copy(this.origin).addScaledVector(this.direction,e),je.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Tr.copy(t).add(e).multiplyScalar(.5),Es.copy(e).sub(t).normalize(),gn.copy(this.origin).sub(Tr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Es),a=gn.dot(this.direction),c=-gn.dot(Es),l=gn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Tr).addScaledVector(Es,d),f}intersectSphere(t,e){je.subVectors(t.center,this.origin);const n=je.dot(this.direction),s=je.dot(je)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,je)!==null}intersectTriangle(t,e,n,s,r){Ar.subVectors(e,t),bs.subVectors(n,t),Rr.crossVectors(Ar,bs);let o=this.direction.dot(Rr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gn.subVectors(this.origin,t);const c=a*this.direction.dot(bs.crossVectors(gn,bs));if(c<0)return null;const l=a*this.direction.dot(Ar.cross(gn));if(l<0||c+l>o)return null;const h=-a*gn.dot(Rr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ei.setFromMatrixColumn(t,0).length(),r=1/ei.setFromMatrixColumn(t,1).length(),o=1/ei.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mf,t,gf)}lookAt(t,e,n){const s=this.elements;return Re.subVectors(t,e),Re.lengthSq()===0&&(Re.z=1),Re.normalize(),_n.crossVectors(n,Re),_n.lengthSq()===0&&(Math.abs(n.z)===1?Re.x+=1e-4:Re.z+=1e-4,Re.normalize(),_n.crossVectors(n,Re)),_n.normalize(),ws.crossVectors(Re,_n),s[0]=_n.x,s[4]=ws.x,s[8]=Re.x,s[1]=_n.y,s[5]=ws.y,s[9]=Re.y,s[2]=_n.z,s[6]=ws.z,s[10]=Re.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],S=n[7],y=n[11],N=n[15],R=s[0],A=s[4],P=s[8],E=s[12],x=s[1],C=s[5],z=s[9],O=s[13],H=s[2],X=s[6],V=s[10],J=s[14],G=s[3],ct=s[7],dt=s[11],xt=s[15];return r[0]=o*R+a*x+c*H+l*G,r[4]=o*A+a*C+c*X+l*ct,r[8]=o*P+a*z+c*V+l*dt,r[12]=o*E+a*O+c*J+l*xt,r[1]=h*R+u*x+d*H+f*G,r[5]=h*A+u*C+d*X+f*ct,r[9]=h*P+u*z+d*V+f*dt,r[13]=h*E+u*O+d*J+f*xt,r[2]=g*R+_*x+m*H+p*G,r[6]=g*A+_*C+m*X+p*ct,r[10]=g*P+_*z+m*V+p*dt,r[14]=g*E+_*O+m*J+p*xt,r[3]=b*R+S*x+y*H+N*G,r[7]=b*A+S*C+y*X+N*ct,r[11]=b*P+S*z+y*V+N*dt,r[15]=b*E+S*O+y*J+N*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+_*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=u*m*l-_*d*l+_*c*f-a*m*f-u*c*p+a*d*p,S=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,y=h*_*l-g*u*l+g*a*f-o*_*f-h*a*p+o*u*p,N=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,R=e*b+n*S+s*y+r*N;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=b*A,t[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*A,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*A,t[4]=S*A,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*A,t[8]=y*A,t[9]=(g*u*r-h*_*r-g*n*f+e*_*f+h*n*p-e*u*p)*A,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*A,t[12]=N*A,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,b=c*l,S=c*h,y=c*u,N=n.x,R=n.y,A=n.z;return s[0]=(1-(_+p))*N,s[1]=(f+y)*N,s[2]=(g-S)*N,s[3]=0,s[4]=(f-y)*R,s[5]=(1-(d+p))*R,s[6]=(m+b)*R,s[7]=0,s[8]=(g+S)*A,s[9]=(m-b)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ei.set(s[0],s[1],s[2]).length();const o=ei.set(s[4],s[5],s[6]).length(),a=ei.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Be.copy(this);const l=1/r,h=1/o,u=1/a;return Be.elements[0]*=l,Be.elements[1]*=l,Be.elements[2]*=l,Be.elements[4]*=h,Be.elements[5]*=h,Be.elements[6]*=h,Be.elements[8]*=u,Be.elements[9]*=u,Be.elements[10]*=u,e.setFromRotationMatrix(Be),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ln){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===ln)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===rr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ln){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h;let g,_;if(a===ln)g=(o+r)*u,_=-2*u;else if(a===rr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ei=new L,Be=new se,mf=new L(0,0,0),gf=new L(1,1,1),_n=new L,ws=new L,Re=new L,nc=new se,ic=new ls;class qe{constructor(t=0,e=0,n=0,s=qe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(pe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-pe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(pe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-pe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(pe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return nc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ic.setFromEuler(this),this.setFromQuaternion(ic,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qe.DEFAULT_ORDER="XYZ";class ma{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let _f=0;const sc=new L,ni=new ls,Qe=new se,Ts=new L,Oi=new L,vf=new L,xf=new ls,rc=new L(1,0,0),oc=new L(0,1,0),ac=new L(0,0,1),cc={type:"added"},yf={type:"removed"},ii={type:"childadded",child:null},Cr={type:"childremoved",child:null};class me extends Pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=me.DEFAULT_UP.clone();const t=new L,e=new qe,n=new ls,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new kt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ma,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ni.setFromAxisAngle(t,e),this.quaternion.multiply(ni),this}rotateOnWorldAxis(t,e){return ni.setFromAxisAngle(t,e),this.quaternion.premultiply(ni),this}rotateX(t){return this.rotateOnAxis(rc,t)}rotateY(t){return this.rotateOnAxis(oc,t)}rotateZ(t){return this.rotateOnAxis(ac,t)}translateOnAxis(t,e){return sc.copy(t).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(rc,t)}translateY(t){return this.translateOnAxis(oc,t)}translateZ(t){return this.translateOnAxis(ac,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qe.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ts.copy(t):Ts.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qe.lookAt(Oi,Ts,this.up):Qe.lookAt(Ts,Oi,this.up),this.quaternion.setFromRotationMatrix(Qe),s&&(Qe.extractRotation(s.matrixWorld),ni.setFromRotationMatrix(Qe),this.quaternion.premultiply(ni.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(cc),ii.child=t,this.dispatchEvent(ii),ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yf),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qe.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qe.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qe),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(cc),ii.child=t,this.dispatchEvent(ii),ii.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,t,vf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,xf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}me.DEFAULT_UP=new L(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ke=new L,tn=new L,Pr=new L,en=new L,si=new L,ri=new L,lc=new L,Lr=new L,Dr=new L,Ir=new L,Ur=new le,Nr=new le,Fr=new le;class ze{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ke.subVectors(t,e),s.cross(ke);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ke.subVectors(s,e),tn.subVectors(n,e),Pr.subVectors(t,e);const o=ke.dot(ke),a=ke.dot(tn),c=ke.dot(Pr),l=tn.dot(tn),h=tn.dot(Pr),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,en)===null?!1:en.x>=0&&en.y>=0&&en.x+en.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,en)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,en.x),c.addScaledVector(o,en.y),c.addScaledVector(a,en.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Ur.setScalar(0),Nr.setScalar(0),Fr.setScalar(0),Ur.fromBufferAttribute(t,e),Nr.fromBufferAttribute(t,n),Fr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ur,r.x),o.addScaledVector(Nr,r.y),o.addScaledVector(Fr,r.z),o}static isFrontFacing(t,e,n,s){return ke.subVectors(n,e),tn.subVectors(t,e),ke.cross(tn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ke.subVectors(this.c,this.b),tn.subVectors(this.a,this.b),ke.cross(tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ze.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;si.subVectors(s,n),ri.subVectors(r,n),Lr.subVectors(t,n);const c=si.dot(Lr),l=ri.dot(Lr);if(c<=0&&l<=0)return e.copy(n);Dr.subVectors(t,s);const h=si.dot(Dr),u=ri.dot(Dr);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(si,o);Ir.subVectors(t,r);const f=si.dot(Ir),g=ri.dot(Ir);if(g>=0&&f<=g)return e.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ri,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return lc.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(lc,a);const p=1/(m+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(si,o).addScaledVector(ri,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vn={h:0,s:0,l:0},As={h:0,s:0,l:0};function Or(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=da(t,1),e=pe(e,0,1),n=pe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Or(o,r,t+1/3),this.g=Or(o,r,t),this.b=Or(o,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=be){const n=Hl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hn(t.r),this.g=hn(t.g),this.b=hn(t.b),this}copyLinearToSRGB(t){return this.r=_i(t.r),this.g=_i(t.g),this.b=_i(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=be){return qt.fromWorkingColorSpace(ve.copy(this),t),Math.round(pe(ve.r*255,0,255))*65536+Math.round(pe(ve.g*255,0,255))*256+Math.round(pe(ve.b*255,0,255))}getHexString(t=be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(ve.copy(this),e);const n=ve.r,s=ve.g,r=ve.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(ve.copy(this),e),t.r=ve.r,t.g=ve.g,t.b=ve.b,t}getStyle(t=be){qt.fromWorkingColorSpace(ve.copy(this),t);const e=ve.r,n=ve.g,s=ve.b;return t!==be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(vn),this.setHSL(vn.h+t,vn.s+e,vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(vn),t.getHSL(As);const n=Wi(vn.h,As.h,e),s=Wi(vn.s,As.s,e),r=Wi(vn.l,As.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ve=new Wt;Wt.NAMES=Hl;let Mf=0;class us extends Pi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=$n(),this.name="",this.blending=mi,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ao,this.blendDst=co,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jn,this.stencilZFail=Jn,this.stencilZPass=Jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==mi&&(n.blending=this.blending),this.side!==Cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ao&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Jn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Jn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Jn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class or extends us{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.combine=Sl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const he=new L,Rs=new et;class Ye{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ya,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Rs.fromBufferAttribute(this,e),Rs.applyMatrix3(t),this.setXY(e,Rs.x,Rs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ui(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ui(e,this.array)),e}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ui(e,this.array)),e}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ui(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ui(e,this.array)),e}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),s=Me(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),s=Me(s,this.array),r=Me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ya&&(t.usage=this.usage),t}}class Vl extends Ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Gl extends Ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class re extends Ye{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Sf=0;const Ie=new se,Br=new me,oi=new L,Ce=new hs,Bi=new hs,de=new L;class Le extends Pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ol(t)?Gl:Vl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ie.makeRotationFromQuaternion(t),this.applyMatrix4(Ie),this}rotateX(t){return Ie.makeRotationX(t),this.applyMatrix4(Ie),this}rotateY(t){return Ie.makeRotationY(t),this.applyMatrix4(Ie),this}rotateZ(t){return Ie.makeRotationZ(t),this.applyMatrix4(Ie),this}translate(t,e,n){return Ie.makeTranslation(t,e,n),this.applyMatrix4(Ie),this}scale(t,e,n){return Ie.makeScale(t,e,n),this.applyMatrix4(Ie),this}lookAt(t){return Br.lookAt(t),Br.updateMatrix(),this.applyMatrix4(Br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oi).negate(),this.translate(oi.x,oi.y,oi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new re(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ce.setFromBufferAttribute(r),this.morphTargetsRelative?(de.addVectors(this.boundingBox.min,Ce.min),this.boundingBox.expandByPoint(de),de.addVectors(this.boundingBox.max,Ce.max),this.boundingBox.expandByPoint(de)):(this.boundingBox.expandByPoint(Ce.min),this.boundingBox.expandByPoint(Ce.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Ce.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Bi.setFromBufferAttribute(a),this.morphTargetsRelative?(de.addVectors(Ce.min,Bi.min),Ce.expandByPoint(de),de.addVectors(Ce.max,Bi.max),Ce.expandByPoint(de)):(Ce.expandByPoint(Bi.min),Ce.expandByPoint(Bi.max))}Ce.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)de.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(de));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)de.fromBufferAttribute(a,l),c&&(oi.fromBufferAttribute(t,l),de.add(oi)),s=Math.max(s,n.distanceToSquared(de))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new L,c[P]=new L;const l=new L,h=new L,u=new L,d=new et,f=new et,g=new et,_=new L,m=new L;function p(P,E,x){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,x),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(C),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),a[P].add(_),a[E].add(_),a[x].add(_),c[P].add(m),c[E].add(m),c[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,E=b.length;P<E;++P){const x=b[P],C=x.start,z=x.count;for(let O=C,H=C+z;O<H;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const S=new L,y=new L,N=new L,R=new L;function A(P){N.fromBufferAttribute(s,P),R.copy(N);const E=a[P];S.copy(E),S.sub(N.multiplyScalar(N.dot(E))).normalize(),y.crossVectors(R,E);const C=y.dot(c[P])<0?-1:1;o.setXYZW(P,S.x,S.y,S.z,C)}for(let P=0,E=b.length;P<E;++P){const x=b[P],C=x.start,z=x.count;for(let O=C,H=C+z;O<H;O+=3)A(t.getX(O+0)),A(t.getX(O+1)),A(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)de.fromBufferAttribute(t,e),de.normalize(),t.setXYZ(e,de.x,de.y,de.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ye(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Le,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hc=new se,Un=new zl,Cs=new pa,uc=new L,Ps=new L,Ls=new L,Ds=new L,kr=new L,Is=new L,fc=new L,Us=new L;class jt extends me{constructor(t=new Le,e=new or){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Is.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(kr.fromBufferAttribute(u,t),o?Is.addScaledVector(kr,h):Is.addScaledVector(kr.sub(e),h))}e.add(Is)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere),Cs.applyMatrix4(r),Un.copy(t.ray).recast(t.near),!(Cs.containsPoint(Un.origin)===!1&&(Un.intersectSphere(Cs,uc)===null||Un.origin.distanceToSquared(uc)>(t.far-t.near)**2))&&(hc.copy(r).invert(),Un.copy(t.ray).applyMatrix4(hc),!(n.boundingBox!==null&&Un.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Un)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),S=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=b,N=S;y<N;y+=3){const R=a.getX(y),A=a.getX(y+1),P=a.getX(y+2);s=Ns(this,p,t,n,l,h,u,R,A,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),S=a.getX(m+1),y=a.getX(m+2);s=Ns(this,o,t,n,l,h,u,b,S,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=b,N=S;y<N;y+=3){const R=y,A=y+1,P=y+2;s=Ns(this,p,t,n,l,h,u,R,A,P),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=m,S=m+1,y=m+2;s=Ns(this,o,t,n,l,h,u,b,S,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Ef(i,t,e,n,s,r,o,a){let c;if(t.side===we?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Cn,a),c===null)return null;Us.copy(a),Us.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Us);return l<e.near||l>e.far?null:{distance:l,point:Us.clone(),object:i}}function Ns(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Ps),i.getVertexPosition(c,Ls),i.getVertexPosition(l,Ds);const h=Ef(i,t,e,n,Ps,Ls,Ds,fc);if(h){const u=new L;ze.getBarycoord(fc,Ps,Ls,Ds,u),s&&(h.uv=ze.getInterpolatedAttribute(s,a,c,l,u,new et)),r&&(h.uv1=ze.getInterpolatedAttribute(r,a,c,l,u,new et)),o&&(h.normal=ze.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new L,materialIndex:0};ze.getNormal(Ps,Ls,Ds,d.normal),h.face=d,h.barycoord=u}return h}class fs extends Le{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new re(l,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(u,2));function g(_,m,p,b,S,y,N,R,A,P,E){const x=y/A,C=N/P,z=y/2,O=N/2,H=R/2,X=A+1,V=P+1;let J=0,G=0;const ct=new L;for(let dt=0;dt<V;dt++){const xt=dt*C-O;for(let Ut=0;Ut<X;Ut++){const Xt=Ut*x-z;ct[_]=Xt*b,ct[m]=xt*S,ct[p]=H,l.push(ct.x,ct.y,ct.z),ct[_]=0,ct[m]=0,ct[p]=R>0?1:-1,h.push(ct.x,ct.y,ct.z),u.push(Ut/A),u.push(1-dt/P),J+=1}}for(let dt=0;dt<P;dt++)for(let xt=0;xt<A;xt++){const Ut=d+xt+X*dt,Xt=d+xt+X*(dt+1),q=d+(xt+1)+X*(dt+1),rt=d+(xt+1)+X*dt;c.push(Ut,Xt,rt),c.push(Xt,q,rt),G+=6}a.addGroup(f,G,E),f+=G,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ti(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Se(i){const t={};for(let e=0;e<i.length;e++){const n=Ti(i[e]);for(const s in n)t[s]=n[s]}return t}function bf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Wl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const wf={clone:Ti,merge:Se};var Tf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends us{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tf,this.fragmentShader=Af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ti(t.uniforms),this.uniformsGroups=bf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Xl extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=ln}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xn=new L,dc=new et,pc=new et;class Ue extends Xl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ki*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ki*2*Math.atan(Math.tan(Gi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(xn.x,xn.y).multiplyScalar(-t/xn.z),xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xn.x,xn.y).multiplyScalar(-t/xn.z)}getViewSize(t,e){return this.getViewBounds(t,dc,pc),e.subVectors(pc,dc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Gi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,ci=1;class Rf extends me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ue(ai,ci,t,e);s.layers=this.layers,this.add(s);const r=new Ue(ai,ci,t,e);r.layers=this.layers,this.add(r);const o=new Ue(ai,ci,t,e);o.layers=this.layers,this.add(o);const a=new Ue(ai,ci,t,e);a.layers=this.layers,this.add(a);const c=new Ue(ai,ci,t,e);c.layers=this.layers,this.add(c);const l=new Ue(ai,ci,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Yl extends ye{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Si,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Cf extends Yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Yl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Xe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fs(5,5,5),r=new Pn({name:"CubemapFromEquirect",uniforms:Ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:we,blending:Tn});r.uniforms.tEquirect.value=e;const o=new jt(s,r),a=e.minFilter;return e.minFilter===Vn&&(e.minFilter=Xe),new Rf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const zr=new L,Pf=new L,Lf=new kt;class yn{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=zr.subVectors(n,e).cross(Pf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(zr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Lf.getNormalMatrix(t),s=this.coplanarPoint(zr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new pa,Fs=new L;class ga{constructor(t=new yn,e=new yn,n=new yn,s=new yn,r=new yn,o=new yn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ln){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],b=s[13],S=s[14],y=s[15];if(n[0].setComponents(c-r,d-l,m-f,y-p).normalize(),n[1].setComponents(c+r,d+l,m+f,y+p).normalize(),n[2].setComponents(c+o,d+h,m+g,y+b).normalize(),n[3].setComponents(c-o,d-h,m-g,y-b).normalize(),n[4].setComponents(c-a,d-u,m-_,y-S).normalize(),e===ln)n[5].setComponents(c+a,d+u,m+_,y+S).normalize();else if(e===rr)n[5].setComponents(a,u,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(t){return Nn.center.set(0,0,0),Nn.radius=.7071067811865476,Nn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Fs.x=s.normal.x>0?t.max.x:t.min.x,Fs.y=s.normal.y>0?t.max.y:t.min.y,Fs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Fs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ql(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Df(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class ds extends Le{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const b=p*d-o;for(let S=0;S<l;S++){const y=S*u-r;g.push(y,-b,0),_.push(0,0,1),m.push(S/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){const S=b+l*p,y=b+l*(p+1),N=b+1+l*(p+1),R=b+1+l*p;f.push(S,y,R),f.push(y,N,R)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(_,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ds(t.width,t.height,t.widthSegments,t.heightSegments)}}var If=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Uf=`#ifdef USE_ALPHAHASH
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
#endif`,Nf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ff=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Of=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kf=`#ifdef USE_AOMAP
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
#endif`,zf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hf=`#ifdef USE_BATCHING
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
#endif`,Vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yf=`#ifdef USE_IRIDESCENCE
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
#endif`,qf=`#ifdef USE_BUMPMAP
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
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,td=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ed=`#if defined( USE_COLOR_ALPHA )
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
#endif`,nd=`#define PI 3.141592653589793
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
} // validated`,id=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sd=`vec3 transformedNormal = objectNormal;
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
#endif`,rd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,od=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ad=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ld="gl_FragColor = linearToOutputTexel( gl_FragColor );",hd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ud=`#ifdef USE_ENVMAP
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
#endif`,fd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,dd=`#ifdef USE_ENVMAP
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
#endif`,pd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,md=`#ifdef USE_ENVMAP
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
#endif`,gd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_d=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yd=`#ifdef USE_GRADIENTMAP
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
}`,Md=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ed=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bd=`uniform bool receiveShadow;
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
#endif`,wd=`#ifdef USE_ENVMAP
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
#endif`,Td=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ad=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pd=`PhysicalMaterial material;
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
#endif`,Ld=`struct PhysicalMaterial {
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
}`,Dd=`
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
#endif`,Id=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ud=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Od=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vd=`#if defined( USE_POINTS_UV )
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
#endif`,Gd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$d=`#ifdef USE_MORPHTARGETS
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
#endif`,Zd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ep=`#ifdef USE_NORMALMAP
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
#endif`,np=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ip=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,op=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ap=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_p=`float getShadowMask() {
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
}`,vp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xp=`#ifdef USE_SKINNING
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
#endif`,yp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mp=`#ifdef USE_SKINNING
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
#endif`,Sp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ep=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tp=`#ifdef USE_TRANSMISSION
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
#endif`,Ap=`#ifdef USE_TRANSMISSION
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
#endif`,Rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ip=`uniform sampler2D t2D;
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
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Np=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`#include <common>
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
}`,kp=`#if DEPTH_PACKING == 3200
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
}`,zp=`#define DISTANCE
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
}`,Hp=`#define DISTANCE
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
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`uniform float scale;
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
}`,Xp=`uniform vec3 diffuse;
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
}`,Yp=`#include <common>
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
}`,qp=`uniform vec3 diffuse;
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
}`,$p=`#define LAMBERT
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
}`,Zp=`#define LAMBERT
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
}`,Jp=`#define MATCAP
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
}`,Kp=`#define MATCAP
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
}`,jp=`#define NORMAL
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
}`,Qp=`#define NORMAL
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
}`,tm=`#define PHONG
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
}`,em=`#define PHONG
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
}`,nm=`#define STANDARD
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
}`,im=`#define STANDARD
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
}`,sm=`#define TOON
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
}`,rm=`#define TOON
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
}`,om=`uniform float size;
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
}`,am=`uniform vec3 diffuse;
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
}`,cm=`#include <common>
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
}`,lm=`uniform vec3 color;
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
}`,hm=`uniform float rotation;
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
}`,um=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:If,alphahash_pars_fragment:Uf,alphamap_fragment:Nf,alphamap_pars_fragment:Ff,alphatest_fragment:Of,alphatest_pars_fragment:Bf,aomap_fragment:kf,aomap_pars_fragment:zf,batching_pars_vertex:Hf,batching_vertex:Vf,begin_vertex:Gf,beginnormal_vertex:Wf,bsdfs:Xf,iridescence_fragment:Yf,bumpmap_pars_fragment:qf,clipping_planes_fragment:$f,clipping_planes_pars_fragment:Zf,clipping_planes_pars_vertex:Jf,clipping_planes_vertex:Kf,color_fragment:jf,color_pars_fragment:Qf,color_pars_vertex:td,color_vertex:ed,common:nd,cube_uv_reflection_fragment:id,defaultnormal_vertex:sd,displacementmap_pars_vertex:rd,displacementmap_vertex:od,emissivemap_fragment:ad,emissivemap_pars_fragment:cd,colorspace_fragment:ld,colorspace_pars_fragment:hd,envmap_fragment:ud,envmap_common_pars_fragment:fd,envmap_pars_fragment:dd,envmap_pars_vertex:pd,envmap_physical_pars_fragment:wd,envmap_vertex:md,fog_vertex:gd,fog_pars_vertex:_d,fog_fragment:vd,fog_pars_fragment:xd,gradientmap_pars_fragment:yd,lightmap_pars_fragment:Md,lights_lambert_fragment:Sd,lights_lambert_pars_fragment:Ed,lights_pars_begin:bd,lights_toon_fragment:Td,lights_toon_pars_fragment:Ad,lights_phong_fragment:Rd,lights_phong_pars_fragment:Cd,lights_physical_fragment:Pd,lights_physical_pars_fragment:Ld,lights_fragment_begin:Dd,lights_fragment_maps:Id,lights_fragment_end:Ud,logdepthbuf_fragment:Nd,logdepthbuf_pars_fragment:Fd,logdepthbuf_pars_vertex:Od,logdepthbuf_vertex:Bd,map_fragment:kd,map_pars_fragment:zd,map_particle_fragment:Hd,map_particle_pars_fragment:Vd,metalnessmap_fragment:Gd,metalnessmap_pars_fragment:Wd,morphinstance_vertex:Xd,morphcolor_vertex:Yd,morphnormal_vertex:qd,morphtarget_pars_vertex:$d,morphtarget_vertex:Zd,normal_fragment_begin:Jd,normal_fragment_maps:Kd,normal_pars_fragment:jd,normal_pars_vertex:Qd,normal_vertex:tp,normalmap_pars_fragment:ep,clearcoat_normal_fragment_begin:np,clearcoat_normal_fragment_maps:ip,clearcoat_pars_fragment:sp,iridescence_pars_fragment:rp,opaque_fragment:op,packing:ap,premultiplied_alpha_fragment:cp,project_vertex:lp,dithering_fragment:hp,dithering_pars_fragment:up,roughnessmap_fragment:fp,roughnessmap_pars_fragment:dp,shadowmap_pars_fragment:pp,shadowmap_pars_vertex:mp,shadowmap_vertex:gp,shadowmask_pars_fragment:_p,skinbase_vertex:vp,skinning_pars_vertex:xp,skinning_vertex:yp,skinnormal_vertex:Mp,specularmap_fragment:Sp,specularmap_pars_fragment:Ep,tonemapping_fragment:bp,tonemapping_pars_fragment:wp,transmission_fragment:Tp,transmission_pars_fragment:Ap,uv_pars_fragment:Rp,uv_pars_vertex:Cp,uv_vertex:Pp,worldpos_vertex:Lp,background_vert:Dp,background_frag:Ip,backgroundCube_vert:Up,backgroundCube_frag:Np,cube_vert:Fp,cube_frag:Op,depth_vert:Bp,depth_frag:kp,distanceRGBA_vert:zp,distanceRGBA_frag:Hp,equirect_vert:Vp,equirect_frag:Gp,linedashed_vert:Wp,linedashed_frag:Xp,meshbasic_vert:Yp,meshbasic_frag:qp,meshlambert_vert:$p,meshlambert_frag:Zp,meshmatcap_vert:Jp,meshmatcap_frag:Kp,meshnormal_vert:jp,meshnormal_frag:Qp,meshphong_vert:tm,meshphong_frag:em,meshphysical_vert:nm,meshphysical_frag:im,meshtoon_vert:sm,meshtoon_frag:rm,points_vert:om,points_frag:am,shadow_vert:cm,shadow_frag:lm,sprite_vert:hm,sprite_frag:um},lt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},We={basic:{uniforms:Se([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Se([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Se([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Se([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Se([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Se([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Se([lt.points,lt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Se([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Se([lt.common,lt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Se([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Se([lt.sprite,lt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Se([lt.common,lt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Se([lt.lights,lt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};We.physical={uniforms:Se([We.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Os={r:0,b:0,g:0},Fn=new qe,fm=new se;function dm(i,t,e,n,s,r,o){const a=new Wt(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function _(b){let S=!1;const y=g(b);y===null?p(a,c):y&&y.isColor&&(p(y,1),S=!0);const N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,S){const y=g(S);y&&(y.isCubeTexture||y.mapping===fr)?(h===void 0&&(h=new jt(new fs(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Ti(We.backgroundCube.uniforms),vertexShader:We.backgroundCube.vertexShader,fragmentShader:We.backgroundCube.fragmentShader,side:we,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Fn.copy(S.backgroundRotation),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(fm.makeRotationFromEuler(Fn)),h.material.toneMapped=qt.getTransfer(y.colorSpace)!==Qt,(u!==y||d!==y.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new jt(new ds(2,2),new Pn({name:"BackgroundMaterial",uniforms:Ti(We.background.uniforms),vertexShader:We.background.vertexShader,fragmentShader:We.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=qt.getTransfer(y.colorSpace)!==Qt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,S){b.getRGB(Os,Wl(i)),n.buffers.color.setClear(Os.r,Os.g,Os.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),c=S,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(a,c)},render:_,addToRenderList:m}}function pm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(x,C,z,O,H){let X=!1;const V=u(O,z,C);r!==V&&(r=V,l(r.object)),X=f(x,O,z,H),X&&g(x,O,z,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,y(x,C,z,O),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,C,z){const O=z.wireframe===!0;let H=n[x.id];H===void 0&&(H={},n[x.id]=H);let X=H[C.id];X===void 0&&(X={},H[C.id]=X);let V=X[O];return V===void 0&&(V=d(c()),X[O]=V),V}function d(x){const C=[],z=[],O=[];for(let H=0;H<e;H++)C[H]=0,z[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:O,object:x,attributes:{},index:null}}function f(x,C,z,O){const H=r.attributes,X=C.attributes;let V=0;const J=z.getAttributes();for(const G in J)if(J[G].location>=0){const dt=H[G];let xt=X[G];if(xt===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(xt=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(xt=x.instanceColor)),dt===void 0||dt.attribute!==xt||xt&&dt.data!==xt.data)return!0;V++}return r.attributesNum!==V||r.index!==O}function g(x,C,z,O){const H={},X=C.attributes;let V=0;const J=z.getAttributes();for(const G in J)if(J[G].location>=0){let dt=X[G];dt===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(dt=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(dt=x.instanceColor));const xt={};xt.attribute=dt,dt&&dt.data&&(xt.data=dt.data),H[G]=xt,V++}r.attributes=H,r.attributesNum=V,r.index=O}function _(){const x=r.newAttributes;for(let C=0,z=x.length;C<z;C++)x[C]=0}function m(x){p(x,0)}function p(x,C){const z=r.newAttributes,O=r.enabledAttributes,H=r.attributeDivisors;z[x]=1,O[x]===0&&(i.enableVertexAttribArray(x),O[x]=1),H[x]!==C&&(i.vertexAttribDivisor(x,C),H[x]=C)}function b(){const x=r.newAttributes,C=r.enabledAttributes;for(let z=0,O=C.length;z<O;z++)C[z]!==x[z]&&(i.disableVertexAttribArray(z),C[z]=0)}function S(x,C,z,O,H,X,V){V===!0?i.vertexAttribIPointer(x,C,z,H,X):i.vertexAttribPointer(x,C,z,O,H,X)}function y(x,C,z,O){_();const H=O.attributes,X=z.getAttributes(),V=C.defaultAttributeValues;for(const J in X){const G=X[J];if(G.location>=0){let ct=H[J];if(ct===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor)),ct!==void 0){const dt=ct.normalized,xt=ct.itemSize,Ut=t.get(ct);if(Ut===void 0)continue;const Xt=Ut.buffer,q=Ut.type,rt=Ut.bytesPerElement,Et=q===i.INT||q===i.UNSIGNED_INT||ct.gpuType===aa;if(ct.isInterleavedBufferAttribute){const Z=ct.data,ht=Z.stride,wt=ct.offset;if(Z.isInstancedInterleavedBuffer){for(let bt=0;bt<G.locationSize;bt++)p(G.location+bt,Z.meshPerAttribute);x.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let bt=0;bt<G.locationSize;bt++)m(G.location+bt);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let bt=0;bt<G.locationSize;bt++)S(G.location+bt,xt/G.locationSize,q,dt,ht*rt,(wt+xt/G.locationSize*bt)*rt,Et)}else{if(ct.isInstancedBufferAttribute){for(let Z=0;Z<G.locationSize;Z++)p(G.location+Z,ct.meshPerAttribute);x.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Z=0;Z<G.locationSize;Z++)m(G.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let Z=0;Z<G.locationSize;Z++)S(G.location+Z,xt/G.locationSize,q,dt,xt*rt,xt/G.locationSize*Z*rt,Et)}}else if(V!==void 0){const dt=V[J];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(G.location,dt);break;case 3:i.vertexAttrib3fv(G.location,dt);break;case 4:i.vertexAttrib4fv(G.location,dt);break;default:i.vertexAttrib1fv(G.location,dt)}}}}b()}function N(){P();for(const x in n){const C=n[x];for(const z in C){const O=C[z];for(const H in O)h(O[H].object),delete O[H];delete C[z]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const z in C){const O=C[z];for(const H in O)h(O[H].object),delete O[H];delete C[z]}delete n[x.id]}function A(x){for(const C in n){const z=n[C];if(z[x.id]===void 0)continue;const O=z[x.id];for(const H in O)h(O[H].object),delete O[H];delete z[x.id]}}function P(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:N,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function mm(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function gm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==He&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===cs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==un&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==cn&&!P)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:y,vertexTextures:N,maxSamples:R}}function _m(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new yn,a=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const b=r?0:n,S=b*4;let y=p.clippingState||null;c.value=y,y=h(g,d,S,f);for(let N=0;N!==S;++N)y[N]=e[N];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,y=f;S!==_;++S,y+=4)o.copy(u[S]).applyMatrix4(b,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function vm(i){let t=new WeakMap;function e(o,a){return a===_o?o.mapping=Si:a===vo&&(o.mapping=Ei),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===_o||a===vo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Cf(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class $l extends Xl{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const fi=4,mc=[.125,.215,.35,.446,.526,.582],zn=20,Hr=new $l,gc=new Wt;let Vr=null,Gr=0,Wr=0,Xr=!1;const Bn=(1+Math.sqrt(5))/2,li=1/Bn,_c=[new L(-Bn,li,0),new L(Bn,li,0),new L(-li,0,Bn),new L(li,0,Bn),new L(0,Bn,-li),new L(0,Bn,li),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class vc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Vr=this._renderer.getRenderTarget(),Gr=this._renderer.getActiveCubeFace(),Wr=this._renderer.getActiveMipmapLevel(),Xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Vr,Gr,Wr),this._renderer.xr.enabled=Xr,t.scissorTest=!1,Bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Si||t.mapping===Ei?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Vr=this._renderer.getRenderTarget(),Gr=this._renderer.getActiveCubeFace(),Wr=this._renderer.getActiveMipmapLevel(),Xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:cs,format:He,colorSpace:Ci,depthBuffer:!1},s=xc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xm(r)),this._blurMaterial=ym(r,t,e)}return s}_compileMaterial(t){const e=new jt(this._lodPlanes[0],t);this._renderer.compile(e,Hr)}_sceneToCubeUV(t,e,n,s){const a=new Ue(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(gc),h.toneMapping=An,h.autoClear=!1;const f=new or({name:"PMREM.Background",side:we,depthWrite:!1,depthTest:!1}),g=new jt(new fs,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(gc),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):b===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const S=this._cubeSize;Bs(s,b*S,p>2?S:0,S,S),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Si||t.mapping===Ei;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Bs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Hr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=_c[(s-r-1)%_c.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new jt(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*zn-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):zn;m>zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zn}`);const p=[];let b=0;for(let A=0;A<zn;++A){const P=A/_,E=Math.exp(-P*P/2);p.push(E),A===0?b+=E:A<m&&(b+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;const y=this._sizeLods[s],N=3*y*(s>S-fi?s-S+fi:0),R=4*(this._cubeSize-y);Bs(e,N,R,3*y,2*y),c.setRenderTarget(e),c.render(u,Hr)}}function xm(i){const t=[],e=[],n=[];let s=i;const r=i-fi+1+mc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-fi?c=mc[o-i+fi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*f),S=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let R=0;R<f;R++){const A=R%3*2/3-1,P=R>2?0:-1,E=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];b.set(E,_*g*R),S.set(d,m*g*R);const x=[R,R,R,R,R,R];y.set(x,p*g*R)}const N=new Le;N.setAttribute("position",new Ye(b,_)),N.setAttribute("uv",new Ye(S,m)),N.setAttribute("faceIndex",new Ye(y,p)),t.push(N),s>fi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function xc(i,t,e){const n=new Yn(i,t,e);return n.texture.mapping=fr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function ym(i,t,e){const n=new Float32Array(zn),s=new L(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function yc(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Mc(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function _a(){return`

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
	`}function Mm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===_o||c===vo,h=c===Si||c===Ei;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new vc(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new vc(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Sm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&zi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Em(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const b=f.array;_=f.version;for(let S=0,y=b.length;S<y;S+=3){const N=b[S+0],R=b[S+1],A=b[S+2];d.push(N,R,R,A,A,N)}}else if(g!==void 0){const b=g.array;_=g.version;for(let S=0,y=b.length/3-1;S<y;S+=3){const N=S+0,R=S+1,A=S+2;d.push(N,R,R,A,A,N)}}else return;const m=new(Ol(d)?Gl:Vl)(d,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function bm(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*_[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function wm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Tm(i,t,e){const n=new WeakMap,s=new le;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let x=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var f=x;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let N=a.attributes.position.count*y,R=1;N>t.maxTextureSize&&(R=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const A=new Float32Array(N*R*4*u),P=new kl(A,N,R,u);P.type=cn,P.needsUpdate=!0;const E=y*4;for(let C=0;C<u;C++){const z=p[C],O=b[C],H=S[C],X=N*R*4*C;for(let V=0;V<z.count;V++){const J=V*E;g===!0&&(s.fromBufferAttribute(z,V),A[X+J+0]=s.x,A[X+J+1]=s.y,A[X+J+2]=s.z,A[X+J+3]=0),_===!0&&(s.fromBufferAttribute(O,V),A[X+J+4]=s.x,A[X+J+5]=s.y,A[X+J+6]=s.z,A[X+J+7]=0),m===!0&&(s.fromBufferAttribute(H,V),A[X+J+8]=s.x,A[X+J+9]=s.y,A[X+J+10]=s.z,A[X+J+11]=H.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new et(N,R)},n.set(a,d),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Am(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class Zl extends ye{constructor(t,e,n,s,r,o,a,c,l,h=gi){if(h!==gi&&h!==wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gi&&(n=Xn),n===void 0&&h===wi&&(n=bi),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ve,this.minFilter=c!==void 0?c:Ve,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Jl=new ye,Sc=new Zl(1,1),Kl=new kl,jl=new df,Ql=new Yl,Ec=[],bc=[],wc=new Float32Array(16),Tc=new Float32Array(9),Ac=new Float32Array(4);function Li(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ec[s];if(r===void 0&&(r=new Float32Array(s),Ec[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ue(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function fe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function pr(i,t){let e=bc[t];e===void 0&&(e=new Int32Array(t),bc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Rm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2fv(this.addr,t),fe(e,t)}}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ue(e,t))return;i.uniform3fv(this.addr,t),fe(e,t)}}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4fv(this.addr,t),fe(e,t)}}function Dm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),fe(e,t)}else{if(ue(e,n))return;Ac.set(n),i.uniformMatrix2fv(this.addr,!1,Ac),fe(e,n)}}function Im(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),fe(e,t)}else{if(ue(e,n))return;Tc.set(n),i.uniformMatrix3fv(this.addr,!1,Tc),fe(e,n)}}function Um(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ue(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),fe(e,t)}else{if(ue(e,n))return;wc.set(n),i.uniformMatrix4fv(this.addr,!1,wc),fe(e,n)}}function Nm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2iv(this.addr,t),fe(e,t)}}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;i.uniform3iv(this.addr,t),fe(e,t)}}function Bm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4iv(this.addr,t),fe(e,t)}}function km(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;i.uniform2uiv(this.addr,t),fe(e,t)}}function Hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;i.uniform3uiv(this.addr,t),fe(e,t)}}function Vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;i.uniform4uiv(this.addr,t),fe(e,t)}}function Gm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Sc.compareFunction=Fl,r=Sc):r=Jl,e.setTexture2D(t||r,s)}function Wm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||jl,s)}function Xm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ql,s)}function Ym(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Kl,s)}function qm(i){switch(i){case 5126:return Rm;case 35664:return Cm;case 35665:return Pm;case 35666:return Lm;case 35674:return Dm;case 35675:return Im;case 35676:return Um;case 5124:case 35670:return Nm;case 35667:case 35671:return Fm;case 35668:case 35672:return Om;case 35669:case 35673:return Bm;case 5125:return km;case 36294:return zm;case 36295:return Hm;case 36296:return Vm;case 35678:case 36198:case 36298:case 36306:case 35682:return Gm;case 35679:case 36299:case 36307:return Wm;case 35680:case 36300:case 36308:case 36293:return Xm;case 36289:case 36303:case 36311:case 36292:return Ym}}function $m(i,t){i.uniform1fv(this.addr,t)}function Zm(i,t){const e=Li(t,this.size,2);i.uniform2fv(this.addr,e)}function Jm(i,t){const e=Li(t,this.size,3);i.uniform3fv(this.addr,e)}function Km(i,t){const e=Li(t,this.size,4);i.uniform4fv(this.addr,e)}function jm(i,t){const e=Li(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Qm(i,t){const e=Li(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function tg(i,t){const e=Li(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function eg(i,t){i.uniform1iv(this.addr,t)}function ng(i,t){i.uniform2iv(this.addr,t)}function ig(i,t){i.uniform3iv(this.addr,t)}function sg(i,t){i.uniform4iv(this.addr,t)}function rg(i,t){i.uniform1uiv(this.addr,t)}function og(i,t){i.uniform2uiv(this.addr,t)}function ag(i,t){i.uniform3uiv(this.addr,t)}function cg(i,t){i.uniform4uiv(this.addr,t)}function lg(i,t,e){const n=this.cache,s=t.length,r=pr(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Jl,r[o])}function hg(i,t,e){const n=this.cache,s=t.length,r=pr(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||jl,r[o])}function ug(i,t,e){const n=this.cache,s=t.length,r=pr(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ql,r[o])}function fg(i,t,e){const n=this.cache,s=t.length,r=pr(e,s);ue(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Kl,r[o])}function dg(i){switch(i){case 5126:return $m;case 35664:return Zm;case 35665:return Jm;case 35666:return Km;case 35674:return jm;case 35675:return Qm;case 35676:return tg;case 5124:case 35670:return eg;case 35667:case 35671:return ng;case 35668:case 35672:return ig;case 35669:case 35673:return sg;case 5125:return rg;case 36294:return og;case 36295:return ag;case 36296:return cg;case 35678:case 36198:case 36298:case 36306:case 35682:return lg;case 35679:case 36299:case 36307:return hg;case 35680:case 36300:case 36308:case 36293:return ug;case 36289:case 36303:case 36311:case 36292:return fg}}class pg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=qm(e.type)}}class mg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=dg(e.type)}}class gg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Yr=/(\w+)(\])?(\[|\.)?/g;function Rc(i,t){i.seq.push(t),i.map[t.id]=t}function _g(i,t,e){const n=i.name,s=n.length;for(Yr.lastIndex=0;;){const r=Yr.exec(n),o=Yr.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Rc(e,l===void 0?new pg(a,i,t):new mg(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new gg(a),Rc(e,u)),e=u}}}class js{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);_g(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Cc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const vg=37297;let xg=0;function yg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Pc=new kt;function Mg(i){qt._getMatrix(Pc,qt.workingColorSpace,i);const t=`mat3( ${Pc.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case dr:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Lc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+yg(i.getShaderSource(t),o)}else return s}function Sg(i,t){const e=Mg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Eg(i,t){let e;switch(t){case wu:e="Linear";break;case Tu:e="Reinhard";break;case Au:e="Cineon";break;case El:e="ACESFilmic";break;case Cu:e="AgX";break;case Pu:e="Neutral";break;case Ru:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ks=new L;function bg(){qt.getLuminanceCoefficients(ks);const i=ks.x.toFixed(4),t=ks.y.toFixed(4),e=ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hi).join(`
`)}function Tg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ag(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Hi(i){return i!==""}function Dc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ic(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Rg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(i){return i.replace(Rg,Pg)}const Cg=new Map;function Pg(i,t){let e=Ht[t];if(e===void 0){const n=Cg.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Xo(e)}const Lg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uc(i){return i.replace(Lg,Dg)}function Dg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Ig(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===yl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ml?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===nn&&(t="SHADOWMAP_TYPE_VSM"),t}function Ug(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Si:case Ei:t="ENVMAP_TYPE_CUBE";break;case fr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ng(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ei:t="ENVMAP_MODE_REFRACTION";break}return t}function Fg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Sl:t="ENVMAP_BLENDING_MULTIPLY";break;case Eu:t="ENVMAP_BLENDING_MIX";break;case bu:t="ENVMAP_BLENDING_ADD";break}return t}function Og(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Bg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Ig(e),l=Ug(e),h=Ng(e),u=Fg(e),d=Og(e),f=wg(e),g=Tg(r),_=s.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hi).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hi).join(`
`),p.length>0&&(p+=`
`)):(m=[Nc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hi).join(`
`),p=[Nc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==An?"#define TONE_MAPPING":"",e.toneMapping!==An?Ht.tonemapping_pars_fragment:"",e.toneMapping!==An?Eg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,Sg("linearToOutputTexel",e.outputColorSpace),bg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hi).join(`
`)),o=Xo(o),o=Dc(o,e),o=Ic(o,e),a=Xo(a),a=Dc(a,e),a=Ic(a,e),o=Uc(o),a=Uc(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===qa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+o,y=b+p+a,N=Cc(s,s.VERTEX_SHADER,S),R=Cc(s,s.FRAGMENT_SHADER,y);s.attachShader(_,N),s.attachShader(_,R),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(C){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(_).trim(),O=s.getShaderInfoLog(N).trim(),H=s.getShaderInfoLog(R).trim();let X=!0,V=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,N,R);else{const J=Lc(s,N,"vertex"),G=Lc(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+J+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||H==="")&&(V=!1);V&&(C.diagnostics={runnable:X,programLog:z,vertexShader:{log:O,prefix:m},fragmentShader:{log:H,prefix:p}})}s.deleteShader(N),s.deleteShader(R),P=new js(s,_),E=Ag(s,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,vg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=N,this.fragmentShader=R,this}let kg=0;class zg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Hg(t),e.set(t,n)),n}}class Hg{constructor(t){this.id=kg++,this.code=t,this.usedTimes=0}}function Vg(i,t,e,n,s,r,o){const a=new ma,c=new zg,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,x,C,z,O){const H=z.fog,X=O.geometry,V=E.isMeshStandardMaterial?z.environment:null,J=(E.isMeshStandardMaterial?e:t).get(E.envMap||V),G=J&&J.mapping===fr?J.image.height:null,ct=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const dt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,xt=dt!==void 0?dt.length:0;let Ut=0;X.morphAttributes.position!==void 0&&(Ut=1),X.morphAttributes.normal!==void 0&&(Ut=2),X.morphAttributes.color!==void 0&&(Ut=3);let Xt,q,rt,Et;if(ct){const Kt=We[ct];Xt=Kt.vertexShader,q=Kt.fragmentShader}else Xt=E.vertexShader,q=E.fragmentShader,c.update(E),rt=c.getVertexShaderID(E),Et=c.getFragmentShaderID(E);const Z=i.getRenderTarget(),ht=i.state.buffers.depth.getReversed(),wt=O.isInstancedMesh===!0,bt=O.isBatchedMesh===!0,Vt=!!E.map,K=!!E.matcap,st=!!J,T=!!E.aoMap,Pt=!!E.lightMap,nt=!!E.bumpMap,yt=!!E.normalMap,at=!!E.displacementMap,Dt=!!E.emissiveMap,_t=!!E.metalnessMap,w=!!E.roughnessMap,v=E.anisotropy>0,F=E.clearcoat>0,Y=E.dispersion>0,Q=E.iridescence>0,$=E.sheen>0,Tt=E.transmission>0,ut=v&&!!E.anisotropyMap,vt=F&&!!E.clearcoatMap,Gt=F&&!!E.clearcoatNormalMap,it=F&&!!E.clearcoatRoughnessMap,Mt=Q&&!!E.iridescenceMap,It=Q&&!!E.iridescenceThicknessMap,Nt=$&&!!E.sheenColorMap,St=$&&!!E.sheenRoughnessMap,Yt=!!E.specularMap,zt=!!E.specularColorMap,te=!!E.specularIntensityMap,D=Tt&&!!E.transmissionMap,ft=Tt&&!!E.thicknessMap,W=!!E.gradientMap,j=!!E.alphaMap,gt=E.alphaTest>0,pt=!!E.alphaHash,Ot=!!E.extensions;let ce=An;E.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(ce=i.toneMapping);const ge={shaderID:ct,shaderType:E.type,shaderName:E.name,vertexShader:Xt,fragmentShader:q,defines:E.defines,customVertexShaderID:rt,customFragmentShaderID:Et,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:bt,batchingColor:bt&&O._colorsTexture!==null,instancing:wt,instancingColor:wt&&O.instanceColor!==null,instancingMorph:wt&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ci,alphaToCoverage:!!E.alphaToCoverage,map:Vt,matcap:K,envMap:st,envMapMode:st&&J.mapping,envMapCubeUVHeight:G,aoMap:T,lightMap:Pt,bumpMap:nt,normalMap:yt,displacementMap:d&&at,emissiveMap:Dt,normalMapObjectSpace:yt&&E.normalMapType===Uu,normalMapTangentSpace:yt&&E.normalMapType===Nl,metalnessMap:_t,roughnessMap:w,anisotropy:v,anisotropyMap:ut,clearcoat:F,clearcoatMap:vt,clearcoatNormalMap:Gt,clearcoatRoughnessMap:it,dispersion:Y,iridescence:Q,iridescenceMap:Mt,iridescenceThicknessMap:It,sheen:$,sheenColorMap:Nt,sheenRoughnessMap:St,specularMap:Yt,specularColorMap:zt,specularIntensityMap:te,transmission:Tt,transmissionMap:D,thicknessMap:ft,gradientMap:W,opaque:E.transparent===!1&&E.blending===mi&&E.alphaToCoverage===!1,alphaMap:j,alphaTest:gt,alphaHash:pt,combine:E.combine,mapUv:Vt&&_(E.map.channel),aoMapUv:T&&_(E.aoMap.channel),lightMapUv:Pt&&_(E.lightMap.channel),bumpMapUv:nt&&_(E.bumpMap.channel),normalMapUv:yt&&_(E.normalMap.channel),displacementMapUv:at&&_(E.displacementMap.channel),emissiveMapUv:Dt&&_(E.emissiveMap.channel),metalnessMapUv:_t&&_(E.metalnessMap.channel),roughnessMapUv:w&&_(E.roughnessMap.channel),anisotropyMapUv:ut&&_(E.anisotropyMap.channel),clearcoatMapUv:vt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Gt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:It&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:St&&_(E.sheenRoughnessMap.channel),specularMapUv:Yt&&_(E.specularMap.channel),specularColorMapUv:zt&&_(E.specularColorMap.channel),specularIntensityMapUv:te&&_(E.specularIntensityMap.channel),transmissionMapUv:D&&_(E.transmissionMap.channel),thicknessMapUv:ft&&_(E.thicknessMap.channel),alphaMapUv:j&&_(E.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(yt||v),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!X.attributes.uv&&(Vt||j),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ht,skinning:O.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Ut,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ce,decodeVideoTexture:Vt&&E.map.isVideoTexture===!0&&qt.getTransfer(E.map.colorSpace)===Qt,decodeVideoTextureEmissive:Dt&&E.emissiveMap.isVideoTexture===!0&&qt.getTransfer(E.emissiveMap.colorSpace)===Qt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===an,flipSided:E.side===we,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ot&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ot&&E.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ge.vertexUv1s=l.has(1),ge.vertexUv2s=l.has(2),ge.vertexUv3s=l.has(3),l.clear(),ge}function p(E){const x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(const C in E.defines)x.push(C),x.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(b(x,E),S(x,E),x.push(i.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function b(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function S(E,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),E.push(a.mask)}function y(E){const x=g[E.type];let C;if(x){const z=We[x];C=wf.clone(z.uniforms)}else C=E.uniforms;return C}function N(E,x){let C;for(let z=0,O=h.length;z<O;z++){const H=h[z];if(H.cacheKey===x){C=H,++C.usedTimes;break}}return C===void 0&&(C=new Bg(i,x,E,r),h.push(C)),C}function R(E){if(--E.usedTimes===0){const x=h.indexOf(E);h[x]=h[h.length-1],h.pop(),E.destroy()}}function A(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:N,releaseProgram:R,releaseShaderCache:A,programs:h,dispose:P}}function Gg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Wg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Fc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Oc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Wg),n.length>1&&n.sort(d||Fc),s.length>1&&s.sort(d||Fc)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Xg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Oc,i.set(n,[o])):s>=r.length?(o=new Oc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Yg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Wt};break;case"SpotLight":e={position:new L,direction:new L,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function qg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let $g=0;function Zg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Jg(i){const t=new Yg,e=qg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new se,o=new se;function a(l){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,b=0,S=0,y=0,N=0,R=0,A=0;l.sort(Zg);for(let E=0,x=l.length;E<x;E++){const C=l[E],z=C.color,O=C.intensity,H=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=z.r*O,u+=z.g*O,d+=z.b*O;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],O);A++}else if(C.isDirectionalLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,G=e.get(C);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=C.shadow.matrix,b++}n.directional[f]=V,f++}else if(C.isSpotLight){const V=t.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(z).multiplyScalar(O),V.distance=H,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[_]=V;const J=C.shadow;if(C.map&&(n.spotLightMap[N]=C.map,N++,J.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[_]=J.matrix,C.castShadow){const G=e.get(C);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=X,y++}_++}else if(C.isRectAreaLight){const V=t.get(C);V.color.copy(z).multiplyScalar(O),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=V,m++}else if(C.isPointLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const J=C.shadow,G=e.get(C);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=C.shadow.matrix,S++}n.point[g]=V,g++}else if(C.isHemisphereLight){const V=t.get(C);V.skyColor.copy(C.color).multiplyScalar(O),V.groundColor.copy(C.groundColor).multiplyScalar(O),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=lt.LTC_FLOAT_1,n.rectAreaLTC2=lt.LTC_FLOAT_2):(n.rectAreaLTC1=lt.LTC_HALF_1,n.rectAreaLTC2=lt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==b||P.numPointShadows!==S||P.numSpotShadows!==y||P.numSpotMaps!==N||P.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=y+N-R,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=b,P.numPointShadows=S,P.numSpotShadows=y,P.numSpotMaps=N,P.numLightProbes=A,n.version=$g++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){const S=l[p];if(S.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(S.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Bc(i){const t=new Jg(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Kg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Bc(i),t.set(s,[a])):r>=o.length?(a=new Bc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class jg extends us{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Qg extends us{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const t_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e_=`uniform sampler2D shadow_pass;
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
}`;function n_(i,t,e){let n=new ga;const s=new et,r=new et,o=new le,a=new jg({depthPacking:Iu}),c=new Qg,l={},h=e.maxTextureSize,u={[Cn]:we,[we]:Cn,[an]:an},d=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:t_,fragmentShader:e_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Le;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new jt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yl;let p=this.type;this.render=function(R,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const E=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Tn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const O=p!==nn&&this.type===nn,H=p===nn&&this.type!==nn;for(let X=0,V=R.length;X<V;X++){const J=R[X],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ct=G.getFrameExtents();if(s.multiply(ct),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ct.x),s.x=r.x*ct.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ct.y),s.y=r.y*ct.y,G.mapSize.y=r.y)),G.map===null||O===!0||H===!0){const xt=this.type!==nn?{minFilter:Ve,magFilter:Ve}:{};G.map!==null&&G.map.dispose(),G.map=new Yn(s.x,s.y,xt),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const dt=G.getViewportCount();for(let xt=0;xt<dt;xt++){const Ut=G.getViewport(xt);o.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),z.viewport(o),G.updateMatrices(J,xt),n=G.getFrustum(),y(A,P,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===nn&&b(G,P),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,x,C)};function b(R,A){const P=t.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Yn(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(A,null,P,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(A,null,P,f,_,null)}function S(R,A,P,E){let x=null;const C=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)x=C;else if(x=P.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const z=x.uuid,O=A.uuid;let H=l[z];H===void 0&&(H={},l[z]=H);let X=H[O];X===void 0&&(X=x.clone(),H[O]=X,A.addEventListener("dispose",N)),x=X}if(x.visible=A.visible,x.wireframe=A.wireframe,E===nn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const z=i.properties.get(x);z.light=P}return x}function y(R,A,P,E,x){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===nn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const O=t.update(R),H=R.material;if(Array.isArray(H)){const X=O.groups;for(let V=0,J=X.length;V<J;V++){const G=X[V],ct=H[G.materialIndex];if(ct&&ct.visible){const dt=S(R,ct,E,x);R.onBeforeShadow(i,R,A,P,O,dt,G),i.renderBufferDirect(P,null,O,dt,R,G),R.onAfterShadow(i,R,A,P,O,dt,G)}}}else if(H.visible){const X=S(R,H,E,x);R.onBeforeShadow(i,R,A,P,O,X,null),i.renderBufferDirect(P,null,O,X,R,null),R.onAfterShadow(i,R,A,P,O,X,null)}}const z=R.children;for(let O=0,H=z.length;O<H;O++)y(z[O],A,P,E,x)}function N(R){R.target.removeEventListener("dispose",N);for(const P in l){const E=l[P],x=R.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}const i_={[lo]:ho,[uo]:mo,[fo]:go,[Mi]:po,[ho]:lo,[mo]:uo,[go]:fo,[po]:Mi};function s_(i,t){function e(){let D=!1;const ft=new le;let W=null;const j=new le(0,0,0,0);return{setMask:function(gt){W!==gt&&!D&&(i.colorMask(gt,gt,gt,gt),W=gt)},setLocked:function(gt){D=gt},setClear:function(gt,pt,Ot,ce,ge){ge===!0&&(gt*=ce,pt*=ce,Ot*=ce),ft.set(gt,pt,Ot,ce),j.equals(ft)===!1&&(i.clearColor(gt,pt,Ot,ce),j.copy(ft))},reset:function(){D=!1,W=null,j.set(-1,0,0,0)}}}function n(){let D=!1,ft=!1,W=null,j=null,gt=null;return{setReversed:function(pt){if(ft!==pt){const Ot=t.get("EXT_clip_control");ft?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT);const ce=gt;gt=null,this.setClear(ce)}ft=pt},getReversed:function(){return ft},setTest:function(pt){pt?Z(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(pt){W!==pt&&!D&&(i.depthMask(pt),W=pt)},setFunc:function(pt){if(ft&&(pt=i_[pt]),j!==pt){switch(pt){case lo:i.depthFunc(i.NEVER);break;case ho:i.depthFunc(i.ALWAYS);break;case uo:i.depthFunc(i.LESS);break;case Mi:i.depthFunc(i.LEQUAL);break;case fo:i.depthFunc(i.EQUAL);break;case po:i.depthFunc(i.GEQUAL);break;case mo:i.depthFunc(i.GREATER);break;case go:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=pt}},setLocked:function(pt){D=pt},setClear:function(pt){gt!==pt&&(ft&&(pt=1-pt),i.clearDepth(pt),gt=pt)},reset:function(){D=!1,W=null,j=null,gt=null,ft=!1}}}function s(){let D=!1,ft=null,W=null,j=null,gt=null,pt=null,Ot=null,ce=null,ge=null;return{setTest:function(Kt){D||(Kt?Z(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(Kt){ft!==Kt&&!D&&(i.stencilMask(Kt),ft=Kt)},setFunc:function(Kt,Ne,Ze){(W!==Kt||j!==Ne||gt!==Ze)&&(i.stencilFunc(Kt,Ne,Ze),W=Kt,j=Ne,gt=Ze)},setOp:function(Kt,Ne,Ze){(pt!==Kt||Ot!==Ne||ce!==Ze)&&(i.stencilOp(Kt,Ne,Ze),pt=Kt,Ot=Ne,ce=Ze)},setLocked:function(Kt){D=Kt},setClear:function(Kt){ge!==Kt&&(i.clearStencil(Kt),ge=Kt)},reset:function(){D=!1,ft=null,W=null,j=null,gt=null,pt=null,Ot=null,ce=null,ge=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,b=null,S=null,y=null,N=null,R=null,A=new Wt(0,0,0),P=0,E=!1,x=null,C=null,z=null,O=null,H=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,J=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=J>=1):G.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=J>=2);let ct=null,dt={};const xt=i.getParameter(i.SCISSOR_BOX),Ut=i.getParameter(i.VIEWPORT),Xt=new le().fromArray(xt),q=new le().fromArray(Ut);function rt(D,ft,W,j){const gt=new Uint8Array(4),pt=i.createTexture();i.bindTexture(D,pt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ot=0;Ot<W;Ot++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(ft+Ot,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return pt}const Et={};Et[i.TEXTURE_2D]=rt(i.TEXTURE_2D,i.TEXTURE_2D,1),Et[i.TEXTURE_CUBE_MAP]=rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[i.TEXTURE_2D_ARRAY]=rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Et[i.TEXTURE_3D]=rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),o.setFunc(Mi),nt(!1),yt(Ha),Z(i.CULL_FACE),T(Tn);function Z(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function ht(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function wt(D,ft){return u[D]!==ft?(i.bindFramebuffer(D,ft),u[D]=ft,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function bt(D,ft){let W=f,j=!1;if(D){W=d.get(ft),W===void 0&&(W=[],d.set(ft,W));const gt=D.textures;if(W.length!==gt.length||W[0]!==i.COLOR_ATTACHMENT0){for(let pt=0,Ot=gt.length;pt<Ot;pt++)W[pt]=i.COLOR_ATTACHMENT0+pt;W.length=gt.length,j=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,j=!0);j&&i.drawBuffers(W)}function Vt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const K={[kn]:i.FUNC_ADD,[ou]:i.FUNC_SUBTRACT,[au]:i.FUNC_REVERSE_SUBTRACT};K[cu]=i.MIN,K[lu]=i.MAX;const st={[hu]:i.ZERO,[uu]:i.ONE,[fu]:i.SRC_COLOR,[ao]:i.SRC_ALPHA,[vu]:i.SRC_ALPHA_SATURATE,[gu]:i.DST_COLOR,[pu]:i.DST_ALPHA,[du]:i.ONE_MINUS_SRC_COLOR,[co]:i.ONE_MINUS_SRC_ALPHA,[_u]:i.ONE_MINUS_DST_COLOR,[mu]:i.ONE_MINUS_DST_ALPHA,[xu]:i.CONSTANT_COLOR,[yu]:i.ONE_MINUS_CONSTANT_COLOR,[Mu]:i.CONSTANT_ALPHA,[Su]:i.ONE_MINUS_CONSTANT_ALPHA};function T(D,ft,W,j,gt,pt,Ot,ce,ge,Kt){if(D===Tn){_===!0&&(ht(i.BLEND),_=!1);return}if(_===!1&&(Z(i.BLEND),_=!0),D!==ru){if(D!==m||Kt!==E){if((p!==kn||y!==kn)&&(i.blendEquation(i.FUNC_ADD),p=kn,y=kn),Kt)switch(D){case mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Va:i.blendFunc(i.ONE,i.ONE);break;case Ga:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Va:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ga:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,S=null,N=null,R=null,A.set(0,0,0),P=0,m=D,E=Kt}return}gt=gt||ft,pt=pt||W,Ot=Ot||j,(ft!==p||gt!==y)&&(i.blendEquationSeparate(K[ft],K[gt]),p=ft,y=gt),(W!==b||j!==S||pt!==N||Ot!==R)&&(i.blendFuncSeparate(st[W],st[j],st[pt],st[Ot]),b=W,S=j,N=pt,R=Ot),(ce.equals(A)===!1||ge!==P)&&(i.blendColor(ce.r,ce.g,ce.b,ge),A.copy(ce),P=ge),m=D,E=!1}function Pt(D,ft){D.side===an?ht(i.CULL_FACE):Z(i.CULL_FACE);let W=D.side===we;ft&&(W=!W),nt(W),D.blending===mi&&D.transparent===!1?T(Tn):T(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const j=D.stencilWrite;a.setTest(j),j&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Dt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)}function nt(D){x!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),x=D)}function yt(D){D!==iu?(Z(i.CULL_FACE),D!==C&&(D===Ha?i.cullFace(i.BACK):D===su?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),C=D}function at(D){D!==z&&(V&&i.lineWidth(D),z=D)}function Dt(D,ft,W){D?(Z(i.POLYGON_OFFSET_FILL),(O!==ft||H!==W)&&(i.polygonOffset(ft,W),O=ft,H=W)):ht(i.POLYGON_OFFSET_FILL)}function _t(D){D?Z(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)}function w(D){D===void 0&&(D=i.TEXTURE0+X-1),ct!==D&&(i.activeTexture(D),ct=D)}function v(D,ft,W){W===void 0&&(ct===null?W=i.TEXTURE0+X-1:W=ct);let j=dt[W];j===void 0&&(j={type:void 0,texture:void 0},dt[W]=j),(j.type!==D||j.texture!==ft)&&(ct!==W&&(i.activeTexture(W),ct=W),i.bindTexture(D,ft||Et[D]),j.type=D,j.texture=ft)}function F(){const D=dt[ct];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Gt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function It(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Nt(D){Xt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Xt.copy(D))}function St(D){q.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),q.copy(D))}function Yt(D,ft){let W=l.get(ft);W===void 0&&(W=new WeakMap,l.set(ft,W));let j=W.get(D);j===void 0&&(j=i.getUniformBlockIndex(ft,D.name),W.set(D,j))}function zt(D,ft){const j=l.get(ft).get(D);c.get(ft)!==j&&(i.uniformBlockBinding(ft,j,D.__bindingPointIndex),c.set(ft,j))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ct=null,dt={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,b=null,S=null,y=null,N=null,R=null,A=new Wt(0,0,0),P=0,E=!1,x=null,C=null,z=null,O=null,H=null,Xt.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:ht,bindFramebuffer:wt,drawBuffers:bt,useProgram:Vt,setBlending:T,setMaterial:Pt,setFlipSided:nt,setCullFace:yt,setLineWidth:at,setPolygonOffset:Dt,setScissorTest:_t,activeTexture:w,bindTexture:v,unbindTexture:F,compressedTexImage2D:Y,compressedTexImage3D:Q,texImage2D:Mt,texImage3D:It,updateUBOMapping:Yt,uniformBlockBinding:zt,texStorage2D:Gt,texStorage3D:it,texSubImage2D:$,texSubImage3D:Tt,compressedTexSubImage2D:ut,compressedTexSubImage3D:vt,scissor:Nt,viewport:St,reset:te}}function kc(i,t,e,n){const s=r_(n);switch(e){case Rl:return i*t;case Pl:return i*t;case Ll:return i*t*2;case Dl:return i*t/s.components*s.byteLength;case ha:return i*t/s.components*s.byteLength;case Il:return i*t*2/s.components*s.byteLength;case ua:return i*t*2/s.components*s.byteLength;case Cl:return i*t*3/s.components*s.byteLength;case He:return i*t*4/s.components*s.byteLength;case fa:return i*t*4/s.components*s.byteLength;case qs:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Zs:case Js:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yo:case So:return Math.max(i,16)*Math.max(t,8)/4;case xo:case Mo:return Math.max(i,8)*Math.max(t,8)/2;case Eo:case bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case To:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Co:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Po:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Do:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Io:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case No:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Oo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Bo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ko:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ks:case zo:case Ho:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ul:case Vo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Go:case Wo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function r_(i){switch(i){case un:case wl:return{byteLength:1,components:1};case Ji:case Tl:case cs:return{byteLength:2,components:1};case ca:case la:return{byteLength:2,components:4};case Xn:case aa:case cn:return{byteLength:4,components:1};case Al:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function o_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new et,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return f?new OffscreenCanvas(w,v):ji("canvas")}function _(w,v,F){let Y=1;const Q=_t(w);if((Q.width>F||Q.height>F)&&(Y=F/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const $=Math.floor(Y*Q.width),Tt=Math.floor(Y*Q.height);u===void 0&&(u=g($,Tt));const ut=v?g($,Tt):u;return ut.width=$,ut.height=Tt,ut.getContext("2d").drawImage(w,0,0,$,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+Tt+")."),ut}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(w,v,F,Y,Q=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=v;if(v===i.RED&&(F===i.FLOAT&&($=i.R32F),F===i.HALF_FLOAT&&($=i.R16F),F===i.UNSIGNED_BYTE&&($=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.R8UI),F===i.UNSIGNED_SHORT&&($=i.R16UI),F===i.UNSIGNED_INT&&($=i.R32UI),F===i.BYTE&&($=i.R8I),F===i.SHORT&&($=i.R16I),F===i.INT&&($=i.R32I)),v===i.RG&&(F===i.FLOAT&&($=i.RG32F),F===i.HALF_FLOAT&&($=i.RG16F),F===i.UNSIGNED_BYTE&&($=i.RG8)),v===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RG8UI),F===i.UNSIGNED_SHORT&&($=i.RG16UI),F===i.UNSIGNED_INT&&($=i.RG32UI),F===i.BYTE&&($=i.RG8I),F===i.SHORT&&($=i.RG16I),F===i.INT&&($=i.RG32I)),v===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGB8UI),F===i.UNSIGNED_SHORT&&($=i.RGB16UI),F===i.UNSIGNED_INT&&($=i.RGB32UI),F===i.BYTE&&($=i.RGB8I),F===i.SHORT&&($=i.RGB16I),F===i.INT&&($=i.RGB32I)),v===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGBA8UI),F===i.UNSIGNED_SHORT&&($=i.RGBA16UI),F===i.UNSIGNED_INT&&($=i.RGBA32UI),F===i.BYTE&&($=i.RGBA8I),F===i.SHORT&&($=i.RGBA16I),F===i.INT&&($=i.RGBA32I)),v===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),v===i.RGBA){const Tt=Q?dr:qt.getTransfer(Y);F===i.FLOAT&&($=i.RGBA32F),F===i.HALF_FLOAT&&($=i.RGBA16F),F===i.UNSIGNED_BYTE&&($=Tt===Qt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function y(w,v){let F;return w?v===null||v===Xn||v===bi?F=i.DEPTH24_STENCIL8:v===cn?F=i.DEPTH32F_STENCIL8:v===Ji&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Xn||v===bi?F=i.DEPTH_COMPONENT24:v===cn?F=i.DEPTH_COMPONENT32F:v===Ji&&(F=i.DEPTH_COMPONENT16),F}function N(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ve&&w.minFilter!==Xe?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function R(w){const v=w.target;v.removeEventListener("dispose",R),P(v),v.isVideoTexture&&h.delete(v)}function A(w){const v=w.target;v.removeEventListener("dispose",A),x(v)}function P(w){const v=n.get(w);if(v.__webglInit===void 0)return;const F=w.source,Y=d.get(F);if(Y){const Q=Y[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(w),Object.keys(Y).length===0&&d.delete(F)}n.remove(w)}function E(w){const v=n.get(w);i.deleteTexture(v.__webglTexture);const F=w.source,Y=d.get(F);delete Y[v.__cacheKey],o.memory.textures--}function x(w){const v=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let Q=0;Q<v.__webglFramebuffer[Y].length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[Y][Q]);else i.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[Y]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=w.textures;for(let Y=0,Q=F.length;Y<Q;Y++){const $=n.get(F[Y]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(F[Y])}n.remove(w)}let C=0;function z(){C=0}function O(){const w=C;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),C+=1,w}function H(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function X(w,v){const F=n.get(w);if(w.isVideoTexture&&at(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){const Y=w.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,w,v);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function V(w,v){const F=n.get(w);if(w.version>0&&F.__version!==w.version){q(F,w,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function J(w,v){const F=n.get(w);if(w.version>0&&F.__version!==w.version){q(F,w,v);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function G(w,v){const F=n.get(w);if(w.version>0&&F.__version!==w.version){rt(F,w,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}const ct={[ir]:i.REPEAT,[Hn]:i.CLAMP_TO_EDGE,[sr]:i.MIRRORED_REPEAT},dt={[Ve]:i.NEAREST,[Lu]:i.NEAREST_MIPMAP_NEAREST,[xs]:i.NEAREST_MIPMAP_LINEAR,[Xe]:i.LINEAR,[yr]:i.LINEAR_MIPMAP_NEAREST,[Vn]:i.LINEAR_MIPMAP_LINEAR},xt={[Nu]:i.NEVER,[Hu]:i.ALWAYS,[Fu]:i.LESS,[Fl]:i.LEQUAL,[Ou]:i.EQUAL,[zu]:i.GEQUAL,[Bu]:i.GREATER,[ku]:i.NOTEQUAL};function Ut(w,v){if(v.type===cn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Xe||v.magFilter===yr||v.magFilter===xs||v.magFilter===Vn||v.minFilter===Xe||v.minFilter===yr||v.minFilter===xs||v.minFilter===Vn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,ct[v.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ct[v.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ct[v.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,dt[v.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,dt[v.minFilter]),v.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,xt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ve||v.minFilter!==xs&&v.minFilter!==Vn||v.type===cn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Xt(w,v){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",R));const Y=v.source;let Q=d.get(Y);Q===void 0&&(Q={},d.set(Y,Q));const $=H(v);if($!==w.__cacheKey){Q[$]===void 0&&(Q[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Q[$].usedTimes++;const Tt=Q[w.__cacheKey];Tt!==void 0&&(Q[w.__cacheKey].usedTimes--,Tt.usedTimes===0&&E(v)),w.__cacheKey=$,w.__webglTexture=Q[$].texture}return F}function q(w,v,F){let Y=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=i.TEXTURE_3D);const Q=Xt(w,v),$=v.source;e.bindTexture(Y,w.__webglTexture,i.TEXTURE0+F);const Tt=n.get($);if($.version!==Tt.__version||Q===!0){e.activeTexture(i.TEXTURE0+F);const ut=qt.getPrimaries(qt.workingColorSpace),vt=v.colorSpace===Sn?null:qt.getPrimaries(v.colorSpace),Gt=v.colorSpace===Sn||ut===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let it=_(v.image,!1,s.maxTextureSize);it=Dt(v,it);const Mt=r.convert(v.format,v.colorSpace),It=r.convert(v.type);let Nt=S(v.internalFormat,Mt,It,v.colorSpace,v.isVideoTexture);Ut(Y,v);let St;const Yt=v.mipmaps,zt=v.isVideoTexture!==!0,te=Tt.__version===void 0||Q===!0,D=$.dataReady,ft=N(v,it);if(v.isDepthTexture)Nt=y(v.format===wi,v.type),te&&(zt?e.texStorage2D(i.TEXTURE_2D,1,Nt,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Nt,it.width,it.height,0,Mt,It,null));else if(v.isDataTexture)if(Yt.length>0){zt&&te&&e.texStorage2D(i.TEXTURE_2D,ft,Nt,Yt[0].width,Yt[0].height);for(let W=0,j=Yt.length;W<j;W++)St=Yt[W],zt?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,St.width,St.height,Mt,It,St.data):e.texImage2D(i.TEXTURE_2D,W,Nt,St.width,St.height,0,Mt,It,St.data);v.generateMipmaps=!1}else zt?(te&&e.texStorage2D(i.TEXTURE_2D,ft,Nt,it.width,it.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,Mt,It,it.data)):e.texImage2D(i.TEXTURE_2D,0,Nt,it.width,it.height,0,Mt,It,it.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){zt&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Nt,Yt[0].width,Yt[0].height,it.depth);for(let W=0,j=Yt.length;W<j;W++)if(St=Yt[W],v.format!==He)if(Mt!==null)if(zt){if(D)if(v.layerUpdates.size>0){const gt=kc(St.width,St.height,v.format,v.type);for(const pt of v.layerUpdates){const Ot=St.data.subarray(pt*gt/St.data.BYTES_PER_ELEMENT,(pt+1)*gt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,pt,St.width,St.height,1,Mt,Ot)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,St.width,St.height,it.depth,Mt,St.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,W,Nt,St.width,St.height,it.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,St.width,St.height,it.depth,Mt,It,St.data):e.texImage3D(i.TEXTURE_2D_ARRAY,W,Nt,St.width,St.height,it.depth,0,Mt,It,St.data)}else{zt&&te&&e.texStorage2D(i.TEXTURE_2D,ft,Nt,Yt[0].width,Yt[0].height);for(let W=0,j=Yt.length;W<j;W++)St=Yt[W],v.format!==He?Mt!==null?zt?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,W,0,0,St.width,St.height,Mt,St.data):e.compressedTexImage2D(i.TEXTURE_2D,W,Nt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,St.width,St.height,Mt,It,St.data):e.texImage2D(i.TEXTURE_2D,W,Nt,St.width,St.height,0,Mt,It,St.data)}else if(v.isDataArrayTexture)if(zt){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,Nt,it.width,it.height,it.depth),D)if(v.layerUpdates.size>0){const W=kc(it.width,it.height,v.format,v.type);for(const j of v.layerUpdates){const gt=it.data.subarray(j*W/it.data.BYTES_PER_ELEMENT,(j+1)*W/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,it.width,it.height,1,Mt,It,gt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Mt,It,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Nt,it.width,it.height,it.depth,0,Mt,It,it.data);else if(v.isData3DTexture)zt?(te&&e.texStorage3D(i.TEXTURE_3D,ft,Nt,it.width,it.height,it.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Mt,It,it.data)):e.texImage3D(i.TEXTURE_3D,0,Nt,it.width,it.height,it.depth,0,Mt,It,it.data);else if(v.isFramebufferTexture){if(te)if(zt)e.texStorage2D(i.TEXTURE_2D,ft,Nt,it.width,it.height);else{let W=it.width,j=it.height;for(let gt=0;gt<ft;gt++)e.texImage2D(i.TEXTURE_2D,gt,Nt,W,j,0,Mt,It,null),W>>=1,j>>=1}}else if(Yt.length>0){if(zt&&te){const W=_t(Yt[0]);e.texStorage2D(i.TEXTURE_2D,ft,Nt,W.width,W.height)}for(let W=0,j=Yt.length;W<j;W++)St=Yt[W],zt?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,Mt,It,St):e.texImage2D(i.TEXTURE_2D,W,Nt,Mt,It,St);v.generateMipmaps=!1}else if(zt){if(te){const W=_t(it);e.texStorage2D(i.TEXTURE_2D,ft,Nt,W.width,W.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,It,it)}else e.texImage2D(i.TEXTURE_2D,0,Nt,Mt,It,it);m(v)&&p(Y),Tt.__version=$.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function rt(w,v,F){if(v.image.length!==6)return;const Y=Xt(w,v),Q=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+F);const $=n.get(Q);if(Q.version!==$.__version||Y===!0){e.activeTexture(i.TEXTURE0+F);const Tt=qt.getPrimaries(qt.workingColorSpace),ut=v.colorSpace===Sn?null:qt.getPrimaries(v.colorSpace),vt=v.colorSpace===Sn||Tt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Gt=v.isCompressedTexture||v.image[0].isCompressedTexture,it=v.image[0]&&v.image[0].isDataTexture,Mt=[];for(let j=0;j<6;j++)!Gt&&!it?Mt[j]=_(v.image[j],!0,s.maxCubemapSize):Mt[j]=it?v.image[j].image:v.image[j],Mt[j]=Dt(v,Mt[j]);const It=Mt[0],Nt=r.convert(v.format,v.colorSpace),St=r.convert(v.type),Yt=S(v.internalFormat,Nt,St,v.colorSpace),zt=v.isVideoTexture!==!0,te=$.__version===void 0||Y===!0,D=Q.dataReady;let ft=N(v,It);Ut(i.TEXTURE_CUBE_MAP,v);let W;if(Gt){zt&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Yt,It.width,It.height);for(let j=0;j<6;j++){W=Mt[j].mipmaps;for(let gt=0;gt<W.length;gt++){const pt=W[gt];v.format!==He?Nt!==null?zt?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,0,0,pt.width,pt.height,Nt,pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,Yt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,0,0,pt.width,pt.height,Nt,St,pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,Yt,pt.width,pt.height,0,Nt,St,pt.data)}}}else{if(W=v.mipmaps,zt&&te){W.length>0&&ft++;const j=_t(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Yt,j.width,j.height)}for(let j=0;j<6;j++)if(it){zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Mt[j].width,Mt[j].height,Nt,St,Mt[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Yt,Mt[j].width,Mt[j].height,0,Nt,St,Mt[j].data);for(let gt=0;gt<W.length;gt++){const Ot=W[gt].image[j].image;zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,0,0,Ot.width,Ot.height,Nt,St,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,Yt,Ot.width,Ot.height,0,Nt,St,Ot.data)}}else{zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Nt,St,Mt[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Yt,Nt,St,Mt[j]);for(let gt=0;gt<W.length;gt++){const pt=W[gt];zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,0,0,Nt,St,pt.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,Yt,Nt,St,pt.image[j])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),$.__version=Q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function Et(w,v,F,Y,Q,$){const Tt=r.convert(F.format,F.colorSpace),ut=r.convert(F.type),vt=S(F.internalFormat,Tt,ut,F.colorSpace),Gt=n.get(v),it=n.get(F);if(it.__renderTarget=v,!Gt.__hasExternalTextures){const Mt=Math.max(1,v.width>>$),It=Math.max(1,v.height>>$);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,$,vt,Mt,It,v.depth,0,Tt,ut,null):e.texImage2D(Q,$,vt,Mt,It,0,Tt,ut,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),yt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Q,it.__webglTexture,0,nt(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Q,it.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(w,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,w),v.depthBuffer){const Y=v.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,$=y(v.stencilBuffer,Q),Tt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=nt(v);yt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut,$,v.width,v.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,$,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,$,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,w)}else{const Y=v.textures;for(let Q=0;Q<Y.length;Q++){const $=Y[Q],Tt=r.convert($.format,$.colorSpace),ut=r.convert($.type),vt=S($.internalFormat,Tt,ut,$.colorSpace),Gt=nt(v);F&&yt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,vt,v.width,v.height):yt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt,vt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,vt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ht(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(v.depthTexture);Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X(v.depthTexture,0);const Q=Y.__webglTexture,$=nt(v);if(v.depthTexture.format===gi)yt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(v.depthTexture.format===wi)yt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function wt(w){const v=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const Y=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=Y}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");ht(v.__webglFramebuffer,w)}else if(F){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=i.createRenderbuffer(),Z(v.__webglDepthbuffer[Y],w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Z(v.__webglDepthbuffer,w,!1);else{const Y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function bt(w,v,F){const Y=n.get(w);v!==void 0&&Et(Y.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&wt(w)}function Vt(w){const v=w.texture,F=n.get(w),Y=n.get(v);w.addEventListener("dispose",A);const Q=w.textures,$=w.isWebGLCubeRenderTarget===!0,Tt=Q.length>1;if(Tt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=v.version,o.memory.textures++),$){F.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[ut]=[];for(let vt=0;vt<v.mipmaps.length;vt++)F.__webglFramebuffer[ut][vt]=i.createFramebuffer()}else F.__webglFramebuffer[ut]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let ut=0;ut<v.mipmaps.length;ut++)F.__webglFramebuffer[ut]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let ut=0,vt=Q.length;ut<vt;ut++){const Gt=n.get(Q[ut]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&yt(w)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ut=0;ut<Q.length;ut++){const vt=Q[ut];F.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ut]);const Gt=r.convert(vt.format,vt.colorSpace),it=r.convert(vt.type),Mt=S(vt.internalFormat,Gt,it,vt.colorSpace,w.isXRRenderTarget===!0),It=nt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,It,Mt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,F.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Z(F.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Ut(i.TEXTURE_CUBE_MAP,v);for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)Et(F.__webglFramebuffer[ut][vt],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,vt);else Et(F.__webglFramebuffer[ut],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ut=0,vt=Q.length;ut<vt;ut++){const Gt=Q[ut],it=n.get(Gt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),Ut(i.TEXTURE_2D,Gt),Et(F.__webglFramebuffer,w,Gt,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,0),m(Gt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ut=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ut=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,Y.__webglTexture),Ut(ut,v),v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)Et(F.__webglFramebuffer[vt],w,v,i.COLOR_ATTACHMENT0,ut,vt);else Et(F.__webglFramebuffer,w,v,i.COLOR_ATTACHMENT0,ut,0);m(v)&&p(ut),e.unbindTexture()}w.depthBuffer&&wt(w)}function K(w){const v=w.textures;for(let F=0,Y=v.length;F<Y;F++){const Q=v[F];if(m(Q)){const $=b(w),Tt=n.get(Q).__webglTexture;e.bindTexture($,Tt),p($),e.unbindTexture()}}}const st=[],T=[];function Pt(w){if(w.samples>0){if(yt(w)===!1){const v=w.textures,F=w.width,Y=w.height;let Q=i.COLOR_BUFFER_BIT;const $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(w),ut=v.length>1;if(ut)for(let vt=0;vt<v.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let vt=0;vt<v.length;vt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ut){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);const Gt=n.get(v[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Gt,0)}i.blitFramebuffer(0,0,F,Y,0,0,F,Y,Q,i.NEAREST),c===!0&&(st.length=0,T.length=0,st.push(i.COLOR_ATTACHMENT0+vt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(st.push($),T.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,T)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,st))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let vt=0;vt<v.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);const Gt=n.get(v[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const v=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function nt(w){return Math.min(s.maxSamples,w.samples)}function yt(w){const v=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function at(w){const v=o.render.frame;h.get(w)!==v&&(h.set(w,v),w.update())}function Dt(w,v){const F=w.colorSpace,Y=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==Ci&&F!==Sn&&(qt.getTransfer(F)===Qt?(Y!==He||Q!==un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function _t(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=z,this.setTexture2D=X,this.setTexture2DArray=V,this.setTexture3D=J,this.setTextureCube=G,this.rebindTextures=bt,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=yt}function a_(i,t){function e(n,s=Sn){let r;const o=qt.getTransfer(s);if(n===un)return i.UNSIGNED_BYTE;if(n===ca)return i.UNSIGNED_SHORT_4_4_4_4;if(n===la)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Al)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===wl)return i.BYTE;if(n===Tl)return i.SHORT;if(n===Ji)return i.UNSIGNED_SHORT;if(n===aa)return i.INT;if(n===Xn)return i.UNSIGNED_INT;if(n===cn)return i.FLOAT;if(n===cs)return i.HALF_FLOAT;if(n===Rl)return i.ALPHA;if(n===Cl)return i.RGB;if(n===He)return i.RGBA;if(n===Pl)return i.LUMINANCE;if(n===Ll)return i.LUMINANCE_ALPHA;if(n===gi)return i.DEPTH_COMPONENT;if(n===wi)return i.DEPTH_STENCIL;if(n===Dl)return i.RED;if(n===ha)return i.RED_INTEGER;if(n===Il)return i.RG;if(n===ua)return i.RG_INTEGER;if(n===fa)return i.RGBA_INTEGER;if(n===qs||n===$s||n===Zs||n===Js)if(o===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xo||n===yo||n===Mo||n===So)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Eo||n===bo||n===wo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Eo||n===bo)return o===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===wo)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===To||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===ko)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===To)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ao)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ro)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Co)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Po)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lo)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Do)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Io)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Uo)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===No)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fo)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oo)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bo)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ko)return o===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ks||n===zo||n===Ho)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ks)return o===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ho)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ul||n===Vo||n===Go||n===Wo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ks)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Go)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class c_ extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class bn extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const l_={type:"move"};class qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(l_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new bn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const h_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u_=`
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

}`;class f_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new ye,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Pn({vertexShader:h_,fragmentShader:u_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new jt(new ds(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class d_ extends Pi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=new f_,m=e.getContextAttributes();let p=null,b=null;const S=[],y=[],N=new et;let R=null;const A=new Ue;A.viewport=new le;const P=new Ue;P.viewport=new le;const E=[A,P],x=new c_;let C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let rt=S[q];return rt===void 0&&(rt=new qr,S[q]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(q){let rt=S[q];return rt===void 0&&(rt=new qr,S[q]=rt),rt.getGripSpace()},this.getHand=function(q){let rt=S[q];return rt===void 0&&(rt=new qr,S[q]=rt),rt.getHandSpace()};function O(q){const rt=y.indexOf(q.inputSource);if(rt===-1)return;const Et=S[rt];Et!==void 0&&(Et.update(q.inputSource,q.frame,l||o),Et.dispatchEvent({type:q.type,data:q.inputSource}))}function H(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",X);for(let q=0;q<S.length;q++){const rt=y[q];rt!==null&&(y[q]=null,S[q].disconnect(rt))}C=null,z=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,b=null,Xt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",H),s.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const rt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Yn(f.framebufferWidth,f.framebufferHeight,{format:He,type:un,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let rt=null,Et=null,Z=null;m.depth&&(Z=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=m.stencil?wi:gi,Et=m.stencil?bi:Xn);const ht={colorFormat:e.RGBA8,depthFormat:Z,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(ht),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new Yn(d.textureWidth,d.textureHeight,{format:He,type:un,depthTexture:new Zl(d.textureWidth,d.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Xt.setContext(s),Xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(q){for(let rt=0;rt<q.removed.length;rt++){const Et=q.removed[rt],Z=y.indexOf(Et);Z>=0&&(y[Z]=null,S[Z].disconnect(Et))}for(let rt=0;rt<q.added.length;rt++){const Et=q.added[rt];let Z=y.indexOf(Et);if(Z===-1){for(let wt=0;wt<S.length;wt++)if(wt>=y.length){y.push(Et),Z=wt;break}else if(y[wt]===null){y[wt]=Et,Z=wt;break}if(Z===-1)break}const ht=S[Z];ht&&ht.connect(Et)}}const V=new L,J=new L;function G(q,rt,Et){V.setFromMatrixPosition(rt.matrixWorld),J.setFromMatrixPosition(Et.matrixWorld);const Z=V.distanceTo(J),ht=rt.projectionMatrix.elements,wt=Et.projectionMatrix.elements,bt=ht[14]/(ht[10]-1),Vt=ht[14]/(ht[10]+1),K=(ht[9]+1)/ht[5],st=(ht[9]-1)/ht[5],T=(ht[8]-1)/ht[0],Pt=(wt[8]+1)/wt[0],nt=bt*T,yt=bt*Pt,at=Z/(-T+Pt),Dt=at*-T;if(rt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Dt),q.translateZ(at),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ht[10]===-1)q.projectionMatrix.copy(rt.projectionMatrix),q.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const _t=bt+at,w=Vt+at,v=nt-Dt,F=yt+(Z-Dt),Y=K*Vt/w*_t,Q=st*Vt/w*_t;q.projectionMatrix.makePerspective(v,F,Y,Q,_t,w),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ct(q,rt){rt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(rt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let rt=q.near,Et=q.far;_.texture!==null&&(_.depthNear>0&&(rt=_.depthNear),_.depthFar>0&&(Et=_.depthFar)),x.near=P.near=A.near=rt,x.far=P.far=A.far=Et,(C!==x.near||z!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,z=x.far),A.layers.mask=q.layers.mask|2,P.layers.mask=q.layers.mask|4,x.layers.mask=A.layers.mask|P.layers.mask;const Z=q.parent,ht=x.cameras;ct(x,Z);for(let wt=0;wt<ht.length;wt++)ct(ht[wt],Z);ht.length===2?G(x,A,P):x.projectionMatrix.copy(A.projectionMatrix),dt(q,x,Z)};function dt(q,rt,Et){Et===null?q.matrix.copy(rt.matrixWorld):(q.matrix.copy(Et.matrixWorld),q.matrix.invert(),q.matrix.multiply(rt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(rt.projectionMatrix),q.projectionMatrixInverse.copy(rt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ki*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(q){c=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let xt=null;function Ut(q,rt){if(h=rt.getViewerPose(l||o),g=rt,h!==null){const Et=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let Z=!1;Et.length!==x.cameras.length&&(x.cameras.length=0,Z=!0);for(let wt=0;wt<Et.length;wt++){const bt=Et[wt];let Vt=null;if(f!==null)Vt=f.getViewport(bt);else{const st=u.getViewSubImage(d,bt);Vt=st.viewport,wt===0&&(t.setRenderTargetTextures(b,st.colorTexture,d.ignoreDepthValues?void 0:st.depthStencilTexture),t.setRenderTarget(b))}let K=E[wt];K===void 0&&(K=new Ue,K.layers.enable(wt),K.viewport=new le,E[wt]=K),K.matrix.fromArray(bt.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(bt.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Vt.x,Vt.y,Vt.width,Vt.height),wt===0&&(x.matrix.copy(K.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),Z===!0&&x.cameras.push(K)}const ht=s.enabledFeatures;if(ht&&ht.includes("depth-sensing")){const wt=u.getDepthInformation(Et[0]);wt&&wt.isValid&&wt.texture&&_.init(t,wt,s.renderState)}}for(let Et=0;Et<S.length;Et++){const Z=y[Et],ht=S[Et];Z!==null&&ht!==void 0&&ht.update(Z,rt,l||o)}xt&&xt(q,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),g=null}const Xt=new ql;Xt.setAnimationLoop(Ut),this.setAnimationLoop=function(q){xt=q},this.dispose=function(){}}}const On=new qe,p_=new se;function m_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,S,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===we&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===we&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),S=b.envMap,y=b.envMapRotation;S&&(m.envMap.value=S,On.copy(y),On.x*=-1,On.y*=-1,On.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),m.envMapRotation.value.setFromMatrix4(p_.makeRotationFromEuler(On)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===we&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function g_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,S){const y=S.program;n.uniformBlockBinding(b,y)}function l(b,S){let y=s[b.id];y===void 0&&(g(b),y=h(b),s[b.id]=y,b.addEventListener("dispose",m));const N=S.program;n.updateUBOMapping(b,N);const R=t.render.frame;r[b.id]!==R&&(d(b),r[b.id]=R)}function h(b){const S=u();b.__bindingPointIndex=S;const y=i.createBuffer(),N=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,N,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,y),y}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const S=s[b.id],y=b.uniforms,N=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let R=0,A=y.length;R<A;R++){const P=Array.isArray(y[R])?y[R]:[y[R]];for(let E=0,x=P.length;E<x;E++){const C=P[E];if(f(C,R,E,N)===!0){const z=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let H=0;for(let X=0;X<O.length;X++){const V=O[X],J=_(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,z+H,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,H),H+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,S,y,N){const R=b.value,A=S+"_"+y;if(N[A]===void 0)return typeof R=="number"||typeof R=="boolean"?N[A]=R:N[A]=R.clone(),!0;{const P=N[A];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return N[A]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(b){const S=b.uniforms;let y=0;const N=16;for(let A=0,P=S.length;A<P;A++){const E=Array.isArray(S[A])?S[A]:[S[A]];for(let x=0,C=E.length;x<C;x++){const z=E[x],O=Array.isArray(z.value)?z.value:[z.value];for(let H=0,X=O.length;H<X;H++){const V=O[H],J=_(V),G=y%N,ct=G%J.boundary,dt=G+ct;y+=ct,dt!==0&&N-dt<J.storage&&(y+=N-dt),z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=J.storage}}}const R=y%N;return R>0&&(y+=N-R),b.__size=y,b.__cache={},this}function _(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const y=o.indexOf(S.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class __{constructor(t={}){const{canvas:e=rf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=be,this.toneMapping=An,this.toneMappingExposure=1;const y=this;let N=!1,R=0,A=0,P=null,E=-1,x=null;const C=new le,z=new le;let O=null;const H=new Wt(0);let X=0,V=e.width,J=e.height,G=1,ct=null,dt=null;const xt=new le(0,0,V,J),Ut=new le(0,0,V,J);let Xt=!1;const q=new ga;let rt=!1,Et=!1;const Z=new se,ht=new se,wt=new L,bt=new le,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let K=!1;function st(){return P===null?G:1}let T=n;function Pt(M,I){return e.getContext(M,I)}try{const M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${oa}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),T===null){const I="webgl2";if(T=Pt(I,M),T===null)throw Pt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let nt,yt,at,Dt,_t,w,v,F,Y,Q,$,Tt,ut,vt,Gt,it,Mt,It,Nt,St,Yt,zt,te,D;function ft(){nt=new Sm(T),nt.init(),zt=new a_(T,nt),yt=new gm(T,nt,t,zt),at=new s_(T,nt),yt.reverseDepthBuffer&&d&&at.buffers.depth.setReversed(!0),Dt=new wm(T),_t=new Gg,w=new o_(T,nt,at,_t,yt,zt,Dt),v=new vm(y),F=new Mm(y),Y=new Df(T),te=new pm(T,Y),Q=new Em(T,Y,Dt,te),$=new Am(T,Q,Y,Dt),Nt=new Tm(T,yt,w),it=new _m(_t),Tt=new Vg(y,v,F,nt,yt,te,it),ut=new m_(y,_t),vt=new Xg,Gt=new Kg(nt),It=new dm(y,v,F,at,$,f,c),Mt=new n_(y,$,yt),D=new g_(T,Dt,yt,at),St=new mm(T,nt,Dt),Yt=new bm(T,nt,Dt),Dt.programs=Tt.programs,y.capabilities=yt,y.extensions=nt,y.properties=_t,y.renderLists=vt,y.shadowMap=Mt,y.state=at,y.info=Dt}ft();const W=new d_(y,T);this.xr=W,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const M=nt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=nt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(M){M!==void 0&&(G=M,this.setSize(V,J,!1))},this.getSize=function(M){return M.set(V,J)},this.setSize=function(M,I,B=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=M,J=I,e.width=Math.floor(M*G),e.height=Math.floor(I*G),B===!0&&(e.style.width=M+"px",e.style.height=I+"px"),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(V*G,J*G).floor()},this.setDrawingBufferSize=function(M,I,B){V=M,J=I,G=B,e.width=Math.floor(M*B),e.height=Math.floor(I*B),this.setViewport(0,0,M,I)},this.getCurrentViewport=function(M){return M.copy(C)},this.getViewport=function(M){return M.copy(xt)},this.setViewport=function(M,I,B,k){M.isVector4?xt.set(M.x,M.y,M.z,M.w):xt.set(M,I,B,k),at.viewport(C.copy(xt).multiplyScalar(G).round())},this.getScissor=function(M){return M.copy(Ut)},this.setScissor=function(M,I,B,k){M.isVector4?Ut.set(M.x,M.y,M.z,M.w):Ut.set(M,I,B,k),at.scissor(z.copy(Ut).multiplyScalar(G).round())},this.getScissorTest=function(){return Xt},this.setScissorTest=function(M){at.setScissorTest(Xt=M)},this.setOpaqueSort=function(M){ct=M},this.setTransparentSort=function(M){dt=M},this.getClearColor=function(M){return M.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(M=!0,I=!0,B=!0){let k=0;if(M){let U=!1;if(P!==null){const ot=P.texture.format;U=ot===fa||ot===ua||ot===ha}if(U){const ot=P.texture.type,mt=ot===un||ot===Xn||ot===Ji||ot===bi||ot===ca||ot===la,At=It.getClearColor(),Rt=It.getClearAlpha(),Ft=At.r,Bt=At.g,Ct=At.b;mt?(g[0]=Ft,g[1]=Bt,g[2]=Ct,g[3]=Rt,T.clearBufferuiv(T.COLOR,0,g)):(_[0]=Ft,_[1]=Bt,_[2]=Ct,_[3]=Rt,T.clearBufferiv(T.COLOR,0,_))}else k|=T.COLOR_BUFFER_BIT}I&&(k|=T.DEPTH_BUFFER_BIT),B&&(k|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),vt.dispose(),Gt.dispose(),_t.dispose(),v.dispose(),F.dispose(),$.dispose(),te.dispose(),D.dispose(),Tt.dispose(),W.dispose(),W.removeEventListener("sessionstart",Ta),W.removeEventListener("sessionend",Aa),Ln.stop()};function j(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const M=Dt.autoReset,I=Mt.enabled,B=Mt.autoUpdate,k=Mt.needsUpdate,U=Mt.type;ft(),Dt.autoReset=M,Mt.enabled=I,Mt.autoUpdate=B,Mt.needsUpdate=k,Mt.type=U}function pt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ot(M){const I=M.target;I.removeEventListener("dispose",Ot),ce(I)}function ce(M){ge(M),_t.remove(M)}function ge(M){const I=_t.get(M).programs;I!==void 0&&(I.forEach(function(B){Tt.releaseProgram(B)}),M.isShaderMaterial&&Tt.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,B,k,U,ot){I===null&&(I=Vt);const mt=U.isMesh&&U.matrixWorld.determinant()<0,At=uh(M,I,B,k,U);at.setMaterial(k,mt);let Rt=B.index,Ft=1;if(k.wireframe===!0){if(Rt=Q.getWireframeAttribute(B),Rt===void 0)return;Ft=2}const Bt=B.drawRange,Ct=B.attributes.position;let $t=Bt.start*Ft,ee=(Bt.start+Bt.count)*Ft;ot!==null&&($t=Math.max($t,ot.start*Ft),ee=Math.min(ee,(ot.start+ot.count)*Ft)),Rt!==null?($t=Math.max($t,0),ee=Math.min(ee,Rt.count)):Ct!=null&&($t=Math.max($t,0),ee=Math.min(ee,Ct.count));const ne=ee-$t;if(ne<0||ne===1/0)return;te.setup(U,k,At,B,Rt);let Te,Zt=St;if(Rt!==null&&(Te=Y.get(Rt),Zt=Yt,Zt.setIndex(Te)),U.isMesh)k.wireframe===!0?(at.setLineWidth(k.wireframeLinewidth*st()),Zt.setMode(T.LINES)):Zt.setMode(T.TRIANGLES);else if(U.isLine){let Lt=k.linewidth;Lt===void 0&&(Lt=1),at.setLineWidth(Lt*st()),U.isLineSegments?Zt.setMode(T.LINES):U.isLineLoop?Zt.setMode(T.LINE_LOOP):Zt.setMode(T.LINE_STRIP)}else U.isPoints?Zt.setMode(T.POINTS):U.isSprite&&Zt.setMode(T.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Zt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))Zt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Lt=U._multiDrawStarts,Je=U._multiDrawCounts,Jt=U._multiDrawCount,Fe=Rt?Y.get(Rt).bytesPerElement:1,Zn=_t.get(k).currentProgram.getUniforms();for(let Ae=0;Ae<Jt;Ae++)Zn.setValue(T,"_gl_DrawID",Ae),Zt.render(Lt[Ae]/Fe,Je[Ae])}else if(U.isInstancedMesh)Zt.renderInstances($t,ne,U.count);else if(B.isInstancedBufferGeometry){const Lt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Je=Math.min(B.instanceCount,Lt);Zt.renderInstances($t,ne,Je)}else Zt.render($t,ne)};function Kt(M,I,B){M.transparent===!0&&M.side===an&&M.forceSinglePass===!1?(M.side=we,M.needsUpdate=!0,gs(M,I,B),M.side=Cn,M.needsUpdate=!0,gs(M,I,B),M.side=an):gs(M,I,B)}this.compile=function(M,I,B=null){B===null&&(B=M),p=Gt.get(B),p.init(I),S.push(p),B.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),M!==B&&M.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const k=new Set;return M.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ot=U.material;if(ot)if(Array.isArray(ot))for(let mt=0;mt<ot.length;mt++){const At=ot[mt];Kt(At,B,U),k.add(At)}else Kt(ot,B,U),k.add(ot)}),S.pop(),p=null,k},this.compileAsync=function(M,I,B=null){const k=this.compile(M,I,B);return new Promise(U=>{function ot(){if(k.forEach(function(mt){_t.get(mt).currentProgram.isReady()&&k.delete(mt)}),k.size===0){U(M);return}setTimeout(ot,10)}nt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Ne=null;function Ze(M){Ne&&Ne(M)}function Ta(){Ln.stop()}function Aa(){Ln.start()}const Ln=new ql;Ln.setAnimationLoop(Ze),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(M){Ne=M,W.setAnimationLoop(M),M===null?Ln.stop():Ln.start()},W.addEventListener("sessionstart",Ta),W.addEventListener("sessionend",Aa),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(I),I=W.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,I,P),p=Gt.get(M,S.length),p.init(I),S.push(p),ht.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(ht),Et=this.localClippingEnabled,rt=it.init(this.clippingPlanes,Et),m=vt.get(M,b.length),m.init(),b.push(m),W.enabled===!0&&W.isPresenting===!0){const ot=y.xr.getDepthSensingMesh();ot!==null&&_r(ot,I,-1/0,y.sortObjects)}_r(M,I,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ct,dt),K=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,K&&It.addToRenderList(m,M),this.info.render.frame++,rt===!0&&it.beginShadows();const B=p.state.shadowsArray;Mt.render(B,M,I),rt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=m.opaque,U=m.transmissive;if(p.setupLights(),I.isArrayCamera){const ot=I.cameras;if(U.length>0)for(let mt=0,At=ot.length;mt<At;mt++){const Rt=ot[mt];Ca(k,U,M,Rt)}K&&It.render(M);for(let mt=0,At=ot.length;mt<At;mt++){const Rt=ot[mt];Ra(m,M,Rt,Rt.viewport)}}else U.length>0&&Ca(k,U,M,I),K&&It.render(M),Ra(m,M,I);P!==null&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),M.isScene===!0&&M.onAfterRender(y,M,I),te.resetDefaultState(),E=-1,x=null,S.pop(),S.length>0?(p=S[S.length-1],rt===!0&&it.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function _r(M,I,B,k){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||q.intersectsSprite(M)){k&&bt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ht);const mt=$.update(M),At=M.material;At.visible&&m.push(M,mt,At,B,bt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||q.intersectsObject(M))){const mt=$.update(M),At=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),bt.copy(M.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),bt.copy(mt.boundingSphere.center)),bt.applyMatrix4(M.matrixWorld).applyMatrix4(ht)),Array.isArray(At)){const Rt=mt.groups;for(let Ft=0,Bt=Rt.length;Ft<Bt;Ft++){const Ct=Rt[Ft],$t=At[Ct.materialIndex];$t&&$t.visible&&m.push(M,mt,$t,B,bt.z,Ct)}}else At.visible&&m.push(M,mt,At,B,bt.z,null)}}const ot=M.children;for(let mt=0,At=ot.length;mt<At;mt++)_r(ot[mt],I,B,k)}function Ra(M,I,B,k){const U=M.opaque,ot=M.transmissive,mt=M.transparent;p.setupLightsView(B),rt===!0&&it.setGlobalState(y.clippingPlanes,B),k&&at.viewport(C.copy(k)),U.length>0&&ms(U,I,B),ot.length>0&&ms(ot,I,B),mt.length>0&&ms(mt,I,B),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function Ca(M,I,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new Yn(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?cs:un,minFilter:Vn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const ot=p.state.transmissionRenderTarget[k.id],mt=k.viewport||C;ot.setSize(mt.z,mt.w);const At=y.getRenderTarget();y.setRenderTarget(ot),y.getClearColor(H),X=y.getClearAlpha(),X<1&&y.setClearColor(16777215,.5),y.clear(),K&&It.render(B);const Rt=y.toneMapping;y.toneMapping=An;const Ft=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),rt===!0&&it.setGlobalState(y.clippingPlanes,k),ms(M,B,k),w.updateMultisampleRenderTarget(ot),w.updateRenderTargetMipmap(ot),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let Ct=0,$t=I.length;Ct<$t;Ct++){const ee=I[Ct],ne=ee.object,Te=ee.geometry,Zt=ee.material,Lt=ee.group;if(Zt.side===an&&ne.layers.test(k.layers)){const Je=Zt.side;Zt.side=we,Zt.needsUpdate=!0,Pa(ne,B,k,Te,Zt,Lt),Zt.side=Je,Zt.needsUpdate=!0,Bt=!0}}Bt===!0&&(w.updateMultisampleRenderTarget(ot),w.updateRenderTargetMipmap(ot))}y.setRenderTarget(At),y.setClearColor(H,X),Ft!==void 0&&(k.viewport=Ft),y.toneMapping=Rt}function ms(M,I,B){const k=I.isScene===!0?I.overrideMaterial:null;for(let U=0,ot=M.length;U<ot;U++){const mt=M[U],At=mt.object,Rt=mt.geometry,Ft=k===null?mt.material:k,Bt=mt.group;At.layers.test(B.layers)&&Pa(At,I,B,Rt,Ft,Bt)}}function Pa(M,I,B,k,U,ot){M.onBeforeRender(y,I,B,k,U,ot),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),U.onBeforeRender(y,I,B,k,M,ot),U.transparent===!0&&U.side===an&&U.forceSinglePass===!1?(U.side=we,U.needsUpdate=!0,y.renderBufferDirect(B,I,k,U,M,ot),U.side=Cn,U.needsUpdate=!0,y.renderBufferDirect(B,I,k,U,M,ot),U.side=an):y.renderBufferDirect(B,I,k,U,M,ot),M.onAfterRender(y,I,B,k,U,ot)}function gs(M,I,B){I.isScene!==!0&&(I=Vt);const k=_t.get(M),U=p.state.lights,ot=p.state.shadowsArray,mt=U.state.version,At=Tt.getParameters(M,U.state,ot,I,B),Rt=Tt.getProgramCacheKey(At);let Ft=k.programs;k.environment=M.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(M.isMeshStandardMaterial?F:v).get(M.envMap||k.environment),k.envMapRotation=k.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Ft===void 0&&(M.addEventListener("dispose",Ot),Ft=new Map,k.programs=Ft);let Bt=Ft.get(Rt);if(Bt!==void 0){if(k.currentProgram===Bt&&k.lightsStateVersion===mt)return Da(M,At),Bt}else At.uniforms=Tt.getUniforms(M),M.onBeforeCompile(At,y),Bt=Tt.acquireProgram(At,Rt),Ft.set(Rt,Bt),k.uniforms=At.uniforms;const Ct=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ct.clippingPlanes=it.uniform),Da(M,At),k.needsLights=dh(M),k.lightsStateVersion=mt,k.needsLights&&(Ct.ambientLightColor.value=U.state.ambient,Ct.lightProbe.value=U.state.probe,Ct.directionalLights.value=U.state.directional,Ct.directionalLightShadows.value=U.state.directionalShadow,Ct.spotLights.value=U.state.spot,Ct.spotLightShadows.value=U.state.spotShadow,Ct.rectAreaLights.value=U.state.rectArea,Ct.ltc_1.value=U.state.rectAreaLTC1,Ct.ltc_2.value=U.state.rectAreaLTC2,Ct.pointLights.value=U.state.point,Ct.pointLightShadows.value=U.state.pointShadow,Ct.hemisphereLights.value=U.state.hemi,Ct.directionalShadowMap.value=U.state.directionalShadowMap,Ct.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Ct.spotShadowMap.value=U.state.spotShadowMap,Ct.spotLightMatrix.value=U.state.spotLightMatrix,Ct.spotLightMap.value=U.state.spotLightMap,Ct.pointShadowMap.value=U.state.pointShadowMap,Ct.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=Bt,k.uniformsList=null,Bt}function La(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=js.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function Da(M,I){const B=_t.get(M);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function uh(M,I,B,k,U){I.isScene!==!0&&(I=Vt),w.resetTextureUnits();const ot=I.fog,mt=k.isMeshStandardMaterial?I.environment:null,At=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ci,Rt=(k.isMeshStandardMaterial?F:v).get(k.envMap||mt),Ft=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Bt=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ct=!!B.morphAttributes.position,$t=!!B.morphAttributes.normal,ee=!!B.morphAttributes.color;let ne=An;k.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ne=y.toneMapping);const Te=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Zt=Te!==void 0?Te.length:0,Lt=_t.get(k),Je=p.state.lights;if(rt===!0&&(Et===!0||M!==x)){const De=M===x&&k.id===E;it.setState(k,M,De)}let Jt=!1;k.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Je.state.version||Lt.outputColorSpace!==At||U.isBatchedMesh&&Lt.batching===!1||!U.isBatchedMesh&&Lt.batching===!0||U.isBatchedMesh&&Lt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Lt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Lt.instancing===!1||!U.isInstancedMesh&&Lt.instancing===!0||U.isSkinnedMesh&&Lt.skinning===!1||!U.isSkinnedMesh&&Lt.skinning===!0||U.isInstancedMesh&&Lt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Lt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Lt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Lt.instancingMorph===!1&&U.morphTexture!==null||Lt.envMap!==Rt||k.fog===!0&&Lt.fog!==ot||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==it.numPlanes||Lt.numIntersection!==it.numIntersection)||Lt.vertexAlphas!==Ft||Lt.vertexTangents!==Bt||Lt.morphTargets!==Ct||Lt.morphNormals!==$t||Lt.morphColors!==ee||Lt.toneMapping!==ne||Lt.morphTargetsCount!==Zt)&&(Jt=!0):(Jt=!0,Lt.__version=k.version);let Fe=Lt.currentProgram;Jt===!0&&(Fe=gs(k,I,U));let Zn=!1,Ae=!1,Di=!1;const ie=Fe.getUniforms(),Ge=Lt.uniforms;if(at.useProgram(Fe.program)&&(Zn=!0,Ae=!0,Di=!0),k.id!==E&&(E=k.id,Ae=!0),Zn||x!==M){at.buffers.depth.getReversed()?(Z.copy(M.projectionMatrix),af(Z),cf(Z),ie.setValue(T,"projectionMatrix",Z)):ie.setValue(T,"projectionMatrix",M.projectionMatrix),ie.setValue(T,"viewMatrix",M.matrixWorldInverse);const fn=ie.map.cameraPosition;fn!==void 0&&fn.setValue(T,wt.setFromMatrixPosition(M.matrixWorld)),yt.logarithmicDepthBuffer&&ie.setValue(T,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ie.setValue(T,"isOrthographic",M.isOrthographicCamera===!0),x!==M&&(x=M,Ae=!0,Di=!0)}if(U.isSkinnedMesh){ie.setOptional(T,U,"bindMatrix"),ie.setOptional(T,U,"bindMatrixInverse");const De=U.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),ie.setValue(T,"boneTexture",De.boneTexture,w))}U.isBatchedMesh&&(ie.setOptional(T,U,"batchingTexture"),ie.setValue(T,"batchingTexture",U._matricesTexture,w),ie.setOptional(T,U,"batchingIdTexture"),ie.setValue(T,"batchingIdTexture",U._indirectTexture,w),ie.setOptional(T,U,"batchingColorTexture"),U._colorsTexture!==null&&ie.setValue(T,"batchingColorTexture",U._colorsTexture,w));const Ii=B.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&Nt.update(U,B,Fe),(Ae||Lt.receiveShadow!==U.receiveShadow)&&(Lt.receiveShadow=U.receiveShadow,ie.setValue(T,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Ge.envMap.value=Rt,Ge.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&I.environment!==null&&(Ge.envMapIntensity.value=I.environmentIntensity),Ae&&(ie.setValue(T,"toneMappingExposure",y.toneMappingExposure),Lt.needsLights&&fh(Ge,Di),ot&&k.fog===!0&&ut.refreshFogUniforms(Ge,ot),ut.refreshMaterialUniforms(Ge,k,G,J,p.state.transmissionRenderTarget[M.id]),js.upload(T,La(Lt),Ge,w)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(js.upload(T,La(Lt),Ge,w),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ie.setValue(T,"center",U.center),ie.setValue(T,"modelViewMatrix",U.modelViewMatrix),ie.setValue(T,"normalMatrix",U.normalMatrix),ie.setValue(T,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const De=k.uniformsGroups;for(let fn=0,dn=De.length;fn<dn;fn++){const Ia=De[fn];D.update(Ia,Fe),D.bind(Ia,Fe)}}return Fe}function fh(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function dh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(M,I,B){_t.get(M.texture).__webglTexture=I,_t.get(M.depthTexture).__webglTexture=B;const k=_t.get(M);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,I){const B=_t.get(M);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,B=0){P=M,R=I,A=B;let k=!0,U=null,ot=!1,mt=!1;if(M){const Rt=_t.get(M);if(Rt.__useDefaultFramebuffer!==void 0)at.bindFramebuffer(T.FRAMEBUFFER,null),k=!1;else if(Rt.__webglFramebuffer===void 0)w.setupRenderTarget(M);else if(Rt.__hasExternalTextures)w.rebindTextures(M,_t.get(M.texture).__webglTexture,_t.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ct=M.depthTexture;if(Rt.__boundDepthTexture!==Ct){if(Ct!==null&&_t.has(Ct)&&(M.width!==Ct.image.width||M.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(M)}}const Ft=M.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(mt=!0);const Bt=_t.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Bt[I])?U=Bt[I][B]:U=Bt[I],ot=!0):M.samples>0&&w.useMultisampledRTT(M)===!1?U=_t.get(M).__webglMultisampledFramebuffer:Array.isArray(Bt)?U=Bt[B]:U=Bt,C.copy(M.viewport),z.copy(M.scissor),O=M.scissorTest}else C.copy(xt).multiplyScalar(G).floor(),z.copy(Ut).multiplyScalar(G).floor(),O=Xt;if(at.bindFramebuffer(T.FRAMEBUFFER,U)&&k&&at.drawBuffers(M,U),at.viewport(C),at.scissor(z),at.setScissorTest(O),ot){const Rt=_t.get(M.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+I,Rt.__webglTexture,B)}else if(mt){const Rt=_t.get(M.texture),Ft=I||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Rt.__webglTexture,B||0,Ft)}E=-1},this.readRenderTargetPixels=function(M,I,B,k,U,ot,mt){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=_t.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&mt!==void 0&&(At=At[mt]),At){at.bindFramebuffer(T.FRAMEBUFFER,At);try{const Rt=M.texture,Ft=Rt.format,Bt=Rt.type;if(!yt.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-k&&B>=0&&B<=M.height-U&&T.readPixels(I,B,k,U,zt.convert(Ft),zt.convert(Bt),ot)}finally{const Rt=P!==null?_t.get(P).__webglFramebuffer:null;at.bindFramebuffer(T.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(M,I,B,k,U,ot,mt){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=_t.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&mt!==void 0&&(At=At[mt]),At){const Rt=M.texture,Ft=Rt.format,Bt=Rt.type;if(!yt.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=M.width-k&&B>=0&&B<=M.height-U){at.bindFramebuffer(T.FRAMEBUFFER,At);const Ct=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Ct),T.bufferData(T.PIXEL_PACK_BUFFER,ot.byteLength,T.STREAM_READ),T.readPixels(I,B,k,U,zt.convert(Ft),zt.convert(Bt),0);const $t=P!==null?_t.get(P).__webglFramebuffer:null;at.bindFramebuffer(T.FRAMEBUFFER,$t);const ee=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await of(T,ee,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Ct),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,ot),T.deleteBuffer(Ct),T.deleteSync(ee),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,I=null,B=0){M.isTexture!==!0&&(zi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,M=arguments[1]);const k=Math.pow(2,-B),U=Math.floor(M.image.width*k),ot=Math.floor(M.image.height*k),mt=I!==null?I.x:0,At=I!==null?I.y:0;w.setTexture2D(M,0),T.copyTexSubImage2D(T.TEXTURE_2D,B,0,0,mt,At,U,ot),at.unbindTexture()},this.copyTextureToTexture=function(M,I,B=null,k=null,U=0){M.isTexture!==!0&&(zi("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,M=arguments[1],I=arguments[2],U=arguments[3]||0,B=null);let ot,mt,At,Rt,Ft,Bt,Ct,$t,ee;const ne=M.isCompressedTexture?M.mipmaps[U]:M.image;B!==null?(ot=B.max.x-B.min.x,mt=B.max.y-B.min.y,At=B.isBox3?B.max.z-B.min.z:1,Rt=B.min.x,Ft=B.min.y,Bt=B.isBox3?B.min.z:0):(ot=ne.width,mt=ne.height,At=ne.depth||1,Rt=0,Ft=0,Bt=0),k!==null?(Ct=k.x,$t=k.y,ee=k.z):(Ct=0,$t=0,ee=0);const Te=zt.convert(I.format),Zt=zt.convert(I.type);let Lt;I.isData3DTexture?(w.setTexture3D(I,0),Lt=T.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(w.setTexture2DArray(I,0),Lt=T.TEXTURE_2D_ARRAY):(w.setTexture2D(I,0),Lt=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,I.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,I.unpackAlignment);const Je=T.getParameter(T.UNPACK_ROW_LENGTH),Jt=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Fe=T.getParameter(T.UNPACK_SKIP_PIXELS),Zn=T.getParameter(T.UNPACK_SKIP_ROWS),Ae=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,ne.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ne.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Rt),T.pixelStorei(T.UNPACK_SKIP_ROWS,Ft),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Bt);const Di=M.isDataArrayTexture||M.isData3DTexture,ie=I.isDataArrayTexture||I.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const Ge=_t.get(M),Ii=_t.get(I),De=_t.get(Ge.__renderTarget),fn=_t.get(Ii.__renderTarget);at.bindFramebuffer(T.READ_FRAMEBUFFER,De.__webglFramebuffer),at.bindFramebuffer(T.DRAW_FRAMEBUFFER,fn.__webglFramebuffer);for(let dn=0;dn<At;dn++)Di&&T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_t.get(M).__webglTexture,U,Bt+dn),M.isDepthTexture?(ie&&T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_t.get(I).__webglTexture,U,ee+dn),T.blitFramebuffer(Rt,Ft,ot,mt,Ct,$t,ot,mt,T.DEPTH_BUFFER_BIT,T.NEAREST)):ie?T.copyTexSubImage3D(Lt,U,Ct,$t,ee+dn,Rt,Ft,ot,mt):T.copyTexSubImage2D(Lt,U,Ct,$t,ee+dn,Rt,Ft,ot,mt);at.bindFramebuffer(T.READ_FRAMEBUFFER,null),at.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else ie?M.isDataTexture||M.isData3DTexture?T.texSubImage3D(Lt,U,Ct,$t,ee,ot,mt,At,Te,Zt,ne.data):I.isCompressedArrayTexture?T.compressedTexSubImage3D(Lt,U,Ct,$t,ee,ot,mt,At,Te,ne.data):T.texSubImage3D(Lt,U,Ct,$t,ee,ot,mt,At,Te,Zt,ne):M.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,U,Ct,$t,ot,mt,Te,Zt,ne.data):M.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,U,Ct,$t,ne.width,ne.height,Te,ne.data):T.texSubImage2D(T.TEXTURE_2D,U,Ct,$t,ot,mt,Te,Zt,ne);T.pixelStorei(T.UNPACK_ROW_LENGTH,Je),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Jt),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Fe),T.pixelStorei(T.UNPACK_SKIP_ROWS,Zn),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ae),U===0&&I.generateMipmaps&&T.generateMipmap(Lt),at.unbindTexture()},this.copyTextureToTexture3D=function(M,I,B=null,k=null,U=0){return M.isTexture!==!0&&(zi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,M=arguments[2],I=arguments[3],U=arguments[4]||0),zi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,I,B,k,U)},this.initRenderTarget=function(M){_t.get(M).__webglFramebuffer===void 0&&w.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?w.setTextureCube(M,0):M.isData3DTexture?w.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?w.setTexture2DArray(M,0):w.setTexture2D(M,0),at.unbindTexture()},this.resetState=function(){R=0,A=0,P=null,at.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class va{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=n}clone(){return new va(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class v_ extends me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qe,this.environmentIntensity=1,this.environmentRotation=new qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class x_ extends ye{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $e{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new et:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new L,s=[],r=[],o=[],a=new L,c=new se;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(pe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(pe(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class xa extends $e{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new et){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class y_ extends xa{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ya(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const zs=new L,$r=new ya,Zr=new ya,Jr=new ya;class M_ extends $e{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(zs.subVectors(s[0],s[1]).add(s[0]),l=zs);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(zs.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=zs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),$r.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),Zr.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),Jr.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&($r.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Zr.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Jr.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set($r.calc(c),Zr.calc(c),Jr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function zc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function S_(i,t){const e=1-i;return e*e*t}function E_(i,t){return 2*(1-i)*i*t}function b_(i,t){return i*i*t}function Xi(i,t,e,n){return S_(i,t)+E_(i,e)+b_(i,n)}function w_(i,t){const e=1-i;return e*e*e*t}function T_(i,t){const e=1-i;return 3*e*e*i*t}function A_(i,t){return 3*(1-i)*i*i*t}function R_(i,t){return i*i*i*t}function Yi(i,t,e,n,s){return w_(i,t)+T_(i,e)+A_(i,n)+R_(i,s)}class th extends $e{constructor(t=new et,e=new et,n=new et,s=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new et){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Yi(t,s.x,r.x,o.x,a.x),Yi(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class C_ extends $e{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Yi(t,s.x,r.x,o.x,a.x),Yi(t,s.y,r.y,o.y,a.y),Yi(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class eh extends $e{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class P_ extends $e{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nh extends $e{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Xi(t,s.x,r.x,o.x),Xi(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class L_ extends $e{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Xi(t,s.x,r.x,o.x),Xi(t,s.y,r.y,o.y),Xi(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ih extends $e{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(zc(a,c.x,l.x,h.x,u.x),zc(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new et().fromArray(s))}return this}}var Yo=Object.freeze({__proto__:null,ArcCurve:y_,CatmullRomCurve3:M_,CubicBezierCurve:th,CubicBezierCurve3:C_,EllipseCurve:xa,LineCurve:eh,LineCurve3:P_,QuadraticBezierCurve:nh,QuadraticBezierCurve3:L_,SplineCurve:ih});class D_ extends $e{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Yo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Yo[s.type]().fromJSON(s))}return this}}class qo extends D_{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new eh(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new nh(this.currentPoint.clone(),new et(t,e),new et(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new th(this.currentPoint.clone(),new et(t,e),new et(n,s),new et(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new ih(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new xa(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ma extends Le{constructor(t=[new et(0,-.5),new et(.5,0),new et(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=pe(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/e,u=new L,d=new et,f=new L,g=new L,_=new L;let m=0,p=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let b=0;b<=e;b++){const S=n+b*h*s,y=Math.sin(S),N=Math.cos(S);for(let R=0;R<=t.length-1;R++){u.x=t[R].x*y,u.y=t[R].y,u.z=t[R].x*N,o.push(u.x,u.y,u.z),d.x=b/e,d.y=R/(t.length-1),a.push(d.x,d.y);const A=c[3*R+0]*y,P=c[3*R+1],E=c[3*R+0]*N;l.push(A,P,E)}}for(let b=0;b<e;b++)for(let S=0;S<t.length-1;S++){const y=S+b*t.length,N=y,R=y+t.length,A=y+t.length+1,P=y+1;r.push(N,R,P),r.push(A,P,R)}this.setIndex(r),this.setAttribute("position",new re(o,3)),this.setAttribute("uv",new re(a,2)),this.setAttribute("normal",new re(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ma(t.points,t.segments,t.phiStart,t.phiLength)}}class Qi extends Le{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new L,h=new et;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new re(o,3)),this.setAttribute("normal",new re(a,3)),this.setAttribute("uv",new re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class vi extends Le{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;b(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new re(u,3)),this.setAttribute("normal",new re(d,3)),this.setAttribute("uv",new re(f,2));function b(){const y=new L,N=new L;let R=0;const A=(e-t)/n;for(let P=0;P<=r;P++){const E=[],x=P/r,C=x*(e-t)+t;for(let z=0;z<=s;z++){const O=z/s,H=O*c+a,X=Math.sin(H),V=Math.cos(H);N.x=C*X,N.y=-x*n+m,N.z=C*V,u.push(N.x,N.y,N.z),y.set(X,A,V).normalize(),d.push(y.x,y.y,y.z),f.push(O,1-x),E.push(g++)}_.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){const x=_[E][P],C=_[E+1][P],z=_[E+1][P+1],O=_[E][P+1];(t>0||E!==0)&&(h.push(x,C,O),R+=3),(e>0||E!==r-1)&&(h.push(C,z,O),R+=3)}l.addGroup(p,R,0),p+=R}function S(y){const N=g,R=new et,A=new L;let P=0;const E=y===!0?t:e,x=y===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const C=g;for(let z=0;z<=s;z++){const H=z/s*c+a,X=Math.cos(H),V=Math.sin(H);A.x=E*V,A.y=m*x,A.z=E*X,u.push(A.x,A.y,A.z),d.push(0,x,0),R.x=X*.5+.5,R.y=V*.5*x+.5,f.push(R.x,R.y),g++}for(let z=0;z<s;z++){const O=N+z,H=C+z;y===!0?h.push(H,H+1,O):h.push(H+1,H,O),P+=3}l.addGroup(p,P,y===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Sa extends vi{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Sa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Gn extends qo{constructor(t){super(t),this.uuid=$n(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new qo().fromJSON(s))}return this}}const I_={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=sh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=B_(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return ts(r,o,e,a,c,f,0),o}};function sh(i,t,e,n,s){let r,o;if(s===Z_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Hc(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Hc(r,i[r],i[r+1],o);return o&&mr(o,o.next)&&(ns(o),o=o.next),o}function qn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(mr(e,e.next)||ae(e.prev,e,e.next)===0)){if(ns(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ts(i,t,e,n,s,r,o){if(!i)return;!o&&r&&G_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?N_(i,n,s,r):U_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),ns(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=F_(qn(i),t,e),ts(i,t,e,n,s,r,2)):o===2&&O_(i,t,e,n,s,r):ts(qn(i),t,e,n,s,r,1);break}}}function U_(i){const t=i.prev,e=i,n=i.next;if(ae(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&di(s,a,r,c,o,l,g.x,g.y)&&ae(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function N_(i,t,e,n){const s=i.prev,r=i,o=i.next;if(ae(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=$o(f,g,t,e,n),b=$o(_,m,t,e,n);let S=i.prevZ,y=i.nextZ;for(;S&&S.z>=p&&y&&y.z<=b;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&di(a,h,c,u,l,d,S.x,S.y)&&ae(S.prev,S,S.next)>=0||(S=S.prevZ,y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&di(a,h,c,u,l,d,y.x,y.y)&&ae(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&di(a,h,c,u,l,d,S.x,S.y)&&ae(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;y&&y.z<=b;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&di(a,h,c,u,l,d,y.x,y.y)&&ae(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function F_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!mr(s,r)&&rh(s,n,n.next,r)&&es(s,r)&&es(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ns(n),ns(n.next),n=i=r),n=n.next}while(n!==i);return qn(n)}function O_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Y_(o,a)){let c=oh(o,a);o=qn(o,o.next),c=qn(c,c.next),ts(o,t,e,n,s,r,0),ts(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function B_(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=sh(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(X_(l));for(s.sort(k_),r=0;r<s.length;r++)e=z_(s[r],e);return e}function k_(i,t){return i.x-t.x}function z_(i,t){const e=H_(i,t);if(!e)return t;const n=oh(e,i);return qn(n,n.next),qn(e,e.next)}function H_(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&di(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),es(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&V_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function V_(i,t){return ae(i.prev,i,t.prev)<0&&ae(t.next,i,i.next)<0}function G_(i,t,e,n){let s=i;do s.z===0&&(s.z=$o(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,W_(s)}function W_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function $o(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function X_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function di(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Y_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!q_(i,t)&&(es(i,t)&&es(t,i)&&$_(i,t)&&(ae(i.prev,i,t.prev)||ae(i,t.prev,t))||mr(i,t)&&ae(i.prev,i,i.next)>0&&ae(t.prev,t,t.next)>0)}function ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function mr(i,t){return i.x===t.x&&i.y===t.y}function rh(i,t,e,n){const s=Vs(ae(i,t,e)),r=Vs(ae(i,t,n)),o=Vs(ae(e,n,i)),a=Vs(ae(e,n,t));return!!(s!==r&&o!==a||s===0&&Hs(i,e,t)||r===0&&Hs(i,n,t)||o===0&&Hs(e,i,n)||a===0&&Hs(e,t,n))}function Hs(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Vs(i){return i>0?1:i<0?-1:0}function q_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&rh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function es(i,t){return ae(i.prev,i,i.next)<0?ae(i,t,i.next)>=0&&ae(i,i.prev,t)>=0:ae(i,t,i.prev)<0||ae(i,i.next,t)<0}function $_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function oh(i,t){const e=new Zo(i.i,i.x,i.y),n=new Zo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Hc(i,t,e,n){const s=new Zo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ns(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Zo(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Z_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Rn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Rn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Vc(t),Gc(n,t);let o=t.length;e.forEach(Vc);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Gc(n,e[c]);const a=I_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Vc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Gc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class qi extends Le{constructor(t=new Gn([new et(.5,.5),new et(-.5,.5),new et(-.5,-.5),new et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new re(s,3)),this.setAttribute("uv",new re(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:J_;let S,y=!1,N,R,A,P;p&&(S=p.getSpacedPoints(h),y=!0,d=!1,N=p.computeFrenetFrames(h,!1),R=new L,A=new L,P=new L),d||(m=0,f=0,g=0,_=0);const E=a.extractPoints(l);let x=E.shape;const C=E.holes;if(!Rn.isClockWise(x)){x=x.reverse();for(let K=0,st=C.length;K<st;K++){const T=C[K];Rn.isClockWise(T)&&(C[K]=T.reverse())}}const O=Rn.triangulateShape(x,C),H=x;for(let K=0,st=C.length;K<st;K++){const T=C[K];x=x.concat(T)}function X(K,st,T){return st||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(st,T)}const V=x.length,J=O.length;function G(K,st,T){let Pt,nt,yt;const at=K.x-st.x,Dt=K.y-st.y,_t=T.x-K.x,w=T.y-K.y,v=at*at+Dt*Dt,F=at*w-Dt*_t;if(Math.abs(F)>Number.EPSILON){const Y=Math.sqrt(v),Q=Math.sqrt(_t*_t+w*w),$=st.x-Dt/Y,Tt=st.y+at/Y,ut=T.x-w/Q,vt=T.y+_t/Q,Gt=((ut-$)*w-(vt-Tt)*_t)/(at*w-Dt*_t);Pt=$+at*Gt-K.x,nt=Tt+Dt*Gt-K.y;const it=Pt*Pt+nt*nt;if(it<=2)return new et(Pt,nt);yt=Math.sqrt(it/2)}else{let Y=!1;at>Number.EPSILON?_t>Number.EPSILON&&(Y=!0):at<-Number.EPSILON?_t<-Number.EPSILON&&(Y=!0):Math.sign(Dt)===Math.sign(w)&&(Y=!0),Y?(Pt=-Dt,nt=at,yt=Math.sqrt(v)):(Pt=at,nt=Dt,yt=Math.sqrt(v/2))}return new et(Pt/yt,nt/yt)}const ct=[];for(let K=0,st=H.length,T=st-1,Pt=K+1;K<st;K++,T++,Pt++)T===st&&(T=0),Pt===st&&(Pt=0),ct[K]=G(H[K],H[T],H[Pt]);const dt=[];let xt,Ut=ct.concat();for(let K=0,st=C.length;K<st;K++){const T=C[K];xt=[];for(let Pt=0,nt=T.length,yt=nt-1,at=Pt+1;Pt<nt;Pt++,yt++,at++)yt===nt&&(yt=0),at===nt&&(at=0),xt[Pt]=G(T[Pt],T[yt],T[at]);dt.push(xt),Ut=Ut.concat(xt)}for(let K=0;K<m;K++){const st=K/m,T=f*Math.cos(st*Math.PI/2),Pt=g*Math.sin(st*Math.PI/2)+_;for(let nt=0,yt=H.length;nt<yt;nt++){const at=X(H[nt],ct[nt],Pt);Z(at.x,at.y,-T)}for(let nt=0,yt=C.length;nt<yt;nt++){const at=C[nt];xt=dt[nt];for(let Dt=0,_t=at.length;Dt<_t;Dt++){const w=X(at[Dt],xt[Dt],Pt);Z(w.x,w.y,-T)}}}const Xt=g+_;for(let K=0;K<V;K++){const st=d?X(x[K],Ut[K],Xt):x[K];y?(A.copy(N.normals[0]).multiplyScalar(st.x),R.copy(N.binormals[0]).multiplyScalar(st.y),P.copy(S[0]).add(A).add(R),Z(P.x,P.y,P.z)):Z(st.x,st.y,0)}for(let K=1;K<=h;K++)for(let st=0;st<V;st++){const T=d?X(x[st],Ut[st],Xt):x[st];y?(A.copy(N.normals[K]).multiplyScalar(T.x),R.copy(N.binormals[K]).multiplyScalar(T.y),P.copy(S[K]).add(A).add(R),Z(P.x,P.y,P.z)):Z(T.x,T.y,u/h*K)}for(let K=m-1;K>=0;K--){const st=K/m,T=f*Math.cos(st*Math.PI/2),Pt=g*Math.sin(st*Math.PI/2)+_;for(let nt=0,yt=H.length;nt<yt;nt++){const at=X(H[nt],ct[nt],Pt);Z(at.x,at.y,u+T)}for(let nt=0,yt=C.length;nt<yt;nt++){const at=C[nt];xt=dt[nt];for(let Dt=0,_t=at.length;Dt<_t;Dt++){const w=X(at[Dt],xt[Dt],Pt);y?Z(w.x,w.y+S[h-1].y,S[h-1].x+T):Z(w.x,w.y,u+T)}}}q(),rt();function q(){const K=s.length/3;if(d){let st=0,T=V*st;for(let Pt=0;Pt<J;Pt++){const nt=O[Pt];ht(nt[2]+T,nt[1]+T,nt[0]+T)}st=h+m*2,T=V*st;for(let Pt=0;Pt<J;Pt++){const nt=O[Pt];ht(nt[0]+T,nt[1]+T,nt[2]+T)}}else{for(let st=0;st<J;st++){const T=O[st];ht(T[2],T[1],T[0])}for(let st=0;st<J;st++){const T=O[st];ht(T[0]+V*h,T[1]+V*h,T[2]+V*h)}}n.addGroup(K,s.length/3-K,0)}function rt(){const K=s.length/3;let st=0;Et(H,st),st+=H.length;for(let T=0,Pt=C.length;T<Pt;T++){const nt=C[T];Et(nt,st),st+=nt.length}n.addGroup(K,s.length/3-K,1)}function Et(K,st){let T=K.length;for(;--T>=0;){const Pt=T;let nt=T-1;nt<0&&(nt=K.length-1);for(let yt=0,at=h+m*2;yt<at;yt++){const Dt=V*yt,_t=V*(yt+1),w=st+Pt+Dt,v=st+nt+Dt,F=st+nt+_t,Y=st+Pt+_t;wt(w,v,F,Y)}}}function Z(K,st,T){c.push(K),c.push(st),c.push(T)}function ht(K,st,T){bt(K),bt(st),bt(T);const Pt=s.length/3,nt=b.generateTopUV(n,s,Pt-3,Pt-2,Pt-1);Vt(nt[0]),Vt(nt[1]),Vt(nt[2])}function wt(K,st,T,Pt){bt(K),bt(st),bt(Pt),bt(st),bt(T),bt(Pt);const nt=s.length/3,yt=b.generateSideWallUV(n,s,nt-6,nt-3,nt-2,nt-1);Vt(yt[0]),Vt(yt[1]),Vt(yt[3]),Vt(yt[1]),Vt(yt[2]),Vt(yt[3])}function bt(K){s.push(c[K*3+0]),s.push(c[K*3+1]),s.push(c[K*3+2])}function Vt(K){r.push(K.x),r.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return K_(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Yo[s.type]().fromJSON(s)),new qi(n,t.options)}}const J_={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new et(r,o),new et(a,c),new et(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new et(o,1-c),new et(l,1-u),new et(d,1-g),new et(_,1-p)]:[new et(a,1-c),new et(h,1-u),new et(f,1-g),new et(m,1-p)]}};function K_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class $i extends Le{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new L,g=new et;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const b=p+m,S=b,y=b+n+1,N=b+n+2,R=b+1;a.push(S,y,R),a.push(y,N,R)}}this.setIndex(a),this.setAttribute("position",new re(c,3)),this.setAttribute("normal",new re(l,3)),this.setAttribute("uv",new re(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class gr extends Le{constructor(t=new Gn([new et(0,.5),new et(-.5,-.5),new et(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new re(s,3)),this.setAttribute("normal",new re(r,3)),this.setAttribute("uv",new re(o,2));function l(h){const u=s.length/3,d=h.extractPoints(e);let f=d.shape;const g=d.holes;Rn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const b=g[m];Rn.isClockWise(b)===!0&&(g[m]=b.reverse())}const _=Rn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const b=g[m];f=f.concat(b)}for(let m=0,p=f.length;m<p;m++){const b=f[m];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,p=_.length;m<p;m++){const b=_[m],S=b[0]+u,y=b[1]+u,N=b[2]+u;n.push(S,y,N),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return j_(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new gr(n,t.curveSegments)}}function j_(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Ee extends us{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nl,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Wc={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Q_{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const tv=new Q_;class Ea{constructor(t){this.manager=t!==void 0?t:tv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Ea.DEFAULT_MATERIAL_NAME="__DEFAULT";class ev extends Ea{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Wc.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=ji("img");function c(){h(),Wc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class nv extends Ea{constructor(t){super(t)}load(t,e,n,s){const r=new ye,o=new ev(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class ah extends me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class iv extends ah{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Kr=new se,Xc=new L,Yc=new L;class sv{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ga,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Xc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xc),Yc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yc),e.updateMatrixWorld(),Kr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Kr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class rv extends sv{constructor(){super(new $l(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qc extends ah{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new rv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const $c=new se;class ov{constructor(t,e,n=0,s=1/0){this.ray=new zl(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ma,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return $c.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($c),this}intersectObject(t,e=!0,n=[]){return Jo(t,this,n,e),n.sort(Zc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Jo(t[s],this,n,e);return n.sort(Zc),n}}function Zc(i,t){return i.distance-t.distance}function Jo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Jo(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oa);function xe(i,t=0,e=new L){return e.set(i.x,t,-i.y)}function av(i){return{x:i.x,y:-i.z}}function Ai(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2D canvas unavailable");return[e,n]}function ps(i,t){const e=new x_(i);return e.colorSpace=be,e.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy()),e.needsUpdate=!0,e}function Ri(i){const t=(n,s)=>{let r=n*374761393+s*668265263+i*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296},e=n=>n*n*(3-2*n);return(n,s)=>{const r=Math.floor(n),o=Math.floor(s),a=e(n-r),c=e(s-o),l=t(r,o),h=t(r+1,o),u=t(r,o+1),d=t(r+1,o+1);return l+(h-l)*a+(u-l)*c+(l-h-u+d)*a*c}}function cv(i,t){const e=t.size??2048,n=t.geometry.spec.radius,s=b=>[(b.x/n*.5+.5)*e,(1-(b.y/n*.5+.5))*e],r=e/(2*n),o=e/2,[a,c]=Ai(o,o),l=c.createImageData(o,o),h=Ri(11),u=Ri(23);for(let b=0;b<o;b++)for(let S=0;S<o;S++){const y=S/o,N=b/o,R=h(y*3,N*2)*6+u(y*9,N*6)*.8,A=Math.sin((N*9+R)*Math.PI),P=Math.pow(Math.abs(A),6),E=u(y*220,N*40)*.05,x=1-P*.18-E+h(y*2,N*5)*.06,C=(b*o+S)*4;l.data[C]=Math.min(255,222*x),l.data[C+1]=Math.min(255,184*x),l.data[C+2]=Math.min(255,124*x),l.data[C+3]=255}c.putImageData(l,0,0);const[d,f]=Ai(e,e);f.imageSmoothingQuality="high",f.drawImage(a,0,0,e,e);const g="rgba(70,45,25,0.85)";for(const b of t.geometry.ropes){const[S,y]=s(b.start),[N,R]=s(b.end),A=Math.hypot(N-S,R-y),P=(N-S)/A,E=(R-y)/A,x=r*.0045,C=r*(t.geometry.spec.pocketRadius+t.geometry.spec.shooterRadius)*.45,z=S-P*C,O=y-E*C,H=A+C*2;f.strokeStyle=g,f.lineWidth=Math.max(1,r*.0011);for(const X of[-1,1])f.beginPath(),f.moveTo(z-E*x*X,O+P*x*X),f.lineTo(z+P*H-E*x*X,O+E*H+P*x*X),f.stroke();for(let X=0;X<H;X+=x*1.6){const V=z+P*X,J=O+E*X;f.beginPath(),f.moveTo(V-E*x-P*x*.7,J+P*x-E*x*.7),f.lineTo(V+E*x+P*x*.7,J-P*x+E*x*.7),f.stroke()}}const[_,m]=s({x:0,y:0}),p=r*.075;f.save(),f.translate(_,m),f.strokeStyle=g,f.fillStyle=g,f.lineWidth=p*.09,f.beginPath(),f.arc(0,0,p*.78,0,Math.PI*2),f.stroke(),f.lineWidth=p*.05,f.beginPath(),f.arc(0,0,p*.62,0,Math.PI*2),f.stroke(),f.beginPath(),f.arc(0,0,p*.14,0,Math.PI*2),f.fill();for(let b=0;b<8;b++){const S=b*Math.PI/4+Math.PI/8;f.lineWidth=p*.07,f.beginPath(),f.moveTo(Math.cos(S)*p*.14,Math.sin(S)*p*.14),f.lineTo(Math.cos(S)*p*1.12,Math.sin(S)*p*1.12),f.stroke(),f.beginPath(),f.ellipse(Math.cos(S)*p*1.15,Math.sin(S)*p*1.15,p*.09,p*.06,S,0,Math.PI*2),f.fill()}return f.restore(),t.geometry.pockets.forEach((b,S)=>{if(t.pocketRoles[S]!=="shark")return;const[y,N]=s(b),R=t.geometry.spec.pocketRadius*r;f.strokeStyle="rgba(200,40,40,0.75)",f.lineWidth=R*.16,f.setLineDash([R*.25,R*.15]),f.beginPath(),f.arc(y,N,R*1.12,0,Math.PI*2),f.stroke(),f.setLineDash([])}),ps(d,i)}function lv(i,t,e){const s=Ri(5),r=Ri(9),[o,a]=Ai(1024,1024),c=a.createImageData(1024,1024),l=t.rails.map(h=>({n:h.normal,t:{x:-h.normal.y,y:h.normal.x}}));for(let h=0;h<1024;h++)for(let u=0;u<1024;u++){const d=(u/1024*2-1)*e,f=(1-h/1024*2)*e;let g=0,_=-1/0;for(let A=0;A<6;A++){const P=-(l[A].n.x*d+l[A].n.y*f);P>_&&(_=P,g=A)}const m=l[g].t.x*d+l[g].t.y*f,p=m>0?1:0,b=_*60+s(m*3+p*17,_*8)*2.2,S=Math.abs(Math.sin(b*Math.PI)),y=r(m*140,_*30);let N=.62+.18*Math.pow(S,3)+.1*y+(p?.04:-.02)+(g%2?.03:0);Math.abs(m)<.004&&(N*=.55);const R=(h*1024+u)*4;c.data[R]=112*N,c.data[R+1]=72*N,c.data[R+2]=42*N,c.data[R+3]=255}return a.putImageData(c,0,0),ps(o,i)}function hv(i){const e=Ri(31),[n,s]=Ai(512,512),r=s.createImageData(512,512);for(let a=0;a<512;a++)for(let c=0;c<512;c++){const l=c/512,h=a/512,u=Math.abs(Math.sin((h*22+e(l*4,h*8)*3)*Math.PI)),d=.7+.2*Math.pow(u,4)+e(l*60,h*9)*.1,f=(a*512+c)*4;r.data[f]=70*d,r.data[f+1]=45*d,r.data[f+2]=30*d,r.data[f+3]=255}s.putImageData(r,0,0);const o=ps(n,i);return o.wrapS=o.wrapT=sr,o}function uv(i){const[e,n]=Ai(256,256),s=Ri(77),r=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const c=Math.hypot(a-38.4,o+153.6)/256,l=Math.abs(Math.sin((c*26+s(a/30,o/30)*.6)*Math.PI)),h=.93+.05*Math.pow(l,6)+s(a/6,o/40)*.05,u=(o*256+a)*4;r.data[u]=214*h,r.data[u+1]=172*h,r.data[u+2]=132*h,r.data[u+3]=255}return n.putImageData(r,0,0),ps(e,i)}const fv="./textures/chips.jpg",Gs=8,Jc=4;function dv(i,t){const e=new nv().load(fv,t);return e.colorSpace=be,e.anisotropy=Math.min(8,i.capabilities.getMaxAnisotropy()),e}function pv(i,t){const e=i.clone();return e.repeat.set(1/Gs,1/Jc),e.offset.set(t%Gs/Gs,1-(Math.floor(t/Gs)+1)/Jc),e}function mv(i){const[t,e]=Ai(64,16);e.clearRect(0,0,64,16),e.fillStyle="#ffffff",e.beginPath(),e.roundRect(4,2,34,12,6),e.fill();const n=ps(t,i);return n.wrapS=ir,n}const sn=.0035;function gv(){const i=new ds(1,1);return i.rotateX(-Math.PI/2),i}function Ws(i,t,e,n,s=sn){const r=e.x-t.x,o=e.y-t.y,a=Math.hypot(r,o);return xe({x:(t.x+e.x)/2,y:(t.y+e.y)/2},s,i.position),i.rotation.set(0,Math.atan2(o,r),0),i.scale.set(Math.max(a,1e-4),1,n),a}class _v{constructor(t,e){tt(this,"group",new bn);tt(this,"rope");tt(this,"ropeMat");tt(this,"shooterRing");tt(this,"ringMat");tt(this,"arrowBody");tt(this,"arrowHead");tt(this,"arrowMat");tt(this,"guide");tt(this,"guideMat");tt(this,"ghost");tt(this,"push");tt(this,"pocketMarkers",[]);tt(this,"markerMats",[]);tt(this,"beacons",[]);tt(this,"beaconMats",[]);tt(this,"disposables",[]);tt(this,"time",0);tt(this,"callable",[]);tt(this,"called",null);this.g=e;const n=gv();this.disposables.push(n);const s=(d,f=1)=>{const g=new or({color:d,transparent:!0,opacity:f,depthWrite:!1});return this.disposables.push(g),g};this.ropeMat=s("#fff2b0",.35),this.rope=new jt(n,this.ropeMat),this.rope.renderOrder=1;const r=new $i(1,1.25,48);r.rotateX(-Math.PI/2),this.disposables.push(r),this.ringMat=s("#ffffff",.85),this.shooterRing=new jt(r,this.ringMat),this.shooterRing.renderOrder=2,this.arrowMat=s("#7be07b",.9),this.arrowBody=new jt(n,this.arrowMat);const o=new Gn([new et(0,-.5),new et(1,0),new et(0,.5)]),a=new gr(o);a.rotateX(-Math.PI/2),this.disposables.push(a),this.arrowHead=new jt(a,this.arrowMat),this.arrowBody.renderOrder=this.arrowHead.renderOrder=3;const c=mv(t);this.disposables.push(c),this.guideMat=new or({map:c,transparent:!0,opacity:.8,depthWrite:!1}),this.disposables.push(this.guideMat),this.guide=new jt(n,this.guideMat),this.guide.renderOrder=2;const l=new $i(.9,1,40);l.rotateX(-Math.PI/2),this.disposables.push(l),this.ghost=new jt(l,s("#ffffff",.7)),this.push=new jt(n,s("#ffd166",.85));const h=new $i(1,1.22,48);h.rotateX(-Math.PI/2);const u=new Sa(.035,.08,20);u.rotateX(Math.PI),this.disposables.push(h,u);for(let d=0;d<e.pockets.length;d++){const f=s("#ffd166",.9),g=new jt(h,f);xe(e.pockets[d],sn*2,g.position),g.renderOrder=4,g.visible=!1,this.pocketMarkers.push(g),this.markerMats.push(f),this.group.add(g);const _=new Ee({color:"#ffffff",emissive:"#ffd166",emissiveIntensity:.6,roughness:.4});this.disposables.push(_);const m=new jt(u,_);xe(e.pockets[d],.12,m.position),m.visible=!1,m.castShadow=!0,this.beacons.push(m),this.beaconMats.push(_),this.group.add(m)}this.group.add(this.rope,this.shooterRing,this.arrowBody,this.arrowHead,this.guide,this.ghost,this.push),this.hideAll()}hideAll(){this.rope.visible=!1,this.shooterRing.visible=!1,this.clearAim(),this.setCallable([],null)}showRope(t,e){Ws(this.rope,t.start,t.end,.025,sn*.5),this.ropeMat.color.set(e),this.rope.visible=!0}showShooter(t,e,n){xe(t,sn,this.shooterRing.position),this.shooterRing.scale.setScalar(e*1.15),this.ringMat.color.set(n?"#ffffff":"#ff4d4d"),this.shooterRing.visible=!0}clearAim(){this.arrowBody.visible=this.arrowHead.visible=this.guide.visible=this.ghost.visible=this.push.visible=!1}showAim(t,e,n,s,r){const o=new Wt().setHSL(.33-.33*n,.85,.55);this.arrowMat.color.copy(o);const a={x:t.x+e.x*s*1.4,y:t.y+e.y*s*1.4},c=.05+n*.32,l={x:a.x+e.x*c,y:a.y+e.y*c};if(Ws(this.arrowBody,a,l,.022,sn*3),xe(l,sn*3,this.arrowHead.position),this.arrowHead.rotation.set(0,Math.atan2(e.y,e.x),0),this.arrowHead.scale.set(.06,1,.07),this.arrowBody.visible=this.arrowHead.visible=!0,r&&r.distance>s*.5){const h=Ws(this.guide,t,r.point,.012,sn*2);if(this.guideMat.map.repeat.set(h/.05,1),this.guide.visible=!0,xe(r.point,sn*2,this.ghost.position),this.ghost.scale.setScalar(s),this.ghost.visible=!0,r.hit?.type==="piece"){const u=r.hit.push,d={x:r.point.x+u.x*s*2.2,y:r.point.y+u.y*s*2.2};Ws(this.push,d,{x:d.x+u.x*.18,y:d.y+u.y*.18},.01,sn*2),this.push.visible=!0}else this.push.visible=!1}else this.guide.visible=this.ghost.visible=this.push.visible=!1}setCallable(t,e){this.callable=t,this.called=e,this.pocketMarkers.forEach((n,s)=>n.visible=t.includes(s)),this.beacons.forEach((n,s)=>n.visible=t.includes(s))}update(t){this.time+=t;const e=.5+.5*Math.sin(this.time*4);this.ropeMat.opacity=.22+.2*e;const n=this.g.spec.pocketRadius;for(const s of this.callable){const r=this.pocketMarkers[s],o=s===this.called;r.scale.setScalar(n*(o?1.75:1.6+.15*e)),this.markerMats[s].color.set(o?"#ffd166":"#ffffff"),this.markerMats[s].opacity=o?1:.5+.4*e;const a=this.beacons[s];a.position.y=(o?.1:.12)+Math.sin(this.time*5+s)*.015,a.scale.setScalar(o?1.35:1),this.beaconMats[s].color.set(o?"#ffd166":"#ffffff"),this.beaconMats[s].emissiveIntensity=o?.9:.3+.3*e}}dispose(){this.disposables.forEach(t=>t.dispose())}}const Kc=.03,jc=.17,Qc=.05,hi=-.07,Ko=.03,tl=.065,vv=.12,jr=i=>new et(i.x,i.y);function ch(i,t,e,n,s,r=20){let o=n-e;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;const a=[];for(let c=0;c<=r;c++){const l=e+o*c/r;a.push({x:i.x+Math.cos(l)*t,y:i.y+Math.sin(l)*t})}return a}function xv(i){const t=i.spec.pocketRadius,e=[];for(let n=0;n<6;n++){const s=i.corners[n],r=i.corners[(n+1)%6],o=Math.hypot(r.x-s.x,r.y-s.y),a={x:(r.x-s.x)/o,y:(r.y-s.y)/o},c=i.corners[(n+2)%6],l={x:(c.x-r.x)/o,y:(c.y-r.y)/o},h=i.pockets[(n+1)%6],u=el(s,a,h,t,-1),d=el(r,l,h,t,1);e.push(...ch(h,t,Math.atan2(u.y-h.y,u.x-h.x),Math.atan2(d.y-h.y,d.x-h.x)))}return e}function el(i,t,e,n,s){const r=e.x-i.x,o=e.y-i.y,a=r*t.x+o*t.y,c=r*r+o*o-a*a,l=a+s*Math.sqrt(Math.max(0,n*n-c));return{x:i.x+t.x*l,y:i.y+t.y*l}}function yv(i,t,e){const n=t/(Math.sqrt(3)/2),s=[];for(let r=0;r<6;r++){const o=i.corners[r],a=Math.hypot(o.x,o.y),c={x:o.x/a,y:o.y/a},l={x:c.x*(n-e/(Math.sqrt(3)/2)),y:c.y*(n-e/(Math.sqrt(3)/2))},h=Math.atan2(c.y,c.x);s.push(...ch(l,e,h+Math.PI/6,h-Math.PI/6,!1,8))}return s}function Mv(i,t){const e=t.geometry,n=new bn,s=[],r=Z=>(s.push(Z),Z),o=Z=>(Z.rotateX(-Math.PI/2),Z),a=new Gn(xv(e).map(jr)),c=r(o(new qi(a,{depth:Kc,bevelEnabled:!1,curveSegments:24})));c.translate(0,-Kc,0);const l=r(cv(i,{geometry:e,pocketRoles:t.pocketRoles}));l.repeat.set(.5/e.spec.radius,.5/e.spec.radius),l.offset.set(.5,.5);const h=new jt(c,[r(new Ee({map:l,roughness:.62})),r(new Ee({color:"#2a1a0e",roughness:.95}))]);h.receiveShadow=!0,n.add(h);const u=e.apothem+jc,d=yv(e,u,vv),f=new Gn(d.map(jr)),g=.006,_=(e.spec.radius+g/(Math.sqrt(3)/2))/e.spec.radius;f.holes.push(new qo(e.corners.map(Z=>new et(Z.x*_,Z.y*_)).reverse()));const m=Qc-hi,p=r(o(new qi(f,{depth:m,bevelEnabled:!0,bevelThickness:.008,bevelSize:g,bevelSegments:3,curveSegments:24})));p.translate(0,hi,0);const b=Math.max(...d.map(Z=>Math.hypot(Z.x,Z.y))),S=r(lv(i,e,b));S.repeat.set(.5/b,.5/b),S.offset.set(.5,.5);const y=new jt(p,r(new Ee({map:S,roughness:.38,metalness:.02})));y.castShadow=!0,y.receiveShadow=!0,n.add(y);const N=r(o(new gr(new Gn(d.map(jr))))),R=new jt(N,r(new Ee({color:"#2b1a10",roughness:.9})));R.position.y=hi+.001,n.add(R);const A=-hi-.008,P=e.spec.pocketRadius,E=r(new vi(P,P,A,48,1,!0)),x=r(new Ee({color:"#1e120a",roughness:.95,side:we})),C=r(o(new Qi(P,48))),z=r(new Ee({color:"#3b2615",roughness:.9})),O=r(new Ee({color:"#1d3b52",roughness:.3,emissive:"#06121c"}));e.pockets.forEach((Z,ht)=>{const wt=new jt(E,x);xe(Z,-A/2-.003,wt.position),n.add(wt);const bt=new jt(C,t.pocketRoles[ht]==="shark"?O:z);xe(Z,-A+.002,bt.position),bt.receiveShadow=!0,n.add(bt)});const H=new Gn([new et(-.035,0),new et(.03,0),new et(-.02,.05)]),X=r(new qi(H,{depth:.008,bevelEnabled:!1}));X.translate(0,0,-.004);const V=r(new Ee({color:"#56626c",roughness:.5})),J=[];e.pockets.forEach((Z,ht)=>{if(t.pocketRoles[ht]!=="shark")return;const wt=new jt(X,V);n.add(wt),J.push({mesh:wt,centre:Z,phase:ht})});const G=r(new vi(e.spec.postRadius,e.spec.postRadius,tl,20)),ct=r(new Ee({color:"#d8bf8c",roughness:.55}));for(const Z of e.posts){const ht=new jt(G,ct);xe(Z,tl/2,ht.position),ht.castShadow=!0,n.add(ht)}const dt=r(new vi(.03,.03,.004,32));e.rails.forEach((Z,ht)=>{const wt=t.seatColors[ht];if(!wt)return;const bt=new jt(dt,r(new Ee({color:wt,roughness:.4,metalness:.2}))),Vt=e.apothem+jc*.5;xe({x:-Z.normal.x*Vt,y:-Z.normal.y*Vt},Qc+.009,bt.position),n.add(bt)});const xt=r(hv(i));xt.repeat.set(6,6);const Ut=new jt(r(o(new Qi(9,64))),r(new Ee({map:xt,roughness:.7})));Ut.position.y=hi,Ut.receiveShadow=!0,n.add(Ut);const Xt=u+.13,q=(Z,ht,wt=new L)=>{const bt=e.rails[Z.side].normal,Vt={x:-bt.y,y:bt.x},K=Math.floor(ht/5),st=ht%5,T=Z.offset*(.3+K*.095);return xe({x:-bt.x*Xt+Vt.x*T,y:-bt.y*Xt+Vt.y*T},hi+st*Ko,wt)},rt=(Z,ht=new L)=>xe(e.pockets[Z],-A+.004,ht),Et=Z=>{for(const ht of J){const wt=Z*1.6+ht.phase,bt=P*.55;xe({x:ht.centre.x+Math.cos(wt)*bt,y:ht.centre.y+Math.sin(wt)*bt},-A+.004,ht.mesh.position),ht.mesh.rotation.y=Math.atan2(Math.cos(wt),-Math.sin(wt))}};return{group:n,pileSlot:q,pocketDepth:rt,extent:Xt+.05,update:Et,dispose:()=>s.forEach(Z=>Z.dispose())}}function Sv(i){const t={},e=[0,1,2,3,4,5].filter(r=>!i.seats.includes(r));let n=0,s=0;return lr.forEach((r,o)=>{if(i.config.mode==="coop"){t[r]={side:i.seats[o%i.seats.length],offset:o<i.seats.length?1:-1};return}const a=sa(i,r);a>=0?t[r]={side:i.seats[i.config.players.findIndex(c=>c.team===a)],offset:1}:n<e.length?t[r]={side:e[n++],offset:1}:t[r]={side:i.seats[s++%i.seats.length],offset:-1}}),t}class Ev{constructor(t,e,n){tt(this,"group",new bn);tt(this,"views",new Map);tt(this,"disposables",[]);tt(this,"shooter");this.board=e;const s=Pe(n,"sailor"),r=Ko,o=.004,a=new Ma([new et(0,0),new et(s-o,0),new et(s,o),new et(s,r-o),new et(s-o,r),new et(0,r)],40),c=new Qi(s-o*.5,40);c.rotateX(-Math.PI/2),c.translate(0,r+3e-4,0),this.disposables.push(a,c);const l=dv(t,()=>{});this.disposables.push(l);const h=new Ee({color:"#c99a74",roughness:.55}),u=new Ee({color:"#b98262",roughness:.5});this.disposables.push(h,u);const d=(f,g)=>{const _=new Ee({map:f,roughness:.6});this.disposables.push(f,_);const m=new bn,p=new jt(a,g),b=new jt(c,_);return p.castShadow=b.castShadow=!0,p.receiveShadow=!0,m.add(p,b),m};for(const f of n.pieces){const g=d(pv(l,f.face),h);g.name=f.id,this.group.add(g),this.views.set(f.id,{obj:g,tweens:[]})}this.shooter=d(uv(t),u),this.shooter.name="shooter",this.group.add(this.shooter),this.views.set("shooter",{obj:this.shooter,tweens:[]}),this.syncToState(n,!1)}setLive(t,e){const n=this.views.get(t);!n||n.tweens.length||(xe(e,0,n.obj.position),n.obj.visible=!0)}drop(t,e,n){const s=this.views.get(t);s&&(s.tweens=[{from:s.obj.position.clone(),to:this.board.pocketDepth(e),t:0,dur:.2,arc:0,hideAtEnd:n}])}syncToState(t,e){const n=Sv(t),s=new Map,r={anchor:0,wheel:0,chest:0},o=t.pieces.filter(l=>l.loc.at==="pocket").sort((l,h)=>l.loc.at==="pocket"&&h.loc.at==="pocket"?l.loc.order-h.loc.order:0);for(const l of t.pieces)l.loc.at==="board"&&s.set(l.id,{pos:xe(l.loc),visible:!0});for(const l of o)l.loc.at==="pocket"&&(t.pocketRoles[l.loc.pocket]==="shark"?s.set(l.id,{pos:this.board.pocketDepth(l.loc.pocket),visible:!1}):l.type&&s.set(l.id,{pos:this.board.pileSlot(n[l.type],r[l.type]++),visible:!0}));const a=t.pieces.find(l=>l.id===yi);if(a.loc.at==="pocket"&&t.pocketRoles[a.loc.pocket]==="lifeboat"){const l=t.config.mode==="versus"&&t.winner!==null?t.claims[t.winner]??"anchor":lr.reduce((u,d)=>r[d]>r[u]?d:u),h=this.board.pileSlot(n[l],Math.max(0,r[l]-1));h.y+=Ko,s.set(yi,{pos:h,visible:!0})}let c=0;for(const[l,h]of s){const u=this.views.get(l),d=u.tweens[u.tweens.length-1],f=d?d.to.clone():u.obj.position.clone(),g=f.distanceTo(h.pos)>1e-4;if(!e){u.tweens=[],u.obj.position.copy(h.pos),u.obj.visible=h.visible;continue}if(!g){!h.visible&&!d&&(u.obj.visible=!1);continue}const _=.55+Math.min(.4,f.distanceTo(h.pos)*.25);u.tweens.push({from:f.clone(),to:f.clone(),t:0,dur:c,arc:0,hideAtEnd:!1},{from:f,to:h.pos,t:0,dur:_,arc:.25,hideAtEnd:!h.visible}),c+=.06}}placeShooter(t){const e=this.views.get("shooter");if(e.tweens=[],!t){this.shooter.visible=!1;return}this.shooter.visible=!0,xe(t,0,this.shooter.position)}get busy(){for(const t of this.views.values())if(t.tweens.length)return!0;return!1}update(t){for(const e of this.views.values()){const n=e.tweens[0];if(!n)continue;n.t+=t;const s=n.dur<=0?1:Math.min(1,n.t/n.dur),r=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;e.obj.position.lerpVectors(n.from,n.to,r),e.obj.position.y+=Math.sin(Math.PI*r)*n.arc,n.dur>0&&(e.obj.visible=!0),s>=1&&(e.tweens.shift(),n.hideAtEnd&&(e.obj.visible=!1))}}dispose(){this.disposables.forEach(t=>t.dispose())}}const Qr=["table","top","first"],nl={table:"3D",top:"Top",first:"Seat"},Xs=.92,il=1.55,bv=.12,wv=1.56,Ys=.56,Tv=.05,Av=1.3,sl=1.3,rl=1.2,Rv=.36,to={orbit:45,first:60},ol=.006,al=.0035;class Cv{constructor(t){tt(this,"renderer");tt(this,"scene",new v_);tt(this,"camera",new Ue(45,1,.05,60));tt(this,"yaw",Math.PI/2);tt(this,"targetYaw",Math.PI/2);tt(this,"orbitYaw",0);tt(this,"targetOrbitYaw",0);tt(this,"pitch",Xs);tt(this,"targetPitch",Xs);tt(this,"lookYaw",0);tt(this,"targetLookYaw",0);tt(this,"lookDown",Ys);tt(this,"targetLookDown",Ys);tt(this,"seat",0);tt(this,"viewMode","table");tt(this,"insets",{top:0,bottom:0});tt(this,"raycaster",new ov);tt(this,"plane",new yn(new L(0,1,0),0));tt(this,"width",1);tt(this,"height",1);tt(this,"zoom",1);tt(this,"targetZoom",1);tt(this,"orbitPos",new L);tt(this,"seatPos",new L);tt(this,"orbitTarget",new L(0,-.02,0));tt(this,"seatTarget",new L);tt(this,"lookAt",new L);tt(this,"extent",1.35);this.canvas=t,this.renderer=new __({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=be,this.renderer.toneMapping=El,this.renderer.toneMappingExposure=1.1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ml,this.scene.background=new Wt("#140c07"),this.scene.fog=new va("#140c07",4,11);const e=new iv("#fff3e0","#3a2414",1.15);this.scene.add(e);const n=new qc("#fff1d6",2.6);n.position.set(1.6,4,1.2),n.castShadow=!0,n.shadow.mapSize.set(2048,2048);const s=n.shadow.camera;s.left=-1.6,s.right=1.6,s.top=1.6,s.bottom=-1.6,s.near=1,s.far=8,n.shadow.bias=-4e-4,n.shadow.normalBias=.01,this.scene.add(n);const r=new qc("#9cc9ff",.35);r.position.set(-2,2,-1.5),this.scene.add(r)}zoomBy(t){this.targetZoom=Math.min(1.25,Math.max(.45,this.targetZoom*t))}resetZoom(){this.targetZoom=1}orbitBy(t,e){this.viewMode==="first"?(this.targetLookYaw=Ui.clamp(this.targetLookYaw-t*al,-sl,sl),this.targetLookDown=Ui.clamp(this.targetLookDown-e*al,Tv,Av)):(this.targetOrbitYaw-=t*ol,this.targetPitch=Ui.clamp(this.targetPitch+e*ol,bv,wv))}resetView(){this.targetOrbitYaw=0,this.targetPitch=this.viewMode==="top"?il:Xs,this.targetLookYaw=0,this.targetLookDown=Ys,this.targetZoom=1}get adjusted(){const t=this.viewMode==="top"?il:Xs;return this.viewMode==="first"?Math.abs(this.targetLookYaw)>.02||Math.abs(this.targetLookDown-Ys)>.02||Math.abs(this.targetZoom-1)>.02:Math.abs(this.targetOrbitYaw)>.02||Math.abs(this.targetPitch-t)>.02||Math.abs(this.targetZoom-1)>.02}faceSeat(t,e=!1){let n=Math.atan2(-t.y,t.x);for(;n-this.yaw>Math.PI;)n-=Math.PI*2;for(;n-this.yaw<-Math.PI;)n+=Math.PI*2;this.targetYaw=n,e&&(this.yaw=n)}setViewMode(t,e=!1){this.viewMode=t,this.resetView(),e&&(this.pitch=this.targetPitch,this.orbitYaw=this.targetOrbitYaw,this.lookYaw=this.targetLookYaw,this.lookDown=this.targetLookDown,this.zoom=this.targetZoom,this.seat=t==="first"?1:0)}get mode(){return this.viewMode}setInsets(t){this.insets=t,this.resize()}resize(){const t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.width=t,this.height=e,this.renderer.setSize(t,e,!1),this.camera.aspect=t/e;const n=(this.insets.top-this.insets.bottom)/2;this.camera.setViewOffset(t,e,0,-n,t,e),this.camera.updateProjectionMatrix()}distance(){const t=Math.max(120,this.height-this.insets.top-this.insets.bottom),e=Ui.degToRad(this.camera.fov),n=Math.tan(e/2),s=n*(this.width/this.height),r=this.extent,o=r/s,c=r*(Math.sin(this.pitch)+.25*Math.cos(this.pitch))/n*(this.height/t);return Math.max(o,c)}update(t){const e=1-Math.exp(-t*5),n=1-Math.exp(-t*12);this.yaw+=(this.targetYaw-this.yaw)*e,this.orbitYaw+=(this.targetOrbitYaw-this.orbitYaw)*n,this.pitch+=(this.targetPitch-this.pitch)*n,this.lookYaw+=(this.targetLookYaw-this.lookYaw)*n,this.lookDown+=(this.targetLookDown-this.lookDown)*n,this.zoom+=(this.targetZoom-this.zoom)*n,this.seat+=((this.viewMode==="first"?1:0)-this.seat)*e;const s=this.yaw+this.orbitYaw,r=this.distance()*this.zoom,o=Math.cos(this.pitch);this.orbitPos.set(Math.cos(s)*o*r,Math.sin(this.pitch)*r,Math.sin(s)*o*r);const a=Math.cos(this.yaw)*rl,c=Math.sin(this.yaw)*rl,l=this.yaw+Math.PI+this.lookYaw,h=Math.cos(this.lookDown),u=Math.cos(l)*h,d=-Math.sin(this.lookDown),f=Math.sin(l)*h,g=(1-this.zoom)*.9;this.seatPos.set(a+u*g,Rv+d*g,c+f*g),this.seatTarget.set(this.seatPos.x+u,this.seatPos.y+d,this.seatPos.z+f);const _=this.seat*this.seat*(3-2*this.seat);this.camera.position.lerpVectors(this.orbitPos,this.seatPos,_),this.lookAt.lerpVectors(this.orbitTarget,this.seatTarget,_);const m=to.orbit+(to.first-to.orbit)*_;Math.abs(this.camera.fov-m)>.001&&(this.camera.fov=m,this.camera.updateProjectionMatrix()),this.camera.lookAt(this.lookAt)}render(){this.renderer.render(this.scene,this.camera)}pick(t,e){const n=this.canvas.getBoundingClientRect(),s=new et((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);this.raycaster.setFromCamera(s,this.camera);const r=new L;return this.raycaster.ray.intersectPlane(this.plane,r)?av(r):null}worldPerPixel(){const t=Math.max(.6,this.camera.position.distanceTo(this.lookAt)),e=Ui.degToRad(this.camera.fov);return 2*t*Math.tan(e/2)/this.height}dispose(){this.renderer.dispose()}}function oe(i,t={},...e){const n=document.createElement(i);for(const[s,r]of Object.entries(t))r!==void 0&&(s==="class"?n.className=r:n.setAttribute(s,r));for(const s of e)s==null||s===!1||n.append(typeof s=="string"?document.createTextNode(s):s);return n}function Wn(i){return i.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const is={anchor:0,wheel:2,chest:14,captain:15};function ss(i,t=22,e=""){const n=i%8/7*100,s=Math.floor(i/8)/3*100;return`<span class="face" role="img" aria-label="${Wn(e)}" style="width:${t}px;height:${t}px;background-image:url(./textures/chips.jpg);background-position:${n}% ${s}%"></span>`}class Pv{constructor(t,e){tt(this,"root");tt(this,"scores");tt(this,"who");tt(this,"hint");tt(this,"toastEl");tt(this,"power");tt(this,"powerFill");tt(this,"slider");tt(this,"viewBtn");tt(this,"lookBtn");tt(this,"resetBtn");tt(this,"adjusted",!1);tt(this,"top");tt(this,"bottom");tt(this,"toastTimer",0);this.scores=oe("div",{class:"scores"}),this.who=oe("div",{class:"who"}),this.hint=oe("div",{class:"hint"}),this.top=oe("div",{class:"hud-top"},this.scores,oe("div",{class:"turn"},this.who,this.hint)),this.toastEl=oe("div",{class:"toast",role:"status","aria-live":"polite"}),this.powerFill=oe("div",{class:"fill"}),this.power=oe("div",{class:"power","aria-hidden":"true"},this.powerFill),this.slider=oe("input",{type:"range",min:"0",max:"1000",value:"500","aria-label":"Slide the shooter along your rope line"}),this.slider.addEventListener("input",()=>e.onSlide(1-Number(this.slider.value)/1e3)),this.viewBtn=oe("button",{class:"icon-btn","aria-label":"Change camera view",title:"Camera view (V)"},"3D"),this.viewBtn.addEventListener("click",e.onToggleView),this.lookBtn=oe("button",{class:"icon-btn","aria-pressed":"false",title:"Look around (L)"},"Look"),this.lookBtn.addEventListener("click",e.onToggleLook),this.resetBtn=oe("button",{class:"icon-btn reset-view","aria-label":"Reset camera view",title:"Reset view (R)",hidden:""},"⟲"),this.resetBtn.addEventListener("click",e.onResetView);const n=oe("button",{class:"icon-btn","aria-label":"Menu"},"☰");n.addEventListener("click",e.onMenu),this.bottom=oe("div",{class:"hud-bottom"},this.power,oe("div",{class:"controls"},this.viewBtn,this.lookBtn,this.resetBtn,oe("label",{class:"slider"},oe("span",{},"Slide"),this.slider),n)),this.root=oe("div",{class:"hud"},this.top,this.toastEl,this.bottom),t.append(this.root)}setViewLabel(t){this.viewBtn.textContent=nl[t],this.viewBtn.setAttribute("aria-label",`Camera view: ${nl[t]}. Tap to change.`)}setLooking(t){this.lookBtn.classList.toggle("on",t),this.lookBtn.setAttribute("aria-pressed",String(t))}setViewAdjusted(t){t!==this.adjusted&&(this.adjusted=t,this.resetBtn.hidden=!t)}update(t,e){const n=t.config,s=[];if(n.mode==="versus")n.teams.forEach((a,c)=>{const l=t.claims[c],h=so(t,c),u=ml(t,c),d=hr(t)===c&&t.status==="playing",f=l?ss(is[l],20,nr[l]):'<span class="face unknown" aria-label="No Sailors claimed yet">?</span>',g=t.out[c]?"Out":t.standby===c?"Standby":u?"Captain!":`${h}/${er}`;s.push(`<div class="chip${d?" active":""}${t.out[c]||t.standby===c?" benched":""}" style="--team:${Wn(a.color)}">${f}<span class="name">${Wn(a.name)}</span><span class="count">${g}</span><span class="bar"><i style="width:${100*h/er}%"></i></span></div>`)});else{const a=so(t,0),c=Vh(t),l=Gh(t)-a-c,h=t.pieces.find(u=>u.id===yi)?.loc.at==="pocket";s.push(`<div class="chip coop"><span class="name">Rescued</span><span class="count">${a}</span></div>`,`<div class="chip coop shark"><span class="name">Sharks</span><span class="count">${c}</span></div>`,`<div class="chip coop with-icon">${ss(is.captain,20,"Captain")}<span class="name">${h?"Saved":"Adrift"}</span><span class="count">${h?"✓":l}</span></div>`)}this.scores.innerHTML=s.join("");const r=n.players[t.current],o=n.teams[r.team];if(t.status==="playing"){const a=t.shotInTurn>0?" · again!":"",c=Mn(t)?" · beckon the Captain!":"";this.who.innerHTML=`<span class="swatch" style="background:${Wn(o.color)}"></span>${Wn(r.name)}${a}${c}`}else this.who.textContent=t.status==="won"?"The Captain is saved!":"The sharks got the Captain";this.hint.textContent=e}setSlider(t,e){this.slider.value=String(Math.round((1-t)*1e3)),this.slider.disabled=!e}setPower(t){this.power.classList.toggle("show",t!==null),t!==null&&(this.powerFill.style.width=`${Math.round(t*100)}%`,this.powerFill.style.background=`hsl(${120-120*t} 80% 50%)`)}toast(t,e="info",n=1800){this.toastEl.textContent=t,this.toastEl.className=`toast show ${e}`,window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastEl.className="toast",n)}insets(){return{top:this.top.getBoundingClientRect().bottom,bottom:window.innerHeight-this.bottom.getBoundingClientRect().top}}dispose(){window.clearTimeout(this.toastTimer),this.root.remove()}}function eo(i,t,e,n){return new Promise(s=>{const r=oe("div",{class:"sheet",role:"dialog","aria-modal":"true","aria-label":t});r.innerHTML=`<h2>${Wn(t)}</h2><div class="sheet-body">${e}</div>`;const o=oe("div",{class:"sheet-buttons"});for(const c of n){const l=oe("button",{class:c.primary?"btn primary":"btn","aria-label":c.label},c.html?"":c.label);c.html&&(l.innerHTML=c.html),l.addEventListener("click",()=>{a.remove(),s(c.id)}),o.append(l)}r.append(o);const a=oe("div",{class:"overlay"},r);i.append(a),o.querySelector(".primary")?.focus()})}class Lv{constructor(){tt(this,"ctx",null);tt(this,"noise",null);tt(this,"lastClick",0);tt(this,"enabled",!0)}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(t)try{this.ctx=new t;const e=Math.floor(this.ctx.sampleRate*.05);this.noise=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noise.getChannelData(0);for(let s=0;s<e;s++)n[s]=(Math.random()*2-1)*Math.pow(1-s/e,3)}catch{this.ctx=null}}clack(t,e=!1){const n=this.ctx;if(!n||!this.noise||!this.enabled)return;const s=n.currentTime;if(s-this.lastClick<.025)return;this.lastClick=s;const r=Math.min(1,t*(e?.25:.6));if(r<.02)return;const o=n.createBufferSource();o.buffer=this.noise;const a=n.createBiquadFilter();a.type="bandpass",a.frequency.value=e?700:2600+Math.random()*600,a.Q.value=e?1.2:3;const c=n.createGain();c.gain.value=r,o.connect(a).connect(c).connect(n.destination),o.start(s)}plop(t){const e=this.ctx;if(!e||!this.enabled)return;const n=e.currentTime,s=e.createOscillator(),r=e.createGain();s.type="sine",s.frequency.setValueAtTime(t?520:300,n),s.frequency.exponentialRampToValueAtTime(t?180:70,n+.18),r.gain.setValueAtTime(.35,n),r.gain.exponentialRampToValueAtTime(.001,n+.25),s.connect(r).connect(e.destination),s.start(n),s.stop(n+.26)}fanfare(){const t=this.ctx;if(!t||!this.enabled)return;const e=t.currentTime;[523,659,784,1046].forEach((n,s)=>{const r=t.createOscillator(),o=t.createGain();r.type="triangle",r.frequency.value=n;const a=e+s*.13;o.gain.setValueAtTime(1e-4,a),o.gain.exponentialRampToValueAtTime(.25,a+.02),o.gain.exponentialRampToValueAtTime(.001,a+.4),r.connect(o).connect(t.destination),r.start(a),r.stop(a+.42)})}}function no(i){try{navigator.vibrate?.(i)}catch{}}function Dv(i,t){const e=i.config,n=e.players[t.player].name,s=a=>e.teams[a]?.name??"Crew";if(t.captain?.result==="rescued")return e.mode==="versus"?{text:`The Captain is saved! ${s(t.team)} wins!`,tone:"good"}:{text:"The Captain is saved! Mission complete!",tone:"good"};if(t.captain?.result==="eaten")return{text:"The sharks got the Captain! Mission failed.",tone:"bad"};if(t.foul){const a="The Captain refuses to leave before his Sailors! Back to the Bridge —";return t.status==="won"&&t.winner!==null?{text:`${a} ${s(t.foul.team)} is out. ${s(t.winner)} wins!`,tone:"bad"}:{text:`${a} ${s(t.foul.team)} is ${t.foul.kind==="out"?"out of the game":"on standby"}.`,tone:"bad"}}const r=[];if(t.captain?.result==="returned"&&r.push("Wrong lifeboat — the Captain is back on the Bridge."),t.shooterSunk&&r.push(t.penalty?"Shooter in a lifeboat! One of your Sailors goes back to the Bridge.":"Shooter in a lifeboat!"),e.mode==="versus"){t.claimed&&r.unshift(`${s(t.team)} is rescuing the ${nr[t.claimed]}!`),t.ownRescued>0&&r.unshift(`${t.ownRescued} rescued!`);const a=t.rescued.filter(c=>c.team!==t.team);for(const c of new Set(a.map(l=>l.team))){const l=a.filter(h=>h.team===c).length;r.push(c>=0?`${l} rescued for ${s(c)}.`:`${l} spare Sailor${l>1?"s":""} rescued.`)}}else t.rescued.length&&r.unshift(`${t.rescued.length} rescued!`),t.lost.length&&r.push(`${t.lost.length} lost to the sharks!`);if(t.turnContinues&&r.push(`${n}, go again!`),t.timedOut&&r.push("(Shot stopped after the time limit.)"),r.length===0)return{text:`No rescue. ${e.players[t.nextPlayer].name}'s turn.`,tone:"info"};const o=t.shooterSunk||t.lost.length>0||t.captain?.result==="returned";return{text:r.join(" "),tone:o?"bad":t.turnContinues?"good":"info"}}const rs="chipwreck.match.v2",lh="chipwreck.prefs.v1";function Qs(i){try{i.status==="playing"?localStorage.setItem(rs,JSON.stringify(i)):localStorage.removeItem(rs)}catch{}}function cl(){try{const i=localStorage.getItem(rs);return i?jh(JSON.parse(i)):null}catch{try{localStorage.removeItem(rs)}catch{}return null}}function jo(){try{localStorage.removeItem(rs)}catch{}}function Iv(){const i={sound:!0,view:"table",names:[]};try{const t=JSON.parse(localStorage.getItem(lh)??"{}");return{sound:typeof t.sound=="boolean"?t.sound:i.sound,view:t.view==="top"||t.view==="first"?t.view:"table",names:Array.isArray(t.names)?t.names.filter(e=>typeof e=="string").slice(0,6):[]}}catch{return i}}function Qo(i){try{localStorage.setItem(lh,JSON.stringify(i))}catch{}}const ll=typeof matchMedia=="function"&&matchMedia("(pointer: fine)").matches,Uv=.34,hl=.05,Nv=2400;class Fv{constructor(t,e,n,s,r){tt(this,"board");tt(this,"pieces");tt(this,"aim");tt(this,"hud");tt(this,"phase","aim");tt(this,"shooter",{x:0,y:0});tt(this,"called",null);tt(this,"drag",null);tt(this,"sim",null);tt(this,"simInput",null);tt(this,"seenPocketed",0);tt(this,"acc",0);tt(this,"speed",1);tt(this,"raf",0);tt(this,"last",0);tt(this,"clock",0);tt(this,"disposed",!1);tt(this,"settleTimer",0);tt(this,"looking",!1);tt(this,"pointers",new Map);tt(this,"sfx",new Lv);tt(this,"cleanup",[]);tt(this,"frame",t=>{if(this.disposed)return;const e=Math.min(.1,Math.max(0,(t-this.last)/1e3));this.last=t,this.clock+=e,this.phase==="rolling"&&this.sim&&this.stepSimulation(e),this.pieces.update(e),this.phase==="settling"&&this.afterSettle(),this.aim.update(e),this.board.update(this.clock),this.stage.update(e),this.hud.setViewAdjusted(this.stage.adjusted),this.stage.render(),this.raf=requestAnimationFrame(this.frame)});this.root=t,this.stage=e,this.state=n,this.prefs=s,this.exit=r,this.sfx.enabled=s.sound;const o=on(n),a=Array.from({length:6},(h,u)=>{const d=n.seats.indexOf(u);return d>=0?n.config.teams[n.config.players[d].team].color:null});this.board=Mv(e.renderer,{geometry:o,pocketRoles:n.pocketRoles,seatColors:a}),e.extent=this.board.extent,this.pieces=new Ev(e.renderer,this.board,n),this.aim=new _v(e.renderer,o),e.scene.add(this.board.group,this.pieces.group,this.aim.group),this.hud=new Pv(t,{onSlide:h=>this.slideTo(h),onToggleView:()=>this.toggleView(),onToggleLook:()=>this.toggleLook(),onResetView:()=>this.stage.resetView(),onMenu:()=>void this.openMenu()}),e.setViewMode(s.view,!0),this.hud.setViewLabel(s.view);const c=e.canvas,l=(h,u,d)=>{h.addEventListener(u,d,{passive:!1}),this.cleanup.push(()=>h.removeEventListener(u,d))};l(c,"pointerdown",h=>this.onDown(h)),l(c,"pointermove",h=>this.onMove(h)),l(c,"pointerup",h=>this.onUp(h)),l(c,"pointercancel",h=>{this.pointers.delete(h.pointerId),this.cancelDrag()}),l(c,"pointerleave",()=>c.style.cursor=""),l(c,"wheel",h=>{h.preventDefault(),this.stage.zoomBy(h.deltaY>0?1.08:1/1.08)}),l(window,"keydown",h=>this.onKey(h)),l(c,"contextmenu",h=>h.preventDefault()),l(window,"resize",()=>this.layout()),this.layout(),this.beginTurn(!0),this.last=performance.now(),this.raf=requestAnimationFrame(this.frame),this.exposeDebug()}beginTurn(t=!1){const e=this.state;if(e.status!=="playing"){this.gameOver();return}const n=gl(e);if(!n){this.hud.toast("Your rope line is blocked — passing the turn.","info"),this.state=Kh(e),Qs(this.state),this.settleTimer=window.setTimeout(()=>this.beginTurn(),1200);return}this.phase="aim",this.called=null,this.shooter=n,this.stage.faceSeat(Sh(on(e),zh(e)),t),e.shotInTurn===0&&this.stage.resetView(),this.pieces.placeShooter(n);const s=e.config.teams[hr(e)].color;this.aim.showRope(rn(e),s),this.aim.setCallable(Mn(e)?ki(e):[],null),this.refreshShooter(),this.refreshHud()}hint(){return this.state.status!=="playing"||this.phase==="over"?"":this.phase==="rolling"?"Tap to speed up":this.phase==="settling"||this.phase!=="aim"?"":Mn(this.state)&&this.called===null?"Beckon the Captain: tap the lifeboat you’re aiming for":this.looking?ll?"Look around: drag to turn the view · scroll to zoom · L to aim again":"Look around: drag to turn, pinch to zoom · tap Look to aim again":ll?"Drag along your rope (or ← →) · pull back anywhere to flick · right-drag to turn the view":"Slide along your rope · pull back anywhere to flick · two fingers to turn the view"}refreshHud(){this.hud.update(this.state,this.hint()),this.hud.setSlider(this.ropeT(),this.phase==="aim")}refreshShooter(){const t=!Zi(this.state,this.shooter);this.pieces.placeShooter(this.shooter),this.aim.showShooter(this.shooter,Pe(this.state,"shooter"),t)}slideTo(t){if(this.phase!=="aim")return;const e=rn(this.state);this.shooter={x:e.start.x+(e.end.x-e.start.x)*t,y:e.start.y+(e.end.y-e.start.y)*t},this.refreshShooter()}shoot(t,e){const n=this.state,s=n.config.physics.maxShotSpeed*(.04+.96*e),r={shooter:{...this.shooter},velocity:{x:t.x*s,y:t.y*s}};if(Mn(n)){if(this.called===null){this.hud.toast("Announce your lifeboat first — tap one of the glowing pockets.","info",2600);return}r.calledPocket=this.called}const o=ra(n,r);if(o){this.hud.toast(o,"bad");return}this.sim=qh(n,r),this.simInput=r,this.seenPocketed=0,this.acc=0,this.speed=1,this.phase="rolling",this.aim.clearAim(),this.aim.hideAll(),this.aim.setCallable(this.called!==null?[this.called]:[],this.called),this.hud.setPower(null),this.refreshHud(),no(12)}stepSimulation(t){const e=this.sim;this.acc+=Math.min(t,.1)*this.speed;let n=0;for(;this.acc>=e.params.dt&&!e.finished&&n<Nv;){const s=e.step();for(const r of s)this.sfx.clack(r.impulse,r.b===null);this.acc-=e.params.dt,n++}for(;this.seenPocketed<e.pocketed.length;this.seenPocketed++){const s=e.pocketed[this.seenPocketed],o=this.state.pocketRoles[s.pocket]==="shark"||s.id===cr;this.pieces.drop(s.id,s.pocket,o),this.sfx.plop(!o),no(o?[20,40,20]:25)}for(const s of e.bodies)this.pieces.setLive(s.id,s);e.finished&&this.resolveShot()}resolveShot(){const t=this.sim,e=this.simInput;this.sim=null,this.simInput=null,this.phase="settling";let n;try{n=$h(this.state,e,t.outcome())}catch(s){console.error(s),this.hud.toast("Something went wrong with that shot — retake it.","bad"),this.pieces.syncToState(this.state,!1),this.beginTurn();return}if(this.state=n.state,Qs(this.state),this.pieces.syncToState(this.state,!0),this.state.pending){this.askClaim(n.report);return}this.announce(n.report)}async askClaim(t){this.phase="claiming",this.refreshHud();const e=t.claimOptions??[],n=await eo(this.root,"Choose your Sailors",`<p>${t.rescued.length} Sailors made it to the lifeboats. Which crew will ${this.state.config.teams[t.team].name} rescue?</p>`,e.map((r,o)=>({id:r,label:nr[r],html:`${ss(is[r],34,"")}<span>${nr[r]}</span>`,primary:o===0})));if(this.disposed)return;const s=Zh(this.state,n);this.state=s.state,Qs(this.state),this.pieces.syncToState(this.state,!0),this.phase="settling",this.announce(s.report)}announce(t){const e=Dv(this.state,t);this.hud.toast(e.text,e.tone,2600),t.status==="won"&&this.sfx.fanfare(),this.refreshHud()}afterSettle(){this.phase!=="settling"||this.pieces.busy||this.settleTimer||(this.settleTimer=window.setTimeout(()=>{this.settleTimer=0,!(this.disposed||this.phase!=="settling")&&this.beginTurn()},this.state.status==="playing"?650:900))}async gameOver(){this.phase="over",this.aim.hideAll(),this.pieces.placeShooter(null),this.refreshHud(),jo();const t=this.state,e=t.status==="won"?t.config.mode==="versus"?`${t.config.teams[t.winner].name} wins!`:"Mission complete!":"Mission failed",n=t.config.players.filter(c=>c.team===t.winner).map(c=>c.name).join(" & "),s=t.pieces.filter(c=>c.kind==="sailor"&&c.loc.at==="pocket"&&t.pocketRoles[c.loc.pocket]==="lifeboat").length,r=t.pieces.some(c=>c.kind==="captain"&&c.loc.at==="pocket"&&t.pocketRoles[c.loc.pocket]==="lifeboat"),o=`${ss(is.captain,72,"The Captain")}`+(t.config.mode==="versus"?`<p>${n} ${r?"saved the Captain":"are the last crew standing"} after ${t.turn} turn${t.turn===1?"":"s"}.</p>`:`<p>${s} of 30 Sailors rescued${r?", and the Captain is safe":""}.</p>`),a=await eo(this.root,e,o,[{id:"rematch",label:"Play again",primary:!0},{id:"menu",label:"Main menu"}]);this.disposed||this.exit(a==="rematch"?"rematch":"menu")}async openMenu(){if(this.phase==="over"||this.phase==="paused")return;const t=this.phase;this.phase="paused",this.cancelDrag();const e=await eo(this.root,"Paused",`<p>Turn ${this.state.turn} · ${this.state.config.players[this.state.current].name} to shoot.</p>`,[{id:"resume",label:"Resume",primary:!0},{id:"sound",label:this.prefs.sound?"Sound: on":"Sound: off"},{id:"restart",label:"Restart match"},{id:"menu",label:"Save & quit"}]);this.disposed||(this.phase=t,e==="sound"?(this.prefs.sound=!this.prefs.sound,this.sfx.enabled=this.prefs.sound,Qo(this.prefs),this.openMenu()):e==="restart"?(jo(),this.exit("rematch")):e==="menu"&&this.exit("menu"))}toggleView(t){const e=t??Qr[(Qr.indexOf(this.stage.mode)+1)%Qr.length];this.stage.setViewMode(e),this.hud.setViewLabel(e),this.prefs.view=e,Qo(this.prefs)}toggleLook(){this.looking=!this.looking,this.hud.setLooking(this.looking),this.cancelDrag(),this.refreshHud()}layout(){this.stage.resize(),this.stage.setInsets(this.hud.insets())}touchTolerance(){return Math.max(.06,26*this.stage.worldPerPixel())}onDown(t){if(t.preventDefault(),this.sfx.unlock(),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.stage.canvas.setPointerCapture?.(t.pointerId),this.pointers.size===2){this.cancelDrag();const[u,d]=[...this.pointers.values()];this.drag={kind:"orbit2",cx:(u.x+d.x)/2,cy:(u.y+d.y)/2,dist:Math.hypot(u.x-d.x,u.y-d.y)};return}if(this.drag||this.phase==="over"||this.phase==="paused")return;const e=this.phase==="rolling"||this.phase==="settling",n=t.pointerType==="mouse"&&(t.button===1||t.button===2);if(e||n||this.looking||this.phase==="claiming"){this.drag={kind:"orbit",pointerId:t.pointerId,x:t.clientX,y:t.clientY,moved:0,tapSpeedsUp:e};return}if(this.phase!=="aim"||this.drag)return;const s=this.stage.pick(t.clientX,t.clientY);if(!s)return;const r=this.state,o=on(r),a=this.touchTolerance();if(Mn(r))for(const u of ki(r)){const d=o.pockets[u];if(Math.hypot(s.x-d.x,s.y-d.y)<o.spec.pocketRadius+a){this.called=this.called===u?null:u,this.aim.setCallable(ki(r),this.called),this.refreshHud(),no(8);return}}const c=rn(r),l=Math.hypot(s.x-this.shooter.x,s.y-this.shooter.y)<Pe(r,"shooter")+a*.6;Math.hypot(...(()=>{const u=Vi(s,c.start,c.end);return[u.x-s.x,u.y-s.y]})())<a&&!l?(this.drag={kind:"slide",pointerId:t.pointerId},this.moveShooterTo(s)):this.drag={kind:"pull",pointerId:t.pointerId,sx:t.clientX,sy:t.clientY,start:s,dir:null,power:0}}onKey(t){if(t.target?.closest?.("input, textarea, .overlay"))return;const e=t.key;if(e==="Escape"){this.drag?this.cancelDrag():this.openMenu(),t.preventDefault();return}if(e==="v"||e==="V"){this.toggleView();return}if(e==="+"||e==="=")return this.stage.zoomBy(1/1.15);if(e==="-"||e==="_")return this.stage.zoomBy(1.15);if(e==="0"||e==="r"||e==="R")return this.stage.resetView();if(e==="f"||e==="F")return this.toggleView(this.stage.mode==="first"?"table":"first");if(e==="l"||e==="L")return this.toggleLook();const n=24;if(e==="q"||e==="Q")return this.stage.orbitBy(-n,0);if(e==="e"||e==="E")return this.stage.orbitBy(n,0);if(e==="w"||e==="W")return this.stage.orbitBy(0,-n);if(e==="s"||e==="S")return this.stage.orbitBy(0,n);if(!(this.phase!=="aim"||this.drag)&&(e==="ArrowLeft"||e==="ArrowRight"||e==="a"||e==="d"||e==="A"||e==="D")){t.preventDefault();const s=e==="ArrowLeft"||e==="a"||e==="A"?1:-1,r=t.shiftKey?.004:.025;this.slideTo(Math.min(1,Math.max(0,this.ropeT()+s*r))),this.refreshHud()}}ropeT(){const t=rn(this.state),e=t.end.x-t.start.x,n=t.end.y-t.start.y;return((this.shooter.x-t.start.x)*e+(this.shooter.y-t.start.y)*n)/(e*e+n*n)}updateCursor(t){if(t.pointerType!=="mouse")return;const e=this.stage.canvas;if(this.drag){e.style.cursor=this.drag.kind==="slide"?"ew-resize":this.drag.kind==="pull"?"grabbing":"move";return}if(this.looking){e.style.cursor="move";return}if(this.phase!=="aim"){e.style.cursor=this.phase==="rolling"?"pointer":"default";return}const n=this.stage.pick(t.clientX,t.clientY);if(!n)return;const s=this.state,r=on(s),o=this.touchTolerance();if(Mn(s)&&ki(s).some(h=>Math.hypot(n.x-r.pockets[h].x,n.y-r.pockets[h].y)<r.spec.pocketRadius+o)){e.style.cursor="pointer";return}const a=rn(s),c=Vi(n,a.start,a.end),l=Math.hypot(n.x-this.shooter.x,n.y-this.shooter.y)<Pe(s,"shooter")+o*.6;e.style.cursor=!l&&Math.hypot(c.x-n.x,c.y-n.y)<o?"ew-resize":"grab"}onMove(t){this.updateCursor(t),this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY});const e=this.drag;if(e?.kind==="orbit2"){t.preventDefault();const f=[...this.pointers.values()];if(f.length<2)return;const[g,_]=f,m=(g.x+_.x)/2,p=(g.y+_.y)/2,b=Math.hypot(g.x-_.x,g.y-_.y);this.stage.orbitBy(m-e.cx,p-e.cy),e.dist>10&&b>10&&this.stage.zoomBy(e.dist/b),e.cx=m,e.cy=p,e.dist=b;return}if(e?.kind==="orbit"){if(e.pointerId!==t.pointerId)return;t.preventDefault();const f=t.clientX-e.x,g=t.clientY-e.y;e.moved+=Math.abs(f)+Math.abs(g),e.x=t.clientX,e.y=t.clientY,this.stage.orbitBy(f,g);return}if(!e||e.pointerId!==t.pointerId||this.phase!=="aim")return;t.preventDefault();const n=this.stage.pick(t.clientX,t.clientY);if(!n)return;if(e.kind==="slide"){this.moveShooterTo(n);return}const s=Math.hypot(t.clientX-e.sx,t.clientY-e.sy),r=Math.min(window.innerWidth,window.innerHeight)*Uv,o=Math.min(1,s/r),a=e.start.x-n.x,c=e.start.y-n.y,l=Math.hypot(a,c);if(o<hl||l<1e-6){e.dir=null,e.power=0,this.aim.clearAim(),this.hud.setPower(null);return}e.dir={x:a/l,y:c/l},e.power=o;const h=this.state,u=as(h).map(f=>({id:f.id,x:f.loc.x,y:f.loc.y,r:Pe(h,f.kind)})),d=nu(on(h),u,this.shooter,e.dir,Pe(h,"shooter"));this.aim.showAim(this.shooter,e.dir,o,Pe(h,"shooter"),d),this.hud.setPower(o)}onUp(t){this.pointers.delete(t.pointerId),this.stage.canvas.releasePointerCapture?.(t.pointerId);const e=this.drag;if(e?.kind==="orbit2"){this.drag=null;return}if(!e||e.pointerId!==t.pointerId)return;if(this.drag=null,e.kind==="orbit"){e.tapSpeedsUp&&e.moved<8&&(this.speed=3);return}if(this.aim.clearAim(),this.hud.setPower(null),e.kind!=="pull"||this.phase!=="aim"||!e.dir||e.power<hl)return;if(Zi(this.state,this.shooter)){this.hud.toast("Slide the shooter clear of other pieces first.","bad");return}this.shoot(e.dir,e.power)}cancelDrag(){this.drag=null,this.stage.canvas.style.cursor="",this.aim.clearAim(),this.hud.setPower(null)}moveShooterTo(t){const e=rn(this.state);this.shooter=Vi(t,e.start,e.end),this.refreshShooter(),this.refreshHud()}exposeDebug(){window.__chipwreck={state:()=>this.state,phase:()=>this.phase,shoot:(t,e,n,s)=>{s!==void 0&&(this.called=s);const r=Math.hypot(t,e);this.shoot({x:t/r,y:e/r},n)},slide:t=>this.slideTo(t),view:()=>this.toggleView()}}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),window.clearTimeout(this.settleTimer),this.cleanup.forEach(t=>t()),this.stage.scene.remove(this.board.group,this.pieces.group,this.aim.group),this.board.dispose(),this.pieces.dispose(),this.aim.dispose(),this.hud.dispose(),document.querySelectorAll(".overlay").forEach(t=>t.remove())}}const Ov=`
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
</ul>`;function Bv(i,t){let e="versus",n="normal",s="out",r=2,o=vr(2);const a=Array.from({length:6},(h,u)=>t.names[u]??`Player ${u+1}`),c=oe("div",{class:"setup"});i.append(c);const l=()=>{const h=e==="versus"?oo(r):[],u=e==="versus"?xl(o):Array.from({length:r},()=>-1),d=e==="versus"?2:1;c.innerHTML=`
      <div class="setup-card">
        <div class="badge" aria-label="ChipWreck — The Legendary Rescue">
          ${ss(is.captain,96,"The Captain")}
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
            <button data-step="-1" aria-label="Fewer players" ${r<=d?"disabled":""}>−</button>
            <output aria-live="polite">${r}</output>
            <button data-step="1" aria-label="More players" ${r>=6?"disabled":""}>+</button>
          </div>
        </div>
        ${e==="versus"?`
        <div class="row wrap">
          <span class="label">Teams</span>
          <div class="layouts">
            ${h.map((f,g)=>`<button class="pill${f.join()===o.join()?" on":""}" data-layout="${g}">${Qh(f)}</button>`).join("")}
          </div>
        </div>`:""}
        <div class="players">
          ${u.map((f,g)=>{const _=f>=0?ro[f].color:"#e7b73c",m=f>=0?ro[f].name:"Crew";return`<label class="player" style="--team:${_}"><span class="seat">${g+1}</span>
              <input data-name="${g}" maxlength="24" value="${Wn(a[g])}" aria-label="Player ${g+1} name" />
              <span class="team">${m}</span></label>`}).join("")}
        </div>
        <p class="note">Seat 1 starts — by lifeboat tradition, the youngest sailor. Play passes to the left.</p>
        <div class="row">
          <span class="label">Sea salt</span>
          <div class="layouts">
            ${["light","normal","heavy"].map(f=>`<button class="pill${n===f?" on":""}" data-salt="${f}">${f==="light"?"Light":f==="normal"?"Normal":"Heavy"}</button>`).join("")}
          </div>
        </div>
        <p class="note">How freely the chips glide. Normal: a full-power shooter banks off the walls three times.</p>
        ${e==="versus"?`
        <div class="row">
          <span class="label">Early Captain</span>
          <div class="layouts">
            <button class="pill${s==="out"?" on":""}" data-foul="out">Crew out</button>
            <button class="pill${s==="standby"?" on":""}" data-foul="standby">Standby</button>
          </div>
        </div>`:""}
        <button class="btn primary wide" data-act="start">Set sail</button>
        <details class="rules"><summary>How to play</summary>${Ov}</details>
        <footer class="credits">
          <p>Created by Justin Thomae · Est. 2016</p>
          <p>Copyright © ${new Date().getFullYear()} <a href="https://grudgematchgames.com" target="_blank" rel="noopener">Grudge Match Games</a></p>
        </footer>
      </div>`};return c.addEventListener("click",h=>{const u=h.target.closest("button");if(u){if(u.dataset.mode)e=u.dataset.mode,e==="versus"&&r<2&&(r=2),o=vr(Math.max(2,r))??[1,1];else if(u.dataset.step)r=Math.min(6,Math.max(e==="versus"?2:1,r+Number(u.dataset.step))),e==="versus"&&(o=vr(r));else if(u.dataset.salt)n=u.dataset.salt;else if(u.dataset.foul)s=u.dataset.foul;else if(u.dataset.layout)o=oo(r)[Number(u.dataset.layout)];else if(u.dataset.act==="resume"){t.onResume();return}else if(u.dataset.act==="start"){const d=a.slice(0,r).map((g,_)=>g.trim()||`Player ${_+1}`),f={salt:n,captainFoul:s};t.onStart({config:e==="versus"?tu(o,d,f):eu(r,d,f),names:a});return}l()}}),c.addEventListener("input",h=>{const u=h.target;u.dataset.name&&(a[Number(u.dataset.name)]=u.value)}),l(),()=>c.remove()}function kv(i){if(!/^https?:$/.test(location.protocol))return;const t=()=>{i()&&fetch(`version.json?t=${Date.now()}`,{cache:"no-store"}).then(e=>e.ok?e.json():null).then(e=>{if(!e||!(typeof e.build=="number"&&e.build>2610132118)||!i())return;try{if(sessionStorage.getItem("chipwreck.reload")===String(e.build))return;sessionStorage.setItem("chipwreck.reload",String(e.build))}catch{}const n=new URL(location.href);n.searchParams.set("v",String(e.build)),location.replace(n.href)}).catch(()=>{})};t(),addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&t()})}const ba=document.getElementById("app"),zv=document.getElementById("scene"),tr=Iv();let os;try{os=new Cv(zv)}catch(i){throw console.error(i),ba.innerHTML='<div class="fatal"><h1>ChipWreck</h1><p>This device could not start 3D graphics (WebGL). Try another browser or update your device.</p></div>',i}let wn=null,ta=null,ar=null;function ea(i){ta?.(),ta=null,wn?.dispose(),Qs(i),wn=new Fv(ba,os,i,tr,t=>{wn?.dispose(),wn=null,t==="rematch"&&ar?ea(na(ar)):wa()})}function wa(){wn?.dispose(),wn=null,os.resize(),ta=Bv(ba,{names:tr.names,canResume:!!cl(),onResume:()=>{const i=cl();if(!i)return wa();ar=i.config,ea(i)},onStart:({config:i,names:t})=>{tr.names=t,Qo(tr),jo(),ar=i,ea(na(i))}})}function hh(){wn||(os.resize(),os.render()),requestAnimationFrame(hh)}wa();hh();kv(()=>wn===null);
