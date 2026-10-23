(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},t={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},n=1e3,r=1001,i=1002,a=1003,o=1004,s=1005,c=1006,l=1007,u=1008,d=1009,f=1010,p=1011,m=1012,h=1013,g=1014,_=1015,v=1016,y=1017,b=1018,x=1020,S=35902,C=35899,w=1021,T=1022,E=1023,D=1026,O=1027,k=1028,A=1029,j=1030,ee=1031,te=1033,M=33776,ne=33777,N=33778,re=33779,ie=35840,ae=35841,oe=35842,se=35843,ce=36196,le=37492,P=37496,ue=37488,de=37489,fe=37490,pe=37491,me=37808,he=37809,ge=37810,_e=37811,ve=37812,ye=37813,be=37814,xe=37815,Se=37816,Ce=37817,we=37818,Te=37819,Ee=37820,De=37821,Oe=36492,ke=36494,Ae=36495,je=36283,Me=36284,Ne=36285,F=36286,Pe=2300,Fe=2301,Ie=2302,I=2303,Le=2400,L=2401,Re=2402,ze=3200,Be=`srgb`,Ve=`srgb-linear`,He=`linear`,Ue=`srgb`,We=7680,Ge=35044,Ke=2e3;function qe(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Je(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ye(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Xe(){let e=Ye(`canvas`);return e.style.display=`block`,e}var Ze={};function Qe(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function $e(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function R(...e){e=$e(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function z(...e){e=$e(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function et(...e){let t=e.join(` `);t in Ze||(Ze[t]=!0,R(...e))}function tt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var nt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},rt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},it=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),at=1234567,ot=Math.PI/180,st=180/Math.PI;function ct(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(it[e&255]+it[e>>8&255]+it[e>>16&255]+it[e>>24&255]+`-`+it[t&255]+it[t>>8&255]+`-`+it[t>>16&15|64]+it[t>>24&255]+`-`+it[n&63|128]+it[n>>8&255]+`-`+it[n>>16&255]+it[n>>24&255]+it[r&255]+it[r>>8&255]+it[r>>16&255]+it[r>>24&255]).toLowerCase()}function B(e,t,n){return Math.max(t,Math.min(n,e))}function lt(e,t){return(e%t+t)%t}function ut(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function dt(e,t,n){return e===t?0:(n-e)/(t-e)}function ft(e,t,n){return(1-n)*e+n*t}function pt(e,t,n,r){return ft(e,t,1-Math.exp(-n*r))}function mt(e,t=1){return t-Math.abs(lt(e,t*2)-t)}function ht(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function gt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function _t(e,t){return e+Math.floor(Math.random()*(t-e+1))}function vt(e,t){return e+Math.random()*(t-e)}function yt(e){return e*(.5-Math.random())}function bt(e){e!==void 0&&(at=e);let t=at+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xt(e){return e*ot}function St(e){return e*st}function Ct(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function wt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Tt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Et(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:R(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Dt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Ot(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var kt={DEG2RAD:ot,RAD2DEG:st,generateUUID:ct,clamp:B,euclideanModulo:lt,mapLinear:ut,inverseLerp:dt,lerp:ft,damp:pt,pingpong:mt,smoothstep:ht,smootherstep:gt,randInt:_t,randFloat:vt,randFloatSpread:yt,seededRandom:bt,degToRad:xt,radToDeg:St,isPowerOfTwo:Ct,ceilPowerOfTwo:wt,floorPowerOfTwo:Tt,setQuaternionFromProperEuler:Et,normalize:Ot,denormalize:Dt},V=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},At=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:R(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(B(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jt.copy(this).projectOnVector(e),this.sub(jt)}reflect(e){return this.sub(jt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jt=new H,Mt=new At,Nt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return et(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Pt.makeScale(e,t)),this}rotate(e){return et(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Pt.makeRotation(-e)),this}translate(e,t){return et(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Pt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pt=new Nt,Ft=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),It=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lt(){let e={enabled:!0,workingColorSpace:Ve,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=zt(e.r),e.g=zt(e.g),e.b=zt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Bt(e.r),e.g=Bt(e.g),e.b=Bt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?He:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return et(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return et(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ve]:{primaries:t,whitePoint:r,transfer:He,toXYZ:Ft,fromXYZ:It,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:t,whitePoint:r,transfer:Ue,toXYZ:Ft,fromXYZ:It,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}}),e}var Rt=Lt();function zt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Bt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Vt,Ht=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vt===void 0&&(Vt=Ye(`canvas`)),Vt.width=e.width,Vt.height=e.height;let t=Vt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Vt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ye(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=zt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(zt(t[e]/255)*255):t[e]=zt(t[e]);return{data:t,width:e.width,height:e.height}}return R(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ut=0,Wt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ut++}),this.uuid=ct(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Gt(r[t].image)):e.push(Gt(r[t]))}else e=Gt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Gt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Ht.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(R(`Texture: Unable to serialize Texture.`),{})}var Kt=0,qt=new H,Jt=class e extends rt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=r,a=r,o=c,s=u,l=E,f=d,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kt++}),this.uuid=ct(),this.name=``,this.source=new Wt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=s,this.anisotropy=p,this.format=l,this.internalFormat=null,this.type=f,this.offset=new V(0,0),this.repeat=new V(1,1),this.center=new V(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(qt).x}get height(){return this.source.getSize(qt).y}get depth(){return this.source.getSize(qt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){R(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?R(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case n:e.x-=Math.floor(e.x);break;case r:e.x=e.x<0?0:1;break;case i:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case n:e.y-=Math.floor(e.y);break;case r:e.y=e.y<0?0:1;break;case i:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Jt.DEFAULT_IMAGE=null,Jt.DEFAULT_MAPPING=300,Jt.DEFAULT_ANISOTROPY=1;var Yt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this.w=B(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this.w=B(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xt=class extends rt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:c,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Yt(0,0,e,t),this.scissorTest=!1,this.viewport=new Yt(0,0,e,t),this.textures=[];let r=new Jt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:c,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Wt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Zt=class extends Xt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Qt=class extends Jt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=a,this.minFilter=a,this.wrapR=r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},$t=class extends Jt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=a,this.minFilter=a,this.wrapR=r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},U=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/en.setFromMatrixColumn(e,0).length(),i=1/en.setFromMatrixColumn(e,1).length(),a=1/en.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nn,e,rn)}lookAt(e,t,n){let r=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),an.crossVectors(n,sn),an.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),an.crossVectors(n,sn)),an.normalize(),on.crossVectors(sn,an),r[0]=an.x,r[4]=on.x,r[8]=sn.x,r[1]=an.y,r[5]=on.y,r[9]=sn.y,r[2]=an.z,r[6]=on.z,r[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],te=r[3],M=r[7],ne=r[11],N=r[15];return i[0]=a*x+o*T+s*k+c*te,i[4]=a*S+o*E+s*A+c*M,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*ee+c*N,i[1]=l*x+u*T+d*k+f*te,i[5]=l*S+u*E+d*A+f*M,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*ee+f*N,i[2]=p*x+m*T+h*k+g*te,i[6]=p*S+m*E+h*A+g*M,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*ee+g*N,i[3]=_*x+v*T+y*k+b*te,i[7]=_*S+v*E+y*A+b*M,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*ee+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=en.set(r[0],r[1],r[2]).length(),o=en.set(r[4],r[5],r[6]).length(),s=en.set(r[8],r[9],r[10]).length();i<0&&(a=-a),tn.copy(this);let c=1/a,l=1/o,u=1/s;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=l,tn.elements[5]*=l,tn.elements[6]*=l,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,t.setFromRotationMatrix(tn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ke,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ke,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},en=new H,tn=new U,nn=new H(0,0,0),rn=new H(1,1,1),an=new H,on=new H,sn=new H,cn=new U,ln=new At,un=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(B(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-B(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(B(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-B(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(B(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-B(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:R(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ln.setFromEuler(this),this.setFromQuaternion(ln,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};un.DEFAULT_ORDER=`XYZ`;var dn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},fn=0,pn=new H,mn=new At,hn=new U,gn=new H,_n=new H,vn=new H,yn=new At,bn=new H(1,0,0),xn=new H(0,1,0),Sn=new H(0,0,1),Cn={type:`added`},wn={type:`removed`},Tn={type:`childadded`,child:null},En={type:`childremoved`,child:null},Dn=class e extends rt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fn++}),this.uuid=ct(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new un,r=new At,i=new H(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new U},normalMatrix:{value:new Nt}}),this.matrix=new U,this.matrixWorld=new U,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mn.setFromAxisAngle(e,t),this.quaternion.multiply(mn),this}rotateOnWorldAxis(e,t){return mn.setFromAxisAngle(e,t),this.quaternion.premultiply(mn),this}rotateX(e){return this.rotateOnAxis(bn,e)}rotateY(e){return this.rotateOnAxis(xn,e)}rotateZ(e){return this.rotateOnAxis(Sn,e)}translateOnAxis(e,t){return pn.copy(e).applyQuaternion(this.quaternion),this.position.add(pn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bn,e)}translateY(e){return this.translateOnAxis(xn,e)}translateZ(e){return this.translateOnAxis(Sn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gn.copy(e):gn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),_n.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(_n,gn,this.up):hn.lookAt(gn,_n,this.up),this.quaternion.setFromRotationMatrix(hn),r&&(hn.extractRotation(r.matrixWorld),mn.setFromRotationMatrix(hn),this.quaternion.premultiply(mn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(z(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null):z(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wn),En.child=e,this.dispatchEvent(En),En.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,e,vn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,yn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Dn.DEFAULT_UP=new H(0,1,0),Dn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var On=class extends Dn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},kn={type:`move`},An=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new On,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new On,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new On,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new On;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},jn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},Nn={h:0,s:0,l:0};function Pn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var W=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Be){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Rt.workingColorSpace){if(e=lt(e,1),t=B(t,0,1),n=B(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Pn(i,r,e+1/3),this.g=Pn(i,r,e),this.b=Pn(i,r,e-1/3)}return Rt.colorSpaceToWorking(this,r),this}setStyle(e,t=Be){function n(t){t!==void 0&&parseFloat(t)<1&&R(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:R(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);R(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Be){let n=jn[e.toLowerCase()];return n===void 0?R(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zt(e.r),this.g=zt(e.g),this.b=zt(e.b),this}copyLinearToSRGB(e){return this.r=Bt(e.r),this.g=Bt(e.g),this.b=Bt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Be){return Rt.workingToColorSpace(Fn.copy(this),e),Math.round(B(Fn.r*255,0,255))*65536+Math.round(B(Fn.g*255,0,255))*256+Math.round(B(Fn.b*255,0,255))}getHexString(e=Be){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.workingToColorSpace(Fn.copy(this),t);let n=Fn.r,r=Fn.g,i=Fn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Rt.workingColorSpace){return Rt.workingToColorSpace(Fn.copy(this),t),e.r=Fn.r,e.g=Fn.g,e.b=Fn.b,e}getStyle(e=Be){Rt.workingToColorSpace(Fn.copy(this),e);let t=Fn.r,n=Fn.g,r=Fn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Mn),this.setHSL(Mn.h+e,Mn.s+t,Mn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mn),e.getHSL(Nn);let n=ft(Mn.h,Nn.h,t),r=ft(Mn.s,Nn.s,t),i=ft(Mn.l,Nn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fn=new W;W.NAMES=jn;var In=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new W(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ln=class extends Dn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rn=new H,zn=new H,Bn=new H,Vn=new H,Hn=new H,Un=new H,Wn=new H,Gn=new H,Kn=new H,qn=new H,Jn=new Yt,Yn=new Yt,Xn=new Yt,Zn=class e{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Rn.subVectors(e,t),r.cross(Rn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Rn.subVectors(r,t),zn.subVectors(n,t),Bn.subVectors(e,t);let a=Rn.dot(Rn),o=Rn.dot(zn),s=Rn.dot(Bn),c=zn.dot(zn),l=zn.dot(Bn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Vn)!==null&&Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Vn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Vn.x),s.addScaledVector(a,Vn.y),s.addScaledVector(o,Vn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Jn.setScalar(0),Yn.setScalar(0),Xn.setScalar(0),Jn.fromBufferAttribute(e,t),Yn.fromBufferAttribute(e,n),Xn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Jn,i.x),a.addScaledVector(Yn,i.y),a.addScaledVector(Xn,i.z),a}static isFrontFacing(e,t,n,r){return Rn.subVectors(n,t),zn.subVectors(e,t),Rn.cross(zn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),Rn.cross(zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Hn.subVectors(r,n),Un.subVectors(i,n),Gn.subVectors(e,n);let s=Hn.dot(Gn),c=Un.dot(Gn);if(s<=0&&c<=0)return t.copy(n);Kn.subVectors(e,r);let l=Hn.dot(Kn),u=Un.dot(Kn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Hn,a);qn.subVectors(e,i);let f=Hn.dot(qn),p=Un.dot(qn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Un,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Wn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Wn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Hn,a).addScaledVector(Un,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qn=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(er.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(er.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=er.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,er):er.fromBufferAttribute(r,t),er.applyMatrix4(e.matrixWorld),this.expandByPoint(er);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),tr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),tr.copy(e.boundingBox)),tr.applyMatrix4(e.matrixWorld),this.union(tr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,er),er.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cr),lr.subVectors(this.max,cr),nr.subVectors(e.a,cr),rr.subVectors(e.b,cr),ir.subVectors(e.c,cr),ar.subVectors(rr,nr),or.subVectors(ir,rr),sr.subVectors(nr,ir);let t=[0,-ar.z,ar.y,0,-or.z,or.y,0,-sr.z,sr.y,ar.z,0,-ar.x,or.z,0,-or.x,sr.z,0,-sr.x,-ar.y,ar.x,0,-or.y,or.x,0,-sr.y,sr.x,0];return!fr(t,nr,rr,ir,lr)||(t=[1,0,0,0,1,0,0,0,1],!fr(t,nr,rr,ir,lr))?!1:(ur.crossVectors(ar,or),t=[ur.x,ur.y,ur.z],fr(t,nr,rr,ir,lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,er).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(er).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$n=[new H,new H,new H,new H,new H,new H,new H,new H],er=new H,tr=new Qn,nr=new H,rr=new H,ir=new H,ar=new H,or=new H,sr=new H,cr=new H,lr=new H,ur=new H,dr=new H;function fr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){dr.fromArray(e,a);let o=i.x*Math.abs(dr.x)+i.y*Math.abs(dr.y)+i.z*Math.abs(dr.z),s=t.dot(dr),c=n.dot(dr),l=r.dot(dr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var pr=new H,mr=new V,hr=0,gr=class extends rt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ge,this.updateRanges=[],this.gpuType=_,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXY(t,mr.x,mr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix3(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix4(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyNormalMatrix(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.transformDirection(e),this.setXYZ(t,pr.x,pr.y,pr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Dt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),i=Ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},_r=class extends gr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},vr=class extends gr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},G=class extends gr{constructor(e,t,n){super(new Float32Array(e),t,n)}},yr=new Qn,br=new H,xr=new H,Sr=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?yr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;br.subVectors(e,this.center);let t=br.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(br,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(br.copy(e.center).add(xr)),this.expandByPoint(br.copy(e.center).sub(xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Cr=0,wr=new U,Tr=new Dn,Er=new H,Dr=new Qn,Or=new Qn,kr=new H,Ar=class e extends rt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cr++}),this.uuid=ct(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(qe(e)?vr:_r)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Nt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wr.makeRotationFromQuaternion(e),this.applyMatrix4(wr),this}rotateX(e){return wr.makeRotationX(e),this.applyMatrix4(wr),this}rotateY(e){return wr.makeRotationY(e),this.applyMatrix4(wr),this}rotateZ(e){return wr.makeRotationZ(e),this.applyMatrix4(wr),this}translate(e,t,n){return wr.makeTranslation(e,t,n),this.applyMatrix4(wr),this}scale(e,t,n){return wr.makeScale(e,t,n),this.applyMatrix4(wr),this}lookAt(e){return Tr.lookAt(e),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new G(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&R(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)z(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Dr.setFromBufferAttribute(n),this.morphTargetsRelative?(kr.addVectors(this.boundingBox.min,Dr.min),this.boundingBox.expandByPoint(kr),kr.addVectors(this.boundingBox.max,Dr.max),this.boundingBox.expandByPoint(kr)):(this.boundingBox.expandByPoint(Dr.min),this.boundingBox.expandByPoint(Dr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&z(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)z(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new H,1/0);else if(e){let n=this.boundingSphere.center;if(Dr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Or.setFromBufferAttribute(n),this.morphTargetsRelative?(kr.addVectors(Dr.min,Or.min),Dr.expandByPoint(kr),kr.addVectors(Dr.max,Or.max),Dr.expandByPoint(kr)):(Dr.expandByPoint(Or.min),Dr.expandByPoint(Or.max))}Dr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)kr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(kr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)kr.fromBufferAttribute(a,t),o&&(Er.fromBufferAttribute(e,t),kr.add(Er)),r=Math.max(r,n.distanceToSquared(kr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&z(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){z(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new gr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new H,s[e]=new H;let c=new H,l=new H,u=new H,d=new V,f=new V,p=new V,m=new H,h=new H;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new H,y=new H,b=new H,x=new H;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new gr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new H,i=new H,a=new H,o=new H,s=new H,c=new H,l=new H,u=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kr.fromBufferAttribute(e,t),kr.normalize(),e.setXYZ(t,kr.x,kr.y,kr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new gr(a,r,i)}if(this.index===null)return R(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},jr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ge,this.updateRanges=[],this.version=0,this.uuid=ct()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ct()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ct()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Mr=new H,Nr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mr.fromBufferAttribute(this,t),Mr.applyMatrix4(e),this.setXYZ(t,Mr.x,Mr.y,Mr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mr.fromBufferAttribute(this,t),Mr.applyNormalMatrix(e),this.setXYZ(t,Mr.x,Mr.y,Mr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mr.fromBufferAttribute(this,t),Mr.transformDirection(e),this.setXYZ(t,Mr.x,Mr.y,Mr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Dt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),i=Ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Qe(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new gr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Qe(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Pr=new H,Fr=new H,Ir=new Nt,Lr=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Pr.subVectors(n,t).cross(Fr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Pr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ir.getNormalMatrix(e),r=this.coplanarPoint(Pr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Rr=0,zr=class extends rt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rr++}),this.uuid=ct(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=We,this.stencilZFail=We,this.stencilZPass=We,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){R(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?R(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new W().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Lr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new V().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new V().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Br=new H,Vr=new H,Hr=new H,Ur=new H,Wr=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Br)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Br.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Br.copy(this.origin).addScaledVector(this.direction,t),Br.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Vr.copy(e).add(t).multiplyScalar(.5),Hr.copy(t).sub(e).normalize(),Ur.copy(this.origin).sub(Vr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Hr),o=Ur.dot(this.direction),s=-Ur.dot(Hr),c=Ur.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Vr).addScaledVector(Hr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Br.subVectors(e.center,this.origin);let n=Br.dot(this.direction),r=Br.dot(Br)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Br)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,te;if(y>=b&&y>=x?(w=s,D=u,A=p,te=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,te=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,te=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let M=S/w,ne=C/w,N=1/w,re=T-M*D,ie=E-ne*D,ae=O-M*A,oe=k-ne*A,se=j-M*te,ce=ee-ne*te,le=se*oe-ce*ae,P=re*ce-ie*se,ue=ae*ie-oe*re;if(r){if(le<0||P<0||ue<0)return null}else if((le<0||P<0||ue<0)&&(le>0||P>0||ue>0))return null;let de=le+P+ue;if(de===0)return null;let fe=N*(le*D+P*A+ue*te);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Gr=class extends zr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Kr=new U,qr=new Wr,Jr=new Sr,Yr=new H,Xr=new H,Zr=new H,Qr=new H,$r=new H,ei=new H,ti=new H,ni=new H,ri=class extends Dn{constructor(e=new Ar,t=new Gr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ei.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&($r.fromBufferAttribute(s,e),a?ei.addScaledVector($r,r):ei.addScaledVector($r.sub(t),r))}t.add(ei)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(i),qr.copy(e.ray).recast(e.near),!(Jr.containsPoint(qr.origin)===!1&&(qr.intersectSphere(Jr,Yr)===null||qr.origin.distanceToSquared(Yr)>(e.far-e.near)**2))&&(Kr.copy(i).invert(),qr.copy(e.ray).applyMatrix4(Kr),(n.boundingBox===null||qr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,qr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ai(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ai(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ai(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ai(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ii(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ni.copy(s),ni.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ni);return l<n.near||l>n.far?null:{distance:l,point:ni.clone(),object:e}}function ai(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Xr),e.getVertexPosition(c,Zr),e.getVertexPosition(l,Qr);let u=ii(e,t,n,r,Xr,Zr,Qr,ti);if(u){let e=new H;Zn.getBarycoord(ti,Xr,Zr,Qr,e),i&&(u.uv=Zn.getInterpolatedAttribute(i,s,c,l,e,new V)),a&&(u.uv1=Zn.getInterpolatedAttribute(a,s,c,l,e,new V)),o&&(u.normal=Zn.getInterpolatedAttribute(o,s,c,l,e,new H),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new H,materialIndex:0};Zn.getNormal(Xr,Zr,Qr,t.normal),u.face=t,u.barycoord=e}return u}var oi=class extends Jt{constructor(e=null,t=1,n=1,r,i,o,s,c,l=a,u=a,d,f){super(null,o,s,c,l,u,r,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},si=class extends gr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ci=new U,li=new U,ui=[],di=new Qn,fi=new U,pi=new ri,mi=new Sr,hi=class extends ri{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new si(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,fi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ci),di.copy(e.boundingBox).applyMatrix4(ci),this.boundingBox.union(di)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ci),mi.copy(e.boundingSphere).applyMatrix4(ci),this.boundingSphere.union(mi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(pi.geometry=this.geometry,pi.material=this.material,pi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mi.copy(this.boundingSphere),mi.applyMatrix4(n),e.ray.intersectsSphere(mi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ci),li.multiplyMatrices(n,ci),pi.matrixWorld=li,pi.raycast(e,ui);for(let e=0,n=ui.length;e<n;e++){let n=ui[e];n.instanceId=i,n.object=this,t.push(n)}ui.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new si(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new oi(new Float32Array(r*this.count),r,this.count,k,_));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},gi=new Sr,_i=new V(.5,.5),vi=new H,yi=class{constructor(e=new Lr,t=new Lr,n=new Lr,r=new Lr,i=new Lr,a=new Lr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ke,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(e){return gi.center.set(0,0,0),gi.radius=.7071067811865476+_i.distanceTo(e.center),gi.applyMatrix4(e.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(vi.x=r.normal.x>0?e.max.x:e.min.x,vi.y=r.normal.y>0?e.max.y:e.min.y,vi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(vi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},bi=class extends zr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new W(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},xi=new H,Si=new H,Ci=new U,wi=new Wr,Ti=new Sr,Ei=new H,Di=new H,Oi=class extends Dn{constructor(e=new Ar,t=new bi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)xi.fromBufferAttribute(t,e-1),Si.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=xi.distanceTo(Si);e.setAttribute(`lineDistance`,new G(n,1))}else R(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ti.copy(n.boundingSphere),Ti.applyMatrix4(r),Ti.radius+=i,e.ray.intersectsSphere(Ti)===!1)return;Ci.copy(r).invert(),wi.copy(e.ray).applyMatrix4(Ci);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=ki(this,e,wi,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=ki(this,e,wi,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=ki(this,e,wi,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=ki(this,e,wi,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ki(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(xi.fromBufferAttribute(s,i),Si.fromBufferAttribute(s,a),n.distanceSqToSegment(xi,Si,Ei,Di)>r)return;Ei.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Ei);if(!(c<t.near||c>t.far))return{distance:c,point:Di.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Ai=new H,ji=new H,Mi=class extends Oi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Ai.fromBufferAttribute(t,e),ji.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Ai.distanceTo(ji);e.setAttribute(`lineDistance`,new G(n,1))}else R(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Ni=class extends Jt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Pi=class extends Jt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Fi=class extends Jt{constructor(e,t,n=g,r,i,o,s=a,c=a,l,u=D,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,i,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ii=class extends Fi{constructor(e,t=g,n=301,r,i,o=a,s=a,c,l=D){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,i,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Li=class extends Jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},K=class e extends Ar{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new G(c,3)),this.setAttribute(`normal`,new G(l,3)),this.setAttribute(`uv`,new G(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new H;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ri=class e extends Ar{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new H,g=new H;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new G(o,3)),this.setAttribute(`normal`,new G(s,3)),this.setAttribute(`uv`,new G(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},zi=class e extends Ar{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new H,l=new V;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new G(a,3)),this.setAttribute(`normal`,new G(o,3)),this.setAttribute(`uv`,new G(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},q=class e extends Ar{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new G(u,3)),this.setAttribute(`normal`,new G(d,3)),this.setAttribute(`uv`,new G(f,2));function _(){let a=new H,_=new H,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new V,m=new H,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bi=class e extends q{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vi=class e extends Ar{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new G(i,3)),this.setAttribute(`normal`,new G(i.slice(),3)),this.setAttribute(`uv`,new G(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new H,r=new H,i=new H;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new H;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new H;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new H,t=new H,n=new H,r=new H,o=new V,s=new V,c=new V;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Hi=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){R(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new V:new H);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new H,r=[],i=[],a=[],o=new H,s=new U;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new H)}i[0]=new H,a[0]=new H;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(B(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(B(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ui=class extends Hi{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new V){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Wi=class extends Ui{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Gi(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Ki=new H,qi=new H,Ji=new Gi,Yi=new Gi,Xi=new Gi,Zi=class extends Hi{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new H){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(qi.subVectors(r[0],r[1]).add(r[0]),c=qi);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Ki.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Ki),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Ji.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Yi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Xi.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Ji.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Yi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Xi.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Ji.calc(s),Yi.calc(s),Xi.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Qi(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function $i(e,t){let n=1-e;return n*n*t}function ea(e,t){return 2*(1-e)*e*t}function ta(e,t){return e*e*t}function na(e,t,n,r){return $i(e,t)+ea(e,n)+ta(e,r)}function ra(e,t){let n=1-e;return n*n*n*t}function ia(e,t){let n=1-e;return 3*n*n*e*t}function aa(e,t){return 3*(1-e)*e*e*t}function oa(e,t){return e*e*e*t}function sa(e,t,n,r,i){return ra(e,t)+ia(e,n)+aa(e,r)+oa(e,i)}var ca=class extends Hi{constructor(e=new V,t=new V,n=new V,r=new V){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new V){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(sa(e,r.x,i.x,a.x,o.x),sa(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},la=class extends Hi{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(sa(e,r.x,i.x,a.x,o.x),sa(e,r.y,i.y,a.y,o.y),sa(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ua=class extends Hi{constructor(e=new V,t=new V){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new V){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new V){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},da=class extends Hi{constructor(e=new H,t=new H){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fa=class extends Hi{constructor(e=new V,t=new V,n=new V){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new V){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(na(e,r.x,i.x,a.x),na(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pa=class extends Hi{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(na(e,r.x,i.x,a.x),na(e,r.y,i.y,a.y),na(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ma=class extends Hi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new V){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Qi(o,s.x,c.x,l.x,u.x),Qi(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new V().fromArray(n))}return this}},ha=Object.freeze({__proto__:null,ArcCurve:Wi,CatmullRomCurve3:Zi,CubicBezierCurve:ca,CubicBezierCurve3:la,EllipseCurve:Ui,LineCurve:ua,LineCurve3:da,QuadraticBezierCurve:fa,QuadraticBezierCurve3:pa,SplineCurve:ma}),ga=class extends Hi{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new ha[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new ha[n.type]().fromJSON(n))}return this}},_a=class extends ga{constructor(e){super(),this.type=`Path`,this.currentPoint=new V,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ua(this.currentPoint.clone(),new V(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new fa(this.currentPoint.clone(),new V(e,t),new V(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new ca(this.currentPoint.clone(),new V(e,t),new V(n,r),new V(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new ma([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Ui(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},va=class extends _a{constructor(e){super(e),this.uuid=ct(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new _a().fromJSON(n))}return this}};function ya(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=ba(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Da(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Sa(a,o,n,s,c,l,0),o}function ba(e,t,n,r,i){let a;if(i===Za(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Ja(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Ja(i/r|0,e[i],e[i+1],a);return a&&Ba(a,a.next)&&(Ya(a),a=a.next),a}function xa(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ba(n,n.next)||za(n.prev,n,n.next)===0)){if(Ya(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Sa(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Ma(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?wa(e,r,i,a):Ca(e))t.push(c.i,e.i,l.i),Ya(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=Ta(xa(e),t),Sa(e,t,n,r,i,a,2)):o===2&&Ea(e,t,n,r,i,a):Sa(xa(e),t,n,r,i,a,1);break}}}function Ca(e){let t=e.prev,n=e,r=e.next;if(za(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&La(i,s,a,c,o,l,m.x,m.y)&&za(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function wa(e,t,n,r){let i=e.prev,a=e,o=e.next;if(za(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Pa(p,m,t,n,r),v=Pa(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&La(s,u,c,d,l,f,y.x,y.y)&&za(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&La(s,u,c,d,l,f,b.x,b.y)&&za(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&La(s,u,c,d,l,f,y.x,y.y)&&za(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&La(s,u,c,d,l,f,b.x,b.y)&&za(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Ta(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ba(r,i)&&Va(r,n,n.next,i)&&Ga(r,i)&&Ga(i,r)&&(t.push(r.i,n.i,i.i),Ya(n),Ya(n.next),n=e=i),n=n.next}while(n!==e);return xa(n)}function Ea(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Ra(o,e)){let s=qa(o,e);o=xa(o,o.next),s=xa(s,s.next),Sa(o,t,n,r,i,a,0),Sa(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Da(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=ba(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Fa(o))}i.sort(Oa);for(let e=0;e<i.length;e++)n=ka(i[e],n);return n}function Oa(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function ka(e,t){let n=Aa(e,t);if(!n)return t;let r=qa(n,e);return xa(r,r.next),xa(n,n.next)}function Aa(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ba(e,n))return n;do{if(Ba(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Ia(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Ga(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&ja(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function ja(e,t){return za(e.prev,e,t.prev)<0&&za(t.next,e,e.next)<0}function Ma(e,t,n,r){let i=e;do i.z===0&&(i.z=Pa(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Na(i)}function Na(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Pa(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Fa(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Ia(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function La(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Ia(e,t,n,r,i,a,o,s)}function Ra(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Wa(e,t)&&(Ga(e,t)&&Ga(t,e)&&Ka(e,t)&&(za(e.prev,e,t.prev)||za(e,t.prev,t))||Ba(e,t)&&za(e.prev,e,e.next)>0&&za(t.prev,t,t.next)>0)}function za(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ba(e,t){return e.x===t.x&&e.y===t.y}function Va(e,t,n,r){let i=Ua(za(e,t,n)),a=Ua(za(e,t,r)),o=Ua(za(n,r,e)),s=Ua(za(n,r,t));return!!(i!==a&&o!==s||i===0&&Ha(e,n,t)||a===0&&Ha(e,r,t)||o===0&&Ha(n,e,r)||s===0&&Ha(n,t,r))}function Ha(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ua(e){return e>0?1:e<0?-1:0}function Wa(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Va(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Ga(e,t){return za(e.prev,e,e.next)<0?za(e,t,e.next)>=0&&za(e,e.prev,t)>=0:za(e,t,e.prev)<0||za(e,e.next,t)<0}function Ka(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function qa(e,t){let n=Xa(e.i,e.x,e.y),r=Xa(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Ja(e,t,n,r){let i=Xa(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Ya(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Xa(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Za(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Qa=class{static triangulate(e,t,n=2){return ya(e,t,n)}},$a=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];eo(e),to(n,e);let a=e.length;t.forEach(eo);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,to(n,t[e]);let o=Qa.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function eo(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function to(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var no=class e extends Ar{constructor(e=new va([new V(.5,.5),new V(-.5,.5),new V(-.5,-.5),new V(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new G(r,3)),this.setAttribute(`uv`,new G(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?ro:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new H,b=new H,x=new H}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!$a.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];$a.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||z(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new V(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new V(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let ee=[],te,M=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];te=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),te[e]=A(t[e],t[r],t[i]);ee.push(te),M=M.concat(te)}let ne;if(p===0)ne=$a.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);se(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];te=ee[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],te[e],a);se(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}ne=$a.triangulateShape(e,t)}let N=ne.length,re=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],M[e],re):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),se(x.x,x.y,x.z)):se(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],M[t],re):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),se(x.x,x.y,x.z)):se(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);se(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];te=ee[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],te[e],r);_?se(i.x,i.y+g[s-1].y,g[s-1].x+n):se(i.x,i.y,c+n)}}}ie(),ae();function ie(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<N;e++){let n=ne[e];ce(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<N;e++){let n=ne[e];ce(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<N;e++){let t=ne[e];ce(t[2],t[1],t[0])}for(let e=0;e<N;e++){let t=ne[e];ce(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ae(){let e=r.length/3,t=0;oe(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];oe(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function oe(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);le(t+r+n,t+i+n,t+i+a,t+r+a)}}}function se(e,t,n){a.push(e),a.push(t),a.push(n)}function ce(e,t,i){P(e),P(t),P(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);ue(o[0]),ue(o[1]),ue(o[2])}function le(e,t,i,a){P(e),P(t),P(a),P(t),P(i),P(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);ue(s[0]),ue(s[1]),ue(s[3]),ue(s[1]),ue(s[2]),ue(s[3])}function P(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function ue(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return io(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ha[i.type]().fromJSON(i)),new e(r,t.options)}},ro={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new V(a,o),new V(s,c),new V(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new V(o,1-c),new V(l,1-d),new V(f,1-m),new V(h,1-_)]:[new V(s,1-c),new V(u,1-d),new V(p,1-m),new V(g,1-_)]}};function io(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var ao=class e extends Vi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},oo=class e extends Ar{constructor(e=[new V(0,-.5),new V(.5,0),new V(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=B(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new H,d=new V,f=new H,p=new H,m=new H,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new G(a,3)),this.setAttribute(`uv`,new G(o,2)),this.setAttribute(`normal`,new G(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},so=class e extends Ar{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new G(p,3)),this.setAttribute(`normal`,new G(m,3)),this.setAttribute(`uv`,new G(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},co=class e extends Ar{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new H,p=new V;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new G(s,3)),this.setAttribute(`normal`,new G(c,3)),this.setAttribute(`uv`,new G(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},lo=class e extends Ar{constructor(e=new va([new V(0,.5),new V(-.5,-.5),new V(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new G(r,3)),this.setAttribute(`normal`,new G(i,3)),this.setAttribute(`uv`,new G(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;$a.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];$a.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=$a.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return uo(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function uo(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var fo=class e extends Ar{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new H,d=new H,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new G(p,3)),this.setAttribute(`normal`,new G(m,3)),this.setAttribute(`uv`,new G(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},po=class e extends Ar{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new H,f=new H,p=new H;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new G(c,3)),this.setAttribute(`normal`,new G(l,3)),this.setAttribute(`uv`,new G(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},mo=class e extends Ar{constructor(e=new pa(new H(-1,-1,0),new H(-1,1,0),new H(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new H,s=new H,c=new V,l=new H,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new G(u,3)),this.setAttribute(`normal`,new G(d,3)),this.setAttribute(`uv`,new G(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new ha[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},ho=class extends Ar{constructor(e=null){if(super(),this.type=`WireframeGeometry`,this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new H,i=new H;if(e.index!==null){let a=e.attributes.position,o=e.index,s=e.groups;s.length===0&&(s=[{start:0,count:o.count,materialIndex:0}]);for(let e=0,c=s.length;e<c;++e){let c=s[e],l=c.start,u=c.count;for(let e=l,s=l+u;e<s;e+=3)for(let s=0;s<3;s++){let c=o.getX(e+s),l=o.getX(e+(s+1)%3);r.fromBufferAttribute(a,c),i.fromBufferAttribute(a,l),go(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}}else{let a=e.attributes.position;for(let e=0,o=a.count/3;e<o;e++)for(let o=0;o<3;o++){let s=3*e+o,c=3*e+(o+1)%3;r.fromBufferAttribute(a,s),i.fromBufferAttribute(a,c),go(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}this.setAttribute(`position`,new G(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function go(e,t,n){let r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(r)===!0||n.has(i)===!0?!1:(n.add(r),n.add(i),!0)}function _o(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(yo(i))i.isRenderTargetTexture?(R(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(yo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function vo(e){let t={};for(let n=0;n<e.length;n++){let r=_o(e[n]);for(let e in r)t[e]=r[e]}return t}function yo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function bo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function xo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Rt.workingColorSpace}var So={clone:_o,merge:vo},Co=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,To=class extends zr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Co,this.fragmentShader=wo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_o(e.uniforms),this.uniformsGroups=bo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new W().setHex(r.value);break;case`v2`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Yt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Nt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new U().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Eo=class extends To{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Do=class extends zr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new W(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new V(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Oo=class extends zr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new V(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ko=class extends zr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=ze,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ao=class extends zr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function jo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Mo(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var No=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Po=class extends No{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Le,endingEnd:Le}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case L:i=e,o=2*t-n;break;case Re:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case L:a=e,s=2*n-t;break;case Re:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Fo=class extends No{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Io=class extends No{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Lo=class extends No{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Bo(n,t,g,y,r);i[p]=Ro(x,o,_,b,m)}return i}};function Ro(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function zo(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Bo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ro(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=zo(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Vo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=jo(t,this.TimeBufferType),this.values=jo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:jo(e.times,Array),values:jo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Mo(e.settings)&&(n.settings={inTangents:jo(e.settings.inTangents,Array),outTangents:jo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Lo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Pe:t=this.InterpolantFactoryMethodDiscrete;break;case Fe:t=this.InterpolantFactoryMethodLinear;break;case Ie:t=this.InterpolantFactoryMethodSmooth;break;case I:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return R(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Pe;case this.InterpolantFactoryMethodLinear:return Fe;case this.InterpolantFactoryMethodSmooth:return Ie;case this.InterpolantFactoryMethodBezier:return I}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Mo(this.settings)&&(Ho(this.settings.inTangents,e),Ho(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(z(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(z(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){z(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){z(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Je(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){z(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ie,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Mo(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ho(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Vo.prototype.ValueTypeName=``,Vo.prototype.TimeBufferType=Float32Array,Vo.prototype.ValueBufferType=Float32Array,Vo.prototype.DefaultInterpolation=Fe;var Uo=class extends Vo{constructor(e,t,n){super(e,t,n)}};Uo.prototype.ValueTypeName=`bool`,Uo.prototype.ValueBufferType=Array,Uo.prototype.DefaultInterpolation=Pe,Uo.prototype.InterpolantFactoryMethodLinear=void 0,Uo.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends Vo{constructor(e,t,n,r){super(e,t,n,r)}};Wo.prototype.ValueTypeName=`color`;var Go=class extends Vo{constructor(e,t,n,r){super(e,t,n,r)}};Go.prototype.ValueTypeName=`number`;var Ko=class extends No{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)At.slerpFlat(i,0,a,c-o,a,c,s);return i}},qo=class extends Vo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ko(this.times,this.values,this.getValueSize(),e)}};qo.prototype.ValueTypeName=`quaternion`,qo.prototype.InterpolantFactoryMethodSmooth=void 0;var Jo=class extends Vo{constructor(e,t,n){super(e,t,n)}};Jo.prototype.ValueTypeName=`string`,Jo.prototype.ValueBufferType=Array,Jo.prototype.DefaultInterpolation=Pe,Jo.prototype.InterpolantFactoryMethodLinear=void 0,Jo.prototype.InterpolantFactoryMethodSmooth=void 0;var Yo=class extends Vo{constructor(e,t,n,r){super(e,t,n,r)}};Yo.prototype.ValueTypeName=`vector`;var Xo=class extends Dn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new W(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Zo=class extends Xo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Qo=new U,$o=new H,es=new H,ts=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new V(512,512),this.mapType=d,this.map=null,this.mapPass=null,this.matrix=new U,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yi,this._frameExtents=new V(1,1),this._viewportCount=1,this._viewports=[new Yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;$o.setFromMatrixPosition(e.matrixWorld),t.position.copy($o),es.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(es),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Qo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Qo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Qo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ns=new H,rs=new At,is=new H,as=class extends Dn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new U,this.projectionMatrix=new U,this.projectionMatrixInverse=new U,this.coordinateSystem=Ke,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ns,rs,is),is.x===1&&is.y===1&&is.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ns,rs,is.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ns,rs,is),is.x===1&&is.y===1&&is.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ns,rs,is.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},os=new H,ss=new V,cs=new V,ls=class extends as{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=st*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ot*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return st*2*Math.atan(Math.tan(ot*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(os.x,os.y).multiplyScalar(-e/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(os.x,os.y).multiplyScalar(-e/os.z)}getViewSize(e,t){return this.getViewBounds(e,ss,cs),t.subVectors(cs,ss)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ot*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},us=class extends as{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ds=class extends ts{constructor(){super(new us(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},fs=class extends Xo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.shadow=new ds}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ps=class extends Ar{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},ms=-90,hs=1,gs=class extends Dn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ls(ms,hs,e,t);r.layers=this.layers,this.add(r);let i=new ls(ms,hs,e,t);i.layers=this.layers,this.add(i);let a=new ls(ms,hs,e,t);a.layers=this.layers,this.add(a);let o=new ls(ms,hs,e,t);o.layers=this.layers,this.add(o);let s=new ls(ms,hs,e,t);s.layers=this.layers,this.add(s);let c=new ls(ms,hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},_s=class extends ls{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},vs=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=ys.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function ys(){this._document.hidden===!1&&this.reset()}var bs=`\\[\\]\\.:\\/`,xs=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ss=`[^\\[\\]\\.:\\/]`,Cs=`[^`+bs.replace(`\\.`,``)+`]`,ws=`((?:WC+[\\/:])*)`.replace(`WC`,Ss),Ts=`(WCOD+)?`.replace(`WCOD`,Cs),Es=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ss),Ds=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ss),Os=RegExp(`^`+ws+Ts+Es+Ds+`$`),ks=[`material`,`materials`,`bones`,`map`],As=class{constructor(e,t,n){let r=n||js.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},js=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(xs,``)}static parseTrackName(e){let t=Os.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ks.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){R(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){z(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){z(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){z(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){z(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){z(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;z(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};js.Composite=As,js.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},js.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},js.prototype.GetterByBindingType=[js.prototype._getValue_direct,js.prototype._getValue_array,js.prototype._getValue_arrayElement,js.prototype._getValue_toArray],js.prototype.SetterByBindingTypeAndVersioning=[[js.prototype._setValue_direct,js.prototype._setValue_direct_setNeedsUpdate,js.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[js.prototype._setValue_array,js.prototype._setValue_array_setNeedsUpdate,js.prototype._setValue_array_setMatrixWorldNeedsUpdate],[js.prototype._setValue_arrayElement,js.prototype._setValue_arrayElement_setNeedsUpdate,js.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[js.prototype._setValue_fromArray,js.prototype._setValue_fromArray_setNeedsUpdate,js.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ms=class extends jr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},Ns=new U,Ps=class{constructor(e,t,n=0,r=1/0){this.ray=new Wr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new dn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):z(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Ns.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ns),this}intersectObject(e,t=!0,n=[]){return Is(e,this,n,t),n.sort(Fs),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Is(e[r],this,n,t);return n.sort(Fs),n}};function Fs(e,t){return e.distance-t.distance}function Is(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Is(r[e],t,n,!0)}}var Ls=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=B(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(B(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var Rs=new H,zs=new H,Bs=new H,Vs=new H,Hs=new H,Us=new H,Ws=new H,Gs=class{constructor(e=new H,t=new H){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Rs.subVectors(e,this.start),zs.subVectors(this.end,this.start);let n=zs.dot(zs);if(n===0)return 0;let r=zs.dot(Rs)/n;return t&&(r=B(r,0,1)),r}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=Us,n=Ws){let r=1e-8*1e-8,i,a,o=this.start,s=e.start,c=this.end,l=e.end;Bs.subVectors(c,o),Vs.subVectors(l,s),Hs.subVectors(o,s);let u=Bs.dot(Bs),d=Vs.dot(Vs),f=Vs.dot(Hs);if(u<=r&&d<=r)return t.copy(o),n.copy(s),t.sub(n),t.dot(t);if(u<=r)i=0,a=f/d,a=B(a,0,1);else{let e=Bs.dot(Hs);if(d<=r)a=0,i=B(-e/u,0,1);else{let t=Bs.dot(Vs),n=u*d-t*t;i=n===0?0:B((t*f-e*d)/n,0,1),a=(t*i+f)/d,a<0?(a=0,i=B(-e/u,0,1)):a>1&&(a=1,i=B((t-e)/u,0,1))}}return t.copy(o).addScaledVector(Bs,i),n.copy(s).addScaledVector(Vs,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},Ks=class extends rt{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function qs(e,t,n,r){let i=Js(r);switch(n){case w:return e*t;case k:return e*t/i.components*i.byteLength;case A:return e*t/i.components*i.byteLength;case j:return e*t*2/i.components*i.byteLength;case ee:return e*t*2/i.components*i.byteLength;case T:return e*t*3/i.components*i.byteLength;case E:return e*t*4/i.components*i.byteLength;case te:return e*t*4/i.components*i.byteLength;case M:case ne:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case N:case re:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ae:case se:return Math.max(e,16)*Math.max(t,8)/4;case ie:case oe:return Math.max(e,8)*Math.max(t,8)/2;case ce:case le:case ue:case de:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case P:case fe:case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ge:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case xe:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Te:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ee:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case De:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Oe:case ke:case Ae:return Math.ceil(e/4)*Math.ceil(t/4)*16;case je:case Me:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ne:case F:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Js(e){switch(e){case d:case f:return{byteLength:1,components:1};case m:case p:case v:return{byteLength:2,components:1};case y:case b:return{byteLength:2,components:4};case g:case h:case _:return{byteLength:4,components:1};case S:case C:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?R(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Ys(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Xs(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Zs={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
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
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},J={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new V(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new V(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},Qs={basic:{uniforms:vo([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.fog]),vertexShader:Zs.meshbasic_vert,fragmentShader:Zs.meshbasic_frag},lambert:{uniforms:vo([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:Zs.meshlambert_vert,fragmentShader:Zs.meshlambert_frag},phong:{uniforms:vo([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Zs.meshphong_vert,fragmentShader:Zs.meshphong_frag},standard:{uniforms:vo([J.common,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.roughnessmap,J.metalnessmap,J.fog,J.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zs.meshphysical_vert,fragmentShader:Zs.meshphysical_frag},toon:{uniforms:vo([J.common,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.gradientmap,J.fog,J.lights,{emissive:{value:new W(0)}}]),vertexShader:Zs.meshtoon_vert,fragmentShader:Zs.meshtoon_frag},matcap:{uniforms:vo([J.common,J.bumpmap,J.normalmap,J.displacementmap,J.fog,{matcap:{value:null}}]),vertexShader:Zs.meshmatcap_vert,fragmentShader:Zs.meshmatcap_frag},points:{uniforms:vo([J.points,J.fog]),vertexShader:Zs.points_vert,fragmentShader:Zs.points_frag},dashed:{uniforms:vo([J.common,J.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zs.linedashed_vert,fragmentShader:Zs.linedashed_frag},depth:{uniforms:vo([J.common,J.displacementmap]),vertexShader:Zs.depth_vert,fragmentShader:Zs.depth_frag},normal:{uniforms:vo([J.common,J.bumpmap,J.normalmap,J.displacementmap,{opacity:{value:1}}]),vertexShader:Zs.meshnormal_vert,fragmentShader:Zs.meshnormal_frag},sprite:{uniforms:vo([J.sprite,J.fog]),vertexShader:Zs.sprite_vert,fragmentShader:Zs.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zs.background_vert,fragmentShader:Zs.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Zs.backgroundCube_vert,fragmentShader:Zs.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zs.cube_vert,fragmentShader:Zs.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zs.equirect_vert,fragmentShader:Zs.equirect_frag},distance:{uniforms:vo([J.common,J.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zs.distance_vert,fragmentShader:Zs.distance_frag},shadow:{uniforms:vo([J.lights,J.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:Zs.shadow_vert,fragmentShader:Zs.shadow_frag}};Qs.physical={uniforms:vo([Qs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new V(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new V},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new V},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Zs.meshphysical_vert,fragmentShader:Zs.meshphysical_frag};var $s={r:0,b:0,g:0},ec=new U,tc=new Nt;tc.set(-1,0,0,0,1,0,0,0,1);function nc(e,t,n,r,i,a){let o=new W(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new ri(new K(1,1,1),new To({name:`BackgroundCubeMaterial`,uniforms:_o(Qs.backgroundCube.uniforms),vertexShader:Qs.backgroundCube.vertexShader,fragmentShader:Qs.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ec.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(tc),l.material.toneMapped=Rt.getTransfer(i.colorSpace)!==Ue,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new ri(new so(2,2),new To({name:`BackgroundMaterial`,uniforms:_o(Qs.background.uniforms),vertexShader:Qs.background.vertexShader,fragmentShader:Qs.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Rt.getTransfer(i.colorSpace)!==Ue,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB($s,xo(e)),n.buffers.color.setClear($s.r,$s.g,$s.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function rc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ic(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ac(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(R(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&R(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function oc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Lr,s=new Nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var sc=4,cc=6,lc=20,uc=256,dc=new us,fc=new W,pc=null,mc=0,hc=0,gc=!1,_c=new H,vc=new H,yc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=_c}=i;pc=this._renderer.getRenderTarget(),mc=this._renderer.getActiveCubeFace(),hc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(pc,mc,hc),this._renderer.xr.enabled=gc,e.scissorTest=!1,Sc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pc=this._renderer.getRenderTarget(),mc=this._renderer.getActiveCubeFace(),hc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:c,minFilter:c,generateMipmaps:!1,type:v,format:E,colorSpace:Ve,depthBuffer:!1},r=xc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=bc(r)),this._blurMaterial=wc(r,e,t),this._ggxMaterial=Cc(r,e,t)}return r}_compileMaterial(e){let t=new ri(new Ar,e);this._renderer.compile(t,dc)}_sceneToCubeUV(e,t,n,r,i){let a=new ls(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(fc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ri(new K,new Gr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(fc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Sc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Sc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,dc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-sc?n-d+sc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Sc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,dc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Sc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,dc)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Sc(t,3*l*(r>this._lodMax-sc?r-this._lodMax+sc:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,dc)}};function bc(e){let t=[],n=[],r=e,i=e-sc+1+cc;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?vc.set(1,r,n):e===1?vc.set(-n,1,-r):e===2?vc.set(-n,r,1):e===3?vc.set(-1,r,-n):e===4?vc.set(-n,-1,r):vc.set(n,r,-1),vc.toArray(l,(e*6+t)*3)}}let u=new Ar;u.setAttribute(`position`,new gr(c,3)),u.setAttribute(`outputDirection`,new gr(l,3)),n.push(new ri(u,null)),r>sc&&r--}return{lodMeshes:n,sizeLods:t}}function xc(e,t,n){let r=new Zt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Sc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Cc(e,t,n){return new To({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:uc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function wc(e,t,n){return new To({name:`SphericalGaussianBlur`,defines:{SAMPLES:lc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Dc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Tc(){return new To({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Dc(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ec(){return new To({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Dc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Oc=class extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ni(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new K(5,5,5),i=new To({name:`CubemapFromEquirect`,uniforms:_o(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new ri(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=c),new gs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function kc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Oc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new yc(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new yc(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ac(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&et(`WebGLRenderer: `+e+` extension not supported.`),t}}}function jc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?vr:_r)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Mc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Nc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:z(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Pc(e,t,n){let r=new WeakMap,i=new Yt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Qt(h,p,m,u);g.type=_,g.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new V(p,m)},r.set(o,d);function y(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Fc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ic={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Lc(e,t,n,r,i,a){let o=new Zt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ar;l.setAttribute(`position`,new G([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new G([0,2,0,0,2,0],2));let u=new Eo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ri(l,u),f=new us(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Zt(t,n,{type:v,depthBuffer:!1,stencilBuffer:!1}),c=new Zt(t,n,{type:v,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Rt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Ic[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Rc=new Jt,zc=new Fi(1,1),Bc=new Qt,Vc=new $t,Hc=new Ni,Uc=[],Wc=[],Gc=new Float32Array(16),Kc=new Float32Array(9),qc=new Float32Array(4);function Jc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Uc[i];if(a===void 0&&(a=new Float32Array(i),Uc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Yc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Xc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Zc(e,t){let n=Wc[t];n===void 0&&(n=new Int32Array(t),Wc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Qc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function $c(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yc(n,t))return;e.uniform2fv(this.addr,t),Xc(n,t)}}function el(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Yc(n,t))return;e.uniform3fv(this.addr,t),Xc(n,t)}}function tl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yc(n,t))return;e.uniform4fv(this.addr,t),Xc(n,t)}}function nl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Yc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Xc(n,t)}else{if(Yc(n,r))return;qc.set(r),e.uniformMatrix2fv(this.addr,!1,qc),Xc(n,r)}}function rl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Yc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Xc(n,t)}else{if(Yc(n,r))return;Kc.set(r),e.uniformMatrix3fv(this.addr,!1,Kc),Xc(n,r)}}function il(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Yc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Xc(n,t)}else{if(Yc(n,r))return;Gc.set(r),e.uniformMatrix4fv(this.addr,!1,Gc),Xc(n,r)}}function al(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ol(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yc(n,t))return;e.uniform2iv(this.addr,t),Xc(n,t)}}function sl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Yc(n,t))return;e.uniform3iv(this.addr,t),Xc(n,t)}}function cl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yc(n,t))return;e.uniform4iv(this.addr,t),Xc(n,t)}}function ll(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ul(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Yc(n,t))return;e.uniform2uiv(this.addr,t),Xc(n,t)}}function dl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Yc(n,t))return;e.uniform3uiv(this.addr,t),Xc(n,t)}}function fl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Yc(n,t))return;e.uniform4uiv(this.addr,t),Xc(n,t)}}function pl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(zc.compareFunction=n.isReversedDepthBuffer()?518:515,a=zc):a=Rc,n.setTexture2D(t||a,i)}function ml(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Vc,i)}function hl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Hc,i)}function gl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Bc,i)}function _l(e){switch(e){case 5126:return Qc;case 35664:return $c;case 35665:return el;case 35666:return tl;case 35674:return nl;case 35675:return rl;case 35676:return il;case 5124:case 35670:return al;case 35667:case 35671:return ol;case 35668:case 35672:return sl;case 35669:case 35673:return cl;case 5125:return ll;case 36294:return ul;case 36295:return dl;case 36296:return fl;case 35678:case 36198:case 36298:case 36306:case 35682:return pl;case 35679:case 36299:case 36307:return ml;case 35680:case 36300:case 36308:case 36293:return hl;case 36289:case 36303:case 36311:case 36292:return gl}}function vl(e,t){e.uniform1fv(this.addr,t)}function yl(e,t){let n=Jc(t,this.size,2);e.uniform2fv(this.addr,n)}function bl(e,t){let n=Jc(t,this.size,3);e.uniform3fv(this.addr,n)}function xl(e,t){let n=Jc(t,this.size,4);e.uniform4fv(this.addr,n)}function Sl(e,t){let n=Jc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Cl(e,t){let n=Jc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function wl(e,t){let n=Jc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Tl(e,t){e.uniform1iv(this.addr,t)}function El(e,t){e.uniform2iv(this.addr,t)}function Dl(e,t){e.uniform3iv(this.addr,t)}function Ol(e,t){e.uniform4iv(this.addr,t)}function kl(e,t){e.uniform1uiv(this.addr,t)}function Al(e,t){e.uniform2uiv(this.addr,t)}function jl(e,t){e.uniform3uiv(this.addr,t)}function Ml(e,t){e.uniform4uiv(this.addr,t)}function Nl(e,t,n){let r=this.cache,i=t.length,a=Zc(n,i);Yc(r,a)||(e.uniform1iv(this.addr,a),Xc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?zc:Rc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Pl(e,t,n){let r=this.cache,i=t.length,a=Zc(n,i);Yc(r,a)||(e.uniform1iv(this.addr,a),Xc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Vc,a[e])}function Fl(e,t,n){let r=this.cache,i=t.length,a=Zc(n,i);Yc(r,a)||(e.uniform1iv(this.addr,a),Xc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Hc,a[e])}function Il(e,t,n){let r=this.cache,i=t.length,a=Zc(n,i);Yc(r,a)||(e.uniform1iv(this.addr,a),Xc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Bc,a[e])}function Ll(e){switch(e){case 5126:return vl;case 35664:return yl;case 35665:return bl;case 35666:return xl;case 35674:return Sl;case 35675:return Cl;case 35676:return wl;case 5124:case 35670:return Tl;case 35667:case 35671:return El;case 35668:case 35672:return Dl;case 35669:case 35673:return Ol;case 5125:return kl;case 36294:return Al;case 36295:return jl;case 36296:return Ml;case 35678:case 36198:case 36298:case 36306:case 35682:return Nl;case 35679:case 36299:case 36307:return Pl;case 35680:case 36300:case 36308:case 36293:return Fl;case 36289:case 36303:case 36311:case 36292:return Il}}var Rl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_l(t.type)}},zl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ll(t.type)}},Bl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Vl=/(\w+)(\])?(\[|\.)?/g;function Hl(e,t){e.seq.push(t),e.map[t.id]=t}function Ul(e,t,n){let r=e.name,i=r.length;for(Vl.lastIndex=0;;){let a=Vl.exec(r),o=Vl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Hl(n,l===void 0?new Rl(s,e,t):new zl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Bl(s),Hl(n,e)),n=e}}}var Wl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ul(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Gl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Kl=37297,ql=0;function Jl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Yl=new Nt;function Xl(e){Rt._getMatrix(Yl,Rt.workingColorSpace,e);let t=`mat3( ${Yl.elements.map(e=>e.toFixed(4))} )`;switch(Rt.getTransfer(e)){case He:return[t,`LinearTransferOETF`];case Ue:return[t,`sRGBTransferOETF`];default:return R(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Zl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Jl(e.getShaderSource(t),r)}return i}function Ql(e,t){let n=Xl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var $l={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function eu(e,t){let n=$l[t];return n===void 0?(R(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var tu=new H;function nu(){return Rt.getLuminanceCoefficients(tu),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${tu.x.toFixed(4)}, ${tu.y.toFixed(4)}, ${tu.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function ru(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ou).join(`
`)}function iu(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function au(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ou(e){return e!==``}function su(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function cu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var lu=/^[ \t]*#include +<([\w\d./]+)>/gm;function uu(e){return e.replace(lu,fu)}var du=new Map;function fu(e,t){let n=Zs[t];if(n===void 0){let e=du.get(t);if(e!==void 0)n=Zs[e],R(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return uu(n)}var pu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mu(e){return e.replace(pu,hu)}function hu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function gu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var _u={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function vu(e){return _u[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var yu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function bu(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:yu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var xu={302:`ENVMAP_MODE_REFRACTION`};function Su(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:xu[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Cu={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function wu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Cu[e.combine]||`ENVMAP_BLENDING_NONE`}function Tu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Eu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=vu(n),l=bu(n),u=Su(n),d=wu(n),f=Tu(n),p=ru(n),m=iu(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ou).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ou).join(`
`),_.length>0&&(_+=`
`)):(g=[gu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ou).join(`
`),_=[gu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Zs.tonemapping_pars_fragment,n.toneMapping===0?``:eu(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Zs.colorspace_pars_fragment,Ql(`linearToOutputTexel`,n.outputColorSpace),nu(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ou).join(`
`)),o=uu(o),o=su(o,n),o=cu(o,n),s=uu(s),s=su(s,n),s=cu(s,n),o=mu(o),s=mu(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Gl(i,i.VERTEX_SHADER,y),S=Gl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Zl(i,x,`vertex`),n=Zl(i,S,`fragment`);z(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):R(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Wl(i,h),T=au(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Kl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ql++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Du=0,Ou=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ku(e),t.set(e,n)),n}},ku=class{constructor(e){this.id=Du++,this.code=e,this.usedTimes=0}};function Au(e){return e===1030||e===37490||e===36285}function ju(e,t,n,r,i,a){let o=new dn,s=new Ou,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&R(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Qs[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),te=h.isInstancedMesh===!0,M=h.isBatchedMesh===!0,ne=!!i.map,N=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,P=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.dispersion>0,me=i.retroreflectivity>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=de&&!!i.anisotropyMap,ye=fe&&!!i.clearcoatMap,be=fe&&!!i.clearcoatNormalMap,xe=fe&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,we=ge&&!!i.sheenColorMap,Te=ge&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,De=!!i.specularColorMap,Oe=!!i.specularIntensityMap,ke=_e&&!!i.transmissionMap,Ae=_e&&!!i.thicknessMap,je=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,F=!!i.alphaHash,Pe=!!i.extensions,Fe=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Fe=e.toneMapping);let Ie={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:M,batchingColor:M&&h._colorsTexture!==null,instancing:te,instancingColor:te&&h.instanceColor!==null,instancingMorph:te&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Rt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ne,matcap:N,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&Au(i.normalMap.format),metalnessMap:P,roughnessMap:ue,anisotropy:de,anisotropyMap:ve,clearcoat:fe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:pe,retroreflection:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:_e,transmissionMap:ke,thicknessMap:Ae,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:F,combine:i.combine,mapUv:ne&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:P&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:De&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:ke&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:Me&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||de),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ne||Me),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Fe,decodeVideoTexture:ne&&i.map.isVideoTexture===!0&&Rt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Pe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Pe&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Qs[t];n=So.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Eu(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Mu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Nu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Pu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Fu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Nu),r.length>1&&r.sort(t||Pu),i.length>1&&i.sort(t||Pu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Iu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Fu,e.set(t,[i])):n>=r.length?(i=new Fu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Lu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new H,color:new W};break;case`SpotLight`:n={position:new H,direction:new H,color:new W,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new H,color:new W,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new H,skyColor:new W,groundColor:new W};break;case`RectAreaLight`:n={color:new W,position:new H,halfWidth:new H,halfHeight:new H}}return e[t.id]=n,n}}}function Ru(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var zu=0;function Bu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Vu(e){let t=new Lu,n=Ru(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new H);let i=new H,a=new U,o=new U;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Bu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=J.LTC_FLOAT_1,r.rectAreaLTC2=J.LTC_FLOAT_2):(r.rectAreaLTC1=J.LTC_HALF_1,r.rectAreaLTC2=J.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=zu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Hu(e){let t=new Vu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Uu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Hu(e),t.set(n,[a])):r>=i.length?(a=new Hu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Wu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ku=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],qu=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Ju=new U,Yu=new H,Xu=new H;function Zu(e,t,n){let r=new yi,i=new V,o=new V,s=new Yt,l=new ko,u=new Ao,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new To({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new V},radius:{value:4}},vertexShader:Wu,fragmentShader:Gu}),h=m.clone();h.defines.HORIZONTAL_PASS=1;let y=new Ar;y.setAttribute(`position`,new gr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new ri(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(R(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=S!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){R(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;i.copy(p.mapSize);let y=p.getFrameExtents();i.multiply(y),o.copy(p.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(o.x=Math.floor(f/y.x),i.x=o.x*y.x,p.mapSize.x=o.x),i.y>f&&(o.y=Math.floor(f/y.y),i.y=o.y*y.y,p.mapSize.y=o.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||h===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){R(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Zt(i.x,i.y,{format:j,type:v,minFilter:c,magFilter:c,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new Fi(i.x,i.y,_),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=D,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=a,p.map.depthTexture.magFilter=a}else d.isPointLight?(p.map=new Oc(i.x),p.map.depthTexture=new Ii(i.x,g)):(p.map=new Zt(i.x,i.y),p.map.depthTexture=new Fi(i.x,i.y,g)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=D,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=c,p.map.depthTexture.magFilter=c):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=a,p.map.depthTexture.magFilter=a);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==i.x||p.map.height!==i.y)&&p.map.setSize(i.x,i.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Yu.setFromMatrixPosition(d.matrixWorld),e.position.copy(Yu),Xu.copy(e.position),Xu.add(Ku[t]),e.up.copy(qu[t]),e.lookAt(Xu),e.updateMatrixWorld(),n.makeTranslation(-Yu.x,-Yu.y,-Yu.z),Ju.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(Ju,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);s.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(s)}r=p.getFrustum(t),T(n,l,i,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let a=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null?n.mapPass=new Zt(i.x,i.y,{format:j,type:v}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,m,b,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Qu(e,t){function n(){let t=!1,n=new Yt,r=null,i=new Yt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?P(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=nt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?P(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,M=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),te=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(ne)[1]),te=M>=1);let N=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new Yt().fromArray(ie),se=new Yt().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),P(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),P(e.CULL_FACE),ge(0);function P(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ue(e.BLEND),g=!1);else if(g===!1&&(P(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:z(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:z(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:z(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:z(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):P(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?P(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?ue(e.CULL_FACE):(P(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function be(t){t!==k&&(te&&e.lineWidth(t),k=t)}function xe(t,n,r){t?(P(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?P(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+ee-1),N!==t&&(e.activeTexture(t),N=t)}function we(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+ee-1:N);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Te(){let t=re[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function F(){try{e.texImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Pe(){try{e.texImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Fe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ie(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function I(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Le(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function L(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Re(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:P,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:F,texImage3D:Pe,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:L,uniformBlockBinding:Re,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:I,viewport:Le,reset:ze}}function $u(e,t,d,f,p,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new V,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ye(`canvas`)}function T(e,t,n){let r=1,i=Fe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),R(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&R(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function k(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function A(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];R(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||R(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?He:Rt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function j(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,R(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),ne(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),re(t)}function ne(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&N(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function N(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function re(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let ie=0;function ae(){ie=0}function oe(){return ie}function se(e){ie=e}function ce(){let e=ie;return e>=p.maxTextures&&R(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),ie+=1,e}function le(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,n){let r=f.get(t);if(t.isVideoTexture&&F(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)R(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)R(`WebGLRenderer: Texture marked for update but image is incomplete`);else{be(r,t,n);return}}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function ue(t,n){let r=f.get(t);t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version?be(r,t,n):(t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null),d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n))}function de(t,n){let r=f.get(t);t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version?be(r,t,n):d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function fe(t,n){let r=f.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&r.__version!==t.version?xe(r,t,n):d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let pe={[n]:e.REPEAT,[r]:e.CLAMP_TO_EDGE,[i]:e.MIRRORED_REPEAT},me={[a]:e.NEAREST,[o]:e.NEAREST_MIPMAP_NEAREST,[s]:e.NEAREST_MIPMAP_LINEAR,[c]:e.LINEAR,[l]:e.LINEAR_MIPMAP_NEAREST,[u]:e.LINEAR_MIPMAP_LINEAR},he={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ge(n,r){if(r.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&R(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,pe[r.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,pe[r.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,pe[r.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,me[r.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,me[r.minFilter]),r.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,he[r.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||f.get(r).__currentAnisotropy){let i=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,i.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,p.getMaxAnisotropy())),f.get(r).__currentAnisotropy=r.anisotropy}}}function _e(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,te));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=le(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ve(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ye(t,n,r,i){let a=t.updateRanges;if(a.length===0)d.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,i,n.data);else{a.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<a.length;e++){let t=a[o],r=a[e],i=t.start+t.count,s=ve(r.start,n.width,4),c=ve(t.start,n.width,4);r.start<=i+1&&s===c&&ve(r.start+r.count-1,n.width,4)===s?t.count=Math.max(t.count,r.start+r.count-t.start):(++o,a[o]=r)}a.length=o+1;let s=d.getParameter(e.UNPACK_ROW_LENGTH),c=d.getParameter(e.UNPACK_SKIP_PIXELS),l=d.getParameter(e.UNPACK_SKIP_ROWS);d.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,o=a.length;t<o;t++){let o=a[t],s=Math.floor(o.start/4),c=Math.ceil(o.count/4),l=s%n.width,u=Math.floor(s/n.width),f=c;d.pixelStorei(e.UNPACK_SKIP_PIXELS,l),d.pixelStorei(e.UNPACK_SKIP_ROWS,u),d.texSubImage2D(e.TEXTURE_2D,0,l,u,f,1,r,i,n.data)}t.clearUpdateRanges(),d.pixelStorei(e.UNPACK_ROW_LENGTH,s),d.pixelStorei(e.UNPACK_SKIP_PIXELS,c),d.pixelStorei(e.UNPACK_SKIP_ROWS,l)}}function be(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=_e(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){if(d.activeTexture(e.TEXTURE0+r),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let t=Rt.getPrimaries(Rt.workingColorSpace),r=n.colorSpace===``?null:Rt.getPrimaries(n.colorSpace),i=n.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment);let t=T(n.image,!1,p.maxTextureSize);t=Pe(n,t);let c=m.convert(n.format,n.colorSpace),l=m.convert(n.type),u=A(n.internalFormat,c,l,n.normalized,n.colorSpace,n.isVideoTexture);ge(i,n);let f,h=n.mipmaps,g=n.isVideoTexture!==!0,_=s.__version===void 0||a===!0,v=o.dataReady,y=ee(n,t);if(n.isDepthTexture)u=j(n.format===O,n.type),_&&(g?d.texStorage2D(e.TEXTURE_2D,1,u,t.width,t.height):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,null));else if(n.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data);n.generateMipmaps=!1}else g?(_&&d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height),v&&ye(n,t,c,l)):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,t.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){g&&_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,t.depth);for(let r=0,i=h.length;r<i;r++)if(f=h[r],n.format!==1023){if(c!==null){if(g){if(v){if(n.layerUpdates.size>0){let t=qs(f.width,f.height,n.format,n.type);for(let i of n.layerUpdates){let n=f.data.subarray(i*t/f.data.BYTES_PER_ELEMENT,(i+1)*t/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,i,f.width,f.height,1,c,n)}}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,f.data)}}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,f.data,0,0)}else R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,l,f.data):d.texImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,c,l,f.data);n.layerUpdates.size>0&&n.clearLayerUpdates()}else{g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],n.format===1023?g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data):c===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,f.data):d.compressedTexImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,f.data)}}else if(n.isDataArrayTexture){if(g){if(_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,t.width,t.height,t.depth),v){if(n.layerUpdates.size>0){let r=qs(t.width,t.height,n.format,n.type);for(let i of n.layerUpdates){let n=t.data.subarray(i*r/t.data.BYTES_PER_ELEMENT,(i+1)*r/t.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,t.width,t.height,1,c,l,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)}}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,u,t.width,t.height,t.depth,0,c,l,t.data)}else if(n.isData3DTexture)g?(_&&d.texStorage3D(e.TEXTURE_3D,y,u,t.width,t.height,t.depth),v&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)):d.texImage3D(e.TEXTURE_3D,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isFramebufferTexture){if(_){if(g)d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height);else{let n=t.width,r=t.height;for(let t=0;t<y;t++)d.texImage2D(e.TEXTURE_2D,t,u,n,r,0,c,l,null),n>>=1,r>>=1}}}else if(n.isHTMLTexture){if(`texElementImage2D`in e){let r=e.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),t.parentNode!==r){r.appendChild(t),b.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Fe(h[0]);d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height)}for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,c,l,f):d.texImage2D(e.TEXTURE_2D,t,u,c,l,f);n.generateMipmaps=!1}else if(g){if(_){let n=Fe(t);d.texStorage2D(e.TEXTURE_2D,y,u,n.width,n.height)}v&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,c,l,t)}else d.texImage2D(e.TEXTURE_2D,0,u,c,l,t);E(n)&&D(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function xe(t,n,r){if(n.image.length!==6)return;let i=_e(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=Rt.getPrimaries(Rt.workingColorSpace),s=n.colorSpace===``?null:Rt.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=T(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=Pe(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=A(n.internalFormat,g,_,n.normalized,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=ee(n,h);ge(e.TEXTURE_CUBE_MAP,n);let C;if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=Fe(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}E(n)&&D(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function Se(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=A(r.internalFormat,s,c,r.normalized,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),Ne(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,Me(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=j(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ne(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=A(a.internalFormat,o,s,a.normalized,a.colorSpace);Ne(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function we(t,n,r){let i=n.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let a=f.get(n.depthTexture);if(a.__renderTarget=n,(!a.__webglTexture||n.depthTexture.image.width!==n.width||n.depthTexture.image.height!==n.height)&&(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),i){if(a.__webglInit===void 0&&(a.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,te)),a.__webglTexture===void 0){a.__webglTexture=e.createTexture(),d.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),ge(e.TEXTURE_CUBE_MAP,n.depthTexture);let t=m.convert(n.depthTexture.format),r=m.convert(n.depthTexture.type),i;n.depthTexture.format===1026?i=e.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(i=e.DEPTH24_STENCIL8);for(let a=0;a<6;a++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,i,n.width,n.height,0,t,r,null)}}else P(n.depthTexture,0);let o=a.__webglTexture,s=Me(n),c=i?e.TEXTURE_CUBE_MAP_POSITIVE_X+r:e.TEXTURE_2D,l=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)Ne(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else if(n.depthTexture.format===1027)Ne(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Te(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(r)for(let e=0;e<6;e++)we(n.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?we(n.__webglFramebuffer[0],t,0):we(n.__webglFramebuffer,t,0)}}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),Ce(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),Ce(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}}d.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,r){let i=f.get(t);n!==void 0&&Se(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&Te(t)}function De(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,M);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Ne(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=A(i.internalFormat,o,s,i.normalized,i.colorSpace,t.isXRRenderTarget===!0),l=Me(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),Ce(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),ge(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)Se(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else Se(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);E(n)&&D(e.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i),s=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(s,o.__webglTexture),ge(s,i),Se(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,s,0),E(i)&&D(s)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),ge(a,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)Se(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else Se(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);E(n)&&D(a),d.unbindTexture()}t.depthBuffer&&Te(t)}function Oe(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(E(r)){let t=k(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),D(t),d.unbindTexture()}}}let ke=[],Ae=[];function je(t){if(t.samples>0){if(Ne(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer);let l=t.texture.mipmaps;l&&l.length>0?d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(ke.length=0,Ae.length=0,ke.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(ke.push(o),Ae.push(o),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ae)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ke))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Me(e){return Math.min(p.maxSamples,e.samples)}function Ne(e){let n=f.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function F(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Pe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Rt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&R(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):z(`WebGLTextures: Unsupported texture color space:`,n)),t}function Fe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ce,this.resetTextureUnits=ae,this.getTextureUnits=oe,this.setTextureUnits=se,this.setTexture2D=P,this.setTexture2DArray=ue,this.setTexture3D=de,this.setTextureCube=fe,this.rebindTextures=Ee,this.setupRenderTarget=De,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function ed(e,t){function n(n,r=``){let i,a=Rt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var td=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nd=`
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

}`,rd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Li(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new To({vertexShader:td,fragmentShader:nd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ri(new so(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},id=class extends rt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,f=null,p=null,m=null,h=typeof XRWebGLBinding<`u`,_=new rd,v={},y=t.getContextAttributes(),b=null,S=null,C=[],w=[],T=new V,k=null,A=null,j=new ls;j.viewport=new Yt;let ee=new ls;ee.viewport=new Yt;let te=[j,ee],M=new _s,ne=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new An,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new An,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new An,C[e]=t),t.getHandSpace()};function re(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ie(){r.removeEventListener(`select`,re),r.removeEventListener(`selectstart`,re),r.removeEventListener(`selectend`,re),r.removeEventListener(`squeeze`,re),r.removeEventListener(`squeezestart`,re),r.removeEventListener(`squeezeend`,re),r.removeEventListener(`end`,ie),r.removeEventListener(`inputsourceschange`,ae);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}ne=null,N=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),p=null,f=null,u=null,r=null,S=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(T.width,T.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,re),r.addEventListener(`selectstart`,re),r.addEventListener(`selectend`,re),r.addEventListener(`squeeze`,re),r.addEventListener(`squeezestart`,re),r.addEventListener(`squeezeend`,re),r.addEventListener(`end`,ie),r.addEventListener(`inputsourceschange`,ae),y.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?O:D,a=y.stencil?x:g);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),f=u.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Zt(f.textureWidth,f.textureHeight,{format:E,type:d,depthTexture:new Fi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Zt(p.framebufferWidth,p.framebufferHeight,{format:E,type:d,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ae(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let oe=new H,se=new H;function ce(e,t,n){oe.setFromMatrixPosition(t.matrixWorld),se.setFromMatrixPosition(n.matrixWorld);let r=oe.distanceTo(se),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function le(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),M.near=ee.near=j.near=t,M.far=ee.far=j.far=n,(ne!==M.near||N!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),ne=M.near,N=M.far),M.layers.mask=e.layers.mask|6,j.layers.mask=M.layers.mask&-5,ee.layers.mask=M.layers.mask&-3;let i=e.parent,a=M.cameras;le(M,i);for(let e=0;e<a.length;e++)le(a[e],i);a.length===2?ce(M,j,ee):M.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),P(e,M,i)};function P(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=st*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)},this.getCameraTexture=function(e){return v[e]};let ue=null;function de(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==M.cameras.length&&(M.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=u.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=te[n];o===void 0&&(o=new ls,o.layers.enable(n),o.viewport=new Yt,te[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(M.matrix.copy(o.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),i===!0&&M.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Li,v[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ue&&ue(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let fe=new Ys;fe.setAnimationLoop(de),this.setAnimationLoop=function(e){ue=e},this.dispose=function(){}}},ad=new U,od=new Nt;od.set(-1,0,0,0,1,0,0,0,1);function sd(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,xo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(ad.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(od),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function cd(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return z(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?R(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):R(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var ld=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ud=null;function dd(){return ud===null&&(ud=new oi(ld,16,16,j,v),ud.name=`DFG_LUT`,ud.minFilter=c,ud.magFilter=c,ud.wrapS=r,ud.wrapT=r,ud.generateMipmaps=!1,ud.needsUpdate=!0),ud}var fd=class{constructor(e={}){let{canvas:t=Xe(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1,outputBufferType:h=d}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);_=n.getContextAttributes().alpha}else _=a;let S=h,C=new Set([te,ee,A]),w=new Set([d,g,m,x,y,b]),T=new Uint32Array(4),E=new Int32Array(4),D=new H,O=null,k=null,j=[],M=[],ne=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,re=!1,ie=null,ae=null,oe=null,se=null;this._outputColorSpace=Be;let ce=0,le=0,P=null,ue=-1,de=null,fe=new Yt,pe=new Yt,me=null,he=new W(0),ge=0,_e=t.width,ve=t.height,ye=1,be=null,xe=null,Se=new Yt(0,0,_e,ve),Ce=new Yt(0,0,_e,ve),we=!1,Te=new yi,Ee=!1,De=!1,Oe=new U,ke=new H,Ae=new Yt,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Me=!1;function Ne(){return P===null?ye:1}let F=n;function Pe(e,n){return t.getContext(e,n)}let Fe,Ie,I,Le,L,Re,ze,Ve,He,Ue,We,Ge,qe,Je,Ye,Ze,$e,et,nt,rt,it,at,ot;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,B,!1),t.addEventListener(`webglcontextrestored`,lt,!1),t.addEventListener(`webglcontextcreationerror`,ut,!1),F===null){let t=`webgl2`;if(F=Pe(t,e),F===null)throw Pe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}st()}catch(e){throw t.removeEventListener(`webglcontextlost`,B,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),z(`WebGLRenderer: `+e.message),e}function st(){Fe=new Ac(F),Fe.init(),it=new ed(F,Fe),Ie=new ac(F,Fe,e,it),I=new Qu(F,Fe),Ie.reversedDepthBuffer&&p&&I.buffers.depth.setReversed(!0),ae=F.createFramebuffer(),oe=F.createFramebuffer(),se=F.createFramebuffer(),Le=new Nc(F),L=new Mu,Re=new $u(F,Fe,I,L,Ie,it,Le),ze=new kc(N),Ve=new Xs(F),at=new rc(F,Ve),He=new jc(F,Ve,Le,at),Ue=new Fc(F,He,Ve,at,Le),et=new Pc(F,Ie,Re),Ye=new oc(L),We=new ju(N,ze,Fe,Ie,at,Ye),Ge=new sd(N,L),qe=new Iu,Je=new Uu(Fe),$e=new nc(N,ze,I,Ue,_,s),Ze=new Zu(N,Ue,Ie),ot=new cd(F,Le,Ie,I),nt=new ic(F,Fe,Le),rt=new Mc(F,Fe,Le),Le.programs=We.programs,N.capabilities=Ie,N.extensions=Fe,N.properties=L,N.renderLists=qe,N.shadowMap=Ze,N.state=I,N.info=Le}S!==1009&&(ne=new Lc(S,t.width,t.height,o,r,i));let ct=new id(N,F);this.xr=ct,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(e){e!==void 0&&(ye=e,this.setSize(_e,ve,!1))},this.getSize=function(e){return e.set(_e,ve)},this.setSize=function(e,n,r=!0){ct.isPresenting?R(`WebGLRenderer: Can't change size while VR device is presenting.`):(_e=e,ve=n,t.width=Math.floor(e*ye),t.height=Math.floor(n*ye),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ne!==null&&ne.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(_e*ye,ve*ye).floor()},this.setDrawingBufferSize=function(e,n,r){_e=e,ve=n,ye=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009)z(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){R(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ne.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(fe)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),I.viewport(fe.copy(Se).multiplyScalar(ye).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),I.scissor(pe.copy(Ce).multiplyScalar(ye).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(e){I.setScissorTest(we=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor(...arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(P!==null){let t=P.texture.format;e=C.has(t)}if(e){let e=P.texture.type,t=w.has(e),n=$e.getClearColor(),r=$e.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,F.clearBufferuiv(F.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,F.clearBufferiv(F.COLOR,0,E))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ie=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,B,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),$e.dispose(),qe.dispose(),Je.dispose(),L.dispose(),ze.dispose(),Ue.dispose(),at.dispose(),ot.dispose(),We.dispose(),ct.dispose(),ct.removeEventListener(`sessionstart`,_t),ct.removeEventListener(`sessionend`,vt),yt.stop()};function B(e){e.preventDefault(),Qe(`WebGLRenderer: Context Lost.`),re=!0}function lt(){Qe(`WebGLRenderer: Context Restored.`),re=!1;let e=Le.autoReset,t=Ze.enabled,n=Ze.autoUpdate,r=Ze.needsUpdate,i=Ze.type;st(),Le.autoReset=e,Ze.enabled=t,Ze.autoUpdate=n,Ze.needsUpdate=r,Ze.type=i}function ut(e){z(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function dt(e){let t=e.target;t.removeEventListener(`dispose`,dt),ft(t)}function ft(e){pt(e),L.remove(e)}function pt(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){We.releaseProgram(e)}),e.isShaderMaterial&&We.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=je);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=kt(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=He.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;at.setup(i,r,s,n,c);let h,g=nt;if(c!==null&&(h=Ve.get(c),g=rt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*Ne()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*Ne()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(Fe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ve.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function mt(e,t,n,r){ie!==null&&e.isNodeMaterial&&ie.setObject(r,e),Ee===!0&&Ye.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Tt(e,t,r),e.side=0,e.needsUpdate=!0,Tt(e,t,r),e.side=2):Tt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),ie!==null&&ie.renderStart(e,t,n),k=Je.get(n),k.init(t),M.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),ie!==null&&ie.updateLights(k.state.lightsArray),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),Ee===!0&&Ye.setGlobalState(this.clippingPlanes,t),ie!==null&&Ze.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];mt(o,n,t,e),r.add(o)}else mt(i,n,t,e),r.add(i)}}),k=M.pop(),ie!==null&&ie.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=L.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Fe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ht=null;function gt(e){ht&&ht(e)}function _t(){yt.stop()}function vt(){yt.start()}let yt=new Ys;yt.setAnimationLoop(gt),typeof self<`u`&&yt.setContext(self),this.setAnimationLoop=function(e){ht=e,ct.setAnimationLoop(e),e===null?yt.stop():yt.start()},ct.addEventListener(`sessionstart`,_t),ct.addEventListener(`sessionend`,vt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){z(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(re===!0)return;ie!==null&&ie.renderStart(e,t);let n=ct.enabled===!0&&ct.isPresenting===!0,r=ne!==null&&(P===null||n)&&ne.begin(N,P);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ne===null||ne.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(t),t=ct.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,P),k=Je.get(e,M.length),k.init(t),k.state.textureUnits=Re.getTextureUnits(),M.push(k),Oe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Te.setFromProjectionMatrix(Oe,Ke,t.reversedDepth),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),O=qe.get(e,j.length),O.init(),j.push(O),ct.enabled===!0&&ct.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&bt(e,t,-1/0,N.sortObjects)}bt(e,t,0,N.sortObjects),O.finish(),ie!==null&&ie.updateLights(k.state.lightsArray),N.sortObjects===!0&&O.sort(be,xe),Me=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Me&&$e.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&Ye.beginShadows();let i=k.state.shadowsArray;if(Ze.render(i,e,t),Ee===!0&&Ye.endShadows(),(r&&ne.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];St(n,r,e,a)}Me&&$e.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];xt(O,e,n,n.viewport)}}else r.length>0&&St(n,r,e,t),Me&&$e.render(e),xt(O,e,t)}P!==null&&le===0&&(Re.updateMultisampleRenderTarget(P),Re.updateRenderTargetMipmap(P)),r&&ne.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),at.resetDefaultState(),ue=-1,de=null,M.pop(),M.length>0?(k=M[M.length-1],Re.setTextureUnits(k.state.textureUnits),Ee===!0&&Ye.setGlobalState(N.clippingPlanes,k.state.camera)):k=null,j.pop(),O=j.length>0?j[j.length-1]:null,ie!==null&&ie.renderEnd()};function bt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Te)){r&&Ae.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);let i=Ue.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Ae.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Te))){let i=Ue.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ae.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ae.copy(e.boundingSphere.center)),Ae.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Ae.z,s,t)}}else a.visible&&O.push(e,i,a,n,Ae.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)bt(i[e],t,n,r)}function xt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Ee===!0&&Ye.setGlobalState(N.clippingPlanes,n),r&&I.viewport(fe.copy(r)),i.length>0&&Ct(i,t,n),a.length>0&&Ct(a,t,n),o.length>0&&Ct(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function St(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Fe.has(`EXT_color_buffer_half_float`)||Fe.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Zt(1,1,{generateMipmaps:!0,type:e?v:d,minFilter:u,samples:Math.max(4,Ie.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Rt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||fe;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),c=N.getActiveCubeFace(),l=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(he),ge=N.getClearAlpha(),ge<1&&N.setClearColor(16777215,.5),N.clear(),Me&&$e.render(n);let f=N.toneMapping;N.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Ee===!0&&Ye.setGlobalState(N.clippingPlanes,r),Ct(e,n,r),Re.updateMultisampleRenderTarget(a),Re.updateRenderTargetMipmap(a),Fe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,wt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Re.updateMultisampleRenderTarget(a),Re.updateRenderTargetMipmap(a))}N.setRenderTarget(s,c,l),N.setClearColor(he,ge),p!==void 0&&(r.viewport=p),N.toneMapping=f}function Ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&wt(o,t,n,s,l,c)}}function wt(e,t,n,r,i,a){ie!==null&&i.isNodeMaterial&&ie.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function Tt(e,t,n){t.isScene!==!0&&(t=je);let r=L.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=We.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=We.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,dt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=We.getUniforms(e),ie!==null&&e.isNodeMaterial&&ie.build(e,n,s),e.onBeforeCompile(s,N),d=We.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),Dt(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Et(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Wl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ot(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function kt(e,t,n,r,i){t.isScene!==!0&&(t=je),Re.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=P===null?N.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Rt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),y=k.state.lights;if(Ee===!0&&(De===!0||e!==de)){let t=e===de&&r.id===ue;Ye.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Tt(r,t,i),ie&&r.isNodeMaterial&&ie.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(I.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ue&&(ue=r.id,C=!0),v.needsLights){let e=Ot(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||de!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(F,`projectionMatrix`,e.projectionMatrix),T.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(F,ke.setFromMatrixPosition(e.matrixWorld)),Ie.logarithmicDepthBuffer&&T.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),de!==e&&(de=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(F,`sunShadowMap`,y.state.sunShadowMap,Re),y.state.directionalShadowMap.length>0&&T.setValue(F,`directionalShadowMap`,y.state.directionalShadowMap,Re),y.state.spotShadowMap.length>0&&T.setValue(F,`spotShadowMap`,y.state.spotShadowMap,Re),y.state.pointShadowMap.length>0&&T.setValue(F,`pointShadowMap`,y.state.pointShadowMap,Re)),i.isSkinnedMesh){T.setOptional(F,i,`bindMatrix`),T.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(F,`boneTexture`,e.boneTexture,Re))}i.isBatchedMesh&&(T.setOptional(F,i,`batchingTexture`),T.setValue(F,`batchingTexture`,i._matricesTexture,Re),T.setOptional(F,i,`batchingIdTexture`),T.setValue(F,`batchingIdTexture`,i._indirectTexture,Re),T.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(F,`batchingColorTexture`,i._colorsTexture,Re));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&et.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=dd()),C){if(T.setValue(F,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&V(E,w),a&&r.fog===!0&&Ge.refreshFogUniforms(E,a),Ge.refreshMaterialUniforms(E,r,ye,ve,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}Wl.upload(F,Et(v),E,Re)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Wl.upload(F,Et(v),E,Re),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(F,`center`,i.center),T.setValue(F,`modelViewMatrix`,i.modelViewMatrix),T.setValue(F,`normalMatrix`,i.normalMatrix),T.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ot.update(n,x),ot.bind(n,x)}}return x}function V(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ce},this.getActiveMipmapLevel=function(){return le},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){P=e,ce=t,le=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest,I.viewport(fe),I.scissor(pe),I.setScissorTest(me),ue=-1;return}if(o.__webglFramebuffer===void 0)Re.setupRenderTarget(e);else if(o.__hasExternalTextures)Re.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Re.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Re.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest}else fe.copy(Se).multiplyScalar(ye).floor(),pe.copy(Ce).multiplyScalar(ye).floor(),me=we;if(n!==0&&(r=ae),I.bindFramebuffer(F.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(fe),I.scissor(pe),I.setScissorTest(me),i){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ue=-1};function jt(e){let t=L.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ie.textureFormatReadable(e.format),t.__typeReadable=Ie.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,it.convert(c),it.convert(l),a)}finally{let e=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,it.convert(l),it.convert(u),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let p=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,p);let m=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await tt(F,m,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(f),F.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Re.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=it.convert(t.format),_=it.convert(t.type),v;t.isData3DTexture?(Re.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Re.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(Re.setTexture2D(t,0),v=F.TEXTURE_2D),I.activeTexture(F.TEXTURE0),I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(F.UNPACK_ROW_LENGTH),b=I.getParameter(F.UNPACK_IMAGE_HEIGHT),x=I.getParameter(F.UNPACK_SKIP_PIXELS),S=I.getParameter(F.UNPACK_SKIP_ROWS),C=I.getParameter(F.UNPACK_SKIP_IMAGES);I.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(F.UNPACK_SKIP_PIXELS,l),I.pixelStorei(F.UNPACK_SKIP_ROWS,u),I.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,o,s,f,p,o,s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,oe),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,se);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,o,s,f,p,o,s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(F.UNPACK_ROW_LENGTH,y),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(F.UNPACK_SKIP_PIXELS,x),I.pixelStorei(F.UNPACK_SKIP_ROWS,S),I.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&Re.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Re.setTextureCube(e,0):e.isData3DTexture?Re.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Re.setTexture2DArray(e,0):Re.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){ce=0,le=0,P=null,I.reset(),at.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ke}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Rt._getUnpackColorSpace()}},pd={type:`change`},md={type:`start`},hd={type:`end`},gd=new Wr,_d=new Lr,vd=Math.cos(70*kt.DEG2RAD),yd=new H,bd=2*Math.PI,xd={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Sd=1e-6,Cd=class extends Ks{constructor(n,r=null){super(n,r),this.state=xd.NONE,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:e.ROTATE,MIDDLE:e.DOLLY,RIGHT:e.PAN},this.touches={ONE:t.ROTATE,TWO:t.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new H,this._lastQuaternion=new At,this._lastTargetPosition=new H,this._quat=new At().setFromUnitVectors(n.up,new H(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ls,this._sphericalDelta=new Ls,this._scale=1,this._panOffset=new H,this._rotateStart=new V,this._rotateEnd=new V,this._rotateDelta=new V,this._panStart=new V,this._panEnd=new V,this._panDelta=new V,this._dollyStart=new V,this._dollyEnd=new V,this._dollyDelta=new V,this._dollyDirection=new H,this._mouse=new V,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Td.bind(this),this._onPointerDown=wd.bind(this),this._onPointerUp=Ed.bind(this),this._onContextMenu=Nd.bind(this),this._onMouseWheel=kd.bind(this),this._onKeyDown=Ad.bind(this),this._onTouchStart=jd.bind(this),this._onTouchMove=Md.bind(this),this._onMouseDown=Dd.bind(this),this._onMouseMove=Od.bind(this),this._interceptControlDown=Pd.bind(this),this._interceptControlUp=Fd.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=xd.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pd),this.update(),this.state=xd.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;yd.copy(t).sub(this.target),yd.applyQuaternion(this._quat),this._spherical.setFromVector3(yd),this.autoRotate&&this.state===xd.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=bd:n>Math.PI&&(n-=bd),r<-Math.PI?r+=bd:r>Math.PI&&(r-=bd),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(yd.setFromSpherical(this._spherical),yd.applyQuaternion(this._quatInverse),t.copy(this.target).add(yd),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=yd.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new H(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new H(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=yd.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(gd.origin.copy(this.object.position),gd.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(gd.direction))<vd?this.object.lookAt(this.target):(_d.setFromNormalAndCoplanarPoint(this.object.up,this.target),gd.intersectPlane(_d,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Sd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Sd||this._lastTargetPosition.distanceToSquared(this.target)>Sd?(this.dispatchEvent(pd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?bd/60/60*this.autoRotateSpeed:bd/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){yd.setFromMatrixColumn(t,0),yd.multiplyScalar(-e),this._panOffset.add(yd)}_panUp(e,t){this.screenSpacePanning===!0?yd.setFromMatrixColumn(t,1):(yd.setFromMatrixColumn(t,0),yd.crossVectors(this.object.up,yd)),yd.multiplyScalar(e),this._panOffset.add(yd)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;yd.copy(r).sub(this.target);let i=yd.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bd*this._rotateDelta.x/t.clientHeight),this._rotateUp(bd*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(bd*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-bd*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(bd*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-bd*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bd*this._rotateDelta.x/t.clientHeight),this._rotateUp(bd*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new V,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function wd(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Td(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Ed(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(hd),this.state=xd.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function Dd(t){let n;switch(t.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case e.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=xd.DOLLY;break;case e.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=xd.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=xd.ROTATE}break;case e.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=xd.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=xd.PAN}break;default:this.state=xd.NONE}this.state!==xd.NONE&&this.dispatchEvent(md)}function Od(e){switch(this.state){case xd.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case xd.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case xd.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function kd(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===xd.NONE&&(e.preventDefault(),this.dispatchEvent(md),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(hd))}function Ad(e){this.enabled!==!1&&this._handleKeyDown(e)}function jd(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case t.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=xd.TOUCH_ROTATE;break;case t.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=xd.TOUCH_PAN;break;default:this.state=xd.NONE}break;case 2:switch(this.touches.TWO){case t.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=xd.TOUCH_DOLLY_PAN;break;case t.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=xd.TOUCH_DOLLY_ROTATE;break;default:this.state=xd.NONE}break;default:this.state=xd.NONE}this.state!==xd.NONE&&this.dispatchEvent(md)}function Md(e){switch(this._trackPointer(e),this.state){case xd.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case xd.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case xd.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case xd.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=xd.NONE}}function Nd(e){this.enabled!==!1&&e.preventDefault()}function Pd(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Fd(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var Id=new Lr,Ld=new Ps,Rd=new V,zd=new H,Bd=class extends Cd{constructor(n,r){super(n,r),this.screenSpacePanning=!1,this.mouseButtons={LEFT:e.PAN,MIDDLE:e.DOLLY,RIGHT:e.ROTATE},this.touches={ONE:t.PAN,TWO:t.DOLLY_ROTATE},this._panWorldStart=new H}_handleMouseDownPan(e){if(super._handleMouseDownPan(e),this._panOffset.set(0,0,0),this.screenSpacePanning===!0)return;Id.setFromNormalAndCoplanarPoint(this.object.up,this.target);let t=this.domElement.getBoundingClientRect();Rd.x=(e.clientX-t.left)/t.width*2-1,Rd.y=-((e.clientY-t.top)/t.height)*2+1,Ld.setFromCamera(Rd,this.object),Ld.ray.intersectPlane(Id,this._panWorldStart)}_handleMouseMovePan(e){if(this.screenSpacePanning===!0){super._handleMouseMovePan(e);return}let t=this.domElement.getBoundingClientRect();Rd.x=(e.clientX-t.left)/t.width*2-1,Rd.y=-((e.clientY-t.top)/t.height)*2+1,Ld.setFromCamera(Rd,this.object),Ld.ray.intersectPlane(Id,zd)&&(zd.sub(this._panWorldStart),this._panOffset.copy(zd).negate(),this.update())}},Vd=class extends Dn{constructor(e=document.createElement(`div`)){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position=`absolute`,this.element.style.userSelect=`none`,this.element.setAttribute(`draggable`,!1),this.center=new V(.5,.5),this.rotation2D=0,this.addEventListener(`removed`,function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this.rotation2D=e.rotation2D,this}},Hd=new H,Ud=new U,Wd=new U,Gd=new H,Kd=new H,qd=class{constructor(e={}){let t=this,n,r,i,a,o={objects:new WeakMap},s=e.element===void 0?document.createElement(`div`):e.element;s.style.overflow=`hidden`,this.domElement=s,this.sortObjects=!0,this.getSize=function(){return{width:n,height:r}},this.render=function(e,t){e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ud.copy(t.matrixWorldInverse),Wd.multiplyMatrices(t.projectionMatrix,Ud),l(e,e,t),this.sortObjects&&f(e)},this.setSize=function(e,t){n=e,r=t,i=n/2,a=r/2,s.style.width=e+`px`,s.style.height=t+`px`};function c(e){e.isCSS2DObject&&(e.element.style.display=`none`);for(let t=0,n=e.children.length;t<n;t++)c(e.children[t])}function l(e,n,r){if(e.visible===!1)c(e);else{if(e.isCSS2DObject){Hd.setFromMatrixPosition(e.matrixWorld),Hd.applyMatrix4(Wd);let c=Hd.z>=-1&&Hd.z<=1&&e.layers.test(r.layers)===!0,l=e.element;if(l.style.display=c===!0?``:`none`,c===!0){e.onBeforeRender(t,n,r);let o=100*e.center.x,c=100*e.center.y;l.style.transformOrigin=`${o}% ${c}%`;let u=-e.rotation2D,d=Hd.x*i+i,f=-Hd.y*a+a;l.style.transform=`translate(${-o}%, ${-c}%) translate(${d}px, ${f}px) rotate(${u}rad)`,l.parentNode!==s&&s.appendChild(l),e.onAfterRender(t,n,r)}let d={distanceToCameraSquared:u(r,e)};o.objects.set(e,d)}for(let t=0,i=e.children.length;t<i;t++)l(e.children[t],n,r)}}function u(e,t){return Gd.setFromMatrixPosition(e.matrixWorld),Kd.setFromMatrixPosition(t.matrixWorld),Gd.distanceToSquared(Kd)}function d(e){let t=[];return e.traverseVisible(function(e){e.isCSS2DObject&&t.push(e)}),t}function f(e){let t=d(e).sort(function(e,t){return e.renderOrder===t.renderOrder?o.objects.get(e).distanceToCameraSquared-o.objects.get(t).distanceToCameraSquared:t.renderOrder-e.renderOrder}),n=t.length;for(let e=0,r=t.length;e<r;e++)t[e].element.style.zIndex=n-e}}},Jd=[-.55,1.3,.5],Yd={DEFAULT:0,OCCLUDERS:1,ROUTES:2},Xd=new W,Zd=new W,Qd=new H(...Jd).normalize(),$d={day:{sky:`#e3edf2`,hemiSky:`#f3f7ff`,hemiGround:`#8c9c70`,hemi:1.6,sun:`#fff0d9`,sunIntensity:2.3,shadow:.72,exposure:1.06},night:{sky:`#0d1a3e`,hemiSky:`#7c86cc`,hemiGround:`#5a4462`,hemi:1.75,sun:`#a9b9ff`,sunIntensity:.5,shadow:.5,exposure:1}},ef=class{constructor(e,{antialias:t=!0}={}){this.container=e,this.inset=0,this.insetBottom=0;let n=new fd({antialias:t,powerPreference:`high-performance`});n.setSize(e.clientWidth,e.clientHeight),n.outputColorSpace=Be,n.toneMapping=7,n.toneMappingExposure=$d.day.exposure,n.shadowMap.enabled=!0,n.shadowMap.type=1,n.shadowMap.autoUpdate=!1,n.info.autoReset=!1,e.appendChild(n.domElement),n.domElement.addEventListener(`webglcontextrestored`,()=>location.reload()),this.renderer=n;let r=new qd;r.setSize(e.clientWidth,e.clientHeight),r.domElement.className=`labels-layer`,e.appendChild(r.domElement),this.labels=r;let i=new Ln;i.background=new W($d.day.sky),i.fog=new In(new W($d.day.sky),600,2400),this.scene=i,this.camera=new ls(38,e.clientWidth/e.clientHeight,2,6e3),this.frustum=new yi,this.viewProjection=new U,this.hemi=new Zo,i.add(this.hemi);let a=new fs;a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.bias=-4e-4,a.shadow.normalBias=.6,a.shadow.radius=2.5,i.add(a,a.target),this.sun=a,this.night=-1,this.setNight(0);let o=new Bd(this.camera,n.domElement);o.enableDamping=!0,o.dampingFactor=.08,o.screenSpacePanning=!1,o.minDistance=30,o.maxDistance=5e3,o.maxPolarAngle=1.2,o.zoomToCursor=!0,this.controls=o,this.depthOnly=new Gr({colorWrite:!1,side:2}),this.lastCamera=new Float32Array(17),this.frameNo=0,this.shadowAt=null}setNight(e){if(e===this.night)return;this.night=e;let{day:t,night:n}=$d,r=(t,n)=>Xd.set(t).lerp(Zd.set(n),e);this.scene.background.copy(r(t.sky,n.sky)),this.scene.fog.color.copy(this.scene.background),this.hemi.color.copy(r(t.hemiSky,n.hemiSky)),this.hemi.groundColor.copy(r(t.hemiGround,n.hemiGround)),this.hemi.intensity=kt.lerp(t.hemi,n.hemi,e),this.sun.color.copy(r(t.sun,n.sun)),this.sun.intensity=kt.lerp(t.sunIntensity,n.sunIntensity,e),this.sun.shadow.intensity=kt.lerp(t.shadow,n.shadow,e),this.renderer.toneMappingExposure=kt.lerp(t.exposure,n.exposure,e)}addLayer(e){this.scene.add(e.object),e.occludesRoutes&&e.object.traverse(e=>{e.isMesh&&!e.material.transparent&&e.layers.enable(Yd.OCCLUDERS)})}setInset(e,t=0){this.inset=e,this.insetBottom=t,this.resize()}resize(){let e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.inset||this.insetBottom?this.camera.setViewOffset(e,t,-this.inset/2,(this.insetBottom??0)/2,e,t):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.labels.setSize(e,t)}beginFrame(){this.renderer.info.reset()}updateView(e){let{fog:t}=this.scene;t.near=e*.9+150,t.far=e*2.6+900;let n=this.camera,r=kt.clamp(e*.02,1,40),i=t.far*1.1;(Math.abs(n.near-r)>r*.05||Math.abs(n.far-i)>i*.05)&&(n.near=r,n.far=i,n.updateProjectionMatrix()),n.updateMatrixWorld(),this.frustum.setFromProjectionMatrix(this.viewProjection.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse))}get fovPx(){return this.renderer.domElement.clientHeight/(2*Math.tan(kt.degToRad(this.camera.fov/2)))}updateShadows(e,t){if(this.sun.castShadow){let n=kt.clamp(t*.62,60,480),r=60*1.25**Math.ceil(Math.log(n/60)/Math.log(1.25)),i=this.sun.shadow.camera,a=!this.shadowAt||this.shadowAt.distanceTo(e)>r*.12||i.right!==r;i.right!==r&&(i.left=-r,i.right=r,i.top=r,i.bottom=-r,i.near=1,i.far=1600,i.updateProjectionMatrix()),a&&((this.shadowAt??=new H).copy(e),this.sun.target.position.copy(e),this.sun.position.copy(e).addScaledVector(Qd,700)),(a||this.frameNo%12==0)&&(this.renderer.shadowMap.needsUpdate=!0)}this.frameNo++}pixelsPerMeter(e){return this.fovPx/Math.max(1,e)}render(){let{renderer:e,scene:t,camera:n}=this;e.render(t,n);let r=t.background;e.autoClear=!1,e.clearDepth(),t.background=null,n.layers.set(Yd.OCCLUDERS),t.overrideMaterial=this.depthOnly,e.render(t,n),t.overrideMaterial=null,n.layers.set(Yd.ROUTES),e.render(t,n),n.layers.set(Yd.DEFAULT),t.background=r,e.autoClear=!0}cameraMoved(){let e=this.camera.matrixWorld.elements,t=this.lastCamera,n=!1;for(let r=0;r<16;r++)Math.abs(e[r]-t[r])>1e-5&&(n=!0,t[r]=e[r]);return Math.abs(this.camera.aspect-t[16])>1e-6&&(n=!0,t[16]=this.camera.aspect),n}renderLabels(){this.labels.render(this.scene,this.camera)}},tf=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,nf=15e3,rf=class{constructor(e,{clear:t,heightAt:n}){this.camera=e.camera,this.controls=e.controls,this.clear=t,this.heightAt=n,this.tween=null,this.controls.addEventListener(`start`,()=>{this.tween=null}),this.home=this.homeView(),this.applyView(this.home)}setPark({clear:e,heightAt:t}){this.clear=e,this.heightAt=t,this.tween=null,this.home=this.homeView()}homeView(){let{clear:e}=this,t=new H(e.cx,0,e.cz+40),n=Math.max(...e.radii)*1.05/Math.tan(kt.degToRad(this.camera.fov/2))/Math.min(1,this.camera.aspect);return{target:t,distance:Math.min(this.controls.maxDistance,n*.78),polar:.62,azimuth:0}}applyView({target:e,distance:t,polar:n,azimuth:r}){let i=new H().setFromSphericalCoords(t,n,r);this.controls.target.copy(e),this.camera.position.copy(e).add(i),this.controls.update()}currentView(){let e=this.camera.position.clone().sub(this.controls.target),t=new Ls().setFromVector3(e);return{target:this.controls.target.clone(),distance:t.radius,polar:t.phi,azimuth:t.theta}}flyTo(e,t=1.4){let n=this.currentView(),r={...n,...e},i=Math.atan2(Math.sin(r.azimuth-n.azimuth),Math.cos(r.azimuth-n.azimuth));r.azimuth=n.azimuth+i,this.tween={from:n,to:r,t:0,duration:t}}focusPoint(e,t){let n=this.currentView();this.flyTo({target:new H(e,this.heightAt(e,t),t),distance:Math.min(n.distance,190),polar:Math.min(Math.max(n.polar,.75),.95)})}frameBox(e){let t=e.getCenter(new H),n=e.getSize(new H),r=(Math.max(n.x,n.z)*.6+40)/Math.tan(kt.degToRad(this.camera.fov/2))/Math.min(1,this.camera.aspect);this.flyTo({target:t.setY(this.heightAt(t.x,t.z)),distance:kt.clamp(r,140,1e3),polar:.55})}zoom(e){let t=this.currentView();this.flyTo({distance:kt.clamp(t.distance*e,this.controls.minDistance,this.controls.maxDistance)},.5)}resetView(){this.flyTo({...this.home},1.2)}toggleTilt(){let e=this.currentView();this.flyTo({polar:e.polar>.2?.001:.8,azimuth:e.polar>.2?0:e.azimuth},.9)}update(e){let t=this.tween;if(t){t.t=Math.min(1,t.t+e/t.duration);let n=tf(t.t);this.applyView({target:t.from.target.clone().lerp(t.to.target,n),distance:kt.lerp(t.from.distance,t.to.distance,n),polar:kt.lerp(t.from.polar,t.to.polar,n),azimuth:kt.lerp(t.from.azimuth,t.to.azimuth,n)}),t.t>=1&&(this.tween=null)}else this.controls.update();this.clampTarget()}clampTarget(){let{clear:e}=this,t=this.controls.target,n=t.x-e.cx,r=t.z-e.cz,i=Math.hypot(n,r),a=nf;if(i>a){let o=a/i,s=new H(e.cx+n*o-t.x,0,e.cz+r*o-t.z);t.add(s),this.camera.position.add(s)}}get distance(){return this.camera.position.distanceTo(this.controls.target)}},af={high:{pixelRatio:2,shadows:2048,lod:460,fauna:!0,maxFps:60,idleFps:60,groundLevel:2,groundTiles:8,mapTiles:96,mapDetail:1.5,lamps:2500,neighbors:{treeStride:3,maxTrees:4e3,regionTrees:6e3}},medium:{pixelRatio:1.5,shadows:1024,lod:320,fauna:!0,maxFps:60,idleFps:30,groundLevel:2,groundTiles:6,mapTiles:64,mapDetail:1.75,lamps:1500,neighbors:{treeStride:4,maxTrees:2500,regionTrees:3500}},low:{pixelRatio:1,shadows:0,lod:200,fauna:!1,maxFps:30,idleFps:20,groundLevel:1,groundTiles:4,mapTiles:40,mapDetail:2.5,lamps:700,neighbors:{treeStride:6,maxTrees:1200,regionTrees:1500}}},of=[`high`,`medium`,`low`];function sf(e=``){let t=navigator.deviceMemory??8,n=navigator.hardwareConcurrency??4,r=matchMedia(`(pointer: coarse)`).matches;return/swiftshader|llvmpipe|software|basic render/i.test(e)||t<=2||n<=2?`low`:t<=4||n<=4||r?`medium`:`high`}function cf(e){let t=e.getContext(),n=t.getExtension(`WEBGL_debug_renderer_info`);return n?String(t.getParameter(n.UNMASKED_RENDERER_WEBGL)):``}var lf=class{constructor(e,t,{adaptive:n=!0,autoLevel:r=`high`}={}){this.stage=e,this.layers=t,this.adaptive=n,this.mode=`auto`,this.autoLevel=r,this.preset=af[r],this.perf={acc:0,frames:0,slow:0},this.onRecompile=null}set(e){this.mode=e;let t=this.preset=af[e===`auto`?this.autoLevel:e],{renderer:n,sun:r}=this.stage;n.setPixelRatio(Math.min(window.devicePixelRatio,t.pixelRatio));let i=t.shadows>0,a=i!==r.castShadow;n.shadowMap.enabled=i,r.castShadow=i,i&&r.shadow.mapSize.x!==t.shadows&&(r.shadow.mapSize.set(t.shadows,t.shadows),r.shadow.map?.dispose(),r.shadow.map=null);for(let e of this.layers)e.setQuality?.(t);this.stage.resize(),a&&this.onRecompile?.()}adapt(e,t){if(this.mode!==`auto`||!this.adaptive||!t)return;let n=this.perf;if(n.acc+=e,n.frames++,n.acc<2)return;let r=n.acc/n.frames;if(n.acc=0,n.frames=0,n.slow=r>Math.max(1/30,1.6/this.preset.maxFps)?n.slow+1:0,n.slow>=2){let e=of.indexOf(this.autoLevel);e<of.length-1&&(this.autoLevel=of[e+1],this.set(`auto`)),n.slow=0}}},uf=(e,t,n)=>`${e}-${t}-${n}`,df=e=>`ground/${e}.webp`;function ff(e,t,n,r){let i=2**t,a=e.size/i,o=e.cx-e.size/2+n*a,s=e.cz-e.size/2+r*a;return[o,s,o+a,s+a]}function pf(e){return e.onUpdate=()=>{let t=e.image;e.userData.bytes=gf(e),typeof ImageBitmap<`u`&&t instanceof ImageBitmap?t.close():t?.getContext&&(t.width=t.height=1),e.onUpdate=null},e}function mf(e){e.boundingSphere||e.computeBoundingSphere(),e.boundingBox||e.computeBoundingBox(),e.userData.bytes=_f(e);for(let t of Object.values(e.attributes))t.onUpload(hf);return e.index?.onUpload(hf),e}function hf(){this.array=null}function gf(e){if(e.userData.bytes)return e.userData.bytes;let{width:t=0,height:n=0}=e.image??{};return t*n*4*(e.generateMipmaps?4/3:1)}function _f(e){if(e.userData.bytes)return e.userData.bytes;let t=0;for(let n of Object.values(e.attributes))t+=n.array?.byteLength??0;return t+(e.index?.array?.byteLength??0)}function vf(e){let t=new Set,n={geometry:0,texture:0,byLayer:{}};for(let r of e.children){let e=n.byLayer[r.name||r.type]={geometry:0,texture:0};r.traverse(n=>{n.geometry&&!t.has(n.geometry)&&(t.add(n.geometry),e.geometry+=_f(n.geometry)),n.isInstancedMesh&&!t.has(n.instanceMatrix)&&(t.add(n.instanceMatrix),e.geometry+=n.count*64+(n.instanceColor?n.count*12:0));for(let r of n.material?[n.material].flat():[]){let n=[...Object.values(r),...Object.values(r.uniforms??{}).map(e=>e.value)];for(let r of n)r?.isTexture&&!t.has(r)&&(t.add(r),e.texture+=gf(r))}}),n.geometry+=e.geometry,n.texture+=e.texture}return n}function yf(e){return e.traverse(e=>{e.isInstancedMesh&&(e.boundingSphere||e.computeBoundingSphere(),e.instanceMatrix.onUpload(hf),e.instanceColor?.onUpload(hf)),e.geometry&&mf(e.geometry)}),e}var bf=new WeakSet;function xf(e){return bf.add(e),e}function Sf(e,{keep:t=new Set}={}){let n=new Set,r=e=>{!e||n.has(e)||bf.has(e)||t.has(e)||(n.add(e),e.dispose())};e.traverse(e=>{e.isInstancedMesh&&!n.has(e)&&(n.add(e),e.dispose()),r(e.geometry);for(let t of e.material?[e.material].flat():[]){if(bf.has(t))continue;let e=[...Object.values(t),...Object.values(t.uniforms??{}).map(e=>e?.value)];for(let t of e)t?.isTexture&&r(t);r(t)}})}async function Cf(e,{signal:t,data:n=!1,mipmaps:i=!n,anisotropy:a=1}={}){let o=await fetch(e,{signal:t,mode:`cors`});if(!o.ok)throw Error(`${o.status} ${e}`);let s=await o.blob(),l=new Jt(await createImageBitmap(s,{premultiplyAlpha:`none`,colorSpaceConversion:n?`none`:`default`}));return l.flipY=!1,l.colorSpace=n?``:Be,l.generateMipmaps=i,l.minFilter=i?u:c,l.wrapS=l.wrapT=r,l.anisotropy=a,l.needsUpdate=!0,pf(l),l}var wf=`paving.png`;function Tf(e){return{routes:[],landmarks:[],edits:[],vehicles:[],fauna:{},activities:[],services:[],...e}}var Ef={code:`XC`,hours:{open:`08:30`,close:`21:00`},mapFrame:{latitude:20.5806,longitude:-87.11995,bound1Lat:20.58475,bound1Long:-87.11542,bound2Lat:20.57615,bound2Long:-87.12457},illustration:{nodeScale:49.35928726196289,nodeTranslation:[2.365215539932251,0,4.130291938781738],sceneScale:27.5,scenePosition:[-69,98,-120],masks:[[.272,.185,.432,.243]]},osmBBox:[-87.13,20.572,-87.11,20.589],seaCorner:[.99,.99]},Df=[{slug:`rio`,name:`Ruta del Río`,color:`#232323`,casing:`#ffffff`,label:{es:`Línea negra`,en:`Black line`},stroke:`black`,osm:/^(ruta del r[ií]o|black|dash black)$/i},{slug:`acuario`,name:`Ruta Acuario`,color:`#1670d6`,casing:`#ffffff`,label:{es:`Línea azul`,en:`Blue line`},stroke:`blue`,osm:/^ruta acuario$/i},{slug:`playa`,name:`Ruta Playa`,color:`#1f9d55`,casing:`#ffffff`,label:{es:`Línea verde`,en:`Green line`},stroke:`green`,osm:/^ruta playa$/i,links:[[[109.77,145.15],[110.8,148.5],[111.2,153],[110.6,157.5],[109.6,159.63]]]},{slug:`delfines`,name:`Ruta Delfines`,color:`#e3262e`,casing:`#ffffff`,label:{es:`Línea roja`,en:`Red line`},stroke:`red`,osm:/^ruta delfines$/i},{slug:`maya`,name:`Ruta Pueblo Maya`,color:`#ffffff`,casing:`#30343a`,label:{es:`Línea blanca`,en:`White line`},stroke:`white`},{slug:`mexico`,name:`Ruta México Espectacular`,color:`#8a4b1e`,casing:`#ffffff`,label:{es:`Línea café`,en:`Brown line`},stroke:`brown`}],Of=Math.PI/180,kf=[{id:`tlachco`,type:`tlachco`,x:96,z:-373,radius:44,clear:56},{id:`torre`,type:`scenicTower`,x:152,z:-406,height:80,clear:13},{id:`voladores`,type:`voladores`,x:216,z:-86,height:30,clear:8},{id:`plaza`,type:`mayanPlaza`,x:-70,z:-100,size:58,base:70,tiers:4,courtyard:25.5,height:7.5,rotation:0,clear:40,stairs:[{side:`n`,width:7},{side:`s`,width:12}],portals:[{side:`e`,at:2},{side:`w`,at:-6}]},{id:`rosa-vientos`,type:`compassRose`,x:-27.8,z:-98,radius:5,clear:6},{id:`taquillas`,type:`crescentTickets`,x:-178.6,z:-106,r0:30,r1:37.5,a0:-24*Of,a1:46*Of,height:5,passage:12,passageAt:0,joints:[24*Of]},{id:`ecuestre`,type:`charroArena`,x:10,z:-118,outline:[[-8,-21],[7.5,-21],[6.5,6],[5.5,21],[-7,20]],stands:[-14.5,1,-9.3,12],stable:[8,8.5,18.5,21.5],horses:[[-2,-10,20,`#7a4a2a`,!0],[2,2,160,`#e6e0d4`,!0],[-3,13,-60,`#3b2a20`,!1],[4,-15,95,`#5a3a24`,!1]]},{id:`pelota`,type:`ballCourt`,x:-96,z:-30,length:72,width:26,rotation:-2.9*Of,clear:40},{id:`guadalupe`,type:`chapel`,variant:`guadalupe`,x:2,z:-156,rotation:0,clear:10},{id:`chimenea`,type:`chimney`,x:-1,z:-228,height:26,clear:4},{id:`caracol`,type:`caracol`,x:205,z:-126,radius:13,clear:15},{id:`xplus`,type:`fan`,x:205,z:-126,r0:17,r1:48,a0:-104*Of,a1:18*Of,blades:6,clear:0,replacesOsm:[1019729562]},{id:`cementerio`,type:`cemetery`,x:-125,z:43,radius:18,levels:7,rotation:-74*Of,clear:30},{id:`sanfrancisco`,type:`chapel`,variant:`sanfrancisco`,x:-156,z:117.5,rotation:Math.PI,clear:15},{id:`mariposario`,type:`netDome`,x:-128,z:154,rx:30,rz:22,height:16,clear:6},{id:`aviario`,type:`netDome`,x:-192,z:137,rx:16,rz:14,height:12,arcade:!0,clear:5},{id:`piramide-11a`,type:`pyramid`,x:271,z:-62,size:12,height:8,rotation:8*Of,clear:10},{id:`altar-11`,type:`altar`,x:261,z:-66,clear:4},{id:`piramide-11b`,type:`pyramid`,x:264,z:-51,size:10,height:6.5,rotation:8*Of,clear:8},{id:`piramide-25`,type:`pyramid`,x:158,z:2,size:11,height:7,rotation:-10*Of,clear:9},{id:`ruinas-16`,type:`ruins`,x:0,z:62,rooms:[[-8,-5,7,6],[10,0,9,7],[-18,15,8,8],[2,14,6,5]],clear:4},{id:`templo-17`,type:`pyramid`,x:57,z:161,size:9,height:4.5,rotation:15*Of,clear:8},{id:`foro`,type:`forum`,x:122,z:-8,radius:17,clear:19},{id:`palapa-central`,type:`roundPalapa`,x:108,z:47.5,radius:19.5,tiers:1,oculus:6.5,clear:22},{id:`acuario`,type:`aquarium`,x:165,z:48,outline:[[-18,-9],[2,-9],[16,.5],[8,3.5],[19,9],[19,16.5],[1,16.5],[1,-1],[-18,-1]],glass:[[2,-9],[16,.5]],court:[-9,-3,.5,11],annex:[-18,-22.5,-6.5,-13.5],clear:19},{id:`orquideas-a`,type:`greenhouse`,x:49.5,z:-271.5,width:11,length:43,rotation:.03},{id:`orquideas-b`,type:`greenhouse`,x:71,z:-286,width:19,length:20,bays:3,rotation:.03},{id:`orquideas-c`,type:`greenhouse`,x:84.4,z:-280.8,width:7.7,length:24,vault:!0,rotation:.03},{id:`galeria-antorchas`,type:`galleryBridge`,x:24.5,z:-295,clear:14},{id:`henequen`,type:`agaveField`,x:31,z:-216,length:26,width:14,rotation:0,clear:10},{id:`acueducto`,type:`aqueduct`,x:21,z:-242,length:120,rotation:0,clear:0},{id:`acceso`,type:`entranceBuilding`,x:-155.5,z:-138.25,outer:[-17,-15.25,17,15.25],court:[-10,-8.75,4,3.25]},{id:`bandera`,type:`flagpole`,x:-176,z:-106,height:18,rotation:90*Of,clear:4},{id:`terminal-autobuses`,type:`busTerminal`,x:-178,z:-165,curb:[[-196.5,-159.5],[-155.5,-190.5]],vehicles:[[`van`],[`bus`,`#e8508a`,[`#7a3fc4`,`#f2c33a`,`#2fb5c9`,`#ffffff`]],[`bus`,`#3b6fd8`,[`#f2c33a`,`#e8508a`,`#7bd34f`]],[`bus`,`#e8608f`,[`#ffffff`,`#2fb5c9`,`#f28c28`]],[`bus`,`#8a4fd0`,[`#f2c33a`,`#e8508a`,`#ffffff`]],[`bus`,`#3b6fd8`,[`#ffffff`,`#f2c33a`,`#d9475e`]],[`van`],[`van`],[`van`],[`bus`,`#e8608f`,[`#7bd34f`,`#f2c33a`,`#2fb5c9`]],[`bus`,`#9ccc3c`,[`#f2c33a`,`#2b7de0`,`#e8508a`]]],shelter:{at:[-183.7,-159.1],length:9,width:5},plaza:[[-204.5,-153.5],[-152.3,-192.9],[-167.6,-212.9],[-219.6,-173.5]],exit:{at:[-198,-152.5],facing:[-205,-163]},walk:[[-193,-156],[-191,-145],[-188,-133],[-185,-122]]},{id:`kiosco-entrada`,type:`palapaKiosk`,x:-163,z:-106,radius:2.8,clear:5},{id:`puerta`,type:`trailGate`,x:68,z:-100,rotation:0,clear:8},{id:`arco-acceso`,type:`entranceArch`,x:-171,z:-25,rotation:56*Of,clear:10},{id:`temazcal`,type:`temazcal`,x:-65.5,z:70.5,radius:4,rotation:-90*Of,clear:6},{id:`domos`,type:`domes`,x:-166,z:48,rotation:0,clear:9},{id:`vitral`,type:`vitral`,x:-140,z:221,rotation:0,clear:12},{id:`letras-rios`,type:`letters`,text:`XCARET`,x:-134,z:375,scale:.55,color:`textile`,outline:`white`,base:`rockwall`,clear:6},{id:`letras-rios-mexico`,type:`letters`,text:`MEXICO`,x:-131,z:376.6,scale:.17,color:`white`,base:`rockwall`,clear:0},{id:`letrero-felinos`,type:`stoneSign`,x:-50.5,z:209.5,rotation:-45*Of,number:52,lines:[`JAGUARES`,`Y PUMAS`],hours:`8:30 h - 18:30 h`,clear:5},{id:`caleta-snorkel`,type:`snorkelCove`,x:132,z:170,y:0,clear:0,ledges:[{width:2.6,pts:[[136,149],[139,162],[144.5,170.5],[151,179.5],[152.5,188]]},{width:2.4,pts:[[109.5,155],[115,163.8],[122.8,172.8],[129,181],[130.8,190]]}],entries:[{at:[138.6,158],toward:[130,161.5],width:1.3,rails:2},{at:[142.6,168],toward:[134.5,172.5],width:1.3,rails:2},{at:[148.5,177],toward:[141,182.5],width:1.3,rails:2},{at:[120.2,169.6],toward:[127,164],width:5,rails:3}]},{id:`felinos`,type:`habitat`,x:-62,z:178,outer:[[-96.7,235.5],[-99.9,220.9],[-98.7,202.4],[-92.1,190.3],[-76.3,177.2],[-75,176.1],[-69.3,171.2],[-64.7,162.2],[-63.6,147.8],[-60.1,135.1],[-45.6,130.2],[-35.5,132.3],[-25.8,139.6],[-25,153.4],[-33.1,165.7],[-39,172.9],[-46.1,194.7],[-60.9,215.9],[-74.8,229.3],[-85.8,237.4]],islands:[{animal:`puma`,at:[-45,152],rim:[[-52.4,194.7],[-50,191.2],[-43.5,170.5],[-36.7,162.7],[-29.4,152.5],[-30.5,143.2],[-37.3,137.4],[-45.7,135.1],[-55.3,138.1],[-58.4,147.8],[-59.8,162.9],[-65.1,174.4],[-71.6,180],[-54.1,197.2]],pond:[[-64.3,175],[-70.1,180],[-54.3,195.6],[-53.2,194.1],[-57.4,189.1],[-63.2,183],[-62.5,179.4]]},{animal:`jaguar`,at:[-80,207],rim:[[-78.6,184.8],[-88.5,192.9],[-92.9,203.6],[-94.8,220.4],[-92.9,230.2],[-87.6,231],[-77.3,225.3],[-64.7,213.3],[-59.7,205.4],[-57.2,201.4],[-75.3,182.2]],pond:[[-60.5,204.9],[-58.5,201.5],[-75.4,183.6],[-78,185.6],[-71.9,192.5],[-63.4,199.3]]}],bridge:{from:[-75.9,176.9],to:[-51.4,202.3],height:2.6,sag:.7,width:1.6,tower:4.3,landing:2.8,stairs:[[.72,-.69],[.72,-.69]]}},{id:`poste-ciudades`,type:`signpost`,x:-82.5,z:412.5,clear:3,places:[{name:`NEW YORK`,at:[40.7128,-74.006],color:`pink`},{name:`HOTEL XCARET MÉXICO`,km:1.3,bearing:0,color:`yellow`},{name:`COZUMEL`,at:[20.4229,-86.9223],color:`green`},{name:`CANCÚN`,at:[21.1619,-86.8515],color:`yellow`},{name:`HOLANDA`,at:[52.3676,4.9041],color:`red`},{name:`ROMA`,at:[41.9028,12.4964],color:`pink`},{name:`XENOTES`,km:73,bearing:20,color:`green`},{name:`XEL-HÁ`,at:[20.3192,-87.3578],color:`blue`},{name:`TULUM`,at:[20.2114,-87.4654],color:`green`},{name:`CIUDAD DE MÉXICO`,at:[19.4326,-99.1332],color:`pink`},{name:`ALASKA`,at:[61.2181,-149.9003],color:`yellow`},{name:`CANADÁ`,at:[43.6532,-79.3832],color:`red`},{name:`MOSCÚ`,at:[55.7558,37.6173],color:`black`},{name:`MADRID`,at:[40.4168,-3.7038],color:`white`},{name:`PARÍS`,at:[48.8566,2.3522],color:`blue`},{name:`LOS ÁNGELES`,at:[34.0522,-118.2437],color:`yellow`},{name:`BUENOS AIRES`,at:[-34.6037,-58.3816],color:`blue`},{name:`TOKIO`,at:[35.6762,139.6503],color:`pink`}]},{id:`baja-california`,type:`roundPalapa`,x:146,z:290,radius:13,tiers:3,clear:15},{id:`palapa-delphinus`,type:`longPalapa`,x:116,z:313,length:28,width:9,rotation:-37*Of,clear:8},{id:`muelle`,type:`dock`,x:183,z:264,y:.6,poly:[[-10,-11.5],[-4,-13.5],[10,9.5],[3,14.5]],clear:9},{id:`andadores-delphinus`,type:`walkways`,x:95,z:305,y:.75,width:1.8,clear:0,lines:[[[58,322.5],[63,312],[70,303],[78,295.5],[85,291.5],[93,288],[100,287],[105,287.5],[110,289],[116,291],[121,296],[124.5,303]],[[65.5,329],[70,320],[77,312],[85,304.5],[95,297],[104,290.5],[110,288.5]],[[73,334],[84,325.5],[96,315.5],[108,305.5],[119,296.5]],[[75,317],[81,326],[87,335]],[[65.5,330],[73,334],[87,335.5]],[[110,288.5],[118,283],[125,277.5],[131,273]]]},{id:`lanchas`,type:`boats`,x:100,z:280,y:0,clear:0,boats:[[80.5,289,-25,8,`#f4f4f2`],[92.5,284,-20,9,`#2a5db0`],[124,273,-30,14,`#f4f4f2`]]},{id:`toboganes-a`,type:`waterSlides`,x:334,z:-27,rotation:0,clear:14},{id:`toboganes-b`,type:`waterSlides`,x:372,z:-104,rotation:.6,clear:14},{id:`mundo-ninos`,type:`kidsTower`,x:356,z:-61,rotation:-.45,clear:12}],Af=[{kind:`flatten`,landmark:`plaza`,size:62},{kind:`pave`,landmark:`bandera`,polygons:[[[13,0],[9.2,9.2],[0,13],[-9.2,9.2],[-13,0],[-9.2,-9.2],[0,-13],[9.2,-9.2]],[[8,-5],[18,-5],[18,5],[8,5]]]},{kind:`plant`,at:[-158,-140],polygons:[[[-16,-14],[4,-14],[20,-3],[20,12],[6,16],[-14,16],[-18,2]]]},{kind:`ignoreRoofs`,at:[-12,-112],radius:20},{kind:`satelliteCover`,at:[-12,-112],radius:20},{kind:`satelliteCover`,at:[5,-122],radius:24},{kind:`ignoreRoofs`,at:[1,-136.5],radius:4},{kind:`ignoreRoofs`,at:[15.8,-153.5],radius:4},{kind:`satelliteCover`,at:[-151,-110],radius:16},{kind:`pave`,at:[-140,-106],polygons:[[[-50,-15],[-8,-15],[-8,2],[-14,28],[-50,28]],[[-6,-3],[36,-3],[36,3],[-6,3]]]},{kind:`pave`,at:[0,0],lines:[[[-193,-156],[-191,-145],[-188,-133],[-185,-121],[-140,-106],[-104,-101],[-70,-94],[-30,-95]]],width:8},{kind:`pave`,landmark:`kiosco-entrada`,polygons:[[[8,0],[5.7,5.7],[0,8],[-5.7,5.7],[-8,0],[-5.7,-5.7],[0,-8],[5.7,-5.7]]]},{kind:`pave`,landmark:`ecuestre`,surface:`dirt`,polygons:[[[-8,-21],[7.5,-21],[6.5,6],[5.5,21],[-7,20]]]},{kind:`ignoreRoofs`,at:[20.4,-160.4],radius:5},{kind:`keepOsmBuilding`,osmId:1454523992,roof:`tile`},{kind:`keepRoofs`,at:[116,128],radius:4},{kind:`keepRoofs`,at:[158,117],radius:5},{kind:`keepRoofs`,at:[306,42],radius:5},{kind:`ignoreRoofs`,at:[24,-296],radius:14},{kind:`water`,at:[0,0],polygons:[[[113,140],[110.7,154.7],[116.2,163],[124,172],[130.3,180],[132,190],[133,200],[134,207],[152,207],[151,188.5],[149.4,180],[143,171],[137.5,163],[134.5,150.4],[136,140]]]},{kind:`clearTrees`,at:[-45,152],radius:6},{kind:`clearTrees`,at:[-80,207],radius:6},{kind:`ignoreRoofs`,at:[-46,160],radius:24},{kind:`ignoreRoofs`,at:[-79,206],radius:20},{kind:`plant`,cover:`lawn`,at:[0,0],polygons:[[[-96.7,235.5],[-99.9,220.9],[-98.7,202.4],[-92.1,190.3],[-75,176.1],[-69.3,171.2],[-64.7,162.2],[-63.6,147.8],[-60.1,135.1],[-45.6,130.2],[-35.5,132.3],[-25.8,139.6],[-25,153.4],[-33.1,165.7],[-39,172.9],[-46.1,194.7],[-60.9,215.9],[-74.8,229.3],[-85.8,237.4]]]},{kind:`clearTrees`,at:[152.75,30],radius:7},{kind:`removeOsmPiers`,bbox:[50,265,140,345]},{kind:`clearTrees`,at:[174.8,273.2],radius:5},{kind:`clearTrees`,at:[176.3,288.3],radius:5}],jf=[{from:[-367.5,-22],to:[-364,-22],count:2,heading:92,colors:[`#f2c33a`,`#e8608f`]},{from:[-356,-17],to:[-343,-13],count:4,heading:92,colors:[`#e8608f`,`#f2c33a`,`#f2c33a`,`#e8608f`]},{from:[-335,-32.6],to:[-331,-24.6],count:3,heading:-12,colors:[`#f1f1f1`,`#e8608f`,`#e8608f`]},{from:[-320,-47.4],to:[-312,-38.6],count:3,heading:-12,colors:[`#d9475e`,`#e8608f`,`#f1f1f1`]},{from:[-306.5,-33.6],to:[-300.5,-24.6],count:4,heading:-12,colors:[`#e8608f`,`#f2c33a`,`#f2c33a`,`#e8608f`]},{from:[-291,-48],to:[-276,-30],count:5,heading:-55,colors:[`#e8608f`,`#d9475e`,`#f2c33a`,`#e8608f`,`#3b6fd8`]},{from:[-256,-30.6],to:[-256,-30.6],count:1,heading:-30,colors:[`#d9475e`]}],Mf={flamingos:[{x:258,z:-170,r:7,count:16}],birds:[{x:218,z:-222,r:28,h:22,count:4,colors:[14034984,14034984,2450411]},{x:14,z:-62,r:24,h:18,count:3,colors:[14034984,16106776,2450411]},{x:-75,z:170,r:36,h:24,count:4,colors:[2450411,2450411,16106776]},{x:60,z:135,r:30,h:20,count:3,colors:[14034984,14034984,2450411]},{x:320,z:330,r:90,h:34,count:6,colors:[16777215,14540253,15921906],span:2.2,speed:.6}],dolphins:[{x:337,z:92,rx:10,rz:20,count:3},{x:104,z:300,rx:10,rz:8,count:2}]},Nf={es:`Servicios`,en:`Services`},Pf=Tf({key:`xc`,name:`Xcaret`,labelKey:`lbl_map_prefix_xc`,sources:Ef,routes:Df,landmarks:kf,edits:Af,vehicles:jf,fauna:Mf,activities:[{id:`-NzAPPQmk3ve_IUnDdIc`,number:1,lat:20.5814470784865,lng:-87.1206258237362,name:{es:`Plaza Principal`,en:`Main Plaza`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAQQPvcw99V6ZOJR9u`,number:2,lat:20.58147156085912,lng:-87.12076630443335,name:{es:`Recital de Arpa`,en:`Harp Recital`},category:{es:`Presentaciones`,en:`Performances`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAQaIkgTB-lymIxalW`,number:3,lat:20.58157993603545,lng:-87.12043122682856,name:{es:`Descubriendo México`,en:`Discover Mexico`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPRA9ee9Rc_W9XxSA`,number:4,lat:20.5816853106377,lng:-87.1198302134871,name:{es:`Espectáculo Ecuestre`,en:`Horse Exhibition`},category:{es:`Presentaciones`,en:`Performances`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPS7H2FSubGZqsed3`,number:5,lat:20.5815198978397,lng:-87.1196920797229,name:{es:`Restaurante Jalisco`,en:`Jalisco Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta del Río`,en:``},extraCost:!0,hours:`12:00-19:00`,desc:`Comida mexicana`},{id:`-NzAPSkjosJCSFYi5vm9`,number:5,lat:20.58150389014,lng:-87.11976181715731,name:{es:`Bar La Cucaracha`,en:`La Cucaracha Bar`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta del Río`,en:``},extraCost:!0,hours:`11:00-18:30`,desc:`Cocteles y bebidas`},{id:`-NzAPTT_ii7fuYwgC6Mt`,number:6,lat:20.5814878824387,lng:-87.1192609146237,name:{es:`Sendero de la Selva Tropical`,en:`Tropical Jungle Trail`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPU9drajCJzCH67r1`,number:6,lat:20.58247370260266,lng:-87.11940555279402,name:{es:`Sendero de la Selva Tropical`,en:`Tropical Jungle Trail`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta México Espectacular`,en:``}},{id:`-NzAPUt97YznlTIvJOmf`,number:6,lat:20.58231230825323,lng:-87.11885214606805,name:{es:`Río del Paraíso`,en:`Paradise River`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPVpn3dZWbu9wmrMa`,number:6,lat:20.5828096107108,lng:-87.1190671250224,name:{es:`Museo Viviente de Orquídeas y Bromelias`,en:`Natural Museum of Orchids & Bromeliads`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPWZwbglb0CPHEGNw`,number:6,lat:20.5826137533376,lng:-87.117371968925,name:{es:`Flamencos`,en:`Flamingos`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPXzsS7Qbqm2OAb5S`,number:8,lat:20.58163439992085,lng:-87.11792732903623,name:{es:`Xcaret Plus`,en:`Xcaret Plus`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPYh_UuFL5U8_0_iz`,number:9,lat:20.5817396111946,lng:-87.1181058883667,name:{es:`Entrada  a Ríos Subterráneos`,en:`Xcaret Plus Rivers Entrance`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAQYMKYSbm3AFgCEun`,number:10,lat:20.5814156908236,lng:-87.1178356558084,name:{es:`Danzas y Rituales Totonacas`,en:`Totonac Dances and Rituals`},category:{es:`Presentaciones`,en:`Performances`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAP_BVOKJZW_FkbrDM`,number:11,lat:20.5811529758316,lng:-87.1173474937677,name:{es:`Zona Arqueológica`,en:`Archaeological Site`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPae89zQj6Ij4hxwv`,number:12,lat:20.58136860931707,lng:-87.1167530578804,name:{es:`Mundo de Niños`,en:`Children's World`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAP_wD0dVT4Ux-AUO2`,number:13,lat:20.5811667864278,lng:-87.1191911771894,name:{es:`Isla de Monos`,en:`Monkey Island`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPbNX7ptlfc4R0CmK`,number:13,lat:20.581377397866,lng:-87.1187053620815,name:{es:`Fish Therapy`,en:`Fish Therapy`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPd4IKYBr_RGDuCFF`,number:13,lat:20.581018008575,lng:-87.1193236112595,name:{es:`Venados`,en:`Deer Refuge.`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPcJx6h4EI0Z48zbC`,number:14,lat:20.581375200728875,lng:-87.11904834955935,name:{es:`Xcafé`,en:`Xcafé`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta del Río`,en:``},extraCost:!0,hours:`13:00-16:00`,desc:`Buffet internacional`},{id:`-NzAPeWpF9xs0KoQZHpL`,number:15,lat:20.58066050170676,lng:-87.11946945637465,name:{es:`Restaurante La Isla`,en:`La Isla Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta del Río`,en:``},extraCost:!0,hours:`13:00-16:00`,desc:`Buffet internacional`,seasonal:!0},{id:`-NzAPfAUrI5IErZCqjCl`,number:15,lat:20.5805522136841,lng:-87.1192293986678,name:{es:`Territorio del Tapir`,en:`Tapir Territory`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPfvNl9k0jXFKvBXT`,number:16,lat:20.5800653874504,lng:-87.1199016273022,name:{es:`Zona Arqueológica`,en:`Archaeological Site`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPgdQLTzk6hPGQkTA`,number:17,lat:20.5790945552565,lng:-87.119494266808,name:{es:`Zona Arqueológica`,en:`Archaeological Site`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPhMuMhH7wiXjJkck`,number:18,lat:20.578631139992787,lng:-87.1200054959445,name:{es:`Laguna de Actividades Extraordinarias`,en:`Dream Activities Lagoon Station`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPi5o4YOUOZNPHkq3`,number:18,lat:20.5786971808409,lng:-87.1199227496982,name:{es:`Rayas ¡Encuentro Interactivo!`,en:`Stingray Encounter`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPimN7z317Ev9VJUt`,number:18,lat:20.578728,lng:-87.119863,name:{es:`Adventure Kids`,en:`Adventure Kids`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPjX1HGN101kjScox`,number:18,lat:20.578457206031523,lng:-87.12049723446272,name:{es:`Sea Trek® con Rayas`,en:`Stingray Sea Trek®`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPk8gmckdglF7hMEA`,number:19,lat:20.5784222197391,lng:-87.1202295273542,name:{es:`Laguna de Manatíes`,en:`Manatees Lagoon`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPkpeBZroNhB5Uk_e`,number:20,lat:20.5783478294928,lng:-87.1207471936941,name:{es:`Restaurante Oaxaca`,en:`Oaxaca Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta del Río`,en:``},extraCost:!0,hours:`12:00-18:00`,desc:`Buffet internacional`},{id:`-NzAPmIEitN9dY6FYVG5`,number:22,lat:20.5770047183451,lng:-87.1210962161422,name:{es:`Fish Therapy`,en:`Fish Therapy`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPn1r9UuuKtS4-kk5`,number:23,lat:20.5769720742252,lng:-87.1213356032968,name:{es:`Salida de Ríos`,en:`Rivers Exit`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta del Río`,en:``}},{id:`-NzAPnjOoUg4dn1b6WAx`,number:24,lat:20.580699877765912,lng:-87.11875665936986,name:{es:`Foro Abierto`,en:`Open Theater`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Acuario`,en:``}},{id:`-NzAPoSUMoR9g6YADt2W`,number:25,lat:20.5805754406868,lng:-87.1183784678578,name:{es:`Zona Arqueológica`,en:`Archaeological Site`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Acuario`,en:``}},{id:`-NzAPp9Ewuxl51iYyqfs`,number:27,lat:20.58021943939763,lng:-87.11846443270588,name:{es:`Acuario de Arrecife de Coral`,en:`Coral Reef Aquarium`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`},route:{es:`Ruta Acuario`,en:``},active:!1},{id:`-NzAPpruisXLqQsAMRlp`,number:27,lat:20.5803227683735,lng:-87.1177699416876,name:{es:`Nado con Tiburones ¡Aventura Interactiva!`,en:`Sharks, a Hands-on Adventure`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Acuario`,en:``},extraCost:!0},{id:`-NzAPqaKPPfY2Ac9ZHwC`,number:28,lat:20.580639660184186,lng:-87.11718382074642,name:{es:`Nado con Delfines Primax`,en:`Swim with Dolphins Primax`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Acuario`,en:``},extraCost:!0},{id:`-NzAPrHfjdW9fw6YWZhe`,number:28,lat:20.580555572158477,lng:-87.11709799005794,name:{es:`Nado con Delfines Interax`,en:`Swim with Dolphins Interax`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Acuario`,en:``},extraCost:!0},{id:`-NzAPs0Ag-f51p5OztXt`,number:29,lat:20.5797565297696,lng:-87.118426412344,name:{es:`Tortugas Marinas`,en:`Sea Turtles`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Acuario`,en:``}},{id:`-NzAPshE3teUSO4iGDF_`,number:30,lat:20.5791589009373,lng:-87.118725143373,name:{es:`Caleta para Snorkel`,en:`Snorkeling Inlet`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`},route:{es:`Ruta Playa`,en:``}},{id:`-NzAPtS8sUHuCHrSzTNa`,number:31,lat:20.579712900433,lng:-87.1187740936875,name:{es:`Restaurante Michoacán`,en:`Restaurante Michoacán`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta Playa`,en:``},extraCost:!0,hours:`12:00-18:00`,desc:`Parrillada`,seasonal:!0},{id:`-NzAPuAVvtzjVLb0WY0i`,number:32,lat:20.5789131316785,lng:-87.1183737739921,name:{es:`Sea Trek®`,en:`Sea Trek®`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Playa`,en:``},extraCost:!0},{id:`-NzAPuvWGbn_QvSErkkj`,number:33,lat:20.578594227427,lng:-87.1191475912929,name:{es:`Playa`,en:`Beach`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Playa`,en:``}},{id:`-NzAPwFWJQifMCx7bLu8`,number:35,lat:20.5787200942436,lng:-87.1190252155066,name:{es:`Snack De La Playa`,en:`Snack De La Playa`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta Playa`,en:``},extraCost:!0,hours:`11:00-17:30`,desc:`Bebidas y snacks`},{id:`-NzAPwxpl_SwYp5zXOjI`,number:35,lat:20.578245817492792,lng:-87.11956668645514,name:{es:`Bar Pai-Ai`,en:`Pai-Ai Bar`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta Playa`,en:``},extraCost:!0,hours:`10:30-17:30`,desc:`Cocteles y bebidas`},{id:`-NzAPxfiiSdxoW8jmcBW`,number:36,lat:20.578400875705874,lng:-87.11952745914459,name:{es:`Restaurante Veracruz`,en:`Dos Playas Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta Playa`,en:``},extraCost:!0,hours:`11:30-17:30`,desc:`Buffet caribeño`},{id:`-NzAPyQiHJ4B8TN15PmK`,number:37,lat:20.57801781257152,lng:-87.12049265215684,name:{es:`Xpá`,en:`Xpá`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAPCIK8zHyByFi3vUe`,number:38,lat:20.577714056795116,lng:-87.11950425529479,name:{es:`Palapa Escollera`,en:`Palapa Breakwater`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAPz9zyPCeLbs509dD`,number:38,lat:20.577689798707166,lng:-87.11974029252819,name:{es:`Módulo de Actividades Extraordinarias`,en:`Dream Activities Station`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAPzsPkeCJD47mTavC`,number:39,lat:20.5774491798979,lng:-87.1200323849916,name:{es:`Pozas Naturales`,en:`Natural Pools`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`},route:{es:`Ruta Delfines`,en:``}},{id:`-NzAQ-_rhm_XBospZ_wV`,number:40,lat:20.57750598794312,lng:-87.12064091116186,name:{es:`Restaurante Yucatán`,en:`Yucatán Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta Delfines`,en:``},extraCost:!0,hours:`11:00-17:30`,desc:`Buffet de Mariscos y platillos del Pacífico`},{id:`-NzAQ0FuiFm1U3fNuDbP`,number:41,lat:20.577589355689952,lng:-87.11953711519531,name:{es:`Restaurante Bar Las Rocas`,en:`Las Rocas Restaurant Bar`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta Delfines`,en:``},extraCost:!0,hours:`10:30-17:30`,desc:`Bebidas y comida rápida a la carta`,seasonal:!0},{id:`-NzAQ1-t0YzHm90UBrm-`,number:42,lat:20.5776908710182,lng:-87.1188401430845,name:{es:`Nado con Delfines Dolphin Ride`,en:`Dolphin Ride`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAQ1jkWUqUVJ_DQsYR`,number:43,lat:20.57794599597913,lng:-87.11845739190721,name:{es:`Restaurante Baja California`,en:`Baja California Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta Delfines`,en:``},extraCost:!0,hours:`11:30-17:30`,desc:`Buffet de mariscos`},{id:`-NzAQ2QEc-GZCa5t-LOv`,number:44,lat:20.578195541259255,lng:-87.11858224880648,name:{es:`Adrenalina`,en:`Adrenalina`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAQ39HVcc-ImFMGlX8`,number:44,lat:20.578212683697462,lng:-87.11847822187376,name:{es:`Paraxute`,en:`Paraxute`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAQ3rywuHgEsUdVVN8`,number:44,lat:20.57819132599505,lng:-87.11855292132034,name:{es:`Tour de Snorkel`,en:`Snorkeling Tour`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAQ4bWHOWFw_AhaUrk`,number:44,lat:20.5782560752334,lng:-87.11828795398188,name:{es:`Snuba® Arrecife`,en:`Snuba® Reef`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAQ5MO-WLmKIecE2Xe`,number:45,lat:20.5810886309916,lng:-87.1202308684587,name:{es:`Cuevas al Pueblo Maya`,en:`Cave Route to the Mayan Village`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQ6566snZtUBIFcqv`,number:46,lat:20.5801711647847,lng:-87.1211414784193,name:{es:`Cementerio Mexicano`,en:`"Bridge to Paradise" Mexican Cemetery`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQ6pWN7YETUXO5wLM`,number:47,lat:20.579669773284614,lng:-87.12148473421625,name:{es:`Capilla de San Francisco de Asís`,en:`St. Francis of Assisi Chapel`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQ7XTelBI5yhJQ5I_`,number:48,lat:20.579386025272125,lng:-87.12179184714843,name:{es:`Aviario Xcaret`,en:`Xcaret's Aviary`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQ8HEq2YiLBlBU0o_`,number:49,lat:20.578644323052565,lng:-87.12137375781822,name:{es:`Plaza del Vitral`,en:`Stained Glass Plaza`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQ91BEFOfBYM0UDpW`,number:50,lat:20.579227515367286,lng:-87.12110218415542,name:{es:`Mariposario`,en:`Butterfly Pavilion`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQ9ikm3NQcSkbw1uz`,number:51,lat:20.5798073783332,lng:-87.1210740879178,name:{es:`Pueblo Maya`,en:`Mayan Village`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQM0Jrrrm92wriXO4`,number:51,lat:20.579677431970264,lng:-87.12127391248941,name:{es:`Taller de Lana`,en:`Wool Workshop`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQMkpihL0ouElvjzo`,number:51,lat:20.579578559663496,lng:-87.12057251483202,name:{es:`Taller de Coco`,en:`Coconut Workshop`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQNTn343ai3A_Evr6`,number:51,lat:20.579432605188792,lng:-87.120659686625,name:{es:`Taller de Chocolate`,en:`Chocolate Workshop`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQODtwik3SHhnOltT`,number:51,lat:20.579495535344748,lng:-87.1206698747651,name:{es:`Taller de Pintura Cerámica`,en:`Pottery Paint Workshop`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``},extraCost:!0},{id:`-NzAQOx8ohW2q08ZvK9h`,number:51,lat:20.5801083889275,lng:-87.12066873908043,name:{es:`Taller de Barro`,en:`Clay Workshop`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``},extraCost:!0},{id:`-NzAQRo862lyWmT1yTaK`,number:51,lat:20.579678975874113,lng:-87.12102873863854,name:{es:`Danzas Prehispánicas`,en:`Pre-Hispanic Dances`},category:{es:`Presentaciones`,en:`Performances`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQAShOzYHOWvlcy3A`,number:52,lat:20.5787693737421,lng:-87.1206841617823,name:{es:`Isla de Jaguares`,en:`Jaguar Island`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQBAkz0qFzBnU4gqT`,number:53,lat:20.579898089617544,lng:-87.12069354951382,name:{es:`Temascal`,en:`Temascal`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta Pueblo Maya`,en:``},extraCost:!0},{id:`-NzAQCdRNgaY8DOo-BCP`,number:54,lat:20.580840353818,lng:-87.1208511292934,name:{es:`Juego de Pelota`,en:`Ballgame Court`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta Pueblo Maya`,en:``}},{id:`-NzAQDJTq_c2USV6WULN`,number:55,lat:20.58200602890298,lng:-87.12021490936418,name:{es:`Maternidad de Caballos`,en:`Horse Maternity Ward`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta México Espectacular`,en:``}},{id:`-NzAQE1MIJIRuIFYbcTt`,number:56,lat:20.5820189605747,lng:-87.1199344843626,name:{es:`Capilla de Guadalupe`,en:`Chapel of Guadalupe`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta México Espectacular`,en:``}},{id:`-NzAQElj7sTeO01X6IHu`,number:57,lat:20.582448215988585,lng:-87.12015972296281,name:{es:`Hacienda Henequenera`,en:`Hacienda Henequenera`},category:{es:`Atractivos por Descubrir`,en:`Attractions`},route:{es:`Ruta México Espectacular`,en:``}},{id:`-NzAQHdhFVZbFRkF8f8B`,number:60,lat:20.584298026815347,lng:-87.1190403029323,name:{es:`Xcaret México Espectacular`,en:`Xcaret México Espectacular`},category:{es:`Presentaciones`,en:`Performances`},route:{es:`General`,en:``}},{id:`-NzAQSXbA3e3WvFl2MOv`,number:60,lat:20.584128960378298,lng:-87.11909377793472,name:{es:`Botellófono`,en:`Water Bottle Chimes`},category:{es:`Presentaciones`,en:`Performances`},route:{es:`Ruta México Espectacular`,en:``}},{id:`-NzAQU14j05CYQfDtTfx`,number:60,lat:20.5831106153825,lng:-87.1197095140814,name:{es:`Bienvenida Prehispánica`,en:`Pre-Hispanic Welcome`},category:{es:`Presentaciones`,en:`Performances`},route:{es:`Ruta México Espectacular`,en:``}},{id:`-NzAQITbVoBHtXpZpCIZ`,number:61,lat:20.584457724156433,lng:-87.11877213225507,name:{es:`Cenas México Espectacular`,en:`México Espectacular Dinner`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0,hours:`19:00-21:15`,desc:`Cocina mexicana gourmet`},{id:`-NzAQJCnfLSV3L4sNij_`,number:61,lat:20.5843623075239,lng:-87.11858174087108,name:{es:`Xcaret Xclusivo`,en:`Xcaret Xclusivo`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0,hours:`19:00-21:15`,desc:`Vino espumante y frutos secos`},{id:`-NzAQJxBG14FcbgbmUUm`,number:62,lat:20.58431309260975,lng:-87.11836002767086,name:{es:`Torre Escénica`,en:`Scenic Tower`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`},route:{es:`Ruta México Espectacular`,en:``}},{id:`-NzAQKeqnSiXAji94grI`,number:62,lat:20.58399671061501,lng:-87.11943425238132,name:{es:`Snacks Venados y Jaguares`,en:`Venados and Jaguares Snacks`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0,hours:`17:00-19:15`,desc:`Bebidas, antojitos y snacks`},{id:`-NzAQLNxG13K3NtZJHVb`,number:62,lat:20.583434252115456,lng:-87.11923275142908,name:{es:`Bar Serpiente`,en:`Snake Bar`},category:{es:`Restaurantes`,en:`Restaurants`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAP265vjmmV78NMtRB`,number:71,lat:20.581359,lng:-87.118147,name:{es:`Palapa Murciélago`,en:`Bat Palapa`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAP3Y0PRM1t3F6ewFQ`,number:73,lat:20.581445,lng:-87.119115,name:{es:`Palapa Chalecos Salvavidas`,en:`Palapa Life Jackets`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAP4LOZDBuBfFwvgi-`,number:74,lat:20.58148,lng:-87.119986,name:{es:`Palapa Tequila`,en:`Tequila Palapa`},category:{es:`Photos`,en:`Photos`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAP5HmhoVs6cUpy0uc`,number:75,lat:20.581465,lng:-87.119267,name:{es:`Palapa Entrada Rio`,en:`Palapa Entrance River`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAP61BbtYGlOhk_zXY`,number:76,lat:20.581869,lng:-87.117682,name:{es:`Tienda Xcaret Plus`,en:`Xcaret Plus Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAP6leGZpfWhHcheYG`,number:77,lat:20.581002,lng:-87.117196,name:{es:`Tienda Mundo de los Niños`,en:`Children's World Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAP7VdUVz9tpCNtfAb`,number:78,lat:20.580463,lng:-87.118871,name:{es:`Tienda Auditorio`,en:`Auditorium Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta Acuario`,en:``},extraCost:!0},{id:`-NzAP97ByZvz1NFXHAyt`,number:80,lat:20.579949,lng:-87.118161,name:{es:`Tienda Acuario`,en:`Aquarium Shop`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta Acuario`,en:``},extraCost:!0},{id:`-NzAP9raZy7oxjY4R38a`,number:81,lat:20.58,lng:-87.119,name:{es:`Tienda la Escollera`,en:`Shop the breakwater`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta Acuario`,en:``},extraCost:!0},{id:`-NzAPAZsJ1Q227BAGWdK`,number:82,lat:20.577712,lng:-87.118749,name:{es:`Tienda Escollera Delfines`,en:`Dolphin Breakwater Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAPBP5B15ksGhfQag9`,number:83,lat:20.579279,lng:-87.118597,name:{es:`Palapa Caleta`,en:`Palapa Cove`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta Playa`,en:``},extraCost:!0},{id:`-NzAPDHJ-QMq8DGWSCvw`,number:85,lat:20.577541,lng:-87.119619,name:{es:`Helados Escollera`,en:`Breakwater Ice Cream`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAPE0kZI_eDsuGgZI_`,number:86,lat:20.5779248,lng:-87.120148,name:{es:`Tienda Playa`,en:`Beach Tent`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta Delfines`,en:``},extraCost:!0},{id:`-NzAPEjMYJA9bVroczlQ`,number:87,lat:20.576947,lng:-87.121187,name:{es:`Tienda Salida de Rio`,en:`Rio Outlet Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPGa_5lWV6QOK1gOU`,number:89,lat:20.5834,lng:-87.119574,name:{es:`Bar Serpiente`,en:`Snake Bar`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAPHS5JL0nnT8pcNju`,number:90,lat:20.583995,lng:-87.11864,name:{es:`Dulcería La Adelita`,en:`Sweet shop La Adelita`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAPIBE_rV9YHx1UDez`,number:91,lat:20.584297,lng:-87.119314,name:{es:`Dulcería La Guadalupana`,en:`La Guadalupana candy store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAPIuKOWhenqkRLOqD`,number:92,lat:20.58359,lng:-87.119191,name:{es:`Dulcería La Quebrada`,en:`Sweet shop La Quebrada`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAPJcJSo28EhhEq2aY`,number:93,lat:20.583628,lng:-87.119296,name:{es:`Tienda El Mariachi`,en:`El Mariachi Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAPKN6AU-bwYCcZveW`,number:94,lat:20.583703,lng:-87.118811,name:{es:`Tienda El Pueblito`,en:`The Little Town Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAPL7GrVGfyaUXtZVC`,number:95,lat:20.580049828374204,lng:-87.1190576674938,name:{es:`Tienda Flamenco`,en:`Flamenco Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta del Río`,en:``},extraCost:!0},{id:`-NzAPLuKFvEcw8hU_Pj1`,number:96,lat:20.58401,lng:-87.119435,name:{es:`Tienda Los Mezcales`,en:`Los Mezcales Store`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAPM_z_rFXCTj_Prm9`,number:97,lat:20.583863,lng:-87.118725,name:{es:`Snack Jaguares`,en:`Jaguars Snack`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{id:`-NzAPNFHB6pd-vvvORu1`,number:98,lat:20.58416,lng:-87.119372,name:{es:`Snack venados`,en:`Deer Snack`},category:{es:`Tiendas`,en:`Shops`},route:{es:`Ruta México Espectacular`,en:``},extraCost:!0},{number:99,name:{es:`Bandera`,en:`Flag`},category:Nf,x:-176,z:-106},{number:100,name:{es:`Estacionamiento de coches`,en:`Car Park`},category:Nf,x:-195,z:15},{number:101,name:{es:`Estacionamiento de autobuses Xcaret`,en:`Xcaret Bus Parking`},category:Nf,x:-180,z:-164}],services:[{type:`wc`,x:109.4,z:339.5,note:`Cerca del muelle principal`},{type:`wc`,x:-77.1,z:350.4,note:`Cerca de Salida de Ríos`},{type:`wc`,x:-72.8,z:317.4,note:`Cerca de Albercas Naturales`},{type:`wc`,x:-69.8,z:239.4,note:`Cerca de Mariposario`},{type:`wc`,x:-137.5,z:83.2,note:`Cerca de Aviario`},{type:`wc`,x:104.6,z:63.8,note:`Zona central del parque`},{type:`wc`,x:163.8,z:73.5,note:`Cerca de Acuario de Arrecife`},{type:`wc`,x:257.4,z:104.3,note:`Cerca de Delfines Riviera Maya`},{type:`wc`,x:354.9,z:-7.3,note:`Cerca de Mundo de Niños`},{type:`wc`,x:189,z:-114.6,note:`Cerca de Entrada de Ríos`},{type:`wc`,x:182.8,z:-214.4,note:`Cerca de Xcaret Plus`},{type:`wc`,x:41.4,z:-114.4,note:`Cerca de Zona Arqueológica`},{type:`wc`,x:-19,z:-120.1,note:`Cerca de Hacienda Henequenera`},{type:`wc`,x:128.1,z:2.4,note:`Cerca de Foro Abierto`},{type:`wc`,x:54.9,z:-399.2,note:`Cerca de Xcaret México Espectacular`},{type:`wc`,x:297.7,z:-129.5,note:`Cerca de Entrada de Ríos Xcaret Plus`},{type:`wc`,x:135.3,z:86.8,note:`Cerca de Restaurante Michoacán`},{type:`first-aid`,x:-52.8,z:23.9,note:`Entre Pueblo Maya y Mariposario`},{type:`first-aid`,x:156.6,z:-374.1,note:`Cerca de Torre Escénica`},{type:`locker`,x:30.2,z:350.3,note:`Cerca de Albercas Naturales`},{type:`locker`,x:-49.6,z:306.7,note:`Cerca de Xpá`},{type:`locker`,x:133.6,z:310.3,note:`Cerca de Delfines Xcaret`},{type:`locker`,x:-37.1,z:-127.7,note:`Cerca de Plaza Principal`},{type:`locker`,x:163.9,z:150.6,note:`Cerca de Sea Trek`},{type:`locker`,x:285.7,z:-119.4,note:`Cerca de Entrada de Ríos / Xcaret Plus`},{type:`wheelchair`,x:-141.1,z:-180.4,note:`Cerca de la entrada del parque`},{type:`wheelchair`,x:19.8,z:148,note:`Zona central del parque`},{type:`ramp`,x:-57,z:354.4,note:`Pendiente pronunciada`},{type:`ramp`,x:-200.7,z:110.4,note:`Pendiente pronunciada`},{type:`ramp`,x:-111.4,z:323.2,note:`Pendiente pronunciada`},{type:`ramp`,x:18.4,z:274.7,note:`Pendiente pronunciada`},{type:`ramp`,x:14.6,z:246.5,note:`Pendiente pronunciada`},{type:`ramp`,x:-61.5,z:174.1,note:`Pendiente pronunciada`},{type:`ramp`,x:63.3,z:207.5,note:`Pendiente pronunciada`},{type:`ramp`,x:97.9,z:141.1,note:`Pendiente pronunciada`},{type:`ramp`,x:136.1,z:146.5,note:`Pendiente pronunciada`},{type:`ramp`,x:169.7,z:148.3,note:`Pendiente pronunciada`},{type:`ramp`,x:209.9,z:46.7,note:`Pendiente pronunciada`},{type:`ramp`,x:233.7,z:7.1,note:`Pendiente pronunciada`},{type:`ramp`,x:194.1,z:10.3,note:`Pendiente pronunciada`},{type:`ramp`,x:162.6,z:-19.4,note:`Pendiente pronunciada`},{type:`ramp`,x:310.1,z:-72,note:`Pendiente pronunciada`},{type:`ramp`,x:170.5,z:-427.3,note:`Pendiente pronunciada`},{type:`ramp`,x:75.5,z:-106.9,note:`Pendiente pronunciada`},{type:`ramp`,x:-174.6,z:84.7,note:`Pendiente pronunciada`},{type:`ramp`,x:-109.7,z:57.3,note:`Pendiente pronunciada`}]}),Ff=[{id:`faro`,type:`lighthouseSlides`,x:230,z:331,rotation:0,clear:12},{id:`entrada-palapa`,type:`roundPalapa`,x:159,z:-30,radius:9,tiers:2,clear:11,replacesOsm:[388137521]},{id:`llave-flotante`,type:`floatingFaucet`,x:-6,z:168,y:0,rotation:Math.PI/4},{id:`taquillas`,type:`ticketArcade`,x:117.3,z:-21.5,rotation:3.484,length:35,width:11,clear:16,replacesOsm:[388137519]},{id:`letrero`,type:`letters`,x:101.6,z:-36,rotation:3.484,text:`XELHA`,scale:.6,color:16052712,outline:2064324,base:`limestone`,ornaments:!0,clear:5}],If=[{kind:`flatten`,landmark:`faro`,size:60},{kind:`clearTrees`,at:[227.7,352],radius:17},{kind:`clearTrees`,at:[231.8,309],radius:15},{kind:`plant`,at:[228,340],polygons:[[[-20,-22],[-6,-32],[8,-22],[22,-14],[22,12],[10,34],[-18,34],[-23,5]]]},{kind:`pave`,landmark:`faro`,polygons:[[[7.2,21],[4.4,27.7],[-2.3,30.5],[-9,27.7],[-11.8,21],[-9,14.3],[-2.3,11.5],[4.4,14.3]],[[-21,-4],[-10,-4],[-10,16],[-21,16],[-21,10],[-32,10],[-32,6],[-21,6]]]},{kind:`plant`,cover:`lawn`,at:[343,481.4],polygons:[[[23.3,0],[22.9,4.8],[17.2,7.5],[14.6,10.6],[12.7,14.5],[7.8,14.7],[3.7,14.7],[0,15.4],[-3.5,14],[-8.3,15.7],[-15.6,17.8],[-19,13.7],[-18.5,8.1],[-18.1,3.7],[-15.2,0],[-14.6,-3],[-17.5,-7.7],[-15.5,-11.2],[-11.3,-12.9],[-8.9,-16.8],[-4.9,-19.4],[-0,-19.6],[5,-20.1],[8.4,-15.9],[8.4,-9.6],[11.1,-8.1],[16.2,-7.1],[19.5,-4]]]},{kind:`pave`,at:[343,481.4],polygons:[[[0,-4.2],[.1,-5.1],[.8,-7.1],[2.5,-9.2],[5,-10.1],[7.6,-9.3],[9.6,-6.8],[10.4,-3.4],[9.6,.2],[7.6,3.6],[5,6.7],[2.5,9.6],[.8,12],[.1,13.8],[0,14.4],[-.1,13.8],[-.8,12],[-2.5,9.6],[-5,6.7],[-7.6,3.6],[-9.6,.2],[-10.4,-3.4],[-9.6,-6.8],[-7.6,-9.3],[-5,-10.1],[-2.5,-9.2],[-.8,-7.1],[-.1,-5.1]]]},{kind:`ignoreRoofs`,at:[167.7,-16.4],radius:6},{kind:`ignoreRoofs`,at:[64,-117],radius:6},{kind:`ignoreRoofs`,at:[118,-88],radius:6},{kind:`ignoreRoofs`,at:[76,-72],radius:4},{kind:`ignoreRoofs`,at:[-86,-183],radius:8},{kind:`ignoreRoofs`,at:[-67,-173],radius:6},{kind:`ignoreRoofs`,at:[166,-54],radius:4},{kind:`ignoreRoofs`,at:[141,-42],radius:6},{kind:`ignoreRoofs`,at:[119,-32],radius:4},{kind:`ignoreRoofs`,at:[133,-22],radius:4},{kind:`ignoreRoofs`,at:[-3,52],radius:4},{kind:`ignoreRoofs`,at:[15,53],radius:4},{kind:`ignoreRoofs`,at:[14,67],radius:4},{kind:`ignoreRoofs`,at:[-8,88],radius:4},{kind:`ignoreRoofs`,at:[215,88],radius:3},{kind:`ignoreRoofs`,at:[-4,103],radius:3},{kind:`ignoreRoofs`,at:[178,291],radius:4},{kind:`ignoreRoofs`,at:[197,347],radius:4},{kind:`ignoreRoofs`,at:[-228,549],radius:4},{kind:`ignoreRoofs`,at:[-220,-296],radius:3},{kind:`ignoreRoofs`,at:[236,163],radius:7},{kind:`ignoreRoofs`,at:[206,369],radius:3},{kind:`ignoreRoofs`,at:[-277,593],radius:7},{kind:`ignoreRoofs`,at:[177,100],radius:8},{kind:`ignoreRoofs`,at:[-159,220],radius:4},{kind:`ignoreRoofs`,at:[223,442],radius:4},{kind:`ignoreRoofs`,at:[31,460],radius:4},{kind:`ignoreRoofs`,at:[290,480],radius:4},{kind:`ignoreRoofs`,at:[-385,588],radius:6},{kind:`ignoreRoofs`,at:[158,306],radius:8},{kind:`ignoreRoofs`,at:[347,494],radius:4},{kind:`ignoreRoofs`,at:[317,466],radius:3},{kind:`ignoreRoofs`,at:[243,610],radius:4},{kind:`ignoreRoofs`,at:[255,648],radius:4},{kind:`ignoreRoofs`,at:[261,662],radius:4},{kind:`ignoreRoofs`,at:[270,669],radius:4},{kind:`ignoreRoofs`,at:[289,685],radius:4},{kind:`keepRoofs`,at:[-221,186],radius:5},{kind:`keepRoofs`,at:[-221,233],radius:5},{kind:`keepRoofs`,at:[142,507],radius:5}],Lf=`#e8608f`,Rf=`#7fb7e6`,zf=`#f2c33a`,Bf=`#3a3f4a`,Vf=`#d9475e`,Hf=`#e9d48a`,Uf=Tf({key:`xh`,name:`Xel-Há`,labelKey:`lbl_map_prefix_xh`,landmarks:Ff,edits:If,vehicles:[{from:[-157.5,-244.3],to:[-154,-242.3],count:2,heading:-45,colors:[Lf,Rf]},{from:[-149.3,-239.5],to:[-131.6,-229.2],count:5,heading:-45,colors:[zf,Hf,Bf,Lf,Lf]},{from:[-125.5,-225.7],to:[-122.1,-223.7],count:2,heading:-45,colors:[Lf,Rf]},{from:[-115.5,-219.8],to:[-112.1,-217.8],count:2,heading:-45,colors:[Lf,Rf]},{from:[-105,-213.7],to:[-105,-213.7],count:1,heading:-45,colors:[Vf]},{from:[-97,-209],to:[-73.7,-195.4],count:8,heading:-45,colors:[Lf,Bf,Bf,Rf,Bf,Hf,Bf,Hf]},{from:[-64.2,-189.9],to:[-60.3,-187.6],count:2,heading:-45,colors:[Bf,Lf]}],activities:[{id:`-NzANpubpFHsypJ6LIIg`,number:1,lat:20.31854975,lng:-87.35607415,name:{es:`Dolphin Ride`,en:`Dolphin Ride`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANqp6GpDj_wvLH8aT`,number:1,lat:20.318579933750094,lng:-87.3561494113922,name:{es:`Dolphin Interax`,en:`Dolphin Interax`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANrYTqx8zDMSlen45`,number:1,lat:20.31847814739327,lng:-87.35614082837246,name:{es:`Dolphin Primax`,en:`Dolphin Primax`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANsHOQvjtGSpNanWY`,number:1,lat:20.31907859,lng:-87.35596318,name:{es:`Dolphin Trek`,en:`Dolphin Trek`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANt10GlHs7tHoEc4G`,number:2,lat:20.3155194,lng:-87.35584583,name:{es:`Sea Trek®`,en:`Sea Trek®`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANyycCpaeSYLaBAuy`,number:3,lat:20.317457744330966,lng:-87.35610781561782,name:{es:`Xpá Xel-Há`,en:`Xpá Xel-Há`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANtjh9ryWWeTuhoqY`,number:4,lat:20.31990173,lng:-87.35568658,name:{es:`Snuba® Cenote`,en:`Snuba® Cenote`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANuV1BsVNYgN8gL8Q`,number:5,lat:20.31662427,lng:-87.35627029,name:{es:`Snuba® Caleta`,en:`Snuba® Caleta`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANvIo1Qn14JV7BKKp`,number:6,lat:20.31960115,lng:-87.35906079,name:{es:`Encuentro con Manatíes`,en:`Manatee Encounter`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANw2EHnT3n83PzqRk`,number:7,lat:20.31600329,lng:-87.3559159,name:{es:`Encuentro con Rayas`,en:`Stingray Encounter`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANwmQ9Y37mWD_4RV_`,number:8,lat:20.31500469,lng:-87.35990569,name:{es:`Zip-Bike`,en:`Zip-Bike`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANxVne3MPxzdKX3Ru`,number:9,lat:20.31482358,lng:-87.35643156,name:{es:`Adrenalina`,en:`Adrenalina`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANks0Qe2yqReLp3fs`,number:11,lat:20.31507009097313,lng:-87.35447555780411,name:{es:`Vuela tu Papalote`,en:`Go Fly a Kite!`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANgISWAyImg6eEs1_`,number:12,lat:20.31421298,lng:-87.36183621,name:{es:`Río`,en:`River`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`}},{id:`-NzANpCkGE8G9u_f-SPu`,number:13,lat:20.31646014,lng:-87.35558331,name:{es:`Faro Mirador`,en:`Scenic Lighthouse`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`}},{id:`-NzAO2ywS8vffAJXHdUy`,number:14,lat:20.316815844360118,lng:-87.35533080123973,name:{es:`Meliponario`,en:`Melipona Bee Sanctuary`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAO2GryZrHRX7ptXJv`,number:16,lat:20.31696258,lng:-87.35585824,name:{es:`Vivero`,en:`The Plant Nursery`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANi-aI50Dt0h4XQaC`,number:17,lat:20.31844411,lng:-87.35769924,name:{es:`Mundo de los Niños`,en:`Children's Playground`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANij-wpATNfIF_hHI`,number:18,lat:20.3150682,lng:-87.35654287,name:{es:`Sendero de la Conciencia`,en:`Path of Conciousness`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAO-PGzgDq3UhXH4O9`,number:19,lat:20.31382655,lng:-87.35890388,name:{es:`Grieta Ixchel`,en:`Ixchel Grotto`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANzeo-xPssGCgpfOM`,number:20,lat:20.31430542,lng:-87.35804927,name:{es:`Cueva del Dorado`,en:`El Dorado Cave`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANjTE7hkwhowC_x0b`,number:22,lat:20.320596573088995,lng:-87.35945876687765,name:{es:`Tierra de Huh`,en:`The Land of Huh`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANoR8DVVyfohll3Kq`,number:23,lat:20.31385736,lng:-87.35862393,name:{es:`Vuelo del Chuc Kay`,en:`Rope Swing`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANmJzWGW-T5EcoRVE`,number:24,lat:20.31671168,lng:-87.36052595,name:{es:`La Quebrada`,en:`The Quebrada`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAO1_LLU_CtMVFFyaE`,number:26,lat:20.31753545,lng:-87.35963076,name:{es:`Muralla Maya`,en:`The Mayan Wall`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANnkfkvrQMmD6ceXG`,number:27,lat:20.3172072,lng:-87.36001164,name:{es:`Mundo de Aventura`,en:`World of Adventure`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANk9bL48hl6QR9ai0`,number:28,lat:20.31459311,lng:-87.36239579,name:{es:`Tren de la Jungla`,en:`Jungle Train`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANlaXpZ6LuSmRClwl`,number:29,lat:20.31483459,lng:-87.36116767,name:{es:`Piedra del Valor`,en:`Cliff of Courage`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANn2JJTOojXurAmFv`,number:30,lat:20.31536628,lng:-87.35614087,name:{es:`Puente Flotante`,en:`The Floating Bridge`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAO0q7BMwPWsi-QcAl`,number:33,lat:20.318173396746115,lng:-87.36083474010229,name:{es:`Jardín de los Chacahs`,en:`Chacah's Garden`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAO3i-n8bWXF-mRYne`,number:35,lat:20.31564014,lng:-87.35761441,name:{es:`Bahía de los Caprichos`,en:`Caprices Bay`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzANyDsDWqIbjM7OIPD`,number:36,lat:20.316023413006025,lng:-87.35592998564243,name:{es:`Rayas Kids`,en:`Stingray Kids`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzANf57f3wzcZ-uH5It`,number:37,lat:20.315374764781115,lng:-87.36082602292299,name:{es:`Caleta`,en:`Inlet`},category:{es:`Actividades Esenciales`,en:`Must-Do Activities`}},{id:`-NzAO07qNWzf5278am7z`,number:39,lat:20.314561042271546,lng:-87.36215472221375,name:{es:`Manglares`,en:`Mangroves`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAO57FEtjT0qSwntIk`,number:40,lat:20.3176162526133,lng:-87.35724426805973,name:{es:`Restaurante Xula Vista`,en:`Xula Vista Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`}},{id:`-NzAO6-jkoPcY2FaAwl3`,number:41,lat:20.317958080483898,lng:-87.35666162665831,name:{es:`Restaurante La Cocina del Pueblo`,en:`La Cocina del Pueblo Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`}},{id:`-NzAO6kk72XN9rwcUUPr`,number:42,lat:20.318071899666215,lng:-87.35719129443169,name:{es:`Restaurante La Terraza`,en:`La Terraza Restaurant`},category:{es:`Restaurantes`,en:`Restaurants`}},{id:`-NzAO8DIGVhyptjaTM1x`,number:44,lat:20.317493630328286,lng:-87.35637791454792,name:{es:`Bar del Puente`,en:`Bar del Puente`},category:{es:`Restaurantes`,en:`Restaurants`}},{id:`-NzAO8y1We2o3KH-WRhQ`,number:45,lat:20.317526,lng:-87.357024,name:{es:`Bar Xula Vista`,en:`Xula Vista Bar`},category:{es:`Restaurantes`,en:`Restaurants`}},{id:`-NzAOAQBYJ0ONxrpsQnJ`,number:47,lat:20.316899435931862,lng:-87.35602626849057,name:{es:`Bar del Pueblo`,en:`Bar del Pueblo`},category:{es:`Restaurantes`,en:`Restaurants`}},{id:`-NzAOB7H5rKTGpudVCdz`,number:48,lat:20.31752067,lng:-87.35652845,name:{es:`Fish Therapy`,en:`Fish Therapy`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzAOBph9ZpIUuRo7bh2`,number:49,lat:20.3194911,lng:-87.35823166,name:{es:`Selva de las Hamacas`,en:`Hammock Jungle`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAOCRLvU8WO2-BSQgD`,number:50,lat:20.316065041295772,lng:-87.35836507924755,name:{es:`Power Xnorkel`,en:`Power Xnorkel`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0},{id:`-NzAOD6s8X5Ym8xYKYam`,number:51,lat:20.31418939478716,lng:-87.35856223851442,name:{es:`Cenote Aventura`,en:`Cenote Aventura`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAODqsZNuhapoSQkY3`,number:52,lat:20.314431814694167,lng:-87.36067347228527,name:{es:`Cenote Paraíso`,en:`Cenote Paraíso`},category:{es:`Atractivos por Descubrir`,en:`Attractions`}},{id:`-NzAOFulibpxdsbFivJA`,number:54,lat:20.317348,lng:-87.356421,name:{es:`Sea Trek® Discover`,en:`Sea Trek® Discover`},category:{es:`Actividades Extraordinarias`,en:`Dream Activities`},extraCost:!0}],sources:{code:`xh`,mapFrame:{latitude:20.31939,longitude:-87.3578,bound1Lat:20.32212,bound1Long:-87.35395,bound2Lat:20.31409,bound2Long:-87.36194},illustration:{nodeScale:55,nodeTranslation:[2.6017372608184814,0,4.543321132659912],sceneScale:25.5,scenePosition:[-60,-78,-120],masks:[[.485,.13,.66,.222]]},waterHueMin:160,osmBBox:[-87.37,20.31,-87.348,20.327],entrance:{x:140,z:-14}}}),Wf={es:`Atracciones`,en:`Attractions`},Gf={es:`Restaurantes`,en:`Restaurants`},Kf={es:`Servicios`,en:`Services`},qf=[{number:1,name:{es:`Tirolesas`,en:`Zip-lines`},category:Wf,extraCost:!1,x:128,z:21},{number:2,name:{es:`Vehículos anfibios`,en:`Amphibious vehicles`},category:Wf,extraCost:!1,x:40,z:-30},{number:3,name:{es:`Toboganxote`,en:`Toboganxote`},category:Wf,extraCost:!1,x:-20,z:72},{number:4,name:{es:`Hamacuatizaje`,en:`Hammock splash`},category:Wf,extraCost:!1,x:238,z:-36},{number:5,name:{es:`Balsas`,en:`Rafts`},category:Wf,extraCost:!1,x:150,z:232},{number:6,name:{es:`Nado en río de estalactitas`,en:`Stalactite river swim`},category:Wf,extraCost:!1,x:-82,z:222},{number:7,name:{es:`Expedición subterránea`,en:`Underground expedition`},category:Wf,extraCost:!1,x:-440,z:215},{number:8,name:{es:`Restaurante El Troglodita`,en:`El Troglodita Restaurant`},category:Gf,extraCost:!1,x:244,z:21},{number:9,name:{es:`Fuente de sodas El Manantial`,en:`El Manantial soda fountain`},category:Gf,extraCost:!1,x:108,z:58},{number:10,name:{es:`Fuente de sodas El Oasis`,en:`El Oasis soda fountain`},category:Gf,extraCost:!1,x:-195,z:105},{number:11,name:{es:`Entrada`,en:`Entrance`},category:Kf,extraCost:!1,x:12,z:-150},{number:12,name:{es:`Estacionamiento`,en:`Parking`},category:Kf,extraCost:!1,x:-45,z:-135},{number:13,name:{es:`Casilleros`,en:`Lockers`},category:Kf,extraCost:!1,x:162,z:40},{number:14,name:{es:`Tienda La Triquecueva`,en:`La Triquecueva shop`},category:Kf,extraCost:!1,x:150,z:56},{number:15,name:{es:`Tienda Hasta la Vista`,en:`Hasta la Vista shop`},category:Kf,extraCost:!1,x:20,z:-128},{number:16,name:{es:`Foto Pase`,en:`Photo Pass`},category:Kf,extraCost:!0,x:176,z:24},{number:17,name:{es:`Sanitarios`,en:`Restrooms`},category:Kf,extraCost:!1,x:178,z:48}],Jf=Math.PI/180,Yf=[[`torre-acceso-1`,-106,-85,{replacesOsm:[1428097073]}],[`torre-acceso-2`,-132,-69,{height:28,replacesOsm:[1428097072]}],[`torre-noreste`,268,-286,{replacesOsm:[1427360668,1454412294,1454412295]}],[`torre-este-1`,496,-102,{height:32}],[`torre-este-2`,425,-79,{replacesOsm:[1428204958]}],[`torre-hamaca`,258,-62,{height:32,radius:3.8,replacesOsm:[1428204957]}],[`torre-plaza-1`,123,17,{height:32,radius:3.6,replacesOsm:[1428204922]}],[`torre-plaza-2`,132,25,{height:36,radius:3.8,spiral:!0}],[`torre-oasis`,-208,94,{replacesOsm:[1428097066]}],[`torre-oeste`,-398,147,{replacesOsm:[1428097071]}],[`torre-espiral-oeste`,-454,202,{height:40,radius:4.4,spiral:!0,roof:!1,replacesOsm:[1428097070]}],[`torre-espiral-sur`,140,241,{height:40,radius:4.4,spiral:!0,roof:!1}],[`torre-sur`,-172,343,{replacesOsm:[1428097076]}]],Xf=[[`torre-acceso-1`,`torre-noreste`,`torre-este-1`,`torre-este-2`,`torre-hamaca`,`torre-plaza-2`],[`torre-acceso-2`,`torre-oasis`,`torre-oeste`,`torre-espiral-oeste`,`torre-sur`,`torre-espiral-sur`,`torre-plaza-1`]],Zf=e=>e.height??30,Qf=new Map(Yf.map(([e,t,n,r])=>[e,{x:t,z:n,o:r}])),$f=e=>Xf.flatMap(t=>{let n=t.indexOf(e);if(n<0||n===t.length-1)return[];let r=Qf.get(t[n+1]);return[[r.x,r.z,Zf(r.o)-6]]}),ep=Tf({key:`xp`,name:`Xplor`,labelKey:`lbl_map_prefix_xp`,activities:qf,landmarks:[...Yf.map(([e,t,n,r])=>({id:e,type:`zipTower`,x:t,z:n,clear:(r.radius??3.2)+5,height:30,radius:3.2,cables:$f(e),...r})),{id:`toboganxote`,type:`toboganxote`,x:-20,z:72,clear:14,replacesOsm:[1454442145,1454442146,1454442147,1427348704],tower:[-32,-16],sphere:[0,0,10],funnels:[[-13,-32,9],[37,-18,7.5]],path:[[-32,41,-16],[-25,35,-28],[-13,27,-32],[-3,21,-16],[2,18,-2],[16,13,-8],[37,9,-18],[47,5,6],[52,3,18],[58,.6,32]]},{id:`troglodita`,type:`pyramidGrid`,x:244,z:21,rotation:45*Jf,clear:26},{id:`plaza-palapa`,type:`longPalapa`,x:158,z:47,length:24,width:9,rotation:34*Jf,clear:14},{id:`plaza-palapa-norte`,type:`roundPalapa`,x:159,z:7,radius:4.5,tiers:2,clear:7},{id:`palapa-manantial`,type:`roundPalapa`,x:108,z:58,radius:4.5,tiers:2,clear:7},{id:`cueva-rio-1`,type:`caveEntrance`,x:-95,z:225,radius:3.5,clear:6},{id:`cueva-rio-2`,type:`caveEntrance`,x:-65,z:225,radius:3,stairs:!1,clear:6},{id:`acceso-palapa`,type:`longPalapa`,x:14,z:-140,length:16,width:8,rotation:-70*Jf,clear:10},{id:`estacionamiento`,type:`parkedCars`,x:-45,z:-135,rows:[{from:[-58,-150],to:[-43,-113],count:6,heading:-23},{from:[-45,-156],to:[-21,-116],count:7,heading:-30},{from:[-70,-156],to:[-62,-114],count:4,heading:-10}]}],edits:[{kind:`pave`,surface:`dirt`,at:[0,0],width:3.5,lines:`-117,-82.5 -119.5,-80 -118,-76 -114,-72 -111,-72(582.5,-221 593,-224(-262.5,226 -263,231(-60.5,222 -67.5,219 -69.5,220 -74.5,232 -72.5,237(195.5,139 192.5,151 198,159 197.5,165.5(139.5,-259 137.5,-264.5 127,-274 126,-278(139.5,-259 153,-262.5(139.5,-259 127,-250.5(272.5,-275 268,-278 268,-287(576,-37 572.5,-30.5 552.5,-13(-111,68 -119.5,69(140.5,-60.5 147.5,-67(152.5,-101 150,-112(114,-202.5 115,-207.5 120,-210.5 121,-215 124.5,-217.5 151,-216(112.5,66 110.5,60.5(309.5,-222 305.5,-222 296,-214(79,-6 92,-8 94,-10(5,-14 12.5,-19 18,-19 22.5,-21 35.5,-41(89,29 99,27.5 108,33(-95.5,285.5 -104,279 -110.5,277.5 -121,272 -127,265 -129.5,254 -135.5,246 -149.5,235.5 -152.5,229.5(238,-6 235.5,-4.5 228,-4(70,-94.5 75.5,-100 83,-104 97,-103(-19.5,330 -20,322.5 -17.5,320 -5.5,318(97.5,-102.5 100.5,-95(205,129.5 213,128(134.5,74.5 113,67(535,-60.5 523,-58(80.5,26 80.5,18(-95,187.5 -100,179.5 -108,180 -115.5,183 -120.5,182(522.5,-54.5 523,-58(-59.5,95.5 -65,91 -67,79(167.5,222 182,226 188,230.5 187.5,237.5 182,240.5(124,194.5 128,199 131,199(167,-165.5 178,-168 195.5,-179(3,324 3,321 -5,318(-213,94.5 -214,96 -210.5,99.5 -204.5,100.5(452.5,-86 450,-78(404,-40 405,-27 410,-20 412,-20.5(85,-164 83,-165.5 85.5,-174 85,-180.5 90,-185(152.5,-42.5 150.5,-26(-307,118 -318,109 -322.5,107.5 -332.5,97(-267,133 -275.5,131 -279,134 -284.5,134(105.5,-141 112,-142.5(131,319 128,309.5(-90,247 -82,245(181,-39 185.5,-41(-255,202 -253,194.5 -241,187.5(364,-92 371,-99 371,-103 355.5,-127(-173,-7.5 -160.5,-17.5 -147.5,-19.5 -140,-17(193,-156 189.5,-154 180.5,-137.5 180.5,-116 187.5,-103 184.5,-92.5 185.5,-82 169,-66 163,-57 161,-46(85.5,156 81,159(530,-47 528,-47 522.5,-54(562.5,-98 569,-91(604.5,-140 597,-136(-380,183 -379,195 -369.5,210.5(535.5,-202.5 543,-206 551,-215 559.5,-235(514,-152 522,-152.5(67.5,-212.5 79,-209.5(217.5,117.5 215,120.5 214,127.5(219.5,194 220,186 209.5,174(-27.5,-10.5 -15.5,-15 -5.5,-14.5(145,77 137,73(145,77 136,82.5(341,-328 334.5,-324.5(284.5,-146 278,-148 269.5,-159 266,-163 266,-172.5 264,-175 250.5,-182.5 238,-186 230.5,-199 226,-200.5 217,-195.5 210,-199 199,-199(-128,132 -132.5,124.5(213,112 218,117(-150,182.5 -148,173 -145.5,170(-257,249.5 -250.5,251 -245.5,244.5 -242,244(-189.5,268 -189.5,264 -197.5,257 -221,253 -230,257 -242.5,269(228,152 227,156 221,160.5 220,165 210,170.5(263,-56 259,-59(-174.5,35 -164,9(154.5,114 160,105 167.5,104(-203,22 -200.5,52(242.5,-305 268,-287(169.5,-39.5 162,-45.5(17,134 9,140.5 4,148 2,157.5(272,-42.5 275.5,-43 279,-46(-82,91 -90,79 -94.5,60.5(59,30.5 61,26 61,21(151,-282 159,-279.5(292,-64.5 286,-65.5 275,-60 273,-57(135,75 135.5,82.5(-95,60 -95,52.5 -90.5,51(490.5,-33 482,-39(275.5,97 273,101(306,72 300.5,69.5 302.5,59 312,52.5 317.5,45(-233,284.5 -238,289.5(52,383 56,377 63,376 77,367.5(52,383 42,392.5 35,402.5(-150,204 -159.5,194(331,-89 342,-90(264.5,-56 272.5,-56(127,-2 134.5,-3(5,340.5 2.5,347 -0.5,349(18,134 25.5,135.5(-99,208 -95,214.5 -95,222(362.5,-205 367,-204 378,-207.5(-3,235.5 -9,234.5(334,-47.5 315,-42 300,-46 284,-44.5(-130.5,229.5 -123,230.5(57.5,162.5 58,154(-195.5,133 -202.5,144.5(472,35.5 467,36(78,367.5 82,369 84,372 93,399.5 99.5,410.5(153,-202.5 154,-192.5(79.5,-210 85,-224.5(475.5,2 482.5,-4.5(262.5,105.5 244,104.5(169,172 160,176(-384.5,171 -380,182(-14,-58 -13,-63(578,-113 587,-122(435.5,-87.5 425.5,-90(-6,430.5 -7.5,423 -10,420.5(139.5,243 132,234 127,231(588,-192.5 593,-179.5 604.5,-173 607,-167.5(154,-263 154.5,-269 159.5,-274 159.5,-279(-80.5,302 -81,298 -84,295.5 -87,295.5(-322.5,157 -309.5,147(-145.5,168 -152,169.5 -157.5,173(48,-122 40,-112(-437.5,205 -448,210.5(52,172 57.5,163(419.5,-59.5 408,-67 397.5,-68 387.5,-62.5 383,-54 380,-53 346,-22 327,-25 319.5,-23 314.5,-12.5 317,-2.5 324.5,7(119.5,262.5 121,265 121,270 118,274 114,273(124.5,-40 134,-30.5 134.5,-24.5(57.5,-14.5 57,4 53,5.5(174.5,14 172,7.5(175,39.5 167.5,40 158,50(-77,-72.5 -68,-74.5(210,-66 219,-69.5(594,-224.5 602,-232 604.5,-237.5(575.5,-200.5 580.5,-194.5 587.5,-193(87,288 85.5,317.5 82.5,322.5 84,327(319.5,15.5 324,7.5(-76,247.5 -67,259(536,-84.5 537,-75.5(-111,-51 -115.5,-41(145.5,188 154,194(-4,-14 4,-14(159,-315.5 160.5,-317.5 174,-315 179,-316(117,-122 123,-122 127,-125 127.5,-134(117,-122 105,-112.5 97.5,-104(127,-250.5 116,-253 108,-259(343,-135.5 332.5,-132.5 324.5,-132.5 321,-135(489.5,34 491,30.5 499.5,29 504.5,24 507,18(88,29 81,27(49,290 35.5,285 29,277.5 27.5,272.5(-49,329 -52,326 -54,319 -56,316 -64.5,315 -67.5,312 -69.5,305.5(212.5,-239.5 211,-230(229.5,-316 235,-314.5 238,-315.5(218,-117 220.5,-124 220.5,-131(-299,129.5 -305.5,126 -306,119(340.5,-160.5 332,-155.5(122.5,47.5 119.5,52 114,54 110.5,59.5(166,-165.5 157.5,-179.5(91,126 87,130(-164,127 -160,134.5(2,-70.5 -4,-74.5(25.5,-45 31,-44.5 35.5,-41(432,-76 420,-76(307.5,-167.5 302,-170(305.5,-286 304,-281(-287.5,136 -296,134 -298,130(-424,169.5 -412.5,166(81,17 90,10.5(79,223 63,217 46,220 42.5,215 42,206(167,-142.5 168,-129.5 166,-127.5 166,-120.5 162.5,-115.5 150.5,-112.5(432.5,-75.5 432,-68(248,144 249.5,134 243,129 239.5,130(554.5,-266 555,-255(225.5,-109.5 218,-116(213,-22 207.5,-17 208,-3 204.5,4.5(507,17.5 500.5,8 484,-4.5(156,-22.5 162,-20.5(-205,71 -205,60.5 -200.5,52(271,-197 273,-190.5 277.5,-186 291,-179.5 299,-173(283,-321 264,-319(52.5,305.5 45,314.5 39,318 32,318 29.5,325.5(424.5,-90 421,-89.5 412.5,-93 403,-87.5 366,-77(179.5,-320.5 174.5,-327(179.5,-320.5 186,-327.5 204,-327.5(175,14.5 182,15 187,19.5(-115,55.5 -110,50(-7.5,371 -6,375 -8,383 -0.5,387 4,385(595.5,-214.5 590.5,-209 580.5,-209.5(555.5,-77.5 564,-77.5(190,-314.5 181,-315.5(151,-282.5 152.5,-289 151,-294.5(295.5,-87 319,-88(10.5,292 15,288(-319.5,192 -326,190 -332.5,191 -342.5,190 -352,199(110,-175 110.5,-170 105.5,-167 106,-159.5(116,-282 125.5,-279(337,91 331,90.5(109,-14 118,-11(114,-202 117,-198 118,-189.5(165.5,-227.5 171,-231(-454.5,227.5 -447.5,235 -444,235.5(-219.5,277 -211,275.5(154.5,114.5 155,124 159,129.5(196,-224.5 196,-227.5 210.5,-229.5(90.5,-185.5 99.5,-188 104,-195.5 109.5,-201 113,-202(463,-23 470.5,-17 478,-15(564.5,-77 570.5,-75 576,-75.5(239,-100.5 254.5,-92 264.5,-89 278,-91 284,-85(137.5,-161 136,-152 129,-144.5(387,30.5 382,30.5 370,24 362.5,24 359,16 355,14(209,174 202,182.5 196,184(-397,195.5 -398,185 -409.5,174.5 -412.5,166(140.5,106 132.5,98(160,-279.5 163,-280 175,-294(189,133 178,136(306,42 314.5,40.5 317.5,44(202.5,-79 202,-84.5(51,-205 42.5,-205.5 36,-199(-195.5,9 -188,5(355,-142.5 356,-140.5 374,-137(95.5,152 89.5,155.5(249.5,79 247,85.5(288,35 293,9(39,200.5 35,197.5 26,197(-33,300 -37,297.5 -43,299.5(-134.5,144 -145,142.5(39,177 21,177.5(15.5,412.5 6,413 0.5,417 -6,417.5 -10,420(125.5,15 133,18 139.5,24.5 150,26 156,24.5(209.5,-354 206,-350.5 205,-345(-39.5,339.5 -25,342(326,-113 317.5,-115 299,-110.5(552,-285.5 550,-285.5 545,-278 548,-270.5 554,-267(190,133 195.5,138(17.5,-99.5 25,-100 34.5,-109.5(-172,110 -180,104 -187,101(265.5,72 252.5,67.5 245.5,63 240,63(-385,171 -404,162 -410,162.5 -412.5,166(-192,274.5 -192,279 -184.5,279.5(31,-134 39.5,-135 48,-122.5(145.5,-147 150,-150.5 159,-153(524.5,-182 517,-178(160.5,-45.5 153,-43(17,412.5 20.5,412 35,402.5(135.5,83 132,89.5(-416,194.5 -419.5,193 -428,183(315.5,84.5 315,91(150.5,-295 137,-297.5 135.5,-299.5(20.5,178 15.5,189.5(132,98 127,102 117.5,103 106,108 102.5,107(167,221 162,214(-10.5,420.5 -17,423 -19.5,433(340.5,-261 323,-249.5 323,-243 325.5,-237 329,-234 339,-230.5 360.5,-237(479,-115.5 468,-105.5 465.5,-106(597,-82.5 592,-80 584,-81(-93,-14.5 -102.5,-15.5 -109.5,-10 -119.5,-10.5(-95.5,222.5 -99,225 -100,230.5 -105,232.5 -115.5,221(-87.5,367.5 -109,344.5(132.5,266 132.5,259.5 140,245.5(-124.5,-69 -132.5,-69.5 -134.5,-65(198,166 205.5,167.5 209,170.5(463,-24.5 481,-39(78,-5.5 77,8(272,-197.5 279,-204 285,-204.5(196,-179 206,-176(-560,244.5 -549,241 -533,240 -517.5,241 -510,246 -488,247.5(-444,235.5 -440,226(479,-14.5 483,-5(524.5,5.5 522.5,9.5 507.5,17.5(83,168 80.5,174 82,178(108,-259 110,-269.5 108,-272 105,-272(108,-259 91,-259.5(212.5,111 202,105.5(-218,201 -224.5,201(354,14 349,15.5 343,22(-4.5,284.5 -4.5,290.5(594,-224 596,-215.5(584.5,-165 580,-159.5(-59,96 -47.5,112.5 -45,115 -40,115(314,-292.5 315.5,-294.5 328,-294 331,-295.5(279,-47 273,-56(160.5,182 161,187 154,194(101,243 112.5,244 122,241 127,244.5 139,244(494.5,-104.5 495,-100 500.5,-97.5 505.5,-98 517.5,-104 523,-113 530.5,-114(-133,170.5 -142,172 -145,169.5(-10,183 -14.5,180.5 -18,181(112.5,67.5 109.5,72.5 104,75 90,64.5 81,64(295,-4.5 287,-12.5 282,-22 283,-27(166,-165 159.5,-154(-125.5,150 -124,157(19.5,371 26,366 35,350 41,344.5(577.5,-75.5 582.5,-80.5(218,-335.5 207,-333 204.5,-328(42.5,-193 41,-192.5 36,-197.5(14.5,123 17.5,133(271,54 270.5,49 281,42.5 287.5,35.5(90,111 82.5,112 81,114(204.5,129 198,124.5(-9,183 0,182.5 11,174.5 20,177.5(588,-193 590,-195.5 595,-195(341,-276 350,-278(196,138 202.5,134.5 204.5,129.5(92,-237 95,-242.5(387.5,30.5 397.5,32 405.5,29.5 427.5,14.5 441,-0.5(250,-215.5 241,-224.5 228,-224.5(111,92 117.5,93 125,88 131,89.5(242.5,104.5 240,102.5 217.5,102(279.5,-46 283,-44.5(432,-67.5 427,-61 420,-59.5(172,7 175.5,-5(535.5,-92 549.5,-92.5 554,-97 562,-99(-440,226 -449,211(-440,226 -435.5,228 -428,227.5(50,-29 52,-22.5 57.5,-15(343,22.5 339.5,37 338,56 331,64 330,72 325,78(542.5,-315.5 542.5,-321 526,-339 517.5,-343 505.5,-343 494,-337.5 485,-318 467.5,-306 468,-297 464.5,-292(491,-32.5 494.5,-25.5 505,-27.5(209.5,-143 214.5,-145(-449.5,210.5 -472.5,189(292,-267 296,-274.5(62.5,47.5 65.5,54(217,102.5 216,107 213,110.5(300,-322.5 305,-325.5 314,-327(150,177.5 147,175 139,177.5(-294.5,121 -298,129(-397,196 -382,211 -371,214(58,163 69,162.5(464,-45.5 454.5,-54.5 446,-66 439.5,-65 432.5,-67.5(325,7.5 335,18 342.5,22(519.5,-21 525,-20.5(-153,229 -165.5,227.5(157.5,5 171,7.5(271,-197.5 261,-205(455.5,-284 451,-282 440,-270 430,-255.5 415,-247 402.5,-236 392.5,-234.5 378,-238 362,-237(228,150.5 227,142 214,128(-203,82 -200,86(354.5,13 352,4(198,124.5 192.5,127 189.5,132.5(-452.5,186 -446,185 -442,177.5(587,-100.5 597.5,-101(-5.5,431 5,432 10,428 15.5,422 16,413(158,-182 167.5,-185(420,-59 421,-50.5 427.5,-50 433,-40.5 436,-40.5 442,-35 451,-31 460.5,-24(79.5,-209 83,-205.5 94.5,-202(390,-209 392,-210.5 400.5,-211(385.5,24 385,18(268,-287 278,-287.5(46,-220.5 51,-220 56,-224 67,-224.5(391,-1 399,-3(559,-274.5 554.5,-267.5(148,-22.5 149,-19 145.5,-12.5(524.5,-92 520,-88 506,-82.5 494.5,-70.5 494,-60.5 490,-47.5(140.5,50 148,54.5 157.5,50.5(30,326 36,331(222.5,-159.5 217.5,-166 212.5,-169.5 212,-175.5(-166,227 -172,217.5 -172.5,210.5 -178,200(27,135.5 35,135 42.5,137 45.5,135.5(109.5,-90.5 100.5,-94.5(292.5,8 277.5,5.5(332,-215.5 344.5,-212.5(-67,75.5 -58,55(-75,280.5 -69,282(9.5,367.5 7,366 7,364(519,-132 523,-136 526,-144 526,-149 522,-152.5(-348,88 -361,88 -367,91(-76,246 -73,237.5(102,285.5 109.5,296 117,302(-214,121 -210.5,128(11,274 12,272 7.5,269 5.5,262 -0.5,252(204,5 195,3(265,119 262.5,121 252.5,122.5(50,-29.5 40,-39.5 35.5,-41(-87.5,-59 -83,-52 -84.5,-49(-109.5,144 -117.5,140(149.5,-54.5 149.5,-47 152.5,-43(446,-13 456,-19 460.5,-24(-287,137 -285,148(151,-92.5 148,-86 148,-79.5(166,-143 159.5,-153(344.5,-50.5 349.5,-54.5 357.5,-57 361,-69 366,-77(204.5,-327 210,-323 216,-323(176,-5.5 187.5,-4 193,1(474,-84 478,-80(168,104 171,115(187,164.5 197,166(459,-107.5 437,-87.5(30.5,-133 29,-125.5 34.5,-109.5(226,-24 222,-29 226,-35.5 225.5,-38 239.5,-47.5 247,-49 258,-59(295,-4 293,8(196,-179.5 198,-198(22.5,259.5 15,255(192.5,-346 190,-344 191,-339.5(-53,2.5 -58,10(67.5,-213 67.5,-224(67.5,-225 73,-233 80.5,-251 90,-259.5(-6,431 -14.5,435 -19.5,433(-52,2.5 -42,10 -42,16 -49,17.5 -56,14.5 -58,11(152,205 150.5,200.5 154,194(-268,203 -274,203(535.5,-60.5 541,-55 540.5,-49(118,-189.5 125,-185 132.5,-171(-19.5,433 -30.5,434.5(34.5,-109.5 39.5,-111(-178,160 -171,166 -167,167(489.5,-47 482,-39.5(-384.5,170.5 -384.5,162.5 -388,154.5 -399,152 -402.5,149 -400,138(99,-34 99,-40(132,90 132.5,97.5(490.5,-47 494.5,-46 499,-39.5 496,-35.5 491,-33(553,-171 562,-174.5 569,-173(-262.5,226 -268,203(-263,231 -257,249.5(272.5,-275 292,-267(-111,68 -95,60(147.5,-67 148,-79.5(152.5,-101 151,-92.5(151,-216 165.5,-227.5(309.5,-222 332,-215.5(296,-214 285,-204.5(94,-10 109,-14(108,33 122.5,47.5(-95.5,285.5 -87,295.5(228,-4 208,-3(-19.5,330 -25,342(-95,187.5 -99,208(-120.5,182 -133,170.5(-67,79 -67,75.5(131,199 150.5,200.5(3,324 5,340.5(-213,94.5 -203,82(-204.5,100.5 -187,101(452.5,-86 459,-107.5(450,-78 446,-66(85,-164 106,-159.5(150.5,-26 148,-22.5(-332.5,97 -348,88(-284.5,134 -287.5,136(112,-142.5 129,-144.5(128,309.5 117,302(-82,245 -76,246(181,-39 169.5,-39.5(364,-92 342,-90(355.5,-127 343,-135.5(-173,-7.5 -188,5(-140,-17 -119.5,-10.5(193,-156 212.5,-169.5(85.5,156 89.5,155.5(81,159 69,162.5(530,-47 540.5,-49(569,-91 582.5,-80.5(597,-136 587,-122(535.5,-202.5 524.5,-182(559.5,-235 555,-255(334.5,-324.5 314,-327(-128,132 -117.5,140(-150,182.5 -159.5,194(-242,244 -221,253(-189.5,268 -192,274.5(-203,22 -195.5,9(242.5,-305 235,-314.5(169.5,-39.5 181,-39(2,157.5 11,174.5(-82,91 -59,96(59,30.5 62.5,47.5(61,21 57,4(273,101 262.5,105.5(306,72 315.5,84.5(-233,284.5 -219.5,277(331,-89 319,-88(342,-90 364,-92(127,-2 109,-14(134.5,-3 145.5,-12.5(5,340.5 3,324(-0.5,349 -7.5,371(-99,208 -95,187.5(362.5,-205 344.5,-212.5(378,-207.5 390,-209(334,-47.5 344.5,-50.5(-130.5,229.5 -149.5,235.5(-123,230.5 -105,232.5(58,154 45.5,135.5(472,35.5 489.5,34(153,-202.5 151,-216(154,-192.5 158,-182(85,-224.5 92,-237(262.5,105.5 273,101(169,172 187,164.5(160,176 150,177.5(-13,-63 -4,-74.5(578,-113 562.5,-98(587,-122 597,-136(-80.5,302 -67.5,312(-87,295.5 -104,279(-309.5,147 -296,134(-437.5,205 -419.5,193(52,172 39,177(119.5,262.5 112.5,244(134.5,-24.5 145.5,-12.5(-77,-72.5 -87.5,-59(-67,259 -69,282(536,-84.5 535.5,-92(537,-75.5 535.5,-60.5(-111,-51 -111,-72(145.5,188 139,177.5(159,-315.5 150.5,-295(179,-316 181,-315.5(127.5,-134 129,-144.5(343,-135.5 356,-140.5(27.5,272.5 22.5,259.5(-49,329 -39.5,339.5(-69.5,305.5 -81,298(229.5,-316 216,-323(220.5,-131 214.5,-145(332,-155.5 321,-135(157.5,-179.5 154,-192.5(91,126 102.5,107(-164,127 -172,110(-160,134.5 -145,142.5(420,-76 408,-67(302,-170 299,-173(305.5,-286 314,-292.5(304,-281 296,-274.5(-424,169.5 -442,177.5(90,10.5 94,-10(42,206 39,200.5(239.5,130 227,142(555,-255 559.5,-235(225.5,-109.5 239,-100.5(213,-22 222,-29(156,-22.5 150.5,-26(162,-20.5 176,-5.5(-205,71 -203,82(299,-173 302,-170(283,-321 300,-322.5(-115,55.5 -119.5,69(-7.5,371 -0.5,349(4,385 19.5,371(555.5,-77.5 537,-75.5(190,-314.5 210,-323(181,-315.5 179,-316(295.5,-87 284,-85(319,-88 331,-89(10.5,292 -4.5,290.5(15,288 29,277.5(-352,199 -369.5,210.5(110,-175 99.5,-188(106,-159.5 105.5,-141(331,90.5 315,91(109,-14 94,-10(118,-11 127,-2(165.5,-227.5 151,-216(-219.5,277 -233,284.5(-211,275.5 -192,274.5(159,129.5 178,136(239,-100.5 225.5,-109.5(284,-85 286,-65.5(137.5,-161 132.5,-171(129,-144.5 127.5,-134(140.5,106 154.5,114(175,-294 181,-315.5(178,136 159,129.5(306,42 288,35(202.5,-79 210,-66(202,-84.5 187.5,-103(51,-205 67.5,-212.5(-195.5,9 -203,22(-188,5 -173,-7.5(355,-142.5 340.5,-160.5(89.5,155.5 85.5,156(249.5,79 252.5,67.5(247,85.5 240,102.5(39,200.5 42,206(26,197 15.5,189.5(-43,299.5 -56,316(-134.5,144 -125.5,150(-145,142.5 -160,134.5(39,177 52,172(156,24.5 174.5,14(205,-345 207,-333(-39.5,339.5 -49,329(-172,110 -164,127(-187,101 -204.5,100.5(-192,274.5 -189.5,268(145.5,-147 129,-144.5(524.5,-182 535.5,-202.5(-416,194.5 -397,196(-428,183 -442,177.5(315.5,84.5 306,72(102.5,107 90,111(162,214 152,205(340.5,-261 350,-278(465.5,-106 459,-107.5(-119.5,-10.5 -140,-17(-124.5,-69 -114,-72(77,8 81,17(285,-204.5 296,-214(206,-176 212,-175.5(83,168 81,159(105,-272 91,-259.5(-224.5,201 -241,187.5(-4.5,284.5 7.5,269(584.5,-165 593,-179.5(314,-292.5 305.5,-286(160.5,182 160,176(-133,170.5 -115.5,183(81,64 65.5,54(283,-27 284,-44.5(-125.5,150 -134.5,144(19.5,371 4,385(42.5,-193 51,-205(271,54 265.5,72(90,111 102.5,107(92,-237 85,-224.5(95,-242.5 108,-259(441,-0.5 446,-13(250,-215.5 261,-205(228,-224.5 211,-230(535.5,-92 524.5,-92(325,78 315.5,84.5(464.5,-292 455.5,-284(505,-27.5 519.5,-21(214.5,-145 222.5,-159.5(296,-274.5 304,-281(62.5,47.5 59,30.5(65.5,54 81,64(300,-322.5 283,-321(314,-327 334.5,-324.5(150,177.5 160.5,182(139,177.5 124,194.5(69,162.5 81,159(464,-45.5 481,-39(519.5,-21 505,-27.5(157.5,5 145.5,-12.5(261,-205 250,-215.5(455.5,-284 464.5,-292(-203,82 -205,71(-200,86 -187,101(-452.5,186 -472.5,189(-442,177.5 -424,169.5(587,-100.5 569,-91(94.5,-202 104,-195.5(390,-209 378,-207.5(385.5,24 387,30.5(385,18 391,-1(278,-287.5 296,-274.5(399,-3 410,-20(148,-22.5 150.5,-26(145.5,-12.5 134.5,-3(524.5,-92 535.5,-92(140.5,50 122.5,47.5(36,331 41,344.5(212,-175.5 217,-195.5(332,-215.5 309.5,-222(344.5,-212.5 362.5,-205(-67,75.5 -67,79(-75,280.5 -95.5,285.5(9.5,367.5 19.5,371(7,364 2.5,347(-348,88 -332.5,97(117,302 128,309.5(-214,121 -210.5,99.5(-210.5,128 -202.5,144.5(11,274 15,288(-0.5,252 -3,235.5(195,3 193,1(265,119 273,101(252.5,122.5 243,129(-117.5,140 -128,132(149.5,-54.5 147.5,-67(446,-13 441,-0.5(151,-92.5 152.5,-101(148,-79.5 147.5,-67(344.5,-50.5 334,-47.5(216,-323 229.5,-316(193,1 195,3(474,-84 452.5,-86(478,-80 494.5,-70.5(171,115 178,136(187,164.5 169,172(459,-107.5 479,-115.5(226,-24 238,-6(22.5,259.5 27.5,272.5(15,255 -0.5,252(192.5,-346 206,-350.5(191,-339.5 186,-327.5(152,205 162,214(-268,203 -255,202(132.5,-171 137.5,-161(-167,167 -157.5,173(99,-34 109,-14(569,-173 584.5,-165`.split(`(`).map(e=>e.split(` `).map(e=>e.split(`,`).map(Number)))},{kind:`pave`,landmark:`toboganxote`,width:3,lines:[[[-36,3],[-30,25],[-22,40],[-5,45],[-7,63],[8,78],[-3,93],[4,108],[15,113]]]},{kind:`pave`,at:[20,-190],polygons:[[[-12,-45],[26,-45],[24,0],[6,40],[-14,40],[-24,18]]]},{kind:`pave`,at:[160,30],polygons:[[[-32,-18],[10,-30],[30,-8],[24,30],[-6,34],[-30,14]]]},{kind:`water`,cover:`river`,at:[0,0],width:7,lines:[[[214,-2],[218,-12],[224,-22],[232,-30],[242,-40],[254,-50]]]},{kind:`water`,cover:`river`,at:[0,0],width:5,lines:[[[180,-20],[192,-28],[203,-34],[212,-38],[218,-33]],[[545,-94],[565,-97],[590,-102],[605,-104]]]},{kind:`clearTrees`,at:[20,-190],radius:30},{kind:`clearTrees`,at:[160,30],radius:24}],vehicles:[{from:[5,-166.5],to:[3.6,-163.4],count:2,heading:25,colors:[`#e8608f`]},{from:[24,-206],to:[30,-182],count:5,heading:16,colors:[`#e8608f`,`#3b6fd8`,`#e8608f`,`#f1f1f1`,`#e8608f`]}],sources:{mode:`satellite`,code:`xp`,center:{lat:20.5928,lng:-87.124285},extent:{size:1500},osmPark:`way/550358722`,outline:[[-253,5],[40,-232],[398,-521],[610,-245],[640,-160],[620,-70],[540,10],[420,90],[330,120],[230,200],[150,290],[150,400],[40,450],[-71,442],[-249,342],[-610,268],[-289,21]],osmBBox:[-87.1335,20.585,-87.115,20.6005],satelliteRelease:39767,name:`Xplor`,hours:{open:`09:00`,close:`17:00`}}}),tp={es:`Atracciones`,en:`Attractions`},np={es:`Restaurantes`,en:`Restaurants`},rp={es:`Servicios`,en:`Services`},ip={es:`Tiendas`,en:`Shops`},ap={es:`Sanitarios`,en:`Restrooms`},op={es:`Zapatera`,en:`Shoe Nursery`},sp=[{number:1,name:{es:`Estacionamiento`,en:`Parking`},category:rp,x:178,z:135},{number:2,name:{es:`Ingreso y salida del parque`,en:`Park Access and Exit`},category:rp,x:190,z:68},{number:3,name:{es:`Taquillas`,en:`Ticket Office`},category:rp,x:166,z:57},{number:4,name:{es:`Cajero automático`,en:`ATM`},category:rp,x:160,z:76},{number:5,name:ap,category:rp,x:149,z:70},{number:6,name:{es:`Rehilete`,en:`Pinwheel`},category:tp,x:121,z:39},{number:7,name:{es:`Obsequiario`,en:`Giftery`},category:ip,extraCost:!0,x:131,z:31},{number:8,name:{es:`El Xnack`,en:`El Xnack`},category:np,extraCost:!0,x:97,z:78},{number:9,name:{es:`Sanitarios y casilleros`,en:`Restrooms and Lockers`},category:rp,x:80,z:42},{number:10,name:{es:`Camino de Enanos y Gigantes`,en:`Dwarfs and Giants`},category:tp,x:64,z:112},{number:11,name:op,category:rp,x:47,z:172},{number:12,name:ap,category:rp,x:57,z:182},{number:13,name:{es:`Xensatorium`,en:`Xensatorium`},category:tp,x:32,z:230},{number:14,name:{es:`Laberinto de Arterias Subterráneas`,en:`Underground Arteries Labyrinth`},category:tp,x:118,z:70},{number:15,name:{es:`El Edén`,en:`Eden`},category:tp,x:50,z:279},{number:16,name:{es:`Jardín Xítrico`,en:`Citric Garden`},category:tp,x:26,z:140},{number:17,name:{es:`Latido`,en:`Heartbeat`},category:tp,x:89,z:24},{number:18,name:{es:`El Pueblo`,en:`Town`},category:tp,x:36,z:-48},{number:19,name:{es:`Canicódromo`,en:`Marblelous`},category:tp,x:-55,z:-128},{number:20,name:{es:`La Re-cámara`,en:`Picture This`},category:tp,x:-90,z:-136},{number:21,name:{es:`El Respiro`,en:`The Breather`},category:tp,x:-48,z:-98},{number:22,name:ap,category:rp,x:-115,z:-118},{number:23,name:op,category:rp,x:-12,z:-150},{number:24,name:{es:`Xauna`,en:`Xauna`},category:tp,x:-38,z:-196},{number:25,name:{es:`Tobogán`,en:`Slip`},category:tp,x:-22,z:-135},{number:26,name:{es:`Vuelo de Pájaro`,en:`Bird Flight`},category:tp,x:-62,z:-210},{number:27,name:ap,category:rp,x:-122,z:-300},{number:28,name:{es:`Riolajante`,en:`Riverlaxing`},category:tp,x:-108,z:-265},{number:29,name:{es:`Lodorama`,en:`Sludgerie`},category:tp,x:-82,z:-243},{number:30,name:{es:`Lluvia`,en:`Rain`},category:tp,x:-68,z:-226}],cp=Math.PI/180,lp=59.4*cp,up=[{id:`rehilete`,type:`pinwheel`,x:121,z:39,radius:15.5,height:12,outer:28,clear:30,replacesOsm:[550357196]},{id:`latido`,type:`pavilion`,x:89,z:24,roof:`dome`,width:10,height:7,domeMaterial:`court`,clear:6,replacesOsm:[1454442180]},{id:`casilleros`,type:`pavilion`,x:80,z:40,rotation:-49*cp,width:26,depth:8,height:4,clear:6},{id:`xnack`,type:`pavilion`,x:96,z:77,rotation:-45*cp,roof:`pergola`,width:26,depth:16,height:3.6,clear:12},{id:`taquillas`,type:`pavilion`,x:160,z:62,rotation:20*cp,width:12,depth:6,height:3.8,clear:6},{id:`pueblo`,type:`crookedTown`,x:46,z:-24,line:[[71,6],[45,-25],[21,-52],[5,-75],[-10,-98]],side:-1,offset:3.2,spacing:6.5,depth:5.5},{id:`tobogan`,type:`slideTower`,x:-24,z:-156,rotation:15*cp,height:18,length:30,clear:8,replacesOsm:[550357199]},{id:`xensatorium`,type:`pavilion`,x:38.5,z:236.5,rotation:lp,roof:`panels`,width:96,depth:20,height:7,clear:12,replacesOsm:[550357200]},{id:`anexo-sala`,type:`pavilion`,x:77,z:240,rotation:lp,roof:`panels`,width:22,depth:14,height:5,replacesOsm:[1427348799]},{id:`autos`,type:`parkedCars`,x:175,z:135,rows:[{from:[182.5,122.5],to:[184.5,140],count:5,heading:5},{from:[165.5,135.5],to:[166.5,141],count:2,heading:0},{from:[167.5,149],to:[168.5,154],count:2,heading:0},{from:[176,152],to:[186,155.5],count:4,heading:100},{from:[163,109],to:[163,109],count:1,heading:60}]}];function dp(e,t){let n=[],r=[];for(let i=0;i<e.length;i++){let[a,o]=e[Math.max(0,i-1)],[s,c]=e[Math.min(e.length-1,i+1)],l=Math.hypot(s-a,c-o)||1,u=-(c-o)/l*(t/2),d=(s-a)/l*(t/2);n.push([e[i][0]+u,e[i][1]+d]),r.push([e[i][0]-u,e[i][1]-d])}return[...n,...r.reverse()]}var fp=Tf({key:`xs`,name:`Xenses`,labelKey:`lbl_map_prefix_xs`,activities:sp,landmarks:up,edits:[{kind:`pave`,surface:`dirt`,at:[0,0],polygons:[dp([[-200,-281],[-219,-283],[-238,-278],[-257,-277],[-278,-278],[-287,-283],[-289,-292],[-286,-303]],3),dp([[-287,-283],[-281,-268],[-272,-256]],3),dp([[-230,-260],[-249,-258],[-267,-254],[-275,-249],[-279,-240],[-282,-229],[-280,-219],[-274,-211],[-262,-214],[-246,-216],[-235,-209]],3)]},{kind:`water`,cover:`river`,at:[0,0],width:6,lines:[[[-115,-262],[-100,-270],[-86,-263],[-79,-250],[-82,-236],[-95,-228],[-109,-236],[-118,-249],[-115,-262]]]}],vehicles:[{from:[106.4,-35.5],to:[107.6,-22],count:2,heading:85,colors:[`#e8608f`]}],sources:{mode:`satellite`,code:`xs`,center:{lat:20.585055,lng:-87.127065},extent:{size:1e3},osmPark:`way/550357202`,osmBBox:[-87.1335,20.5785,-87.121,20.591],name:`Xenses`,hours:{open:`08:30`,close:`17:00`}}}),pp={es:`Atracciones`,en:`Attractions`},mp={es:`Restaurantes`,en:`Restaurants`},hp={es:`Servicios`,en:`Services`},gp=[{number:1,name:{es:`Entrada`,en:`Entrance`},category:hp,x:441,z:-80},{number:2,name:{es:`Estacionamiento`,en:`Parking`},category:hp,x:416,z:-52},{number:3,name:{es:`Taquilla y recepción`,en:`Ticket Office and Reception`},category:hp,x:416,z:4},{number:4,name:{es:`Bienvenida con aguas frescas`,en:`Aguas Frescas Welcome`},category:mp,x:404,z:-103},{number:5,name:{es:`Desfile de mojigangas`,en:`Giant Puppet Parade`},category:pp,x:300,z:-196},{number:6,name:{es:`El Xangarrito`,en:`El Xangarrito`},category:{es:`Tiendas`,en:`Shops`},extraCost:!0,x:250,z:-230},{number:7,name:{es:`Sanitarios`,en:`Restrooms`},category:hp,x:219,z:-284},{number:8,name:{es:`Foto Pase`,en:`Photo Pass`},category:hp,extraCost:!0,x:287,z:-248},{number:9,name:{es:`Embarcadero`,en:`Boat Dock`},category:pp,x:317,z:-280},{number:10,name:{es:`Paseo en trajinera`,en:`Trajinera Ride`},category:pp,x:100,z:-360},{number:11,name:{es:`Cena mexicana y barra libre a bordo`,en:`Mexican Dinner and Open Bar on Board`},category:mp,x:228,z:-214},{number:12,name:{es:`Mariachi`,en:`Mariachi`},category:pp,x:-200,z:-361},{number:13,name:{es:`Marimba y son jarocho`,en:`Marimba and Son Jarocho`},category:pp,x:-405,z:-150},{number:14,name:{es:`Baile de los luchadores`,en:`Wrestlers Dance`},category:pp,x:-256,z:60},{number:15,name:{es:`Boda de kermés`,en:`Kermés Wedding`},category:pp,x:40,z:230},{number:16,name:{es:`El Pueblo`,en:`The Village`},category:pp,x:267,z:-241}],_p=Math.PI/180,vp=[317,-280],yp=Array.from({length:21},(e,t)=>{let n=(-70+t*9.5)*_p;return[vp[0]+27.5*Math.cos(n),vp[1]+27.5*Math.sin(n),-70+t*9.5+180,t]}),bp=[{id:`arco-entrada`,type:`fiestaArch`,x:438,z:-80.5,rotation:-90*_p,clear:9},{id:`embarcadero`,type:`roundPalapa`,x:vp[0],z:vp[1],y:.4,radius:19,tiers:2,clear:22},{id:`trajineras-embarcadero`,type:`trajineras`,x:vp[0],z:vp[1],y:0,boats:yp},{id:`casona`,type:`pavilion`,x:267,z:-241.5,y:.4,roof:`dome`,width:36,height:9,wall:`facadeOchre`,domeMaterial:`tile`,clear:20},{id:`puente-embarcadero`,type:`walkways`,x:291,z:-263,y:.75,width:4,clear:0,lines:[[[283,-255],[299,-270]]]},{id:`muelle-norte`,type:`dock`,x:262.5,z:-317,poly:[[-1.8,-15],[1.8,-15],[1.8,15],[-1.8,15]],clear:0},{id:`trajineras-muelle-norte`,type:`trajineras`,x:269,z:-317,y:0,boats:[[269.5,-326,0,2],[269.5,-321.5,0,5],[269.5,-310,0,0]]},{id:`trajineras-muelle-oeste`,type:`trajineras`,x:228,z:-210,y:0,boats:[[229,-229.5,30,1],[232,-224,30,3],[233.5,-218.5,30,6],[235,-213.5,30,4],[236.5,-208.5,30,2],[215,-207.5,0,5],[215,-203.5,0,0],[215,-199.5,0,3],[215,-195.5,0,6],[215,-191.5,0,1]]},{id:`trajineras-canales`,type:`trajineras`,x:0,z:0,y:0,boats:[[-200,-361,0,0],[-20,-366,180,1],[150,-358,3,2],[-405,-150,92,3],[-324,-180,-88,4],[-256,60,90,5],[40,230,30,6],[360,200,80,0],[-150,60,92,2],[80,-110,15,4]]},{id:`palapa-embarcadero-oeste`,type:`longPalapa`,x:219,z:-284,rotation:25*_p,length:22,width:10,clear:12},{id:`palapas-muelle-norte`,type:`longPalapa`,x:251,z:-322,rotation:75*_p,length:16,width:8,clear:9},{id:`palapa-terracota`,type:`roundPalapa`,x:165,z:-212,radius:7,tiers:1,clear:9},{id:`bodega-sur`,type:`longPalapa`,x:229,z:166,rotation:0,length:28,width:11,clear:14},{id:`recepcion`,type:`longPalapa`,x:416,z:7,rotation:90*_p,length:22,width:12,clear:12},{id:`gradas`,type:`pavilion`,x:-66,z:-255,rotation:-15*_p,width:34,depth:15,height:6,clear:18},{id:`servicios-sur-1`,type:`pavilion`,x:-247,z:246,width:14,depth:10,height:4,clear:9},{id:`servicios-sur-2`,type:`pavilion`,x:-213,z:247,width:18,depth:10,height:4,clear:11},{id:`autos-estacionamiento`,type:`parkedCars`,x:399,z:-45,rows:[{from:[399,-67],to:[399,-56],count:5,heading:0},{from:[399,-34],to:[399,-26],count:4,heading:0},{from:[419,-16],to:[419,-16],count:1,heading:0}]}],xp=(e,t)=>({kind:`water`,at:[0,0],width:e,lines:t}),Sp=(e,t)=>({kind:`water`,landmark:e,polygons:[Array.from({length:24},(e,n)=>[t*Math.cos(n*Math.PI/12),t*Math.sin(n*Math.PI/12)])]}),Cp={xc:Pf,xh:Uf,xp:ep,xs:fp,xo:Tf({key:`xo`,name:`Xoximilco`,labelKey:`lbl_map_prefix_xo`,activities:gp,landmarks:bp,edits:[xp(12,[[[-326,-245],[-334,-262],[-350,-270],[-375,-271],[-392,-266],[-398,-255],[-405,-230],[-406,-180],[-404,-120],[-400,-70],[-390,-40],[-370,0],[-356,40],[-353,90],[-351,140],[-352,175]]]),xp(15,[[[-326,-245],[-324,-200],[-324,-150],[-326,-100],[-327,-60],[-318,-20],[-312,10],[-295,18],[-275,20]]]),xp(6,[[[-342,-234],[-368,-233],[-379,-216],[-378,-180],[-374,-140],[-367,-100],[-356,-72],[-340,-52]],[[-312,15],[-318,60],[-316,110],[-314,150],[-318,185]]]),xp(20,[[[-252,-38],[-255,0],[-256,60],[-256,120],[-252,145]],[[-235,-42],[-200,-42],[-160,-35]]]),xp(14,[[[-336,-266],[-324,-288],[-305,-305],[-288,-323],[-265,-340],[-240,-355]]]),xp(18,[[[-240,-355],[-200,-361],[-150,-362],[-100,-360],[-70,-362],[-40,-365],[0,-366],[40,-363],[100,-360],[160,-358],[220,-355],[260,-350],[290,-335]]]),xp(12,[[[-92,-338],[-78,-318],[-60,-300],[-45,-285],[-28,-262],[-20,-240],[-22,-215],[-24,-180],[-22,-145]],[[35,-310],[15,-290],[3,-270],[-12,-250]]]),Sp(`embarcadero`,34),Sp(`casona`,23),{kind:`water`,at:[0,0],polygons:[[[222,-237],[243,-231],[244,-204],[222,-185],[207,-185],[207,-212]],[[259,-334],[281,-334],[281,-300],[259,-300]]]},xp(14,[[[255,-212],[248,-180],[245,-145]]]),xp(8,[[[-147,-25],[-147,20],[-150,80],[-150,140],[-145,165],[-120,175],[-95,185],[-70,195],[-40,205]],[[-147,-22],[-129,-12],[-118,-24],[-98,-27],[-80,-20],[-72,-2]],[[-136,-15],[-130,20],[-129,60],[-123,100],[-115,130],[-100,160]],[[-95,35],[-93,70],[-92,100],[-88,130],[-80,160]]]),xp(6,[[[-72,-2],[-68,40],[-66,90],[-64,140],[-60,180],[-50,200]]])],vehicles:[{from:[407.5,-46.5],to:[407.5,-41.5],count:2,heading:-2,colors:[`#3b6fd8`,`#e8608f`]},{from:[426,-68],to:[426,-58],count:3,heading:-2,colors:[`#f1f1f1`,`#e8608f`,`#f2c33a`]},{from:[203,124],to:[203,124],count:1,heading:90,colors:[`#f1f1f1`]}],sources:{mode:`satellite`,code:`xo`,center:{lat:20.994385,lng:-86.86255},extent:{size:1300},osmPark:`relation/18179096`,outline:[[-492.4,-386.4],[492.8,-372.6],[379,386.7],[-448.1,236.1],[-486.6,-300.9]],straightOutline:!0,greenWater:!0,waterTint:{shallow:`#5d7f48`,deep:`#3d5f3a`},osmBBox:[-86.8705,20.988,-86.854,21.001],name:`Xoximilco`,hours:{open:`07:00`,close:`23:00`}}}),xcr:Tf({key:`xcr`,name:`Zona Xcaret`,region:!0,sources:{mode:`satellite`,code:`xcr`,center:{lat:20.586313,lng:-87.120862},extent:{size:3500},outline:[[135,-1424],[1440,-207],[1667,-5],[639,905],[54,1384],[-31,1267],[-349,1024],[-513,1084],[-1226,316],[-1698,69]],osmBBox:[-87.138,20.5702,-87.1038,20.6025],seaCorner:[.99,.99],satelliteRelease:39767,groundGrade:{toward:`xc`,lawn:.45,reach:700,keep:[`xp`,`xs`],keepReach:250},name:`Zona Xcaret`}})},wp=Object.keys(Cp).filter(e=>!Cp[e].region),Tp={es:{loading:`Cargando mapa…`,loadError:`No se pudo cargar el mapa de este parque.`,zoomIn:`Acercar`,zoomOut:`Alejar`,resetView:`Restablecer vista`,toggleTilt:`Vista 2D / 3D`,close:`Cerrar`,activityList:`Lista de actividades`,parkSwitcher:`Cambiar de parque`,settings:`Ajustes`,language:`Idioma`,lbl_map_prefix_xc:`XCARET MAPA`,lbl_map_prefix_xh:`XEL-HÁ MAPA`,lbl_map_prefix_xp:`XPLOR MAPA`,lbl_map_prefix_xs:`XENSES MAPA`,lbl_map_prefix_xo:`XOXIMILCO MAPA`,lbl_map_activity_included:`Incluido con tu entrada`,lbl_map_activity_not_included:`Costo adicional`,open:`Abierto ahora`,closed:`Cerrado`,closesAt:`cierra`,opensAt:`abre`,parkHours:`Horario del parque`,search:`Buscar actividad, restaurante…`,tabRoutes:`Rutas`,tabPlaces:`Lugares`,tabHours:`Horarios`,activities:`actividades`,categories:`Categorías`,services:`Servicios`,showAll:`Mostrar todo`,hideAll:`Ocultar todo`,noResults:`Sin resultados`,results:`resultados`,restaurants:`Restaurantes y bares`,shows:`Presentaciones`,seasonal:`Sujeto a temporada`,routesHint:`Toca una ruta para ver sus actividades y resaltarla en el mapa.`,extra:`Costo adicional`,quality:`Calidad gráfica`,q_auto:`Auto`,q_high:`Alta`,q_medium:`Media`,q_low:`Baja`,timeOfDay:`Modo`,time_auto:`Automático`,time_day:`Día`,time_night:`Noche`,credits:`Datos: Grupo Xcaret, OpenStreetMap, rivieramaya.mx`,disclaimerEyebrow:`Sitio no oficial`,disclaimerTitle:`Este mapa no es oficial`,disclaimerBody:`Es un proyecto independiente: no está afiliado, patrocinado ni avalado por Grupo Xcaret ni por sus parques.`,disclaimerData:`Actividades, horarios, rutas y servicios se muestran solo como referencia y pueden no estar al día. Los modelos 3D son una interpretación aproximada de los parques.`,disclaimerOfficial:`Para información oficial, precios y reservaciones visita`,disclaimerOk:`Entendido, explorar el mapa`,disclaimerTrademarks:`Xcaret, Xel-Há, Xplor, Xenses y Xoximilco son marcas de sus respectivos titulares.`,disclaimerLink:`Aviso: sitio no oficial`,nav_directions:`Cómo llegar`,nav_go:`Ir`,nav_goTo:`Cómo llegar a`,nav_start:`Iniciar`,nav_simulate:`Simular recorrido`,nav_end:`Terminar`,nav_steps:`Indicaciones`,nav_min:`min`,nav_walk:`a pie`,nav_from:`Desde`,nav_from_gps:`Tu ubicación`,nav_from_sim:`Entrada del parque (simulada)`,nav_from_manual:`Punto elegido en el mapa`,nav_locating:`Buscando tu ubicación…`,nav_far:`Estás lejos del parque: ubicación simulada en la entrada`,nav_denied:`Sin permiso de ubicación: ubicación simulada en la entrada`,nav_unavailable:`Ubicación no disponible: ubicación simulada en la entrada`,nav_manual:`Salida desde el punto elegido (simulada)`,nav_pick:`Elegir salida`,nav_pick_hint:`Toca el mapa para elegir el punto de partida`,nav_cancel:`Cancelar`,nav_speed:`Velocidad de la simulación`,nav_recenter:`Recentrar`,nav_rerouting:`Recalculando ruta…`,nav_direct:`Sin andador cercano: se indica en línea recta`,nav_then:`Después`,nav_arrived:`Has llegado`,nav_simulating:`Simulación`,nav_head:`Camina hacia el {dir}`,nav_dir_n:`norte`,nav_dir_ne:`noreste`,nav_dir_e:`este`,nav_dir_se:`sureste`,nav_dir_s:`sur`,nav_dir_sw:`suroeste`,nav_dir_w:`oeste`,nav_dir_nw:`noroeste`,nav_left:`Gira a la izquierda`,nav_right:`Gira a la derecha`,nav_slight_left:`Gira ligeramente a la izquierda`,nav_slight_right:`Gira ligeramente a la derecha`,nav_near:`{text} cerca de {near}`,nav_arrive:`Llegas a tu destino`,nav_arrive_at:`Llegas a {name}`,nav_in:`En {dist} {text}`},en:{loading:`Loading map…`,loadError:`This park map could not be loaded.`,zoomIn:`Zoom in`,zoomOut:`Zoom out`,resetView:`Reset view`,toggleTilt:`2D / 3D view`,close:`Close`,activityList:`Activity list`,parkSwitcher:`Switch park`,settings:`Settings`,language:`Language`,lbl_map_prefix_xc:`XCARET MAP`,lbl_map_prefix_xh:`XEL-HÁ MAP`,lbl_map_prefix_xp:`XPLOR MAP`,lbl_map_prefix_xs:`XENSES MAP`,lbl_map_prefix_xo:`XOXIMILCO MAP`,lbl_map_activity_included:`Included with your ticket`,lbl_map_activity_not_included:`Additional cost`,open:`Open now`,closed:`Closed`,closesAt:`closes`,opensAt:`opens`,parkHours:`Park hours`,search:`Search activity, restaurant…`,tabRoutes:`Routes`,tabPlaces:`Places`,tabHours:`Hours`,activities:`activities`,categories:`Categories`,services:`Services`,showAll:`Show all`,hideAll:`Hide all`,noResults:`No results`,results:`results`,restaurants:`Restaurants & bars`,shows:`Shows`,seasonal:`Seasonal`,routesHint:`Tap a route to list its activities and highlight it on the map.`,extra:`Additional cost`,quality:`Graphics quality`,q_auto:`Auto`,q_high:`High`,q_medium:`Medium`,q_low:`Low`,timeOfDay:`Mode`,time_auto:`Automatic`,time_day:`Day`,time_night:`Night`,credits:`Data: Grupo Xcaret, OpenStreetMap, rivieramaya.mx`,disclaimerEyebrow:`Unofficial site`,disclaimerTitle:`This map is not official`,disclaimerBody:`It is an independent project, not affiliated with, sponsored or endorsed by Grupo Xcaret or its parks.`,disclaimerData:`Activities, hours, routes and services are shown for reference only and may be out of date. The 3D models are an approximate interpretation of the parks.`,disclaimerOfficial:`For official information, prices and bookings visit`,disclaimerOk:`Got it, explore the map`,disclaimerTrademarks:`Xcaret, Xel-Há, Xplor, Xenses and Xoximilco are trademarks of their respective owners.`,disclaimerLink:`Notice: unofficial site`,nav_directions:`Directions`,nav_go:`Go`,nav_goTo:`Directions to`,nav_start:`Start`,nav_simulate:`Simulate walk`,nav_end:`End`,nav_steps:`Steps`,nav_min:`min`,nav_walk:`walking`,nav_from:`From`,nav_from_gps:`Your location`,nav_from_sim:`Park entrance (simulated)`,nav_from_manual:`Point chosen on the map`,nav_locating:`Finding your location…`,nav_far:`You are far from the park: simulated location at the entrance`,nav_denied:`No location permission: simulated location at the entrance`,nav_unavailable:`Location unavailable: simulated location at the entrance`,nav_manual:`Starting from the chosen point (simulated)`,nav_pick:`Choose start`,nav_pick_hint:`Tap the map to choose the starting point`,nav_cancel:`Cancel`,nav_speed:`Simulation speed`,nav_recenter:`Re-center`,nav_rerouting:`Rerouting…`,nav_direct:`No walkway nearby: straight-line directions`,nav_then:`Then`,nav_arrived:`You have arrived`,nav_simulating:`Simulation`,nav_head:`Head {dir}`,nav_dir_n:`north`,nav_dir_ne:`northeast`,nav_dir_e:`east`,nav_dir_se:`southeast`,nav_dir_s:`south`,nav_dir_sw:`southwest`,nav_dir_w:`west`,nav_dir_nw:`northwest`,nav_left:`Turn left`,nav_right:`Turn right`,nav_slight_left:`Turn slightly left`,nav_slight_right:`Turn slightly right`,nav_near:`{text} near {near}`,nav_arrive:`Arrive at your destination`,nav_arrive_at:`Arrive at {name}`,nav_in:`In {dist} {text}`}},Ep=Object.keys(Tp);function Dp(e,t={}){return n=>t[e]?.[n]??Tp[e]?.[n]??Tp.es[n]??n}var Op=(e,t)=>e?.[t]??e?.es??``,kp=`/parquex/`;function Ap(e=location.pathname,t=kp){let[n,r]=(e.startsWith(t)?e.slice(t.length):e).split(`/`).filter(Boolean);return{park:wp.includes(n?.toLowerCase())?n.toLowerCase():`xc`,lang:Ep.includes(r)?r:Ep[0]}}var jp=(e,t,n=kp)=>`${n}${e}/${t}`;function Mp(e=location.search){let t=new URLSearchParams(e),n=t.get(`view`)?.split(`,`).map(Number);return{stats:t.has(`stats`),still:t.has(`still`),nosidebar:t.has(`nosidebar`),reference:t.has(`ref`),neighbors:!t.has(`noneighbors`),view:n?.length>=3&&n.every(Number.isFinite)?n:null}}async function Np(e){let t=await fetch(e);if(!t.ok)throw Error(`${t.status} ${e}`);return t}async function Pp(e,{reference:t=!1,onProgress:n=()=>{},cached:r=null}={}){let i=`${kp}parks/${e}/`,a=0,o=e=>(a++,n(a/6),e),s=t?`${kp}data/raw/${e}-illustration.png`:i+df(uf(0,0,0)),c=(e,t)=>(e?Promise.resolve(e):t()).then(o),[l,u,d,f,p,m,h]=await Promise.all([c(r?.park,()=>Np(`${i}park.json`).then(e=>e.json())),c(t?null:r?.ground,()=>Cf(s)),c(r?.waterTexture,()=>Cf(`${i}water.png`,{data:!0})),c(r?.heightBuffer,()=>Np(`${i}height.bin`).then(e=>e.arrayBuffer())),c(r?.vegetationBuffer,()=>Np(`${i}vegetation.bin`).then(e=>e.arrayBuffer())),Np(`${i}buildings.json`).then(e=>e.json()).then(o),Np(i+wf).then(e=>e.blob()).then(e=>createImageBitmap(e,{premultiplyAlpha:`none`,colorSpaceConversion:`none`})).catch(()=>null)]);return{baseUrl:i,park:l,groundOverview:u,streamGround:!t,waterTexture:d,heightBuffer:f,vegetationBuffer:p,buildings:m,paving:h}}function Fp(e){if(!e.streamGround)return null;let{groundOverview:t,waterTexture:n,heightBuffer:r,vegetationBuffer:i}=e;return{ground:t,waterTexture:n,heightBuffer:r,vegetationBuffer:i}}async function Ip(e){return(await Np(`${kp}parks/${e}/park.json`)).json()}async function Lp(e,{signal:t}={}){let n=`${kp}parks/${e}/`,r=e=>fetch(n+e,{signal:t}).then(t=>{if(!t.ok)throw Error(`${t.status} ${n+e}`);return t.arrayBuffer()}),i=await Promise.allSettled([Cf(n+df(uf(0,0,0)),{signal:t,anisotropy:4}),Cf(`${n}water.png`,{signal:t,data:!0}),r(`height.bin`),r(`vegetation.bin`)]),a=i.find(e=>e.status===`rejected`);if(a){for(let e of i)e.status===`fulfilled`&&e.value.isTexture&&e.value.image?.close?.();throw a.reason}let[o,s,c,l]=i.map(e=>e.value);return{ground:o,waterTexture:s,heightBuffer:c,vegetationBuffer:l}}var Rp=100;function zp(e){let t=new Int16Array(e),n=new Float64Array(t.length);for(let e=0;e<t.length;e++)n[e]=t[e]/Rp;return n}var Bp={inner:45,outer:5};function Vp({cx:e,cz:t,radii:n}){let r=n.length,i=Math.min(...n),a=Math.max(...n);function o(e){let t=(e/(Math.PI*2)*r%r+r)%r,i=Math.floor(t),a=t-i;return n[i]*(1-a)+n[(i+1)%r]*a}function s(n,r){let i=n-e,a=r-t;return Math.hypot(i,a)-o(Math.atan2(a,i))}return{cx:e,cz:t,radii:n,minRadius:i,maxRadius:a,radiusAt:o,signedDistance:s,fade(e,t){let n=Math.min(1,Math.max(0,(s(e,t)+Bp.inner)/(Bp.inner+Bp.outer)));return n*n*(3-2*n)},contains:(e,t,n=0)=>s(e,t)<-n,touchesRect(n,r,i,o){let c=Math.max(n,Math.min(e,i)),l=Math.max(r,Math.min(t,o));if(Math.hypot(c-e,l-t)>a+Bp.outer)return!1;for(let e=0;e<=24;e++)for(let t=0;t<=24;t++)if(s(n+(i-n)*t/24,r+(o-r)*e/24)<Bp.outer+10)return!0;return!1},coversRect(n,r,a,o){let s=Math.max(Math.abs(n-e),Math.abs(a-e)),c=Math.max(Math.abs(r-t),Math.abs(o-t));return Math.hypot(s,c)<i-Bp.inner}}}var Hp=class{constructor({load:e,dispose:t=e=>e?.dispose?.(),capacity:n=64,concurrency:r=6}){this.load=e,this.disposeValue=t,this.capacity=n,this.concurrency=r,this.loaded=new Map,this.pending=new Map,this.wanted=new Map,this.failed=new Set,this.frame=0,this.onLoad=null}beginFrame(){this.frame++,this.wanted.clear()}get(e){let t=this.loaded.get(e);if(t)return t.used=this.frame,t.value}has(e){return this.loaded.has(e)}request(e,t=0){if(this.loaded.has(e)||this.failed.has(e))return;let n=this.wanted.get(e);(n===void 0||t<n)&&this.wanted.set(e,t);let r=this.pending.get(e);r&&(r.requested=this.frame)}endFrame(){for(let[e,t]of this.pending)this.frame-t.requested>30&&(t.controller.abort(),this.pending.delete(e));if(this.pending.size<this.concurrency&&this.wanted.size){let e=[...this.wanted].filter(([e])=>!this.pending.has(e)).sort((e,t)=>e[1]-t[1]);for(let[t]of e.slice(0,this.concurrency-this.pending.size))this.start(t)}if(this.loaded.size>this.capacity){let e=[...this.loaded].filter(([,e])=>e.used<this.frame).sort((e,t)=>e[1].used-t[1].used);for(let[t,n]of e.slice(0,this.loaded.size-this.capacity))this.loaded.delete(t),this.disposeValue(n.value)}}start(e){let t=new AbortController;this.pending.set(e,{controller:t,requested:this.frame}),this.load(e,t.signal).then(n=>{if(this.pending.get(e)?.controller!==t)return this.disposeValue(n);this.pending.delete(e),this.loaded.set(e,{value:n,used:this.frame}),this.onLoad?.(e)},n=>{this.pending.get(e)?.controller===t&&this.pending.delete(e),n?.name!==`AbortError`&&this.failed.add(e)})}get busy(){return this.pending.size>0||[...this.wanted.keys()].some(e=>!this.loaded.has(e)&&!this.failed.has(e))}dispose(){for(let e of this.pending.values())e.controller.abort();for(let e of this.loaded.values())this.disposeValue(e.value);this.pending.clear(),this.loaded.clear()}},Up={pace:.12,birds:.15,jumps:.12},Wp=e=>1+(e-1)*Gp.value,Gp={value:0},Kp=1.5,qp={window:`#ffcf7a`,lamp:`#ffc56b`},Jp={tint:[.05,.065,.15],lift:[.004,.006,.018]},Yp=`
  #define NIGHT_MAP_TINT vec3(${Jp.tint.join(`, `)})
  #define NIGHT_MAP_LIFT vec3(${Jp.lift.join(`, `)})
`,Xp=[];function Zp(e,t,n=e.emissiveIntensity??0){return Xp.push({material:e,day:n,night:t}),e.emissiveIntensity=n+(t-n)*Gp.value,e}function Qp(e){Gp.value=e;for(let t of Xp)t.material.emissiveIntensity=t.day+(t.night-t.day)*e}var $p=2.2,em=128;function tm({park:e,heightBuffer:t,overview:n,designArea:r,baseUrl:i,stream:a=!0,lightMap:o,holes:s}){let{size:c}=e.extent,l=nm(e,t),u=new Set(e.ground.tiles),d=new Hp({load:(e,t)=>Cf(i+df(e),{signal:t,anisotropy:4}),capacity:8,concurrency:2});n.anisotropy=4;let f=c/2,p={value:new H(e.extent.cx-f,e.extent.cz-f,c)},m=new On;m.name=`terrain`;let h=[];for(let t=0;t<4;t++)for(let i=0;i<4;i++){if(!u.has(uf(2,i,t)))continue;let a=rm(ff(e.extent,2,i,t),l,r,em,s);if(!a)continue;let c=new Oo({map:n}),d={value:new Yt};c.onBeforeCompile=e=>{e.uniforms.uTileUV=d,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform vec4 uTileUV;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>
vMapUv = vMapUv * uTileUV.zw + uTileUV.xy;`),o&&(Object.assign(e.uniforms,{uNight:Gp,uLightMap:o,uLightExtent:p}),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform vec3 uLightExtent;
varying vec2 vNightUv;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vNightUv = ((modelMatrix * vec4(transformed, 1.0)).xz - uLightExtent.xy) / uLightExtent.z;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uNight;
uniform sampler2D uLightMap;
varying vec2 vNightUv;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
            if (uNight > 0.001) totalEmissiveRadiance += diffuseColor.rgb * texture2D(uLightMap, vNightUv).rgb * (uNight * ${$p.toFixed(2)});`))},c.customProgramCacheKey=()=>o?`terrain-chunk-night`:`terrain-chunk`;let f=new ri(a,c);f.name=`terrain:${i},${t}`,f.receiveShadow=!0,f.renderOrder=-3,m.add(f);let _=a.boundingBox.clone(),v={i,j:t,mesh:f,material:c,tileUV:d,box:_,level:-1};g(v,0,n),h.push(v)}function g(e,t,n){if(e.level===t&&e.material.map===n)return;let r=2**(2-t);e.tileUV.value.set(e.i%r/r,e.j%r/r,1/r,1/r),e.material.map=n,e.level=t}let _=Array.from({length:3},(t,n)=>c/(2**n*e.ground.tileSize)),v=a?2:0,y=new H;return{name:`terrain`,object:m,heightAt:l,setQuality(e){v=a?Math.min(2,e.groundLevel):0,d.capacity=e.groundTiles},update({camera:e,frustum:t,fovPx:r}){d.beginFrame();for(let i of h){if(!t.intersectsBox(i.box)){g(i,0,n);continue}let a=i.box.clampPoint(e.position,y).distanceTo(e.position),o=Math.max(a,1)/r,s=0;for(;s<v&&_[s]>o*1.5;)s++;let c=s,l=null;for(;c>0;c--){let e=2**(2-c),t=uf(c,Math.floor(i.i/e),Math.floor(i.j/e));if(u.has(t)){if(l=d.get(t),l)break;d.request(t,c*1e5+a)}}g(i,c,l??n)}d.endFrame()},get loading(){return d.busy},dispose(){d.dispose()}}}function nm(e,t){let n=e.heightGrid,{cx:r,cz:i,size:a}=e.extent,o=zp(t);return(e,t)=>{let s=((e-r)/a+.5)*(n-1),c=((t-i)/a+.5)*(n-1),l=Math.max(0,Math.min(n-2,Math.floor(s))),u=Math.max(0,Math.min(n-2,Math.floor(c))),d=Math.max(0,Math.min(1,s-l)),f=Math.max(0,Math.min(1,c-u)),p=(e,t)=>o[(u+t)*n+l+e];return p(0,0)*(1-d)*(1-f)+p(1,0)*d*(1-f)+p(0,1)*(1-d)*f+p(1,1)*d*f}}function rm([e,t,n,r],i,a,o=em,s){let c=o,l=(n-e)/c,u=(n,r)=>a.signedDistance(e+(n+.5)*l,t+(r+.5)*l)<Bp.outer+l*1.5,d=s&&!s.empty,f=new Int32Array((c+1)*(c+1)).fill(-1),p=[],m=[],h=0,g=(e,t)=>{let n=t*(c+1)+e;return f[n]<0&&(f[n]=h++),f[n]};for(let n=0;n<c;n++)for(let r=0;r<c;r++){if(!u(r,n))continue;if(d){let i=s.classify(e+r*l,t+n*l,e+(r+1)*l,t+(n+1)*l);if(i===1)continue;if(i===2){m.push(r,n);continue}}let i=g(r,n),a=g(r+1,n),o=g(r,n+1),c=g(r+1,n+1);p.push(i,o,a,a,o,c)}let _=[],v=Math.max(0,Math.ceil(Math.log2(l/im)));for(let n=0;n<m.length;n+=2){let r=e+m[n]*l,a=t+m[n+1]*l,o=i(r,a),c=i(r+l,a),u=i(r,a+l),d=i(r+l,a+l),f=(e,t)=>e+t<=1?o+(c-o)*e+(u-o)*t:d+(u-d)*(1-e)+(c-d)*(1-t),g=(e,t,n,i)=>{let o=r+e*l,c=a+t*l,u=n*l,d=i?s.classify(o,c,o+u,c+u):2;if(d===1)return;if(d===2){if(i<v){let r=n/2;for(let[n,a]of am)g(e+n*r,t+a*r,r,i+1);return}if(s.contains(o+u/2,c+u/2))return}let m=h+_.length;for(let[r,i]of am)_.push([o+r*u,c+i*u,f(e+r*n,t+i*n)]);p.push(m,m+2,m+1,m+1,m+2,m+3)};g(0,0,1,0)}let y=h+_.length;if(!y)return null;let b=new Float32Array(y*3),x=new Float32Array(y*3),S=new Float32Array(y*2),C=l,w=(e,t,n)=>{let r=(i(e-C,t)-i(e+C,t))/(2*C),a=(i(e,t-C)-i(e,t+C))/(2*C),o=Math.hypot(r,1,a);x.set([r/o,1/o,a/o],n*3)};for(let n=0;n<=c;n++)for(let r=0;r<=c;r++){let a=f[n*(c+1)+r];if(a<0)continue;let o=e+r*l,s=t+n*l;b.set([o,i(o,s),s],a*3),w(o,s,a),S.set([r/c,n/c],a*2)}_.forEach(([i,a,o],s)=>{let c=h+s;b.set([i,o,a],c*3),w(i,a,c),S.set([(i-e)/(n-e),(a-t)/(r-t)],c*2)});let T=new Ar;return T.setAttribute(`position`,new gr(b,3)),T.setAttribute(`normal`,new gr(x,3)),T.setAttribute(`uv`,new gr(S,2)),T.setIndex(y>65535?p:new gr(Uint16Array.from(p),1)),mf(T)}var im=.35,am=[[0,0],[1,0],[0,1],[1,1]],om=Math.PI*6378137/180;function sm(e,t){let n=om,r=om*Math.cos(e*Math.PI/180);return{lat0:e,lng0:t,mLat:n,mLng:r,toLocal:(i,a)=>[(a-t)*r,-(i-e)*n],toLatLng:(i,a)=>[e-a/n,t+i/r]}}var cm=e=>e*Math.PI/180;function lm([e,t],[n,r]){let i=Math.sin(cm(n-e)/2)**2+Math.cos(cm(e))*Math.cos(cm(n))*Math.sin(cm(r-t)/2)**2;return 12742*Math.asin(Math.sqrt(i))}function um([e,t],[n,r]){let i=Math.sin(cm(r-t))*Math.cos(cm(n)),a=Math.cos(cm(e))*Math.sin(cm(n))-Math.sin(cm(e))*Math.cos(cm(n))*Math.cos(cm(r-t));return Math.atan2(i,a)*180/Math.PI}var dm=Math.PI/180,fm=(e,t)=>e/2**t*360-180,pm=(e,t)=>Math.atan(Math.sinh(Math.PI*(1-2*e/2**t)))/dm;function mm(e,t,n){let r=2**n,i=(e+180)/360*r,a=Math.sin(t*dm);return[i,(.5-Math.log((1+a)/(1-a))/(4*Math.PI))*r]}function hm(e,t,n){return[pm(t,n),fm(e,n),pm(t+1,n),fm(e+1,n)]}function gm(e,t=`design`){let n=`u${t[0].toUpperCase()}${t.slice(1)}`;return{[`${n}Center`]:{value:new V(e.cx,e.cz)},[`${n}Radii`]:{value:Float32Array.from(e.radii)},[`${n}Fade`]:{value:new V(Bp.inner,Bp.outer)}}}function _m(e,t=`design`){let n=`u${t[0].toUpperCase()}${t.slice(1)}`;return`
  uniform vec2 ${n}Center;
  uniform float ${n}Radii[${e}];
  uniform vec2 ${n}Fade;
  // signed distance (m, radial) to the outline, < 0 inside, like signedDistance() in JS
  float ${t}Distance(vec2 p) {
    vec2 d = p - ${n}Center;
    float f = mod(atan(d.y, d.x) / 6.28318530718 * ${e}.0 + ${e}.0, ${e}.0);
    int i = int(floor(f));
    int j = i + 1 == ${e} ? 0 : i + 1;
    float r = mix(${n}Radii[i], ${n}Radii[j], fract(f));
    return length(d) - r;
  }
  float ${t}Fade(vec2 p) {
    return smoothstep(-${n}Fade.x, ${n}Fade.y, ${t}Distance(p));
  }
`}var vm=`
  varying vec2 vUv;
  varying vec2 vWorld;
  #include <fog_pars_vertex>
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xz;
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,ym=e=>`
  uniform sampler2D map;
  uniform vec3 color;
  uniform float uRegionOn;
  uniform float uNight;
  ${Yp}
  varying vec2 vUv;
  varying vec2 vWorld;
  #include <fog_pars_fragment>
  ${_m(e)}
  ${_m(e,`region`)}
  void main() {
    float alpha = designFade(vWorld);
    if (uRegionOn > 0.5) {
      // a region (layers/neighbors.js) is blended over the map with opacity
      // r · alpha: the map keeps (1 - r) · alpha of the final color, so the
      // focused park, the region and the map add up exactly
      float r = 1.0 - regionFade(vWorld);
      alpha = alpha * (1.0 - r) / max(1.0 - r * alpha, 1e-4);
    }
    if (alpha < 0.004) discard; // the 3D park (or a region) is drawn there
    #ifdef USE_TILE
      vec3 c = texture2D(map, vUv).rgb;
    #else
      vec3 c = color;
    #endif
    // night: the map dims to navy (it is unlit), light streets stay a little lighter
    c = mix(c, c * NIGHT_MAP_TINT + NIGHT_MAP_LIFT, uNight);
    gl_FragColor = vec4(c, alpha);
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;function bm(){let e=new Ar;return e.setAttribute(`position`,new G([-.5,0,-.5,.5,0,-.5,-.5,0,.5,.5,0,.5],3)),e.setAttribute(`uv`,new G([0,0,1,0,0,1,1,1],2)),e.setIndex([0,2,1,1,2,3]),e}function xm({park:e,designArea:t,config:n}){let r=sm(e.center.lat,e.center.lng),i=t.radii.length,a={...gm(t),...gm(t,`region`),uRegionOn:{value:0},uNight:Gp},o=ym(i),s=null,c=e=>new To({uniforms:{...So.clone(J.fog),...a,map:{value:null},color:{value:new W(n.background)}},vertexShader:vm,fragmentShader:o,defines:e?{USE_TILE:``}:{},fog:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:204,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205}),l=new On;l.name=`basemap`;let u=bm(),d=new ri(u,c(!1));d.renderOrder=-2.5,d.frustumCulled=!1,l.add(d);let f=[],p=e=>{if(!f[e]){let t=new ri(u,c(!0));t.frustumCulled=!1,t.matrixAutoUpdate=!1,l.add(t),f[e]=t}return f[e]},m=e=>{let[t,r,i]=e.split(`/`);return n.url.replace(`{z}`,t).replace(`{x}`,r).replace(`{y}`,i)},h=new Hp({load:(e,t)=>Cf(m(e),{signal:t,anisotropy:4}),capacity:96,concurrency:6}),g=(e,t,n)=>{let[i,a,o,s]=hm(e,t,n),[c,l]=r.toLocal(i,a),[u,d]=r.toLocal(o,s);return[c,l,u,d]},_=1.5,v=!0;h.onLoad=()=>{v=!0};let y=new Qn,b=new H,x=new U;function S({camera:e,frustum:i,fovPx:a,range:o}){let c=e.position,l=[],u=(e,r,d)=>{let[f,p,m,h]=g(e,r,d);if(t.coversRect(f,p,m,h)||s?.coversRect(f,p,m,h)||(y.min.set(f,-2,p),y.max.set(m,2,h),!i.intersectsBox(y)))return;let v=y.clampPoint(c,b).distanceTo(c);if(!(v>o)){if((m-f)*a/Math.max(v,1)>n.tileSize*_&&d<n.maxZoom)for(let t=0;t<4;t++)u(e*2+(t&1),r*2+(t>>1),d+1);else l.push({x:e,y:r,z:d,rect:[f,p,m,h],dist:v})}},[d,f]=r.toLatLng(c.x-o,c.z-o),[p,m]=r.toLatLng(c.x+o,c.z+o),[h,v]=mm(f,d,8).map(Math.floor),[x,S]=mm(m,p,8).map(Math.floor);for(let e=v;e<=S;e++)for(let t=h;t<=x;t++)u(t,e,8);return l}function C(e){let{camera:t,fogFar:r}=e,i=Math.min(r,6e4);if(d.position.set(t.position.x,0,t.position.z),d.scale.set(i*2,1,i*2),x.equals(t.matrixWorld)&&!v&&!h.busy)return;x.copy(t.matrixWorld),v=!1,h.beginFrame();let a=S({...e,range:i}),o=new Map;for(let e of a){let t=`${e.z}/${e.x}/${e.y}`,r=h.get(t);if(r){o.set(t,{rect:e.rect,z:e.z,texture:r});continue}h.request(t,e.z*1e6+e.dist);let{x:i,y:a,z:s}=e;for(;s>n.minZoom;){i>>=1,a>>=1,s--;let t=`${s}/${i}/${a}`,r=h.get(t);if(r){o.has(t)||o.set(t,{rect:g(i,a,s),z:s,texture:r});break}s===Math.max(n.minZoom,e.z-3)&&h.request(t,s*1e6)}}h.endFrame();let s=0;for(let{rect:e,z:t,texture:n}of o.values()){let r=p(s++),[i,a,o,c]=e;r.matrix.makeScale(o-i,1,c-a).setPosition((i+o)/2,0,(a+c)/2),r.matrixWorldNeedsUpdate=!0,r.material.uniforms.map.value=n,r.renderOrder=-2+t*.01,r.visible=!0}for(;s<f.length;s++)f[s].visible=!1}let w=(e,t)=>{let n=t===`region`?`uRegion`:`uDesign`;a[`${n}Center`].value.set(e.cx,e.cz),a[`${n}Radii`].value.set(e.radii)};return{name:`basemap`,object:l,update:C,setFocus(e){if(e.designArea.radii.length!==i)throw Error(`designed areas need the same number of radii`);r=sm(e.park.center.lat,e.park.center.lng),t=e.designArea,w(t,`design`),v=!0},setRegion(e){e&&e.radii.length!==i&&(console.warn(`basemap: region outline with a different number of radii; the map is not faded under it`),e=null),s=e,e&&w(e,`region`),a.uRegionOn.value=+!!e,v=!0},setQuality(e){_=e.mapDetail,h.capacity=e.mapTiles,v=!0},get loading(){return h.busy}}}var Sm={min:-8,max:40},Cm=[.12,.25],wm=.2,Tm=`
  uniform vec3 uExtent; // west, north, size of water.png in local meters
  varying vec2 vUv;
  varying vec3 vWorld;
  #ifdef LITE
    attribute float alpha;
    varying float vAlpha;
  #endif
  #ifdef SEA_EDGE
    varying vec2 vLocal;
  #endif
  #include <fog_pars_vertex>
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    #ifdef LITE
      vUv = (position.xz - uExtent.xy) / uExtent.z; // the park's own frame (neighbor parks are moved)
      vAlpha = alpha;
    #else
      vUv = (wp.xz - uExtent.xy) / uExtent.z; // v = 0 at the north edge, like the image rows
    #endif
    vWorld = wp.xyz;
    #ifdef SEA_EDGE
      vLocal = position.xz;
    #endif
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,Em=(e,t)=>`
  #ifdef LITE
    varying float vAlpha;
  #else
    ${_m(e)}
  #endif
  #ifdef SEA_EDGE
    ${_m(t,`edge`)}
    uniform vec3 uSeaEdgeColor;
    uniform vec2 uSeaEdgeBand;
    varying vec2 vLocal;
    ${Yp}
  #endif
  uniform sampler2D uWater;
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uSky;
  uniform vec3 uSeaShallow;
  uniform vec3 uSeaDeep;
  uniform vec3 uLagoon;
  uniform vec3 uPool;
  uniform vec3 uRiver;
  uniform float uInland; // 1 when the park sets its own inland water color (park.waterTint)
  uniform vec3 uInlandShallow;
  uniform vec3 uInlandDeep;
  uniform float uNight;
  uniform vec3 uNightSky;
  uniform vec3 uNightShallow;
  uniform vec3 uNightDeep;
  #ifdef NIGHT_LIGHTS
    uniform sampler2D uLightMap;
    uniform vec3 uExtent;
  #endif
  varying vec2 vUv;
  varying vec3 vWorld;
  #include <fog_pars_fragment>

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float waves(vec2 q) {
    return noise(q * 0.16 + uTime * vec2(0.06, 0.035))
      + 0.5 * noise(q * 0.42 - uTime * vec2(0.05, 0.08))
      + 0.25 * noise(q * 1.1 + uTime * vec2(0.11, -0.07));
  }

  void main() {
    vec4 w = texture2D(uWater, vUv);
    float sd = mix(${Sm.min.toFixed(1)}, ${Sm.max.toFixed(1)}, w.r); // meters to the shore, > 0 in the water
    float mask = smoothstep(-0.45, 0.45, sd);
    if (mask < 0.01) discard; // land: done before any further work
    float edge = 0.0;
    #ifdef SEA_EDGE
      // open sea near the outline (seaEdge): towards the real map's sea color and
      // opaque, so it meets the map's sea without an edge; vAlpha is only where
      // it yields to the parks, its own fade applies elsewhere (pools, lagoons)
      edge = (1.0 - smoothstep(uSeaEdgeBand.x, uSeaEdgeBand.y, -edgeDistance(vLocal))) * (1.0 - smoothstep(0.1, 0.25, w.g));
      mask *= vAlpha * mix(1.0 - edgeFade(vLocal), 1.0, edge);
    #elif defined(LITE)
      mask *= vAlpha; // the neighbor's own fade and where it yields to other parks
    #else
      mask *= 1.0 - designFade(vWorld.xz);
    #endif
    if (mask < 0.01) discard;
    float tint = w.g;
    float depth = clamp(sd / 40.0, 0.0, 1.0); // 0 at the shore .. 1 at 40 m

    vec3 sea = mix(uSeaShallow, uSeaDeep, smoothstep(0.02, 0.85, depth));
    vec3 base = tint < 0.25 ? mix(sea, uPool, tint / 0.25)
      : tint < 0.45 ? mix(uPool, uLagoon, (tint - 0.25) / 0.2)
      : mix(uLagoon, uRiver, (tint - 0.45) / 0.55);
    // park.waterTint: lagoons, rivers and pools take the park's own color
    float inland = uInland * smoothstep(${Cm[0].toFixed(2)}, ${Cm[1].toFixed(2)}, tint);
    base = mix(base, mix(uInlandShallow, uInlandDeep, smoothstep(0.0, ${wm.toFixed(2)}, depth)), inland);

    vec2 p = vWorld.xz;
    #ifdef LITE
      vec3 n = vec3(0.0, 1.0, 0.0); // still water: no waves, glints or foam
    #else
      float e = 0.5;
      float strength = mix(1.0, 0.35, smoothstep(0.45, 1.0, tint));
      vec3 n = normalize(vec3(
        (waves(p - vec2(e, 0.0)) - waves(p + vec2(e, 0.0))) * strength,
        1.2,
        (waves(p - vec2(0.0, e)) - waves(p + vec2(0.0, e))) * strength));
    #endif

    // night: deep blue, darker inland water
    vec3 nightBase = mix(uNightShallow, uNightDeep, smoothstep(0.02, 0.85, depth));
    nightBase = mix(nightBase, base * vec3(0.16, 0.22, 0.42), smoothstep(0.2, 0.5, tint) * 0.8);
    base = mix(base, nightBase, uNight);

    vec3 V = normalize(cameraPosition - vWorld);
    float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0);
    vec3 col = mix(base, mix(uSky, uNightSky, uNight), fres * mix(0.55, 0.2, inland)); // murky water reflects less sky
    vec3 H = normalize(uSunDir + V);
    #ifndef LITE
    col += pow(max(dot(n, H), 0.0), 220.0) * mix(1.4, 0.35, uNight); // sun / dim moon glint
    col *= 0.92 + 0.16 * waves(p * 0.6);

    // white wave strokes on the open sea, like the illustrated map
    float sparkle = smoothstep(0.82, 0.95, noise(p * vec2(0.9, 2.2) + vec2(uTime * 0.25, uTime * 0.1)));
    sparkle *= smoothstep(0.86, 1.0, noise(p * 0.21 - uTime * 0.03));
    col += sparkle * (1.0 - smoothstep(0.1, 0.4, tint)) * smoothstep(0.15, 0.5, depth) * mix(0.55, 0.12, uNight);

    // shoreline foam
    float shore = 1.0 - smoothstep(0.0, 0.07, depth);
    float foam = shore * (0.55 + 0.45 * sin(depth * 160.0 - uTime * 1.8 + noise(p * 0.5) * 6.0));
    foam *= 1.0 - smoothstep(0.3, 0.6, tint);
    foam *= 1.0 - inland * 0.9; // murky inland water: hardly any foam
    col = mix(col, vec3(1.0), clamp(foam, 0.0, 1.0) * mix(0.55, 0.12, uNight));
    #endif
    #ifdef NIGHT_LIGHTS
    if (uNight > 0.001) {
      // lamps reflected on the water: their light map looked up a few meters
      // further from the viewer (a reflection shows between the viewer and the
      // lamp), broken up by the waves into streaks
      vec2 away = normalize(vWorld.xz - cameraPosition.xz + vec2(1e-4)) / uExtent.z;
      vec2 side = vec2(-away.y, away.x);
      float ripple = 0.35 + 1.3 * smoothstep(0.35, 0.8, noise(vec2(dot(p, side * uExtent.z) * 1.6, dot(p, away * uExtent.z) * 0.25 + uTime * 0.6)));
      vec3 glow = texture2D(uLightMap, vUv + away * 4.0).rgb * 0.5
        + texture2D(uLightMap, vUv + away * 10.0).rgb * 0.4
        + texture2D(uLightMap, vUv + away * 18.0).rgb * 0.3;
      col += glow * ripple * uNight * 3.0;
    }
    #endif

    float alpha = mask * mix(mix(mix(0.62, 0.96, smoothstep(0.0, 0.35, depth + tint)), 0.96, inland), 1.0, edge);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #ifdef SEA_EDGE
      // after tone mapping: exactly the map's color (dimmed at night like the map, layers/basemap.js)
      vec3 mapSea = mix(uSeaEdgeColor, uSeaEdgeColor * NIGHT_MAP_TINT + NIGHT_MAP_LIFT, uNight);
      gl_FragColor.rgb = mix(gl_FragColor.rgb, mapSea, edge);
    #endif
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`,Dm={sky:`#dcf1fb`,shallow:`#78d3d6`,deep:`#3f8fc2`,lagoon:`#4aaebb`,pool:`#94deea`,river:`#284066`},Om={sky:`#1b2c66`,shallow:`#1c4fa0`,deep:`#0b2462`};function km({park:e,waterTexture:t,sunDirection:n,designArea:r,lightMap:i}){let a=Am({park:e,waterTexture:t,sunDirection:n,designArea:r,lightMap:i}),{uniforms:o}=a,s=new ri(jm(r,e.extent),a);return s.renderOrder=1,s.name=`water`,{name:`water`,object:s,update({t:e}){o.uTime.value=e}}}function Am({park:e,waterTexture:t,sunDirection:n,designArea:r,seaEdge:i,lightMap:a}){let{cx:o,cz:s,size:c}=e.extent,l=So.merge([J.fog,{uWater:{value:t},uTime:{value:0},uSunDir:{value:n.clone().normalize()},uSky:{value:new W(Dm.sky)},uSeaShallow:{value:new W(Dm.shallow)},uSeaDeep:{value:new W(Dm.deep)},uLagoon:{value:new W(Dm.lagoon)},uPool:{value:new W(Dm.pool)},uRiver:{value:new W(Dm.river)},uInland:{value:+!!e.waterTint},uInlandShallow:{value:new W(e.waterTint?.shallow??`#000000`)},uInlandDeep:{value:new W(e.waterTint?.deep??`#000000`)},uNightSky:{value:new W(Om.sky)},uNightShallow:{value:new W(Om.shallow)},uNightDeep:{value:new W(Om.deep)}}]);l.uNight=Gp,l.uWater.value=t,l.uExtent={value:new H(o-c/2,s-c/2,c)},r&&Object.assign(l,gm(r));let u=r?{}:{LITE:``};return a&&r&&(l.uLightMap=a,u.NIGHT_LIGHTS=``),i&&!r&&(Object.assign(l,gm(i.area,`edge`),{uSeaEdgeColor:{value:new W(i.color)},uSeaEdgeBand:{value:new V(...i.band)}}),u.SEA_EDGE=``),new To({uniforms:l,vertexShader:Tm,fragmentShader:Em(r?.radii.length??0,u.SEA_EDGE===void 0?0:i.area.radii.length),defines:u,transparent:!0,fog:!0,depthWrite:!1})}function jm(e,{cx:t,cz:n,size:r}){let i=e.radii.length*2,a=r/2,o=[e.cx,0,e.cz];for(let r=0;r<i;r++){let s=r/i*Math.PI*2,c=e.radiusAt(s)+Bp.outer+3,l=kt.clamp(e.cx+Math.cos(s)*c,t-a,t+a),u=kt.clamp(e.cz+Math.sin(s)*c,n-a,n+a);o.push(l,0,u)}let s=[];for(let e=0;e<i;e++)s.push(0,1+(e+1)%i,1+e);let c=new Ar;return c.setAttribute(`position`,new G(o,3)),c.setIndex(s),c}var Mm={BROAD:0,BROAD_LIGHT:1,BUSH:2,PALM:3,CEIBA:4},Nm=10,Pm={[Mm.BROAD]:{crown:3.2,shadow:3.6,height:6.2},[Mm.BROAD_LIGHT]:{crown:3.2,shadow:3.6,height:6.2},[Mm.BUSH]:{crown:1.7,shadow:1.8,height:1.5},[Mm.PALM]:{crown:3.4,shadow:2.6,height:8.5},[Mm.CEIBA]:{crown:4.6,shadow:3.6,height:11}};function Fm(e){let t=new DataView(e),n=Math.floor(e.byteLength/Nm),r=new Float32Array(n*6);for(let e=0;e<n;e++){let n=e*Nm,i=e*6;r[i]=t.getInt16(n,!0)/10,r[i+1]=t.getInt16(n+2,!0)/100,r[i+2]=t.getInt16(n+4,!0)/10,r[i+3]=t.getUint8(n+6)/100,r[i+4]=t.getUint8(n+7)/255*Math.PI*2,r[i+5]=t.getUint8(n+8)}return r}function Im(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ar,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Lm(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Lm(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Lm(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new gr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Rm=(e=0,t=0,n=0,r=0,i=1,a=1,o=1)=>new U().compose(new H(e,t,n),new At().setFromAxisAngle(new H(0,1,0),r),new H(i,a,o)),zm=e=>e.index?e.toNonIndexed():e;function Bm(e,t,n=40){let r=[];for(let i=0;i<n;i++){let a=i/n*Math.PI*2;r.push([Math.cos(a)*e,Math.sin(a)*t])}return r}function Vm(e,t,n,r){let i=t>0?new q(t,e,n,r,3,!0):new Bi(e,n,r,3,!0);return i.translate(0,n/2,0),i}function Y(e,t){let n=new W(t),r=e.getAttribute(`position`).count,i=new Float32Array(r*3);for(let e=0;e<r;e++)i.set([n.r,n.g,n.b],e*3);return e.setAttribute(`color`,new gr(i,3)),e}function Hm(e,t){let n=new Float32Array(e.length*9),r=new Float32Array(e.length*6);e.forEach((e,t)=>n.set(e,t*9)),(t??[]).forEach((e,t)=>r.set(e,t*6));let i=new Ar;return i.setAttribute(`position`,new gr(n,3)),i.setAttribute(`uv`,new gr(r,2)),i.computeVertexNormals(),i}function Um(e,t,n,r,i,a,o,s){let c=Math.hypot(r[0]-n[0],r[2]-n[2]),l=c/o,u=((a[0]-n[0])*(r[0]-n[0])+(a[2]-n[2])*(r[2]-n[2]))/Math.max(c,1e-6)/o,d=((i[0]-n[0])*(r[0]-n[0])+(i[2]-n[2])*(r[2]-n[2]))/Math.max(c,1e-6)/o,f=s/o;e.push([...n,...r,...i],[...n,...i,...a]),t.push([0,0,l,0,d,f],[0,0,d,f,u,f])}function Wm(e,t,n,r=.6,i=3){let a=e+r*2,o=t+r*2,s=o>a;s&&([a,o]=[o,a]);let c=(a-o)/2,l=a/2,u=o/2,d=[],f=[],p=Math.hypot(u,n),m=(e,t,n)=>s?[n,t,-e]:[e,t,n];Um(d,f,m(-l,0,u),m(l,0,u),m(c,n,0),m(-c,n,0),i,p),Um(d,f,m(l,0,-u),m(-l,0,-u),m(-c,n,0),m(c,n,0),i,p);let h=Math.hypot(l-c,n);return Um(d,f,m(l,0,u),m(l,0,-u),m(c,n,0),m(c,n,0),i,h),Um(d,f,m(-l,0,-u),m(-l,0,u),m(-c,n,0),m(-c,n,0),i,h),Hm(d,f)}function Gm(e,t,n=[0,0],r=3){let i=[],a=[];for(let o=0;o<e.length;o++){let s=e[o],c=e[(o+1)%e.length],l=[s[0],0,s[1]],u=[c[0],0,c[1]],d=[n[0],t,n[1]],f=[(s[0]+c[0])/2,(s[1]+c[1])/2];Um(i,a,u,l,d,d,r,Math.hypot(Math.hypot(f[0]-n[0],f[1]-n[1]),t))}return Hm(i,a)}function Km(e,t,n,r,i=24){let a=[];for(let e=0;e<=i;e++){let o=n+(r-n)*e/i;a.push([Math.cos(o)*t,Math.sin(o)*t])}for(let t=i;t>=0;t--){let o=n+(r-n)*t/i;a.push([Math.cos(o)*e,Math.sin(o)*e])}return a}function qm(e,t,n=0){let r=[];for(let i=0;i<e;i++){let a=n+i/e*Math.PI*2;r.push([Math.cos(a)*t,Math.sin(a)*t])}return r}function Jm(e,t,{top:n=!0,bottom:r=!1}={}){let i=new no(new va(e.map(([e,t])=>new V(e,-t))),{depth:t,bevelEnabled:!1,steps:1});if(i.rotateX(-Math.PI/2),!n||!r){let e=i.index?i.toNonIndexed():i,a=e.getAttribute(`position`),o=[];for(let e=0;e<a.count;e+=3){let i=a.getY(e),s=a.getY(e+1),c=a.getY(e+2);Math.abs(i-s)<1e-4&&Math.abs(s-c)<1e-4&&(i>t/2&&!n||i<t/2&&!r)||o.push(e)}let s=new Ar;for(let t of[`position`,`normal`,`uv`]){let n=e.getAttribute(t),r=new Float32Array(o.length*3*n.itemSize);o.forEach((e,t)=>{for(let i=0;i<3;i++)for(let a=0;a<n.itemSize;a++)r[(t*3+i)*n.itemSize+a]=n.array[(e+i)*n.itemSize+a]}),s.setAttribute(t,new gr(r,n.itemSize))}return Ym(s,.25)}return Ym(i.index?i.toNonIndexed():i,.25)}function Ym(e,t){let n=e.getAttribute(`uv`);if(n)for(let e=0;e<n.array.length;e++)n.array[e]*=t;return e}function Xm(e,t=.25){let n=e.getAttribute(`position`),r=e.getAttribute(`normal`),i=new Float32Array(n.count*2);for(let e=0;e<n.count;e++){let a=Math.abs(r.getX(e)),o=Math.abs(r.getY(e)),s=Math.abs(r.getZ(e)),c=n.getX(e),l=n.getY(e),u=n.getZ(e),d,f;o>=a&&o>=s?(d=c,f=u):a>=s?(d=u,f=l):(d=c,f=l),i[e*2]=d*t,i[e*2+1]=f*t}return e.setAttribute(`uv`,new gr(i,2)),e}function Zm(e,t,n){let r=new va(e.map(([e,t])=>new V(e,-t)));for(let e of t)r.holes.push(new _a(e.map(([e,t])=>new V(e,-t))));let i=new no(r,{depth:n,bevelEnabled:!1,curveSegments:16});return i.rotateX(-Math.PI/2),i}function Qm(e,t){let n=new no(new va(e.map(([e,t])=>new V(-e,t))),{depth:t,bevelEnabled:!1});return n.rotateY(Math.PI/2),n.translate(-t/2,0,0),n}function $m(e,t,n,r=.6,i=3){let a=e.length,o=t=>e.map((n,r)=>{let i=e[(r-1+a)%a],o=e[(r+1)%a],s=[n[0]-i[0],n[1]-i[1]],c=[o[0]-n[0],o[1]-n[1]],l=Math.hypot(...s)||1,u=Math.hypot(...c)||1,d=[-s[1]/l,s[0]/l],f=[-c[1]/u,c[0]/u],p=d[0]+f[0],m=d[1]+f[1],h=Math.hypot(p,m)||1;p/=h,m/=h;let g=Math.max(.35,p*d[0]+m*d[1]);return[n[0]+p*t/g,n[1]+m*t/g]}),s=o(-r),c=o(t),l=[],u=[],d=Math.hypot(t+r,n);for(let e=0;e<a;e++){let t=(e+1)%a,r=[s[e][0],0,s[e][1]],o=[s[t][0],0,s[t][1]],f=[c[t][0],n,c[t][1]],p=[c[e][0],n,c[e][1]],m=Math.hypot(o[0]-r[0],o[2]-r[2])/i;l.push([...r,...f,...o],[...r,...p,...f]),u.push([0,0,m,d/i,m,0],[0,0,0,d/i,m,d/i])}let f=new lo(new va(c.map(([e,t])=>new V(e,-t))));f.rotateX(-Math.PI/2),f.translate(0,n,0);let p=f.index?f.toNonIndexed():f,m=Hm(l,u),h=p.getAttribute(`uv`);for(let e=0;e<h.count;e++)h.setXY(e,h.getX(e)/i,h.getY(e)/i);return Im([m,p])}function eh(e,t,{cell:n=2,lift:r=.2,skirt:i=.4,uvScale:a=.25}={}){let[o,s,c,l]=e,u=(e,t)=>Math.hypot(t[0]-e[0],t[1]-e[1]),d=Math.max(1,Math.ceil(Math.max(u(o,s),u(l,c))/n)),f=Math.max(1,Math.ceil(Math.max(u(o,l),u(s,c))/n)),p=(e,t)=>[0,1].map(n=>(1-t)*((1-e)*o[n]+e*s[n])+t*((1-e)*l[n]+e*c[n])),m=([e,n])=>[e,t(e,n)+r,n],h=[],g=[],_=(e,t,n,r,i)=>{let a=[t[0]-e[0],t[1]-e[1],t[2]-e[2]],o=[n[0]-e[0],n[1]-e[1],n[2]-e[2]],s=[a[1]*o[2]-a[2]*o[1],a[2]*o[0]-a[0]*o[2],a[0]*o[1]-a[1]*o[0]],c=s[0]*r[0]+s[1]*r[1]+s[2]*r[2]>=0?[e,t,n]:[e,n,t];for(let e of c)h.push(...e),g.push(...i(e))},v=([e,,t])=>[e*a,t*a];for(let e=0;e<d;e++)for(let t=0;t<f;t++){let n=m(p(e/d,t/f)),r=m(p((e+1)/d,t/f)),i=m(p(e/d,(t+1)/f)),a=m(p((e+1)/d,(t+1)/f));_(n,r,i,[0,1,0],v),_(r,a,i,[0,1,0],v)}let y=p(.5,.5),b=[[e=>p(e,0),d],[e=>p(1,e),f],[e=>p(1-e,1),d],[e=>p(0,1-e),f]],x=0;for(let[e,n]of b)for(let r=0;r<n;r++){let o=e(r/n),s=e((r+1)/n),c=m(o),l=m(s),d=[o[0],t(o[0],o[1])-i,o[1]],f=[s[0],t(s[0],s[1])-i,s[1]],p=[(o[0]+s[0])/2-y[0],0,(o[1]+s[1])/2-y[1]],h=u(o,s),g=e=>[(x+(e===l||e===f?h:0))*a,e[1]*a];_(c,l,d,p,g),_(l,f,d,p,g),x+=h}let S=new Ar;return S.setAttribute(`position`,new G(h,3)),S.setAttribute(`uv`,new G(g,2)),S.computeVertexNormals(),S}var th=e=>new W(e);function nh(e,t){let n=e.getAttribute(`position`),r=new Float32Array(n.count*3),i=new W;for(let e=0;e<n.count;e++)t(i,n.getX(e),n.getY(e),n.getZ(e)),r[e*3]=i.r,r[e*3+1]=i.g,r[e*3+2]=i.b;return e.setAttribute(`color`,new gr(r,3)),e}function rh(e,t,n,r,i=1,a=[t,n,r],o=0){let s=zm(new ao(e,o));s.scale(1,i,1),s.translate(t,n,r);let c=s.getAttribute(`position`),l=s.getAttribute(`normal`),u=new H;for(let e=0;e<c.count;e++)u.set(c.getX(e)-a[0],(c.getY(e)-a[1])*1.2,c.getZ(e)-a[2]).normalize(),l.setXYZ(e,u.x,u.y,u.z);return s}function ih(e,t,n,r,i=5){let a=zm(new q(t,e,n,i,1,!0));return a.translate(0,n/2,0),nh(a,e=>e.copy(r))}function ah(e,t,n,r,i,a){return nh(Im(e.map(([e,t,n,r,i])=>rh(e,t,n,r,i??1,a))),(e,a,o)=>{let s=kt.clamp((o-r)/(i-r),0,1);e.copy(t).lerp(n,.12+.88*s*s*(3-2*s)),e.multiplyScalar(.8+.2*Math.min(1,s*3))})}function oh(e,t){return Im([ih(.32,.22,4.2,th(`#7a5a3e`)),ah([[3,0,6.4,0,.85],[2.2,1.9,5.4,.6,.85],[2.1,-1.6,5.6,-.9,.85],[1.9,.2,7.9,-.3,.85]],e,t,3.4,9.2,[0,6.2,0])])}function sh(){return ah([[1.7,0,1.4,0,.8],[1.2,1.1,1.1,.4,.8]],th(`#3c6b2a`),th(`#94c75c`),0,2.8,[0,1.5,0])}function ch(){return Im([ih(.6,.35,10.5,th(`#86765f`)),ah([[4.2,0,11.2,0,.45],[3.2,3,10.6,1,.45],[3,-2.8,10.8,-1.4,.45],[2.8,.4,12.2,2.4,.45]],th(`#3b6a2b`),th(`#9ccb64`),9,13.5,[0,11,0])])}function lh(){let e=[],t=zm(new mo(new Zi([new H(0,0,0),new H(.25,3,0),new H(.75,6,0),new H(1.4,8.6,0)]),5,.2,5,!1));e.push(nh(t,e=>e.set(`#94805f`)));let n=new H(1.4,8.6,0);for(let t=0;t<8;t++){let r=t/8*Math.PI*2+t%2*.2,i=new H(Math.cos(r),0,Math.sin(r)),a=new H(-i.z,0,i.x),o=3.6+t%3*.4,s=[],c=[];for(let e=0;e<=4;e++){let t=e/4,r=n.clone().addScaledVector(i,o*t);r.y+=Math.sin(t*Math.PI*.7)*1-t*t*2.6;let s=Math.sin(t*Math.PI)*.75+.05;c.push([r.clone().addScaledVector(a,s),r.clone().addScaledVector(a,-s),r.clone()])}for(let e=0;e<4;e++){let[t,n,r]=c[e],[i,a,o]=c[e+1];r.y+=.12,o.y+=.12,s.push(t,r,i,r,o,i,r,n,o,n,a,o)}let l=new Ar().setFromPoints(s);l.computeVertexNormals();let u=l.getAttribute(`normal`);for(let e=0;e<u.count;e++){let t=new H(u.getX(e),Math.abs(u.getY(e))+.8,u.getZ(e)).normalize();u.setXYZ(e,t.x,t.y,t.z)}l.setAttribute(`uv`,new gr(new Float32Array(u.count*2),2)),e.push(nh(l,(e,t,n)=>e.set(`#4a8f36`).lerp(th(`#a8d86c`),kt.clamp((n-6.5)/3,0,1))))}for(let t of e)t.getAttribute(`uv`)||t.setAttribute(`uv`,new gr(new Float32Array(t.getAttribute(`position`).count*2),2));return Im(e.map(e=>{for(let t of Object.keys(e.attributes))[`position`,`normal`,`color`,`uv`].includes(t)||e.deleteAttribute(t);return e}))}function uh(e,t){return ah([[3.4,0,6.2,0,.8]],e,t,3.4,9.2,[0,6.2,0])}function dh(){let e=[],t=new H(1.4,8.4,0);for(let n=0;n<6;n++){let r=n/6*Math.PI*2,i=new H(Math.cos(r),0,Math.sin(r)),a=new H(-i.z,0,i.x).multiplyScalar(.7),o=t.clone().addScaledVector(i,3.8);o.y-=1.6;let s=t.clone().addScaledVector(i,1.9);s.y+=.3,e.push(t,s.clone().add(a),o,t,o,s.clone().sub(a))}let n=new Ar().setFromPoints(e);n.computeVertexNormals();let r=n.getAttribute(`normal`);for(let e=0;e<r.count;e++)r.setXYZ(e,0,1,0);return n.setAttribute(`uv`,new gr(new Float32Array(r.count*2),2)),nh(n,(e,t,n)=>e.set(`#4a8f36`).lerp(th(`#a8d86c`),kt.clamp((n-6.5)/3,0,1)))}var fh=[th(`#38652d`),th(`#80b752`)],ph=[th(`#477a33`),th(`#9cca64`)];function mh(){return{[Mm.BROAD]:{hi:oh(fh[0],fh[1]),lo:uh(fh[0],fh[1])},[Mm.BROAD_LIGHT]:{hi:oh(ph[0],ph[1]),lo:uh(ph[0],ph[1])},[Mm.BUSH]:{hi:sh(),lo:sh()},[Mm.PALM]:{hi:lh(),lo:dh(),side:2},[Mm.CEIBA]:{hi:ch(),lo:ch()}}}function hh(e){let t=mh()[e],n=t.hi.index?t.hi.toNonIndexed():t.hi;if(t.side!==2)return n;let r=n.clone();for(let e of Object.values(r.attributes)){let t=e.array,n=e.itemSize;for(let r=0;r+2<e.count;r+=3){let e=(r+1)*n,i=(r+2)*n,a=t.slice(e,e+n);t.copyWithin(e,i,i+n),t.set(a,i)}}return Im([n,r])}function gh(e,t={}){let n=new Oo({vertexColors:!0,...t});return n.onBeforeCompile=t=>{t.uniforms.uTime=e,t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uTime;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec2 seed = instanceMatrix[3].xz;
        #else
          vec2 seed = vec2(0.0);
        #endif
        float bend = max(position.y - 2.5, 0.0) / 8.0;
        float sway = sin(uTime * 1.1 + seed.x * 0.13 + seed.y * 0.07) * 0.18 + sin(uTime * 2.3 + seed.y * 0.21) * 0.06;
        transformed.x += sway * bend;
        transformed.z += sway * 0.6 * bend;`)},n}var _h=300;function vh({buffer:e}){let t=Fm(e),n=t.length/6,r={value:0},i=mh();for(let e of Object.values(i))e.material=gh(r,{side:e.side??0});let a=new Map,o=new Map;for(let e=0;e<n;e++){let n=e*6,r=t[n+5];if(!i[r])continue;let s=`${Math.floor(t[n]/_h)},${Math.floor(t[n+2]/_h)},${r}`;a.has(s)||a.set(s,[]),a.get(s).push(e),o.has(r)||o.set(r,[]),o.get(r).push(e)}let s=(e,n)=>{Th(e,t,n),e.receiveShadow=!0},c=new On,l=new On;c.name=`vegetation:chunks`,l.name=`vegetation:far`;let u=[];for(let[e,n]of a){let r=+e.split(`,`)[2],a=new hi(i[r].hi,i[r].material,n.length);s(a,n);let o=new hi(i[r].lo,i[r].material,n.length);o.instanceMatrix=a.instanceMatrix,o.instanceColor=a.instanceColor,o.boundingSphere=a.boundingSphere,o.receiveShadow=!0,o.visible=!1;let l=new Qn;for(let e of n)l.expandByPoint(new H(t[e*6],t[e*6+1],t[e*6+2]));l.max.y+=12,c.add(a,o),u.push({hi:a,lo:o,box:l})}for(let[e,t]of o){let n=new hi(i[e].lo,i[e].material,t.length);s(n,t),l.add(n)}let d=new On;d.name=`vegetation`,d.add(yf(c),yf(l)),l.visible=!1;let f=420,p=new H;return{name:`vegetation`,object:d,count:n,setQuality(e){f=e.lod},update({t:e,distance:t,camera:n}){r.value=e;let i=t>f*1.6;if(c.visible=!i,l.visible=i,i)return;let a=n.position;for(let e of u){let t=e.box.clampPoint(a,p).distanceTo(a)<f;e.hi.visible=t,e.lo.visible=!t}}}}var yh=new U,bh=new At,xh=new H,Sh=new H,Ch=new H(0,1,0),wh=new W;function Th(e,t,n,r={}){for(let i=0;i<n.length;i++){let a=n[i],o=a*6,s=t[o+5],c=t[o+3]*(r.scale?.[s]??1);Sh.set(t[o],t[o+1]-.15,t[o+2]),bh.setFromAxisAngle(Ch,t[o+4]),xh.set(c,s===Mm.PALM?c*(.9+a*7919%100/400):c,c),e.setMatrixAt(i,yh.compose(Sh,bh,xh));let l=.86+a*2654435761%1e3/1e3*.28;wh.setRGB(l,l*(.97+a*97%10/160),l*.95),r.tint?.[s]&&wh.multiply(r.tint[s]),e.setColorAt(i,wh)}e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0,e.computeBoundingSphere()}function Eh(e){let t=e.index?e.toNonIndexed():e;t.getAttribute(`uv`)||t.setAttribute(`uv`,new gr(new Float32Array(t.getAttribute(`position`).count*2),2)),t.getAttribute(`normal`)||t.computeVertexNormals();for(let e of Object.keys(t.attributes))[`position`,`normal`,`uv`,`color`].includes(e)||t.deleteAttribute(e);return t}var Dh=class{constructor(){this.parts=new Map}add(e,t,n){let r=Eh(t);n&&r.applyMatrix4(n),this.parts.has(e)||this.parts.set(e,[]),this.parts.get(e).push(r)}build(e,{castShadow:t=!0,receiveShadow:n=!0}={}){let r=new On;for(let[i,a]of this.parts){if(a.some(e=>e.getAttribute(`color`))){for(let e of a)if(!e.getAttribute(`color`)){let t=new Float32Array(e.getAttribute(`position`).count*3).fill(1);e.setAttribute(`color`,new gr(t,3))}}let o=Im(a,!1),s=e[i];if(!s)throw Error(`Unknown material "${i}"`);let c=new ri(o,s);c.castShadow=t,c.receiveShadow=n,c.name=`batch:${i}`,r.add(c)}return r}};function Oh(e,t,n){let r=[],i=[];for(let a=0;a<e.length;a++){let[o,s]=e[a],[c,l]=e[(a+1)%e.length],u=Math.hypot(c-o,l-s),d=Math.max(1,Math.round(u/3.2)),f=n/3.3,p=t+n;r.push(o,t,s,c,p,l,c,t,l,o,t,s,o,p,s,c,p,l),i.push(0,0,d,f,d,0,0,0,0,f,d,f)}let a=new Ar;return a.setAttribute(`position`,new G(r,3)),a.setAttribute(`uv`,new G(i,2)),a.computeVertexNormals(),a}function kh(e,t,n=.6,r=.25){let i=[];for(let a=0;a<e.length;a++){let[o,s]=e[a],[c,l]=e[(a+1)%e.length],u=new K(Math.hypot(c-o,l-s)+r,n,r);u.translate(0,n/2,0),i.push([u,Rm((o+c)/2,t,(s+l)/2,-Math.atan2(l-s,c-o))])}return i}function Ah(e,t,n,r,i,a,o,s,c=3.5){let l=Math.max(1,Math.round(i/c)),u=Math.max(1,Math.round(a/c)),d=Math.cos(-o),f=Math.sin(-o),p=new q(.14,.16,s,5);p.translate(0,s/2,0);let m=(i,a)=>e.add(`wood`,p.clone(),Rm(t+i*d+a*f,n,r-i*f+a*d));for(let e=0;e<=l;e++)for(let t of[-a/2,a/2])m(-i/2+e/l*i,t);for(let e=1;e<u;e++)for(let t of[-i/2,i/2])m(t,-a/2+e/u*a)}function jh(e,t,n=14,r=0){let i=r>0?new q(r,e,t,n,2,!0):new Bi(e,t,n,2,!0),a=Math.hypot(e-r,t),o=i.getAttribute(`uv`);for(let t=0;t<o.count;t++)o.setXY(t,o.getX(t)*(Math.PI*2*e)/3,o.getY(t)*a/3);return i.translate(0,t/2,0),i}function Mh(e,t,n,r,i,a){let o=i>14?3:2,s=i,c=n;for(let n=0;n<o;n++){let i=n===o-1,l=i?a*.55:a*.32,u=i?0:s*.52;e.add(`thatch`,jh(s,l,Math.max(12,Math.round(s*1.5)),u),Rm(t,c,r)),c+=l*.82,s=u*1.22}}function Nh(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Ph(e){return()=>(e=e*16807%2147483647)/2147483647}var Fh=new Map;function Ih(e,t,r,i=!0){if(Fh.has(e))return Fh.get(e);let a=document.createElement(`canvas`);a.width=a.height=t,r(a.getContext(`2d`),t);let o=pf(new Pi(a));return o.colorSpace=Be,i&&(o.wrapS=o.wrapT=n),o.anisotropy=4,Fh.set(e,xf(o)),o}function Lh(){let e=Nh(11);return Ih(`thatch`,256,(t,n)=>{t.fillStyle=`#c4a066`,t.fillRect(0,0,n,n);for(let r=0;r<1400;r++){let r=e()*n,i=e()*n,a=10+e()*30,o=150+e()*70;t.strokeStyle=`rgba(${o},${o*.82},${o*.52},0.55)`,t.lineWidth=1+e()*1.5,t.beginPath(),t.moveTo(r,i),t.lineTo(r+(e()-.5)*3,i+a),t.stroke()}for(let e=0;e<n;e+=32)t.fillStyle=`rgba(90,60,30,0.18)`,t.fillRect(0,e,n,3)})}function Rh(){let e=Nh(12);return Ih(`tiles`,256,(t,n)=>{t.fillStyle=`#e39572`,t.fillRect(0,0,n,n);let r=n/16,i=n/16;for(let a=0;a<16;a++){for(let n=0;n<16;n++){let o=n*i+(a%2?i/2:0),s=t.createLinearGradient(o,0,o+i,0),c=.9+e()*.2;s.addColorStop(0,`rgb(${202*c},${118*c},${90*c})`),s.addColorStop(.5,`rgb(${240*c},${162*c},${126*c})`),s.addColorStop(1,`rgb(${202*c},${118*c},${90*c})`),t.fillStyle=s,t.fillRect(o,a*r,i-1,r-2)}t.fillStyle=`rgba(90,40,28,0.25)`,t.fillRect(0,a*r+r-2,n,2)}})}function zh(){let e=Nh(13);return Ih(`stone`,256,(t,n)=>{t.fillStyle=`#d6ccb2`,t.fillRect(0,0,n,n);for(let r=0;r<n;r+=16){let i=r/16%2?-12:0;for(;i<n;){let n=20+e()*26,a=.86+e()*.2;t.fillStyle=`rgb(${214*a},${204*a},${178*a})`,t.fillRect(i+1,r+1,n-2,14),i+=n}}for(let r=0;r<300;r++)t.fillStyle=`rgba(90,110,60,${e()*.12})`,t.beginPath(),t.arc(e()*n,e()*n,e()*8,0,Math.PI*2),t.fill()})}function Bh(e,t,n,r,i=.8){let a=e/t,o=e/n,s=[];for(let e=0;e<n;e++)for(let n=0;n<t;n++){let t=e%2?.5:0;s.push([(n+t+.5+(r()-.5)*i)*a,(e+.5+(r()-.5)*i)*o])}let c=new Int32Array(e*e),l=new Float32Array(e*e);for(let r=0;r<e;r++){let i=Math.floor(r/o);for(let u=0;u<e;u++){let d=Math.floor(u/a),f=1/0,p=1/0,m=0;for(let e=-2;e<=2;e++)for(let c=-2;c<=2;c++){let l=i+e,h=d+c,g=(l%n+n)%n,_=(h%t+t)%t,v=s[g*t+_],y=v[0]+(h-_)*a,b=v[1]+(l-g)*o,x=Math.hypot(u+.5-y,r+.5-b);x<f?(p=f,f=x,m=g*t+_):x<p&&(p=x)}c[r*e+u]=m,l[r*e+u]=(p-f)/2}}return{id:c,edge:l,count:s.length}}function Vh(e,t,n,r,i){let a=e.getImageData(0,0,t,t),o=a.data;if(o?.length){for(let e=0;e<t*t;e++){let[a,s,c]=i(r[n.id[e]],n.edge[e],e%t,e/t|0);o[e*4]=a,o[e*4+1]=s,o[e*4+2]=c,o[e*4+3]=255}e.putImageData(a,0,0)}}function Hh(){let e=Nh(17);return Ih(`rubble`,256,(t,n)=>{let r=Bh(n,12,14,e,.9);Vh(t,n,r,Array.from({length:r.count},()=>{let t=.8+e()*.24,n=e()*10;return[228*t+n,222*t+n*.6,204*t]}),([e,t,n],r,i,a)=>{let o=((i*73856093^a*19349663)>>>0)%23;if(r<1.2)return[126,119,106];let s=(.8+.2*Math.min(1,(r-1.2)/4))*(.95+o/230);return[e*s,t*s,n*s]})})}function Uh(){let e=Nh(19);return Ih(`paving`,256,(t,n)=>{let r=Bh(n,8,8,e,1);Vh(t,n,r,Array.from({length:r.count},()=>{let t=.92+e()*.12;return[222*t,219*t,208*t]}),([e,t,n],r,i,a)=>{let o=((i*2654435761^a*40503)>>>0)%17;if(r<.9)return[160,155,143];let s=(r<2.5?.95:1)*(.97+o/400);return[e*s,t*s,n*s]})})}function Wh(){return Ih(`facade`,128,(e,t)=>{e.fillStyle=`#ffffff`,e.fillRect(0,0,t,t);let n=e.createLinearGradient(0,0,0,t);n.addColorStop(0,`rgba(0,0,0,0.05)`),n.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=n,e.fillRect(0,0,t,t),e.fillStyle=`#d9cfbd`,e.fillRect(38,30,52,62),e.fillStyle=`#3b4b57`,e.fillRect(42,34,44,54),e.fillStyle=`rgba(160,205,225,0.55)`,e.fillRect(44,36,18,50),e.fillStyle=`#d9cfbd`,e.fillRect(62,34,4,54),e.fillStyle=`#bfb39d`,e.fillRect(34,92,60,6),e.fillStyle=`rgba(0,0,0,0.08)`,e.fillRect(0,0,t,5)})}var Gh=4;function Kh(){let e=Nh(23),t=Ih(`facade-glow`,512,(t,n)=>{t.fillStyle=`#000000`,t.fillRect(0,0,n,n);let r=n/Gh;for(let n=0;n<Gh;n++)for(let i=0;i<Gh;i++){let a=e()<.72?.6+e()*.4:.05,o=i*r,s=n*r,c=t.createLinearGradient(0,s+34,0,s+88);c.addColorStop(0,`rgb(${255*a*.8},${214*a*.8},${150*a*.8})`),c.addColorStop(1,`rgb(${255*a},${226*a},${170*a})`),t.fillStyle=c,t.fillRect(o+42,s+34,44,54),t.fillStyle=`#000000`,t.fillRect(o+62,s+34,4,54)}});return t.repeat.set(1/Gh,1/Gh),t.name=`facade-glow`,t}function qh(){let e=Nh(29);return Ih(`pavers`,256,(t,n)=>{t.fillStyle=`#8e8d88`,t.fillRect(0,0,n,n);let r=n/16,i=n/32;for(let n=0;n<32;n++)for(let a=-1;a<16;a++){let o=196+Math.floor(e()*24);t.fillStyle=`rgb(${o},${o-1},${o-5})`,t.fillRect(a*r+(n%2?r/2:0)+1,n*i+1,r-2,i-2)}})}function Jh(){let e=[[`#1d4f9c`,`#f2c33a`,`#f6f1e4`],[`#b8482a`,`#f0a63a`,`#3a2418`],[`#f6f1e4`,`#222222`,`#c43c3c`],[`#2a8f8a`,`#f6f1e4`,`#e0662e`],[`#7a3a8c`,`#f2c33a`,`#2fb5c9`]];return Ih(`textile`,256,(t,n)=>{let r=n/4;for(let n=0;n<4;n++)for(let i=0;i<4;i++){let[a,o,s]=e[(i*3+n*2)%e.length],c=i*r,l=n*r,u=r/2;t.fillStyle=a,t.fillRect(c,l,r,r);let d=(i+n*2)%4;if(d===0)for(let e=4;e>0;e--){t.fillStyle=e%2?o:s;let n=e/4*u*.9;for(let e=0;e<4;e++){let r=n*(4-e)/4;t.fillRect(c+u-r,l+u-n+e*n/4,2*r,n/4*.9),t.fillRect(c+u-r,l+u+n-(e+1)*n/4,2*r,n/4*.9)}}else if(d===1){t.lineWidth=r/12;for(let e=0;e<4;e++){t.strokeStyle=e%2?o:s,t.beginPath();for(let n=0;n<=8;n++)t.lineTo(c+n*r/8,l+(e+.5)*(r/4)+(n%2?-r/14:r/14));t.stroke()}}else if(d===2)t.fillStyle=o,t.fillRect(c+u-r*.1,l+r*.12,r*.2,r*.76),t.fillRect(c+r*.12,l+u-r*.1,r*.76,r*.2),t.fillStyle=s,t.fillRect(c+u-r*.2,l+u-r*.2,r*.4,r*.4),t.fillStyle=o,t.fillRect(c+u-r*.07,l+u-r*.07,r*.14,r*.14);else for(let e=0;e<6;e++){t.fillStyle=e%2?o:s,t.fillRect(c,l+e*r/6,r,r/14);for(let n=0;n<5;n++)t.fillRect(c+(n+.3)*(r/5),l+(e+.45)*(r/6),r/16,r/16)}}})}function Yh(){return Ih(`chainLink`,64,(e,t)=>{e.clearRect(0,0,t,t),e.strokeStyle=`rgba(214,219,221,0.9)`,e.lineWidth=1.6;for(let n=-6;n<=6;n++){let r=n*t/6;e.beginPath(),e.moveTo(r,0),e.lineTo(r+t,t),e.moveTo(r,t),e.lineTo(r+t,0),e.stroke()}})}function Xh(){return Ih(`net`,128,(e,t)=>{e.clearRect(0,0,t,t),e.strokeStyle=`rgba(35,45,40,0.55)`,e.lineWidth=1.2;for(let n=0;n<=t;n+=16)e.beginPath(),e.moveTo(n,0),e.lineTo(n,t),e.stroke(),e.beginPath(),e.moveTo(0,n),e.lineTo(t,n),e.stroke()})}var Zh={cream:15985106,white:16315886,limestone:14472125,stone:12432805,darkStone:9538175,terracotta:14914162,tileDark:12610896,thatch:13610616,thatchDark:10847314,wood:8806463,yellow:15911246,ochre:15119194,red:13390916,teal:4960430,green:5811036,glass:11131882,water:6538198},Qh=1.5;function X(e,t={}){let{roughness:n=.85,metalness:r=0,...i}=t;return r===0&&n>=.7?new Oo({color:e,...i}):new Do({color:e,roughness:n,metalness:r,...i})}var $h;function eg(){if($h)return $h;let e=zh(),t=Hh(),n=Wh(),r=Kh(),i=e=>Zp(X(e,{map:n,emissive:qp.window,emissiveMap:r}),Qh,0);$h={wall:X(Zh.cream),white:X(Zh.white),limestone:X(16777215,{map:t}),stone:X(Zh.stone),darkStone:X(Zh.darkStone),rockwall:X(13288114,{map:t,roughness:1}),darkRubble:X(6183248,{map:t,roughness:1}),paving:X(16777215,{map:Uh(),roughness:1}),textile:X(16777215,{map:Jh(),roughness:.8}),pavers:X(16777215,{map:qh(),roughness:1}),terrace:X(15250071,{map:e,roughness:.9}),court:X(13400664),concrete:X(15723749,{roughness:.85}),pierStone:X(15131352,{map:e,roughness:.9}),facade:i(Zh.cream),facadeWhite:i(16316144),facadeOchre:i(Zh.ochre),facadeMaroon:i(11887194),tile:X(16777215,{map:Rh(),roughness:.7}),thatch:X(16777215,{map:Lh(),roughness:1}),thatchDark:X(9729354,{roughness:1}),slate:X(10133949,{roughness:.6,metalness:.15}),shadeNet:X(6245712,{roughness:1}),wood:X(Zh.wood),weatheredWood:X(7623736,{roughness:1}),iron:X(2830131,{roughness:.5,metalness:.6}),steel:X(15330800,{roughness:.35,metalness:.6}),gold:X(13935927,{roughness:.3,metalness:.8}),bronze:X(9202236,{roughness:.4,metalness:.7}),bell:X(10124092,{metalness:.7,roughness:.35}),lamp:Zp(X(16774084,{emissive:16769946,emissiveIntensity:.6}),2.4),window:Zp(X(3095108,{emissive:qp.window}),1.3,0),glazedBlue:X(4159696,{roughness:.5}),plastic:X(16777215,{vertexColors:!0,roughness:.35}),yellow:X(Zh.yellow),ochre:X(Zh.ochre),red:X(Zh.red),teal:X(Zh.teal),green:X(Zh.green),dark:X(3355183),boatStripe:X(1914199),boatCanopy:X(2060210),lawn:X(8831066,{roughness:1}),leaves:X(5935417,{roughness:.9,flatShading:!0}),rock:X(11314323,{roughness:1,flatShading:!0}),sandstone:X(14537397,{roughness:1,flatShading:!0}),glass:Zp(X(Zh.glass,{roughness:.15,metalness:.3,transparent:!0,opacity:.75,emissive:qp.window}),.45,0),pool:X(Zh.water,{roughness:.1,metalness:.1}),vertex:X(16777215,{vertexColors:!0})};for(let e of Object.values($h))xf(e);return $h}var tg={tile:`tile`,thatch:`thatch`,white:`white`,stone:`stone`,slate:`slate`},ng=[`facade`,`facadeOchre`,`facadeMaroon`];function rg({buildings:e}){let t=new Dh;for(let n of e){let{box:e}=n;if(n.src===`osm`){let r=n.y-1.2,i=n.roof===`white`?`white`:`wall`,a=n.roof===`white`?`facadeWhite`:n.roof===`tile`?ng[n.id%3]:`facade`,o=Oh(n.poly,r,n.wall+1.2);if(t.add(a,o),n.shape===`flat`){t.add(i,Jm(n.poly,.01,{top:!0}),Rm(0,n.y+n.wall-.01,0));for(let[e,r]of kh(n.poly,n.y+n.wall))t.add(i,e,r)}if(n.shape===`inset`){let r=n.roof===`thatch`?.62:.4,i=Math.min(6,Math.min(e.length,e.width)*.32);t.add(tg[n.roof],$m(n.poly,i,i*r,.7),Rm(0,n.y+n.wall,0))}else if(n.shape===`hip`){let r=n.roof===`thatch`?.62:.38,i=Math.min(e.length,e.width)*r;t.add(tg[n.roof],Wm(e.length,e.width,Math.min(i,9),.7),Rm(e.cx,n.y+n.wall,e.cz,-e.angle))}else{let e=Jm(n.poly,.35,{top:!0});t.add(tg[n.roof]??`stone`,e,Rm(0,n.y+n.wall-.2,0))}continue}let r=Math.max(n.y,.3);if(n.shape===`cone`||n.kind===`umbrella`){let i=Math.max(e.length,e.width)/2+.4,a=Math.min(18,Math.max(1.6,i*.95));if(n.kind===`umbrella`){let i=new q(.08,.08,n.wall,4);i.translate(0,n.wall/2,0),t.add(`wood`,i,Rm(e.cx,r,e.cz))}else{let o=Math.max(5,Math.min(16,Math.round(i*1.4))),s=new q(.16,.18,n.wall,5);s.translate(0,n.wall/2,0);for(let n=0;n<o;n++){let a=n/o*Math.PI*2;t.add(`wood`,s.clone(),Rm(e.cx+Math.cos(a)*i*.82,r,e.cz+Math.sin(a)*i*.82))}i>8&&t.add(`wood`,Ym(new q(i*.15,i*.18,n.wall+a*.5,8),.3),Rm(e.cx,r+(n.wall+a*.5)/2,e.cz))}i>6?Mh(t,e.cx,r+n.wall,e.cz,i,a):t.add(`thatch`,jh(i,a),Rm(e.cx,r+n.wall,e.cz))}else{let i=Math.min(e.length,e.width)*.58;Ah(t,e.cx,r,e.cz,e.length*.9,e.width*.9,e.angle,n.wall),t.add(n.roof===`tile`?`tile`:`thatch`,Wm(e.length,e.width,Math.min(i,10),.5),Rm(e.cx,r+n.wall,e.cz,-e.angle))}}let n=yf(t.build(eg()));return n.name=`buildings`,{name:`buildings`,object:n,occludesRoutes:!0}}function ig({park:e,heightAt:t}){let n=new Dh;for(let r of e.piers)if(r.closed&&r.pts.length>3)n.add(`concrete`,Jm(r.pts.slice(0,-1),.4),Rm(0,.7,0));else for(let e=1;e<r.pts.length;e++){let[i,a]=r.pts[e-1],[o,s]=r.pts[e],c=Math.hypot(o-i,s-a),l=new K(c+.4,.35,1.8),u=Math.max(.9,Math.max(t(i,a),t(o,s))+.1);n.add(`concrete`,l,Rm((i+o)/2,u,(a+s)/2,-Math.atan2(s-a,o-i)));let d=Math.max(1,Math.floor(c/4));for(let e=0;e<=d;e++){let t=new q(.15,.15,3,5);n.add(`wood`,t,Rm(i+(o-i)*e/d,u-1.5,a+(s-a)*e/d))}}let r=yf(n.build(eg()));return r.name=`piers`,{name:`piers`,object:r}}var Z=class{constructor(){this.batch=new Dh}add(e,t,n=0,r=0,i=0,a=0,o=!0){return o&&Xm(t,.25),this.batch.add(e,t,Rm(n,r,i,a)),this}addTransformed(e,t,n){return this.batch.add(e,t,n),this}box(e,t,n,r,i,a,o,s=0){let c=new K(t,n,r);return c.translate(0,n/2,0),this.add(e,c,i,a,o,s)}cyl(e,t,n,r,i,a,o,s=16,c=!1){let l=new q(t,n,r,s,1,c);return l.translate(0,r/2,0),this.add(e,l,i,a,o)}rod(e,t,n,r,i=5){let a=new H(n[0]-t[0],n[1]-t[1],n[2]-t[2]),o=a.length();if(o<.001)return this;let s=new At().setFromUnitVectors(new H(0,1,0),a.normalize()),c=new H((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2);return this.addTransformed(e,new q(r,r,o,i,1,!0),new U().compose(c,s,new H(1,1,1)))}build(e){return this.batch.build(e?{...eg(),...e}:eg())}};function Q(e){if(!e.type||typeof e.build!=`function`)throw Error(`defineModel: type and build() are required`);return{params:{},...e}}var ag=Q({type:`tlachco`,label:`Gran Tlachco`,params:{radius:44},footprint:e=>({circle:e.radius+4}),build(e){let t=new Z,n=e.radius,r=e=>qm(8,e,Math.PI/8);t.add(`limestone`,Jm(r(n+5),3.2),0,-2,0),t.add(`wall`,Jm(r(n*.9),15,{top:!1}),0,1,0);let i=r(n*.985);for(let e=0;e<8;e++){let n=i[e],r=i[(e+1)%8];for(let e=0;e<7;e++){let i=(e+.5)/7;t.cyl(`white`,.75,.85,12,n[0]+(r[0]-n[0])*i,1.2,n[1]+(r[1]-n[1])*i,10)}}t.add(`white`,Jm(r(n+.8),2.4),0,13.2,0),t.addTransformed(`tile`,Gm(r(n+4.5),22,[0,0],4),Rm(0,15.4,0)),t.add(`white`,Jm(r(3.2),3.4),0,35,0),t.addTransformed(`tile`,Gm(r(4.2),3.2,[0,0],2),Rm(0,38.3,0));let a=n*Math.cos(Math.PI/8)+3;t.box(`limestone`,28,15,9,0,1,a);for(let e=-2;e<=2;e++){t.box(`window`,3.4,5.2,.4,e*5.2,1.6,a+4.4);let n=new q(1.7,1.7,.4,14,1,!1,0,Math.PI);n.rotateX(Math.PI/2),n.rotateZ(Math.PI/2),t.add(`window`,n,e*5.2,6.8,a+4.4,0,!1),t.cyl(`white`,.45,.5,8,e*5.2+2.6,1.2,a+4.9,10)}t.cyl(`white`,.45,.5,8,-13,1.2,a+4.9,10),t.box(`green`,28.6,.9,9.6,0,11.6,a),t.box(`white`,28.6,.6,9.8,0,9.4,a);for(let e=0;e<5;e++)t.box(`limestone`,22-e,.3,1,0,.6+e*.3-1.5,a+9.5-e);t.addTransformed(`tile`,Wm(28,9,3.5,.8),Rm(0,16,a)),t.add(`green`,Zm(r(n+1.2),[r(n+.2)],.8),0,14.6,0);for(let e of[-1,1])t.cyl(`limestone`,6.5,6.8,1.1,e*22,.4,a+14,24),t.cyl(`pool`,5.8,5.8,.15,e*22,1.45,a+14,24);return{object:t.build()}}}),og=null;function sg(){if(og)return og;let e=1024,t=.5,n=document.createElement(`canvas`);n.width=e*t,n.height=293;let r=n.getContext(`2d`);r.scale(t,t);let i=e/3;r.fillStyle=`#006847`,r.fillRect(0,0,342.3333333333333,585),r.fillStyle=`#ffffff`,r.fillRect(i,0,342.3333333333333,585),r.fillStyle=`#ce1126`,r.fillRect(2*i,0,i,585),r.save(),r.translate(512,298.5),r.scale(1,1),r.lineJoin=`round`,r.lineCap=`round`;let a=(e,t,n,i,a,o)=>{r.save(),r.translate(e,t),r.rotate(n),r.fillStyle=o,r.beginPath(),r.ellipse(0,0,i,a,0,0,Math.PI*2),r.fill(),r.restore()};for(let e=0;e<9;e++){let t=.35+e*.13,n=-Math.cos(t)*92,i=Math.sin(t)*70+22;a(n-8,i-4,t+2.2,14,7,`#3c6e2f`),a(-n+8,i-4,-t+.95,14,5,`#5a8f3a`),e%2&&(r.fillStyle=`#b3242e`,r.beginPath(),r.arc(-n+2,i+6,3.2,0,7),r.fill())}r.strokeStyle=`#5b4325`,r.lineWidth=3,r.beginPath(),r.arc(0,22,88,.3,Math.PI-.3),r.stroke(),[[`#006847`,-16],[`#ffffff`,0],[`#ce1126`,16]].forEach(([e,t])=>{r.fillStyle=e,r.beginPath(),r.ellipse(t,108,9,6,0,0,7),r.fill()}),r.fillStyle=`#2f7fb6`,r.beginPath(),r.ellipse(0,86,62,11,0,0,Math.PI*2),r.fill(),r.strokeStyle=`#bfe3f5`,r.lineWidth=2;for(let e=-2;e<=2;e++)r.beginPath(),r.arc(e*22,88,7,.2,Math.PI-.2),r.stroke();r.fillStyle=`#8b6b48`,r.beginPath(),r.moveTo(-26,82),r.quadraticCurveTo(0,64,26,82),r.closePath(),r.fill();let o=(e,t,n,i,a)=>{r.save(),r.translate(e,t),r.rotate(a),r.fillStyle=`#4c8a34`,r.beginPath(),r.ellipse(0,0,n,i,0,0,7),r.fill(),r.strokeStyle=`#2f5e22`,r.lineWidth=1.5,r.stroke(),r.restore()};o(0,60,12,18,0),o(-18,46,10,14,-.6),o(18,46,10,14,.6),o(-30,30,8,11,-.9),o(30,32,8,11,.9),r.fillStyle=`#c0283a`,[[-34,20],[-24,34],[26,22],[36,26],[8,42]].forEach(([e,t])=>{r.beginPath(),r.arc(e,t,3.5,0,7),r.fill()});let s=`#6b4423`,c=`#4a2e16`,l=`#c99a3b`;r.fillStyle=s,r.beginPath(),r.moveTo(-6,-10),r.bezierCurveTo(-40,-30,-70,-80,-58,-112),r.bezierCurveTo(-48,-90,-40,-70,-20,-52),r.bezierCurveTo(-30,-60,-34,-40,-10,-28),r.closePath(),r.fill(),r.beginPath(),r.moveTo(10,-14),r.bezierCurveTo(46,-30,78,-70,70,-104),r.bezierCurveTo(56,-84,46,-66,26,-54),r.bezierCurveTo(36,-60,40,-42,16,-30),r.closePath(),r.fill(),r.strokeStyle=c,r.lineWidth=2;for(let e=0;e<5;e++)r.beginPath(),r.moveTo(-14-e*8,-34-e*12),r.lineTo(-40-e*4,-50-e*14),r.stroke(),r.beginPath(),r.moveTo(20+e*8,-36-e*10),r.lineTo(46+e*4,-50-e*12),r.stroke();return r.fillStyle=s,r.beginPath(),r.ellipse(2,-6,18,30,.15,0,7),r.fill(),r.fillStyle=c,r.beginPath(),r.moveTo(-8,18),r.lineTo(-22,40),r.lineTo(4,30),r.lineTo(16,40),r.lineTo(12,18),r.closePath(),r.fill(),r.fillStyle=s,r.beginPath(),r.ellipse(-16,-40,11,9,-.3,0,7),r.fill(),r.fillStyle=l,r.beginPath(),r.moveTo(-26,-42),r.lineTo(-38,-36),r.lineTo(-26,-35),r.closePath(),r.fill(),r.fillStyle=`#fff`,r.beginPath(),r.arc(-18,-43,2,0,7),r.fill(),r.strokeStyle=l,r.lineWidth=3,r.beginPath(),r.moveTo(-4,20),r.lineTo(-8,38),r.moveTo(8,20),r.lineTo(12,38),r.stroke(),r.strokeStyle=`#2f7a3a`,r.lineWidth=4,r.beginPath(),r.moveTo(-36,-36),r.bezierCurveTo(-52,-20,-30,-8,-44,6),r.bezierCurveTo(-56,18,-36,26,-24,16),r.stroke(),r.fillStyle=`#2f7a3a`,r.beginPath(),r.ellipse(-37,-34,4,3,0,0,7),r.fill(),r.restore(),og=pf(new Pi(n)),og.colorSpace=Be,og.anisotropy=8,xf(og)}function cg(e){let{mesh:t,width:n,height:r,speed:i}=e;return{name:`flag`,driver:`flag`,params:{at:t.position.toArray(),width:n,height:r,speed:i},size:n,parts:[{object:t,rest:e.rest}]}}function lg(e,{segments:t=[28,10],speed:n=3.2}={}){let r=e*4/7,i=new so(e,r,t[0],t[1]);i.translate(e/2,-r/2,0);let a=new ri(i,new Do({map:sg(),side:2,roughness:.75}));a.castShadow=!0;let o=i.getAttribute(`position`),s=Float32Array.from(o.array),c=0;return{mesh:a,width:e,height:r,speed:n,rest(){let e=i.clone();e.getAttribute(`position`).array.set(s);let t=e.getAttribute(`normal`);for(let e=0;e<t.count;e++)t.setXYZ(e,0,0,1);return e},update(t){if((c++&1)!=1){for(let i=0;i<o.count;i++){let a=s[i*3],c=s[i*3+1],l=a/e,u=Math.sin(7/e*a-t*n+1.2/r*c)*.13*e+Math.sin(15/e*a-t*n*1.7+1.3)*.035*e;o.setXYZ(i,a-l*l*.04*e,c-l*l*.08*r+Math.sin(t*1.3+l*3)*.01*r*l,u*l)}o.needsUpdate=!0,i.computeVertexNormals(),a.rotation.y=.35+Math.sin(t*.21)*.3}}}}var ug=12,dg=6.6,fg=`#2f80d4`,pg=`#b1cfae`,mg=7.2,hg=10.2,gg=2.6,_g=4.2,vg=2.4,yg=3.8,bg=26,xg=Q({type:`scenicTower`,label:`Torre Escénica`,params:{height:80},footprint:()=>({circle:10.7}),build(e){let t=e.height,n=new Z;n.cyl(`paving`,mg,mg,1.1,0,-.6,0,32),n.add(`pool`,new co(mg,hg,40,1).rotateX(-Math.PI/2),0,-.05,0,0,!1),n.cyl(`stone`,10,10,.8,0,-.9,0,40),n.add(`white`,new q(10.649999999999999,10.649999999999999,.45,40,1,!0).translate(0,.12,0),0,0,0),n.add(`white`,new co(hg,10.649999999999999,40,1).rotateX(-Math.PI/2),0,.345,0,0,!1),n.add(`white`,new q(7.5,7.5,.65,40,1,!0).translate(0,.1,0),0,0,0),Sg(n),n.add(`plastic`,Y(new q(1.5,1.8,t-14,16).translate(0,(t-14)/2,0),pg),0,0,0);let r=t+gg+_g;n.cyl(`white`,3.5,yg,.25,0,r,0,ug);for(let e=0;e<4;e++){let t=e/4*Math.PI*2+.4;n.add(`plastic`,Y(new fo(.22,8,6),`#e03a2c`),Math.cos(t)*3.1999999999999997,r+.45,Math.sin(t)*3.1999999999999997)}let i=bg*.72/8;for(let e=0;e<8;e++){let t=e%2?`#f4f1ea`:`#e2662c`;n.add(`plastic`,Y(new q(.32,.36,i,10).translate(0,i/2,0),t),0,r+e*i,0)}let a=r+bg*.72;n.add(`plastic`,Y(new q(.5,.5,bg*.22,10).translate(0,bg*.22/2,0),`#c8662a`),0,a,0),n.cyl(`steel`,.04,.06,bg*.12,0,a+bg*.22,0,4);let o=new On;o.add(n.build());let s=new ri(kg([Eg(new q(1.5,1.5,14,16,1,!0).translate(0,t-7,0),8,8),Eg(new q(1.7,1.5,gg,ug,1,!0).translate(0,t+gg/2,0),ug),Eg(new q(yg,vg,_g,ug,1,!1).translate(0,t+gg+_g/2,0),ug)]),Og());s.castShadow=s.receiveShadow=!0,o.add(s);let c=lg(6.5);c.mesh.position.set(.5,a+bg*.21,0),o.add(c.mesh);let l=new On,u=new On;u.position.y=-4.4,l.add(u);let d=(e,t,n=`#ffffff`)=>new ri(Y(e.toNonIndexed(),n),t),f=d(Cg(),Tg()),p=d(new q(dg,dg,.9,ug).translate(0,1.45,0),eg().plastic,fg),m=d(new q(6.449999999999999,6.449999999999999,1.6,ug,1,!0).translate(0,2.7,0),eg().glass),h=d(new q(6,6.699999999999999,.5,ug).translate(0,3.75,0),eg().plastic,fg),g=[];for(let e=0;e<ug;e++){let t=e/ug*Math.PI*2;g.push(new K(.22,1.6,.22).translate(Math.cos(t)*6.5,2.7,Math.sin(t)*6.5))}g.push(new q(dg,dg,.12,ug,1,!0).translate(0,2.9,0));let _=d(kg(g),eg().plastic,`#f2f4f6`);for(let e of[f,p,m,h,_])e.castShadow=!0,u.add(e);return o.add(l),{object:o,update(e){let n=.5-.5*Math.cos(e/70*Math.PI*2);l.position.y=5+n*(t-18),l.rotation.y=e*.12,c.update(e)},animation:[{name:`cabin`,driver:`towerCabin`,params:{height:t},size:13.2,parts:[l]},cg(c)]}}});function Sg(e){let t=2.4,n=6.8,r=.45;e.box(`weatheredWood`,t,.18,4.999999999999999,0,.27,18.599999999999998/2);for(let i of[-1,1]){let a=i*(t/2-.08);for(let t=0;t<=4;t++)e.cyl(`weatheredWood`,.07,.08,1.1,a,r,n+4.999999999999999*t/4,6);e.rod(`weatheredWood`,[a,1.5,n],[a,1.5,11.799999999999999],.06,6);for(let t=0;t<4;t++){let r=n+4.999999999999999*t/4,i=n+4.999999999999999*(t+1)/4;e.rod(`weatheredWood`,[a,.55,r],[a,1.4,i],.045,5),e.rod(`weatheredWood`,[a,1.4,r],[a,.55,i],.045,5)}}for(let t of[-1,1])e.cyl(`wood`,.13,.13,3,t*1.3,r,6.5,8);e.box(`wood`,3.2,.25,.25,0,3.2,6.5);for(let t of[-1,1]){let n=new po(.35,.05,4,12);e.add(`wood`,n,t*.8,2.8000000000000003,6.6499999999999995,0,!1)}}function Cg(){let e=new q(dg,2.3,1,ug,2,!0).translate(0,.5,0),t=e.getAttribute(`position`),n=e.getAttribute(`uv`);for(let e=0;e<t.count;e++)n.setXY(e,.5+t.getX(e)/(2*dg),.5+t.getZ(e)/(2*dg));return e}var wg;function Tg(){if(wg)return wg;let e=Nh(41);return wg=xf(X(16777215,{map:Ih(`towerLily`,512,(t,n)=>{let r=n/2;t.fillStyle=`#15294b`,t.fillRect(0,0,n,n);let i=(n,i,a,o)=>{let s=(e,t)=>[r+Math.cos(n+t)*e,r+Math.sin(n+t)*e];t.beginPath(),t.moveTo(...s(i,0)),t.quadraticCurveTo(...s((i+a)*.55,o),...s(a,0)),t.quadraticCurveTo(...s((i+a)*.55,-o),...s(i,0)),t.fillStyle=`#ece0c4`,t.fill(),t.lineWidth=7,t.strokeStyle=`#0b0f1a`,t.stroke(),t.beginPath(),t.moveTo(...s(i,0)),t.lineTo(...s(a*.92,0)),t.lineWidth=6,t.strokeStyle=`#a3303a`,t.stroke(),t.fillStyle=`#7d2833`;for(let n=0;n<14;n++){let[n,r]=s(i+(a-i)*(.15+e()*.55),(e()-.5)*o*.9);t.beginPath(),t.ellipse(n,r,3+e()*3,2+e()*2,e()*3,0,Math.PI*2),t.fill()}};for(let e=0;e<6;e++)i(e/6*Math.PI*2+Math.PI/6,r*.36,r*.8,.33);for(let e=0;e<6;e++)i(e/6*Math.PI*2,r*.36,r*.98,.42)},!1),roughness:.6})),wg}function Eg(e,t,n=1){let r=e.getAttribute(`position`),i=e.getAttribute(`uv`),a=1/0,o=-1/0;for(let e=0;e<r.count;e++)a=Math.min(a,r.getY(e)),o=Math.max(o,r.getY(e));for(let s=0;s<r.count;s++){let c=Math.abs(e.getAttribute(`normal`).getY(s))>.9;i.setXY(s,c?.02:i.getX(s)*t,c?.02:(r.getY(s)-a)/(o-a)*n)}return e.toNonIndexed()}var Dg;function Og(){if(Dg)return Dg;let e=Nh(43);return Dg=xf(X(16777215,{map:Ih(`towerPetals`,128,(t,n)=>{t.fillStyle=`#f6f4ef`,t.fillRect(0,0,n,n),t.beginPath(),t.moveTo(n*.5,n*.98),t.quadraticCurveTo(n*.05,n*.45,n*.5,n*.02),t.quadraticCurveTo(n*.95,n*.45,n*.5,n*.98),t.lineWidth=4,t.strokeStyle=`#1c2f5a`,t.stroke(),t.fillStyle=`#4f86c8`,t.beginPath(),t.moveTo(n*.5,n*.02),t.quadraticCurveTo(n*.2,n*.22,n*.32,n*.3),t.lineTo(n*.68,n*.3),t.quadraticCurveTo(n*.8,n*.22,n*.5,n*.02),t.fill(),t.strokeStyle=`#8f2a3a`,t.lineWidth=3,t.beginPath(),t.moveTo(n*.5,n*.3),t.lineTo(n*.5,n*.9),t.stroke(),t.fillStyle=`#8f2a3a`;for(let r=0;r<10;r++)t.beginPath(),t.arc(n*(.3+e()*.4),n*(.4+e()*.45),2+e()*2,0,Math.PI*2),t.fill()}),roughness:.6})),Dg}function kg(e){return Im(e.map(e=>e.toNonIndexed()))}function Ag(e,t){e=zm(e);let n=new W(t),r=new Float32Array(e.getAttribute(`position`).count*3);for(let e=0;e<r.length;e+=3)r.set([n.r,n.g,n.b],e);return e.setAttribute(`color`,new gr(r,3)),e.getAttribute(`uv`)||e.setAttribute(`uv`,new gr(new Float32Array(e.getAttribute(`position`).count*2),2)),e}var jg=()=>eg().vertex;function Mg(e,t,{x:n=0,y:r=0,z:i=0,rx:a=0,ry:o=0,rz:s=0,sx:c=1,sy:l=1,sz:u=1}={}){let d=new U().compose(new H(n,r,i),new At().setFromEuler(new un(a,o,s)),new H(c,l,u));return Ag(e.applyMatrix4(d),t)}function Ng(e){let t=new ri(Im([Mg(new Ri(.28,.9,3,6),e[0]),Mg(new fo(.22,8,6),9067067,{y:.85}),Mg(new Bi(.3,.6,6),e[1],{y:1.2})]),jg());return t.castShadow=!0,t}function Pg(e){let t=new On,n=e===`jaguar`?14853692:13147236,r=e===`jaguar`?15983288:15192749,i=2826520,a=e=>{let t=new ri(Im(e),jg());return t.castShadow=!0,t},o=[Mg(new Ri(.32,1.1,4,8),n,{y:.75,rz:Math.PI/2}),Mg(new fo(.3,10,8),r,{x:.55,y:.68})];if(e===`jaguar`)for(let e=0;e<26;e++){let t=e*2.399%(Math.PI*2),n=e/26*1.4-.7,r=new fo(.06,5,4);r.scale(1,.4,1),r.lookAt(new H(0,-Math.cos(t),-Math.sin(t))),o.push(Mg(r,i,{x:n,y:.75+Math.cos(t)*.3,z:Math.sin(t)*.3}))}t.add(a(o));let s=[Mg(new fo(.24,12,10),n),Mg(new fo(.13,10,8),r,{x:.18,y:-.06}),Mg(new fo(.04,6,6),i,{x:.3,y:-.02})];for(let e of[-1,1])s.push(Mg(new Bi(.08,.14,6),n,{x:-.02,y:.22,z:e*.13})),s.push(Mg(new fo(.03,6,6),i,{x:.18,y:.07,z:e*.09}));let c=a(s);c.position.set(.95,1,0),t.add(c);let l=[];for(let[e,i]of[[.5,-1],[.5,1],[-.5,-1],[-.5,1]]){let o=a([Mg(new q(.08,.07,.7,6),n,{y:-.35}),Mg(new fo(.09,6,6),r,{y:-.7})]);o.position.set(e,.72,i*.18),l.push(o),t.add(o)}let u=[Mg(new mo(new Zi([new H(-.85,.85,0),new H(-1.3,.6,0),new H(-1.6,.35,.1),new H(-1.8,.5,.2)]),8,.06,5),n)];e!==`jaguar`&&u.push(Mg(new fo(.08,6,6),i,{x:-1.8,y:.5,z:.2}));let d=a(u);return t.add(d),t.scale.setScalar(1.6),{group:t,legs:l,head:c,tail:d}}function Fg(){let e=`#f3866e`,t=new fo(.5,8,6);t.scale(1.3,.75,.8),t.translate(0,1.55,0);let n=new mo(new Zi([new H(.55,1.65,0),new H(.75,2.2,0),new H(.5,2.7,0),new H(.75,3,0)]),6,.08,4),r=new fo(.16,6,5);r.translate(.8,3.02,0);let i=new Bi(.07,.3,4);i.rotateZ(-Math.PI/2-.5),i.translate(.98,2.94,0);let a=new q(.03,.03,1.3,3);a.translate(0,.65,.1);let o=a.clone();return o.translate(0,0,-.2),Im([Ag(t,e),Ag(n,e),Ag(r,e),Ag(i,`#222222`),Ag(a,`#e9808a`),Ag(o,`#e9808a`)])}function Ig(e=`#7a4a2a`,t=!1){let n=`#2a1c14`,r=[Mg(new Ri(.36,1.1,4,8),e,{y:1.3,rz:Math.PI/2}),Mg(new q(.17,.26,.85,6),e,{x:.82,y:1.72,rz:-.75}),Mg(new Ri(.14,.42,3,6),e,{x:1.18,y:1.95,rz:1.1}),Mg(new K(.5,.08,.06),n,{x:.72,y:1.92,rz:-.75}),Mg(new Bi(.12,.7,5),n,{x:-.92,y:1.15,rz:-.5})];for(let[t,i]of[[.55,.17],[.55,-.17],[-.55,.17],[-.55,-.17]])r.push(Mg(new q(.07,.08,1.05,5),e,{x:t,y:.52,z:i}),Mg(new q(.09,.09,.12,5),n,{x:t,y:.06,z:i}));return t&&r.push(Mg(new Ri(.2,.45,3,6),`#f4f1ea`,{y:2.05}),Mg(new K(.3,.42,.44),`#1d1d1f`,{y:1.82}),Mg(new fo(.14,8,6),9067067,{y:2.6}),Mg(new q(.42,.42,.05,12),`#1d1d1f`,{y:2.7}),Mg(new Bi(.16,.3,8),`#1d1d1f`,{y:2.86})),Im(r)}function Lg(e,t=1.6){let n=new Ri(.18,.7,3,6);n.rotateZ(Math.PI/2);let r=new Bi(.16,.9,4);r.rotateZ(Math.PI/2),r.translate(-.75,0,0);let i=new Ar().setFromPoints([new H(.25,0,.16),new H(-.25,0,.16),new H(-.05,0,t),new H(-.25,0,-.16),new H(.25,0,-.16),new H(-.05,0,-t)]);return i.computeVertexNormals(),Im([Ag(n,e[0]),Ag(r,e[1]??e[0]),Ag(i,e[2]??e[0])])}function Rg(){let e=new fo(.5,10,6);e.scale(2.2,.55,.6);let t=new Bi(.18,.5,4);t.translate(-.1,.45,0),t.rotateZ(.4);let n=new Bi(.25,.6,4);return n.rotateZ(Math.PI/2),n.scale(1,.4,1.6),n.translate(-1.25,0,0),Im([Ag(e,`#6f8fa6`),Ag(t,`#5c7a90`),Ag(n,`#5c7a90`)])}var zg=Q({type:`voladores`,label:`Voladores de Papantla`,params:{height:30},build(e){let t=e.height,n=new Z;n.cyl(`limestone`,5,5.4,.6,0,-.2,0,24),n.cyl(`wood`,.22,.38,t,0,0,0,8),n.box(`wood`,1.8,.25,1.8,0,t-1.2,0),n.cyl(`wood`,.7,.7,.3,0,t,0,10);let r=new On;r.add(n.build());let i=Ng([12596780,15974964]);i.position.y=t+.9,r.add(i);let a=[],o=3877402,s=new Mi(new Ar().setAttribute(`position`,new gr(new Float32Array(24),3)),new bi({color:o}));s.frustumCulled=!1,r.add(s);let c=s.geometry.getAttribute(`position`);for(let e=0;e<4;e++){let t=Ng([[12596780,16777215,2781142,4037450][e],15974964]);t.rotation.z=Math.PI,r.add(t),a.push(t)}return{object:r,update(e){let n=e%48/48,r=n<.8?n/.8:1-(n-.8)/.2,o=1+r*(t-3.5),s=1.2+r*7.5;a.forEach((n,r)=>{let i=e*.9+r*Math.PI/2,a=Math.cos(i)*s,l=t-1-o,u=Math.sin(i)*s;n.position.set(a,l,u),n.rotation.y=-i,c.setXYZ(r*2,Math.cos(i)*.9,t-1,Math.sin(i)*.9),c.setXYZ(r*2+1,a,l+.6,u)}),c.needsUpdate=!0,i.rotation.y=e*.9},animation:[{name:`dance`,driver:`voladores`,params:{height:t,ropeColor:`#${new W(o).getHexString()}`},size:1.5,parts:[i,...a]}]}}}),Bg=e=>[[-e/2,-e/2],[e/2,-e/2],[e/2,e/2],[-e/2,e/2]];function Vg(e,t,n,r){let i=[],a=([e,t,n],r)=>{for(let t=0;t<r;t++)[e,n]=[n,-e];return[e,t,n]};for(let o=0;o<4;o++){let s=a([-e,n,e],o),c=a([e,n,e],o),l=a([t,r,t],o),u=a([-t,r,t],o);i.push([...s,...c,...l],[...s,...l,...u])}return Hm(i)}var Hg=Q({type:`mayanPlaza`,label:`Plaza principal (pirámide escalonada con patio)`,params:{size:58,base:76,tiers:4,courtyard:25.5,height:7.5,stairs:[{side:`s`,width:12}],portals:[]},footprint:e=>({rect:[e.base+2,e.base+2]}),clearPaths:e=>{let t=e.base/2+1,n=(t,n)=>[e.x+t,e.z+n];return[{pts:[n(-t,-t),n(t,t)],width:12},{pts:[n(t,-t),n(-t,t)],width:12}]},build(e){let t=new Z,n=e.size,r=e.base??n+18,i=e.courtyard??25.5,a=e.height??7.5,o=e.tiers??4,s=e.stairs??[{side:`s`,width:12}],c=(a-1)/o,l=(r-n)/2/o,u=Math.min(.7,l*.3);for(let e=0;e<o;e++){let i=r/2-e*l,a=e*c-(e===0?.4:0);t.add(`limestone`,Vg(i,i-u,a,(e+1)*c)),t.add(`darkStone`,Vg(i-u+.12,i-u+.12,(e+1)*c-.22,(e+1)*c)),t.add(`lawn`,Zm(Bg(2*(i-u)),[Bg(n-.2)],.08),0,(e+1)*c-.06,0)}let d=e=>(s.find(t=>t.side===e)?.width??0)/2+2.5,f=[];for(let e=0;e<o;e++){let t=r/2-e*l-u-l/2+u/2,n=Math.round(2*t/7);for(let r=0;r<=n;r++){let i=-t+r*2*t/n;for(let[n,a,o]of[[i,t,`s`],[i,-t,`n`],[t,i,`e`],[-t,i,`w`]]){if(Math.abs(o===`s`||o===`n`?n:a)<d(o)||(e+r)%2)continue;let t=.9+(e*7+r*13)%5/5*.6,i=new ao(t,0);i.scale(1,.7,1),i.computeVertexNormals(),i.translate(n,(e+1)*c+t*.45,a),f.push(i)}}}for(let e of f)t.add(`leaves`,e,0,0,0,0,!1);t.add(`limestone`,Zm(Bg(n),[Bg(i)],a+.5),0,-.5,0),t.add(`darkStone`,Zm(Bg(n+.3),[Bg(n-1)],.4),0,a-.55,0),t.add(`darkStone`,Zm(Bg(i+1),[Bg(i-.3)],.5),0,a*.62,0),t.add(`terrace`,Zm(Bg(n-.9),[Bg(i+.9)],.12),0,a,0);let p=e=>s.find(t=>t.side===e)?.width,m=(e,n,r,i,o=.9,s=.45)=>{let c=i?[[-e/2,-i/2],[i/2,e/2]]:[[-e/2,e/2]];for(let[e,i]of c){let c=i-e,l=(e+i)/2;r===`x`?t.box(`limestone`,c,o,s,l,a,n):t.box(`limestone`,s,o,c,n,a,l)}},h=n/2-.22;m(n,-h,`x`,p(`n`)),m(n,h,`x`,p(`s`)),m(n,-h,`z`),m(n,h,`z`);let g=i/2+.22,_=i+.9;for(let[e,n]of[[`x`,-g],[`x`,g],[`z`,-g],[`z`,g]]){m(_,n,e,0,1.1,.55);let r=Math.round(_/1.6);for(let i=0;i<=r;i++){let o=-_/2+i/r*_,[s,c]=e===`x`?[o,n]:[n,o];t.box(`iron`,.09,1.1,.09,s,a+1.1,c)}for(let r of[a+1.55,a+2.14])e===`x`?t.box(`iron`,_,.07,.07,0,r,n):t.box(`iron`,.07,.07,_,n,r,0)}let v=(n+i)/4,y=new Set;for(let e=0;e<4;e++){let n=-v+e*2*v/3;for(let[e,r]of[[n,-v],[n,v],[-v,n],[v,n]]){let n=`${e.toFixed(1)}:${r.toFixed(1)}`;y.has(n)||(y.add(n),t.box(`limestone`,2.4,.8,2.4,e,a,r),t.box(`darkStone`,1.5,.15,1.5,e,a+.8,r))}}let b=(e,i)=>{let o=e===`n`?-1:1,s=n/2-.2,c=(r-n)/2+2.5,l=Math.max(6,Math.round(a/.32)),u=c/l;for(let e=0;e<l;e++){let n=a-e*a/l;t.box(`limestone`,i,n+.4,u+.02,0,-.4,o*(s+(e+.5)*u))}for(let e of[-1,1]){let n=o*s,r=o*(s+c),l=[[n,-.4],[r,-.4],[r,.6],[n,a+.8]];t.add(`darkStone`,Qm(l,.9),e*(i/2+.45),0,0,0,!0)}};for(let e of s)b(e.side,e.width);for(let{side:n,at:i=0}of e.portals??[]){let e=n===`w`?-1:1,a=e*(r/2-1.2);t.box(`limestone`,3.4,3.6,9,a,-.3,i),t.box(`darkStone`,3.6,.35,9.4,a,3.3,i),t.box(`dark`,.1,2.6,5.4,a+e*1.71,0,i)}t.box(`lawn`,i+.2,.3,i+.2,0,-.25,0),t.cyl(`limestone`,2.4,2.6,.6,0,-.2,0,20),t.cyl(`lawn`,2.1,2.1,.1,0,.4,0,20);for(let[e,n,r]of[[-8.5,-8.5,3.3],[8.5,-8.5,3.1],[-8.5,8.5,3.2],[8.5,8.5,3.4],[0,-9.5,2.4],[-9.5,0,2.4],[9.5,0,2.4],[0,9.5,2.4],[0,0,1.7]]){let i=r>3?4.6:r>2?3.2:1.6;t.cyl(`wood`,.22,.32,i,e,0,n,6);let a=new ao(r,1);a.scale(1,.85,1),a.computeVertexNormals(),a.translate(e,i+r*.55,n),t.add(`leaves`,a,0,0,0,0,!1)}for(let e of[-1,1])t.box(`leaves`,i-4,.9,1,0,-.1,e*(i/2-.9)),t.box(`leaves`,1,.9,i-4,e*(i/2-.9),-.1,0);return{object:t.build()}}});function Ug(e,t,n,r,i){let a=new H().subVectors(r,n),o=a.length(),s=new K(i,o,i).translate(0,o/2,0),c=new At().setFromUnitVectors(new H(0,1,0),a.normalize());e.addTransformed(t,s,new U().compose(n,c,new H(1,1,1)))}var Wg=(e,t,n)=>new H(e,t,n),Gg=Q({type:`ballCourt`,label:`Juego de pelota`,params:{length:72,width:26,roof:!0},footprint:e=>({rect:[e.length,e.width]}),build(e){let t=new Z,n=e.length,r=e.width,i=r*.175,a=r*.2,o=i+a,s=r/2,c=.9,l=c+a*Math.tan(30*Math.PI/180),u=l+1.3,d=-n/2+.3,f=n/2-.3,p=f-d,m=(d+f)/2,h=.8,g=u/9,_=9*h,v=d,y=f-(v+_)+.4,b=new K(y,.9,i*2+.6).translate(f-y/2,-.15,0);t.addTransformed(`vertex`,Y(b,`#d4683f`),Rm());for(let e of[-1,1]){let n=t=>{let n=t.map(([t,n])=>[t*e,n]);return e<0?n.reverse():n};t.add(`paving`,Qm(n([[i,-.3],[o+.05,-.3],[o+.05,l],[i,c]]),p),m,0,0),t.add(`limestone`,Qm(n([[o,-.3],[s,-.3],[s,u],[o,u]]),p),m,0,0),t.box(`stone`,p+.1,.18,.7,m,u,e*(o+.3)),t.box(`stone`,p+.1,.18,.5,m,u,e*(s-.25));let r=new po(.55,.16,6,14);t.add(`stone`,r,0,l+.68,e*(o-.12),0,!1),t.box(`stone`,.5,.5,.25,0,l+.43,e*(o-.08))}{let e=o+.75,n=s-.6,r=v+_,i=f-.4,a=2.7;t.box(`limestone`,i-r,.6,.35,(r+i)/2,u+.18,o+.25);let c=Math.round((i-r)/3.6);for(let o=0;o<=c;o++){let s=r+.3+o/c*(i-r-.6);for(let r of[e,n])t.cyl(`limestone`,.3,.34,a,s,u+.18,r,8,!0)}t.box(`stone`,i-r+.6,.5,s-o+.1,(r+i)/2,u+.18+a,(o+s)/2)}{let e=-(o+.35),n=Math.round(p/3);for(let r=0;r<=n;r++){let i=d+.2+r/n*(p-.4);Ug(t,`wood`,Wg(i,u+.18,e),Wg(i,u+1.2,e),.16)}for(let n of[u+.7,u+1.15])Ug(t,`wood`,Wg(d+.2,n,e),Wg(f-.2,n,e),.09);for(let n=0;n<5;n++){let r=d+6+n/4*(p-12);Ug(t,`iron`,Wg(r,u+.18,e-.5),Wg(r,u+3.4,e-.5),.1),t.box(`lamp`,.3,.4,.3,r,u+3.4,e-.5)}}let x=o*2;for(let e=0;e<9;e++){let n=v+_-e*h;t.box(`stone`,n-v,(e+1)*g+.3,x,(v+n)/2,-.3,0),t.box(`paving`,h,.05,x,n-h/2,(e+1)*g,0)}{let e=u/18,n=_/18;for(let r=0;r<18;r++){let i=v+_+.05-r*n;t.box(`paving`,n,e+.15,2.6,i-n/2,r*e,0)}for(let e of[-2.6/2-.1,1.4000000000000001]){Ug(t,`wood`,Wg(v+_+.05,1,e),Wg(v+.3,u+1,e),.08);for(let n of[0,.5,1]){let r=v+_-n*6.9;Ug(t,`wood`,Wg(r,n*u*6.9/_,e),Wg(r,n*u*6.9/_+1,e),.08)}}}if(t.box(`lawn`,2.4,.3,i-1.8,v+_+1.2,-.15,(i+1.6)/2),t.addTransformed(`vertex`,hh(Mm.BROAD_LIGHT),Rm(v+_+1.3,.1,i-1.3,.7,.8,.75,.8)),e.roof){let e=3.6,i=.5,a=n-.4,o=r-.4,s=Wm(a,o,e,i);t.addTransformed(`vertex`,Y(s,`#c9cdd0`),Rm(0,9.6,0));let c=zm(Wm(a,o,e,i)),l=c.getAttribute(`position`).array;for(let e=0;e<l.length;e+=9)for(let t=0;t<3;t++)[l[e+3+t],l[e+6+t]]=[l[e+6+t],l[e+3+t]];c.computeVertexNormals();let m=c.getAttribute(`normal`).array;for(let e=0;e<m.length;e++)m[e]=-m[e];t.add(`white`,c,0,9.54,0,0,!1);let h=o/2-.4,g=(a-o)/2,_=e=>9.4+3.45*(1-Math.abs(e)/(o/2+i));for(let e=0;e<9;e++){let n=d+.6+e/8*(p-1.2);for(let e of[-1,1])Ug(t,`concrete`,Wg(n,u+.18,e*h),Wg(n,9.5,e*h),.3);if(Math.abs(n)>g-.5)continue;let r=8.4,i=Wg(n,9.4,-h),a=Wg(n,9.4,h),o=Wg(n,12.85,0);Ug(t,`concrete`,i,o,.2),Ug(t,`concrete`,a,o,.2),Ug(t,`concrete`,Wg(n,r,-h),Wg(n,r,h),.14);for(let e of[.2,.45,.7])for(let i of[-1,1]){let a=i*h*(1-e);Ug(t,`concrete`,Wg(n,r,a),Wg(n,_(a)-.1,a),.1)}}for(let e of[-1,1])Ug(t,`concrete`,Wg(d+.4,9.4,e*h),Wg(f-.4,9.4,e*h),.25);Ug(t,`concrete`,Wg(-g,12.6,0),Wg(g,12.6,0),.25)}return{object:t.build()}}});function Kg(e,t,n,r,i,a=10){let o=[],s=new H(0,i*.3,(t+r)/2),c=new H,l=new H,u=new H,d=(e,t,n)=>{c.set(t[0]-e[0],t[1]-e[1],t[2]-e[2]),l.set(n[0]-e[0],n[1]-e[1],n[2]-e[2]),u.set((e[0]+t[0]+n[0])/3,(e[1]+t[1]+n[1])/3,(e[2]+t[2]+n[2])/3).sub(s),o.push(c.cross(l).dot(u)>=0?[...e,...t,...n]:[...e,...n,...t])},f=e,p=[0,i,t],m=[0,i,r];for(let e of[-1,1])d([e*f,0,t],[e*f,0,n],m),d([e*f,0,t],m,p);d([f,0,n],[-f,0,n],m);for(let e=0;e<a;e++){let n=e/a*Math.PI,r=(e+1)/a*Math.PI;d([Math.cos(n)*f,0,t-Math.sin(n)*f],[Math.cos(r)*f,0,t-Math.sin(r)*f],p)}return Hm(o)}function qg(){let e=new Z;e.box(`ochre`,8,8,18,0,-1,0),e.addTransformed(`tile`,Wm(18,8,3.2,.5),Rm(0,7,0,Math.PI/2));for(let t=0;t<4;t++){let n=-6.5+13/3*t;for(let t of[-1,1])e.box(`window`,.15,2.6,1.1,t*4.02,2.2,n),e.box(`white`,.6,6,.7,t*4.3,-1,n+13/6)}e.box(`ochre`,9.2,12,1.2,0,-1,9),e.box(`white`,9.4,.5,1.4,0,11,9),e.box(`dark`,2.4,4,.3,0,0,9.6),e.box(`white`,3.4,.4,.4,0,4.1,9.6);let t=9.4;e.box(`white`,9.6,1.2,1.8,0,-1,t);let n=11,r=4.6;for(let i=0;i<3;i++){let a=3.2-i*.3;e.box(`ochre`,r,a,1.6,0,n,t);let o=new q(.75-i*.08,.75-i*.08,.3,12,1,!1,0,Math.PI);o.rotateX(Math.PI/2),o.rotateZ(Math.PI/2),e.box(`window`,1.5-i*.15,a*.45,1.7,0,n+a*.2,t),e.add(`window`,o,0,n+a*.65,10.120000000000001,0,!1),e.cyl(`bell`,.32,.5,.75,0,n+a*.25,t,10),e.box(`white`,r+.5,.3,1.9,0,n+a,t),n+=a+.3,r-=.9}for(let t of[-4.4,4.4])e.box(`white`,.6,12,1.4,t,-1,9);let i=new zi(.9,16);return e.add(`glass`,i,0,8.6,9.62,0,!1),e.box(`dark`,.25,2.2,.25,0,20.5,9.4),e.box(`dark`,1.2,.25,.25,0,21.9,9.4),e}function Jg({length:e,width:t,facade:n}){let r=new Z,i=e/2,a=-e/2,o=i-6,s=a+t/2;r.box(`white`,t,4.2,o-s,0,-1,(o+s)/2);let c=new q(t/2,t/2,4.2,16,1,!1,Math.PI/2,Math.PI);c.translate(0,4.2/2,0),r.add(`white`,c,0,-1,s);for(let e=0;e<3;e++){let n=s+2+e*((o-s-3)/2);for(let e of[-1,1])r.box(`window`,.15,1.6,.9,e*(t/2+.02),.9,n)}let l=t/2+.9;r.add(`thatch`,Kg(l,s,o+.3,o-l*.55,5.2),0,3,0),r.cyl(`thatchDark`,.35,.35,.3,0,8.15,s,6),r.box(`white`,n,4.4,6,0,-1,i-3),r.box(`white`,n+.3,.3,6.3,0,3.4,i-3);let u=i-.45,d=.9;r.box(`white`,n,3.4,d,0,3.4,u),r.box(`white`,n*.62,2.7,d,0,6.8,u),r.box(`white`,n*.28,2.2,d,0,9.5,u);let f=new q(n*.14,n*.14,d,16,1,!1,Math.PI/2,Math.PI);f.rotateX(Math.PI/2),r.add(`white`,f,0,11.7,u,0,!0);for(let[e,t]of[[-n*.16,7.3],[n*.16,7.3],[0,10]]){r.box(`window`,1.1,1.5,1,e,t,u);let n=new q(.55,.55,1,12,1,!1,Math.PI/2,Math.PI);n.rotateX(Math.PI/2),r.add(`window`,n,e,t+1.5,u,0,!1),r.cyl(`bell`,.28,.42,.65,e,t+.55,u,10)}return r.box(`dark`,2.2,3,.2,0,0,i+.02),r.box(`dark`,.22,1.8,.22,0,12.9,u),r.box(`dark`,1,.22,.22,0,14,u),r}var Yg=Q({type:`chapel`,label:`Capilla`,params:{variant:`sanfrancisco`,length:29,width:10,facade:12.5},footprint:e=>({rect:e.variant===`guadalupe`?[9.5,20]:[e.facade+.5,e.length+1]}),build(e){return{object:(e.variant===`guadalupe`?qg():Jg(e)).build()}}}),Xg=Q({type:`chimney`,label:`Chimenea de hacienda`,params:{height:26},footprint:()=>({circle:2.5}),build(e){let t=e.height,n=new q(.85,1.35,t,12,12);n.translate(0,t/2,0);let r=n.getAttribute(`position`),i=new Float32Array(r.count*3),a=new W(`#a9505a`),o=new W(`#f4efe4`);for(let e=0;e<r.count;e++){let n=r.getY(e)>t-t/12-.01?o:a;i.set([n.r,n.g,n.b],e*3)}n.setAttribute(`color`,new gr(i,3));let s=new Z;return s.box(`limestone`,4,3.5,4,0,-1,0),s.add(`vertex`,n,0,2.4,0,0,!0),s.cyl(`white`,1.05,.92,.5,0,t+2.4,0,12),s.cyl(`dark`,.8,.8,.52,0,t+2.4,0,12),{object:s.build()}}}),Zg=Q({type:`caracol`,label:`Caracol (torre redonda escalonada)`,params:{radius:13},footprint:e=>({circle:e.radius+2}),build(e){let t=new Z,n=e.radius,r=[[n+1.5,2.6],[n-1,4.2],[n-3.6,3.6],[n-6.2,3.2]],i=(e,t)=>{let n=e/2;return new no(new va().moveTo(-n,0).lineTo(n,0).lineTo(n,t-n).absarc(0,t-n,n,0,Math.PI,!1).lineTo(-n,0),{depth:.3,bevelEnabled:!1,curveSegments:6}).translate(0,0,-.15)},a=(e,n,r,a,o,s=0)=>{for(let c=0;c<o;c++){let l=(c+s)/o*Math.PI*2;t.add(`court`,i(r,a),Math.cos(l)*(e+.05),n,Math.sin(l)*(e+.05),-l+Math.PI/2,!1)}},o=-1;r.forEach(([e,n],r)=>{t.cyl(`limestone`,e,e+.3,n,0,o,0,32),t.cyl(`limestone`,e+.4,e+.4,.3,0,o+n-.3,0,32),r===0?a(e+.3,o+1,1.6,2.2,6,.25):(a(e,o+.5,1.1,1.5,Math.round(e*.9),.5),a(e,o+n-1.35,.55,.8,Math.round(e*2.6))),o+=n});let s=n-6.6,c=2.25*Math.PI*2;for(let e=0;e<c;){let n=e/c,r=s-(s-1.1)*n,i=Math.min(.9/r,c-e),a=e+i/2;t.box(`limestone`,.55,1.5,r*i+.12,Math.cos(a)*r,o+n*2.4,Math.sin(a)*r,-a),e+=i}t.cyl(`limestone`,1,1.1,4.2,0,o,0,12);for(let e=0;e<8;e++)t.box(`limestone`,4,.45*(8-e),.6,0,-1,n+4.5-e*.6);return{object:t.build()}}}),Qg=Q({type:`fan`,label:`Edificio en abanico (Xcaret Plus)`,params:{r0:17,r1:48,a0:-1.8,a1:.3,blades:6,infill:`thatch`},clearPaths:e=>{let t=(e.r0+e.r1)/2,n=e.rotation??0,r=[];for(let i=0;i<=12;i++){let a=e.a0+(e.a1-e.a0)*i/12,o=Math.cos(a)*t,s=Math.sin(a)*t;r.push([e.x+o*Math.cos(n)+s*Math.sin(n),e.z-o*Math.sin(n)+s*Math.cos(n)])}return[{pts:r,width:e.r1-e.r0+2}]},build(e){let t=new Z,{r0:n,r1:r,a0:i,a1:a,blades:o,infill:s}=e,c=(e,t,n)=>[Math.cos(e)*t,n,Math.sin(e)*t],l=e=>e.map(e=>[e[0],e[1],e[2],e[6],e[7],e[8],e[3],e[4],e[5]]);function u(e,i,a,o,s){let u=[],d=[];for(let t=0;t<5;t++){let s=e+(i-e)*t/5,l=e+(i-e)*(t+1)/5;u.push([...c(s,n,a),...c(l,n,a),...c(l,r,o)],[...c(s,n,a),...c(l,r,o),...c(s,r,o)]),d.push([...c(s,r,-1),...c(l,r,-1),...c(l,r,o)],[...c(s,r,-1),...c(l,r,o),...c(s,r,o)]),d.push([...c(l,n,-1),...c(s,n,-1),...c(s,n,a)],[...c(l,n,-1),...c(s,n,a),...c(l,n,a)])}t.add(s,Hm(u),0,0,0,0,!0),t.add(`glass`,Hm(l(d)),0,0,0,0,!0);for(let[s,u]of[[e,1],[i,-1]]){let e=[[...c(s,n,-1),...c(s,r,-1),...c(s,r,o)],[...c(s,n,-1),...c(s,r,o),...c(s,n,a)]];t.add(`wall`,Hm(u<0?e:l(e)),0,0,0,0,!0)}}if(s){let e=(a-i)/(o*2-1);for(let t=0;t<o*2-1;t++){let n=i+t*e;t%2==0?u(n,n+e,4,9.5,`white`):u(n,n+e,3.2,8,s)}}else{let e=(a-i)/o;for(let t=0;t<o;t++){let n=i+t*e+e*.08;u(n,n+e*.84,4,9.5,`white`)}}return{object:t.build()}}}),$g=[`#f29ac4`,`#e85d9b`,`#6fa8e8`,`#3b7dd8`,`#4fd1c5`,`#2fb5a6`,`#f6d55c`,`#a77bdc`,`#c9a2ef`,`#f5f3ee`,`#f08a7c`],e_=[`#ffffff`,`#f5f3ee`,`#f6d55c`,`#3b7dd8`],t_=(e,t)=>Y(zm(e),t);function n_(e=.6,t=.08){let n=new K(t,e,t).translate(0,e/2,0),r=new K(e*.6,t,t).translate(0,e*.68,0);return Im([zm(n),zm(r)])}function r_(e,t,n){let r=e/Math.sqrt(3),i=new q(r,r,n,3,1);return i.rotateX(-Math.PI/2),i.scale(1,t/(1.5*r),1),i.translate(0,t/(1.5*r)*(r/2),0),i}function i_(e){let t=$g[Math.floor(e()*$g.length)],n=e_[Math.floor(e()*e_.length)],r=[],i=e();if(i<.36){let i=.9+e()*.6;r.push([new K(.85,i,1).translate(0,i/2,0),t]),r.push([r_(.97,.45,1.1).translate(0,i,0),n]),e()<.6&&r.push([n_(.5).translate(0,i+.3,1/2-.05),n])}else if(i<.58){let i=.9,a=.8+e()*.5;r.push([new K(i,a,i).translate(0,a/2,0),t]),r.push([new fo(i*.48,6,3,0,Math.PI*2,0,Math.PI/2).translate(0,a,0),n]),e()<.5&&r.push([n_(.45).translate(0,a+i*.42,0),n])}else if(i<.8)r.push([new K(.8,.35,1.25).translate(0,.175,.1),t]),r.push([new K(.8,.85,.16).translate(0,.425,-.5),n]),r.push([n_(.55).translate(0,.85,-.5),e()<.5?`#ffffff`:t]);else{let i=1.5+e()*.7;r.push([new K(.7,i,.7).translate(0,i/2,0),t]),r.push([new Bi(.52,.55,4,1).rotateY(Math.PI/4).translate(0,i+.27,0),n]),r.push([new K(.4,.5,.04).translate(0,i*.55,.36),`#2b3a55`])}return r}function a_(e,t){let n=[],r=`#d6d2c8`,i=new q(.45,1.25,1.6,6,1,!0).translate(0,.8,0);n.push(t_(i,`#aaa497`)),n.push(t_(new q(.3,.45,e,6,1,!0).translate(0,e/2,0),r));let a=e+1.2,o=new H(0,1,0),s=[];for(let i=0;i<4;i++){let c=i/4*Math.PI*2+t()*.8,l=2.6+t()*1.4,u=new H(0,e*(.82+t()*.08),0),d=new H(Math.cos(c)*l,a-.4,Math.sin(c)*l).clone().sub(u),f=d.length(),p=new q(.12,.22,f,5,1,!0).translate(0,f/2,0);p.applyMatrix4(new U().compose(u,new At().setFromUnitVectors(o,d.normalize()),new H(1,1,1))),n.push(t_(p,r)),s.push([Math.cos(c)*l,Math.sin(c)*l])}let c=[[0,0,3.1],...s.map(([e,n])=>[e*1.15,n*1.15,2+t()*.7])],l=new W(`#2f5e1f`),u=new W(`#9ccf5c`);for(let[e,r,i]of c){let o=zm(new ao(i,1));o.scale(1,.38,1),o.translate(e,a+t()*.6,r);let s=o.getAttribute(`position`),c=o.getAttribute(`normal`),d=new Float32Array(s.count*3),f=new H,p=new W;for(let e=0;e<s.count;e++){f.set(s.getX(e),(s.getY(e)-a)*2.2,s.getZ(e)).normalize(),c.setXYZ(e,f.x,f.y,f.z);let t=kt.clamp((s.getY(e)-a+1.6)/3,0,1);p.copy(l).lerp(u,t*t*.85+.1),d.set([p.r,p.g,p.b],e*3)}o.setAttribute(`color`,new gr(d,3)),n.push(o)}return Im(n.map(e=>(e.deleteAttribute(`uv`),e)))}var o_=Q({type:`cemetery`,label:`Cementerio en colina`,params:{radius:18,levels:7,top:6.5},footprint:e=>({circle:e.radius+.5}),build(e){let t=new Z,n=Ph(7),r=e.levels,i=t=>e.radius-t*(e.radius-e.top)/(r-1),a=e=>(e+1)*1.15,o=e=>Math.PI/2+e*.62,s=(e,n,r)=>t.addTransformed(`vertex`,t_(e,n),r);for(let e=0;e<r;e++){let n=i(e),c=a(e),l=Math.max(24,Math.round(n*3));t.add(`limestone`,new q(n,n+.15,c+1,l,1,!0).translate(0,(c+1)/2-1,0));let u=e<r-1?new co(i(e+1)-.1,n,l,1):new zi(n,l);t.add(`paving`,u.rotateX(-Math.PI/2).translate(0,c,0));let d=1.9/n,f=Math.PI/2-o(e),p=new oo([new V(n+.02,c-.02),new V(n+.02,c+.32),new V(n-.22,c+.32),new V(n-.22,c)],l,f+d/2,Math.PI*2-d).toNonIndexed();p.computeVertexNormals(),t.add(`white`,p);let m=o(e),h=.34;for(let t=0;t<4;t++){let r=(t+1)*.2875+.05,i=n+4*h-(t+.5)*h;s(new K(1.5,r,h).translate(0,r/2,0),t%2?`#f7f4ec`:`#ece6d8`,Rm(Math.cos(m)*i,a(e-1)-.05,Math.sin(m)*i,Math.PI/2-m))}}let c=hh(Mm.BUSH),l=hh(Mm.PALM),u=(e,n,r,i,a,o)=>t.addTransformed(`vertex`,e.clone(),Rm(r,i,a,o,n,n,n)),d=0;for(let e=0;e<r-1;e++){let t=i(e+1)+.62,r=a(e),f=Math.floor(Math.PI*2*t/1.22),p=o(e+1);for(let i=0;i<f;i++){let a=i/f*Math.PI*2+e*.37,m=Math.abs((a-p+Math.PI*3)%(Math.PI*2)-Math.PI);if(m*t<1.6)continue;m=Math.abs((a-o(e)+Math.PI*3)%(Math.PI*2)-Math.PI);let h=Math.cos(a)*t,g=Math.sin(a)*t,_=n();if(_<.1){u(c,.32+n()*.15,h,r,g,n()*6);continue}if(_<.125&&d<7&&m*t>3){d++,u(l,.55+n()*.15,h,r,g,n()*6);continue}let v=Rm(h,r-.02,g,Math.PI/2-a);for(let[e,t]of i_(n))s(e,t,v)}}let f=a(r-1);t.box(`white`,1.6,.5,1.6,0,f,0),t.box(`white`,.45,5,.45,0,f+.5,0),t.box(`white`,2.3,.45,.45,0,f+3.9,0);let p=[[3.4,.5,f,12.5],[3.6,2.6,f,14],[3.2,4.5,f,11.5],[i(r-2)-.4,1.6,a(r-2),13],[i(r-3)-.5,5.6,a(r-3),12]];for(let[e,r,i,a]of p)t.addTransformed(`vertex`,a_(a,n),Rm(Math.cos(r)*e,i,Math.sin(r)*e,n()*6));for(let e=0;e<5;e++){let t=e/5*Math.PI*2+1.2,r=2.2+n()*1.6;u(c,.4+n()*.15,Math.cos(t)*r,f,Math.sin(t)*r,n()*6)}let m=o(0),h=e.radius+4.5,g=(e,t,n)=>Rm(Math.cos(m)*h,0,Math.sin(m)*h,Math.PI/2-m).multiply(Rm(e,0,t,0,n,n,n));return u_(t,g(0,0,1),{cross:`#6f6a62`}),u_(t,g(0,-2.6,.68),{cross:`#f7f4ec`,pillarWidth:1.1}),{object:t.build()}}}),s_=[[2.2,5.6],[2.25,6.6],[1.9,7.35],[1.5,7.45],[1.4,8],[.9,8.6],[.4,9.15],[0,9.6]],c_=[[3.3,5.6],[3.25,6.5],[3.1,7.5],[2.6,8.35],[2.2,8.45],[2,9.05],[1.3,9.85],[.6,10.45],[0,10.85]],l_=`#9a4b37`;function u_(e,t,{cross:n,pillarWidth:r=2.6}){let i=(n,r)=>e.addTransformed(n,n===`vertex`?r:Xm(r,.25),t.clone()),a=(e,t)=>i(`vertex`,Y(zm(e),t)),o=e=>[...e.map(([e,t])=>[-e,t]),...e.slice(0,-1).reverse().map(([e,t])=>[e,t])],s=(e,t,n)=>new no(new va([...o(e),...o(t).reverse()].map(([e,t])=>new V(e,t))),{depth:n,bevelEnabled:!1}).translate(0,0,-n/2);for(let e of[-1,1]){let t=e*(2.2+r/2);i(`limestone`,new q(r*.62,r*.72,5.1,4,1).rotateY(Math.PI/4).scale(1,1,.75).translate(t,2.55,0)),a(new K(r+.4,.9,1.6).translate(t,5.55,0),l_),a(new K(r+.6,.15,1.75).translate(t,5.05,0),`#7f3c2c`),a(new fo(.42,8,6).scale(1,1.4,1).translate(t+e*(r/2-.1),6.6,0),`#8e8a82`),a(new K(.5,.5,.5).translate(t+e*(r/2-.1),6.2,0),`#ece6d8`)}i(`limestone`,s(c_,s_,1)),a(s(c_.map(([e,t],n)=>{let[r,i]=n===c_.length-1?[0,1]:[e-s_[Math.min(n,s_.length-1)][0],t-s_[Math.min(n,s_.length-1)][1]],a=Math.hypot(r,i)||1;return[e+r/a*.22,t+i/a*.22]}),c_,1.12),l_);for(let[e,t]of[c_[4],[-c_[4][0],c_[4][1]]])a(new K(.55,.6,.7).translate(e,t+.2,0),l_);a(new K(.8,.55,.8).translate(0,c_.at(-1)[1]+.2,0),l_),a(n_(1.6,.26).translate(0,c_.at(-1)[1]+.45,0),n)}var d_={value:0};function f_(e,t,{axis:n=`z`,speed:r=9,amp:i=.7,threshold:a=.15}={}){let o=new e(t);return o.onBeforeCompile=e=>{e.uniforms.uTime=d_,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uTime;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        {
          float side = transformed.${n};
          if (abs(side) > ${a.toFixed(3)}) {
            float a = sign(side) * sin(uTime * ${r.toFixed(2)} + float(gl_InstanceID) * 1.731) * ${i.toFixed(3)};
            float c = cos(a), s = sin(a);
            float p = transformed.${n}, q = transformed.y;
            transformed.${n} = p * c - q * s;
            transformed.y = p * s + q * c;
          }
        }`)},o.customProgramCacheKey=()=>`flap-${n}-${r}-${i}-${a}`,o}var p_=Q({type:`netDome`,label:`Domo de malla (mariposario / aviario)`,params:{rx:20,rz:16,height:14,arcade:!1},footprint:e=>({ellipse:[e.rx+1,e.rz+1]}),build(e){let t=new On,n=new Z,{rx:r,rz:i,height:a}=e;n.add(`limestone`,Zm(Bm(r+1,i+1),[Bm(r-.6,i-.6)],1.6),0,-.6,0);for(let e=0;e<4;e++){let t=e/4*Math.PI,o=new po(1,.012,4,24,Math.PI);o.scale(Math.hypot(Math.cos(t)*r,Math.sin(t)*i),a,18),o.rotateY(-t),n.add(`green`,o,0,.9,0,0,!1)}t.add(n.build());let o=Xh().clone();o.needsUpdate=!0,o.repeat.set(r*.9,a*.6);let s=new ri(new fo(1,40,14,0,Math.PI*2,0,Math.PI/2),new Do({color:16054261,map:o,transparent:!0,opacity:.9,side:2,depthWrite:!1,roughness:1}));s.scale.set(r,a,i),s.position.y=.9,s.renderOrder=2,t.add(s);let c=new Z;if(e.arcade){let e=Math.round((r+i)*1.6);for(let t=0;t<e;t++){let n=t/e*Math.PI*2;c.box(`white`,1.1,4.2,.9,Math.cos(n)*(r+.4),.4,Math.sin(n)*(i+.4),-n)}c.add(`white`,Zm(Bm(r+1.1,i+1.1),[Bm(r-.3,i-.3)],1),0,4.5,0)}else for(let e=0;e<5;e++){let t=e/5*Math.PI*2+.3;c.cyl(`white`,.25,.35,a+5,Math.cos(t)*r*.45,0,Math.sin(t)*i*.45,8)}t.add(c.build());let l=new Ar().setFromPoints([new H(.05,0,-.3),new H(.95,0,-.45),new H(.6,0,.35),new H(-.05,0,-.3),new H(-.6,0,.35),new H(-.95,0,-.45)]);l.computeVertexNormals();let u={axis:`x`,speed:14,amp:.9,threshold:.04},d=new hi(l,f_(Gr,{color:16777215,side:2},u),26);d.frustumCulled=!1;let f=[16747546,3112417,16109600,14697851,9195478,2408869],p=[],m=Ph(5);for(let e=0;e<26;e++)d.setColorAt(e,new W(f[e%f.length])),p.push({a:m()*6.28,s:.2+m()*.3,h:2+m()*(a*.6),rr:.2+m()*.65});t.add(d);let h=new U,g=new At,_=new H,v=new H(1.6,1.6,1.6),y=new H(0,1,0),b=0,x=null;return{object:t,update(e){b+=x===null?0:Math.min(.1,e-x)*Wp(Up.pace),x=e;let t=b;d.count=Math.max(1,Math.round(26*Wp(Up.birds))),p.forEach((e,n)=>{let a=e.a+t*e.s;_.set(Math.cos(a)*r*e.rr,e.h+Math.sin(t*1.7+e.a)*1.2,Math.sin(a*1.3)*i*e.rr),g.setFromAxisAngle(y,-a),d.setMatrixAt(n,h.compose(_,g,v))}),d.instanceMatrix.needsUpdate=!0},animation:[{name:`flies`,driver:`netDome`,params:{rx:r,rz:i,scale:v.x,flap:u,flies:p.map((e,t)=>({...e,color:`#${f[t%f.length].toString(16).padStart(6,`0`)}`}))},size:1.9*v.x,parts:[d]}]}}}),m_=Q({type:`pyramid`,label:`Pirámide maya escalonada`,params:{size:10,height:6},footprint:e=>({rect:[e.size+1,e.size+3]}),build(e){let t=new Z,n=e.size,r=e.height,i=r/4;for(let e=0;e<4;e++){let r=n*(1-e*.17);t.box(`rockwall`,r,i+ +(e===0),r,0,e*i-+(e===0),0),t.box(`darkStone`,r+.15,.25,r+.15,0,(e+1)*i-.35,0)}let a=n*.36;t.box(`rockwall`,a,2.4,a,0,r,0),t.box(`dark`,a*.3,1.4,.2,0,r,a/2),t.box(`stone`,a+.6,.5,a+.6,0,r+2.4,0);for(let e=0;e<12;e++)t.box(`rockwall`,n*.26,r*(e+1)/12,.55,0,0,n/2+1.2-e*(n/2+1.2-a/2)/12);return{object:t.build()}}}),h_=Q({type:`forum`,label:`Foro abierto`,params:{radius:17},footprint:e=>({circle:e.radius+1.5}),build(e){let t=new Z,n=e.radius;t.add(`limestone`,Zm(Bm(n+1.5,n+1.5,36),[Bm(n-1.2,n-1.2,36)],1.2),0,-.5,0);for(let e=0;e<4;e++)t.add(`stone`,Zm(Bm(n-2-e*2.2,n-2-e*2.2,36),[Bm(n-4.2-e*2.2,n-4.2-e*2.2,36)],2.6-e*.6),0,-.4,0);t.cyl(`limestone`,n-11,n-11,.6,0,-.2,0,32);for(let e=0;e<18;e++){let r=e/18*Math.PI*2;t.box(`limestone`,1.4,7,1.4,Math.cos(r)*n,.5,Math.sin(r)*n,-r)}t.add(`limestone`,Zm(Bm(n+.9,n+.9,36),[Bm(n-.9,n-.9,36)],1.2),0,7.4,0);let r=new fo(n+1.5,72,10,0,Math.PI*2,0,Math.PI/2);r.scale(1,.32,1);let i=r.getAttribute(`position`);for(let e=0;e<i.count;e++){let t=i.getX(e),r=i.getZ(e),a=Math.hypot(t,r)/(n+1.5);i.setY(e,i.getY(e)-a**3*1.4*(.5-.5*Math.cos(18*Math.atan2(r,t))))}return r.computeVertexNormals(),t.add(`white`,r,0,7.6,0),{object:t.build()}}});function g_(e,t){let n=new ao(e,0),r=n.getAttribute(`position`);for(let e=0;e<r.count;e++){let n=.75+(e*7+t*13)%10/10*.5;r.setXYZ(e,r.getX(e)*n,r.getY(e)*n*.7,r.getZ(e)*n)}return n.computeVertexNormals(),n}var __=Q({type:`agaveField`,label:`Plantío de agaves`,params:{length:26,width:12},build(e,t){let{length:n,width:r}=e,i=t.heightAt(e.x,e.z),a=(n,r)=>t.heightAt(e.x+n,e.z+r)-i,o=new Z,s=new On,[c,l]=[n/2+1,r/2+1],u=eh([[-c,-l],[c,-l],[c,l],[-c,l]],a,{lift:.15});o.add(`vertex`,Y(u,`#e9e4d8`),0,0,0,0,!1);let d=Nh(17);for(let e=0;e<12;e++){let t=(d()-.5)*n,i=(d()-.5)*r;o.add(`rock`,g_(.18+d()*.15,e),t,a(t,i)+.15,i,d()*6.3)}let f=v_(),p=1.9,m=Math.floor(r/p),h=Math.floor(n/p),g=[];for(let e=0;e<m;e++)for(let t=0;t<h;t++){let i=-n/2+(t+.5+e%2*.4)*p+(d()-.5)*.5,a=-r/2+(e+.5)*p+(d()-.5)*.5;i<-n/2+2.6&&Math.abs(a)<1.6||i<-n/2+2.6&&a<-r/2+2.6||g.push([i,a])}let _=new hi(f,x_(),g.length),v=new U;g.forEach(([e,t],n)=>{let r=.8+d()*.45;v.compose(new H(e,a(e,t)+.12,t),new At().setFromAxisAngle(new H(0,1,0),d()*Math.PI*2),new H(r,r,r)),_.setMatrixAt(n,v)}),_.castShadow=_.receiveShadow=!0,s.add(_);let y=-n/2+1,b=a(y,0);o.add(`sandstone`,new K(.75,.95,1.5,2,2,2).translate(0,.45,0),y,b,0,0);let x=new so(1.25,.6).rotateY(-Math.PI/2),S=x.getAttribute(`uv`);for(let e=0;e<S.count;e++)S.setY(e,.25+S.getY(e)*.5);o.add(`agaveLogo`,x,y-.39,b+.5,0,0,!1);let[C,w]=[-n/2+1.2,-r/2+1.2],T=a(C,w);o.add(`rockwall`,new q(.55,.7,.7,7).translate(0,.35,0),C,T,w);let E=new oo([[.01,0],[.32,0],[.28,.6],[.22,1.2],[.16,1.55],[.11,1.62],[.12,1.75],[.01,1.9]].map(([e,t])=>new V(e,t)),10);o.add(`weatheredWood`,E,C,T+.7,w);for(let e=0;e<30;e++){let t=e/30*Math.PI*2,[n,r]=[Math.cos(t)*.55,Math.sin(t)*1.15+1],[i,a]=[Math.cos(t)*.85,Math.sin(t)*1.5+1];a<.15||o.rod(`iron`,[C+n*.3,T+.7+r,w+n],[C+i*.3,T+.7+a,w+i],.012,3)}return s.add(o.build({agaveLogo:S_()})),{object:s}}});function v_(){let e=[];return[[8,.25,1.15],[9,.6,1.25],[10,.95,1.1]].forEach(([t,n,r],i)=>{for(let a=0;a<t;a++){let o=new Bi(.07,r,3).translate(0,r/2,0).scale(1,1,.4);o.rotateZ(n+a*7%5*.04).rotateY(a/t*Math.PI*2+i*.35),e.push(Y(o,i===2?`#9bb7b6`:`#86a8ab`))}}),Im(e.map(e=>e.toNonIndexed()))}var y_,b_;function x_(){return y_??=xf(X(16777215,{vertexColors:!0,roughness:.8})),y_}function S_(){return b_||(b_=xf(X(16777215,{map:Ih(`agaveLogo`,256,(e,t)=>{e.clearRect(0,0,t,t),e.fillStyle=`#4a3324`,e.textAlign=`center`,e.font=`bold ${t*.22}px Georgia, serif`,e.fillText(`xcaret`,t/2,t*.52),e.font=`bold ${t*.1}px Arial, sans-serif`,e.fillText(`MEXICO`,t*.6,t*.68)},!1),alphaTest:.5})),b_)}var C_=Q({type:`aqueduct`,label:`Acueducto de piedra`,params:{length:100},build(e){let t=new Z,n=e.length,r=4.5,i=Math.floor(n/r);for(let e=0;e<=i;e++)t.box(`limestone`,1.3,5.3,1.6,-n/2+e*r,-.5,0);for(let e=0;e<i;e++){let i=new po(3.2/2,.35,4,10,Math.PI);t.add(`limestone`,i,-n/2+(e+.5)*r,4.4,0,0,!0)}return t.box(`limestone`,n+1.3,1.1,1.8,0,4.8,0),t.box(`darkStone`,n+1.3,.25,1.9,0,5.9,0),{object:t.build()}}}),w_=Q({type:`mayanArch`,label:`Arco maya (Labná)`,build(){let e=new Z;for(let t of[-1,1]){e.box(`limestone`,6.4,8,6,t*4.800000000000001,-.5,0);for(let n=0;n<3;n++)e.box(`darkStone`,.5,2.2,.2,t*(2.4+n*5/2),3.6,3.05)}for(let t=0;t<4;t++)e.box(`limestone`,3.2-t*.75,.9,6,0,4.6+t*.85,0);e.box(`stone`,16.6,.6,6.6,0,7.5,0),e.box(`stone`,16.3,.45,6.3,0,3.04,0),e.box(`limestone`,8.8,2.2,.8,0,8.1,0);for(let t=0;t<5;t++)e.box(`dark`,.6,.9,.9,-3.52+t*16*.11,8.8,0);return{object:e.build()}}}),T_=Q({type:`domes`,label:`Edificio blanco con cúpulas azules`,params:{},footprint:()=>({rect:[15,10]}),build(){let e=new Z;e.box(`white`,14,5,9,0,-.5,0),e.box(`white`,15,.5,10,0,4.5,0);for(let t of[-3.4,3.4])e.cyl(`white`,2.7,2.7,.8,t,4.6,0,18),e.add(`glazedBlue`,new fo(2.6,18,9,0,Math.PI*2,0,Math.PI/2),t,5.4,0);for(let t=-2;t<=2;t++)e.box(`window`,1.2,2.4,.2,t*2.6,0,4.6);return{object:e.build()}}}),E_=Q({type:`vitral`,label:`Plaza del Vitral`,params:{},footprint:()=>({rect:[16,12]}),build(e){let t=new Z;t.box(`limestone`,22,1,18,0,-.6,0),t.box(`white`,14,6,10,0,0,-2),t.box(`pool`,12,.2,5,0,.3,6);let n=new On;n.add(t.build());let r=document.createElement(`canvas`);r.width=r.height=128;let i=r.getContext(`2d`),a=[`#e63946`,`#f4a261`,`#2a9d8f`,`#457b9d`,`#e9c46a`,`#8338ec`];for(let e=0;e<8;e++)for(let t=0;t<8;t++)i.fillStyle=a[(t*3+e*5)%a.length],i.fillRect(t*16,e*16,15,15);let o=pf(new Pi(r));o.colorSpace=Be;let s=new ri(new q(2.6,3.2,3.5,8),new Do({map:o,emissive:3351057,roughness:.3}));s.position.set(0,7.8,-2);let c=new ri(new Bi(3,1.6,8),eg().white);return c.position.set(0,10.3,-2),n.add(s,c),{object:n}}}),D_={X:[[0,0,2.4,3.2],[0,3.2,2.4,0]],C:[[.35,0,.35,3.2],[0,2.85,2.4,2.85],[0,.35,2.4,.35]],A:[[0,0,1.2,3.2],[2.4,0,1.2,3.2],[.55,1.3,1.85,1.3]],R:[[.35,0,.35,3.2],[0,2.85,2.1,2.85],[2.05,3.2,2.05,1.5],[0,1.65,2.1,1.65],[1,1.65,2.4,0]],E:[[.35,0,.35,3.2],[0,2.85,2.4,2.85],[0,1.6,2,1.6],[0,.35,2.4,.35]],L:[[.35,0,.35,3.2],[0,.35,2.2,.35]],H:[[.35,0,.35,3.2],[2.05,0,2.05,3.2],[0,1.6,2.4,1.6]],T:[[0,2.85,2.4,2.85],[1.2,0,1.2,3.2]],M:[[.35,0,.35,3.2],[2.05,0,2.05,3.2],[.35,3.2,1.2,1.5],[2.05,3.2,1.2,1.5]],I:[[1.2,0,1.2,3.2]],O:[[.35,0,.35,3.2],[2.05,0,2.05,3.2],[0,2.85,2.4,2.85],[0,.35,2.4,.35]],0:[[.35,0,.35,3.2],[2.05,0,2.05,3.2],[0,2.85,2.4,2.85],[0,.35,2.4,.35]],2:[[0,2.85,2.4,2.85],[2.05,3.2,2.05,1.6],[0,1.6,2.4,1.6],[.35,1.6,.35,0],[0,.35,2.4,.35]],6:[[0,2.85,2.4,2.85],[.35,3.2,.35,0],[0,1.6,2.4,1.6],[2.05,1.6,2.05,0],[0,.35,2.4,.35]]},O_=Q({type:`letters`,label:`Letras monumentales`,params:{text:`XCARET`,scale:1,color:`white`,outline:null,base:`limestone`,ornaments:!1},footprint:e=>({rect:[(e.text.length*3.1+2)*(e.scale??1),3.5*(e.scale??1)]}),build(e){let t=new Z,n=e.text.toUpperCase(),r=e.scale??1,i=3.1*r,a=.7*r,o=.9*r,s=-((n.length-1)*i+2.4*r)/2,c=.4*r+(e.ornaments?.5:0),l=(e,n,r=0,i=0,a=0,o=0)=>{typeof e==`number`?t.add(`plastic`,Y(n,e),r,i,a,o,!0):t.add(e,n,r,i,a,o,!0)},u=(e,t,n,u,d,f,p,m)=>{let h=new K(Math.hypot(u-t,d-n)*r+a*.6+p,a+p,o-Math.abs(m));h.rotateZ(Math.atan2(d-n,u-t)),h.translate(s+f*i+(t+u)/2*r,c+(n+d)/2*r,m),l(e,h)};[...n].forEach((t,n)=>{for(let[i,a,o,s]of D_[t]??[])u(e.color??`white`,i,a,o,s,n,0,0),e.outline&&u(e.outline,i,a,o,s,n,.35*r,-.12*r)});let d=n.length*i+2*r;if(e.ornaments){t.box(e.base,d+1,1,3*r,0,-.5,0);let a=n.indexOf(`L`);if(a>=0){let t=s+a*i+.35*r;l(e.color,new q(.3*r,.42*r,1.1*r,10).translate(0,.55*r,0),t,c+3.2*r),l(e.outline??e.color,new q(.05,.5*r,.6*r,10).translate(0,.3*r,0),t,c+4.3*r)}let u=n.indexOf(`H`);u>0&&l(9052981,new q(.9*r,.9*r,o+.1,16).rotateX(Math.PI/2),s+u*i-.35*r,c+1.7*r,.05),l(7319100,new q(.8*r,.8*r,o*.6,3).rotateX(Math.PI/2).scale(1.4,.8,1),s+n.length*i,c+3*r,0,.5)}else t.box(e.base??`limestone`,d,.5*r,3.2*r,0,-.1*r,0);return{object:t.build()}}}),k_=[{color:15087942,radius:.55,points:[[-7,8.6,-6],[-3,7.5,-7],[1,6,-4],[2,4.6,0],[-1,3.2,3],[-4,2,1],[-2,1.2,-2],[3,.4,-1],[7,.1,2]]},{color:3835647,radius:.5,points:[[-9,8.6,-3.5],[-9,7,1],[-6,5.2,5],[-1,3.6,6],[3,2.2,4],[5,1.2,0],[8,.3,-3]]},{color:16760331,radius:.5,points:[[-11,8.6,-6],[-13,6.5,-1],[-12,4.2,4],[-8,2.2,7],[-3,.5,8]]}];function A_({points:e,color:t,radius:n}){return Y(new mo(new Zi(e.map(([e,t,n])=>new H(e,t,n))),Math.max(24,e.length*10),n,8,!1),t)}var j_=Q({type:`waterSlides`,label:`Toboganes`,params:{},footprint:()=>({circle:12}),build(){let e=new Z;e.box(`wall`,5,9,5,-9,-.5,-6),e.box(`red`,6,.5,6,-9,8.5,-6),e.addTransformed(`tile`,Wm(5.5,5.5,2.6,.4),Rm(-9,10.6,-6));for(let t=0;t<4;t++)e.box(`yellow`,.3,10.6,.3,-9+(t%2?2.6:-2.6),-.5,-6+(t<2?2.6:-2.6));for(let t of k_)e.addTransformed(`plastic`,A_(t));return{object:e.build()}}}),M_=16054008,N_=2056120,P_=(e,t)=>Y(e,t);function F_(e,t,n=.6){let r=new Zi(e.map(([e,t,n])=>new H(e,t,n)));return{curve:r,geometry:P_(new mo(r,e.length*12,n,8,!1),t)}}var I_=Q({type:`lighthouseSlides`,label:`Faro con toboganes`,params:{height:34,slides:3},footprint:()=>({rect:[20,54]}),clearPaths:e=>{let t=(t,n)=>[e.x+t,e.z+n];return[{pts:[t(-2.3,21),t(1.8,-22)],width:9},{pts:[t(1.8,-31),t(1.8,-13)],width:24},{pts:[t(-2.3,17),t(-2.3,25)],width:18}]},build(e){let t=new Z,n=e.height,r=[-2.3,21],i=[1.8,-22],a=5.2,o=e=>a+e/n*-.7999999999999998;t.cyl(`paving`,8.5,9,.25,r[0],-.3,r[1],28);let[s,c]=[-15.5,5.5];t.box(`limestone`,10,.9,19,s,-.5,c,.15),t.box(`limestone`,7,.8,12,s-1,.4,c-2.5,.15);for(let e=0;e<3;e++)t.box(`limestone`,3.2,.75-.2*e,1.2,s+2,-.5,c+10.1+e*1.2,.15);t.addTransformed(`plastic`,P_(Vm(a,4.4,n,24),M_),new U().makeTranslation(r[0],0,r[1]));for(let e=3.5;e<n-3;e+=3.8){let n=o(e+.9)+.12;t.addTransformed(`plastic`,P_(Vm(n,n,1.8,24),N_),new U().makeTranslation(r[0],e,r[1]))}t.addTransformed(`plastic`,P_(new q(5.800000000000001,5,.6,24).translate(0,.3,0),M_),new U().makeTranslation(r[0],n,r[1])),t.add(`iron`,Vm(5.7,5.7,1.1,24),r[0],n+.6,r[1],0,!1),t.cyl(`glass`,3,3,3.2,r[0],n+.6,r[1],16),t.addTransformed(`thatch`,new Bi(3.9,3.4,16).translate(0,1.7,0),new U().makeTranslation(r[0],n+3.8,r[1])),t.cyl(`iron`,.07,.07,6,r[0],n+7,r[1],6),[2067020,16777215,13111342].forEach((e,i)=>t.addTransformed(`plastic`,P_(new K(1.1,2.1,.06),e),new U().makeTranslation(r[0]+.6+i*1.1,n+11.8,r[1])));for(let n=0;n<e.slides;n++){let a=(n-(e.slides-1)/2)*1.5,{curve:s,geometry:c}=F_([[r[0]+a,12.5,r[1]-o(12.5)-.7],[r[0]+a*1.2,8.5,r[1]-9],[a+.4,4.6,5],[a+1,2.2,-4],[i[0]+a,.7,i[1]+8.5],[i[0]+a,.35,i[1]+6.5]],n===1?M_:N_);t.addTransformed(`plastic`,c);for(let e=.12;e<.9;e+=.13){let n=s.getPoint(e);n.y>1.2&&t.cyl(`iron`,.12,.12,n.y-.6,n.x,0,n.z,6)}}let l=Bm(7.5,9.5,36).map(([e,t])=>[e*(t<0?.8:1),t]),u=l.map(([e,t])=>[e*1.12,t*1.1]);return t.add(`paving`,Jm(u,.3),i[0],-.1,i[1]),t.add(`pool`,Jm(l,.08),i[0],.2,i[1],0,!1),{object:t.build()}}}),L_=null,R_=()=>L_??=xf(hh(Mm.PALM)),z_=Q({type:`ticketArcade`,label:`Taquillas con arcos`,params:{length:35,width:11,height:7.5,arches:7,archColor:2047898,palms:7},footprint:e=>({rect:[e.length+1,e.width+1]}),build(e){let t=new Z,{length:n,width:r,height:i,arches:a}=e,o=3.6;t.box(`limestone`,n-2*o,i,r,0,-.6,0),t.box(`limestone`,n-2*o+.3,.35,r+.3,0,i-.6,0);for(let e of[-1,1]){let a=e*(n/2-o/2);t.box(`limestone`,o,i+1.4,r+.8,a,-.6,0),t.box(`limestone`,2.4000000000000004,.8,r-.6,a,i+.8,0)}let s=n-2*o,c=2.5,l=3.8;for(let n=0;n<a;n++){let i=-s/2+(n+.5)/a*s,o=new K(c,l,.3).translate(0,l/2,0),u=new q(c/2,c/2,.3,14,1,!1,Math.PI/2,Math.PI).rotateX(Math.PI/2).translate(0,l,0);for(let n of[o,u])t.addTransformed(`plastic`,Y(n,e.archColor),new U().makeTranslation(i,-.4,r/2+.02))}let u=r/2+3;t.box(`limestone`,n+2,.35,3.4,0,-.2,u),t.addTransformed(`plastic`,Y(new K(n+1.4,.4,2.8).translate(0,.2,0),6265397),new U().makeTranslation(0,-.15,u));for(let e=0;e<18;e++){let r=-n/2+(e+.5)/18*n,i=new ao(.75,0).scale(1.2,.7,1);t.addTransformed(`plastic`,Y(i,e%3?5213998:15122985),new U().makeTranslation(r,.5,u+(e%2?.5:-.5)))}for(let n=0;n<e.palms;n++){let r=-s/2+n/Math.max(1,e.palms-1)*s,i=new U().makeRotationY(n*2.1).premultiply(new U().makeTranslation(r,0,u));t.addTransformed(`plastic`,R_().clone(),i)}return{object:t.build()}}}),B_=13214011,V_=13115436,H_=15924223,U_=16777215,W_=Q({type:`floatingFaucet`,label:`Llave flotante`,params:{height:4.6},footprint:()=>({circle:2}),build(e){let t=new Z,n=e.height,r=(e,n,r)=>t.addTransformed(`plastic`,Y(e,n),r??new U),i=(e,t,n)=>new U().makeTranslation(e,t,n),a=new q(.42,.75,n,14,2,!0).translate(0,n/2,0);return t.addTransformed(`glass`,a,new U),r(new q(.22,.3,n,8,1,!0).translate(0,n/2,0),H_),r(new po(1.1,.3,6,18).rotateX(Math.PI/2),U_,i(0,.1,0)),r(new q(1.9,2.2,.1,18),H_,i(0,0,0)),r(new q(.48,.52,.8,14),B_,i(0,n-.2,0)),r(new po(.75,.42,8,12,Math.PI/2),B_,i(-.75,n+.6,0)),r(new q(.58,.58,1.6,14).rotateZ(Math.PI/2),B_,i(-1.55,n+1.35,0)),r(new q(.72,.72,.9,16).rotateZ(Math.PI/2),B_,i(-2.6,n+1.35,0)),r(new q(.85,.85,.22,16).rotateZ(Math.PI/2),B_,i(-3.15,n+1.35,0)),r(new q(.16,.2,.8,8),B_,i(-1.7,n+1.8,0)),r(new K(2,.3,.45),V_,i(-1.7,n+2.6,0)),r(new K(.45,.3,2),V_,i(-1.7,n+2.6,0)),r(new fo(.26,8,6),V_,i(-1.7,n+2.8,0)),{object:t.build()}}}),G_=Q({type:`kidsTower`,label:`Torre de juegos infantil`,params:{},footprint:()=>({rect:[10,8]}),build(e){let t=new Z;t.box(`wall`,9,7,7,0,-.5,0),t.box(`red`,6,6,5,0,6.5,0),t.addTransformed(`tile`,Wm(7,6,3.4,.5),Rm(0,12.5,0)),t.box(`glass`,2.6,2.4,22,0,4,-15),t.box(`glass`,2.6,2.4,18,0,4,13);for(let e of[-24,-14,10,20])t.box(`yellow`,.4,4,.4,0,-.5,e);let n=[`red`,`yellow`,`teal`,`green`];for(let e=0;e<6;e++)t.box(n[e%4],2.2,1.6+e%3,2.2,7+e%2*3,-.5,-6+e*2.6);return{object:t.build()}}}),K_=Q({type:`entranceBuilding`,label:`Edificio de acceso (estilo Puuc)`,params:{outer:[-17,-15,17,15],court:[-10,-9,4,3],height:6.5},footprint:e=>({rect:[e.outer[2]-e.outer[0],e.outer[3]-e.outer[1]]}),clearPaths:e=>{let[t,n,r,i]=e.outer,[a,o,s,c]=e.court,l=(t,n)=>[e.x+t,e.z+n];return[{pts:[l((t+a)/2,n),l((t+a)/2,i)],width:a-t+1},{pts:[l((s+r)/2,n),l((s+r)/2,i)],width:r-s+1},{pts:[l(t,(n+o)/2),l(r,(n+o)/2)],width:o-n+1},{pts:[l(t,(c+i)/2),l(r,(c+i)/2)],width:i-c+1}]},build(e){let t=new Z,[n,r,i,a]=e.outer,[o,s,c,l]=e.court,u=e.height,d=(e,n,r,i)=>{let a=r-e,o=i-n,s=(e+r)/2,c=(n+i)/2;t.box(`limestone`,a,u+.6,o,s,-.6,c),t.box(`stone`,a+.4,.35,o+.4,s,u*.42,c),t.box(`paving`,a+.6,.45,o+.6,s,u-.1,c)};d(n,r,o,a),d(c,r,i,a),d(o,r,c,s),d(o,l,c,a);let f=(e,t)=>{t(0,e,.2,1.8,`stone`,0);let n=Math.floor((e-1)/1.6);for(let r=0;r<n;r++)t(-e/2+.8+(r+.5)*((e-1.6)/n),.3,.45,1.3,`darkStone`,.12)},p=u-2;f(i-n,(e,o,s,c,l,u)=>{t.box(l,o,c,s,(n+i)/2+e,p,a+.05+u),t.box(l,o,c,s,(n+i)/2+e,p,r-.05-u)}),f(a-r,(e,o,s,c,l,u)=>{t.box(l,s,c,o,i+.05+u,p,(r+a)/2+e),t.box(l,s,c,o,n-.05-u,p,(r+a)/2+e)});let m=(o+c)/2;t.box(`dark`,3.2,2.2,.2,m,-.6,a+.06);for(let e=0;e<3;e++)t.box(`dark`,2.4-e*.7,.35,.2,m,1.6+e*.35,a+.06);for(let e=0;e<2;e++)for(let n=-1;n<=1;n++)t.box(`window`,.6,.6,.2,m+n*1.6,u*.42+.45+e*.7,a+.06);t.box(`dark`,3,2.6,.2,m,-.6,l-.06);for(let e of[.25,.75])t.box(`window`,.2,2.3,1.6,i+.06,-.3,r+(a-r)*e),t.box(`window`,.2,2.3,1.6,n-.06,-.3,r+(a-r)*e);return t.box(`limestone`,5,3.4,5,n+2.5,-.6,a+2.5),t.box(`paving`,5.6,.35,5.6,n+2.5,2.8,a+2.5),t.box(`window`,1.4,2.2,.2,n+2.5,-.3,a+5.05),{object:t.build()}}});function q_(e,t){let n=Jm(e.map(([e,t])=>[e,-t]),t,{top:!0,bottom:!0});return n.rotateX(Math.PI/2),n.translate(0,0,-t/2),n}var J_=Q({type:`entranceArch`,label:`Arco maya de acceso`,params:{wing:5.6,depth:4.6},footprint:e=>({rect:[e.wing*2+5.6,e.depth+3]}),build(e){let t=new Z,n=2.4,r=e.wing,i=e.depth,a=6.6,o=i/2,s=2*(n+r)+.8;t.box(`pierStone`,s,.45,i+1.2,0,-.3,0),t.box(`pierStone`,s-.6,.3,.7,0,-.3,o+.95),t.box(`pierStone`,s-1.2,.15,.6,0,-.3,o+1.55);let c=[[-2.4,0],[-1.25,0],[-1.25,3],[-.18,5],[.18,5],[1.25,3],[1.25,0],[n,0],[n,a],[-2.4,a]];t.add(`pierStone`,q_(c,i+.4),0,.15,0),t.box(`dark`,2.4,4.9,.1,0,.15,-i/2+.25),t.box(`stone`,5.1,.35,i+.7,0,6.3999999999999995,0);for(let e=0;e<5;e++){let r=-1.95+(n*2-.9)/4*e;for(let e of[o-.1,-o+.1])t.box(`pierStone`,.55,.7,.5,r,6.75,e)}for(let e of[-1,1]){let a=e*(n+r/2);t.box(`pierStone`,r,4.8,i,a,.15,0),t.box(`stone`,r+.2,.25,i+.3,a,2.95,0),t.box(`stone`,r+.3,.3,i+.4,a,4.8999999999999995,0),t.box(`dark`,1.35,2.3,.08,a+e*.6,.3,o+.02);for(let e=0;e<7;e++){let n=a-r/2+.45+e*((r-.9)/6),i=new K(.42,.42,.12).rotateZ(Math.PI/4);t.add(`darkStone`,i,n,3.5,o+.05)}for(let e of[-r/4,r/4]){t.box(`darkStone`,1.2,.95,.08,a+e,3.8,o+.03);for(let n=0;n<3;n++)t.box(`pierStone`,1.2,.1,.1,a+e,3.9+n*.3,o+.06)}for(let e=0;e<4;e++){let n=a-r/2+.6+e*((r-1.2)/3);t.box(`pierStone`,.5,.55,.45,n,5.2,o-.1)}for(let a=0;a<4;a++)t.box(`pierStone`,.9-a*.15,.32,i+.2-a*.3,e*(n+r-.45+a*.07),5.2+a*.34,0)}let l=g_(1.2,7);return l.scale(1.1,1.05,.6),t.add(`sandstone`,l,.2,.7,o+2.4,0,!1),t.add(`leaves`,new ao(.8,0).scale(1.6,.6,.8),0,.5,o+1.4,0,!1),{object:t.build()}}}),Y_=2049586,X_=Q({type:`flagpole`,label:`Asta bandera`,params:{height:18},footprint:()=>({circle:1.2}),build(e){let t=e.height,n=new On,r=new Z,i=1.1;r.box(`limestone`,1.5,1.6,1.5,0,-.5,0),r.box(`stone`,1.6,.12,1.6,0,i,0);let a=t*.36,o=(e,t)=>r.add(`vertex`,Y(e.translate(0,t,0),Y_),0,i,0,0,!1);o(new q(.17,.2,a,12).translate(0,a/2,0),0),o(new q(.15,.21,.5,12),a),o(new q(.08,.12,t-a,10).translate(0,(t-a)/2,0),a),o(new fo(.15,10,8),t),n.add(r.build());let s=new bi({color:15921906,transparent:!0,opacity:.6});for(let e of[.12,-.12])n.add(new Oi(new Ar().setFromPoints([new H(.1,i+t-.3,e*.4),new H(.25,2.5,e)]),s));let c=lg(t*.28);return c.mesh.position.set(.1,i+t-.25,0),n.add(c.mesh),{object:n,update:e=>c.update(e),animation:[cg(c)]}}}),Z_=Q({type:`ruins`,label:`Ruinas (muros bajos de cuartos)`,params:{rooms:[]},build(e){let t=new Z;for(let[n,r,i,a]of e.rooms){let e=.7,o=.9+(n*7+r*3&3)*.25;t.box(`rockwall`,i,o,e,n,-.3,r-a/2),t.box(`rockwall`,i,o*.8,e,n,-.3,r+a/2),t.box(`rockwall`,e,o,a,n-i/2,-.3,r),t.box(`rockwall`,e,o*.7,a*.55,n+i/2,-.3,r-a*.2),t.box(`stone`,i-1.4,.25,a-1.4,n,-.15,r)}return{object:t.build()}}}),Q_=Q({type:`altar`,label:`Altar`,params:{},footprint:()=>({rect:[5,5]}),build(e){let t=new Z;t.box(`rockwall`,5,.8,5,0,-.3,0),t.box(`rockwall`,3.6,1.4,3.6,0,.5,0),t.box(`darkStone`,3.9,.3,3.9,0,1.9,0);for(let[e,n]of[[0,2.6],[0,-2.6],[2.6,0],[-2.6,0]])t.box(`rockwall`,1.4,.4,1,e,-.3,n,e?Math.PI/2:0);return{object:t.build()}}}),$_=Q({type:`roundPalapa`,label:`Palapa redonda escalonada`,params:{radius:13,tiers:3,oculus:0},footprint:e=>({circle:e.radius+1.5}),build(e){let t=new Z,n=e.radius,r=Math.max(18,Math.round(n*2.4));t.cyl(`limestone`,n+1.5,n+2.2,1.2,0,-.6,0,r),t.cyl(`wood`,n+1.2,n+1.2,.12,0,.6,0,r);for(let[e,r]of[[n*.9,Math.round(n*1.5)],[n*.48,Math.round(n*.8)]])for(let i=0;i<r;i++){let a=i/r*Math.PI*2;t.cyl(`wood`,.2,.26,3.6+(e<n*.5?3:0),Math.cos(a)*e,.6,Math.sin(a)*e,6)}t.cyl(`wood`,.55,.65,10.6,0,.6,0,10);for(let e=0;e<10;e++){let r=e/10*Math.PI*2+.3,i=n*.7;t.cyl(`wood`,.7,.7,.08,Math.cos(r)*i,1.35,Math.sin(r)*i,10),t.cyl(`dark`,.08,.08,.75,Math.cos(r)*i,.6,Math.sin(r)*i,5)}let i=4.2,a=n+1.2,o=e.tiers??3;for(let s=0;s<o;s++){let c=s===o-1,l=c?Math.min(e.oculus??0,a*.5):a*.55,u=c?n*.55*(1-l/a):n*.36;t.add(`thatch`,Vm(a,l,u,r),0,i,0),t.add(`thatchDark`,new po(a-.15,.22,4,r).rotateX(Math.PI/2),0,i+.05,0,0,!1),c&&l>0&&(t.add(`thatch`,Vm(l,l*.94,2.2,r),0,i+u-.1,0),t.add(`thatchDark`,new po(l*.94,.25,4,r).rotateX(Math.PI/2),0,i+u+2.1,0,0,!1),t.cyl(`thatchDark`,l*.92,l*.92,.1,0,i+u-.2,0,r)),i+=u*.78,a=l*1.18}return{object:t.build()}}}),ev=Q({type:`longPalapa`,label:`Palapa alargada`,params:{length:28,width:9},footprint:e=>({rect:[e.length+1,e.width+1]}),build(e){let t=new Z,n=e.length,r=e.width;t.box(`limestone`,n+1,.6,r+1,0,-.3,0);let i=Math.round(n/3.5);for(let e=0;e<=i;e++)for(let a of[-1,1])t.cyl(`wood`,.18,.22,3.2,-n/2+e/i*n,.3,a*r/2,6);t.addTransformed(`thatch`,Wm(n,r,r*.55,.9),Rm(0,3.5,0));for(let e=0;e<Math.floor(n/4);e++)t.box(`wood`,1.6,.08,.8,-n/2+2+e*4,1.1,0);return{object:t.build()}}}),tv=Q({type:`dock`,label:`Muelle de concreto`,params:{poly:[]},build(e){let t=new Z;t.add(`pierStone`,Jm(e.poly,1.6),0,-.6,0);for(let n=0;n<e.poly.length;n++){let[r,i]=e.poly[n],[a,o]=e.poly[(n+1)%e.poly.length],s=Math.floor(Math.hypot(a-r,o-i)/6);for(let e=1;e<s;e++){let n=e/s,c=r+(a-r)*n,l=i+(o-i)*n;t.cyl(`dark`,.22,.28,.6,c+0,1,l,8)}}return{object:t.build()}}}),nv=Q({type:`walkways`,label:`Andadores sobre el agua`,params:{width:1.8,lines:[]},walkable:e=>e.lines.map(t=>({line:t,width:e.width})),build(e){let t=new Z,n=e.width??1.8;for(let r of e.lines)for(let i=1;i<r.length;i++){let[a,o]=r[i-1],[s,c]=r[i],l=Math.hypot(s-a,c-o),u=new K(l+n*.6,.5,n);u.translate(0,.25,0),t.add(`concrete`,u,(a+s)/2-e.x,0,(o+c)/2-e.z,-Math.atan2(c-o,s-a));let d=new K(l,.12,.12),f=-(c-o)/l,p=(s-a)/l;t.add(`dark`,d,(a+s)/2-e.x+f*(n/2-.1),1.1,(o+c)/2-e.z+p*(n/2-.1),-Math.atan2(c-o,s-a),!1);for(let r=0;r<=Math.floor(l/2.5);r++){let i=r/Math.max(1,Math.floor(l/2.5));t.box(`dark`,.08,.6,.08,a+(s-a)*i-e.x+f*(n/2-.1),.5,o+(c-o)*i-e.z+p*(n/2-.1))}}return{object:t.build()}}}),rv=Q({type:`boats`,label:`Lanchas amarradas`,params:{boats:[]},build(e){let t=new On,n=[];for(let[r,i,a,o,s]of e.boats){let c=new Z,l=o*.3,u=[[-o/2,-l/2],[o*.28,-l/2],[o/2,0],[o*.28,l/2],[-o/2,l/2]];c.add(`hull`,Jm(u,1.1),0,-.4,0),c.add(`boatStripe`,Jm(u.map(([e,t])=>[e*1.002,t*1.01]),.18),0,.35,0),c.box(`white`,o*.38,1.2,l*.7,-o*.08,.7,0),c.box(`glass`,o*.36,.45,l*.72,-o*.08,1.25,0),c.box(`boatCanopy`,o*.42,.12,l*.8,-o*.06,1.95,0);let d=c.build({hull:X(s,{roughness:.35})}),f=new On;f.add(d),f.position.set(r-e.x,0,i-e.z),f.rotation.y=-kt.degToRad(a),t.add(f),n.push(f)}return{object:t,update(e){n.forEach((t,n)=>{t.position.y=Math.sin(e*1.1+n*1.7)*.12,t.rotation.x=Math.sin(e*.9+n)*.03,t.rotation.z=Math.sin(e*.7+n*2)*.02})}}}}),iv=1,av=.22,ov=.3,sv=.55,cv=.18,lv=.3,uv=1.65,dv=2.4,fv=Q({type:`habitat`,label:`Hábitat de felinos con fosos`,params:{outer:[],islands:[],depth:4.6,bridge:null},groundHoles:e=>[{rings:[e.outer,...e.islands.map(e=>e.rim)],cover:e.bridge?e.bridge.height-e.bridge.sag*.6:void 0},...e.islands.filter(e=>e.pond).map(e=>({rings:[e.pond]}))],walkable:e=>{if(!e.bridge)return[];let t=vv(e.bridge),n=Math.max(1,Math.round(e.bridge.height/cv))*lv;return[{line:[t[0].center,t[1].center],width:2},...t.map(({center:e,start:[t,r],dir:[i,a]})=>({line:[e,[t,r],[t+i*n,r+a*n]],width:2}))]},build(e,t){let n=new Z,r=new On,i=[],a=t.heightAt(e.x,e.z),o=([t,n])=>[t-e.x,n-e.z],s=(n,r)=>t.heightAt(n+e.x,r+e.z)-a,c=Ph(4242),l=-e.depth,u=e.outer.map(o),d=e.islands.map(e=>({...e,rim:e.rim.map(o),pond:e.pond?.map(o),at:o(e.at)})),f=Cv(u,d.map(e=>e.rim));n.add(`pool`,f,0,l+iv,0,0,!1),pv(n,u,1,{hAt:s,floorY:l,back:.8,rand:c});for(let e of d)pv(n,e.rim,-1,{hAt:s,floorY:l,back:.9,rand:c});for(let e of d){let{rim:t,pond:a}=e,[o,l]=e.at,u=s(o,l);n.add(`rock`,g_(3.2,1),o,u+.6,l,0,!0),n.add(`rock`,g_(2.2,2),o+3.5,u+.3,l-2,.7,!0),n.add(`rock`,g_(1.6,3),o-3,u+.2,l+2.5,1.4,!0);for(let e=0;e<6;e++){let t=e*1.9,r=5+e%3*2,i=o+Math.cos(t)*r,a=l+Math.sin(t)*r;n.add(`rock`,g_(.8+e%2*.6,e+4),i,s(i,a),a,t,!0)}a&&mv(n,a,t,s,c);let d=kv(t);for(let e=0,r=0;e<600&&r<16;e++){let e=d[0]+c()*(d[2]-d[0]),i=d[1]+c()*(d[3]-d[1]);!Dv(t,e,i)||Ov(t,e,i)<2.2||Math.hypot(e-o,i-l)<6.5||a&&(Dv(a,e,i)||Ov(a,e,i)<1.2)||(n.addTransformed(`vertex`,bv(c),Rm(e,s(e,i)-.05,i,c()*6.3)),r++)}let f=Pg(e.animal);r.add(f.group);let p=e.animal===`jaguar`?2:0;i.push(e=>{let t=e*.18+p,n=t%(Math.PI*2),r=Math.sin(t*.5)>.55,i=4.6;if(r)f.group.position.set(o,u+2.1,l),f.group.rotation.set(0,p,0),f.legs.forEach(e=>{e.rotation.z=0}),f.head.rotation.y=Math.sin(e*.6)*.5;else{let t=o+Math.cos(n)*i,r=l+Math.sin(n)*i;f.group.position.set(t,s(t,r)+.05,r),f.group.rotation.set(0,-n-Math.PI/2,0);let a=Math.sin(e*6);f.legs.forEach((e,t)=>{e.rotation.z=(t===0||t===3?a:-a)*.5}),f.head.rotation.y=0}f.tail.rotation.y=Math.sin(e*1.3)*.3})}return e.bridge&&r.add(hv(n,{...e.bridge,from:o(e.bridge.from),to:o(e.bridge.to)},s,l)),r.add(n.build()),{object:r,update:e=>i.forEach(t=>t(e))}}});function pv(e,t,n,{hAt:r,floorY:i,back:a,rand:o}){let s=Ev(Tv(t,1.6),n),c=[],l=[];s.forEach(e=>e.top=r(e.x,e.z)+.18);for(let e=0;e<s.length;e++){let t=s[e],n=s[(e+1)%s.length],o=(e,t,n)=>[e.x+e.nx*t,n,e.z+e.nz*t],u=[(t.nx+n.nx)/2,0,(t.nz+n.nz)/2];c.push([o(t,0,i),o(n,0,i),o(n,0,n.top-ov),o(t,0,t.top-ov),u]),l.push([o(t,av,t.top-ov),o(n,av,n.top-ov),o(n,av,n.top),o(t,av,t.top),u]),l.push([o(t,0,t.top-ov),o(n,0,n.top-ov),o(n,av,n.top-ov),o(t,av,t.top-ov),[0,-1,0]]),l.push([o(t,av,t.top),o(n,av,n.top),o(n,-a,n.top),o(t,-a,t.top),[0,1,0]]);let d=r(t.x-t.nx*a,t.z-t.nz*a)-.4,f=r(n.x-n.nx*a,n.z-n.nz*a)-.4;l.push([o(t,-a,d),o(n,-a,f),o(n,-a,n.top),o(t,-a,t.top),[-u[0],0,-u[2]]])}return e.add(`darkRubble`,xv(c),0,0,0),e.add(`darkRubble`,xv(l),0,0,0),wv(s,sv,(t,n,r,i,a)=>{let s=.42+o()*.28,c=new Bi(.22+o()*.08,s,4,1,!0).translate(0,s/2,0);e.add(`limestone`,c,t-r*.12,a-.04,n-i*.12,o()*1.6)}),s}function mv(e,t,n,r,i){let a=Ev(Tv(t,1.2),1);a.forEach(e=>e.top=r(e.x,e.z)+.06);let o=Math.min(...a.map(e=>e.top))-.42,s=[];for(let e=0;e<a.length;e++){let t=a[e],n=a[(e+1)%a.length],r=(e,t,n)=>[e.x+e.nx*t,n,e.z+e.nz*t],i=[(t.nx+n.nx)/2,0,(t.nz+n.nz)/2];s.push([r(t,0,o-.3),r(n,0,o-.3),r(n,0,n.top),r(t,0,t.top),i]),s.push([r(t,0,t.top),r(n,0,n.top),r(n,-.35,n.top),r(t,-.35,t.top),[0,1,0]])}e.add(`sandstone`,xv(s),0,0,0),e.add(`pool`,Cv(t,[]),0,o,0,0,!1),wv(a,1.4,(t,r,a,o,s)=>{if(Ov(n,t,r)<1.8)return;let c=.3+i()*.25;e.add(`sandstone`,g_(c,Math.floor(i()*50)),t-a*.45,s-.05,r-o*.45,i()*6.3)})}function hv(e,t,n,r){let{from:i,to:a,height:o,sag:s,width:c}=t,[l,u]=Av(i,a),[d,f]=[-u,l],p=Math.hypot(a[0]-i[0],a[1]-i[1]),m=-Math.atan2(u,l),h=n(...i)+o,g=n(...a)+o,_=e=>h+(g-h)*e-4*s*e*(1-e),v=(e,t,n)=>[i[0]+l*p*e+d*t,n,i[1]+u*p*e+f*t],y=(e,t=0)=>[i[0]+l*e+d*t,i[1]+u*e+f*t],b=Math.round(p/.5);for(let t=0;t<b;t++){let n=(t+.5)/b,[r,i]=y(n*p);e.add(`wood`,new K(p/b-.07,.08,c),r,_(n)-.08,i,m)}let x=Math.max(2,Math.round(p/dv)),S=Array.from({length:x+1},(e,t)=>t/x);for(let t of[-c/2,c/2]){for(let n=0;n<x;n++){let[r,i]=[S[n],S[n+1]];e.rod(`steel`,v(r,t,_(r)-.12),v(i,t,_(i)-.12),.06),e.rod(`steel`,v(r,t,_(r)+uv),v(i,t,_(i)+uv),.03)}for(let n of S)e.rod(`steel`,v(n,t,_(n)-.12),v(n,t,_(n)+uv+.05),.04)}let C=[];for(let e of[-c/2,c/2])for(let t=0;t<b;t++){let[n,r]=[t/b,(t+1)/b];C.push([v(n,e,_(n)),v(r,e,_(r)),v(r,e,_(r)+uv),v(n,e,_(n)+uv)])}let w=new ri(Sv(C),new Do({color:16777215,map:Yh(),transparent:!0,side:2,depthWrite:!1,roughness:.55,metalness:.3}));w.name=`habitat:chain-link`,w.renderOrder=2;let[T,E]=vv(t),D=t.tower??4.3,O=gv,[k,A]=T.center;e.add(`limestone`,new K(D,h-r,O).translate(0,(h-r)/2,0),k,r,A,m),e.add(`paving`,new K(D-.2,.06,O-.2),k,h+.03,A,m);for(let[t,n]of[[-1,-1],[-1,1],[1,-1],[1,1]]){let[r,i]=y(-D/2+t*(D/2-.35),n*(O/2-.35));e.add(`limestone`,new K(.6,2.6,.6).translate(0,1.3,0),r,h,i,m)}e.add(`limestone`,new K(D+.5,.35,O+.5).translate(0,.175,0),k,h+2.6,A,m),e.add(`limestone`,new K(D+.2,.18,O+.2).translate(0,.09,0),k,h+2.95,A,m),yv(e,T.start,T.dir,h,n);let j=t.landing??2.8,ee=_v,[te,M]=E.center;e.add(`limestone`,new K(j,g-r,ee).translate(0,(g-r)/2,0),te,r,M,m),e.add(`paving`,new K(j-.2,.06,ee-.2),te,g+.03,M,m);for(let t of[-1,1]){let[n,r]=y(p+.3,t*(ee/2-.3));e.add(`limestone`,new K(.5,2.3,.5).translate(0,1.15,0),n,g,r,m)}let[ne,N]=y(p+.3);return e.add(`limestone`,new K(.6,.4,ee).translate(0,.2,0),ne,g+2.3,N,m),yv(e,E.start,E.dir,g,n),w}var gv=4.4,_v=3.2;function vv(e){let[t,n]=Av(e.from,e.to),[r,i]=[-n,t],a=Math.hypot(e.to[0]-e.from[0],e.to[1]-e.from[1]),o=e.tower??4.3,s=e.landing??2.8;return[{s:-o/2,long:o,wide:gv,dir:e.stairs?.[0]??[-t,-n]},{s:a+s/2,long:s,wide:_v,dir:e.stairs?.[1]??[t,n]}].map(({s:a,long:o,wide:s,dir:c})=>{let l=[e.from[0]+t*a,e.from[1]+n*a],[u,d]=Av([0,0],c),f=(Math.abs(u*t+d*n)*o+Math.abs(u*r+d*i)*s)/2;return{center:l,start:[l[0]+u*f,l[1]+d*f],dir:[u,d]}})}function yv(e,[t,n],[r,i],a,o){let s=-Math.atan2(i,r),c=o(t+r*4,n+i*4),l=Math.max(1,Math.round((a-c)/cv)),u=(a-c)/l;for(let o=0;o<l-1;o++){let l=t+r*(o+.5)*lv,d=n+i*(o+.5)*lv,f=a-(o+1)*u;e.add(`limestone`,new K(lv,f-c+.4,1.9).translate(0,(f-c+.4)/2,0),l,c-.4,d,s)}}function bv(e){let t=1.3+e()*1.7,n=[Y(new q(.06,.09,t,5,1,!0).translate(0,t/2,0),`#7a6b57`)],r=9+Math.floor(e()*4);for(let i=0;i<r;i++){let a=.85+e()*.45,o=new Bi(.3,a,4,1);o.rotateZ(-Math.PI/2).translate(a/2,0,0).scale(1,.18,1),o.rotateZ(.15+e()*.7),o.rotateY(i/r*Math.PI*2+e()*.4),o.translate(0,t,0),n.push(Y(o,e()<.5?`#4f8c36`:`#679f45`))}return Im(n.map(e=>e.toNonIndexed()))}function xv(e){let t=[];for(let[n,r,i,a,o]of e){let e=[r[0]-n[0],r[1]-n[1],r[2]-n[2]],s=[i[0]-n[0],i[1]-n[1],i[2]-n[2]],c=[e[1]*s[2]-e[2]*s[1],e[2]*s[0]-e[0]*s[2],e[0]*s[1]-e[1]*s[0]];c[0]*o[0]+c[1]*o[1]+c[2]*o[2]>=0?t.push([...n,...r,...i],[...n,...i,...a]):t.push([...n,...i,...r],[...n,...a,...i])}return Hm(t)}function Sv(e){let t=[],n=[],r=0;for(let[i,a,o,s]of e){let e=Math.hypot(a[0]-i[0],a[2]-i[2])/.8,c=(s[1]-i[1])/.8;t.push(...i,...a,...o,...i,...o,...s),n.push(r,0,r+e,0,r+e,c,r,0,r+e,c,r,c),r+=e}let i=new Ar;return i.setAttribute(`position`,new G(t,3)),i.setAttribute(`uv`,new G(n,2)),i.computeVertexNormals(),i}function Cv(e,t){let n=new va(e.map(([e,t])=>new V(e,-t)));for(let e of t)n.holes.push(new _a(e.map(([e,t])=>new V(e,-t))));return new lo(n).rotateX(-Math.PI/2)}function wv(e,t,n){let r=t/2,i=0;for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=Math.hypot(s.x-o.x,s.z-o.z);for(;r<=i+c;r+=t){let e=(r-i)/c;n(o.x+(s.x-o.x)*e,o.z+(s.z-o.z)*e,o.nx+(s.nx-o.nx)*e,o.nz+(s.nz-o.nz)*e,o.top+(s.top-o.top)*e)}i+=c}}function Tv(e,t){let n=[];for(let r=0;r<e.length;r++){let[i,a]=e[r],[o,s]=e[(r+1)%e.length],c=Math.max(1,Math.ceil(Math.hypot(o-i,s-a)/t));for(let e=0;e<c;e++)n.push([i+(o-i)*e/c,a+(s-a)*e/c])}return n}function Ev(e,t){let n=e.reduce((t,[n,r],i)=>{let[a,o]=e[(i+1)%e.length];return t+n*o-a*r},0),r=Math.sign(n)*t,i=t=>{let[n,i]=e[t],[a,o]=e[(t+1)%e.length],s=Math.hypot(a-n,o-i)||1;return[-(o-i)/s*r,(a-n)/s*r]};return e.map(([t,n],r)=>{let a=i((r-1+e.length)%e.length),o=i(r),s=a[0]+o[0],c=a[1]+o[1],l=Math.hypot(s,c)||1;s/=l,c/=l;let u=1/Math.max(.5,s*o[0]+c*o[1]);return{x:t,z:n,nx:s*u,nz:c*u}})}function Dv(e,t,n){let r=!1;for(let i=0,a=e.length-1;i<e.length;a=i++){let[o,s]=e[i],[c,l]=e[a];s>n!=l>n&&t<(c-o)*(n-s)/(l-s)+o&&(r=!r)}return r}function Ov(e,t,n){let r=1/0;for(let i=0;i<e.length;i++){let[a,o]=e[i],[s,c]=e[(i+1)%e.length],l=s-a,u=c-o,d=l*l+u*u||1,f=Math.max(0,Math.min(1,((t-a)*l+(n-o)*u)/d));r=Math.min(r,Math.hypot(t-a-l*f,n-o-u*f))}return r}function kv(e){let t=e.map(e=>e[0]),n=e.map(e=>e[1]);return[Math.min(...t),Math.min(...n),Math.max(...t),Math.max(...n)]}function Av([e,t],[n,r]){let i=Math.hypot(n-e,r-t)||1;return[(n-e)/i,(r-t)/i]}var jv=.52,Mv=Q({type:`galleryBridge`,label:`Galería de antorchas sobre el camino`,params:{length:20,depth:8,gallery:31,galleryDepth:7.6,opening:9,clearance:2.9},build(e){let t=new Z,{length:n,depth:r,gallery:i,galleryDepth:a,opening:o,clearance:s}=e,c=s+.7,l=r/2,u=-r/2,d=-r/2-a;for(let e of[-1,1]){let i=(n-o)/2;t.box(`limestone`,i,c,r,e*(o/2+i/2),0,0)}let f=[-o/2+.55,-o/6,o/6,o/2-.55];for(let e of f)t.cyl(`limestone`,.42,.46,s,e,0,l-.6,10);t.box(`stone`,n+.3,c-s,r+.3,0,s,0),t.box(`paving`,n+.1,.06,r+.1,0,c,0),Nv(t,-n/2+.4,n/2-.4,s+(c-s)/2,l+.15,1);let p=(u+d)/2;for(let e of[-1,1]){let n=(i-o)/2;t.box(`limestone`,n,c,a,e*(o/2+n/2),0,p)}for(let e of[u,d+.6])for(let n of f)t.cyl(`limestone`,.42,.46,s,n,0,e,10);t.box(`stone`,i+.3,c-s,a+.3,0,s,p);let m=2.3;t.box(`dark`,i-1.4,m,a-1.4,0,c,p);let h=Math.round((i-1)/1.35),g=(i-1)/h;for(let e of[u-.25,d+.25])for(let n=0;n<h;n++)t.box(`wall`,g-.38,m,.5,-i/2+.5+(n+.5)*g,c,e);for(let e of[-1,1])t.box(`wall`,.5,m,a,e*(i/2-.25),c,p);t.box(`stone`,i+.3,.6,a+.3,0,c+m,p),t.box(`limestone`,i+.5,.2,a+.5,0,c+m+.6,p),Nv(t,-i/2+.4,i/2-.4,c+m+.3,u+.15,1),Nv(t,-i/2+.4,i/2-.4,c+m+.3,d-.15,-1);for(let e=1;e<h;e+=2){let n=-i/2+.5+(e+.5)*g,r=u+.12;t.cyl(`dark`,.05,.06,2.1,n,c+.3,r,6),t.cyl(`dark`,.13,.07,.22,n,c+2.4,r,6),t.add(`lamp`,new Bi(.1,.32,6).translate(0,.16,0),n,c+2.62,r)}return{object:t.build()}}});function Nv(e,t,n,r,i,a){let o=Math.floor((n-t)/jv),s=new q(.21,.21,.12,8).rotateX(Math.PI/2),c=new q(.08,.08,.16,6).rotateX(Math.PI/2);for(let l=0;l<=o;l++){let u=t+(n-t)*l/o;e.add(`white`,s.clone(),u,r,i+a*.06,0,!1),e.add(`darkStone`,c.clone(),u,r,i+a*.08,0,!1)}}var Pv=[4.6,3.4],Fv=1.6,Iv=1.2,Lv=`#9a4b37`,Rv=`#5b3a24`,zv=Q({type:`trailGate`,label:`Puerta colonial de sendero`,params:{text:[`Sendero de Selva`,`al Río del Paraíso`]},footprint:()=>({rect:[Pv[0]+2*Fv+.4,1.6]}),build(e){let t=new Z,[n,r]=Pv,i=n/2+Fv,a=(e,n,r=0,i=0,a=0)=>t.add(`vertex`,Y(e.toNonIndexed(),n),r,i,a,0,!1);for(let e of[-1,1]){let r=e*(n/2+Fv/2);t.box(`limestone`,Fv,5.2,1.5,r,0,0),a(new K(1.9500000000000002,.32,1.7999999999999998).translate(0,.16,0),Lv,r,5.2,0),a(new K(1.75,.2,1.65).translate(0,.1,0),`#b8654c`,r,5,0)}a(new K(n+.6,.45,.5).translate(0,.22,0),Rv,0,r,Iv/2-.1);for(let e=0;e<5;e++)a(new K(.42,.4,1.1).translate(0,.2,0),Rv,-1.8+e*.9,r+.45,.7);t.box(`limestone`,n+.2,1.75,1,0,r+.45,0);let o=Bv(i-.2);t.add(`limestone`,o,0,r+2.2,-.5),a(Vv(),Lv,0,r+2.2,Iv/2-.08);let s=new so(n-.2,1.2);t.add(`gateText`,s,0,r+1.5,.54,0,!1),a(new fo(.28,8,6).scale(1,1.5,1),`#cfc7b5`,-(n/2+Fv/2),5.85,0),a(new q(.22,.3,1.3,8).translate(0,.65,0),`#b9ad97`,n/2+Fv/2,5.52,0),a(new fo(.2,8,6),`#b9ad97`,n/2+Fv/2,7,0);for(let e of[-1,1])t.box(`rockwall`,.6,1,5,e*(n/2-.3),0,-1.2/2-2.5);return{object:t.build({gateText:Uv(e.text)})}}});function Bv(e){let t=[];for(let n=0;n<=24;n++){let r=n/24,i=(r-.5)*2*e,a=Math.abs(r-.5)*2,o=.4+2.6*Math.cos(a*Math.PI/2)**2+.35*Math.sin(a*Math.PI*2.5)*(1-a);t.push([i,Math.max(0,o)])}let n=new va;n.moveTo(-e,0);for(let[e,r]of t)n.lineTo(e,r);n.lineTo(e,0),n.lineTo(-e,0);let r=(e,t,n)=>new _a().absarc(e,t,n,0,Math.PI*2,!0);return n.holes.push(r(0,1.05,.55),r(0,2.45,.38)),Xm(new no(n,{depth:.8999999999999999,bevelEnabled:!1,curveSegments:12}),.25)}function Vv(){let e=new va;return e.absarc(0,1.05,1.15,0,Math.PI,!1),e.absarc(0,1.05,.9,Math.PI,0,!0),new no(e,{depth:.12,bevelEnabled:!1,curveSegments:12})}var Hv=new Map;function Uv(e){let t=e.join(`|`);if(Hv.has(t))return Hv.get(t);let n=Ih(`gateText:${t}`,512,(t,n)=>{t.clearRect(0,0,n,n),t.fillStyle=`#3b2a1e`,t.textAlign=`center`,t.font=`bold ${n*.085}px Georgia, serif`,e.forEach((e,r)=>t.fillText(e,n/2,n*(.45+r*.13)))},!1);n.repeat.set(1,.32),n.offset.set(0,.36);let r=xf(X(16777215,{map:n,alphaTest:.5}));return Hv.set(t,r),r}var Wv=.4,Gv=-.9,Kv=.42,qv=.9,Jv=Q({type:`snorkelCove`,label:`Caleta de snorkel`,params:{ledges:[],entries:[]},build(e){let t=new Z,n=([t,n])=>[t-e.x,n-e.z],r=Nh(5);for(let i of e.ledges){let e=i.pts.map(n);t.add(`pierStone`,Yv(e,i.width),0,0,0);for(let n=1;n<e.length;n++){let[i,a]=e[n-1],[o,s]=e[n],c=Math.round(Math.hypot(o-i,s-a)/1.6);for(let e=0;e<c;e++){let l=(e+r())/c;t.add(`sandstone`,g_(.35+r()*.35,n*10+e),i+(o-i)*l,-.15,a+(s-a)*l,r()*6.3)}}}for(let r of e.entries)Xv(t,n(r.at),n(r.toward),r.width??1.6,r.rails??2);return{object:t.build()}}});function Yv(e,t){let n=[],r=t/2;for(let t=1;t<e.length;t++){let[i,a]=e[t-1],[o,s]=e[t],c=Math.hypot(o-i,s-a)||1,l=-(s-a)/c*r,u=(o-i)/c*r,d=[i+l,Wv,a+u],f=[o+l,Wv,s+u],p=[o-l,Wv,s-u],m=[i-l,Wv,a-u],h=e=>[e[0],-.6,e[2]];n.push([...d,...f,...p],[...d,...p,...m]),n.push([...d,...h(f),...f],[...d,...h(d),...h(f)]),n.push([...m,...p,...h(p)],[...m,...h(p),...h(m)])}return Hm(n)}function Xv(e,[t,n],[r,i],a,o){let s=Math.hypot(r-t,i-n)||1,[c,l]=[(r-t)/s,(i-n)/s],u=-Math.atan2(l,c);for(let r=0;r<6;r++){let i=Wv-(r+1)*.21666666666666667,o=t+c*(r+.5)*Kv,s=n+l*(r+.5)*Kv;e.add(`pierStone`,new K(Kv,i-Gv+.1,a).translate(0,(i-Gv+.1)/2,0),o,-1,s,u)}let[d,f]=[-l,c],p=6*Kv;for(let r=0;r<o;r++){let i=o===1?0:-a/2+.1+(a-.2)*r/(o-1),s=(e,r)=>[t+c*e+d*i,r,n+l*e+f*i],u=e=>e<=0?Wv:Wv-e/p*1.3,m=[-1.2,0,p*.5,p];for(let t of m)e.rod(`weatheredWood`,s(t,u(t)),s(t,u(t)+qv),.05,6);for(let t=1;t<m.length;t++){let[n,r]=[m[t-1],m[t]];e.rod(`weatheredWood`,s(n,u(n)+qv),s(r,u(r)+qv),.045,6)}}}var Zv=[3.2,1.4],Qv=Q({type:`stoneSign`,label:`Letrero de piedra de actividad`,params:{number:1,lines:[`NOMBRE`],hours:``},footprint:()=>({rect:[Zv[0]+1,1.4]}),build(e){let t=new Z,[n,r]=Zv;t.add(`sandstone`,new K(n,r,.9,3,2,1).translate(0,r/2,0),0,-.05,0),t.add(`sandstone`,g_(.75,3),-n/2-.5,.2,.2,.4),t.add(`sandstone`,g_(.9,7),n/2+.55,.25,.1,1.1),t.add(`sandstone`,g_(.5,9),n/2+.2,.1,.75,2.2);let i=new so(n-.1,r-.1);return t.add(`signFace`,i,0,r/2-.05,.46,0,!1),{object:t.build({signFace:ey(e)})}}}),$v=new Map;function ey({number:e,lines:t,hours:n}){let r=`${e}|${t.join(`|`)}|${n}`;if($v.has(r))return $v.get(r);let i=Ih(`stoneSign:${r}`,512,(r,i)=>{r.clearRect(0,0,i,i);let a=i*.28,o=i*.44,s=i*.16,c=a+o*.4,l=o*.38;r.fillStyle=`#4a2c1e`,r.beginPath(),r.arc(s,c,l,0,Math.PI*2),r.fill(),r.fillStyle=`#f2efe6`,r.beginPath(),r.arc(s,c,l*.68,0,Math.PI*2),r.fill(),r.strokeStyle=`#f2efe6`,r.lineWidth=2;for(let e=0;e<14;e++){let t=e/14*Math.PI*2,n=s+Math.cos(t)*l*.84,i=c+Math.sin(t)*l*.84;r.strokeRect(n-3,i-3,6,6)}r.fillStyle=`#26211d`,r.textAlign=`center`,r.textBaseline=`middle`,r.font=`bold ${l*.85}px Arial, sans-serif`,r.fillText(String(e),s,c+2),r.fillStyle=`#4a2c1e`,r.font=`bold ${o*.24}px Arial Black, Arial, sans-serif`,t.forEach((e,t)=>r.fillText(e,i*.62,a+o*(.28+t*.32))),n&&(r.fillStyle=`#151515`,r.fillRect(i*.06,a+o*.8,i*.28,o*.17),r.fillStyle=`#f2efe6`,r.font=`${o*.11}px Arial, sans-serif`,r.fillText(n,i*.2,a+o*.885))},!1);i.repeat.set(1,.44),i.offset.set(0,.28);let a=xf(X(16777215,{map:i,alphaTest:.5}));return $v.set(r,a),a}var ty={pink:[`#e2367f`,`#fff`],yellow:[`#f3c234`,`#1d1d1d`],green:[`#2fa34f`,`#fff`],blue:[`#1d6fd0`,`#fff`],red:[`#d5303a`,`#fff`],black:[`#202226`,`#fff`],white:[`#f4f2ec`,`#1d1d1d`]},ny=Q({type:`signpost`,label:`Poste de distancias a ciudades`,params:{places:[]},build(e,{park:t}){let n=new On,r=[t.center.lat,t.center.lng],i=e.places.map(({name:e,color:t,at:n,km:i,bearing:a})=>({name:e,color:t,km:n?lm(r,n):i,bearing:n?um(r,n):a})),a=1024,o=.5,s=document.createElement(`canvas`);s.width=a*o,s.height=96*i.length*o;let c=s.getContext(`2d`);c.scale(o,o);let l=e=>e>=100?Math.round(e).toLocaleString(`es-MX`):e.toFixed(1);i.forEach((e,t)=>{let[n,r]=ty[e.color],i=t*96;c.fillStyle=n,c.fillRect(0,i,a,96),c.fillStyle=`rgba(0,0,0,0.12)`,c.fillRect(0,i+96-8,a,8),c.fillStyle=r,c.textAlign=`center`,c.textBaseline=`middle`,c.font=`800 ${e.name.length>14?40:50}px Montserrat, Arial, sans-serif`,c.fillText(e.name,a*.45,i+34.56),c.font=`600 26px Montserrat, Arial, sans-serif`,c.fillText(`${l(e.km)} km · ${l(e.km*.621371)} mi`,a*.45,i+96*.76)});let u=pf(new Pi(s));u.colorSpace=Be,u.anisotropy=8;let d=[],f=[],p=.17,m=3.0000000000000004/i.length;i.forEach((e,t)=>{let n=.9+Math.min(.55,e.name.length*.035),r=new no(new va([[0,-.17/2],[n-p*.6,-.17/2],[n,0],[n-p*.6,p/2],[0,p/2]].map(([e,t])=>new V(e,t))),{depth:.035,bevelEnabled:!1});r.translate(.1,0,-.035/2);let a=r.getAttribute(`position`),o=r.getAttribute(`normal`),s=[],c=[],l=[];for(let e=0;e<a.count;e+=3){let r=Math.abs(o.getZ(e))>.9;for(let u=0;u<3;u++){let d=a.getX(e+u),f=a.getY(e+u),m=a.getZ(e+u);if((r?s:l).push(d,f,m),r){let r=(d-.1)/n,a=o.getZ(e)>0?r:1-r;c.push(a,1-(t+1-(f+p/2)/p)/i.length)}}}let u=new Ar;u.setAttribute(`position`,new G(s,3)),u.setAttribute(`uv`,new G(c,2)),u.computeVertexNormals();let h=new Ar;h.setAttribute(`position`,new G(l,3)),h.computeVertexNormals();let g=new U().compose(new H(0,4.4-t*m,0),new At().setFromAxisAngle(new H(0,1,0),kt.degToRad(90-e.bearing)+(t%2?.04:-.04)),new H(1,1,1));d.push(u.applyMatrix4(g)),f.push(h.applyMatrix4(g))});let h=new ri(Im(d),new Do({map:u,roughness:.7})),g=new ri(Im(f),X(15855076)),_=new Z;_.cyl(`weatheredWood`,.09,.12,5,0,0,0,8),_.box(`weatheredWood`,.3,.06,.3,0,5,0);for(let e=0;e<6;e++)_.add(`sandstone`,g_(.55+e%3*.12,e+11),-1.8+e%2*.25,.25,-3.2+e*1.25,e*.9,!0);return n.add(_.build(),h,g),{object:n}}}),ry=3881526,iy=15328730,ay=10985617;function oy(e,t,n,r){let i=e>0?new co(e,t,48):new zi(t,48);return i.rotateX(-Math.PI/2),i.translate(0,r,0),Y(i,n)}function sy(e,t,n,r,i,a){let o=[Math.sin(e)*t,Math.cos(e)*t],s=e+Math.PI/2*r,c=[Math.sin(s)*n,Math.cos(s)*n],l=[[0,0],c,o];c[1]*o[0]-c[0]*o[1]<0&&(l=[l[0],l[2],l[1]]);let u=new Ar;return u.setAttribute(`position`,new G(l.flatMap(([e,t])=>[e,a,t]),3)),u.computeVertexNormals(),Y(u,i)}var cy=Q({type:`compassRose`,label:`Rosa de los vientos de piedra (mosaico)`,params:{radius:5},build(e){let t=new Z,n=e.radius,r=.08;t.add(`vertex`,oy(0,n*.7,ry,r),0,0,0,0,!1),t.add(`vertex`,oy(n*.5,n*.58,iy,.09),0,0,0,0,!1),t.add(`vertex`,oy(0,n*.42,ay,.09),0,0,0,0,!1);for(let e=0;e<8;e++){let i=e*Math.PI/4,a=e%2==0,o=a?n:n*.78,s=a?n*.16:n*.12,c=a?.03:.02;t.add(`vertex`,sy(i,o,s,1,ry,r+c),0,0,0,0,!1),t.add(`vertex`,sy(i,o,s,-1,iy,r+c),0,0,0,0,!1)}return{object:t.build()}}}),ly=[15087942,16219904,16564041,9095462,2792847,1671876,6966419,15030170],uy=Q({type:`pinwheel`,label:`Rehilete (domo con aspas de colores)`,params:{radius:15,height:12,outer:28,blades:22,twist:.75},footprint:e=>({circle:e.outer}),build(e){let t=new Z,{radius:n,height:r,outer:i}=e;t.add(`concrete`,Zm(Bm(i+.5,i+.5,48),[],.5),0,-.3,0),t.cyl(`white`,n,n,1.6,0,.2,0,32,!0);let a=new fo(1,32,9,0,Math.PI*2,0,Math.PI/2);a.scale(n,r-1.6,n),t.add(`white`,a,0,1.8,0);for(let a=0;a<e.blades;a++){let o=a/e.blades*Math.PI*2,s=ly[a%ly.length];for(let a=0;a<4;a++){let c=a/4,l=(a+1)/4,u=n-.5+(i-n+.5)*c,d=n-.5+(i-n+.5)*l,f=o+e.twist*c,p=o+e.twist*l,m=Math.cos(f)*u,h=Math.sin(f)*u,g=Math.cos(p)*d,_=Math.sin(p)*d,v=Math.hypot(g-m,_-h)+.15,y=r*.8*(1-.82*(c+l)*.5),b=Y(new K(v,y,.35).translate(0,y/2,0),s);t.add(`vertex`,b,(m+g)/2,.2,(h+_)/2,-Math.atan2(_-h,g-m),!1)}}return{object:t.build()}}}),dy=[15909198,15167313,2792847,16032692,9358054,16777215,11920524,13073919],fy=Q({type:`crookedTown`,label:`Pueblo chueco (casas inclinadas)`,params:{line:[],side:1,offset:6,spacing:7,depth:6,seed:3},clearPaths:e=>[{pts:e.line,width:(e.offset+e.depth)*2}],build(e){let t=new Z,n=e.seed,r=()=>(n=n*16807%2147483647)/2147483647*2-1,i=0;for(let n=1;n<e.line.length;n++){let[a,o]=e.line[n-1],[s,c]=e.line[n],l=Math.hypot(s-a,c-o),u=(s-a)/l,d=(c-o)/l,f=d*e.side,p=-u*e.side,m=Math.max(1,Math.floor(l/e.spacing));for(let n=0;n<m;n++){let l=(n+.5)/m,h=e.spacing*.86,g=e.depth*(.8+.2*Math.abs(r())),_=4.5+2.5*Math.abs(r()),v=a+(s-a)*l+f*(e.offset+g/2)-e.x,y=o+(c-o)*l+p*(e.offset+g/2)-e.z,b=-Math.atan2(d,u)+r()*.12,x=i===0,S=new un(r()*.22,b,x?Math.PI:r()*.2,`YXZ`),C=new U().compose(new H(v,x?_+1.5:0,y),new At().setFromEuler(S),new H(1,1,1)),w=Y(new K(h,_,g).translate(0,_/2-.4,0),dy[i%dy.length]);t.addTransformed(`vertex`,w,C);let T=new U().makeTranslation(0,0,e.side*(g/2+.05)),E=Y(new K(1.2,2.2,.12).translate(0,.7,0),4008735);t.addTransformed(`vertex`,E,C.clone().multiply(T));for(let e of[-h/3,h/3]){let n=Y(new K(1.1,1.1,.12).translate(e,_-2.2,0),3098712);t.addTransformed(`vertex`,n,C.clone().multiply(T))}let D=Wm(h,g,2,.4);t.addTransformed(`tile`,D,C.clone().multiply(new U().makeTranslation(0,_-.4,0))),i++}}return{object:t.build()}}}),py=Q({type:`slideTower`,label:`Torre con tobogán`,params:{height:18,size:7,length:36,color:1671876},footprint:e=>({rect:[e.size+4,e.length+10]}),clearPaths:e=>{let t=Math.cos(e.rotation??0),n=Math.sin(e.rotation??0),r=r=>[e.x+n*r,e.z+t*r];return[{pts:[r(-e.size/2),r(e.length+6)],width:12}]},build(e){let t=new Z,{height:n,size:r,length:i}=e;for(let[e,i]of[[-1,-1],[1,-1],[-1,1],[1,1]])t.box(`white`,.5,n,.5,e*r/2,0,i*r/2);for(let e=3;e<n;e+=3)t.box(`concrete`,r+.4,.3,r+.4,0,e,0),t.box(`white`,r+.4,1,.08,0,e+.3,-r/2-.1);t.box(`concrete`,r+.4,.3,r+.4,0,n,0),t.addTransformed(`slate`,Wm(r,r,2.4,.6),new U().makeTranslation(0,n+3,0));for(let e of[-1,1])for(let i of[-1,1])t.box(`white`,.25,3,.25,e*r/2,n,i*r/2);let a=new Zi([[0,n-.6,r/2],[r*1.3,n-3,r*.6],[r*1.4,n-6,-r*1.1],[-r*1.3,n-9,-r*1.1],[-r*1.3,n-11.5,r*.9],[0,n-13.5,r+6],[.5,3,i*.6],[0,1.5,i*.85],[0,.6,i]].map(([e,t,n])=>new H(e,t,n)));t.addTransformed(`plastic`,Y(new mo(a,64,.6,8,!1),e.color),new U);for(let e=.6;e<.95;e+=.12){let n=a.getPoint(e);t.box(`white`,.25,n.y,.25,n.x,0,n.z)}return t.box(`concrete`,6,.6,11,0,-.3,i+4.5),t.box(`pool`,5,.35,10,0,-.05,i+4.5),{object:t.build()}}}),my=Q({type:`pavilion`,label:`Pabellón (techo plano, paneles, domo o pérgola)`,params:{width:12,depth:8,height:4.5,roof:`flat`,wall:`white`,domeMaterial:`court`,tables:!0},footprint:e=>e.roof===`dome`?{circle:e.width/2+.5}:{rect:[e.width+1,e.depth+1]},build(e){let t=new Z,{width:n,depth:r,height:i}=e;if(e.roof===`dome`){let r=n/2;t.cyl(e.wall,r,r,i*.45,0,-.3,0,24);let a=new fo(r,24,8,0,Math.PI*2,0,Math.PI/2);return a.scale(1,i*.6/r,1),t.add(e.domeMaterial,a,0,i*.45-.3,0),{object:t.build()}}if(e.roof===`pergola`){let a=Math.max(2,Math.round(n/4)),o=Math.max(2,Math.round(r/4));for(let e=0;e<=a;e++)for(let s=0;s<=o;s++)t.box(`wood`,.25,i,.25,-n/2+n*e/a,0,-r/2+r*s/o);for(let e=0;e<=o;e++)t.box(`wood`,n+.6,.3,.3,0,i,-r/2+r*e/o);for(let e=-n/2;e<=n/2;e+=.9)t.box(`wood`,.12,.12,r+.6,e,i+.3,0);if(e.tables)for(let e=-n/2+2;e<n/2-1;e+=3)for(let n=-r/2+2;n<r/2-1;n+=3)t.box(`weatheredWood`,1.8,.75,.9,e,0,n);return{object:t.build()}}if(t.box(e.wall,n,i,r,0,-.3,0),t.box(`concrete`,n+.6,.35,r+.6,0,i-.3,0),e.roof===`panels`){let e=Math.floor((r-1)/2.2);for(let a=0;a<e;a++){let e=new K(n-1.2,.08,1.7);e.rotateX(.22),t.add(`slate`,e,0,i+.45,-r/2+1.4+a*2.2,0,!1)}}return{object:t.build()}}}),hy=[16053492,14277081,10133928,2830134,11740718,2906784,16053492,7172728],gy=Q({type:`parkedCars`,label:`Autos estacionados`,params:{rows:[]},clearPaths:e=>e.rows.map(e=>({pts:[e.from,e.to],width:5})),build(e){let t=new Z,n=0;for(let r of e.rows)for(let i=0;i<r.count;i++){let a=r.count===1?0:i/(r.count-1),o=r.from[0]+(r.to[0]-r.from[0])*a-e.x,s=r.from[1]+(r.to[1]-r.from[1])*a-e.z,c=-r.heading*Math.PI/180,l=hy[(n*5+3)%hy.length];t.add(`vertex`,Y(new K(4.3,.85,1.8).translate(0,.55,0),l),o,0,s,c,!1),t.add(`vertex`,Y(new K(2.2,.6,1.6).translate(-.2,1.25,0),2765888),o,0,s,c,!1),n++}return{object:t.build()}}}),_y=[[2060210,15974964,15220858,15974964,15220858],[3120719,16250092,15895592,15220858,15974964],[12596780,15974964,2789334,3120719,16250092],[8011696,16250092,15974964,2789334,15220858],[15895592,2060210,3120719,12596780,15974964],[15220858,16250092,2060210,15974964,3120719],[1940636,15974964,12596780,15895592,16250092]];function vy(e,t,n){let r=e=>e.map(([e,t])=>[e,-t]),i=t.length?Zm(r(e),t.map(r),n):Jm(r(e),n,{bottom:!0});return i.rotateX(Math.PI/2),i.translate(0,0,-n/2),i.rotateY(Math.PI/2),i.index?i.toNonIndexed():i}function yy(e,t,n,r=12){let i=[[e,t],[e,n]];for(let t=1;t<r;t++)i.push([e*Math.cos(t/r*Math.PI),n+e*Math.sin(t/r*Math.PI)]);return i.push([-e,n],[-e,t]),i}var by=Q({type:`trajineras`,label:`Trajineras`,params:{boats:[],length:10,width:2.6},build(e){let t=new Z,n=e.length,r=e.width,i=(e,n,r)=>t.addTransformed(`plastic`,Y(e,n),r);return e.boats.forEach(([a,o,s,c],l)=>{let[u,d,f,p,m]=_y[(c??l)%_y.length],h=new U().makeTranslation(a-e.x,0,o-e.z).multiply(new U().makeRotationY(-kt.degToRad(s))),g=(e,t,n)=>h.clone().multiply(new U().makeTranslation(e,t,n)),_=[[-n/2,-r*.36],[-n/2+.7,-r/2],[n/2-.7,-r/2],[n/2,-r*.36],[n/2,r*.36],[n/2-.7,r/2],[-n/2+.7,r/2],[-n/2,r*.36]];i(Jm(_,.62),u,g(0,-.3,0)),i(Jm(_.map(([e,t])=>[e*1.01,t*1.04]),.14),d,g(0,.24,0)),t.addTransformed(`wood`,new K(n-1.3,.06,r-.3).translate(0,.35,0),h),t.addTransformed(`wood`,new K(n-4,.08,.8).translate(0,1.05,0),h),t.addTransformed(`wood`,new K(n-4.4,.66,.3).translate(0,.66,0),h);for(let e of[-1,1])t.addTransformed(`wood`,new K(n-4,.45,.42).translate(0,.6,e*.86),h);for(let e of[-n/2+1.2,0,n/2-1.6])for(let t of[-1,1])i(new q(.05,.05,2,5),16250092,g(e,1.35,t*(r/2-.25)));i(new K(n-2.2,.1,r+.1),f,g(-.3,2.4,0)),i(new K(n-2.1,.22,r+.16),d,g(-.3,2.27,0));let v=n/2-1.05,y=r/2+.15,b=2.25;i(vy(yy(y,.35,b),[yy(y-.42,.75,2.15)],.12),p,g(v,0,0)),i(new K(.16,.5,y*1.5),m,g(v+.05,b+y*.55,0));for(let e=0;e<7;e++){let t=e/6*Math.PI,n=new ao(.17,0);i(n,e%2?m:16250092,g(v+.1,b+(y-.2)*Math.sin(t),(y-.2)*Math.cos(t)))}}),{object:t.build()}}}),xy={X:[[0,0,2.4,3.2],[0,3.2,2.4,0]],O:[[.3,.3,2.1,.3],[.3,2.9,2.1,2.9],[.3,.3,.3,2.9],[2.1,.3,2.1,2.9]],I:[[1.2,0,1.2,3.2]],M:[[.3,0,.3,3.2],[2.1,0,2.1,3.2],[.3,3.2,1.2,1.5],[1.2,1.5,2.1,3.2]],L:[[.35,0,.35,3.2],[0,.3,2.2,.3]],C:[[.35,0,.35,3.2],[.2,2.9,2.4,2.9],[.2,.3,2.4,.3]]};function Sy(e,t){let n=Jm(e.map(([e,t])=>[e,-t]),t,{top:!0,bottom:!0});return n.rotateX(Math.PI/2),n.translate(0,0,-t/2),n}var Cy=(e,t,n,r,i=18)=>Array.from({length:i+1},(a,o)=>{let s=n+(r-n)*o/i;return[e*Math.cos(s),t+e*Math.sin(s)]}),wy=(e,t,n)=>[[t,0],...Cy(t,n,0,Math.PI),[-t,0],[-e,0],...Cy(e,n,Math.PI,0),[e,0]],Ty=Q({type:`fiestaArch`,label:`Arco de acceso de Xoximilco`,params:{width:11,depth:1.4,opening:4.1,spring:2.7,text:`XOXIMILCO`,wall:7},footprint:e=>({rect:[e.width,e.depth+.6]}),build(e){let t=new Z,n=e.width/2,r=e.depth,i=e.opening,a=e.spring,o=(e,n,r=0,i=0,a=0)=>t.addTransformed(`vertex`,Y(e,n),new U().makeTranslation(r,i,a)),s=[[1,8.3],[.92,8.6],[.82,8.45],[.7,8.1],[.55,8.25],[.42,8.9],[.3,9.4],[.15,9.5],[0,9.3]],c=[...s.map(([e,t])=>[e*n,t]),...[...s].reverse().slice(1).map(([e,t])=>[-e*n,t])],l=e=>{let t=Math.abs(e)/n;for(let e=1;e<s.length;e++){let[n,r]=s[e-1],[i,a]=s[e];if(t<=n&&t>=i)return r+(a-r)*(t-n)/(i-n)}return s[0][1]};t.add(`wall`,Sy([[-n,0],[-i,0],...Cy(i,a,Math.PI,0),[i,0],[n,0],...c],r),0,0,0,0,!1),o(Sy(wy(i-.02,i+.55,a),r+.1),16250092),o(Sy(wy(i+.55,i+.68,a),r+.08),9052981);for(let e of[-1,1])t.box(`wall`,n-i-.55,.3,r+.4,e*(i+.68+(n-i-.68)/2),a-.3,0),t.box(`wall`,n-i-.55,.35,r+.25,e*(i+.68+(n-i-.68)/2),0,0);for(let[e,i,a]of[[-n+.55,8.05,.62],[n-.55,8.05,.62],[-1.2,8.75,.78],[1.2,8.75,.78]]){let n=new q(a,a,r+.24,14).rotateX(Math.PI/2);t.addTransformed(`stone`,n,new U().makeTranslation(e,i,0));let s=new po(a,.09,4,14);for(let t of[-1,1])o(s.clone(),15327172,e,i,t*(r/2+.12))}for(let[e,t]of[[6.4,12],[7.05,14]])for(let i=0;i<t;i++){let s=(.12+.76*i/(t-1))*Math.PI,c=e*Math.cos(s),u=a+e*Math.sin(s);if(!(Math.abs(c)>n-.4||u>l(c)-.35))for(let e of[-1,1])o(new q(.34,.34,.1,7).rotateX(Math.PI/2),i%3?16777215:15852735,c,u,e*(r/2+.05))}let u=[...e.text.toUpperCase()],d=.36,f=i+1.35,p=.27,m=.25;u.forEach((e,n)=>{let i=Math.PI*(.83-.66*n/Math.max(1,u.length-1)),o=new U().makeTranslation(f*Math.cos(i),a+f*Math.sin(i),r/2+m/2).multiply(new U().makeRotationZ(i-Math.PI/2));for(let[n,r,i,a]of xy[e]??[]){let e=new K(Math.hypot(i-n,a-r)*d+p*.6,p,m).rotateZ(Math.atan2(a-r,i-n)).translate(((n+i)/2-1.2)*d,((r+a)/2-1.6)*d,0);t.addTransformed(`vertex`,Y(e,16774082),o)}});for(let r of[-1,1])t.box(`limestone`,1.6,2.6,.9,r*(n+.8),0,0),t.box(`limestone`,e.wall,1.7,.6,r*(n+1.6+e.wall/2),0,0);o(new K(2.6,.6,.25).translate(0,.3,0),12596780,0,9.45,0),o(new K(2.2,.18,.3).translate(0,.09,0),2060210,0,9.55,0);let h=[12596780,2060210,15974964,16250092];for(let e of[-1,1])for(let r of[-1,1]){let i=new U().makeTranslation(e*(n+2.6),.85,2.4).multiply(new U().makeRotationX(-.25)).multiply(new U().makeRotationZ(r*.75));for(let e=0;e<4;e++){let n=new K(.55,.28,.12).translate(-.825+e*.55,0,r*.03);t.addTransformed(`vertex`,Y(n,h[(e+ +(r>0))%4]),i)}}return{object:t.build()}}}),Ey=Q({type:`zipTower`,label:`Torre de tirolesa`,params:{height:22,radius:3,spiral:!1,roof:!0,cables:[]},footprint:e=>({circle:e.radius+(e.spiral?2.4:2)}),build(e,t){let n=new Z,{height:r,radius:i}=e,a=r-4;n.cyl(`rockwall`,i*.85,i*1.1,a,0,0,0,14),n.cyl(`wood`,i+1.6,i+1.6,.35,0,a,0,16),n.cyl(`weatheredWood`,i+1.6,i+1.6,1,0,a+.35,0,16,!0);for(let e=0;e<6;e++){let t=e/6*Math.PI*2;n.cyl(`wood`,.14,.16,3.6,Math.cos(t)*(i+1.3),a+.35,Math.sin(t)*(i+1.3),5)}if(e.roof&&(n.add(`thatch`,Vm(i+2.5,0,5,14),0,a+3.9,0),n.add(`thatchDark`,new po(i+2.35,.2,4,14).rotateX(Math.PI/2),0,a+3.95,0,0,!1)),e.spiral){let e=i*1.1+.9,t=Math.floor(a/.45);for(let r=0;r<t;r++){let t=r*.45,i=t/7*Math.PI*2;n.box(`wood`,1.6,.18,.75,Math.cos(i)*e,t,Math.sin(i)*e,-i),r%4==0&&n.cyl(`iron`,.06,.06,1.1,Math.cos(i)*(e+.75),t,Math.sin(i)*(e+.75),4)}}let o=t?.heightAt?.(e.x,e.z)??0,s=e.rotation??0,c=Math.cos(s),l=Math.sin(s);for(let[r,i,s=8]of e.cables??[]){let u=r-e.x,d=i-e.z,f=c*u-l*d,p=l*u+c*d,m=Math.hypot(f,p),h=(t?.heightAt?.(r,i)??o)-o+s,g=-p/m,_=f/m;for(let e of[-.7,.7]){let t=[];for(let n=0;n<=10;n++){let r=n/10,i=a+1.6+(h-a-1.6)*r-m*.012*4*r*(1-r);t.push(new H(f*r+g*e,i,p*r+_*e))}let r=new Zi(t);n.add(`dark`,new mo(r,12,.16,4,!1),0,0,0,0,!1)}}return{object:n.build()}}}),Dy=Q({type:`pyramidGrid`,label:`Comedor con techos piramidales`,params:{nx:4,nz:4,cell:8.5,height:4.2,peak:5,tables:!0},footprint:e=>({rect:[e.nx*e.cell+1,e.nz*e.cell+1]}),build(e){let t=new Z,{nx:n,nz:r,cell:i,height:a,peak:o}=e,s=n*i,c=r*i;t.box(`paving`,s+1,.3,c+1,0,-.1,0);for(let e=0;e<=n;e++)for(let n=0;n<=r;n++)t.cyl(`wood`,.2,.24,a,-s/2+e*i,.2,-c/2+n*i,6);for(let l=0;l<n;l++)for(let n=0;n<r;n++){let r=-s/2+(l+.5)*i,u=-c/2+(n+.5)*i,d=new Bi(i/2*Math.SQRT2+.3,o,4,1,!0).rotateY(Math.PI/4);d.translate(0,o/2,0),t.add(`thatch`,d,r,a+.2,u),e.tables&&t.box(`weatheredWood`,2.2,.75,.9,r,.2,u)}for(let e=0;e<=n;e++)t.box(`wood`,.2,.25,c,-s/2+e*i,a,0);for(let e=0;e<=r;e++)t.box(`wood`,s,.25,.2,0,a,-c/2+e*i);return{object:t.build()}}}),Oy=Q({type:`caveEntrance`,label:`Entrada a caverna (pozo con escalera)`,params:{radius:5,stairs:!0},footprint:e=>({circle:e.radius+.6}),build(e){let t=new Z,n=e.radius;if(t.cyl(`rockwall`,n+.5,n+.6,1.1,0,-.2,0,20,!0),t.cyl(`rockwall`,n,n,1.1,0,-.2,0,20,!0),t.cyl(`limestone`,n+.55,n+.55,.12,0,.9,0,20,!0),t.cyl(`dark`,n,n,.05,0,.02,0,20),e.stairs)for(let e=0;e<18;e++){let r=e/18*Math.PI*1.6;t.box(`limestone`,1.5,.25,.8,Math.cos(r)*(n-.9),.08+(17-e)*.045,Math.sin(r)*(n-.9),-r)}return{object:t.build()}}}),ky=Q({type:`toboganxote`,label:`Toboganxote (tobogán 5 en 1)`,params:{height:41,tower:[0,0],sphere:[20,15,10],funnels:[],path:[],color:15895592},footprint:e=>({circle:8}),build(e){let t=new Z,n=e.height,[r,i]=e.tower;for(let[e,a]of[[-1,-1],[1,-1],[-1,1],[1,1]])t.box(`white`,.6,n,.6,r+e*3.5,0,i+a*3.5);for(let e=4;e<n;e+=4)t.box(`concrete`,7.6,.3,7.6,r,e,i),t.box(`iron`,7.6,.25,1.4,r,e-2,i-4.6,e%8?.15:-.15);t.box(`concrete`,8.4,.4,8.4,r,n,i),t.box(`iron`,8.4,1.1,.1,r,n+.4,i-4.2),t.box(`iron`,.1,1.1,8.4,r-4.2,n+.4,i);let[a,o,s]=e.sphere;t.add(`white`,new fo(s,24,14,0,Math.PI*2,0,Math.PI*.68),a,s*.55,o);for(let[n,r,i]of e.funnels){t.addTransformed(`plastic`,Y(Vm(i*.25,i,i*.8,20),3117016),new U().makeTranslation(n,6,r));for(let e=0;e<6;e++){let a=e/6*Math.PI*2;t.box(`white`,.3,6+i*.4,.3,n+Math.cos(a)*i*.6,0,r+Math.sin(a)*i*.6)}}if(e.path.length>1){let n=new Zi(e.path.map(([e,t,n])=>new H(e,t,n)));t.addTransformed(`plastic`,Y(new mo(n,120,1.1,8,!1),e.color),new U);for(let e=.04;e<.98;e+=.05){let r=n.getPoint(e);r.y>1.5&&t.box(`white`,.35,r.y-1,.35,r.x,0,r.z)}}return{object:t.build()}}}),Ay=Q({type:`aquarium`,label:`Acuario (edificio de techo plano)`,params:{outline:[],glass:null,court:null,annex:null,height:6},build(e){let t=new Z,n=e.height;if(t.add(`concrete`,Jm(e.outline,n+1),0,-1,0),t.add(`white`,Jm(e.outline,.5,{top:!1}),0,n,0),e.glass){let[[r,i],[a,o]]=e.glass,s=a-r,c=o-i,l=Math.hypot(s,c),u=c/l,d=-s/l;t.box(`glass`,l-1,n-2,.2,(r+a)/2+u*.12,.6,(i+o)/2+d*.12,-Math.atan2(c,s))}if(e.court){let[r,i,a,o]=e.court;t.box(`weatheredWood`,a-r,n+.2,o-i,(r+a)/2,-1,(i+o)/2)}if(e.annex){let[r,i,a,o]=e.annex,s=n-1;t.box(`concrete`,a-r,s+1,o-i,(r+a)/2,-1,(i+o)/2),t.box(`dark`,a-r-1.2,.25,(o-i)/2-.6,(r+a)/2,s,o-(o-i)/4-.3)}return{object:t.build()}}}),jy=Q({type:`greenhouse`,label:`Invernadero de malla sombra`,params:{length:20,width:10,bays:1,vault:!1,height:3},footprint:e=>({rect:[e.width,e.length]}),clearPaths:e=>{let t=Math.sin(e.rotation??0)*(e.length/2),n=Math.cos(e.rotation??0)*(e.length/2);return[{pts:[[e.x-t,e.z-n],[e.x+t,e.z+n]],width:e.width+2}]},build(e){let t=new Z,{length:n,width:r,height:i}=e;t.box(`white`,r,1.4,n,0,-.6,0),t.box(`shadeNet`,r-.1,i,n-.1,0,.8,0);let a=i+.8;if(e.vault){let e=r/2,i=new q(e,e,n,16,1,!0,Math.PI/2,Math.PI);i.rotateX(Math.PI/2),t.add(`shadeNet`,i,0,a,0);for(let r=-n/2+1;r<=n/2-1;r+=3){let n=new po(e+.03,.06,4,16,Math.PI);t.add(`iron`,n,0,a,r,0,!1)}}else{let i=r/e.bays,o=i*.38;for(let s=0;s<e.bays;s++){let e=-r/2+i*(s+.5),c=Qm([[-i/2,0],[i/2,0],[0,o]],n);t.add(`shadeNet`,c,e,a,0,Math.PI/2),t.box(`red`,.25,.2,n,e,a+o-.08,0)}}return{object:t.build()}}}),My=Q({type:`temazcal`,label:`Temazcal`,params:{radius:4},footprint:e=>({circle:e.radius+.6}),build(e){let t=new Z,n=e.radius;t.cyl(`darkStone`,n+.5,n+.7,.9,0,-.6,0,20);let r=new fo(n,20,8,0,Math.PI*2,0,Math.PI/2);return r.scale(1,.72,1),t.add(`rockwall`,r,0,.3,0),t.box(`rockwall`,1.8,1.4,1.6,0,-.2,n-.2),t.box(`dark`,.9,1,.1,0,0,n+.62),{object:t.build()}}}),Ny=Math.PI/180;function Py(e,t,[n,r],[i,a],o,s,c){let l=i-n,u=a-r;e.box(t,Math.hypot(l,u),c,s,(n+i)/2,o,(r+a)/2,-Math.atan2(u,l))}function Fy(e,t){for(let n=0;n<t.length;n++){let r=t[n],i=t[(n+1)%t.length];for(let t of[.5,1,1.45])Py(e,`weatheredWood`,r,i,t,.08,.12);let a=Math.max(1,Math.ceil(Math.hypot(i[0]-r[0],i[1]-r[1])/2.4));for(let t=0;t<a;t++){let n=t/a;e.box(`weatheredWood`,.16,1.85,.16,r[0]+(i[0]-r[0])*n,-.2,r[1]+(i[1]-r[1])*n)}}}function Iy([e,t,n,r],i,a,o){let s=i+(e+n)/2,c=a+(t+r)/2,l=r-t>=n-e,u=(l?r-t:n-e)/2,d=(l?n-e:r-t)+o,f=Math.max(0,u-d/2);return{pts:l?[[s,c-f],[s,c+f]]:[[s-f,c],[s+f,c]],width:d}}var Ly=e=>[Math.min(...e.map(e=>e[0])),Math.min(...e.map(e=>e[1])),Math.max(...e.map(e=>e[0])),Math.max(...e.map(e=>e[1]))],Ry=Q({type:`charroArena`,label:`Lienzo charro (espectáculo ecuestre)`,params:{outline:[],stands:null,stable:null,horses:[]},clearPaths:e=>[Iy(Ly(e.outline),e.x,e.z,1),...e.stands?[Iy(e.stands,e.x,e.z,1)]:[],...e.stable?[Iy(e.stable,e.x,e.z,-1.5)]:[]],build(e){let t=new Z;if(Fy(t,e.outline),e.stands){let[n,r,i,a]=e.stands,o=(i-n)/5;for(let e=0;e<5;e++)t.box(`wood`,o,.45*(e+1)+.3,a-r,i-(e+.5)*o,-.3,(r+a)/2);Py(t,`weatheredWood`,[n+.1,r],[n+.1,a],3.15,.1,.12);for(let e of[r+.2,(r+a)/2,a-.2])t.box(`weatheredWood`,.14,.95,.14,n+.1,2.25,e)}if(e.stable){let[n,r,i,a]=e.stable,o=i-n,s=a-r,c=2.8,l=(r+a)/2;t.box(`weatheredWood`,.3,c,s,i-.15,-.3,l);for(let e of[r+.15,a-.15])t.box(`weatheredWood`,o,c,.3,(n+i)/2,-.3,e);let u=Math.max(1,Math.round(s/3));for(let e=0;e<=u;e++){let i=r+s*e/u;t.box(`wood`,.25,c,.25,n+.15,-.3,i),e>0&&e<u&&t.box(`weatheredWood`,o*.6,1.7,.12,n+o*.3,-.3,i)}for(let e=0;e<u;e++){let i=r+s*(e+.5)/u;t.box(`dark`,.1,2.1,s/u*.75,n+.6,-.3,i),t.box(`wood`,.12,1.1,s/u*.7,n+.3,-.3,i)}let d=o*.3,f=Qm([[-o/2-.7,0],[o/2+.7,0],[0,d]],s+1);t.add(`thatch`,f,(n+i)/2,2.5,l,Math.PI/2)}for(let[n,r,i,a,o]of e.horses)t.add(`vertex`,Ig(a,o),n,0,r,i*Ny);return{object:t.build()}}}),zy=Q({type:`crescentTickets`,label:`Taquillas en media luna`,params:{r0:8.5,r1:12.5,a0:-.1,a1:1.75,height:3.8,passage:0,passageAt:null,joints:[]},clearPaths:e=>{let t=(e.r0+e.r1)/2,n=[];for(let r=0;r<=8;r++){let i=e.a0+(e.a1-e.a0)*r/8;n.push([e.x+Math.cos(i)*t,e.z+Math.sin(i)*t])}let r=e.passageAt??(e.a0+e.a1)/2,i=[e.r0-5,e.r1].map(t=>[e.x+Math.cos(r)*t,e.z+Math.sin(r)*t]);return[{pts:n,width:e.r1-e.r0+2},{pts:i,width:e.passage+2}]},build(e){let t=new Z,{r0:n,r1:r,a0:i,a1:a,height:o,passage:s}=e,c=e.passageAt??(i+a)/2,l=(n+r)/2,u=s/2/l,d=n+.6,f=u>0?[[i,c-u],[c+u,a]]:[[i,a]];for(let[e,i]of f)t.add(`limestone`,Zm(Km(d,r,e,i),[],o+.6),0,-.6,0),t.add(`concrete`,Zm(Km(n,r+.2,e,i),[],.3),0,o,0),t.add(`stone`,Zm(Km(n-.05,n+.35,e,i),[],.45),0,o-.25,0);let p=e=>-e-Math.PI/2,m=(e,t)=>[Math.cos(e)*t,Math.sin(e)*t];for(let n of e.joints){let[e,i]=m(n,(d+r)/2-.15);t.box(`limestone`,1.1,o+1.4,r-d+.9,e,-.6,i,p(n)),t.box(`stone`,1.4,.3,r-d+1.2,e,o+.8,i,p(n))}for(let[n,r]of f){let i=Math.max(1,Math.floor((r-n)*d/3.2));for(let a=0;a<i;a++){let o=n+(r-n)*(a+.5)/i;if(e.joints.some(e=>Math.abs(o-e)*d<1.5))continue;let[s,c]=m(o,d-.05),[l,u]=m(o,d-.2),[f,h]=m(o,d-.35);t.box(`dark`,1.7,2.3,.12,s,0,c,p(o)),t.box(`window`,1.3,.9,.14,s,1.25,c,p(o)),t.box(`stone`,2.2,.35,.4,l,2.3,u,p(o)),t.box(`wood`,1.6,.1,.5,f,1.05,h,p(o))}}if(u>0){let e=(e,t)=>[Math.cos(c)*e-Math.sin(c)*t,Math.sin(c)*e+Math.cos(c)*t],n=(n,r,i,a,o,s,l)=>{let[u,d]=e(o,l);t.box(n,r,i,a,u,s,d,-c)},i=s+1.2,a=d-5.5,l=r+.4,u=o,f=[a+.4,l-.4],p=[-i/2+.3,0,i/2-.3];for(let e of f)for(let t of p)n(`limestone`,1.1,1.2,1.1,e,-.4,t),n(`weatheredWood`,.6,u-.8,.6,e,.8,t);for(let e of f)n(`weatheredWood`,.55,.55,i+.6,e,u,0);for(let e of p)n(`weatheredWood`,l-a,.5,.45,(a+l)/2,u,e);for(let e=a+.2;e<l-.1;e+=.32)n(`wood`,.2,.1,i+.4,e,u+.55,0);n(`weatheredWood`,.6,.4,i+.8,a+.2,u+.55,0);let m=Math.floor((i+.6)/.85);for(let n=0;n<m;n++){let r=-((m-1)*.85)/2+n*.85,[i,o]=e(a+.15,r);t.add(`concrete`,new q(.38,.38,.4,14).rotateZ(Math.PI/2),i,u+1.37,o,-c);let[s,l]=e(a-.07,r);t.add(`dark`,new q(.12,.12,.05,8).rotateZ(Math.PI/2),s,u+1.37,l,-c)}n(`weatheredWood`,.7,.35,i+1,a+.2,u+1.8,0),n(`stone`,1.2,.3,i+1.4,a+.3,u+2.15,0);let h=d+.6;n(`limestone`,2.6,1.1,.6,h,-.3,0);let g=Math.max(1,Math.floor((s/2-.8)/.9));for(let e of[-1,1]){for(let t=0;t<g;t++)n(`steel`,.9,1.05,.25,h,0,e*(.9+t*.9));n(`wood`,.08,.75,s/2-.6,a+1.6,3.1,s/4*e);for(let t=0;t<3;t++)n(`white`,.1,.35,.3,a+1.55,3.3,s/4*e+(t-1)*.9)}}return{object:t.build()}}}),By=Q({type:`palapaKiosk`,label:`Kiosco redondo de palma`,params:{radius:2.8},footprint:e=>({circle:e.radius+.3}),build(e){let t=new Z,n=e.radius;for(let[e,r]of[[.35,Math.PI-.25],[Math.PI+.25,2*Math.PI-.35]])t.add(`limestone`,Zm(Km(n-.45,n,e,r,16),[],1.5),0,-.4,0),t.add(`wood`,Zm(Km(n-.6,n+.1,e,r,16),[],.08),0,1.1,0);for(let e=0;e<6;e++){let r=e/6*Math.PI*2+Math.PI/6;t.cyl(`wood`,.09,.11,2.4,Math.cos(r)*(n-.25),0,Math.sin(r)*(n-.25),6)}t.cyl(`wood`,.14,.16,3.8,0,0,0,8);let r=.55;return t.add(`thatch`,Vm(n+.6,r,3.2,24),0,2.25,0),t.add(`thatchDark`,new po(n+.45,.12,4,24).rotateX(Math.PI/2),0,2.3,0,0,!1),t.cyl(`thatch`,r,r*.95,.85,0,5.35,0,16,!0),t.cyl(`thatchDark`,r*.9,r*.9,.08,0,6.1,0,16),{object:t.build()}}}),Vy=`#1d2329`,Hy=`#15171a`,Uy=`#2b2b2b`;function Wy(e,t,n,r,i,a,o,s){e.push(Y(zm(new K(n,r,i).translate(a,o+r/2,s)),t))}function Gy(e,t,n,r=.45){let i=new q(r,r,.28,10).rotateX(Math.PI/2).translate(t,r,n);e.push(Y(zm(i),Hy))}function Ky(e,t,n,r=.42){let i=new q(r,r,.22,12).rotateZ(Math.PI/2).translate(t-.11,n,0);e.push(Y(zm(i),Hy));let a=new q(r*.45,r*.45,.24,10).rotateZ(Math.PI/2).translate(t-.12,n,0);e.push(Y(zm(a),`#c9c3b5`))}function qy(e,t,n,r,i,a,o){for(let a of[-i/2+.1,i/2-.1])Wy(e,Uy,n-t,.08,.08,(t+n)/2,r+.3,a);for(let a=t;a<=n+1e-6;a+=(n-t)/3)Wy(e,Uy,.08,.38,i-.1,a,r,0);let s=t+.2;for(;s<n-.5;){let t=.5+o()*.6,n=.3+o()*.35;Wy(e,a[Math.floor(o()*a.length)],t,n,i-.5-o()*.4,s+t/2,r+.08,(o()-.5)*.2),s+=t+.08}}function Jy(e=1){let t=Nh(e),n=[],r=2.1,i=`#2c2a26`;Wy(n,i,6.1,1.95,r,-.45,.45,0),Wy(n,i,.9,1,2,7/2-.45,.45,0),Wy(n,Vy,.6,.9,1.9000000000000001,7/2-1.05,1.45,0);for(let e of[-1,1]){Wy(n,Vy,4.6,.7,.04,-.6,1.55,e*1.06);for(let r=-3.3;r<7/2-1.2;r+=.11){let i=.4+t()*.9;Wy(n,t()<.75?`#e4e3d6`:`#9a9a88`,.05,i,.03,r,.5,e*1.07)}Wy(n,`#e8622a`,1.1,.42,.04,.6,.95,e*1.09)}Wy(n,`#f2a23a`,.06,.25,1.2,3.51,.75,0),Wy(n,Vy,.2,.3,r,7/2-.05,.3,0);for(let e of[-2.3,7/2-1.3])for(let t of[-1,1])Gy(n,e,t*(r/2-.15),.48);Ky(n,-3.05,1.25,.5);for(let e of[-3.1,2.1])for(let t of[-1,1])Wy(n,`#5a4632`,.08,.35,.08,e,2.4,t*(r/2-.1));let a=[`#7a5a38`,`#8a6a44`,`#6e5032`];for(let t of[-1,1]){let r=new K(5.9,.12,1.4).rotateX(t*.42);n.push(Y(zm(r.translate(-1/2,2.95,t*.625)),a[(e+ +(t>0))%3]))}for(let e=0;e<5;e++){let t=new q(.08,.08,.06,8).rotateZ(Math.PI/2).translate(2.4800000000000004,2.85,-.7+e*.35);n.push(Y(zm(t),`#efe9d6`))}return Im(n)}function Yy(e,t,n=1){let r=Nh(n),i=[],a=10.5,o=2.5;Wy(i,e,a,2.35,o,0,.5,0),Wy(i,`#f4f1ea`,10.3,.25,2.4,0,2.85,0),Wy(i,Vy,.05,1,2.1,5.26,1.7,0),Wy(i,Vy,.05,.7,1.9,-10.5/2-.01,1.9,0);for(let e of[-1,1]){Wy(i,Vy,8.7,.75,.04,-.3,1.85,e*1.26);for(let n=-4.65;n<a/2-.8;){let a=.6+r()*1.1,o=.3+r()*.7;Wy(i,t[Math.floor(r()*t.length)],a,o,.03,n+a/2,.65+r()*(1.1-o),e*1.27),n+=a+.15+r()*.4}}Wy(i,`#fff6c8`,.06,.2,.4,5.27,.85,o/2-.35),Wy(i,`#fff6c8`,.06,.2,.4,5.27,.85,-.9),Wy(i,Vy,.25,.3,2.6,a/2,.35,0),Wy(i,Vy,.25,.3,2.6,-10.5/2,.35,0);for(let e of[-3.25,a/2-2])for(let t of[-1,1])Gy(i,e,t*(o/2-.15),.5);return Ky(i,-10.5/2-.12,1.25,.45),qy(i,-4.85,a/2-.8,3.1,o,[...t,`#7a5434`],r),Im(i)}var Xy={van:7,bus:10.5};function Zy(e){let t=document.createElement(`canvas`);t.width=128*e,t.height=128;let n=t.getContext(`2d`);for(let t=0;t<e;t++){let e=t*128+64;n.fillStyle=`#6b3a1f`,n.beginPath(),n.arc(e,64,62,0,Math.PI*2),n.fill(),n.strokeStyle=`#f4efe6`,n.lineWidth=5,n.beginPath(),n.arc(e,64,52,0,Math.PI*2),n.stroke(),n.fillStyle=`#f4efe6`,n.textAlign=`center`,n.textBaseline=`middle`,n.font=`800 70px Montserrat, Arial, sans-serif`,n.fillText(String(t+1),e,68)}let r=pf(new Pi(t));return r.colorSpace=Be,r}var Qy=Q({type:`busTerminal`,label:`Terminal de autobuses del parque`,params:{curb:[],depth:4.5,vehicles:[],shelter:null,walk:[],plaza:[],exit:null},clearPaths:e=>{let[[t,n],[r,i]]=e.curb,a=Math.hypot(r-t,i-n),o=(r-t)/a,s=(i-n)/a,c=(e.depth-11)/2;return[{pts:[[t-s*c,n+o*c],[r-s*c,i+o*c]],width:e.depth+13},{pts:e.walk,width:8},...e.plaza.length===4?[{pts:[[(e.plaza[0][0]+e.plaza[3][0])/2,(e.plaza[0][1]+e.plaza[3][1])/2],[(e.plaza[1][0]+e.plaza[2][0])/2,(e.plaza[1][1]+e.plaza[2][1])/2]],width:Math.hypot(e.plaza[3][0]-e.plaza[0][0],e.plaza[3][1]-e.plaza[0][1])+2}]:[],...e.shelter?[{pts:[[e.shelter.at[0]-o*e.shelter.length/2,e.shelter.at[1]-s*e.shelter.length/2],[e.shelter.at[0]+o*e.shelter.length/2,e.shelter.at[1]+s*e.shelter.length/2]],width:e.shelter.width+3}]:[]]},build(e,t){let n=new Z,r=new On,i=([t,n])=>[t-e.x,n-e.z],a=t.heightAt(e.x,e.z),o=(n,r)=>t.heightAt(n+e.x,r+e.z)-a;if(e.plaza.length===4&&n.add(`pavers`,eh(e.plaza.map(i),o),0,0,0,0,!1),e.exit){let[t,r]=i(e.exit.at),[a,s]=i(e.exit.facing),c=Math.atan2(a-t,s-r),l=o(t,r);for(let e of[-.45,.45])n.add(`weatheredWood`,new K(.12,2.3,.12).translate(e,1.15,-.06),t,l,r,c);n.add(`weatheredWood`,new K(1.25,1.75,.08).translate(0,1.55,0),t,l,r,c),n.add(`exitSign`,new so(1.15,1.65).translate(0,1.55,.045),t,l,r,c,!1)}let[s,c]=e.curb.map(i),l=Math.hypot(c[0]-s[0],c[1]-s[1]),u=[(c[0]-s[0])/l,(c[1]-s[1])/l],d=[-u[1],u[0]],f=-Math.atan2(u[1],u[0]),p=(e,t)=>[s[0]+u[0]*e+d[0]*t,s[1]+u[1]*e+d[1]*t],m=(e,t,r,i,[a,o],s,c=0)=>n.box(e,t,r,i,a,s,o,c);m(`paving`,l+3,.35,e.depth,p(l/2,e.depth/2),-.15,f),m(`concrete`,l+3,.4,.3,p(l/2,.15),-.15,f);let h=e.vehicles.length,g=Math.atan2(u[0],u[1]),_=[];if(e.vehicles.forEach(([e,t,r],i)=>{let a=(i+.5)*l/h,[o,s]=p(a,.8);n.cyl(`weatheredWood`,.07,.09,3.2,o,.2,s,8);let c=new q(.38,.38,.06,20).rotateX(Math.PI/2);n.add(`weatheredWood`,c,o,3.75,s,g,!1);for(let e of[0,Math.PI]){let t=new zi(.36,20),n=t.getAttribute(`uv`);for(let e=0;e<n.count;e++)n.setX(e,(i+n.getX(e))/h);_.push(t.applyMatrix4(Rm(o,3.75,s,g+e).multiply(new U().makeTranslation(0,0,.035))))}let u=Xy[e],f=e===`van`?Jy(i+3):Yy(t,r,i+7),[m,v]=p(a,-(u/2+.7));n.add(`vertex`,f,m,0,v,-Math.atan2(d[1],d[0]),!1)}),_.length&&r.add(new ri(Im(_),new Do({map:Zy(h),roughness:.8}))),e.shelter){let[t,r]=i(e.shelter.at),{length:a,width:o}=e.shelter,s=(e,n)=>[t+u[0]*e+d[0]*n,r+u[1]*e+d[1]*n];n.box(`paving`,a+1,.3,o+1,t,-.1,r,f);for(let e of[-a/2+.3,0,a/2-.3])for(let t of[-o/2+.3,o/2-.3]){let[r,i]=s(e,t);n.cyl(`wood`,.13,.15,2.6,r,.2,i,8)}n.addTransformed(`thatch`,Wm(a,o,2,.8),Rm(t,2.8,r,f));for(let e of[-o/4,o/4])m(`wood`,a-1.5,.45,.45,s(0,e),.2,f)}let v=e.walk.map(i),y=4,b=0,x=0;for(let e=1;e<v.length;e++){let[t,r]=v[e-1],[i,a]=v[e],o=Math.hypot(i-t,a-r),s=(i-t)/o,c=(a-r)/o;for(;y<=b+o;){let e=y-b,i=t+s*e,a=r+c*e,[o,l]=[i-c*2.6,a+s*2.6],[u,d]=[i+c*3.4,a-s*3.4];n.box(`limestone`,.9,.9,.9,o,-.2,l),n.cyl(`iron`,.07,.1,3.4,o,.7,l,8),n.cyl(`lamp`,.2,.14,.5,o,4.1,l,8),n.cyl(`iron`,.24,.24,.08,o,4.6,l,8),x%2?(n.box(`limestone`,1.2,.9,.55,u,-.1,d,-Math.atan2(c,s)),n.box(`dark`,.35,.2,.57,u-s*.25,.55,d-c*.25,-Math.atan2(c,s)),n.box(`dark`,.35,.2,.57,u+s*.25,.55,d+c*.25,-Math.atan2(c,s))):(n.cyl(`stone`,1.1,1.15,.25,u,-.1,d,16),n.addTransformed(`vertex`,hh(Mm.BROAD_LIGHT),Rm(u,.1,d,x,.55,.7,.55))),x++,y+=13}b+=o}return r.add(n.build({exitSign:eb()})),{object:r}}}),$y;function eb(){if($y)return $y;let e=document.createElement(`canvas`);e.width=256,e.height=384;let t=e.getContext(`2d`);t.fillStyle=`#5b3d26`,t.fillRect(0,0,256,384),t.strokeStyle=`#3c2716`,t.lineWidth=8,t.strokeRect(6,6,244,372),t.fillStyle=`#efe6d2`,t.textAlign=`center`,t.font=`800 54px Montserrat, Arial, sans-serif`,t.fillText(`SALIDA`,128,78),t.font=`600 48px Montserrat, Arial, sans-serif`,t.fillText(`← Exit`,128,150),t.fillRect(28,186,200,4),t.font=`700 30px Montserrat, Arial, sans-serif`,t.fillText(`↑ TLACHCO`,128,250),t.fillText(`DELPHINUS`,128,300);let n=pf(new Pi(e));return n.colorSpace=Be,$y=new Do({map:n,roughness:.85}),$y}var tb=Object.fromEntries([ag,xg,zg,Hg,Gg,Yg,Xg,Zg,Qg,o_,p_,m_,h_,__,C_,w_,T_,E_,O_,j_,I_,z_,W_,G_,K_,J_,X_,Z_,Q_,$_,ev,tv,nv,rv,fv,Mv,zv,Jv,Qv,ny,cy,uy,fy,py,my,gy,by,Ty,Ey,Dy,Oy,ky,Ay,jy,My,Ry,zy,By,Qy].map(e=>[e.type,e])),nb=e=>tb[e];function rb(e){return e.flatMap(e=>{let t=nb(e.type);return(t?.groundHoles?.({...t.params,...e})??[]).map(t=>({...t,base:{x:e.x,z:e.z,y:e.y}}))})}function ib({landmarks:e,park:t,heightAt:n}){let r=new On;r.name=`landmarks`;let i=[],a=[],o=new Map,s={park:t,heightAt:n};for(let t of e){let e=nb(t.type);if(!e){console.warn(`Landmark "${t.id}": unknown model type "${t.type}"`);continue}let c=e.build({...e.params,...t},s),l=c.object;l.name=`landmark:${t.id}`,l.position.set(t.x,t.y??n(t.x,t.z),t.z),t.rotation&&(l.rotation.y=-t.rotation),l.updateMatrixWorld(!0);let u=[];l.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0,e.name.startsWith(`batch:`)&&!e.material.transparent&&u.push(e))});for(let e of u){let t=e.geometry.clone().applyMatrix4(e.matrixWorld);o.has(e.material)||o.set(e.material,[]),o.get(e.material).push(t),e.removeFromParent(),e.geometry.dispose()}r.add(l),c.update&&i.push(c.update),c.animation&&a.push({id:t.id,object:l,pieces:c.animation})}for(let[e,t]of o){if(t.some(e=>e.getAttribute(`color`)))for(let e of t)e.getAttribute(`color`)||e.setAttribute(`color`,new gr(new Float32Array(e.getAttribute(`position`).count*3).fill(1),3));let n=new ri(Im(t,!1),e);n.castShadow=n.receiveShadow=!0,n.name=`landmarks:merged`,r.add(yf(n));for(let e of t)e.dispose()}return{name:`landmarks`,object:r,occludesRoutes:!0,animations:a,update({t:e,dt:t}){d_.value=e;for(let n of i)n(e,t)}}}function ab(e=[]){let t=[];for(let n of e)for(let e=0;e<n.count;e++){let r=n.count===1?0:e/(n.count-1);t.push({x:n.from[0]+(n.to[0]-n.from[0])*r,z:n.from[1]+(n.to[1]-n.from[1])*r,heading:n.heading,color:n.colors[e%n.colors.length]})}return t}function ob(e,t){e=zm(e);let n=new W(t),r=e.getAttribute(`position`).count,i=new Float32Array(r*3);for(let e=0;e<r;e++)i.set([n.r,n.g,n.b],e*3);e.setAttribute(`color`,new gr(i,3));for(let t of Object.keys(e.attributes))[`position`,`normal`,`color`].includes(t)||e.deleteAttribute(t);return e}function sb(){let e=2.5,t=[],n=new K(12,2.4,e);n.translate(0,1.65,0),t.push(ob(n,`#ffffff`));let r=new q(e/2,e/2,11.6,10,1,!1,0,Math.PI);r.rotateZ(Math.PI/2),r.scale(1,.22,1),r.translate(0,2.8499999999999996,0),t.push(ob(r,`#f4f4f4`));for(let e of[-1,1]){let n=new K(9.8,1.05,.05);n.translate(-.4,2.15,e*1.26),t.push(ob(n,`#1d2733`))}let i=new K(.05,1.5,2.2);i.translate(6.01,1.9999999999999998,0),t.push(ob(i,`#1d2733`));for(let e of[-1,1]){let n=new K(11.4,.35,.04);n.translate(0,1.1,e*1.27),t.push(ob(n,`#fff6c8`))}for(let n of[-4,-2.8,3.8])for(let r of[-1,1]){let i=new q(.5,.5,.3,10);i.rotateX(Math.PI/2),i.translate(n,.5,r*(e/2-.1)),t.push(ob(i,`#15171a`))}return Im(t)}function cb({rows:e,heightAt:t}){let n=ab(e),r=new On;if(r.name=`vehicles`,n.length){let e=new Do({vertexColors:!0,roughness:.45,metalness:.1}),i=new hi(sb(),e,n.length),a=new U,o=new At,s=new H(0,1,0),c=new H(1,1,1),l=new W;n.forEach((e,n)=>{o.setFromAxisAngle(s,-kt.degToRad(e.heading)),a.compose(new H(e.x,Math.max(t(e.x,e.z),.3),e.z),o,c),i.setMatrixAt(n,a),i.setColorAt(n,l.set(e.color))}),i.castShadow=!0,i.receiveShadow=!0,i.computeBoundingSphere(),r.add(i)}return{name:`vehicles`,object:r,occludesRoutes:!0}}var lb=new Qn,ub=new H,db=class extends ps{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new G([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new G([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Ms(t,6,1);return this.setAttribute(`instanceStart`,new Nr(n,3,0)),this.setAttribute(`instanceEnd`,new Nr(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Ms(t,6,1);return this.setAttribute(`instanceColorStart`,new Nr(n,3,0)),this.setAttribute(`instanceColorEnd`,new Nr(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ho(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),lb.setFromBufferAttribute(t),this.boundingBox.union(lb))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)ub.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(ub)),ub.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(ub));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}};J.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new V},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},Qs.line={uniforms:So.merge([J.common,J.fog,J.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var fb=class extends To{constructor(e){super({type:`LineMaterial`,uniforms:So.clone(Qs.line.uniforms),vertexShader:Qs.line.vertexShader,fragmentShader:Qs.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE=``:delete this.defines.USE_ALPHA_TO_COVERAGE)}},pb=new Yt,mb=new H,hb=new H,gb=new Yt,_b=new Yt,vb=new Yt,yb=new H,bb=new U,xb=new Gs,Sb=new H,Cb=new Qn,wb=new Sr,Tb=new Yt,Eb,Db;function Ob(e,t,n){return Tb.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Tb.multiplyScalar(1/Tb.w),Tb.x=Db/n.width,Tb.y=Db/n.height,Tb.applyMatrix4(e.projectionMatrixInverse),Tb.multiplyScalar(1/Tb.w),Math.abs(Math.max(Tb.x,Tb.y))}function kb(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){xb.start.fromBufferAttribute(i,r),xb.end.fromBufferAttribute(a,r),xb.applyMatrix4(n);let o=new H,s=new H;Eb.distanceSqToSegment(xb.start,xb.end,s,o),s.distanceTo(o)<Db*.5&&t.push({point:s,pointOnLine:o,distance:Eb.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function Ab(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;Eb.at(1,vb),vb.w=1,vb.applyMatrix4(t.matrixWorldInverse),vb.applyMatrix4(r),vb.multiplyScalar(1/vb.w),vb.x*=i.x/2,vb.y*=i.y/2,vb.z=0,yb.copy(vb),bb.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(gb.fromBufferAttribute(s,t),_b.fromBufferAttribute(c,t),gb.w=1,_b.w=1,gb.applyMatrix4(bb),_b.applyMatrix4(bb),gb.z>u&&_b.z>u)continue;if(gb.z>u){let e=gb.z-_b.z,t=(gb.z-u)/e;gb.lerp(_b,t)}else if(_b.z>u){let e=_b.z-gb.z,t=(_b.z-u)/e;_b.lerp(gb,t)}gb.applyMatrix4(r),_b.applyMatrix4(r),gb.multiplyScalar(1/gb.w),_b.multiplyScalar(1/_b.w),gb.x*=i.x/2,gb.y*=i.y/2,_b.x*=i.x/2,_b.y*=i.y/2,xb.start.copy(gb),xb.start.z=0,xb.end.copy(_b),xb.end.z=0;let o=xb.closestPointToPointParameter(yb,!0);xb.at(o,Sb);let l=kt.lerp(gb.z,_b.z,o),d=l>=-1&&l<=1,f=yb.distanceTo(Sb)<Db*.5;if(d&&f){xb.start.fromBufferAttribute(s,t),xb.end.fromBufferAttribute(c,t),xb.start.applyMatrix4(a),xb.end.applyMatrix4(a);let r=new H,i=new H;Eb.distanceSqToSegment(xb.start,xb.end,i,r),n.push({point:i,pointOnLine:r,distance:Eb.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var jb=class extends ri{constructor(e=new db,t=new fb({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)mb.fromBufferAttribute(t,e),hb.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+mb.distanceTo(hb);let i=new Ms(r,2,1);return e.setAttribute(`instanceDistanceStart`,new Nr(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new Nr(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;if(r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;Eb=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;Db=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),wb.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?Db*.5:Ob(r,Math.max(r.near,wb.distanceToPoint(Eb.origin)),s.resolution),wb.radius+=c,Eb.intersectsSphere(wb)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Cb.copy(o.boundingBox).applyMatrix4(a);let l;l=n?Db*.5:Ob(r,Math.max(r.near,Cb.distanceToPoint(Eb.origin)),s.resolution),Cb.expandByScalar(l),Eb.intersectsBox(Cb)!==!1&&(n?kb(this,t):Ab(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(pb),this.material.uniforms.resolution.value.set(pb.z,pb.w))}},Mb=1.5,Nb=4.5,Pb=13;function Fb({park:e,heightAt:t}){let n=new On;n.name=`routes`;let r=new Map;e.routes.forEach((e,i)=>{let a=[];for(let n of e.lines){let e=[];for(let t=1;t<n.length;t++){let[r,i]=n[t-1],[a,o]=n[t],s=Math.max(1,Math.ceil(Math.hypot(a-r,o-i)/4));for(let t=0;t<s;t++)e.push([r+(a-r)*t/s,i+(o-i)*t/s])}e.push(n[n.length-1]);let r=(e,n)=>Math.max(t(e,n),.3)+.9;for(let t=1;t<e.length;t++){let[n,i]=e[t-1],[o,s]=e[t];a.push(n,r(n,i),i,o,r(o,s),s)}}if(!a.length)return;let o=new db().setPositions(a),s=(e,t=!1)=>new fb({color:e,linewidth:4,transparent:!0,depthTest:!0,depthWrite:!1,dashed:t,dashSize:5,gapSize:5,worldUnits:!1}),c=new jb(o,s(e.casing)),l=new jb(o,s(e.color)),u=new jb(o,s(e.casing,!0));u.computeLineDistances(),u.visible=!1;for(let e of[c,l,u])e.frustumCulled=!1,e.layers.set(Yd.ROUTES),n.add(e);r.set(e.slug,{def:e,index:i,casing:c,stroke:l,flow:u,visible:!0})});let i=null,a=!1,o=4.5;function s(){let e=r.size;for(let[t,n]of r){let r=i===t&&!a,s=a||i&&!r,c=r?o*1.45:s?o*.7:o,l=Math.min(5,Math.max(2.5,c*.4));n.stroke.material.linewidth=c,n.casing.material.linewidth=c+l,n.flow.material.linewidth=c*.42,n.stroke.material.opacity=s?.4:1,n.casing.material.opacity=s?.3:1,n.casing.visible=n.stroke.visible=n.visible,n.flow.visible=n.visible&&r;let u=r?3*e:0;n.casing.renderOrder=u+n.index,n.stroke.renderOrder=u+e+n.index,n.flow.renderOrder=u+2*e+n.index}}return s(),{name:`routes`,object:n,focus(e){i=e&&r.has(e)?e:null,s()},setDimmed(e){a=e,s()},setVisible(e,t){let n=r.get(e);n&&(n.visible=t,s())},bounds(e){let t=r.get(e);if(!t)return null;let n=new Qn;for(let e of t.def.lines)for(let[t,r]of e)n.expandByPoint(new H(t,0,r));return n},update({t:e,pxPerMeter:t}){if(t){let e=kt.clamp(Mb*t,Nb,Pb);Math.abs(e-o)>.05&&(o=e,s())}if(!i)return;let n=r.get(i);n?.flow.visible&&(n.flow.material.dashOffset=-e*10)}}}function Ib(e,t=[],{near:n=4,step:r=4}={}){let i=new Map,a=(e,t)=>`${e},${t}`;for(let e of t)for(let t of e.lines)for(let e=1;e<t.length;e++){let[r,o]=t[e-1],[s,c]=t[e],l=Math.floor((Math.min(r,s)-n)/20),u=Math.floor((Math.max(r,s)+n)/20),d=Math.floor((Math.min(o,c)-n)/20),f=Math.floor((Math.max(o,c)+n)/20);for(let e=l;e<=u;e++)for(let t=d;t<=f;t++){let n=a(e,t);i.has(n)||i.set(n,[]),i.get(n).push([r,o,s,c])}}let o=(e,t)=>{for(let[r,o,s,c]of i.get(a(Math.floor(e/20),Math.floor(t/20)))??[]){let i=s-r,a=c-o,l=i*i+a*a||1,u=Math.max(0,Math.min(1,((e-r)*i+(t-o)*a)/l));if(Math.hypot(e-r-i*u,t-o-a*u)<n)return!0}return!1},s=[];for(let t of e)for(let e=1;e<t.length;e++){let[n,i]=t[e-1],[a,c]=t[e],l=Math.max(1,Math.ceil(Math.hypot(a-n,c-i)/r));for(let e=0;e<l;e++){let t=n+(a-n)*e/l,r=i+(c-i)*e/l,u=n+(a-n)*(e+1)/l,d=i+(c-i)*(e+1)/l;o((t+u)/2,(r+d)/2)||s.push(t,r,u,d)}}return s}var Lb={color:`#fffaf0`,casing:`#4a3b2c`,casingOpacity:.5,worldWidth:.9,minPx:2.5,maxPx:7,casingPx:2,dashPx:16,dashRatio:.6};function Rb({park:e,heightAt:t}){let n=new On;n.name=`walkways`;let r=Ib(e.walkways??[],e.routes);if(!r.length)return{name:`walkways`,object:n};let i=new Float32Array(r.length/4*6),a=(e,n)=>Math.max(t(e,n),.3)+.5;for(let e=0,t=0;e<r.length;e+=4,t+=6){let[n,o,s,c]=r.slice(e,e+4);i.set([n,a(n,o),o,s,a(s,c),c],t)}let o=new db().setPositions(i),s=Lb,c=(e,t,n)=>new fb({color:e,linewidth:s.minPx,transparent:!0,opacity:t,depthTest:!0,depthWrite:!1,dashed:n,dashSize:s.dashRatio,gapSize:1-s.dashRatio,worldUnits:!1}),l=new jb(o,c(s.casing,s.casingOpacity,!1)),u=new jb(o,c(s.color,1,!0));u.computeLineDistances(),l.renderOrder=-2,u.renderOrder=-1;for(let e of[l,u])e.frustumCulled=!1,e.layers.set(Yd.ROUTES),n.add(e);let d=-1,f=-1;return{name:`walkways`,object:n,update({pxPerMeter:e}){if(!e)return;let t=kt.clamp(s.worldWidth*e,s.minPx,s.maxPx);Math.abs(t-d)>.05&&(d=t,u.material.linewidth=t,l.material.linewidth=t+s.casingPx);let n=2**Math.round(Math.log2(e/s.dashPx));n!==f&&(u.material.dashScale=f=n)}}}var zb={vertexColors:!0,roughness:.8,side:2},Bb={axis:`z`,speed:9,amp:.7,threshold:.2},Vb=e=>Lg(e.colors.map(e=>new W(e).getStyle()),e.span??1.6);function Hb(e={}){let t=Ph(3);return{rnd:t,flamingos:(e.flamingos??[]).map(e=>{let n=[];for(let r=0;r<e.count;r++){let r=t()*Math.PI*2,i=Math.sqrt(t())*e.r;n.push({x:e.x+Math.cos(r)*i,z:e.z+Math.sin(r)*i,yaw:t()*6.28,s:.1+t()*.3})}return n}),flocks:(e.birds??[]).map(e=>{let n=[];for(let r=0;r<e.count;r++)n.push({phase:r/e.count*Math.PI*2,speed:(.18+t()*.08)*(e.speed??1),rr:e.r*(.7+t()*.5),hh:e.h+t()*8});return n})}}function Ub({fauna:e={}}){let t=new On;t.name=`fauna`;let n=[],r=Hb(e),{rnd:i}=r;for(let[i,a]of(e.flamingos??[]).entries()){let e=new hi(Fg(),new Do({vertexColors:!0,roughness:.7}),a.count),o=r.flamingos[i];t.add(e);let s=new U,c=new At,l=new H(0,1,0),u=new H(1,1,1);n.push((t,n,r)=>{o.forEach((n,i)=>{c.setFromAxisAngle(l,n.yaw+Math.sin(t*n.s+i)*.8*r.sway),s.compose(new H(n.x,-.6,n.z),c,u),e.setMatrixAt(i,s)}),e.instanceMatrix.needsUpdate=!0})}for(let[i,a]of(e.birds??[]).entries()){let e=f_(Do,zb,Bb),o=new hi(Vb(a),e,a.count);o.frustumCulled=!1,t.add(o);let s=r.flocks[i],c=new U,l=new At,u=new H(0,1,0),d=new H().setScalar(a.scale??1.4),f=new H;n.push((e,t,n)=>{o.count=Math.max(1,Math.round(a.count*n.birds)),s.forEach((t,n)=>{let r=t.phase+e*t.speed;f.set(a.x+Math.cos(r)*t.rr,t.hh+Math.sin(e*.7+t.phase)*3,a.z+Math.sin(r)*t.rr*.8),l.setFromAxisAngle(u,Math.atan2(-Math.cos(r)*.8,-Math.sin(r))),o.setMatrixAt(n,c.compose(f,l,d))}),o.instanceMatrix.needsUpdate=!0})}for(let r of e.dolphins??[]){let e=Rg(),a=new Do({vertexColors:!0,roughness:.4});for(let o=0;o<r.count;o++){let o=new ri(e,a);t.add(o);let s=7+i()*5,c=i()*s,l=null,u=-1;n.push((e,t,n)=>{e=n.clock;let a=Math.floor((e+c)/s);if(a!==u){u=a;let e=i()*Math.PI*2;l={x:r.x+(i()-.5)*r.rx*1.4,z:r.z+(i()-.5)*r.rz*1.4,dx:Math.cos(e),dz:Math.sin(e)},l.skip=i()>n.jumps}let d=(e+c)%s/1.6;if(d>1||l.skip){o.visible=!1;return}o.visible=!0;let f=(d-.5)*6;o.position.set(l.x+l.dx*f,Math.sin(d*Math.PI)*2.6-.4,l.z+l.dz*f),o.rotation.set(0,Math.atan2(-l.dz,l.dx),Math.cos(d*Math.PI)*.9)})}}let a=0,o={clock:0,sway:1,birds:1,jumps:1};return{name:`fauna`,object:t,setQuality(e){t.visible=e.fauna},update({t:e,dt:r=0}){if(t.visible){a+=r*Wp(Up.pace),o.clock=e,o.sway=Wp(Up.pace),o.birds=Wp(Up.birds),o.jumps=Wp(Up.jumps),d_.value=e;for(let e of n)e(a,r,o)}}}}var Wb=1500;function Gb(e,t){let n=sm(e.lat,e.lng),r=sm(t.lat,t.lng),[i,a]=n.toLocal(t.lat,t.lng),o=n.mLng/r.mLng;return{dx:i,dz:a,sx:o,toWorld:(e,t)=>[e*o+i,t+a],toLocal:(e,t)=>[(e-i)/o,t-a]}}function Kb(e,t){let[n,r]=t.toWorld(e.cx,e.cz);return Vp({cx:n,cz:r,radii:e.radii})}function qb(e,t){let n=1/0,r=(e,t)=>{let r=e.radii.length*2;for(let i=0;i<r;i++){let a=i/r*Math.PI*2,o=e.radiusAt(a);n=Math.min(n,t.signedDistance(e.cx+Math.cos(a)*o,e.cz+Math.sin(a)*o))}};return r(e,t),r(t,e),n}function Jb(e,t,n=Wb){let r=Vp(e.clear),i=[];for(let a of t){if(a.key===e.key||!a.center||!a.clear)continue;let t=Gb(e.center,a.center),[o,s]=t.toWorld(a.clear.cx,a.clear.cz),c=r.maxRadius+Math.max(...a.clear.radii)+n;if(Math.hypot(o-r.cx,s-r.cz)>c)continue;let l=Kb(a.clear,t),u=qb(r,l);u<=n&&i.push({key:a.key,park:a,offset:t,area:l,gap:u,region:!!a.region})}return i.sort((e,t)=>e.region-t.region||e.gap-t.gap||(e.key<t.key?-1:1))}function Yb(e,t,n){return(r,i)=>{let a=1-e.fade(r,i);if(a<=0)return 0;let[o,s]=t.toWorld(r,i);for(let e of n)a*=e.fade(o,s);return a}}function Xb(e,t){return(n,r)=>{let[i,a]=e.toWorld(n,r),o=1;for(let e of t)o*=e.fade(i,a);return o}}var Zb=Bp.inner/3,Qb=[Mm.BROAD,Mm.BROAD_LIGHT,Mm.CEIBA,Mm.PALM],$b=[40,240];function ex(e,t,n,r,i){let a=e.length/6,o=t=>{let n=t*6;if(!Qb.includes(e[n+5]))return!1;let[a,o]=r.toWorld(e[n],e[n+2]);return!i.some(e=>e.signedDistance(a,o)<-Zb)},s=[];if(n){let e=[];for(let t=0;t<a;t++)o(t)&&e.push(t);let n=t.regionTrees??t.maxTrees,r=Math.max(1,e.length/n);for(let t=0;t<e.length;t+=r)s.push(e[Math.floor(t)]);return{indices:s,stride:r,eligible:e.length,cap:n}}let c=Math.max(t.treeStride,Math.ceil(a/t.maxTrees));for(let e=0;e<a;e+=c)o(e)&&s.push(e);return{indices:s,stride:c}}var tx={url:`https://tile.openstreetmap.org/{z}/{x}/{y}.png`,tileSize:256,minZoom:3,maxZoom:19,background:`#f2efe9`,sea:`#aad3df`,attribution:{es:`© colaboradores de OpenStreetMap`,en:`© OpenStreetMap contributors`},attributionUrl:`https://www.openstreetmap.org/copyright`},nx=12,rx=128,ix=.5,ax={park:-1.5,region:-1.6},ox=()=>new Promise(e=>requestAnimationFrame(()=>e())),sx=()=>new Promise(e=>window.requestIdleCallback?requestIdleCallback(()=>e(),{timeout:500}):setTimeout(e,50));function cx({focus:e,stage:t,sunDirection:n,keys:r,load:i,onRegion:a=()=>{}}){let o=new On;o.name=`neighbors`;let s={value:0},c=null,l=!1,u=null,d=0,f=null,p=!1,m=[],h=null;function g(){return u??=Promise.all(r.map(e=>i.parkJson(e).then(t=>({key:e,center:t.center,clear:t.clear,extent:t.extent,heightGrid:t.heightGrid,waterTint:t.waterTint,region:t.region}),()=>null))).then(e=>e.filter(Boolean)),u}let _=async e=>Jb(e.park,(await g()).filter(t=>t.key!==e.park.key));function v(e){e.trees!==c&&e.setTrees(c),o.add(e.group),m.push(e),e.region&&a(e.regionArea)}function y(){for(let e of m)o.remove(e.group),e.dispose();m.some(e=>e.region)&&a(null),m=[]}function b(){d++,f?.abort(),f=null,p=!1}async function x(e,{progressive:r}){if(b(),r&&y(),!c)return r?void 0:[];let a=d;p=!0,f=new AbortController;let{signal:o}=f,l=[],u=()=>a!==d;try{let a=await _(e),d=[e.designArea];for(let f of a){if(u())break;let a=await i.assets(f.key,{signal:o});if(await sx(),u())break;h??=lx(s);let p=ux(f,a,[...d],{focusArea:e.designArea,treeDefs:h,trees:c,sunDirection:n});if(f.region||d.push(f.area),await t.renderer.compileAsync(p.group,t.camera,t.scene),u()){p.dispose();break}r?(v(p),await ox()):l.push(p)}}catch(e){e?.name!==`AbortError`&&console.warn(`neighbor parks:`,e)}finally{u()||(p=!1)}if(u()){for(let e of l)e.dispose();return null}return l}return{name:`neighbors`,object:o,get neighbors(){return m.map(e=>e.key)},get cluster(){return _(e).then(e=>e.filter(e=>!e.region).map(e=>e.key))},start(){l||(l=!0,x(e,{progressive:!0}))},async prepareFocus(t){let n=await x(t,{progressive:!1});return n?()=>{y(),e=t,l=!0;for(let e of n)v(e)}:null},setQuality(t){let n=t.neighbors??null;if(n?.treeStride===c?.treeStride&&n?.maxTrees===c?.maxTrees&&n?.regionTrees===c?.regionTrees)return;let r=c;if(c=n,!n)b(),y();else if(!r)l&&x(e,{progressive:!0});else for(let e of m)e.setTrees(n)},update({t:e}){s.value=e},get loading(){return!!c&&(!l||p)},dispose(){if(l=!1,b(),y(),h)for(let e of Object.values(h))e.geometry.dispose(),e.material.dispose();h=null}}}function lx(e){let t=mh(),n=e=>{let t=e.getAttribute(`color`),n=new W(0,0,0);for(let e=0;e<t.count;e++)n.r+=t.getX(e)/t.count,n.g+=t.getY(e)/t.count,n.b+=t.getZ(e)/t.count;return n},r=n(t[Mm.BROAD].lo),i=e=>{let i=n(t[e].lo);return new W(i.r/r.r,i.g/r.g,i.b/r.b)},a={broad:{geometry:t[Mm.BROAD].lo,material:gh(e),types:[Mm.BROAD,Mm.BROAD_LIGHT,Mm.CEIBA],scale:{[Mm.CEIBA]:Pm[Mm.CEIBA].crown/Pm[Mm.BROAD].crown},tint:{[Mm.BROAD_LIGHT]:i(Mm.BROAD_LIGHT),[Mm.CEIBA]:i(Mm.CEIBA)}},palm:{geometry:t[Mm.PALM].lo,material:gh(e,{side:t[Mm.PALM].side}),types:[Mm.PALM]}};for(let[e,n]of Object.entries(t))n.hi!==n.lo&&n.hi.dispose(),+e!==Mm.BROAD&&+e!==Mm.PALM&&n.lo.dispose();return a}function ux(e,t,n,{focusArea:r,treeDefs:i,trees:a,sunDirection:o}){let{park:s,offset:c,key:l,region:u}=e,d=Vp(s.clear),f=nm(s,t.heightBuffer),p=Yb(d,c,n),m=new On;m.name=`neighbor:${l}`,m.position.set(c.dx,0,c.dz),m.scale.set(c.sx,1,1);let h=fx(s,f,p,d,u?Xb(c,n):p),g=[];if(h.ground){let n=u?dx(t.ground,e.area,r):new Oo({map:t.ground,vertexColors:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:204,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205}),i=new ri(mf(h.ground),n);i.name=`neighbor:${l}:ground`,i.renderOrder=u?ax.region:ax.park,m.add(i),g.push(h.ground,n)}if(h.water){let e=u?{area:d,color:tx.sea,band:$b}:void 0,n=Am({park:s,waterTexture:t.waterTexture,sunDirection:o,seaEdge:e}),r=new ri(mf(h.water),n);r.name=`neighbor:${l}:water`,r.renderOrder=1,m.add(r),g.push(h.water,n)}let _=Fm(t.vegetationBuffer),v=[],y={key:l,group:m,region:u,regionArea:u?e.area:null,trees:null,setTrees(e){for(let e of v)m.remove(e),e.dispose();v=e?px(_,e,u,c,n,i,d):[];for(let e of v)m.add(yf(e));y.trees=e},dispose(){for(let e of g)e.dispose();for(let e of v)e.dispose()}};return y.setTrees(a),yf(m),y}function dx(e,t,n){let r=new Oo({map:e,depthTest:!1,depthWrite:!1,blending:5,blendSrc:204,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205}),i={...gm(n),...gm(t,`region`)},a=_m(n.radii.length)+_m(t.radii.length,`region`);return r.onBeforeCompile=e=>{Object.assign(e.uniforms,i),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vRegionWorld;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vRegionWorld = (modelMatrix * vec4(transformed, 1.0)).xz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nvarying vec2 vRegionWorld;\n${a}`).replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.a *= (1.0 - regionFade(vRegionWorld)) * designFade(vRegionWorld);`)},r.customProgramCacheKey=()=>`region-ground-${n.radii.length}-${t.radii.length}`,r}function fx(e,t,n,r,i=n){let{cx:a,cz:o,size:s}=e.extent,c=Math.min(rx,Math.ceil(s/nx)),l=s/c,u=a-s/2,d=o-s/2,f=c+1,p=new Float32Array(f*f),m=new Float32Array(f*f);for(let e=0;e<f;e++)for(let r=0;r<f;r++){let i=u+r*l,a=d+e*l;p[e*f+r]=n(i,a),m[e*f+r]=t(i,a)}let h=[],g=[];for(let e=0;e<c;e++)for(let t=0;t<c;t++){let n=[e*f+t,e*f+t+1,(e+1)*f+t,(e+1)*f+t+1];Math.max(...n.map(e=>p[e]))<.002||r.signedDistance(u+(t+.5)*l,d+(e+.5)*l)>Bp.outer+l*1.5||(h.push(t,e),Math.min(...n.map(e=>m[e]))<ix&&g.push(t,e))}let _=(e,r)=>{if(!e.length)return null;let a=new Int32Array(f*f).fill(-1),o=[],s=0,h=(e,t)=>{let n=t*f+e;return a[n]<0&&(a[n]=s++),a[n]};for(let t=0;t<e.length;t+=2){let n=e[t],r=e[t+1],i=h(n,r),a=h(n+1,r),s=h(n,r+1),c=h(n+1,r+1);o.push(i,s,a,a,s,c)}let g=new Float32Array(s*3),_=r?null:new Float32Array(s*3),v=r?null:new Float32Array(s*2),y=r?new Float32Array(s):new Float32Array(s*4);for(let e=0;e<f*f;e++){let o=a[e];if(o<0)continue;let s=e%f,h=Math.floor(e/f),b=u+s*l,x=d+h*l;if(r){g.set([b,0,x],o*3),y[o]=i===n?p[e]:i(b,x);continue}g.set([b,m[e],x],o*3);let S=(t(b-l,x)-t(b+l,x))/(2*l),C=(t(b,x-l)-t(b,x+l))/(2*l),w=Math.hypot(S,1,C);_.set([S/w,1/w,C/w],o*3),v.set([s/c,h/c],o*2),y.set([1,1,1,p[e]],o*4)}let b=new Ar;return b.setAttribute(`position`,new gr(g,3)),r?b.setAttribute(`alpha`,new gr(y,1)):(b.setAttribute(`normal`,new gr(_,3)),b.setAttribute(`uv`,new gr(v,2)),b.setAttribute(`color`,new gr(y,4))),b.setIndex(s>65535?o:new gr(Uint16Array.from(o),1)),b};return{ground:_(h,!1),water:_(g,!0),segments:c}}function px(e,t,n,r,i,a,o){let s=new Map;for(let[e,t]of Object.entries(a))for(let n of t.types)s.set(n,e);let c=ex(e,t,n,r,i).indices,l=new Map;for(let t of c){let n=t*6,r=`${s.get(e[n+5])}:${e[n]<o.cx?`w`:`e`}${e[n+2]<o.cz?`n`:`s`}`;l.has(r)||l.set(r,[]),l.get(r).push(t)}let u=[];for(let[t,n]of l){let r=a[t.split(`:`)[0]],i=new hi(r.geometry,r.material,n.length);i.name=`trees:${t}`,Th(i,e,n,r),u.push(i)}return u}var mx={spacing:18,offset:2.2,minGap:10,areaSpacing:16};function hx(e,t={}){let{spacing:n,offset:r,minGap:i}={...mx,...t},a=t.accept??(()=>!0),o=new vx(i,t.lamps??[]),s=1;for(let t of e){if(t.length<2)continue;let e=[0];for(let n=1;n<t.length;n++)e.push(e[n-1]+Math.hypot(t[n][0]-t[n-1][0],t[n][1]-t[n-1][1]));let c=e[e.length-1];if(c<i/2)continue;let l=Math.max(1,Math.round(c/n)),u=1;for(let n=0;n<l;n++){let i=(n+.5)*c/l;for(;u<t.length-1&&e[u]<i;)u++;let[d,f]=t[u-1],[p,m]=t[u],h=e[u]-e[u-1]||1,g=(i-e[u-1])/h,_=-(m-f)/h,v=(p-d)/h,y=d+(p-d)*g+_*r*s,b=f+(m-f)*g+v*r*s;s=-s,!o.near(y,b)&&a(y,b)&&o.add(y,b)}}return o.lamps}function gx(e,t,[n,r,i,a],o={}){let{areaSpacing:s,minGap:c}={...mx,...o},l=o.threshold??.6,u=o.accept??(()=>!0),d=new vx(c,e);for(let e=0,o=r+s/2;o<a;o+=s,e++)for(let r=0,a=n+s/2;a<i;a+=s,r++){let n=a+(yx(r,e,1)-.5)*s*.9,i=o+(yx(r,e,2)-.5)*s*.9;t(n,i)<l||d.near(n,i)||!u(n,i)||d.add(n,i)}return d.lamps}function _x(e,t){if(e.length<=t)return e;let n=t/e.length;return e.filter((e,t)=>Math.floor((t+1)*n)>Math.floor(t*n))}var vx=class{constructor(e,t){this.gap=e,this.cells=new Map,this.lamps=[];for(let[e,n]of t)this.add(e,n)}key(e,t){return e*73856093+t}add(e,t){let n=this.key(Math.floor(e/this.gap),Math.floor(t/this.gap));this.cells.has(n)||this.cells.set(n,[]),this.cells.get(n).push([e,t]),this.lamps.push([e,t])}near(e,t){let n=Math.floor(e/this.gap),r=Math.floor(t/this.gap);for(let i=r-1;i<=r+1;i++)for(let r=n-1;r<=n+1;r++)for(let[n,a]of this.cells.get(this.key(r,i))??[])if(Math.hypot(n-e,a-t)<this.gap)return!0;return!1}};function yx(e,t,n){let r=e*374761393+t*668265263+n*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296}function bx(e=[]){let t=e.map(e=>{let t=[],n=1/0,r=1/0,i=-1/0,a=-1/0;for(let o of e.rings)for(let e=0;e<o.length;e++){let[s,c]=o[e],[l,u]=o[(e+1)%o.length];t.push([s,c,l,u]),n=Math.min(n,s),r=Math.min(r,c),i=Math.max(i,s),a=Math.max(a,c)}return{hole:e,edges:t,box:[n,r,i,a]}}),n=(e,t,n)=>{let[r,i,a,o]=e.box;if(t<r||t>a||n<i||n>o)return!1;let s=!1;for(let[r,i,a,o]of e.edges)i>n!=o>n&&t<(a-r)*(n-i)/(o-i)+r&&(s=!s);return s},r=(e,r)=>t.find(t=>n(t,e,r))?.hole??null;return{empty:t.length===0,at:r,contains:(e,t)=>r(e,t)!==null,near(e,r,i){for(let a of t){let[t,o,s,c]=a.box;if(!(e<t-i||e>s+i||r<o-i||r>c+i)){if(n(a,e,r))return!0;for(let t of a.edges)if(Cx(e,r,t)<i)return!0}}return!1},classify(e,n,i,a){for(let r of t){let t=r.box;if(!(i<t[0]||e>t[2]||a<t[1]||n>t[3])){for(let[t,o,s,c]of r.edges)if(!(Math.max(t,s)<e||Math.min(t,s)>i||Math.max(o,c)<n||Math.min(o,c)>a)&&Sx(t,o,s,c,e,n,i,a))return 2}}return+!!r((e+i)/2,(n+a)/2)}}}function xx(e,t){return t.empty?e:(n,r)=>{let i=t.at(n,r);if(i?.cover==null)return e(n,r);let{base:a}=i;return(a.y??e(a.x,a.z))+i.cover}}function Sx(e,t,n,r,i,a,o,s){let c=n-e,l=r-t,u=0,d=1,f=(e,t)=>{if(e===0)return t>=0;let n=t/e;if(e<0){if(n>d)return!1;n>u&&(u=n)}else{if(n<u)return!1;n<d&&(d=n)}return!0};return f(-c,e-i)&&f(c,o-e)&&f(-l,t-a)&&f(l,s-t)}function Cx(e,t,[n,r,i,a]){let o=i-n,s=a-r,c=o*o+s*s||1,l=Math.max(0,Math.min(1,((e-n)*o+(t-r)*s)/c));return Math.hypot(e-(n+o*l),t-(r+s*l))}var wx={postHeight:4.2,postColor:`#2c3036`,pole:{radiusTop:.06,radiusBottom:.08,sides:5},lantern:{radiusTop:.22,radiusBottom:.12,height:.35,centerAbovePost:.12,sides:5},postSink:.1,head:{radius:1.3,minPx:3.2,aboveGround:4.35},lightMapSize:1024,poolRadius:10,pathGlow:.34,postDistance:650},Tx=wx.postHeight,Ex=wx.lightMapSize,Dx=wx.poolRadius,Ox=wx.pathGlow,kx=wx.postDistance,Ax=`
  uniform vec2 uViewport;
  uniform float uSize;
  uniform float uMinPx;
  varying vec2 vQ;
  void main() {
    vec4 center = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    vec4 clip = projectionMatrix * viewMatrix * center;
    // a disc facing the camera, uSize m in radius but never smaller than uMinPx pixels
    float px = max(uSize * projectionMatrix[1][1] * 0.5 * uViewport.y / clip.w, uMinPx);
    vQ = position.xy * 2.0; // -1 … 1
    clip.xy += vQ * (2.0 * px / uViewport) * clip.w;
    gl_Position = clip;
  }
`,jx=`
  uniform float uNight;
  uniform vec3 uColor;
  varying vec2 vQ;
  void main() {
    float d = length(vQ);
    if (d > 1.0) discard;
    float core = smoothstep(0.42, 0.12, d);
    float halo = pow(1.0 - d, 1.6) * 0.85;
    vec3 c = mix(uColor, vec3(1.0, 0.96, 0.86), core) * (core + halo) * uNight;
    gl_FragColor = vec4(c, 1.0);
  }
`;function Mx({park:e,heightAt:t,buildings:n,landmarks:r,paving:i,designArea:a,lightMap:o}){let s=Nx({park:e,heightAt:t,buildings:n,landmarks:r,cover:Lx(i,e.extent),designArea:a}),c=new On;c.name=`lamps`,c.visible=!1;let l=new Oo({color:wx.postColor}),u=new hi(Px(),l,Math.max(1,s.length));u.name=`lamps:posts`;let d={uNight:Gp,uColor:{value:new W(qp.lamp)},uViewport:{value:new V(1,1)},uSize:{value:wx.head.radius},uMinPx:{value:wx.head.minPx}},f=new hi(new so(1,1),new To({uniforms:d,vertexShader:Ax,fragmentShader:jx,transparent:!0,depthWrite:!1,blending:2}),Math.max(1,s.length));f.name=`lamps:heads`,f.renderOrder=2;let p=new U;s.forEach(([e,n,r],i)=>{let a=r??t(e,n);u.setMatrixAt(i,p.makeTranslation(e,a-wx.postSink,n)),f.setMatrixAt(i,p.makeTranslation(e,a+wx.head.aboveGround,n))});for(let e of[u,f])e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),e.count=0,c.add(e);let m=[u,f].map(e=>e.instanceMatrix.array.slice()),h=-1,g=[];function _(t){let n=_x(s.map((e,t)=>t),t);if(n.length===h)return;h=n.length,[u,f].forEach((e,t)=>{let r=m[t],i=e.instanceMatrix.array;n.forEach((e,t)=>i.set(r.subarray(e*16,e*16+16),t*16)),e.count=n.length,e.instanceMatrix.needsUpdate=!0}),g.length=0;for(let e of n)g.push(s[e]);let r=o.value;o.value=Bx(g,e.extent,i),r?.userData.lampLightMap&&r.dispose()}return{name:`lamps`,object:c,lamps:g,setQuality(e){_(e.lamps??s.length)},update({distance:e,fovPx:t,camera:n}){let r=Gp.value;if(c.visible=r>.001&&h>0,!c.visible)return;u.visible=e<kx;let i=2*t*Math.tan(kt.degToRad(n.fov/2));d.uViewport.value.set(i*n.aspect,i)},dispose(){o.value?.userData.lampLightMap&&o.value.dispose(),i?.close?.()}}}function Nx({park:e,heightAt:t,buildings:n,landmarks:r,cover:i,designArea:a}){let o=Fx(n,r),s=(e,t)=>a.signedDistance(e,t)<-25&&!o(e,t),c=(e,n)=>t(e,n)>.15&&s(e,n),l=hx((e.piers??[]).filter(e=>!e.closed).map(e=>e.pts),{offset:.75,accept:s}),u=new Map(l.map(([e,n])=>[`${e},${n}`,Math.max(.9,t(e,n)+.1)+.17])),d=hx([...e.walkways??[],...e.routes.flatMap(e=>e.lines)],{accept:c,lamps:l});if(i){let{cx:t,cz:n,size:r}=e.extent;d=gx(d,i,[t-r/2,n-r/2,t+r/2,n+r/2],{accept:c})}return d.map(([e,t])=>{let n=u.get(`${e},${t}`);return n===void 0?[e,t]:[e,t,n]})}function Px(){let{pole:e,lantern:t}=wx,n=new q(e.radiusTop,e.radiusBottom,Tx,e.sides,1,!0);n.translate(0,Tx/2,0);let r=new q(t.radiusTop,t.radiusBottom,t.height,t.sides);return r.translate(0,Tx+t.centerAbovePost,0),n.deleteAttribute(`uv`),r.deleteAttribute(`uv`),Im([n.toNonIndexed(),r.toNonIndexed()])}function Fx(e,t){let n=bx(rb(t)),r=new Map,i=(e,t)=>e*100003+t,a=(e,t,n,a,o)=>{for(let s=Math.floor(t/40);s<=Math.floor(a/40);s++)for(let t=Math.floor(e/40);t<=Math.floor(n/40);t++){let e=i(t,s);r.has(e)||r.set(e,[]),r.get(e).push(o)}};for(let t of e)if(t.poly){let e=t.poly.map(e=>e[0]),n=t.poly.map(e=>e[1]);a(Math.min(...e)-1,Math.min(...n)-1,Math.max(...e)+1,Math.max(...n)+1,(e,n)=>Ix(t.poly,e,n,1))}else if(t.box){let e=Math.max(t.box.length,t.box.width)/2+1,{cx:n,cz:r}=t.box;a(n-e,r-e,n+e,r+e,(t,i)=>Math.hypot(t-n,i-r)<e)}for(let e of t){let t=(e.clear??0)*.8;t>0&&a(e.x-t,e.z-t,e.x+t,e.z+t,(n,r)=>Math.hypot(n-e.x,r-e.z)<t)}return(e,t)=>(r.get(i(Math.floor(e/40),Math.floor(t/40)))??[]).some(n=>n(e,t))||n.near(e,t,1)}function Ix(e,t,n,r){let i=!1,a=1/0;for(let r=0,o=e.length-1;r<e.length;o=r++){let[s,c]=e[r],[l,u]=e[o];c>n!=u>n&&t<(l-s)*(n-c)/(u-c)+s&&(i=!i);let d=l-s,f=u-c,p=Math.max(0,Math.min(1,((t-s)*d+(n-c)*f)/(d*d+f*f||1)));a=Math.min(a,Math.hypot(t-s-d*p,n-c-f*p))}return i||a<r}function Lx(e,{cx:t,cz:n,size:r}){if(!e)return null;let i=document.createElement(`canvas`);i.width=i.height=512;let a=i.getContext(`2d`,{willReadFrequently:!0});a.drawImage(e,0,0,512,512);let o=a.getImageData(0,0,512,512).data;return i.width=i.height=1,o?.length?(e,i)=>{let a=Math.floor(((e-t)/r+.5)*512),s=Math.floor(((i-n)/r+.5)*512);return a<0||s<0||a>=512||s>=512?0:o[(s*512+a)*4]/255}:null}var Rx=null;function zx(){if(Rx)return Rx;let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255,206,140,0.9)`),n.addColorStop(.3,`rgba(255,178,98,0.45)`),n.addColorStop(.65,`rgba(255,150,70,0.14)`),n.addColorStop(1,`rgba(255,140,60,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),Rx=e}function Bx(e,t,n){let r=Vx(e,t,n),i=new Pi(r);return i.flipY=!1,i.colorSpace=Be,i.userData.lampLightMap=!0,i.onUpdate=()=>{r.width=r.height=1,i.onUpdate=null},i}function Vx(e,{cx:t,cz:n,size:r},i){let a=Ex,o=document.createElement(`canvas`);o.width=o.height=a;let s=o.getContext(`2d`);if(s.fillStyle=`#000`,s.fillRect(0,0,a,a),i){let e=document.createElement(`canvas`);e.width=e.height=512;let t=e.getContext(`2d`);t.drawImage(i,0,0),t.globalCompositeOperation=`multiply`,t.fillStyle=`#ffd9a0`,t.fillRect(0,0,512,512),s.globalAlpha=Ox,s.drawImage(e,0,0,a,a),s.globalAlpha=1,e.width=e.height=1}s.globalCompositeOperation=`lighter`;let c=Dx/r*a,l=zx();for(let[i,o]of e){let e=((i-t)/r+.5)*a,u=((o-n)/r+.5)*a;s.drawImage(l,e-c,u-c,2*c,2*c)}return o}var Hx=new oi(new Uint8Array([0,0,0,255]),1,1);Hx.needsUpdate=!0,xf(Hx);var Ux=()=>new Promise(e=>requestAnimationFrame(()=>e()));async function Wx(e,t,n,{detached:r=!1,onTerrain:i}={}){let{park:a}=n,o=Vp(a.clear),s=bx(rb(t.landmarks)),c=[],l=async t=>(r||e.addLayer(t),c.push(t),await Ux(),t),u={value:Hx},d=await l(tm({park:a,lightMap:u,heightBuffer:n.heightBuffer,overview:n.groundOverview,stream:n.streamGround,designArea:o,baseUrl:n.baseUrl,holes:s})),{heightAt:f}=d,p=xx(f,s);await i?.(d),await l(km({park:a,waterTexture:n.waterTexture,sunDirection:Qd,designArea:o,lightMap:u})),await l(vh({buffer:n.vegetationBuffer})),await l(rg({buildings:n.buildings})),await l(ig({park:a,heightAt:f})),await l(ib({landmarks:t.landmarks,park:a,heightAt:f})),await l(cb({rows:t.vehicles,heightAt:f})),await l(Rb({park:a,heightAt:p})),await l(Mx({park:a,heightAt:f,buildings:n.buildings,landmarks:t.landmarks,paving:n.paving,designArea:o,lightMap:u}));let m=await l(Fb({park:a,heightAt:f}));return await l(Ub({fauna:t.fauna})),{layers:c,heightAt:f,surfaceAt:p,routes:m,designArea:o}}async function Gx(e,t,n,{neighbors:r=!0,load:i={parkJson:Ip,assets:Lp}}={}){let{park:a}=n,o=null,s=await Wx(e,t,n,{onTerrain:async()=>{o=xm({park:a,designArea:Vp(a.clear),config:tx}),e.addLayer(o),await Ux()}}),c=null;return r&&(c=cx({focus:{park:a,designArea:s.designArea},stage:e,sunDirection:Qd,keys:Object.keys(Cp),load:i,onRegion:e=>o.setRegion(e)}),e.addLayer(c),await Ux()),{...s,parkLayers:s.layers,basemap:o,neighbors:c,layers:Kx(s.layers,o,c)}}function Kx(e,t,n){let[r,...i]=e;return[r,t,...i,...n?[n]:[]]}var qx=(e,t=``)=>`<svg viewBox="0 0 24 24" aria-hidden="true" ${t}>${e}</svg>`,Jx={search:qx(`<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>`),close:qx(`<path d="M6 6l12 12M18 6L6 18"/>`),menu:qx(`<path d="M4 7h16M4 12h16M4 17h16"/>`),eye:qx(`<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>`),eyeOff:qx(`<path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.8 9.8 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>`),chevron:qx(`<path d="M9 6l6 6-6 6"/>`),clock:qx(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),route:qx(`<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h8"/>`),pin:qx(`<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>`),layers:qx(`<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>`),focus:qx(`<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>`),star:qx(`<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>`),ticket:qx(`<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V4H3z" transform="translate(0 2)"/><path d="M14 6v12" stroke-dasharray="2 2"/>`),mask:qx(`<path d="M4 6c3 1 13 1 16 0 0 7-3 12-8 12S4 13 4 6z"/><path d="M8.5 10.5h2M13.5 10.5h2M9.5 14.5c1.5 1 3.5 1 5 0"/>`),compass:qx(`<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>`),utensils:qx(`<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 1-3 3-3 6s1 4 3 4v8"/>`),bag:qx(`<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>`),camera:qx(`<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>`),wc:qx(`<text x="12" y="16.5" text-anchor="middle" font-size="10" font-weight="800" fill="currentColor" stroke="none" font-family="system-ui,sans-serif">WC</text>`),key:qx(`<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/>`),cross:qx(`<path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" fill="currentColor" stroke="none"/>`),wheelchair:qx(`<circle cx="11" cy="4.5" r="1.8"/><path d="M11 7.5v6h5l2.5 5"/><path d="M8 10.5a5.5 5.5 0 1 0 6.7 7.6"/>`),ramp:qx(`<path d="M3 19h18L3 9z"/><path d="M8 16l3-1.5"/>`),sun:qx(`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`),gauge:qx(`<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-6"/>`),directions:qx(`<path d="M12 2.5l9.5 9.5-9.5 9.5L2.5 12z"/><path d="M9 14.5v-3a1.5 1.5 0 0 1 1.5-1.5H15"/><path d="M13 7.8l2.2 2.2-2.2 2.2"/>`),walk:qx(`<circle cx="13" cy="4" r="1.8"/><path d="M10.5 21l2-6-2.5-2.5 1-4.5 3 3 2.5 1M10.5 8.5L7.5 10l-1 3.5M12.5 15l2.5 6"/>`)},Yx={wc:{icon:Jx.wc,color:`#0284c7`,label:{es:`Baños`,en:`Restrooms`}},locker:{icon:Jx.key,color:`#d97706`,label:{es:`Renta de casilleros`,en:`Locker rental`}},"first-aid":{icon:Jx.cross,color:`#dc2626`,label:{es:`Enfermería`,en:`First aid`}},wheelchair:{icon:Jx.wheelchair,color:`#7c3aed`,label:{es:`Sillas de ruedas y carriolas`,en:`Wheelchairs & strollers`}},ramp:{icon:Jx.ramp,color:`#ea580c`,label:{es:`Rampas difíciles`,en:`Steep ramps`}}},Xx={"Actividades Esenciales":{icon:Jx.star,color:`#0ea5e9`},"Actividades Extraordinarias":{icon:Jx.ticket,color:`#f59e0b`},Presentaciones:{icon:Jx.mask,color:`#a855f7`},"Atractivos por Descubrir":{icon:Jx.compass,color:`#16a34a`},Restaurantes:{icon:Jx.utensils,color:`#ef4444`},Tiendas:{icon:Jx.bag,color:`#ec4899`},Photos:{icon:Jx.camera,color:`#64748b`},Servicios:{icon:Jx.pin,color:`#0f766e`}},$=e=>String(e??``).replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),Zx=e=>String(e??``).toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``);function Qx(e,t,{t:n,lang:r,heightAt:i,onSelect:a,routeSlugOf:o,onDirections:s}){let c=new On;c.name=`markers`,e.add(c);let l=[];for(let e of t.pois){if(!e.active)continue;let u=document.createElement(`div`);u.className=`marker-anchor`;let d=document.createElement(`div`);d.className=`activity-marker`,d.tabIndex=0,d.setAttribute(`role`,`button`);let f=e.name[r]??e.name.es,p=e.route[r]??e.route.es,m=e.category[r]??e.category.es,h=o(e),g=t.routes.find(e=>e.slug===h);d.setAttribute(`aria-label`,`${e.number} ${f}`),d.dataset.cost=e.extraCost?`extra`:`included`,d.innerHTML=`
      <div class="activity-marker-number">${e.number}</div>
      <div class="activity-marker-name">${$(f)}</div>
      <div class="activity-marker-included">${$(n(e.extraCost?`lbl_map_activity_not_included`:`lbl_map_activity_included`))}</div>
      ${p?`<div class="activity-marker-route">${g?`<i style="--c:${g.color};--k:${g.casing}"></i>`:``}${$(p)}</div>`:``}
      <div class="activity-marker-category">${$(m??``)}${e.hours?` · <b>${$(e.hours)}</b>`:``}${e.desc?`<br>${$(e.desc)}`:``}</div>
      ${s?`<button type="button" class="activity-marker-go">${Jx.directions}<span>${$(n(`nav_directions`))}</span></button>`:``}`,u.appendChild(d);let _=new Vd(u);_.position.set(e.x,Math.max(i(e.x,e.z),.5)+2.5,e.z),c.add(_);let v={poi:e,el:d,obj:_,slug:h,visible:!0,selected:!1};d.addEventListener(`click`,t=>{if(t.stopPropagation(),t.target.closest(`.activity-marker-go`))return s(e);a(v.selected?null:e)}),d.addEventListener(`keydown`,t=>{(t.key===`Enter`||t.key===` `)&&!t.target.closest(`.activity-marker-go`)&&(t.preventDefault(),a(v.selected?null:e))}),l.push(v)}let u=[];for(let e of t.services??[]){let t=Yx[e.type];if(!t)continue;let n=document.createElement(`div`);n.className=`marker-anchor`;let a=document.createElement(`div`);a.className=`service-chip`,a.style.setProperty(`--c`,t.color),a.title=`${t.label[r]??t.label.es}${e.note?` · ${e.note}`:``}`,a.innerHTML=t.icon,n.appendChild(a);let o=new Vd(n);o.position.set(e.x,Math.max(i(e.x,e.z),.5)+1.5,e.z),o.visible=!1,c.add(o),u.push({s:e,obj:o})}return{group:c,items:l,select(e){for(let t of l){let n=!!e&&t.poi.id===e.id;t.selected=n,t.el.className=n?`activity-marker-selected`:`activity-marker`,n?t.obj.visible=!0:t.obj.visible=t.visible}},filter(e){for(let t of l)t.visible=e(t.poi,t.slug),t.obj.visible=t.visible||t.selected},showServices(e){for(let{s:t,obj:n}of u)n.visible=e.has(t.type)},afterRender(){for(let e of l)e.selected&&(e.obj.element.style.zIndex=`100000`)},dispose(){e.remove(c),c.traverse(e=>e.element?.remove())}}}var $x={from:19,to:6},eS=[`auto`,`day`,`night`];function tS(e=Date.now()){let t=((typeof e==`number`?e:e.getTime())/36e5+-5)%24;return t<0?t+24:t}function nS(e=Date.now()){let t=tS(e);return t>=$x.from||t<$x.to}function rS(e,t=Date.now()){return e===`day`?!1:e===`night`||nS(t)}function iS(e=typeof location>`u`?``:location.search){let t=new URLSearchParams(e);return t.has(`night`)?`night`:t.has(`day`)?`day`:null}var aS=class extends db{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let r=0;r<t;r++)n[6*r]=e[r].x,n[6*r+1]=e[r].y,n[6*r+2]=e[r].z||0,n[6*r+3]=e[r+1].x,n[6*r+4]=e[r+1].y,n[6*r+5]=e[r+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},oS=class extends jb{constructor(e=new aS,t=new fb({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},sS={color:`#1a73e8`,night:`#5b9cff`,walked:`#8fa8c8`,casing:`#ffffff`,worldWidth:2.6,minPx:6,maxPx:14,casingPx:5,lift:1.3};function cS(){let e=new On;e.name=`nav-route`;let t=(e,{dashed:t=!1,opacity:n=1}={})=>new fb({color:e,linewidth:sS.minPx,transparent:!0,opacity:n,depthTest:!1,depthWrite:!1,dashed:t,dashSize:1,gapSize:.8,worldUnits:!1}),n=new oS(new aS,t(sS.casing)),r=new oS(new aS,t(sS.walked)),i=new oS(new aS,t(sS.color)),a=new jb(new db,t(sS.casing,{opacity:.85,dashed:!0})),o=new jb(new db,t(sS.color,{dashed:!0}));[a,o,n,r,i].forEach((t,n)=>{t.frustumCulled=!1,t.layers.set(Yd.ROUTES),t.renderOrder=1e4+n,t.visible=!1,e.add(t)});let s=(t,n)=>{let r=document.createElement(`div`);r.className=`marker-anchor`;let i=document.createElement(`div`);i.className=t,i.innerHTML=n,r.appendChild(i);let a=new Vd(r);return a.visible=!1,e.add(a),{obj:a,el:i}},c=s(`nav-me`,`<div class="nav-me-halo"></div><div class="nav-me-cone"></div><div class="nav-me-dot"></div>`),l=s(`nav-dest`,`<svg viewBox="0 0 24 34" aria-hidden="true"><path d="M12 33s11-11.6 11-20A11 11 0 0 0 1 13c0 8.4 11 20 11 20z"/><circle cx="12" cy="12.5" r="4.2"/></svg>`),u=[],d=-1,f=null,p=-1,m=()=>0,h=(e,t)=>Math.max(m(e,t),.3)+sS.lift;function g(e,t,n){let r=[],i=0;for(let a=1;a<e.length;a++){let[o,s]=e[a-1],[c,l]=e[a],u=Math.hypot(c-o,l-s),d=Math.max(1,Math.ceil(u/3));for(let e=0;e<d;e++){let a=o+(c-o)*e/d,f=s+(l-s)*e/d;i+u*e/d>=t-1e-6&&i+u*e/d<=n+1e-6&&r.push([a,h(a,f),f,i+u*e/d])}i+=u}let[a,o]=e.at(-1);return i<=n+1e-6&&r.push([a,h(a,o),o,i]),r}let _=(e,t)=>{e.visible=t.length>=2,e.visible&&(e.geometry.dispose(),e.geometry=new aS().setPositions(t.flatMap(e=>[e[0],e[1],e[2]])),e.computeLineDistances())};function v(e){let t=u.filter(t=>t[3]>=e),a=u.filter(t=>t[3]<=e);if(e>0&&u.length){let n=u.findIndex(t=>t[3]>=e);if(n>0){let r=u[n-1],i=u[n],o=(e-r[3])/(i[3]-r[3]||1),s=[r[0]+(i[0]-r[0])*o,0,r[2]+(i[2]-r[2])*o,e];s[1]=h(s[0],s[2]),t.unshift(s),a.push(s)}}_(i,t),_(n,u),_(r,a)}return{name:`nav-route`,object:e,setRoute(e,t={}){if(t.heightAt&&(m=t.heightAt),d=-1,!e){u=[];for(let e of[n,r,i,a,o])e.visible=!1;l.obj.visible=!1;return}let[s,c]=e.gaps;u=g(e.points,s,e.length-c),u.length<2&&(u=g(e.points,0,e.length)),v(0);let f=[],p=e.points[0],_=e.points.at(-1),y=(e,t)=>[e[0],h(e[0],e[1]),e[1],t[0],h(t[0],t[1]),t[1]];s>.5&&u.length&&f.push(y(p,[u[0][0],u[0][2]])),c>.5&&u.length&&f.push(y([u.at(-1)[0],u.at(-1)[2]],_));for(let[e,t]of[[o,f.length],[a,f.length]])e.visible=!!t,t&&(e.geometry.dispose(),e.geometry=new db().setPositions(f.flat()),e.computeLineDistances());let b=t.destination??{x:_[0],z:_[1]};l.obj.position.set(b.x,h(b.x,b.z)+.5,b.z),l.obj.visible=!0},setWalked(e){!u.length||Math.abs(e-d)<2||(d=e,v(e))},setUser(e){f=e,c.obj.visible=!!e,e&&(c.obj.position.set(e.x,h(e.x,e.z),e.z),c.el.classList.toggle(`is-sim`,!!e.simulated),c.el.classList.toggle(`has-heading`,!!e.heading))},update({pxPerMeter:e,camera:t}){if(e){let t=kt.clamp(sS.worldWidth*e,sS.minPx,sS.maxPx);Math.abs(t-p)>.05&&(p=t,i.material.linewidth=r.material.linewidth=t,n.material.linewidth=t+sS.casingPx,o.material.linewidth=Math.max(3,t*.55),a.material.linewidth=Math.max(3,t*.55)+2.5,o.material.dashScale=a.material.dashScale=e/(t*1.3))}let s=document.documentElement.classList.contains(`gx-night`);if(i.material.color.set(s?sS.night:sS.color),o.material.color.copy(i.material.color),!f||!c.obj.visible)return;let l=f.accuracy?kt.clamp(f.accuracy*2*e,26,260):0;if(c.el.style.setProperty(`--halo`,`${l}px`),f.heading&&t){let e=c.obj.position,n=lS.copy(e).project(t),r=uS.set(e.x+f.heading.dx*10,e.y,e.z+f.heading.dz*10).project(t),i=Math.atan2(r.x-n.x,(r.y-n.y)/t.aspect)*(180/Math.PI);c.el.style.setProperty(`--heading`,`${i.toFixed(1)}deg`)}},dispose(){for(let e of[n,r,i,a,o])e.geometry.dispose(),e.material.dispose();e.traverse(e=>e.element?.remove())}}}var lS=new H,uS=new H,dS=class{constructor(e,{park:t,lang:n,t:r,quality:i=`auto`,timeMode:a=`auto`,debug:o={},onProgress:s=()=>{},onSelect:c=()=>{}}){this.container=e,this.parkDef=t,this.lang=n,this.t=r,this.initialQuality=i,this.timeMode=a,this.nightTarget=+!!rS(a),this.nightProgress=this.nightTarget,this.debug=o,this.onProgress=s,this.onSelect=c,this.timer=new vs,this.selected=null,this.focusedRoute=null,this.labelsDirty=!0,this.paused=!1,this.lastMove=0,this.neighborsStarted=!1,this.onFrame=null,this.onFocus=null,this.onDirections=null,this.onMapTap=null,this.frameHooks=new Set,this.switching=null,this.parkJsons=new Map,this.liteLoads=new Map}parkJson(e){if(!this.parkJsons.has(e)){let t=Ip(e);t.catch(()=>this.parkJsons.delete(e)),this.parkJsons.set(e,t)}return this.parkJsons.get(e)}liteAssets(e){if(!this.liteLoads.has(e)){let t=Lp(e);t.catch(()=>this.liteLoads.delete(e)),this.liteLoads.set(e,t)}return this.liteLoads.get(e)}async load(){let e=await Pp(this.parkDef.key,{reference:this.debug.reference,onProgress:this.onProgress});this.park=e.park,this.parkJsons.set(this.parkDef.key,Promise.resolve(e.park));let t=Fp(e);t&&this.liteLoads.set(this.parkDef.key,Promise.resolve(t));let n=sf(),r=this.initialQuality===`auto`?n:this.initialQuality;this.stage=new ef(this.container,{antialias:r!==`low`}),this.applyNight(this.nightProgress),setInterval(()=>this.updateNightTarget(),6e4),n=sf(cf(this.stage.renderer)),this.world=await Gx(this.stage,this.parkDef,e,{neighbors:this.debug.neighbors!==!1,load:{parkJson:e=>this.parkJson(e),assets:e=>this.liteAssets(e)}});let{heightAt:i,routes:a}=this.world;if(this.routeSlugOf=fS(this.park.routes),this.markers=Qx(this.stage.scene,this.park,{t:this.t,lang:this.lang,heightAt:i,routeSlugOf:this.routeSlugOf,onSelect:e=>this.select(e),onDirections:e=>this.onDirections?.(e)}),this.navLayer=cS(),this.stage.scene.add(this.navLayer.object),this.rig=new rf(this.stage,{clear:this.park.clear,heightAt:i}),this.debug.view){let[e,t,n,r=45,a=0]=this.debug.view,o=kt.degToRad;this.rig.applyView({target:new H(e,i(e,t),t),distance:n,polar:o(r),azimuth:o(a)})}return this.quality=new lf(this.stage,this.world.layers,{adaptive:!this.debug.still,autoLevel:n}),this.quality.onRecompile=()=>this.compileShaders(),this.quality.set(this.initialQuality),this.routes=a,this.bindEvents(),await this.compileShaders(),this}async compileShaders(){this.paused=!0;let{renderer:e,scene:t,camera:n}=this.stage;try{await e.compileAsync(t,n)}finally{this.paused=!1}}bindEvents(){let e=this.stage.renderer.domElement,t=()=>{this.lastMove=performance.now()};this.controls.addEventListener(`start`,t),this.controls.addEventListener(`change`,t);let n=null;e.addEventListener(`pointerdown`,e=>{n=[e.clientX,e.clientY]}),e.addEventListener(`pointerup`,e=>{n&&Math.hypot(e.clientX-n[0],e.clientY-n[1])<5&&!this.onMapTap?.(e)&&this.select(null),n=null}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.select(null)}),window.addEventListener(`resize`,()=>this.resize())}async focusableParks(){return await this.world.neighbors?.cluster??[]}async focusPark(e){let t=e.key,{neighbors:n,basemap:r}=this.world;if(t===this.parkDef.key)return!0;if(this.switching||!n||!(await this.focusableParks()).includes(t))return!1;this.switching=t;let i=null;try{let[a,o]=await Promise.all([this.liteAssets(t),this.parkJson(t)]),s=await Pp(t,{cached:{...a,park:o}});i=await Wx(this.stage,e,s,{detached:!0});let c=await n.prepareFocus({park:o,designArea:i.designArea});if(!c)throw Error(`superseded`);let l=new On;for(let e of i.layers)l.add(e.object);await this.stage.renderer.compileAsync(l,this.stage.camera,this.stage.scene);for(let e of i.layers)l.remove(e.object);return this.swapFocus(e,o,i,c,r,s),!0}catch(e){e.message!==`superseded`&&console.warn(`focus switch:`,e);for(let e of i?.layers??[])e.dispose?.(),Sf(e.object,{keep:await this.keptTextures()});return!1}finally{this.switching=null}}async keptTextures(){let e=new Set;for(let t of this.liteLoads.values()){let n=await t.catch(()=>null);n&&e.add(n.ground).add(n.waterTexture)}return e}swapFocus(e,t,n,r,i,a){let{stage:o}=this,s={layers:this.world.parkLayers,park:this.park,markers:this.markers};for(let e of s.layers)o.scene.remove(e.object);for(let e of n.layers)e.setQuality?.(this.quality.preset),o.addLayer(e);i.setFocus({park:t,designArea:n.designArea}),r();let c=Gb(t.center,s.park.center);for(let e of[o.camera.position,this.controls.target])[e.x,e.z]=c.toWorld(e.x,e.z);o.camera.updateMatrixWorld(),this.parkDef=e,this.park=t,this.parkBuildings=a.buildings,this.parkVegetation=a.vegetationBuffer;let{neighbors:l}=this.world;this.world={...this.world,parkLayers:n.layers,heightAt:n.heightAt,surfaceAt:n.surfaceAt,routes:n.routes,designArea:n.designArea,layers:Kx(n.layers,i,l)},this.quality.layers=this.world.layers,this.routes=n.routes,this.routeSlugOf=fS(t.routes),this.selected=null,this.focusedRoute=null,s.markers.dispose(),this.markers=Qx(o.scene,t,{t:this.t,lang:this.lang,heightAt:n.heightAt,routeSlugOf:this.routeSlugOf,onSelect:e=>this.select(e),onDirections:e=>this.onDirections?.(e)}),this.rig.setPark({clear:t.clear,heightAt:n.heightAt}),this.rig.flyTo({...this.rig.home},1.6),this.lastMove=performance.now(),this.labelsDirty=!0,this.onSelect(null),this.keptTextures().then(e=>{for(let t of s.layers)t.dispose?.(),Sf(t.object,{keep:e})}),this.onFocus?.(t,e)}get controls(){return this.stage.controls}select(e){this.selected=e,this.markers.select(e),this.labelsDirty=!0,this.focusedRoute||this.routes.focus(e?this.routeSlugOf(e):null),this.onSelect(e),e&&this.rig.focusPoint(e.x,e.z)}applyFilter({visible:e,services:t,routeVisibility:n}){this.markers.filter(e),this.markers.showServices(t),n&&this.routes.setVisible(...n),this.labelsDirty=!0}focusRoute(e){if(this.focusedRoute=e,this.routes.focus(e??(this.selected?this.routeSlugOf(this.selected):null)),!e)return;let t=this.routes.bounds(e);t&&!t.isEmpty()&&this.rig.frameBox(t)}zoom(e){this.rig.zoom(e)}resetView(){this.rig.resetView()}toggleTilt(){this.rig.toggleTilt()}setTimeMode(e){this.timeMode=e,this.updateNightTarget()}get night(){return this.nightTarget===1}updateNightTarget(){let e=+!!rS(this.timeMode);e!==this.nightTarget&&(this.nightTarget=e,this.lastMove=performance.now())}applyNight(e){this.stage.setNight(e),Qp(e),document.documentElement.classList.toggle(`gx-night`,e>.5),this.labelsDirty=!0}setQuality(e){this.quality.set(e),this.labelsDirty=!0}setInset(e,t=0){this.stage.setInset(e,t),this.labelsDirty=!0}groundAt(e,t){let{camera:n,renderer:r}=this.stage,i=r.domElement.getBoundingClientRect(),a=new V((e-i.left)/i.width*2-1,-((t-i.top)/i.height)*2+1),o=new Ps;o.setFromCamera(a,n);let{heightAt:s}=this.world,c=s(this.controls.target.x,this.controls.target.z),l=new H;for(let e=0;e<2;e++){if(!o.ray.intersectPlane(new Lr(new H(0,1,0),-c),l))return null;c=Math.max(s(l.x,l.z),0)}return{x:l.x,z:l.z}}wake(){this.lastMove=performance.now()}resize(){this.stage.resize(),this.labelsDirty=!0}renderStats(){let{render:e}=this.stage.renderer.info;return{calls:e.calls,triangles:e.triangles,pixelRatio:this.stage.renderer.getPixelRatio()}}memoryStats(){return vf(this.stage.scene)}start({frames:e=1/0}={}){let t=0,n=-1/0,r=performance.now(),{neighbors:i}=this.world;this.stage.renderer.setAnimationLoop(a=>{if(this.paused)return;let o=a-this.lastMove>2e3?this.quality.preset.idleFps:this.quality.preset.maxFps;if(a-n<1e3/o-3)return;n=a,this.frame(a),t++,i&&!this.neighborsStarted&&t>=2&&(this.neighborsStarted=!0,i.start());let s=this.world.layers.some(e=>e.loading)&&a-r<6e4;t>=e&&!s&&(this.stage.renderer.setAnimationLoop(null),window.__ready=!0)})}frame(e=performance.now()){let{stage:t,rig:n}=this;t.beginFrame(),this.timer.update();let r=Math.min(this.timer.getDelta(),.1),i=this.timer.getElapsed();if(this.nightProgress!==this.nightTarget){let t=r/Kp;this.nightProgress=this.nightTarget>this.nightProgress?Math.min(1,this.nightProgress+t):Math.max(0,this.nightProgress-t),this.applyNight(kt.smoothstep(this.nightProgress,0,1)),this.lastMove=e}if(n.update(r),this.frameHooks.size){let e={t:i,dt:r,pxPerMeter:t.pixelsPerMeter(n.distance)};for(let t of this.frameHooks)t(e)}let a=n.distance;t.updateView(a),t.updateShadows(this.controls.target,a);let o={t:i,dt:r,distance:a,pxPerMeter:t.pixelsPerMeter(a),camera:t.camera,frustum:t.frustum,fovPx:t.fovPx,fogFar:t.scene.fog.far};for(let e of this.world.layers)e.update?.(o);this.navLayer.update(o),t.render(),this.onFrame?.(r);let s=t.cameraMoved();s&&(this.lastMove=e),(s||this.labelsDirty)&&(t.renderLabels(),this.markers.afterRender(),this.labelsDirty=!1),this.quality.adapt(r,e-this.lastMove<500)}};function fS(e){let t=new Map(e.map(e=>[e.name.es,e.slug]));return e=>t.get(e.route?.es)??null}var pS=`gx3d-`;function mS(e,t){try{return localStorage.getItem(pS+e)??t}catch{return t}}function hS(e,t){try{localStorage.setItem(pS+e,t)}catch{}}var gS=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>`;function _S(e,t,{align:n=`start`,label:r}={}){let i=document.createElement(`div`);i.className=`menu menu-${n}`,i.setAttribute(`role`,`menu`),r&&i.setAttribute(`aria-label`,r),i.hidden=!0,e.after(i),e.setAttribute(`aria-haspopup`,`menu`),e.setAttribute(`aria-expanded`,`false`);let a=[],o=()=>[...i.querySelectorAll(`[role^="menuitem"]`)],s=e=>{let t=o();t[(e+t.length)%t.length]?.focus()},c=t=>{!i.contains(t.target)&&!e.contains(t.target)&&u()};function l(n=!1){a=[],i.innerHTML=t().map(e=>`title`in e?`<div class="menu-title" role="presentation">${$(e.title)}</div>`:(a.push(e.onSelect),`<button type="button" role="menuitemradio" aria-checked="${!!e.checked}" data-i="${a.length-1}" tabindex="-1">
            <span>${$(e.label)}</span>${e.checked?gS:``}</button>`)).join(``),i.hidden=!1,e.setAttribute(`aria-expanded`,`true`),document.addEventListener(`pointerdown`,c,!0);let r=o();n&&(r.find(e=>e.getAttribute(`aria-checked`)===`true`)??r[0])?.focus()}function u(t=!1){i.hidden||(i.hidden=!0,e.setAttribute(`aria-expanded`,`false`),document.removeEventListener(`pointerdown`,c,!0),t&&e.focus())}return e.addEventListener(`click`,e=>i.hidden?l(e.detail===0):u()),e.addEventListener(`keydown`,e=>{e.key===`ArrowDown`?(e.preventDefault(),i.hidden?l(!0):s(0)):e.key===`Escape`&&u()}),i.addEventListener(`click`,e=>{let t=e.target.closest(`[data-i]`);t&&(u(!0),a[+t.dataset.i]?.())}),i.addEventListener(`keydown`,e=>{let t=o().indexOf(document.activeElement);if(e.key===`ArrowDown`)s(t+1);else if(e.key===`ArrowUp`)s(t-1);else if(e.key===`Home`)s(0);else if(e.key===`End`)s(-1);else if(e.key===`Escape`)u(!0);else if(e.key===`Tab`)return u();else return;e.preventDefault()}),{open:l,close:u,el:i}}var vS={es:`Español`,en:`English`},yS=[`auto`,`high`,`medium`,`low`],bS={list:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,chevron:`<svg class="tb-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>`,tune:`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M1 4h18M1 10h18M1 16h18"/>
    <circle cx="13.6" cy="4" r="3.1"/><circle cx="6" cy="10" r="3.1"/><circle cx="11" cy="16" r="3.1"/></svg>`};function xS(e,{park:t,lang:n,t:r,hours:i,quality:a,onNavigate:o,onMenu:s,onQuality:c,timeMode:l,onTimeMode:u}){let d=Cp[t]?.name??t,f=i?`${i.open} – ${i.close}`:``,p=document.createElement(`header`);p.className=`topbar`,p.innerHTML=`
    ${s?`<button type="button" class="tb-round tb-list" aria-label="${$(r(`activityList`))}" aria-pressed="false">${bS.list}</button>`:``}
    <div class="tb-anchor tb-park">
      <button type="button" class="tb-pill" aria-label="${$(`${d}${i?`, ${r(`parkHours`)} ${f}`:``}. ${r(`parkSwitcher`)}`)}">
        <span class="tb-title">${$(d)}</span>
        ${i?`<span class="tb-dot" aria-hidden="true"></span><span class="tb-hours">${$(f)}</span>`:``}
        ${bS.chevron}
      </button>
    </div>
    <div class="tb-anchor tb-settings">
      <button type="button" class="tb-round" aria-label="${$(r(`settings`))}">${bS.tune}</button>
    </div>`,e.appendChild(p);let m=p.querySelector(`.tb-list`);m?.addEventListener(`click`,()=>s()),_S(p.querySelector(`.tb-pill`),()=>wp.map(e=>Cp[e]).map(e=>({label:e.name,checked:e.key===t,onSelect:()=>e.key!==t&&o(e.key,n)})),{label:r(`parkSwitcher`)});let h=a,g=l;return _S(p.querySelector(`.tb-settings button`),()=>[{title:r(`language`)},...Ep.map(e=>({label:vS[e]??e.toUpperCase(),checked:e===n,onSelect:()=>e!==n&&o(t,e)})),...c?[{title:r(`quality`)},...yS.map(e=>({label:r(`q_`+e),checked:e===h,onSelect:()=>{h=e,c(e)}}))]:[],...u?[{title:r(`timeOfDay`)},...eS.map(e=>({label:r(`time_`+e),checked:e===g,onSelect:()=>{g=e,u(e)}}))]:[]],{align:`end`,label:r(`settings`)}),{el:p,remove:()=>p.remove(),setListOpen(e){m?.setAttribute(`aria-pressed`,String(e))}}}var SS=`America/Cancun`;function CS(){let e=new Intl.DateTimeFormat(`en-GB`,{timeZone:SS,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(new Date),t=+e.find(e=>e.type===`hour`).value,n=+e.find(e=>e.type===`minute`).value;return t%24*60+n}var wS=e=>{let[t,n]=e.split(`:`).map(Number);return t*60+n};function TS(e){let t=/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/.exec(e??``);if(!t)return null;let n=CS(),r=wS(t[1]),i=wS(t[2]);return{open:n>=r&&n<i,from:t[1],to:t[2]}}function ES(e,{t,L:n,categoryOf:r}){let i=Xx[r(e)],a=e.hours?TS(e.hours):null;return`<li class="poi-item"><button class="poi-row" data-poi="${e.id}">
      <span class="num${e.extraCost?` is-extra`:``}">${e.number}</span>
      <span class="nm">${$(n(e.name))}<small>${i?`<i style="--c:${i.color}"></i>`:``}${$(n(e.category))}${e.hours?` · ${$(e.hours)}`:``}</small></span>
      ${e.extraCost?`<span class="tag" title="${t(`extra`)}">$</span>`:``}
      ${a?`<span class="dot ${a.open?`is-open`:``}" title="${a.open?t(`open`):t(`closed`)}"></span>`:``}
    </button>${DS(e,{t,L:n})}</li>`}function DS(e,{t,L:n}){return`<button class="poi-go" data-go="${e.id}" title="${$(`${t(`nav_goTo`)} ${n(e.name)}`)}" aria-label="${$(`${t(`nav_goTo`)} ${n(e.name)}`)}">${Jx.directions}<span>${$(t(`nav_go`))}</span></button>`}function OS(e,t,{onFocus:n,onVisibility:r}){let{park:i,pois:a,t:o,L:s,slugOf:c}=t;e.innerHTML=`<p class="sb-hint">${o(`routesHint`)}</p>`+i.routes.map(e=>{let n=a.filter(t=>c(t)===e.slug).sort((e,t)=>e.number-t.number);return`<div class="route-card" data-slug="${e.slug}" style="--c:${e.color};--k:${e.casing}">
      <div class="route-head">
        <button class="route-toggle" aria-expanded="false">
          <span class="route-swatch"></span>
          <span class="route-name">${$(s(e.name))}<small>${$(s(e.label))} · ${n.length} ${o(`activities`)}</small></span>
          <span class="chev">${Jx.chevron}</span>
        </button>
        <button class="route-eye" role="switch" aria-checked="true" title="${o(`hideAll`)}">${Jx.eye}</button>
      </div>
      <ol class="route-list" hidden>${n.map(e=>ES(e,t)).join(``)}</ol>
    </div>`}).join(``);let l=[...e.querySelectorAll(`.route-card`)],u=new Map(i.routes.map(e=>[e.slug,!0]));function d(e,t){let n=e.dataset.slug;u.set(n,t);let i=e.querySelector(`.route-eye`);i.setAttribute(`aria-checked`,String(t)),i.innerHTML=t?Jx.eye:Jx.eyeOff,e.classList.toggle(`off`,!t),r(n,t)}for(let e of l){let t=e.dataset.slug,r=e.querySelector(`.route-toggle`),i=e.querySelector(`.route-list`);r.addEventListener(`click`,()=>{let a=r.getAttribute(`aria-expanded`)!==`true`;for(let e of l)e.querySelector(`.route-toggle`).setAttribute(`aria-expanded`,`false`),e.querySelector(`.route-list`).hidden=!0,e.classList.remove(`focused`);r.setAttribute(`aria-expanded`,String(a)),i.hidden=!a,e.classList.toggle(`focused`,a),a&&!u.get(t)&&d(e,!0),n(a?t:null)}),e.querySelector(`.route-eye`).addEventListener(`click`,()=>d(e,!u.get(t)))}return{isVisible:e=>u.get(e)}}function kS(e,t,{onCategory:n,onService:r}){let{park:i,pois:a,t:o,L:s,categoryOf:c}=t,l=new Map;for(let e of a)l.set(c(e),(l.get(c(e))??0)+1);let u=new Map(a.map(e=>[c(e),s(e.category)||c(e)])),d=new Map;for(let e of i.services??[])d.set(e.type,(d.get(e.type)??0)+1);let f=(e,t,n,r,i,a)=>`<li><label class="toggle" style="--c:${n.color}"><input type="checkbox" ${e}="${$(t)}"${a?` checked`:``}><span class="ic">${n.icon}</span><span class="tl">${$(r)}</span><span class="ct">${i}</span><span class="sw"></span></label></li>`;e.innerHTML=`
    <div class="sb-row"><h3>${o(`categories`)}</h3><span><button class="link" data-all="1">${o(`showAll`)}</button> · <button class="link" data-all="0">${o(`hideAll`)}</button></span></div>
    <ul class="toggles">${[...l.keys()].map(e=>f(`data-cat`,e,Xx[e]??{icon:Jx.pin,color:`#64748b`},u.get(e),l.get(e),!1)).join(``)}</ul>
    ${d.size?`<div class="sb-row"><h3>${o(`services`)}</h3></div>
    <ul class="toggles">${Object.entries(Yx).filter(([e])=>d.has(e)).map(([e,t])=>f(`data-svc`,e,t,s(t.label),d.get(e),!1)).join(``)}</ul>`:``}`,e.addEventListener(`change`,e=>{let t=e.target;t.dataset.cat&&n(t.dataset.cat,t.checked),t.dataset.svc&&r(t.dataset.svc,t.checked)}),e.addEventListener(`click`,t=>{let r=t.target.closest(`[data-all]`);if(!r)return;let i=r.dataset.all===`1`;e.querySelectorAll(`[data-cat]`).forEach(e=>{e.checked=i}),n(null,i)})}function AS(e,t){let{park:n,pois:r,t:i,L:a,categoryOf:o,parkState:s}=t,c=r.filter(e=>e.hours).sort((e,t)=>e.number-t.number),l=r.filter(e=>o(e)===`Presentaciones`).sort((e,t)=>e.number-t.number),u=e=>`<em class="${e.open?`is-open`:`is-closed`}">${e.open?i(`open`):i(`closed`)}</em>`;e.innerHTML=`
    ${n.hours?`<div class="park-hours">${Jx.sun}<div><b>${$(n.name)}</b><span>${n.hours.open} – ${n.hours.close}</span></div>${s?u(s):``}</div>`:``}
    ${c.length?`<h3>${i(`restaurants`)}</h3><ul class="hours-list">${c.map(e=>{let n=TS(e.hours);return`<li class="poi-item"><button class="poi-row" data-poi="${e.id}"><span class="num${e.extraCost?` is-extra`:``}">${e.number}</span><span class="nm">${$(a(e.name))}<small>${$(e.desc??``)}${e.seasonal?` · ${i(`seasonal`)}`:``}</small></span><span class="hr"><b>${$(e.hours)}</b>${n?u(n):``}</span></button>${DS(e,t)}</li>`}).join(``)}</ul>`:``}
    ${l.length?`<h3>${i(`shows`)}</h3><ul class="hours-list">${l.map(e=>ES(e,t)).join(``)}</ul>`:``}`}function jS(e,{park:t,lang:n,t:r,onSelect:i,onFilter:a,onFocusRoute:o,onDirections:s,onAbout:c}){let l=e=>Op(e,n),u=t.pois.filter(e=>e.active),d=e=>e.category.es??`Otros`,f=new Map(t.routes.map(e=>[e.name.es,e.slug])),p=e=>f.get(e.route.es)??null,m=t.hours?TS(`${t.hours.open}-${t.hours.close}`):null,h={park:t,pois:u,t:r,L:l,categoryOf:d,slugOf:p,parkState:m},g={categories:new Map(u.map(e=>[d(e),!1])),services:new Set,focus:null,search:``},_=document.createElement(`aside`);_.className=`sidebar`,_.setAttribute(`aria-label`,t.name),_.innerHTML=`
    <div class="sb-handle" aria-hidden="true"></div>
    <div class="sb-head">
      <div class="sb-title">
        <h2>${$(t.name)}</h2>
        ${m?`<span class="sb-status ${m.open?`is-open`:`is-closed`}">${m.open?`${r(`open`)} · ${r(`closesAt`)} ${m.to}`:`${r(`closed`)} · ${r(`opensAt`)} ${m.from}`}</span>`:``}
      </div>
      ${t.hours?`<p class="sb-hours">${Jx.clock}<span>${r(`parkHours`)}: <b>${t.hours.open} – ${t.hours.close}</b></span></p>`:``}
      <label class="sb-search">${Jx.search}<input type="search" placeholder="${r(`search`)}" autocomplete="off"><button class="sb-clear" aria-label="${r(`close`)}" hidden>${Jx.close}</button></label>
    </div>
    <nav class="sb-tabs" role="tablist">
      <button role="tab" data-tab="routes" aria-selected="true">${Jx.route}${r(`tabRoutes`)}</button>
      <button role="tab" data-tab="places" aria-selected="false">${Jx.layers}${r(`tabPlaces`)}</button>
      <button role="tab" data-tab="hours" aria-selected="false">${Jx.clock}${r(`tabHours`)}</button>
    </nav>
    <div class="sb-body">
      <section class="sb-pane" data-pane="results" hidden></section>
      <section class="sb-pane" data-pane="routes"></section>
      <section class="sb-pane" data-pane="places" hidden></section>
      <section class="sb-pane" data-pane="hours" hidden></section>
    </div>
    <footer class="sb-foot">
      ${c?`<button type="button" class="disclaimer-link" data-about>${r(`disclaimerLink`)}</button>`:``}
      <small>${r(`credits`)}</small>
    </footer>`,e.appendChild(_);let v=e=>_.querySelector(`[data-pane="${e}"]`);_.querySelector(`[data-about]`)?.addEventListener(`click`,()=>c());let y=null,b=e=>{let t=Zx(g.search);return Zx(`${e.number} ${e.name.es} ${e.name.en} ${e.category.es} ${e.route.es??``} ${e.desc??``}`).includes(t)},x=(e,t=p(e))=>t&&!y.isVisible(t)?!1:g.search?b(e):g.focus?t===g.focus:g.categories.get(d(e)),S=(e={})=>a({visible:x,services:g.services,...e});y=OS(v(`routes`),h,{onFocus(e){g.focus=e,o(e),S()},onVisibility(e,t){S({routeVisibility:[e,t]})}}),kS(v(`places`),h,{onCategory(e,t){if(e===null)for(let e of g.categories.keys())g.categories.set(e,t);else g.categories.set(e,t);S()},onService(e,t){t?g.services.add(e):g.services.delete(e),S()}}),AS(v(`hours`),h);let C=[..._.querySelectorAll(`.sb-pane`)],w=[..._.querySelectorAll(`[data-tab]`)],T=`routes`,E=e=>{for(let t of C)t.hidden=t.dataset.pane!==e};for(let e of w)e.addEventListener(`click`,()=>{T=e.dataset.tab;for(let t of w)t.setAttribute(`aria-selected`,String(t===e));g.search||E(T)});_.addEventListener(`click`,e=>{let t=e.target.closest(`[data-go]`);if(t){let e=u.find(e=>e.id===t.dataset.go);e&&s?.(e),matchMedia(`(max-width: 640px)`).matches&&_.classList.remove(`expanded`);return}let n=e.target.closest(`[data-poi]`);if(!n)return;let r=u.find(e=>e.id===n.dataset.poi);r&&i(r),matchMedia(`(max-width: 640px)`).matches&&_.classList.remove(`expanded`)});let D=_.querySelector(`.sb-search input`),O=_.querySelector(`.sb-clear`),k=v(`results`);return D.addEventListener(`input`,()=>{if(g.search=D.value.trim(),O.hidden=!g.search,g.search){let e=u.filter(e=>x(e)).sort((e,t)=>e.number-t.number);k.innerHTML=e.length?`<p class="sb-hint">${e.length} ${r(`results`)}</p><ul class="hours-list">${e.map(e=>ES(e,h)).join(``)}</ul>`:`<p class="sb-empty">${r(`noResults`)}</p>`,E(`results`)}else E(T);S()}),O.addEventListener(`click`,e=>{e.preventDefault(),D.value=``,D.dispatchEvent(new Event(`input`)),D.focus()}),_.querySelector(`.sb-handle`).addEventListener(`click`,()=>_.classList.toggle(`expanded`)),D.addEventListener(`focus`,()=>_.classList.add(`expanded`)),S(),{el:_,toggle(e){_.classList.toggle(`collapsed`,e===void 0?!_.classList.contains(`collapsed`):!e)},highlight(e){_.querySelectorAll(`.poi-row.active`).forEach(e=>e.classList.remove(`active`)),e&&_.querySelectorAll(`[data-poi="${e.id}"]`).forEach(e=>e.classList.add(`active`))}}}var MS={plus:`<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,minus:`<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>`,compass:`<svg viewBox="0 0 24 24"><path d="M12 3l3.5 9L12 21l-3.5-9z" fill="currentColor" stroke="none" opacity=".35"/><path d="M12 3l3.5 9h-7z" fill="#f08a24" stroke="none"/></svg>`,tilt:`<svg viewBox="0 0 24 24"><path d="M4 17l8-4 8 4-8 4z"/><path d="M12 3v10"/></svg>`};function NS(e,t,n){let r=document.createElement(`div`);r.className=`map-tools`;let i=(e,t,r,i=``)=>`<button data-act="${e}" title="${n(t)}" aria-label="${n(t)}"${i?` class="${i}"`:``}>${r}</button>`;r.innerHTML=[`<div class="zoom-pair">${i(`in`,`zoomIn`,MS.plus)}${i(`out`,`zoomOut`,MS.minus)}</div>`,i(`tilt`,`toggleTilt`,MS.tilt),i(`reset`,`resetView`,MS.compass,`compass`)].join(``);let a={in:()=>t.zoom(.6),out:()=>t.zoom(1.6),tilt:()=>t.toggleTilt(),reset:()=>t.resetView()};r.addEventListener(`click`,e=>a[e.target.closest(`button`)?.dataset.act]?.()),e.appendChild(r);let o=r.querySelector(`.compass svg`);return t.controls.addEventListener(`change`,()=>{o.style.transform=`rotate(${-t.controls.getAzimuthalAngle()}rad)`}),r}function PS(e,t){let n=document.createElement(`div`);return n.className=`map-attribution`,n.innerHTML=`<a href="${$(tx.attributionUrl)}" target="_blank" rel="noopener">${$(Op(tx.attribution,t))}</a>`,e.appendChild(n),n}function FS(e,t){let n=document.createElement(`div`);n.className=`loader`,n.innerHTML=`<div class="loader-ring"></div><p>${t(`loading`)}</p><div class="loader-bar"><span></span></div>`,e.appendChild(n);let r=n.querySelector(`.loader-bar span`);return{progress(e){r.style.width=`${Math.round(e*100)}%`},done(){n.classList.add(`done`),setTimeout(()=>n.remove(),600)},fail(e){n.innerHTML=`<p class="loader-error">${e}</p>`}}}var IS=`1`,LS=`disclaimer-seen`,RS=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/></svg>`;function zS(e,t){let n=document.createElement(`dialog`);n.className=`disclaimer`,n.setAttribute(`aria-labelledby`,`disclaimer-title`),n.setAttribute(`aria-describedby`,`disclaimer-body`),e.appendChild(n);let r=()=>{hS(LS,IS),n.classList.add(`closing`),setTimeout(()=>{n.classList.remove(`closing`),n.close()},180)};return n.addEventListener(`cancel`,e=>{e.preventDefault(),r()}),n.addEventListener(`click`,e=>{(e.target.closest(`[data-ok]`)||e.target===n)&&r()}),{open({force:e=!1}={}){if(n.open||!e&&mS(LS,``)===IS)return;let r=t();n.innerHTML=`
        <div class="disclaimer-card">
          <div class="disclaimer-icon">${RS}</div>
          <p class="disclaimer-eyebrow">${$(r(`disclaimerEyebrow`))}</p>
          <h2 id="disclaimer-title">${$(r(`disclaimerTitle`))}</h2>
          <div id="disclaimer-body" class="disclaimer-body">
            <p>${$(r(`disclaimerBody`))}</p>
            <p>${$(r(`disclaimerData`))}</p>
          </div>
          <p class="disclaimer-official">${$(r(`disclaimerOfficial`))}
            <a href="https://www.xcaret.com" target="_blank" rel="noopener">xcaret.com</a></p>
          <button type="button" class="disclaimer-ok" data-ok>${$(r(`disclaimerOk`))}</button>
          <p class="disclaimer-fine">${$(r(`disclaimerTrademarks`))}</p>
        </div>`,n.showModal(),n.querySelector(`[data-ok]`).focus()}}}function BS(e,t){let n=document.createElement(`div`);n.className=`stats`,e.appendChild(n);let r=0,i=0,a=``,o=0;return t.onFrame=e=>{if(r+=e,i++,r<.5)return;let{calls:s,triangles:c,pixelRatio:l}=t.renderStats();if(performance.now()-o>2e3){let e=t.memoryStats();a=` · ~${Math.round((e.geometry+e.texture)/1e6)} MB GPU`,o=performance.now()}n.textContent=`${Math.round(i/r)} fps · ${s} draws · ${(c/1e6).toFixed(2)}M tris · px ${l}${a}`,r=0,i=0},n}var VS={snap:4,link:6,linkStep:20,deadEnd:25,bridge:30,reach:60,speed:1.25,weights:{route:.95,walkway:1,link:1.15,bridge:1.4}},HS=25;function US(e,t={}){let n={...VS,...t},r=new GS,i=0,a=[];for(let t of e.walkways??[]){let e=i++,n=t.map(([e,t])=>r.node(e,t));for(let t=1;t<n.length;t++)r.edge(n[t-1],n[t],`walkway`,e);n.length>1&&a.push({id:e,first:n[0],last:n.at(-1)})}let o=[];for(let t of e.routes??[])for(let e of t.lines??[]){let t=i++,n=e.map(([e,t])=>r.node(e,t));for(let e=1;e<n.length;e++)r.edge(n[e-1],n[e],`route`,t);n.length>1&&o.push({id:t,first:n[0],last:n.at(-1)})}for(let e of[...a,...o])for(let t of[e.first,e.last]){if(r.degree(t)!==1)continue;let i=r.nearest(r.x[t],r.z[t],n.snap,n=>n.line!==e.id&&n.a!==t&&n.b!==t);if(!i)continue;let a=r.split(i);a!==t&&r.edge(t,a,r.edges[i.e].kind,e.id)}if(a.length)for(let e of o){let t=r.samplesAlong(e.id,n.linkStep);for(let e of t){let t=r.nearest(e.x,e.z,n.link,e=>e.kind===`walkway`);if(!t)continue;let i=r.split(e),a=r.split(t);i!==a&&!r.connected(i,a)&&r.edge(i,a,`link`,-1)}}for(let e=0;e<r.x.length;e++){if(r.degree(e)!==1)continue;let t=r.within(e,WS*n.deadEnd+30),i=r.nearest(r.x[e],r.z[e],n.deadEnd,n=>{let i=t.get(n.a)??1/0,a=t.get(n.b)??1/0;return Math.min(i,a)>WS*Math.hypot(r.x[n.a]-r.x[e],r.z[n.a]-r.z[e])+30});if(!i)continue;let a=r.split(i);r.edge(e,a,`bridge`,-1)}return YS(r,n)}var WS=3,GS=class{constructor(){this.x=[],this.z=[],this.keys=new Map,this.edges=[],this.inc=[],this.grid=new Map}node(e,t){let n=`${e},${t}`,r=this.keys.get(n);return r===void 0&&(r=this.x.length,this.x.push(e),this.z.push(t),this.inc.push([]),this.keys.set(n,r)),r}edge(e,t,n,r){if(e===t)return-1;let i=Math.hypot(this.x[t]-this.x[e],this.z[t]-this.z[e]),a=this.edges.length;return this.edges.push({a:e,b:t,kind:n,len:i,line:r,dead:!1}),this.inc[e].push(a),this.inc[t].push(a),KS(this.grid,a,this.x[e],this.z[e],this.x[t],this.z[t]),a}within(e,t){let n=new Map([[e,0]]),r=new eC;for(r.push(0,e);r.size;){let e=r.pop(),i=n.get(e);for(let a of this.inc[e]){let o=this.edges[a];if(o.dead)continue;let s=o.a===e?o.b:o.a,c=i+o.len;c<=t&&c<(n.get(s)??1/0)&&(n.set(s,c),r.push(c,s))}}return n}degree(e){return this.inc[e].filter(e=>!this.edges[e].dead).length}connected(e,t){return this.inc[e].some(e=>!this.edges[e].dead&&(this.edges[e].a===t||this.edges[e].b===t))}nearest(e,t,n,r=()=>!0){return qS(this.grid,this.edges,this.x,this.z,e,t,n,e=>!e.dead&&r(e))}split({e,t}){let n=this.edges[e];if(t*n.len<.05)return n.a;if((1-t)*n.len<.05)return n.b;let r=this.x[n.a]+(this.x[n.b]-this.x[n.a])*t,i=this.z[n.a]+(this.z[n.b]-this.z[n.a])*t,a=this.node(r,i);return n.dead=!0,this.edge(n.a,a,n.kind,n.line),this.edge(a,n.b,n.kind,n.line),a}samplesAlong(e,t){let n=[],r=this.edges.map((e,t)=>[e,t]).filter(([t])=>!t.dead&&t.line===e);if(!r.length)return n;let i=new Map;for(let[e,t]of r)for(let n of[e.a,e.b])i.has(n)||i.set(n,[]),i.get(n).push(t);let a=[...i.keys()].find(e=>i.get(e).length===1)??r[0][0].a,o=new Set,s=a,c=0,l=0;for(;;){let e=i.get(s).find(e=>!o.has(e));if(e===void 0)break;o.add(e);let r=this.edges[e],a=r.a===s;for(;l<=c+r.len;){let i=(l-c)/r.len,o=a?i:1-i;n.push({e,t:o,x:this.x[r.a]+(this.x[r.b]-this.x[r.a])*o,z:this.z[r.a]+(this.z[r.b]-this.z[r.a])*o}),l+=t}c+=r.len,s=a?r.b:r.a}let u=this.edges[[...o].at(-1)].a===s?0:1;return n.push({e:[...o].at(-1),t:u,x:this.x[s],z:this.z[s]}),n.map(e=>this.live(e))}live(e){let t=this;return{x:e.x,z:e.z,get e(){return t.resolve(e).e},get t(){return t.resolve(e).t}}}resolve(e){if(!this.edges[e.e].dead)return e;let t=this.edges[e.e].line,n=this.nearest(e.x,e.z,.5,e=>e.line===t);return n&&(e.e=n.e,e.t=n.t),e}};function KS(e,t,n,r,i,a){let o=Math.floor(Math.min(n,i)/HS),s=Math.floor(Math.max(n,i)/HS),c=Math.floor(Math.min(r,a)/HS),l=Math.floor(Math.max(r,a)/HS);for(let n=o;n<=s;n++)for(let r=c;r<=l;r++){let i=`${n},${r}`,a=e.get(i);a||e.set(i,a=[]),a.push(t)}}function qS(e,t,n,r,i,a,o,s){let c=null,l=Math.floor(i/HS),u=Math.floor(a/HS),d=new Set,f=Math.ceil(o/HS)+1;for(let p=0;p<=f&&!(c&&c.d<(p-1)*HS);p++)for(let f=l-p;f<=l+p;f++)for(let m=u-p;m<=u+p;m++)if(Math.max(Math.abs(f-l),Math.abs(m-u))===p)for(let l of e.get(`${f},${m}`)??[]){if(d.has(l))continue;d.add(l);let e=t[l];if(!s(e,l))continue;let u=JS(i,a,n[e.a],r[e.a],n[e.b],r[e.b]);u.d<=o&&(!c||u.d<c.d)&&(c={e:l,...u})}return c}function JS(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s,l=c?Math.max(0,Math.min(1,((e-n)*o+(t-r)*s)/c)):0,u=n+o*l,d=r+s*l;return{t:l,x:u,z:d,d:Math.hypot(e-u,t-d)}}function YS(e,t){let n=e.edges.filter(e=>!e.dead),r=new Set;for(let e of n)r.add(e.a).add(e.b);let i=new Map,a=[],o=[];for(let t=0;t<e.x.length;t++)r.has(t)&&(i.set(t,a.length),a.push(e.x[t]),o.push(e.z[t]));let s=n.map(e=>({a:i.get(e.a),b:i.get(e.b),kind:e.kind,len:e.len})),c=XS(a.length);for(let e of s)c.union(e.a,e.b);let l=new Map;for(let e=0;e<a.length;e++){let n=`${Math.floor(a[e]/t.bridge)},${Math.floor(o[e]/t.bridge)}`;l.has(n)||l.set(n,[]),l.get(n).push(e)}let u=new Map;for(let e=0;e<a.length;e++){let n=Math.floor(a[e]/t.bridge),r=Math.floor(o[e]/t.bridge),i=c.find(e);for(let s=n-1;s<=n+1;s++)for(let n=r-1;n<=r+1;n++)for(let r of l.get(`${s},${n}`)??[]){if(r<=e)continue;let n=c.find(r);if(n===i)continue;let s=Math.hypot(a[r]-a[e],o[r]-o[e]);if(s>t.bridge)continue;let l=i<n?`${i},${n}`:`${n},${i}`,d=u.get(l);(!d||s<d[0])&&u.set(l,[s,e,r])}}let d=0;for(let[e,t,n]of[...u.values()].sort((e,t)=>e[0]-t[0]))c.find(t)!==c.find(n)&&(c.union(t,n),s.push({a:t,b:n,kind:`bridge`,len:e}),d++);let f=a.map(()=>[]),p=new Map;s.forEach((e,t)=>{f[e.a].push([t,e.b]),f[e.b].push([t,e.a]),KS(p,t,a[e.a],o[e.a],a[e.b],o[e.b])});let m=new Map,h=a.map((e,t)=>{let n=c.find(t);return m.has(n)||m.set(n,m.size),m.get(n)}),g=Array(m.size).fill(0);for(let e of h)g[e]++;return{x:a,z:o,edges:s,adj:f,comp:h,compSize:g,grid:p,weights:t.weights,reach:t.reach,stats:{nodes:a.length,edges:s.length,components:m.size,bridges:d,length:s.reduce((e,t)=>e+(t.kind===`link`||t.kind===`bridge`?0:t.len),0)}}}function XS(e){let t=Array.from({length:e},(e,t)=>t),n=e=>{for(;t[e]!==e;)e=t[e]=t[t[e]];return e};return{find:n,union(e,r){let i=n(e),a=n(r);i!==a&&(t[Math.max(i,a)]=Math.min(i,a))}}}function ZS(e,t,n,{max:r=1/0,comp:i}={}){if(!e.edges.length)return null;let a=i===void 0?()=>!0:t=>e.comp[t.a]===i;for(let i=50;;i*=4){let o=Math.min(i,r),s=qS(e.grid,e.edges,e.x,e.z,t,n,o,a);if(s)return{...s,comp:e.comp[e.edges[s.e].a]};if(o>=r||i>1e5)return null}}function QS(e,t,n,{t:r,landmarks:i=[]}={}){let a=(e,t,a,o)=>{let s=rC(e);return{points:s,length:iC(s),steps:dC(s,{t:r,landmarks:i,name:n.name,isJunction:o}),gaps:t,direct:a}},o=()=>a([[t.x,t.z],[n.x,n.z]],[0,0],!0),s=ZS(e,t.x,t.z),c=ZS(e,n.x,n.z);if(!s||!c||(s.comp!==c.comp&&(e.compSize[s.comp]>=e.compSize[c.comp]?c=ZS(e,n.x,n.z,{comp:s.comp}):s=ZS(e,t.x,t.z,{comp:c.comp})),Math.hypot(n.x-t.x,n.z-t.z)<=s.d+c.d))return o();let l=$S(e,s,c);if(!l)return o();let u=nC([[s.x,s.z],...l.map(t=>[e.x[t],e.z[t]]),[c.x,c.z]]),d=[[t.x,t.z],...u,[n.x,n.z]],f=new Set([`${s.x},${s.z}`,`${c.x},${c.z}`]);for(let t of l)e.adj[t].length>=3&&f.add(`${e.x[t]},${e.z[t]}`);return a(d,[s.d,c.d],!1,(e,t)=>f.has(`${e},${t}`))}function $S(e,t,n){let{x:r,z:i,edges:a,adj:o,weights:s}=e,c=r.length,l=c,u=c+1,d=a[t.e],f=a[n.e],p=e=>s[e.kind]??1,m=Math.min(...Object.values(s)),h=e=>e===u?0:Math.hypot((e===l?t.x:r[e])-n.x,(e===l?t.z:i[e])-n.z)*m,g=e=>{let r=[];if(e===l)return r.push([d.a,t.t*d.len*p(d)],[d.b,(1-t.t)*d.len*p(d)]),t.e===n.e&&r.push([u,Math.abs(t.t-n.t)*d.len*p(d)]),r;for(let[t,n]of o[e])r.push([n,a[t].len*p(a[t])]);return e===f.a&&r.push([u,n.t*f.len*p(f)]),e===f.b&&r.push([u,(1-n.t)*f.len*p(f)]),r},_=new Float64Array(c+2).fill(1/0),v=new Int32Array(c+2).fill(-1),y=new Uint8Array(c+2);_[l]=0;let b=new eC;for(b.push(h(l),l);b.size;){let e=b.pop();if(!y[e]){if(e===u)break;y[e]=1;for(let[t,n]of g(e)){let r=_[e]+n;r<_[t]&&(_[t]=r,v[t]=e,b.push(r+h(t),t))}}}if(_[u]===1/0)return null;let x=[];for(let e=v[u];e!==l&&e!==-1;e=v[e])x.push(e);return x.reverse()}var eC=class{constructor(){this.k=[],this.v=[]}get size(){return this.k.length}push(e,t){let{k:n,v:r}=this,i=n.length;for(n.push(e),r.push(t);i>0;){let t=i-1>>1;if(n[t]<=e)break;n[i]=n[t],r[i]=r[t],i=t}n[i]=e,r[i]=t}pop(){let{k:e,v:t}=this,n=t[0],r=e.pop(),i=t.pop();if(e.length){let n=0;for(;;){let i=2*n+1;if(i>=e.length||(i+1<e.length&&e[i+1]<e[i]&&i++,e[i]>=r))break;e[n]=e[i],t[n]=t[i],n=i}e[n]=r,t[n]=i}return n}},tC={across:8,lookahead:120};function nC(e){let t=[],n=0;for(;n<e.length;){t.push(e[n]);let r=0,i=-1;for(let t=n+1;t<e.length&&r<tC.lookahead;t++){r+=Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]);let a=Math.hypot(e[t][0]-e[n][0],e[t][1]-e[n][1]);a<tC.across&&r>3*a+10&&(i=t)}n=i>0?i:n+1}return t}function rC(e){let t=[];for(let n of e){let e=t.at(-1);(!e||Math.hypot(n[0]-e[0],n[1]-e[1])>.05)&&t.push(n)}return t.length===1&&t.push([...t[0]]),t}function iC(e){let t=0;for(let n=1;n<e.length;n++)t+=Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]);return t}function aC(e){let t=[0];for(let n=1;n<e.length;n++)t.push(t[n-1]+Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]));return t}function oC(e,t,n){let r=t.at(-1);n=Math.max(0,Math.min(r,n));let i=1,a=e.length-1;for(;i<a;){let e=i+a>>1;t[e]<n?i=e+1:a=e}let o=i,[s,c]=e[o-1],[l,u]=e[o],d=t[o]-t[o-1]||1,f=(n-t[o-1])/d;return{x:s+(l-s)*f,z:c+(u-c)*f,dx:(l-s)/d,dz:(u-c)/d,i:o}}var sC={min:35,bend:100,slight:60,window:10,merge:18,landmark:30},cC=[`n`,`ne`,`e`,`se`,`s`,`sw`,`w`,`nw`];function lC(e,t){let n=Math.atan2(e,-t)*180/Math.PI;return cC[(Math.round(n/45)%8+8)%8]}function uC(e,t,n,r){let i=e*r-t*n,a=e*n+t*r;return Math.atan2(i,a)*180/Math.PI}function dC(e,{t=e=>e,landmarks:n=[],name:r,isJunction:i=()=>!0}={}){let a=aC(e),o=a.at(-1),s=[];for(let t=1;t<e.length-1;t++){let n=a[t];if(n<sC.window*.8||o-n<sC.window*.8)continue;let r=oC(e,a,n-sC.window),c=oC(e,a,n+sC.window),[l,u]=e[t],d=l-r.x,f=u-r.z,p=c.x-l,m=c.z-u;if(Math.hypot(d,f)<1||Math.hypot(p,m)<1)continue;let h=uC(d,f,p,m);Math.abs(h)>(i(l,u)?sC.min:sC.bend)&&s.push({s:n,angle:h,at:[l,u]})}let c=[];for(let e of[...s].sort((e,t)=>Math.abs(t.angle)-Math.abs(e.angle)))c.every(t=>Math.abs(t.s-e.s)>sC.merge)&&c.push(e);c.sort((e,t)=>e.s-t.s);let l=(e,t)=>{let r=null;for(let i of n){let n=Math.hypot(i.x-e,i.z-t);n<=sC.landmark&&(!r||n<r.d)&&(r={d:n,name:i.name})}return r?.name},u=oC(e,a,Math.min(o,sC.window)),d=e[0],f=u.x-d[0],p=u.z-d[1],m=[{turn:`straight`,along:0,at:[...d],dir:lC(f||u.dx,p||u.dz)}];for(let e of c){let t=l(...e.at);t&&m.at(-1).near===t&&(t=void 0),m.push({turn:e.angle>0?`right`:`left`,slight:Math.abs(e.angle)<sC.slight,along:e.s,at:e.at,near:t})}m.push({turn:`arrive`,along:o,at:[...e.at(-1)],near:r});for(let e=0;e<m.length;e++)m[e].distance=e+1<m.length?m[e+1].along-m[e].along:0,m[e].instruction=fC(m[e],t);return m}function fC(e,t=e=>e){let n=(e,t)=>e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``);if(e.turn===`straight`)return n(t(`nav_head`),{dir:t(`nav_dir_${e.dir}`)});if(e.turn===`arrive`)return e.near?n(t(`nav_arrive_at`),{name:e.near}):t(`nav_arrive`);let r=t(`nav_${e.slight?`slight_`:``}${e.turn}`);return e.near?n(t(`nav_near`),{text:r,near:e.near}):r}var pC={farFromPark:300,offRoute:25,arrive:12,now:8,back:40,ahead:120},mC=[/^(entrada|acceso|ingreso)( principal| al parque| y salida.*)?$/,/^ingreso/,/^plaza principal$/,/^taquillas?\b/],hC=e=>String(e??``).toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim();function gC(e,t){if(t&&Number.isFinite(t.x)&&Number.isFinite(t.z))return{x:t.x,z:t.z,name:t.name};let n=(e.pois??[]).filter(e=>e.active!==!1);for(let e of mC){let t=n.find(t=>e.test(hC(t.name?.es)));if(t)return{x:t.x,z:t.z,name:t.name}}return n.length?{x:n[0].x,z:n[0].z,name:n[0].name}:{x:e.clear?.cx??0,z:e.clear?.cz??0}}function _C({fix:e,error:t=null,signedDistance:n,entrance:r,manual:i=null,far:a=pC.farFromPark}){if(i)return{x:i.x,z:i.z,simulated:!0,reason:`manual`};if(e&&n(e.x,e.z)<=a)return{x:e.x,z:e.z,simulated:!1,reason:`gps`,accuracy:e.accuracy,heading:e.heading??null};let o=e?`far`:t??`waiting`;return{x:r.x,z:r.z,simulated:!0,reason:o}}function vC(e){return{...e,cum:aC(e.points)}}function yC({points:e,cum:t},n,r,i=null){let a=(i,a)=>{let o=null;for(let s=1;s<e.length;s++){if(t[s]<i||t[s-1]>a)continue;let[c,l]=e[s-1],[u,d]=e[s],f=t[s]-t[s-1]||1,{t:p}=JS(n,r,c,l,u,d);p=Math.max((i-t[s-1])/f,Math.min((a-t[s-1])/f,p)),p=Math.max(0,Math.min(1,p));let m=c+(u-c)*p,h=l+(d-l)*p,g=Math.hypot(n-m,r-h);(!o||g<o.dist)&&(o={along:t[s-1]+f*p,dist:g,x:m,z:h})}return o};if(i!==null){let e=a(i-pC.back,i+pC.ahead);if(e&&e.dist<=pC.offRoute)return e}return a(-1/0,1/0)}function bC(e,t,{hint:n=null,destination:r}={}){let i=yC(e,t.x,t.z,n),a=e.cum.at(-1),o=Math.max(0,a-i.along),s=r??{x:e.points.at(-1)[0],z:e.points.at(-1)[1]},c=Math.hypot(t.x-s.x,t.z-s.z)<pC.arrive||o<pC.arrive&&i.dist<pC.offRoute,l=e.steps.length-1;for(let t=1;t<e.steps.length;t++)if(e.steps[t].along>i.along+2){l=t;break}return{along:i.along,dist:i.dist,remaining:o,next:l,toNext:Math.max(0,e.steps[l].along-i.along),offRoute:!c&&i.dist>pC.offRoute,arrived:c}}function xC({points:e,cum:t},n){let r=oC(e,t,n);return{x:r.x,z:r.z,dx:r.dx,dz:r.dz}}var SC=(e,t=VS.speed)=>Math.max(1,Math.round(e/t/60));function CC(e,t=`es`){if(e>=1e3)return`${(e/1e3).toFixed(1).replace(`.`,t===`es`?`,`:`.`)} km`;let n=e<100?5:10;return`${Math.max(n,Math.round(e/n)*n)} m`}var wC=e=>e&&e[0].toLowerCase()+e.slice(1);function TC(e,t,n,r=`es`){if(t.arrived)return n(`nav_arrived`);let i=e.steps[t.next];return t.toNext<=pC.now?i.instruction:n(`nav_in`).replace(`{dist}`,CC(t.toNext,r)).replace(`{text}`,wC(i.instruction))}function EC(e,t){let n=typeof navigator<`u`?navigator.geolocation:null;if(!n||typeof isSecureContext<`u`&&!isSecureContext)return queueMicrotask(()=>t(`unavailable`)),()=>{};let r=n.watchPosition(({coords:t,timestamp:n})=>e({lat:t.latitude,lng:t.longitude,accuracy:t.accuracy,heading:Number.isFinite(t.heading)&&t.speed>.3?t.heading:null,speed:t.speed,time:n}),e=>t(e.code===e.PERMISSION_DENIED?`denied`:`unavailable`),{enableHighAccuracy:!0,maximumAge:2e3,timeout:2e4});return()=>n.clearWatch(r)}var DC=4,OC=[1,4,10],kC=class{constructor(e,t,{lang:n,onLayout:r=()=>{}}){this.app=e,this.ui=t,this.lang=n,this.onLayout=r,this.mode=`idle`,this.speed=4,this.fix=null,this.geoError=null,this.stopWatch=null,this.manual=null,this.picking=!1,this.followPaused=!1,this.graphs=new Map,this.hook=e=>this.update(e),e.controls.addEventListener(`start`,()=>{(this.mode===`active`||this.mode===`arrived`)&&(this.followPaused=!0,this.ui.setFollowPaused(!0))}),this.reset()}get t(){return this.app.t}reset(){this.mode!==`idle`&&this.end();let e=this.app.park;this.projection=sm(e.center.lat,e.center.lng),this.entrance=gC(e,this.app.parkDef.sources?.entrance),this.manual=null,this.lastLatLng&&(this.fix=this.toLocal(this.lastLatLng))}get graph(){let e=this.app.parkDef.key;return this.graphs.has(e)||this.graphs.set(e,US(this.app.park)),this.graphs.get(e)}toLocal(e){let[t,n]=this.projection.toLocal(e.lat,e.lng),r=e.heading;return{x:t,z:n,accuracy:e.accuracy,heading:r===null?null:{dx:Math.sin(r*Math.PI/180),dz:-Math.cos(r*Math.PI/180)}}}watch(){this.stopWatch||=EC(e=>{let t=this.fix;if(this.lastLatLng=e,this.fix=this.toLocal(e),this.geoError=null,!this.fix.heading&&t&&Math.hypot(this.fix.x-t.x,this.fix.z-t.z)>3){let e=Math.hypot(this.fix.x-t.x,this.fix.z-t.z);this.fix.heading={dx:(this.fix.x-t.x)/e,dz:(this.fix.z-t.z)/e}}else!this.fix.heading&&t?.heading&&(this.fix.heading=t.heading);this.onLocation()},e=>{this.geoError=e,(!this.fix||e===`denied`)&&(this.fix=null),this.onLocation()})}start(){let e=this.app.world.designArea;return _C({fix:this.fix,error:this.geoError,signedDistance:e.signedDistance,entrance:this.entrance,manual:this.manual})}landmarks(){return this.app.park.pois.filter(e=>e.active&&e.id!==this.destination?.id&&(e.x!==this.destination?.x||e.z!==this.destination?.z)).map(e=>({name:Op(e.name,this.lang),x:e.x,z:e.z}))}computeRoute(e){let t=this.destination,n=performance.now(),r=QS(this.graph,e,{x:t.x,z:t.z,name:Op(t.name,this.lang)},{t:this.t,landmarks:this.landmarks()});return this.routeMs=performance.now()-n,vC(r)}directions(e){e&&(this.watch(),this.stopActive(),this.destination=e,this.mode=`preview`,this.app.select(null),this.preview({frame:!0}))}preview({frame:e=!1}={}){let t=this.start();this.from=t,this.route=this.computeRoute(t);let{navLayer:n}=this.app;this.app.routes.setDimmed(!0),n.setRoute(this.route,{heightAt:this.app.world.surfaceAt,destination:this.destination}),n.setUser({x:t.x,z:t.z,accuracy:t.simulated?0:t.accuracy,heading:t.heading,simulated:t.simulated}),this.app.labelsDirty=!0,this.app.wake(),this.ui.showPreview({poi:this.destination,name:Op(this.destination.name,this.lang),distance:this.route.length,minutes:SC(this.route.length),steps:this.route.steps,from:t,direct:this.route.direct}),this.onLayout(`preview`),e&&this.frameRoute()}frameRoute(){let e=new Qn;for(let[t,n]of this.route.points)e.expandByPoint(new H(t,0,n));e.expandByScalar(15),this.app.rig.frameBox(e)}onLocation(){if(this.mode===`preview`&&!this.manual){let e=this.start();!this.from||Math.hypot(e.x-this.from.x,e.z-this.from.z)>5||e.reason!==this.from.reason?this.preview({frame:e.reason!==this.from?.reason}):this.app.navLayer.setUser({...this.from,accuracy:e.accuracy,heading:e.heading})}}pickStart(){this.picking=!0,this.ui.setPicking(!0),this.app.onMapTap=e=>{let t=this.app.groundAt(e.clientX,e.clientY);return t&&(this.manual=t,this.cancelPick(),this.mode===`preview`&&this.preview()),!0}}cancelPick(){this.picking=!1,this.app.onMapTap=null,this.ui.setPicking(!1)}clearManual(){this.manual=null,this.mode===`preview`&&this.preview()}begin({simulate:e=this.from?.simulated??!0}={}){this.route&&(this.picking&&this.cancelPick(),this.simulate=e,!e&&this.from?.simulated&&(this.simulate=!0),this.mode=`active`,this.simAlong=0,this.hint=0,this.lastReroute=0,this.followPaused=!1,this.smoothHeading=null,this.onLayout(`active`),this.ui.showActive({simulate:this.simulate,speed:this.speed}),this.ui.setFollowPaused(!1),this.app.frameHooks.add(this.hook),this.app.wake())}setSpeed(e){this.speed=e}recenter(){this.followPaused=!1,this.ui.setFollowPaused(!1)}stopActive(){this.app.frameHooks.delete(this.hook)}end(){this.stopActive(),this.picking&&this.cancelPick(),this.mode=`idle`,this.route=null,this.app.navLayer.setRoute(null),this.app.navLayer.setUser(null),this.app.routes.setDimmed(!1),this.app.labelsDirty=!0,this.ui.hide(),this.onLayout(`idle`)}update({dt:e,t}){let n=this.route;if(!n||this.mode!==`active`&&this.mode!==`arrived`)return;this.app.wake();let r;if(this.simulate){this.mode===`active`&&(this.simAlong=Math.min(n.length,this.simAlong+VS.speed*this.speed*e));let t=xC(n,this.simAlong);r={x:t.x,z:t.z,heading:{dx:t.dx,dz:t.dz},accuracy:0,simulated:!0}}else{if(!this.fix)return;r={...this.fix,simulated:!1}}let i=bC(n,r,{hint:this.hint,destination:this.destination});if(this.hint=i.along,i.offRoute&&!this.simulate&&t-this.lastReroute>DC)this.lastReroute=t,this.ui.setBanner({text:this.t(`nav_rerouting`),turn:`straight`}),this.route=this.computeRoute(r),this.hint=0,this.app.navLayer.setRoute(this.route,{heightAt:this.app.world.surfaceAt,destination:this.destination});else{if(this.simulate&&this.simAlong>=n.length-.01&&(i.arrived=!0),this.app.navLayer.setWalked(i.along),this.app.navLayer.setUser(r),this.app.labelsDirty=!0,i.arrived&&this.mode!==`arrived`&&(this.mode=`arrived`,this.ui.showArrived(Op(this.destination.name,this.lang))),this.mode===`active`){let e=n.steps[i.next],t=n.steps[i.next+1];this.ui.setBanner({text:TC(n,i,this.t,this.lang),turn:e.turn,slight:e.slight,then:t&&i.toNext<60?t:null,remaining:i.remaining,minutes:SC(i.remaining)})}this.followPaused||this.follow(r,e)}}follow(e,t){let n=1-Math.exp(-t*3),r=e.heading??this.smoothHeading??{dx:0,dz:-1};this.smoothHeading||={...r};let i=this.smoothHeading,a=1-Math.exp(-t*2);i.dx+=(r.dx-i.dx)*a,i.dz+=(r.dz-i.dz)*a;let o=Math.hypot(i.dx,i.dz)||1,s=i.dx/o,c=i.dz/o,{rig:l}=this.app,u=l.currentView(),d=e.x+s*22,f=e.z+c*22,p=new H(d,this.app.world.surfaceAt(d,f),f),m=Math.atan2(-s,-c),h=Math.atan2(Math.sin(m-u.azimuth),Math.cos(m-u.azimuth));l.tween=null,l.applyView({target:u.target.lerp(p,n),distance:kt.lerp(u.distance,170,n),polar:kt.lerp(u.polar,.92,n),azimuth:u.azimuth+h*n})}},AC=e=>`<svg viewBox="0 0 24 24" aria-hidden="true">${e}</svg>`,jC={straight:AC(`<path d="M12 21V4M6 9.5L12 4l6 5.5"/>`),right:AC(`<path d="M7 21v-7.5A4.5 4.5 0 0 1 11.5 9H20M15.5 4.5L20 9l-4.5 4.5"/>`),left:AC(`<path d="M17 21v-7.5A4.5 4.5 0 0 0 12.5 9H4M8.5 4.5L4 9l4.5 4.5"/>`),slight_right:AC(`<path d="M9 21v-7l8-8M11 5.5h6.5V12"/>`),slight_left:AC(`<path d="M15 21v-7L7 6M13 5.5H6.5V12"/>`),arrive:AC(`<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>`)},MC=e=>jC[e.slight?`slight_${e.turn}`:e.turn]??jC.straight;function NC(e,{t,lang:n,onStart:r,onSimulate:i,onEnd:a,onPick:o,onCancelPick:s,onClearManual:c,onSpeed:l,onRecenter:u}){let d=e=>t()(e),f=document.createElement(`section`);f.className=`nav-panel`,f.hidden=!0;let p=document.createElement(`div`);p.className=`nav-top`,p.setAttribute(`role`,`status`),p.setAttribute(`aria-live`,`polite`),p.hidden=!0;let m=document.createElement(`div`);m.className=`nav-bottom`,m.hidden=!0;let h=document.createElement(`button`);h.type=`button`,h.className=`nav-recenter`,h.hidden=!0;let g=document.createElement(`div`);g.className=`nav-toast`,g.hidden=!0,e.append(f,p,m,h,g);let _=4,v=!1;f.addEventListener(`click`,e=>{let t=e.target.closest(`[data-act]`);t&&{close:a,start:r,sim:i,pick:o,real:c}[t.dataset.act]?.()}),f.addEventListener(`keydown`,e=>{e.key===`Escape`&&a()});function y({poi:e,name:t,distance:r,minutes:i,steps:a,from:o,direct:s}){let c={gps:`nav_from_gps`,manual:`nav_from_manual`}[o.reason]??`nav_from_sim`,l={far:`nav_far`,denied:`nav_denied`,unavailable:`nav_unavailable`,waiting:`nav_locating`,manual:`nav_manual`}[o.reason];f.innerHTML=`
      <div class="np-handle" aria-hidden="true"></div>
      <header class="np-head">
        <span class="np-num${e.extraCost?` is-extra`:``}">${e.number}</span>
        <div class="np-dest"><small>${$(d(`nav_goTo`))}</small><b>${$(t)}</b></div>
        <button type="button" class="np-close" data-act="close" aria-label="${$(d(`close`))}">${Jx.close}</button>
      </header>
      <div class="np-summary">
        <span class="np-time">${i} ${$(d(`nav_min`))}</span>
        <span class="np-dist">${Jx.walk}${$(CC(r,n))} · ${$(d(`nav_walk`))}</span>
      </div>
      <div class="np-from">
        <span class="np-from-dot${o.simulated?` is-sim`:``}" aria-hidden="true"></span>
        <span class="np-from-text">${$(d(`nav_from`))}: <b>${$(d(c))}</b></span>
        ${o.reason===`manual`?`<button type="button" class="link" data-act="real">${$(d(`nav_cancel`))}</button>`:`<button type="button" class="link" data-act="pick">${$(d(`nav_pick`))}</button>`}
      </div>
      ${l?`<p class="np-note${o.reason===`waiting`?` is-info`:``}">${$(d(l))}</p>`:``}
      ${s?`<p class="np-note is-info">${$(d(`nav_direct`))}</p>`:``}
      <div class="np-actions">
        <button type="button" class="np-start" data-act="start">${jC.straight}${$(d(`nav_start`))}</button>
        <button type="button" class="np-sim" data-act="sim">${$(d(`nav_simulate`))}</button>
      </div>
      <h3 class="np-steps-title">${$(d(`nav_steps`))}</h3>
      <ol class="np-steps">${a.map(e=>`<li class="np-step is-${e.turn}">
            <span class="np-step-icon">${MC(e)}</span>
            <span class="np-step-text">${$(e.instruction)}${e.distance?`<small>${$(CC(e.distance,n))}</small>`:``}</span>
          </li>`).join(``)}</ol>`,f.hidden=!1,p.hidden=m.hidden=h.hidden=!0}m.addEventListener(`click`,e=>{let t=e.target.closest(`button`);t&&(t.dataset.speed?(_=+t.dataset.speed,l(_),b()):t.dataset.act===`end`&&a())}),h.addEventListener(`click`,()=>u());function b(){for(let e of m.querySelectorAll(`[data-speed]`))e.setAttribute(`aria-pressed`,String(+e.dataset.speed===_))}function x({simulate:e,speed:t}){v=e,_=t,f.hidden=!0,p.hidden=!1,p.className=`nav-top`,p.innerHTML=`<span class="nt-icon"></span><div class="nt-text"><b></b><small hidden></small></div>`,m.innerHTML=`
      <div class="nb-info"><b class="nb-time"></b><span class="nb-dist"></span>${v?`<em class="nb-sim">${$(d(`nav_simulating`))}</em>`:``}</div>
      ${v?`<div class="nb-speed" role="group" aria-label="${$(d(`nav_speed`))}">${OC.map(e=>`<button type="button" data-speed="${e}" aria-pressed="false">${e}×</button>`).join(``)}</div>`:``}
      <button type="button" class="nb-end" data-act="end">${$(d(`nav_end`))}</button>`,b(),m.hidden=!1,h.innerHTML=`${jC.straight}<span>${$(d(`nav_recenter`))}</span>`}let S=``;function C({text:e,turn:t,slight:r,then:i,remaining:a,minutes:o}){if(p.hidden||p.classList.contains(`is-arrived`))return;e!==S&&(S=e,p.querySelector(`.nt-text b`).textContent=e,p.querySelector(`.nt-icon`).innerHTML=MC({turn:t,slight:r}));let s=p.querySelector(`.nt-text small`);s.hidden=!i,i&&(s.textContent=`${d(`nav_then`)}: ${i.instruction}`),a!==void 0&&(m.querySelector(`.nb-time`).textContent=`${o} ${d(`nav_min`)}`,m.querySelector(`.nb-dist`).textContent=CC(a,n))}function w(e){p.classList.add(`is-arrived`),p.querySelector(`.nt-icon`).innerHTML=jC.arrive,p.querySelector(`.nt-text b`).textContent=d(`nav_arrived`);let t=p.querySelector(`.nt-text small`);t.hidden=!1,t.textContent=e,S=``;let n=m.querySelector(`.nb-time`);n&&(n.textContent=`0 `+d(`nav_min`));let r=m.querySelector(`.nb-dist`);r&&(r.textContent=``)}function T(e){g.hidden=!e,e&&(g.innerHTML=`<span>${$(d(`nav_pick_hint`))}</span><button type="button">${$(d(`nav_cancel`))}</button>`,g.querySelector(`button`).addEventListener(`click`,()=>s())),document.documentElement.classList.toggle(`gx-nav-picking`,e)}return{showPreview:y,showActive:x,setBanner:C,showArrived:w,setPicking:T,setFollowPaused(e){h.hidden=!e||p.hidden},hide(){f.hidden=p.hidden=m.hidden=h.hidden=g.hidden=!0,S=``},sheetHeight:()=>f.hidden?0:f.offsetHeight,panel:f}}var PC=`(max-width: 640px)`;async function FC(){let{park:e,lang:t}=Ap(),n=jp(e,t);location.pathname!==n&&history.replaceState(null,``,n+location.search),document.documentElement.lang=t;let r=Mp(),i=Cp[e],a=document.getElementById(`root`),o=document.createElement(`div`);o.className=`gx-map-container`,a.appendChild(o);let s=Dp(t),c=FS(a,s),l=zS(a,()=>s),u=(e,t)=>{location.href=jp(e,t)},d=xS(a,{park:e,lang:t,t:s,onNavigate:u}),f=null,p=r.still?`medium`:mS(`quality`,`auto`),m=mS(`timeOfDay`,`auto`),h=iS()??(eS.includes(m)?m:`auto`),g=new dS(o,{park:i,lang:t,t:s,quality:p,timeMode:h,debug:r,onProgress:e=>c.progress(e),onSelect:e=>f?.highlight(e)});try{await g.load()}catch(e){console.error(e),c.fail(s(`loadError`));return}let _=null,v=!matchMedia(PC).matches,y=!(r.nosidebar||!v),b=null,x=NC(a,{t:()=>g.t,lang:t,onStart:()=>b.begin(),onSimulate:()=>b.begin({simulate:!0}),onEnd:()=>b.end(),onPick:()=>b.pickStart(),onCancelPick:()=>b.cancelPick(),onClearManual:()=>b.clearManual(),onSpeed:e=>b.setSpeed(e),onRecenter:()=>b.recenter()});b=new kC(g,x,{lang:t,onLayout:e=>{let t=document.documentElement;t.classList.toggle(`gx-nav-preview`,e===`preview`),t.classList.toggle(`gx-nav-active`,e===`active`),e===`preview`?g.setInset(v?x.panel.offsetWidth+12:0,v?0:x.sheetHeight()):e===`active`?g.setInset(0,0):S()}}),g.onDirections=e=>b.directions(e);let S=()=>{let e=!f.el.classList.contains(`collapsed`);y=e,_.setListOpen(e),g.setInset(v&&e?f.el.offsetWidth+12:0)},C=e=>{s=Dp(t,g.park.labels),g.t=s,d.remove(),_?.remove(),_=xS(a,{park:e.key,lang:t,t:s,hours:g.park.hours,quality:p,onNavigate:w,onMenu:()=>f.toggle(),onQuality:e=>{p=e,hS(`quality`,e),g.setQuality(e)},timeMode:h,onTimeMode:e=>{h=e,hS(`timeOfDay`,e),g.setTimeMode(e)}}),document.title=`${s(e.labelKey)} 3D`,f?.el.remove(),f=jS(a,{park:g.park,lang:t,t:s,onSelect:e=>g.select(e),onFilter:e=>g.applyFilter(e),onFocusRoute:e=>g.focusRoute(e),onDirections:e=>b.directions(e),onAbout:()=>l.open({force:!0})}),f.toggle(y),new MutationObserver(S).observe(f.el,{attributes:!0,attributeFilter:[`class`]}),S()},w=async(e,n)=>{n===t&&(await g.focusableParks()).includes(e)&&await g.focusPark(Cp[e])||u(e,n)},T=!1;g.onFocus=(e,n)=>{T||history.pushState(null,``,jp(n.key,t)+location.search),b.reset(),C(n)},window.addEventListener(`popstate`,async()=>{let e=Ap();(e.park!==g.parkDef.key||e.lang!==t)&&(T=!0,await w(e.park,e.lang),T=!1)}),C(i),NS(a,g,s),PS(a,t),r.stats&&BS(a,g),g.start({frames:r.still?4:1/0}),c.done(),r.still||l.open(),window.__app=g,window.__nav=b}FC();