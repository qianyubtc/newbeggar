(()=>{/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Oh=0,Fl=1,Bh=2;var ur=1,zh=2,_s=3,bi=0,tn=1,Ge=2,Bi=0,ys=1,Ol=2,Bl=3,zl=4,kh=5;var zi=100,Gh=101,Hh=102,Vh=103,Wh=104,Xh=200,qh=201,Yh=202,Zh=203,kl=204,Gl=205,$h=206,Jh=207,Kh=208,jh=209,Qh=210,tu=211,eu=212,nu=213,iu=214,ao=0,lo=1,co=2,ls=3,ho=4,uo=5,fo=6,po=7,Hl=0,su=1,ru=2,Mn=0,Vl=1,Wl=2,Xl=3,ql=4,Yl=5,Zl=6,$l=7;var Jl=300,ki=301,vs=302,Mi=303,Ho=304,mo=1e3,Fn=1001,go=1002,xe=1003,ou=1004;var dr=1005;var ze=1006,Vo=1007;var si=1008;var on=1009,Kl=1010,jl=1011,bs=1012,Wo=1013,Rn=1014,Sn=1015,Cn=1016,Xo=1017,qo=1018,Gi=1020,Ql=35902,tc=35899,ec=1021,nc=1022,In=1023,jn=1026,ri=1027,Yo=1028,Zo=1029,Si=1030,$o=1031;var Jo=1033,fr=33776,pr=33777,mr=33778,gr=33779,Ko=35840,jo=35841,Qo=35842,ta=35843,ea=36196,na=37492,ia=37496,sa=37488,ra=37489,xr=37490,oa=37491,aa=37808,la=37809,ca=37810,ha=37811,ua=37812,da=37813,fa=37814,pa=37815,ma=37816,ga=37817,xa=37818,_a=37819,ya=37820,va=37821,ba=36492,Ma=36494,Sa=36495,wa=36283,Ea=36284,_r=36285,Ta=36286;var Gs=2300,xo=2301,so=2302,Rl=2303,Cl=2400,Il=2401,Pl=2402;var au=3200;var Aa=0,lu=1,oi="",Se="srgb",Hs="srgb-linear",Vs="linear",ce="srgb";var ro=7680;var cu=519,hu=512,uu=513,du=514,ic=515,fu=516,pu=517,sc=518,rc=519,mu=35044;var oc="300 es",bn=2e3,cs=2001;function tf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ef(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ws(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function gu(){let i=Ws("canvas");return i.style.display="block",i}var oh={},hs=null;function ac(...i){let t="THREE."+i.shift();hs?hs("log",t,...i):console.log(t,...i)}function xu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Bt(...i){i=xu(i);let t="THREE."+i.shift();if(hs)hs("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Gt(...i){i=xu(i);let t="THREE."+i.shift();if(hs)hs("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ks(...i){let t=i.join(" ");t in oh||(oh[t]=!0,Bt(...i))}function _u(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var yu={[ao]:ao,[co]:fo,[ho]:ho,[ls]:uo,[lo]:lo,[fo]:co,[po]:po,[uo]:ls},On=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var oo=Math.PI/180,_o=180/Math.PI;function yr(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qe[i&255]+qe[i>>8&255]+qe[i>>16&255]+qe[i>>24&255]+"-"+qe[t&255]+qe[t>>8&255]+"-"+qe[t>>16&15|64]+qe[t>>24&255]+"-"+qe[e&63|128]+qe[e>>8&255]+"-"+qe[e>>16&255]+qe[e>>24&255]+qe[n&255]+qe[n>>8&255]+qe[n>>16&255]+qe[n>>24&255]).toLowerCase()}function ee(i,t,e){return Math.max(t,Math.min(e,i))}function nf(i,t){return(i%t+t)%t}function rl(i,t,e){return(1-e)*i+e*t}function vu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function lc(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function sf(i,t){if(t.constructor===Float32Array)return i;let e=lc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function rf(i,t){if(t.constructor===Float32Array)return i;let e=lc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var fc=class fc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fc.prototype.isVector2=!0;var Yt=fc,Bn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],p=n[s+3],u=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(p!==_||c!==u||l!==d||h!==g){let f=c*u+l*d+h*g+p*_;f<0&&(u=-u,d=-d,g=-g,_=-_,f=-f);let m=1-a;if(f<.9995){let M=Math.acos(f),A=Math.sin(M);m=Math.sin(m*M)/A,a=Math.sin(a*M)/A,c=c*m+u*a,l=l*m+d*a,h=h*m+g*a,p=p*m+_*a}else{c=c*m+u*a,l=l*m+d*a,h=h*m+g*a,p=p*m+_*a;let M=1/Math.sqrt(c*c+l*l+h*h+p*p);c*=M,l*=M,h*=M,p*=M}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],p=r[o],u=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*p+c*d-l*u,t[e+1]=c*g+h*u+l*p-a*d,t[e+2]=l*g+h*d+a*u-c*p,t[e+3]=h*g-a*p-c*u-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),p=a(r/2),u=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*p+l*d*g,this._y=l*d*p-u*h*g,this._z=l*h*g+u*d*p,this._w=l*h*p-u*d*g;break;case"YXZ":this._x=u*h*p+l*d*g,this._y=l*d*p-u*h*g,this._z=l*h*g-u*d*p,this._w=l*h*p+u*d*g;break;case"ZXY":this._x=u*h*p-l*d*g,this._y=l*d*p+u*h*g,this._z=l*h*g+u*d*p,this._w=l*h*p-u*d*g;break;case"ZYX":this._x=u*h*p-l*d*g,this._y=l*d*p+u*h*g,this._z=l*h*g-u*d*p,this._w=l*h*p+u*d*g;break;case"YZX":this._x=u*h*p+l*d*g,this._y=l*d*p+u*h*g,this._z=l*h*g-u*d*p,this._w=l*h*p-u*d*g;break;case"XZY":this._x=u*h*p-l*d*g,this._y=l*d*p-u*h*g,this._z=l*h*g+u*d*p,this._w=l*h*p+u*d*g;break;default:Bt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],p=e[10],u=n+a+p;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>p){let d=2*Math.sqrt(1+n-a-p);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>p){let d=2*Math.sqrt(1+a-n-p);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+p-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},pc=class pc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ah.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ah.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+c*l+o*p-a*h,this.y=n+c*h+a*l-r*p,this.z=s+c*p+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ol.copy(this).projectOnVector(t),this.sub(ol)}reflect(t){return this.sub(ol.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};pc.prototype.isVector3=!0;var F=pc,ol=new F,ah=new Bn,mc=class mc{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],p=n[7],u=n[2],d=n[5],g=n[8],_=s[0],f=s[3],m=s[6],M=s[1],A=s[4],b=s[7],S=s[2],E=s[5],x=s[8];return r[0]=o*_+a*M+c*S,r[3]=o*f+a*A+c*E,r[6]=o*m+a*b+c*x,r[1]=l*_+h*M+p*S,r[4]=l*f+h*A+p*E,r[7]=l*m+h*b+p*x,r[2]=u*_+d*M+g*S,r[5]=u*f+d*A+g*E,r[8]=u*m+d*b+g*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],p=h*o-a*l,u=a*c-h*r,d=l*r-o*c,g=e*p+n*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=p*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return ks("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(al.makeScale(t,e)),this}rotate(t){return ks("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(al.makeRotation(-t)),this}translate(t,e){return ks("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(al.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};mc.prototype.isMatrix3=!0;var Ht=mc,al=new Ht,lh=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ch=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function of(){let i={enabled:!0,workingColorSpace:Hs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ce&&(s.r=Kn(s.r),s.g=Kn(s.g),s.b=Kn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ce&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===oi?Vs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Hs]:{primaries:t,whitePoint:n,transfer:Vs,toXYZ:lh,fromXYZ:ch,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Se},outputColorSpaceConfig:{drawingBufferColorSpace:Se}},[Se]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:lh,fromXYZ:ch,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Se}}}),i}var te=of();function Kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function as(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Yi,yo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Yi===void 0&&(Yi=Ws("canvas")),Yi.width=t.width,Yi.height=t.height;let s=Yi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Yi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ws("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Kn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Kn(e[n]/255)*255):e[n]=Kn(e[n]);return{data:e,width:t.width,height:t.height}}else return Bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},af=0,us=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=yr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ll(s[o].image)):r.push(ll(s[o]))}else r=ll(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ll(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Bt("Texture: Unable to serialize Texture."),{})}var lf=0,cl=new F,Qe=class i extends On{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Fn,s=Fn,r=ze,o=si,a=In,c=on,l=i.DEFAULT_ANISOTROPY,h=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=yr(),this.name="",this.source=new us(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(cl).x}get height(){return this.source.getSize(cl).y}get depth(){return this.source.getSize(cl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Bt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Bt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case mo:t.x=t.x-Math.floor(t.x);break;case Fn:t.x=t.x<0?0:1;break;case go:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case mo:t.y=t.y-Math.floor(t.y);break;case Fn:t.y=t.y<0?0:1;break;case go:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=Jl;Qe.DEFAULT_ANISOTROPY=1;var gc=class gc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],p=c[8],u=c[1],d=c[5],g=c[9],_=c[2],f=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(p-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+_)<.1&&Math.abs(g+f)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(l+1)/2,b=(d+1)/2,S=(m+1)/2,E=(h+u)/4,x=(p+_)/4,w=(g+f)/4;return A>b&&A>S?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=E/n,r=x/n):b>S?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=E/s,r=w/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=x/r,s=w/r),this.set(n,s,r,e),this}let M=Math.sqrt((f-g)*(f-g)+(p-_)*(p-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(f-g)/M,this.y=(p-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};gc.prototype.isVector4=!0;var _e=gc,vo=class extends On{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Qe({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new us(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},mn=class extends vo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Xs=class extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=xe,this.minFilter=xe,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var bo=class extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=xe,this.minFilter=xe,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Go=class Go{constructor(t,e,n,s,r,o,a,c,l,h,p,u,d,g,_,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,p,u,d,g,_,f)}set(t,e,n,s,r,o,a,c,l,h,p,u,d,g,_,f){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=p,m[14]=u,m[3]=d,m[7]=g,m[11]=_,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Go().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Zi.setFromMatrixColumn(t,0).length(),r=1/Zi.setFromMatrixColumn(t,1).length(),o=1/Zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let u=o*h,d=o*p,g=a*h,_=a*p;e[0]=c*h,e[4]=-c*p,e[8]=l,e[1]=d+g*l,e[5]=u-_*l,e[9]=-a*c,e[2]=_-u*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*h,d=c*p,g=l*h,_=l*p;e[0]=u+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*p,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*h,d=c*p,g=l*h,_=l*p;e[0]=u-_*a,e[4]=-o*p,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*h,d=o*p,g=a*h,_=a*p;e[0]=c*h,e[4]=g*l-d,e[8]=u*l+_,e[1]=c*p,e[5]=_*l+u,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-u*p,e[8]=g*p+d,e[1]=p,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*p+g,e[10]=u-_*p}else if(t.order==="XZY"){let u=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-p,e[8]=l*h,e[1]=u*p+_,e[5]=o*h,e[9]=d*p-g,e[2]=g*p-d,e[6]=a*h,e[10]=_*p+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cf,t,hf)}lookAt(t,e,n){let s=this.elements;return un.subVectors(t,e),un.lengthSq()===0&&(un.z=1),un.normalize(),hi.crossVectors(n,un),hi.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),hi.crossVectors(n,un)),hi.normalize(),Lr.crossVectors(un,hi),s[0]=hi.x,s[4]=Lr.x,s[8]=un.x,s[1]=hi.y,s[5]=Lr.y,s[9]=un.y,s[2]=hi.z,s[6]=Lr.z,s[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],p=n[5],u=n[9],d=n[13],g=n[2],_=n[6],f=n[10],m=n[14],M=n[3],A=n[7],b=n[11],S=n[15],E=s[0],x=s[4],w=s[8],N=s[12],R=s[1],I=s[5],C=s[9],O=s[13],P=s[2],W=s[6],k=s[10],G=s[14],tt=s[3],H=s[7],Q=s[11],et=s[15];return r[0]=o*E+a*R+c*P+l*tt,r[4]=o*x+a*I+c*W+l*H,r[8]=o*w+a*C+c*k+l*Q,r[12]=o*N+a*O+c*G+l*et,r[1]=h*E+p*R+u*P+d*tt,r[5]=h*x+p*I+u*W+d*H,r[9]=h*w+p*C+u*k+d*Q,r[13]=h*N+p*O+u*G+d*et,r[2]=g*E+_*R+f*P+m*tt,r[6]=g*x+_*I+f*W+m*H,r[10]=g*w+_*C+f*k+m*Q,r[14]=g*N+_*O+f*G+m*et,r[3]=M*E+A*R+b*P+S*tt,r[7]=M*x+A*I+b*W+S*H,r[11]=M*w+A*C+b*k+S*Q,r[15]=M*N+A*O+b*G+S*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],p=t[6],u=t[10],d=t[14],g=t[3],_=t[7],f=t[11],m=t[15],M=c*d-l*u,A=a*d-l*p,b=a*u-c*p,S=o*d-l*h,E=o*u-c*h,x=o*p-a*h;return e*(_*M-f*A+m*b)-n*(g*M-f*S+m*E)+s*(g*A-_*S+m*x)-r*(g*b-_*E+f*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],p=t[9],u=t[10],d=t[11],g=t[12],_=t[13],f=t[14],m=t[15],M=e*a-n*o,A=e*c-s*o,b=e*l-r*o,S=n*c-s*a,E=n*l-r*a,x=s*l-r*c,w=h*_-p*g,N=h*f-u*g,R=h*m-d*g,I=p*f-u*_,C=p*m-d*_,O=u*m-d*f,P=M*O-A*C+b*I+S*R-E*N+x*w;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let W=1/P;return t[0]=(a*O-c*C+l*I)*W,t[1]=(s*C-n*O-r*I)*W,t[2]=(_*x-f*E+m*S)*W,t[3]=(u*E-p*x-d*S)*W,t[4]=(c*R-o*O-l*N)*W,t[5]=(e*O-s*R+r*N)*W,t[6]=(f*b-g*x-m*A)*W,t[7]=(h*x-u*b+d*A)*W,t[8]=(o*C-a*R+l*w)*W,t[9]=(n*R-e*C-r*w)*W,t[10]=(g*E-_*b+m*M)*W,t[11]=(p*b-h*E-d*M)*W,t[12]=(a*N-o*I-c*w)*W,t[13]=(e*I-n*N+s*w)*W,t[14]=(_*A-g*S-f*M)*W,t[15]=(h*S-p*A+u*M)*W,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,p=a+a,u=r*l,d=r*h,g=r*p,_=o*h,f=o*p,m=a*p,M=c*l,A=c*h,b=c*p,S=n.x,E=n.y,x=n.z;return s[0]=(1-(_+m))*S,s[1]=(d+b)*S,s[2]=(g-A)*S,s[3]=0,s[4]=(d-b)*E,s[5]=(1-(u+m))*E,s[6]=(f+M)*E,s[7]=0,s[8]=(g+A)*x,s[9]=(f-M)*x,s[10]=(1-(u+_))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Zi.set(s[0],s[1],s[2]).length(),a=Zi.set(s[4],s[5],s[6]).length(),c=Zi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),En.copy(this);let l=1/o,h=1/a,p=1/c;return En.elements[0]*=l,En.elements[1]*=l,En.elements[2]*=l,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=p,En.elements[9]*=p,En.elements[10]*=p,e.setFromRotationMatrix(En),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=bn,c=!1){let l=this.elements,h=2*r/(e-t),p=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===bn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===cs)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=p,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=bn,c=!1){let l=this.elements,h=2/(e-t),p=2/(n-s),u=-(e+t)/(e-t),d=-(n+s)/(n-s),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===bn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===cs)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=p,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Go.prototype.isMatrix4=!0;var ne=Go,Zi=new F,En=new ne,cf=new F(0,0,0),hf=new F(1,1,1),hi=new F,Lr=new F,un=new F,hh=new ne,uh=new Bn,mi=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],p=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ee(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return uh.setFromEuler(this),this.setFromQuaternion(uh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mi.DEFAULT_ORDER="XYZ";var ds=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},uf=0,dh=new F,$i=new Bn,Xn=new ne,Dr=new F,Ds=new F,df=new F,ff=new Bn,fh=new F(1,0,0),ph=new F(0,1,0),mh=new F(0,0,1),gh={type:"added"},pf={type:"removed"},Ji={type:"childadded",child:null},hl={type:"childremoved",child:null},ke=class i extends On{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=yr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new mi,n=new Bn,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new Ht}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ds,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(fh,t)}rotateY(t){return this.rotateOnAxis(ph,t)}rotateZ(t){return this.rotateOnAxis(mh,t)}translateOnAxis(t,e){return dh.copy(t).applyQuaternion(this.quaternion),this.position.add(dh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fh,t)}translateY(t){return this.translateOnAxis(ph,t)}translateZ(t){return this.translateOnAxis(mh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Dr.copy(t):Dr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Ds,Dr,this.up):Xn.lookAt(Dr,Ds,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(Xn),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Gt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gh),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null):Gt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pf),hl.child=t,this.dispatchEvent(hl),hl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gh),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,t,df),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,ff,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let p=c[l];r(t.shapes,p)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),p=o(t.shapes),u=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ke.DEFAULT_UP=new F(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ue=class extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}},mf={type:"move"},fs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let f=e.getJointPose(_,n),m=this._getHandJoint(l,_);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}let h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],u=h.position.distanceTo(p.position),d=.02,g=.005;l.inputState.pinching&&u>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function ul(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Se){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=nf(t,1),e=ee(e,0,1),n=ee(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ul(o,r,t+1/3),this.g=ul(o,r,t),this.b=ul(o,r,t-1/3)}return te.colorSpaceToWorking(this,s),this}setStyle(t,e=Se){function n(r){r!==void 0&&parseFloat(r)<1&&Bt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Bt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Bt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Se){let n=bu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Bt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Kn(t.r),this.g=Kn(t.g),this.b=Kn(t.b),this}copyLinearToSRGB(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Se){return te.workingToColorSpace(Ye.copy(this),t),Math.round(ee(Ye.r*255,0,255))*65536+Math.round(ee(Ye.g*255,0,255))*256+Math.round(ee(Ye.b*255,0,255))}getHexString(t=Se){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(Ye.copy(this),e);let n=Ye.r,s=Ye.g,r=Ye.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let p=o-a;switch(l=h<=.5?p/(o+a):p/(2-o-a),o){case n:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-n)/p+2;break;case r:c=(n-s)/p+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=Se){te.workingToColorSpace(Ye.copy(this),t);let e=Ye.r,n=Ye.g,s=Ye.b;return t!==Se?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ui),this.setHSL(ui.h+t,ui.s+e,ui.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ui),t.getHSL(Nr);let n=rl(ui.h,Nr.h,e),s=rl(ui.s,Nr.s,e),r=rl(ui.l,Nr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ye=new Kt;Kt.NAMES=bu;var qs=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Kt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ys=class extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mi,this.environmentIntensity=1,this.environmentRotation=new mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Tn=new F,qn=new F,dl=new F,Yn=new F,Ki=new F,ji=new F,xh=new F,fl=new F,pl=new F,ml=new F,gl=new _e,xl=new _e,_l=new _e,Jn=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Tn.subVectors(t,e),s.cross(Tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Tn.subVectors(s,e),qn.subVectors(n,e),dl.subVectors(t,e);let o=Tn.dot(Tn),a=Tn.dot(qn),c=Tn.dot(dl),l=qn.dot(qn),h=qn.dot(dl),p=o*l-a*a;if(p===0)return r.set(0,0,0),null;let u=1/p,d=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Yn.x),c.addScaledVector(o,Yn.y),c.addScaledVector(a,Yn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return gl.setScalar(0),xl.setScalar(0),_l.setScalar(0),gl.fromBufferAttribute(t,e),xl.fromBufferAttribute(t,n),_l.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(gl,r.x),o.addScaledVector(xl,r.y),o.addScaledVector(_l,r.z),o}static isFrontFacing(t,e,n,s){return Tn.subVectors(n,e),qn.subVectors(t,e),Tn.cross(qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),Tn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ki.subVectors(s,n),ji.subVectors(r,n),fl.subVectors(t,n);let c=Ki.dot(fl),l=ji.dot(fl);if(c<=0&&l<=0)return e.copy(n);pl.subVectors(t,s);let h=Ki.dot(pl),p=ji.dot(pl);if(h>=0&&p<=h)return e.copy(s);let u=c*p-h*l;if(u<=0&&c>=0&&h<=0&&c-h>0)return o=c/(c-h),e.copy(n).addScaledVector(Ki,o);ml.subVectors(t,r);let d=Ki.dot(ml),g=ji.dot(ml);if(g>=0&&d<=g)return e.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ji,a);let f=h*g-d*p;if(f<=0&&p-h>=0&&d-g>=0)return xh.subVectors(r,s),a=(p-h)/(p-h+(d-g)),e.copy(s).addScaledVector(xh,a);let m=1/(f+_+u);return o=_*m,a=u*m,e.copy(n).addScaledVector(Ki,o).addScaledVector(ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},rn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(An.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(An.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=An.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,An):An.fromBufferAttribute(r,o),An.applyMatrix4(t.matrixWorld),this.expandByPoint(An);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ur.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ur.copy(n.boundingBox)),Ur.applyMatrix4(t.matrixWorld),this.union(Ur)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,An),An.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ns),Fr.subVectors(this.max,Ns),Qi.subVectors(t.a,Ns),ts.subVectors(t.b,Ns),es.subVectors(t.c,Ns),di.subVectors(ts,Qi),fi.subVectors(es,ts),Pi.subVectors(Qi,es);let e=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Pi.z,Pi.y,di.z,0,-di.x,fi.z,0,-fi.x,Pi.z,0,-Pi.x,-di.y,di.x,0,-fi.y,fi.x,0,-Pi.y,Pi.x,0];return!yl(e,Qi,ts,es,Fr)||(e=[1,0,0,0,1,0,0,0,1],!yl(e,Qi,ts,es,Fr))?!1:(Or.crossVectors(di,fi),e=[Or.x,Or.y,Or.z],yl(e,Qi,ts,es,Fr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,An).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(An).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Zn=[new F,new F,new F,new F,new F,new F,new F,new F],An=new F,Ur=new rn,Qi=new F,ts=new F,es=new F,di=new F,fi=new F,Pi=new F,Ns=new F,Fr=new F,Or=new F,Li=new F;function yl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Li.fromArray(i,r);let a=s.x*Math.abs(Li.x)+s.y*Math.abs(Li.y)+s.z*Math.abs(Li.z),c=t.dot(Li),l=e.dot(Li),h=n.dot(Li);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Re=new F,Br=new Yt,gf=0,pn=class extends On{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=mu,this.updateRanges=[],this.gpuType=Sn,this.version=0,this._normalizationScale=t!==void 0?lc(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Br.fromBufferAttribute(this,e),Br.applyMatrix3(t),this.setXY(e,Br.x,Br.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):sf(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):rf(t,this.array)}};var Zs=class extends pn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var $s=class extends pn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var de=class extends pn{constructor(t,e,n){super(new Float32Array(t),e,n)}},xf=new rn,Us=new F,vl=new F,Qn=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):xf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Us.subVectors(t,this.center);let e=Us.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Us,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(vl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Us.copy(t.center).add(vl)),this.expandByPoint(Us.copy(t.center).sub(vl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},_f=0,vn=new ne,bl=new ke,ns=new F,dn=new rn,Fs=new rn,Ue=new F,Ze=class i extends On{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=yr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(tf(t)?$s:Zs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return vn.makeRotationFromQuaternion(t),this.applyMatrix4(vn),this}rotateX(t){return vn.makeRotationX(t),this.applyMatrix4(vn),this}rotateY(t){return vn.makeRotationY(t),this.applyMatrix4(vn),this}rotateZ(t){return vn.makeRotationZ(t),this.applyMatrix4(vn),this}translate(t,e,n){return vn.makeTranslation(t,e,n),this.applyMatrix4(vn),this}scale(t,e,n){return vn.makeScale(t,e,n),this.applyMatrix4(vn),this}lookAt(t){return bl.lookAt(t),bl.updateMatrix(),this.applyMatrix4(bl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new de(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Gt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Fs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ue.addVectors(dn.min,Fs.min),dn.expandByPoint(Ue),Ue.addVectors(dn.max,Fs.max),dn.expandByPoint(Ue)):(dn.expandByPoint(Fs.min),dn.expandByPoint(Fs.max))}dn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ue));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ue.fromBufferAttribute(a,l),c&&(ns.fromBufferAttribute(t,l),Ue.add(ns)),s=Math.max(s,n.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Gt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Gt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new pn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(n.count);for(let N=0;N<n.count;N++)a[N]=new F,c[N]=new F;let h=new F,p=new F,u=new F,d=new Yt,g=new Yt,_=new Yt,f=new F,m=new F;function M(N,R,I){l[N]=l[R]=l[I]=1,h.fromBufferAttribute(n,N),p.fromBufferAttribute(n,R),u.fromBufferAttribute(n,I),d.fromBufferAttribute(r,N),g.fromBufferAttribute(r,R),_.fromBufferAttribute(r,I),p.sub(h),u.sub(h),g.sub(d),_.sub(d);let C=1/(g.x*_.y-_.x*g.y);isFinite(C)&&(f.copy(p).multiplyScalar(_.y).addScaledVector(u,-g.y).multiplyScalar(C),m.copy(u).multiplyScalar(g.x).addScaledVector(p,-_.x).multiplyScalar(C),a[N].add(f),a[R].add(f),a[I].add(f),c[N].add(m),c[R].add(m),c[I].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let N=0,R=A.length;N<R;++N){let I=A[N],C=I.start,O=I.count;for(let P=C,W=C+O;P<W;P+=3)M(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let b=new F,S=new F,E=new F,x=new F;function w(N){E.fromBufferAttribute(s,N),x.copy(E);let R=a[N];b.copy(R),b.sub(E.multiplyScalar(E.dot(R))).normalize(),S.crossVectors(x,R);let C=S.dot(c[N])<0?-1:1;o.setXYZW(N,b.x,b.y,b.z,C)}for(let N=0,R=n.count;N<R;++N)l[N]&&w(N);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new pn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,h=new F,p=new F;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),_=t.getX(u+1),f=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,f),h.subVectors(o,r),p.subVectors(s,r),h.cross(p),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,f),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),p.subVectors(s,r),h.cross(p),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,p=a.normalized,u=new l.constructor(c.length*h),d=0,g=0;for(let _=0,f=c.length;_<f;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let m=0;m<h;m++)u[g++]=l[d++]}return new pn(u,h,p)}if(this.index===null)return Bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,p=l.length;h<p;h++){let u=l[h],d=t(u,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let p=0,u=l.length;p<u;p++){let d=l[p];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],p=r[l];for(let u=0,d=p.length;u<d;u++)h.push(p[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let p=o[l];this.addGroup(p.start,p.count,p.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ml=new F,yf=new F,vf=new Ht,fn=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ml.subVectors(n,e).cross(yf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Ml),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||vf.getNormalMatrix(t),s=this.coplanarPoint(Ml).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},bf=0,ti=class extends On{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=yr(),this.name="",this.type="Material",this.blending=ys,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kl,this.blendDst=Gl,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ro,this.stencilZFail=ro,this.stencilZPass=ro,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Bt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Bt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new fn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Yt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Yt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var $n=new F,Sl=new F,zr=new F,kr=new F,gi=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,$n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=$n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):($n.copy(this.origin).addScaledVector(this.direction,e),$n.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Sl.copy(t).add(e).multiplyScalar(.5),zr.copy(e).sub(t).normalize(),kr.copy(this.origin).sub(Sl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(zr),a=kr.dot(this.direction),c=-kr.dot(zr),l=kr.lengthSq(),h=Math.abs(1-o*o),p,u,d,g;if(h>0)if(p=o*c-a,u=o*a-c,g=r*h,p>=0)if(u>=-g)if(u<=g){let _=1/h;p*=_,u*=_,d=p*(p+o*u+2*a)+u*(o*p+u+2*c)+l}else u=r,p=Math.max(0,-(o*u+a)),d=-p*p+u*(u+2*c)+l;else u=-r,p=Math.max(0,-(o*u+a)),d=-p*p+u*(u+2*c)+l;else u<=-g?(p=Math.max(0,-(-o*r+a)),u=p>0?-r:Math.min(Math.max(-r,-c),r),d=-p*p+u*(u+2*c)+l):u<=g?(p=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(p=Math.max(0,-(o*r+a)),u=p>0?r:Math.min(Math.max(-r,-c),r),d=-p*p+u*(u+2*c)+l);else u=o>0?-r:r,p=Math.max(0,-(o*u+a)),d=-p*p+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Sl).addScaledVector(zr,u),d}intersectSphere(t,e){if(t.radius<0)return null;$n.subVectors(t.center,this.origin);let n=$n.dot(this.direction),s=$n.dot($n)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-u.z)*p,c=(t.max.z-u.z)*p):(a=(t.max.z-u.z)*p,c=(t.min.z-u.z)*p),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,$n)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,p=t.x-o.x,u=t.y-o.y,d=t.z-o.z,g=e.x-o.x,_=e.y-o.y,f=e.z-o.z,m=n.x-o.x,M=n.y-o.y,A=n.z-o.z,b=Math.abs(c),S=Math.abs(l),E=Math.abs(h),x,w,N,R,I,C,O,P,W,k,G,tt;if(b>=S&&b>=E?(N=c,C=p,W=g,tt=m,c>=0?(x=l,w=h,R=u,I=d,O=_,P=f,k=M,G=A):(x=h,w=l,R=d,I=u,O=f,P=_,k=A,G=M)):S>=E?(N=l,C=u,W=_,tt=M,l>=0?(x=h,w=c,R=d,I=p,O=f,P=g,k=A,G=m):(x=c,w=h,R=p,I=d,O=g,P=f,k=m,G=A)):(N=h,C=d,W=f,tt=A,h>=0?(x=c,w=l,R=p,I=u,O=g,P=_,k=m,G=M):(x=l,w=c,R=u,I=p,O=_,P=g,k=M,G=m)),N===0)return null;let H=x/N,Q=w/N,et=1/N,bt=R-H*C,zt=I-Q*C,Z=O-H*W,ct=P-Q*W,vt=k-H*tt,Lt=G-Q*tt,mt=vt*ct-Lt*Z,kt=bt*Lt-zt*vt,ge=Z*zt-ct*bt;if(s){if(mt<0||kt<0||ge<0)return null}else if((mt<0||kt<0||ge<0)&&(mt>0||kt>0||ge>0))return null;let Ot=mt+kt+ge;if(Ot===0)return null;let se=et*(mt*C+kt*W+ge*tt);return(Ot>0?se<0:se>0)?null:this.at(se/Ot,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},be=class extends ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},_h=new ne,Di=new gi,Gr=new Qn,yh=new F,Hr=new F,Vr=new F,Wr=new F,wl=new F,Xr=new F,vh=new F,qr=new F,Zt=class extends ke{constructor(t=new Ze,e=new be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Xr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],p=r[c];h!==0&&(wl.fromBufferAttribute(p,t),o?Xr.addScaledVector(wl,h):Xr.addScaledVector(wl.sub(e),h))}e.add(Xr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(r),Di.copy(t.ray).recast(t.near),!(Gr.containsPoint(Di.origin)===!1&&(Di.intersectSphere(Gr,yh)===null||Di.origin.distanceToSquared(yh)>(t.far-t.near)**2))&&(_h.copy(r).invert(),Di.copy(t.ray).applyMatrix4(_h),!(n.boundingBox!==null&&Di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Di)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,u=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let f=u[g],m=o[f.materialIndex],M=Math.max(f.start,d.start),A=Math.min(a.count,Math.min(f.start+f.count,d.start+d.count));for(let b=M,S=A;b<S;b+=3){let E=a.getX(b),x=a.getX(b+1),w=a.getX(b+2);s=Yr(this,m,t,n,l,h,p,E,x,w),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let f=g,m=_;f<m;f+=3){let M=a.getX(f),A=a.getX(f+1),b=a.getX(f+2);s=Yr(this,o,t,n,l,h,p,M,A,b),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let f=u[g],m=o[f.materialIndex],M=Math.max(f.start,d.start),A=Math.min(c.count,Math.min(f.start+f.count,d.start+d.count));for(let b=M,S=A;b<S;b+=3){let E=b,x=b+1,w=b+2;s=Yr(this,m,t,n,l,h,p,E,x,w),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let f=g,m=_;f<m;f+=3){let M=f,A=f+1,b=f+2;s=Yr(this,o,t,n,l,h,p,M,A,b),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}};function Mf(i,t,e,n,s,r,o,a){let c;if(t.side===tn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===bi,a),c===null)return null;qr.copy(a),qr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(qr);return l<e.near||l>e.far?null:{distance:l,point:qr.clone(),object:i}}function Yr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Hr),i.getVertexPosition(c,Vr),i.getVertexPosition(l,Wr);let h=Mf(i,t,e,n,Hr,Vr,Wr,vh);if(h){let p=new F;Jn.getBarycoord(vh,Hr,Vr,Wr,p),s&&(h.uv=Jn.getInterpolatedAttribute(s,a,c,l,p,new Yt)),r&&(h.uv1=Jn.getInterpolatedAttribute(r,a,c,l,p,new Yt)),o&&(h.normal=Jn.getInterpolatedAttribute(o,a,c,l,p,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new F,materialIndex:0};Jn.getNormal(Hr,Vr,Wr,u.normal),h.face=u,h.barycoord=p}return h}var Js=class extends Qe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=xe,h=xe,p,u){super(null,o,a,c,l,h,s,r,p,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ps=class extends pn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},is=new ne,bh=new ne,Zr=[],Mh=new rn,Sf=new ne,Os=new Zt,Bs=new Qn,Ui=class extends Zt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ps(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Sf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new rn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Mh.copy(t.boundingBox).applyMatrix4(is),this.boundingBox.union(Mh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Bs.copy(t.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Os.geometry=this.geometry,Os.material=this.material,Os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bs.copy(this.boundingSphere),Bs.applyMatrix4(n),t.ray.intersectsSphere(Bs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,is),bh.multiplyMatrices(n,is),Os.matrixWorld=bh,Os.raycast(t,Zr);for(let o=0,a=Zr.length;o<a;o++){let c=Zr[o];c.instanceId=r,c.object=this,e.push(c)}Zr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ps(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Js(new Float32Array(s*this.count),s,this.count,Yo,Sn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ni=new Qn,wf=new Yt(.5,.5),$r=new F,xi=class{constructor(t=new fn,e=new fn,n=new fn,s=new fn,r=new fn,o=new fn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=bn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],p=r[5],u=r[6],d=r[7],g=r[8],_=r[9],f=r[10],m=r[11],M=r[12],A=r[13],b=r[14],S=r[15];if(s[0].setComponents(l-o,d-h,m-g,S-M).normalize(),s[1].setComponents(l+o,d+h,m+g,S+M).normalize(),s[2].setComponents(l+a,d+p,m+_,S+A).normalize(),s[3].setComponents(l-a,d-p,m-_,S-A).normalize(),n)s[4].setComponents(c,u,f,b).normalize(),s[5].setComponents(l-c,d-u,m-f,S-b).normalize();else if(s[4].setComponents(l-c,d-u,m-f,S-b).normalize(),e===bn)s[5].setComponents(l+c,d+u,m+f,S+b).normalize();else if(e===cs)s[5].setComponents(c,u,f,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(t){Ni.center.set(0,0,0);let e=wf.distanceTo(t.center);return Ni.radius=.7071067811865476+e,Ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if($r.x=s.normal.x>0?t.max.x:t.min.x,$r.y=s.normal.y>0?t.max.y:t.min.y,$r.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($r)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Sh=new ne,Mo=class i{constructor(){this.coordinateSystem=bn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Sh.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new xi),n[s].setFromProjectionMatrix(Sh,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new xi),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var ms=class extends ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},So=new F,wo=new F,wh=new ne,zs=new gi,Jr=new Qn,El=new F,Eh=new F,Eo=class extends ke{constructor(t=new Ze,e=new ms){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)So.fromBufferAttribute(e,s-1),wo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=So.distanceTo(wo);t.setAttribute("lineDistance",new de(n,1))}else Bt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(s),Jr.radius+=r,t.ray.intersectsSphere(Jr)===!1)return;wh.copy(s).invert(),zs.copy(t.ray).applyMatrix4(wh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,f=g-1;_<f;_+=l){let m=h.getX(_),M=h.getX(_+1),A=Kr(this,t,zs,c,m,M,_);A&&e.push(A)}if(this.isLineLoop){let _=h.getX(g-1),f=h.getX(d),m=Kr(this,t,zs,c,_,f,g-1);m&&e.push(m)}}else{let d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,f=g-1;_<f;_+=l){let m=Kr(this,t,zs,c,_,_+1,_);m&&e.push(m)}if(this.isLineLoop){let _=Kr(this,t,zs,c,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Kr(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(So.fromBufferAttribute(a,s),wo.fromBufferAttribute(a,r),e.distanceSqToSegment(So,wo,El,Eh)>n)return;El.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(El);if(!(l<t.near||l>t.far))return{distance:l,point:Eh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Th=new F,Ah=new F,Fi=class extends Eo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Th.fromBufferAttribute(e,s),Ah.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Th.distanceTo(Ah);t.setAttribute("lineDistance",new de(n,1))}else Bt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ks=class extends Qe{constructor(t=[],e=ki,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ei=class extends Qe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ni=class extends Qe{constructor(t,e,n=Rn,s,r,o,a=xe,c=xe,l,h=jn,p=1){if(h!==jn&&h!==ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:p};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new us(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},js=class extends ni{constructor(t,e=Rn,n=ki,s,r,o=xe,a=xe,c,l=jn){let h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Qs=class extends Qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ce=class i extends Ze{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],p=[],u=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(p,2));function g(_,f,m,M,A,b,S,E,x,w,N){let R=b/x,I=S/w,C=b/2,O=S/2,P=E/2,W=x+1,k=w+1,G=0,tt=0,H=new F;for(let Q=0;Q<k;Q++){let et=Q*I-O;for(let bt=0;bt<W;bt++){let zt=bt*R-C;H[_]=zt*M,H[f]=et*A,H[m]=P,l.push(H.x,H.y,H.z),H[_]=0,H[f]=0,H[m]=E>0?1:-1,h.push(H.x,H.y,H.z),p.push(bt/x),p.push(1-Q/w),G+=1}}for(let Q=0;Q<w;Q++)for(let et=0;et<x;et++){let bt=u+et+W*Q,zt=u+et+W*(Q+1),Z=u+(et+1)+W*(Q+1),ct=u+(et+1)+W*Q;c.push(bt,zt,ct),c.push(zt,Z,ct),tt+=6}a.addGroup(d,tt,N),d+=tt,u+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var tr=class i extends Ze{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new F,h=new Yt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let p=0,u=3;p<=e;p++,u+=3){let d=n+p/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,c.push(h.x,h.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new de(o,3)),this.setAttribute("normal",new de(a,3)),this.setAttribute("uv",new de(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},gn=class i extends Ze{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],p=[],u=[],d=[],g=0,_=[],f=n/2,m=0;M(),o===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new de(p,3)),this.setAttribute("normal",new de(u,3)),this.setAttribute("uv",new de(d,2));function M(){let b=new F,S=new F,E=0,x=(e-t)/n;for(let w=0;w<=r;w++){let N=[],R=w/r,I=R*(e-t)+t;for(let C=0;C<=s;C++){let O=C/s,P=O*c+a,W=Math.sin(P),k=Math.cos(P);S.x=I*W,S.y=-R*n+f,S.z=I*k,p.push(S.x,S.y,S.z),b.set(W,x,k).normalize(),u.push(b.x,b.y,b.z),d.push(O,1-R),N.push(g++)}_.push(N)}for(let w=0;w<s;w++)for(let N=0;N<r;N++){let R=_[N][w],I=_[N+1][w],C=_[N+1][w+1],O=_[N][w+1];(t>0||N!==0)&&(h.push(R,I,O),E+=3),(e>0||N!==r-1)&&(h.push(I,C,O),E+=3)}l.addGroup(m,E,0),m+=E}function A(b){let S=g,E=new Yt,x=new F,w=0,N=b===!0?t:e,R=b===!0?1:-1;for(let C=1;C<=s;C++)p.push(0,f*R,0),u.push(0,R,0),d.push(.5,.5),g++;let I=g;for(let C=0;C<=s;C++){let P=C/s*c+a,W=Math.cos(P),k=Math.sin(P);x.x=N*k,x.y=f*R,x.z=N*W,p.push(x.x,x.y,x.z),u.push(0,R,0),E.x=W*.5+.5,E.y=k*.5*R+.5,d.push(E.x,E.y),g++}for(let C=0;C<s;C++){let O=S+C,P=I+C;b===!0?h.push(P,P+1,O):h.push(P+1,P,O),w+=3}l.addGroup(m,w,b===!0?1:2),m+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},gs=class i extends gn{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var jr=new F,Qr=new F,Tl=new F,to=new Jn,er=class extends Ze{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(oo*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],p=new Array(3),u=new Map,d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:_,b:f,c:m}=to;if(_.fromBufferAttribute(a,l[0]),f.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),to.getNormal(Tl),p[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,p[1]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,p[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let M=0;M<3;M++){let A=(M+1)%3,b=p[M],S=p[A],E=to[h[M]],x=to[h[A]],w=`${b}_${S}`,N=`${S}_${b}`,R=u.get(N);R?(Tl.dot(R.normal)<=r&&(d.push(E.x,E.y,E.z),d.push(x.x,x.y,x.z)),u.set(N,null)):u.has(w)||u.set(w,{index0:l[M],index1:l[A],normal:Tl.clone()})}}for(let g of u.values())if(g){let{index0:_,index1:f}=g;jr.fromBufferAttribute(a,_),Qr.fromBufferAttribute(a,f),d.push(jr.x,jr.y,jr.z),d.push(Qr.x,Qr.y,Qr.z)}this.setAttribute("position",new de(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Oi=class i extends Ze{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,p=t/a,u=e/c,d=[],g=[],_=[],f=[];for(let m=0;m<h;m++){let M=m*u-o;for(let A=0;A<l;A++){let b=A*p-r;g.push(b,-M,0),_.push(0,0,1),f.push(A/a),f.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<a;M++){let A=M+l*m,b=M+l*(m+1),S=M+1+l*(m+1),E=M+1+l*m;d.push(A,b,E),d.push(b,S,E)}this.setIndex(d),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},ii=class i extends Ze{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],p=t,u=(e-t)/s,d=new F,g=new Yt;for(let _=0;_<=s;_++){for(let f=0;f<=n;f++){let m=r+f/n*o;d.x=p*Math.cos(m),d.y=p*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}p+=u}for(let _=0;_<s;_++){let f=_*(n+1);for(let m=0;m<n;m++){let M=m+f,A=M,b=M+n+1,S=M+n+2,E=M+1;a.push(A,b,E),a.push(b,S,E)}}this.setIndex(a),this.setAttribute("position",new de(c,3)),this.setAttribute("normal",new de(l,3)),this.setAttribute("uv",new de(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var nr=class i extends Ze{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],p=[],u=new F,d=new F,g=new F;for(let _=0;_<=n;_++){let f=o+_/n*a;for(let m=0;m<=s;m++){let M=m/s*r;d.x=(t+e*Math.cos(f))*Math.cos(M),d.y=(t+e*Math.cos(f))*Math.sin(M),d.z=e*Math.sin(f),l.push(d.x,d.y,d.z),u.x=t*Math.cos(M),u.y=t*Math.sin(M),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),p.push(m/s),p.push(_/n)}}for(let _=1;_<=n;_++)for(let f=1;f<=s;f++){let m=(s+1)*_+f-1,M=(s+1)*(_-1)+f-1,A=(s+1)*(_-1)+f,b=(s+1)*_+f;c.push(m,M,b),c.push(M,A,b)}this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Hi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Rh(s))s.isRenderTargetTexture?(Bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Rh(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function $e(i){let t={};for(let e=0;e<i.length;e++){let n=Hi(i[e]);for(let s in n)t[s]=n[s]}return t}function Rh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ef(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}var Mu={clone:Hi,merge:$e},Tf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zn=class extends ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tf,this.fragmentShader=Af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=Ef(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Kt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Yt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new _e().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ht().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ne().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},To=class extends zn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ir=class extends ti{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Kt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ao=class extends ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=au,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ro=class extends ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ss(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function eo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var _i=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Co=class extends _i{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cl,endingEnd:Cl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Il:r=t,a=2*e-n;break;case Pl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Il:o=t,c=2*n-e;break;case Pl:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),_=g*g,f=_*g,m=-u*f+2*u*_-u*g,M=(1+u)*f+(-1.5-2*u)*_+(-.5+u)*g+1,A=(-1-d)*f+(1.5+d)*_+.5*g,b=d*f-d*_;for(let S=0;S!==a;++S)r[S]=m*o[h+S]+M*o[l+S]+A*o[c+S]+b*o[p+S];return r}},Io=class extends _i{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),p=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*p+o[c+u]*h;return r}},Po=class extends _i{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Lo=class extends _i{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this.inTangents,p=this.outTangents;if(!h||!p){let g=(n-e)/(s-e),_=1-g;for(let f=0;f!==a;++f)r[f]=o[l+f]*_+o[c+f]*g;return r}let u=a*2,d=t-1;for(let g=0;g!==a;++g){let _=o[l+g],f=o[c+g],m=d*u+g*2,M=p[m],A=p[m+1],b=t*u+g*2,S=h[b],E=h[b+1],x=Cf(n,e,M,S,s);r[g]=Su(x,_,A,E,f)}return r}};function Su(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Rf(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Cf(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Su(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=Rf(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var xn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ss(e,this.TimeBufferType),this.values=ss(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ss(t.times,Array),values:ss(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),eo(t.settings)&&(n.settings={inTangents:ss(t.settings.inTangents,Array),outTangents:ss(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Po(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Io(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Co(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Lo(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Gs:e=this.InterpolantFactoryMethodDiscrete;break;case xo:e=this.InterpolantFactoryMethodLinear;break;case so:e=this.InterpolantFactoryMethodSmooth;break;case Rl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Bt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gs;case this.InterpolantFactoryMethodLinear:return xo;case this.InterpolantFactoryMethodSmooth:return so;case this.InterpolantFactoryMethodBezier:return Rl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;eo(this.settings)&&(Ch(this.settings.inTangents,t),Ch(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;eo(this.settings)&&(Ih(this.settings.inTangents,t),Ih(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Gt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Gt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Gt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Gt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&ef(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Gt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===so,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let p=a*n,u=p-n,d=p+n;for(let g=0;g!==n;++g){let _=e[p+g];if(_!==e[u+g]||_!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let p=a*n,u=o*n;for(let d=0;d!==n;++d)e[u+d]=e[p+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,eo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Ch(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function Ih(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=xo;var yi=class extends xn{constructor(t,e,n){super(t,e,n)}};yi.prototype.ValueTypeName="bool";yi.prototype.ValueBufferType=Array;yi.prototype.DefaultInterpolation=Gs;yi.prototype.InterpolantFactoryMethodLinear=void 0;yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Do=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};Do.prototype.ValueTypeName="color";var No=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};No.prototype.ValueTypeName="number";var Uo=class extends _i{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Bn.slerpFlat(r,0,o,l-a,o,l,c);return r}},sr=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Uo(this.times,this.values,this.getValueSize(),t)}};sr.prototype.ValueTypeName="quaternion";sr.prototype.InterpolantFactoryMethodSmooth=void 0;var vi=class extends xn{constructor(t,e,n){super(t,e,n)}};vi.prototype.ValueTypeName="string";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=Gs;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Fo=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};Fo.prototype.ValueTypeName="vector";var Oo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,p){return l.push(h,p),this},this.removeHandler=function(h){let p=l.indexOf(h);return p!==-1&&l.splice(p,2),this},this.getHandler=function(h){for(let p=0,u=l.length;p<u;p+=2){let d=l[p],g=l[p+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},wu=new Oo,Bo=class{constructor(t){this.manager=t!==void 0?t:wu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Bo.DEFAULT_MATERIAL_NAME="__DEFAULT";var rr=class extends ke{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},or=class extends rr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Al=new ne,Ph=new F,Lh=new F,zo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Yt(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xi,this._frameExtents=new Yt(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Ph.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ph),Lh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Al.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Al,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===cs||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Al)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},no=new F,io=new Bn,Un=new F,ar=class extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(no,io,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,Un.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(no,io,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,Un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},pi=new F,Dh=new Yt,Nh=new Yt,je=class extends ar{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=_o*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(oo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _o*2*Math.atan(Math.tan(oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,Dh,Nh),e.subVectors(Nh,Dh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(oo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var lr=class extends ar{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ll=class extends zo{constructor(){super(new lr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},cr=class extends rr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new Ll}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var rs=-90,os=1,xs=class extends ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new je(rs,os,t,e);s.layers=this.layers,this.add(s);let r=new je(rs,os,t,e);r.layers=this.layers,this.add(r);let o=new je(rs,os,t,e);o.layers=this.layers,this.add(o);let a=new je(rs,os,t,e);a.layers=this.layers,this.add(a);let c=new je(rs,os,t,e);c.layers=this.layers,this.add(c);let l=new je(rs,os,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===cs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(p,u,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ko=class extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var hc="\\[\\]\\.:\\/",If=new RegExp("["+hc+"]","g"),uc="[^"+hc+"]",Pf="[^"+hc.replace("\\.","")+"]",Lf=/((?:WC+[\/:])*)/.source.replace("WC",uc),Df=/(WCOD+)?/.source.replace("WCOD",Pf),Nf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uc),Uf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uc),Ff=new RegExp("^"+Lf+Df+Nf+Uf+"$"),Of=["material","materials","bones","map"],Dl=class{constructor(t,e,n){let s=n||me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},me=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(If,"")}static parseTrackName(t){let e=Ff.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Of.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Bt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Gt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Gt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Gt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Gt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Gt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;Gt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};me.Composite=Dl;me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};me.prototype.GetterByBindingType=[me.prototype._getValue_direct,me.prototype._getValue_array,me.prototype._getValue_arrayElement,me.prototype._getValue_toArray];me.prototype.SetterByBindingTypeAndVersioning=[[me.prototype._setValue_direct,me.prototype._setValue_direct_setNeedsUpdate,me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[me.prototype._setValue_array,me.prototype._setValue_array_setNeedsUpdate,me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[me.prototype._setValue_arrayElement,me.prototype._setValue_arrayElement_setNeedsUpdate,me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[me.prototype._setValue_fromArray,me.prototype._setValue_fromArray_setNeedsUpdate,me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var l_=new Float32Array(1);var Uh=new ne,hr=class{constructor(t,e,n=0,s=1/0){this.ray=new gi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ds,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Gt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Uh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uh),this}intersectObject(t,e=!0,n=[]){return Nl(t,this,n,e),n.sort(Fh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Nl(t[s],this,n,e);return n.sort(Fh),n}};function Fh(i,t){return i.distance-t.distance}function Nl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Nl(r[o],t,e,!0)}}var xc=class xc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};xc.prototype.isMatrix2=!0;var Ul=xc;function dc(i,t,e,n){let s=Bf(n);switch(e){case ec:return i*t;case Yo:return i*t/s.components*s.byteLength;case Zo:return i*t/s.components*s.byteLength;case Si:return i*t*2/s.components*s.byteLength;case $o:return i*t*2/s.components*s.byteLength;case nc:return i*t*3/s.components*s.byteLength;case In:return i*t*4/s.components*s.byteLength;case Jo:return i*t*4/s.components*s.byteLength;case fr:case pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case mr:case gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case jo:case ta:return Math.max(i,16)*Math.max(t,8)/4;case Ko:case Qo:return Math.max(i,8)*Math.max(t,8)/2;case ea:case na:case sa:case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ia:case xr:case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case la:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ca:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ha:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case da:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case fa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case pa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case xa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case _a:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ya:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case va:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ba:case Ma:case Sa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case wa:case Ea:return Math.ceil(i/4)*Math.ceil(t/4)*8;case _r:case Ta:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Bf(i){switch(i){case on:case Kl:return{byteLength:1,components:1};case bs:case jl:case Cn:return{byteLength:2,components:1};case Xo:case qo:return{byteLength:2,components:4};case Rn:case Wo:case Sn:return{byteLength:4,components:1};case Ql:case tc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function qu(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function qf(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,p=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,c,l){let h=c.array,p=c.updateRanges;if(i.bindBuffer(l,a),p.length===0)i.bufferSubData(l,0,h);else{p.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<p.length;d++){let g=p[u],_=p[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,p[u]=_)}p.length=u+1;for(let d=0,g=p.length;d<g;d++){let _=p[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Yf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zf=`#ifdef USE_ALPHAHASH
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
#endif`,$f=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qf=`#ifdef USE_AOMAP
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
#endif`,tp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ep=`#ifdef USE_BATCHING
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
#endif`,np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,op=`#ifdef USE_IRIDESCENCE
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
#endif`,ap=`#ifdef USE_BUMPMAP
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
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,fp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,gp=`#define PI 3.141592653589793
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
} // validated`,xp=`vec3 transformedNormal = objectNormal;
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
#endif`,_p=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Tp=`#ifdef USE_ENVMAP
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
#endif`,Ap=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
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
#endif`,Cp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dp=`#ifdef USE_GRADIENTMAP
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
}`,Np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Up=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Op=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Bp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
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
				#ifdef ENVMAP_TYPE_PMREM
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
#endif`,zp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
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
#endif`,Wp=`uniform sampler2D dfgLUT;
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
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
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
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
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
		float roughness = max( material.clearcoatRoughness, 0.045 );
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
	float roughness = max( material.roughness, 0.045 );
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
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
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
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
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
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
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
}`,Xp=`
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
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
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
#endif`,Yp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zp=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
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
#endif`,$p=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,em=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,nm=`#if defined( USE_POINTS_UV )
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
#endif`,im=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,om=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,am=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lm=`#ifdef USE_MORPHTARGETS
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
#endif`,cm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,um=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,dm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,mm=`#ifdef USE_NORMALMAP
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
#endif`,gm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_m=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Em=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Am=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
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
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
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
#endif`,Cm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Im=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pm=`float getShadowMask() {
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
}`,Lm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dm=`#ifdef USE_SKINNING
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
#endif`,Nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Um=`#ifdef USE_SKINNING
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
#endif`,Fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Om=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,km=`#ifdef USE_TRANSMISSION
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
#endif`,Gm=`#ifdef USE_TRANSMISSION
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
#endif`,Hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,Vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
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
#endif`,Xm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,qm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ym=`uniform sampler2D t2D;
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
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$m=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Km=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`#include <common>
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
}`,Qm=`#if DEPTH_PACKING == 3200
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
}`,tg=`#define DISTANCE
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
}`,eg=`#define DISTANCE
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
}`,ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ig=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`uniform float scale;
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
}`,rg=`uniform vec3 diffuse;
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
}`,og=`#include <common>
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
}`,ag=`uniform vec3 diffuse;
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
}`,lg=`#define LAMBERT
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
}`,cg=`#define LAMBERT
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
}`,hg=`#define MATCAP
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
}`,ug=`#define MATCAP
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
}`,dg=`#define NORMAL
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
}`,fg=`#define NORMAL
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
}`,pg=`#define PHONG
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
}`,mg=`#define PHONG
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
}`,gg=`#define STANDARD
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
}`,xg=`#define STANDARD
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
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
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
}`,_g=`#define TOON
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
}`,yg=`#define TOON
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
}`,vg=`uniform float size;
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
}`,bg=`uniform vec3 diffuse;
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
}`,Mg=`#include <common>
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
}`,Sg=`uniform vec3 color;
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
}`,wg=`uniform float rotation;
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
}`,Eg=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:Yf,alphahash_pars_fragment:Zf,alphamap_fragment:$f,alphamap_pars_fragment:Jf,alphatest_fragment:Kf,alphatest_pars_fragment:jf,aomap_fragment:Qf,aomap_pars_fragment:tp,batching_pars_vertex:ep,batching_vertex:np,begin_vertex:ip,beginnormal_vertex:sp,bsdfs:rp,iridescence_fragment:op,bumpmap_pars_fragment:ap,clipping_planes_fragment:lp,clipping_planes_pars_fragment:cp,clipping_planes_pars_vertex:hp,clipping_planes_vertex:up,color_fragment:dp,color_pars_fragment:fp,color_pars_vertex:pp,color_vertex:mp,common:gp,defaultnormal_vertex:xp,displacementmap_pars_vertex:_p,displacementmap_vertex:yp,emissivemap_fragment:vp,emissivemap_pars_fragment:bp,colorspace_fragment:Mp,colorspace_pars_fragment:Sp,envmap_fragment:wp,envmap_common_pars_fragment:Ep,envmap_pars_fragment:Tp,envmap_pars_vertex:Ap,envmap_physical_pars_fragment:Bp,envmap_vertex:Rp,fog_vertex:Cp,fog_pars_vertex:Ip,fog_fragment:Pp,fog_pars_fragment:Lp,gradientmap_pars_fragment:Dp,lightmap_pars_fragment:Np,lights_lambert_fragment:Up,lights_lambert_pars_fragment:Fp,lights_pars_begin:Op,lights_toon_fragment:zp,lights_toon_pars_fragment:kp,lights_phong_fragment:Gp,lights_phong_pars_fragment:Hp,lights_physical_fragment:Vp,lights_physical_pars_fragment:Wp,lights_fragment_begin:Xp,lights_fragment_maps:qp,lights_fragment_end:Yp,lightprobes_pars_fragment:Zp,logdepthbuf_fragment:$p,logdepthbuf_pars_fragment:Jp,logdepthbuf_pars_vertex:Kp,logdepthbuf_vertex:jp,map_fragment:Qp,map_pars_fragment:tm,map_particle_fragment:em,map_particle_pars_fragment:nm,metalnessmap_fragment:im,metalnessmap_pars_fragment:sm,morphinstance_vertex:rm,morphcolor_vertex:om,morphnormal_vertex:am,morphtarget_pars_vertex:lm,morphtarget_vertex:cm,normal_fragment_begin:hm,normal_fragment_maps:um,normal_pars_fragment:dm,normal_pars_vertex:fm,normal_vertex:pm,normalmap_pars_fragment:mm,clearcoat_normal_fragment_begin:gm,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:_m,iridescence_pars_fragment:ym,opaque_fragment:vm,packing:bm,premultiplied_alpha_fragment:Mm,project_vertex:Sm,dithering_fragment:wm,dithering_pars_fragment:Em,roughnessmap_fragment:Tm,roughnessmap_pars_fragment:Am,shadowmap_pars_fragment:Rm,shadowmap_pars_vertex:Cm,shadowmap_vertex:Im,shadowmask_pars_fragment:Pm,skinbase_vertex:Lm,skinning_pars_vertex:Dm,skinning_vertex:Nm,skinnormal_vertex:Um,specularmap_fragment:Fm,specularmap_pars_fragment:Om,tonemapping_fragment:Bm,tonemapping_pars_fragment:zm,transmission_fragment:km,transmission_pars_fragment:Gm,uv_pars_fragment:Hm,uv_pars_vertex:Vm,uv_vertex:Wm,worldpos_vertex:Xm,background_vert:qm,background_frag:Ym,backgroundCube_vert:Zm,backgroundCube_frag:$m,cube_vert:Jm,cube_frag:Km,depth_vert:jm,depth_frag:Qm,distance_vert:tg,distance_frag:eg,equirect_vert:ng,equirect_frag:ig,linedashed_vert:sg,linedashed_frag:rg,meshbasic_vert:og,meshbasic_frag:ag,meshlambert_vert:lg,meshlambert_frag:cg,meshmatcap_vert:hg,meshmatcap_frag:ug,meshnormal_vert:dg,meshnormal_frag:fg,meshphong_vert:pg,meshphong_frag:mg,meshphysical_vert:gg,meshphysical_frag:xg,meshtoon_vert:_g,meshtoon_frag:yg,points_vert:vg,points_frag:bg,shadow_vert:Mg,shadow_frag:Sg,sprite_vert:wg,sprite_frag:Eg},xt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Gn={basic:{uniforms:$e([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:$e([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Kt(0)},envMapIntensity:{value:1}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:$e([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:$e([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:$e([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:$e([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:$e([xt.points,xt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:$e([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:$e([xt.common,xt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:$e([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:$e([xt.sprite,xt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distance:{uniforms:$e([xt.common,xt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distance_vert,fragmentShader:Jt.distance_frag},shadow:{uniforms:$e([xt.lights,xt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Gn.physical={uniforms:$e([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var Ra={r:0,b:0,g:0},Tg=new ne,Yu=new Ht;Yu.set(-1,0,0,0,1,0,0,0,1);function Ag(i,t,e,n,s,r){let o=new Kt(0),a=s===!0?0:1,c,l,h=null,p=0,u=null;function d(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){let b=M.backgroundBlurriness>0;A=t.get(A,b)}return A}function g(M){let A=!1,b=d(M);b===null?f(o,a):b&&b.isColor&&(f(b,1),A=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,A){let b=d(A);b&&b.isCubeTexture?(l===void 0&&(l=new Zt(new Ce(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:Hi(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,E,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Tg.makeRotationFromEuler(A.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Yu),l.material.toneMapped=te.getTransfer(b.colorSpace)!==ce,(h!==b||p!==b.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,p=b.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Zt(new Oi(2,2),new zn({name:"BackgroundMaterial",uniforms:Hi(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=te.getTransfer(b.colorSpace)!==ce,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||p!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,p=b.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,A){M.getRGB(Ra,cc(i)),e.buffers.color.setClear(Ra.r,Ra.g,Ra.b,A,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,A=1){o.set(M),a=A,f(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,f(o,a)},render:g,addToRenderList:_,dispose:m}}function Rg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(I,C,O,P,W){let k=!1,G=p(I,P,O,C);r!==G&&(r=G,l(r.object)),k=d(I,P,O,W),k&&g(I,P,O,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,b(I,C,O,P),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return i.createVertexArray()}function l(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function p(I,C,O,P){let W=P.wireframe===!0,k=n[C.id];k===void 0&&(k={},n[C.id]=k);let G=I.isInstancedMesh===!0?I.id:0,tt=k[G];tt===void 0&&(tt={},k[G]=tt);let H=tt[O.id];H===void 0&&(H={},tt[O.id]=H);let Q=H[W];return Q===void 0&&(Q=u(c()),H[W]=Q),Q}function u(I){let C=[],O=[],P=[];for(let W=0;W<e;W++)C[W]=0,O[W]=0,P[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:O,attributeDivisors:P,object:I,attributes:{},index:null}}function d(I,C,O,P){let W=r.attributes,k=C.attributes,G=0,tt=O.getAttributes();for(let H in tt)if(tt[H].location>=0){let et=W[H],bt=k[H];if(bt===void 0&&(H==="instanceMatrix"&&I.instanceMatrix&&(bt=I.instanceMatrix),H==="instanceColor"&&I.instanceColor&&(bt=I.instanceColor)),et===void 0||et.attribute!==bt||bt&&et.data!==bt.data)return!0;G++}return r.attributesNum!==G||r.index!==P}function g(I,C,O,P){let W={},k=C.attributes,G=0,tt=O.getAttributes();for(let H in tt)if(tt[H].location>=0){let et=k[H];et===void 0&&(H==="instanceMatrix"&&I.instanceMatrix&&(et=I.instanceMatrix),H==="instanceColor"&&I.instanceColor&&(et=I.instanceColor));let bt={};bt.attribute=et,et&&et.data&&(bt.data=et.data),W[H]=bt,G++}r.attributes=W,r.attributesNum=G,r.index=P}function _(){let I=r.newAttributes;for(let C=0,O=I.length;C<O;C++)I[C]=0}function f(I){m(I,0)}function m(I,C){let O=r.newAttributes,P=r.enabledAttributes,W=r.attributeDivisors;O[I]=1,P[I]===0&&(i.enableVertexAttribArray(I),P[I]=1),W[I]!==C&&(i.vertexAttribDivisor(I,C),W[I]=C)}function M(){let I=r.newAttributes,C=r.enabledAttributes;for(let O=0,P=C.length;O<P;O++)C[O]!==I[O]&&(i.disableVertexAttribArray(O),C[O]=0)}function A(I,C,O,P,W,k,G){G===!0?i.vertexAttribIPointer(I,C,O,W,k):i.vertexAttribPointer(I,C,O,P,W,k)}function b(I,C,O,P){_();let W=P.attributes,k=O.getAttributes(),G=C.defaultAttributeValues;for(let tt in k){let H=k[tt];if(H.location>=0){let Q=W[tt];if(Q===void 0&&(tt==="instanceMatrix"&&I.instanceMatrix&&(Q=I.instanceMatrix),tt==="instanceColor"&&I.instanceColor&&(Q=I.instanceColor)),Q!==void 0){let et=Q.normalized,bt=Q.itemSize,zt=t.get(Q);if(zt===void 0)continue;let Z=zt.buffer,ct=zt.type,vt=zt.bytesPerElement,Lt=ct===i.INT||ct===i.UNSIGNED_INT||Q.gpuType===Wo;if(Q.isInterleavedBufferAttribute){let mt=Q.data,kt=mt.isInterleavedBuffer===!0?mt.stride:mt.itemSize,ge=Q.offset;if(mt.isInstancedInterleavedBuffer||mt.isInstancedBufferAttribute){for(let Ot=0;Ot<H.locationSize;Ot++)m(H.location+Ot,mt.meshPerAttribute);I.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Ot=0;Ot<H.locationSize;Ot++)f(H.location+Ot);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let Ot=0;Ot<H.locationSize;Ot++)A(H.location+Ot,bt/H.locationSize,ct,et,kt*vt,(ge+bt/H.locationSize*Ot)*vt,Lt)}else{if(Q.isInstancedBufferAttribute){for(let mt=0;mt<H.locationSize;mt++)m(H.location+mt,Q.meshPerAttribute);I.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let mt=0;mt<H.locationSize;mt++)f(H.location+mt);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let mt=0;mt<H.locationSize;mt++)A(H.location+mt,bt/H.locationSize,ct,et,bt*vt,bt/H.locationSize*mt*vt,Lt)}}else if(G!==void 0){let et=G[tt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(H.location,et);break;case 3:i.vertexAttrib3fv(H.location,et);break;case 4:i.vertexAttrib4fv(H.location,et);break;default:i.vertexAttrib1fv(H.location,et)}}}}M()}function S(){N();for(let I in n){let C=n[I];for(let O in C){let P=C[O];for(let W in P){let k=P[W];for(let G in k)h(k[G].object),delete k[G];delete P[W]}}delete n[I]}}function E(I){if(n[I.id]===void 0)return;let C=n[I.id];for(let O in C){let P=C[O];for(let W in P){let k=P[W];for(let G in k)h(k[G].object),delete k[G];delete P[W]}}delete n[I.id]}function x(I){for(let C in n){let O=n[C];for(let P in O){let W=O[P];if(W[I.id]===void 0)continue;let k=W[I.id];for(let G in k)h(k[G].object),delete k[G];delete W[I.id]}}}function w(I){for(let C in n){let O=n[C],P=I.isInstancedMesh===!0?I.id:0,W=O[P];if(W!==void 0){for(let k in W){let G=W[k];for(let tt in G)h(G[tt].object),delete G[tt];delete W[k]}delete O[P],Object.keys(O).length===0&&delete n[C]}}}function N(){R(),o=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:R,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfObject:w,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:f,disableUnusedAttributes:M}}function Cg(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Ig(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==In&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let w=x===Cn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==on&&x!==Sn&&!w&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Bt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&p===!1;e.reversedDepthBuffer===!0&&p===!1&&Bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&p===!0&&Bt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:b,maxSamples:S,samples:E}}function Pg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new fn,a=new Ht,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let d=p.length!==0||u||n!==0||s;return s=u,n=p.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){e=h(p,u,0)},this.setState=function(p,u,d){let g=p.clippingPlanes,_=p.clipIntersection,f=p.clipShadows,m=i.get(p);if(!s||g===null||g.length===0||r&&!f)r?h(null):l();else{let M=r?0:n,A=M*4,b=m.clippingState||null;c.value=b,b=h(g,u,A,d);for(let S=0;S!==A;++S)b[S]=e[S];m.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(p,u,d,g){let _=p!==null?p.length:0,f=null;if(_!==0){if(f=c.value,g!==!0||f===null){let m=d+_*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(f===null||f.length<m)&&(f=new Float32Array(m));for(let A=0,b=d;A!==_;++A,b+=4)o.copy(p[A]).applyMatrix4(M,a),o.normal.toArray(f,b),f[b+3]=o.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,f}}var Mr=class extends mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ks(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ce(5,5,5),r=new zn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Bi});r.uniforms.tEquirect.value=e;let o=new Zt(s,r),a=e.minFilter;return e.minFilter===si&&(e.minFilter=ze),new xs(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Eu=256,Lg=3,Dg=20,Zu=256,$u=16,Ng=3,Ug=new F,Fg=new Kt,Ia=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new xs(1,10,null),this._boxMesh=new Zt(new Ce(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Ug}=r,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let p=c.autoClear,u=c.autoClearColor,d=c.autoClearDepth,g=c.autoClearStencil,_=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,_===null&&(t.background=c.getClearColor(Fg));let f=new xs(n,s,h);return f.position.copy(a),f.update(c,t),c.autoClear=p,c.autoClearColor=u,c.autoClearDepth=d,c.autoClearStencil=g,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Au(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Eu,vu(t))}_fromTexture(t,e){t.mapping===ki||t.mapping===vs?this._setSize(t.image.length===0?Eu:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Tu(t,!1,!1),n=Math.log2(t)-Lg;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Tu(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===ki||t.mapping===vs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ru()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Au()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Og(),this._integrationMaterial=Bg());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/$u);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-Ng)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let c=a>0?Math.log2(e)+.5*Math.log2(6/(Zu*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=zg());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function Tu(i,t,e){return new Mr(i,{minFilter:si,generateMipmaps:t,type:Cn,colorSpace:Hs,depthBuffer:e})}function Sr(i,t,e){return new zn({name:i,uniforms:t,vertexShader:Jt.cube_vert,fragmentShader:e,side:tn,blending:Bi,depthTest:!1,depthWrite:!1})}function Og(){return Sr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Zu}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Bg(){return Sr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:$u}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function zg(){return Sr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Dg}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

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

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Au(){return Sr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Ru(){return Sr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function kg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?o(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Mi||d===Ho)if(t.has(u)){let g=t.get(u).texture;return a(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let _=new Mr(g.height);return _.fromEquirectangularTexture(i,u),t.set(u,_),u.addEventListener("dispose",l),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let d=u.mapping,g=d===Mi||d===Ho,_=d===ki||d===vs;if(g||_){let f=e.get(u),m=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Ia(i)),f=g?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),f.texture;if(f!==void 0)return f.texture;{let M=u.image;return g&&M&&M.height>0||_&&M&&c(M)?(n===null&&(n=new Ia(i)),f=g?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),u.addEventListener("dispose",h),f.texture):null}}}return u}function a(u,d){return d===Mi?u.mapping=ki:d===Ho&&(u.mapping=vs),u}function c(u){let d=0,g=6;for(let _=0;_<g;_++)u[_]!==void 0&&d++;return d===g}function l(u){let d=u.target;d.removeEventListener("dispose",l);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function Gg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ks("WebGLRenderer: "+n+" extension not supported."),s}}}function Hg(i,t,e,n){let s={},r=new WeakMap,o=new FinalizationRegistry(g=>delete s[g]);function a(g){c(g.target)}function c(g){g.index!==null&&t.remove(g.index);for(let f in g.attributes)t.remove(g.attributes[f]);g.removeEventListener("dispose",a),delete s[g.id],o.unregister(g);let _=r.get(g);_&&(t.remove(_),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function l(g,_){return s[_.id]!==void 0||(_.addEventListener("dispose",a),s[_.id]=new WeakRef(_),o.register(_,_.id,_),e.memory.geometries++),_}function h(g){let _=g.attributes;for(let f in _)t.update(_[f],i.ARRAY_BUFFER)}function p(g){let _=g.index,f=g.attributes.position,m=0;if(f===void 0)return;let M=_!==null?_.array.length:f.array.length/3-1,A=f.count>=65535?$s:Zs,b=new A(Math.ceil(M/3)*6,1),S=b.array;if(_!==null){let x=_.array;m=_.version;for(let w=0,N=0;w<M;w+=3){let R=x[w+0],I=x[w+1],C=x[w+2];S[N++]=R,S[N++]=I,S[N++]=I,S[N++]=C,S[N++]=C,S[N++]=R}}else{m=f.version;for(let x=0,w=0;x<M;x+=3){let N=x+0,R=x+1,I=x+2;S[w++]=N,S[w++]=R,S[w++]=R,S[w++]=I,S[w++]=I,S[w++]=N}}b.version=m;let E=r.get(g);E&&t.remove(E),r.set(g,b)}function u(g){let _=r.get(g);if(_){let f=g.index;f!==null&&_.version<f.version&&p(g)}else p(g);return r.get(g)}function d(){for(let g in s){let _=s[g].deref();_!==void 0&&c(_)}}return{get:l,update:h,getWireframeAttribute:u,dispose:d}}function Vg(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function c(p,u){i.drawElements(n,u,r,p*o),e.update(u,n,1)}function l(p,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,p*o,d),e.update(u,n,d))}function h(p,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,p,0,d);let _=0;for(let f=0;f<d;f++)_+=u[f];e.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Wg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Gt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Xg(i,t,e){let n=new WeakMap,s=new _e;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==p){let N=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",N)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],A=0;d===!0&&(A=1),g===!0&&(A=2),_===!0&&(A=3);let b=a.attributes.position.count*A,S=1;b>t.maxTextureSize&&(S=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let E=new Float32Array(b*S*4*p),x=new Xs(E,b,S,p);x.type=Sn,x.needsUpdate=!0;let w=A*4;for(let R=0;R<p;R++){let I=f[R],C=m[R],O=M[R],P=b*S*4*R;for(let W=0;W<I.count;W++){let k=W*w;d===!0&&(s.fromBufferAttribute(I,W),E[P+k+0]=s.x,E[P+k+1]=s.y,E[P+k+2]=s.z,E[P+k+3]=0),g===!0&&(s.fromBufferAttribute(C,W),E[P+k+4]=s.x,E[P+k+5]=s.y,E[P+k+6]=s.z,E[P+k+7]=0),_===!0&&(s.fromBufferAttribute(O,W),E[P+k+8]=s.x,E[P+k+9]=s.y,E[P+k+10]=s.z,E[P+k+11]=O.itemSize===4?s.w:1)}}u={count:p,texture:x,size:new Yt(b,S)},n.set(a,u),a.addEventListener("dispose",N)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function qg(i,t,e,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,p=l.geometry,u=t.get(l,p);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var Yg={[Vl]:"LINEAR_TONE_MAPPING",[Wl]:"REINHARD_TONE_MAPPING",[Xl]:"CINEON_TONE_MAPPING",[ql]:"ACES_FILMIC_TONE_MAPPING",[Zl]:"AGX_TONE_MAPPING",[$l]:"NEUTRAL_TONE_MAPPING",[Yl]:"CUSTOM_TONE_MAPPING"};function Zg(i,t,e,n,s,r){let o=new mn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,h=new Ze;h.setAttribute("position",new de([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new de([0,2,0,0,2,0],2));let p=new To({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Zt(h,p),d=new lr(-1,1,1,-1,0,1),g=null,_=null,f=!1,m,M=null,A=[],b=!1;this.setSize=function(S,E){o.setSize(S,E),a!==null&&a.setSize(S,E),c!==null&&c.setSize(S,E);for(let x=0;x<A.length;x++){let w=A[x];w.setSize&&w.setSize(S,E)}},this.setEffects=function(S){A=S,b=A.length>0&&A[0].isRenderPass===!0;let E=o.width,x=o.height;A.length>0&&a===null&&(a=new mn(E,x,{type:Cn,depthBuffer:!1,stencilBuffer:!1}),c=new mn(E,x,{type:Cn,depthBuffer:!1,stencilBuffer:!1}));let w=s===!0&&A.some(N=>N.needsDepthTexture===!0);w!==(o.depthTexture!==null)&&(w===!0&&l===null&&(l=new ni(E,x),r===!0&&(l.format=ri,l.type=Gi)),o.dispose(),o.depthTexture=w?l:null,o.resolveDepthBuffer=w,o.storeMultisampledDepthBuffer=w);for(let N=0;N<A.length;N++){let R=A[N];R.setSize&&R.setSize(E,x),w&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(l)}},this.begin=function(S,E){if(f||S.toneMapping===Mn&&A.length===0)return!1;if(M=E,E!==null){let x=E.width,w=E.height;(o.width!==x||o.height!==w)&&this.setSize(x,w)}return b===!1&&S.setRenderTarget(o),m=S.toneMapping,S.toneMapping=Mn,!0},this.hasRenderPass=function(){return b},this.end=function(S,E){S.toneMapping=m,f=!0;let x=o,w=a;for(let N=0;N<A.length;N++){let R=A[N];R.enabled!==!1&&(R.render(S,w,x,E),R.needsSwap!==!1&&(x=w,w=w===a?c:a))}if(g!==S.outputColorSpace||_!==S.toneMapping){g=S.outputColorSpace,_=S.toneMapping,p.defines={},te.getTransfer(g)===ce&&(p.defines.SRGB_TRANSFER="");let N=Yg[_];N&&(p.defines[N]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=x.texture,S.setRenderTarget(M),S.render(u,d),M=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),h.dispose(),p.dispose()}}var Ju=new Qe,Ku=new ni(1,1),ju=new js(1),Qu=new Xs,td=new bo,ed=new Ks,Cu=[],Iu=[],Pu=new Float32Array(16),Lu=new Float32Array(9),Du=new Float32Array(4);function Ss(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Cu[s];if(r===void 0&&(r=new Float32Array(s),Cu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ie(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Pe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function La(i,t){let e=Iu[t];e===void 0&&(e=new Int32Array(t),Iu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function $g(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2fv(this.addr,t),Pe(e,t)}}function Kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;i.uniform3fv(this.addr,t),Pe(e,t)}}function jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4fv(this.addr,t),Pe(e,t)}}function Qg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ie(e,n))return;Du.set(n),i.uniformMatrix2fv(this.addr,!1,Du),Pe(e,n)}}function tx(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ie(e,n))return;Lu.set(n),i.uniformMatrix3fv(this.addr,!1,Lu),Pe(e,n)}}function ex(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ie(e,n))return;Pu.set(n),i.uniformMatrix4fv(this.addr,!1,Pu),Pe(e,n)}}function nx(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function ix(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2iv(this.addr,t),Pe(e,t)}}function sx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3iv(this.addr,t),Pe(e,t)}}function rx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4iv(this.addr,t),Pe(e,t)}}function ox(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function ax(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2uiv(this.addr,t),Pe(e,t)}}function lx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3uiv(this.addr,t),Pe(e,t)}}function cx(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4uiv(this.addr,t),Pe(e,t)}}function Da(i){return i.version===0&&(i.compareFunction=rc,i.needsUpdate=!0),i}function hx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Da(Ku):r=Ju,e.setTexture2D(t||r,s)}function ux(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||td,s)}function dx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Da(ju):r=ed,e.setTextureCube(t||r,s)}function fx(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Qu,s)}function px(i){switch(i){case 5126:return $g;case 35664:return Jg;case 35665:return Kg;case 35666:return jg;case 35674:return Qg;case 35675:return tx;case 35676:return ex;case 5124:case 35670:return nx;case 35667:case 35671:return ix;case 35668:case 35672:return sx;case 35669:case 35673:return rx;case 5125:return ox;case 36294:return ax;case 36295:return lx;case 36296:return cx;case 35678:case 36198:case 36298:case 36306:case 35682:return hx;case 35679:case 36299:case 36307:return ux;case 35680:case 36300:case 36308:case 36293:return dx;case 36289:case 36303:case 36311:case 36292:return fx}}function mx(i,t){i.uniform1fv(this.addr,t)}function gx(i,t){let e=Ss(t,this.size,2);i.uniform2fv(this.addr,e)}function xx(i,t){let e=Ss(t,this.size,3);i.uniform3fv(this.addr,e)}function _x(i,t){let e=Ss(t,this.size,4);i.uniform4fv(this.addr,e)}function yx(i,t){let e=Ss(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function vx(i,t){let e=Ss(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function bx(i,t){let e=Ss(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Mx(i,t){i.uniform1iv(this.addr,t)}function Sx(i,t){i.uniform2iv(this.addr,t)}function wx(i,t){i.uniform3iv(this.addr,t)}function Ex(i,t){i.uniform4iv(this.addr,t)}function Tx(i,t){i.uniform1uiv(this.addr,t)}function Ax(i,t){i.uniform2uiv(this.addr,t)}function Rx(i,t){i.uniform3uiv(this.addr,t)}function Cx(i,t){i.uniform4uiv(this.addr,t)}function Ix(i,t,e){let n=this.cache,s=t.length,r=La(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Da(Ku):o=Ju;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Px(i,t,e){let n=this.cache,s=t.length,r=La(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||td,r[o])}function Lx(i,t,e){let n=this.cache,s=t.length,r=La(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=Da(ju):o=ed;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function Dx(i,t,e){let n=this.cache,s=t.length,r=La(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Qu,r[o])}function Nx(i){switch(i){case 5126:return mx;case 35664:return gx;case 35665:return xx;case 35666:return _x;case 35674:return yx;case 35675:return vx;case 35676:return bx;case 5124:case 35670:return Mx;case 35667:case 35671:return Sx;case 35668:case 35672:return wx;case 35669:case 35673:return Ex;case 5125:return Tx;case 36294:return Ax;case 36295:return Rx;case 36296:return Cx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ix;case 35679:case 36299:case 36307:return Px;case 35680:case 36300:case 36308:case 36293:return Lx;case 36289:case 36303:case 36311:case 36292:return Dx}}var vc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=px(e.type)}},bc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Nx(e.type)}},Mc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},_c=/(\w+)(\])?(\[|\.)?/g;function Nu(i,t){i.seq.push(t),i.map[t.id]=t}function Ux(i,t,e){let n=i.name,s=n.length;for(_c.lastIndex=0;;){let r=_c.exec(n),o=_c.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Nu(e,l===void 0?new vc(a,i,t):new bc(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new Mc(a),Nu(e,p)),e=p}}}var Ms=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);Ux(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Uu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Fx=37297,Ox=0;function Bx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Fu=new Ht;function zx(i){te._getMatrix(Fu,te.workingColorSpace,i);let t=`mat3( ${Fu.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case Vs:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return Bt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ou(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Bx(i.getShaderSource(t),a)}else return r}function kx(i,t){let e=zx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Gx={[Vl]:"Linear",[Wl]:"Reinhard",[Xl]:"Cineon",[ql]:"ACESFilmic",[Zl]:"AgX",[$l]:"Neutral",[Yl]:"Custom"};function Hx(i,t){let e=Gx[t];return e===void 0?(Bt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ca=new F;function Vx(){te.getLuminanceCoefficients(Ca);let i=Ca.x.toFixed(4),t=Ca.y.toFixed(4),e=Ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(br).join(`
`)}function Xx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function qx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function br(i){return i!==""}function Bu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function zu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sc(i){return i.replace(Yx,Zx)}function Zx(i,t){let e=Jt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Sc(e)}var $x=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ku(i){return i.replace($x,Jx)}function Jx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Gu(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Kx={[ur]:"SHADOWMAP_TYPE_PCF",[_s]:"SHADOWMAP_TYPE_VSM"};function jx(i){return Kx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Qx={[vs]:"ENVMAP_MODE_REFRACTION"};function t0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Qx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var e0={[Hl]:"ENVMAP_BLENDING_MULTIPLY",[su]:"ENVMAP_BLENDING_MIX",[ru]:"ENVMAP_BLENDING_ADD"};function n0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":e0[i.combine]||"ENVMAP_BLENDING_NONE"}function i0(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=jx(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=t0(e),p=n0(e),u=Wx(e),d=Xx(r),g=s.createProgram(),_,f,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(br).join(`
`),_.length>0&&(_+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(br).join(`
`),f.length>0&&(f+=`
`)):(_=[Gu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(br).join(`
`),f=[Gu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Mn?"#define TONE_MAPPING":"",e.toneMapping!==Mn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Mn?Hx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,kx("linearToOutputTexel",e.outputColorSpace),Vx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(br).join(`
`)),o=Sc(o),o=Bu(o,e),o=zu(o,e),a=Sc(a),a=Bu(a,e),a=zu(a,e),o=ku(o),a=ku(a),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,_=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,f=["#define varying in",e.glslVersion===oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let M=m+_+o,A=m+f+a,b=Uu(s,s.VERTEX_SHADER,M),S=Uu(s,s.FRAGMENT_SHADER,A);s.attachShader(g,b),s.attachShader(g,S),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(R){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(g)||"",C=s.getShaderInfoLog(b)||"",O=s.getShaderInfoLog(S)||"",P=I.trim(),W=C.trim(),k=O.trim(),G=!0,tt=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,b,S);else{let H=Ou(s,b,"vertex"),Q=Ou(s,S,"fragment");Gt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+P+`
`+H+`
`+Q)}else P!==""?Bt("WebGLProgram: Program Info Log:",P):(W===""||k==="")&&(tt=!1);tt&&(R.diagnostics={runnable:G,programLog:P,vertexShader:{log:W,prefix:_},fragmentShader:{log:k,prefix:f}})}s.deleteShader(b),s.deleteShader(S),x=new Ms(s,g),w=qx(s,g)}let x;this.getUniforms=function(){return x===void 0&&E(this),x};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(g,Fx)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ox++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=S,this}var s0=0,wc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ec(t),e.set(t,n)),n}},Ec=class{constructor(t){this.id=s0++,this.code=t,this.usedTimes=0}};function r0(i){return i===Si||i===xr||i===_r}function o0(i,t,e,n,s,r){let o=new ds,a=new wc,c=new Set,l=[],h=new Map,p=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return c.add(x),x===0?"uv":`uv${x}`}function g(x,w,N,R,I,C){let O=R.fog,P=I.geometry,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=t.get(x.envMap||W,k),tt=u[x.type],H=n.precision;x.precision!==null&&(H=n.getMaxPrecision(x.precision),H!==x.precision&&Bt("WebGLProgram.getParameters:",x.precision,"not supported, using",H,"instead."));let Q=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,et=Q!==void 0?Q.length:0,bt=0;P.morphAttributes.position!==void 0&&(bt=1),P.morphAttributes.normal!==void 0&&(bt=2),P.morphAttributes.color!==void 0&&(bt=3);let zt,Z,ct,vt;if(tt){let gt=Gn[tt];zt=gt.vertexShader,Z=gt.fragmentShader}else{zt=x.vertexShader,Z=x.fragmentShader;let gt=a.getVertexShaderStage(x),he=a.getFragmentShaderStage(x);a.update(x,gt,he),ct=gt.id,vt=he.id}let Lt=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),kt=I.isInstancedMesh===!0,ge=I.isBatchedMesh===!0,Ot=!!x.map,se=!!x.matcap,le=!!G,Xt=le&&G.isPMREMTexture===!0,Ee=!!x.aoMap,ye=!!x.lightMap,Oe=!!x.bumpMap&&x.wireframe===!1,oe=!!x.normalMap,Te=!!x.displacementMap,Me=!!x.emissiveMap,dt=!!x.metalnessMap,Ct=!!x.roughnessMap,Dt=x.anisotropy>0,D=x.clearcoat>0,Ut=x.diffuseRoughness>0,Mt=x.dispersion>0,Wt=x.retroreflectivity>0,it=x.iridescence>0,Ft=x.sheen>0,At=x.transmission>0,Tt=Dt&&!!x.anisotropyMap,T=D&&!!x.clearcoatMap,y=D&&!!x.clearcoatNormalMap,B=D&&!!x.clearcoatRoughnessMap,nt=Ut&&!!x.diffuseRoughnessMap,q=it&&!!x.iridescenceMap,rt=it&&!!x.iridescenceThicknessMap,at=Ft&&!!x.sheenColorMap,$=Ft&&!!x.sheenRoughnessMap,K=!!x.specularMap,ht=!!x.specularColorMap,L=!!x.specularIntensityMap,j=At&&!!x.transmissionMap,Y=At&&!!x.thicknessMap,ut=!!x.gradientMap,ot=!!x.alphaMap,lt=x.alphaTest>0,It=!!x.alphaHash,$t=!!x.extensions,st=Mn;x.toneMapped&&(Lt===null||Lt.isXRRenderTarget===!0)&&(st=i.toneMapping);let Nt=Xt?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,qt={shaderID:tt,shaderType:x.type,shaderName:x.name,vertexShader:zt,fragmentShader:Z,defines:x.defines,customVertexShaderID:ct,customFragmentShaderID:vt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:H,batching:ge,batchingColor:ge&&I._colorsTexture!==null,instancing:kt,instancingColor:kt&&I.instanceColor!==null,instancingMorph:kt&&I.morphTexture!==null,outputColorSpace:Lt===null?i.outputColorSpace:Lt.isXRRenderTarget===!0?Lt.texture.colorSpace:te.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ot,matcap:se,envMap:le,envMapMode:le&&G.mapping,envMapPMREM:Xt,envMapMaxLod:Xt?Nt.length-1:null,envMapSize:Xt?Nt[0].width:null,aoMap:Ee,lightMap:ye,bumpMap:Oe,normalMap:oe,displacementMap:Te,emissiveMap:Me,normalMapObjectSpace:oe&&x.normalMapType===lu,normalMapTangentSpace:oe&&x.normalMapType===Aa,packedNormalMap:oe&&x.normalMapType===Aa&&r0(x.normalMap.format),metalnessMap:dt,roughnessMap:Ct,anisotropy:Dt,anisotropyMap:Tt,clearcoat:D,clearcoatMap:T,clearcoatNormalMap:y,clearcoatRoughnessMap:B,diffuseRoughness:Ut,diffuseRoughnessMap:nt,dispersion:Mt,retroreflection:Wt,iridescence:it,iridescenceMap:q,iridescenceThicknessMap:rt,sheen:Ft,sheenColorMap:at,sheenRoughnessMap:$,specularMap:K,specularColorMap:ht,specularIntensityMap:L,transmission:At,transmissionMap:j,thicknessMap:Y,gradientMap:ut,opaque:x.transparent===!1&&x.blending===ys&&x.alphaToCoverage===!1,alphaMap:ot,alphaTest:lt,alphaHash:It,combine:x.combine,mapUv:Ot&&d(x.map.channel),aoMapUv:Ee&&d(x.aoMap.channel),lightMapUv:ye&&d(x.lightMap.channel),bumpMapUv:Oe&&d(x.bumpMap.channel),normalMapUv:oe&&d(x.normalMap.channel),displacementMapUv:Te&&d(x.displacementMap.channel),emissiveMapUv:Me&&d(x.emissiveMap.channel),metalnessMapUv:dt&&d(x.metalnessMap.channel),roughnessMapUv:Ct&&d(x.roughnessMap.channel),anisotropyMapUv:Tt&&d(x.anisotropyMap.channel),clearcoatMapUv:T&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:y&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:nt&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:q&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:at&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:$&&d(x.sheenRoughnessMap.channel),specularMapUv:K&&d(x.specularMap.channel),specularColorMapUv:ht&&d(x.specularColorMap.channel),specularIntensityMapUv:L&&d(x.specularIntensityMap.channel),transmissionMapUv:j&&d(x.transmissionMap.channel),thicknessMapUv:Y&&d(x.thicknessMap.channel),alphaMapUv:ot&&d(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(oe||Dt),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!P.attributes.uv&&(Ot||ot),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&oe===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:mt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:bt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:C.filter(gt=>gt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:Ot&&x.map.isVideoTexture===!0&&te.getTransfer(x.map.colorSpace)===ce,decodeVideoTextureEmissive:Me&&x.emissiveMap.isVideoTexture===!0&&te.getTransfer(x.emissiveMap.colorSpace)===ce,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ge,flipSided:x.side===tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:$t&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&x.extensions.multiDraw===!0||ge)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return qt.vertexUv1s=c.has(1),qt.vertexUv2s=c.has(2),qt.vertexUv3s=c.has(3),c.clear(),qt}function _(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let N in x.defines)w.push(N),w.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(f(w,x),m(w,x),w.push(i.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapPMREM),x.push(w.envMapMaxLod),x.push(w.envMapSize),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.diffuseRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.numLightProbeGrids),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function m(x,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.diffuseRoughness&&o.enable(25),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function M(x){let w=u[x.type],N;if(w){let R=Gn[w];N=Mu.clone(R.uniforms)}else N=x.uniforms;return N}function A(x,w){let N=h.get(w);return N!==void 0?++N.usedTimes:(N=new i0(i,w,x,s),l.push(N),h.set(w,N)),N}function b(x){if(--x.usedTimes===0){let w=l.indexOf(x);l[w]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function E(){a.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:M,acquireProgram:A,releaseProgram:b,releaseShaderCache:S,programs:l,dispose:E}}function a0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function l0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Hu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Vu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function a(u,d,g,_,f,m){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:d,material:g,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:f,group:m},i[t]=M):(M.id=u.id,M.object=u,M.geometry=d,M.material=g,M.materialVariant=o(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=f,M.group=m),t++,M}function c(u,d,g,_,f,m,M){M.reversedDepth===!0&&(f=-f);let A=a(u,d,g,_,f,m);g.transmission>0?n.push(A):g.transparent===!0?s.push(A):e.push(A)}function l(u,d,g,_,f,m){let M=a(u,d,g,_,f,m);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,d){e.length>1&&e.sort(u||l0),n.length>1&&n.sort(d||Hu),s.length>1&&s.sort(d||Hu)}function p(){for(let u=t,d=i.length;u<d;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:p,sort:h}}function c0(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Vu,i.set(n,[o])):s>=r.length?(o=new Vu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function h0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new F,color:new Kt};break;case"SpotLight":e={position:new F,direction:new F,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function u0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var d0=0;function f0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function p0(i){let t=new h0,e=u0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);let s=new F,r=new ne,o=new ne;function a(l){let h=0,p=0,u=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let d=0,g=0,_=0,f=0,m=0,M=0,A=0,b=0,S=0,E=0,x=0,w=0,N=0,R=0;l.sort(f0);for(let C=0,O=l.length;C<O;C++){let P=l[C],W=P.color,k=P.intensity,G=P.distance,tt=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Si?tt=P.shadow.map.texture:tt=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=W.r*k,p+=W.g*k,u+=W.b*k;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],k);R++}else if(P.isSunLight){let H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Q=P.shadow,et=e.get(P);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=et,n.sunShadowMap[g]=tt;let bt=Q.getViewportCount();for(let zt=0;zt<bt;zt++)n.sunShadowMatrix[_+zt]=Q.getMatrix(zt),n.sunShadowCascade[_+zt]=Q._cascadeData[zt];_+=bt,g++}n.sun[d]=H,d++}else if(P.isDirectionalLight){let H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Q=P.shadow,et=e.get(P);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,n.directionalShadow[f]=et,n.directionalShadowMap[f]=tt,n.directionalShadowMatrix[f]=P.shadow.matrix,S++}n.directional[f]=H,f++}else if(P.isSpotLight){let H=t.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(W).multiplyScalar(k),H.distance=G,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[M]=H;let Q=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,Q.updateMatrices(P),P.castShadow&&N++),n.spotLightMatrix[M]=Q.matrix,P.castShadow){let et=e.get(P);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,n.spotShadow[M]=et,n.spotShadowMap[M]=tt,x++}M++}else if(P.isRectAreaLight){let H=t.get(P);H.color.copy(W).multiplyScalar(k),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[A]=H,A++}else if(P.isPointLight){let H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){let Q=P.shadow,et=e.get(P);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,et.shadowCameraNear=Q.camera.near,et.shadowCameraFar=Q.camera.far,n.pointShadow[m]=et,n.pointShadowMap[m]=tt,n.pointShadowMatrix[m]=P.shadow.matrix,E++}n.point[m]=H,m++}else if(P.isHemisphereLight){let H=t.get(P);H.skyColor.copy(P.color).multiplyScalar(k),H.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[b]=H,b++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=u;let I=n.hash;(I.sunLength!==d||I.directionalLength!==f||I.pointLength!==m||I.spotLength!==M||I.rectAreaLength!==A||I.hemiLength!==b||I.numSunShadows!==g||I.numDirectionalShadows!==S||I.numPointShadows!==E||I.numSpotShadows!==x||I.numSpotMaps!==w||I.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=f,n.spot.length=M,n.rectArea.length=A,n.point.length=m,n.hemi.length=b,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+w-N,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=R,I.sunLength=d,I.directionalLength=f,I.pointLength=m,I.spotLength=M,I.rectAreaLength=A,I.hemiLength=b,I.numSunShadows=g,I.numDirectionalShadows=S,I.numPointShadows=E,I.numSpotShadows=x,I.numSpotMaps=w,I.numLightProbes=R,n.version=d0++)}function c(l,h){let p=0,u=0,d=0,g=0,_=0,f=0,m=h.matrixWorldInverse;for(let M=0,A=l.length;M<A;M++){let b=l[M];if(b.isSunLight){let S=n.sun[p];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(m),p++}else if(b.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(b.isSpotLight){let S=n.spot[g];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),g++}else if(b.isRectAreaLight){let S=n.rectArea[_];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){let S=n.point[d];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){let S=n.hemi[f];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(m),f++}}}return{setup:a,setupView:c,state:n}}function Wu(i){let t=new p0(i),e=[],n=[],s=[];function r(p){h.camera=p,e.length=0,n.length=0,s.length=0}function o(p){p.isLightProbeGrid?s.push(p):e.push(p)}function a(p){n.push(p)}function c(){t.setup(e),s.sort((p,u)=>p.priority-u.priority||p.id-u.id)}function l(p){t.setupView(e,p)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function m0(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Wu(i),t.set(s,[a])):r>=o.length?(a=new Wu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var g0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,x0=`uniform sampler2D shadow_pass;
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
}`,_0=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],y0=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Xu=new ne,vr=new F,yc=new F;function v0(i,t,e){let n=new xi,s=new Yt,r=new Yt,o=new _e,a=new Ao,c=new Ro,l={},h=e.maxTextureSize,p={[bi]:tn,[tn]:bi,[Ge]:Ge},u=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:g0,fragmentShader:x0}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new Ze;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Zt(g,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ur;let m=this.type;this.render=function(E,x,w){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||E.length===0)return;this.type===zh&&(Bt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ur);let N=i.getRenderTarget(),R=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),C=i.state;C.setBlending(Bi),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);let O=m!==this.type;O&&x.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(W=>W.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,W=E.length;P<W;P++){let k=E[P],G=k.shadow;if(G===void 0){Bt("WebGLShadowMap:",k,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let tt=G.getFrameExtents();s.multiply(tt),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,G.mapSize.y=r.y));let H=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=H,G.map===null||O===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===_s){if(k.isPointLight){Bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new mn(s.x,s.y,{format:Si,type:Cn,minFilter:ze,magFilter:ze,generateMipmaps:!1}),G.map.texture.name=k.name+".shadowMap",G.map.depthTexture=new ni(s.x,s.y,Sn),G.map.depthTexture.name=k.name+".shadowMapDepth",G.map.depthTexture.format=jn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=xe,G.map.depthTexture.magFilter=xe}else k.isPointLight?(G.map=new Mr(s.x),G.map.depthTexture=new js(s.x,Rn)):(G.map=new mn(s.x,s.y),G.map.depthTexture=new ni(s.x,s.y,Rn)),G.map.depthTexture.name=k.name+".shadowMap",G.map.depthTexture.format=jn,this.type===ur?(G.map.depthTexture.compareFunction=H?sc:ic,G.map.depthTexture.minFilter=ze,G.map.depthTexture.magFilter=ze):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=xe,G.map.depthTexture.magFilter=xe);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);let Q=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();k.isPointLight!==!0&&G.updateMatrices(k,w);let et=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:w.layers;for(let bt=0;bt<Q;bt++){let zt=G.getCamera(bt);if(k.isPointLight){let Z=G.camera,ct=G.matrix,vt=k.distance||Z.far;vt!==Z.far&&(Z.far=vt,Z.updateProjectionMatrix()),vr.setFromMatrixPosition(k.matrixWorld),Z.position.copy(vr),yc.copy(Z.position),yc.add(_0[bt]),Z.up.copy(y0[bt]),Z.lookAt(yc),Z.updateMatrixWorld(),ct.makeTranslation(-vr.x,-vr.y,-vr.z),Xu.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Xu,Z.coordinateSystem,Z.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,bt),i.clear();else{bt===0&&(i.setRenderTarget(G.map),i.clear());let Z=G.getViewport(bt);o.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),C.viewport(o)}n=G.getFrustum(bt),b(x,w,zt,k,et,this.type)}G.isPointLightShadow!==!0&&this.type===_s&&M(G,w),G.needsUpdate=!1}m=this.type,f.needsUpdate=!1,i.setRenderTarget(N,R,I)};function M(E,x){let w=t.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new mn(s.x,s.y,{format:Si,type:Cn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(x,null,w,u,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(x,null,w,d,_,null)}function A(E,x,w,N){let R=null,I=w.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)R=I;else if(R=w.isPointLight===!0?c:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let C=R.uuid,O=x.uuid,P=l[C];P===void 0&&(P={},l[C]=P);let W=P[O];W===void 0&&(W=R.clone(),P[O]=W,x.addEventListener("dispose",S)),R=W}if(R.visible=x.visible,R.wireframe=x.wireframe,N===_s?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:p[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,w.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let C=i.properties.get(R);C.light=w}return R}function b(E,x,w,N,R,I){if(E.visible===!1)return;if(E.layers.test(R)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&I===_s)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,E.matrixWorld);let P=t.update(E),W=E.material;if(Array.isArray(W)){let k=P.groups;for(let G=0,tt=k.length;G<tt;G++){let H=k[G],Q=W[H.materialIndex];if(Q&&Q.visible){let et=A(E,Q,N,I);E.onBeforeShadow(i,E,x,w,P,et,H),i.renderBufferDirect(w,null,P,et,E,H),E.onAfterShadow(i,E,x,w,P,et,H)}}}else if(W.visible){let k=A(E,W,N,I);E.onBeforeShadow(i,E,x,w,P,k,null),i.renderBufferDirect(w,null,P,k,E,null),E.onAfterShadow(i,E,x,w,P,k,null)}}let O=E.children;for(let P=0,W=O.length;P<W;P++)b(O[P],x,w,N,R,I)}function S(E){E.target.removeEventListener("dispose",S);for(let w in l){let N=l[w],R=E.target.uuid;R in N&&(N[R].dispose(),delete N[R])}}}function b0(i,t){function e(){let L=!1,j=new _e,Y=null,ut=new _e(0,0,0,0);return{setMask:function(ot){Y!==ot&&!L&&(i.colorMask(ot,ot,ot,ot),Y=ot)},setLocked:function(ot){L=ot},setClear:function(ot,lt,It,$t,st){st===!0&&(ot*=$t,lt*=$t,It*=$t),j.set(ot,lt,It,$t),ut.equals(j)===!1&&(i.clearColor(ot,lt,It,$t),ut.copy(j))},reset:function(){L=!1,Y=null,ut.set(-1,0,0,0)}}}function n(){let L=!1,j=!1,Y=null,ut=null,ot=null;return{setReversed:function(lt){if(j!==lt){let It=t.get("EXT_clip_control");lt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),j=lt;let $t=ot;ot=null,this.setClear($t)}},getReversed:function(){return j},setTest:function(lt){lt?mt(i.DEPTH_TEST):kt(i.DEPTH_TEST)},setMask:function(lt){Y!==lt&&!L&&(i.depthMask(lt),Y=lt)},setFunc:function(lt){if(j&&(lt=yu[lt]),ut!==lt){switch(lt){case ao:i.depthFunc(i.NEVER);break;case lo:i.depthFunc(i.ALWAYS);break;case co:i.depthFunc(i.LESS);break;case ls:i.depthFunc(i.LEQUAL);break;case ho:i.depthFunc(i.EQUAL);break;case uo:i.depthFunc(i.GEQUAL);break;case fo:i.depthFunc(i.GREATER);break;case po:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=lt}},setLocked:function(lt){L=lt},setClear:function(lt){ot!==lt&&(ot=lt,j&&(lt=1-lt),i.clearDepth(lt))},reset:function(){L=!1,Y=null,ut=null,ot=null,j=!1}}}function s(){let L=!1,j=null,Y=null,ut=null,ot=null,lt=null,It=null,$t=null,st=null;return{setTest:function(Nt){L||(Nt?mt(i.STENCIL_TEST):kt(i.STENCIL_TEST))},setMask:function(Nt){j!==Nt&&!L&&(i.stencilMask(Nt),j=Nt)},setFunc:function(Nt,qt,gt){(Y!==Nt||ut!==qt||ot!==gt)&&(i.stencilFunc(Nt,qt,gt),Y=Nt,ut=qt,ot=gt)},setOp:function(Nt,qt,gt){(lt!==Nt||It!==qt||$t!==gt)&&(i.stencilOp(Nt,qt,gt),lt=Nt,It=qt,$t=gt)},setLocked:function(Nt){L=Nt},setClear:function(Nt){st!==Nt&&(i.clearStencil(Nt),st=Nt)},reset:function(){L=!1,j=null,Y=null,ut=null,ot=null,lt=null,It=null,$t=null,st=null}}}let r=new e,o=new n,a=new s,c={},l=new WeakMap,h={},p={},u={},d=new WeakMap,g=[],_=null,f=!1,m=null,M=null,A=null,b=null,S=null,E=null,x=null,w=new Kt(0,0,0),N=0,R=!1,I=null,C=null,O=null,P=null,W=null,k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,tt=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(H)[1]),G=tt>=1):H.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),G=tt>=2);let Q=null,et={},bt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),Z=new _e().fromArray(bt),ct=new _e().fromArray(zt);function vt(L,j,Y,ut){let ot=new Uint8Array(4),lt=i.createTexture();i.bindTexture(L,lt),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let It=0;It<Y;It++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(j,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,ot):i.texImage2D(j+It,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ot);return lt}let Lt={};Lt[i.TEXTURE_2D]=vt(i.TEXTURE_2D,i.TEXTURE_2D,1),Lt[i.TEXTURE_CUBE_MAP]=vt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Lt[i.TEXTURE_2D_ARRAY]=vt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Lt[i.TEXTURE_3D]=vt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),mt(i.DEPTH_TEST),o.setFunc(ls),Oe(!1),oe(Fl),mt(i.CULL_FACE),Ee(Bi);function mt(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function kt(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function ge(L,j){return u[L]!==j?(i.bindFramebuffer(L,j),u[L]=j,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=j),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=j),!0):!1}function Ot(L,j){let Y=g,ut=!1;if(L){Y=d.get(j),Y===void 0&&(Y=[],d.set(j,Y));let ot=L.textures;if(Y.length!==ot.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let lt=0,It=ot.length;lt<It;lt++)Y[lt]=i.COLOR_ATTACHMENT0+lt;Y.length=ot.length,ut=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,ut=!0);ut&&i.drawBuffers(Y)}function se(L){return _!==L?(i.useProgram(L),_=L,!0):!1}let le={[zi]:i.FUNC_ADD,[Gh]:i.FUNC_SUBTRACT,[Hh]:i.FUNC_REVERSE_SUBTRACT};le[Vh]=i.MIN,le[Wh]=i.MAX;let Xt={[Xh]:i.ZERO,[qh]:i.ONE,[Yh]:i.SRC_COLOR,[kl]:i.SRC_ALPHA,[Qh]:i.SRC_ALPHA_SATURATE,[Kh]:i.DST_COLOR,[$h]:i.DST_ALPHA,[Zh]:i.ONE_MINUS_SRC_COLOR,[Gl]:i.ONE_MINUS_SRC_ALPHA,[jh]:i.ONE_MINUS_DST_COLOR,[Jh]:i.ONE_MINUS_DST_ALPHA,[tu]:i.CONSTANT_COLOR,[eu]:i.ONE_MINUS_CONSTANT_COLOR,[nu]:i.CONSTANT_ALPHA,[iu]:i.ONE_MINUS_CONSTANT_ALPHA};function Ee(L,j,Y,ut,ot,lt,It,$t,st,Nt){if(L===Bi){f===!0&&(kt(i.BLEND),f=!1);return}if(f===!1&&(mt(i.BLEND),f=!0),L!==kh){if(L!==m||Nt!==R){if((M!==zi||S!==zi)&&(i.blendEquation(i.FUNC_ADD),M=zi,S=zi),Nt)switch(L){case ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ol:i.blendFunc(i.ONE,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Gt("WebGLState: Invalid blending: ",L);break}else switch(L){case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ol:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bl:Gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zl:Gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Gt("WebGLState: Invalid blending: ",L);break}A=null,b=null,E=null,x=null,w.set(0,0,0),N=0,m=L,R=Nt}return}ot=ot||j,lt=lt||Y,It=It||ut,(j!==M||ot!==S)&&(i.blendEquationSeparate(le[j],le[ot]),M=j,S=ot),(Y!==A||ut!==b||lt!==E||It!==x)&&(i.blendFuncSeparate(Xt[Y],Xt[ut],Xt[lt],Xt[It]),A=Y,b=ut,E=lt,x=It),($t.equals(w)===!1||st!==N)&&(i.blendColor($t.r,$t.g,$t.b,st),w.copy($t),N=st),m=L,R=!1}function ye(L,j){L.side===Ge?kt(i.CULL_FACE):mt(i.CULL_FACE);let Y=L.side===tn;j&&(Y=!Y),Oe(Y),L.blending===ys&&L.transparent===!1?Ee(Bi):Ee(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let ut=L.stencilWrite;a.setTest(ut),ut&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Me(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?mt(i.SAMPLE_ALPHA_TO_COVERAGE):kt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(L){I!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),I=L)}function oe(L){L!==Oh?(mt(i.CULL_FACE),L!==C&&(L===Fl?i.cullFace(i.BACK):L===Bh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):kt(i.CULL_FACE),C=L}function Te(L){L!==O&&(G&&i.lineWidth(L),O=L)}function Me(L,j,Y){L?(mt(i.POLYGON_OFFSET_FILL),(P!==j||W!==Y)&&(P=j,W=Y,o.getReversed()&&(j=-j,Y=-Y),i.polygonOffset(j,Y))):kt(i.POLYGON_OFFSET_FILL)}function dt(L){L?mt(i.SCISSOR_TEST):kt(i.SCISSOR_TEST)}function Ct(L){L===void 0&&(L=i.TEXTURE0+k-1),Q!==L&&(i.activeTexture(L),Q=L)}function Dt(L,j,Y){Y===void 0&&(Q===null?Y=i.TEXTURE0+k-1:Y=Q);let ut=et[Y];ut===void 0&&(ut={type:void 0,texture:void 0},et[Y]=ut),(ut.type!==L||ut.texture!==j)&&(Q!==Y&&(i.activeTexture(Y),Q=Y),i.bindTexture(L,j||Lt[L]),ut.type=L,ut.texture=j)}function D(){let L=et[Q];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Ut(){try{i.compressedTexImage2D(...arguments)}catch(L){Gt("WebGLState:",L)}}function Mt(){try{i.compressedTexImage3D(...arguments)}catch(L){Gt("WebGLState:",L)}}function Wt(){try{i.texSubImage2D(...arguments)}catch(L){Gt("WebGLState:",L)}}function it(){try{i.texSubImage3D(...arguments)}catch(L){Gt("WebGLState:",L)}}function Ft(){try{i.compressedTexSubImage2D(...arguments)}catch(L){Gt("WebGLState:",L)}}function At(){try{i.compressedTexSubImage3D(...arguments)}catch(L){Gt("WebGLState:",L)}}function Tt(){try{i.texStorage2D(...arguments)}catch(L){Gt("WebGLState:",L)}}function T(){try{i.texStorage3D(...arguments)}catch(L){Gt("WebGLState:",L)}}function y(){try{i.texImage2D(...arguments)}catch(L){Gt("WebGLState:",L)}}function B(){try{i.texImage3D(...arguments)}catch(L){Gt("WebGLState:",L)}}function nt(L){return p[L]!==void 0?p[L]:i.getParameter(L)}function q(L,j){p[L]!==j&&(i.pixelStorei(L,j),p[L]=j)}function rt(L){Z.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Z.copy(L))}function at(L){ct.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),ct.copy(L))}function $(L,j){let Y=l.get(j);Y===void 0&&(Y=new WeakMap,l.set(j,Y));let ut=Y.get(L);ut===void 0&&(ut=i.getUniformBlockIndex(j,L.name),i.uniformBlockBinding(j,ut,ut),Y.set(L,ut))}function K(L,j,Y){let ot=l.get(j).get(L);c[ot]!==Y&&(i.bindBufferBase(i.UNIFORM_BUFFER,ot,Y),c[ot]=Y)}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},p={},Q=null,et={},u={},c={},d=new WeakMap,g=[],_=null,f=!1,m=null,M=null,A=null,b=null,S=null,E=null,x=null,w=new Kt(0,0,0),N=0,R=!1,I=null,C=null,O=null,P=null,W=null,Z.set(0,0,i.canvas.width,i.canvas.height),ct.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:mt,disable:kt,bindFramebuffer:ge,drawBuffers:Ot,useProgram:se,setBlending:Ee,setMaterial:ye,setFlipSided:Oe,setCullFace:oe,setLineWidth:Te,setPolygonOffset:Me,setScissorTest:dt,activeTexture:Ct,bindTexture:Dt,unbindTexture:D,compressedTexImage2D:Ut,compressedTexImage3D:Mt,texImage2D:y,texImage3D:B,pixelStorei:q,getParameter:nt,updateUBOMapping:$,uniformBlockBinding:K,texStorage2D:Tt,texStorage3D:T,texSubImage2D:Wt,texSubImage3D:it,compressedTexSubImage2D:Ft,compressedTexSubImage3D:At,scissor:rt,viewport:at,reset:ht}}function M0(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Yt,h=new WeakMap,p=new Set,u,d=new WeakMap,g=new Set,_=new FinalizationRegistry(T=>g.delete(T)),f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,y){return f?new OffscreenCanvas(T,y):Ws("canvas")}function M(T,y,B){let nt=1,q=Tt(T);if((q.width>B||q.height>B)&&(nt=B/Math.max(q.width,q.height)),nt<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let rt=Math.floor(nt*q.width),at=Math.floor(nt*q.height);u===void 0&&(u=m(rt,at));let $=y?m(rt,at):u;return $.width=rt,$.height=at,$.getContext("2d").drawImage(T,0,0,rt,at),Bt("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+rt+"x"+at+")."),$}else return"data"in T&&Bt("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),T;return T}function A(T){return T.generateMipmaps}function b(T){i.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(T,y,B,nt,q,rt=!1){if(T!==null){if(i[T]!==void 0)return i[T];Bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let at;nt&&(at=t.get("EXT_texture_norm16"),at||Bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=y;if(y===i.RED&&(B===i.FLOAT&&($=i.R32F),B===i.HALF_FLOAT&&($=i.R16F),B===i.UNSIGNED_BYTE&&($=i.R8),B===i.UNSIGNED_SHORT&&at&&($=at.R16_EXT),B===i.SHORT&&at&&($=at.R16_SNORM_EXT)),y===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.R8UI),B===i.UNSIGNED_SHORT&&($=i.R16UI),B===i.UNSIGNED_INT&&($=i.R32UI),B===i.BYTE&&($=i.R8I),B===i.SHORT&&($=i.R16I),B===i.INT&&($=i.R32I)),y===i.RG&&(B===i.FLOAT&&($=i.RG32F),B===i.HALF_FLOAT&&($=i.RG16F),B===i.UNSIGNED_BYTE&&($=i.RG8),B===i.UNSIGNED_SHORT&&at&&($=at.RG16_EXT),B===i.SHORT&&at&&($=at.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RG8UI),B===i.UNSIGNED_SHORT&&($=i.RG16UI),B===i.UNSIGNED_INT&&($=i.RG32UI),B===i.BYTE&&($=i.RG8I),B===i.SHORT&&($=i.RG16I),B===i.INT&&($=i.RG32I)),y===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGB8UI),B===i.UNSIGNED_SHORT&&($=i.RGB16UI),B===i.UNSIGNED_INT&&($=i.RGB32UI),B===i.BYTE&&($=i.RGB8I),B===i.SHORT&&($=i.RGB16I),B===i.INT&&($=i.RGB32I)),y===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGBA8UI),B===i.UNSIGNED_SHORT&&($=i.RGBA16UI),B===i.UNSIGNED_INT&&($=i.RGBA32UI),B===i.BYTE&&($=i.RGBA8I),B===i.SHORT&&($=i.RGBA16I),B===i.INT&&($=i.RGBA32I)),y===i.RGB&&(B===i.UNSIGNED_SHORT&&at&&($=at.RGB16_EXT),B===i.SHORT&&at&&($=at.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),y===i.RGBA){let K=rt?Vs:te.getTransfer(q);B===i.FLOAT&&($=i.RGBA32F),B===i.HALF_FLOAT&&($=i.RGBA16F),B===i.UNSIGNED_BYTE&&($=K===ce?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&at&&($=at.RGBA16_EXT),B===i.SHORT&&at&&($=at.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(T,y){let B;return T?y===null||y===Rn||y===Gi?B=i.DEPTH24_STENCIL8:y===Sn?B=i.DEPTH32F_STENCIL8:y===bs&&(B=i.DEPTH24_STENCIL8,Bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Rn||y===Gi?B=i.DEPTH_COMPONENT24:y===Sn?B=i.DEPTH_COMPONENT32F:y===bs&&(B=i.DEPTH_COMPONENT16),B}function w(T,y){return A(T)===!0||T.isFramebufferTexture&&T.minFilter!==xe&&T.minFilter!==ze?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function N(T){let y=new WeakRef(T);n.get(T).__ref=y,g.add(y),_.register(T,y,y)}function R(T){let y=n.get(T).__ref;y!==void 0&&(g.delete(y),_.unregister(y))}function I(T){O(T.target)}function C(T){P(T.target)}function O(T){T.removeEventListener("dispose",I),R(T),k(T),T.isVideoTexture&&h.delete(T),T.isHTMLTexture&&p.delete(T)}function P(T){T.removeEventListener("dispose",C),R(T),tt(T)}function W(){for(let T of g){let y=T.deref();y!==void 0&&(y.isRenderTarget===!0?P(y):O(y))}g.clear(),p.clear()}function k(T){let y=n.get(T);if(y.__webglInit===void 0)return;let B=T.source,nt=d.get(B);if(nt){let q=nt[y.__cacheKey];q.usedTimes--,q.usedTimes===0&&G(T),Object.keys(nt).length===0&&d.delete(B)}n.remove(T)}function G(T){let y=n.get(T);i.deleteTexture(y.__webglTexture);let B=T.source,nt=d.get(B);delete nt[y.__cacheKey],o.memory.textures--}function tt(T){let y=n.get(T);y.__depthDisposeCallback&&y.__depthDisposeCallback();let B=T.depthTexture;if(B&&B.renderTarget===T&&O(B),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let rt=0;rt<y.__webglFramebuffer[q].length;rt++)i.deleteFramebuffer(y.__webglFramebuffer[q][rt]);else i.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)i.deleteFramebuffer(y.__webglFramebuffer[q]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let nt=T.textures;for(let q=0,rt=nt.length;q<rt;q++){let at=n.get(nt[q]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(nt[q])}n.remove(T)}let H=0;function Q(){H=0}function et(){return H}function bt(T){H=T}function zt(){let T=H;return T>=s.maxTextures&&Bt("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),H+=1,T}function Z(T){let y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.mipmapsAutoUpdate),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function ct(T,y){let B=n.get(T);if(T.isVideoTexture&&Ft(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let nt=T.image;if(nt===null)Bt("WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)Bt("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(B,T,y);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+y)}function vt(T,y){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){ye(B,T,y);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+y)}function Lt(T,y){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){ye(B,T,y);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+y)}function mt(T,y){let B=n.get(T);if(T.version>0&&B.__version!==T.version){Oe(B,T,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+y)}let kt={[mo]:i.REPEAT,[Fn]:i.CLAMP_TO_EDGE,[go]:i.MIRRORED_REPEAT},ge={[xe]:i.NEAREST,[ou]:i.NEAREST_MIPMAP_NEAREST,[dr]:i.NEAREST_MIPMAP_LINEAR,[ze]:i.LINEAR,[Vo]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},Ot={[hu]:i.NEVER,[rc]:i.ALWAYS,[uu]:i.LESS,[ic]:i.LEQUAL,[du]:i.EQUAL,[sc]:i.GEQUAL,[fu]:i.GREATER,[pu]:i.NOTEQUAL};function se(T,y){if(y.type===Sn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===ze||y.magFilter===Vo||y.magFilter===dr||y.magFilter===si||y.minFilter===ze||y.minFilter===Vo||y.minFilter===dr||y.minFilter===si)&&Bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,kt[y.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,kt[y.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,kt[y.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ge[y.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ge[y.minFilter]),y.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Ot[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===xe||y.minFilter!==dr&&y.minFilter!==si||y.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function le(T,y){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",I),N(y));let nt=y.source,q=d.get(nt);q===void 0&&(q={},d.set(nt,q));let rt=Z(y);if(rt!==T.__cacheKey){q[rt]===void 0&&(q[rt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),q[rt].usedTimes++;let at=q[T.__cacheKey];at!==void 0&&(q[T.__cacheKey].usedTimes--,at.usedTimes===0&&G(y)),T.__cacheKey=rt,T.__webglTexture=q[rt].texture}return B}function Xt(T,y,B){return Math.floor(Math.floor(T/B)/y)}function Ee(T,y,B,nt){let rt=T.updateRanges;if(rt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,B,nt,y.data);else{rt.sort((L,j)=>L.start-j.start);let at=0;for(let L=1;L<rt.length;L++){let j=rt[at],Y=rt[L],ut=j.start+j.count,ot=Xt(Y.start,y.width,4),lt=Xt(j.start,y.width,4);Y.start<=ut+1&&ot===lt&&Xt(Y.start+Y.count-1,y.width,4)===ot?j.count=Math.max(j.count,Y.start+Y.count-j.start):(++at,rt[at]=Y)}rt.length=at+1;let $=e.getParameter(i.UNPACK_ROW_LENGTH),K=e.getParameter(i.UNPACK_SKIP_PIXELS),ht=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let L=0,j=rt.length;L<j;L++){let Y=rt[L],ut=Math.floor(Y.start/4),ot=Math.ceil(Y.count/4),lt=ut%y.width,It=Math.floor(ut/y.width),$t=ot,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,lt),e.pixelStorei(i.UNPACK_SKIP_ROWS,It),e.texSubImage2D(i.TEXTURE_2D,0,lt,It,$t,st,B,nt,y.data)}T.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,$),e.pixelStorei(i.UNPACK_SKIP_PIXELS,K),e.pixelStorei(i.UNPACK_SKIP_ROWS,ht)}}function ye(T,y,B){let nt=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(nt=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(nt=i.TEXTURE_3D);let q=le(T,y),rt=y.source;e.bindTexture(nt,T.__webglTexture,i.TEXTURE0+B);let at=n.get(rt);if(rt.version!==at.__version||q===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let st=te.getPrimaries(te.workingColorSpace),Nt=y.colorSpace===oi?null:te.getPrimaries(y.colorSpace),qt=y.colorSpace===oi||st===Nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt)}e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let K=M(y.image,!1,s.maxTextureSize);K=At(y,K);let ht=r.convert(y.format,y.colorSpace),L=r.convert(y.type),j=E(y.internalFormat,ht,L,y.normalized,y.colorSpace,y.isVideoTexture);se(nt,y);let Y,ut=y.mipmaps,ot=y.isVideoTexture!==!0,lt=at.__version===void 0||q===!0,It=rt.dataReady,$t=w(y,K);if(y.isDepthTexture)j=x(y.format===ri,y.type),lt&&(ot?e.texStorage2D(i.TEXTURE_2D,1,j,K.width,K.height):e.texImage2D(i.TEXTURE_2D,0,j,K.width,K.height,0,ht,L,null));else if(y.isDataTexture)if(ut.length>0){ot&&lt&&e.texStorage2D(i.TEXTURE_2D,$t,j,ut[0].width,ut[0].height);for(let st=0,Nt=ut.length;st<Nt;st++)Y=ut[st],ot?It&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Y.width,Y.height,ht,L,Y.data):e.texImage2D(i.TEXTURE_2D,st,j,Y.width,Y.height,0,ht,L,Y.data);y.generateMipmaps=!1}else ot?(lt&&e.texStorage2D(i.TEXTURE_2D,$t,j,K.width,K.height),It&&Ee(y,K,ht,L)):e.texImage2D(i.TEXTURE_2D,0,j,K.width,K.height,0,ht,L,K.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ot&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,$t,j,ut[0].width,ut[0].height,K.depth);for(let st=0,Nt=ut.length;st<Nt;st++)if(Y=ut[st],y.format!==In)if(ht!==null)if(ot){if(It)if(y.layerUpdates.size>0){let qt=dc(Y.width,Y.height,y.format,y.type);for(let gt of y.layerUpdates){let he=Y.data.subarray(gt*qt/Y.data.BYTES_PER_ELEMENT,(gt+1)*qt/Y.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,gt,Y.width,Y.height,1,ht,he)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Y.width,Y.height,K.depth,ht,Y.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,j,Y.width,Y.height,K.depth,0,Y.data,0,0);else Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ot?It&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Y.width,Y.height,K.depth,ht,L,Y.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,j,Y.width,Y.height,K.depth,0,ht,L,Y.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ot&&lt&&e.texStorage2D(i.TEXTURE_2D,$t,j,ut[0].width,ut[0].height);for(let st=0,Nt=ut.length;st<Nt;st++)Y=ut[st],y.format!==In?ht!==null?ot?It&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,Y.width,Y.height,ht,Y.data):e.compressedTexImage2D(i.TEXTURE_2D,st,j,Y.width,Y.height,0,Y.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?It&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Y.width,Y.height,ht,L,Y.data):e.texImage2D(i.TEXTURE_2D,st,j,Y.width,Y.height,0,ht,L,Y.data)}else if(y.isDataArrayTexture)if(ot){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,$t,j,K.width,K.height,K.depth),It)if(y.layerUpdates.size>0){let st=dc(K.width,K.height,y.format,y.type);for(let Nt of y.layerUpdates){let qt=K.data.subarray(Nt*st/K.data.BYTES_PER_ELEMENT,(Nt+1)*st/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Nt,K.width,K.height,1,ht,L,qt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ht,L,K.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,j,K.width,K.height,K.depth,0,ht,L,K.data);else if(y.isData3DTexture)ot?(lt&&e.texStorage3D(i.TEXTURE_3D,$t,j,K.width,K.height,K.depth),It&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ht,L,K.data)):e.texImage3D(i.TEXTURE_3D,0,j,K.width,K.height,K.depth,0,ht,L,K.data);else if(y.isFramebufferTexture){if(lt)if(ot)e.texStorage2D(i.TEXTURE_2D,$t,j,K.width,K.height);else{let st=K.width,Nt=K.height;for(let qt=0;qt<$t;qt++)e.texImage2D(i.TEXTURE_2D,qt,j,st,Nt,0,ht,L,null),st>>=1,Nt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),K.parentNode!==st){st.appendChild(K),p.add(y),st.onpaint=Nt=>{let qt=Nt.changedElements;for(let gt of p)qt.includes(gt.image)&&(gt.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{let qt=i.RGBA,gt=i.RGBA,he=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,qt,gt,he,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ut.length>0){if(ot&&lt){let st=Tt(ut[0]);e.texStorage2D(i.TEXTURE_2D,$t,j,st.width,st.height)}for(let st=0,Nt=ut.length;st<Nt;st++)Y=ut[st],ot?It&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,ht,L,Y):e.texImage2D(i.TEXTURE_2D,st,j,ht,L,Y);y.generateMipmaps=!1}else if(ot){if(lt){let st=Tt(K);e.texStorage2D(i.TEXTURE_2D,$t,j,st.width,st.height)}It&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,L,K)}else e.texImage2D(i.TEXTURE_2D,0,j,ht,L,K);A(y)&&y.mipmapsAutoUpdate===!0&&b(nt),at.__version=rt.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function Oe(T,y,B){if(y.image.length!==6)return;let nt=le(T,y),q=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let rt=n.get(q);if(q.version!==rt.__version||nt===!0){e.activeTexture(i.TEXTURE0+B);let at=te.getPrimaries(te.workingColorSpace),$=y.colorSpace===oi?null:te.getPrimaries(y.colorSpace),K=y.colorSpace===oi||at===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let ht=y.isCompressedTexture||y.image[0].isCompressedTexture,L=y.image[0]&&y.image[0].isDataTexture,j=[];for(let gt=0;gt<6;gt++)!ht&&!L?j[gt]=M(y.image[gt],!0,s.maxCubemapSize):j[gt]=L?y.image[gt].image:y.image[gt],j[gt]=At(y,j[gt]);let Y=j[0],ut=r.convert(y.format,y.colorSpace),ot=r.convert(y.type),lt=E(y.internalFormat,ut,ot,y.normalized,y.colorSpace),It=y.isVideoTexture!==!0,$t=rt.__version===void 0||nt===!0,st=q.dataReady,Nt=w(y,Y);se(i.TEXTURE_CUBE_MAP,y);let qt;if(y.isDepthTexture){if(lt=x(y.format===ri,y.type),$t)if(It)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,lt,Y.width,Y.height);else for(let gt=0;gt<6;gt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,lt,Y.width,Y.height,0,ut,ot,null)}else if(ht){It&&$t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Nt,lt,Y.width,Y.height);for(let gt=0;gt<6;gt++){qt=j[gt].mipmaps;for(let he=0;he<qt.length;he++){let De=qt[he];y.format!==In?ut!==null?It?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,he,0,0,De.width,De.height,ut,De.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,he,lt,De.width,De.height,0,De.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):It?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,he,0,0,De.width,De.height,ut,ot,De.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,he,lt,De.width,De.height,0,ut,ot,De.data)}}}else{if(qt=y.mipmaps,It&&$t){qt.length>0&&Nt++;let gt=Tt(j[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Nt,lt,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(L){It?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,j[gt].width,j[gt].height,ut,ot,j[gt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,lt,j[gt].width,j[gt].height,0,ut,ot,j[gt].data);for(let he=0;he<qt.length;he++){let li=qt[he].image[gt].image;It?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,he+1,0,0,li.width,li.height,ut,ot,li.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,he+1,lt,li.width,li.height,0,ut,ot,li.data)}}else{It?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,ut,ot,j[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,lt,ut,ot,j[gt]);for(let he=0;he<qt.length;he++){let De=qt[he];It?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,he+1,0,0,ut,ot,De.image[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,he+1,lt,ut,ot,De.image[gt])}}}A(y)&&y.mipmapsAutoUpdate===!0&&b(i.TEXTURE_CUBE_MAP),rt.__version=q.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function oe(T,y,B,nt,q,rt){let at=r.convert(B.format,B.colorSpace),$=r.convert(B.type),K=E(B.internalFormat,at,$,B.normalized,B.colorSpace),ht=n.get(y),L=n.get(B);if(L.__renderTarget=y,!ht.__hasExternalTextures){let j=Math.max(1,y.width>>rt),Y=Math.max(1,y.height>>rt);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,rt,K,j,Y,y.depth,0,at,$,null):e.texImage2D(q,rt,K,j,Y,0,at,$,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),it(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,q,L.__webglTexture,0,Wt(y)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,nt,q,L.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(T,y,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),y.depthBuffer){let nt=y.depthTexture,q=nt&&nt.isDepthTexture?nt.type:null,rt=x(y.stencilBuffer,q),at=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;it(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt(y),rt,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt(y),rt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,rt,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,T)}else{let nt=y.textures;for(let q=0;q<nt.length;q++){let rt=nt[q],at=r.convert(rt.format,rt.colorSpace),$=r.convert(rt.type),K=E(rt.internalFormat,at,$,rt.normalized,rt.colorSpace);it(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt(y),K,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt(y),K,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(T,y,B){let nt=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(y.depthTexture);q.__renderTarget=y;let rt=nt?y.depthTexture.image[0]:y.depthTexture.image;(!q.__webglTexture||rt.width!==y.width||rt.height!==y.height)&&(rt.width=y.width,rt.height=y.height,y.depthTexture.needsUpdate=!0),nt?mt(y.depthTexture,0):ct(y.depthTexture,0);let at=q.__webglTexture,$=Wt(y),K=nt?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,ht=y.depthTexture.format===ri?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===jn)it(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ht,K,at,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,ht,K,at,0);else if(y.depthTexture.format===ri)it(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ht,K,at,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,ht,K,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function dt(T){let y=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==T.depthTexture){let nt=T.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),nt){let q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,nt.removeEventListener("dispose",q)};nt.addEventListener("dispose",q),y.__depthDisposeCallback=q}y.__boundDepthTexture=nt}if(T.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let nt=0;nt<6;nt++)Me(y.__webglFramebuffer[nt],T,nt);else T.texture.mipmaps.length>0?Me(y.__webglFramebuffer[0],T,0):Me(y.__webglFramebuffer,T,0);else if(B){y.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[nt]),y.__webglDepthbuffer[nt]===void 0)y.__webglDepthbuffer[nt]=i.createRenderbuffer(),Te(y.__webglDepthbuffer[nt],T,!1);else{let q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=y.__webglDepthbuffer[nt];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,rt)}}else if(T.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Te(y.__webglDepthbuffer,T,!1);else{let q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,rt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ct(T,y,B){let nt=n.get(T);y!==void 0&&oe(nt.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&dt(T)}function Dt(T){let y=T.texture,B=n.get(T),nt=n.get(y);T.addEventListener("dispose",C),N(T);let q=T.textures,rt=T.isWebGLCubeRenderTarget===!0,at=q.length>1;if(at||(nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture()),nt.__version=y.version,o.memory.textures++),rt){B.__webglFramebuffer=[];for(let $=0;$<6;$++)if(y.mipmaps.length>0){B.__webglFramebuffer[$]=[];for(let K=0;K<y.mipmaps.length;K++)B.__webglFramebuffer[$][K]=i.createFramebuffer()}else B.__webglFramebuffer[$]=i.createFramebuffer()}else{if(y.mipmaps.length>0){B.__webglFramebuffer=[];for(let $=0;$<y.mipmaps.length;$++)B.__webglFramebuffer[$]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(at)for(let $=0,K=q.length;$<K;$++){let ht=n.get(q[$]);ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&it(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let $=0;$<q.length;$++){let K=q[$];B.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[$]);let ht=r.convert(K.format,K.colorSpace),L=r.convert(K.type),j=E(K.internalFormat,ht,L,K.normalized,K.colorSpace,T.isXRRenderTarget===!0),Y=Wt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,j,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,B.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Te(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,nt.__webglTexture),se(i.TEXTURE_CUBE_MAP,y);for(let $=0;$<6;$++)if(y.mipmaps.length>0)for(let K=0;K<y.mipmaps.length;K++)oe(B.__webglFramebuffer[$][K],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,K);else oe(B.__webglFramebuffer[$],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);A(y)?b(i.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}else if(at){for(let $=0,K=q.length;$<K;$++){let ht=q[$],L=n.get(ht),j=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(j=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,L.__webglTexture),se(j,ht),oe(B.__webglFramebuffer,T,ht,i.COLOR_ATTACHMENT0+$,j,0),A(ht)&&b(j)}e.unbindTexture()}else{let $=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,nt.__webglTexture),se($,y),y.mipmaps.length>0)for(let K=0;K<y.mipmaps.length;K++)oe(B.__webglFramebuffer[K],T,y,i.COLOR_ATTACHMENT0,$,K);else oe(B.__webglFramebuffer,T,y,i.COLOR_ATTACHMENT0,$,0);A(y)?b($):y.mipmaps.length>0&&i.texParameteri($,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}T.depthBuffer&&dt(T)}function D(T){let y=T.textures;for(let B=0,nt=y.length;B<nt;B++){let q=y[B];if(A(q)&&q.mipmapsAutoUpdate===!0){let rt=S(T),at=n.get(q).__webglTexture;e.bindTexture(rt,at),b(rt),e.unbindTexture()}}}let Ut=[];function Mt(T){if(T.samples>0){if(it(T)===!1){let y=T.textures,B=T.width,nt=T.height,q=i.COLOR_BUFFER_BIT,rt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=n.get(T),$=y.length>1;if($)for(let ht=0;ht<y.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let ht=0;ht<y.length;ht++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,at.__webglColorRenderbuffer[ht]);let L=n.get(y[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,L,0)}i.blitFramebuffer(0,0,B,nt,0,0,B,nt,q,i.NEAREST),c===!0&&(Ut.length=0,Ut.push(i.COLOR_ATTACHMENT0+ht),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&Ut.push(rt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let ht=0;ht<y.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,at.__webglColorRenderbuffer[ht]);let L=n.get(y[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,L,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){let y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Wt(T){return Math.min(s.maxSamples,T.samples)}function it(T){let y=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ft(T){let y=o.render.frame;h.get(T)!==y&&(h.set(T,y),T.update())}function At(T,y){let B=T.colorSpace,nt=T.format,q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Hs&&B!==oi&&(te.getTransfer(B)===ce?(nt!==In||q!==on)&&Bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Gt("WebGLTextures: Unsupported texture color space:",B)),y}function Tt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=zt,this.resetTextureUnits=Q,this.getTextureUnits=et,this.setTextureUnits=bt,this.setTexture2D=ct,this.setTexture2DArray=vt,this.setTexture3D=Lt,this.setTextureCube=mt,this.rebindTextures=Ct,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=dt,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=it,this.dispose=W}function S0(i,t){function e(n,s=oi){let r,o=te.getTransfer(s);if(n===on)return i.UNSIGNED_BYTE;if(n===Xo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ql)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Kl)return i.BYTE;if(n===jl)return i.SHORT;if(n===bs)return i.UNSIGNED_SHORT;if(n===Wo)return i.INT;if(n===Rn)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===Cn)return i.HALF_FLOAT;if(n===ec)return i.ALPHA;if(n===nc)return i.RGB;if(n===In)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===ri)return i.DEPTH_STENCIL;if(n===Yo)return i.RED;if(n===Zo)return i.RED_INTEGER;if(n===Si)return i.RG;if(n===$o)return i.RG_INTEGER;if(n===Jo)return i.RGBA_INTEGER;if(n===fr||n===pr||n===mr||n===gr)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ko||n===jo||n===Qo||n===ta)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ea||n===na||n===ia||n===sa||n===ra||n===xr||n===oa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ea||n===na)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ia)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===sa)return r.COMPRESSED_R11_EAC;if(n===ra)return r.COMPRESSED_SIGNED_R11_EAC;if(n===xr)return r.COMPRESSED_RG11_EAC;if(n===oa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===aa||n===la||n===ca||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===xa||n===_a||n===ya||n===va)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===aa)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===la)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ca)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ha)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ua)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===da)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fa)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===pa)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ma)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ga)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xa)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_a)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ya)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===va)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ba||n===Ma||n===Sa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ba)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ma)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wa||n===Ea||n===_r||n===Ta)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===wa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ea)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_r)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ta)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var w0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,E0=`
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

}`,Tc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Qs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new zn({vertexShader:w0,fragmentShader:E0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new Oi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ac=class extends On{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,p=null,u=null,d=null,g=null,_=typeof XRWebGLBinding<"u",f=new Tc,m={},M=e.getContextAttributes(),A=null,b=null,S=[],E=[],x=new Yt,w=null,N=null,R=new je;R.viewport=new _e;let I=new je;I.viewport=new _e;let C=[R,I],O=new ko,P=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ct=S[Z];return ct===void 0&&(ct=new fs,S[Z]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(Z){let ct=S[Z];return ct===void 0&&(ct=new fs,S[Z]=ct),ct.getGripSpace()},this.getHand=function(Z){let ct=S[Z];return ct===void 0&&(ct=new fs,S[Z]=ct),ct.getHandSpace()};function k(Z){let ct=E.indexOf(Z.inputSource);if(ct===-1)return;let vt=S[ct];vt!==void 0&&(vt.update(Z.inputSource,Z.frame,l||o),vt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",tt);for(let Z=0;Z<S.length;Z++){let ct=E[Z];ct!==null&&(E[Z]=null,S[Z].disconnect(ct))}P=null,W=null,f.reset();for(let Z in m)delete m[Z];if(t.setRenderTarget(A),d=null,u=null,p=null,s=null,b=null,zt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(x.width,x.height,!1),N!==null){let Z=N.camera;Z.fov=N.fov,Z.zoom=N.zoom,Z.updateProjectionMatrix(),N=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&Bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return p===null&&_&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",G),s.addEventListener("inputsourceschange",tt),M.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,Lt=null,mt=null;M.depth&&(mt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=M.stencil?ri:jn,Lt=M.stencil?Gi:Rn);let kt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(kt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new mn(u.textureWidth,u.textureHeight,{format:In,type:on,depthTexture:new ni(u.textureWidth,u.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let vt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new mn(d.framebufferWidth,d.framebufferHeight,{format:In,type:on,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),zt.setContext(s),zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function tt(Z){for(let ct=0;ct<Z.removed.length;ct++){let vt=Z.removed[ct],Lt=E.indexOf(vt);Lt>=0&&(E[Lt]=null,S[Lt].disconnect(vt))}for(let ct=0;ct<Z.added.length;ct++){let vt=Z.added[ct],Lt=E.indexOf(vt);if(Lt===-1){for(let kt=0;kt<S.length;kt++)if(kt>=E.length){E.push(vt),Lt=kt;break}else if(E[kt]===null){E[kt]=vt,Lt=kt;break}if(Lt===-1)break}let mt=S[Lt];mt&&mt.connect(vt)}}function H(Z,ct){ct===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ct.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ct=Z.near,vt=Z.far;f.texture!==null&&(f.depthNear>0&&(ct=f.depthNear),f.depthFar>0&&(vt=f.depthFar)),O.near=I.near=R.near=ct,O.far=I.far=R.far=vt,(P!==O.near||W!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),P=O.near,W=O.far),O.layers.mask=Z.layers.mask|6,R.layers.mask=O.layers.mask&-5,I.layers.mask=O.layers.mask&-3;let Lt=Z.parent,mt=O.cameras;H(O,Lt);for(let kt=0;kt<mt.length;kt++)H(mt[kt],Lt);O.projectionMatrix.copy(R.projectionMatrix),O.projectionMatrixInverse.copy(R.projectionMatrixInverse),N===null&&Z.isPerspectiveCamera&&(N={camera:Z,fov:Z.fov,zoom:Z.zoom}),Q(Z,O,Lt)};function Q(Z,ct,vt){vt===null?Z.matrix.copy(ct.matrixWorld):(Z.matrix.copy(vt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ct.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ct.projectionMatrix),Z.projectionMatrixInverse.copy(ct.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=_o*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(Z){c=Z,u!==null&&(u.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(O)},this.getCameraTexture=function(Z){return m[Z]};let et=null;function bt(Z,ct){if(h=ct.getViewerPose(l||o),g=ct,h!==null){let vt=h.views;d!==null&&(t.setRenderTargetFramebuffer(b,d.framebuffer),t.setRenderTarget(b));let Lt=!1;vt.length!==O.cameras.length&&(O.cameras.length=0,Lt=!0);for(let Ot=0;Ot<vt.length;Ot++){let se=vt[Ot],le=null;if(d!==null)le=d.getViewport(se);else{let Ee=p.getViewSubImage(u,se);le=Ee.viewport,Ot===0&&(t.setRenderTargetTextures(b,Ee.colorTexture,Ee.depthStencilTexture),t.setRenderTarget(b))}let Xt=C[Ot];Xt===void 0&&(Xt=new je,Xt.layers.enable(Ot),Xt.viewport=new _e,C[Ot]=Xt),Xt.matrix.fromArray(se.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(se.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(le.x,le.y,le.width,le.height),Ot===0&&(O.matrix.copy(Xt.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Lt===!0&&O.cameras.push(Xt)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){p=n.getBinding();let Ot=p.getDepthInformation(vt[0]);Ot&&Ot.isValid&&Ot.texture&&f.init(Ot,s.renderState)}if(mt&&mt.includes("camera-access")&&_){t.state.unbindTexture(),p=n.getBinding();for(let Ot=0;Ot<vt.length;Ot++){let se=vt[Ot].camera;if(se){let le=m[se];le||(le=new Qs,m[se]=le);let Xt=p.getCameraImage(se);le.sourceTexture=Xt}}}}for(let vt=0;vt<S.length;vt++){let Lt=E[vt],mt=S[vt];Lt!==null&&mt!==void 0&&mt.update(Lt,ct,l||o)}et&&et(Z,ct),ct.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ct}),g=null}let zt=new qu;zt.setAnimationLoop(bt),this.setAnimationLoop=function(Z){et=Z},this.dispose=function(){}}},T0=new ne,nd=new Ht;nd.set(-1,0,0,0,1,0,0,0,1);function A0(i,t){function e(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function n(f,m){m.color.getRGB(f.fogColor.value,cc(i)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function s(f,m,M,A,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(f,m):m.isMeshLambertMaterial?(r(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(f,m),p(f,m)):m.isMeshPhongMaterial?(r(f,m),h(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(f,m),u(f,m),m.isMeshPhysicalMaterial&&d(f,m,b)):m.isMeshMatcapMaterial?(r(f,m),g(f,m)):m.isMeshDepthMaterial?r(f,m):m.isMeshDistanceMaterial?(r(f,m),_(f,m)):m.isMeshNormalMaterial?r(f,m):m.isLineBasicMaterial?(o(f,m),m.isLineDashedMaterial&&a(f,m)):m.isPointsMaterial?c(f,m,M,A):m.isSpriteMaterial?l(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,e(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,e(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===tn&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,e(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===tn&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,e(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,e(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);let M=t.get(m),A=M.envMap,b=M.envMapRotation;A&&(f.envMap.value=A,f.envMapRotation.value.setFromMatrix4(T0.makeRotationFromEuler(b)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(nd),f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap&&(f.lightMap.value=m.lightMap,f.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,f.lightMapTransform)),m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,f.aoMapTransform))}function o(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,e(m.map,f.mapTransform))}function a(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function c(f,m,M,A){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*M,f.scale.value=A*.5,m.map&&(f.map.value=m.map,e(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function l(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,e(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function h(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function p(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function u(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function d(f,m,M){f.ior.value=m.ior,m.diffuseRoughness>0&&(f.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===tn&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.retroreflectivity>0&&(f.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,m){m.matcap&&(f.matcap.value=m.matcap)}function _(f,m){let M=t.get(m).light;f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),f.nearDistance.value=M.shadow.camera.near,f.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function R0(i,t,e,n){let s={},r={};function o(M,A){let b=A.program;n.uniformBlockBinding(M,b,s[M.id])}function a(M,A){let b=s[M.id];b===void 0&&(g(M),b=c(M),s[M.id]=b,M.addEventListener("dispose",f));let S=A.program;n.updateUBOMapping(M,S);let E=t.render.frame;r[M.id]!==E&&(l(M),r[M.id]=E)}function c(M){let A=i.createBuffer(),b=M.__size,S=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,b,S),i.bindBuffer(i.UNIFORM_BUFFER,null),A}function l(M){let A=s[M.id],b=M.uniforms,S=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let E=0,x=b.length;E<x;E++){let w=b[E];if(Array.isArray(w))for(let N=0,R=w.length;N<R;N++)h(w[N],E,N,S);else h(w,E,0,S)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(M,A,b,S){if(u(M,A,b,S)===!0){let E=M.__offset,x=M.value;if(Array.isArray(x)){let w=0;for(let N=0;N<x.length;N++){let R=x[N],I=_(R,!0);p(R,M.__data,w),w+=I.storage/Float32Array.BYTES_PER_ELEMENT}}else p(x,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,M.__data)}}function p(M,A,b){typeof M=="number"||typeof M=="boolean"?A[b]=M:M.isMatrix3?(A[b]=M.elements[0],A[b+1]=M.elements[1],A[b+2]=M.elements[2],A[b+3]=0,A[b+4]=M.elements[3],A[b+5]=M.elements[4],A[b+6]=M.elements[5],A[b+7]=0,A[b+8]=M.elements[6],A[b+9]=M.elements[7],A[b+10]=M.elements[8],A[b+11]=0):ArrayBuffer.isView(M)?A.set(M.subarray(0,A.length-b),b):M.toArray(A,b)}function u(M,A,b,S){let E=M.value,x=A+"_"+b;if(Array.isArray(E)){S[x]===void 0&&(S[x]=[]);let w=S[x],N=!1;for(let R=0;R<E.length;R++)d(E[R],w,R)===!0&&(N=!0);return N}return d(E,S,x)}function d(M,A,b){if(A[b]===void 0)return typeof M=="number"||typeof M=="boolean"?A[b]=M:ArrayBuffer.isView(M)?A[b]=M.slice():A[b]=M.clone(),!0;{let S=A[b];if(typeof M=="number"||typeof M=="boolean"){if(S!==M)return A[b]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(S.equals(M)===!1)return S.copy(M),!0}}return!1}function g(M){let A=M.uniforms,b=0,S=16;for(let x=0,w=A.length;x<w;x++){let N=Array.isArray(A[x])?A[x]:[A[x]];for(let R=0,I=N.length;R<I;R++){let C=N[R],O=Array.isArray(C.value)?C.value:[C.value],P=Array.isArray(A[x])||Array.isArray(C.value),W=b;for(let G=0,tt=O.length;G<tt;G++){let H=O[G],Q=_(H,P),et=b%S,bt=et%Q.boundary,zt=et+bt;b+=bt,zt!==0&&S-zt<Q.storage&&(b+=S-zt),G===0&&(W=b),b+=Q.storage}let k=C.type==="int"?Int32Array:C.type==="uint"?Uint32Array:Float32Array;C.__data=new k((b-W)/Float32Array.BYTES_PER_ELEMENT),C.__offset=W}}let E=b%S;return E>0&&(b+=S-E),M.__size=b,M.__cache={},this}function _(M,A){let b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=16,b.storage=48):M.isMatrix4?(b.boundary=16,b.storage=64):M.isTexture?Bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(b.boundary=16,b.storage=M.byteLength):Bt("WebGLRenderer: Unsupported uniform value type.",M),A===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function f(M){let A=M.target;A.removeEventListener("dispose",f),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function m(){for(let M in s)i.deleteBuffer(s[M]);s={},r={}}return{bind:o,update:a,dispose:m}}var C0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),kn=null;function I0(){return kn===null&&(kn=new Js(C0,16,16,Si,Cn),kn.name="DFG_LUT",kn.minFilter=ze,kn.magFilter=ze,kn.wrapS=Fn,kn.wrapT=Fn,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn}var Pa=class{constructor(t={}){let{canvas:e=gu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:d=on}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let _=d,f=new Set([Jo,$o,Zo]),m=new Set([on,Rn,bs,Gi,Xo,qo]),M=new Uint32Array(4),A=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]},S=null,E=null,x=[],w=[],N=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,I=!1,C=null,O=null,P=null,W=null;this._outputColorSpace=Se;let k=0,G=0,tt=null,H=-1,Q=null,et=new _e,bt=new _e,zt=null,Z=new Kt(0),ct=0,vt=e.width,Lt=e.height,mt=1,kt=null,ge=null,Ot=new _e(0,0,vt,Lt),se=new _e(0,0,vt,Lt),le=!1,Xt=new xi,Ee=new Mo,ye=!1,Oe=!1,oe=new ne,Te=new F,Me=new _e,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ct=!1;function Dt(){return tt===null?mt:1}let D=n;function Ut(v,U){return e.getContext(v,U)}let Mt,Wt,it,Ft,At,Tt,T,y,B,nt,q,rt,at,$,K,ht,L,j,Y,ut,ot,lt,It;try{let v={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Nt,!1),e.addEventListener("webglcontextrestored",qt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),D===null){let U="webgl2";if(D=Ut(U,v),D===null)throw Ut(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$t()}catch(v){throw e.removeEventListener("webglcontextlost",Nt,!1),e.removeEventListener("webglcontextrestored",qt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Gt("WebGLRenderer: "+v.message),v}function $t(){Mt=new Gg(D),Mt.init(),ot=new S0(D,Mt),Wt=new Ig(D,Mt,t,ot),it=new b0(D,Mt),Wt.reversedDepthBuffer&&u&&it.buffers.depth.setReversed(!0),O=D.createFramebuffer(),P=D.createFramebuffer(),W=D.createFramebuffer(),Ft=new Wg(D),At=new a0,Tt=new M0(D,Mt,it,At,Wt,ot,Ft),T=new kg(R),y=new qf(D),lt=new Rg(D,y),B=new Hg(D,y,Ft,lt),nt=new qg(D,B,y,lt,Ft),j=new Xg(D,Wt,Tt),K=new Pg(At),q=new o0(R,T,Mt,Wt,lt,K),rt=new A0(R,At),at=new c0,$=new m0(Mt),L=new Ag(R,T,it,nt,g,c),ht=new v0(R,nt,Wt),It=new R0(D,Ft,Wt,it),Y=new Cg(D,Mt,Ft),ut=new Vg(D,Mt,Ft),Ft.programs=q.programs,R.capabilities=Wt,R.extensions=Mt,R.properties=At,R.renderLists=at,R.shadowMap=ht,R.state=it,R.info=Ft}_!==on&&(N=new Zg(_,e.width,e.height,a,s,r));let st=new Ac(R,D);this.xr=st,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let v=Mt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Mt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(v){v!==void 0&&(mt=v,this.setSize(vt,Lt,!1))},this.getSize=function(v){return v.set(vt,Lt)},this.setSize=function(v,U,X=!0){if(st.isPresenting){Bt("WebGLRenderer: Can't change size while VR device is presenting.");return}vt=v,Lt=U,e.width=Math.floor(v*mt),e.height=Math.floor(U*mt),X===!0&&(e.style.width=v+"px",e.style.height=U+"px"),N!==null&&N.setSize(e.width,e.height),this.setViewport(0,0,v,U)},this.getDrawingBufferSize=function(v){return v.set(vt*mt,Lt*mt).floor()},this.setDrawingBufferSize=function(v,U,X){vt=v,Lt=U,mt=X,e.width=Math.floor(v*X),e.height=Math.floor(U*X),this.setViewport(0,0,v,U)},this.setEffects=function(v){if(_===on){Gt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let U=0;U<v.length;U++)if(v[U].isOutputPass===!0){Bt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(et)},this.getViewport=function(v){return v.copy(Ot)},this.setViewport=function(v,U,X,z){v.isVector4?Ot.set(v.x,v.y,v.z,v.w):Ot.set(v,U,X,z),it.viewport(et.copy(Ot).multiplyScalar(Dt()).round())},this.getScissor=function(v){return v.copy(se)},this.setScissor=function(v,U,X,z){v.isVector4?se.set(v.x,v.y,v.z,v.w):se.set(v,U,X,z),it.scissor(bt.copy(se).multiplyScalar(Dt()).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(v){it.setScissorTest(le=v)},this.setOpaqueSort=function(v){kt=v},this.setTransparentSort=function(v){ge=v},this.getClearColor=function(v){return v.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(v=!0,U=!0,X=!0){let z=0;if(v){let V=!1;if(tt!==null){let pt=tt.texture.format;V=f.has(pt)}if(V){let pt=tt.texture.type,St=m.has(pt),ft=L.getClearColor(),yt=L.getClearAlpha(),Rt=ft.r,Vt=ft.g,jt=ft.b;St?(M[0]=Rt,M[1]=Vt,M[2]=jt,M[3]=yt,D.clearBufferuiv(D.COLOR,0,M)):(A[0]=Rt,A[1]=Vt,A[2]=jt,A[3]=yt,D.clearBufferiv(D.COLOR,0,A))}else z|=D.COLOR_BUFFER_BIT}U&&(z|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),C=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Nt,!1),e.removeEventListener("webglcontextrestored",qt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),L.dispose(),at.dispose(),$.dispose(),Tt.dispose(),At.dispose(),T.dispose(),nt.dispose(),B.dispose(),lt.dispose(),It.dispose(),q.dispose(),st.dispose(),st.removeEventListener("sessionstart",Jc),st.removeEventListener("sessionend",Kc),Ri.stop()};function Nt(v){v.preventDefault(),ac("WebGLRenderer: Context Lost."),I=!0}function qt(){ac("WebGLRenderer: Context Restored."),I=!1;let v=Ft.autoReset,U=ht.enabled,X=ht.autoUpdate,z=ht.needsUpdate,V=ht.type;$t(),Ft.autoReset=v,ht.enabled=U,ht.autoUpdate=X,ht.needsUpdate=z,ht.type=V}function gt(v){Gt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function he(v){let U=v.target;U.removeEventListener("dispose",he),De(U)}function De(v){li(v),At.remove(v)}function li(v){let U=At.get(v).programs;U!==void 0&&(U.forEach(function(X){q.releaseProgram(X)}),v.isShaderMaterial&&q.releaseShaderCache(v))}this.renderBufferDirect=function(v,U,X,z,V,pt){U===null&&(U=dt);let St=V.isMesh&&V.matrixWorld.determinantAffine()<0,ft=Kd(v,U,X,z,V);it.setMaterial(z,St);let yt=X.index,Rt=1;if(z.wireframe===!0){if(yt=B.getWireframeAttribute(X),yt===void 0)return;Rt=2}let Vt=X.drawRange,jt=X.attributes.position,wt=Vt.start*Rt,Qt=(Vt.start+Vt.count)*Rt;pt!==null&&(wt=Math.max(wt,pt.start*Rt),Qt=Math.min(Qt,(pt.start+pt.count)*Rt)),yt!==null?(wt=Math.max(wt,0),Qt=Math.min(Qt,yt.count)):jt!=null&&(wt=Math.max(wt,0),Qt=Math.min(Qt,jt.count));let Ae=Qt-wt;if(Ae<0||Ae===1/0)return;lt.setup(V,z,ft,X,yt);let pe,fe=Y;if(yt!==null&&(pe=y.get(yt),fe=ut,fe.setIndex(pe)),V.isMesh)z.wireframe===!0?(it.setLineWidth(z.wireframeLinewidth*Dt()),fe.setMode(D.LINES)):fe.setMode(D.TRIANGLES);else if(V.isLine){let We=z.linewidth;We===void 0&&(We=1),it.setLineWidth(We*Dt()),V.isLineSegments?fe.setMode(D.LINES):V.isLineLoop?fe.setMode(D.LINE_LOOP):fe.setMode(D.LINE_STRIP)}else V.isPoints?fe.setMode(D.POINTS):V.isSprite&&fe.setMode(D.TRIANGLES);if(V.isBatchedMesh)if(Mt.get("WEBGL_multi_draw"))fe.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let We=V._multiDrawStarts,Et=V._multiDrawCounts,Ke=V._multiDrawCount,ae=yt?y.get(yt).bytesPerElement:1,Ci=At.get(z).currentProgram.getUniforms();for(let Xe=0;Xe<Ke;Xe++)Ci.setValue(D,"_gl_DrawID",Xe),fe.render(We[Xe]/ae,Et[Xe])}else if(V.isInstancedMesh)fe.renderInstances(wt,Ae,V.count);else if(X.isInstancedBufferGeometry){let We=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Et=Math.min(X.instanceCount,We);fe.renderInstances(wt,Ae,Et)}else fe.render(wt,Ae)};function $c(v,U,X,z){C!==null&&v.isNodeMaterial&&C.setObject(z,v),ye===!0&&K.setState(v,X,!1),v.transparent===!0&&v.side===Ge&&v.forceSinglePass===!1?(v.side=tn,v.needsUpdate=!0,Ls(v,U,z),v.side=bi,v.needsUpdate=!0,Ls(v,U,z),v.side=Ge):Ls(v,U,z)}this.compile=function(v,U,X=null){X===null&&(X=v),C!==null&&C.renderStart(v,U,X),E=$.get(X),E.init(U),w.push(E),X.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),v!==X&&v.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights(),C!==null&&C.updateLights(E.state.lightsArray),Oe=this.localClippingEnabled,ye=K.init(this.clippingPlanes,Oe),ye===!0&&K.setGlobalState(this.clippingPlanes,U),C!==null&&ht.render(E.state.shadowsArray,X,U);let z=new Set;return v.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let pt=V.material;if(pt)if(Array.isArray(pt))for(let St=0;St<pt.length;St++){let ft=pt[St];$c(ft,X,U,V),z.add(ft)}else $c(pt,X,U,V),z.add(pt)}),E=w.pop(),C!==null&&C.renderEnd(),z},this.compileAsync=function(v,U,X=null){let z=this.compile(v,U,X);return new Promise(V=>{function pt(){if(z.forEach(function(St){let yt=At.get(St).currentProgram;(yt===void 0||yt.isReady())&&z.delete(St)}),z.size===0){V(v);return}setTimeout(pt,10)}Mt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let il=null;function $d(v){il&&il(v)}function Jc(){Ri.stop()}function Kc(){Ri.start()}let Ri=new qu;Ri.setAnimationLoop($d),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(v){il=v,st.setAnimationLoop(v),v===null?Ri.stop():Ri.start()},st.addEventListener("sessionstart",Jc),st.addEventListener("sessionend",Kc),this.render=function(v,U){if(U!==void 0&&U.isCamera!==!0){Gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;C!==null&&C.renderStart(v,U);let X=st.enabled===!0&&st.isPresenting===!0,z=N!==null&&(tt===null||X)&&N.begin(R,tt);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(U),U=st.getCamera()),v.isScene===!0&&v.onBeforeRender(R,v,U,tt),E=$.get(v,w.length),E.init(U),E.state.textureUnits=Tt.getTextureUnits(),w.push(E),oe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?Ee.setFromArrayCamera(U):Xt.setFromProjectionMatrix(oe,bn,U.reversedDepth),Oe=this.localClippingEnabled,ye=K.init(this.clippingPlanes,Oe),S=at.get(v,x.length),S.init(),x.push(S),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){let St=R.xr.getDepthSensingMesh();St!==null&&sl(St,U,-1/0,R.sortObjects)}sl(v,U,0,R.sortObjects),S.finish(),C!==null&&C.updateLights(E.state.lightsArray),R.sortObjects===!0&&S.sort(kt,ge),Ct=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,Ct&&L.addToRenderList(S,v),this.info.autoReset===!0&&this.info.reset(),ye===!0&&K.beginShadows();let V=E.state.shadowsArray;if(ht.render(V,v,U),ye===!0&&K.endShadows(),(z&&N.hasRenderPass())===!1){let St=S.opaque,ft=S.transmissive;if(E.setupLights(),U.isArrayCamera){let yt=U.cameras;if(ft.length>0)for(let Rt=0,Vt=yt.length;Rt<Vt;Rt++){let jt=yt[Rt];Qc(St,ft,v,jt)}Ct&&L.render(v);for(let Rt=0,Vt=yt.length;Rt<Vt;Rt++){let jt=yt[Rt];jc(S,v,jt,jt.viewport)}}else ft.length>0&&Qc(St,ft,v,U),Ct&&L.render(v),jc(S,v,U)}tt!==null&&G===0&&(Tt.updateMultisampleRenderTarget(tt),Tt.updateRenderTargetMipmap(tt)),z&&N.end(R),v.isScene===!0&&v.onAfterRender(R,v,U),lt.resetDefaultState(),H=-1,Q=null,w.pop(),w.length>0?(E=w[w.length-1],Tt.setTextureUnits(E.state.textureUnits),ye===!0&&K.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,x.pop(),x.length>0?S=x[x.length-1]:S=null,C!==null&&C.renderEnd()};function sl(v,U,X,z){if(v.visible===!1)return;if(v.layers.test(U.layers)){if(v.isGroup)X=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(U);else if(v.isLight)E.pushLight(v),v.castShadow&&E.pushShadow(v);else if(v.isSprite){let St=U.isArrayCamera?Ee:Xt;if(!v.frustumCulled||v.intersectsFrustum(St)){z&&Me.setFromMatrixPosition(v.matrixWorld).applyMatrix4(oe);let ft=nt.update(v),yt=v.material;yt.visible&&S.push(v,ft,yt,X,Me.z,null,U)}}else if(v.isMesh||v.isLine||v.isPoints){let St=U.isArrayCamera?Ee:Xt;if(!v.frustumCulled||v.intersectsFrustum(St)){let ft=nt.update(v),yt=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Me.copy(v.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Me.copy(ft.boundingSphere.center)),Me.applyMatrix4(v.matrixWorld).applyMatrix4(oe)),Array.isArray(yt)){let Rt=ft.groups;for(let Vt=0,jt=Rt.length;Vt<jt;Vt++){let wt=Rt[Vt],Qt=yt[wt.materialIndex];Qt&&Qt.visible&&S.push(v,ft,Qt,X,Me.z,wt,U)}}else yt.visible&&S.push(v,ft,yt,X,Me.z,null,U)}}}let pt=v.children;for(let St=0,ft=pt.length;St<ft;St++)sl(pt[St],U,X,z)}function jc(v,U,X,z){let{opaque:V,transmissive:pt,transparent:St}=v;E.setupLightsView(X),ye===!0&&K.setGlobalState(R.clippingPlanes,X),z&&it.viewport(et.copy(z)),V.length>0&&Ir(V,U,X),pt.length>0&&Ir(pt,U,X),St.length>0&&Ir(St,U,X),it.buffers.depth.setTest(!0),it.buffers.depth.setMask(!0),it.buffers.color.setMask(!0),it.setPolygonOffset(!1)}function Qc(v,U,X,z){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[z.id]===void 0){let wt=Mt.has("EXT_color_buffer_half_float")||Mt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[z.id]=new mn(1,1,{generateMipmaps:!0,type:wt?Cn:on,minFilter:si,samples:Math.max(4,Wt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:te.workingColorSpace})}let pt=E.state.transmissionRenderTarget[z.id],St=z.viewport||et;pt.setSize(St.z*R.transmissionResolutionScale,St.w*R.transmissionResolutionScale);let ft=R.getRenderTarget(),yt=R.getActiveCubeFace(),Rt=R.getActiveMipmapLevel();R.setRenderTarget(pt),R.getClearColor(Z),ct=R.getClearAlpha(),ct<1&&R.setClearColor(16777215,.5),R.clear(),Ct&&L.render(X);let Vt=R.toneMapping;R.toneMapping=Mn;let jt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),ye===!0&&K.setGlobalState(R.clippingPlanes,z),Ir(v,X,z),Tt.updateMultisampleRenderTarget(pt),Tt.updateRenderTargetMipmap(pt),Mt.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let Qt=0,Ae=U.length;Qt<Ae;Qt++){let pe=U[Qt],{object:fe,geometry:We,material:Et,group:Ke}=pe;if(Et.side===Ge&&fe.layers.test(z.layers)){let ae=Et.side;Et.side=tn,Et.needsUpdate=!0,th(fe,X,z,We,Et,Ke),Et.side=ae,Et.needsUpdate=!0,wt=!0}}wt===!0&&(Tt.updateMultisampleRenderTarget(pt),Tt.updateRenderTargetMipmap(pt))}R.setRenderTarget(ft,yt,Rt),R.setClearColor(Z,ct),jt!==void 0&&(z.viewport=jt),R.toneMapping=Vt}function Ir(v,U,X){let z=U.isScene===!0?U.overrideMaterial:null;for(let V=0,pt=v.length;V<pt;V++){let St=v[V],{object:ft,geometry:yt,group:Rt}=St,Vt=St.material;Vt.allowOverride===!0&&z!==null&&(Vt=z),ft.layers.test(X.layers)&&th(ft,U,X,yt,Vt,Rt)}}function th(v,U,X,z,V,pt){C!==null&&V.isNodeMaterial&&C.setObject(v,V),v.onBeforeRender(R,U,X,z,V,pt),v.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),V.onBeforeRender(R,U,X,z,v,pt),V.transparent===!0&&V.side===Ge&&V.forceSinglePass===!1?(V.side=tn,V.needsUpdate=!0,R.renderBufferDirect(X,U,z,V,v,pt),V.side=bi,V.needsUpdate=!0,R.renderBufferDirect(X,U,z,V,v,pt),V.side=Ge):R.renderBufferDirect(X,U,z,V,v,pt),v.onAfterRender(R,U,X,z,V,pt)}function eh(v){let U=0;for(let X of v)X.texture!==null&&U++;return U}function Ls(v,U,X){U.isScene!==!0&&(U=dt);let z=At.get(v),V=E.state.lights,pt=E.state.shadowsArray,St=V.state.version,ft=q.getParameters(v,V.state,pt,U,X,E.state.lightProbeGridArray),yt=q.getProgramCacheKey(ft),Rt=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;let Vt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=T.get(v.envMap||z.environment,Vt),z.envMapRotation=z.environment!==null&&v.envMap===null?U.environmentRotation:v.envMapRotation,Rt===void 0&&(v.addEventListener("dispose",he),Rt=new Map,z.programs=Rt,z.programVariants=new Map);let jt=Rt.get(yt);if(jt!==void 0){if(z.currentProgram===jt&&z.lightsStateVersion===St)return ih(v,ft),jt}else ft.uniforms=q.getUniforms(v),C!==null&&v.isNodeMaterial&&C.build(v,X,ft),v.onBeforeCompile(ft,R),jt=q.acquireProgram(ft,yt),Rt.set(yt,jt),z.uniforms=ft.uniforms;let wt=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(wt.clippingPlanes=K.uniform),ih(v,ft),z.needsLights=Qd(v),z.lightsStateVersion=St,z.needsLights&&(wt.ambientLightColor.value=V.state.ambient,wt.lightProbe.value=V.state.probe,wt.sunLights.value=V.state.sun,wt.sunLightShadows.value=V.state.sunShadow,wt.directionalLights.value=V.state.directional,wt.directionalLightShadows.value=V.state.directionalShadow,wt.spotLights.value=V.state.spot,wt.spotLightShadows.value=V.state.spotShadow,wt.rectAreaLights.value=V.state.rectArea,wt.ltc_1.value=V.state.rectAreaLTC1,wt.ltc_2.value=V.state.rectAreaLTC2,wt.pointLights.value=V.state.point,wt.pointLightShadows.value=V.state.pointShadow,wt.hemisphereLights.value=V.state.hemi,wt.sunShadowMatrix.value=V.state.sunShadowMatrix,wt.sunShadowCascade.value=V.state.sunShadowCascade,wt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,wt.spotLightMatrix.value=V.state.spotLightMatrix,wt.spotLightMap.value=V.state.spotLightMap,wt.pointShadowMatrix.value=V.state.pointShadowMatrix),z.numLightProbeGrids=eh(E.state.lightProbeGridArray),z.currentProgram=jt,z.uniformsList=null,jt}function Jd(v,U,X,z,V){let pt=At.get(v),St=pt.currentProgram.id+","+z+","+V,ft=pt.programVariants.get(St);return ft===void 0?(ft=Ls(v,U,X),pt.programVariants.set(St,ft)):(pt.currentProgram=ft,pt.uniformsList=null,pt.outputColorSpace=z,pt.toneMapping=V),ft}function nh(v){if(v.uniformsList===null){let U=v.currentProgram.getUniforms();v.uniformsList=Ms.seqWithValue(U.seq,v.uniforms)}return v.uniformsList}function ih(v,U){let X=At.get(v);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function Kd(v,U,X,z,V){U.isScene!==!0&&(U=dt),Tt.resetTextureUnits();let pt=U.fog,St=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,ft=tt===null?R.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:te.workingColorSpace,yt=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Rt=T.get(z.envMap||St,yt),Vt=z.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,jt=!!X.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),wt=!!X.morphAttributes.position,Qt=!!X.morphAttributes.normal,Ae=!!X.morphAttributes.color,pe=Mn;z.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(pe=R.toneMapping);let fe=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,We=fe!==void 0?fe.length:0,Et=At.get(z),Ke=E.state.lights;if(ye===!0&&(Oe===!0||v!==Q)){let ve=v===Q&&z.id===H;K.setState(z,v,ve)}let ae=!1,Ci=!1;z.version===Et.__version?Et.needsLights&&Et.lightsStateVersion!==Ke.state.version||V.isBatchedMesh&&Et.batching===!1||!V.isBatchedMesh&&Et.batching===!0||V.isBatchedMesh&&Et.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Et.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Et.instancing===!1||!V.isInstancedMesh&&Et.instancing===!0||V.isSkinnedMesh&&Et.skinning===!1||!V.isSkinnedMesh&&Et.skinning===!0||V.isInstancedMesh&&Et.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Et.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Et.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Et.instancingMorph===!1&&V.morphTexture!==null||Et.envMap!==Rt||z.fog===!0&&Et.fog!==pt||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==K.numPlanes||Et.numIntersection!==K.numIntersection)||Et.vertexAlphas!==Vt||Et.vertexTangents!==jt||Et.morphTargets!==wt||Et.morphNormals!==Qt||Et.morphColors!==Ae||Et.morphTargetsCount!==We||Et.numLightProbeGrids!==eh(E.state.lightProbeGridArray)?ae=!0:(Et.outputColorSpace!==ft||Et.toneMapping!==pe)&&(Ci=!0):(ae=!0,Et.__version=z.version);let Xe=Et.currentProgram;(ae===!0||Ci===!0)&&(Xe=Ci===!0?Jd(z,U,V,ft,pe):Ls(z,U,V),C&&z.isNodeMaterial&&C.onUpdateProgram(z,Xe,Et));let Pr=!1,ci=!1,Ii=!1,re=Xe.getUniforms(),Be=Et.uniforms;if(it.useProgram(Xe.program)&&(Pr=!0,ci=!0,Ii=!0),z.id!==H&&(H=z.id,ci=!0),Pr||Q!==v){it.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),re.setValue(D,"projectionMatrix",v.projectionMatrix),re.setValue(D,"viewMatrix",v.matrixWorldInverse);let Ne=re.map.cameraPosition;Ne!==void 0&&Ne.setValue(D,Te.setFromMatrixPosition(v.matrixWorld)),Wt.logarithmicDepthBuffer&&re.setValue(D,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&re.setValue(D,"isOrthographic",v.isOrthographicCamera===!0),Q!==v&&(Q=v,ci=!0,Ii=!0)}if(Et.needsLights&&(Ke.state.sunShadowMap.length>0&&re.setValue(D,"sunShadowMap",Ke.state.sunShadowMap,Tt),Ke.state.directionalShadowMap.length>0&&re.setValue(D,"directionalShadowMap",Ke.state.directionalShadowMap,Tt),Ke.state.spotShadowMap.length>0&&re.setValue(D,"spotShadowMap",Ke.state.spotShadowMap,Tt),Ke.state.pointShadowMap.length>0&&re.setValue(D,"pointShadowMap",Ke.state.pointShadowMap,Tt)),V.isSkinnedMesh){re.setOptional(D,V,"bindMatrix"),re.setOptional(D,V,"bindMatrixInverse");let ve=V.skeleton;ve&&(ve.boneTexture===null&&ve.computeBoneTexture(),re.setValue(D,"boneTexture",ve.boneTexture,Tt))}V.isBatchedMesh&&(re.setOptional(D,V,"batchingTexture"),re.setValue(D,"batchingTexture",V._matricesTexture,Tt),re.setOptional(D,V,"batchingIdTexture"),re.setValue(D,"batchingIdTexture",V._indirectTexture,Tt),re.setOptional(D,V,"batchingColorTexture"),V._colorsTexture!==null&&re.setValue(D,"batchingColorTexture",V._colorsTexture,Tt));let wn=X.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&j.update(V,X,Xe),(ci||Et.receiveShadow!==V.receiveShadow)&&(Et.receiveShadow=V.receiveShadow,re.setValue(D,"receiveShadow",V.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(Be.envMapIntensity.value=U.environmentIntensity),Be.dfgLUT!==void 0&&(Be.dfgLUT.value=I0()),ci){if(re.setValue(D,"toneMappingExposure",R.toneMappingExposure),Et.needsLights&&jd(Be,Ii),pt&&z.fog===!0&&rt.refreshFogUniforms(Be,pt),rt.refreshMaterialUniforms(Be,z,mt,Lt,E.state.transmissionRenderTarget[v.id]),Et.needsLights&&Et.numLightProbeGrids>0){let ve=b,Ne=0;for(let Wn of E.state.lightProbeGridArray)Wn.texture!==null&&(ve.textures[Ne]=Wn.texture,ve.min[Ne]=Wn.boundingBox.min,ve.max[Ne]=Wn.boundingBox.max,ve.resolution[Ne]=Wn.resolution,Ne++);for(let Wn in ve)ve[Wn].length=Ne;Be.probesSH.value=ve.textures,Be.probesMin.value=ve.min,Be.probesMax.value=ve.max,Be.probesResolution.value=ve.resolution}Ms.upload(D,nh(Et),Be,Tt)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ms.upload(D,nh(Et),Be,Tt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&re.setValue(D,"center",V.center),re.setValue(D,"modelViewMatrix",V.modelViewMatrix),re.setValue(D,"normalMatrix",V.normalMatrix),re.setValue(D,"modelMatrix",V.matrixWorld),z.uniformsGroups!==void 0){let ve=z.uniformsGroups;for(let Ne=0,Wn=ve.length;Ne<Wn;Ne++){let rh=ve[Ne];It.update(rh,Xe),It.bind(rh,Xe)}}return Xe}function jd(v,U){v.ambientLightColor.needsUpdate=U,v.lightProbe.needsUpdate=U,v.sunLights.needsUpdate=U,v.sunLightShadows.needsUpdate=U,v.directionalLights.needsUpdate=U,v.directionalLightShadows.needsUpdate=U,v.pointLights.needsUpdate=U,v.pointLightShadows.needsUpdate=U,v.spotLights.needsUpdate=U,v.spotLightShadows.needsUpdate=U,v.rectAreaLights.needsUpdate=U,v.hemisphereLights.needsUpdate=U}function Qd(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return tt},this.setRenderTargetTextures=function(v,U,X){let z=At.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),At.get(v.texture).__webglTexture=U,At.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:X,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,U){let X=At.get(v);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(v,U=0,X=0){tt=v,k=U,G=X;let z=null,V=!1,pt=!1;if(v){let ft=At.get(v);if(ft.__useDefaultFramebuffer!==void 0){it.bindFramebuffer(D.FRAMEBUFFER,ft.__webglFramebuffer),et.copy(v.viewport),bt.copy(v.scissor),zt=v.scissorTest,it.viewport(et),it.scissor(bt),it.setScissorTest(zt),H=-1;return}else if(ft.__webglFramebuffer===void 0)Tt.setupRenderTarget(v);else if(ft.__hasExternalTextures)Tt.rebindTextures(v,At.get(v.texture).__webglTexture,At.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Vt=v.depthTexture;if(ft.__boundDepthTexture!==Vt){if(Vt!==null&&At.has(Vt)&&(v.width!==Vt.image.width||v.height!==Vt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Tt.setupDepthRenderbuffer(v)}}let yt=v.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(pt=!0);let Rt=At.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Rt[U])?z=Rt[U][X]:z=Rt[U],V=!0):v.samples>0&&Tt.useMultisampledRTT(v)===!1?z=At.get(v).__webglMultisampledFramebuffer:Array.isArray(Rt)?z=Rt[X]:z=Rt,et.copy(v.viewport),bt.copy(v.scissor),zt=v.scissorTest}else et.copy(Ot).multiplyScalar(mt).floor(),bt.copy(se).multiplyScalar(mt).floor(),zt=le;if(X!==0&&(z=O),it.bindFramebuffer(D.FRAMEBUFFER,z)&&it.drawBuffers(v,z),it.viewport(et),it.scissor(bt),it.setScissorTest(zt),V){let ft=At.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,ft.__webglTexture,X)}else if(pt){let ft=U;for(let yt=0;yt<v.textures.length;yt++){let Rt=At.get(v.textures[yt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+yt,Rt.__webglTexture,X,ft)}}else if(v!==null&&X!==0){let ft=At.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ft.__webglTexture,X)}H=-1};function sh(v){let U=At.get(v);return(U.__readFormat!==v.format||U.__readType!==v.type)&&(U.__readFormat=v.format,U.__readType=v.type,U.__formatReadable=Wt.textureFormatReadable(v.format),U.__typeReadable=Wt.textureTypeReadable(v.type)),U}this.readRenderTargetPixels=function(v,U,X,z,V,pt,St,ft=0){if(!(v&&v.isWebGLRenderTarget)){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=At.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(yt=yt[St],Array.isArray(yt)&&(yt=yt[0])),yt){it.bindFramebuffer(D.FRAMEBUFFER,yt);try{let Rt=v.textures[ft],Vt=Rt.format,jt=Rt.type;v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ft);let wt=sh(Rt);if(wt.__formatReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(wt.__typeReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=v.width-z&&X>=0&&X<=v.height-V&&D.readPixels(U,X,z,V,ot.convert(Vt),ot.convert(jt),pt)}finally{let Rt=tt!==null?At.get(tt).__webglFramebuffer:null;it.bindFramebuffer(D.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(v,U,X,z,V,pt,St,ft=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=At.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(yt=yt[St],Array.isArray(yt)&&(yt=yt[0])),yt)if(U>=0&&U<=v.width-z&&X>=0&&X<=v.height-V){it.bindFramebuffer(D.FRAMEBUFFER,yt);let Rt=v.textures[ft],Vt=Rt.format,jt=Rt.type;v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ft);let wt=sh(Rt);if(wt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(wt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Qt),D.bufferData(D.PIXEL_PACK_BUFFER,pt.byteLength,D.STREAM_READ),D.readPixels(U,X,z,V,ot.convert(Vt),ot.convert(jt),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Ae=tt!==null?At.get(tt).__webglFramebuffer:null;it.bindFramebuffer(D.FRAMEBUFFER,Ae);let pe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await _u(D,pe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Qt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pt),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(Qt),D.deleteSync(pe),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,U=null,X=0){let z=Math.pow(2,-X),V=Math.floor(v.image.width*z),pt=Math.floor(v.image.height*z),St=U!==null?U.x:0,ft=U!==null?U.y:0;Tt.setTexture2D(v,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,St,ft,V,pt),it.unbindTexture()},this.copyTextureToTexture=function(v,U,X=null,z=null,V=0,pt=0){let St,ft,yt,Rt,Vt,jt,wt,Qt,Ae,pe=v.isCompressedTexture?v.mipmaps[pt]:v.image;if(X!==null)St=X.max.x-X.min.x,ft=X.max.y-X.min.y,yt=X.isBox3?X.max.z-X.min.z:1,Rt=X.min.x,Vt=X.min.y,jt=X.isBox3?X.min.z:0;else{let re=Math.pow(2,-V);St=Math.floor(pe.width*re),ft=Math.floor(pe.height*re),v.isDataArrayTexture?yt=pe.depth:v.isData3DTexture?yt=Math.floor(pe.depth*re):yt=1,Rt=0,Vt=0,jt=0}z!==null?(wt=z.x,Qt=z.y,Ae=z.z):(wt=0,Qt=0,Ae=0);let fe=ot.convert(U.format),We=ot.convert(U.type),Et;U.isData3DTexture?(Tt.setTexture3D(U,0),Et=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Tt.setTexture2DArray(U,0),Et=D.TEXTURE_2D_ARRAY):(Tt.setTexture2D(U,0),Et=D.TEXTURE_2D),it.activeTexture(D.TEXTURE0),it.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),it.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),it.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);let Ke=it.getParameter(D.UNPACK_ROW_LENGTH),ae=it.getParameter(D.UNPACK_IMAGE_HEIGHT),Ci=it.getParameter(D.UNPACK_SKIP_PIXELS),Xe=it.getParameter(D.UNPACK_SKIP_ROWS),Pr=it.getParameter(D.UNPACK_SKIP_IMAGES);it.pixelStorei(D.UNPACK_ROW_LENGTH,pe.width),it.pixelStorei(D.UNPACK_IMAGE_HEIGHT,pe.height),it.pixelStorei(D.UNPACK_SKIP_PIXELS,Rt),it.pixelStorei(D.UNPACK_SKIP_ROWS,Vt),it.pixelStorei(D.UNPACK_SKIP_IMAGES,jt);let ci=v.isDataArrayTexture||v.isData3DTexture,Ii=U.isDataArrayTexture||U.isData3DTexture;if(v.isDepthTexture){let re=At.get(v),Be=At.get(U),wn=At.get(re.__renderTarget),ve=At.get(Be.__renderTarget);it.bindFramebuffer(D.READ_FRAMEBUFFER,wn.__webglFramebuffer),it.bindFramebuffer(D.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let Ne=0;Ne<yt;Ne++)ci&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,At.get(v).__webglTexture,V,jt+Ne),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,At.get(U).__webglTexture,pt,Ae+Ne)),D.blitFramebuffer(Rt,Vt,Rt+St,Vt+ft,wt,Qt,wt+St,Qt+ft,D.DEPTH_BUFFER_BIT,D.NEAREST);it.bindFramebuffer(D.READ_FRAMEBUFFER,null),it.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(V!==0||v.isRenderTargetTexture||At.has(v)){let re=At.get(v),Be=At.get(U);it.bindFramebuffer(D.READ_FRAMEBUFFER,P),it.bindFramebuffer(D.DRAW_FRAMEBUFFER,W);for(let wn=0;wn<yt;wn++)ci?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,re.__webglTexture,V,jt+wn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,re.__webglTexture,V),Ii?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Be.__webglTexture,pt,Ae+wn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Be.__webglTexture,pt),V!==0?D.blitFramebuffer(Rt,Vt,Rt+St,Vt+ft,wt,Qt,wt+St,Qt+ft,D.COLOR_BUFFER_BIT,D.NEAREST):Ii?D.copyTexSubImage3D(Et,pt,wt,Qt,Ae+wn,Rt,Vt,St,ft):D.copyTexSubImage2D(Et,pt,wt,Qt,Rt,Vt,St,ft);it.bindFramebuffer(D.READ_FRAMEBUFFER,null),it.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ii?v.isDataTexture||v.isData3DTexture?D.texSubImage3D(Et,pt,wt,Qt,Ae,St,ft,yt,fe,We,pe.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Et,pt,wt,Qt,Ae,St,ft,yt,fe,pe.data):D.texSubImage3D(Et,pt,wt,Qt,Ae,St,ft,yt,fe,We,pe):v.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pt,wt,Qt,St,ft,fe,We,pe.data):v.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pt,wt,Qt,pe.width,pe.height,fe,pe.data):D.texSubImage2D(D.TEXTURE_2D,pt,wt,Qt,St,ft,fe,We,pe);it.pixelStorei(D.UNPACK_ROW_LENGTH,Ke),it.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ae),it.pixelStorei(D.UNPACK_SKIP_PIXELS,Ci),it.pixelStorei(D.UNPACK_SKIP_ROWS,Xe),it.pixelStorei(D.UNPACK_SKIP_IMAGES,Pr),pt===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&D.generateMipmap(Et),it.unbindTexture()},this.initRenderTarget=function(v){At.get(v).__webglFramebuffer===void 0&&Tt.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Tt.setTextureCube(v,0):v.isData3DTexture?Tt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Tt.setTexture2DArray(v,0):Tt.setTexture2D(v,0),it.unbindTexture()},this.resetState=function(){k=0,G=0,tt=null,it.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}};var Na=(i,t,e)=>Math.min(e,Math.max(t,i)),Rc=class{constructor(){this.reset()}reset(){this.yaw=.58,this.pitch=-.3,this.distance=5}rotate(t,e){this.yaw=((this.yaw+t+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI,this.pitch=Na(this.pitch+e,-1.12,.85)}zoom(t){this.distance=Na(this.distance/t,2.3,11)}forward(){return{x:-Math.sin(this.yaw),y:0,z:-Math.cos(this.yaw)}}};function id(i,t,e,n){let s=new Rc,r=new Map,o=new Set,a=0,c=5,l=()=>{let[d,g]=[...r.values()];return Math.hypot(d.x-g.x,d.y-g.y)};t.addEventListener("contextmenu",d=>d.preventDefault()),t.addEventListener("pointerdown",d=>{n()||d.button===1||(r.set(d.pointerId,{x:d.clientX,y:d.clientY}),t.setPointerCapture(d.pointerId),r.size===2&&(a=l(),c=s.distance))}),t.addEventListener("pointermove",d=>{let g=r.get(d.pointerId);if(!(!g||n()))if(r.set(d.pointerId,{x:d.clientX,y:d.clientY}),r.size>1){let _=l();a>0&&_>0&&(s.distance=Na(c*a/_,2.3,11))}else s.rotate(-(d.clientX-g.x)*.006,-(d.clientY-g.y)*.005)});let h=d=>{r.delete(d.pointerId),r.size<2&&(a=0)};for(let d of["pointerup","pointercancel","lostpointercapture"])t.addEventListener(d,h);t.addEventListener("wheel",d=>{d.preventDefault(),n()||s.zoom(Math.exp(-Na(d.deltaY,-200,200)*.002))},{passive:!1});for(let d of document.querySelectorAll("[data-look]")){let g=d.dataset.look;d.addEventListener("pointerdown",f=>{f.preventDefault(),d.setPointerCapture(f.pointerId),o.add(g)});let _=()=>o.delete(g);for(let f of["pointerup","pointercancel","lostpointercapture"])d.addEventListener(f,_);d.addEventListener("click",()=>p(g,.14))}function p(d,g){n()||s.rotate(d==="left"?g:d==="right"?-g:0,d==="up"?g:d==="down"?-g:0)}function u(){r.clear(),o.clear()}return window.addEventListener("blur",u),window.addEventListener("resize",u),window.addEventListener("pagehide",u),{state:s,reset:()=>s.reset(),zoom:d=>s.zoom(d),forward:()=>s.forward(),update(d,g){if(!g)return;for(let A of o)p(A,d*1.5);let{yaw:_,pitch:f,distance:m}=s,M=s.forward();i.position.set(g.x-M.x*m,(g.y||0)+1.3+m*.31,g.z-M.z*m),i.lookAt(i.position.x+M.x*Math.cos(f),i.position.y+Math.sin(f),i.position.z+M.z*Math.cos(f)),e.dataset.lookYaw=_.toFixed(3),e.dataset.lookPitch=f.toFixed(3),e.dataset.cameraDistance=m.toFixed(2)}}}function Cc(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Ze;c.morphTargetsRelative=a;let l=0;for(let h=0;h<i.length;++h){let p=i[h],u=0,d=0;if(e!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let g in p.attributes){if(!n.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;r[g]===void 0&&(r[g]=[]),r[g].push(p.attributes[g]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let g in p.morphAttributes){if(!s.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(p.morphAttributes[g].length!==i[0].morphAttributes[g].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+g+'" morph attribute.'),null;o[g]===void 0&&(o[g]=[]),o[g].push(p.morphAttributes[g]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(t){let g;if(e)g=p.index.count;else if(p.attributes.position!==void 0)g=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,g,h),l+=g}}if(e){let h=0,p=[];for(let u=0;u<i.length;++u){let d=i[u].index;for(let g=0;g<d.count;++g)p.push(d.getX(g)+h);h+=i[u].attributes.position.count}c.setIndex(p)}for(let h in r){let p=sd(r[h]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,p)}for(let h in o){let p=o[h][0].length;if(p!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<p;++u){let d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][u]);let g=sd(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}}return c}function sd(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new pn(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let p=c/e;for(let u=0,d=h.count;u<d;u++)for(let g=0;g<e;g++){let _=h.getComponent(u,g);a.setComponent(u+p,g,_)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function an(i,t=new Set){let e=new Map,n=new Map;for(let s of[...i.children]){if(!s.isMesh||s.isInstancedMesh||t.has(s)||Array.isArray(s.material)||s.material.map||s.material.visible===!1)continue;s.updateMatrix();let r=e.get(s.material)||[];r.push(s),e.set(s.material,r);for(let o of[...s.children])if(o.isLineSegments){o.updateMatrix();let a=o.geometry.clone().applyMatrix4(new ne().multiplyMatrices(s.matrix,o.matrix)),c=n.get(o.material)||[];c.push(a),n.set(o.material,c),s.remove(o)}}for(let[s,r]of e){if(r.length<2)continue;let o=r.map(l=>l.geometry.clone().applyMatrix4(l.matrix)),a=Cc(o,!1);for(let l of o)l.dispose();if(!a)continue;let c=new Zt(a,s);c.userData.ownedGeometry=!0,i.add(c);for(let l of r)i.remove(l)}for(let[s,r]of n){let o=Cc(r,!1);for(let a of r)a.dispose();if(o){let a=new Fi(o,s);a.userData.ownedGeometry=!0,i.add(a)}}return i}function wi(i){let t=new Set,e=new Set,n=new Set;i.traverse(s=>{s.userData.ownedGeometry&&t.add(s.geometry),s.userData.fadeMat&&e.add(s.userData.fadeMat);let r=s.userData.originalMat||s.material;r?.map&&(n.add(r.map),e.add(r),t.add(s.geometry)),s.isInstancedMesh&&s.dispose()});for(let s of t)s.dispose();for(let s of e)s.dispose();for(let s of n)s.dispose()}var _t={ink:"#1e1e2e",paper:"#f4eedd",panel:"#fffbf0",gold:"#ffcc00",blue:"#3d8bfd",red:"#ff4b4b"},P0=[["#a86f3d","#3b2a1e","#f7c9a3"],["#5b6b8a","#1e1e2e","#f2d0b0"],["#4b7a52","#c0392b","#f7c9a3"],["#7a5c8a","#e6b800","#e8b98a"],["#8a5a3a","#6b4a2a","#8d5a3b"],["#3f4a5a","#dfe3e8","#f2d0b0"],["#2b2b3a","#2f7d6b","#f7c9a3"],["#c96b4a","#a8577d","#f7c9a3"]],od=new Ce(1,1,1),L0=new er(od),D0=new ms({color:_t.ink,transparent:!0,opacity:.8}),Ic=new Map;function Je(i){return Ic.has(i)||Ic.set(i,new ir({color:i})),Ic.get(i)}function J(i,t,e,n,s,r,o,a,c=!1){let l=new Zt(od,Je(a));return l.scale.set(t,e,n),l.position.set(s,r,o),i.add(l),c&&l.add(new Fi(L0,D0)),l}var N0=new tr(.65,16),U0=new be({color:_t.ink,transparent:!0,opacity:.16,depthWrite:!1}),ad=new ii(.72,.8,4),ld=new be({color:_t.blue,side:Ge}),Pc=new be({color:_t.gold,side:Ge}),F0=new gn(.43,.25,.25,8),O0=new nr(.4,.045,4,8),B0=new gn(.12,.12,.045,8);function z0(i=0){let t=Math.abs(i)%8,[e,n,s]=P0[t],r=new ue,o=new ue;r.add(o);let a=new Zt(N0,U0);a.rotation.x=-Math.PI/2,a.position.y=.025,r.add(a),J(o,.76,.83,.46,0,1.07,0,_t.ink),J(o,.67,.76,.48,0,1.08,.01,e),J(o,.22,.23,.02,-.2,1.12,.26,t===4?"#556677":"#f2c14e"),J(o,.015,.26,.03,-.22,1.12,.28,_t.ink),J(o,.25,.015,.03,-.2,1.12,.28,_t.ink),J(o,.06,.64,.025,.13,1.09,.26,_t.ink),J(o,.9,.87,.7,0,1.91,0,_t.ink),J(o,.8,.72,.72,0,1.88,.015,s),J(o,.94,.26,.74,0,2.25,-.015,n),J(o,.15,.44,.74,-.38,2.05,-.015,n),J(o,.16,.13,.7,-.24,2.41,-.015,n),J(o,.15,.1,.7,.19,2.4,-.015,n);for(let u of[-.21,.2])J(o,.14,.2,.04,u,1.97,.4,_t.ink),J(o,.055,.06,.045,u+.025,2.02,.425,"#ffffff");if(J(o,.09,.14,.04,-.22,1.77,.4,"#6fb7ff"),J(o,.18,.065,.04,0,1.69,.4,"#c0392b"),(t===1||t===6)&&J(o,.98,.12,.77,0,2.28,0,t===1?"#c0392b":"#e6b800"),t===2||t===5){let u=t===5?"#dfe3e8":"#8a6a4a";J(o,.5,.16,.05,0,1.65,.42,u),J(o,.24,.13,.05,0,1.54,.42,u)}let c=[],l=[];for(let u of[-1,1]){let d=new ue;d.position.set(u*.23,.72,0),J(d,.29,.5,.31,0,-.22,0,"#556677"),J(d,.32,.15,.44,0,-.52,.06,_t.ink),J(d,.23,.11,.2,0,-.49,.22,s),r.add(d),c.push(d);let g=new ue;g.position.set(u*.47,1.43,0),J(g,.24,.49,.28,0,-.22,0,_t.ink),J(g,.22,.42,.3,0,-.2,.015,e),J(g,.23,.17,.25,0,-.5,.08,s),o.add(g),l.push(g)}let h=new Zt(F0,Je("#ece7d8"));h.position.set(0,.92,.66),o.add(h);let p=new Zt(O0,Je(_t.ink));p.rotation.x=Math.PI/2,p.position.set(0,1.05,.66),o.add(p);for(let u of[-.15,.11]){let d=new Zt(B0,Je(_t.gold));d.position.set(u,1.05,.67),o.add(d)}an(o);for(let u of[...c,...l])an(u);return r.userData={upper:o,legs:c,arms:l,bowl:h},r}var rd=new Map;function wr(i=0){let t=Math.abs(i)%8,e=rd.get(t);if(!e){e=z0(t);let{upper:s,legs:r,arms:o,bowl:a}=e.userData;s.name="person-upper",a.name="person-bowl",r.forEach((c,l)=>c.name="person-leg-"+l),o.forEach((c,l)=>c.name="person-arm-"+l),e.traverse(c=>{c.userData.ownedGeometry&&delete c.userData.ownedGeometry}),e.userData={},rd.set(t,e)}let n=e.clone(!0);return n.userData={upper:n.getObjectByName("person-upper"),legs:[0,1].map(s=>n.getObjectByName("person-leg-"+s)),arms:[0,1].map(s=>n.getObjectByName("person-arm-"+s)),bowl:n.getObjectByName("person-bowl")},n}function ws(i,t,e,n=0){let{upper:s,legs:r,arms:o}=i.userData,a=t==="walk",c=t==="beg",l=t==="wave",h=t==="clink";s.rotation.z=t==="caught"?-1.15:0;let p=Math.floor(e*9)/9,u=Math.sin(p*10+n);s.position.y=c?-.36:h?Math.abs(Math.sin(e*7))*.14:a?Math.abs(u)*.045:0,r[0].rotation.x=c?-1.4:a?u*.52:0,r[1].rotation.x=c?-1.4:a?-u*.52:0,o[0].rotation.x=h?-.9+Math.sin(e*7)*.2:c?-.5:a?-u*.35:-.15,o[1].rotation.x=h?-.9+Math.sin(e*7)*.2:c?-.5:a?u*.35:-.15,o[1].rotation.z=l?-2.45+Math.sin(p*11)*.3:0}function k0(i,t="",e="ink"){let n=document.createElement("canvas");n.width=512,n.height=192;let s=n.getContext("2d"),r=e==="ink";s.fillStyle=_t.ink,s.fillRect(0,0,512,192),s.fillStyle=r?_t.ink:e==="gold"?_t.gold:"#d4ae7a",s.fillRect(5,5,502,182),s.strokeStyle=r?_t.gold:_t.ink,s.lineWidth=4,s.strokeRect(13,13,486,166),s.fillStyle=r?_t.gold:_t.ink;for(let c of[22,474])for(let l of[22,154])s.fillRect(c,l,12,12);s.textAlign="center",s.font="40px Pixel, sans-serif";let o=Array.from(i).slice(0,12).join("");for(;s.measureText(o).width>435&&o.length>1;)o=o.slice(0,-1);s.fillText(o,256,94),s.font="20px Pixel, monospace",s.fillText(t,256,145);let a=new ei(n);return a.colorSpace=Se,a.magFilter=xe,a.minFilter=ze,new be({map:a})}function ln(i,t,e,n,s,r,o,a,c="ink"){let l=new Zt(new Oi(n,s),k0(t,e,c));return l.position.set(r,o,a),i.add(l),l}function cd(i,t,e){function n(o){let a=new ue;a.position.set(o.x,0,o.z);let c=o.id%4,l=[3.6,4.1,3.85,4.4][c],h=["#b75b43","#e0a800","#637d9c","#876a91"][c],p=["#efe1c4","#fffbf0","#e4d6bd","#f4eedd"][c];J(a,6.1,.28,5,0,.16,-1,"#b9ad97",!0),J(a,5.9,l,4.8,0,l/2,-1,p,!0),J(a,6.35,.2,5.3,0,l+.02,-1,_t.ink),J(a,6.15,.28,5.1,0,l+.25,-1,h,!0);for(let m=0;m<6;m++)J(a,.055,.04,4.9,-2.5+m,l+.41,-1,_t.ink);c%2===0&&(J(a,.65,.72,.7,1.7,l+.7,-2,"#9b6f53",!0),J(a,.8,.14,.82,1.7,l+1.1,-2,_t.ink));for(let m=0;m<5;m++)J(a,.4,.17,.035,-2.6+m%3*.45,.45+Math.floor(m/3)*.22,1.42,"#c3a58c");J(a,1.1,2.2,.1,1.55,1.18,1.43,_t.ink),J(a,.86,1.95,.11,1.55,1.15,1.5,"#805c43"),J(a,.08,1.9,.12,1.55,1.15,1.57,"#aa8660"),J(a,.09,.09,.12,1.81,1.22,1.62,_t.gold),J(a,1.3,1.25,.1,-1.45,1.75,1.44,_t.ink),J(a,1.12,1.07,.11,-1.45,1.75,1.5,"#efbd61"),J(a,.07,1.08,.12,-1.45,1.75,1.57,_t.ink),J(a,1.13,.07,.12,-1.45,1.75,1.57,_t.ink),J(a,1.5,.13,.4,-1.45,1.08,1.58,"#6d5749",!0);let u=ln(a,o.name,`${o.slug?"@"+o.slug:"\u603B\u8235"} \xB7 ${o.coins} \u94A2\u955A`,4.6,1.35,0,l-.6,1.48,o.slug?"ink":"gold");for(let m=0;m<8;m++)J(a,.72,.16,1.6,-2.55+m*.73,2.58,2.05,m%2?"#fffbf0":_t.gold),J(a,.72,.3,.08,-2.55+m*.73,2.42,2.83,m%2?"#fffbf0":_t.gold);J(a,6,.065,.07,0,2.26,2.88,_t.ink);for(let m of[-2.7,2.7])J(a,.1,2.6,.1,m,1.3,2.8,_t.ink);a.userData.structure=[...a.children],a.userData.houseBounds=new rn(new F(o.x-3.2,0,o.z-3.7),new F(o.x+3.2,l+1.2,o.z+2.9)),J(a,2.25,.035,1.45,-.25,.08,3.5,"#d4ae7a",!0);let d=wr(o.skin);d.position.set(-.6,.09,3.4),a.add(d),ws(d,"beg",0,o.id);let g=ln(a,c%2?"\u884C\u884C\u597D\uFF0C\u8D4F\u53E3\u996D\u5403":"\u4ECA\u65E5\u76EE\u6807\uFF1A\u4E00\u7897\u70ED\u996D","\u8C22\u8C22\u5404\u4F4D\u5927\u54E5\u5927\u59D0",1.7,.8,1.25,.55,3.95,"paper");g.rotation.y=-.18,J(a,1,.7,.8,-2.1,.35,2.2,"#aa7951",!0),J(a,1.04,.08,.85,-2.1,.75,2.2,"#d2a275"),J(a,.07,.72,.83,-2.2,.4,2.2,"#72513e"),c===0?ln(a,"\u6B20\u8D39\u505C\u673A","\u660E\u5929\u518D\u52AA\u529B",.75,.65,2.3,1.8,1.52,"paper"):c===1?(J(a,.6,.55,.6,-2.15,1.07,2.2,"#b75b43",!0),J(a,.12,.75,.1,-2.15,1.7,2.2,"#4b7a52"),J(a,.6,.16,.4,-2.15,1.8,2.2,"#3ec46d")):c===2?ln(a,"\u62DB\u8D22","\u4E00\u5E01\u4E00\u529F\u5FB7",.65,1.2,-2.5,1.5,1.51,"gold"):(J(a,.8,.55,.55,-2.1,1.07,2.2,"#556677",!0),J(a,.55,.32,.03,-2.1,1.08,2.5,_t.ink),J(a,.08,.08,.04,-1.85,1.08,2.53,_t.gold));let _=new Zt(new Ce(2.5,2.7,1.4),new be({visible:!1}));_.position.set(0,1.25,3.4),_.userData.siteId=o.id,a.add(_),e.push(_);let f=document.createElement("button");return f.type="button",f.className="stall-label",f.textContent=o.name,f.setAttribute("aria-label","\u67E5\u770B"+o.name+"\u7684\u644A\u4F4D"),t.append(f),an(a),a.userData.structure=a.children.filter(m=>m.isMesh&&m!==_),i.add(a),{group:a,owner:d,label:f,hit:_,board:u}}function s(o){i.remove(o.group),o.label.remove();let a=e.indexOf(o.hit);a>=0&&e.splice(a,1),wi(o.group),o.hit.geometry.dispose(),o.hit.material.dispose()}function r(o){for(let p=-19;p<=-13;p+=1)J(i,.55,.025,4.7,p,.04,0,"#fffbf0");let a=new ue;a.position.set(-20,0,-4.4),J(a,.2,5,.2,-3.2,2.5,0,_t.ink),J(a,.2,5,.2,3.2,2.5,0,_t.ink),ln(a,"\u8D5B\u535A\u8981\u996D \xB7 \u4E10\u5E2E\u603B\u8235","INSERT COIN \xB7 GOOD LUCK",6.5,1.9,0,4.5,.1,"gold"),i.add(a);let c=new ue;c.position.set(-21,0,4.5),J(c,3.4,2.4,.23,0,2.1,0,"#8c6443",!0),ln(c,"\u6C5F\u6E56\u544A\u793A","\u94A2\u955A\u867D\u5C0F \xB7 \u529F\u5FB7\u65E0\u91CF",3.1,1.9,0,2.1,.14,"paper");for(let p of[-1.2,1.2])J(c,.14,2.1,.14,p,1,0,_t.ink);i.add(c);let l=new ue,h=new Zt(new ii(.4,.51,4),Pc);return h.rotation.x=-Math.PI/2,l.add(h),J(l,1.2,.02,.06,0,.01,0,_t.gold),J(l,.06,.02,1.2,0,.01,0,_t.gold),l.position.y=.18,l.visible=!1,i.add(l),{goal:l}}return{makeStall:n,disposeStall:s,buildEnvironment:r}}function Ua(i,t,e){let n=new ue;n.position.set(t,0,e),J(n,.43,.17,.43,0,.14,0,_t.ink),J(n,.12,3.6,.12,0,1.9,0,_t.ink),J(n,.9,.12,.13,.35,3.7,0,_t.ink),J(n,.62,.12,.62,.7,3.6,0,_t.ink),J(n,.45,.55,.42,.7,3.29,0,"#ffcc00",!0),J(n,.62,.12,.62,.7,2.97,0,_t.ink),an(n),i.add(n)}function Er(i,t,e,n){let s=new ue;s.position.set(t,0,e),J(s,1.9,.25,1.9,0,.14,0,"#aa7951",!0),J(s,.28,2.5,.28,0,1.3,0,"#705140");for(let r=0;r<3;r++)J(s,2.2-r*.4,1.2,2-r*.35,r%2*.2,2.2+r*.6,0,["#4b7a52","#6a944e","#9baa5b"][(n+r)%3],r===0);an(s),i.add(s)}var hd=(i,t)=>(i%t+t)%t,Lc=(i,t)=>(hd(i,997)*7381+hd(t,997)*19391)%65521,Es=(i,t)=>Lc(i,t)%5!==0;function Fa(i,t,e){return e.cells?e.cells.get(`${i},${t}`):i>=0&&i<12&&t>=0?e.get(t*12+i+1):void 0}function Ei(i,t){let e=Math.floor(i/8+2.5),n=Math.floor((t+10)/16+.5);return{col:e,row:n,x:e*8-16,z:n*16-9}}function ud(i,t){let e=Math.floor((i+24)/48),n=Math.floor((t+8)/48),s=[];for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++)s.push({key:`${e+r},${n+o}`,x:e+r,z:n+o});return s}var dd={plaza:{x:-48,z:8,name:"\u4E2D\u592E\u5E7F\u573A"},street:{x:-16,z:0,name:"\u8981\u996D\u5927\u8857"},bridge:{x:-48,z:-24,name:"\u5929\u6865\u591C\u5DE1"}},en=["\u6865\u6D1E","\u7834\u5E99","\u5929\u6865\u5E95","\u516C\u56ED\u957F\u6905","\u5730\u94C1\u901A\u9053","\u70C2\u5C3E\u697C"],Ts=i=>({x:i%2===0?-69:-27,z:-32-Math.floor(i/2)*18});function Tr(i,t){return i>=-70&&i<=-26&&t>=-18&&t<=20}function Wi(i,t){return i>=-82&&i<=-14&&t>=-84&&t<=-22}function Dc(i,t){return Tr(i,t)||Wi(i,t)||i>=-54&&i<=-42&&t>=-24&&t<=-18}function fd(i,t){return Dc(i,t)?Tr(i,t)?Math.hypot(i+48,t)>=3.1:!(t>-75&&t<-25&&(i>-53&&i<-51.8||i>-44.2&&i<-43)):null}function Ti(i,t){return i<-51.8||i>-44.2||t<-75||t>-25?0:t>=-35?(-25-t)*.4:t<=-65?(t+75)*.4:4}function pd(i,t){return Tr(i,t)?"\u4E2D\u592E\u5E7F\u573A \xB7 \u590D\u6D3B\u70B9":Wi(i,t)?"\u5929\u6865\u591C\u5DE1":""}var Oa=(i,t)=>`${i},${t}`,Ba=(i,t)=>({x:i*8-16,z:t*16-9,col:i,row:t});function Uc(i,t){if(!Number.isInteger(i)||!Number.isInteger(t)||Math.abs(i)>1e4||Math.abs(t)>1e4||!Es(i,t))return!1;let{x:e,z:n}=Ba(i,t);return![[-70,-26,-18,20],[-82,-14,-84,-22],[-54,-42,-24,-18]].some(([s,r,o,a])=>e+3.4>=s&&e-3.4<=r&&n+4.2>=o&&n-3.9<=a)}function za(i){let t=new Map;for(let e of i){let n=Ei(e.x,e.z);t.set(Oa(n.col,n.row),e)}return t}function G0(i,t,e=8){let n=za(i),s=Ei(t.x,t.z),r=[];for(let o=-10;o<=10;o++)for(let a=-6;a<=6;a++){let c=s.col+o,l=s.row+a;Uc(c,l)&&!n.has(Oa(c,l))&&r.push(Ba(c,l))}return r.sort((o,a)=>Math.hypot(o.x-t.x,o.z-t.z)-Math.hypot(a.x-t.x,a.z-t.z)||o.row-a.row||o.col-a.col).slice(0,e)}var Nc=i=>`\u8857\u533A ${i.col} / ${i.row} \u53F7`;function md({root:i,getSites:t,getSelf:e,ownSite:n,onStop:s,onNotice:r,onTour:o,onVisit:a,onRefresh:c,onClosePanels:l}){let h=document.getElementById("world-shops"),p=document.getElementById("shop-list"),u=document.getElementById("shop-claim"),d=document.getElementById("shop-own"),g=document.getElementById("shop-selection"),_=null,f=!1;function m(){let A=t(),b=A.find(w=>w.id===n),S=e()||{x:-16,z:0};d.textContent=b?`${b.claimed?"\u5DF2\u5165\u9A7B":"\u5F53\u524D\u5E97\u94FA"} \xB7 ${b.name} \xB7 ${Nc(Ei(b.x,b.z))}`:"\u767B\u5F55\u7AD9\u957F\u8D26\u53F7\uFF0C\u9009\u4E00\u95F4\u5C5E\u4E8E\u81EA\u5DF1\u7684\u5C0F\u5E97\u3002",document.getElementById("shop-home").hidden=!b,document.getElementById("shop-login").hidden=!!b,document.getElementById("shop-register").hidden=!!n,document.getElementById("shop-account-note").hidden=!n||!!b;let E=G0(A,S);_&&!E.some(w=>w.col===_.col&&w.row===_.row)&&E.unshift(_),p.replaceChildren();for(let w of E){let N=document.createElement("button");N.type="button",N.className="shop-option",N.setAttribute("aria-pressed",String(_?.col===w.col&&_?.row===w.row));let R=document.createElement("strong"),I=document.createElement("small");R.textContent=Nc(w),I.textContent="\u7A7A\u94FA\u5F85\u5165\u9A7B \xB7 "+Math.round(Math.hypot(w.x-S.x,w.z-S.z))+" \u6B65",N.append(R,I),N.addEventListener("click",()=>{_=w,m()}),p.append(N)}let x=_?za(A).get(Oa(_.col,_.row)):null;g.textContent=_?x?`\u8FD9\u91CC\u5DF2\u662F\u300C${x.name}\u300D\u7684\u5E97\u94FA`:`\u5DF2\u9009 ${Nc(_)} \xB7 \u62DB\u724C\u5C06\u663E\u793A\u4F60\u7684\u6635\u79F0`:"\u9009\u4E00\u95F4\u7A7A\u94FA\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u70B9\u51FB\u8857\u4E0A\u7684\u300C\u5F85\u5165\u9A7B\u300D\u62DB\u724C\u3002",u.hidden=!b,u.disabled=f||!_||!!x,document.getElementById("shop-tour").disabled=!_||f,i.dataset.shopSelected=_?Oa(_.col,_.row):""}function M(A){l(),A&&(_=A),h.hidden=!1,s(),m()}return document.getElementById("shops-toggle").addEventListener("click",()=>M()),document.getElementById("shops-close").addEventListener("click",()=>h.hidden=!0),document.getElementById("shop-home").addEventListener("click",()=>{h.hidden=!0,a(n)}),document.getElementById("shop-tour").addEventListener("click",()=>{_&&(h.hidden=!0,o(_))}),u.addEventListener("click",async()=>{if(!(!_||f)){f=!0,m();try{let A=await fetch("/api/world/shop",{method:"POST",body:new URLSearchParams({col:_.col,row:_.row})}),b=await A.json();if(!A.ok||!b.ok){r(b.msg||"\u6682\u65F6\u6CA1\u80FD\u5165\u9A7B"),await c();return}await c(),h.hidden=!0,r(b.msg),a(n)}catch{r("\u7F51\u7EDC\u5F00\u5C0F\u5DEE\u4E86\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4\u5165\u9A7B\u72B6\u6001")}finally{f=!1,m()}}}),{open:M,refresh(){h.hidden||m()}}}function gd(i){i.removeFromParent(),wi(i)}function xd(i,t,e){let n=new Map,s=new Map,r=new Ce(.9,.035,.85),o=document.createElement("canvas");o.width=128,o.height=64;let a=o.getContext("2d");for(let[u,d,g]of[["#a8cee7",0,15],["#c3dcea",15,10],["#e2e6de",25,7],["#f4eedd",32,32]])a.fillStyle=u,a.fillRect(0,d,128,g);a.fillStyle="#fffbf0";for(let[u,d,g]of[[10,12,14],[59,18,19],[99,9,12]])a.fillRect(u,d,g,3),a.fillRect(u+3,d-2,g-6,2);let c=new ei(o);c.mapping=Mi,c.colorSpace=Se,c.magFilter=xe,i.background=c;function l(u,d){let g=new ue;g.position.set(u*48,0,d*48),J(g,48,.1,48,0,-.13,16,"#e9e1ca");let _=new Ui(r,Je("#e4d9bf"),288),f=new ne,m=0;for(let M=0;M<3;M++){let A=M*16;J(g,48,.04,6.1,0,0,A,"#d3c6ac");for(let b of[-3.6,3.6]){J(g,48,.14,1.2,0,.045,A+b,_t.paper),J(g,48,.07,.08,0,.07,A+b+(b>0?-.6:.6),"#8d8170");for(let S=0;S<48;S++)f.makeTranslation(-23.5+S,.135,A+b),_.setMatrixAt(m++,f)}for(let b=-22;b<24;b+=4)J(g,1.7,.018,.08,b,.031,A,_t.gold);for(let b of[-20,4])Ua(g,b,A-3.3)}return g.add(_),an(g),i.add(g),g}function h(u,d){let g=Lc(u,d),_=u*8-16,f=d*16-9,m=new ue;if(m.position.set(_,0,f),Es(u,d)){let M=["#b75b43","#e0a800","#637d9c","#876a91"][g%4],A=3.1+g%4*.35;J(m,5.9,A,4.8,0,A/2,-1,g%2?"#efe1c4":"#fffbf0",!0),J(m,6.3,.18,5.2,0,A+.12,-1,_t.ink),J(m,6.1,.22,5,0,A+.3,-1,M,!0);for(let E=0;E<5;E++)J(m,.05,.035,4.8,-2+E,A+.43,-1,_t.ink);J(m,1.1,2,.09,1.5,1.05,1.44,"#805c43",!0),J(m,1.3,1.2,.1,-1.4,1.8,1.45,_t.ink),J(m,1.1,1,.1,-1.4,1.8,1.52,"#efbd61"),J(m,.07,1,.05,-1.4,1.8,1.59,_t.ink);let b=["\u5DF7\u53E3\u8336\u94FA","\u4E00\u7897\u70ED\u9762","\u6C5F\u6E56\u6742\u8D27","\u8857\u89D2\u4E66\u5C4B","\u8001\u8857\u5BA2\u6808","\u597D\u8FD0\u5C0F\u94FA"],S=Uc(u,d);if(ln(m,S?"\u7A7A\u94FA\u5F85\u5165\u9A7B":b[g%b.length],S?"\u70B9\u62DB\u724C \xB7 \u6311\u4E2A\u81EA\u5DF1\u7684\u4F4D\u7F6E":"\u8001\u8857\u98CE\u7269",3.9,1.05,0,A-.55,1.48,S?"gold":g%3?"ink":"gold"),S){let E=new Zt(new Ce(5.9,4,5),new be({visible:!1}));E.position.set(0,2,-.8),E.userData.shopLot=Ba(u,d),m.add(E),e.push(E),m.userData.shopHit=E}for(let E=0;E<6;E++)J(m,.95,.15,1.15,-2.4+E*.96,2.45,2,E%2?_t.panel:M);m.userData.houseBounds=new rn(new F(_-3.2,0,f-3.7),new F(_+3.2,A+.5,f+2.8)),m.userData.structure=[...m.children]}else{J(m,5.8,.045,4.5,0,.015,-.7,"#ded3b8"),Er(m,-1.8,-1,g%3);for(let M of[-1,1])J(m,.12,.55,.7,1.3+M*.7,.3,.5,_t.ink);J(m,2,.15,.85,1.3,.63,.5,"#aa7951"),J(m,2,.65,.12,1.3,.95,.1,"#aa7951")}return an(m),m.userData.houseBounds&&(m.userData.structure=m.children.filter(M=>M.isMesh&&M.material.visible!==!1)),i.add(m),m}function p(u,d,g){let _=ud(u.x,u.z),f=new Set(_.map(E=>E.key));for(let[E,x]of n)f.has(E)||(gd(x),n.delete(E));for(let E of _)n.has(E.key)||n.set(E.key,l(E.x,E.z));let m=Ei(u.x,u.z),M=d?37:43,A=new Set;for(let E=-6;E<=6;E++)for(let x=-3;x<=3;x++){let w=m.col+E,N=m.row+x,R=w*8-16,I=N*16-9,C=`${w},${N}`;Dc(R,I)||Fa(w,N,g)||Math.hypot(R-u.x,I-u.z)>M||(A.add(C),s.has(C)||s.set(C,h(w,N)))}for(let[E,x]of s)if(!A.has(E)){let w=x.userData.shopHit;if(w){let N=e.indexOf(w);N>=0&&e.splice(N,1),w.geometry.dispose(),w.material.dispose()}gd(x),s.delete(E)}t.dataset.renderedChunks=String(n.size),t.dataset.sceneryCount=String(s.size);let b=Math.floor((u.x+24)/48),S=Math.floor((u.z+8)/48);t.dataset.district=`${b},${S}`,document.getElementById("world-district").textContent=pd(u.x,u.z)||`\u6C5F\u6E56\u8857\u533A ${b} / ${S}`}return{update:p,get occluders(){return[...s.values()].filter(u=>u.userData.houseBounds).map(u=>u.userData.occluder||(u.userData.occluder={group:u}))}}}function yd(i,t,e,n){if(e.streamed){if(!Number.isFinite(i)||!Number.isFinite(t)||Math.abs(i)>1e6||Math.abs(t)>1e6)return!1;let a=fd(i,t);if(a!==null)return a;let c=Ei(i,t);return!((Fa(c.col,c.row,n)||Es(c.col,c.row))&&Math.abs(i-c.x)<3.35&&t>c.z-3.85&&t<c.z+1.85)}if(i<e.minX+1||i>e.maxX-1||t<e.minZ+1||t>e.maxZ-1)return!1;let s=Math.round(i/8+2),r=Math.round((t+10)/16),o=s>=0&&s<12&&r>=0?n.get(r*12+s+1):null;return!(o&&Math.abs(i-o.x)<3.35&&t>o.z-3.85&&t<o.z+1.85)}function ka(i,t,e){let n=Math.max(1,Math.ceil(Math.hypot(t.x-i.x,t.z-i.z)/.16));for(let s=0;s<=n;s++){let r=s/n;if(!e(i.x+(t.x-i.x)*r,i.z+(t.z-i.z)*r))return!1}return!0}function vd(i,t,e){if(!e(i.x,i.z)||!e(t.x,t.z)||Math.hypot(t.x-i.x,t.z-i.z)>45)return null;if(ka(i,t,e))return[t];let n=.5,s=f=>`${f.x},${f.z}`;function r(f){let m=[];for(let M=-1;M<=1;M++)for(let A=-1;A<=1;A++){let b={x:Math.round(f.x/n)+M,z:Math.round(f.z/n)+A},S={x:b.x*n,z:b.z*n};ka(f,S,e)&&m.push({...b,distance:Math.hypot(S.x-f.x,S.z-f.z)})}return m.sort((M,A)=>M.distance-A.distance)[0]}let o=r(i),a=r(t);if(!o||!a)return null;let c=[{...o,g:0,h:0,parent:null}],l=new Map([[s(o),0]]),h=new Set,p;for(let f=0;c.length&&f<12e3;f++){c.sort((A,b)=>A.g+A.h-b.g-b.h);let m=c.shift(),M=s(m);if(!h.has(M)){if(h.add(M),m.x===a.x&&m.z===a.z){p=m;break}for(let[A,b]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let S={x:m.x+A,z:m.z+b},E=s(S),x=m.g+Math.hypot(A,b);h.has(E)||l.has(E)&&l.get(E)<=x||Math.hypot(S.x-o.x,S.z-o.z)>96||ka({x:m.x*n,z:m.z*n},{x:S.x*n,z:S.z*n},e)&&(l.set(E,x),c.push({...S,g:x,h:Math.hypot(a.x-S.x,a.z-S.z),parent:m}))}}}if(!p)return null;let u=[t];for(;p;)u.unshift({x:p.x*n,z:p.z*n}),p=p.parent;let d=[],g=i,_=0;for(;_<u.length;){let f=_;for(;f+1<u.length&&ka(g,u[f+1],e);)f++;d.push(u[f]),g=u[f],_=f+1}return d}function H0(i,t,e=42){let n=Math.hypot(i,t);if(n<9)return{x:0,y:0,px:i,py:t};let s=Math.min(1,(n-9)/(e-9));return{x:i/n*s,y:t/n*s,px:i/n*Math.min(e,n),py:t/n*Math.min(e,n)}}function V0(i,t,e,n){let s={active:!1,x:0,y:0},r=null,o={x:0,y:0};function a(){r=null,s.active=!1,s.x=0,s.y=0,t.style.transform="translate(0px,0px)",i.classList.remove("held")}function c(h){if(h.pointerId!==r)return;let p=H0(h.clientX-o.x,h.clientY-o.y,i.clientWidth*.31);s.x=p.x,s.y=p.y,t.style.transform=`translate(${p.px}px,${p.py}px)`}i.addEventListener("pointerdown",h=>{if(r!==null||h.button>0)return;h.preventDefault(),e(),r=h.pointerId;let p=i.getBoundingClientRect();o={x:p.left+p.width/2,y:p.top+p.height/2},i.setPointerCapture(r),s.active=!0,i.classList.add("held"),c(h)}),i.addEventListener("pointermove",c);function l(h){h.pointerId===r&&(a(),n())}for(let h of["pointerup","pointercancel","lostpointercapture"])i.addEventListener(h,l);return{state:s,reset:a}}function bd({root:i,stage:t,canvas:e,onStop:n,onNotice:s,onZoom:r}){let o=document.getElementById("world-orientation"),a=!1,c=!1,l=!1,h=V0(document.getElementById("joystick-base"),document.getElementById("joystick-knob"),()=>{n(),e.focus({preventScroll:!0})},n);function p(){let f=["INPUT","TEXTAREA"].includes(document.activeElement?.tagName);c=i.dataset.mobile==="true"||matchMedia("(pointer: coarse)").matches||Math.min(innerWidth,innerHeight)<=600,f||(l=innerHeight>innerWidth),i.classList.toggle("touch-layout",c),i.classList.toggle("landscape",!l),i.classList.toggle("portrait",l),c&&l&&!a&&!f?o.open||(n(),o.showModal()):o.open&&o.close(),n()}async function u(f=!1){if(n(),document.fullscreenElement&&!f){await document.exitFullscreen().catch(()=>{});return}try{document.fullscreenElement||await i.requestFullscreen({navigationUI:"hide"}),f&&screen.orientation?.lock&&await screen.orientation.lock("landscape")}catch{f?document.getElementById("rotate-copy").textContent="\u8BF7\u5173\u95ED\u7CFB\u7EDF\u65CB\u8F6C\u9501\u5B9A\uFF0C\u518D\u5C06\u624B\u673A\u6A2A\u8FC7\u6765\u3002\u4E5F\u53EF\u4EE5\u7EE7\u7EED\u7AD6\u5C4F\u4F53\u9A8C\u3002":s("\u6A2A\u5C4F\u540E\u53EF\u83B7\u5F97\u66F4\u5B8C\u6574\u7684\u8857\u666F\uFF1B\u53EF\u5728\u7CFB\u7EDF\u6D4F\u89C8\u5668\u4E2D\u5168\u5C4F\u6253\u5F00")}}document.getElementById("rotate-enter").addEventListener("click",()=>u(!0)),document.getElementById("rotate-skip").addEventListener("click",()=>{a=!0,o.close()}),o.addEventListener("cancel",()=>{a=!0}),document.getElementById("world-fullscreen").addEventListener("click",()=>u(c&&l)),document.getElementById("zoom-in").addEventListener("click",()=>r(1.2)),document.getElementById("zoom-out").addEventListener("click",()=>r(1/1.2));let d=["world-card","world-directory","world-night","world-night-guide","world-shops","world-social"].map(f=>document.getElementById(f)),g=()=>{let f=d.some(m=>!m.hidden);i.classList.toggle("panel-open",f),f&&n()},_=new MutationObserver(g);for(let f of d)_.observe(f,{attributes:!0,attributeFilter:["hidden"]});return window.addEventListener("resize",p),window.addEventListener("orientationchange",p),document.addEventListener("fullscreenchange",p),document.addEventListener("visibilitychange",()=>{document.hidden&&n()}),window.addEventListener("blur",n),window.addEventListener("pagehide",n),p(),{stick:h.state,resetJoystick:h.reset,get touch(){return c},get blocked(){return o.open||i.classList.contains("panel-open")||i.classList.contains("cinematic")}}}function Md(i){let t=document.getElementById("world-bgm"),e=document.getElementById("world-music");if(!t||!e)return;let n=!0,s=!1,r=!1;try{n=localStorage.getItem("sfx")!=="0"}catch{}t.volume=.4;function o(){let h=n?r?"\u5173\u95ED\u80CC\u666F\u97F3\u4E50":"\u64AD\u653E\u80CC\u666F\u97F3\u4E50":"\u5F00\u542F\u80CC\u666F\u97F3\u4E50";e.setAttribute("aria-label",h),e.setAttribute("aria-pressed",String(n)),e.title=h,e.classList.toggle("muted",!n),e.querySelector("span").textContent=n?r?"\u266B \u97F3\u4E50":"\u266B \u64AD\u653E":"\u266A \u9759\u97F3",i.dataset.music=n?r?"playing":"ready":"muted"}function a(){t.pause(),r=!1,o()}function c(){!n||!s||document.hidden||t.play().then(()=>{if(!n||document.hidden){a();return}r=!0,o()}).catch(()=>{r=!1,o()})}function l(h){h.target.closest?.("#world-music")||(s=!0,c())}document.addEventListener("pointerdown",l,{capture:!0,passive:!0}),document.addEventListener("keydown",l,{capture:!0}),e.addEventListener("click",()=>{s=!0,n&&r?n=!1:n=!0;try{localStorage.setItem("sfx",n?"1":"0")}catch{}n?c():a(),o()}),t.addEventListener("playing",()=>{r=!0,o()}),t.addEventListener("pause",()=>{r=!1,o()}),t.addEventListener("error",()=>{r=!1,o()}),document.addEventListener("visibilitychange",()=>document.hidden?a():c()),window.addEventListener("pagehide",a),window.addEventListener("pageshow",()=>{s&&c()}),window.addEventListener("storage",h=>{h.key==="sfx"&&(n=h.newValue!=="0",n?c():a(),o())}),o()}function wd(i,t){let e=[],n=new ue;n.position.set(-48,0,0),i.add(n),J(n,44,.15,38,0,-.015,1,"#fffbf0");let s=new Ce(1.85,.025,1.85),r=new Ui(s,Je("#e9e1ca"),418),o=new ne,a=0;for(let S=0;S<22;S++)for(let E=0;E<19;E++)o.makeTranslation(-21+S*2,.08,-17+E*2),r.setMatrixAt(a++,o);n.add(r);for(let S of[-21.5,21.5])J(n,.18,.18,38,S,.1,1,_t.ink);for(let S of[-17.5,19.5])J(n,44,.18,.18,0,.1,S,_t.ink);let c=new Zt(new gn(3.05,3.25,.35,12),Je(_t.ink));c.position.y=.2,n.add(c);let l=new Zt(new gn(2.8,2.9,.3,12),Je("#6fb7ff"));l.position.y=.4,n.add(l),J(n,1.2,1.2,1.2,0,1,0,"#d4ae7a",!0);let h=new Zt(new gn(.8,.8,.2,8),Je(_t.gold));h.rotation.x=Math.PI/2,h.position.y=2.5,n.add(h);let p=[];for(let S=0;S<8;S++){let E=S*Math.PI/4,x=J(n,.16,1.3,.16,Math.cos(E)*1.7,.9,Math.sin(E)*1.7,"#b3e2ff");p.push(x)}let u=new Zt(new ii(2.2,2.35,8),new be({color:_t.gold,side:Ge}));u.rotation.x=-Math.PI/2,u.position.set(0,.12,8),n.add(u);for(let S of[-16,16])for(let E of[-10,13])Er(n,S,E,S<0?1:2),Sd(n,S+(S<0?3:-3),E+1);for(let S of[-19,19])for(let E of[-14,16])Ua(n,S,E);ln(n,"\u4E2D\u592E\u5E7F\u573A","\u76F8\u9047 \xB7 \u6446\u7897 \xB7 \u91CD\u65B0\u51FA\u53D1",8,2,-8,3.5,-11,"gold"),b(n,0,-17,"\u5929\u6865\u591C\u5DE1","\u5F80\u5317 \xB7 \u8B66\u8F66\u5DE1\u8857","bridge",0),b(n,21,0,"\u8981\u996D\u5927\u8857","\u5F80\u4E1C \xB7 \u53BB\u8857\u574A\u5BB6\u4E32\u95E8","street",-Math.PI/2);let d=new ue;d.position.set(-48,0,-50),i.add(d),J(d,68,.08,14,0,-.01,0,"#77747a");for(let S=-32;S<=32;S+=4)J(d,2,.025,.12,S,.06,0,_t.gold);e.push(J(d,8,.3,30,0,3.85,0,"#d4cbb5",!0));for(let S of[-12,12])for(let E of[-3,3])J(d,.6,4,.65,E,2,S,_t.ink);for(let S of[-3.9,3.9]){J(d,.12,.12,30,S,5.1,0,_t.ink);for(let E=-14;E<=14;E+=2)J(d,.09,1.2,.1,S,4.6,E,_t.ink)}for(let S of[-1,1]){let E=J(d,8,.22,Math.hypot(10,4),0,2,S*20,"#c2b8a3",!0);E.rotation.x=S*Math.atan(.4),e.push(E);for(let x=0;x<10;x++){let w=4-x*.4,N=S*(15+x);J(d,7.8,.045,.12,0,w,N,_t.gold);for(let R of[-3.9,3.9])J(d,.09,1.2,.1,R,w+.6,N,_t.ink)}for(let x of[-3.9,3.9]){let w=J(d,.1,.1,Math.hypot(10,4),x,3,S*20,_t.ink);w.rotation.x=S*Math.atan(.4)}}J(d,24,.25,6,-15,3.85,0,"#d4cbb5",!0);for(let S of[-25,-17])J(d,.7,4,.7,S,2,0,_t.ink);ln(d,"\u5929\u6865\u591C\u5DE1","\u9009\u4E2A\u5730\u65B9\u85CF\u597D \xB7 \u8B66\u8F66\u5373\u5C06\u51FA\u52A8",7.2,1.7,0,5.8,14.9,"ink"),b(d,0,27,"\u4E2D\u592E\u5E7F\u573A","\u56DE\u5230\u590D\u6D3B\u70B9","plaza",Math.PI);let g=[];for(let S=0;S<6;S++){let E=Ts(S),x=new ue;x.position.set(E.x,0,E.z),i.add(x),J(x,6,.1,5,0,.03,0,S%2?"#b9b3a3":"#b2b9ae");let w=new Zt(new ii(2.2,2.38,12),new be({color:"#6fb7ff",side:Ge}));if(w.rotation.x=-Math.PI/2,w.position.y=.12,x.add(w),S===3)Er(x,-2,-1,0),Sd(x,0,-1);else{let I=["#8b8c92","#b75b43","#7f8791","#4b7a52","#637d9c","#aa7951"];if(J(x,5.6,.5,.8,0,3.2,-2.5,I[S],!0),J(x,.7,3,.8,-2.45,1.5,-2.5,I[S]),J(x,.7,3,.8,2.45,1.5,-2.5,I[S]),J(x,4.2,2.6,.1,0,1.4,-2.8,"#263246"),S===1){let C=new Zt(new gs(4,1.2,4),Je("#e0a800"));C.rotation.y=Math.PI/4,C.position.set(0,4,-2),x.add(C)}if(S===4)for(let C=0;C<5;C++)J(x,3.8,.12,.4,0,.5-C*.08,-1.5+C*.25,"#6fb7ff");if(S===5)for(let C of[-2,2])J(x,.08,5,.08,C,2.8,-2.5,_t.ink)}ln(x,en[S],`\u85CF\u8EAB\u70B9 0${S+1}`,4.4,1.25,0,3.7,1,"ink");let N=new Zt(new Ce(5.8,3.8,4.5),new be({visible:!1}));N.position.y=1.9,N.userData.raidRoom=S,x.add(N),t.push(N);let R=new Zt(new gs(3.5,9,12),new be({color:"#ffed99",transparent:!0,opacity:.15,side:Ge,depthWrite:!1}));R.position.y=4.5,R.visible=!1,x.add(R),an(x,new Set([w,R])),g.push({group:x,ring:w,cone:R})}let _=new ue;i.add(_),J(_,4.4,.65,2,0,.65,0,"#fffbf0",!0),J(_,4.3,.2,2,0,1,0,"#3d8bfd"),J(_,2.3,.85,1.8,-.4,1.4,0,"#3d8bfd",!0),J(_,1.65,.5,1.83,-.3,1.5,0,"#263246"),J(_,2.35,.1,1.85,-.4,1.87,0,"#fffbf0");for(let S of[-1.4,1.4])for(let E of[-1,1])J(_,.8,.75,.25,S,.38,E,_t.ink),J(_,.35,.35,.27,S,.38,E,"#b9b3a3");for(let S of[-.65,.65])J(_,.12,.2,.35,2.22,.8,S,"#ffcc00");let f=J(_,.55,.24,.55,-.6,2.05,-.35,"#ff4b4b"),m=J(_,.55,.24,.55,-.6,2.05,.35,"#3d8bfd");f.material=new be({color:"#ff4b4b"}),m.material=new be({color:"#3d8bfd"}),ln(_,"\u5DE1\u903B","POLICE",1.6,.5,0,.8,1.02,"ink"),an(_,new Set([f,m])),an(n,new Set([h,...p])),an(d,new Set(e));let M=null,A=0;function b(S,E,x,w,N,R,I){let C=new ue;C.position.set(E,0,x),C.rotation.y=I,S.add(C);for(let P of[-4,4])J(C,.22,4.6,.22,P,2.3,0,_t.ink);ln(C,w,N,8.5,1.8,0,4,.1,"gold");let O=new Zt(new Ce(8.5,1.8,.6),new be({visible:!1}));O.position.y=4,O.userData.travel=R,C.add(O),t.push(O)}return{surfaces:e,playResult(S){M=S,A=performance.now()},update(S,{selected:E=-1,confirmed:x=-1}={}){let w=S/1e3;h.rotation.z=w*.5;for(let C=0;C<p.length;C++)p[C].scale.y=.85+Math.sin(w*2+C)*.2;f.visible=Math.floor(S/180)%2===0,m.visible=!f.visible;let N=(S-A)/1e3,R=M&&M.status==="settled"&&N<8,I=-1;if(R){I=N<4?Math.floor(N*4)%6:M.killed;let C=Ts(M.killed),O=Math.min(1,N/5);_.position.set(-86+(C.x+86)*O,0,-50+(C.z+5+50)*O),_.rotation.y=-Math.atan2(C.z+55,C.x+86)}else _.position.set(-48+Math.sin(w*.12)*32,0,-50+Math.cos(w*.12)*3),_.rotation.y=-Math.atan2(-Math.sin(w*.12)*3,Math.cos(w*.12)*32);for(let C=0;C<g.length;C++)g[C].cone.visible=C===I,g[C].ring.material.color.set(R&&C===M.killed&&N>4?"#ff4b4b":C===x?_t.gold:C===E?"#ffb36f":"#6fb7ff");return R?Math.floor(N):null}}}function Sd(i,t,e){for(let n of[-1.1,1.1])J(i,.13,.6,.8,t+n,.35,e,_t.ink);J(i,3,.18,1,t,.7,e,"#aa7951"),J(i,3,.8,.12,t,1.15,e-.4,"#aa7951")}function Ed({root:i,getSelf:t,getPlayers:e,getForward:n,onTravel:s}){let r=document.getElementById("world-map"),o=r.getContext("2d"),a=[],c=0,l=document.getElementById("world-minimap"),h=document.getElementById("map-toggle");return h.addEventListener("click",()=>{let p=h.getAttribute("aria-expanded")==="true";h.setAttribute("aria-expanded",String(!p)),l.classList.toggle("collapsed",p)}),document.querySelectorAll("[data-travel]").forEach(p=>p.addEventListener("click",()=>s(p.dataset.travel))),r.addEventListener("click",p=>{let u=r.getBoundingClientRect(),d=(p.clientX-u.left)*r.width/u.width,g=(p.clientY-u.top)*r.height/u.height,_=a.find(f=>Math.hypot(f.x-d,f.y-g)<19);_&&s(_.id)}),{update(p){if(p-c<150||l.classList.contains("collapsed"))return;c=p;let u=t();if(!u)return;let d=Math.hypot(u.x+48,u.z+20)>95?{x:u.x,z:u.z}:{x:-45,z:-24},g=(A,b)=>({x:88+(A-d.x)*1.15,y:64+(b-d.z)*.88});o.fillStyle="#f4eedd",o.fillRect(0,0,176,128),o.strokeStyle="#ddd2b7",o.lineWidth=4;for(let A=-160;A<=160;A+=16){let b=g(d.x,A+Math.floor(d.z/16)*16);o.beginPath(),o.moveTo(0,b.y),o.lineTo(176,b.y),o.stroke()}let _=g(-48,0),f=g(-48,-50);o.fillStyle="#ffe46b",o.fillRect(_.x-23,_.y-17,47,33),o.strokeStyle="#1e1e2e",o.lineWidth=1,o.strokeRect(_.x-23,_.y-17,47,33),o.fillStyle="#637d9c",o.fillRect(f.x-4,f.y-22,8,44),o.fillStyle="#8e5cff",o.fillRect(f.x-30,f.y-3,60,6),a.length=0,o.font="10px Pixel,monospace",o.textAlign="center",o.textBaseline="middle";for(let[A,b]of Object.entries(dd)){let S=g(b.x,A==="bridge"?-50:b.z),E={x:Math.max(18,Math.min(158,S.x)),y:Math.max(12,Math.min(106,S.y)),id:A};a.push(E),o.fillStyle="#1e1e2e",o.fillRect(E.x-4,E.y-4,8,8),o.fillStyle="#fffbf0",o.fillRect(E.x-2,E.y-2,4,4),o.fillStyle="#1e1e2e",o.fillText(A==="plaza"?"\u5E7F\u573A":A==="bridge"?"\u5929\u6865":"\u8857\u533A",E.x,E.y+12)}for(let A of e()){let b=g(A.x,A.z);b.x<2||b.x>174||b.y<2||b.y>126||(o.fillStyle="#3d8bfd",o.fillRect(b.x-2,b.y-2,4,4))}let m=g(u.x,u.z),M=n();o.save(),o.translate(Math.max(4,Math.min(172,m.x)),Math.max(4,Math.min(124,m.y))),o.rotate(Math.atan2(M.z*.88,M.x*1.15)+Math.PI/2),o.beginPath(),o.moveTo(0,-7),o.lineTo(5,5),o.lineTo(0,2),o.lineTo(-5,5),o.closePath(),o.fillStyle="#ff4b4b",o.fill(),o.strokeStyle="#1e1e2e",o.stroke(),o.restore(),o.fillStyle="#1e1e2e",o.font="8px monospace",o.fillText("N \u2191",159,10),i.dataset.mapZone=Tr(u.x,u.z)?"plaza":Wi(u.x,u.z)?"bridge":"street"}}}function Fc(i,t){if(!i)return{seconds:null,text:"--:--",remaining:0};let e=Math.max(0,Math.ceil((i.locks_at-t)/1e3));return{seconds:e,text:`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`,remaining:Math.max(0,Math.min(1,(i.locks_at-t)/Math.max(1,i.locks_at-i.opens_at)))}}function Td(i,t,e){return i?.round?e?i.round.status!=="open"||Fc(i.round,t).seconds===0?"locked":i.me?.amt>0?"hidden":"choosing":"offline":e?"loading":"offline"}function Ad(i,t,e){return i?i.round?.id!==t.round?.id?t.me?.amt>0?t.me.room:-1:e<0&&t.me?.amt>0?t.me.room:e:e>=0?e:t.me?.amt>0?t.me.room:-1}function Oc({phase:i,selected:t,me:e,amount:n,max:s,submitting:r=!1,caught:o=!1}){return["choosing","hidden"].includes(i)&&!!e&&!o&&!r&&Number.isInteger(t)&&t>=0&&t<6&&Number.isInteger(n)&&n>=1&&n<=s&&n<=e.coins+(e.amt||0)}function Bc(i,t){if(!i)return null;let e=i.players?.find(s=>s.id===t),n=en[i.killed];return i.status==="void"?{title:`\u7B2C ${i.id} \u5C40 \xB7 \u6D41\u5C40\u9000\u56DE`,text:e?`\u4E0D\u8DB3\u4E24\u4E2A\u85CF\u8EAB\u70B9\u6709\u4EBA\uFF0C${e.amt} \u4E2A\u94A2\u955A\u5DF2\u9000\u56DE\u3002`:"\u4E0D\u8DB3\u4E24\u4E2A\u85CF\u8EAB\u70B9\u6709\u4EBA\uFF0C\u672C\u5C40\u94A2\u955A\u5168\u90E8\u9000\u56DE\u3002"}:n?e?e.room===i.killed?{title:`\u7B2C ${i.id} \u5C40 \xB7 \u88AB\u53D1\u73B0\u4E86`,text:`\u300C${n}\u300D\u88AB\u67E5\u5C01\uFF0C\u5931\u53BB\u672C\u5C40 ${e.amt} \u4E2A\u94A2\u955A\u30028 \u79D2\u540E\u56DE\u4E2D\u592E\u5E7F\u573A\uFF0C\u4E0B\u5C40\u53EF\u4EE5\u518D\u6765\u3002`}:{title:`\u7B2C ${i.id} \u5C40 \xB7 \u6210\u529F\u8EB2\u8FC7`,text:`\u4F60\u85CF\u5728\u300C${en[e.room]}\u300D\uFF0C\u8FD4\u8FD8 ${e.amt} \u4E2A\u94A2\u955A\uFF0C\u83B7\u5F97 ${Math.max(0,e.payout-e.amt)} \u4E2A\u5206\u6210\u3002`}:{title:`\u7B2C ${i.id} \u5C40 \xB7 \u5DE1\u67E5\u7ED3\u675F`,text:`\u8B66\u8F66\u67E5\u5C01\u300C${n}\u300D\u3002\u4F60\u672C\u5C40\u6CA1\u6709\u53C2\u52A0\uFF0C\u53EF\u9009\u62E9\u4E0B\u4E00\u5C40\u7684\u85CF\u8EAB\u70B9\u3002`}:null}function Rd({scene:i,root:t,landmarks:e,getSelf:n,getPlayers:s,onStop:r,onNotice:o,onClosePanels:a,onTravel:c}){let l=dt=>document.getElementById(dt),h=l("world-night"),p=l("world-night-guide"),u=l("night-hud"),d=new Map,g=(dt,Ct)=>{l(dt).textContent!==Ct&&(l(dt).textContent=Ct)},_=i.background,f=document.createElement("canvas");f.width=64,f.height=32;let m=f.getContext("2d");m.fillStyle="#17243f",m.fillRect(0,0,64,32),m.fillStyle="#283b59",m.fillRect(0,18,64,14),m.fillStyle="#fffbf0";for(let[dt,Ct]of[[4,5],[15,9],[29,4],[43,11],[55,6]])m.fillRect(dt,Ct,1,1);m.fillRect(35,7,3,3);let M=new ei(f);M.mapping=Mi,M.colorSpace=Se,M.magFilter=xe;let A=i.children.filter(dt=>dt.isLight),b=t.dataset.raid==="true",S=l("night-amount"),E=l("night-join"),x=l("night-leave"),w=l("night-rooms"),N=[],R=!1,I=!1,C=null,O=0,P=0,W=0,k=null,G=!1,tt=!1,H=-1,Q=0,et=0,bt=null,zt=!1,Z=!1,ct=!1,vt=!1,Lt=0,mt=null,kt=0;try{vt=localStorage.getItem("world-night-guide-v1")==="seen"}catch{}function ge(){vt=!0,ct=!1;try{localStorage.setItem("world-night-guide-v1","seen")}catch{}}function Ot(dt){H=dt,Te()}for(let dt=0;dt<6;dt++){let Ct=document.createElement("button");Ct.type="button",Ct.dataset.room=dt,Ct.setAttribute("aria-pressed","false");let Dt=document.createElement("b"),D=document.createElement("strong"),Ut=document.createElement("small");Dt.textContent=`0${dt+1}`,D.textContent=en[dt],Ct.append(Dt,D,Ut),Ct.addEventListener("click",()=>Ot(dt)),w.append(Ct);let Mt=document.createElement("button");Mt.type="button",Mt.className="night-room-marker",Mt.hidden=!0,Mt.dataset.room=dt;let Wt=document.createElement("strong"),it=document.createElement("small");Wt.textContent=`0${dt+1} ${en[dt]}`,Mt.append(Wt,it),Mt.setAttribute("aria-label",`\u9009\u62E9\u85CF\u8EAB\u70B9 ${dt+1} ${en[dt]}`),Mt.addEventListener("click",()=>Xt(dt)),l("world-labels").append(Mt),N.push(Mt)}function se(){return Td(C,Date.now()+O,!G&&(!C||Date.now()-W<6500))}function le(){b&&(a(),Z=!1,ct=!1,p.hidden=!1,r())}function Xt(dt){if(!b){o("\u591C\u8BAD\u6682\u672A\u5F00\u653E");return}a(),Z=!1,ct=!1,Number.isInteger(dt)&&dt>=0&&dt<6&&(H=dt),h.hidden=!1,r(),Te(),oe(!0)}function Ee(){a(),ct=!1,Z=!0,r()}l("night-open").addEventListener("click",()=>Xt());for(let dt of["night-help","night-panel-help"])l(dt).addEventListener("click",le);for(let dt of["night-guide-close","night-guide-later"])l(dt).addEventListener("click",()=>{ge(),p.hidden=!0});l("night-guide-start").addEventListener("click",()=>{ge(),Xt()}),l("night-guide-tour").addEventListener("click",()=>{ge(),Ee()}),l("night-tour").addEventListener("click",Ee),l("night-overview-close").addEventListener("click",()=>Z=!1),l("night-close").addEventListener("click",()=>h.hidden=!0),l("night-skip").addEventListener("click",()=>et=0),l("night-outcome-close").addEventListener("click",()=>{mt=null,kt=0,l("night-outcome").hidden=!0}),l("night-again").addEventListener("click",()=>{kt=0,l("night-outcome").hidden=!0,c("bridge")}),l("night-replay").addEventListener("click",()=>{C?.last?(a(),Z=!1,ye(C.last,!0)):o("\u8FD8\u6CA1\u6709\u4E0A\u4E00\u5C40\u7ED3\u679C")}),S.addEventListener("input",Te);function ye(dt,Ct=!1){if(!b||!Ct&&dt.id<=Q)return;Q=Math.max(Q,dt.id),zt=Ct,Z=!1,bt=dt,et=performance.now()+8500,e.playResult(dt);let Dt=Bc(dt,Number(t.dataset.me));!Ct&&(I||dt.players.some(D=>D.id===Number(t.dataset.me)))&&(mt=Dt),I&&(a(),r(),ct=!vt,o(Ct?"\u6B63\u5728\u56DE\u653E\u4E0A\u4E00\u5C40\uFF0C\u4E0D\u4F1A\u518D\u6B21\u7ED3\u7B97":"\u8B66\u8F66\u51FA\u52A8\uFF01\u5148\u770B\u5DE1\u67E5\u7ED3\u679C\uFF0C\u518D\u9009\u4E0B\u4E00\u5C40\u3002")),Te()}function Oe(){if(!C)return;let dt=new Set(s().map(Ut=>Ut.siteId).filter(Boolean)),Ct=new Set,Dt=performance.now()<et&&bt?bt:C.round,D=Array(6).fill(0);for(let Ut of Dt?.players||[]){let Mt=D[Ut.room]++;if(dt.has(Ut.id)||Mt>=5)continue;let Wt=String(Ut.id);Ct.add(Wt);let it=d.get(Wt);it||(it={model:wr(Ut.skin),label:document.createElement("div")},it.label.className="raid-occupant",it.label.textContent="\u591C\u5DE1 \xB7 "+Ut.name,l("world-labels").append(it.label),i.add(it.model),d.set(Wt,it));let Ft=Ts(Ut.room);it.model.position.set(Ft.x+(Mt%3-1)*.9,0,Ft.z+Math.floor(Mt/3)*.9),it.player=Ut,it.round=Dt}for(let[Ut,Mt]of d)Ct.has(Ut)||(i.remove(Mt.model),wi(Mt.model),Mt.label.remove(),d.delete(Ut))}async function oe(dt=!1){if(!(!b||!dt&&(!I||document.hidden))){if(k)return dt?(await k,oe(!0)):k;P=performance.now(),k=(async()=>{let Ct=Date.now();try{let Dt=await fetch("/raid/state",{cache:"no-store"});if(!Dt.ok)throw new Error("\u72B6\u6001\u6682\u4E0D\u53EF\u7528");let D=await Dt.json(),Ut=C;O=D.now-(Ct+Date.now())/2,W=Date.now(),G=!1,H=Ad(Ut,D,H),(!Ut||Ut.round?.id!==D.round?.id)&&(S.value=String(D.me?.amt||1)),C=D,D.last&&Ut&&D.last.id!==Ut.last?.id&&D.now-D.last.locks_at<1e4&&ye(D.last),Oe(),Te()}catch{G=!0,Te(),dt&&o("\u6682\u65F6\u6CA1\u80FD\u540C\u6B65\u591C\u8BAD\u72B6\u6001\uFF0C\u8054\u7F51\u540E\u4F1A\u81EA\u52A8\u91CD\u8BD5")}})();try{return await k}finally{k=null}}}function Te(){let dt=se(),Ct=Fc(C?.round,Date.now()+O),Dt=C?.me,D=!!Dt?.amt,Ut=t.dataset.selfAction==="caught",Mt=I&&performance.now()<et,Wt=b?Mt?"patrol":Ut?"caught":dt:"disabled";t.dataset.nightStatus=Wt,t.dataset.nightSelected=String(H),t.dataset.nightConfirmed=String(D?Dt.room:-1);let it={loading:"\u540C\u6B65\u4E2D",offline:"\u8FDE\u63A5\u4E2D\u65AD",choosing:"\u5C1A\u672A\u53C2\u52A0",hidden:"\u5DF2\u786E\u8BA4\u85CF\u8EAB",locked:"\u5DF2\u9501\u95E8",patrol:zt?"\u4E0A\u5C40\u56DE\u653E":"\u8B66\u8F66\u5DE1\u67E5",caught:"\u8FD4\u56DE\u5E7F\u573A\u4E2D",disabled:"\u6682\u672A\u5F00\u653E"}[Wt];g("night-round",C?.round?`\u5929\u6865\u591C\u8BAD \xB7 \u7B2C ${C.round.id} \u5C40`:"\u5929\u6865\u591C\u8BAD \xB7 \u591C\u5DE1\u73A9\u6CD5"),g("night-phase",it);let Ft=["loading","offline","disabled"].includes(Wt),At=Ft?"\u7B49\u5F85\u540C\u6B65":Mt?"\u4E0B\u4E00\u5C40\u9501\u95E8":dt==="locked"?"\u7B49\u5F85\u8B66\u8F66":"\u8DDD\u9501\u95E8";g("night-timer-label",At),g("night-clock-label",At),g("night-hud-clock",Ft?"--:--":Ct.text),g("night-clock",Ft?"--:--":Ct.text),l("night-hud-clock").setAttribute("aria-label",`${At} ${Ft?"\u5C1A\u672A\u540C\u6B65":Ct.text}`),g("night-panel-round",C?.round?`\u7B2C ${C.round.id} \u5C40`:"\u8BFB\u53D6\u4E2D"),l("night-progress-fill").style.width=`${Ct.remaining*100}%`,u.dataset.urgent=String(!Ft&&!Mt&&Ct.seconds>0&&Ct.seconds<=10),h.dataset.urgent=u.dataset.urgent,g("night-hud-mine",D?`\u5DF2\u85CF\uFF1A${en[Dt.room]}`:"\u5C1A\u672A\u53C2\u52A0");let Tt={loading:"\u6B63\u5728\u8BFB\u53D6\u672C\u5C40\u65F6\u95F4\uFF0C\u8BF7\u7A0D\u7B49\u3002",offline:"\u72B6\u6001\u672A\u540C\u6B65\uFF0C\u6682\u4E0D\u80FD\u786E\u8BA4\u6216\u64A4\u51FA\u3002",choosing:Dt?"1 \u9009\u5730\u70B9 \u2192 2 \u786E\u8BA4\u85CF\u597D \u2192 3 \u7B49\u8B66\u8F66":"\u53EF\u5148\u770B\u5730\u70B9\uFF1B\u767B\u5F55\u540E\u7528\u514D\u8D39\u94A2\u955A\u53C2\u52A0\u3002",hidden:`\u5DF2\u786E\u8BA4 ${Dt?.amt||0} \u4E2A\u94A2\u955A \xB7 \u9501\u95E8\u524D\u53EF\u8C03\u6574`,locked:"\u5730\u70B9\u5DF2\u9501\u5B9A\uFF0C\u7B49\u8B66\u8F66\u5DE1\u67E5\u5E76\u7ED3\u7B97\u3002",patrol:zt?"\u8FD9\u662F\u4E0A\u5C40\u56DE\u653E\uFF0C\u4E0D\u4F1A\u518D\u6B21\u4F7F\u7528\u94A2\u955A\u3002":"\u6B63\u5728\u5DE1\u67E5\uFF0C\u4E0A\u65B9\u65F6\u95F4\u5C5E\u4E8E\u4E0B\u4E00\u5C40\u3002",caught:"\u88AB\u53D1\u73B0\u4E86\uFF0C\u7A0D\u540E\u56DE\u5E7F\u573A\u518D\u51FA\u53D1\u3002",disabled:"\u591C\u8BAD\u6682\u672A\u5F00\u653E\uFF0C\u53EF\u5148\u901B\u901B\u5929\u6865\u3002"}[Wt];g("night-next",Tt),g("night-open",D?"\u67E5\u770B / \u8C03\u6574\u85CF\u8EAB\u70B9":"\u9009\u62E9\u85CF\u8EAB\u70B9"),l("night-open").disabled=!b||Mt||Ut,l("night-help").disabled=!b;let T=!Mt&&!Ut&&["choosing","hidden"].includes(dt),y=!D||H!==Dt.room||Number(S.value)!==Dt.amt;E.hidden=!Dt,x.hidden=!D,l("night-login").hidden=!!Dt,S.disabled=!Dt||!T||tt,E.disabled=!T||!y||!Oc({phase:dt,selected:H,me:Dt,amount:Number(S.value),max:Number(S.max),submitting:tt,caught:Ut}),x.disabled=!T||tt,g("night-balance",Dt?`\u53EF\u7528 ${Dt.coins} \u4E2A\u94A2\u955A${D?` \xB7 \u672C\u5C40\u5DF2\u7528 ${Dt.amt} \u4E2A`:""}`:"\u56F4\u89C2\u4E2D \xB7 \u767B\u5F55\u7AD9\u957F\u8D26\u53F7\u540E\u53EF\u53C2\u52A0"),g("night-current",D?`\u2713 \u5DF2\u786E\u8BA4\u85CF\u5728\u300C${en[Dt.room]}\u300D \xB7 ${Dt.amt} \u4E2A\u94A2\u955A`:"\u5C1A\u672A\u53C2\u52A0 \xB7 \u9009\u4E2D\u5730\u70B9\u540E\uFF0C\u8FD8\u8981\u70B9\u300C\u786E\u8BA4\u85CF\u597D\u300D"),l("night-current").dataset.joined=String(D),g("night-selection",H<0?"\u5148\u70B9\u4E00\u4E2A\u7F16\u53F7\u5730\u70B9\u3002\u84DD\u5708\u662F\u85CF\u8EAB\u70B9\uFF0C\u91D1\u5708\u8868\u793A\u5DF2\u786E\u8BA4\u3002":D&&H===Dt.room?"\u91D1\u8272\u6807\u8BB0\u662F\u672C\u5C40\u5DF2\u786E\u8BA4\u7684\u4F4D\u7F6E\u3002\u8D70\u52A8\u4E0D\u4F1A\u66F4\u6539\u5B83\u3002":`\u9884\u9009\u300C${en[H]}\u300D \xB7 \u5C1A\u672A\u786E\u8BA4${D?`\uFF0C\u76EE\u524D\u4ECD\u85CF\u5728\u300C${en[Dt.room]}\u300D`:""}`),g("night-join",tt?"\u6B63\u5728\u786E\u8BA4\u2026":T?H<0?"\u5148\u9009\u62E9\u85CF\u8EAB\u70B9":y?`${D?"\u786E\u8BA4\u8C03\u6574\u5230":"\u786E\u8BA4\u85CF\u5728"}\u300C${en[H]}\u300D \xB7 ${S.value} \u94A2\u955A`:"\u5DF2\u85CF\u597D\uFF0C\u7B49\u8B66\u8F66\u5DE1\u67E5":"\u6682\u4E0D\u80FD\u786E\u8BA4\uFF0C\u7B49\u5F85\u4E0B\u4E00\u6B65"),g("night-submit-hint",T?E.disabled&&H>=0&&y&&Dt?"\u8BF7\u8F93\u5165\u8303\u56F4\u5185\u7684\u6574\u6570\u94A2\u955A\uFF0C\u6700\u591A\u53EF\u7528\u4F59\u989D\u52A0\u672C\u5C40\u5DF2\u7528\u6570\u91CF\u3002":"\u70B9\u51FB\u786E\u8BA4\u540E\u624D\u4F1A\u4F7F\u7528\u94A2\u955A\uFF1B\u9501\u95E8\u524D\u53EF\u64A4\u51FA\u3002\u4EBA\u6570\u53EA\u8868\u793A\u5F53\u524D\u85CF\u8EAB\u4EBA\u6570\uFF0C\u4E0D\u4EE3\u8868\u5B89\u5168\u3002":Tt),l("night-step-choose").dataset.state=H>=0?"done":"active",l("night-step-confirm").dataset.state=D&&!y?"done":H>=0?"active":"pending",l("night-step-wait").dataset.state=D&&!y?"active":"pending";let B=Array(6).fill(0);for(let q of C?.round?.players||[])B[q.room]++;for(let q=0;q<6;q++){let rt=w.children[q],at=D&&Dt.room===q;rt.setAttribute("aria-pressed",String(H===q)),rt.dataset.confirmed=String(at);let $=at?"\u2713 \u5DF2\u85CF\u8EAB":H===q?"\u9884\u9009 \xB7 \u672A\u786E\u8BA4":`\u5F53\u524D ${B[q]} \u4EBA`;rt.lastElementChild.textContent!==$&&(rt.lastElementChild.textContent=$),N[q].dataset.confirmed=String(at),N[q].dataset.selected=String(H===q);let K=at?"\u2713 \u672C\u5C40\u5DF2\u786E\u8BA4":H===q?"\u9884\u9009 \xB7 \u70B9\u6B64\u786E\u8BA4":`${B[q]} \u4EBA \xB7 \u70B9\u6B64\u9009\u62E9`;N[q].lastElementChild.textContent!==K&&(N[q].lastElementChild.textContent=K)}let nt=Bc(C?.last,Number(t.dataset.me));l("night-result").hidden=!nt,nt&&(g("night-result-title",nt.title),g("night-result-text",nt.text)),l("night-replay").disabled=!C?.last||Mt}async function Me(dt=!1){if(!C?.me||!C?.round||tt)return;let Ct=dt?0:Number(S.value);if(!["choosing","hidden"].includes(se())||performance.now()<et||t.dataset.selfAction==="caught"){o("\u5F53\u524D\u4E0D\u80FD\u8C03\u6574\uFF0C\u7B49\u72B6\u6001\u540C\u6B65\u6216\u4E0B\u4E00\u5C40\u5F00\u59CB");return}if(!dt&&!Oc({phase:se(),selected:H,me:C.me,amount:Ct,max:Number(S.max)})){o("\u5148\u9009\u62E9\u85CF\u8EAB\u70B9\uFF0C\u518D\u586B\u53EF\u7528\u8303\u56F4\u5185\u7684\u6574\u6570\u94A2\u955A");return}tt=!0,Te();try{let Dt=new URLSearchParams({room:String(dt?C.me.room:H),amount:String(Ct),round:String(C.round.id)}),D=await fetch("/raid/bet",{method:"POST",body:Dt}),Ut=await D.json();if(!D.ok||!Ut.ok){o(Ut.msg||"\u6CA1\u80FD\u8FDB\u573A\uFF0C\u8BF7\u91CD\u8BD5"),await oe(!0);return}h.hidden=!0,r(),o(dt?"\u5DF2\u64A4\u51FA\u672C\u5C40\uFF0C\u94A2\u955A\u9000\u56DE\uFF1B\u8FD8\u53EF\u91CD\u65B0\u9009\u62E9":"\u2713 \u5DF2\u786E\u8BA4\u85CF\u597D\uFF01\u770B\u5012\u8BA1\u65F6\u7B49\u8B66\u8F66\uFF0C\u9501\u95E8\u524D\u53EF\u8C03\u6574"),await oe(!0)}catch{o("\u6682\u65F6\u6CA1\u80FD\u786E\u8BA4\uFF0C\u8BF7\u8054\u7F51\u540E\u67E5\u770B\u672C\u5C40\u72B6\u6001"),G=!0}finally{tt=!1,Te()}}return E.addEventListener("click",()=>Me(!1)),x.addEventListener("click",()=>Me(!0)),{open:Xt,exitOverview(){Z=!1},roomState(){return{selected:H,confirmed:C?.me?.amt?C.me.room:-1}},receive(dt){ye(dt),oe(!0)},update(dt,Ct){let Dt=n();if(!Dt){u.hidden=!0;for(let Ft of N)Ft.hidden=!0;return}let D=!I&&Wi(Dt.x,Dt.z);if(I=Wi(Dt.x,Dt.z),u.hidden=!I,D&&(ct=b&&!vt,oe(!0)),I||(Z=!1,ct=!1,h.hidden||(h.hidden=!0),p.hidden||(p.hidden=!0)),I!==R){R=I,i.background=R?M:_,i.fog.color.set(R?"#263246":"#f4eedd");for(let Ft of A)Ft.intensity=Ft.isHemisphereLight?R?.9:1.8:R?.5:1.25}b&&dt-P>2e3&&oe();let Ut=I&&dt<et,Mt=I&&Z&&!Ut;t.classList.toggle("cinematic",Ut||Mt),t.classList.toggle("night-overview",Mt),t.classList.toggle("has-night-outcome",dt<kt),l("night-cinematic").hidden=!Ut,l("night-overview").hidden=!Mt,t.dataset.raidPhase=Ut?"patrol":Mt?"overview":"idle";let Wt=Mt?Math.max(1,1.1/Ct.aspect):1,it=Mt?150*Wt:110;if(Ct.far!==it&&(Ct.far=it,Ct.updateProjectionMatrix()),i.fog.near=Ut||Mt?50*Wt:24,i.fog.far=Ut||Mt?125*Wt:53,(Ut||Mt)&&(Ct.position.set(-48,Mt?38*Wt:22,Mt?-50+50*Wt:-10),Ct.lookAt(-48,Mt?0:1,-52),Ct.updateMatrixWorld()),Ut){let Ft=8.5-(et-dt)/1e3;g("night-cinematic-text",`${zt?"\u56DE\u653E \xB7 ":"\u8B66\u8F66\u51FA\u52A8 \xB7 "}${Ft<4?"\u5DE1\u67E5\u85CF\u8EAB\u70B9":bt?.status==="void"?"\u672C\u5C40\u6D41\u5C40\uFF0C\u94A2\u955A\u9000\u56DE":`\u67E5\u5C01\u300C${en[bt?.killed]}\u300D`}`)}mt&&dt>=et&&(g("night-outcome-title",mt.title),g("night-outcome-text",mt.text),kt=dt+15e3,mt=null),l("night-outcome").hidden=dt>=kt,ct&&!Ut&&!Mt&&!t.classList.contains("panel-open")&&!l("world-orientation").open&&le(),I&&dt-Lt>180&&(Te(),Lt=dt,C&&Oe());for(let Ft of d.values()){if(Ft.model.visible=I,!I){Ft.label.hidden=!0;continue}let At=dt<et&&Ft.round.killed===Ft.player.room&&Ft.round.status==="settled";ws(Ft.model,At?"caught":"beg",dt/1e3,Ft.player.id);let Tt=Ft.model.position,T=new F(Tt.x,2.8,Tt.z);T.project(Ct);let y=I&&(Ut||Mt||Math.hypot(Tt.x-Dt.x,Tt.z-Dt.z)<25)&&T.z>-1&&T.z<1&&Math.abs(T.x)<1&&Math.abs(T.y)<1;Ft.label.hidden=!y,y&&(Ft.label.style.transform=`translate(${(T.x*.5+.5)*Ct.userData.width}px,${(-T.y*.5+.5)*Ct.userData.height}px) translate(-50%,-100%)`)}for(let Ft=0;Ft<6;Ft++){let At=Ts(Ft),Tt=new F(At.x,4.4,At.z);Tt.project(Ct);let T=I&&!Ut&&!t.classList.contains("panel-open")&&Tt.z>-1&&Tt.z<1&&Math.abs(Tt.x)<.95&&Math.abs(Tt.y)<.92;N[Ft].hidden=!T,T&&(N[Ft].style.transform=`translate(${(Tt.x*.5+.5)*Ct.userData.width}px,${(-Tt.y*.5+.5)*Ct.userData.height}px) translate(-50%,-100%)`)}}}}var W0={stroll:"\u4E00\u8D77\u901B\u8857\u5427\uFF01",luck:"\u795D\u4F60\u4ECA\u5929\u76C6\u6EE1\u94B5\u6EE1\uFF01",shop:"\u6709\u7A7A\u6765\u6211\u5E97\u91CC\u5750\u5750\uFF5E"},Xi=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z);function Ga(i,t){return!!i&&!!t&&i.id!==t.id&&i.action!=="caught"&&t.action!=="caught"&&Xi(i,t)<=6&&Math.abs(Ti(i.x,i.z)-Ti(t.x,t.z))<=1.5}function Cd({root:i,scene:t,getSelf:e,getPeople:n,getSites:s,onSend:r,onStop:o,onNotice:a,onVisit:c,onRoute:l,onClosePanels:h}){let p=document.getElementById("world-social"),u=document.getElementById("social-nearby"),d=document.getElementById("social-players"),g=document.getElementById("social-feed"),_=new Ce(.12,.12,.12),f=[],m=null,M=null,A=0,b=0,S="";function E(){return n().get(m)}function x(R){m=R,w()}function w(){let R=n(),I=e(),C=E(),O=[...R.values()].filter(k=>k!==I).sort((k,G)=>Xi(k.state,I?.state||{x:0,z:0})-Xi(G.state,I?.state||{x:0,z:0})),P=O.map(k=>k.state.id+":"+k.state.name).join("|");if(P!==S){S=P,d.replaceChildren();for(let k of O.slice(0,12)){let G=document.createElement("button");G.type="button",G.textContent=k.state.name,G.dataset.player=k.state.id,G.addEventListener("click",()=>x(k.state.id)),d.append(G)}}for(let k of d.children)k.setAttribute("aria-pressed",String(k.dataset.player===m));document.getElementById("social-name").textContent=C?.state.name||"\u8857\u574A\u5DF2\u79BB\u5F00",document.getElementById("social-distance").textContent=C&&I?Ga(I.state,C.state)?"\u5C31\u5728\u8EAB\u8FB9 \xB7 \u9009\u4E00\u79CD\u65B9\u5F0F\u6253\u4E2A\u62DB\u547C":`\u76F8\u8DDD ${Math.round(Xi(I.state,C.state))} \u6B65 \xB7 \u8D70\u8FD1\u540E\u53EF\u4E92\u52A8`:"\u7B49\u4E0B\u4E00\u4F4D\u8857\u574A\u6765\u5E7F\u573A\u76F8\u89C1\u3002";for(let k of p.querySelectorAll("[data-social]"))k.disabled=!C||!I||!Ga(I.state,C.state)||performance.now()<b||k.dataset.phrase==="shop"&&!Number(i.dataset.me);document.getElementById("social-approach").hidden=!C||!I||Ga(I.state,C.state);let W=C&&s().find(k=>k.id===C.state.siteId);document.getElementById("social-shop").hidden=!W}function N(R){h(),m=R||M,p.hidden=!1,o(),S="",w()}u.addEventListener("click",()=>N(M)),document.getElementById("social-close").addEventListener("click",()=>p.hidden=!0);for(let R of p.querySelectorAll("[data-social]"))R.addEventListener("click",()=>{let I=E(),C=e();!I||!C||(o(),r({type:"interact",target:I.state.id,kind:R.dataset.social,phrase:R.dataset.phrase||""}),b=performance.now()+2600,w(),p.hidden=!0)});return document.getElementById("social-shop").addEventListener("click",()=>{let R=E();R?.state.siteId&&(p.hidden=!0,c(R.state.siteId))}),document.getElementById("social-approach").addEventListener("click",()=>{let R=E(),I=e();if(!R||!I)return;p.hidden=!0;let C=Math.atan2(I.target.z-R.target.z,I.target.x-R.target.x);l(R.target.x+Math.cos(C)*1.6,R.target.z+Math.sin(C)*1.6)}),{open:N,openNearest(){M?N(M):a("\u9644\u8FD1\u8FD8\u6CA1\u6709\u8857\u574A\uFF0C\u53BB\u5E7F\u573A\u8F6C\u8F6C\u5427")},receive(R){let I=n(),C=I.get(R.from),O=I.get(R.to);if(!C||!O)return;let P=e(),W=P&&(R.from===P.state.id||R.to===P.state.id),k=performance.now();W&&(o(),b=k+2500);let G=R.kind==="clink"?"\u53EE\uFF01\u78B0\u7897\u4EA4\u4E2A\u670B\u53CB \u{1F963}":R.kind==="say"?W0[R.phrase]:"\u55E8\uFF0C\u8857\u574A\uFF01\u5F88\u9AD8\u5174\u9047\u89C1\u4F60 \u270B";if(G){if(C.socialText=G,C.socialUntil=k+4200,O.socialText=R.kind==="clink"?"\u4E00\u7897\u4E4B\u4EA4\uFF0C\u597D\u8FD0\u52A0\u500D\uFF01":R.kind==="say"?"\u6536\u5230\uFF01\u6C5F\u6E56\u8DEF\u4E0A\u4E00\u8D77\u8D70\uFF5E":"\u55E8\uFF01\u6B22\u8FCE\u6765\u8FD9\u6761\u8857\uFF5E",O.socialUntil=k+4200,W||P&&Xi(C.state,P.state)<20){let tt=document.createElement("div");for(tt.textContent=C.state.name+" \u2192 "+O.state.name+" \xB7 "+G,g.prepend(tt);g.children.length>3;)g.lastElementChild.remove();setTimeout(()=>tt.remove(),6e3),W&&a(G)}if(R.kind==="clink"){let tt=new ue;tt.position.copy(C.model.position).lerp(O.model.position,.5),tt.position.y+=1.5;for(let H=0;H<8;H++){let Q=new Zt(_,Je("#ffcc00"));Q.rotation.z=H*Math.PI/4,tt.add(Q)}t.add(tt),f.push({group:tt,at:k})}}},update(R){let I=e(),C=n();if(R-A>200){A=R;let O=I?[...C.values()].filter(P=>Ga(I.state,P.state)).sort((P,W)=>Xi(P.state,I.state)-Xi(W.state,I.state))[0]:null;M=O?.state.id,u.hidden=!O,u.textContent=O?"\u270B "+O.state.name+" \xB7 \u4E92\u52A8 F":"",i.dataset.nearby=M||"",p.hidden||w()}for(let O of C.values())R<O.socialUntil&&O.state.action!=="caught"&&(O.bubble.hidden=!1,O.bubble.textContent=O.socialText);for(let O=f.length-1;O>=0;O--){let P=f[O],W=(R-P.at)/1600;if(W>1){P.group.removeFromParent(),f.splice(O,1);continue}P.group.children.forEach((k,G)=>{let tt=G*Math.PI/4;k.position.set(Math.cos(tt)*W*1.5,Math.sin(tt)*W*1.5+Math.sin(W*Math.PI)*.5,0),k.scale.setScalar(1-W),k.rotation.y=W*8}),P.group.lookAt(P.group.position.clone().add(new F(0,0,1)))}}}}var Pt=i=>document.getElementById(i),we=Pt("world"),$a=Pt("world-stage"),kd=we.dataset.visitor,Ar=Number(we.dataset.me),Ha=Pt("world-loading"),Gd=Pt("world-labels"),He,cn,nn,Ve,Hn,Pn=null,ie=null,Ai=[],Hd,_n=new Map,zc=0,Hc,Ja=!1,Dn=null,Id,Ka="",Pd=0,X0,Vn=new Map,ai=new Map,qi=[],qa=[],Fe=new Set,Rr=new Set,Vd=1,Ld=null,Wd=1,Xd=1,Ya=new Set,q0=new F,Y0=new F,Z0=new F,$0=new F,J0=new gi,hn=[],Va=null,As=null,qd=!1,Wa=new Set,Xa=new hr,Dd=new Yt,ja,Is,sn,el,Za,Nd,Cs,Qa,Ps,K0=i=>{let t=ja.makeStall(i);return t.owner.visible=!Ya.has(i.id),t.label.addEventListener("click",()=>{Nn(),Yc(_n.get(i.id))}),t},Yd=i=>ja.disposeStall(i);function Le(i){Pt("world-toast").textContent=i,Pt("world-toast").hidden=!1,clearTimeout(Id),Id=setTimeout(()=>Pt("world-toast").hidden=!0,3200)}function kc(i,t=!1){Pt("connection-text").textContent=i,Pt("connection-dot").classList.toggle("connected",t)}function j0(i){Ve.reset(),Ve.update(0,i)}function Ln(){Fe.clear(),hn=[],sn?.resetJoystick(),Ka="",yn({type:"move",dx:0,dz:0})}function Q0(i){Ve.zoom(i)}function Ud(){let i=$a.clientWidth,t=$a.clientHeight;!i||!t||(Wd=i,Xd=t,He.setSize(i,t,!1),nn.userData.width=i,nn.userData.height=t,nn.aspect=i/t,nn.updateProjectionMatrix())}function Nn(){for(let i of["world-card","world-directory","world-night","world-night-guide","world-shops","world-social"])Pt(i).hidden=!0;Cs?.exitOverview(),Pt("directory-toggle").setAttribute("aria-expanded","false")}function Wc(){return ie?ie.state.action==="caught"?(Le("\u6B63\u5728\u88AB\u5E26\u56DE\u5E7F\u573A\uFF0C\u7A0D\u540E\u5C31\u80FD\u91CD\u65B0\u51FA\u53D1"),!1):!0:(Le("\u6B63\u5728\u8FDE\u63A5\u8857\u533A\uFF0C\u8FDE\u63A5\u540E\u5373\u53EF\u4F20\u9001"),!1)}function tl(i){Wc()&&(Ln(),Ve.reset(),i==="bridge"&&(Ve.state.yaw=0),Nn(),yn({type:"travel",destination:i}),i==="plaza"&&Le("\u8FD4\u56DE\u4E2D\u592E\u5E7F\u573A\uFF0C\u5927\u5BB6\u90FD\u4ECE\u8FD9\u91CC\u51FA\u53D1"))}function Cr(i){let t=_n.get(i);!t||!Wc()||(Ln(),Nn(),Ve.reset(),Ve.state.yaw=0,Is.visible=!1,yn({type:"visit",siteId:i}),Le("\u6765\u5230\u300C"+t.name+"\u300D\u7684\u5E97\u95E8\u53E3"))}function Fd(i=!1){Nn(),qd=i,Pt("world-directory").hidden=!1,Pt("directory-toggle").setAttribute("aria-expanded","true"),Ln(),Zc(),Pt("world-search").focus()}function nl(){if(!ie)return;let i=ie.model.position;el.update(i,sn?.touch,_n);let t=sn?.touch?34:42,e=sn?.touch?24:28,n=Ai.map(r=>({s:r,d:(r.x-i.x)**2+(r.z-i.z)**2})).filter(r=>r.d<t**2).sort((r,o)=>r.d-o.d).slice(0,e),s=new Set(n.map(r=>r.s.id));for(let[r,o]of ai)s.has(r)||(Yd(o),ai.delete(r));for(let{s:r}of n)ai.has(r.id)||ai.set(r.id,K0(r))}var Od=(i,t)=>yd(i,t,Hd,_n);function Vc(i,t){if(!ie)return;if(!Od(i,t)){Le("\u8FD9\u91CC\u662F\u5C0F\u644A\uFF0C\u70B9\u8857\u9053\u6216\u644A\u4E3B\u65C1\u8FB9\u7684\u7A7A\u5730");return}if(Math.hypot(i-ie.target.x,t-ie.target.z)>45){Le("\u8D70\u8FD1\u4E00\u4E9B\uFF0C\u6216\u7528\u8857\u574A\u540D\u518C\u76F4\u63A5\u4E32\u95E8");return}let e=vd({x:ie.target.x,z:ie.target.z},{x:i,z:t},Od);if(!e){Le("\u8FD9\u6761\u8DEF\u8D70\u4E0D\u8FC7\u53BB\uFF0C\u6362\u4E2A\u843D\u811A\u70B9\u8BD5\u8BD5");return}sn?.resetJoystick(),hn=e,Is.position.set(i,.18,t),Is.visible=!0,Fe.clear(),qc("walk"),He.domElement.focus({preventScroll:!0})}function t_(i){let t=wr(i.skin);t.position.set(i.x,Ti(i.x,i.z),i.z),t.rotation.y=i.yaw,cn.add(t);let e=new Zt(ad,i.id===Pn?Pc:ld);e.rotation.x=-Math.PI/2,e.position.y=.025,t.add(e);let n=document.createElement("div");n.className="player-label"+(i.id===Pn?" self":"");let s=document.createElement("div");s.className="player-bubble",s.hidden=!0;let r=document.createElement(i.id===Pn?"div":"button");r.className="player-name",r.textContent=(i.id===Pn?"\u4F60 \xB7 ":"\u25CF ")+i.name,i.id!==Pn&&(r.type="button",r.setAttribute("aria-label","\u4E0E"+i.name+"\u4E92\u52A8"),r.addEventListener("click",()=>Ps.open(i.id))),n.append(s,r),Gd.append(n);let o=null;i.id!==Pn&&(o=new Zt(new Ce(1.2,2.6,1.2),new be({visible:!1})),o.position.y=1.3,o.userData.playerID=i.id,t.add(o),qi.push(o));let a={model:t,label:n,bubble:s,hit:o,state:i,target:new F(i.x,Ti(i.x,i.z),i.z)};return Vn.set(i.id,a),i.id===Pn&&(ie=a,j0(i),nl(),Pt("self-name").textContent=i.name),a}function Zd(i){let t=Vn.get(i);if(t){if(cn.remove(t.model),wi(t.model),t.label.remove(),t.hit){let e=qi.indexOf(t.hit);e>=0&&qi.splice(e,1),t.hit.geometry.dispose(),t.hit.material.dispose()}Vn.delete(i),i===Pn&&(ie=null)}}function e_(i){let t=new Set(i.map(e=>e.id));for(let e of Vn.keys())t.has(e)||Zd(e);for(let e of i){let n=Vn.get(e.id);n||(n=t_(e));let s=n.target.distanceTo(new F(e.x,Ti(e.x,e.z),e.z))>10;e.id===Pn&&(e.action==="caught"||n.state.action==="caught")&&Ln(),n.state=e,n.target.set(e.x,Ti(e.x,e.z),e.z),n.bubble.hidden=!["beg","wave","caught"].includes(e.action),n.bubble.textContent=e.action==="caught"?"\u88AB\u53D1\u73B0\u4E86\uFF01\u6B63\u5728\u8FD4\u56DE\u5E7F\u573A\u2026":e.action==="beg"?"\u884C\u884C\u597D\uFF0C\u8D4F\u53E3\u996D\u5403\uFF5E":"\u55E8\uFF0C\u5927\u54E5\u5927\u59D0\u4EEC\uFF01",s&&n===ie&&(n.model.position.copy(n.target),Ve.update(0,n.target),hn=[],nl())}Pt("online-count").textContent=i.length,we.dataset.online=String(i.length),Ya=new Set(i.map(e=>e.siteId).filter(Boolean));for(let[e,n]of ai)n.owner.visible=!Ya.has(e),n.label.textContent=(Ya.has(e)?"\u25CF \u5728\u7EBF \xB7 ":"")+(_n.get(e)?.name||"")}function yn(i){Hn?.readyState===WebSocket.OPEN&&Hn.send(JSON.stringify(i))}function Xc(){if(Ja)return;kc(zc?"\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5":"\u6B63\u5728\u63A5\u5165\u8857\u5934");let i=new URL("/world/live",location.href);i.protocol=location.protocol==="https:"?"wss:":"ws:",Hn=new WebSocket(i);let t=Hn;Hn.addEventListener("open",()=>{yn({type:"join",visitor:kd}),zc=0}),Hn.addEventListener("message",e=>{if(Hn===t)try{let n=JSON.parse(e.data);if(n.type==="welcome"){Pn=n.id,kc("\u540C\u8857\u76F8\u89C1",!0),Ka="";let s=new URLSearchParams(location.search).get("site"),r=s!==null?Ai.find(o=>o.slug===s):null;r&&(Ve.reset(),Ve.state.yaw=0,yn({type:"visit",siteId:r.id}))}n.type==="state"&&e_(n.players),n.type==="coin"&&s_(n),n.type==="raid-result"&&Cs?.receive(n.round),n.type==="interaction"&&Ps?.receive(n),n.type==="notice"&&Le(n.msg),n.type==="shops-changed"&&Rs(!0).catch(()=>Le("\u5E97\u94FA\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u5237\u65B0\u67E5\u770B"))}catch(n){console.error("\u8857\u533A\u6D88\u606F\u5904\u7406\u5931\u8D25",n)}}),Hn.addEventListener("close",e=>{if(Hn===t){Pn=null;for(let n of[...Vn.keys()])Zd(n);if(Pt("online-count").textContent="0",we.dataset.online="0",Fe.clear(),hn=[],kc("\u6682\u65F6\u65AD\u5F00"),!Ja){if(e.code===1008){Le("\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u65B0\u8FDB\u5165");return}e.code===1013&&Le("\u8857\u533A\u6682\u65F6\u6EE1\u5458\uFF0C\u7A0D\u540E\u81EA\u52A8\u91CD\u8FDE"),clearTimeout(Hc),Hc=setTimeout(Xc,Math.min(15e3,1e3*2**Math.min(zc++,4))+Math.random()*400)}}})}var Bd="";function qc(i){let t=i==="walk"?"idle":i;Bd!==t&&(Bd=t,document.querySelectorAll("[data-action]").forEach(e=>e.classList.toggle("active",e.dataset.action===t)))}function Gc(i){if(!ie){Le("\u8FDE\u63A5\u6210\u529F\u540E\u5C31\u80FD\u548C\u5927\u5BB6\u6253\u62DB\u547C\u4E86");return}Ln(),yn({type:"action",action:i}),qc(i)}function n_(i){if(!ie||ie.state.action==="caught"||sn?.blocked)return;let t=0,e=0,n=Fe.size>0,s=sn?.stick;if(s?.active){hn=[];let a=Ve.forward(),c=new F(-a.z,0,a.x);t=c.x*s.x-a.x*s.y,e=c.z*s.x-a.z*s.y}else if(n){hn=[];let a=Ve.forward(),c=new F(-a.z,0,a.x);(Fe.has("w")||Fe.has("arrowup"))&&(t+=a.x,e+=a.z),(Fe.has("s")||Fe.has("arrowdown"))&&(t-=a.x,e-=a.z),(Fe.has("d")||Fe.has("arrowright"))&&(t+=c.x,e+=c.z),(Fe.has("a")||Fe.has("arrowleft"))&&(t-=c.x,e-=c.z)}else if(hn.length){let a=hn[0],c=new Yt(a.x-ie.target.x,a.z-ie.target.z);c.length()<.2?hn.shift():(c.multiplyScalar(Math.min(1,c.length()/.9)/c.length()),t=c.x,e=c.y)}let r=Math.hypot(t,e);r>1&&(t/=r,e/=r),t=Math.round(t*1e3)/1e3,e=Math.round(e*1e3)/1e3;let o=t+","+e;(o!==Ka||r>.01&&i-Pd>200)&&(yn({type:"move",dx:t,dz:e}),Ka=o,Pd=i)}function i_(){if(!ie)return;let i=Y0.copy(ie.model.position);i.y+=1.2;let t=nn.position.distanceTo(i),e=J0.set(nn.position,Z0.subVectors(i,nn.position).normalize()),n=$0;for(let s of[...ai.values(),...el.occluders]){let o=!!e.intersectBox(s.group.userData.houseBounds,n)&&nn.position.distanceTo(n)<t-.4;if(s.faded!==o){s.faded=o;for(let a of s.group.children)a.isLineSegments&&(a.visible=!o);for(let a of s.group.userData.structure)if(a.isMesh){if(o){if(!a.userData.fadeMat){a.userData.originalMat=a.material;let c=a.material.clone();c.transparent=!0,c.opacity=.13,c.depthWrite=!1,a.userData.fadeMat=c}a.material=a.userData.fadeMat;for(let c of a.children)c.isLineSegments&&(c.visible=!1)}else if(a.userData.originalMat){a.material=a.userData.originalMat;for(let c of a.children)c.isLineSegments&&(c.visible=!0)}}}}}function zd(i,t,e=2.7,n=40){let s=q0.set(t.x,t.y+e,t.z),r=nn.position.distanceTo(s);s.project(nn);let o=s.z>=-1&&s.z<=1&&Math.abs(s.x)<1.12&&Math.abs(s.y)<1.12&&r<n;i.style.display=o?"":"none",o&&(i.style.transform=`translate(${(s.x*.5+.5)*Wd}px,${(-s.y*.5+.5)*Xd}px) translate(-50%,-100%)`)}function Yc(i,t=!1){Dn=i,Pt("world-card").hidden=!1,Pt("card-name").textContent=i.name,Pt("card-handle").textContent=i.slug?"@"+i.slug:"\u4E10\u5E2E\u603B\u8235",Pt("card-slogan").textContent=i.slogan||"\u884C\u884C\u597D\uFF0C\u8D4F\u53E3\u996D\u5403\u3002",Pt("card-total").textContent=i.total,Pt("card-currency").textContent=" "+i.currency,Pt("card-coins").textContent=i.coins,Pt("card-exp").textContent=i.exp,Pt("world-coin").disabled=Rr.has(i.id),Pt("world-coin").textContent=Rr.has(i.id)?"\u4ECA\u5929\u4E22\u8FC7\u94A2\u955A\u4E86":"\u4E22\u4E2A\u94A2\u955A \xB7 \u514D\u8D39",Pt("world-donate").href="/"+i.slug+"#donate",Pt("world-donate").hidden=!i.ready,Pt("world-profile").href="/"+i.slug;let e=Pt("card-avatar");if(e.replaceChildren(),i.avatar){let n=document.createElement("img");n.src=i.avatar,n.alt="",e.append(n)}else e.textContent="\u{1F963}";t&&(Ln(),Is.visible=!1,yn({type:"visit",siteId:i.id}),Pt("world-directory").hidden=!0,Pt("directory-toggle").setAttribute("aria-expanded","false"),He.domElement.focus({preventScroll:!0}))}function Zc(){let i=Pt("world-search").value.trim().toLowerCase(),t=Pt("world-site-list");t.replaceChildren();let e=Ai.filter(n=>(!qd||n.id!==Ar)&&(n.name+" "+n.slug).toLowerCase().includes(i));Pt("site-count").textContent=e.length+" \u4F4D";for(let n of e.slice(0,100)){let s=document.createElement("button");s.className="directory-row",s.type="button";let r=document.createElement("span");if(r.className="list-avatar",r.textContent="\u{1F963}",n.avatar){let l=document.createElement("img");l.src=n.avatar,l.alt="",l.loading="lazy",r.replaceChildren(l)}let o=document.createElement("span"),a=document.createElement("strong"),c=document.createElement("small");a.textContent=n.name,c.textContent=(n.slug?"@"+n.slug:"\u603B\u8235")+" \xB7 \u70B9\u51FB\u4F20\u9001\u5230\u5E97\u95E8\u53E3",o.append(a,c),s.append(r,o),s.addEventListener("click",()=>Cr(n.id)),t.append(s)}if(!e.length){let n=document.createElement("p");n.className="directory-empty",n.textContent="\u6CA1\u6709\u627E\u5230\u8FD9\u4F4D\u8857\u574A",t.append(n)}}async function Rs(i=!1){if(As)return i?(await As,Rs()):As;As=(async()=>{let t=await fetch("/api/world/sites",{cache:"no-cache"});if(!t.ok)throw new Error("\u7AD9\u70B9\u8D44\u6599\u6682\u65F6\u4E0D\u53EF\u7528");let e=t.headers.get("ETag");if(e&&e===Ld)return;let n=await t.json();Ld=e;let s=_n;if(Ai=n.sites,Hd=n.bounds,Vd=n.coinExp,Pt("night-amount").max=String(n.raid.maxBet),_n=new Map(Ai.map(r=>[r.id,r])),_n.cells=za(Ai),Zc(),Dn){let r=_n.get(Dn.id);r?(Dn=r,Pt("world-card").hidden||Yc(r)):(Pt("world-card").hidden=!0,Dn=null)}for(let[r,o]of ai){let a=_n.get(r),c=s.get(r);(!a||!c||a.x!==c.x||a.z!==c.z||a.name!==c.name||a.skin!==c.skin||a.coins!==c.coins)&&(Yd(o),ai.delete(r))}return Qa?.refresh(),el&&nl(),n})();try{return await As}finally{As=null}}function s_(i){let t=_n.get(i.siteId);if(!t)return;t.exp+=Math.max(0,i.coins-t.coins)*Vd,t.coins=i.coins,Dn?.id===t.id&&(Pt("card-coins").textContent=t.coins,Pt("card-exp").textContent=t.exp);let e=new F(t.x-.6,1,t.z+3.55);if(ie&&ie.model.position.distanceTo(e)<42){let n=ie.model.position.clone().add(new F(0,1.5,0)),s=new Zt(new gn(.18,.18,.06,12),Je("#e4bd55"));cn.add(s),qa.push({mesh:s,start:n,target:e,age:0}),Le("\u53EE\uFF01\u6709\u4EBA\u7ED9 "+t.name+" \u4E22\u4E86\u4E00\u4E2A\u94A2\u955A")}}async function r_(){if(!Dn)return;let i=Dn,t=Pt("world-coin");t.disabled=!0;let e=new FormData;e.set("site",i.slug),e.set("bv",kd);try{let s=await(await fetch("/coin",{method:"POST",body:e})).json();Le(s.msg||"\u94A2\u955A\u5DF2\u6295\u9012"),(s.mine>=s.per_day||s.added)&&Rr.add(i.id),Dn?.id===i.id&&(t.disabled=Rr.has(i.id),t.textContent=Rr.has(i.id)?"\u4ECA\u5929\u4E22\u8FC7\u94A2\u955A\u4E86":"\u4E22\u4E2A\u94A2\u955A \xB7 \u514D\u8D39")}catch{Le("\u7F51\u7EDC\u5F00\u5C0F\u5DEE\u4E86\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"),t.disabled=!1}}function o_(){Pt("directory-toggle").addEventListener("click",()=>{Pt("world-directory").hidden?Fd():Nn()}),Pt("directory-close").addEventListener("click",()=>{Pt("world-directory").hidden=!0,Pt("directory-toggle").setAttribute("aria-expanded","false")}),Pt("world-search").addEventListener("input",Zc),Pt("card-close").addEventListener("click",()=>Pt("world-card").hidden=!0),Pt("world-coin").addEventListener("click",r_),Pt("card-visit").addEventListener("click",()=>{Dn&&Cr(Dn.id)}),document.querySelectorAll("[data-action]").forEach(t=>t.addEventListener("click",()=>Gc(t.dataset.action))),Pt("world-home").addEventListener("click",()=>{Ar&&_n.has(Ar)?Cr(Ar):Qa.open()}),Pt("world-plaza").addEventListener("click",()=>tl("plaza")),Pt("world-visit").addEventListener("click",()=>Fd(!0)),window.addEventListener("keydown",t=>{let e=t.key.toLowerCase();if(e==="escape"){Nn();return}sn?.blocked||t.ctrlKey||t.metaKey||t.altKey||["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)||(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(e)&&(t.preventDefault(),Fe.add(e)),!t.repeat&&e==="b"&&Gc("beg"),!t.repeat&&e==="e"&&Gc("wave"),!t.repeat&&e==="f"&&Ps.openNearest())}),window.addEventListener("keyup",t=>Fe.delete(t.key.toLowerCase())),window.addEventListener("blur",()=>{Fe.clear(),hn=[],yn({type:"move",dx:0,dz:0})}),document.addEventListener("visibilitychange",()=>{document.hidden&&(Fe.clear(),hn=[],yn({type:"move",dx:0,dz:0}))});let i=He.domElement;i.tabIndex=0,i.setAttribute("aria-label","\u8857\u533A\u753B\u9762\uFF0C\u70B9\u51FB\u5730\u9762\u79FB\u52A8\uFF0CWASD \u6216\u65B9\u5411\u952E\u8D70\u52A8"),document.querySelectorAll("[data-move]").forEach(t=>{let e=t.dataset.move;t.addEventListener("pointerdown",s=>{sn?.blocked||(s.preventDefault(),t.setPointerCapture(s.pointerId),hn=[],Fe.add(e),t.classList.add("pressed"),i.focus({preventScroll:!0}))});let n=()=>{Fe.delete(e),t.classList.remove("pressed"),yn({type:"move",dx:0,dz:0})};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),t.addEventListener("lostpointercapture",n)}),i.addEventListener("pointerdown",t=>{sn?.blocked||(i.focus({preventScroll:!0}),Wa.add(t.pointerId),Va=Wa.size===1?{id:t.pointerId,x:t.clientX,y:t.clientY}:null)}),i.addEventListener("pointercancel",t=>{Wa.delete(t.pointerId),Va=null}),i.addEventListener("pointerup",t=>{Wa.delete(t.pointerId);let e=Va;if(Va=null,!e||e.id!==t.pointerId||t.button!==0||Math.hypot(e.x-t.clientX,e.y-t.clientY)>6||sn?.blocked)return;let n=i.getBoundingClientRect();Dd.set((t.clientX-n.left)/n.width*2-1,-(t.clientY-n.top)/n.height*2+1),Xa.setFromCamera(Dd,nn);let s=Xa.intersectObjects(qi,!1)[0];if(s){let a=s.object.userData;if(a.playerID){Ps.open(a.playerID);return}if(a.shopLot){Qa.open(a.shopLot);return}if(a.travel){tl(a.travel);return}if(Number.isInteger(a.raidRoom)){Nn(),Cs.open(a.raidRoom);return}let c=_n.get(a.siteId);c&&(Nn(),Yc(c));return}let r=Xa.intersectObjects(Za.surfaces,!1)[0];if(r){Vc(r.point.x,r.point.z);return}let o=new F;Xa.ray.intersectPlane(new fn(new F(0,1,0),0),o)&&Vc(o.x,o.z)}),window.addEventListener("pagehide",()=>{Ja=!0,clearTimeout(Hc),Hn?.close(1e3)}),window.addEventListener("pageshow",t=>{t.persisted&&(Ja=!1,Xc())})}async function a_(){["127.0.0.1","localhost"].includes(location.hostname)&&(document.querySelector(".version").textContent="3D / \u672C\u5730\u9884\u89C8",document.querySelector("#world-card .card-footnote").textContent="\u672C\u5730\u6F14\u793A\u6570\u636E\uFF0C\u4E0D\u6536\u53D6\u771F\u5B9E\u6B3E\u9879");try{let i=we.dataset.mobile==="true"||matchMedia("(pointer: coarse)").matches||Math.min(innerWidth,innerHeight)<=600;He=new Pa({antialias:!i,alpha:!1,powerPreference:"high-performance"}),He.setPixelRatio(Math.min(window.devicePixelRatio,i?1.25:1.5)),He.outputColorSpace=Se,He.toneMapping=Mn,Pt("world-canvas").append(He.domElement),Md(we),cn=new Ys,cn.fog=new qs(_t.paper,24,53),nn=new je(60,1,.1,110),cn.add(new or("#ffffff","#a69887",1.8));let t=new cr("#fff6e3",1.25);t.position.set(-12,24,14),cn.add(t),Ve=id(nn,He.domElement,we,()=>!!sn?.blocked),await Promise.all([document.fonts.load("16px Pixel"),Rs()]),ja=cd(cn,Gd,qi),{goal:Is}=ja.buildEnvironment(),el=xd(cn,we,qi),Za=wd(cn,qi),o_(),Qa=md({root:we,getSites:()=>Ai,getSelf:()=>ie?.target,ownSite:Ar,onStop:Ln,onNotice:Le,onTour:p=>{Wc()&&(Ln(),Ve.reset(),Ve.state.yaw=0,yn({type:"tour",col:p.col,row:p.row}))},onVisit:Cr,onRefresh:()=>Rs(!0),onClosePanels:Nn}),Ps=Cd({root:we,scene:cn,getSelf:()=>ie,getPeople:()=>Vn,getSites:()=>Ai,onSend:yn,onStop:Ln,onNotice:Le,onVisit:Cr,onRoute:Vc,onClosePanels:Nn}),sn=bd({root:we,stage:$a,canvas:He.domElement,onStop:Ln,onNotice:Le,onZoom:Q0}),new ResizeObserver(Ud).observe($a),Ud();let e=()=>[...Vn.values()].map(p=>p.state);Nd=Ed({root:we,getSelf:()=>ie?.target,getPlayers:e,getForward:()=>Ve.forward(),onTravel:tl}),Cs=Rd({scene:cn,root:we,landmarks:Za,getSelf:()=>ie?.target,getPlayers:e,onStop:Ln,onNotice:Le,onClosePanels:Nn,onTravel:tl}),Ha.hidden=!0,Xc(),X0=setInterval(()=>{document.hidden||Rs().catch(()=>{})},3e4),document.addEventListener("visibilitychange",()=>{document.hidden||Rs().catch(()=>{})});let n=performance.now(),s=0,r=0,o=0,a=0,c=n,l=0,h=matchMedia("(prefers-reduced-motion: reduce)").matches;He.setAnimationLoop(p=>{let u=1e3/(sn?.touch?30:60);if(document.hidden||p-o<u)return;let d=Math.min((p-n)/1e3,.05);n=p,o=p-(p-o)%u,p-r>75&&(n_(p),r=p),p-s>500&&(nl(),s=p);for(let[_,f]of Vn){f.model.position.lerp(f.target,1-Math.exp(-d*15));let M=(f.state.yaw-f.model.rotation.y+Math.PI*3)%(Math.PI*2)-Math.PI;f.model.rotation.y+=M*(1-Math.exp(-d*15)),f.model.visible=f===ie||!ie||f.model.position.distanceToSquared(ie.model.position)<3600,f.model.visible&&ws(f.model,f.state.action,h?0:p/1e3,_.charCodeAt(0))}Is.visible=hn.length>0,we.dataset.pathLeft=String(hn.length),ie&&(Ve.update(d,ie.model.position),we.dataset.selfX=ie.model.position.x.toFixed(2),we.dataset.selfZ=ie.model.position.z.toFixed(2),we.dataset.selfAction=ie.state.action,qc(ie.state.action));let g=p-a>1e3/(sn?.touch?20:30);if(g){a=p;for(let _ of Vn.values())zd(_.label,_.model.position,_.state.action==="beg"?2.9:3.3,48)}for(let[_,f]of ai)f.owner.visible&&ws(f.owner,"beg",h?0:p/1e3,_),g&&zd(f.label,{x:f.group.position.x,y:0,z:f.group.position.z+3},.25,29);for(let _=qa.length-1;_>=0;_--){let f=qa[_];f.age+=d;let m=Math.min(1,f.age/.85);f.mesh.position.lerpVectors(f.start,f.target,m),f.mesh.position.y+=Math.sin(m*Math.PI)*2.6,f.mesh.rotation.z+=d*8,m===1&&(cn.remove(f.mesh),f.mesh.geometry.dispose(),qa.splice(_,1))}Nd.update(p),Cs.update(p,nn),Ps.update(p),Za.update(p,Cs.roomState()),i_(),He.render(cn,nn),l++,p-c>=1e3&&(we.dataset.drawCalls=String(He.info.render.calls),we.dataset.geometries=String(He.info.memory.geometries),we.dataset.textures=String(He.info.memory.textures),we.dataset.fps=String(Math.round(l*1e3/(p-c))),l=0,c=p)})}catch(i){console.error(i),Ha.hidden=!1,Ha.querySelector("h2").textContent="\u8FD9\u6B21\u6CA1\u80FD\u8FDB\u5165\u8857\u5934",Ha.querySelector("p").textContent=He?"\u8857\u533A\u8FDE\u63A5\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002":"\u5F53\u524D\u8BBE\u5907\u6CA1\u6709\u53EF\u7528\u7684 3D \u56FE\u5F62\u80FD\u529B\uFF0C\u4ECD\u53EF\u4F7F\u7528\u539F\u7F51\u9875\u3002"}}a_();})();
